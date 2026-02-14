# Implementation Plan: AI-Powered User Outreach Automation

**Branch**: `001-ai-outreach` | **Date**: 2026-02-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-ai-outreach/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build an extensible web scraping and AI-powered outreach system for collecting user contact information from websites and sending personalized AI-generated messages through multiple channels. The system supports:

1. **Email Outreach**: Send AI-generated personalized emails to scraped contacts
2. **Website Comments**: Leave AI-generated comments on blog posts, articles, and forums
3. **Direct Messages**: Send messages to authors via website contact forms, social media platforms, and other messaging systems

The architecture uses a Strategy pattern with a base scraper class that each website inherits from, allowing customization per platform while maintaining common functionality. Each platform can also have its own outreach strategy (email posting, comment submission, direct messaging). All scraped data is persisted in the local SQLite database using TypeORM, following the existing project's multi-process Electron architecture where scraping runs in child processes to avoid blocking the main thread.

## Technical Context

**Language/Version**: TypeScript 5.x with Node.js >=20.18.3
**Primary Dependencies**:
- Electron 35+ for desktop application framework
- Puppeteer (rebrowser-puppeteer) with stealth plugins for browser automation
- TypeORM with better-sqlite3 for database persistence
- Vue 3 + Vuetify for frontend UI
- vue-i18n for internationalization (English + Chinese)

**Storage**:
- SQLite database via TypeORM with better-sqlite3 driver
- Local file system for logs and temporary data
- Database configuration: `src/config/SqliteDb.ts`

**Testing**:
- Mocha for unit and integration tests
- Vitest for module-specific tests (see existing patterns: `yarn vitest-googlescraper`, `yarn vitest-bibiliscraper`)
- Test files located in `test/` directory

**Target Platform**: Desktop application (Windows, macOS, Linux) via Electron

**Project Type**: Electron desktop application with multi-process architecture

**Performance Goals**:
- Scrape 100 websites and collect 500+ unique contacts in under 30 minutes (20+ requests/second in aggressive mode)
- AI message generation for 100 contacts in under 5 minutes with 95% success rate
- Email sending with 90% delivery success rate
- Comment posting with 85% success rate (accounting for moderation, rate limits)
- Direct message sending via contact forms with 80% success rate
- UI progress updates with latency under 2 seconds

**Constraints**:
- Main process must remain responsive - all scraping and posting in child processes
- Must support aggressive scraping mode with configurable rate limiting
- Must handle anti-bot detection (CAPTCHAs, rate limiting, IP bans)
- Must respect website-specific posting rules (comment character limits, required fields, etc.)
- All scraped data must be persisted locally in SQLite database
- All UI text must be internationalized (English and Chinese)

**Scale/Scope**:
- Support scraping from multiple website types (generic web scraping, platform-specific scrapers)
- Support multiple outreach methods: email, website comments, direct messages, contact forms
- Handle 500+ contacts per campaign
- Support batch AI message generation
- Support batch outreach execution with rate limiting per platform
- Platform-specific outreach strategies (e.g., LinkedIn messaging, WordPress comments, contact forms)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Type Safety (NON-NEGOTIABLE)

**Status**: ✅ PASS - Will comply

**Requirements for this feature**:
- All scraper classes will use explicit TypeScript interfaces and types
- Database entities will use TypeORM decorators with proper column types
- IPC message types will extend `ProcessMessage<T>` with explicit data types
- No `any` types will be used - will create interfaces for scraped data, AI responses, and scraping results

**Planned Types**:
- `OutreachScrapingStrategy` interface for scraper strategies
- `OutContactEntity`, `OutreachTaskEntity`, `OutreachMessageEntity`, `OutreachCampaignEntity` for database
- `ScrapingResult`, `AIMessageRequest`, `AIMessageResponse` for data transfer

### II. Non-Blocking Architecture (NON-NEGOTIABLE)

**Status**: ✅ PASS - Will comply

**Requirements for this feature**:
- All Puppeteer web scraping will run in child processes (using existing `src/taskCode.ts` pattern)
- AI message generation will be async but can run in main process (API calls are I/O, not CPU blocking)
- Email sending will use existing child process infrastructure from `src/buckEmail.ts`
- IPC handlers will be registered in `src/main-process/communication/` following existing patterns
- Progress updates will be sent via IPC events to keep UI responsive

**Planned Architecture**:
- Child process: `src/childprocess/outreachScraper.ts` - Handles web scraping with Puppeteer
- Main process: IPC handlers in `src/main-process/communication/outreach-ipc.ts`
- Worker threads: None needed (API calls are non-blocking async)
- Existing infrastructure: Will reuse `browserManager.ts` for browser instance management

### III. UI Internationalization (NON-NEGOTIABLE)

**Status**: ✅ PASS - Will comply

**Requirements for this feature**:
- All new Vue components will use `useI18n()` composition API
- Translation keys will be added to both `src/views/lang/en.ts` and `src/views/lang/zh.ts`
- New translation namespace: `outreach` (e.g., `outreach.scraping_task_title`, `outreach.generate_messages`)

**Planned Translations**:
- Outreach task creation and management UI
- Contact list and filtering UI
- Message generation and review UI
- Campaign management and sending UI
- Error messages and success notifications

### Gate Summary (Initial - Pre-Phase 1)

| Principle | Status | Notes |
|-----------|--------|-------|
| Type Safety | ✅ PASS | Will use explicit TypeScript types throughout |
| Non-Blocking | ✅ PASS | Scraping in child processes, following existing patterns |
| Internationalization | ✅ PASS | All UI text will be translated (EN/ZH) |

**GATE STATUS**: ✅ **PASS** - All constitutional requirements will be met

---

### Post-Phase 1 Re-evaluation

*GATE RE-CHECK AFTER DESIGN COMPLETION*

After completing Phase 1 design (research.md, data-model.md, contracts/, quickstart.md), the constitutional compliance remains:

**I. Type Safety** ✅ **PASS - VERIFIED**
- All interfaces defined with explicit types in contracts:
  - `OutreachScrapingStrategy` interface with typed methods
  - `ScrapingResult`, `ContactInfo`, `ScrapingOptions` with explicit fields
  - TypeORM entities with proper decorators and column types
  - IPC request/response types with no `any` usage
  - `ProcessMessage<T>` generic for worker communication

**II. Non-Blocking Architecture** ✅ **PASS - VERIFIED**
- Scraping in child process: `src/childprocess/outreachScraper.ts` using `ProcessMessage<T>` pattern
- Puppeteer operations confined to worker process, following existing `src/taskCode.ts` patterns
- AI API calls use async/await (I/O, not CPU blocking)
- Email sending reuses existing `src/buckEmail.ts` infrastructure
- IPC handlers registered in `src/main-process/communication/outreach-ipc.ts`
- Progress updates via IPC events to keep UI responsive

**III. UI Internationalization** ✅ **PASS - VERIFIED**
- Vue components will use `useI18n()` composition API
- Translation keys documented in contracts (e.g., `outreach.scraping_task_title`)
- Both `en.ts` and `zh.ts` will be updated per existing project pattern
- Quickstart guide includes translation workflow for developers

### Final Gate Summary (Post-Phase 1)

| Principle | Status | Design Verification |
|-----------|--------|-------------------|
| Type Safety | ✅ PASS | All types defined in contracts/, no `any` in design |
| Non-Blocking | ✅ PASS | Scraping in child process, API calls async, IPC events for progress |
| Internationalization | ✅ PASS | Translation namespace defined, workflow documented |

**FINAL GATE STATUS**: ✅ **PASS** - All constitutional requirements verified in design

The design phase has successfully validated that:
1. Explicit TypeScript types are used throughout (interfaces in contracts/)
2. Multi-process architecture is properly designed (child process for scraping)
3. UI internationalization is accounted for (translation workflow in quickstart)

No violations detected. Proceed to Phase 2 (tasks generation via `/speckit.tasks`).

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-outreach/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── outreach-api.ts         # IPC handler contracts
│   ├── scraping-strategy.ts    # Scraper strategy interface
│   ├── outreach-strategy.ts    # Outreach posting strategy interface
│   └── ai-service.ts           # AI API contracts
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── entity/                           # TypeORM database entities
│   ├── OutContact.entity.ts          # Contact scraped from websites
│   ├── OutreachTask.entity.ts       # Scraping task configuration
│   ├── OutreachMessage.entity.ts    # AI-generated messages
│   ├── OutreachCampaign.entity.ts   # Email sending campaigns
│   ├── OutreachComment.entity.ts    # Posted website comments
│   ├── OutreachDirectMessage.entity.ts # Sent direct messages
│   └── ScrapingLog.entity.ts        # Scraping event logs
│
├── strategy/                         # Strategy pattern for scrapers and outreach
│   ├── OutreachScrapingStrategy.ts   # Abstract scraper strategy interface
│   ├── BaseWebScraper.ts            # Base scraper with common logic
│   ├── GenericWebScraper.ts         # Generic website scraper implementation
│   ├── OutreachScrapingFactory.ts   # Factory for selecting scraper strategy
│   │
│   ├── OutreachStrategy.ts            # Abstract outreach strategy interface
│   ├── BaseOutreachStrategy.ts      # Base class with common posting logic
│   ├── EmailOutreachStrategy.ts      # Email sending implementation
│   ├── CommentOutreachStrategy.ts    # Website comment posting
│   ├── DirectMessageOutreachStrategy.ts # Direct messaging/contact forms
│   └── OutreachStrategyFactory.ts    # Factory for selecting outreach method
│
├── childprocess/                     # Child process workers (non-blocking)
│   ├── outreachScraper.ts           # Main scraping worker process
│   ├── outreachPoster.ts            # Outreach posting worker (comments, messages)
│   └── emailSearch.ts               # (existing) Email extraction from pages
│
├── modules/                          # Business logic modules
│   ├── outreach/                     # Outreach module
│   │   ├── OutreachModule.ts        # Main module class
│   │   ├── OutreachController.ts    # Business logic controller
│   │   ├── ScrapingManager.ts       # Scraping orchestration
│   │   └── OutreachManager.ts      # Outreach posting orchestration
│   └── ai/                           # (existing) AI integrations
│       ├── openai.ts
│       └── deepseek.ts
│
├── model/                            # Repository/database wrapper classes
│   └── outreach.model.ts             # Outreach data access layer
│
├── controller/                       # HTTP/API controllers
│   └── outreach.controller.ts       # Outreach API controller
│
├── main-process/communication/       # IPC handlers
│   └── outreach-ipc.ts              # Outreach IPC handlers (main process)
│
├── api/                              # Remote API client definitions
│   └── ai-outreach-api.ts           # AI service API client
│
├── views/pages/                      # Vue frontend components
│   └── outreach/                     # Outreach UI pages
│       ├── ScrapingTask.vue         # Create/manage scraping tasks
│       ├── ContactList.vue          # View/filter collected contacts
│       ├── MessageGeneration.vue    # Generate AI messages
│       ├── CampaignManagement.vue   # Email campaigns and sending
│       ├── CommentPosting.vue      # Post website comments
│       └── DirectMessaging.vue     # Send direct messages/contact forms
│
└── views/lang/                       # i18n translations
    ├── en.ts                         # English translations (update)
    └── zh.ts                         # Chinese translations (update)

test/
├── modules/
│   └── outreach/                    # Outreach module tests
│       ├── scraping.test.ts          # Scraping functionality tests
│       ├── message-generation.test.ts # AI message generation tests
│       ├── comment-posting.test.ts   # Comment posting tests
│       └── direct-messaging.test.ts  # Direct message sending tests
└── integration/
    └── outreach-workflow.test.ts    # End-to-end workflow tests
```

**Structure Decision**: This is an Electron desktop application (Option 1: Single project) with multi-process architecture. The outreach feature follows the existing project patterns:

- **Entities**: TypeORM entities in `src/entity/` following existing patterns (e.g., `SearchTask.entity.ts`, `VideoDownloadEntity`)
- **Strategy Pattern**: Scraper strategies in `src/strategy/` following the existing `VideoPublishStrategy` pattern
- **Child Processes**: Scraping worker in `src/childprocess/` following existing `googleScraper.ts`, `baiduScraper.ts` patterns
- **IPC Handlers**: Registered in `src/main-process/communication/` following existing patterns
- **Modules**: Business logic in `src/modules/` with controller and module separation
- **Frontend**: Vue components in `src/views/pages/outreach/` with i18n translations

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitutional violations - this section is not applicable.
