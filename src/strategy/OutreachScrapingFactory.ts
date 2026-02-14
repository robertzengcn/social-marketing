import { OutreachScrapingStrategy, ScrapingOptions } from './OutreachScrapingStrategy';
import { BaseWebScraper } from './BaseWebScraper';
import { GenericWebScraper } from './GenericWebScraper';

/**
 * Factory for creating appropriate scraper strategy based on URL
 */
export class OutreachScrapingFactory {
    private static scrapers: Map<string, new (options: ScrapingOptions) => BaseWebScraper> = new Map([
        ['generic', GenericWebScraper]
        // Future: ['linkedin', LinkedInScraper], ['twitter', TwitterScraper]
    ]);

    /**
     * Create scraper instance based on URL
     */
    static createScraper(url: string, options: ScrapingOptions): BaseWebScraper {
        // Check for platform-specific scrapers
        if (url.includes('linkedin.com')) {
            // Future: return new LinkedInScraper(options);
        }
        if (url.includes('twitter.com') || url.includes('x.com')) {
            // Future: return new TwitterScraper(options);
        }

        // Default to generic scraper
        return new GenericWebScraper(options);
    }

    /**
     * Get scraper by name
     */
    static getScraper(name: string, options: ScrapingOptions): BaseWebScraper | null {
        const ScraperClass = this.scrapers.get(name);
        if (!ScraperClass) return null;
        return new ScraperClass(options);
    }

    /**
     * Register custom scraper
     */
    static registerScraper(
        name: string,
        scraperClass: new (options: ScrapingOptions) => BaseWebScraper
    ): void {
        this.scrapers.set(name, scraperClass);
    }

    /**
     * Get all registered scrapers
     */
    static getRegisteredScrapers(): string[] {
        return Array.from(this.scrapers.keys());
    }
}
