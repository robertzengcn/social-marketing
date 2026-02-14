# Scraping Strategy Interface Contracts

**Purpose**: Define the Strategy pattern interface for extensible web scraping.
**Location**: `src/strategy/OutreachScrapingStrategy.ts`

---

## Core Strategy Interface

```typescript
/**
 * Main scraper strategy interface
 * All website scrapers must implement this interface
 */
export interface OutreachScrapingStrategy {
    /**
     * Main scraping method - extracts contact information from URL
     * @param url - Target URL to scrape
     * @param options - Scraping configuration options
     * @returns Scraping result with contacts and metadata
     */
    scrape(url: string, options: ScrapingOptions): Promise<ScrapingResult>;

    /**
     * Validate if URL is supported by this scraper
     * @param url - URL to validate
     * @returns true if scraper can handle this URL
     */
    validateUrl(url: string): boolean;

    /**
     * Get unique name/identifier for this scraper
     * @returns Scraper name (e.g., "linkedin", "twitter", "generic")
     */
    getName(): string;

    /**
     * Optional: Get supported URL patterns for this scraper
     * @returns Array of regex patterns or domain matches
     */
    getSupportedPatterns?(): string[];
}
```

---

## Type Definitions

```typescript
/**
 * Scraping configuration options
 */
export interface ScrapingOptions {
    aggressiveMode: boolean;      // High-speed scraping (20+ req/s)
    maxConcurrency: number;        // Concurrent page operations
    useProxy: boolean;             // Use proxy rotation
    delayMs: number;               // Delay between requests
    maxPagesPerSite: number;        // Page limit per site
    followLinks: boolean;           // Follow internal links
    extractEmails: boolean;         // Extract email addresses
    extractUrls: boolean;           // Extract website URLs
    maxDepth?: number;             // Link traversal depth (default: 1)
    userAgent?: string;            // Custom user agent
    timeout?: number;              // Page load timeout (ms)
}

/**
 * Scraping result
 */
export interface ScrapingResult {
    success: boolean;
    url: string;
    contacts: ContactInfo[];
    metadata: ScrapingMetadata;
    errors?: ScrapingError[];
}

/**
 * Contact information extracted from scraping
 */
export interface ContactInfo {
    email: string;
    websiteUrl?: string;
    name?: string;
    sourceUrl: string;              // URL where contact was found
    scrapedAt: number;             // Timestamp
}

/**
 * Scraping metadata
 */
export interface ScrapingMetadata {
    scraperName: string;
    pagesProcessed: number;
    emailsFound: number;
    urlsFound: number;
    duration: number;              // Duration in milliseconds
    timestamp: number;             // Completion timestamp
    blocked?: boolean;             // Whether scraping was blocked
    captchaDetected?: boolean;
}

/**
 * Scraping error information
 */
export interface ScrapingError {
    url: string;
    error: string;
    type: 'BLOCKED' | 'CAPTCHA' | 'TIMEOUT' | 'INVALID_URL' | 'EXTRACTION_ERROR' | 'UNKNOWN';
    timestamp: number;
}
```

---

## Abstract Base Class

```typescript
/**
 * Abstract base class providing common scraping functionality
 * All scraper implementations should extend this class
 */
export abstract class BaseWebScraper implements OutreachScrapingStrategy {
    protected browser: import('puppeteer').Browser | null = null;
    protected page: import('puppeteer').Page | null = null;
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
                return this.createErrorResult(url, 'NAVIGATION_FAILED');
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
                    emailsFound: contacts.length,
                    urlsFound: contacts.filter(c => c.websiteUrl).length,
                    duration,
                    timestamp: Date.now()
                }
            };

        } catch (error) {
            await this.cleanup();
            return this.createErrorResult(url, 'UNKNOWN', error.message);
        }
    }

    /**
     * Initialize browser with stealth mode
     * Common implementation - can be overridden
     */
    protected async initializeBrowser(): Promise<void> {
        const puppeteer = require('rebrowser-puppeteer');
        const stealth = require('puppeteer-extra-plugin-stealth')();

        const extra = puppeteer.default;
        extra.use(stealth);

        this.browser = await extra.launch({
            headless: 'new',
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

        // Deduplicate and filter
        const uniqueUrls = [...new Set(matches)]
            .filter(url => this.validateUrl(url))
            .filter(url => !url.includes(baseUrl)); // Exclude same domain

        return uniqueUrls;
    }

    /**
     * Validate email format
     */
    protected validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
     * Navigate to the target page
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
```

---

## Concrete Implementation: Generic Web Scraper

```typescript
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
            '^https?://.*',  // Any HTTP/HTTPS URL
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
```

---

## Concrete Implementation: Platform-Specific Examples

### LinkedIn Scraper (Future Implementation)

```typescript
/**
 * LinkedIn-specific scraper implementation
 * Extends BaseWebScraper with LinkedIn-specific logic
 */
export class LinkedInScraper extends BaseWebScraper {
    private isLoggedIn: boolean = false;

    getName(): string {
        return "linkedin";
    }

    validateUrl(url: string): boolean {
        return url.includes('linkedin.com/in/') || url.includes('linkedin.com/company/');
    }

    getSupportedPatterns(): string[] {
        return [
            '^https?://.*linkedin\\.com/in/.*',    // Profile pages
            '^https?://.*linkedin\\.com/company/.*' // Company pages
        ];
    }

    async navigateToPage(url: string): Promise<boolean> {
        if (!this.page) return false;

        // Navigate to LinkedIn
        await this.page.goto('https://www.linkedin.com', { waitUntil: 'networkidle2' });

        // Check if logged in
        this.isLoggedIn = await this.checkLoginStatus();

        if (!this.isLoggedIn) {
            // Handle login (would need credentials from config)
            await this.performLinkedInLogin();
        }

        // Navigate to target profile
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        await this.simulateHumanBehavior();

        return true;
    }

    async scrapeContactInfo(): Promise<ContactInfo[]> {
        if (!this.page) return [];

        // LinkedIn-specific scraping logic
        const profile = await this.page.evaluate(() => {
            return {
                name: document.querySelector('.text-heading-xlarge')?.textContent?.trim(),
                email: '',  // LinkedIn doesn't show emails directly
                websiteUrl: document.querySelector('section[aria-label="Contact info"]')?.textContent || ''
            };
        });

        if (profile.name || profile.websiteUrl) {
            return [{
                email: profile.email,
                name: profile.name,
                websiteUrl: profile.websiteUrl,
                sourceUrl: this.page.url(),
                scrapedAt: Date.now()
            }];
        }

        return [];
    }

    private async checkLoginStatus(): Promise<boolean> {
        // Check if already logged in to LinkedIn
        const loginButton = await this.page.$('.login-btn');
        return !loginButton;
    }

    private async performLinkedInLogin(): Promise<void> {
        // LinkedIn login implementation
        // (would need credentials from secure storage)
    }
}
```

### Twitter/X Scraper (Future Implementation)

```typescript
export class TwitterScraper extends BaseWebScraper {
    getName(): string { return "twitter"; }

    validateUrl(url: string): boolean {
        return url.includes('twitter.com/') || url.includes('x.com/');
    }

    async navigateToPage(url: string): Promise<boolean> {
        // Twitter-specific navigation with authentication
        // ...
        return true;
    }

    async scrapeContactInfo(): Promise<ContactInfo[]> {
        // Twitter-specific extraction
        // ...
        return [];
    }
}
```

---

## Factory Pattern

```typescript
/**
 * Factory for creating appropriate scraper strategy based on URL
 */
export class OutreachScrapingFactory {
    private static scrapers: Map<string, new () => BaseWebScraper> = new Map([
        ['linkedin', LinkedInScraper],
        ['twitter', TwitterScraper],
        ['generic', GenericWebScraper]
    ]);

    /**
     * Create scraper instance based on URL
     */
    static createScraper(url: string, options: ScrapingOptions): BaseWebScraper {
        // Check for platform-specific scrapers
        if (url.includes('linkedin.com')) {
            return new LinkedInScraper(options);
        }
        if (url.includes('twitter.com') || url.includes('x.com')) {
            return new TwitterScraper(options);
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
        scraperClass: new () => BaseWebScraper
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
```

---

## Usage Examples

### Example 1: Basic Scraping

```typescript
// In child process (src/childprocess/outreachScraper.ts)

const options: ScrapingOptions = {
    aggressiveMode: true,
    maxConcurrency: 5,
    useProxy: true,
    delayMs: 0,
    maxPagesPerSite: 10,
    followLinks: false,
    extractEmails: true,
    extractUrls: true
};

const scraper = OutreachScrapingFactory.createScraper('https://example.com', options);
const result = await scraper.scrape('https://example.com', options);

if (result.success) {
    console.log(`Found ${result.contacts.length} contacts`);
    result.contacts.forEach(contact => {
        console.log(`Email: ${contact.email}, URL: ${contact.websiteUrl}`);
    });
} else {
    console.error('Scraping failed:', result.errors);
}
```

### Example 2: Batch Scraping

```typescript
async function scrapeMultipleUrls(urls: string[], options: ScrapingOptions): Promise<ScrapingResult[]> {
    const concurrency = options.aggressiveMode ? options.maxConcurrency : 1;

    const results = await pmap(
        urls,
        async (url) => {
            const scraper = OutreachScrapingFactory.createScraper(url, options);
            return await scraper.scrape(url, options);
        },
        { concurrency }
    );

    return results;
}

// Usage
const urls = [
    'https://linkedin.com/in/user1',
    'https://linkedin.com/in/user2',
    'https://example.com/contact'
];

const results = await scrapeMultipleUrls(urls, options);
results.forEach(result => {
    console.log(`${result.url}: ${result.contacts.length} contacts`);
});
```

### Example 3: Custom Scraper Implementation

```typescript
/**
 * Custom scraper for specific platform
 */
export class MyPlatformScraper extends BaseWebScraper {
    getName(): string {
        return "myplatform";
    }

    validateUrl(url: string): boolean {
        return url.includes('myplatform.com');
    }

    async navigateToPage(url: string): Promise<boolean> {
        if (!this.page) return false;

        await this.page.goto(url, { waitUntil: 'networkidle2' });
        await this.simulateHumanBehavior();
        return true;
    }

    async scrapeContactInfo(): Promise<ContactInfo[]> {
        if (!this.page) return [];

        // Custom extraction logic for myplatform.com
        const contacts = await this.page.evaluate(() => {
            const items = document.querySelectorAll('.contact-card');
            return Array.from(items).map(card => ({
                email: card.querySelector('.email')?.textContent || '',
                name: card.querySelector('.name')?.textContent || '',
                websiteUrl: card.querySelector('.website')?.textContent || ''
            }));
        });

        return contacts.map(c => ({
            ...c,
            sourceUrl: this.page.url(),
            scrapedAt: Date.now()
        }));
    }
}

// Register custom scraper
OutreachScrapingFactory.registerScraper('myplatform', MyPlatformScraper);
```
