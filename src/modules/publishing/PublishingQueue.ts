import { BaseModule } from '@/modules/baseModule';
import { ArticlePublishPlatform } from './ArticlePublishStrategyFactory';
import { PublishResult } from './ArticlePublishStrategy';
import { TranslatedContent } from '../translation/ArticleTranslationService';
import { AccountCookiesEntity } from '@/entity/AccountCookies.entity';

export interface PublishingQueueItem {
  id: number;
  articleId: number;
  platformName: ArticlePublishPlatform;
  accountId: number;
  scheduledAt: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  priority: number;
  createdAt: Date;
  retryCount: number;
  lastAttemptAt?: Date;
  errorMessage?: string;
  result?: PublishResult;
}

export interface QueueManagementConfig {
  maxQueueSize: number;
  priorityLevels: number;
  autoRetry: boolean;
  retryIntervals: number[]; // Array of retry delays in minutes
  deadLetterQueue: boolean;
}

export class PublishingQueue extends BaseModule {
  private queue: PublishingQueueItem[] = [];
  private processing: Set<number> = new Set();
  private config: QueueManagementConfig;

  constructor() {
    super();
    this.config = {
      maxQueueSize: 1000,
      priorityLevels: 5,
      autoRetry: true,
      retryIntervals: [5, 15, 60, 240, 1440], // 5min, 15min, 1hr, 4hr, 24hr
      deadLetterQueue: true
    };
  }

  async addToQueue(
    articleId: number,
    platform: ArticlePublishPlatform,
    accountId: number,
    scheduledAt: Date,
    priority: number = 0
  ): Promise<number> {
    if (this.queue.length >= this.config.maxQueueSize) {
      throw new Error('Publishing queue is full');
    }

    const queueItem: PublishingQueueItem = {
      id: Date.now() + Math.random(),
      articleId,
      platformName: platform,
      accountId,
      scheduledAt,
      status: 'pending',
      priority,
      createdAt: new Date(),
      retryCount: 0
    };

    this.queue.push(queueItem);
    this.sortQueue();
    
    // Save to database
    await this.saveQueueItem(queueItem);
    
    return queueItem.id;
  }

  async getNextItem(): Promise<PublishingQueueItem | null> {
    const now = new Date();
    
    for (const item of this.queue) {
      if (item.status === 'pending' && 
          item.scheduledAt <= now && 
          !this.processing.has(item.id)) {
        return item;
      }
    }
    
    return null;
  }

  async markAsProcessing(itemId: number): Promise<void> {
    const item = this.queue.find(q => q.id === itemId);
    if (item) {
      item.status = 'processing';
      item.lastAttemptAt = new Date();
      this.processing.add(itemId);
      await this.updateQueueItem(item);
    }
  }

  async markAsCompleted(itemId: number, result: PublishResult): Promise<void> {
    const item = this.queue.find(q => q.id === itemId);
    if (item) {
      item.status = 'completed';
      item.result = result;
      this.processing.delete(itemId);
      await this.updateQueueItem(item);
      
      // Save publish result to database
      await this.savePublishResult(result, item.articleId);
    }
  }

  async markAsFailed(itemId: number, errorMessage: string): Promise<void> {
    const item = this.queue.find(q => q.id === itemId);
    if (item) {
      item.retryCount++;
      item.errorMessage = errorMessage;
      this.processing.delete(itemId);

      if (this.shouldRetry(item)) {
        item.status = 'pending';
        item.scheduledAt = this.calculateNextRetryTime(item);
      } else {
        item.status = 'failed';
        if (this.config.deadLetterQueue) {
          await this.moveToDeadLetterQueue(item);
        }
      }

      await this.updateQueueItem(item);
    }
  }

  private shouldRetry(item: PublishingQueueItem): boolean {
    if (!this.config.autoRetry) return false;
    return item.retryCount < this.config.retryIntervals.length;
  }

  private calculateNextRetryTime(item: PublishingQueueItem): Date {
    const delayMinutes = this.config.retryIntervals[item.retryCount - 1] || 60;
    const nextTime = new Date();
    nextTime.setMinutes(nextTime.getMinutes() + delayMinutes);
    return nextTime;
  }

  private sortQueue(): void {
    this.queue.sort((a, b) => {
      // First by priority (higher priority first)
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      // Then by scheduled time (earlier first)
      return a.scheduledAt.getTime() - b.scheduledAt.getTime();
    });
  }

  async getQueueStatus(): Promise<{
    total: number;
    pending: number;
    processing: number;
    completed: number;
    failed: number;
  }> {
    const status = {
      total: this.queue.length,
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0
    };

    for (const item of this.queue) {
      status[item.status]++;
    }

    return status;
  }

  async getQueueItems(
    status?: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<PublishingQueueItem[]> {
    let filtered = this.queue;
    
    if (status) {
      filtered = filtered.filter(item => item.status === status);
    }
    
    return filtered.slice(offset, offset + limit);
  }

  async removeFromQueue(itemId: number): Promise<boolean> {
    const index = this.queue.findIndex(item => item.id === itemId);
    if (index !== -1) {
      this.queue.splice(index, 1);
      this.processing.delete(itemId);
      await this.deleteQueueItem(itemId);
      return true;
    }
    return false;
  }

  async clearCompletedItems(): Promise<number> {
    const completedItems = this.queue.filter(item => item.status === 'completed');
    const count = completedItems.length;
    
    for (const item of completedItems) {
      await this.removeFromQueue(item.id);
    }
    
    return count;
  }

  async getPublishingHistory(articleId: number): Promise<PublishResult[]> {
    // This would typically query the database
    // For now, return results from queue items
    const items = this.queue.filter(item => 
      item.articleId === articleId && 
      item.status === 'completed' && 
      item.result
    );
    
    return items.map(item => item.result!);
  }

  // Database operations (to be implemented with actual database)
  private async saveQueueItem(item: PublishingQueueItem): Promise<void> {
    // TODO: Implement database save
    console.log('Saving queue item:', item.id);
  }

  private async updateQueueItem(item: PublishingQueueItem): Promise<void> {
    // TODO: Implement database update
    console.log('Updating queue item:', item.id);
  }

  private async deleteQueueItem(itemId: number): Promise<void> {
    // TODO: Implement database delete
    console.log('Deleting queue item:', itemId);
  }

  private async savePublishResult(result: PublishResult, articleId: number): Promise<void> {
    // TODO: Implement database save for publish result
    console.log('Saving publish result for article:', articleId);
  }

  private async moveToDeadLetterQueue(item: PublishingQueueItem): Promise<void> {
    // TODO: Implement dead letter queue
    console.log('Moving item to dead letter queue:', item.id);
  }

  // Configuration management
  updateConfig(config: Partial<QueueManagementConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): QueueManagementConfig {
    return { ...this.config };
  }
} 