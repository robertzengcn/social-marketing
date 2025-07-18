import { Browser, LaunchOptions } from 'puppeteer';

export interface ProxyConfig {
  host: string;
  port: number;
  username?: string;
  password?: string;
  protocol: 'http' | 'https' | 'socks4' | 'socks5';
  country?: string;
  isActive: boolean;
  lastUsed?: Date;
  successCount: number;
  failureCount: number;
  averageResponseTime: number;
}

export interface ProxyRotationStrategy {
  type: 'round-robin' | 'least-used' | 'best-performance' | 'random';
  maxFailures: number;
  cooldownPeriod: number; // milliseconds
  healthCheckInterval: number; // milliseconds
}

export class ProxyManager {
  private proxies: ProxyConfig[] = [];
  private currentProxyIndex: number = 0;
  private rotationStrategy: ProxyRotationStrategy;
  private healthCheckTimer?: NodeJS.Timeout;

  constructor(strategy?: Partial<ProxyRotationStrategy>) {
    this.rotationStrategy = {
      type: 'round-robin',
      maxFailures: 3,
      cooldownPeriod: 300000, // 5 minutes
      healthCheckInterval: 600000, // 10 minutes
      ...strategy
    };
  }

  addProxy(proxy: ProxyConfig): void {
    this.proxies.push({
      ...proxy,
      successCount: 0,
      failureCount: 0,
      averageResponseTime: 0,
      isActive: true
    });
  }

  addProxies(proxyList: ProxyConfig[]): void {
    proxyList.forEach(proxy => this.addProxy(proxy));
  }

  getNextProxy(): ProxyConfig | null {
    if (this.proxies.length === 0) {
      return null;
    }

    const activeProxies = this.proxies.filter(proxy => proxy.isActive);
    if (activeProxies.length === 0) {
      return null;
    }

    let selectedProxy: ProxyConfig;

    switch (this.rotationStrategy.type) {
      case 'round-robin':
        selectedProxy = activeProxies[this.currentProxyIndex % activeProxies.length];
        this.currentProxyIndex = (this.currentProxyIndex + 1) % activeProxies.length;
        break;

      case 'least-used':
        selectedProxy = activeProxies.reduce((min, proxy) => 
          (proxy.successCount + proxy.failureCount) < (min.successCount + min.failureCount) ? proxy : min
        );
        break;

      case 'best-performance':
        selectedProxy = activeProxies.reduce((best, proxy) => 
          proxy.averageResponseTime < best.averageResponseTime ? proxy : best
        );
        break;

      case 'random':
        const randomIndex = Math.floor(Math.random() * activeProxies.length);
        selectedProxy = activeProxies[randomIndex];
        break;

      default:
        selectedProxy = activeProxies[0];
    }

    selectedProxy.lastUsed = new Date();
    return selectedProxy;
  }

  async createBrowserWithProxy(proxy: ProxyConfig, options?: LaunchOptions): Promise<Browser> {
    const puppeteer = await import('puppeteer');
    
    const launchOptions: LaunchOptions = {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--start-maximized'
      ],
      ...options
    };

    // Add proxy configuration
    const proxyArg = this.formatProxyArg(proxy);
    if (proxyArg) {
      launchOptions.args!.push(proxyArg);
    }

    // Add authentication if provided
    if (proxy.username && proxy.password) {
      launchOptions.args!.push(`--proxy-auth=${proxy.username}:${proxy.password}`);
    }

    return await puppeteer.launch(launchOptions);
  }

  private formatProxyArg(proxy: ProxyConfig): string {
    switch (proxy.protocol) {
      case 'http':
      case 'https':
        return `--proxy-server=${proxy.protocol}://${proxy.host}:${proxy.port}`;
      case 'socks4':
        return `--proxy-server=socks4://${proxy.host}:${proxy.port}`;
      case 'socks5':
        return `--proxy-server=socks5://${proxy.host}:${proxy.port}`;
      default:
        return '';
    }
  }

  recordProxySuccess(proxy: ProxyConfig, responseTime: number): void {
    const proxyIndex = this.proxies.findIndex(p => 
      p.host === proxy.host && p.port === proxy.port
    );

    if (proxyIndex !== -1) {
      const proxyConfig = this.proxies[proxyIndex];
      proxyConfig.successCount++;
      proxyConfig.failureCount = 0; // Reset failure count on success
      
      // Update average response time
      const totalRequests = proxyConfig.successCount + proxyConfig.failureCount;
      proxyConfig.averageResponseTime = 
        (proxyConfig.averageResponseTime * (totalRequests - 1) + responseTime) / totalRequests;
    }
  }

  recordProxyFailure(proxy: ProxyConfig): void {
    const proxyIndex = this.proxies.findIndex(p => 
      p.host === proxy.host && p.port === proxy.port
    );

    if (proxyIndex !== -1) {
      const proxyConfig = this.proxies[proxyIndex];
      proxyConfig.failureCount++;

      // Deactivate proxy if it exceeds max failures
      if (proxyConfig.failureCount >= this.rotationStrategy.maxFailures) {
        proxyConfig.isActive = false;
        console.log(`Proxy ${proxy.host}:${proxy.port} deactivated due to ${proxyConfig.failureCount} failures`);
      }
    }
  }

  async healthCheck(): Promise<void> {
    console.log('Starting proxy health check...');
    
    for (const proxy of this.proxies) {
      if (!proxy.isActive) {
        // Check if cooldown period has passed
        if (proxy.lastUsed) {
          const timeSinceLastUse = Date.now() - proxy.lastUsed.getTime();
          if (timeSinceLastUse > this.rotationStrategy.cooldownPeriod) {
            proxy.isActive = true;
            proxy.failureCount = 0;
            console.log(`Reactivating proxy ${proxy.host}:${proxy.port} after cooldown`);
          }
        }
      }
    }
  }

  startHealthCheck(): void {
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer);
    }

    this.healthCheckTimer = setInterval(() => {
      this.healthCheck();
    }, this.rotationStrategy.healthCheckInterval);
  }

  stopHealthCheck(): void {
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer);
      this.healthCheckTimer = undefined;
    }
  }

  getProxyStats(): {
    totalProxies: number;
    activeProxies: number;
    inactiveProxies: number;
    averageSuccessRate: number;
    bestPerformingProxy?: ProxyConfig;
    worstPerformingProxy?: ProxyConfig;
  } {
    const activeProxies = this.proxies.filter(p => p.isActive);
    const inactiveProxies = this.proxies.filter(p => !p.isActive);

    const totalRequests = this.proxies.reduce((sum, proxy) => 
      sum + proxy.successCount + proxy.failureCount, 0
    );

    const totalSuccesses = this.proxies.reduce((sum, proxy) => 
      sum + proxy.successCount, 0
    );

    const averageSuccessRate = totalRequests > 0 ? totalSuccesses / totalRequests : 0;

    const bestPerformingProxy = activeProxies.length > 0 ? 
      activeProxies.reduce((best, proxy) => 
        proxy.averageResponseTime < best.averageResponseTime ? proxy : best
      ) : undefined;

    const worstPerformingProxy = activeProxies.length > 0 ? 
      activeProxies.reduce((worst, proxy) => 
        proxy.averageResponseTime > worst.averageResponseTime ? proxy : worst
      ) : undefined;

    return {
      totalProxies: this.proxies.length,
      activeProxies: activeProxies.length,
      inactiveProxies: inactiveProxies.length,
      averageSuccessRate,
      bestPerformingProxy,
      worstPerformingProxy
    };
  }

  // Method to load proxies from existing proxy infrastructure
  async loadProxiesFromExistingSystem(): Promise<void> {
    try {
      // This would integrate with the existing proxy system in the project
      // For now, we'll create a placeholder implementation
      console.log('Loading proxies from existing system...');
      
      // Example integration with existing proxy module
      // const existingProxies = await import('@/modules/proxyModule');
      // const proxyList = await existingProxies.getProxyList();
      // this.addProxies(proxyList);
      
    } catch (error) {
      console.error('Error loading proxies from existing system:', error);
    }
  }

  // Method to validate proxy configuration
  async validateProxy(proxy: ProxyConfig): Promise<boolean> {
    try {
      const browser = await this.createBrowserWithProxy(proxy, {
        headless: true,
        timeout: 10000
      });

      const page = await browser.newPage();
      await page.goto('https://httpbin.org/ip', { 
        waitUntil: 'networkidle2',
        timeout: 10000 
      });

      const content = await page.content();
      await browser.close();

      // Check if the response contains IP information (indicating proxy is working)
      return content.includes('origin') || content.includes('ip');
    } catch (error) {
      console.error(`Proxy validation failed for ${proxy.host}:${proxy.port}:`, error);
      return false;
    }
  }

  // Method to get proxy by country
  getProxiesByCountry(country: string): ProxyConfig[] {
    return this.proxies.filter(proxy => 
      proxy.country && proxy.country.toLowerCase() === country.toLowerCase()
    );
  }

  // Method to update proxy configuration
  updateProxy(host: string, port: number, updates: Partial<ProxyConfig>): boolean {
    const proxyIndex = this.proxies.findIndex(p => 
      p.host === host && p.port === port
    );

    if (proxyIndex !== -1) {
      this.proxies[proxyIndex] = { ...this.proxies[proxyIndex], ...updates };
      return true;
    }

    return false;
  }

  // Method to remove proxy
  removeProxy(host: string, port: number): boolean {
    const proxyIndex = this.proxies.findIndex(p => 
      p.host === host && p.port === port
    );

    if (proxyIndex !== -1) {
      this.proxies.splice(proxyIndex, 1);
      return true;
    }

    return false;
  }

  // Method to get all proxies
  getAllProxies(): ProxyConfig[] {
    return [...this.proxies];
  }

  // Method to get active proxies
  getActiveProxies(): ProxyConfig[] {
    return this.proxies.filter(proxy => proxy.isActive);
  }

  // Method to reset all proxy statistics
  resetProxyStats(): void {
    this.proxies.forEach(proxy => {
      proxy.successCount = 0;
      proxy.failureCount = 0;
      proxy.averageResponseTime = 0;
      proxy.isActive = true;
    });
  }
} 