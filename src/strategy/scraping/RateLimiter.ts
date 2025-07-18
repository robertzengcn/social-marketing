import { Page } from 'puppeteer';

export interface RateLimitConfig {
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  delayBetweenRequests: number; // milliseconds
  jitter: number; // random delay variation in milliseconds
  burstLimit: number; // maximum requests in burst
  cooldownPeriod: number; // milliseconds to wait after burst
}

export interface DomainRateLimit {
  domain: string;
  config: RateLimitConfig;
  lastRequestTime: number;
  requestCount: {
    minute: number;
    hour: number;
    day: number;
  };
  burstCount: number;
  lastBurstTime: number;
}

export class RateLimiter {
  private domainLimits: Map<string, DomainRateLimit> = new Map();
  private globalLimits: DomainRateLimit;
  private readonly defaultConfig: RateLimitConfig = {
    requestsPerMinute: 10,
    requestsPerHour: 100,
    requestsPerDay: 1000,
    delayBetweenRequests: 2000,
    jitter: 500,
    burstLimit: 3,
    cooldownPeriod: 10000
  };

  constructor(globalConfig?: Partial<RateLimitConfig>) {
    const config = { ...this.defaultConfig, ...globalConfig };
    this.globalLimits = {
      domain: 'global',
      config,
      lastRequestTime: 0,
      requestCount: { minute: 0, hour: 0, day: 0 },
      burstCount: 0,
      lastBurstTime: 0
    };
  }

  async waitForRateLimit(url: string, customConfig?: Partial<RateLimitConfig>): Promise<void> {
    const domain = this.extractDomain(url);
    const domainLimit = this.getOrCreateDomainLimit(domain, customConfig);
    
    // Check and update burst limits
    await this.handleBurstLimit(domainLimit);
    
    // Check and update time-based limits
    await this.handleTimeBasedLimits(domainLimit);
    
    // Apply delay with jitter
    const delay = this.calculateDelay(domainLimit.config);
    await this.delay(delay);
    
    // Update request counts
    this.updateRequestCounts(domainLimit);
  }

  private extractDomain(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch (error) {
      return 'unknown';
    }
  }

  private getOrCreateDomainLimit(domain: string, customConfig?: Partial<RateLimitConfig>): DomainRateLimit {
    if (!this.domainLimits.has(domain)) {
      const config = { ...this.defaultConfig, ...customConfig };
      this.domainLimits.set(domain, {
        domain,
        config,
        lastRequestTime: 0,
        requestCount: { minute: 0, hour: 0, day: 0 },
        burstCount: 0,
        lastBurstTime: 0
      });
    }
    return this.domainLimits.get(domain)!;
  }

  private async handleBurstLimit(domainLimit: DomainRateLimit): Promise<void> {
    const now = Date.now();
    const timeSinceLastBurst = now - domainLimit.lastBurstTime;
    
    // Reset burst count if cooldown period has passed
    if (timeSinceLastBurst > domainLimit.config.cooldownPeriod) {
      domainLimit.burstCount = 0;
    }
    
    // Check if we're at burst limit
    if (domainLimit.burstCount >= domainLimit.config.burstLimit) {
      const waitTime = domainLimit.config.cooldownPeriod - timeSinceLastBurst;
      if (waitTime > 0) {
        console.log(`Rate limit: Waiting ${waitTime}ms for burst cooldown on ${domainLimit.domain}`);
        await this.delay(waitTime);
      }
      domainLimit.burstCount = 0;
    }
    
    domainLimit.burstCount++;
    domainLimit.lastBurstTime = now;
  }

  private async handleTimeBasedLimits(domainLimit: DomainRateLimit): Promise<void> {
    const now = Date.now();
    
    // Reset counters based on time windows
    this.resetCountersIfNeeded(domainLimit, now);
    
    // Check minute limit
    if (domainLimit.requestCount.minute >= domainLimit.config.requestsPerMinute) {
      const waitTime = 60000 - (now - domainLimit.lastRequestTime);
      if (waitTime > 0) {
        console.log(`Rate limit: Waiting ${waitTime}ms for minute limit on ${domainLimit.domain}`);
        await this.delay(waitTime);
      }
    }
    
    // Check hour limit
    if (domainLimit.requestCount.hour >= domainLimit.config.requestsPerHour) {
      const waitTime = 3600000 - (now - domainLimit.lastRequestTime);
      if (waitTime > 0) {
        console.log(`Rate limit: Waiting ${waitTime}ms for hour limit on ${domainLimit.domain}`);
        await this.delay(waitTime);
      }
    }
    
    // Check day limit
    if (domainLimit.requestCount.day >= domainLimit.config.requestsPerDay) {
      const waitTime = 86400000 - (now - domainLimit.lastRequestTime);
      if (waitTime > 0) {
        console.log(`Rate limit: Waiting ${waitTime}ms for day limit on ${domainLimit.domain}`);
        await this.delay(waitTime);
      }
    }
  }

  private resetCountersIfNeeded(domainLimit: DomainRateLimit, now: number): void {
    const timeSinceLastRequest = now - domainLimit.lastRequestTime;
    
    // Reset minute counter if more than 1 minute has passed
    if (timeSinceLastRequest > 60000) {
      domainLimit.requestCount.minute = 0;
    }
    
    // Reset hour counter if more than 1 hour has passed
    if (timeSinceLastRequest > 3600000) {
      domainLimit.requestCount.hour = 0;
    }
    
    // Reset day counter if more than 1 day has passed
    if (timeSinceLastRequest > 86400000) {
      domainLimit.requestCount.day = 0;
    }
  }

  private calculateDelay(config: RateLimitConfig): number {
    const baseDelay = config.delayBetweenRequests;
    const jitter = Math.random() * config.jitter;
    return baseDelay + jitter;
  }

  private updateRequestCounts(domainLimit: DomainRateLimit): void {
    domainLimit.requestCount.minute++;
    domainLimit.requestCount.hour++;
    domainLimit.requestCount.day++;
    domainLimit.lastRequestTime = Date.now();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Method to handle rate limit responses from websites
  async handleRateLimitResponse(page: Page, domain: string): Promise<boolean> {
    try {
      // Check for common rate limit indicators
      const rateLimitIndicators = [
        'rate limit',
        'too many requests',
        'please wait',
        'temporarily blocked',
        'access denied',
        'try again later'
      ];

      const pageContent = await page.content();
      const hasRateLimitIndicator = rateLimitIndicators.some(indicator => 
        pageContent.toLowerCase().includes(indicator)
      );

      if (hasRateLimitIndicator) {
        console.log(`Rate limit detected on ${domain}, waiting for cooldown`);
        const domainLimit = this.domainLimits.get(domain);
        if (domainLimit) {
          // Increase delay for this domain
          const extendedDelay = domainLimit.config.delayBetweenRequests * 3;
          await this.delay(extendedDelay);
          
          // Reset burst count
          domainLimit.burstCount = 0;
          domainLimit.lastBurstTime = Date.now();
        }
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error checking rate limit response:', error);
      return false;
    }
  }

  // Method to get rate limit statistics
  getRateLimitStats(): {
    domainStats: Array<{
      domain: string;
      requestsPerMinute: number;
      requestsPerHour: number;
      requestsPerDay: number;
      lastRequestTime: Date;
    }>;
    globalStats: {
      totalRequests: number;
      averageDelay: number;
    };
  } {
    const domainStats = Array.from(this.domainLimits.values()).map(limit => ({
      domain: limit.domain,
      requestsPerMinute: limit.requestCount.minute,
      requestsPerHour: limit.requestCount.hour,
      requestsPerDay: limit.requestCount.day,
      lastRequestTime: new Date(limit.lastRequestTime)
    }));

    const totalRequests = domainStats.reduce((sum, stat) => 
      sum + stat.requestsPerDay, 0
    );

    return {
      domainStats,
      globalStats: {
        totalRequests,
        averageDelay: this.defaultConfig.delayBetweenRequests
      }
    };
  }

  // Method to reset rate limits for a specific domain
  resetDomainLimits(domain: string): void {
    this.domainLimits.delete(domain);
  }

  // Method to update rate limit configuration for a domain
  updateDomainConfig(domain: string, config: Partial<RateLimitConfig>): void {
    const domainLimit = this.domainLimits.get(domain);
    if (domainLimit) {
      domainLimit.config = { ...domainLimit.config, ...config };
    }
  }

  // Method to get current wait time for a domain
  getCurrentWaitTime(domain: string): number {
    const domainLimit = this.domainLimits.get(domain);
    if (!domainLimit) {
      return 0;
    }

    const now = Date.now();
    const timeSinceLastRequest = now - domainLimit.lastRequestTime;
    
    // Calculate wait time based on various limits
    const minuteWait = domainLimit.requestCount.minute >= domainLimit.config.requestsPerMinute ? 
      60000 - timeSinceLastRequest : 0;
    
    const hourWait = domainLimit.requestCount.hour >= domainLimit.config.requestsPerHour ? 
      3600000 - timeSinceLastRequest : 0;
    
    const dayWait = domainLimit.requestCount.day >= domainLimit.config.requestsPerDay ? 
      86400000 - timeSinceLastRequest : 0;

    return Math.max(minuteWait, hourWait, dayWait, 0);
  }
} 