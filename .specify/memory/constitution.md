<!--
SYNC IMPACT REPORT
==================
Version Change: 0.0.0 → 1.0.0
Rationale: Initial constitution ratification with three core principles

Modified Principles: N/A (initial version)

Added Sections:
- Core Principles: Type Safety, Non-Blocking Architecture, UI Internationalization
- Governance: Amendment procedure, versioning policy, compliance review

Removed Sections: None

Templates Status:
✅ plan-template.md - Reviewed, Constitution Check section compatible
✅ spec-template.md - Reviewed, requirements alignment verified
✅ tasks-template.md - Reviewed, task categorization compatible
⚠ agent-file-template.md - No agent-specific references to update (generic)
⚠ checklist-template.md - Not reviewed yet (pending)

Follow-up TODOs: None
-->

# Social Marketing Automation Constitution

## Core Principles

### I. Type Safety (NON-NEGOTIABLE)

**Rule**: All TypeScript code MUST use explicit types. The `any` type is PROHIBITED except in documented exceptional circumstances.

**Requirements**:
- Every function parameter MUST have an explicit type annotation
- Every return value MUST have an explicit type annotation
- Every variable MUST be typed or inferred from a typed initialization
- Generic types MUST be properly constrained with appropriate type parameters
- Type definitions MUST be created for external libraries if not already available

**Exceptions** (must be documented in code comments):
- Interoperability with untyped external libraries where `unknown` cannot be used
- Specific runtime type validation scenarios where the type genuinely cannot be determined statically
- Migration of legacy code (must have ticket and expiration date)

**Rationale**: Type safety is the primary advantage of TypeScript. Using `any` defeats this purpose and introduces runtime errors that the compiler should catch. Proper types enable:
- Early error detection at compile time
- Better IDE autocomplete and refactoring
- Self-documenting code
- Prevention of entire classes of null/undefined errors

**Examples**:

```typescript
// ❌ WRONG - using any
function processUserData(data: any) {
    return data.name.toUpperCase()
}

// ✅ CORRECT - explicit interface
interface UserData {
    name: string
    email: string
}

function processUserData(data: UserData): string {
    return data.name.toUpperCase()
}

// ❌ WRONG - untyped array
const items = []

// ✅ CORRECT - typed array
const items: string[] = []
// or
const items: Array<UserData> = []
```

---

### II. Non-Blocking Architecture (NON-NEGOTIABLE)

**Rule**: Code that blocks the main process MUST be executed in child processes or worker threads.

**Requirements**:
- All Puppeteer/browser automation code MUST run in child processes
- Long-running I/O operations (file downloads, network scraping) MUST be offloaded from main process
- CPU-intensive operations MUST use worker threads or child processes
- Main process MUST remain responsive to IPC and Electron events at all times
- Child process communication MUST use the `ProcessMessage<T>` pattern defined in `src/entityTypes/processMessage-type.ts`

**Blocking Operations That Require Child Processes**:
- Puppeteer browser automation (already in `src/taskCode.ts`, `src/utilityCode.ts`, `src/buckEmail.ts`)
- Video downloading and processing (yt-dlp, ffmpeg operations)
- Web scraping (Google, Bing, Baidu scrapers in `src/childprocess/`)
- Email sending operations
- Large file operations
- Database migrations or bulk operations

**Rationale**: Electron's main process handles:
- Window management and lifecycle
- IPC communication between renderer and main
- Native OS integration
- System tray and menu interactions

Blocking the main process causes:
- Unresponsive UI (windows freeze, menus don't open)
- IPC timeouts and communication failures
- Poor user experience and perceived application hangs
- Potential watchdog terminations by the OS

**Architecture Pattern**:

```typescript
// ❌ WRONG - blocking main process
import puppeteer from 'puppeteer'

async function scrapeWebsite(url: string) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    // ... blocking operations in main process
}

// ✅ CORRECT - child process with ProcessMessage
// In main process (IPC handler):
async function triggerScraping(url: string): Promise<ScrapingResult> {
    const message: ProcessMessage<{url: string}> = {
        action: "searchscraper",
        data: { url }
    }
    // Send to worker process
    return await sendToWorker(message)
}

// In child process (src/taskCode.ts or src/childprocess/):
process.parentPort.on('message', async (e) => {
    const pme = JSON.parse(e.data) as ProcessMessage<any>
    switch (pme.action) {
        case "searchscraper": {
            // Puppeteer operations here
            const result = await performScraping(pme.data.url)
            const response: ProcessMessage<ScrapingResult> = {
                action: "response-searchscraper",
                data: result
            }
            process.parentPort.postMessage(JSON.stringify(response))
        }
    }
})
```

**Existing Child Processes** (use these patterns):
- `src/taskCode.ts` - Video downloads, email tasks, search scraping
- `src/utilityCode.ts` - Utility worker
- `src/buckEmail.ts` - Email processing
- `src/worker.ts` - Background worker thread
- `src/childprocess/*.ts` - Platform-specific scrapers

---

### III. UI Internationalization (NON-NEGOTIABLE)

**Rule**: All user-facing text in the UI MUST be internationalized using `vue-i18n` with translations in both English and Chinese.

**Requirements**:
- User-facing text MUST use the `t()` function (composition API) or `$t()` (options API)
- All new UI text MUST have translation keys in BOTH `src/views/lang/en.ts` AND `src/views/lang/zh.ts`
- Hardcoded strings are PROHIBITED in Vue templates for user-facing text
- Translation keys MUST be organized by feature using nested objects
- Existing hardcoded strings MUST be migrated to translations when modified

**Allowed Hardcoded Strings** (non-user-facing):
- CSS class names
- API endpoint identifiers
- Technical constants
- Debug logging messages
- Internal error codes

**Rationale**: The application serves a multilingual user base (English and Chinese). Hardcoded text:
- Makes localization impossible
- Creates technical debt when translation is needed later
- Violates the separation of content from presentation
- Prevents the app from being used by international users

**Pattern**:

```vue
<!-- ❌ WRONG - hardcoded user-facing text -->
<template>
  <v-card-title>Create Task</v-card-title>
  <v-btn>Submit</v-btn>
  <v-text-field label="Enter email address" />
</template>

<!-- ✅ CORRECT - using translations -->
<template>
  <v-card-title>{{ t('socialtask.create_task') }}</v-card-title>
  <v-btn>{{ t('common.submit') }}</v-btn>
  <v-text-field :label="t('socialtask.email_address')" />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
```

**Translation Files**:

```typescript
// src/views/lang/en.ts
export default {
  socialtask: {
    create_task: "Create Task",
    email_address: "Email Address",
    submit_button: "Submit"
  }
}

// src/views/lang/zh.ts (简体中文)
export default {
  socialtask: {
    create_task: "创建任务",
    email_address: "电子邮件地址",
    submit_button: "提交"
  }
}
```

**Key Organization**:
- Group translations by feature (e.g., `socialtask`, `videodownload`, `emailextraction`)
- Use common translations in `common` namespace (e.g., `common.submit`, `common.cancel`)
- Maintain consistency between `en.ts` and `zh.ts` key structures

---

## Development Workflow

### Code Review Gates

All pull requests MUST verify compliance with:
1. **Type Safety**: No new `any` types without documented exception
2. **Non-Blocking**: No blocking operations in main process
3. **Internationalization**: All UI changes include translations

### Implementation Order

When implementing new features:
1. Design types and interfaces first (Type Safety principle)
2. Determine if feature requires child process (Non-Blocking principle)
3. Create translation keys for UI text before implementing UI (Internationalization principle)

### Violation Justification

If a principle cannot be followed:
1. Document the violation in a code comment
2. Create a GitHub issue tracking the violation
3. Explain why no alternative exists
4. Get explicit approval from a maintainer
5. Set a timeline for resolution

## Governance

### Amendment Procedure

1. Propose constitutional changes via GitHub issue with "constitution" label
2. Changes MUST include rationale and impact analysis
3. Discussion period: minimum 7 days
4. Approval requires majority consensus from maintainers
5. Update constitution version and amend date
6. Update all dependent templates and documentation

### Versioning Policy

- **MAJOR** (X.0.0): Backward-incompatible removal or redefinition of principles
- **MINOR** (x.Y.0): New principle added or existing principle materially expanded
- **PATCH** (x.y.Z): Clarifications, wording improvements, non-semantic changes

### Compliance Review

- All code changes MUST comply with current constitution
- Violations found in review MUST be addressed before merge
- Existing violations MUST have tracking issues
- Monthly compliance audit of recent commits
- Constitution itself reviewed quarterly for relevance

### Runtime Guidance

For day-to-day development guidance beyond constitutional principles, refer to `CLAUDE.md` which contains:
- Project-specific commands and build procedures
- Architecture patterns and module organization
- IPC communication patterns
- Database configuration
- Testing strategies

**Version**: 1.0.0 | **Ratified**: 2026-02-08 | **Last Amended**: 2026-02-08
