import { getRepository } from 'typeorm';
import { Article } from '../entity/Article';
import { ArticleCodeBlock } from '../entity/ArticleCodeBlock';
import { ArticleMetadata } from '../entity/ArticleMetadata';
import { ArticleImage } from '../entity/ArticleImage';
import { PublishResult } from '../entity/PublishResult';
import { PublishingQueue } from '../entity/PublishingQueue';
import { ArticleProcessingLog } from '../entity/ArticleProcessingLog';
import { TranslateProducer } from '../translation/TranslateProducer';
import { ArticleTranslationStrategy, ArticleTranslationStrategyConfig } from './ArticleTranslationStrategy';
import { ArticleContent, TranslatedContent } from '../types/ArticleTypes';
import { LanguageItem } from '../types/LanguageTypes';
import { TranslateToolEnum } from '../types/TranslateToolEnum';

/**
 * Interface for article translation service configuration
 */
export interface ArticleTranslationServiceConfig extends ArticleTranslationStrategyConfig {
  databaseEnabled: boolean;
  loggingEnabled: boolean;
  autoSave: boolean;
  saveIntermediateResults: boolean;
}

/**
 * Main service class for article translation that integrates all components
 * Extends existing TranslateProducer functionality for article-specific needs
 */
export class ArticleTranslationService extends TranslateProducer {
  private translationStrategy: ArticleTranslationStrategy;
  private config: ArticleTranslationServiceConfig;

  constructor(
    translateProducer: TranslateProducer,
    config: ArticleTranslationServiceConfig
  ) {
    super(); // Call parent constructor
    this.translationStrategy = new ArticleTranslationStrategy(translateProducer, config);
    this.config = config;
  }

  /**
   * Main method to translate an article and save to database
   * @param content Article content to translate
   * @param targetLanguage Target language
   * @param toolName Translation tool to use
   * @returns Translated content with database ID
   */
  async translateArticle(
    content: ArticleContent,
    targetLanguage: LanguageItem,
    toolName: TranslateToolEnum
  ): Promise<TranslatedContent> {
    try {
      // Log start of translation process
      await this.logProcessingStep(content.id || 0, 'translate', 'started', 'Translation process started');

      // Check if article already exists in database
      let articleId = content.id;
      if (!articleId && this.config.databaseEnabled) {
        articleId = await this.saveArticleToDatabase(content);
      }

      // Perform translation using strategy
      const translatedContent = await this.translationStrategy.translateArticle(
        { ...content, id: articleId },
        targetLanguage,
        toolName
      );

      // Save translation to database
      if (this.config.databaseEnabled) {
        await this.saveTranslationToDatabase(translatedContent, articleId || 0);
      }

      // Log successful completion
      await this.logProcessingStep(articleId || 0, 'translate', 'success', 'Translation completed successfully');

      return translatedContent;
    } catch (error) {
      // Log error
      await this.logProcessingStep(content.id || 0, 'translate', 'error', `Translation failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Saves article content to database
   * @param content Article content
   * @returns Article ID
   */
  private async saveArticleToDatabase(content: ArticleContent): Promise<number> {
    try {
      const articleRepository = getRepository(Article);
      const codeBlockRepository = getRepository(ArticleCodeBlock);
      const metadataRepository = getRepository(ArticleMetadata);
      const imageRepository = getRepository(ArticleImage);

      // Create article entity
      const article = articleRepository.create({
        title: content.title,
        originalContent: content.content,
        sourceUrl: content.sourceUrl,
        contentHash: content.contentHash,
        sourceLanguage: content.metadata.sourceLanguage?.code || 'en',
        targetLanguage: null, // Will be set after translation
        status: 'scraped',
        scrapedAt: content.scrapedAt || new Date(),
        version: content.version || 1
      });

      const savedArticle = await articleRepository.save(article);

      // Save code blocks
      if (content.codeBlocks && content.codeBlocks.length > 0) {
        const codeBlockEntities = content.codeBlocks.map(block => 
          codeBlockRepository.create({
            articleId: savedArticle.id,
            language: block.language,
            code: block.code,
            position: block.position,
            blockId: block.id,
            version: block.version || 1
          })
        );
        await codeBlockRepository.save(codeBlockEntities);
      }

      // Save metadata
      if (content.metadata) {
        const metadataEntries = Object.entries(content.metadata).map(([key, value]) =>
          metadataRepository.create({
            articleId: savedArticle.id,
            key,
            value: typeof value === 'string' ? value : JSON.stringify(value),
            version: 1
          })
        );
        await metadataRepository.save(metadataEntries);
      }

      // Save images
      if (content.images && content.images.length > 0) {
        const imageEntities = content.images.map(image =>
          imageRepository.create({
            articleId: savedArticle.id,
            originalUrl: image.originalUrl,
            localPath: image.localPath,
            fileName: image.fileName,
            fileSize: image.fileSize,
            mimeType: image.mimeType
          })
        );
        await imageRepository.save(imageEntities);
      }

      return savedArticle.id;
    } catch (error) {
      console.error('Error saving article to database:', error);
      throw new Error(`Failed to save article to database: ${error.message}`);
    }
  }

  /**
   * Saves translated content to database
   * @param translatedContent Translated content
   * @param articleId Original article ID
   */
  private async saveTranslationToDatabase(translatedContent: TranslatedContent, articleId: number): Promise<void> {
    try {
      const articleRepository = getRepository(Article);

      // Update article with translated content
      await articleRepository.update(articleId, {
        translatedContent: translatedContent.content,
        targetLanguage: translatedContent.targetLanguage.code,
        status: 'translated',
        translatedAt: translatedContent.translatedAt,
        version: translatedContent.version
      });

      // Save translation metadata
      const metadataRepository = getRepository(ArticleMetadata);
      const translationMetadata = [
        { key: 'translation_tool', value: translatedContent.translationTool },
        { key: 'quality_score', value: translatedContent.qualityScore.toString() },
        { key: 'source_language', value: translatedContent.sourceLanguage.code },
        { key: 'target_language', value: translatedContent.targetLanguage.code },
        { key: 'translation_version', value: translatedContent.version.toString() }
      ];

      const metadataEntities = translationMetadata.map(meta =>
        metadataRepository.create({
          articleId,
          key: meta.key,
          value: meta.value,
          version: translatedContent.version
        })
      );

      await metadataRepository.save(metadataEntities);
    } catch (error) {
      console.error('Error saving translation to database:', error);
      throw new Error(`Failed to save translation to database: ${error.message}`);
    }
  }

  /**
   * Logs processing steps for monitoring and debugging
   * @param articleId Article ID
   * @param operation Operation type
   * @param status Operation status
   * @param message Log message
   */
  private async logProcessingStep(
    articleId: number,
    operation: string,
    status: string,
    message: string
  ): Promise<void> {
    if (!this.config.loggingEnabled) {
      return;
    }

    try {
      const logRepository = getRepository(ArticleProcessingLog);
      const logEntry = logRepository.create({
        articleId,
        operation,
        status,
        message,
        createdAt: new Date()
      });

      await logRepository.save(logEntry);
    } catch (error) {
      console.error('Error logging processing step:', error);
    }
  }

  /**
   * Retrieves article from database by ID
   * @param articleId Article ID
   * @returns Article content or null if not found
   */
  async getArticleFromDatabase(articleId: number): Promise<ArticleContent | null> {
    try {
      const articleRepository = getRepository(Article);
      const codeBlockRepository = getRepository(ArticleCodeBlock);
      const metadataRepository = getRepository(ArticleMetadata);
      const imageRepository = getRepository(ArticleImage);

      const article = await articleRepository.findOne(articleId);
      if (!article) {
        return null;
      }

      // Get code blocks
      const codeBlocks = await codeBlockRepository.find({
        where: { articleId },
        order: { position: 'ASC' }
      });

      // Get metadata
      const metadata = await metadataRepository.find({
        where: { articleId }
      });

      // Get images
      const images = await imageRepository.find({
        where: { articleId }
      });

      // Convert metadata to object
      const metadataObj: any = {};
      for (const meta of metadata) {
        metadataObj[meta.key] = meta.value;
      }

      return {
        id: article.id,
        title: article.title,
        content: article.originalContent,
        codeBlocks: codeBlocks.map(block => ({
          language: block.language,
          code: block.code,
          position: block.position,
          id: block.blockId,
          version: block.version
        })),
        metadata: metadataObj,
        images: images.map(img => ({
          originalUrl: img.originalUrl,
          localPath: img.localPath,
          fileName: img.fileName,
          fileSize: img.fileSize,
          mimeType: img.mimeType
        })),
        sourceUrl: article.sourceUrl,
        contentHash: article.contentHash,
        scrapedAt: article.scrapedAt,
        version: article.version
      };
    } catch (error) {
      console.error('Error retrieving article from database:', error);
      return null;
    }
  }

  /**
   * Gets translation history for an article
   * @param articleId Article ID
   * @returns Array of translation results
   */
  async getTranslationHistory(articleId: number): Promise<TranslatedContent[]> {
    try {
      const articleRepository = getRepository(Article);
      const metadataRepository = getRepository(ArticleMetadata);

      const articles = await articleRepository.find({
        where: { id: articleId },
        order: { version: 'DESC' }
      });

      const translations: TranslatedContent[] = [];

      for (const article of articles) {
        if (article.translatedContent) {
          const metadata = await metadataRepository.find({
            where: { articleId: article.id }
          });

          const metadataObj: any = {};
          for (const meta of metadata) {
            metadataObj[meta.key] = meta.value;
          }

          translations.push({
            title: article.title,
            content: article.translatedContent,
            codeBlocks: [], // Would need to retrieve from code blocks table
            metadata: metadataObj,
            sourceLanguage: { name: 'Unknown', code: article.sourceLanguage || 'en' },
            targetLanguage: { name: 'Unknown', code: article.targetLanguage || 'en' },
            translatedAt: article.translatedAt || new Date(),
            qualityScore: parseFloat(metadataObj.quality_score) || 0,
            version: article.version,
            articleId: article.id,
            translationTool: metadataObj.translation_tool || 'unknown'
          });
        }
      }

      return translations;
    } catch (error) {
      console.error('Error getting translation history:', error);
      return [];
    }
  }

  /**
   * Gets articles by status
   * @param status Article status
   * @param limit Maximum number of articles to return
   * @returns Array of articles
   */
  async getArticlesByStatus(status: string, limit: number = 100): Promise<ArticleContent[]> {
    try {
      const articleRepository = getRepository(Article);
      const articles = await articleRepository.find({
        where: { status },
        order: { createdAt: 'DESC' },
        take: limit
      });

      const articleContents: ArticleContent[] = [];
      for (const article of articles) {
        const content = await this.getArticleFromDatabase(article.id);
        if (content) {
          articleContents.push(content);
        }
      }

      return articleContents;
    } catch (error) {
      console.error('Error getting articles by status:', error);
      return [];
    }
  }

  /**
   * Updates article status
   * @param articleId Article ID
   * @param status New status
   */
  async updateArticleStatus(articleId: number, status: string): Promise<void> {
    try {
      const articleRepository = getRepository(Article);
      await articleRepository.update(articleId, { status });
    } catch (error) {
      console.error('Error updating article status:', error);
      throw new Error(`Failed to update article status: ${error.message}`);
    }
  }

  /**
   * Gets translation statistics from database
   * @returns Translation statistics
   */
  async getTranslationStatistics(): Promise<{
    totalArticles: number;
    translatedArticles: number;
    pendingArticles: number;
    averageQualityScore: number;
    translationTools: Record<string, number>;
  }> {
    try {
      const articleRepository = getRepository(Article);
      const metadataRepository = getRepository(ArticleMetadata);

      const totalArticles = await articleRepository.count();
      const translatedArticles = await articleRepository.count({ where: { status: 'translated' } });
      const pendingArticles = await articleRepository.count({ where: { status: 'scraped' } });

      // Get average quality score
      const qualityScores = await metadataRepository
        .createQueryBuilder('metadata')
        .select('AVG(CAST(metadata.value AS FLOAT))', 'avgQuality')
        .where('metadata.key = :key', { key: 'quality_score' })
        .getRawOne();

      const averageQualityScore = parseFloat(qualityScores.avgQuality) || 0;

      // Get translation tool usage
      const toolUsage = await metadataRepository
        .createQueryBuilder('metadata')
        .select('metadata.value', 'tool')
        .addSelect('COUNT(*)', 'count')
        .where('metadata.key = :key', { key: 'translation_tool' })
        .groupBy('metadata.value')
        .getRawMany();

      const translationTools: Record<string, number> = {};
      for (const tool of toolUsage) {
        translationTools[tool.tool] = parseInt(tool.count);
      }

      return {
        totalArticles,
        translatedArticles,
        pendingArticles,
        averageQualityScore,
        translationTools
      };
    } catch (error) {
      console.error('Error getting translation statistics:', error);
      return {
        totalArticles: 0,
        translatedArticles: 0,
        pendingArticles: 0,
        averageQualityScore: 0,
        translationTools: {}
      };
    }
  }

  /**
   * Updates the service configuration
   * @param newConfig New configuration
   */
  updateConfig(newConfig: Partial<ArticleTranslationServiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.translationStrategy.updateConfig(newConfig);
  }

  /**
   * Gets the current configuration
   * @returns Current configuration
   */
  getConfig(): ArticleTranslationServiceConfig {
    return { ...this.config };
  }

  /**
   * Gets the underlying translation strategy
   * @returns Translation strategy
   */
  getTranslationStrategy(): ArticleTranslationStrategy {
    return this.translationStrategy;
  }
} 