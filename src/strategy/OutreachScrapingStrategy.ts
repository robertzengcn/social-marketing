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

/**
 * Cookie parameter for authenticated scraping
 */
export interface CookieParam {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

/**
 * Scraping configuration options
 */
export interface ScrapingOptions {
  aggressiveMode: boolean; // High-speed scraping (20+ req/s)
  maxConcurrency: number; // Concurrent page operations
  useProxy: boolean; // Use proxy rotation
  delayMs: number; // Delay between requests
  maxPagesPerSite: number; // Page limit per site
  followLinks: boolean; // Follow internal links
  extractEmails: boolean; // Extract email addresses
  extractUrls: boolean; // Extract website URLs
  maxDepth?: number; // Link traversal depth (default: 1)
  userAgent?: string; // Custom user agent
  timeout?: number; // Page load timeout (ms)
  cookies?: CookieParam[]; // Cookies to set on the page for authenticated scraping
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
  sourceUrl: string; // URL where contact was found
  scrapedAt: number; // Timestamp
}

/**
 * Scraping metadata
 */
export interface ScrapingMetadata {
  scraperName: string;
  pagesProcessed: number;
  emailsFound: number;
  urlsFound: number;
  duration: number; // Duration in milliseconds
  timestamp: number; // Completion timestamp
  blocked?: boolean; // Whether scraping was blocked
  captchaDetected?: boolean;
}

/**
 * Scraping error information
 */
export interface ScrapingError {
  url: string;
  error: string;
  type:
    | "BLOCKED"
    | "CAPTCHA"
    | "TIMEOUT"
    | "INVALID_URL"
    | "EXTRACTION_ERROR"
    | "UNKNOWN";
  timestamp: number;
}
