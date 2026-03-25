# Outreach API Fixes

**Date**: 2026-03-25  
**Issue**: CampaignManagement.vue error - "Cannot read properties of undefined (reading 'listCampaigns')"

## Problems Fixed

### 1. Vue Compilation Error (CampaignManagement.vue)

**Error**:
```
[vue/compiler-sfc] Unexpected token, expected ";" (107:12)
const statusMap: {
    0: t('outreach.status_preparing'),
```

**Cause**: Using function calls inside object literal type annotations is invalid syntax.

**Fix**: Changed to proper TypeScript `Record` type:
```typescript
// Before (❌ Invalid)
const statusMap: {
    0: t('outreach.status_preparing'),
    1: t('outreach.status_sending'),
    ...
};

// After (✅ Valid)
const statusMap: Record<number, string> = {
    0: t('outreach.status_preparing'),
    1: t('outreach.status_sending'),
    ...
};
```

**Functions Fixed**:
- ✅ `getStatusText()` - Campaign status text
- ✅ `getStatusColor()` - Campaign status color
- ✅ `getContactStatusText()` - Contact status text
- ✅ `getContactStatusColor()` - Contact status color

### 2. Missing Outreach API (preload.ts)

**Error**:
```
TypeError: Cannot read properties of undefined (reading 'listCampaigns')
```

**Cause**: The outreach API methods weren't exposed in the preload script.

**Fix**: Added complete outreach API structure to `src/preload.ts`:

#### Added Outreach Channels to Whitelists

**Invoke Channels** (lines 309-323):
```typescript
// Outreach Channels
OUTREACH_SCRAPER_START,
OUTREACH_SCRAPER_STOP,
OUTREACH_SCRAPER_STATUS,
OUTREACH_CONTACT_LIST,
OUTREACH_CONTACT_GET,
OUTREACH_CONTACT_UPDATE,
OUTREACH_CONTACT_DELETE,
OUTREACH_MESSAGE_GENERATE,
OUTREACH_MESSAGE_BATCH_GENERATE,
OUTREACH_MESSAGE_UPDATE,
OUTREACH_MESSAGE_REVIEW,
OUTREACH_CAMPAIGN_CREATE,
OUTREACH_CAMPAIGN_SEND,
OUTREACH_CAMPAIGN_STATUS,
OUTREACH_CAMPAIGN_LIST,
```

**Receive Channels** (line 226):
```typescript
OUTREACH_SCRAPER_PROGRESS,
```

**Send Channels** (line 180):
```typescript
OUTREACH_SCRAPER_PROGRESS,
```

#### Created Outreach API Object (lines 334-369)

```typescript
outreach: {
  createScrapingTask: (data: any) => 
    ipcRenderer.invoke(OUTREACH_SCRAPER_START, JSON.stringify(data)),
  
  getScrapingTaskStatus: (taskId: number) => 
    ipcRenderer.invoke(OUTREACH_SCRAPER_STATUS, JSON.stringify(taskId)),
  
  listContacts: (filters: any) => 
    ipcRenderer.invoke(OUTREACH_CONTACT_LIST, JSON.stringify(filters)),
  
  getContact: (contactId: number) => 
    ipcRenderer.invoke(OUTREACH_CONTACT_GET, JSON.stringify(contactId)),
  
  updateContact: (data: any) => 
    ipcRenderer.invoke(OUTREACH_CONTACT_UPDATE, JSON.stringify(data)),
  
  deleteContact: (contactId: number) => 
    ipcRenderer.invoke(OUTREACH_CONTACT_DELETE, JSON.stringify(contactId)),
  
  generateMessage: (data: any) => 
    ipcRenderer.invoke(OUTREACH_MESSAGE_GENERATE, JSON.stringify(data)),
  
  generateBatchMessages: (data: any) => 
    ipcRenderer.invoke(OUTREACH_MESSAGE_BATCH_GENERATE, JSON.stringify(data)),
  
  updateMessage: (data: any) => 
    ipcRenderer.invoke(OUTREACH_MESSAGE_UPDATE, JSON.stringify(data)),
  
  reviewMessage: (messageId: number) => 
    ipcRenderer.invoke(OUTREACH_MESSAGE_REVIEW, JSON.stringify(messageId)),
  
  createCampaign: (data: any) => 
    ipcRenderer.invoke(OUTREACH_CAMPAIGN_CREATE, JSON.stringify(data)),
  
  sendCampaign: (campaignId: number) => 
    ipcRenderer.invoke(OUTREACH_CAMPAIGN_SEND, JSON.stringify(campaignId)),
  
  getCampaignStatus: (campaignId: number) => 
    ipcRenderer.invoke(OUTREACH_CAMPAIGN_STATUS, JSON.stringify(campaignId)),
  
  listCampaigns: () => 
    ipcRenderer.invoke(OUTREACH_CAMPAIGN_LIST, JSON.stringify({})),
  
  onScrapingProgress: (callback: (data: any) => void) => {
    ipcRenderer.on(OUTREACH_SCRAPER_PROGRESS, (event, data) => 
      callback(JSON.parse(data))
    );
  }
}
```

## API Usage Examples

### Scraping Tasks

```typescript
// Create scraping task
const response = await window.api.outreach.createScrapingTask({
    name: "My Campaign",
    targetUrls: ["https://example.com"],
    scraperType: "generic",
    options: {
        aggressiveMode: false,
        maxConcurrency: 5,
        delayMs: 1000
    }
});

// Get task status
const status = await window.api.outreach.getScrapingTaskStatus(taskId);

// Listen to progress
window.api.outreach.onScrapingProgress((progress) => {
    console.log('Progress:', progress);
});
```

### Contacts

```typescript
// List contacts
const contacts = await window.api.outreach.listContacts({
    taskId: 123,
    status: 0  // pending
});

// Get single contact
const contact = await window.api.outreach.getContact(contactId);

// Update contact
await window.api.outreach.updateContact({
    id: contactId,
    status: 1
});

// Delete contact
await window.api.outreach.deleteContact(contactId);
```

### Campaigns

```typescript
// Create campaign
const campaign = await window.api.outreach.createCampaign({
    name: "Email Campaign",
    contactIds: [1, 2, 3, 4, 5]
});

// Send campaign
await window.api.outreach.sendCampaign(campaignId);

// Get campaign status
const status = await window.api.outreach.getCampaignStatus(campaignId);

// List all campaigns
const campaigns = await window.api.outreach.listCampaigns();
```

### Messages

```typescript
// Generate single message
const message = await window.api.outreach.generateMessage({
    contactId: 123,
    template: "Hi {{name}},",
    tone: "professional"
});

// Generate batch messages
const result = await window.api.outreach.generateBatchMessages({
    contactIds: [1, 2, 3],
    template: "Hi {{name}},",
    tone: "friendly"
});

// Update message
await window.api.outreach.updateMessage({
    id: messageId,
    content: "Updated content"
});

// Review message
const review = await window.api.outreach.reviewMessage(messageId);
```

## Files Modified

1. **`src/views/pages/outreach/CampaignManagement.vue`**
   - Fixed TypeScript type annotations (lines 219-257)
   - Changed from invalid inline syntax to `Record<number, string>` type

2. **`src/preload.ts`**
   - Added outreach channels to invoke whitelist (lines 309-323)
   - Added outreach progress channel to receive whitelist (line 226)
   - Added outreach progress channel to send whitelist (line 180)
   - Created organized `outreach` API object (lines 334-369)

## Testing

After these fixes, the Vite dev server should:
- ✅ Compile without errors
- ✅ Expose `window.api.outreach` object
- ✅ Allow Vue components to call outreach methods
- ✅ Handle progress events from scraping operations

## Verification Steps

1. **Check API is available**:
```typescript
console.log(window.api.outreach); // Should show the outreach object
```

2. **Test campaign listing** (this was the failing operation):
```typescript
const campaigns = await window.api.outreach.listCampaigns();
console.log('Campaigns:', campaigns);
```

3. **Test scraping task creation**:
```typescript
const task = await window.api.outreach.createScrapingTask({
    name: "Test Task",
    targetUrls: ["https://example.com"],
    scraperType: "generic",
    options: {}
});
console.log('Task created:', task);
```

## Summary

Both errors have been fixed:
1. ✅ Vue compilation error resolved with proper TypeScript types
2. ✅ Outreach API properly exposed in preload script
3. ✅ All outreach channels whitelisted for IPC communication
4. ✅ Organized API structure for easy use in Vue components

The outreach feature should now work correctly! 🎉
