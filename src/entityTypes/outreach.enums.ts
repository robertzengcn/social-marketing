/**
 * Contact status enumeration
 * Tracks the progression of a contact through the outreach workflow
 */
export enum ContactStatus {
    PENDING = 0,
    MESSAGE_GENERATED = 1,
    SENT = 2,
    FAILED = 3
}

/**
 * Scraping task status enumeration
 * Tracks the lifecycle of a scraping task
 */
export enum ScrapingTaskStatus {
    PENDING = 0,
    RUNNING = 1,
    COMPLETED = 2,
    FAILED = 3
}

/**
 * Outreach campaign status enumeration
 * Tracks the lifecycle of an outreach campaign
 */
export enum CampaignStatus {
    PREPARING = 0,
    SENDING = 1,
    COMPLETED = 2,
    PAUSED = 3,
    FAILED = 4
}

/**
 * Scraping log status enumeration
 * Tracks the result of individual scraping operations
 */
export enum ScrapingLogStatus {
    SUCCESS = 'success',
    ERROR = 'error',
    BLOCKED = 'blocked',
    CAPTCHA_DETECTED = 'captcha_detected'
}

/**
 * Scraping error type enumeration
 * Categorizes different types of scraping failures
 */
export enum ScrapingErrorType {
    NAVIGATION_FAILED = 'NAVIGATION_FAILED',
    BLOCKED = 'BLOCKED',
    CAPTCHA_DETECTED = 'CAPTCHA_DETECTED',
    TIMEOUT = 'TIMEOUT',
    UNKNOWN = 'UNKNOWN'
}

/**
 * Helper function to get display label for contact status
 */
export function getContactStatusLabel(status: ContactStatus): string {
    const labels = {
        [ContactStatus.PENDING]: 'Pending',
        [ContactStatus.MESSAGE_GENERATED]: 'Message Generated',
        [ContactStatus.SENT]: 'Sent',
        [ContactStatus.FAILED]: 'Failed'
    };
    return labels[status] || 'Unknown';
}

/**
 * Helper function to get display label for task status
 */
export function getTaskStatusLabel(status: ScrapingTaskStatus): string {
    const labels = {
        [ScrapingTaskStatus.PENDING]: 'Pending',
        [ScrapingTaskStatus.RUNNING]: 'Running',
        [ScrapingTaskStatus.COMPLETED]: 'Completed',
        [ScrapingTaskStatus.FAILED]: 'Failed'
    };
    return labels[status] || 'Unknown';
}

/**
 * Helper function to get display label for campaign status
 */
export function getCampaignStatusLabel(status: CampaignStatus): string {
    const labels = {
        [CampaignStatus.PREPARING]: 'Preparing',
        [CampaignStatus.SENDING]: 'Sending',
        [CampaignStatus.COMPLETED]: 'Completed',
        [CampaignStatus.PAUSED]: 'Paused',
        [CampaignStatus.FAILED]: 'Failed'
    };
    return labels[status] || 'Unknown';
}
