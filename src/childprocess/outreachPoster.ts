/**
 * Outreach Poster Worker Process
 * Handles multi-channel message sending (email, comments, direct messages)
 * Runs in child process to avoid blocking main thread
 */

import { ProcessMessage } from '../entityTypes/processMessage-type';

interface OutreachStartData {
    campaignId: number;
    contacts: any[];
}

interface OutreachProgressData {
    campaignId: number;
    sentCount: number;
    failedCount: number;
    totalContacts: number;
    currentEmail?: string;
    status: 'started' | 'progress' | 'completed' | 'failed';
}

process.parentPort.on('message', async (e) => {
    const pme = JSON.parse(e.data) as ProcessMessage<any>;

    switch (pme.action) {
        case 'outreach-poster-start': {
            const data = pme.data as OutreachStartData;
            await performOutreach(data);
            break;
        }
    }
});

/**
 * Main outreach function
 */
async function performOutreach(campaignData: OutreachStartData): Promise<void> {
    const { campaignId, contacts } = campaignData;

    // Import required modules
    const { OutreachStrategyFactory } = require('../strategy/OutreachStrategyFactory');
    const { AppDataSource } = require('../config/SqliteDb');

    // Initialize database connection
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const { OutContactEntity } = require('../entity/OutContact.entity');
    const { OutreachCampaignEntity } = require('../entity/OutreachCampaign.entity');

    let sentCount = 0;
    let failedCount = 0;

    // Update campaign status to sending
    const campaignRepo = AppDataSource.getRepository(OutreachCampaignEntity);
    await campaignRepo.update(campaignId, {
        status: 1  // sending
    });

    try {
        // Process each contact
        for (const contact of contacts) {
            try {
                // Determine best outreach method
                const target = determineOutreachTarget(contact);

                // Select strategy
                const strategy = OutreachStrategyFactory.selectStrategyForTarget(target);

                // Get generated message
                const message = contact.message?.content || generateDefaultMessage(contact);

                // Send message
                const result = await strategy.send(target, message, {
                    delayMs: 2000,  // 2 seconds delay between sends
                    useProxy: false,
                    maxRetries: 3
                });

                // Update contact status based on result
                if (result.success) {
                    await campaignRepo.manager.update(OutContactEntity, contact.id, {
                        status: 2  // sent
                    });
                    sentCount++;
                } else {
                    await campaignRepo.manager.update(OutContactEntity, contact.id, {
                        status: 3  // failed
                    });
                    failedCount++;
                }

                // Send progress update
                const progressMessage: ProcessMessage<OutreachProgressData> = {
                    action: 'outreach-poster-progress',
                    data: {
                        campaignId,
                        sentCount,
                        failedCount,
                        totalContacts: contacts.length,
                        currentEmail: contact.email,
                        status: 'progress'
                    }
                };
                process.parentPort.postMessage(JSON.stringify(progressMessage));

                // Rate limiting
                await sleep(2000);

            } catch (error) {
                console.error(`Failed to send to ${contact.email}:`, error);
                failedCount++;

                // Update contact as failed
                await campaignRepo.manager.update(OutContactEntity, contact.id, {
                    status: 3
                });
            }
        }

        // Update campaign as completed
        await campaignRepo.update(campaignId, {
            status: 2,  // completed
            sent_count: sentCount,
            failed_count: failedCount
        });

        // Send final completion message
        const completeMessage: ProcessMessage<OutreachProgressData> = {
            action: 'outreach-poster-progress',
            data: {
                campaignId,
                sentCount,
                failedCount,
                totalContacts: contacts.length,
                status: 'completed'
            }
        };
        process.parentPort.postMessage(JSON.stringify(completeMessage));

    } catch (error) {
        // Update campaign as failed
        await campaignRepo.update(campaignId, {
            status: 3,  // failed
            error_log: (error as Error).message
        });

        // Send error message
        const errorMessage: ProcessMessage<OutreachProgressData> = {
            action: 'outreach-poster-progress',
            data: {
                campaignId,
                sentCount,
                failedCount,
                totalContacts: contacts.length,
                status: 'failed'
            }
        };
        process.parentPort.postMessage(JSON.stringify(errorMessage));
    }
}

function determineOutreachTarget(contact: any): any {
    // Determine target type based on available contact info
    if (contact.email) {
        return {
            type: 'email-address',
            identifier: contact.email,
            name: contact.name,
            url: contact.website_url
        };
    } else if (contact.website_url) {
        return {
            type: 'website-url',
            identifier: contact.website_url,
            name: contact.name,
            url: contact.website_url
        };
    } else {
        return {
            type: 'contact-form',
            identifier: contact.source_url,
            name: contact.name,
            url: contact.source_url
        };
    }
}

function generateDefaultMessage(contact: any): string {
    // Generate simple default message
    const name = contact.name || 'there';
    return `Hi ${name},\n\nI came across your information and wanted to reach out.\n\nLooking forward to connecting with you!\n\nBest regards`;
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
