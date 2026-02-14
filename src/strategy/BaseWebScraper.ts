import puppeteer, { Browser, Page } from 'puppeteer';
import stealth from 'puppeteer-extra-plugin-stealth';
import { OutreachScrapingStrategy, ScrapingOptions, ScrapingResult, ContactInfo, ScrapingMetadata, ScrapingError } from './OutreachScrapingStrategy';
import { validateUrl, normalizeUrl } from '../utility/validation';

/**
 * Abstract base class providing common scraping functionality
 * All scraper implementations should extend this class
 */
export abstract class BaseWebScraper implements OutreachScrapingStrategy {
    protected browser: Browser | null = null;
    protected page: Page | null = null;
    protected options: ScrapingOptions;

    constructor(options: ScrapingOptions) {
        this.options = options;
    }

    /**
     * Main scraping method (template method pattern)
     * Implements common workflow while allowing customization
     */
    async scrape(url: string, options: ScrapingOptions): Promise<ScrapingResult> {
        const startTime = Date.now();
        this.options = options;

        try {
            // 1. Initialize browser
            await this.initializeBrowser();

            // 2. Navigate to page (customizable)
            const navigationSuccess = await this.navigateToPage(url);
            if (!navigationSuccess) {
                return this.createErrorResult(url, 'TIMEOUT');
            }

            // 3. Check for anti-bot detection
            const detectionPassed = await this.handleAntiBotDetection();
            if (!detectionPassed) {
                return this.createErrorResult(url, 'BLOCKED');
            }

            // 4. Extract contact info (customizable)
            const contacts = await this.scrapeContactInfo();

            // 5. Clean up
            await this.cleanup();

            const duration = Date.now() - startTime;

            return {
                success: true,
                url,
                contacts,
                metadata: {
                    scraperName: this.getName(),
                    pagesProcessed: 1,
                    emailsFound: contacts.filter(c => c.email).length,
                    urlsFound: contacts.filter(c => c.websiteUrl).length,
                    duration,
                    timestamp: Date.now()
                }
            };

        } catch (error) {
            await this.cleanup();
            return this.createErrorResult(url, 'UNKNOWN', (error as Error).message);
        }
    }

    /**
     * Initialize browser with stealth mode
     * Common implementation - can be overridden
     */
    protected async initializeBrowser(): Promise<void> {
        this.browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-blink-features=AutomationControlled',
                '--disable-web-security'
            ]
        });

        this.page = await this.browser.newPage();
        await this.setupStealthMode();
    }

    /**
     * Setup stealth mode for anti-bot detection
     * Common implementation - can be overridden
     */
    protected async setupStealthMode(): Promise<void> {
        if (!this.page) return;

        // Set user agent
        const userAgent = this.options.userAgent ||
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
        await this.page.setUserAgent(userAgent);

        // Hide webdriver
        await this.page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false
            });
        });

        // Mock navigator properties
        await this.page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'plugins', {
                get: () => [1, 2, 3, 4, 5]
            });
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en']
            });
            Object.defineProperty(navigator, 'platform', {
                get: () => 'Win32'
            });
        });

        // Set viewport
        await this.page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1
        });
    }

    /**
     * Extract emails from HTML content
     * Common implementation - can be overridden
     */
    protected async extractEmails(html: string): Promise<string[]> {
        // RFC 5322 compliant email regex (simplified practical version)
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const matches = html.match(emailRegex) || [];

        // Deduplicate and validate
        const uniqueEmails = [...new Set(matches)]
            .filter(email => this.validateEmail(email));

        return uniqueEmails;
    }

    /**
     * Extract URLs from HTML content
     * Common implementation - can be overridden
     */
    protected async extractUrls(html: string, baseUrl: string): Promise<string[]> {
        const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
        const matches = html.match(urlRegex) || [];

        // Deduplicate and validate
        const uniqueUrls = [...new Set(matches)]
            .map(url => normalizeUrl(url)) // Normalize for consistency
            .filter(url => validateUrl(url)) // Security validation
            .filter(url => !url.includes(baseUrl)); // Exclude same domain

        return uniqueUrls;
    }

    /**
     * Validate email format using RFC 5322 compliant pattern
     * Prevents common invalid patterns and ensures proper structure
     */
    protected validateEmail(email: string): boolean {
        if (!email || typeof email !== 'string') return false;

        // Basic structure check
        if (email.length > 254) return false; // RFC 5321 limit
        if (email.length < 3) return false;

        // Check for invalid patterns
        if (email.startsWith('.') || email.endsWith('.')) return false;
        if (email.includes('..')) return false;
        if (email.includes('@.')) return false;

        // Comprehensive email regex
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        return emailRegex.test(email);
    }

    /**
     * Check for anti-bot detection (CAPTCHA, rate limits, etc.)
     * Common implementation - can be overridden
     */
    protected async handleAntiBotDetection(): Promise<boolean> {
        if (!this.page) return false;

        // Check for CAPTCHA
        const captchaExists = await this.page.$('[data-captcha], .captcha, #captcha, .g-recaptcha');
        if (captchaExists) {
            return false;
        }

        // Check for rate limit / blocked page
        const bodyText = await this.page.evaluate(() => document.body.innerText);
        const blockedKeywords = ['rate limit', 'access denied', 'blocked', 'too many requests'];
        const isBlocked = blockedKeywords.some(keyword =>
            bodyText.toLowerCase().includes(keyword)
        );

        if (isBlocked) {
            return false;
        }

        return true;
    }

    /**
     * Simulate human behavior (mouse movements, scrolling)
     * Common implementation
     */
    protected async simulateHumanBehavior(): Promise<void> {
        if (!this.page) return;

        // Random mouse movement
        await this.page.mouse.move(
            Math.random() * 1000,
            Math.random() * 1000
        );

        // Random scroll
        await this.page.evaluate(() => {
            window.scrollBy(0, Math.random() * 500);
        });

        // Random delay
        await this.sleep(Math.random() * 1000);
    }

    /**
     * Sleep utility
     */
    protected sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Clean up resources
     */
    protected async cleanup(): Promise<void> {
        if (this.page) {
            await this.page.close();
            this.page = null;
        }
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }

    /**
     * Create error result
     */
    protected createErrorResult(
        url: string,
        type: ScrapingError['type'],
        message?: string
    ): ScrapingResult {
        return {
            success: false,
            url,
            contacts: [],
            metadata: {
                scraperName: this.getName(),
                pagesProcessed: 0,
                emailsFound: 0,
                urlsFound: 0,
                duration: 0,
                timestamp: Date.now(),
                blocked: type === 'BLOCKED',
                captchaDetected: type === 'CAPTCHA'
            },
            errors: [{
                url,
                error: message || `Scraping failed: ${type}`,
                type,
                timestamp: Date.now()
            }]
        };
    }

    // ==================== ABSTRACT METHODS ====================

    /**
     * Validate if URL is supported by this scraper
     */
    abstract validateUrl(url: string): boolean;

    /**
     * Navigate to target page
     */
    abstract navigateToPage(url: string): Promise<boolean>;

    /**
     * Scrape contact information from current page
     */
    abstract scrapeContactInfo(): Promise<ContactInfo[]>;

    /**
     * Get scraper name
     */
    abstract getName(): string;
}
