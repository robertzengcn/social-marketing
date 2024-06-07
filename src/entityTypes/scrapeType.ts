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
// export type SMconfig = {
//     logger: { info: Function, error: Function };
//     keywords: Array<string>;
//     proxies: Array<string>;
//     keyword_file: string;
//     proxy_file: string;
//     use_proxies_only: boolean;
//     custom_func: string;
//     chrome_flags: Array<string>;
//     puppeteer_cluster_config: {
//       maxConcurrency: number;
//       monitor: boolean;
//       timeout: number;
//     }
//     random_user_agent: boolean;
//     user_agent: string;
//     headless: boolean;
//     platform: string;
//     apply_evasion_techniques?: boolean;
//     block_assets?: boolean;
//     test_evasion?: boolean;
//     log_http_headers?: boolean;
//     log_ip_address?: boolean;
//   }
export type SMstruct = {
    // the user agent to scrape with
    user_agent?: string,
    // if random_user_agent is set to True, a random user agent is chosen
    random_user_agent?: boolean,
    // whether to start the browser in headless mode
    // headless: false,
    // whether debug information should be printed
    // level 0: print nothing
    // level 1: print most important info
    // ...
    // level 4: print all shit nobody wants to know
    debug_level: number,
    // specify flags passed to chrome here
    chrome_flags?: Array<string>,
    // path to js module that extends functionality
    // this module should export the functions:
    // get_browser, handle_metadata, close_browser
    // must be an absolute path to the module
    //custom_func: resolve('examples/pluggable.js'),
    custom_func?: string,
    // use a proxy for all connections
    // example: 'socks5://78.94.172.42:1080'
    // example: 'http://118.174.233.10:48400'
    proxy?: string,
    // a file with one proxy per line. Example:
    // socks5://78.94.172.42:1080
    // http://118.174.233.10:48400
    proxy_file?: string,
    use_cluster?: boolean,
    puppeteer_cluster_config: {
      timeout: number, // max timeout set to 10 minutes
      monitor: boolean,
      concurrency: number, // one scraper per tab
      maxConcurrency: number, // scrape with 1 tab
    },
    sleep_range?: Array<number>,
    headless:false,
    taskid?: number,
    taskrunId?: number
  }
  export type searchDataParam={
    keywords:Array<string>,
    engine:string,
  }
 export interface clusterData {
    page: Page
}
