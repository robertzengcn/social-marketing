import { Page } from 'puppeteer';
export type SMconfig = {
    logger: { info: (data: string) => void, error: (error: Error) => void };
    keywords: Array<string>;
    proxies: Array<string>;
    keyword_file: string;
    proxy_file: string;
    use_proxies_only: boolean;
    custom_func: string;
    chrome_flags: Array<string>;
    puppeteer_cluster_config: {
      maxConcurrency: number;
      monitor: boolean;
      timeout: number;
    }
    random_user_agent: boolean;
    user_agent: string;
    headless: boolean;
    platform: string;
    apply_evasion_techniques?: boolean;
    block_assets?: boolean;
    test_evasion?: boolean;
    log_http_headers?: boolean;
    log_ip_address?: boolean;
  }

  export interface ScrapeOptions {
    // config: {
    //     logger: logType,
    //     search_engine?: string, keywords?: Array<string>, proxy?: string, apply_evasion_techniques?: boolean, block_assets?: boolean, test_evasion?: boolean, log_http_headers?: boolean, log_ip_address?: boolean
    // },
    config:SMconfig,
    context?: object,
    pluggable?: object,
    page?: Page,
    // platform:string
}  