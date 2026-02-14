# Research: AI-Powered User Outreach Automation

**Feature**: AI-Powered User Outreach Automation
**Date**: 2026-02-11
**Status**: Complete

## Overview

This document captures research findings and technical decisions for the AI outreach feature. All "NEEDS CLARIFICATION" items from the Technical Context have been resolved.

---

## 1. Extensible Web Scraping Architecture

### Decision: Strategy Pattern with Abstract Base Class

**Chosen Approach**: Implement a Strategy pattern with an abstract `BaseWebScraper` class that each website scraper inherits from, similar to the existing `VideoPublishStrategy` and `SearchScrape` patterns in the codebase.

**Rationale**:
- **Consistency with existing patterns**: The codebase already uses Strategy patterns for `VideoPublishStrategy` (YouTube, Bilibili, Baidu) and `SearchScrape` (Google, Bing, Baidu)
- **Extensibility**: New website scrapers can be added by creating a new class that extends `BaseWebScraper` and overrides specific methods
- **Code reuse**: Common scraping logic (browser initialization, proxy handling, anti-detection, error handling) lives in the base class
- **Polymorphism**: The main application can work with the abstract type, allowing runtime strategy selection via factory pattern

**Architecture**:

```typescript
// src/strategy/OutreachScrapingStrategy.ts
export interface OutreachScrapingStrategy {
    scrape(url: string, options: ScrapingOptions): Promise<ScrapingResult>;
    validateUrl(url: string): boolean;
    getName(): string;
}

// src/strategy/BaseWebScraper.ts
export abstract class BaseWebScraper implements OutreachScrapingStrategy {
    protected browser: Browser;
    protected page: Page;
    protected options: ScrapingOptions;

    // Common methods (implemented in base class)
    async initializeBrowser(): Promise<void> { /* ... */ }
    async setupStealthMode(): Promise<void> { /* ... */ }
    async extractEmails(html: string): Promise<string[]> { /* ... */ }
    async extractUrls(html: string): Promise<string[]> { /* ... */ }
    async handleAntiBotDetection(): Promise<boolean> { /* ... */ }

    // Abstract methods (must be overridden by subclasses)
    abstract validateUrl(url: string): boolean;
    abstract navigateToPage(url: string): Promise<boolean>;
    abstract scrapeContactInfo(): Promise<ContactInfo[]>;
    abstract getName(): string;
}

// src/strategy/GenericWebScraper.ts
export class GenericWebScraper extends BaseWebScraper {
    getName(): string { return "generic"; }

    validateUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    async navigateToPage(url: string): Promise<boolean> {
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        return true;
    }

    async scrapeContactInfo(): Promise<ContactInfo[]> {
        // Generic email/URL extraction logic
        const html = await this.page.content();
        const emails = await this.extractEmails(html);
        const urls = await this.extractUrls(html);
        return { emails, urls };
    }
}

// src/strategy/LinkedInScraper.ts (future extension)
export class LinkedInScraper extends BaseWebScraper {
    getName(): string { return "linkedin"; }

    validateUrl(url: string): boolean {
        return url.includes('linkedin.com');
    }

    async navigateToPage(url: string): Promise<boolean> {
        // LinkedIn-specific navigation with login
        await this.page.goto(url);
        await this.handleLinkedInLogin();
        return true;
    }

    async scrapeContactInfo(): Promise<ContactInfo[]> {
        // LinkedIn-specific extraction
        const profile = await this.extractLinkedInProfile();
        return [profile];
    }
}
```

**Factory Pattern**:

```typescript
// src/strategy/OutreachScrapingFactory.ts
export class OutreachScrapingFactory {
    static createScraper(url: string): BaseWebScraper {
        if (url.includes('linkedin.com')) {
            return new LinkedInScraper();
        }
        if (url.includes('twitter.com')) {
            return new TwitterScraper();
        }
        // Default to generic scraper
        return new GenericWebScraper();
    }
}
```

**Alternatives Considered**:
1. **Function-based approach**: Each scraper as a standalone function - Rejected because it doesn't provide enough structure or code reuse
2. **Composition over inheritance**: Use composable plugins - Rejected because it's more complex to maintain and doesn't match existing codebase patterns
3. **Single monolithic scraper**: All logic in one class with if/else for each site - Rejected because it's not extensible and becomes unmaintainable

---

## 2. Child Process Communication Pattern

### Decision: Use Existing ProcessMessage<T> Pattern

**Chosen Approach**: Follow the existing `ProcessMessage<T>` pattern defined in `src/entityTypes/processMessage-type.ts` for communication between main process and child scraping worker.

**Rationale**:
- **Consistency**: The entire codebase uses this pattern for worker communication (see `src/taskCode.ts`)
- **Type safety**: Generic `ProcessMessage<T>` provides type safety for data transfer
- **Proven**: The existing search scrapers, video downloads, and email tasks all use this pattern successfully

**Implementation Pattern**:

```typescript
// In src/entityTypes/processMessage-type.ts (existing)
export interface ProcessMessage<T> {
    action: string;
    data?: T;
}

// In src/main-process/communication/outreach-ipc.ts (main process)
ipcMain.on(OUTREACH_SCRAPER_START, async (event, arg) => {
    const requestData = JSON.parse(arg) as ScrapingTaskRequest;
    const message: ProcessMessage<ScrapingTaskRequest> = {
        action: "outreach-scraping-start",
        data: requestData
    };
    // Send to child process
    sendToWorker(message);
});

// In src/childprocess/outreachScraper.ts (child process)
process.parentPort.on('message', async (e) => {
    const pme = JSON.parse(e.data) as ProcessMessage<any>;
    switch (pme.action) {
        case "outreach-scraping-start": {
            const taskData = pme.data as ScrapingTaskRequest;
            const result = await performScraping(taskData);
            const response: ProcessMessage<ScrapingResult> = {
                action: "outreach-scraping-progress",
                data: result
            };
            process.parentPort.postMessage(JSON.stringify(response));
            break;
        }
    }
});
```

**Progress Updates**:

```typescript
// Send periodic progress updates to main process
async function performScraping(task: ScrapingTaskRequest): Promise<ScrapingResult> {
    const scraper = OutreachScrapingFactory.createScraper(task.url);

    // Send progress update
    sendProgress({
        action: "outreach-scraping-progress",
        data: {
            taskId: task.id,
            status: "running",
            pagesProcessed: 0,
            contactsFound: 0
        }
    });

    // Perform scraping...
    const contacts = await scraper.scrape(task.url, task.options);

    // Send final result
    return {
        taskId: task.id,
        status: "completed",
        contacts: contacts
    };
}

function sendProgress(message: ProcessMessage<ScrapingProgress>) {
    process.parentPort.postMessage(JSON.stringify(message));
}
```

---

## 3. Database Entity Design

### Decision: Follow Existing TypeORM Entity Patterns

**Chosen Approach**: Create TypeORM entities following the patterns used by existing entities (e.g., `SearchTaskEntity`, `VideoDownloadEntity`, `EmailMarketingTaskEntity`).

**Rationale**:
- **Consistency**: All existing entities use the same decorator patterns from `src/entity/order.decorator.ts`
- **Auditability**: Use existing `AuditableEntity` base class for created/updated timestamps
- **Proven patterns**: The existing entities handle relationships, indexes, and constraints correctly

**Entity Design**:

```typescript
// src/entity/OutreachTask.entity.ts
@Entity("outreach_task")
export class OutreachTaskEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;

    @Column("text", { nullable: true })
    description: string;

    @Column("integer")
    status: number; // 0: pending, 1: running, 2: completed, 3: failed

    @Column("text")
    target_urls: string; // JSON array of URLs to scrape

    @Column("integer", { nullable: true })
    total_contacts: number;

    @Column("text", { nullable: true })
    error_log: string;

    @Column("text", { nullable: true })
    runtime_log: string;

    @OneToMany(() => OutContactEntity, contact => contact.task)
    contacts: OutContactEntity[];
}

// src/entity/OutContact.entity.ts
@Entity("out_contact")
export class OutContactEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    email: string;

    @Column("text", { nullable: true })
    website_url: string;

    @Column("text", { nullable: true })
    name: string;

    @Column("text")
    source_url: string; // Where this contact was scraped from

    @Column("integer")
    status: number; // 0: pending, 1: message_generated, 2: sent, 3: failed

    @Column("integer")
    task_id: number;

    @ManyToOne(() => OutreachTaskEntity, task => task.contacts)
    @JoinColumn({ name: "task_id" })
    task: OutreachTaskEntity;

    @OneToOne(() => OutreachMessageEntity, message => message.contact)
    message: OutreachMessageEntity;

    @Column("integer", { nullable: true })
    campaign_id: number;

    @ManyToOne(() => OutreachCampaignEntity, campaign => campaign.contacts)
    @JoinColumn({ name: "campaign_id" })
    campaign: OutreachCampaignEntity;
}

// src/entity/OutreachMessage.entity.ts
@Entity("outreach_message")
export class OutreachMessageEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    content: string;

    @Column("text", { nullable: true })
    ai_metadata: string; // JSON: AI server response, model used, tokens, etc.

    @Column("boolean", { default: false })
    user_edited: boolean;

    @Column("boolean", { default: false })
    reviewed: boolean;

    @Column("integer")
    contact_id: number;

    @OneToOne(() => OutContactEntity, contact => contact.message)
    @JoinColumn({ name: "contact_id" })
    contact: OutContactEntity;
}

// src/entity/OutreachCampaign.entity.ts
@Entity("outreach_campaign")
export class OutreachCampaignEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;

    @Column("integer")
    status: number; // 0: preparing, 1: sending, 2: completed, 3: failed

    @Column("integer", { default: 0 })
    total_contacts: number;

    @Column("integer", { default: 0 })
    sent_count: number;

    @Column("integer", { default: 0 })
    failed_count: number;

    @Column("text", { nullable: true })
    error_log: string;

    @OneToMany(() => OutContactEntity, contact => contact.campaign)
    contacts: OutContactEntity[];
}

// src/entity/ScrapingLog.entity.ts
@Entity("scraping_log")
export class ScrapingLogEntity extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    url: string;

    @Column("integer")
    status: number; // 0: success, 1: error, 2: blocked

    @Column("text", { nullable: true })
    error_message: string;

    @Column("integer", { default: 0 })
    pages_processed: number;

    @Column("integer", { default: 0 })
    emails_found: number;

    @Column("integer")
    task_id: number;

    @ManyToOne(() => OutreachTaskEntity)
    @JoinColumn({ name: "task_id" })
    task: OutreachTaskEntity;
}
```

**Alternatives Considered**:
1. **Document-based (JSON storage)**: Store all data as JSON in a single table - Rejected because it loses the benefits of SQL queries, indexing, and referential integrity
2. **Embed documents within entities**: Store contacts as JSON array in task entity - Rejected because it makes querying and updating individual contacts difficult

---

## 4. Email Extraction Strategy

### Decision: Reuse Existing emailSearch.ts Module

**Chosen Approach**: Extend the existing `src/childprocess/emailSearch.ts` module for email extraction from scraped pages.

**Rationale**:
- **Code reuse**: The existing email search module already handles email extraction from websites
- **Proven functionality**: It's already tested and working in the codebase
- **Consistency**: Uses the same Puppeteer and stealth plugins

**Integration**:

```typescript
// In BaseWebScraper
protected async extractEmails(html: string): Promise<string[]> {
    // Use existing email extraction logic
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = html.match(emailRegex) || [];

    // Deduplicate and validate emails
    const uniqueEmails = [...new Set(matches)]
        .filter(email => this.validateEmail(email));

    return uniqueEmails;
}

protected validateEmail(email: string): boolean {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
```

**Aggressive Scraping Mode**:

```typescript
interface ScrapingOptions {
    aggressiveMode: boolean; // 20+ requests/second, ignore robots.txt
    maxConcurrency: number; // Number of concurrent scraping operations
    useProxy: boolean;
    delayMs: number; // Delay between requests (0 for aggressive mode)
}

// In BaseWebScraper
async scrapeMultipleUrls(urls: string[], options: ScrapingOptions): Promise<ContactInfo[]> {
    const concurrency = options.aggressiveMode ? options.maxConcurrency : 1;
    const delay = options.aggressiveMode ? 0 : options.delayMs;

    const results = await pmap(
        urls,
        async (url) => {
            const result = await this.scrape(url, options);
            if (!options.aggressiveMode) {
                await this.sleep(delay);
            }
            return result;
        },
        { concurrency }
    );

    return results.flat();
}
```

---

## 5. AI Message Generation Integration

### Decision: Use Existing AI Module Infrastructure

**Chosen Approach**: Extend the existing AI modules in `src/modules/llm/` to support the AI outreach message generation.

**Rationale**:
- **Existing infrastructure**: The project already has AI integrations for OpenAI, Ollama, and DeepSeek
- **Remote AI server**: The spec assumes a remote AI service is available - we'll create an API client interface
- **Consistency**: Follow the existing module patterns

**Implementation**:

```typescript
// src/api/ai-outreach-api.ts
export class AIOutreachAPI {
    private baseUrl: string;
    private apiKey: string;

    constructor(baseUrl: string, apiKey: string) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    async generateMessage(request: AIMessageRequest): Promise<AIMessageResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/api/generate-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify(request)
            });

            if (!response.ok) {
                throw new Error(`AI API error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            // Retry logic with exponential backoff
            return this.retryWithBackoff(request, 3);
        }
    }

    async generateBatchMessages(
        requests: AIMessageRequest[]
    ): Promise<AIMessageResponse[]> {
        // Process in parallel with concurrency limit
        const results = await pmap(
            requests,
            request => this.generateMessage(request),
            { concurrency: 5 }
        );
        return results;
    }

    private async retryWithBackoff(
        request: AIMessageRequest,
        maxRetries: number
    ): Promise<AIMessageResponse> {
        for (let i = 0; i < maxRetries; i++) {
            try {
                await this.sleep(Math.pow(2, i) * 1000); // Exponential backoff
                return await this.generateMessage(request);
            } catch (error) {
                if (i === maxRetries - 1) throw error;
            }
        }
        throw new Error('Max retries exceeded');
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Type definitions
export interface AIMessageRequest {
    contactEmail: string;
    websiteUrl?: string;
    contactName?: string;
    template?: string;
    customPrompt?: string;
}

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
```

---

## 6. Email Sending Integration

### Decision: Reuse Existing Email Infrastructure

**Chosen Approach**: Leverage the existing email sending infrastructure from `src/buckEmail.ts` and `EmailMarketingTaskEntity`.

**Rationale**:
- **Existing functionality**: The project already handles email campaigns and sending
- **Rate limiting**: Existing infrastructure handles rate limiting to avoid spam filters
- **Templates**: Can reuse email template and formatting logic

**Integration**:

```typescript
// In OutreachCampaign execution
async function sendCampaign(campaignId: number): Promise<void> {
    const campaign = await OutreachCampaignModel.findOne(campaignId);
    const contacts = await OutContactModel.findByCampaign(campaignId);

    campaign.status = 1; // sending
    await OutreachCampaignModel.update(campaign);

    for (const contact of contacts) {
        try {
            // Use existing email sending infrastructure
            await sendEmail({
                to: contact.email,
                subject: "Personalized Outreach",
                body: contact.message.content
            });

            contact.status = 2; // sent
            campaign.sent_count++;
        } catch (error) {
            contact.status = 3; // failed
            campaign.failed_count++;
        }

        await OutContactModel.update(contact);
        await OutreachCampaignModel.update(campaign);

        // Rate limiting
        await this.sleep(2000); // 2 seconds between emails
    }

    campaign.status = 2; // completed
    await OutreachCampaignModel.update(campaign);
}
```

---

## 6.5 Multi-Channel Outreach Strategy

### Decision: Strategy Pattern for Multiple Outreach Methods

**Chosen Approach**: Implement a Strategy pattern for different outreach methods (email, comments, direct messages), similar to the scraper strategy pattern.

**Rationale**:
- **Flexibility**: Different targets require different outreach methods (email, website comments, contact forms)
- **Extensibility**: New outreach methods can be added without modifying core logic
- **Platform-specific handling**: Each platform has unique posting requirements
- **Consistent architecture**: Follows same Strategy pattern as scrapers

**Architecture**:

```typescript
// src/strategy/OutreachStrategy.ts
export interface OutreachStrategy {
    send(target: OutreachTarget, message: string, options: OutreachOptions): Promise<OutreachResult>;
    validateTarget(target: OutreachTarget): boolean;
    getName(): OutreachMethod;
}

// Abstract base class
export abstract class BaseOutreachStrategy implements OutreachStrategy {
    protected async initialize(): Promise<void> { /* ... */ }
    protected async authenticate(credentials: AccountCredentials): Promise<boolean> { /* ... */ }
    protected async cleanup(): Promise<void> { /* ... */ }
    abstract validateTarget(target: OutreachTarget): boolean;
    abstract performSend(target: OutreachTarget, message: string): Promise<OutreachResult>;
    abstract getName(): OutreachMethod;
}

// Concrete implementations
export class EmailOutreachStrategy extends BaseOutreachStrategy { /* ... */ }
export class CommentOutreachStrategy extends BaseOutreachStrategy { /* ... */ }
export class DirectMessageOutreachStrategy extends BaseOutreachStrategy { /* ... */ }

// Factory
export class OutreachStrategyFactory {
    static createStrategy(method: OutreachMethod, options?: OutreachOptions): BaseOutreachStrategy
    static selectStrategyForTarget(target: OutreachTarget, options?: OutreachOptions): BaseOutreachStrategy
}
```

### Outreach Methods:

**1. Email Outreach** (`EmailOutreachStrategy`)
- Sends personalized emails to scraped contacts
- Reuses existing email infrastructure from `src/buckEmail.ts`
- Supports rate limiting and retry logic

**2. Website Comment Posting** (`CommentOutreachStrategy`)
- Posts AI-generated comments on blog posts, articles, forums
- Detects comment system (WordPress, Disqus, Facebook, generic)
- Handles authentication (if required)
- Fills comment forms and submits
- Returns comment URL and post ID

**3. Direct Message / Contact Form** (`DirectMessageOutreachStrategy`)
- Sends messages via website contact forms
- Supports platform-specific messaging (LinkedIn, Twitter, etc.)
- Detects form type and fills appropriately
- Handles form validation and submission

### Supported Target Types:

```typescript
type OutreachTargetType =
    | 'email-address'          // For email outreach
    | 'website-url'           // For comment posting
    | 'contact-form'          // For contact form submission
    | 'social-media-profile'   // For social media messaging
    | 'blog-post'             // For blog comment posting
    | 'forum-thread';          // For forum comment posting
```

### Factory Auto-Selection:

```typescript
// Automatically select strategy based on target type
const target: OutreachTarget = {
    type: 'blog-post',
    identifier: 'post-123',
    url: 'https://example.com/blog/post-123'
};

const strategy = OutreachStrategyFactory.selectStrategyForTarget(target);
// Returns: CommentOutreachStrategy

const result = await strategy.send(target, aiGeneratedMessage);
```

**Alternatives Considered**:
1. **Single monolithic outreach handler** - Rejected because it's not extensible and becomes unmaintainable
2. **Function-based approach** - Rejected because it doesn't provide enough structure or code reuse
3. **Configuration-driven posting** - Rejected because it's too rigid for platform-specific requirements

## 7. Anti-Bot Detection Strategy

### Decision: Multi-Layered Approach with Stealth Plugins

**Chosen Approach**: Use rebrowser-puppeteer with stealth plugins, following existing patterns in the codebase.

**Rationale**:
- **Proven technology**: The project already uses `rebrowser-puppeteer` with stealth plugins successfully
- **Comprehensive**: Handles fingerprinting, WebRTC leaks, navigator properties
- **Maintainable**: Plugin-based approach makes updates easier

**Implementation** (in `BaseWebScraper`):

```typescript
import puppeteer from 'rebrowser-puppeteer';
import stealth from 'puppeteer-extra-plugin-stealth';

async initializeBrowser(): Promise<void> {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-blink-features=AutomationControlled'
        ]
    });

    this.browser = browser;
    this.page = await browser.newPage();

    await this.setupStealthMode();
}

async setupStealthMode(): Promise<void> {
    // Hide WebDriver
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
    });

    // Random mouse movements for human-like behavior
    await this.simulateHumanBehavior();
}

async handleAntiBotDetection(): Promise<boolean> {
    // Check for CAPTCHA
    const captchaExists = await this.page.$('[data-captcha], .captcha, #captcha');

    if (captchaExists) {
        // Log the issue and return false
        console.log('CAPTCHA detected, skipping URL');
        return false;
    }

    // Check for rate limit / blocked page
    const bodyText = await this.page.evaluate(() => document.body.innerText);
    if (bodyText.includes('rate limit') || bodyText.includes('access denied')) {
        console.log('Rate limit detected, backing off');
        await this.sleep(5000);
        return false;
    }

    return true;
}

async simulateHumanBehavior(): Promise<void> {
    // Random mouse movements
    await this.page.mouse.move(
        Math.random() * 1000,
        Math.random() * 1000
    );

    // Random scroll
    await this.page.evaluate(() => {
        window.scrollBy(0, Math.random() * 500);
    });
}
```

---

## 8. Data Deduplication Strategy

### Decision: Database-Level Deduplication with Email as Primary Key

**Chosen Approach**: Use email address as the unique identifier for contacts, enforced at the database level with a unique index.

**Rationale**:
- **Data integrity**: Database-level constraints prevent duplicates
- **Performance**: Unique index enables fast lookups
- **Simple**: Application code doesn't need complex deduplication logic

**Implementation**:

```typescript
// src/entity/OutContact.entity.ts
@Entity("out_contact")
@index(["email"], { unique: true })
export class OutContactEntity extends AuditableEntity {
    @Column("text")
    @Index({ unique: true })
    email: string;

    // ... other fields
}

// When saving contacts
async function saveContacts(contacts: ContactInfo[], taskId: number): Promise<void> {
    for (const contact of contacts) {
        try {
            const entity = new OutContactEntity();
            entity.email = contact.email;
            entity.website_url = contact.websiteUrl;
            entity.name = contact.name;
            entity.source_url = contact.sourceUrl;
            entity.task_id = taskId;
            entity.status = 0; // pending

            await OutContactModel.save(entity);
        } catch (error) {
            // Unique constraint violation - duplicate email
            if (error.code === 'SQLITE_CONSTRAINT' || error.code === '23505') {
                console.log(`Duplicate email skipped: ${contact.email}`);
                continue;
            }
            throw error;
        }
    }
}
```

---

## Summary of Technical Decisions

| Area | Decision | Key Benefit |
|------|----------|-------------|
| Scraper Architecture | Strategy Pattern with BaseWebScraper | Extensible, code reuse, consistent with existing patterns |
| Child Process Comm | ProcessMessage<T> pattern | Type safety, consistency, proven |
| Database | TypeORM entities following existing patterns | Auditability, relationships, constraints |
| Email Extraction | Extend existing emailSearch.ts | Code reuse, proven functionality |
| AI Integration | Extend existing AI modules | Consistency, remote API support |
| Email Sending | Reuse existing email infrastructure | Rate limiting, templates, proven |
| **Multi-Channel Outreach** | **Strategy Pattern with BaseOutreachStrategy** | **Extensible, platform-specific handling, supports email/comments/DMs** |
| Anti-Bot Detection | rebrowser-puppeteer with stealth | Comprehensive, maintainable |
| Deduplication | Database unique index on email | Data integrity, performance |

---

## Next Steps

With all technical decisions resolved, proceed to **Phase 1: Design & Contracts** to generate:
1. `data-model.md` - Detailed entity definitions with relationships and validation rules
2. `contracts/` - API contracts for IPC handlers, scraper strategies, and AI service
3. `quickstart.md` - Developer onboarding guide for the outreach feature
