import { Repository } from 'typeorm';
import { AppDataSource } from '../config/SqliteDb';
import { OutreachTaskEntity } from '../entity/OutreachTask.entity';
import { OutContactEntity } from '../entity/OutContact.entity';
import { OutreachMessageEntity } from '../entity/OutreachMessage.entity';
import { OutreachCampaignEntity } from '../entity/OutreachCampaign.entity';
import { ScrapingLogEntity } from '../entity/ScrapingLog.entity';

/**
 * Outreach data access layer
 * Provides database operations for outreach entities
 */
export class OutreachModel {
    private taskRepo: Repository<OutreachTaskEntity>;
    private contactRepo: Repository<OutContactEntity>;
    private messageRepo: Repository<OutreachMessageEntity>;
    private campaignRepo: Repository<OutreachCampaignEntity>;
    private logRepo: Repository<ScrapingLogEntity>;

    constructor() {
        this.taskRepo = AppDataSource.getRepository(OutreachTaskEntity);
        this.contactRepo = AppDataSource.getRepository(OutContactEntity);
        this.messageRepo = AppDataSource.getRepository(OutreachMessageEntity);
        this.campaignRepo = AppDataSource.getRepository(OutreachCampaignEntity);
        this.logRepo = AppDataSource.getRepository(ScrapingLogEntity);
    }

    // ==================== Task Operations ====================

    async createTask(task: Partial<OutreachTaskEntity>): Promise<OutreachTaskEntity> {
        const newTask = this.taskRepo.create(task);
        return await this.taskRepo.save(newTask);
    }

    async findTaskById(id: number): Promise<OutreachTaskEntity | null> {
        return await this.taskRepo.findOne({
            where: { id },
            relations: ['contacts', 'scraping_logs']
        });
    }

    async findAllTasks(): Promise<OutreachTaskEntity[]> {
        return await this.taskRepo.find({
            order: { createdAt: 'DESC' }
        });
    }

    async updateTask(id: number, updates: Partial<OutreachTaskEntity>): Promise<void> {
        await this.taskRepo.update(id, updates);
    }

    // ==================== Contact Operations ====================

    async createContact(contact: Partial<OutContactEntity>): Promise<OutContactEntity> {
        const newContact = this.contactRepo.create(contact);
        return await this.contactRepo.save(newContact);
    }

    async findContactById(id: number): Promise<OutContactEntity | null> {
        return await this.contactRepo.findOne({
            where: { id },
            relations: ['message', 'task', 'campaign']
        });
    }

    async findContactsByTask(taskId: number): Promise<OutContactEntity[]> {
        return await this.contactRepo.find({
            where: { task_id: taskId },
            relations: ['message', 'campaign']
        });
    }

    async findContactsByCampaign(campaignId: number): Promise<OutContactEntity[]> {
        return await this.contactRepo.find({
            where: { campaign_id: campaignId },
            relations: ['message', 'task']
        });
    }

    async updateContact(id: number, updates: Partial<OutContactEntity>): Promise<void> {
        await this.contactRepo.update(id, updates);
    }

    async deleteContact(id: number): Promise<void> {
        await this.contactRepo.delete(id);
    }

    // ==================== Message Operations ====================

    async createMessage(message: Partial<OutreachMessageEntity>): Promise<OutreachMessageEntity> {
        const newMessage = this.messageRepo.create(message);
        return await this.messageRepo.save(newMessage);
    }

    async findMessageByContact(contactId: number): Promise<OutreachMessageEntity | null> {
        return await this.messageRepo.findOne({
            where: { contact_id: contactId },
            relations: ['contact']
        });
    }

    async updateMessage(id: number, updates: Partial<OutreachMessageEntity>): Promise<void> {
        await this.messageRepo.update(id, updates);
    }

    // ==================== Campaign Operations ====================

    async createCampaign(campaign: Partial<OutreachCampaignEntity>): Promise<OutreachCampaignEntity> {
        const newCampaign = this.campaignRepo.create(campaign);
        return await this.campaignRepo.save(newCampaign);
    }

    async findCampaignById(id: number): Promise<OutreachCampaignEntity | null> {
        return await this.campaignRepo.findOne({
            where: { id },
            relations: ['contacts']
        });
    }

    async findAllCampaigns(): Promise<OutreachCampaignEntity[]> {
        return await this.campaignRepo.find({
            order: { createdAt: 'DESC' }
        });
    }

    async updateCampaign(id: number, updates: Partial<OutreachCampaignEntity>): Promise<void> {
        await this.campaignRepo.update(id, updates);
    }

    // ==================== Log Operations ====================

    async createLog(log: Partial<ScrapingLogEntity>): Promise<ScrapingLogEntity> {
        const newLog = this.logRepo.create(log);
        return await this.logRepo.save(newLog);
    }

    async findLogsByTask(taskId: number): Promise<ScrapingLogEntity[]> {
        return await this.logRepo.find({
            where: { task_id: taskId },
            order: { createdAt: 'DESC' }
        });
    }

    // ==================== Utility Methods ====================

    async getContactStats(taskId: number): Promise<{
        total: number;
        pending: number;
        messageGenerated: number;
        sent: number;
        failed: number;
    }> {
        const contacts = await this.findContactsByTask(taskId);

        return {
            total: contacts.length,
            pending: contacts.filter(c => c.status === 0).length,
            messageGenerated: contacts.filter(c => c.status === 1).length,
            sent: contacts.filter(c => c.status === 2).length,
            failed: contacts.filter(c => c.status === 3).length
        };
    }

    async getCampaignStats(campaignId: number): Promise<{
        total: number;
        sent: number;
        failed: number;
        successRate: number;
    }> {
        const campaign = await this.findCampaignById(campaignId);
        if (!campaign) {
            throw new Error('Campaign not found');
        }

        const total = campaign.total_contacts || 0;
        const sent = campaign.sent_count || 0;
        const failed = campaign.failed_count || 0;
        const successRate = total > 0 ? (sent / total) * 100 : 0;

        return { total, sent, failed, successRate };
    }
}
