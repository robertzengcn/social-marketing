import { ArticleScraperImpl, ScrapingOptions } from '@/strategy/scraping/ArticleScraperImpl';
import { ArticleContent } from '@/entityTypes/ArticleScraper';
import { CommonDialogMsg } from '@/entityTypes/commonType';
import { CommonResponse, ListData } from '@/entityTypes/commonType';

export interface ArticleScrapeRequest {
  url: string;
  targetLanguage?: string;
  strategy?: string;
  extractCodeBlocks?: boolean;
  extractImages?: boolean;
  extractMetadata?: boolean;
  timeout?: number;
  useProxy?: boolean;
  proxyConfig?: any;
  retryAttempts?: number;
}

export interface ArticleScrapeResult {
  id: number;
  success: boolean;
  title?: string;
  url: string;
  articleId?: number;
  error?: string;
  timestamp: Date;
}

export interface ArticleListItem {
  id: number;
  title: string;
  sourceUrl: string;
  status: string;
  scrapedAt: Date;
  contentLength: number;
  codeBlockCount: number;
  imageCount: number;
}

export interface ArticleDetail {
  id: number;
  title: string;
  content: string;
  sourceUrl: string;
  status: string;
  scrapedAt: Date;
  codeBlocks: any[];
  metadata: any;
  images: any[];
  contentHash: string;
  version: number;
}

export interface ArticleScrapeStats {
  totalScrapes: number;
  successRate: number;
  averageResponseTime: number;
  errorStats: any;
  rateLimitStats: any;
  proxyStats: any;
}

export class ArticleController {
  private articleScraper: ArticleScraperImpl;

  constructor() {
    this.articleScraper = new ArticleScraperImpl();
  }

  /**
   * Scrape a single article
   */
  public async scrapeArticle(request: ArticleScrapeRequest): Promise<ArticleScrapeResult> {
    try {
      // Validate URL
      if (!this.articleScraper.validateUrl(request.url)) {
        return {
          id: Date.now(),
          success: false,
          url: request.url,
          error: 'Unsupported URL or invalid URL format',
          timestamp: new Date()
        };
      }

      // Check for duplicates
      const contentHash = this.generateContentHash(request.url);
      const isDuplicate = await this.articleScraper.checkDuplicate(request.url, contentHash);
      if (isDuplicate) {
        return {
          id: Date.now(),
          success: false,
          url: request.url,
          error: 'Article already exists in database',
          timestamp: new Date()
        };
      }

      // Prepare scraping options
      const scrapingOptions: ScrapingOptions = {
        useProxy: request.useProxy,
        proxyConfig: request.proxyConfig,
        timeout: request.timeout || 30000,
        retryAttempts: request.retryAttempts || 3,
        codeBlockOptions: {
          extractCodeBlocks: request.extractCodeBlocks !== false,
          extractImages: request.extractImages !== false,
          extractMetadata: request.extractMetadata !== false
        }
      };

      // Scrape the article
      const articleContent = await this.articleScraper.scrape(request.url, scrapingOptions);

      // Save to database
      const articleId = await this.articleScraper.saveToDatabase(articleContent);

      return {
        id: Date.now(),
        success: true,
        title: articleContent.title,
        url: request.url,
        articleId: articleId,
        timestamp: new Date()
      };

    } catch (error) {
      console.error('Article scraping failed:', error);
      return {
        id: Date.now(),
        success: false,
        url: request.url,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date()
      };
    }
  }

  /**
   * Scrape multiple articles in batch
   */
  public async scrapeBatch(urls: string[], options: ArticleScrapeRequest): Promise<ArticleScrapeResult[]> {
    const results: ArticleScrapeResult[] = [];
    
    for (const url of urls) {
      const request: ArticleScrapeRequest = {
        ...options,
        url: url.trim()
      };
      
      const result = await this.scrapeArticle(request);
      results.push(result);
      
      // Add delay between requests to avoid rate limiting
      if (results.length < urls.length) {
        await this.delay(1000);
      }
    }
    
    return results;
  }

  /**
   * Get list of scraped articles
   */
  public async getArticleList(page: number = 1, size: number = 20): Promise<ListData<ArticleListItem>> {
    try {
      // TODO: Implement database query for article list
      // For now, return mock data
      const mockArticles: ArticleListItem[] = [
        {
          id: 1,
          title: 'Sample Article',
          sourceUrl: 'https://example.com/article',
          status: 'scraped',
          scrapedAt: new Date(),
          contentLength: 1500,
          codeBlockCount: 2,
          imageCount: 1
        }
      ];

      return {
        records: mockArticles,
        total: mockArticles.length
      };
    } catch (error) {
      console.error('Error getting article list:', error);
      return {
        records: [],
        total: 0
      };
    }
  }

  /**
   * Get article details by ID
   */
  public async getArticleDetail(id: number): Promise<ArticleDetail | null> {
    try {
      // TODO: Implement database query for article details
      // For now, return mock data
      return {
        id: id,
        title: 'Sample Article',
        content: 'This is the article content...',
        sourceUrl: 'https://example.com/article',
        status: 'scraped',
        scrapedAt: new Date(),
        codeBlocks: [],
        metadata: {},
        images: [],
        contentHash: 'mock-hash',
        version: 1
      };
    } catch (error) {
      console.error('Error getting article detail:', error);
      return null;
    }
  }

  /**
   * Delete article by ID
   */
  public async deleteArticle(id: number): Promise<boolean> {
    try {
      // TODO: Implement database deletion
      console.log(`Deleting article with ID: ${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting article:', error);
      return false;
    }
  }

  /**
   * Get scraping statistics
   */
  public async getScrapingStats(): Promise<ArticleScrapeStats> {
    try {
      return await this.articleScraper.getScrapingStats();
    } catch (error) {
      console.error('Error getting scraping stats:', error);
      return {
        totalScrapes: 0,
        successRate: 0,
        averageResponseTime: 0,
        errorStats: {},
        rateLimitStats: {},
        proxyStats: {}
      };
    }
  }

  /**
   * Get supported domains
   */
  public getSupportedDomains(): string[] {
    return this.articleScraper.getSupportedDomains();
  }

  /**
   * Validate URL for scraping
   */
  public validateUrl(url: string): boolean {
    return this.articleScraper.validateUrl(url);
  }

  /**
   * Generate content hash for deduplication
   */
  private generateContentHash(url: string): string {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(url).digest('hex');
  }

  /**
   * Delay utility function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 