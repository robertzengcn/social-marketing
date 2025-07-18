import { TranslateProducer } from '@/modules/TranslateProducer';
import { LanguageItem, LlmCongfig, TraditionalTranslateCongfig } from '@/entityTypes/commonType';
import { ArticleContent, CodeBlock } from './ArticleScraper';

export interface ArticleChunk {
  id: string;
  content: string;
  type: 'text' | 'code' | 'metadata';
  position: number;
  codeBlockId?: string; // If this chunk contains a code block
}

export interface ProcessedArticleContent {
  textChunks: ArticleChunk[];
  codeBlocks: CodeBlock[];
  metadata: Record<string, string>;
  totalChunks: number;
}

export interface TranslatedContent {
  title: string;
  content: string;
  codeBlocks: CodeBlock[]; // Preserved from original
  metadata: Record<string, string>;
  sourceLanguage: LanguageItem;
  targetLanguage: LanguageItem;
  translatedAt: Date;
  qualityScore: number;
  version: number;
  articleId: number; // Reference to original article
  translationTool: string; // Which LLM tool was used
}

export interface TranslationMemory {
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  qualityScore: number;
  usageCount: number;
  lastUsedAt: Date;
  toolUsed: string; // Which translation tool was used
}

export interface TranslationQualityMetrics {
  fluency: number; // 0-1
  accuracy: number; // 0-1
  completeness: number; // 0-1
  codePreservation: number; // 0-1
  overallScore: number; // 0-1
}

export interface ArticleTranslationService extends TranslateProducer {
  // Core article translation methods
  translateArticle(
    content: ArticleContent, 
    targetLanguage: LanguageItem,
    toolName: string,
    llmConfig?: LlmCongfig,
    traditionalConfig?: TraditionalTranslateCongfig
  ): Promise<TranslatedContent>;

  translateArticleChunk(
    chunk: ArticleChunk, 
    sourceLang: LanguageItem, 
    targetLang: LanguageItem, 
    toolName: string,
    llmConfig?: LlmCongfig,
    traditionalConfig?: TraditionalTranslateCongfig
  ): Promise<string>;

  // Language detection and validation
  detectLanguage(content: string): Promise<LanguageItem>;
  validateTranslation(original: string, translated: string): Promise<boolean>;
  assessTranslationQuality(original: string, translated: string): Promise<TranslationQualityMetrics>;

  // Database operations
  saveTranslationToDatabase(translated: TranslatedContent, articleId: number): Promise<void>;
  getTranslationMemory(
    sourceText: string, 
    sourceLang: string, 
    targetLang: string
  ): Promise<string | null>;
  updateTranslationMemory(
    sourceText: string, 
    translatedText: string, 
    sourceLang: string, 
    targetLang: string, 
    qualityScore: number,
    toolUsed: string
  ): Promise<void>;

  // Content processing
  chunkArticle(content: ArticleContent): ArticleChunk[];
  preserveCodeBlocks(codeBlocks: CodeBlock[]): CodeBlock[];
  mergeCodeBlocks(translatedContent: string, codeBlocks: CodeBlock[]): string;

  // Advanced features
  batchTranslateArticles(
    articles: ArticleContent[], 
    targetLanguage: LanguageItem,
    toolName: string,
    llmConfig?: LlmCongfig,
    traditionalConfig?: TraditionalTranslateCongfig
  ): Promise<TranslatedContent[]>;

  retryFailedTranslation(
    originalContent: ArticleContent,
    targetLanguage: LanguageItem,
    toolName: string,
    llmConfig?: LlmCongfig,
    traditionalConfig?: TraditionalTranslateCongfig
  ): Promise<TranslatedContent>;

  // Configuration and settings
  setTranslationPreferences(preferences: {
    preserveCodeBlocks: boolean;
    preserveComments: boolean;
    preserveStrings: boolean;
    preserveVariableNames: boolean;
    chunkSize: number;
    qualityThreshold: number;
    enableTranslationMemory: boolean;
  }): void;

  getTranslationPreferences(): {
    preserveCodeBlocks: boolean;
    preserveComments: boolean;
    preserveStrings: boolean;
    preserveVariableNames: boolean;
    chunkSize: number;
    qualityThreshold: number;
    enableTranslationMemory: boolean;
  };

  // Statistics and monitoring
  getTranslationStats(): Promise<{
    totalArticlesTranslated: number;
    averageQualityScore: number;
    translationMemorySize: number;
    mostUsedTools: Array<{ tool: string; usageCount: number }>;
    averageProcessingTime: number;
  }>;

  // Utility methods
  preprocessArticle(content: ArticleContent): ProcessedArticleContent;
  postprocessTranslation(
    translatedChunks: string[], 
    originalContent: ArticleContent,
    codeBlocks: CodeBlock[]
  ): TranslatedContent;
} 