import { Browser, Page } from 'puppeteer';
import { TranslatedContent } from '../translation/ArticleTranslationService';
import { AccountCookiesEntity } from '@/entity/AccountCookies.entity';

export interface PublishResult {
  success: boolean;
  platformId: string;
  publishedUrl?: string;
  errorMessage?: string;
  publishedAt: Date;
  contentVersion: number;
  retryCount: number;
  articleId: number;
}

export interface FormattedContent {
  title: string;
  content: string;
  tags?: string[];
  category?: string;
  images?: string[];
  metadata?: Record<string, any>;
}

export interface ContentLimits {
  titleLength: number;
  contentLength: number;
  imageCount: number;
  tagCount: number;
}

export interface RetryPolicy {
  maxRetries: number;
  retryDelay: number; // in milliseconds
  exponentialBackoff: boolean;
}

export interface ArticlePublishOptions {
  title?: string;
  content?: string;
  tags?: string[];
  category?: string;
  images?: string[];
  metadata?: Record<string, any>;
  scheduleDate?: Date;
  headless?: boolean;
  cookies?: Array<{
    name: string;
    value: string;
    domain: string;
    path: string;
  }>;
  errorLogPath?: string;
  [key: string]: any; // Allow platform-specific options
}

export interface ArticlePublishStrategy {
  publish(article: TranslatedContent, account: AccountCookiesEntity, options: ArticlePublishOptions): Promise<PublishResult>;
  validateContent(article: TranslatedContent): boolean;
  formatContent(article: TranslatedContent, options: ArticlePublishOptions): FormattedContent;
  getPlatformName(): string;
  getContentLimits(): ContentLimits;
  getRequiredFields(): string[];
  getRetryPolicy(): RetryPolicy;
}

export abstract class BaseArticlePublishStrategy implements ArticlePublishStrategy {
  protected browser: Browser;
  protected page: Page;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  protected async initializePage(options: ArticlePublishOptions): Promise<void> {
    // Close existing page if any
    if (this.page) {
      await this.page.close();
    }

    // Create new page with appropriate viewport
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1280, height: 800 });
  }

  protected async setCookies(cookies: ArticlePublishOptions['cookies']): Promise<void> {
    if (cookies && cookies.length > 0) {
      await this.page.setCookie(...cookies);
    }
  }

  protected async cleanup(): Promise<void> {
    if (this.page) {
      await this.page.close();
    }
  }

  abstract publish(article: TranslatedContent, account: AccountCookiesEntity, options: ArticlePublishOptions): Promise<PublishResult>;
  abstract validateContent(article: TranslatedContent): boolean;
  abstract formatContent(article: TranslatedContent, options: ArticlePublishOptions): FormattedContent;
  abstract getPlatformName(): string;
  abstract getContentLimits(): ContentLimits;
  abstract getRequiredFields(): string[];
  abstract getRetryPolicy(): RetryPolicy;

  protected validateContentLength(content: string, maxLength: number): boolean {
    return content.length <= maxLength;
  }

  protected truncateContent(content: string, maxLength: number): string {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength - 3) + '...';
  }

  protected async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  protected async safeType(selector: string, text: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.type(selector, text);
  }

  protected async safeClick(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }
} 