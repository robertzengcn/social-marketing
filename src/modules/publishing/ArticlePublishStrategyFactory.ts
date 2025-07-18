import { Browser } from 'puppeteer';
import { ArticlePublishStrategy, ArticlePublishOptions } from './ArticlePublishStrategy';
import { ToutiaoPublishStrategy } from './ToutiaoPublishStrategy';
import { BaiduPublishStrategy } from './BaiduPublishStrategy';
import { AccountCookiesEntity } from '@/entity/AccountCookies.entity';

export enum ArticlePublishPlatform {
  TOUTIAO = "toutiao",
  BAIDU = "baidu"
}

export class ArticlePublishStrategyFactory {
  private static instance: ArticlePublishStrategyFactory;
  private browserCache: Map<string, Browser> = new Map();

  private constructor() {}

  public static getInstance(): ArticlePublishStrategyFactory {
    if (!ArticlePublishStrategyFactory.instance) {
      ArticlePublishStrategyFactory.instance = new ArticlePublishStrategyFactory();
    }
    return ArticlePublishStrategyFactory.instance;
  }

  private async getBrowser(options: ArticlePublishOptions): Promise<Browser> {
    const cacheKey = options.headless ? 'headless' : 'headed';
    
    if (!this.browserCache.has(cacheKey)) {
      const browser = await this.createBrowser(options);
      this.browserCache.set(cacheKey, browser);
    }
    
    return this.browserCache.get(cacheKey)!;
  }

  private async createBrowser(options: ArticlePublishOptions): Promise<Browser> {
    const puppeteer = require('puppeteer');
    
    const launchOptions = {
      headless: options.headless !== false, // Default to headless
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    };

    return await puppeteer.launch(launchOptions);
  }

  public async createStrategy(platform: ArticlePublishPlatform, options: ArticlePublishOptions): Promise<ArticlePublishStrategy> {
    const browser = await this.getBrowser(options);

    switch (platform) {
      case ArticlePublishPlatform.TOUTIAO:
        return new ToutiaoPublishStrategy(browser);
      case ArticlePublishPlatform.BAIDU:
        return new BaiduPublishStrategy(browser);
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  public async cleanup(): Promise<void> {
    for (const browser of this.browserCache.values()) {
      await browser.close();
    }
    this.browserCache.clear();
  }

  public getSupportedPlatforms(): ArticlePublishPlatform[] {
    return Object.values(ArticlePublishPlatform);
  }

  public async validatePlatform(platform: string): Promise<boolean> {
    return Object.values(ArticlePublishPlatform).includes(platform as ArticlePublishPlatform);
  }
} 