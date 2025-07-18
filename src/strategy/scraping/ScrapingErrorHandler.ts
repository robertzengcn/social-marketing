import { Page } from 'puppeteer';

export enum ScrapingErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  SELECTOR_NOT_FOUND = 'SELECTOR_NOT_FOUND',
  CONTENT_NOT_LOADED = 'CONTENT_NOT_LOADED',
  RATE_LIMITED = 'RATE_LIMITED',
  BLOCKED_ACCESS = 'BLOCKED_ACCESS',
  INVALID_URL = 'INVALID_URL',
  BROWSER_ERROR = 'BROWSER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface ScrapingError {
  type: ScrapingErrorType;
  message: string;
  url?: string;
  selector?: string;
  retryCount: number;
  timestamp: Date;
  details?: any;
}

export interface ErrorRecoveryStrategy {
  maxRetries: number;
  retryDelay: number;
  exponentialBackoff: boolean;
  fallbackSelectors: string[];
  alternativeMethods: string[];
}

export class ScrapingErrorHandler {
  private readonly defaultRecoveryStrategy: ErrorRecoveryStrategy = {
    maxRetries: 3,
    retryDelay: 2000,
    exponentialBackoff: true,
    fallbackSelectors: [],
    alternativeMethods: []
  };

  private errorLog: ScrapingError[] = [];

  async handleError(error: Error, context: {
    url?: string;
    selector?: string;
    retryCount?: number;
    page?: Page;
  }): Promise<ScrapingError> {
    const scrapingError = this.classifyError(error, context);
    this.errorLog.push(scrapingError);

    console.error(`Scraping error (${scrapingError.type}):`, {
      message: scrapingError.message,
      url: scrapingError.url,
      selector: scrapingError.selector,
      retryCount: scrapingError.retryCount
    });

    return scrapingError;
  }

  private classifyError(error: Error, context: {
    url?: string;
    selector?: string;
    retryCount?: number;
    page?: Page;
  }): ScrapingError {
    const errorMessage = error.message.toLowerCase();
    let errorType = ScrapingErrorType.UNKNOWN_ERROR;

    if (errorMessage.includes('timeout') || errorMessage.includes('timed out')) {
      errorType = ScrapingErrorType.TIMEOUT_ERROR;
    } else if (errorMessage.includes('network') || errorMessage.includes('connection')) {
      errorType = ScrapingErrorType.NETWORK_ERROR;
    } else if (errorMessage.includes('selector') || errorMessage.includes('element not found')) {
      errorType = ScrapingErrorType.SELECTOR_NOT_FOUND;
    } else if (errorMessage.includes('rate limit') || errorMessage.includes('too many requests')) {
      errorType = ScrapingErrorType.RATE_LIMITED;
    } else if (errorMessage.includes('blocked') || errorMessage.includes('access denied')) {
      errorType = ScrapingErrorType.BLOCKED_ACCESS;
    } else if (errorMessage.includes('invalid url') || errorMessage.includes('malformed url')) {
      errorType = ScrapingErrorType.INVALID_URL;
    } else if (errorMessage.includes('browser') || errorMessage.includes('puppeteer')) {
      errorType = ScrapingErrorType.BROWSER_ERROR;
    }

    return {
      type: errorType,
      message: error.message,
      url: context.url,
      selector: context.selector,
      retryCount: context.retryCount || 0,
      timestamp: new Date(),
      details: error.stack
    };
  }

  async shouldRetry(error: ScrapingError, strategy?: Partial<ErrorRecoveryStrategy>): Promise<boolean> {
    const config = { ...this.defaultRecoveryStrategy, ...strategy };
    
    if (error.retryCount >= config.maxRetries) {
      return false;
    }

    // Don't retry certain error types
    const nonRetryableErrors = [
      ScrapingErrorType.INVALID_URL,
      ScrapingErrorType.BLOCKED_ACCESS
    ];

    if (nonRetryableErrors.includes(error.type)) {
      return false;
    }

    return true;
  }

  async getRetryDelay(error: ScrapingError, strategy?: Partial<ErrorRecoveryStrategy>): Promise<number> {
    const config = { ...this.defaultRecoveryStrategy, ...strategy };
    
    if (config.exponentialBackoff) {
      return config.retryDelay * Math.pow(2, error.retryCount);
    }
    
    return config.retryDelay;
  }

  async executeRecoveryStrategy(
    error: ScrapingError, 
    page: Page, 
    strategy?: Partial<ErrorRecoveryStrategy>
  ): Promise<boolean> {
    const config = { ...this.defaultRecoveryStrategy, ...strategy };

    try {
      switch (error.type) {
        case ScrapingErrorType.TIMEOUT_ERROR:
          return await this.handleTimeoutError(page, config);
        
        case ScrapingErrorType.SELECTOR_NOT_FOUND:
          return await this.handleSelectorNotFoundError(page, error, config);
        
        case ScrapingErrorType.NETWORK_ERROR:
          return await this.handleNetworkError(page, config);
        
        case ScrapingErrorType.RATE_LIMITED:
          return await this.handleRateLimitError(page, config);
        
        case ScrapingErrorType.CONTENT_NOT_LOADED:
          return await this.handleContentNotLoadedError(page, config);
        
        default:
          return false;
      }
    } catch (recoveryError) {
      console.error('Error during recovery:', recoveryError);
      return false;
    }
  }

  private async handleTimeoutError(page: Page, config: ErrorRecoveryStrategy): Promise<boolean> {
    try {
      // Wait a bit longer and try to reload
      await page.waitForTimeout(5000);
      await page.reload({ waitUntil: 'networkidle2' });
      return true;
    } catch (error) {
      return false;
    }
  }

  private async handleSelectorNotFoundError(
    page: Page, 
    error: ScrapingError, 
    config: ErrorRecoveryStrategy
  ): Promise<boolean> {
    try {
      // Try fallback selectors
      for (const fallbackSelector of config.fallbackSelectors) {
        try {
          await page.waitForSelector(fallbackSelector, { timeout: 5000 });
          return true;
        } catch (selectorError) {
          continue;
        }
      }

      // Try alternative methods
      for (const method of config.alternativeMethods) {
        if (method === 'waitForContent') {
          await page.waitForFunction(() => {
            return document.body.textContent && document.body.textContent.length > 100;
          }, { timeout: 10000 });
          return true;
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  private async handleNetworkError(page: Page, config: ErrorRecoveryStrategy): Promise<boolean> {
    try {
      // Wait and retry
      await page.waitForTimeout(3000);
      await page.reload({ waitUntil: 'domcontentloaded' });
      return true;
    } catch (error) {
      return false;
    }
  }

  private async handleRateLimitError(page: Page, config: ErrorRecoveryStrategy): Promise<boolean> {
    try {
      // Wait longer for rate limit
      await page.waitForTimeout(10000);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async handleContentNotLoadedError(page: Page, config: ErrorRecoveryStrategy): Promise<boolean> {
    try {
      // Wait for content to load
      await page.waitForFunction(() => {
        return document.body.textContent && document.body.textContent.length > 50;
      }, { timeout: 15000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Utility methods for error analysis
  getErrorStats(): {
    totalErrors: number;
    errorsByType: Record<ScrapingErrorType, number>;
    recentErrors: ScrapingError[];
  } {
    const errorsByType: Record<ScrapingErrorType, number> = {} as any;
    
    // Initialize all error types with 0
    Object.values(ScrapingErrorType).forEach(type => {
      errorsByType[type] = 0;
    });

    // Count errors by type
    this.errorLog.forEach(error => {
      errorsByType[error.type]++;
    });

    // Get recent errors (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentErrors = this.errorLog.filter(error => error.timestamp > oneDayAgo);

    return {
      totalErrors: this.errorLog.length,
      errorsByType,
      recentErrors
    };
  }

  clearErrorLog(): void {
    this.errorLog = [];
  }

  // Method to get specific error patterns
  getErrorPatterns(): {
    mostCommonErrors: Array<{ type: ScrapingErrorType; count: number }>;
    problematicUrls: string[];
    problematicSelectors: string[];
  } {
    const errorCounts: Record<ScrapingErrorType, number> = {} as any;
    const urlErrors: Record<string, number> = {};
    const selectorErrors: Record<string, number> = {};

    this.errorLog.forEach(error => {
      // Count by type
      errorCounts[error.type] = (errorCounts[error.type] || 0) + 1;
      
      // Count by URL
      if (error.url) {
        urlErrors[error.url] = (urlErrors[error.url] || 0) + 1;
      }
      
      // Count by selector
      if (error.selector) {
        selectorErrors[error.selector] = (selectorErrors[error.selector] || 0) + 1;
      }
    });

    const mostCommonErrors = Object.entries(errorCounts)
      .map(([type, count]) => ({ type: type as ScrapingErrorType, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const problematicUrls = Object.entries(urlErrors)
      .filter(([url, count]) => count > 2)
      .map(([url]) => url);

    const problematicSelectors = Object.entries(selectorErrors)
      .filter(([selector, count]) => count > 2)
      .map(([selector]) => selector);

    return {
      mostCommonErrors,
      problematicUrls,
      problematicSelectors
    };
  }
} 