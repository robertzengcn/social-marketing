# Outreach IPC Handler Contracts

**Purpose**: Define IPC communication interfaces between renderer and main process for outreach features.
**Pattern**: Follows existing IPC patterns in `src/main-process/communication/`

---

## IPC Channel Names

```typescript
// Scraping Task Channels
export const OUTREACH_SCRAPER_START = 'outreach-scraper-start';
export const OUTREACH_SCRAPER_STOP = 'outreach-scraper-stop';
export const OUTREACH_SCRAPER_PROGRESS = 'outreach-scraper-progress';
export const OUTREACH_SCRAPER_STATUS = 'outreach-scraper-status';

// Contact Management Channels
export const OUTREACH_CONTACT_LIST = 'outreach-contact-list';
export const OUTREACH_CONTACT_GET = 'outreach-contact-get';
export const OUTREACH_CONTACT_UPDATE = 'outreach-contact-update';
export const OUTREACH_CONTACT_DELETE = 'outreach-contact-delete';
export const OUTREACH_CONTACT_EXPORT = 'outreach-contact-export';

// Message Generation Channels
export const OUTREACH_MESSAGE_GENERATE = 'outreach-message-generate';
export const OUTREACH_MESSAGE_BATCH_GENERATE = 'outreach-message-batch-generate';
export const OUTREACH_MESSAGE_UPDATE = 'outreach-message-update';
export const OUTREACH_MESSAGE_REVIEW = 'outreach-message-review';

// Campaign Management Channels
export const OUTREACH_CAMPAIGN_CREATE = 'outreach-campaign-create';
export const OUTREACH_CAMPAIGN_SEND = 'outreach-campaign-send';
export const OUTREACH_CAMPAIGN_STATUS = 'outreach-campaign-status';
export const OUTREACH_CAMPAIGN_LIST = 'outreach-campaign-list';
```

---

## Request/Response Types

### Scraping Task Types

```typescript
/**
 * Request to start a scraping task
 */
export interface ScrapingTaskRequest {
    name: string;
    description?: string;
    targetUrls: string[];
    options: ScrapingOptions;
}

/**
 * Scraping configuration options
 */
export interface ScrapingOptions {
    aggressiveMode: boolean;      // 20+ requests/second, ignore robots.txt
    maxConcurrency: number;        // Concurrent scraping operations
    useProxy: boolean;             // Use proxy for requests
    delayMs: number;               // Delay between requests (0 for aggressive)
    maxPagesPerSite: number;        // Maximum pages to scrape per site
    followLinks: boolean;           // Follow internal links
    extractEmails: boolean;         // Extract email addresses
    extractUrls: boolean;           // Extract website URLs
}

/**
 * Scraping task response
 */
export interface ScrapingTaskResponse {
    success: boolean;
    taskId?: number;
    error?: string;
}

/**
 * Scraping progress update
 */
export interface ScrapingProgress {
    taskId: number;
    status: 'running' | 'completed' | 'failed';
    currentUrl: string;
    pagesProcessed: number;
    totalUrls: number;
    contactsFound: number;
    emailsFound: number;
    errors: ScrapingError[];
}

/**
 * Individual scraping error
 */
export interface ScrapingError {
    url: string;
    error: string;
    timestamp: number;
}

/**
 * Scraping task status query
 */
export interface ScrapingStatusRequest {
    taskId: number;
}

/**
 * Scraping task status response
 */
export interface ScrapingStatusResponse {
    taskId: number;
    name: string;
    status: number;                // 0: pending, 1: running, 2: completed, 3: failed
    targetUrls: string[];
    totalContacts: number;
    errorLog?: string;
    runtimeLog?: string;
    createdAt: string;
    updatedAt: string;
}
```

---

### Contact Management Types

```typescript
/**
 * Request to list contacts with filtering
 */
export interface ContactListRequest {
    taskId?: number;                // Filter by task
    campaignId?: number;            // Filter by campaign
    status?: number;                // Filter by status (0-3)
    limit?: number;                // Pagination limit
    offset?: number;               // Pagination offset
    search?: string;               // Search by email or name
}

/**
 * Contact list response
 */
export interface ContactListResponse {
    success: boolean;
    contacts: ContactDTO[];
    total: number;
}

/**
 * Contact data transfer object
 */
export interface ContactDTO {
    id: number;
    email: string;
    websiteUrl?: string;
    name?: string;
    sourceUrl: string;
    status: number;                // 0: pending, 1: message_generated, 2: sent, 3: failed
    taskId: number;
    campaignId?: number;
    message?: MessageDTO;
    createdAt: string;
    updatedAt: string;
}

/**
 * Request to get single contact
 */
export interface ContactGetRequest {
    contactId: number;
}

/**
 * Response for single contact
 */
export interface ContactGetResponse {
    success: boolean;
    contact?: ContactDTO;
    error?: string;
}

/**
 * Request to update contact
 */
export interface ContactUpdateRequest {
    contactId: number;
    email?: string;
    name?: string;
    status?: number;
}

/**
 * Request to delete contact(s)
 */
export interface ContactDeleteRequest {
    contactIds: number[];
}

/**
 * Request to export contacts
 */
export interface ContactExportRequest {
    taskIds?: number[];
    format: 'csv' | 'json';
    includeMessages?: boolean;
}

/**
 * Export response
 */
export interface ContactExportResponse {
    success: boolean;
    downloadPath?: string;
    error?: string;
}
```

---

### Message Generation Types

```typescript
/**
 * Request to generate message for single contact
 */
export interface MessageGenerateRequest {
    contactId: number;
    template?: string;             // Custom message template
    customPrompt?: string;         // Custom AI prompt
}

/**
 * AI message generation request (sent to remote AI server)
 */
export interface AIMessageRequest {
    contactEmail: string;
    contactName?: string;
    websiteUrl?: string;
    template?: string;
    customPrompt?: string;
}

/**
 * AI message generation response (from remote AI server)
 */
export interface AIMessageResponse {
    message: string;
    success: boolean;
    error?: string;
    metadata?: {
        model: string;
        tokens: number;
        timestamp: number;
    };
}

/**
 * Response for message generation
 */
export interface MessageGenerateResponse {
    success: boolean;
    messageId?: number;
    content?: string;
    error?: string;
}

/**
 * Request to generate messages for multiple contacts
 */
export interface MessageBatchGenerateRequest {
    contactIds: number[];
    template?: string;
    customPrompt?: string;
}

/**
 * Batch message generation response
 */
export interface MessageBatchGenerateResponse {
    success: boolean;
    results: BatchMessageResult[];
    summary: {
        total: number;
        succeeded: number;
        failed: number;
    };
}

/**
 * Individual batch result
 */
export interface BatchMessageResult {
    contactId: number;
    success: boolean;
    messageId?: number;
    error?: string;
}

/**
 * Request to update generated message
 */
export interface MessageUpdateRequest {
    messageId: number;
    content: string;                // User-edited content
}

/**
 * Response for message update
 */
export interface MessageUpdateResponse {
    success: boolean;
    error?: string;
}

/**
 * Request to mark message as reviewed
 */
export interface MessageReviewRequest {
    messageIds: number[];
    reviewed: boolean;
}

/**
 * Message data transfer object
 */
export interface MessageDTO {
    id: number;
    content: string;
    userEdited: boolean;
    reviewed: boolean;
    aiMetadata?: AIMetadata;
    contactId: number;
    createdAt: string;
    updatedAt: string;
}

/**
 * AI metadata
 */
export interface AIMetadata {
    model: string;
    tokens: number;
    timestamp: number;
}
```

---

### Campaign Management Types

```typescript
/**
 * Request to create campaign
 */
export interface CampaignCreateRequest {
    name: string;
    contactIds: number[];
}

/**
 * Campaign creation response
 */
export interface CampaignCreateResponse {
    success: boolean;
    campaignId?: number;
    error?: string;
}

/**
 * Request to start campaign sending
 */
export interface CampaignSendRequest {
    campaignId: number;
}

/**
 * Campaign send response
 */
export interface CampaignSendResponse {
    success: boolean;
    error?: string;
}

/**
 * Request to get campaign status
 */
export interface CampaignStatusRequest {
    campaignId: number;
}

/**
 * Campaign status response
 */
export interface CampaignStatusResponse {
    success: boolean;
    campaign?: CampaignDTO;
    error?: string;
}

/**
 * Request to list campaigns
 */
export interface CampaignListRequest {
    status?: number;               // Filter by status (0-3)
    limit?: number;
    offset?: number;
}

/**
 * Campaign list response
 */
export interface CampaignListResponse {
    success: boolean;
    campaigns: CampaignDTO[];
    total: number;
}

/**
 * Campaign data transfer object
 */
export interface CampaignDTO {
    id: number;
    name: string;
    status: number;                // 0: preparing, 1: sending, 2: completed, 3: failed
    totalContacts: number;
    sentCount: number;
    failedCount: number;
    errorLog?: string;
    createdAt: string;
    updatedAt: string;
    // Statistics
    successRate?: number;          // Calculated: sentCount / totalContacts
}
```

---

## IPC Handler Signatures

### Main Process IPC Handlers

```typescript
/**
 * Register all outreach IPC handlers
 * Called from src/main-process/communication/index.ts
 */
export function registerOutreachIpcHandlers(): void;

/**
 * Start scraping task handler
 */
ipcMain.on(OUTREACH_SCRAPER_START, async (event, arg: string) => {
    const request = JSON.parse(arg) as ScrapingTaskRequest;
    // ... process request
    event.sender.send(OUTREACH_SCRAPER_PROGRESS, JSON.stringify(progress));
});

/**
 * Stop scraping task handler
 */
ipcMain.on(OUTREACH_SCRAPER_STOP, async (event, arg: string) => {
    const request = JSON.parse(arg) as { taskId: number };
    // ... stop task
});

/**
 * Get scraping status handler
 */
ipcMain.handle(OUTREACH_SCRAPER_STATUS, async (event, arg: string) => {
    const request = JSON.parse(arg) as ScrapingStatusRequest;
    // ... return ScrapingStatusResponse
});
```

### Renderer Process IPC Calls (via preload.ts)

```typescript
/**
 * Preload API definitions (exposed via contextBridge)
 */
export interface OutreachAPI {
    // Scraping
    startScrapingTask(request: ScrapingTaskRequest): Promise<ScrapingTaskResponse>;
    stopScrapingTask(taskId: number): Promise<void>;
    getScrapingStatus(taskId: number): Promise<ScrapingStatusResponse>;
    onScrapingProgress(callback: (progress: ScrapingProgress) => void): void;

    // Contacts
    listContacts(request: ContactListRequest): Promise<ContactListResponse>;
    getContact(contactId: number): Promise<ContactGetResponse>;
    updateContact(request: ContactUpdateRequest): Promise<void>;
    deleteContacts(request: ContactDeleteRequest): Promise<void>;
    exportContacts(request: ContactExportRequest): Promise<ContactExportResponse>;

    // Messages
    generateMessage(request: MessageGenerateRequest): Promise<MessageGenerateResponse>;
    generateBatchMessages(request: MessageBatchGenerateRequest): Promise<MessageBatchGenerateResponse>;
    updateMessage(request: MessageUpdateRequest): Promise<MessageUpdateResponse>;
    reviewMessages(request: MessageReviewRequest): Promise<void>;

    // Campaigns
    createCampaign(request: CampaignCreateRequest): Promise<CampaignCreateResponse>;
    sendCampaign(campaignId: number): Promise<CampaignSendResponse>;
    getCampaignStatus(campaignId: number): Promise<CampaignStatusResponse>;
    listCampaigns(request: CampaignListRequest): Promise<CampaignListResponse>;
}
```

---

## ProcessMessage Types (Child Process Communication)

```typescript
/**
 * ProcessMessage for worker communication
 * Extends src/entityTypes/processMessage-type.ts
 */

// Actions sent to child process
export type OutreachWorkerAction =
    | 'outreach-scraping-start'
    | 'outreach-scraping-stop'
    | 'outreach-scraping-pause'
    | 'outreach-scraping-resume';

// Actions received from child process
export type OutreachWorkerResponse =
    | 'outreach-scraping-progress'
    | 'outreach-scraping-completed'
    | 'outreach-scraping-failed'
    | 'outreach-scraping-log';

/**
 * Worker message data types
 */
export interface ScrapingStartData {
    taskId: number;
    urls: string[];
    options: ScrapingOptions;
}

export interface ScrapingProgressData {
    taskId: number;
    currentUrl: string;
    pagesProcessed: number;
    contactsFound: number;
    status: 'running' | 'completed' | 'failed';
}

export interface ScrapingCompletedData {
    taskId: number;
    totalContacts: number;
    duration: number;
}

export interface ScrapingFailedData {
    taskId: number;
    error: string;
}

/**
 * ProcessMessage types for outreach
 */
export type OutreachProcessMessage =
    | ProcessMessage<ScrapingStartData>          // action: 'outreach-scraping-start'
    | ProcessMessage<ScrapingProgressData>       // action: 'outreach-scraping-progress'
    | ProcessMessage<ScrapingCompletedData>     // action: 'outreach-scraping-completed'
    | ProcessMessage<ScrapingFailedData>;       // action: 'outreach-scraping-failed'
```

---

## Event Emitters (Progress Updates)

```typescript
/**
 * Progress update events (sent via event.sender.send)
 */
export interface ScrapingProgressEvent {
    taskId: number;
    type: 'progress' | 'completed' | 'failed' | 'log';
    data: ScrapingProgressData | ScrapingCompletedData | ScrapingFailedData;
}

/**
 * Campaign progress event
 */
export interface CampaignProgressEvent {
    campaignId: number;
    type: 'started' | 'progress' | 'completed' | 'failed';
    sentCount: number;
    failedCount: number;
    totalContacts: number;
    currentEmail?: string;
}

/**
 * Message generation progress event
 */
export interface MessageGenProgressEvent {
    total: number;
    completed: number;
    failed: number;
    currentContactId?: number;
}
```

---

## Error Response Types

```typescript
/**
 * Standard error response for all IPC calls
 */
export interface ErrorResponse {
    success: false;
    error: string;
    errorCode?: string;
    details?: any;
}

/**
 * Common error codes
 */
export enum OutreachErrorCode {
    // Scraping errors
    INVALID_URL = 'INVALID_URL',
    SCRAPING_FAILED = 'SCRAPING_FAILED',
    BLOCKED_BY_SITE = 'BLOCKED_BY_SITE',
    CAPTCHA_DETECTED = 'CAPTCHA_DETECTED',

    // Contact errors
    CONTACT_NOT_FOUND = 'CONTACT_NOT_FOUND',
    DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
    INVALID_EMAIL = 'INVALID_EMAIL',

    // Message errors
    MESSAGE_GENERATION_FAILED = 'MESSAGE_GENERATION_FAILED',
    AI_SERVICE_UNAVAILABLE = 'AI_SERVICE_UNAVAILABLE',
    MESSAGE_TOO_SHORT = 'MESSAGE_TOO_SHORT',

    // Campaign errors
    CAMPAIGN_NOT_FOUND = 'CAMPAIGN_NOT_FOUND',
    EMAIL_SEND_FAILED = 'EMAIL_SEND_FAILED',
    INVALID_CAMPAIGN_STATUS = 'INVALID_CAMPAIGN_STATUS',

    // Generic errors
    DATABASE_ERROR = 'DATABASE_ERROR',
    NETWORK_ERROR = 'NETWORK_ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
}
```

---

## Usage Examples

### Example 1: Start Scraping Task

```typescript
// Renderer process (Vue component)
const { startScrapingTask, onScrapingProgress } = window.api.outreach;

// Start scraping
const request: ScrapingTaskRequest = {
    name: "LinkedIn Outreach",
    description: "Scrape LinkedIn profiles",
    targetUrls: [
        "https://linkedin.com/in/user1",
        "https://linkedin.com/in/user2"
    ],
    options: {
        aggressiveMode: true,
        maxConcurrency: 5,
        useProxy: true,
        delayMs: 0,
        maxPagesPerSite: 10,
        followLinks: false,
        extractEmails: true,
        extractUrls: true
    }
};

const response = await startScrapingTask(request);
console.log('Task started:', response.taskId);

// Listen to progress
onScrapingProgress((progress: ScrapingProgress) => {
    console.log(`Progress: ${progress.pagesProcessed}/${progress.totalUrls} pages`);
    console.log(`Contacts found: ${progress.contactsFound}`);
});
```

### Example 2: Generate Messages

```typescript
// Generate single message
const genRequest: MessageGenerateRequest = {
    contactId: 123,
    template: "Hi {{name}}, I came across your website {{websiteUrl}}..."
};

const genResponse = await generateMessage(genRequest);
if (genResponse.success) {
    console.log('Message generated:', genResponse.content);
}

// Generate batch messages
const batchRequest: MessageBatchGenerateRequest = {
    contactIds: [1, 2, 3, 4, 5],
    template: "Hi {{name}}, I noticed your work on {{websiteUrl}}..."
};

const batchResponse = await generateBatchMessages(batchRequest);
console.log(`Generated ${batchResponse.summary.succeeded}/${batchResponse.summary.total} messages`);
```

### Example 3: Send Campaign

```typescript
// Create campaign
const createRequest: CampaignCreateRequest = {
    name: "February Outreach",
    contactIds: [1, 2, 3, 4, 5]
};

const campaign = await createCampaign(createRequest);

// Send campaign
await sendCampaign(campaign.campaignId);

// Check status
const status = await getCampaignStatus(campaign.campaignId);
console.log(`Sent: ${status.campaign.sentCount}/${status.campaign.totalContacts}`);
console.log(`Success rate: ${status.campaign.successRate}%`);
```
