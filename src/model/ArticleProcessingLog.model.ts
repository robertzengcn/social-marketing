import { BaseDb } from "@/model/Basedb";
import { Repository } from "typeorm";
import { ArticleProcessingLogEntity, ProcessingOperation, ProcessingStatus } from "@/entity/ArticleProcessingLog.entity";
import { getRecorddatetime } from "@/modules/lib/function";

export class ArticleProcessingLogModel extends BaseDb {
  private repository: Repository<ArticleProcessingLogEntity>;

  constructor(filepath: string) {
    super(filepath);
    this.repository = this.sqliteDb.connection.getRepository(ArticleProcessingLogEntity);
  }

  /**
   * Save processing log entry
   */
  async saveProcessingLog(logEntry: Partial<ArticleProcessingLogEntity>): Promise<number> {
    if (!logEntry.articleId || !logEntry.operation || !logEntry.status) {
      throw new Error('Missing required fields: articleId, operation, status');
    }

    const newLogEntry = this.repository.create({
      ...logEntry,
      createdAt: new Date()
    });
    
    const savedLog = await this.repository.save(newLogEntry);
    return savedLog.id;
  }

  /**
   * Get processing log by ID
   */
  async getProcessingLogById(id: number): Promise<ArticleProcessingLogEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['article']
    });
  }

  /**
   * Get processing logs by article ID
   */
  async getProcessingLogsByArticleId(articleId: number, limit: number = 50, offset: number = 0): Promise<ArticleProcessingLogEntity[]> {
    return this.repository.find({
      where: { articleId },
      relations: ['article'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Get processing logs by operation
   */
  async getProcessingLogsByOperation(operation: ProcessingOperation, limit: number = 50, offset: number = 0): Promise<ArticleProcessingLogEntity[]> {
    return this.repository.find({
      where: { operation },
      relations: ['article'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Get processing logs by status
   */
  async getProcessingLogsByStatus(status: ProcessingStatus, limit: number = 50, offset: number = 0): Promise<ArticleProcessingLogEntity[]> {
    return this.repository.find({
      where: { status },
      relations: ['article'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Get error logs
   */
  async getErrorLogs(limit: number = 50, offset: number = 0): Promise<ArticleProcessingLogEntity[]> {
    return this.repository.find({
      where: { status: ProcessingStatus.ERROR },
      relations: ['article'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Get warning logs
   */
  async getWarningLogs(limit: number = 50, offset: number = 0): Promise<ArticleProcessingLogEntity[]> {
    return this.repository.find({
      where: { status: ProcessingStatus.WARNING },
      relations: ['article'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Get success logs
   */
  async getSuccessLogs(limit: number = 50, offset: number = 0): Promise<ArticleProcessingLogEntity[]> {
    return this.repository.find({
      where: { status: ProcessingStatus.SUCCESS },
      relations: ['article'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Get processing logs by date range
   */
  async getProcessingLogsByDateRange(
    startDate: Date,
    endDate: Date,
    limit: number = 50,
    offset: number = 0
  ): Promise<ArticleProcessingLogEntity[]> {
    return this.repository.find({
      where: {
        createdAt: {
          $gte: startDate,
          $lte: endDate
        } as any
      },
      relations: ['article'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Search processing logs by message
   */
  async searchProcessingLogs(searchTerm: string, limit: number = 50, offset: number = 0): Promise<ArticleProcessingLogEntity[]> {
    return this.repository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.article', 'article')
      .where('log.message LIKE :searchTerm OR log.details LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`
      })
      .orderBy('log.createdAt', 'DESC')
      .take(limit)
      .skip(offset)
      .getMany();
  }

  /**
   * Get processing logs by operation and status
   */
  async getProcessingLogsByOperationAndStatus(
    operation: ProcessingOperation,
    status: ProcessingStatus,
    limit: number = 50,
    offset: number = 0
  ): Promise<ArticleProcessingLogEntity[]> {
    return this.repository.find({
      where: { operation, status },
      relations: ['article'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Delete processing log by ID
   */
  async deleteProcessingLog(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Delete processing logs by article ID
   */
  async deleteProcessingLogsByArticleId(articleId: number): Promise<number> {
    const result = await this.repository.delete({ articleId });
    return result.affected || 0;
  }

  /**
   * Clean up old processing logs
   */
  async cleanupOldLogs(daysOld: number = 30): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    const result = await this.repository
      .createQueryBuilder('log')
      .delete()
      .where('log.createdAt < :cutoffDate', { cutoffDate })
      .execute();
    
    return result.affected || 0;
  }

  /**
   * Get processing log statistics
   */
  async getProcessingLogStatistics(): Promise<{
    total: number;
    success: number;
    error: number;
    warning: number;
    byOperation: Record<string, { total: number; success: number; error: number; warning: number }>;
    byArticle: Record<number, { total: number; success: number; error: number; warning: number }>;
  }> {
    const total = await this.repository.count();
    const success = await this.repository.count({ where: { status: ProcessingStatus.SUCCESS } });
    const error = await this.repository.count({ where: { status: ProcessingStatus.ERROR } });
    const warning = await this.repository.count({ where: { status: ProcessingStatus.WARNING } });

    // Get statistics by operation
    const operationStats = await this.repository
      .createQueryBuilder('log')
      .select('log.operation', 'operation')
      .addSelect('COUNT(*)', 'total')
      .addSelect('SUM(CASE WHEN log.status = :success THEN 1 ELSE 0 END)', 'success')
      .addSelect('SUM(CASE WHEN log.status = :error THEN 1 ELSE 0 END)', 'error')
      .addSelect('SUM(CASE WHEN log.status = :warning THEN 1 ELSE 0 END)', 'warning')
      .setParameters({
        success: ProcessingStatus.SUCCESS,
        error: ProcessingStatus.ERROR,
        warning: ProcessingStatus.WARNING
      })
      .groupBy('log.operation')
      .getRawMany();

    const byOperation: Record<string, { total: number; success: number; error: number; warning: number }> = {};
    operationStats.forEach(stat => {
      byOperation[stat.operation] = {
        total: parseInt(stat.total),
        success: parseInt(stat.success),
        error: parseInt(stat.error),
        warning: parseInt(stat.warning)
      };
    });

    // Get statistics by article
    const articleStats = await this.repository
      .createQueryBuilder('log')
      .select('log.articleId', 'articleId')
      .addSelect('COUNT(*)', 'total')
      .addSelect('SUM(CASE WHEN log.status = :success THEN 1 ELSE 0 END)', 'success')
      .addSelect('SUM(CASE WHEN log.status = :error THEN 1 ELSE 0 END)', 'error')
      .addSelect('SUM(CASE WHEN log.status = :warning THEN 1 ELSE 0 END)', 'warning')
      .setParameters({
        success: ProcessingStatus.SUCCESS,
        error: ProcessingStatus.ERROR,
        warning: ProcessingStatus.WARNING
      })
      .groupBy('log.articleId')
      .getRawMany();

    const byArticle: Record<number, { total: number; success: number; error: number; warning: number }> = {};
    articleStats.forEach(stat => {
      byArticle[stat.articleId] = {
        total: parseInt(stat.total),
        success: parseInt(stat.success),
        error: parseInt(stat.error),
        warning: parseInt(stat.warning)
      };
    });

    return {
      total,
      success,
      error,
      warning,
      byOperation,
      byArticle
    };
  }

  /**
   * Get recent processing logs
   */
  async getRecentProcessingLogs(hours: number = 24): Promise<ArticleProcessingLogEntity[]> {
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - hours);

    return this.repository.find({
      where: {
        createdAt: {
          $gte: cutoffDate
        } as any
      },
      relations: ['article'],
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Get processing logs with details
   */
  async getProcessingLogsWithDetails(limit: number = 50, offset: number = 0): Promise<ArticleProcessingLogEntity[]> {
    return this.repository.find({
      where: {
        details: {
          $ne: null
        } as any
      },
      relations: ['article'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }
} 