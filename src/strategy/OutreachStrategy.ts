/**
 * Main outreach strategy interface
 * All outreach methods (email, comments, direct messages) must implement this interface
 */
export interface OutreachStrategy {
    /**
     * Send outreach message to target using strategy's method
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

/**
 * Supported outreach methods
 */
export type OutreachMethod =
    | 'email'           // Email outreach
    | 'comment'         // Website comment posting
    | 'direct-message';  // Direct messaging / contact forms

/**
 * Target types for outreach
 */
export type OutreachTargetType =
    | 'email-address'          // For email outreach
    | 'website-url'           // For comment posting
    | 'contact-form'          // For contact form submission
    | 'social-media-profile'   // For social media messaging
    | 'blog-post'             // For blog comment posting
    | 'forum-thread';          // For forum comment posting

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
