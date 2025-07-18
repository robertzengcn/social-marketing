import { Page } from 'puppeteer';
import { ScrapingStrategy, ArticleMetadata, CodeBlock, ImageAsset } from '@/entityTypes/ArticleScraper';
import * as crypto from 'crypto';

export class BaiduScrapingStrategy implements ScrapingStrategy {
  private readonly selectors = {
    title: 'h1.title, .title, h1.article-title, .article-title, .post-title, h1.post-title',
    content: '.article-content, .content, .post-content, .article-body, .body, .main-content',
    author: '.author, .author-name, .byline, .post-author',
    publishDate: '.publish-time, .time, .date, .post-date, .article-date',
    tags: '.tag, .tags, .category, .post-tags',
    codeBlocks: 'pre code, .code-block, .highlight, .syntax-highlight',
    images: '.article-content img, .content img, .post-content img, .body img'
  };

  async extractTitle(page: Page): Promise<string> {
    try {
      // Wait for the title to be available
      await page.waitForSelector(this.selectors.title, { timeout: 10000 });
      
      const title = await page.$eval(this.selectors.title, (el) => {
        return el.textContent?.trim() || '';
      });
      
      return title;
    } catch (error) {
      console.error('Error extracting title from Baidu:', error);
      return '';
    }
  }

  async extractContent(page: Page): Promise<string> {
    try {
      // Wait for the content to be available
      await page.waitForSelector(this.selectors.content, { timeout: 15000 });
      
      const content = await page.$eval(this.selectors.content, (el) => {
        // Remove script and style elements
        const scripts = el.querySelectorAll('script, style');
        scripts.forEach(script => script.remove());
        
        // Get text content while preserving some formatting
        return el.innerHTML
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
          .replace(/<[^>]+>/g, '\n')
          .replace(/\n\s*\n/g, '\n')
          .trim();
      });
      
      return content;
    } catch (error) {
      console.error('Error extracting content from Baidu:', error);
      return '';
    }
  }

  async extractMetadata(page: Page): Promise<ArticleMetadata> {
    const metadata: ArticleMetadata = {};
    
    try {
      // Extract author
      try {
        const author = await page.$eval(this.selectors.author, (el) => {
          return el.textContent?.trim() || '';
        });
        if (author) metadata.author = author;
      } catch (error) {
        // Author might not be available
      }

      // Extract publish date
      try {
        const publishDate = await page.$eval(this.selectors.publishDate, (el) => {
          return el.textContent?.trim() || '';
        });
        if (publishDate) metadata.publishDate = publishDate;
      } catch (error) {
        // Publish date might not be available
      }

      // Extract tags/categories
      try {
        const tags = await page.$$eval(this.selectors.tags, (elements) => {
          return elements.map(el => el.textContent?.trim()).filter(Boolean);
        });
        if (tags.length > 0) metadata.tags = tags.join(', ');
      } catch (error) {
        // Tags might not be available
      }

      // Extract meta tags for additional metadata
      const metaTags = await page.$$eval('meta', (elements) => {
        const meta: Record<string, string> = {};
        elements.forEach(el => {
          const name = el.getAttribute('name') || el.getAttribute('property');
          const content = el.getAttribute('content');
          if (name && content) {
            meta[name] = content;
          }
        });
        return meta;
      });

      // Add relevant meta tags to metadata
      if (metaTags.description) metadata.description = metaTags.description;
      if (metaTags.keywords) metadata.keywords = metaTags.keywords;
      if (metaTags['og:title']) metadata.ogTitle = metaTags['og:title'];
      if (metaTags['og:description']) metadata.ogDescription = metaTags['og:description'];

    } catch (error) {
      console.error('Error extracting metadata from Baidu:', error);
    }

    return metadata;
  }

  async extractCodeBlocks(page: Page): Promise<CodeBlock[]> {
    const codeBlocks: CodeBlock[] = [];
    
    try {
      const blocks = await page.$$eval(this.selectors.codeBlocks, (elements) => {
        return elements.map((el, index) => {
          const code = el.textContent || '';
          const language = el.className.match(/language-(\w+)/)?.[1] || 'text';
          return {
            language,
            code,
            position: index,
            id: `code-${index}`,
            version: 1
          };
        });
      });

      codeBlocks.push(...blocks);
    } catch (error) {
      console.error('Error extracting code blocks from Baidu:', error);
    }

    return codeBlocks;
  }

  async extractImages(page: Page): Promise<ImageAsset[]> {
    const images: ImageAsset[] = [];
    
    try {
      const imageElements = await page.$$eval(this.selectors.images, (elements) => {
        return elements.map((el, index) => {
          const img = el as HTMLImageElement;
          return {
            originalUrl: img.src || '',
            fileName: `baidu_image_${index}.jpg`,
            fileSize: 0, // Will be updated when downloaded
            mimeType: img.src.match(/\.(jpg|jpeg|png|gif|webp)$/i)?.[1] || 'image/jpeg'
          };
        }).filter(img => img.originalUrl && img.originalUrl.startsWith('http'));
      });

      // Convert to ImageAsset format
      images.push(...imageElements.map((img, index) => ({
        ...img,
        localPath: ``, // Will be set when downloaded
        fileName: img.fileName,
        fileSize: img.fileSize,
        mimeType: img.mimeType
      })));

    } catch (error) {
      console.error('Error extracting images from Baidu:', error);
    }

    return images;
  }

  // Helper method to generate content hash
  generateContentHash(content: string): string {
    return crypto.createHash('md5').update(content).digest('hex');
  }

  // Helper method to validate Baidu URL
  static validateBaiduUrl(url: string): boolean {
    return url.includes('baidu.com') || url.includes('baijiahao.baidu.com');
  }
} 