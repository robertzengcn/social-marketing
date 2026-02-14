import { BaseWebScraper } from './BaseWebScraper';
import { ScrapingOptions, ScrapingResult, ContactInfo } from './OutreachScrapingStrategy';

/**
 * Generic website scraper implementation
 * Handles most standard websites without special requirements
 */
export class GenericWebScraper extends BaseWebScraper {
    getName(): string {
        return "generic";
    }

    validateUrl(url: string): boolean {
        try {
            const parsed = new URL(url);
            return ['http:', 'https:'].includes(parsed.protocol);
        } catch {
            return false;
        }
    }

    getSupportedPatterns(): string[] {
        return [
            '^https?://.*'  // Any HTTP/HTTPS URL
        ];
    }

    async navigateToPage(url: string): Promise<boolean> {
        if (!this.page) return false;

        try {
            const timeout = this.options.timeout || 30000;
            await this.page.goto(url, {
                waitUntil: 'networkidle2',
                timeout
            });

            // Simulate human behavior
            await this.simulateHumanBehavior();

            return true;
        } catch (error) {
            console.error(`Navigation failed for ${url}:`, error);
            return false;
        }
    }

    async scrapeContactInfo(): Promise<ContactInfo[]> {
        if (!this.page) return [];

        const html = await this.page.content();
        const currentUrl = this.page.url();
        const contacts: ContactInfo[] = [];

        // Extract emails
        if (this.options.extractEmails) {
            const emails = await this.extractEmails(html);
            emails.forEach(email => {
                contacts.push({
                    email,
                    sourceUrl: currentUrl,
                    scrapedAt: Date.now()
                });
            });
        }

        // Extract URLs
        if (this.options.extractUrls) {
            const urls = await this.extractUrls(html, currentUrl);
            urls.forEach(url => {
                contacts.push({
                    email: '',  // No email for URL-only contacts
                    websiteUrl: url,
                    sourceUrl: currentUrl,
                    scrapedAt: Date.now()
                });
            });
        }

        return contacts;
    }
}
