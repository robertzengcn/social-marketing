import { BaseDb } from "@/model/Basedb";
import { Repository } from "typeorm";
import { PublishingQueueEntity, PublishingQueueStatus } from "@/entity/PublishingQueue.entity";
import { getRecorddatetime } from "@/modules/lib/function";

export class PublishingQueueModel extends BaseDb {
  private repository: Repository<PublishingQueueEntity>;

  constructor(filepath: string) {
    super(filepath);
    this.repository = this.sqliteDb.connection.getRepository(PublishingQueueEntity);
  }

  /**
   * Add item to publishing queue
   */
  async addToQueue(queueItem: Partial<PublishingQueueEntity>): Promise<number> {
    if (!queueItem.articleId || !queueItem.platformName || !queueItem.accountId || !queueItem.scheduledAt) {
      throw new Error('Missing required fields: articleId, platformName, accountId, scheduledAt');
    }

    const newQueueItem = this.repository.create({
      ...queueItem,
      status: queueItem.status || PublishingQueueStatus.PENDING,
      priority: queueItem.priority || 0,
      createdAt: new Date()
    });
    
    const savedItem = await this.repository.save(newQueueItem);
    return savedItem.id;
  }

  /**
   * Get queue item by ID
   */
  async getQueueItemById(id: number): Promise<PublishingQueueEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['article', 'account']
    });
  }

  /**
   * Get next pending queue item
   */
  async getNextPendingItem(): Promise<PublishingQueueEntity | null> {
    const now = new Date();
    
    return this.repository.findOne({
      where: {
        status: PublishingQueueStatus.PENDING,
        scheduledAt: {
          $lte: now
        } as any
      },
      relations: ['article', 'account'],
      order: { priority: 'DESC', scheduledAt: 'ASC' }
    });
  }

  /**
   * Get queue items by status
   */
  async getQueueItemsByStatus(status: PublishingQueueStatus, limit: number = 50, offset: number = 0): Promise<PublishingQueueEntity[]> {
    return this.repository.find({
      where: { status },
      relations: ['article', 'account'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Get queue items by article ID
   */
  async getQueueItemsByArticleId(articleId: number): Promise<PublishingQueueEntity[]> {
    return this.repository.find({
      where: { articleId },
      relations: ['account'],
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Get queue items by platform
   */
  async getQueueItemsByPlatform(platformName: string, limit: number = 50, offset: number = 0): Promise<PublishingQueueEntity[]> {
    return this.repository.find({
      where: { platformName },
      relations: ['article', 'account'],
      order: { scheduledAt: 'ASC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Get queue items by account ID
   */
  async getQueueItemsByAccountId(accountId: number, limit: number = 50, offset: number = 0): Promise<PublishingQueueEntity[]> {
    return this.repository.find({
      where: { accountId },
      relations: ['article'],
      order: { scheduledAt: 'ASC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Update queue item status
   */
  async updateQueueItemStatus(id: number, status: PublishingQueueStatus): Promise<boolean> {
    const result = await this.repository.update(id, { status });
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Update queue item priority
   */
  async updateQueueItemPriority(id: number, priority: number): Promise<boolean> {
    const result = await this.repository.update(id, { priority });
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Update queue item scheduled time
   */
  async updateQueueItemScheduledTime(id: number, scheduledAt: Date): Promise<boolean> {
    const result = await this.repository.update(id, { scheduledAt });
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Remove item from queue
   */
  async removeFromQueue(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Clear completed items from queue
   */
  async clearCompletedItems(): Promise<number> {
    const result = await this.repository.delete({ status: PublishingQueueStatus.COMPLETED });
    return result.affected || 0;
  }

  /**
   * Clear failed items from queue
   */
  async clearFailedItems(): Promise<number> {
    const result = await this.repository.delete({ status: PublishingQueueStatus.FAILED });
    return result.affected || 0;
  }

  /**
   * Get queue statistics
   */
  async getQueueStatistics(): Promise<{
    total: number;
    pending: number;
    processing: number;
    completed: number;
    failed: number;
    byPlatform: Record<string, { total: number; pending: number; processing: number; completed: number; failed: number }>;
    byAccount: Record<number, { total: number; pending: number; processing: number; completed: number; failed: number }>;
  }> {
    const total = await this.repository.count();
    const pending = await this.repository.count({ where: { status: PublishingQueueStatus.PENDING } });
    const processing = await this.repository.count({ where: { status: PublishingQueueStatus.PROCESSING } });
    const completed = await this.repository.count({ where: { status: PublishingQueueStatus.COMPLETED } });
    const failed = await this.repository.count({ where: { status: PublishingQueueStatus.FAILED } });

    // Get statistics by platform
    const platformStats = await this.repository
      .createQueryBuilder('queue')
      .select('queue.platformName', 'platformName')
      .addSelect('COUNT(*)', 'total')
      .addSelect('SUM(CASE WHEN queue.status = :pending THEN 1 ELSE 0 END)', 'pending')
      .addSelect('SUM(CASE WHEN queue.status = :processing THEN 1 ELSE 0 END)', 'processing')
      .addSelect('SUM(CASE WHEN queue.status = :completed THEN 1 ELSE 0 END)', 'completed')
      .addSelect('SUM(CASE WHEN queue.status = :failed THEN 1 ELSE 0 END)', 'failed')
      .setParameters({
        pending: PublishingQueueStatus.PENDING,
        processing: PublishingQueueStatus.PROCESSING,
        completed: PublishingQueueStatus.COMPLETED,
        failed: PublishingQueueStatus.FAILED
      })
      .groupBy('queue.platformName')
      .getRawMany();

    const byPlatform: Record<string, { total: number; pending: number; processing: number; completed: number; failed: number }> = {};
    platformStats.forEach(stat => {
      byPlatform[stat.platformName] = {
        total: parseInt(stat.total),
        pending: parseInt(stat.pending),
        processing: parseInt(stat.processing),
        completed: parseInt(stat.completed),
        failed: parseInt(stat.failed)
      };
    });

    // Get statistics by account
    const accountStats = await this.repository
      .createQueryBuilder('queue')
      .select('queue.accountId', 'accountId')
      .addSelect('COUNT(*)', 'total')
      .addSelect('SUM(CASE WHEN queue.status = :pending THEN 1 ELSE 0 END)', 'pending')
      .addSelect('SUM(CASE WHEN queue.status = :processing THEN 1 ELSE 0 END)', 'processing')
      .addSelect('SUM(CASE WHEN queue.status = :completed THEN 1 ELSE 0 END)', 'completed')
      .addSelect('SUM(CASE WHEN queue.status = :failed THEN 1 ELSE 0 END)', 'failed')
      .setParameters({
        pending: PublishingQueueStatus.PENDING,
        processing: PublishingQueueStatus.PROCESSING,
        completed: PublishingQueueStatus.COMPLETED,
        failed: PublishingQueueStatus.FAILED
      })
      .groupBy('queue.accountId')
      .getRawMany();

    const byAccount: Record<number, { total: number; pending: number; processing: number; completed: number; failed: number }> = {};
    accountStats.forEach(stat => {
      byAccount[stat.accountId] = {
        total: parseInt(stat.total),
        pending: parseInt(stat.pending),
        processing: parseInt(stat.processing),
        completed: parseInt(stat.completed),
        failed: parseInt(stat.failed)
      };
    });

    return {
      total,
      pending,
      processing,
      completed,
      failed,
      byPlatform,
      byAccount
    };
  }

  /**
   * Get overdue queue items
   */
  async getOverdueQueueItems(): Promise<PublishingQueueEntity[]> {
    const now = new Date();
    
    return this.repository.find({
      where: {
        status: PublishingQueueStatus.PENDING,
        scheduledAt: {
          $lt: now
        } as any
      },
      relations: ['article', 'account'],
      order: { scheduledAt: 'ASC' }
    });
  }

  /**
   * Get high priority queue items
   */
  async getHighPriorityQueueItems(priority: number = 5): Promise<PublishingQueueEntity[]> {
    return this.repository.find({
      where: {
        status: PublishingQueueStatus.PENDING,
        priority: {
          $gte: priority
        } as any
      },
      relations: ['article', 'account'],
      order: { priority: 'DESC', scheduledAt: 'ASC' }
    });
  }

  /**
   * Get queue items by date range
   */
  async getQueueItemsByDateRange(
    startDate: Date,
    endDate: Date,
    limit: number = 50,
    offset: number = 0
  ): Promise<PublishingQueueEntity[]> {
    return this.repository.find({
      where: {
        scheduledAt: {
          $gte: startDate,
          $lte: endDate
        } as any
      },
      relations: ['article', 'account'],
      order: { scheduledAt: 'ASC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Reschedule failed items
   */
  async rescheduleFailedItems(newScheduledAt: Date): Promise<number> {
    const result = await this.repository.update(
      { status: PublishingQueueStatus.FAILED },
      { 
        status: PublishingQueueStatus.PENDING,
        scheduledAt: newScheduledAt
      }
    );
    return result.affected || 0;
  }
} 