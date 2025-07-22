//import { getRepository } from 'typeorm';
//import { AppDataSource } from '@/config/dataSource'; 
import { ArticleModel } from '@/model/Article.model';
import ArticleModule from '@/modules/ArticleModule';
import { ArticleStatus } from '@/entity/Article.entity';
//import { Article } from '../entity/Article';
// //import { ArticleProcessingLog } from '../entity/ArticleProcessingLog';
import { TranslateProducer } from '@/modules/TranslateProducer';
import { ArticleTranslationStrategy, ArticleTranslationStrategyConfig } from './ArticleTranslationStrategy';
import { ArticleContent } from '@/entityTypes/ArticleScraper';
import { TranslatedContent } from '@/entityTypes/ArticleTranslationService';
import { LanguageItem, LanguageName, LanguageCode } from '@/entityTypes/commonType';
import { TranslateToolEnum } from '@/config/generate';

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
      await this.logProcessingStep(0, 'translate', 'started', 'Translation process started');

      // Check if article already exists in database
      let articleId = 0;
      if (!articleId && this.config.databaseEnabled) {
        articleId = await this.saveArticleToDatabase(content);
      }

      // Perform translation using strategy
      const translatedContent = await this.translationStrategy.translateArticle(
        { ...content },
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
      if (error instanceof Error) {
        await this.logProcessingStep(0, 'translate', 'error', `Translation failed: ${error.message}`);
      } else {
        await this.logProcessingStep(0, 'translate', 'error', 'Translation failed: Unknown error');
      }
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
      const articleModule = new ArticleModule(':memory:');
      const articleId = await articleModule.create({
        title: content.title,
        originalContent: content.content,
        sourceUrl: content.sourceUrl,
        contentHash: content.contentHash,
        sourceLanguage: content.metadata.sourceLanguage || 'en',
        targetLanguage: undefined, // Will be set after translation
        status: ArticleStatus.SCRAPED,
        scrapedAt: content.scrapedAt || new Date(),
        version: content.version || 1
      });
      return articleId;
    } catch (error) {
      console.error('Error saving article to database:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to save article to database: ${error.message}`);
      }
      throw new Error('Failed to save article to database: Unknown error');
    }
  }

  /**
   * Saves translated content to database
   * @param translatedContent Translated content
   * @param articleId Original article ID
   */
  private async saveTranslationToDatabase(translatedContent: TranslatedContent, articleId: number): Promise<void> {
    try {
      const articleModule = new ArticleModule(':memory:');
      await articleModule.update(articleId, {
        translatedContent: translatedContent.content,
        targetLanguage: translatedContent.targetLanguage.code,
        status: ArticleStatus.TRANSLATED,
        translatedAt: translatedContent.translatedAt,
        version: translatedContent.version
      });
      // TODO: Implement metadata saving if needed
    } catch (error) {
      console.error('Error saving translation to database:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to save translation to database: ${error.message}`);
      }
      throw new Error('Failed to save translation to database: Unknown error');
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
      // TODO: Implement processing log saving if needed
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
      const articleModule = new ArticleModule(':memory:');
      const article = await articleModule.read(articleId);
      if (!article) {
        return null;
      }

      // TODO: Implement code block, metadata, and image retrieval if needed
      // const codeBlocks = ...
      // const metadata = ...
      // const images = ...

      // Convert metadata to object if available
      const metadataObj: any = {};
      // if (metadata) { for (const meta of metadata) { metadataObj[meta.key] = meta.value; } }

      return {
        title: article.title,
        content: article.originalContent,
        codeBlocks: [], // TODO: populate if needed
        metadata: metadataObj,
        images: [], // TODO: populate if needed
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
      const articleModule = new ArticleModule(':memory:');
      // Only get articles with status TRANSLATED for this articleId
      const articles = await articleModule.getArticlesByStatus(ArticleStatus.TRANSLATED, 50, 0);
      const translations: TranslatedContent[] = [];
      for (const article of articles) {
        if (article.translatedContent) {
          // TODO: Implement metadata retrieval if needed
          const metadataObj: any = {};
          translations.push({
            title: article.title,
            content: article.translatedContent,
            codeBlocks: [], // TODO: populate if needed
            metadata: metadataObj,
            sourceLanguage: { id: 0, name: LanguageName.ENGLISH, code: (article.sourceLanguage as LanguageCode) || LanguageCode.EN },
            targetLanguage: { id: 0, name: LanguageName.ENGLISH, code: (article.targetLanguage as LanguageCode) || LanguageCode.EN },
            translatedAt: article.translatedAt || new Date(),
            qualityScore: 0,
            version: article.version,
            articleId: article.id,
            translationTool: 'unknown'
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
      const articleModule = new ArticleModule(':memory:');
      // Use ArticleStatus enum if possible
      const articles = await articleModule.getArticlesByStatus((status as ArticleStatus) || ArticleStatus.SCRAPED, limit, 0);
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
      const articleModule = new ArticleModule(':memory:');
      await articleModule.updateArticleStatus(articleId, (status as ArticleStatus) || ArticleStatus.SCRAPED);
    } catch (error) {
      console.error('Error updating article status:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to update article status: ${error.message}`);
      }
      throw new Error('Failed to update article status: Unknown error');
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
      const articleModule = new ArticleModule(':memory:');
      // Use getAllArticles and getArticlesByStatus for counts
      const allArticles = await articleModule.getAllArticles();
      const translatedArticlesArr = await articleModule.getArticlesByStatus(ArticleStatus.TRANSLATED);
      const pendingArticlesArr = await articleModule.getArticlesByStatus(ArticleStatus.SCRAPED);
      // TODO: Implement averageQualityScore and translationTools if needed
      return {
        totalArticles: allArticles.length,
        translatedArticles: translatedArticlesArr.length,
        pendingArticles: pendingArticlesArr.length,
        averageQualityScore: 0,
        translationTools: {}
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

export type { TranslatedContent } from '@/entityTypes/ArticleTranslationService'; 