# Outreach Strategy Interface Contracts

**Purpose**: Define Strategy pattern interface for different outreach methods (email, comments, direct messages).
**Location**: `src/strategy/OutreachStrategy.ts`

---

## Core Strategy Interface

```typescript
/**
 * Main outreach strategy interface
 * All outreach methods (email, comments, direct messages) must implement this interface
 */
export interface OutreachStrategy {
    /**
     * Send outreach message to target using the strategy's method
     * @param target - Outreach target (contact, URL, etc.)
     * @param message - AI-generated message content
     * @param options - Strategy-specific options
     * @returns Outreach result with status and metadata
     */
    send(target: OutreachTarget, message: string, options: OutreachOptions): Promise<OutreachResult>;

    /**
     * Validate if target is supported by this strategy
     * @param target - Outreach target to validate
     * @returns true if strategy can handle this target
     */
    validateTarget(target: OutreachTarget): boolean;

    /**
     * Get unique name/identifier for this strategy
     * @returns Strategy name (e.g., "email", "comment", "direct-message")
     */
    getName(): OutreachMethod;

    /**
     * Get supported target types for this strategy
     * @returns Array of supported target types
     */
    getSupportedTargets?(): OutreachTargetType[];
}
```

---

## Type Definitions

### Outreach Methods

```typescript
/**
 * Supported outreach methods
 */
export type OutreachMethod =
    | 'email'           // Email outreach
    | 'comment'         // Website comment posting
    | 'direct-message';  // Direct messaging / contact forms
```

### Target Types

```typescript
/**
 * Target types for outreach
 */
export type OutreachTargetType =
    | 'email-address'
    | 'website-url'
    | 'contact-form'
    | 'social-media-profile'
    | 'blog-post'
    | 'forum-thread';
```

### Outreach Target

```typescript
/**
 * Unified outreach target structure
 */
export interface OutreachTarget {
    /**
     * Target type
     */
    type: OutreachTargetType;

    /**
     * Target identifier (email, URL, profile ID, etc.)
     */
    identifier: string;

    /**
     * Target name (if available)
     */
    name?: string;

    /**
     * Website/platform URL
     */
    url?: string;

    /**
     * Additional metadata
     */
    metadata?: Record<string, any>;
}
```

### Outreach Options

```typescript
/**
 * Outreach options (strategy-specific)
 */
export interface OutreachOptions {
    /**
     * Delay between sends (milliseconds)
     */
    delayMs?: number;

    /**
     * Maximum retry attempts
     */
    maxRetries?: number;

    /**
     * Use proxy for posting
     */
    useProxy?: boolean;

    /**
     * Account credentials (for platform-specific posting)
     */
    credentials?: AccountCredentials;

    /**
     * Strategy-specific options
     */
    strategyOptions?: Record<string, any>;
}
```

### Account Credentials

```typescript
/**
 * Account credentials for authenticated posting
 */
export interface AccountCredentials {
    /**
     * Platform identifier (e.g., "wordpress", "linkedin", "twitter")
     */
    platform: string;

    /**
     * Username/email
     */
    username: string;

    /**
     * Password or auth token
     */
    password?: string;

    /**
     * API token (if using API instead of login)
     */
    apiToken?: string;

    /**
     * Session cookies (for already authenticated sessions)
     */
    cookies?: any[];
}
```

### Outreach Result

```typescript
/**
 * Result of outreach operation
 */
export interface OutreachResult {
    /**
     * Success status
     */
    success: boolean;

    /**
     * Target identifier
     */
    target: string;

    /**
     * Outreach method used
     */
    method: OutreachMethod;

    /**
     * Posted/sent message content
     */
    message: string;

    /**
     * Response URL (for comments, posts)
     */
    responseUrl?: string;

    /**
     * Post/message ID
     */
    postId?: string;

    /**
     * Error message if failed
     */
    error?: string;

    /**
     * Error type
     */
    errorType?: OutreachErrorType;

    /**
     * Timestamp
     */
    timestamp: number;

    /**
     * Additional metadata
     */
    metadata?: OutreachResultMetadata;
}
```

### Error Types

```typescript
/**
 * Outreach error types
 */
export type OutreachErrorType =
    | 'AUTHENTICATION_FAILED'
    | 'RATE_LIMITED'
    | 'BLOCKED'
    | 'CAPTCHA_REQUIRED'
    | 'INVALID_TARGET'
    | 'NETWORK_ERROR'
    | 'PLATFORM_ERROR'
    | 'MESSAGE_TOO_LONG'
    | 'MODERATION_FAILED'
    | 'UNKNOWN';
```

### Result Metadata

```typescript
/**
 * Additional result metadata
 */
export interface OutreachResultMetadata {
    /**
     * Time taken to send (milliseconds)
     */
    duration?: number;

    /**
     * Retry count
     */
    retryCount?: number;

    /**
     * Platform-specific response data
     */
    platformResponse?: any;

    /**
     * Whether message was queued for later sending
     */
    queued?: boolean;
}
```

---

## Abstract Base Class

```typescript
/**
 * Abstract base class providing common outreach functionality
 * All outreach strategies should extend this class
 */
export abstract class BaseOutreachStrategy implements OutreachStrategy {
    protected options: OutreachOptions;
    protected browser?: import('puppeteer').Browser;
    protected page?: import('puppeteer').Page;

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
            return this.createErrorResult(target, 'UNKNOWN', error.message);
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
```

---

## Concrete Implementations

### 1. Email Outreach Strategy

```typescript
/**
 * Email outreach strategy implementation
 * Sends personalized emails to contacts
 */
export class EmailOutreachStrategy extends BaseOutreachStrategy {
    getName(): OutreachMethod {
        return 'email';
    }

    validateTarget(target: OutreachTarget): boolean {
        return target.type === 'email-address' && this.isValidEmail(target.identifier);
    }

    getSupportedTargets(): OutreachTargetType[] {
        return ['email-address'];
    }

    protected async authenticate(credentials: AccountCredentials): Promise<boolean> {
        // Uses existing email infrastructure from src/buckEmail.ts
        // Email credentials already configured in app
        return true;
    }

    async performSend(target: OutreachTarget, message: string): Promise<OutreachResult> {
        try {
            // Use existing email sending infrastructure
            const emailService = require('../modules/email').EmailService;

            await emailService.send({
                to: target.identifier,
                subject: this.extractSubject(message),
                body: message
            });

            return {
                success: true,
                target: target.identifier,
                method: 'email',
                message,
                timestamp: Date.now()
            };

        } catch (error) {
            throw new Error(`Email send failed: ${error.message}`);
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private extractSubject(message: string): string {
        // Extract subject from message or use default
        const lines = message.split('\n');
        return lines[0].substring(0, 100);
    }
}
```

### 2. Comment Outreach Strategy

```typescript
/**
 * Website comment posting strategy
 * Posts AI-generated comments on blogs, articles, forums
 */
export class CommentOutreachStrategy extends BaseOutreachStrategy {
    getName(): OutreachMethod {
        return 'comment';
    }

    validateTarget(target: OutreachTarget): boolean {
        return target.type === 'blog-post' || target.type === 'website-url';
    }

    getSupportedTargets(): OutreachTargetType[] {
        return ['blog-post', 'website-url', 'forum-thread'];
    }

    protected async initialize(): Promise<void> {
        // Initialize browser for comment posting
        const puppeteer = require('rebrowser-puppeteer');
        const stealth = require('puppeteer-extra-plugin-stealth')();

        const extra = puppeteer.default;
        extra.use(stealth);

        this.browser = await extra.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        this.page = await this.browser.newPage();
        await this.setupStealthMode();
    }

    protected async setupStealthMode(): Promise<void> {
        if (!this.page) return;

        // Anti-detection setup
        await this.page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        );

        await this.page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
        });
    }

    protected async authenticate(credentials: AccountCredentials): Promise<boolean> {
        if (!this.page || !credentials) return false;

        try {
            // Platform-specific login (WordPress, Disqus, etc.)
            await this.page.goto(`${credentials.platform}/login`, { waitUntil: 'networkidle2' });

            await this.page.type('#username', credentials.username);
            await this.page.type('#password', credentials.password || '');
            await this.page.click('button[type="submit"]');

            await this.page.waitForNavigation({ waitUntil: 'networkidle2' });

            return true;
        } catch (error) {
            return false;
        }
    }

    async performSend(target: OutreachTarget, message: string): Promise<OutreachResult> {
        if (!this.page) throw new Error('Page not initialized');

        try {
            // Navigate to target URL
            await this.page.goto(target.url, { waitUntil: 'networkidle2' });

            // Detect comment system and post accordingly
            const commentSystem = await this.detectCommentSystem();

            const postId = await this.postComment(commentSystem, message);

            return {
                success: true,
                target: target.identifier,
                method: 'comment',
                message,
                responseUrl: target.url,
                postId,
                timestamp: Date.now(),
                metadata: {
                    platform: commentSystem
                }
            };

        } catch (error) {
            throw new Error(`Comment post failed: ${error.message}`);
        }
    }

    /**
     * Detect which comment system is used
     */
    private async detectCommentSystem(): Promise<string> {
        if (!this.page) return 'unknown';

        const hasWordPress = await this.page.$('textarea[name="comment"], #comment');
        const hasDisqus = await this.page.$('#disqus_thread');
        const hasFacebook = await this.page.$('.fb-comments');

        if (hasWordPress) return 'wordpress';
        if (hasDisqus) return 'disqus';
        if (hasFacebook) return 'facebook';

        return 'generic';
    }

    /**
     * Post comment using detected system
     */
    private async postComment(system: string, message: string): Promise<string> {
        if (!this.page) throw new Error('Page not initialized');

        switch (system) {
            case 'wordpress':
                return await this.postWordPressComment(message);
            case 'disqus':
                return await this.postDisqusComment(message);
            default:
                return await this.postGenericComment(message);
        }
    }

    private async postWordPressComment(message: string): Promise<string> {
        if (!this.page) throw new Error('Page not initialized');

        // Find comment textarea
        const textarea = await this.page.$('textarea[name="comment"], #comment');
        if (!textarea) throw new Error('Comment form not found');

        // Type message
        await this.page.type('textarea[name="comment"], #comment', message);

        // Submit comment
        await this.page.click('input[type="submit"], #submit');
        await this.page.waitForNavigation({ waitUntil: 'networkidle2' });

        // Return comment ID or URL
        return this.page.url();
    }

    private async postDisqusComment(message: string): Promise<string> {
        // Disqus-specific implementation
        // ...
        return 'disqus-comment-id';
    }

    private async postGenericComment(message: string): Promise<string> {
        // Generic comment posting
        // ...
        return 'generic-comment-id';
    }
}
```

### 3. Direct Message Outreach Strategy

```typescript
/**
 * Direct message / contact form strategy
 * Sends messages via website contact forms or platform messaging
 */
export class DirectMessageOutreachStrategy extends BaseOutreachStrategy {
    getName(): OutreachMethod {
        return 'direct-message';
    }

    validateTarget(target: OutreachTarget): boolean {
        return target.type === 'contact-form' ||
               target.type === 'social-media-profile' ||
               target.type === 'website-url';
    }

    getSupportedTargets(): OutreachTargetType[] {
        return ['contact-form', 'social-media-profile', 'website-url'];
    }

    protected async initialize(): Promise<void> {
        // Initialize browser for form submission
        const puppeteer = require('rebrowser-puppeteer');
        this.browser = await puppeteer.launch({ headless: 'new' });
        this.page = await this.browser.newPage();
    }

    async performSend(target: OutreachTarget, message: string): Promise<OutreachResult> {
        if (!this.page) throw new Error('Page not initialized');

        try {
            // Navigate to target
            await this.page.goto(target.url, { waitUntil: 'networkidle2' });

            // Detect form type
            const formType = await this.detectFormType();

            // Fill and submit form
            await this.fillAndSubmitForm(formType, target, message);

            return {
                success: true,
                target: target.identifier,
                method: 'direct-message',
                message,
                responseUrl: target.url,
                timestamp: Date.now(),
                metadata: {
                    formType
                }
            };

        } catch (error) {
            throw new Error(`Direct message failed: ${error.message}`);
        }
    }

    private async detectFormType(): Promise<string> {
        if (!this.page) return 'unknown';

        const hasContactForm = await this.page.$('form[action*="contact"], .contact-form');
        const hasLinkedInMessage = await this.page.$('.msg-form');
        const hasTwitterMessage = await this.page.$('[data-testid="tweetTextarea"]');

        if (hasContactForm) return 'contact-form';
        if (hasLinkedInMessage) return 'linkedin';
        if (hasTwitterMessage) return 'twitter';

        return 'generic';
    }

    private async fillAndSubmitForm(
        formType: string,
        target: OutreachTarget,
        message: string
    ): Promise<void> {
        if (!this.page) return;

        switch (formType) {
            case 'contact-form':
                await this.fillContactForm(target, message);
                break;
            case 'linkedin':
                await this.fillLinkedInForm(target, message);
                break;
            case 'twitter':
                await this.fillTwitterForm(target, message);
                break;
        }
    }

    private async fillContactForm(target: OutreachTarget, message: string): Promise<void> {
        if (!this.page) return;

        // Find and fill name field
        const nameField = await this.page.$('input[name="name"], #name, .name-field');
        if (nameField && target.name) {
            await this.page.type('input[name="name"], #name, .name-field', target.name);
        }

        // Find and fill message field
        const messageField = await this.page.$('textarea[name="message"], #message, textarea');
        if (messageField) {
            await this.page.type('textarea[name="message"], #message, textarea', message);
        }

        // Submit form
        const submitButton = await this.page$('button[type="submit"], input[type="submit"]');
        if (submitButton) {
            await submitButton.click();
        }
    }

    private async fillLinkedInForm(target: OutreachTarget, message: string): Promise<void> {
        // LinkedIn-specific message form filling
        // ...
    }

    private async fillTwitterForm(target: OutreachTarget, message: string): Promise<void> {
        // Twitter/X-specific message/direct tweet
        // ...
    }
}
```

---

## Factory Pattern

```typescript
/**
 * Factory for creating appropriate outreach strategy
 */
export class OutreachStrategyFactory {
    private static strategies: Map<OutreachMethod, new (options?: OutreachOptions) => BaseOutreachStrategy> = new Map([
        ['email', EmailOutreachStrategy],
        ['comment', CommentOutreachStrategy],
        ['direct-message', DirectMessageOutreachStrategy]
    ]);

    /**
     * Create strategy instance by method
     */
    static createStrategy(
        method: OutreachMethod,
        options?: OutreachOptions
    ): BaseOutreachStrategy {
        const StrategyClass = this.strategies.get(method);
        if (!StrategyClass) {
            throw new Error(`Unknown outreach method: ${method}`);
        }
        return new StrategyClass(options);
    }

    /**
     * Auto-select strategy based on target
     */
    static selectStrategyForTarget(
        target: OutreachTarget,
        options?: OutreachOptions
    ): BaseOutreachStrategy {
        // Check each strategy's supported targets
        for (const [method, StrategyClass] of this.strategies) {
            const strategy = new StrategyClass(options);
            if (strategy.validateTarget(target)) {
                return strategy;
            }
        }

        // Default to comment strategy for websites
        if (target.type === 'website-url' || target.type === 'blog-post') {
            return new CommentOutreachStrategy(options);
        }

        throw new Error('No suitable strategy found for target');
    }

    /**
     * Register custom strategy
     */
    static registerStrategy(
        method: OutreachMethod,
        strategyClass: new (options?: OutreachOptions) => BaseOutreachStrategy
    ): void {
        this.strategies.set(method, strategyClass);
    }

    /**
     * Get all available strategies
     */
    static getAvailableMethods(): OutreachMethod[] {
        return Array.from(this.strategies.keys());
    }
}
```

---

## Usage Examples

### Example 1: Email Outreach

```typescript
// In src/modules/outreach/OutreachManager.ts

const strategy = OutreachStrategyFactory.createStrategy('email', {
    delayMs: 2000,  // 2 seconds between emails
    maxRetries: 3
});

const target: OutreachTarget = {
    type: 'email-address',
    identifier: 'john@example.com',
    name: 'John Doe'
};

const message = 'Hi John, I came across your website and wanted to reach out...';

const result = await strategy.send(target, message);

if (result.success) {
    console.log('Email sent successfully');
} else {
    console.error('Email failed:', result.error);
}
```

### Example 2: Comment Posting

```typescript
// In src/childprocess/outreachPoster.ts

const strategy = OutreachStrategyFactory.createStrategy('comment', {
    credentials: {
        platform: 'wordpress',
        username: 'myuser',
        password: 'mypass'
    },
    useProxy: true
});

const target: OutreachTarget = {
    type: 'blog-post',
    identifier: 'blog-post-123',
    url: 'https://example.com/blog/post-123'
};

const message = 'Great article! I really enjoyed reading about...';

const result = await strategy.send(target, message);

if (result.success) {
    console.log('Comment posted:', result.responseUrl);
    console.log('Post ID:', result.postId);
}
```

### Example 3: Direct Message via Contact Form

```typescript
// Auto-select strategy based on target type

const target: OutreachTarget = {
    type: 'contact-form',
    identifier: 'contact-form-1',
    url: 'https://example.com/contact',
    name: 'John Doe'
};

const strategy = OutreachStrategyFactory.selectStrategyForTarget(target);

const message = 'Hi, I wanted to inquire about...';

const result = await strategy.send(target, message);

if (result.success) {
    console.log('Message sent via contact form');
}
```

### Example 4: Batch Outreach with Multiple Methods

```typescript
// In campaign execution

const contacts = await getContactsForCampaign(campaignId);

for (const contact of contacts) {
    // Determine best outreach method
    let target: OutreachTarget;
    let method: OutreachMethod;

    if (contact.email) {
        // Email outreach
        target = {
            type: 'email-address',
            identifier: contact.email,
            name: contact.name
        };
        method = 'email';
    } else if (contact.website_url) {
        // Comment posting or direct message
        target = {
            type: 'website-url',
            identifier: contact.website_url,
            url: contact.website_url
        };
        method = 'comment';
    }

    // Create strategy and send
    const strategy = OutreachStrategyFactory.createStrategy(method);
    const result = await strategy.send(target, generatedMessage);

    // Update contact status
    await updateContactStatus(contact.id, result.success ? 'sent' : 'failed');

    // Rate limiting
    await sleep(2000);
}
```
