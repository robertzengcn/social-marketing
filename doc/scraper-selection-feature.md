# Scraper Selection Feature Implementation

**Date**: 2026-03-25
**Feature**: UI Scraper Selection for Scraping Tasks

## Overview

A scraper selection dropdown has been added to the scraping task form, allowing users to explicitly choose which scraper to use for their tasks. This provides better user control, clearer UX, and optimized default settings for each scraper type.

## Changes Made

### 1. Vue Component Updates

**File**: `src/views/pages/outreach/ScrapingTask.vue`

**Added**:
- **Scraper Type Dropdown**: `v-select` component with icon and description display
- **LinkedIn Warning Alert**: Shows when LinkedIn scraper is selected
- **Auto-Configuration**: Options automatically update based on selected scraper
- **Scraper Options Data**: Computed property with available scrapers and their defaults

**Key Features**:
```vue
<v-select
    v-model="formData.scraper_type"
    :items="scraperOptions"
    :label="t('outreach.scraper_type')"
    :hint="t('outreach.scraper_type_hint')"
    persistent-hint
    required
    :rules="[requiredRule]"
>
    <!-- Custom item template with icons -->
    <!-- Custom selection template with chips -->
</v-select>

<v-alert
    v-if="formData.scraper_type === 'linkedin'"
    type="warning"
>
    {{ t('outreach.linkedin_warning') }}
</v-alert>
```

**Script Updates**:
```typescript
const formData = reactive({
    name: '',
    target_urls: '',
    scraper_type: 'generic',  // NEW: Default to generic
    options: {
        aggressive_mode: false,
        max_concurrency: 5,
        use_proxy: false,
        delay_ms: 1000,      // NEW
        timeout: 30000       // NEW
    }
});

// Available scrapers with configurations
const scraperOptions = computed(() => [
    {
        title: t('outreach.scraper_generic'),
        value: 'generic',
        icon: 'mdi-web',
        description: t('outreach.scraper_generic_desc'),
        defaultOptions: { /* ... */ }
    },
    {
        title: t('outreach.scraper_linkedin'),
        value: 'linkedin',
        icon: 'mdi-linkedin',
        description: t('outreach.scraper_linkedin_desc'),
        defaultOptions: { /* ... */ }
    }
]);

// Auto-update options when scraper type changes
function updateOptionsForScraper() {
    const selectedScraper = scraperOptions.value.find(s => s.value === formData.scraper_type);
    if (selectedScraper) {
        formData.options = {
            ...selectedScraper.defaultOptions,
            use_proxy: formData.options.use_proxy  // Preserve user's proxy choice
        };
    }
}
```

**API Call Update**:
```typescript
const response = await window.api.outreach.createScrapingTask({
    name: formData.name,
    description: '',
    targetUrls: urls,
    scraperType: formData.scraper_type,  // NEW: Explicit scraper type
    options: formData.options
});
```

### 2. Translation Updates

**English** (`src/views/lang/en.ts`):
```typescript
scraper_type: "Scraper Type",
scraper_type_hint: "Select the type of scraper to use for this task",
scraper_generic: "Generic Web Scraper",
scraper_generic_desc: "Works with any website. Good for blogs, contact pages, and general web scraping.",
scraper_linkedin: "LinkedIn Scraper",
scraper_linkedin_desc: "Specialized for LinkedIn profiles, companies, and schools. May require login for full access.",
linkedin_warning: "LinkedIn has strict anti-bot measures. Use conservative settings with 2+ second delays. Many profiles require login to view contact information.",
aggressive_mode_hint: "High-speed scraping (20+ req/s) - may trigger anti-bot measures",
max_concurrency_hint: "Number of concurrent page operations",
use_proxy_hint: "Rotate proxies to avoid IP blocking",
delay_ms_hint: "Delay between requests in milliseconds",
timeout_hint: "Page load timeout in milliseconds",
total_urls: "Total URLs"
```

**Chinese** (`src/views/lang/zh.ts`):
```typescript
scraper_type: "抓取器类型",
scraper_type_hint: "选择用于此任务的抓取器类型",
scraper_generic: "通用网页抓取器",
scraper_generic_desc: "适用于任何网站。适合博客、联系页面和一般网页抓取。",
scraper_linkedin: "LinkedIn抓取器",
scraper_linkedin_desc: "专门用于LinkedIn个人资料、公司和学校。可能需要登录才能完全访问。",
linkedin_warning: "LinkedIn有严格的反机器人措施。请使用保守设置，延迟2秒以上。许多个人资料需要登录才能查看联系信息。",
aggressive_mode_hint: "高速抓取（20+次/秒）- 可能触发反机器人措施",
max_concurrency_hint: "并发页面操作数",
use_proxy_hint: "轮换代理以避免IP封锁",
delay_ms_hint: "请求之间的延迟（毫秒）",
timeout_hint: "页面加载超时（毫秒）",
total_urls: "总网址数"
```

### 3. Documentation Updates

**File**: `doc/article-scraping-guide.md`

Added section "6. UI Scraper Selection" with:
- Overview of the feature
- Table comparing available scrapers
- UI features explanation
- Example flow showing how it works
- Benefits of the feature

## User Experience

### Before

Users had to:
- Rely on automatic scraper detection based on URL
- Manually configure options for each scraper type
- Know optimal settings for different platforms
- No visual indication of which scraper would be used

### After

Users can:
- **Explicitly choose** the scraper type from a dropdown
- **See descriptions** of what each scraper does
- **Get optimized defaults** for the selected scraper
- **Receive warnings** for scrapers with special requirements
- **Override defaults** if needed

## Scraper Configurations

### Generic Web Scraper

**Best For**: Any website (blogs, contact pages, general web scraping)

**Default Settings**:
```typescript
{
    aggressive_mode: false,
    max_concurrency: 5,
    use_proxy: false,
    delay_ms: 1000,      // 1 second
    timeout: 30000       // 30 seconds
}
```

**Characteristics**:
- Fastest scraping speed
- Handles most websites
- No special requirements
- Works with HTTP/HTTPS URLs

### LinkedIn Scraper

**Best For**: LinkedIn profiles, companies, schools

**Default Settings**:
```typescript
{
    aggressive_mode: false,
    max_concurrency: 1,    // LinkedIn blocks concurrent requests
    use_proxy: false,
    delay_ms: 2000,        // 2 seconds (LinkedIn rate limits)
    timeout: 30000         // 30 seconds
}
```

**Characteristics**:
- Conservative settings to avoid blocking
- LinkedIn-specific selectors
- Handles dynamic content loading
- Detects sign-in walls and CAPTCHAs
- ⚠️ **Warning shown** about LinkedIn's anti-bot measures

## API Changes

### Request Format

**Before**:
```typescript
{
    name: "Task Name",
    targetUrls: ["https://example.com"],
    options: { /* ... */ }
}
```

**After**:
```typescript
{
    name: "Task Name",
    targetUrls: ["https://example.com"],
    scraperType: "generic",  // NEW: Explicit scraper selection
    options: { /* ... */ }
}
```

### Backend Implementation (Required)

The IPC handler and controller need to be updated to accept the `scraperType` parameter:

```typescript
// In IPC handler (outreach-ipc.ts)
ipcMain.handle(OUTREACH_SCRAPER_START, async (event, arg) => {
    const request = JSON.parse(arg) as any;
    const task = await controller!.createScrapingTask(
        request.name,
        request.description || undefined,
        request.targetUrls,
        request.scraperType  // NEW: Pass scraper type to controller
    );
    // ...
});
```

```typescript
// In controller (OutreachController.ts)
async createScrapingTask(
    name: string,
    description: string | undefined,
    targetUrls: string[],
    scraperType: string = 'generic'  // NEW: With default
): Promise<OutreachTaskEntity> {
    // Create task with specified scraper type
    // Pass to child process worker
}
```

## Benefits

### For Users

1. **Clarity**: Clear indication of which scraper will be used
2. **Control**: Explicit choice instead of relying on auto-detection
3. **Guidance**: Descriptions help users choose the right scraper
4. **Safety**: Warnings for scrapers with special requirements
5. **Flexibility**: Can override defaults for specific needs

### For Developers

1. **Explicit Intent**: No ambiguity about which scraper to use
2. **Testability**: Easier to test specific scraper behavior
3. **Maintainability**: Clear separation between scrapers
4. **Extensibility**: Easy to add new scrapers to the dropdown

## Future Enhancements

Potential improvements for this feature:

1. **Dynamic Scraper List**: Automatically populate from registered scrapers
2. **URL Validation**: Warn if URLs don't match selected scraper
3. **Presets**: Save/load common scraper configurations
4. **Bulk Operations**: Apply same scraper to multiple tasks
5. **Performance Estimates**: Show expected duration based on scraper
6. **Scraper Status**: Show if scraper is available/healthy

## Testing Checklist

- [ ] Generic scraper selected by default
- [ ] Dropdown shows all available scrapers
- [ ] Icons display correctly for each scraper
- [ ] Descriptions are accurate
- [ ] LinkedIn warning appears when LinkedIn scraper selected
- [ ] Options auto-update when scraper type changes
- [ ] Proxy setting preserved when changing scrapers
- [ ] Form validation requires scraper selection
- [ ] API receives correct scraperType parameter
- [ ] Backend uses specified scraper (not auto-detection)
- [ ] Both English and Chinese translations work
- [ ] Mobile responsive layout

## Summary

The scraper selection feature provides a user-friendly interface for choosing the appropriate scraper, with optimized defaults and clear guidance. This improves the user experience and reduces the likelihood of configuration errors, especially for specialized scrapers like LinkedIn that require specific settings.

✅ **Vue component updated** with scraper selection UI
✅ **Translations added** for both English and Chinese
✅ **Documentation updated** with feature explanation
✅ **Auto-configuration** implemented for optimal defaults
✅ **Warning system** for scrapers with special requirements
✅ **API extended** to accept explicit scraper type

The feature is complete and ready for backend integration!
