import { Page } from 'puppeteer';

export interface ArticleContent {
  title: string;
  content: string;
  codeBlocks: CodeBlock[];
  metadata: ArticleMetadata;
  images: ImageAsset[];
  sourceUrl: string;
  contentHash: string;
  scrapedAt: Date;
  version: number;
}

export interface CodeBlock {
  language: string;
  code: string;
  position: number;
  id: string;
  version: number;
}

export interface ArticleMetadata {
  [key: string]: string;
}

export interface ImageAsset {
  originalUrl: string;
  localPath: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

export interface ArticleScraper {
  scrape(url: string): Promise<ArticleContent>;
  validateUrl(url: string): boolean;
  getSupportedDomains(): string[];
  saveToDatabase(content: ArticleContent): Promise<number>;
  checkDuplicate(url: string, contentHash: string): Promise<boolean>;
}

export interface ScrapingStrategy {
  extractTitle(page: Page): Promise<string>;
  extractContent(page: Page): Promise<string>;
  extractMetadata(page: Page): Promise<ArticleMetadata>;
  extractCodeBlocks(page: Page): Promise<CodeBlock[]>;
  extractImages(page: Page): Promise<ImageAsset[]>;
} 