/**
 * Outreach Scraper Worker Process
 * Handles web scraping with Puppeteer, runs in child process to avoid blocking main thread
 */

import { ProcessMessage } from '../entityTypes/processMessage-type';

// Types for ProcessMessage communication
interface ScrapingStartData {
    taskId: number;
    urls: string[];
    options: ScrapingOptions;
}

interface ScrapingProgressData {
    taskId: number;
    currentUrl: string;
    pagesProcessed: number;
    totalUrls: number;
    contactsFound: number;
    status: 'running' | 'completed' | 'failed';
    error?: string;
}

interface ScrapingOptions {
    aggressiveMode: boolean;
    maxConcurrency: number;
    useProxy: boolean;
    delayMs: number;
    maxPagesPerSite: number;
    followLinks: boolean;
    extractEmails: boolean;
    extractUrls: boolean;
}

process.parentPort.on('message', async (e) => {
    const pme = JSON.parse(e.data) as ProcessMessage<any>;

    switch (pme.action) {
        case 'outreach-scraping-start': {
            const data = pme.data as ScrapingStartData;
            await performScraping(data);
            break;
        }
    }
});

/**
 * Main scraping function
 */
async function performScraping(taskData: ScrapingStartData): Promise<void> {
    const { taskId, urls, options } = taskData;

    // Import scraper classes
    const { OutreachScrapingFactory } = require('../strategy/OutreachScrapingFactory');
    const { AppDataSource } = require('../config/SqliteDb');

    // Initialize database connection
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const { OutContactEntity } = require('../entity/OutContact.entity');
    const { OutreachTaskEntity } = require('../entity/OutreachTask.entity');
    const { ScrapingLogEntity } = require('../entity/ScrapingLog.entity');

    let totalContactsFound = 0;
    let processedUrls = 0;

    // Update task status to running
    await AppDataSource.getRepository(OutreachTaskEntity).update(taskId, {
        status: 1  // running
    });

    try {
        // Process each URL
        const concurrency = options.aggressiveMode ? options.maxConcurrency : 1;

        for (const url of urls) {
            try {
                // Create scraper for this URL
                const scraper = OutreachScrapingFactory.createScraper(url, options);

                // Scrape the URL
                const result = await scraper.scrape(url, options);

                // Save contacts to database
                for (const contact of result.contacts) {
                    try {
                        const contactEntity = new OutContactEntity();
                        contactEntity.email = contact.email;
                        contactEntity.website_url = contact.websiteUrl || '';
                        contactEntity.name = contact.name || '';
                        contactEntity.source_url = contact.sourceUrl;
                        contactEntity.task_id = taskId;
                        contactEntity.status = 0;  // pending

                        await AppDataSource.manager.save(contactEntity);
                        totalContactsFound++;
                    } catch (error) {
                        // Duplicate email - skip
                        console.log(`Skipping duplicate contact: ${contact.email}`);
                    }
                }

                // Create scraping log
                const logEntity = new ScrapingLogEntity();
                logEntity.url = url;
                logEntity.status = result.success ? 0 : 1;  // 0: success, 1: error
                logEntity.pages_processed = 1;
                logEntity.emails_found = result.contacts.filter(c => c.email).length;
                logEntity.task_id = taskId;
                logEntity.error_message = result.errors?.map(e => e.error).join('; ') || '';

                await AppDataSource.manager.save(logEntity);

                processedUrls++;

                // Send progress update
                const progressMessage: ProcessMessage<ScrapingProgressData> = {
                    action: 'outreach-scraping-progress',
                    data: {
                        taskId,
                        currentUrl: url,
                        pagesProcessed: processedUrls,
                        totalUrls: urls.length,
                        contactsFound: totalContactsFound,
                        status: 'running'
                    }
                };
                process.parentPort.postMessage(JSON.stringify(progressMessage));

                // Delay between requests if not aggressive mode
                if (!options.aggressiveMode && options.delayMs > 0) {
                    await sleep(options.delayMs);
                }

            } catch (error) {
                // URL scraping failed
                const logEntity = new ScrapingLogEntity();
                logEntity.url = url;
                logEntity.status = 1;  // error
                logEntity.pages_processed = 0;
                logEntity.emails_found = 0;
                logEntity.task_id = taskId;
                logEntity.error_message = (error as Error).message;

                await AppDataSource.manager.save(logEntity);

                console.error(`Scraping failed for ${url}:`, error);
            }
        }

        // Update task as completed
        const taskRepo = AppDataSource.getRepository(OutreachTaskEntity);
        await taskRepo.update(taskId, {
            status: 2,  // completed
            total_contacts: totalContactsFound
        });

        // Send final completion message
        const completeMessage: ProcessMessage<ScrapingProgressData> = {
            action: 'outreach-scraping-progress',
            data: {
                taskId,
                currentUrl: urls[urls.length - 1] || '',
                pagesProcessed: processedUrls,
                totalUrls: urls.length,
                contactsFound: totalContactsFound,
                status: 'completed'
            }
        };
        process.parentPort.postMessage(JSON.stringify(completeMessage));

    } catch (error) {
        // Update task as failed
        const taskRepo = AppDataSource.getRepository(OutreachTaskEntity);
        await taskRepo.update(taskId, {
            status: 3,  // failed
            error_log: (error as Error).message
        });

        // Send error message
        const errorMessage: ProcessMessage<ScrapingProgressData> = {
            action: 'outreach-scraping-progress',
            data: {
                taskId,
                currentUrl: '',
                pagesProcessed: processedUrls,
                totalUrls: urls.length,
                contactsFound: totalContactsFound,
                status: 'failed',
                error: (error as Error).message
            }
        };
        process.parentPort.postMessage(JSON.stringify(errorMessage));
    }
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
