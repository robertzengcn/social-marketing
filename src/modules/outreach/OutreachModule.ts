import { OutreachModel } from "../../model/outreach.model";
import { OutreachTaskEntity } from "../../entity/OutreachTask.entity";
import { OutContactEntity } from "../../entity/OutContact.entity";
import { OutreachMessageEntity } from "../../entity/OutreachMessage.entity";
import { OutreachCampaignEntity } from "../../entity/OutreachCampaign.entity";

/**
 * Outreach module business logic
 * Coordinates outreach operations
 */
export class OutreachModule {
  private model: OutreachModel;

  constructor() {
    this.model = new OutreachModel();
  }

  // ==================== Scraping Task Operations ====================

  async createScrapingTask(
    name: string,
    description: string | undefined,
    targetUrls: string[],
    accountId?: number
  ): Promise<OutreachTaskEntity> {
    const task = await this.model.createTask({
      name,
      description,
      target_urls: JSON.stringify(targetUrls),
      status: 0, // pending
      total_contacts: 0,
      account_id: accountId ?? undefined,
    });

    return task;
  }

  async startScrapingTask(taskId: number): Promise<void> {
    // Update task status to running
    await this.model.updateTask(taskId, { status: 1 });

    // Spawn child process worker to handle scraping
    // This will be handled by IPC handlers
  }

  async getScrapingTaskStatus(
    taskId: number
  ): Promise<OutreachTaskEntity | null> {
    return await this.model.findTaskById(taskId);
  }

  // ==================== Contact Operations ====================

  async getContactsByTask(taskId: number): Promise<OutContactEntity[]> {
    return await this.model.findContactsByTask(taskId);
  }

  async getContactById(contactId: number): Promise<OutContactEntity | null> {
    return await this.model.findContactById(contactId);
  }

  async updateContactStatus(contactId: number, status: number): Promise<void> {
    await this.model.updateContact(contactId, { status });
  }

  async deleteContact(contactId: number): Promise<void> {
    await this.model.deleteContact(contactId);
  }

  // ==================== Message Generation ====================

  async generateMessageForContact(
    contactId: number,
    message: string,
    aiMetadata: string | undefined
  ): Promise<OutreachMessageEntity> {
    const newMessage = await this.model.createMessage({
      content: message,
      ai_metadata: aiMetadata ?? JSON.stringify({}),
      user_edited: false,
      reviewed: false,
      contact_id: contactId,
    });

    // Update contact status
    await this.model.updateContact(contactId, { status: 1 }); // message_generated

    return newMessage;
  }

  async updateMessageContent(
    messageId: number,
    content: string
  ): Promise<void> {
    await this.model.updateMessage(messageId, {
      content,
      user_edited: true,
    });
  }

  async reviewMessage(messageId: number): Promise<void> {
    await this.model.updateMessage(messageId, {
      reviewed: true,
    });
  }

  // ==================== Campaign Operations ====================

  async createCampaign(
    name: string,
    contactIds: number[]
  ): Promise<OutreachCampaignEntity> {
    const campaign = await this.model.createCampaign({
      name,
      status: 0, // preparing
      total_contacts: contactIds.length,
      sent_count: 0,
      failed_count: 0,
    });

    // Assign contacts to campaign
    for (const contactId of contactIds) {
      await this.model.updateContact(contactId, {
        campaign_id: campaign.id,
      });
    }

    return campaign;
  }

  async sendCampaign(campaignId: number): Promise<void> {
    // Update campaign status to sending
    await this.model.updateCampaign(campaignId, { status: 1 });

    // Trigger sending process
    // This will be handled by worker process
  }

  async getCampaignStatus(
    campaignId: number
  ): Promise<OutreachCampaignEntity | null> {
    return await this.model.findCampaignById(campaignId);
  }

  async getCampaignStats(campaignId: number) {
    return await this.model.getCampaignStats(campaignId);
  }

  // ==================== Statistics ====================

  async getTaskStats(taskId: number) {
    return await this.model.getContactStats(taskId);
  }

  async getAllCampaigns(): Promise<OutreachCampaignEntity[]> {
    return await this.model.findAllCampaigns();
  }

  async getAllScrapingTasks(): Promise<OutreachTaskEntity[]> {
    return await this.model.findAllTasks();
  }
}
