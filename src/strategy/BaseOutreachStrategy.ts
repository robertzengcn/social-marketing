import puppeteer, { Browser, Page } from 'puppeteer';
import stealth from 'puppeteer-extra-plugin-stealth';
import { OutreachStrategy, OutreachTarget, OutreachOptions, OutreachResult, OutreachErrorType, AccountCredentials, OutreachMethod } from './OutreachStrategy';

/**
 * Abstract base class providing common outreach functionality
 * All outreach strategies should extend this class
 */
export abstract class BaseOutreachStrategy implements OutreachStrategy {
    protected options: OutreachOptions;
    protected browser?: Browser;
    protected page?: Page;

    constructor(options: OutreachOptions = {}) {
        this.options = options;
    }

    /**
     * Main send method (template method pattern)
     * Implements common workflow while allowing customization
     */
    async send(target: OutreachTarget, message: string, options: OutreachOptions): Promise<OutreachResult> {
        const startTime = Date.now();
        this.options = { ...this.options, ...options };

        try {
            // 1. Validate target
            if (!this.validateTarget(target)) {
                return this.createErrorResult(target, 'INVALID_TARGET', 'Target not supported by this strategy');
            }

            // 2. Initialize (browser, session, etc.)
            await this.initialize();

            // 3. Authenticate if needed
            if (this.options.credentials) {
                const authSuccess = await this.authenticate(this.options.credentials);
                if (!authSuccess) {
                    await this.cleanup();
                    return this.createErrorResult(target, 'AUTHENTICATION_FAILED', 'Authentication failed');
                }
            }

            // 4. Perform actual send (strategy-specific)
            const result = await this.performSend(target, message);

            // 5. Clean up resources
            await this.cleanup();

            const duration = Date.now() - startTime;
            result.metadata = { ...result.metadata, duration };

            return result;

        } catch (error) {
            await this.cleanup();
            return this.createErrorResult(target, 'UNKNOWN', (error as Error).message);
        }
    }

    /**
     * Initialize resources (browser, HTTP client, etc.)
     * Common implementation - can be overridden
     */
    protected async initialize(): Promise<void> {
        // Override in subclass if needed
    }

    /**
     * Authenticate with platform
     * Common implementation - can be overridden
     */
    protected async authenticate(credentials: AccountCredentials): Promise<boolean> {
        // Override in subclass to implement platform-specific auth
        return true;
    }

    /**
     * Clean up resources
     */
    protected async cleanup(): Promise<void> {
        if (this.page) {
            await this.page.close();
            this.page = undefined;
        }
        if (this.browser) {
            await this.browser.close();
            this.browser = undefined;
        }
    }

    /**
     * Create error result
     */
    protected createErrorResult(
        target: OutreachTarget,
        errorType: OutreachErrorType,
        errorMessage: string
    ): OutreachResult {
        return {
            success: false,
            target: target.identifier,
            method: this.getName(),
            message: '',
            error: errorMessage,
            errorType,
            timestamp: Date.now()
        };
    }

    // ==================== ABSTRACT METHODS ====================

    /**
     * Validate if target is supported
     */
    abstract validateTarget(target: OutreachTarget): boolean;

    /**
     * Perform actual send operation (strategy-specific)
     */
    abstract performSend(target: OutreachTarget, message: string): Promise<OutreachResult>;

    /**
     * Get strategy name
     */
    abstract getName(): OutreachMethod;
}
