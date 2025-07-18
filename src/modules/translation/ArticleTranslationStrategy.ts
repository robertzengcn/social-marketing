import { TranslateProducer } from '../translation/TranslateProducer';
import { LanguageItem } from '../types/LanguageTypes';
import { ArticleContent, ArticleChunk, TranslatedContent, ProcessedArticleContent } from '../types/ArticleTypes';
import { ContentChunking } from './ContentChunking';
import { CodeBlockPreservation } from './CodeBlockPreservation';
import { TranslationQualityControl, QualityCheckResult } from './TranslationQualityControl';
import { TranslationMemory } from './TranslationMemory';
import { TranslateToolEnum } from '../types/TranslateToolEnum';

/**
 * Interface for article translation strategy configuration
 */
export interface ArticleTranslationStrategyConfig {
  chunkSize: number;
  maxArticleLength: number;
  temperature: number;
  qualityThreshold: number;
  batchSize: number;
  enableQualityControl: boolean;
  enableTranslationMemory: boolean;
  fallbackTools: TranslateToolEnum[];
  retryAttempts: number;
  preserveCodeBlocks: boolean;
  preserveFormatting: boolean;
}

/**
 * Class that orchestrates the entire article translation process
 * Extends existing TranslateProducer functionality for article-specific needs
 */
export class ArticleTranslationStrategy {
  private translateProducer: TranslateProducer;
  private contentChunking: ContentChunking;
  private codeBlockPreservation: CodeBlockPreservation;
  private qualityControl: TranslationQualityControl;
  private translationMemory: TranslationMemory;
  private config: ArticleTranslationStrategyConfig;

  constructor(
    translateProducer: TranslateProducer,
    config: ArticleTranslationStrategyConfig
  ) {
    this.translateProducer = translateProducer;
    this.contentChunking = new ContentChunking();
    this.codeBlockPreservation = new CodeBlockPreservation();
    this.qualityControl = new TranslationQualityControl({
      minQualityScore: config.qualityThreshold,
      autoRetry: true,
      maxRetries: config.retryAttempts,
      humanReviewThreshold: 0.6,
      retryWithDifferentTool: true,
      fallbackTools: config.fallbackTools,
      qualityCheckEnabled: config.enableQualityControl
    });
    this.translationMemory = new TranslationMemory({
      enabled: config.enableTranslationMemory,
      minQualityScore: config.qualityThreshold,
      maxMemorySize: 10000,
      autoCleanup: true,
      cleanupThreshold: 30,
      toolSpecificMemory: true
    });
    this.config = config;
  }

  /**
   * Main method to translate an article
   * @param content Article content to translate
   * @param targetLanguage Target language
   * @param toolName Translation tool to use
   * @returns Translated content
   */
  async translateArticle(
    content: ArticleContent,
    targetLanguage: LanguageItem,
    toolName: TranslateToolEnum
  ): Promise<TranslatedContent> {
    try {
      // Step 1: Preprocess the article content
      const processedContent = this.preprocess(content);

      // Step 2: Check translation memory first
      const memoryResult = await this.checkTranslationMemory(content, targetLanguage, toolName);
      if (memoryResult) {
        return memoryResult;
      }

      // Step 3: Chunk the content for translation
      const chunks = this.contentChunking.chunkArticle(content, this.config.chunkSize);

      // Step 4: Translate chunks
      const translatedChunks = await this.translateChunks(
        chunks,
        content.metadata.sourceLanguage || { name: 'English', code: 'en' },
        targetLanguage,
        toolName
      );

      // Step 5: Postprocess and merge
      const translatedContent = this.postprocess(translatedChunks, content, targetLanguage, toolName);

      // Step 6: Quality control
      if (this.config.enableQualityControl) {
        const qualityResult = await this.performQualityCheck(content, translatedContent, toolName);
        
        if (!qualityResult.passed && this.config.retryAttempts > 0) {
          return await this.retryTranslation(content, targetLanguage, toolName, qualityResult);
        }
      }

      // Step 7: Save to translation memory
      if (this.config.enableTranslationMemory) {
        await this.saveToTranslationMemory(content, translatedContent, toolName);
      }

      return translatedContent;
    } catch (error) {
      console.error('Error translating article:', error);
      throw new Error(`Article translation failed: ${error.message}`);
    }
  }

  /**
   * Preprocesses article content for translation
   * @param content Article content
   * @returns Processed content
   */
  private preprocess(content: ArticleContent): ProcessedArticleContent {
    // Extract and preserve code blocks
    const preservedCodeBlocks = this.config.preserveCodeBlocks 
      ? this.codeBlockPreservation.preserveCodeBlocks(content.codeBlocks || [])
      : content.codeBlocks || [];

    // Create text chunks (code blocks will be reinserted later)
    const textContent = this.codeBlockPreservation.removeCodeBlocksFromText(content.content);
    const textChunks = this.contentChunking.chunkArticle(
      { ...content, content: textContent, codeBlocks: [] },
      this.config.chunkSize
    );

    return {
      textChunks,
      codeBlocks: preservedCodeBlocks,
      metadata: content.metadata,
      totalChunks: textChunks.length + preservedCodeBlocks.length
    };
  }

  /**
   * Checks translation memory for existing translations
   * @param content Article content
   * @param targetLanguage Target language
   * @param toolName Translation tool
   * @returns Cached translation or null
   */
  private async checkTranslationMemory(
    content: ArticleContent,
    targetLanguage: LanguageItem,
    toolName: TranslateToolEnum
  ): Promise<TranslatedContent | null> {
    try {
      const cachedTranslation = await this.translationMemory.getTranslation(
        content.content,
        content.metadata.sourceLanguage?.code || 'en',
        targetLanguage.code,
        toolName
      );

      if (cachedTranslation) {
        return {
          title: content.title, // Title would need separate translation
          content: cachedTranslation,
          codeBlocks: content.codeBlocks || [],
          metadata: content.metadata,
          sourceLanguage: content.metadata.sourceLanguage || { name: 'English', code: 'en' },
          targetLanguage,
          translatedAt: new Date(),
          qualityScore: 0.8, // Default score for cached translations
          version: 1,
          articleId: content.id || 0,
          translationTool: toolName
        };
      }

      return null;
    } catch (error) {
      console.error('Error checking translation memory:', error);
      return null;
    }
  }

  /**
   * Translates content chunks using the existing TranslateProducer
   * @param chunks Content chunks to translate
   * @param sourceLanguage Source language
   * @param targetLanguage Target language
   * @param toolName Translation tool
   * @returns Translated chunks
   */
  private async translateChunks(
    chunks: ArticleChunk[],
    sourceLanguage: LanguageItem,
    targetLanguage: LanguageItem,
    toolName: TranslateToolEnum
  ): Promise<ArticleChunk[]> {
    const translatedChunks: ArticleChunk[] = [];

    // Process chunks in batches
    for (let i = 0; i < chunks.length; i += this.config.batchSize) {
      const batch = chunks.slice(i, i + this.config.batchSize);
      const batchPromises = batch.map(async (chunk) => {
        try {
          // Skip translation for code chunks if preservation is enabled
          if (chunk.type === 'code' && this.config.preserveCodeBlocks) {
            return chunk;
          }

          // Use existing TranslateProducer for translation
          const translatedText = await this.translateProducer.translate(
            chunk.content,
            sourceLanguage,
            targetLanguage,
            toolName
          );

          return {
            ...chunk,
            content: translatedText
          };
        } catch (error) {
          console.error(`Error translating chunk ${chunk.id}:`, error);
          // Return original chunk on error
          return chunk;
        }
      });

      const batchResults = await Promise.all(batchPromises);
      translatedChunks.push(...batchResults);

      // Add delay between batches to respect rate limits
      if (i + this.config.batchSize < chunks.length) {
        await this.delay(1000);
      }
    }

    return translatedChunks;
  }

  /**
   * Postprocesses translated chunks and merges them back into a complete article
   * @param translatedChunks Translated chunks
   * @param originalContent Original article content
   * @param targetLanguage Target language
   * @param toolName Translation tool
   * @returns Complete translated content
   */
  private postprocess(
    translatedChunks: ArticleChunk[],
    originalContent: ArticleContent,
    targetLanguage: LanguageItem,
    toolName: TranslateToolEnum
  ): TranslatedContent {
    // Merge chunks back into complete content
    const mergedContent = this.contentChunking.mergeChunks(translatedChunks, originalContent);

    // Reinsert code blocks if preservation is enabled
    const finalContent = this.config.preserveCodeBlocks
      ? this.codeBlockPreservation.mergeCodeBlocks(mergedContent, originalContent.codeBlocks || [])
      : mergedContent;

    // Translate title separately
    const translatedTitle = this.translateTitle(originalContent.title, targetLanguage, toolName);

    return {
      title: translatedTitle,
      content: finalContent,
      codeBlocks: this.config.preserveCodeBlocks ? originalContent.codeBlocks || [] : [],
      metadata: originalContent.metadata,
      sourceLanguage: originalContent.metadata.sourceLanguage || { name: 'English', code: 'en' },
      targetLanguage,
      translatedAt: new Date(),
      qualityScore: 0.8, // Will be updated by quality control
      version: 1,
      articleId: originalContent.id || 0,
      translationTool: toolName
    };
  }

  /**
   * Translates the article title
   * @param title Original title
   * @param targetLanguage Target language
   * @param toolName Translation tool
   * @returns Translated title
   */
  private async translateTitle(
    title: string,
    targetLanguage: LanguageItem,
    toolName: TranslateToolEnum
  ): Promise<string> {
    try {
      return await this.translateProducer.translate(
        title,
        { name: 'English', code: 'en' }, // Assume English titles
        targetLanguage,
        toolName
      );
    } catch (error) {
      console.error('Error translating title:', error);
      return title; // Return original title on error
    }
  }

  /**
   * Performs quality control on the translated content
   * @param originalContent Original content
   * @param translatedContent Translated content
   * @param toolName Translation tool
   * @returns Quality check result
   */
  private async performQualityCheck(
    originalContent: ArticleContent,
    translatedContent: TranslatedContent,
    toolName: TranslateToolEnum
  ): Promise<QualityCheckResult> {
    return await this.qualityControl.checkQuality(
      originalContent.content,
      translatedContent.content,
      originalContent.metadata.sourceLanguage || { name: 'English', code: 'en' },
      translatedContent.targetLanguage,
      toolName
    );
  }

  /**
   * Retries translation with different tools or parameters
   * @param content Original content
   * @param targetLanguage Target language
   * @param originalTool Original tool that failed
   * @param qualityResult Quality check result
   * @returns Retried translation
   */
  private async retryTranslation(
    content: ArticleContent,
    targetLanguage: LanguageItem,
    originalTool: TranslateToolEnum,
    qualityResult: QualityCheckResult
  ): Promise<TranslatedContent> {
    // Try with different tool
    if (this.config.retryWithDifferentTool && this.config.fallbackTools.length > 0) {
      const nextTool = this.config.fallbackTools.find(tool => tool !== originalTool);
      if (nextTool) {
        console.log(`Retrying translation with ${nextTool}`);
        return await this.translateArticle(content, targetLanguage, nextTool);
      }
    }

    // If no fallback tools or all failed, return the best result we have
    console.warn('All translation attempts failed, returning best available result');
    return {
      title: content.title,
      content: content.content, // Return original content
      codeBlocks: content.codeBlocks || [],
      metadata: content.metadata,
      sourceLanguage: content.metadata.sourceLanguage || { name: 'English', code: 'en' },
      targetLanguage,
      translatedAt: new Date(),
      qualityScore: 0.0,
      version: 1,
      articleId: content.id || 0,
      translationTool: originalTool
    };
  }

  /**
   * Saves translation to memory
   * @param originalContent Original content
   * @param translatedContent Translated content
   * @param toolName Translation tool
   */
  private async saveToTranslationMemory(
    originalContent: ArticleContent,
    translatedContent: TranslatedContent,
    toolName: TranslateToolEnum
  ): Promise<void> {
    try {
      await this.translationMemory.saveTranslation(
        originalContent.content,
        translatedContent.content,
        originalContent.metadata.sourceLanguage?.code || 'en',
        translatedContent.targetLanguage.code,
        translatedContent.qualityScore,
        toolName
      );
    } catch (error) {
      console.error('Error saving to translation memory:', error);
    }
  }

  /**
   * Utility method to add delay
   * @param ms Milliseconds to delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Updates the strategy configuration
   * @param newConfig New configuration
   */
  updateConfig(newConfig: Partial<ArticleTranslationStrategyConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Update dependent components
    this.qualityControl.updateConfig({
      minQualityScore: this.config.qualityThreshold,
      maxRetries: this.config.retryAttempts,
      fallbackTools: this.config.fallbackTools
    });

    this.translationMemory.updateConfig({
      minQualityScore: this.config.qualityThreshold
    });
  }

  /**
   * Gets the current configuration
   * @returns Current configuration
   */
  getConfig(): ArticleTranslationStrategyConfig {
    return { ...this.config };
  }

  /**
   * Gets translation statistics
   * @returns Translation statistics
   */
  async getTranslationStatistics(): Promise<{
    memoryStats: any;
    qualityStats: any;
  }> {
    const memoryStats = await this.translationMemory.getMemoryStatistics();
    
    return {
      memoryStats,
      qualityStats: this.qualityControl.getConfig()
    };
  }
} 