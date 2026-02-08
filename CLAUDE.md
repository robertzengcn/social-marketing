# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is an Electron-based desktop application for social media marketing automation across platforms like YouTube, Bilibili, Facebook, Twitter, and Baidu. The app handles video downloading/publishing, email marketing, web scraping, and scheduled tasks using Puppeteer for browser automation and TypeORM with SQLite for local data persistence.

**Key Technologies:**
- Electron 35+ with Vue 3 + Vuetify frontend
- TypeScript with decorators enabled
- TypeORM with SQLite (better-sqlite3)
- Puppeteer (rebrowser-puppeteer) with stealth plugins
- Node.js worker threads for background tasks

## Common Commands

### Development
```bash
# Start Electron in development mode
yarn start

# Start Vite dev server for renderer process
yarn dev

# Type checking (run in parallel)
tsc --noEmit --watch
# or for Vue components
vue-tsc --noEmit --watch
```

### Building & Packaging
```bash
# Build for production
yarn build

# Package for specific platforms
yarn make-win:test     # Windows test build
yarn make-mac:test     # macOS test build
yarn make-linux:test   # Linux test build

yarn make-win:prod     # Windows production build
yarn make-mac:prod     # macOS production build
yarn make-linux:prod   # Linux production build

# Create all installers
yarn make-installer
```

### Testing
```bash
# Run all tests
npm test

# Run single test module (example: video URL list)
npx mocha test test/modules --grep video-url-list

# Run specific test files
yarn testdownload           # Bilibili video download test
yarn vitest-googlescraper   # Google scraper tests
yarn vitest-bibiliscraper   # Bilibili scraper tests

# Debug with DEBUG logging
DEBUG='bilibili-scraper:Scraper' npm run testdownload
```

### CLI Operations
```bash
# Initialize database
npm run init

# Login to social platform for campaign
npm run login -c "campaign-id"

# Run task from command line
npm run task -t "task-id"
```

### Native Module Rebuild
```bash
# Rebuild better-sqlite3 for Electron
yarn rebuild-better-sqlite
```

## Architecture

### Multi-Process Electron Architecture

The app uses Electron's multi-process architecture with additional worker processes:

1. **Main Process** (`src/background.ts`)
   - Entry point for Electron app
   - Manages BrowserWindow, IPC handlers, lifecycle
   - Registers all IPC communication channels

2. **Renderer Process** (`src/views/**/*.vue`)
   - Vue 3 frontend with Vuetify components
   - Communicates with main via `contextBridge` IPC (defined in `src/preload.ts`)

3. **Worker Processes**:
   - `src/taskCode.ts` - Handles video downloads, email tasks, search scraping
   - `src/utilityCode.ts` - Standalone utility worker
   - `src/buckEmail.ts` - Email processing worker
   - `src/worker.ts` - Background worker thread

### IPC Communication Pattern

All IPC handlers are registered in `src/main-process/communication/index.ts`:

```typescript
// To add new IPC functionality:
// 1. Create handler file in src/main-process/communication/
// 2. Register in index.ts
export function registerCommunicationIpcHandlers(win: BrowserWindow) {
    registerVideoIpcHandlers()
    registerScheduleIpcHandlers()
    // ... add your handler here
}
```

IPC handlers use specific naming patterns:
- `src/main-process/communication/*-ipc.ts` - Feature-specific IPC handlers
- `src/main-process/communication/sync-msg.ts` - Synchronous messages
- `src/main-process/communication/async-msg.ts` - Asynchronous messages

### Database Configuration

TypeORM configuration is in `src/config/SqliteDb.ts`. **Important:** When adding new entities:

1. Create entity class in `src/entity/`
2. Import and add to DataSource `entities` array in `SqliteDb.ts`
3. Entities use `@Entity()` decorator with decorators from `src/entity/order.decorator.ts`

Example entities include:
- `VideoDownloadEntity`, `VideoDownloadTaskEntity` - Video download management
- `EmailMarketingTaskEntity`, `EmailSearchTaskEntity` - Email tasks
- `ScheduleTaskEntity`, `ScheduleExecutionLogEntity` - Scheduled tasks
- `ProxyEntity`, `ProxyCheckEntity` - Proxy management
- `SystemSettingEntity`, `SystemSettingGroupEntity` - App settings

### Child Process Pattern

Worker processes communicate via `ProcessMessage<T>` type defined in `src/entityTypes/processMessage-type.ts`:

```typescript
// In worker (taskCode.ts):
process.parentPort.on('message', async (e) => {
    const pme = JSON.parse(e.data) as ProcessMessage<any>
    switch (pme.action) {
        case "searchscraper": {
            // Handle action
            const message: ProcessMessage<ResultType> = {
                action: "response-action",
                data: result
            }
            process.parentPort.postMessage(JSON.stringify(message))
        }
    }
})
```

Child processes in `src/childprocess/`:
- `userSearch.ts` - Search engine scraping (Google, Bing, Baidu)
- `emailSearch.ts` - Email extraction from websites
- `emailSend.ts` - Email campaign sending
- `googleScraper.ts`, `bingScraper.ts`, `baiduScraper.ts` - Platform-specific scrapers

### Strategy Pattern for Video Publishing

Video publishing uses Strategy pattern (`src/strategy/`):

- `VideoPublishStrategy.ts` - Interface definition
- `YouTubePublishStrategy.ts` - YouTube publishing
- `BilibiliPublishStrategy.ts` - Bilibili publishing
- `BaiduVideoPublishStrategy.ts` - Baidu publishing
- `VideoPublishStrategyFactory.ts` - Factory for selecting strategy

To add new platform support:
1. Implement `VideoPublishStrategy` interface
2. Add to `VideoPublishStrategyFactory`
3. Register in IPC handlers

### Module Organization

- `src/modules/` - Business logic modules
  - `llm/` - LLM integrations (OpenAI, Ollama, DeepSeek)
  - `video/` - Video processing (YouTube, Bilibili, Douyin)
  - `videodownload/` - Video download implementations
  - `videoCaption/` - Caption generation (Whisper)
  - `lib/` - Shared utilities (database, HTTP, email)
  - `socialtask.ts`, `socialtaskrun.ts` - Social media task management
  - `ScheduleManager.ts` - Cron-based task scheduling
  - `browserManager.ts` - Puppeteer browser instance management

- `src/model/` - TypeORM repository wrapper classes (naming: `*db.ts` or `.model.ts`)
- `src/controller/` - Business logic controllers
- `src/api/` - API client definitions for remote backend calls
- `src/entityTypes/` - TypeScript type definitions
- `src/config/` - Configuration modules

### Frontend Structure

Vue components organized by feature in `src/views/pages/`:
- `socialtask/` - Social media task management
- `videodownload/` - Video download tasks
- `videopublish/` - Video publishing management
- `emailextraction/` - Email extraction tasks
- `emailmarketing/` - Email marketing campaigns
- `schedule/` - Scheduled task management
- `proxy/` - Proxy configuration
- `systemsetting/` - Application settings

### External Module Configuration

Platform-specific external modules are configured in:
- `src/config/WinExtraModuleConfig.ts` - Windows (yt-dlp.exe)
- `src/config/MacExtraModuleConfig.ts` - macOS (yt-dlp binary)
- `src/config/LinuxExtraModuleConfig.ts` - Linux (yt-dlp binary)

These modules are managed by `ExtraModulesModule` and downloaded from remote backend.

## Important Configuration Files

- `forge.config.js` - Electron Forge build configuration
- Environment files: `.env.development`, `.env.production`, `.env.test`
- `vite.*.config.mjs` - Separate Vite configs for each Electron process
- `package.json` - Contains all npm scripts and dependencies

## Development Notes

- **Always use yarn** for package management (per electron-rules.mdc)
- Node.js version requirement: `>=20.18.3`
- The app requires a remote backend service for data persistence and account credentials
- Proxy support is integrated throughout for web scraping tasks
- Stealth plugins are used with Puppeteer to avoid detection
- Logging uses `electron-log` with file output to `userData/logs/`
- Translation support via `vue-i18n` with translations in `src/views/lang/`

## UI Localization (i18n)

**CRITICAL: All user-facing text MUST be translated.**

The app uses `vue-i18n` for internationalization with English and Chinese support.

### Translation Files
- `src/views/lang/en.ts` - English translations
- `src/views/lang/zh.ts` - Chinese translations (简体中文)
- `src/views/lang/index.ts` - i18n configuration

### When Updating UI

1. **Use the `t()` function** (composition API) or `$t()` (options API) for all user-facing text:

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <v-btn>{{ t('common.confirm') }}</v-btn>
  <v-text-field :label="t('common.fill_require_field')" />
</template>
```

2. **Add translation keys to BOTH language files**:

```typescript
// src/views/lang/en.ts
export default {
  myFeature: {
    title: "My Feature",
    description: "This is a new feature",
    save_button: "Save"
  }
}

// src/views/lang/zh.ts
export default {
  myFeature: {
    title: "我的功能",
    description: "这是一个新功能",
    save_button: "保存"
  }
}
```

3. **Organize translations by feature** - Use nested objects to group related translations (e.g., `route`, `common`, `socialtask`, `videodownload`)

4. **Hardcoded strings are NOT allowed** in templates for user-facing text. Only use hardcoded strings for:
   - CSS classes
   - API keys/identifiers
   - Technical constants
   - Debug logging

### Example Pattern

```vue
<!-- ❌ WRONG - hardcoded text -->
<template>
  <v-card-title>Create Task</v-card-title>
  <v-btn>Submit</v-btn>
</template>

<!-- ✅ CORRECT - using translations -->
<template>
  <v-card-title>{{ t('socialtask.create_task') }}</v-card-title>
  <v-btn>{{ t('common.submit') }}</v-btn>
</template>
```

## Adding New Features

1. **New Database Entity**: Add to `src/entity/`, import in `src/config/SqliteDb.ts`
2. **New IPC Handler**: Create in `src/main-process/communication/`, register in `index.ts`
3. **New Frontend Page**: Add Vue component to `src/views/pages/`, update router, **add translations to `src/views/lang/en.ts` and `src/views/lang/zh.ts`**
4. **New Worker Task**: Add action handler to `src/taskCode.ts` with corresponding message type
5. **New Social Platform**: Implement strategy in `src/strategy/`, register in factory
6. **UI Text Changes**: Always update both `src/views/lang/en.ts` and `src/views/lang/zh.ts` - never hardcode user-facing text in components
