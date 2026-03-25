# Article Scraping Functionality Guide

**Feature**: AI-Powered User Outreach Automation
**Spec**: 001-ai-outreach
**Date**: 2026-03-25

This guide explains how to use the article scraping functionality in the Social Marketing Automation project.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Key Components](#key-components)
3. [Usage Methods](#usage-methods)
4. [Database Schema](#database-schema)
5. [Creating Custom Scrapers](#creating-custom-scrapers)
6. [IPC Channels Reference](#ipc-channels-reference)
7. [Configuration Options](#configuration-options)
8. [Testing](#testing)

---

## Architecture Overview

The article scraping functionality is part of the **AI-Powered User Outreach Automation** feature. It uses a **Strategy Pattern** for extensible web scraping with Puppeteer.

### Multi-Process Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Renderer Process                          │
│  Vue Components (src/views/pages/outreach/)                  │
│  - ScrapingTask.vue                                          │
│  - ContactList.vue                                           │
└───────────────────────────┬─────────────────────────────────┘
                            │ IPC (preload.ts)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Main Process                            │
│  IPC Handlers (src/main-process/communication/)              │
│  - outreach-ipc.ts                                           │
└───────────────────────────┬─────────────────────────────────┘
                            │ ProcessMessage<T>
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Child Process (src/childprocess/)               │
│  OutreachScraper.ts                                          │
│  - Uses Strategy Pattern                                     │
│  - BaseWebScraper (abstract)                                 │
│  - GenericWebScraper                                         │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
                    Target Websites
```

---

## Key Components

### 1. Strategy Interface

**Location**: `src/strategy/OutreachScrapingStrategy.ts`

Defines the contract for all scrapers:

```typescript
export interface OutreachScrapingStrategy {
    scrape(url: string, options: ScrapingOptions): Promise<ScrapingResult>;
    validateUrl(url: string): boolean;
    getName(): string;
    getSupportedPatterns?(): string[];
}
```

**Key Types**:

```typescript
interface ScrapingOptions {
    aggressiveMode: boolean;      // High-speed scraping (20+ req/s)
    maxConcurrency: number;        // Concurrent page operations
    useProxy: boolean;             // Use proxy rotation
    delayMs: number;               // Delay between requests
    maxPagesPerSite: number;       // Page limit per site
    followLinks: boolean;          // Follow internal links
    extractEmails: boolean;        // Extract email addresses
    extractUrls: boolean;          // Extract website URLs
    maxDepth?: number;            // Link traversal depth
    userAgent?: string;           // Custom user agent
    timeout?: number;             // Page load timeout (ms)
}

interface ScrapingResult {
    success: boolean;
    url: string;
    contacts: ContactInfo[];
    metadata: ScrapingMetadata;
    errors?: ScrapingError[];
}

interface ContactInfo {
    email: string;
    websiteUrl?: string;
    name?: string;
    sourceUrl: string;
    scrapedAt: number;
}
```

### 2. Base Scraper

**Location**: `src/strategy/BaseWebScraper.ts`

Abstract base class providing common functionality:

- Browser initialization with stealth mode
- Email/URL extraction utilities
- Anti-bot detection
- Human behavior simulation
- CAPTCHA detection

**Key Methods**:
- `initializeBrowser()` - Launch Puppeteer with stealth
- `setupStealthMode()` - Configure anti-detection
- `extractEmails(html)` - Extract emails from HTML
- `extractUrls(html, baseUrl)` - Extract URLs from HTML
- `handleAntiBotDetection()` - Check for blocks/CAPTCHAs

### 3. Generic Web Scraper

**Location**: `src/strategy/GenericWebScraper.ts`

Default implementation for most websites:

- Validates HTTP/HTTPS URLs
- Extracts emails and URLs from any webpage
- Handles navigation errors gracefully

### 4. LinkedIn Scraper

**Location**: `src/strategy/LinkedInScraper.ts`

LinkedIn-specific scraper for extracting contact information:

**Supported URL Types**:
- `linkedin.com/in/*` - User profiles
- `linkedin.com/company/*` - Company pages
- `linkedin.com/school/*` - University/School pages

**Features**:
- Validates LinkedIn URLs automatically
- Extracts names, headlines, emails, websites
- Handles LinkedIn's dynamic content loading
- Enhanced stealth mode for LinkedIn's anti-bot detection
- Detects sign-in walls and CAPTCHAs

**Example Usage**:

```typescript
import { OutreachScrapingFactory } from './strategy/OutreachScrapingFactory';

// Factory automatically detects LinkedIn URLs
const scraper = OutreachScrapingFactory.createScraper(
    'https://linkedin.com/in/johndoe',
    {
        aggressiveMode: false,
        delayMs: 2000,  // LinkedIn requires slower pace
        extractEmails: true,
        extractUrls: true
    }
);

const result = await scraper.scrape('https://linkedin.com/in/johndoe', options);
```

**Important Notes**:
- LinkedIn has aggressive anti-bot measures - use conservative settings
- Many profiles require login to view full contact information
- Respect LinkedIn's Terms of Service and rate limits
- Consider using proxy rotation for large-scale scraping

### 5. Factory

**Location**: `src/strategy/OutreachScrapingFactory.ts`

Automatically selects appropriate scraper based on URL:

```typescript
const scraper = OutreachScrapingFactory.createScraper(url, options);
// Returns: GenericWebScraper, LinkedInScraper, etc.
```

**Registered Scrapers**:
- `generic` - Default web scraper (any HTTP/HTTPS URL)
- `linkedin` - LinkedIn profiles, companies, schools

### 6. UI Scraper Selection

**Location**: `src/views/pages/outreach/ScrapingTask.vue`

The scraping task form now includes a **Scraper Type** dropdown that allows users to choose the appropriate scraper for their target websites.

**Available Options**:

| Scraper Type | Best For | Default Settings |
|--------------|----------|------------------|
| **Generic Web Scraper** | Any website (blogs, contact pages, general web scraping) | Aggressive: OFF, Concurrency: 5, Delay: 1000ms |
| **LinkedIn Scraper** | LinkedIn profiles, companies, schools | Aggressive: OFF, Concurrency: 1, Delay: 2000ms |

**UI Features**:
- **Visual Selection**: Dropdown with icons and descriptions for each scraper
- **Auto-Configuration**: Options automatically adjust based on selected scraper
- **LinkedIn Warning**: Alert shown when LinkedIn scraper is selected with best practices
- **Smart Defaults**: Each scraper type has optimized default settings

**How It Works**:

1. **User selects scraper type** from dropdown
2. **Form options auto-update** with scraper-specific defaults
3. **User can customize options** (delay, concurrency, proxy, etc.)
4. **Scraper type sent to backend** via IPC with the scraping task
5. **Factory uses specified scraper** instead of auto-detection

**Example Flow**:

```typescript
// User selects "LinkedIn Scraper" in UI
// Form automatically updates options:
{
    aggressive_mode: false,
    max_concurrency: 1,     // LinkedIn blocks concurrent requests
    delay_ms: 2000,         // LinkedIn requires 2+ second delays
    use_proxy: false,
    timeout: 30000
}

// When task is created:
const response = await window.api.outreach.createScrapingTask({
    name: "LinkedIn Profile Scraping",
    targetUrls: ["https://linkedin.com/in/user1", "https://linkedin.com/in/user2"],
    scraperType: "linkedin",  // Explicitly specify scraper
    options: {
        aggressiveMode: false,
        maxConcurrency: 1,
        delayMs: 2000,
        // ... other options
    }
});
```

**Benefits**:
- **User Control**: Explicit scraper selection instead of relying on auto-detection
- **Better UX**: Clear descriptions of what each scraper does
- **Smart Defaults**: Optimal settings for each scraper type
- **Safety**: Warnings for scrapers with special requirements (e.g., LinkedIn)
- **Flexibility**: Users can override defaults for specific use cases

---

## Usage Methods

### Method 1: Via IPC (Renderer Process - Vue Components)

Use this method from Vue components in the renderer process.

```typescript
// In Vue component (src/views/pages/outreach/ScrapingTask.vue)

// 1. Create scraping task
const taskRequest = {
    name: "Lead Generation Campaign",
    description: "Scrape contacts from target websites",
    targetUrls: [
        "https://example.com/contact",
        "https://site2.com/about",
        "https://blog.example.com/author-page"
    ],
    options: {
        aggressiveMode: false,      // High-speed scraping (20+ req/s)
        maxConcurrency: 3,          // Concurrent page operations
        useProxy: false,            // Use proxy rotation
        delayMs: 1000,              // Delay between requests
        maxPagesPerSite: 50,        // Page limit per site
        followLinks: false,         // Follow internal links
        extractEmails: true,        // Extract email addresses
        extractUrls: true,          // Extract website URLs
        timeout: 30000              // Page load timeout (ms)
    }
};

// 2. Start scraping via IPC
const response = await window.api.outreach.startScraping(taskRequest);
console.log('Task ID:', response.taskId);

// 3. Listen to progress updates
window.api.outreach.onScrapingProgress((progress) => {
    console.log(`Progress: ${progress.pagesProcessed}/${progress.totalUrls}`);
    console.log(`Contacts found: ${progress.contactsFound}`);
    console.log(`Current URL: ${progress.currentUrl}`);
    console.log(`Status: ${progress.status}`); // 'running' | 'completed' | 'failed'
});

// 4. When complete, fetch contacts
const contacts = await window.api.outreach.listContacts({
    taskId: response.taskId
});

// Access contact data
contacts.contacts.forEach(contact => {
    console.log('Email:', contact.email);
    console.log('Website:', contact.website_url);
    console.log('Name:', contact.name);
    console.log('Source:', contact.source_url);
});
```

### Method 2: Direct API Usage (Main Process)

Use this method from the main process or controller classes.

```typescript
import { OutreachController } from './modules/outreach/OutreachController';

// Create controller instance
const controller = new OutreachController();

// Create scraping task
const task = await controller.createScrapingTask(
    "My Scraping Task",
    "Task description",
    ["https://example.com/article", "https://blog.site.com/post"]
);

// Start scraping (this spawns child process)
await controller.startScrapingTask(task.id);

// Check status
const status = await controller.getScrapingTaskStatus(task.id);
console.log('Status:', status.status);
// 0: pending, 1: running, 2: completed, 3: failed
console.log('Total contacts:', status.total_contacts);
```

### Method 3: Direct Scraper Usage (For Custom Scripts)

Use this method for standalone scripts or testing.

```typescript
import { OutreachScrapingFactory } from './strategy/OutreachScrapingFactory';

// Define scraping options
const options = {
    aggressiveMode: false,
    maxConcurrency: 1,
    useProxy: false,
    delayMs: 1000,
    maxPagesPerSite: 10,
    followLinks: false,
    extractEmails: true,
    extractUrls: true,
    timeout: 30000
};

// Create scraper for URL
const scraper = OutreachScrapingFactory.createScraper(
    "https://example.com/article",
    options
);

// Scrape the URL
const result = await scraper.scrape("https://example.com/article", options);

// Access results
console.log('Success:', result.success);
console.log('Contacts found:', result.contacts.length);
console.log('Metadata:', result.metadata);

// Each contact has:
result.contacts.forEach(contact => {
    console.log('Email:', contact.email);
    console.log('Website:', contact.websiteUrl);
    console.log('Name:', contact.name);
    console.log('Source:', contact.sourceUrl);
});

// Check for errors
if (result.errors) {
    result.errors.forEach(error => {
        console.error(`Error at ${error.url}: ${error.error}`);
        console.error(`Type: ${error.type}`);
        // Types: 'BLOCKED' | 'CAPTCHA' | 'TIMEOUT' | 'INVALID_URL' | 'EXTRACTION_ERROR' | 'UNKNOWN'
    });
}
```

### Method 4: Child Process Communication

Use this method when working directly with the child process worker.

```typescript
// In main process - send message to child process
const { Worker } = require('worker_threads');

const worker = new Worker('./src/childprocess/outreachScraper.ts');

const message: ProcessMessage<ScrapingStartData> = {
    action: "outreach-scraping-start",
    data: {
        taskId: 123,
        urls: ["https://example.com"],
        options: {
            aggressiveMode: false,
            maxConcurrency: 3,
            useProxy: false,
            delayMs: 1000,
            maxPagesPerSite: 50,
            followLinks: false,
            extractEmails: true,
            extractUrls: true
        }
    }
};

worker.postMessage(JSON.stringify(message));

// Listen for progress updates
worker.on('message', (data) => {
    const pme = JSON.parse(data) as ProcessMessage<ScrapingProgressData>;

    if (pme.action === 'outreach-scraping-progress') {
        const progress = pme.data;
        console.log(`Progress: ${progress.pagesProcessed}/${progress.totalUrls}`);
        console.log(`Contacts: ${progress.contactsFound}`);
        console.log(`Status: ${progress.status}`);
    }
});
```

---

## Database Schema

Scraped data is stored in TypeORM entities with SQLite persistence.

### OutContactEntity

**Location**: `src/entity/OutContact.entity.ts`

Scraped contact records:

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Primary key (auto-generated) |
| `email` | string | Email address (unique) |
| `website_url` | string? | Website URL |
| `name` | string? | Contact name |
| `source_url` | string | URL where contact was found |
| `status` | number | Contact status (0: pending, 1: message_generated, 2: sent) |
| `task_id` | number | Associated scraping task (foreign key) |
| `campaign_id` | number? | Associated campaign (foreign key, nullable) |
| `created_at` | Date | Creation timestamp |
| `updated_at` | Date | Last update timestamp |

**Indexes**:
- Unique index on `email`
- Index on `source_url`
- Index on `website_url`

### OutreachTaskEntity

**Location**: `src/entity/OutreachTask.entity.ts`

Scraping task configuration:

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Primary key (auto-generated) |
| `name` | string | Task name |
| `description` | string? | Task description |
| `status` | number | Task status (0: pending, 1: running, 2: completed, 3: failed) |
| `target_urls` | string | JSON array of URLs to scrape |
| `total_contacts` | number? | Number of contacts found |
| `error_log` | string? | Error messages |
| `runtime_log` | string? | Runtime execution logs |
| `created_at` | Date | Creation timestamp |
| `updated_at` | Date | Last update timestamp |

**Helper Methods**:
```typescript
// Parse target URLs from JSON
const urls = task.getParsedTargetUrls();

// Set target URLs with validation
const success = task.setTargetUrls(["https://example.com", "https://site2.com"]);

// Get count of target URLs
const count = task.getTargetUrlsCount();
```

### ScrapingLogEntity

**Location**: `src/entity/ScrapingLog.entity.ts`

Scraping event logs:

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Primary key |
| `url` | string | Scraped URL |
| `status` | number | Status (0: success, 1: error) |
| `pages_processed` | number | Number of pages processed |
| `emails_found` | number | Number of emails found |
| `error_message` | string? | Error message if failed |
| `task_id` | number | Associated task (foreign key) |
| `created_at` | Date | Creation timestamp |

---

## Creating Custom Scrapers

To add a platform-specific scraper, extend the `BaseWebScraper` class.

### Example: LinkedIn Scraper

```typescript
// src/strategy/LinkedInScraper.ts
import { BaseWebScraper } from './BaseWebScraper';
import { ScrapingOptions, ScrapingResult, ContactInfo } from './OutreachScrapingStrategy';

export class LinkedInScraper extends BaseWebScraper {
    getName(): string {
        return "linkedin";
    }

    validateUrl(url: string): boolean {
        return url.includes('linkedin.com/');
    }

    getSupportedPatterns(): string[] {
        return [
            '^https?://.*linkedin\\.com/.*'
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

            // LinkedIn-specific: Wait for profile to load
            await this.page.waitForSelector('.text-heading-xlarge', { timeout: 5000 });

            // Simulate human behavior
            await this.simulateHumanBehavior();

            return true;
        } catch (error) {
            console.error(`LinkedIn navigation failed for ${url}:`, error);
            return false;
        }
    }

    async scrapeContactInfo(): Promise<ContactInfo[]> {
        if (!this.page) return [];

        try {
            // LinkedIn-specific extraction logic
            const profile = await this.page.evaluate(() => {
                const nameEl = document.querySelector('.text-heading-xlarge');
                const emailEl = document.querySelector('.contact-email');
                const websiteEl = document.querySelector('.website-url');

                return {
                    name: nameEl?.textContent?.trim() || '',
                    email: emailEl?.textContent?.trim() || '',
                    website: websiteEl?.getAttribute('href') || ''
                };
            });

            const contacts: ContactInfo[] = [];

            if (profile.email) {
                contacts.push({
                    email: profile.email,
                    name: profile.name,
                    websiteUrl: profile.website,
                    sourceUrl: this.page!.url(),
                    scrapedAt: Date.now()
                });
            }

            return contacts;
        } catch (error) {
            console.error('LinkedIn extraction failed:', error);
            return [];
        }
    }
}
```

### Register in Factory

```typescript
// src/strategy/OutreachScrapingFactory.ts
import { LinkedInScraper } from './LinkedInScraper';

export class OutreachScrapingFactory {
    static createScraper(url: string, options: ScrapingOptions): BaseWebScraper {
        // Check for platform-specific scrapers
        if (url.includes('linkedin.com')) {
            return new LinkedInScraper(options);
        }
        if (url.includes('twitter.com') || url.includes('x.com')) {
            // Future: return new TwitterScraper(options);
        }

        // Default to generic scraper
        return new GenericWebScraper(options);
    }
}
```

### Add Tests

```typescript
// test/modules/outreach/linkedin-scraper.test.ts
import { assert } from 'chai';
import { LinkedInScraper } from '../../../src/strategy/LinkedInScraper';

describe('LinkedInScraper', () => {
    const options = {
        aggressiveMode: false,
        maxConcurrency: 1,
        useProxy: false,
        delayMs: 1000,
        maxPagesPerSite: 10,
        followLinks: false,
        extractEmails: true,
        extractUrls: true
    };

    it('should validate LinkedIn URLs', () => {
        const scraper = new LinkedInScraper(options);
        assert(scraper.validateUrl('https://linkedin.com/in/user'));
        assert(scraper.validateUrl('https://www.linkedin.com/company/test'));
        assert(!scraper.validateUrl('https://example.com'));
    });

    it('should return correct name', () => {
        const scraper = new LinkedInScraper(options);
        assert.equal(scraper.getName(), 'linkedin');
    });

    it('should return supported patterns', () => {
        const scraper = new LinkedInScraper(options);
        const patterns = scraper.getSupportedPatterns();
        assert.isArray(patterns);
        assert.include(patterns[0], 'linkedin');
    });
});
```

---

## IPC Channels Reference

**Location**: `src/main-process/communication/outreach-ipc.ts`

### Scraping Task Channels

| Channel | Direction | Description |
|---------|-----------|-------------|
| `outreach-scraper-start` | Renderer → Main | Start a new scraping task |
| `outreach-scraper-stop` | Renderer → Main | Stop a running scraping task |
| `outreach-scraper-status` | Renderer → Main | Get task status |
| `outreach-scraper-progress` | Main → Renderer | Progress updates (event) |

### Contact Management Channels

| Channel | Direction | Description |
|---------|-----------|-------------|
| `outreach-contact-list` | Renderer → Main | List contacts by task |
| `outreach-contact-get` | Renderer → Main | Get single contact by ID |
| `outreach-contact-update` | Renderer → Main | Update contact details |
| `outreach-contact-delete` | Renderer → Main | Delete contact |

### Campaign Channels

| Channel | Direction | Description |
|---------|-----------|-------------|
| `outreach-campaign-create` | Renderer → Main | Create email campaign |
| `outreach-campaign-send` | Renderer → Main | Send campaign |
| `outreach-campaign-status` | Renderer → Main | Get campaign status |
| `outreach-campaign-list` | Renderer → Main | List all campaigns |

### Usage Example

```typescript
// In preload.ts - expose to renderer
contextBridge.exposeInMainWorld('api', {
    outreach: {
        startScraping: (request) => ipcRenderer.invoke('outreach-scraper-start', JSON.stringify(request)),
        getTaskStatus: (taskId) => ipcRenderer.invoke('outreach-scraper-status', JSON.stringify(taskId)),
        listContacts: (filters) => ipcRenderer.invoke('outreach-contact-list', JSON.stringify(filters)),
        onScrapingProgress: (callback) => ipcRenderer.on('outreach-scraper-progress', (event, data) => callback(JSON.parse(data)))
    }
});

// In Vue component
const response = await window.api.outreach.startScraping(taskRequest);
```

---

## Configuration Options

### Default Scraping Options

```typescript
const defaultScrapingOptions: ScrapingOptions = {
    aggressiveMode: false,      // Use aggressive mode by default
    maxConcurrency: 3,          // Max 3 concurrent scrapes
    useProxy: false,            // Don't use proxy by default
    delayMs: 1000,             // 1 second delay between requests
    maxPagesPerSite: 50,        // Max 50 pages per site
    followLinks: false,        // Don't follow links by default
    extractEmails: true,        // Extract emails
    extractUrls: true,          // Extract URLs
    timeout: 30000             // 30 second timeout
};
```

### Aggressive Mode

When `aggressiveMode: true`:
- Increases `maxConcurrency` to 20+
- Reduces `delayMs` to minimum
- Enables parallel processing
- Use with caution - may trigger anti-bot measures

### Stealth Features

The scrapers include built-in stealth features:
- Custom user agent strings
- Navigator property spoofing
- Mouse movement simulation
- Random scrolling
- CAPTCHA detection
- Rate limit detection

---

## Testing

### Run All Tests

```bash
npm test
```

### Run Outreach-Specific Tests

```bash
npx mocha test test/modules/outreach
```

### Run Individual Test File

```bash
npx mocha test test/modules/outreach/scraping.test.ts
```

### Test with Debug Logging

```bash
DEBUG='outreach:*' npm test
```

### Example Unit Test

```typescript
// test/modules/outreach/outreach-module.test.ts
import { assert } from 'chai';
import { OutreachModule } from '../../../src/modules/outreach/OutreachModule';

describe('OutreachModule', () => {
    it('should create scraping task', async () => {
        const module = new OutreachModule();
        const task = await module.createTask({
            name: "Test Task",
            targetUrls: ["https://example.com"]
        });
        assert.equal(task.name, "Test Task");
        assert.isArray(task.getParsedTargetUrls());
    });

    it('should validate URLs', async () => {
        const module = new OutreachModule();
        const valid = module.validateUrls([
            "https://example.com",
            "invalid-url"
        ]);
        assert.equal(valid.length, 1);
    });
});
```

### Integration Test Example

```typescript
// test/integration/outreach-workflow.test.ts
describe('Outreach Workflow', () => {
    it('should complete full scraping workflow', async () => {
        // 1. Create task
        const task = await createScrapingTask({
            name: "Integration Test",
            targetUrls: ["https://example.com"]
        });

        // 2. Start scraping
        await startScraping(task.id);

        // 3. Wait for completion
        await waitForCompletion(task.id, 30000);

        // 4. Verify contacts
        const contacts = await getContactsByTask(task.id);
        assert.isAtLeast(contacts.length, 0);

        // 5. Verify task status
        const status = await getScrapingTaskStatus(task.id);
        assert.equal(status.status, 2); // completed
    });
});
```

---

## Troubleshooting

### Common Issues

**Issue**: Scraping fails with "BLOCKED" status
- **Solution**: Enable proxy rotation or reduce concurrency
- **Config**: Set `aggressiveMode: false` and `delayMs: 2000`

**Issue**: CAPTCHA detected
- **Solution**: Use proxy rotation or implement CAPTCHA solving
- **Config**: Set `useProxy: true`

**Issue**: Timeout errors
- **Solution**: Increase timeout value
- **Config**: Set `timeout: 60000` (60 seconds)

**Issue**: No contacts found
- **Solution**: Check if emails/URLs exist on the page
- **Debug**: Inspect page HTML structure

### Debug Mode

Enable detailed logging:

```typescript
// In main process
import log from 'electron-log';
log.transports.file.level = 'debug';
log.transports.console.level = 'debug';

// In child process
console.log('Scraping URL:', url);
console.error('Extraction failed:', error);
```

### Check Database

```bash
# Open SQLite database
sqlite3 ~/Library/Application\ Support/social-marketing/database.sqlite

# Query contacts
SELECT * FROM out_contact WHERE task_id = 123;

# Query task status
SELECT * FROM outreach_task WHERE id = 123;

# Query scraping logs
SELECT * FROM scraping_log WHERE task_id = 123;
```

---

## Performance Tips

1. **Use aggressive mode for trusted sites**: Set `aggressiveMode: true` for sites you control
2. **Enable proxy rotation**: Set `useProxy: true` for large-scale scraping
3. **Limit page depth**: Set `maxDepth: 1` to avoid infinite link following
4. **Monitor progress**: Use progress events to track scraping status
5. **Handle errors gracefully**: Always check `result.errors` for failed URLs

---

## Related Documentation

- **Feature Spec**: `specs/001-ai-outreach/spec.md`
- **Implementation Plan**: `specs/001-ai-outreach/plan.md`
- **Quickstart Guide**: `specs/001-ai-outreach/quickstart.md`
- **Data Model**: `specs/001-ai-outreach/data-model.md`
- **Project CLAUDE.md**: `CLAUDE.md`

---

## File Structure Reference

```
src/
├── entity/
│   ├── OutreachTask.entity.ts        # Scraping task configuration
│   ├── OutContact.entity.ts          # Contact records
│   ├── OutreachMessage.entity.ts     # AI-generated messages
│   ├── OutreachCampaign.entity.ts    # Email campaigns
│   └── ScrapingLog.entity.ts         # Scraping logs
│
├── strategy/
│   ├── OutreachScrapingStrategy.ts   # Scraper interface
│   ├── BaseWebScraper.ts            # Abstract base class
│   ├── GenericWebScraper.ts         # Default scraper
│   └── OutreachScrapingFactory.ts   # Factory pattern
│
├── childprocess/
│   └── outreachScraper.ts           # Worker process
│
├── modules/outreach/
│   ├── OutreachModule.ts            # Business logic
│   └── OutreachController.ts        # Request handling
│
├── model/
│   └── outreach.model.ts             # Data access
│
├── main-process/communication/
│   └── outreach-ipc.ts              # IPC handlers
│
└── views/pages/outreach/
    ├── ScrapingTask.vue            # Create/manage tasks
    ├── ContactList.vue             # View contacts
    ├── MessageGeneration.vue       # Generate messages
    └── CampaignManagement.vue      # Send campaigns
```

---

## Summary

The article scraping functionality provides a flexible, extensible system for web scraping with the following key features:

- **Strategy Pattern**: Easy to add new platform-specific scrapers
- **Multi-Process**: Scraping runs in child process to avoid blocking UI
- **Anti-Detection**: Built-in stealth mode and human behavior simulation
- **Database Persistence**: All scraped data stored in SQLite
- **Progress Tracking**: Real-time progress updates via IPC
- **Error Handling**: Comprehensive error reporting and logging

For questions or issues, refer to the related documentation or check the test files for examples.
