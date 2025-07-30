import { ipcMain } from 'electron';
import { 
  ARTICLE_SCRAPE_API, 
  ARTICLE_SCRAPE_MESSAGE, 
  ARTICLE_LIST, 
  ARTICLE_DETAIL, 
  ARTICLE_DELETE, 
  ARTICLE_BATCH_SCRAPE, 
  ARTICLE_SCRAPE_STATS 
} from '@/config/channellist';
import { CommonDialogMsg } from '@/entityTypes/commonType';
import { CommonResponse, ListData } from '@/entityTypes/commonType';
import { ArticleController, ArticleScrapeRequest, ArticleScrapeResult, ArticleListItem, ArticleDetail, ArticleScrapeStats } from '@/controller/ArticleController';

export function registerArticleIpcHandlers() {
  console.log('Article IPC handlers registered');

  // Handle single article scraping
  ipcMain.on(ARTICLE_SCRAPE_API, async (event, arg) => {
    try {
      const request = JSON.parse(arg) as ArticleScrapeRequest;
      
      // Validate required fields
      if (!request.url || request.url.trim() === '') {
        const errorMsg: CommonDialogMsg = {
          status: false,
          code: 20241201000001,
          data: {
            action: 'error',
            title: 'article.scrape.failed',
            content: 'article.scrape.url_empty'
          }
        };
        event.sender.send(ARTICLE_SCRAPE_MESSAGE, JSON.stringify(errorMsg));
        return;
      }

      const articleController = new ArticleController();
      const result = await articleController.scrapeArticle(request);

      const responseMsg: CommonDialogMsg = {
        status: result.success,
        code: result.success ? 0 : 20241201000002,
        data: {
          action: result.success ? 'article.scrape.success' : 'article.scrape.failed',
          title: result.success ? 'article.scrape.success_title' : 'article.scrape.failed_title',
          content: result.success ? 'article.scrape.success_content' : (result.error || 'article.scrape.failed_content'),
          result: result
        }
      };

      event.sender.send(ARTICLE_SCRAPE_MESSAGE, JSON.stringify(responseMsg));

    } catch (error) {
      console.error('Article scraping IPC error:', error);
      const errorMsg: CommonDialogMsg = {
        status: false,
        code: 20241201000003,
        data: {
          action: 'error',
          title: 'article.scrape.failed',
          content: error instanceof Error ? error.message : 'article.scrape.unknown_error'
        }
      };
      event.sender.send(ARTICLE_SCRAPE_MESSAGE, JSON.stringify(errorMsg));
    }
  });

  // Handle batch article scraping
  ipcMain.on(ARTICLE_BATCH_SCRAPE, async (event, arg) => {
    try {
      const data = JSON.parse(arg) as {
        urls: string[];
        options: ArticleScrapeRequest;
      };

      if (!data.urls || data.urls.length === 0) {
        const errorMsg: CommonDialogMsg = {
          status: false,
          code: 20241201000004,
          data: {
            action: 'error',
            title: 'article.batch.failed',
            content: 'article.batch.urls_empty'
          }
        };
        event.sender.send(ARTICLE_SCRAPE_MESSAGE, JSON.stringify(errorMsg));
        return;
      }

      const articleController = new ArticleController();
      const results = await articleController.scrapeBatch(data.urls, data.options);

      const successCount = results.filter(r => r.success).length;
      const failureCount = results.length - successCount;

      const responseMsg: CommonDialogMsg = {
        status: successCount > 0,
        code: successCount > 0 ? 0 : 20241201000005,
        data: {
          action: 'article.batch.completed',
          title: 'article.batch.completed_title',
          content: `article.batch.completed_content`,
          results: results,
          summary: {
            total: results.length,
            success: successCount,
            failure: failureCount
          }
        }
      };

      event.sender.send(ARTICLE_SCRAPE_MESSAGE, JSON.stringify(responseMsg));

    } catch (error) {
      console.error('Batch article scraping IPC error:', error);
      const errorMsg: CommonDialogMsg = {
        status: false,
        code: 20241201000006,
        data: {
          action: 'error',
          title: 'article.batch.failed',
          content: error instanceof Error ? error.message : 'article.batch.unknown_error'
        }
      };
      event.sender.send(ARTICLE_SCRAPE_MESSAGE, JSON.stringify(errorMsg));
    }
  });

  // Handle article list request
  ipcMain.handle(ARTICLE_LIST, async (event, data) => {
    try {
      const params = JSON.parse(data) as { page?: number; size?: number };
      const page = params.page || 1;
      const size = params.size || 20;

      const articleController = new ArticleController();
      const result = await articleController.getArticleList(page, size);

      const response: CommonResponse<ListData<ArticleListItem>> = {
        status: true,
        msg: 'Article list retrieved successfully',
        data: result
      };

      return response;

    } catch (error) {
      console.error('Article list IPC error:', error);
      const response: CommonResponse<ListData<ArticleListItem>> = {
        status: false,
        msg: error instanceof Error ? error.message : 'Failed to retrieve article list',
        data: { records: [], total: 0 }
      };
      return response;
    }
  });

  // Handle article detail request
  ipcMain.handle(ARTICLE_DETAIL, async (event, data) => {
    try {
      const params = JSON.parse(data) as { id: number };
      
      if (!params.id) {
        const response: CommonResponse<ArticleDetail | null> = {
          status: false,
          msg: 'Article ID is required',
          data: null
        };
        return response;
      }

      const articleController = new ArticleController();
      const result = await articleController.getArticleDetail(params.id);

      const response: CommonResponse<ArticleDetail | null> = {
        status: true,
        msg: result ? 'Article detail retrieved successfully' : 'Article not found',
        data: result
      };

      return response;

    } catch (error) {
      console.error('Article detail IPC error:', error);
      const response: CommonResponse<ArticleDetail | null> = {
        status: false,
        msg: error instanceof Error ? error.message : 'Failed to retrieve article detail',
        data: null
      };
      return response;
    }
  });

  // Handle article deletion
  ipcMain.handle(ARTICLE_DELETE, async (event, data) => {
    try {
      const params = JSON.parse(data) as { id: number };
      
      if (!params.id) {
        const response: CommonResponse<boolean> = {
          status: false,
          msg: 'Article ID is required',
          data: false
        };
        return response;
      }

      const articleController = new ArticleController();
      const result = await articleController.deleteArticle(params.id);

      const response: CommonResponse<boolean> = {
        status: result,
        msg: result ? 'Article deleted successfully' : 'Failed to delete article',
        data: result
      };

      return response;

    } catch (error) {
      console.error('Article deletion IPC error:', error);
      const response: CommonResponse<boolean> = {
        status: false,
        msg: error instanceof Error ? error.message : 'Failed to delete article',
        data: false
      };
      return response;
    }
  });

  // Handle scraping statistics request
  ipcMain.handle(ARTICLE_SCRAPE_STATS, async (event, data) => {
    try {
      const articleController = new ArticleController();
      const result = await articleController.getScrapingStats();

      const response: CommonResponse<ArticleScrapeStats> = {
        status: true,
        msg: 'Scraping statistics retrieved successfully',
        data: result
      };

      return response;

    } catch (error) {
      console.error('Article scraping stats IPC error:', error);
      const response: CommonResponse<ArticleScrapeStats> = {
        status: false,
        msg: error instanceof Error ? error.message : 'Failed to retrieve scraping statistics',
        data: {
          totalScrapes: 0,
          successRate: 0,
          averageResponseTime: 0,
          errorStats: {},
          rateLimitStats: {},
          proxyStats: {}
        }
      };
      return response;
    }
  });
} 