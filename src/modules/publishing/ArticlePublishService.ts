import { ArticlePublishStrategyFactory, ArticlePublishPlatform } from './ArticlePublishStrategyFactory';
import { ArticlePublishStrategy, ArticlePublishOptions, PublishResult } from './ArticlePublishStrategy';
import { PublishingQueue, PublishingQueueItem } from './PublishingQueue';
import { TranslatedContent } from '../translation/ArticleTranslationService';
import { AccountCookiesEntity } from '@/entity/AccountCookies.entity';
import { AccountCookiesModule } from '@/modules/accountCookiesModule';
import { BaseModule } from '@/modules/baseModule';

export interface ArticlePublishRequest {
  articleId: number;
  platform: ArticlePublishPlatform;
  accountId: number;
  options?: Partial<ArticlePublishOptions>;
  scheduledAt?: Date;
  priority?: number;
}

export interface ArticlePublishResponse {
  success: boolean;
  queueItemId?: number;
  result?: PublishResult;
  errorMessage?: string;
}

export class ArticlePublishService extends BaseModule {
  private strategyFactory: ArticlePublishStrategyFactory;
  private publishingQueue: PublishingQueue;
  private accountCookiesModule: AccountCookiesModule;

  constructor() {
    super();
    this.strategyFactory = ArticlePublishStrategyFactory.getInstance();
    this.publishingQueue = new PublishingQueue();
    this.accountCookiesModule = new AccountCookiesModule();
  }

  async publishArticle(request: ArticlePublishRequest): Promise<ArticlePublishResponse> {
    try {
      // Validate platform
      if (!(await this.strategyFactory.validatePlatform(request.platform))) {
        throw new Error(`Unsupported platform: ${request.platform}`);
      }

      // Get account cookies
      const account = await this.accountCookiesModule.getAccountCookies(request.accountId);
      if (!account) {
        throw new Error(`Account cookies not found for account ID: ${request.accountId}`);
      }

      // If scheduled for future, add to queue
      if (request.scheduledAt && request.scheduledAt > new Date()) {
        const queueItemId = await this.publishingQueue.addToQueue(
          request.articleId,
          request.platform,
          request.accountId,
          request.scheduledAt,
          request.priority || 0
        );

        return {
          success: true,
          queueItemId,
          result: undefined
        };
      }

      // Publish immediately
      const result = await this.publishImmediately(request, account);
      
      return {
        success: result.success,
        result
      };

    } catch (error) {
      return {
        success: false,
        errorMessage: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async publishImmediately(request: ArticlePublishRequest, account: AccountCookiesEntity): Promise<PublishResult> {
    // Create strategy
    const options: ArticlePublishOptions = {
      headless: true,
      cookies: this.parseCookies(account.cookies),
      ...request.options
    };

    const strategy = await this.strategyFactory.createStrategy(request.platform, options);

    // Get translated content (this would typically come from the translation service)
    // For now, we'll create a mock TranslatedContent
    const translatedContent: TranslatedContent = {
      title: 'Sample Article Title',
      content: 'Sample article content...',
      codeBlocks: [],
      metadata: {},
      sourceLanguage: { code: 'en', name: 'English' },
      targetLanguage: { code: 'zh', name: 'Chinese' },
      translatedAt: new Date(),
      qualityScore: 0.9,
      version: 1,
      articleId: request.articleId,
      translationTool: 'openai'
    };

    // Validate content
    if (!strategy.validateContent(translatedContent)) {
      throw new Error('Content validation failed');
    }

    // Publish
    const result = await strategy.publish(translatedContent, account, options);
    
    // Save result to database
    await this.savePublishResult(result, request.articleId);
    
    return result;
  }

  async publishToMultiplePlatforms(
    articleId: number,
    platforms: Array<{ platform: ArticlePublishPlatform; accountId: number }>,
    options?: Partial<ArticlePublishOptions>
  ): Promise<ArticlePublishResponse[]> {
    const results: ArticlePublishResponse[] = [];
    
    for (const { platform, accountId } of platforms) {
      const request: ArticlePublishRequest = {
        articleId,
        platform,
        accountId,
        options
      };
      
      const result = await this.publishArticle(request);
      results.push(result);
    }
    
    return results;
  }

  async processQueue(): Promise<void> {
    const nextItem = await this.publishingQueue.getNextItem();
    
    if (!nextItem) {
      return; // No items to process
    }

    try {
      await this.publishingQueue.markAsProcessing(nextItem.id);
      
      // Get account cookies
      const account = await this.accountCookiesModule.getAccountCookies(nextItem.accountId);
      if (!account) {
        throw new Error(`Account cookies not found for account ID: ${nextItem.accountId}`);
      }

      // Create strategy
      const options: ArticlePublishOptions = {
        headless: true,
        cookies: this.parseCookies(account.cookies)
      };

      const strategy = await this.strategyFactory.createStrategy(nextItem.platformName, options);

      // Get translated content (this would typically come from the translation service)
      const translatedContent: TranslatedContent = {
        title: 'Sample Article Title',
        content: 'Sample article content...',
        codeBlocks: [],
        metadata: {},
        sourceLanguage: { code: 'en', name: 'English' },
        targetLanguage: { code: 'zh', name: 'Chinese' },
        translatedAt: new Date(),
        qualityScore: 0.9,
        version: 1,
        articleId: nextItem.articleId,
        translationTool: 'openai'
      };

      // Publish
      const result = await strategy.publish(translatedContent, account, options);
      
      if (result.success) {
        await this.publishingQueue.markAsCompleted(nextItem.id, result);
      } else {
        await this.publishingQueue.markAsFailed(nextItem.id, result.errorMessage || 'Publishing failed');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      await this.publishingQueue.markAsFailed(nextItem.id, errorMessage);
    }
  }

  async getQueueStatus(): Promise<{
    total: number;
    pending: number;
    processing: number;
    completed: number;
    failed: number;
  }> {
    return await this.publishingQueue.getQueueStatus();
  }

  async getQueueItems(
    status?: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<PublishingQueueItem[]> {
    return await this.publishingQueue.getQueueItems(status, limit, offset);
  }

  async getPublishingHistory(articleId: number): Promise<PublishResult[]> {
    return await this.publishingQueue.getPublishingHistory(articleId);
  }

  async removeFromQueue(itemId: number): Promise<boolean> {
    return await this.publishingQueue.removeFromQueue(itemId);
  }

  async clearCompletedItems(): Promise<number> {
    return await this.publishingQueue.clearCompletedItems();
  }

  getSupportedPlatforms(): ArticlePublishPlatform[] {
    return this.strategyFactory.getSupportedPlatforms();
  }

  private parseCookies(cookiesJson: string): Array<{
    name: string;
    value: string;
    domain: string;
    path: string;
  }> {
    try {
      const cookies = JSON.parse(cookiesJson);
      return cookies.map((cookie: any) => ({
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path
      }));
    } catch (error) {
      console.error('Failed to parse cookies:', error);
      return [];
    }
  }

  private async savePublishResult(result: PublishResult, articleId: number): Promise<void> {
    // TODO: Implement database save for publish result
    console.log('Saving publish result for article:', articleId, result);
  }

  async cleanup(): Promise<void> {
    await this.strategyFactory.cleanup();
  }
} 