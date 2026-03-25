import puppeteer, { Page } from 'puppeteer';
import { BaseWebScraper } from './BaseWebScraper';
import { ScrapingOptions, ScrapingResult, ContactInfo } from './OutreachScrapingStrategy';

/**
 * LinkedIn-specific scraper implementation
 * Extracts contact information from LinkedIn profiles, companies, and school pages
 */
export class LinkedInScraper extends BaseWebScraper {
    private profileData: any = null;

    constructor(options: ScrapingOptions) {
        super(options);
    }

    getName(): string {
        return "linkedin";
    }

    /**
     * Validate if URL is a LinkedIn URL
     * Supports: linkedin.com/in/* (profiles), linkedin.com/company/* (companies), linkedin.com/school/* (schools)
     */
    validateUrl(url: string): boolean {
        try {
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname.toLowerCase();

            // Check if it's a LinkedIn domain
            if (!hostname.includes('linkedin.com')) {
                return false;
            }

            // Check if it has a valid path (profile, company, or school)
            const path = parsedUrl.pathname;
            const validPaths = ['/in/', '/company/', '/school/'];

            return validPaths.some(validPath => path.startsWith(validPath));
        } catch {
            return false;
        }
    }

    /**
     * Get supported URL patterns for this scraper
     */
    getSupportedPatterns(): string[] {
        return [
            '^https?://.*linkedin\\.com/in/.*',      // Profiles
            '^https?://.*linkedin\\.com/company/.*', // Companies
            '^https?://.*linkedin\\.com/school/.*'   // Schools
        ];
    }

    /**
     * Navigate to LinkedIn page with additional handling for LinkedIn's dynamic content
     */
    async navigateToPage(url: string): Promise<boolean> {
        if (!this.page) return false;

        try {
            const timeout = this.options.timeout || 30000;

            // Navigate to URL
            await this.page.goto(url, {
                waitUntil: 'networkidle2',
                timeout
            });

            // LinkedIn-specific: Wait for common profile elements to load
            await this.page.waitForFunction(
                () => {
                    // Check for profile card, company card, or school card
                    return !!(
                        document.querySelector('.pv-text-details__left-panel') || // Profile
                        document.querySelector('.org-top-card-summary-info-list') || // Company
                        document.querySelector('.school-top-card') // School
                    );
                },
                { timeout: 10000 }
            ).catch(() => {
                // If timeout, continue anyway - page might have loaded differently
                console.log('LinkedIn page elements not fully loaded, continuing...');
            });

            // Simulate human behavior
            await this.simulateHumanBehavior();

            // Scroll down to trigger lazy loading of contact info
            await this.page.evaluate(() => {
                window.scrollBy(0, 500);
            });

            // Wait a bit for dynamic content
            await this.sleep(1000);

            return true;
        } catch (error) {
            console.error(`LinkedIn navigation failed for ${url}:`, error);
            return false;
        }
    }

    /**
     * Extract contact information from LinkedIn page
     */
    async scrapeContactInfo(): Promise<ContactInfo[]> {
        if (!this.page) return [];

        try {
            const currentUrl = this.page.url();

            // Extract data from the page
            this.profileData = await this.page.evaluate(() => {
                const result: any = {
                    name: '',
                    email: '',
                    website: '',
                    headline: '',
                    company: '',
                    location: ''
                };

                // Extract name (works for profiles, companies, and schools)
                const nameSelectors = [
                    'h1.text-heading-xlarge',
                    '.pv-text-details__left-panel h1',
                    '.org-top-card-summary-info-list h1',
                    '.school-top-card h1'
                ];

                for (const selector of nameSelectors) {
                    const element = document.querySelector(selector);
                    if (element?.textContent) {
                        result.name = element.textContent.trim();
                        break;
                    }
                }

                // Extract headline/profile description
                const headlineSelectors = [
                    '.text-body-medium',
                    '.pv-text-details__right-panel',
                    '.pv-text-details__left-panel .text-body-medium.break-words'
                ];

                for (const selector of headlineSelectors) {
                    const element = document.querySelector(selector);
                    if (element?.textContent) {
                        result.headline = element.textContent.trim();
                        break;
                    }
                }

                // Extract company name (for profiles)
                const companySelectors = [
                    '.pv-text-details__right-panel .inline-show-more-text--is-collapsed',
                    '[aria-label="Current company"]',
                    '.pv-text-details__right-panel button[aria-label]'
                ];

                for (const selector of companySelectors) {
                    const element = document.querySelector(selector);
                    if (element?.textContent) {
                        result.company = element.textContent.trim();
                        break;
                    }
                }

                // Extract location
                const locationSelectors = [
                    '.text-body-small.inline-show-more-text--is-collapsed',
                    '.pv-text-details__left-panel .mt2.relative',
                    '[data-anonymize="person-location"]'
                ];

                for (const selector of locationSelectors) {
                    const element = document.querySelector(selector);
                    if (element?.textContent) {
                        result.location = element.textContent.trim();
                        break;
                    }
                }

                // Extract email from contact info section
                // Note: LinkedIn typically hides emails, but some profiles display them
                const emailSelectors = [
                    'a[href^="mailto:"]',
                    '.pv-contact-info__contact-link',
                    '[data-anonymize="email"]'
                ];

                for (const selector of emailSelectors) {
                    const element = document.querySelector(selector);
                    if (element) {
                        const email = element.getAttribute('href')?.replace('mailto:', '') ||
                                     element.textContent;
                        if (email && email.includes('@')) {
                            result.email = email.trim();
                            break;
                        }
                    }
                }

                // Extract website from contact info
                const websiteSelectors = [
                    'a[href^="http"]:not([href*="linkedin.com"])',
                    '.pv-contact-info__website-link'
                ];

                for (const selector of websiteSelectors) {
                    const element = document.querySelector(selector);
                    if (element) {
                        const href = element.getAttribute('href');
                        if (href && !href.includes('linkedin.com')) {
                            result.website = href.trim();
                            break;
                        }
                    }
                }

                return result;
            });

            const contacts: ContactInfo[] = [];

            // Create contact if we have any useful data
            if (this.profileData.name || this.profileData.email || this.profileData.website) {
                contacts.push({
                    email: this.profileData.email || '',
                    name: this.profileData.name || '',
                    websiteUrl: this.profileData.website || '',
                    sourceUrl: currentUrl,
                    scrapedAt: Date.now()
                });
            }

            // If no email found, try to extract from page content using BaseWebScraper's method
            if (!this.profileData.email && this.options.extractEmails) {
                const html = await this.page.content();
                const emails = await this.extractEmails(html);
                if (emails.length > 0) {
                    contacts.push({
                        email: emails[0],
                        name: this.profileData.name || '',
                        websiteUrl: this.profileData.website || '',
                        sourceUrl: currentUrl,
                        scrapedAt: Date.now()
                    });
                }
            }

            return contacts;
        } catch (error) {
            console.error('LinkedIn contact extraction failed:', error);
            return [];
        }
    }

    /**
     * Custom human behavior simulation for LinkedIn
     * LinkedIn has sophisticated bot detection, so we add extra delays
     */
    protected async simulateHumanBehavior(): Promise<void> {
        if (!this.page) return;

        // Random mouse movements (more frequent for LinkedIn)
        for (let i = 0; i < 3; i++) {
            await this.page.mouse.move(
                Math.random() * 1000,
                Math.random() * 1000
            );
            await this.sleep(Math.random() * 500);
        }

        // Random scroll (LinkedIn lazy-loads content)
        await this.page.evaluate(() => {
            window.scrollBy(0, Math.random() * 300 + 100);
        });

        // Additional delay to mimic human reading
        await this.sleep(Math.random() * 2000 + 1000);
    }

    /**
     * Check for LinkedIn-specific anti-bot measures
     */
    protected async handleAntiBotDetection(): Promise<boolean> {
        if (!this.page) return false;

        // Check for CAPTCHA
        const captchaExists = await this.page.$('[data-captcha], .captcha, #captcha, .g-recaptcha');
        if (captchaExists) {
            console.warn('LinkedIn CAPTCHA detected');
            return false;
        }

        // Check for LinkedIn-specific sign-in wall
        const signInWall = await this.page.$('[data-control-name="ga signin.wall"]');
        if (signInWall) {
            console.warn('LinkedIn sign-in wall detected - login required');
            return false;
        }

        // Check for rate limit / blocked page
        const bodyText = await this.page.evaluate(() => document.body.innerText);
        const blockedKeywords = [
            'rate limit',
            'access denied',
            'blocked',
            'too many requests',
            'please try again later',
            'sign in to see'
        ];

        const isBlocked = blockedKeywords.some(keyword =>
            bodyText.toLowerCase().includes(keyword)
        );

        if (isBlocked) {
            console.warn('LinkedIn access blocked or sign-in required');
            return false;
        }

        return true;
    }

    /**
     * Get the extracted profile data (for testing purposes)
     */
    getProfileData(): any {
        return this.profileData;
    }
}
