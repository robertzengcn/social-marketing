import { OutreachModule } from './OutreachModule';
import { AppDataSource } from '../../config/SqliteDb';
import { OutreachTaskEntity } from '../../entity/OutreachTask.entity';
import { OutContactEntity } from '../../entity/OutContact.entity';
import { OutreachMessageEntity } from '../../entity/OutreachMessage.entity';
import { OutreachCampaignEntity } from '../../entity/OutreachCampaign.entity';

/**
 * Outreach controller
 * Handles business logic for outreach operations
 */
export class OutreachController {
    private module: OutreachModule;

    constructor() {
        this.module = new OutreachModule();
    }

    // ==================== Scraping Task Management ====================

    async createScrapingTask(
        name: string,
        description: string | undefined,
        targetUrls: string[]
    ): Promise<OutreachTaskEntity> {
        return await this.module.createScrapingTask(name, description, targetUrls);
    }

    async startScrapingTask(taskId: number): Promise<void> {
        await this.module.startScrapingTask(taskId);
    }

    async getScrapingTaskStatus(taskId: number): Promise<OutreachTaskEntity | null> {
        return await this.module.getScrapingTaskStatus(taskId);
    }

    async getAllScrapingTasks(): Promise<OutreachTaskEntity[]> {
        return await this.module.getAllScrapingTasks();
    }

    // ==================== Contact Management ====================

    async getContactsByTask(taskId: number): Promise<OutContactEntity[]> {
        return await this.module.getContactsByTask(taskId);
    }

    async getContactById(contactId: number): Promise<OutContactEntity | null> {
        return await this.module.getContactById(contactId);
    }

    async deleteContact(contactId: number): Promise<void> {
        await this.module.deleteContact(contactId);
    }

    async updateContactStatus(
        contactId: number,
        status: number
    ): Promise<void> {
        await this.module.updateContactStatus(contactId, status);
    }

    // ==================== Message Generation ====================

    async generateMessageForContact(
        contactId: number,
        message: string,
        aiMetadata: string | null
    ): Promise<OutreachMessageEntity> {
        return await this.module.generateMessageForContact(contactId, message, aiMetadata);
    }

    async updateMessageContent(messageId: number, content: string): Promise<void> {
        await this.module.updateMessageContent(messageId, content);
    }

    async reviewMessage(messageId: number): Promise<void> {
        await this.module.reviewMessage(messageId);
    }

    // ==================== Campaign Management ====================

    async createCampaign(name: string, contactIds: number[]): Promise<OutreachCampaignEntity> {
        return await this.module.createCampaign(name, contactIds);
    }

    async sendCampaign(campaignId: number): Promise<void> {
        await this.module.sendCampaign(campaignId);
    }

    async getCampaignStatus(campaignId: number): Promise<OutreachCampaignEntity | null> {
        return await this.module.getCampaignStatus(campaignId);
    }

    async getAllCampaigns(): Promise<OutreachCampaignEntity[]> {
        return await this.module.getAllCampaigns();
    }

    async getCampaignStats(campaignId: number) {
        return await this.module.getCampaignStats(campaignId);
    }
}
