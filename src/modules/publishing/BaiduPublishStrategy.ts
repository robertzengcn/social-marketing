import { BaseArticlePublishStrategy, ArticlePublishOptions, PublishResult, FormattedContent, ContentLimits, RetryPolicy } from './ArticlePublishStrategy';
import { TranslatedContent } from '../translation/ArticleTranslationService';
import { AccountCookiesEntity } from '@/entity/AccountCookies.entity';

export class BaiduPublishStrategy extends BaseArticlePublishStrategy {
  private readonly BAIDU_PUBLISH_URL = 'https://baijiahao.baidu.com/builder/rc/edit';
  private readonly BAIDU_LOGIN_CHECK_SELECTOR = '.user-avatar'; // Selector to check if logged in

  private async checkLoginStatus(): Promise<boolean> {
    try {
      await this.page.waitForSelector(this.BAIDU_LOGIN_CHECK_SELECTOR, { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async publish(article: TranslatedContent, account: AccountCookiesEntity, options: ArticlePublishOptions): Promise<PublishResult> {
    const result: PublishResult = {
      success: false,
      platformId: 'baidu',
      publishedAt: new Date(),
      contentVersion: article.version,
      retryCount: 0,
      articleId: article.articleId
    };

    try {
      await this.initializePage(options);
      
      // Set cookies if provided
      if (options.cookies) {
        await this.setCookies(options.cookies);
      }
      
      // Navigate to Baidu publish page
      await this.page.goto(this.BAIDU_PUBLISH_URL);
      
      // Check login status
      const isLoggedIn = await this.checkLoginStatus();
      if (!isLoggedIn) {
        throw new Error('User is not logged in. Please provide valid cookies.');
      }

      // Format content for Baidu
      const formattedContent = this.formatContent(article, options);
      
      // Fill in article title
      if (formattedContent.title) {
        await this.safeType('.title-editor', formattedContent.title);
      }
      
      // Fill in article content
      if (formattedContent.content) {
        // Switch to content editor (Baidu uses a rich text editor)
        await this.safeClick('.content-editor');
        
        // Clear existing content
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('A');
        await this.page.keyboard.up('Control');
        
        // Type the content
        await this.page.keyboard.type(formattedContent.content);
      }
      
      // Add tags if provided
      if (formattedContent.tags && formattedContent.tags.length > 0) {
        await this.safeClick('.tag-input');
        for (const tag of formattedContent.tags.slice(0, 10)) { // Baidu allows more tags
          await this.page.keyboard.type(tag);
          await this.page.keyboard.press('Enter');
        }
      }
      
      // Select category if provided
      if (formattedContent.category) {
        await this.safeClick('.category-dropdown');
        await this.page.click(`[data-category="${formattedContent.category}"]`);
      }
      
      // Upload images if provided
      if (formattedContent.images && formattedContent.images.length > 0) {
        await this.safeClick('.image-upload-button');
        for (const imagePath of formattedContent.images.slice(0, 10)) { // Baidu allows up to 10 images
          const inputElement = await this.page.$('input[type="file"]');
          if (inputElement) {
            await inputElement.uploadFile(imagePath);
          }
        }
      }
      
      // Click publish button
      await this.safeClick('.publish-button');
      
      // Wait for success message or URL
      try {
        await this.page.waitForSelector('.publish-success', { timeout: 30000 });
        const urlElement = await this.page.$('.article-url');
        if (urlElement) {
          const publishedUrl = await urlElement.evaluate(el => el.textContent);
          if (publishedUrl) {
            result.publishedUrl = publishedUrl;
            result.success = true;
          }
        }
      } catch (error) {
        // Check if there's an error message
        const errorElement = await this.page.$('.error-message');
        if (errorElement) {
          const errorMessage = await errorElement.evaluate(el => el.textContent);
          result.errorMessage = errorMessage || 'Publishing failed';
        } else {
          result.errorMessage = 'Publishing failed - no success or error message found';
        }
      }
      
    } catch (error) {
      result.errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    } finally {
      await this.cleanup();
    }

    return result;
  }

  validateContent(article: TranslatedContent): boolean {
    const limits = this.getContentLimits();
    
    if (!this.validateContentLength(article.title, limits.titleLength)) {
      return false;
    }
    
    if (!this.validateContentLength(article.content, limits.contentLength)) {
      return false;
    }
    
    return true;
  }

  formatContent(article: TranslatedContent, options: ArticlePublishOptions): FormattedContent {
    const limits = this.getContentLimits();
    
    return {
      title: this.truncateContent(article.title, limits.titleLength),
      content: this.truncateContent(article.content, limits.contentLength),
      tags: options.tags?.slice(0, limits.tagCount),
      category: options.category,
      images: options.images?.slice(0, limits.imageCount),
      metadata: {
        ...options.metadata,
        sourceLanguage: article.sourceLanguage.code,
        targetLanguage: article.targetLanguage.code,
        translationTool: article.translationTool
      }
    };
  }

  getPlatformName(): string {
    return 'baidu';
  }

  getContentLimits(): ContentLimits {
    return {
      titleLength: 200, // Baidu title limit
      contentLength: 100000, // Baidu content limit
      imageCount: 10, // Maximum images per article
      tagCount: 10 // Maximum tags per article
    };
  }

  getRequiredFields(): string[] {
    return ['title', 'content'];
  }

  getRetryPolicy(): RetryPolicy {
    return {
      maxRetries: 3,
      retryDelay: 5000, // 5 seconds
      exponentialBackoff: true
    };
  }
} 