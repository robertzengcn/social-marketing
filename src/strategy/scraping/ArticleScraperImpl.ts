import { Browser, Page } from 'puppeteer';
import * as puppeteer from 'puppeteer';
import * as crypto from 'crypto';
import { 
  ArticleScraper, 
  ArticleContent, 
  ScrapingStrategy,
  CodeBlock,
  ArticleMetadata,
  ImageAsset 
} from '@/entityTypes/ArticleScraper';
import { ToutiaoScrapingStrategy } from './ToutiaoScrapingStrategy';
import { BaiduScrapingStrategy } from './BaiduScrapingStrategy';
import { CodeBlockExtractor } from './CodeBlockExtractor';
import { ScrapingErrorHandler, ScrapingErrorType } from './ScrapingErrorHandler';
import { RateLimiter } from './RateLimiter';
import { ProxyManager, ProxyConfig } from './ProxyManager';

export interface ScrapingOptions {
  useProxy?: boolean;
  proxyConfig?: ProxyConfig;
  rateLimitConfig?: any;
  errorRecoveryStrategy?: any;
  codeBlockOptions?: any;
  timeout?: number;
  retryAttempts?: number;
}

export class ArticleScraperImpl implements ArticleScraper {
  private strategies: Map<string, ScrapingStrategy> = new Map();
  private codeBlockExtractor: CodeBlockExtractor;
  private errorHandler: ScrapingErrorHandler;
  private rateLimiter: RateLimiter;
  private proxyManager: ProxyManager;
  private browser?: Browser;
  private page?: Page;

  constructor(options?: ScrapingOptions) {
    this.initializeStrategies();
    this.codeBlockExtractor = new CodeBlockExtractor();
    this.errorHandler = new ScrapingErrorHandler();
    this.rateLimiter = new RateLimiter(options?.rateLimitConfig);
    this.proxyManager = new ProxyManager();
  }

  private initializeStrategies(): void {
    // Register scraping strategies for different websites
    this.strategies.set('toutiao.com', new ToutiaoScrapingStrategy());
    this.strategies.set('toutiao.io', new ToutiaoScrapingStrategy());
    this.strategies.set('baidu.com', new BaiduScrapingStrategy());
    this.strategies.set('baijiahao.baidu.com', new BaiduScrapingStrategy());
  }

  async scrape(url: string, options?: ScrapingOptions): Promise<ArticleContent> {
    const startTime = Date.now();
    let retryCount = 0;
    const maxRetries = options?.retryAttempts || 3;

    while (retryCount <= maxRetries) {
      try {
        // Wait for rate limit
        await this.rateLimiter.waitForRateLimit(url);

        // Initialize browser with proxy if specified
        await this.initializeBrowser(options);

        // Navigate to the URL
        await this.navigateToUrl(url, options?.timeout);

        // Get the appropriate strategy for this URL
        const strategy = this.getStrategyForUrl(url);
        if (!strategy) {
          throw new Error(`No scraping strategy found for URL: ${url}`);
        }

        // Extract content using the strategy
        const title = await strategy.extractTitle(this.page!);
        const content = await strategy.extractContent(this.page!);
        const metadata = await strategy.extractMetadata(this.page!);
        const codeBlocks = await strategy.extractCodeBlocks(this.page!);
        const images = await strategy.extractImages(this.page!);

        // Use advanced code block extraction if needed
        const enhancedCodeBlocks = await this.codeBlockExtractor.extractCodeBlocks(
          this.page!,
          options?.codeBlockOptions
        );

        // Merge and deduplicate code blocks
        const allCodeBlocks = this.mergeCodeBlocks(codeBlocks, enhancedCodeBlocks);

        // Generate content hash for deduplication
        const contentHash = this.generateContentHash(content);

        // Create article content object
        const articleContent: ArticleContent = {
          title,
          content,
          codeBlocks: allCodeBlocks,
          metadata,
          images,
          sourceUrl: url,
          contentHash,
          scrapedAt: new Date(),
          version: 1
        };

        // Record success metrics
        const responseTime = Date.now() - startTime;
        if (options?.proxyConfig) {
          this.proxyManager.recordProxySuccess(options.proxyConfig, responseTime);
        }

        console.log(`Successfully scraped article: ${title}`);
        return articleContent;

      } catch (error) {
        retryCount++;
        console.error(`Scraping attempt ${retryCount} failed for ${url}:`, error);

        // Handle the error
        const scrapingError = await this.errorHandler.handleError(error as Error, {
          url,
          retryCount,
          page: this.page
        });

        // Check if we should retry
        if (retryCount <= maxRetries && await this.errorHandler.shouldRetry(scrapingError)) {
          const delay = await this.errorHandler.getRetryDelay(scrapingError);
          console.log(`Retrying in ${delay}ms...`);
          await this.delay(delay);

          // Execute recovery strategy if possible
          if (this.page) {
            await this.errorHandler.executeRecoveryStrategy(scrapingError, this.page);
          }

          // Record proxy failure if using proxy
          if (options?.proxyConfig) {
            this.proxyManager.recordProxyFailure(options.proxyConfig);
          }

          continue;
        }

        // If we've exhausted retries, throw the error
        throw new Error(`Failed to scrape ${url} after ${maxRetries} attempts: ${error}`);
      } finally {
        // Clean up browser resources
        await this.cleanup();
      }
    }

    throw new Error(`Failed to scrape ${url} after ${maxRetries} attempts`);
  }

  validateUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return this.strategies.has(urlObj.hostname) || 
             Array.from(this.strategies.keys()).some(domain => 
               urlObj.hostname.includes(domain)
             );
    } catch (error) {
      return false;
    }
  }

  getSupportedDomains(): string[] {
    return Array.from(this.strategies.keys());
  }

  async saveToDatabase(content: ArticleContent): Promise<number> {
    try {
      // This would integrate with the existing database system
      // For now, we'll create a placeholder implementation
      console.log('Saving article to database:', content.title);
      
      // Example integration with existing database
      // const articleRepository = getRepository(ArticleEntity);
      // const article = articleRepository.create({
      //   title: content.title,
      //   originalContent: content.content,
      //   sourceUrl: content.sourceUrl,
      //   contentHash: content.contentHash,
      //   scrapedAt: content.scrapedAt,
      //   status: 'scraped'
      // });
      // const savedArticle = await articleRepository.save(article);
      // return savedArticle.id;

      // Placeholder: return a mock ID
      return Math.floor(Math.random() * 1000000);
    } catch (error) {
      console.error('Error saving article to database:', error);
      throw error;
    }
  }

  async checkDuplicate(url: string, contentHash: string): Promise<boolean> {
    try {
      // This would check the existing database for duplicates
      // For now, we'll create a placeholder implementation
      console.log('Checking for duplicate article:', url);
      
      // Example integration with existing database
      // const articleRepository = getRepository(ArticleEntity);
      // const existingArticle = await articleRepository.findOne({
      //   where: [
      //     { sourceUrl: url },
      //     { contentHash: contentHash }
      //   ]
      // });
      // return !!existingArticle;

      // Placeholder: return false (no duplicate found)
      return false;
    } catch (error) {
      console.error('Error checking for duplicate:', error);
      return false;
    }
  }

  private async initializeBrowser(options?: ScrapingOptions): Promise<void> {
    try {
      if (options?.useProxy && options?.proxyConfig) {
        this.browser = await this.proxyManager.createBrowserWithProxy(
          options.proxyConfig,
          {
            headless: true,
            args: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
              '--disable-dev-shm-usage',
              '--disable-accelerated-2d-canvas',
              '--disable-gpu',
              '--start-maximized',
              '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            ]
          }
        );
      } else {
        this.browser = await puppeteer.launch({
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--start-maximized',
            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          ]
        });
      }

      this.page = await this.browser.newPage();
      await this.page.setViewport({ width: 1280, height: 800 });

      // Set additional headers to avoid detection
      await this.page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      });

    } catch (error) {
      console.error('Error initializing browser:', error);
      throw error;
    }
  }

  private async navigateToUrl(url: string, timeout?: number): Promise<void> {
    if (!this.page) {
      throw new Error('Browser page not initialized');
    }

    try {
      await this.page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: timeout || 30000
      });

      // Wait for content to load
      await this.page.waitForFunction(() => {
        return document.body.textContent && document.body.textContent.length > 100;
      }, { timeout: 10000 });

    } catch (error) {
      console.error('Error navigating to URL:', error);
      throw error;
    }
  }

  private getStrategyForUrl(url: string): ScrapingStrategy | null {
    try {
      const urlObj = new URL(url);
      
      // Find exact match first
      if (this.strategies.has(urlObj.hostname)) {
        return this.strategies.get(urlObj.hostname)!;
      }

      // Find partial match
      for (const [domain, strategy] of this.strategies.entries()) {
        if (urlObj.hostname.includes(domain)) {
          return strategy;
        }
      }

      return null;
    } catch (error) {
      console.error('Error getting strategy for URL:', error);
      return null;
    }
  }

  private mergeCodeBlocks(original: CodeBlock[], enhanced: CodeBlock[]): CodeBlock[] {
    const merged = [...original];
    const existingIds = new Set(original.map(block => block.id));

    enhanced.forEach(block => {
      if (!existingIds.has(block.id)) {
        merged.push(block);
        existingIds.add(block.id);
      }
    });

    return merged.sort((a, b) => a.position - b.position);
  }

  private generateContentHash(content: string): string {
    return crypto.createHash('md5').update(content).digest('hex');
  }

  private async cleanup(): Promise<void> {
    try {
      if (this.page) {
        await this.page.close();
        this.page = undefined;
      }
      if (this.browser) {
        await this.browser.close();
        this.browser = undefined;
      }
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Additional utility methods
  async addStrategy(domain: string, strategy: ScrapingStrategy): void {
    this.strategies.set(domain, strategy);
  }

  async removeStrategy(domain: string): void {
    this.strategies.delete(domain);
  }

  getStrategyCount(): number {
    return this.strategies.size;
  }

  async getScrapingStats(): Promise<{
    totalScrapes: number;
    successRate: number;
    averageResponseTime: number;
    errorStats: any;
    rateLimitStats: any;
    proxyStats: any;
  }> {
    const errorStats = this.errorHandler.getErrorStats();
    const rateLimitStats = this.rateLimiter.getRateLimitStats();
    const proxyStats = this.proxyManager.getProxyStats();

    return {
      totalScrapes: errorStats.totalErrors + 100, // Placeholder
      successRate: 0.95, // Placeholder
      averageResponseTime: 5000, // Placeholder
      errorStats,
      rateLimitStats,
      proxyStats
    };
  }
} 