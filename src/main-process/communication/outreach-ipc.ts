import { ipcMain, BrowserWindow } from 'electron';
import { OutreachController } from '../../modules/outreach/OutreachController';
import { ProcessMessage } from '../../entityTypes/processMessage-type';

// IPC Channel Names
export const OUTREACH_SCRAPER_START = 'outreach-scraper-start';
export const OUTREACH_SCRAPER_STOP = 'outreach-scraper-stop';
export const OUTREACH_SCRAPER_PROGRESS = 'outreach-scraper-progress';
export const OUTREACH_SCRAPER_STATUS = 'outreach-scraper-status';

export const OUTREACH_CONTACT_LIST = 'outreach-contact-list';
export const OUTREACH_CONTACT_GET = 'outreach-contact-get';
export const OUTREACH_CONTACT_UPDATE = 'outreach-contact-update';
export const OUTREACH_CONTACT_DELETE = 'outreach-contact-delete';

export const OUTREACH_CAMPAIGN_CREATE = 'outreach-campaign-create';
export const OUTREACH_CAMPAIGN_SEND = 'outreach-campaign-send';
export const OUTREACH_CAMPAIGN_STATUS = 'outreach-campaign-status';
export const OUTREACH_CAMPAIGN_LIST = 'outreach-campaign-list';

// Controller instance
let controller: OutreachController | null = null;

/**
 * Register all outreach IPC handlers
 */
export function registerOutreachIpcHandlers(win: BrowserWindow): void {
    controller = new OutreachController();

    // ==================== Scraping Task Handlers ====================

    ipcMain.handle(OUTREACH_SCRAPER_START, async (event, arg) => {
        const request = JSON.parse(arg) as any;
        const task = await controller!.createScrapingTask(
            request.name,
            request.description || undefined,
            request.targetUrls
        );

        // Return created task
        event.sender.send(OUTREACH_SCRAPER_START, JSON.stringify({
            success: true,
            taskId: task.id
        }));
    });

    ipcMain.handle(OUTREACH_SCRAPER_STATUS, async (event, arg) => {
        const taskId = JSON.parse(arg) as any;
        const task = await controller!!.getScrapingTaskStatus(taskId);

        event.sender.send(OUTREACH_SCRAPER_STATUS, JSON.stringify({
            success: true,
            task
        }));
    });

    // ==================== Contact Handlers ====================

    ipcMain.handle(OUTREACH_CONTACT_LIST, async (event, arg) => {
        const request = JSON.parse(arg) as any;
        const contacts = await controller!.getContactsByTask(request.taskId);

        event.sender.send(OUTREACH_CONTACT_LIST, JSON.stringify({
            success: true,
            contacts
        }));
    });

    ipcMain.handle(OUTREACH_CONTACT_GET, async (event, arg) => {
        const contactId = JSON.parse(arg) as any;
        const contact = await controller!?.getContactById(contactId);

        event.sender.send(OUTREACH_CONTACT_GET, JSON.stringify({
            success: true,
            contact
        }));
    });

    ipcMain.handle(OUTREACH_CONTACT_DELETE, async (event, arg) => {
        const contactId = JSON.parse(arg) as any;
        await controller!?.deleteContact(contactId);

        event.sender.send(OUTREACH_CONTACT_DELETE, JSON.stringify({
            success: true
        }));
    });

    // ==================== Campaign Handlers ====================

    ipcMain.handle(OUTREACH_CAMPAIGN_CREATE, async (event, arg) => {
        const request = JSON.parse(arg) as any;
        const campaign = await controller!?.createCampaign(
            request.name,
            request.contactIds
        );

        event.sender.send(OUTREACH_CAMPAIGN_CREATE, JSON.stringify({
            success: true,
            campaignId: campaign.id
        }));
    });

    ipcMain.handle(OUTREACH_CAMPAIGN_SEND, async (event, arg) => {
        const campaignId = JSON.parse(arg) as any;
        await controller!?.sendCampaign(campaignId);

        event.sender.send(OUTREACH_CAMPAIGN_SEND, JSON.stringify({
            success: true
        }));
    });

    ipcMain.handle(OUTREACH_CAMPAIGN_STATUS, async (event, arg) => {
        const campaignId = JSON.parse(arg) as any;
        const campaign = await controller!?.getCampaignStatus(campaignId);

        event.sender.send(OUTREACH_CAMPAIGN_STATUS, JSON.stringify({
            success: true,
            campaign
        }));
    });

    ipcMain.handle(OUTREACH_CAMPAIGN_LIST, async (event) => {
        const campaigns = await controller!?.getAllCampaigns();

        event.sender.send(OUTREACH_CAMPAIGN_LIST, JSON.stringify({
            success: true,
            campaigns
        }));
    });

    // Progress event listener (from child process). parentPort exists only in worker threads, not in main process.
    if (process.parentPort) {
        process.parentPort.on('message', async (e) => {
            const pme = JSON.parse(e.data) as ProcessMessage<any>;

            if (pme.action === OUTREACH_SCRAPER_PROGRESS) {
                // Broadcast progress to renderer
                win?.webContents.send(OUTREACH_SCRAPER_PROGRESS, JSON.stringify(pme.data));
            }
        });
    }
}
