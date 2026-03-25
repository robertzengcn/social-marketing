/**
 * LinkedIn Scraper Usage Example
 *
 * This example demonstrates how to use the LinkedInScraper to extract
 * contact information from LinkedIn profiles, companies, and school pages.
 *
 * Usage:
 *   npx ts-node examples/linkedin-scraper-example.ts
 */

import { OutreachScrapingFactory } from '../src/strategy/OutreachScrapingFactory';
import { LinkedInScraper } from '../src/strategy/LinkedInScraper';
import { ScrapingOptions } from '../src/strategy/OutreachScrapingStrategy';

// Configuration options for scraping
const scrapingOptions: ScrapingOptions = {
    aggressiveMode: false,      // Use conservative mode for LinkedIn (anti-bot detection)
    maxConcurrency: 1,          // LinkedIn blocks concurrent requests
    useProxy: false,            // Consider enabling for large-scale scraping
    delayMs: 2000,              // 2 second delay between requests (LinkedIn rate limits)
    maxPagesPerSite: 10,        // Limit pages per profile
    followLinks: false,         // Don't follow links on LinkedIn
    extractEmails: true,        // Extract emails if available
    extractUrls: true,          // Extract website URLs
    timeout: 30000             // 30 second timeout
};

/**
 * Example 1: Using the factory to create scraper automatically
 */
async function example1_FactoryUsage() {
    console.log('=== Example 1: Using Factory ===\n');

    const linkedInUrl = 'https://linkedin.com/in/johndoe';

    // Factory automatically detects LinkedIn URL and returns LinkedInScraper
    const scraper = OutreachScrapingFactory.createScraper(linkedInUrl, scrapingOptions);

    console.log(`Scraper type: ${scraper.getName()}`);
    console.log(`URL validation: ${scraper.validateUrl(linkedInUrl)}`);

    // Scrape the profile
    try {
        const result = await scraper.scrape(linkedInUrl, scrapingOptions);

        console.log('\nScraping Results:');
        console.log(`- Success: ${result.success}`);
        console.log(`- Contacts found: ${result.contacts.length}`);
        console.log(`- Pages processed: ${result.metadata.pagesProcessed}`);
        console.log(`- Duration: ${result.metadata.duration}ms`);

        if (result.contacts.length > 0) {
            result.contacts.forEach((contact, index) => {
                console.log(`\nContact ${index + 1}:`);
                console.log(`- Name: ${contact.name || 'N/A'}`);
                console.log(`- Email: ${contact.email || 'N/A'}`);
                console.log(`- Website: ${contact.websiteUrl || 'N/A'}`);
                console.log(`- Source: ${contact.sourceUrl}`);
            });
        }

        if (result.errors && result.errors.length > 0) {
            console.log('\nErrors:');
            result.errors.forEach(error => {
                console.log(`- ${error.url}: ${error.error} (${error.type})`);
            });
        }
    } catch (error) {
        console.error('Scraping failed:', error);
    }
}

/**
 * Example 2: Using LinkedInScraper directly
 */
async function example2_DirectUsage() {
    console.log('\n=== Example 2: Direct Usage ===\n');

    const linkedInUrl = 'https://linkedin.com/in/janedoe';

    // Create LinkedInScraper directly
    const scraper = new LinkedInScraper(scrapingOptions);

    console.log(`Scraper name: ${scraper.getName()}`);
    console.log(`Supported patterns:`);
    scraper.getSupportedPatterns()?.forEach(pattern => {
        console.log(`  - ${pattern}`);
    });

    // Validate URLs
    const testUrls = [
        'https://linkedin.com/in/johndoe',
        'https://www.linkedin.com/in/janedoe',
        'https://linkedin.com/company/acme-corp',
        'https://linkedin.com/school/university-name',
        'https://example.com',
        'https://twitter.com/user'
    ];

    console.log('\nURL Validation:');
    testUrls.forEach(url => {
        console.log(`  ${url}: ${scraper.validateUrl(url) ? '✓' : '✗'}`);
    });
}

/**
 * Example 3: Batch scraping multiple LinkedIn profiles
 */
async function example3_BatchScraping() {
    console.log('\n=== Example 3: Batch Scraping ===\n');

    const urls = [
        'https://linkedin.com/in/user1',
        'https://linkedin.com/in/user2',
        'https://linkedin.com/company/acme'
    ];

    const allContacts: any[] = [];

    for (const url of urls) {
        console.log(`Scraping: ${url}`);

        const scraper = OutreachScrapingFactory.createScraper(url, scrapingOptions);

        try {
            const result = await scraper.scrape(url, scrapingOptions);

            if (result.success) {
                allContacts.push(...result.contacts);
                console.log(`  ✓ Found ${result.contacts.length} contacts`);
            } else {
                console.log(`  ✗ Failed: ${result.errors?.[0]?.error || 'Unknown error'}`);
            }

            // Delay between requests to avoid rate limiting
            if (scrapingOptions.delayMs && scrapingOptions.delayMs > 0) {
                console.log(`  Waiting ${scrapingOptions.delayMs}ms...`);
                await sleep(scrapingOptions.delayMs);
            }
        } catch (error) {
            console.log(`  ✗ Error: ${(error as Error).message}`);
        }
    }

    console.log(`\nTotal contacts collected: ${allContacts.length}`);
}

/**
 * Example 4: Error handling for LinkedIn-specific issues
 */
async function example4_ErrorHandling() {
    console.log('\n=== Example 4: Error Handling ===\n');

    const scraper = new LinkedInScraper(scrapingOptions);

    // Test with various error scenarios
    const testCases = [
        {
            name: 'Invalid URL',
            url: 'https://linkedin.com/invalid-path'
        },
        {
            name: 'Non-LinkedIn URL',
            url: 'https://example.com/profile'
        },
        {
            name: 'Malformed URL',
            url: 'not-a-url'
        }
    ];

    for (const testCase of testCases) {
        console.log(`\nTest: ${testCase.name}`);
        console.log(`URL: ${testCase.url}`);

        if (!scraper.validateUrl(testCase.url)) {
            console.log('  ✓ URL validation failed as expected');
            continue;
        }

        try {
            const result = await scraper.scrape(testCase.url, scrapingOptions);

            if (!result.success) {
                console.log('  ✓ Scrape failed gracefully');
                console.log(`  Error type: ${result.errors?.[0]?.type}`);
                console.log(`  Error: ${result.errors?.[0]?.error}`);
            }
        } catch (error) {
            console.log(`  ✗ Unexpected error: ${(error as Error).message}`);
        }
    }
}

/**
 * Example 5: Using with custom options for different scenarios
 */
async function example5_CustomOptions() {
    console.log('\n=== Example 5: Custom Options ===\n');

    const scenarios = [
        {
            name: 'Conservative (Best for avoiding blocks)',
            options: {
                ...scrapingOptions,
                aggressiveMode: false,
                delayMs: 3000,
                timeout: 45000
            }
        },
        {
            name: 'Balanced',
            options: {
                ...scrapingOptions,
                aggressiveMode: false,
                delayMs: 1500,
                timeout: 30000
            }
        },
        {
            name: 'Aggressive (High risk of blocking)',
            options: {
                ...scrapingOptions,
                aggressiveMode: true,
                delayMs: 500,
                timeout: 15000
            }
        }
    ];

    scenarios.forEach(scenario => {
        console.log(`\n${scenario.name}:`);
        console.log(`  Aggressive mode: ${scenario.options.aggressiveMode}`);
        console.log(`  Delay: ${scenario.options.delayMs}ms`);
        console.log(`  Timeout: ${scenario.options.timeout}ms`);
    });
}

/**
 * Helper function to sleep
 */
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main execution
 */
async function main() {
    console.log('LinkedIn Scraper Examples\n');
    console.log('Note: These examples demonstrate the API usage.');
    console.log('Actual scraping requires valid LinkedIn URLs and may require authentication.\n');

    // Run examples
    await example2_DirectUsage();
    await example5_CustomOptions();

    // Uncomment to run scraping examples (requires valid URLs and network access)
    // await example1_FactoryUsage();
    // await example3_BatchScraping();
    // await example4_ErrorHandling();

    console.log('\n=== Examples Complete ===');
}

// Run if executed directly
if (require.main === module) {
    main().catch(console.error);
}

export {
    example1_FactoryUsage,
    example2_DirectUsage,
    example3_BatchScraping,
    example4_ErrorHandling,
    example5_CustomOptions
};
