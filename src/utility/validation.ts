/**
 * URL validation utilities for web scraping and outreach
 * Provides security-focused validation to prevent malicious URL injection
 */

/**
 * Default list of allowed protocols for web scraping
 */
export const ALLOWED_PROTOCOLS = ['http:', 'https:'];

/**
 * Default list of blocked domains (can be extended for security)
 */
export const BLOCKED_DOMAINS = [
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    '[::1]', // IPv6 localhost
];

/**
 * Maximum URL length to prevent DoS attacks
 */
export const MAX_URL_LENGTH = 2048;

/**
 * TLD whitelist for common legitimate domains
 * This helps filter out suspicious URLs
 */
export const COMMON_TLDS = [
    'com', 'org', 'net', 'edu', 'gov', 'mil', 'int',
    'io', 'co', 'ai', 'app', 'dev', 'tech', 'xyz',
    'biz', 'info', 'name', 'pro', 'aero', 'asia', 'cat',
    'coop', 'jobs', 'mobi', 'museum', 'tel', 'travel',
    'arpa', 'root', 'berlin', 'london', 'nyc', 'tokyo'
];

/**
 * Validate if a URL is safe for scraping
 * Performs security checks to prevent malicious URL injection
 *
 * @param url - URL to validate
 * @param options - Validation options
 * @returns true if URL is safe, false otherwise
 */
export function validateUrl(
    url: string,
    options: {
        allowedProtocols?: string[];
        blockedDomains?: string[];
        maxLength?: number;
        checkTld?: boolean;
    } = {}
): boolean {
    const {
        allowedProtocols = ALLOWED_PROTOCOLS,
        blockedDomains = BLOCKED_DOMAINS,
        maxLength = MAX_URL_LENGTH,
        checkTld = true
    } = options;

    // Basic type and length checks
    if (!url || typeof url !== 'string') {
        return false;
    }

    if (url.length > maxLength) {
        return false;
    }

    if (url.length < 8) { // Minimum: "http://a.co"
        return false;
    }

    try {
        const parsedUrl = new URL(url);

        // Protocol check
        if (!allowedProtocols.includes(parsedUrl.protocol)) {
            return false;
        }

        // Blocked domain check (security)
        const hostname = parsedUrl.hostname.toLowerCase();
        for (const blocked of blockedDomains) {
            if (hostname === blocked || hostname.endsWith(`.${blocked}`)) {
                return false;
            }
        }

        // TLD validation
        if (checkTld) {
            const tld = hostname.split('.').pop();
            if (!tld || !COMMON_TLDS.includes(tld?.toLowerCase() ?? '')) {
                // Allow internationalized domain names (IDN) and country codes
                if (!/^[a-z]{2,}$/.test(tld ?? '') && !/^[a-z]{2}\.[a-z]{2}$/.test(tld ?? '')) {
                    return false;
                }
            }
        }

        // Prevent private/internal network access
        if (isPrivateOrLocalNetwork(hostname)) {
            return false;
        }

        // Check for suspicious patterns in path
        if (hasSuspiciousPatterns(url)) {
            return false;
        }

        return true;
    } catch (error) {
        // Invalid URL format
        return false;
    }
}

/**
 * Check if hostname is a private or local network address
 */
function isPrivateOrLocalNetwork(hostname: string): boolean {
    // IPv4 private networks
    const ipv4Private = [
        /^10\./,
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
        /^192\.168\./,
        /^127\./,
        /^169\.254\./ // Link-local
    ];

    // IPv6 private networks
    const ipv6Private = [
        /^::1$/,
        /^fe80:/i, // Link-local
        /^fc00:/i, // Unique local
        /^fd/i // Unique local
    ];

    for (const pattern of ipv4Private) {
        if (pattern.test(hostname)) {
            return true;
        }
    }

    for (const pattern of ipv6Private) {
        if (pattern.test(hostname)) {
            return true;
        }
    }

    return false;
}

/**
 * Check for suspicious patterns in URL that may indicate attacks
 */
function hasSuspiciousPatterns(url: string): boolean {
    const suspiciousPatterns = [
        /\.\./, // Path traversal attempt
        /%2e%2e/i, // Encoded path traversal
        /<script>/i, // XSS attempt
        /javascript:/i, // JavaScript protocol
        /data:/i, // Data protocol (unless checking for data URIs specifically)
        /file:/i, // File protocol
        /ftp:/i, // FTP protocol
        /@.*@/, // Double @ (credentials injection attempt)
    ];

    return suspiciousPatterns.some(pattern => pattern.test(url));
}

/**
 * Validate and parse target URLs JSON string
 * Ensures all URLs are safe before scraping
 *
 * @param urlsJson - JSON string containing array of URLs
 * @param options - Validation options
 * @returns Array of validated URLs or empty array if invalid
 */
export function validateTargetUrls(
    urlsJson: string,
    options?: Parameters<typeof validateUrl>[1]
): string[] {
    try {
        const urls = JSON.parse(urlsJson);

        if (!Array.isArray(urls)) {
            return [];
        }

        // Validate each URL and filter out invalid ones
        const validUrls = urls.filter(url => validateUrl(url, options));

        return validUrls;
    } catch (error) {
        return [];
    }
}

/**
 * Normalize URL for consistent comparison
 * Removes trailing slashes, converts to lowercase, etc.
 */
export function normalizeUrl(url: string): string {
    try {
        const parsed = new URL(url);
        // Remove trailing slash from path
        const path = parsed.pathname.endsWith('/')
            ? parsed.pathname.slice(0, -1)
            : parsed.pathname;

        // Reconstruct URL
        return `${parsed.protocol}//${parsed.host.toLowerCase()}${path}`;
    } catch {
        return url;
    }
}

/**
 * Check if two URLs are from the same domain
 * Useful for excluding internal links during scraping
 */
export function isSameDomain(url1: string, url2: string): boolean {
    try {
        const u1 = new URL(url1);
        const u2 = new URL(url2);
        return u1.hostname === u2.hostname;
    } catch {
        return false;
    }
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string | null {
    try {
        const parsed = new URL(url);
        return parsed.hostname;
    } catch {
        return null;
    }
}
