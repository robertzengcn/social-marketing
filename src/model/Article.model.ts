import { BaseDb } from "@/model/Basedb";
import { Repository } from "typeorm";
import { ArticleEntity, ArticleStatus } from "@/entity/Article.entity";
import { getRecorddatetime } from "@/modules/lib/function";

export class ArticleModel extends BaseDb {
  private repository: Repository<ArticleEntity>;

  constructor(filepath: string) {
    super(filepath);
    this.repository = this.sqliteDb.connection.getRepository(ArticleEntity);
  }

  /**
   * Save or update an article
   */
  async saveArticle(article: Partial<ArticleEntity>): Promise<number> {
    if (!article.title || !article.originalContent || !article.sourceUrl || !article.contentHash) {
      throw new Error('Missing required fields: title, originalContent, sourceUrl, contentHash');
    }

    const recordtime = getRecorddatetime();
    const existingArticle = await this.getArticleByUrl(article.sourceUrl);

    if (existingArticle) {
      // Update existing article
      existingArticle.title = article.title;
      existingArticle.originalContent = article.originalContent;
      existingArticle.translatedContent = article.translatedContent || existingArticle.translatedContent;
      existingArticle.sourceLanguage = article.sourceLanguage || existingArticle.sourceLanguage;
      existingArticle.targetLanguage = article.targetLanguage || existingArticle.targetLanguage;
      existingArticle.status = article.status || existingArticle.status;
      existingArticle.translatedAt = article.translatedAt || existingArticle.translatedAt;
      existingArticle.version = (existingArticle.version || 1) + 1;
      existingArticle.updatedAt = new Date();
      
      const savedArticle = await this.repository.save(existingArticle);
      return savedArticle.id;
    } else {
      // Create new article
      const newArticle = this.repository.create({
        ...article,
        status: article.status || ArticleStatus.SCRAPED,
        version: 1,
        scrapedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      const savedArticle = await this.repository.save(newArticle);
      return savedArticle.id;
    }
  }

  /**
   * Get article by ID
   */
  async getArticleById(id: number): Promise<ArticleEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['codeBlocks', 'metadata', 'images', 'publishResults', 'processingLogs']
    });
  }

  /**
   * Get article by source URL
   */
  async getArticleByUrl(sourceUrl: string): Promise<ArticleEntity | null> {
    return this.repository.findOne({
      where: { sourceUrl },
      relations: ['codeBlocks', 'metadata', 'images', 'publishResults', 'processingLogs']
    });
  }

  /**
   * Check if article exists by content hash
   */
  async checkDuplicateByHash(contentHash: string): Promise<boolean> {
    const count = await this.repository.count({ where: { contentHash } });
    return count > 0;
  }

  /**
   * Get articles by status
   */
  async getArticlesByStatus(status: ArticleStatus, limit: number = 50, offset: number = 0): Promise<ArticleEntity[]> {
    return this.repository.find({
      where: { status },
      relations: ['codeBlocks', 'metadata', 'images'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Get all articles with pagination
   */
  async getAllArticles(limit: number = 50, offset: number = 0): Promise<ArticleEntity[]> {
    return this.repository.find({
      relations: ['codeBlocks', 'metadata', 'images'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Search articles by title or content
   */
  async searchArticles(searchTerm: string, limit: number = 50, offset: number = 0): Promise<ArticleEntity[]> {
    return this.repository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.codeBlocks', 'codeBlocks')
      .leftJoinAndSelect('article.metadata', 'metadata')
      .leftJoinAndSelect('article.images', 'images')
      .where('article.title LIKE :searchTerm OR article.originalContent LIKE :searchTerm OR article.translatedContent LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`
      })
      .orderBy('article.createdAt', 'DESC')
      .take(limit)
      .skip(offset)
      .getMany();
  }

  /**
   * Update article status
   */
  async updateArticleStatus(id: number, status: ArticleStatus): Promise<boolean> {
    const result = await this.repository.update(id, { 
      status, 
      updatedAt: new Date(),
      ...(status === ArticleStatus.TRANSLATED ? { translatedAt: new Date() } : {})
    });
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Update translated content
   */
  async updateTranslatedContent(id: number, translatedContent: string, targetLanguage: string): Promise<boolean> {
    const result = await this.repository.update(id, {
      translatedContent,
      targetLanguage,
      status: ArticleStatus.TRANSLATED,
      translatedAt: new Date(),
      updatedAt: new Date()
    });
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Delete article by ID
   */
  async deleteArticle(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Get article statistics
   */
  async getArticleStatistics(): Promise<{
    total: number;
    scraped: number;
    translating: number;
    translated: number;
    publishing: number;
    published: number;
  }> {
    const total = await this.repository.count();
    const scraped = await this.repository.count({ where: { status: ArticleStatus.SCRAPED } });
    const translating = await this.repository.count({ where: { status: ArticleStatus.TRANSLATING } });
    const translated = await this.repository.count({ where: { status: ArticleStatus.TRANSLATED } });
    const publishing = await this.repository.count({ where: { status: ArticleStatus.PUBLISHING } });
    const published = await this.repository.count({ where: { status: ArticleStatus.PUBLISHED } });

    return {
      total,
      scraped,
      translating,
      translated,
      publishing,
      published
    };
  }

  /**
   * Get articles by date range
   */
  async getArticlesByDateRange(startDate: Date, endDate: Date, limit: number = 50, offset: number = 0): Promise<ArticleEntity[]> {
    return this.repository.find({
      where: {
        createdAt: {
          $gte: startDate,
          $lte: endDate
        } as any
      },
      relations: ['codeBlocks', 'metadata', 'images'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }

  /**
   * Get articles by language
   */
  async getArticlesByLanguage(language: string, limit: number = 50, offset: number = 0): Promise<ArticleEntity[]> {
    return this.repository.find({
      where: [
        { sourceLanguage: language },
        { targetLanguage: language }
      ],
      relations: ['codeBlocks', 'metadata', 'images'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset
    });
  }
} 