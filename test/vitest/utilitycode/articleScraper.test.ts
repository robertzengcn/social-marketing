import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ArticleScraperImpl } from '@/strategy/scraping/ArticleScraperImpl';
import { ToutiaoScrapingStrategy } from '@/strategy/scraping/ToutiaoScrapingStrategy';
import { BaiduScrapingStrategy } from '@/strategy/scraping/BaiduScrapingStrategy';
import { Page } from 'puppeteer';

function createMockPage({ title = 'Test Title', content = 'Test Content', author = 'Test Author', publishDate = '2024-01-01', tags = ['tag1', 'tag2'], codeBlocks = [{ language: 'js', code: 'console.log(1);', position: 0, id: 'cb1', version: 1 }], images = [{ originalUrl: 'http://img.com/1.png', localPath: '/tmp/1.png', fileName: '1.png', fileSize: 123, mimeType: 'image/png' }] } = {}) {
  const page: Partial<Page> = {
    waitForSelector: vi.fn().mockResolvedValue(undefined),
    $eval: vi.fn().mockImplementation(async (selector, fn) => {
      switch (selector) {
        case 'h1.article-title, .article-title, h1.title, .title':
        case 'h1.title, .title, h1.article-title, .article-title, .post-title, h1.post-title':
          return title;
        case '.article-content, .content, .article-body, .body':
        case '.article-content, .content, .post-content, .article-body, .body, .main-content':
          return content;
        case '.author-name, .author, .byline':
        case '.author, .author-name, .byline, .post-author':
          return author;
        case '.publish-time, .time, .date':
        case '.publish-time, .time, .date, .post-date, .article-date':
          return publishDate;
        default:
          return '';
      }
    }),
    $$eval: vi.fn().mockImplementation(async (selector, fn) => {
      if (selector.includes('tag')) return tags;
      if (selector === 'meta') return [];
      return [];
    }),
    // For code block and image extraction
    $: vi.fn().mockResolvedValue({}),
    $$: vi.fn().mockResolvedValue([]),
  };
  return page as unknown as Page;
}

describe('Scraping Strategies', () => {
  let toutiao: ToutiaoScrapingStrategy;
  let baidu: BaiduScrapingStrategy;
  let mockPage: Page;

  beforeEach(() => {
    toutiao = new ToutiaoScrapingStrategy();
    baidu = new BaiduScrapingStrategy();
    mockPage = createMockPage();
  });

  test('ToutiaoScrapingStrategy extracts title/content/metadata', async () => {
    expect(await toutiao.extractTitle(mockPage)).toBe('Test Title');
    expect(await toutiao.extractContent(mockPage)).toContain('Test Content');
    const meta = await toutiao.extractMetadata(mockPage);
    expect(meta.author).toBe('Test Author');
    expect(meta.publishDate).toBe('2024-01-01');
    expect(meta.tags).toContain('tag1');
  });

  test('BaiduScrapingStrategy extracts title/content/metadata', async () => {
    expect(await baidu.extractTitle(mockPage)).toBe('Test Title');
    expect(await baidu.extractContent(mockPage)).toContain('Test Content');
    const meta = await baidu.extractMetadata(mockPage);
    expect(meta.author).toBe('Test Author');
    expect(meta.publishDate).toBe('2024-01-01');
    expect(meta.tags).toContain('tag1');
  });

  test('Handles missing selectors gracefully', async () => {
    const emptyPage = createMockPage({ title: '', content: '', author: '', publishDate: '', tags: [] });
    expect(await toutiao.extractTitle(emptyPage)).toBe('');
    expect(await baidu.extractTitle(emptyPage)).toBe('');
    expect(await toutiao.extractContent(emptyPage)).toBe('');
    expect(await baidu.extractContent(emptyPage)).toBe('');
    const meta = await toutiao.extractMetadata(emptyPage);
    expect(meta.author).toBeUndefined();
    expect(meta.publishDate).toBeUndefined();
    expect(meta.tags).toBeUndefined();
  });
});

describe('ArticleScraperImpl', () => {
  let scraper: ArticleScraperImpl;

  beforeEach(() => {
    scraper = new ArticleScraperImpl();
  });

  test('validateUrl returns true for supported domains', () => {
    expect(scraper.validateUrl('https://www.toutiao.com/article/123')).toBe(true);
    expect(scraper.validateUrl('https://baijiahao.baidu.com/s?id=456')).toBe(true);
  });

  test('validateUrl returns false for unsupported domains', () => {
    expect(scraper.validateUrl('https://www.example.com/')).toBe(false);
  });

  test('getSupportedDomains returns all registered domains', () => {
    const domains = scraper.getSupportedDomains();
    expect(domains).toContain('toutiao.com');
    expect(domains).toContain('baidu.com');
  });

  // Integration test for scrape (mocking internals)
  test('scrape throws error for unsupported domain', async () => {
    await expect(scraper.scrape('https://unsupported.com')).rejects.toThrow('No scraping strategy found');
  });

  // More integration tests can be added with advanced mocking of Puppeteer if needed
}); 