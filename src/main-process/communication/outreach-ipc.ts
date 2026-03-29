import { ipcMain, BrowserWindow } from "electron";
import { OutreachController } from "../../modules/outreach/OutreachController";
import { SocialAccount } from "../../modules/socialaccount";
import { ProcessMessage } from "../../entityTypes/processMessage-type";
import {
  OUTREACH_SCRAPER_START,
  OUTREACH_SCRAPER_STOP,
  OUTREACH_SCRAPER_PROGRESS,
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
  OUTREACH_ACCOUNT_LIST,
} from "../../config/channellist";

// Controller instance
let controller: OutreachController | null = null;

/**
 * Register all outreach IPC handlers
 */
export function registerOutreachIpcHandlers(win: BrowserWindow): void {
  controller = new OutreachController();

  // ==================== Scraping Task Handlers ====================

  ipcMain.handle(OUTREACH_SCRAPER_START, async (_event, arg) => {
    const request = JSON.parse(arg) as any;
    const task = await controller!.createScrapingTask(
      request.name,
      request.description || undefined,
      request.targetUrls,
      request.accountId || undefined
    );
    return { success: true, taskId: task.id };
  });

  ipcMain.handle(OUTREACH_SCRAPER_STATUS, async (_event, arg) => {
    const taskId = JSON.parse(arg) as any;
    const task = await controller!.getScrapingTaskStatus(taskId);
    return { success: true, task };
  });

  // ==================== Contact Handlers ====================

  ipcMain.handle(OUTREACH_CONTACT_LIST, async (_event, arg) => {
    const request = JSON.parse(arg) as any;
    const contacts = await controller!.getContactsByTask(request.taskId);
    return { success: true, contacts };
  });

  ipcMain.handle(OUTREACH_CONTACT_GET, async (_event, arg) => {
    const contactId = JSON.parse(arg) as any;
    const contact = await controller!.getContactById(contactId);
    return { success: true, contact };
  });

  ipcMain.handle(OUTREACH_CONTACT_UPDATE, async (_event, arg) => {
    const request = JSON.parse(arg) as any;
    await controller!.updateContactStatus(request.contactId, request.status);
    return { success: true };
  });

  ipcMain.handle(OUTREACH_CONTACT_DELETE, async (_event, arg) => {
    const contactId = JSON.parse(arg) as any;
    await controller!.deleteContact(contactId);
    return { success: true };
  });

  // ==================== Message Handlers ====================

  ipcMain.handle(OUTREACH_MESSAGE_GENERATE, async (_event, arg) => {
    const request = JSON.parse(arg) as any;
    const message = await controller!.generateMessageForContact(
      request.contactId,
      request.message,
      request.aiMetadata
    );
    return { success: true, message };
  });

  ipcMain.handle(OUTREACH_MESSAGE_BATCH_GENERATE, async (_event, arg) => {
    const request = JSON.parse(arg) as any;
    const results: Array<{
      contactId: any;
      success: boolean;
      message?: any;
      error?: string;
    }> = [];
    for (const contactId of request.contactIds) {
      try {
        const message = await controller!.generateMessageForContact(
          contactId,
          request.message,
          request.aiMetadata
        );
        results.push({ contactId, success: true, message });
      } catch (err) {
        results.push({ contactId, success: false, error: String(err) });
      }
    }
    return { success: true, results };
  });

  ipcMain.handle(OUTREACH_MESSAGE_UPDATE, async (_event, arg) => {
    const request = JSON.parse(arg) as any;
    await controller!.updateMessageContent(request.messageId, request.content);
    return { success: true };
  });

  ipcMain.handle(OUTREACH_MESSAGE_REVIEW, async (_event, arg) => {
    const messageId = JSON.parse(arg) as any;
    await controller!.reviewMessage(messageId);
    return { success: true };
  });

  // ==================== Campaign Handlers ====================

  ipcMain.handle(OUTREACH_CAMPAIGN_CREATE, async (_event, arg) => {
    const request = JSON.parse(arg) as any;
    const campaign = await controller!.createCampaign(
      request.name,
      request.contactIds
    );
    return { success: true, campaignId: campaign.id };
  });

  ipcMain.handle(OUTREACH_CAMPAIGN_SEND, async (_event, arg) => {
    const campaignId = JSON.parse(arg) as any;
    await controller!.sendCampaign(campaignId);
    return { success: true };
  });

  ipcMain.handle(OUTREACH_CAMPAIGN_STATUS, async (_event, arg) => {
    const campaignId = JSON.parse(arg) as any;
    const campaign = await controller!.getCampaignStatus(campaignId);
    return { success: true, campaign };
  });

  ipcMain.handle(OUTREACH_CAMPAIGN_LIST, async () => {
    const campaigns = await controller!.getAllCampaigns();
    return { success: true, campaigns };
  });

  // ==================== Account List Handler ====================

  ipcMain.handle(OUTREACH_ACCOUNT_LIST, async () => {
    const socialAccount = new SocialAccount();
    const response = await socialAccount.getSocialaccountlist(1, 100, "");
    const accounts = (response.data?.records || []).filter(
      (account: any) => account.cookies === true
    );
    return { success: true, accounts };
  });

  // Progress event listener (from child process). parentPort exists only in worker threads, not in main process.
  if (process.parentPort) {
    process.parentPort.on("message", async (e) => {
      const pme = JSON.parse(e.data) as ProcessMessage<any>;

      if (pme.action === OUTREACH_SCRAPER_PROGRESS) {
        // Broadcast progress to renderer
        win?.webContents.send(
          OUTREACH_SCRAPER_PROGRESS,
          JSON.stringify(pme.data)
        );
      }
    });
  }
}
