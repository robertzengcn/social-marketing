# Quickstart Guide: AI-Powered User Outreach Automation

**Feature**: AI-Powered User Outreach Automation
**Date**: 2026-02-11

This guide helps developers quickly understand and work with the AI outreach feature.

---

## Overview

The AI outreach feature enables users to:
1. **Scrape contact information** from websites (emails, URLs, names)
2. **Generate personalized AI messages** for each contact
3. **Send automated email campaigns** to collected contacts

The architecture uses an **extensible Strategy pattern** for web scraping, allowing easy addition of new website-specific scrapers.

---

## Architecture at a Glance

```
┌─────────────────────────────────────────────────────────────┐
│                     Renderer Process                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Vue Components (src/views/pages/outreach/)            │   │
│  │  - ScrapingTask.vue                                   │   │
│  │  - ContactList.vue                                    │   │
│  │  - MessageGeneration.vue                              │   │
│  │  - CampaignManagement.vue                             │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │ IPC (preload.ts)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Main Process                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  IPC Handlers (src/main-process/communication/)       │   │
│  │  - outreach-ipc.ts                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Business Logic (src/modules/outreach/)                │   │
│  │  - OutreachModule.ts                                  │   │
│  │  - OutreachController.ts                             │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Database (TypeORM + SQLite)                         │   │
│  │  - OutreachTaskEntity                                │   │
│  │  - OutContactEntity                                   │   │
│  │  - OutreachMessageEntity                             │   │
│  │  - OutreachCampaignEntity                            │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │ ProcessMessage<T>
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Child Process (src/childprocess/)               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  OutreachScraper.ts                                  │   │
│  │  - Uses Strategy Pattern                             │   │
│  │  - BaseWebScraper (abstract)                         │   │
│  │  - GenericWebScraper                                 │   │
│  │  - LinkedInScraper (future)                          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                          │
│  - Remote AI Server (message generation)                    │
│  - Email Service (via existing infrastructure)              │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Design Patterns

### 1. Strategy Pattern for Scraping

**Why**: Allows easy extension for new website types without modifying core logic.

**Interface**:
```typescript
export interface OutreachScrapingStrategy {
    scrape(url: string, options: ScrapingOptions): Promise<ScrapingResult>;
    validateUrl(url: string): boolean;
    getName(): string;
}
```

**Base Class**:
```typescript
export abstract class BaseWebScraper implements OutreachScrapingStrategy {
    // Common functionality (browser init, stealth mode, email extraction)
    protected async initializeBrowser(): Promise<void>
    protected async extractEmails(html: string): Promise<string[]>
    protected async handleAntiBotDetection(): Promise<boolean>

    // Abstract methods (must implement)
    abstract validateUrl(url: string): boolean
    abstract navigateToPage(url: string): Promise<boolean>
    abstract scrapeContactInfo(): Promise<ContactInfo[]>
}
```

**Factory**:
```typescript
// Automatically selects appropriate scraper based on URL
const scraper = OutreachScrapingFactory.createScraper(url, options);
// Returns: GenericWebScraper, LinkedInScraper, etc.
```

### 2. ProcessMessage for Child Process Comm

**Why**: Type-safe communication between main and child processes.

```typescript
// Main process sends:
const message: ProcessMessage<ScrapingStartData> = {
    action: "outreach-scraping-start",
    data: { taskId: 123, urls: [...], options: {...} }
};
process.parentPort.postMessage(JSON.stringify(message));

// Child process receives and responds:
process.parentPort.on('message', async (e) => {
    const pme = JSON.parse(e.data) as ProcessMessage<any>;
    if (pme.action === "outreach-scraping-start") {
        // Perform scraping...
        const response: ProcessMessage<ScrapingProgressData> = {
            action: "outreach-scraping-progress",
            data: { taskId, contactsFound: 10, ... }
        };
        process.parentPort.postMessage(JSON.stringify(response));
    }
});
```

### 3. Repository Pattern for Database

**Why**: Separates data access from business logic.

```typescript
// src/model/outreach.model.ts
export class OutreachModel {
    async createTask(task: OutreachTaskEntity): Promise<OutreachTaskEntity>
    async findTaskById(id: number): Promise<OutreachTaskEntity | null>
    async findContactsByTask(taskId: number): Promise<OutContactEntity[]>
    // ...
}
```

---

## File Structure

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
├── api/
│   └── ai-outreach-api.ts           # Remote AI client
│
└── views/pages/outreach/
    ├── ScrapingTask.vue            # Create/manage tasks
    ├── ContactList.vue             # View contacts
    ├── MessageGeneration.vue       # Generate messages
    └── CampaignManagement.vue      # Send campaigns
```

---

## Getting Started

### Prerequisites

- Node.js >= 20.18.3
- Yarn package manager
- Existing project setup (see `CLAUDE.md`)

### Development Setup

1. **Start the application**:
   ```bash
   yarn start  # Electron dev mode
   ```

2. **Start Vite dev server** (for hot reload):
   ```bash
   yarn dev
   ```

3. **Run tests**:
   ```bash
   # All tests
   npm test

   # Outreach-specific tests (once implemented)
   npx mocha test test/modules/outreach
   ```

### Database Setup

The entities are automatically registered in `src/config/SqliteDb.ts`. Tables are created on first run:

```typescript
// Already added to SqliteDb.ts entities array
import { OutreachTaskEntity } from "../entity/OutreachTask.entity";
import { OutContactEntity } from "../entity/OutContact.entity";
import { OutreachMessageEntity } from "../entity/OutreachMessage.entity";
import { OutreachCampaignEntity } from "../entity/OutreachCampaign.entity";
import { ScrapingLogEntity } from "../entity/ScrapingLog.entity";
```

Run database migration (first time only):
```bash
npm run init  # Initializes SQLite database
```

---

## Common Tasks

### 1. Add a New Website Scraper

**Step 1**: Create scraper class extending `BaseWebScraper`

```typescript
// src/strategy/TwitterScraper.ts
export class TwitterScraper extends BaseWebScraper {
    getName(): string {
        return "twitter";
    }

    validateUrl(url: string): boolean {
        return url.includes('twitter.com/') || url.includes('x.com/');
    }

    async navigateToPage(url: string): Promise<boolean> {
        // Twitter-specific navigation
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        return true;
    }

    async scrapeContactInfo(): Promise<ContactInfo[]> {
        // Twitter-specific extraction
        const profile = await this.page.evaluate(() => {
            return {
                name: document.querySelector('[data-testid="UserName"]')?.textContent,
                // ... more fields
            };
        });

        return [{
            email: profile.email || '',
            name: profile.name,
            sourceUrl: this.page.url(),
            scrapedAt: Date.now()
        }];
    }
}
```

**Step 2**: Register in factory

```typescript
// src/strategy/OutreachScrapingFactory.ts
export class OutreachScrapingFactory {
    static createScraper(url: string, options: ScrapingOptions): BaseWebScraper {
        if (url.includes('twitter.com') || url.includes('x.com')) {
            return new TwitterScraper(options);
        }
        // ... other platforms
        return new GenericWebScraper(options);
    }
}
```

**Step 3**: Add tests

```typescript
// test/modules/outreach/twitter-scraper.test.ts
describe('TwitterScraper', () => {
    it('should validate Twitter URLs', () => {
        const scraper = new TwitterScraper(options);
        assert(scraper.validateUrl('https://twitter.com/user'));
        assert(!scraper.validateUrl('https://example.com'));
    });
});
```

### 2. Add New IPC Handler

**Step 1**: Define channel constant

```typescript
// src/main-process/communication/outreach-ipc.ts
export const OUTREACH_CUSTOM_ACTION = 'outreach-custom-action';
```

**Step 2**: Register handler

```typescript
// src/main-process/communication/index.ts
export function registerOutreachIpcHandlers() {
    ipcMain.handle(OUTREACH_CUSTOM_ACTION, async (event, arg) => {
        const request = JSON.parse(arg) as CustomRequest;
        // ... process request
        return { success: true, data: result };
    });
}
```

**Step 3**: Expose via preload

```typescript
// src/preload.ts
contextBridge.exposeInMainWorld('api', {
    outreach: {
        customAction: (request: CustomRequest) => ipcRenderer.invoke(OUTREACH_CUSTOM_ACTION, JSON.stringify(request))
    }
});
```

**Step 4**: Use in Vue component

```typescript
// src/views/pages/outreach/MyComponent.vue
const result = await window.api.outreach.customAction(request);
```

### 3. Add Translations for UI

**Step 1**: Add to English translations

```typescript
// src/views/lang/en.ts
export default {
    outreach: {
        my_feature: {
            title: "My Feature",
            description: "Feature description"
        }
    }
}
```

**Step 2**: Add to Chinese translations

```typescript
// src/views/lang/zh.ts
export default {
    outreach: {
        my_feature: {
            title: "我的功能",
            description: "功能描述"
        }
    }
}
```

**Step 3**: Use in Vue component

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <v-card-title>{{ t('outreach.my_feature.title') }}</v-card-title>
</template>
```

---

## Workflow Examples

### Example 1: Complete Scraping Workflow

```typescript
// In Vue component (ScrapingTask.vue)

// 1. Create scraping task
const taskRequest: ScrapingTaskRequest = {
    name: "Lead Generation Campaign",
    targetUrls: ["https://example.com/contact", "https://site2.com/about"],
    options: {
        aggressiveMode: true,
        maxConcurrency: 5,
        useProxy: true,
        extractEmails: true,
        extractUrls: true
    }
};

// 2. Start scraping via IPC
const response = await window.api.outreach.startScrapingTask(taskRequest);

// 3. Listen to progress
window.api.outreach.onScrapingProgress((progress) => {
    console.log(`Scraped ${progress.pagesProcessed}/${progress.totalUrls} pages`);
    console.log(`Found ${progress.contactsFound} contacts`);
});

// 4. When complete, fetch contacts
const contacts = await window.api.outreach.listContacts({
    taskId: response.taskId
});
```

### Example 2: Message Generation Workflow

```typescript
// In Vue component (MessageGeneration.vue)

// 1. Get contacts pending messages
const pendingContacts = await window.api.outreach.listContacts({
    status: 0,  // pending
    limit: 100
});

// 2. Generate messages in batch
const result = await window.api.outreach.generateBatchMessages({
    contactIds: pendingContacts.contacts.map(c => c.id),
    template: "Hi {{name}}, I'm reaching out because...",
    tone: 'professional'
});

console.log(`Generated ${result.summary.succeeded}/${result.summary.total} messages`);

// 3. Review generated messages
for (const item of result.results) {
    if (item.success) {
        // Get full message with content
        const contact = await window.api.outreach.getContact(item.contactId);
        console.log(`Message for ${contact.contact.email}:`, contact.contact.message.content);
    }
}
```

### Example 3: Campaign Sending Workflow

```typescript
// In Vue component (CampaignManagement.vue)

// 1. Create campaign with contacts
const campaignResponse = await window.api.outreach.createCampaign({
    name: "February Outreach",
    contactIds: [1, 2, 3, 4, 5]  // Contacts with generated messages
});

// 2. Start sending
await window.api.outreach.sendCampaign(campaignResponse.campaignId);

// 3. Monitor progress
setInterval(async () => {
    const status = await window.api.outreach.getCampaignStatus(campaignResponse.campaignId);
    console.log(`Sent: ${status.campaign.sentCount}/${status.campaign.totalContacts}`);

    if (status.campaign.status === 2) {  // completed
        console.log(`Campaign completed with ${status.campaign.successRate}% success rate`);
    }
}, 2000);
```

---

## Testing

### Unit Tests

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
    });
});
```

### Integration Tests

```typescript
// test/integration/outreach-workflow.test.ts
describe('Outreach Workflow', () => {
    it('should complete full scraping and message generation', async () => {
        // 1. Scrape
        const task = await createScrapingTask([...]);
        await startScraping(task.id);
        await waitForCompletion(task.id);

        // 2. Generate messages
        const contacts = await getContactsByTask(task.id);
        await generateMessages(contacts.map(c => c.id));

        // 3. Verify
        const updatedContacts = await getContactsByTask(task.id);
        assert.equal(updatedContacts.filter(c => c.status === 1).length, contacts.length);
    });
});
```

---

## Configuration

### AI Service Configuration

```typescript
// Set in environment variables or config
AI_OUTREACH_BASE_URL=https://ai-service.example.com
AI_OUTREACH_API_KEY=your-api-key
AI_OUTREACH_TIMEOUT=30000
AI_OUTREACH_MAX_RETRIES=3
```

### Scraping Configuration

```typescript
// Default scraping options
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

---

## Troubleshooting

### Common Issues

**Issue**: Scraping fails with "BLOCKED" status
- **Solution**: Enable proxy rotation or reduce concurrency
- **Config**: Set `aggressiveMode: false` and `delayMs: 2000`

**Issue**: AI message generation returns errors
- **Solution**: Check AI service availability and API key
- **Command**: Use `getServiceStatus()` to check health

**Issue**: Email sending fails
- **Solution**: Check email service configuration and rate limits
- **Logs**: Check `runtime_log` in campaign entity

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

---

## Next Steps

1. **Implement core entities** in `src/entity/`
2. **Implement BaseWebScraper** in `src/strategy/`
3. **Implement IPC handlers** in `src/main-process/communication/outreach-ipc.ts`
4. **Implement child process** in `src/childprocess/outreachScraper.ts`
5. **Create Vue UI components** in `src/views/pages/outreach/`
6. **Add translations** to `src/views/lang/en.ts` and `src/views/lang/zh.ts`
7. **Write tests** in `test/modules/outreach/`

See `plan.md` for complete implementation plan, `data-model.md` for database schema, and `contracts/` for detailed API contracts.
