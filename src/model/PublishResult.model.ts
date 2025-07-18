import { BaseDb } from "@/model/Basedb";
import { Repository } from "typeorm";
import { PublishResultEntity } from "@/entity/PublishResult.entity";
import { getRecorddatetime } from "@/modules/lib/function";

export class PublishResultModel extends BaseDb {
  private repository: Repository<PublishResultEntity>;

  constructor(filepath: string) {
    super(filepath);
    this.repository = this.sqliteDb.connection.getRepository(PublishResultEntity);
  }

  /**
   * Save publish result
   */
  async savePublishResult(publishResult: Partial<PublishResultEntity>): Promise<number> {
    if (!publishResult.articleId || !publishResult.platformName || !publishResult.accountId) {
      throw new Error('Missing required fields: articleId, platformName, accountId');
    }

    const newPublishResult = this.repository.create({
      ...publishResult,
      publishedAt: publishResult.publishedAt || new Date()
    });
    
    const savedResult = await this.repository.save(newPublishResult);
    return savedResult.id;
  }

  /**
   * Get publish result by ID
   */
  async getPublishResultById(id: number): Promise<PublishResultEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['article', 'account']
    });
  }

  /**
   * Get publish results by article ID
   */
  async getPublishResultsByArticleId(articleId: number): Promise<PublishResultEntity[]> {
    return this.repository.find({
      where: { articleId },
      relations: ['account'],
      order: { publishedAt: 'DESC' }
    });
  }

  /**
   * Get publish results by platform
   */
  async getPublishResultsByPlatform(platformName: string, limit: number = 50, offset: number = 0): Promise<PublishResultEntity[]> {
    return this.repository.find({
      where: { platformName },
      relations: ['article', 'account'],
      order: { publishedAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Get publish results by account ID
   */
  async getPublishResultsByAccountId(accountId: number, limit: number = 50, offset: number = 0): Promise<PublishResultEntity[]> {
    return this.repository.find({
      where: { accountId },
      relations: ['article'],
      order: { publishedAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Get successful publish results
   */
  async getSuccessfulPublishResults(limit: number = 50, offset: number = 0): Promise<PublishResultEntity[]> {
    return this.repository.find({
      where: { success: true },
      relations: ['article', 'account'],
      order: { publishedAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Get failed publish results
   */
  async getFailedPublishResults(limit: number = 50, offset: number = 0): Promise<PublishResultEntity[]> {
    return this.repository.find({
      where: { success: false },
      relations: ['article', 'account'],
      order: { publishedAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Get publish results by date range
   */
  async getPublishResultsByDateRange(
    startDate: Date,
    endDate: Date,
    limit: number = 50,
    offset: number = 0
  ): Promise<PublishResultEntity[]> {
    return this.repository.find({
      where: {
        publishedAt: {
          $gte: startDate,
          $lte: endDate
        } as any
      },
      relations: ['article', 'account'],
      order: { publishedAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Update publish result
   */
  async updatePublishResult(id: number, updates: Partial<PublishResultEntity>): Promise<boolean> {
    const result = await this.repository.update(id, updates);
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Delete publish result by ID
   */
  async deletePublishResult(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Delete publish results by article ID
   */
  async deletePublishResultsByArticleId(articleId: number): Promise<number> {
    const result = await this.repository.delete({ articleId });
    return result.affected || 0;
  }

  /**
   * Get publish statistics
   */
  async getPublishStatistics(): Promise<{
    total: number;
    successful: number;
    failed: number;
    byPlatform: Record<string, { total: number; successful: number; failed: number }>;
    byAccount: Record<number, { total: number; successful: number; failed: number }>;
  }> {
    const total = await this.repository.count();
    const successful = await this.repository.count({ where: { success: true } });
    const failed = await this.repository.count({ where: { success: false } });

    // Get statistics by platform
    const platformStats = await this.repository
      .createQueryBuilder('result')
      .select('result.platformName', 'platformName')
      .addSelect('COUNT(*)', 'total')
      .addSelect('SUM(CASE WHEN result.success = 1 THEN 1 ELSE 0 END)', 'successful')
      .addSelect('SUM(CASE WHEN result.success = 0 THEN 1 ELSE 0 END)', 'failed')
      .groupBy('result.platformName')
      .getRawMany();

    const byPlatform: Record<string, { total: number; successful: number; failed: number }> = {};
    platformStats.forEach(stat => {
      byPlatform[stat.platformName] = {
        total: parseInt(stat.total),
        successful: parseInt(stat.successful),
        failed: parseInt(stat.failed)
      };
    });

    // Get statistics by account
    const accountStats = await this.repository
      .createQueryBuilder('result')
      .select('result.accountId', 'accountId')
      .addSelect('COUNT(*)', 'total')
      .addSelect('SUM(CASE WHEN result.success = 1 THEN 1 ELSE 0 END)', 'successful')
      .addSelect('SUM(CASE WHEN result.success = 0 THEN 1 ELSE 0 END)', 'failed')
      .groupBy('result.accountId')
      .getRawMany();

    const byAccount: Record<number, { total: number; successful: number; failed: number }> = {};
    accountStats.forEach(stat => {
      byAccount[stat.accountId] = {
        total: parseInt(stat.total),
        successful: parseInt(stat.successful),
        failed: parseInt(stat.failed)
      };
    });

    return {
      total,
      successful,
      failed,
      byPlatform,
      byAccount
    };
  }

  /**
   * Get recent publish results
   */
  async getRecentPublishResults(hours: number = 24): Promise<PublishResultEntity[]> {
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - hours);

    return this.repository.find({
      where: {
        publishedAt: {
          $gte: cutoffDate
        } as any
      },
      relations: ['article', 'account'],
      order: { publishedAt: 'DESC' }
    });
  }

  /**
   * Get publish results with retry count
   */
  async getPublishResultsWithRetries(minRetryCount: number = 1): Promise<PublishResultEntity[]> {
    return this.repository.find({
      where: {
        retryCount: {
          $gte: minRetryCount
        } as any
      },
      relations: ['article', 'account'],
      order: { retryCount: 'DESC', publishedAt: 'DESC' }
    });
  }

  /**
   * Get publish results by content version
   */
  async getPublishResultsByContentVersion(articleId: number, contentVersion: number): Promise<PublishResultEntity[]> {
    return this.repository.find({
      where: { articleId, contentVersion },
      relations: ['account'],
      order: { publishedAt: 'DESC' }
    });
  }
} 