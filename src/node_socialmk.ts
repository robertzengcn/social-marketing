import fs from "fs";
import os from "os";

// const _ = require("lodash");

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
const debug = require("debug")("se-scraper:ScrapeManager");
const { Cluster } = require("puppeteer-cluster");
const vanillaPuppeteer = require("puppeteer");
const { addExtra } = require("puppeteer-extra");
// const Stealth = require("puppeteer-extra-plugin-stealth");
// const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");

const UserAgent = require("user-agents");
import { FacebookScraper } from "@/modules/facebook_scraper";
import { YoutubeScraper } from "@/modules/youtube_scraper";
import { BilibiliScraper } from "@/modules/bilibiliScraper";
import { SocialScraper, WosearchObj } from "@/modules/socialScraper"
import { Page } from 'puppeteer';
import { Linkdata } from '@/modules/remotesource';
import { videodownloadObserver } from '@/modules/videodownload_observer';

// const bing = require('./modules/bing.js');
// const yandex = require('./modules/yandex.js');
// const infospace = require('./modules/infospace.js');
// const duckduckgo = require('./modules/duckduckgo.js');
import { CustomConcurrency as CustomConcurrencyImpl } from "@/concurrency-implementation";
import { ScrapeOptions } from "@/modules/socialScraper";
// const axios = require("axios");
const MAX_ALLOWED_BROWSERS = 6;
// const puppeteer = require("puppeteer-extra");
// const _StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const _AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
// export type getScraperconfig={
//   config:SMconfig,
//   context:object,
//   pluggable:object,
//   page:Page,
//   tmppath:string

// }

function write_results(fname, data) {
  fs.writeFileSync(fname, data, (err) => {
    if (err) throw err;
    console.log(`Results written to file ${fname}`);
  });
}

function read_keywords_from_file(fname) {
  let kws = fs.readFileSync(fname).toString().split(os.EOL);
  // clean keywords
  kws = kws.filter((kw) => {
    return kw.trim().length > 0;
  });
  return kws;
}


function getScraper(search_engine: string, args: ScrapeOptions): SocialScraper {
  if (typeof search_engine === "string") {
    return new {
      facebook: FacebookScraper,
      youtube: YoutubeScraper,
      bilibili: BilibiliScraper,
    }[search_engine](args);
  }
  // else if (typeof search_engine === "function") {
  //   return new search_engine(args);
  // } 
  else {
    throw new Error(
      `social platform must either be a string of class (function)`
    );
  }
}
export type SMconfig = {
  logger: { info: Function, error: Function };
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
export type SMstruct = {
  // the user agent to scrape with
  user_agent: string,
  // if random_user_agent is set to True, a random user agent is chosen
  random_user_agent: boolean,
  // whether to start the browser in headless mode
  // headless: false,
  // whether debug information should be printed
  // level 0: print nothing
  // level 1: print most important info
  // ...
  // level 4: print all shit nobody wants to know
  debug_level: number,
  // specify flags passed to chrome here
  chrome_flags: Array<string>,
  // path to js module that extends functionality
  // this module should export the functions:
  // get_browser, handle_metadata, close_browser
  // must be an absolute path to the module
  //custom_func: resolve('examples/pluggable.js'),
  custom_func: string,
  // use a proxy for all connections
  // example: 'socks5://78.94.172.42:1080'
  // example: 'http://118.174.233.10:48400'
  proxy: string,
  // a file with one proxy per line. Example:
  // socks5://78.94.172.42:1080
  // http://118.174.233.10:48400
  proxy_file: string,
  use_cluster: boolean,
  puppeteer_cluster_config: {
    timeout: number, // max timeout set to 10 minutes
    monitor: boolean,
    concurrency: number, // one scraper per tab
    maxConcurrency: number, // scrape with 1 tab
  },
  sleep_range?: Array<number>,
  taskid?: number,
  taskrunId?: number
}




// module.exports = {
//   ScrapeManager: ScrapeManager,
// };
