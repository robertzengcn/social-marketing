import { LanguageItem, LlmCongfig, TraditionalTranslateCongfig } from '@/entityTypes/commonType';
import { ArticleContent, CodeBlock } from './ArticleScraper';
import { ArticleChunk, ProcessedArticleContent, TranslatedContent, TranslationQualityMetrics } from './ArticleTranslationService';

export interface ArticleTranslationStrategy {
  // Core strategy methods
  preprocess(content: ArticleContent): ProcessedArticleContent;
  translateChunks(
    chunks: ArticleChunk[], 
    sourceLang: LanguageItem, 
    targetLang: LanguageItem, 
    toolName: string,
    llmConfig?: LlmCongfig,
    traditionalConfig?: TraditionalTranslateCongfig
  ): Promise<string[]>;
  postprocess(
    translatedChunks: string[], 
    originalContent: ArticleContent
  ): TranslatedContent;
  mergeCodeBlocks(translatedContent: string, codeBlocks: CodeBlock[]): string;

  // Strategy-specific methods
  getStrategyName(): string;
  getStrategyDescription(): string;
  getSupportedContentTypes(): string[];
  getRecommendedChunkSize(): number;
  getQualityThreshold(): number;

  // Code block handling
  extractCodeBlocks(content: string): CodeBlock[];
  preserveCodeBlocks(codeBlocks: CodeBlock[]): CodeBlock[];
  validateCodeBlockPreservation(original: CodeBlock[], preserved: CodeBlock[]): boolean;

  // Quality assessment
  assessChunkQuality(
    originalChunk: ArticleChunk, 
    translatedChunk: string
  ): Promise<TranslationQualityMetrics>;
  assessOverallQuality(
    originalContent: ArticleContent, 
    translatedContent: TranslatedContent
  ): Promise<TranslationQualityMetrics>;

  // Content optimization
  optimizeChunks(chunks: ArticleChunk[]): ArticleChunk[];
  optimizeTranslation(
    translatedChunks: string[], 
    originalChunks: ArticleChunk[]
  ): string[];

  // Error handling and recovery
  handleTranslationError(
    error: Error, 
    chunk: ArticleChunk, 
    retryCount: number
  ): Promise<string | null>;
  shouldRetryTranslation(
    error: Error, 
    chunk: ArticleChunk, 
    retryCount: number
  ): boolean;
  getRetryDelay(retryCount: number): number;

  // Configuration
  setConfiguration(config: {
    chunkSize: number;
    qualityThreshold: number;
    preserveCodeBlocks: boolean;
    preserveComments: boolean;
    preserveStrings: boolean;
    preserveVariableNames: boolean;
    maxRetries: number;
    retryDelay: number;
  }): void;
  getConfiguration(): {
    chunkSize: number;
    qualityThreshold: number;
    preserveCodeBlocks: boolean;
    preserveComments: boolean;
    preserveStrings: boolean;
    preserveVariableNames: boolean;
    maxRetries: number;
    retryDelay: number;
  };

  // Validation
  validateContent(content: ArticleContent): boolean;
  validateChunk(chunk: ArticleChunk): boolean;
  validateTranslation(original: string, translated: string): boolean;
}

// Specific strategy implementations
export interface SequentialTranslationStrategy extends ArticleTranslationStrategy {
  translateSequentially(
    chunks: ArticleChunk[], 
    sourceLang: LanguageItem, 
    targetLang: LanguageItem, 
    toolName: string,
    llmConfig?: LlmCongfig,
    traditionalConfig?: TraditionalTranslateCongfig
  ): Promise<string[]>;
}

export interface ParallelTranslationStrategy extends ArticleTranslationStrategy {
  translateInParallel(
    chunks: ArticleChunk[], 
    sourceLang: LanguageItem, 
    targetLang: LanguageItem, 
    toolName: string,
    maxConcurrency: number,
    llmConfig?: LlmCongfig,
    traditionalConfig?: TraditionalTranslateCongfig
  ): Promise<string[]>;
}

export interface AdaptiveTranslationStrategy extends ArticleTranslationStrategy {
  adaptChunkSize(content: ArticleContent): number;
  adaptQualityThreshold(content: ArticleContent): number;
  adaptTranslationTool(
    content: ArticleContent, 
    availableTools: string[]
  ): string;
}

export interface ContextAwareTranslationStrategy extends ArticleTranslationStrategy {
  buildContext(chunks: ArticleChunk[]): string;
  translateWithContext(
    chunk: ArticleChunk, 
    context: string,
    sourceLang: LanguageItem, 
    targetLang: LanguageItem, 
    toolName: string,
    llmConfig?: LlmCongfig,
    traditionalConfig?: TraditionalTranslateCongfig
  ): Promise<string>;
}

// Strategy factory interface
export interface ArticleTranslationStrategyFactory {
  createStrategy(strategyType: string): ArticleTranslationStrategy;
  getAvailableStrategies(): string[];
  getStrategyInfo(strategyType: string): {
    name: string;
    description: string;
    supportedContentTypes: string[];
    recommendedChunkSize: number;
    qualityThreshold: number;
  };
} 