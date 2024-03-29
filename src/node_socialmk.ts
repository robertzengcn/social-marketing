"use strict";
// Use TypeScript modules https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable
export { };
const fs = require("fs");
const os = require("os");
const _ = require("lodash");
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
import { BilibiliScraper } from "@/modules/bilibili_scraper";
import { SocialScraper, WosearchObj } from "@/modules/social_scraper"
import { Page } from 'puppeteer';
import { Linkdata } from '@/modules/remotesource';
import { videodownloadObserver } from '@/modules/videodownload_observer';

// const bing = require('./modules/bing.js');
// const yandex = require('./modules/yandex.js');
// const infospace = require('./modules/infospace.js');
// const duckduckgo = require('./modules/duckduckgo.js');
import { CustomConcurrency as CustomConcurrencyImpl } from "@/concurrency-implementation";
import { ScrapeOptions } from "@/modules/social_scraper";
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
export class ScrapeManager {
  cluster: { execute: Function; idle: Function; close: Function };
  pluggable: { start_browser?: Function, close_browser?: Function, handle_results?: Function, handle_metadata?: Function };
  scraper: SocialScraper;
  context: object;
  config: SMconfig;
  logger: { info: Function };
  browser: { newPage: Function };
  page: Page;
  numClusters: number;
  tmppath: string;
  runLogin: Function;
  taskid?: number;
  taskrunId?: number;
  constructor(config: SMstruct, context = {}) {
    // this.cluster = null;
    // this.pluggable = null;
    // this.scraper = null;
    this.context = context;

    // await this.getRemoteConfig(campaignId)

    this.config = _.defaults(config, {
      // remote_add:endcofig.REMOTEADD,
      // remote_username:endcofig.USERNAME,
      // remote_password:endcofig.PASSWORD,
      // the user agent to scrape with
      user_agent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
      // if random_user_agent is set to True, a random user agent is chosen
      random_user_agent: false,
      // whether to select manual settings in visible mode
      set_manual_settings: false,
      // log ip address data
      log_ip_address: false,
      // log http headers
      log_http_headers: false,
      // how long to sleep between requests. a random sleep interval within the range [a,b]
      // is drawn before every request. empty string for no sleeping.
      sleep_range: null,

      logger: createLogger({
        level: "info",
        format: combine(
          timestamp(),
          printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}] ${message}`;
          })
        ),
        transports: [new transports.Console()],
      }),
      // platform: "facebook",
      // keywords: ["nodejs rocks"],
      // whether to start the browser in headless mode
      // headless: true,
      // specify flags passed to chrome here
      // About our defaults values https://peter.sh/experiments/chromium-command-line-switches/
      chrome_flags: [
        "--disable-infobars",
        "--window-position=0,0",
        "--ignore-certifcate-errors",
        "--ignore-certifcate-errors-spki-list",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--window-size=1280,768",
        "--start-fullscreen",
        "--hide-scrollbars",
        "--disable-notifications",
      ],
      //fix google account can not login
      ignoreDefaultArgs: [
        "--enable-automation",
        "--disable-extensions",
        "--disable-default-apps",
        "--disable-component-extensions-with-background-pages",
      ],
      // the number of pages to scrape for each keyword
      num_pages: 1,
      // path to output file, data will be stored in JSON
      output_file: "",
      // whether to also passthru all the html output of the serp pages
      html_output: false,
      // whether to strip JS and CSS from the html_output
      // has only an effect if `html_output` is true
      clean_html_output: true,
      // remove all data images from the html
      clean_data_images: true,
      // whether to return a screenshot of serp pages as b64 data
      screen_output: false,
      // Scrape url from local file. Mainly used for testing.
      scrape_from_file: "",
      // whether to prevent images, css, fonts and media from being loaded
      // will speed up scraping a great deal
      block_assets: true,
      // path to js module that extends functionality
      // this module should export the functions:
      // get_browser, handle_metadata, close_browser
      //custom_func: resolve('examples/pluggable.js'),
      custom_func: null,
      throw_on_detection: false,
      // List of proxies to use ['socks5://78.94.172.42:1080', 'http://localhost:1080']
      proxies: null,
      // a file with one proxy per line. Example:
      // socks5://78.94.172.42:1080
      // http://118.174.233.10:48400
      proxy_file: "",
      // whether to use proxies only
      // when this is set to true, se-scraper will not use
      // your default IP address
      use_proxies_only: false,
      // check if headless chrome escapes common detection techniques
      // this is a quick test and should be used for debugging
      test_evasion: false,
      apply_evasion_techniques: true,
      // settings for puppeteer-cluster
      puppeteer_cluster_config: {
        timeout: 30 * 60 * 1000, // max timeout set to 30 minutes
        monitor: false,
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 1,
      },
    });

    this.logger = this.config.logger;

    if (config.sleep_range) {
      // parse an array
      // config.sleep_range = eval(config.sleep_range);

      if (
        config.sleep_range.length !== 2
      ) {
        throw "sleep_range is not a valid array of two integers.";
      }
    }

    if (fs.existsSync(this.config.keyword_file)) {
      this.config.keywords = read_keywords_from_file(this.config.keyword_file);
    }

    if (this.config.proxies && this.config.proxy_file) {
      throw new Error(
        "Either use a proxy_file or specify a proxy for all connections. Do not use both options."
      );
    }

    if (this.config.proxy_file) {
      this.config.proxies = read_keywords_from_file(this.config.proxy_file);
      this.logger.info(`${this.config.proxies.length} proxies read from file.`);
    }

    if (!this.config.proxies && this.config.use_proxies_only) {
      throw new Error(
        "Must provide at least one proxy in proxies if you enable use_proxies_only"
      );
    }

    debug("this.config=%O", this.config);
    //defind task id and task run id
    if (config.taskid) {
      this.taskid = config.taskid;
    }
    if (config.taskrunId) {
      this.taskrunId = config.taskrunId;
    }
  }

  /*
   * Launches the puppeteer cluster or browser.
   *
   * Returns true if the browser was successfully launched. Otherwise will return false.
   */
  async start() {
    if (this.config.custom_func) {
      if (fs.existsSync(this.config.custom_func)) {
        try {
          const PluggableClass = require(this.config.custom_func);
          this.pluggable = new PluggableClass({
            config: this.config,
            context: this.context,
          });
        } catch (exception) {
          console.error(exception);
          return false;
        }
      } else {
        console.error(`File "${this.config.custom_func}" does not exist!`);
        return false;
      }
    }

    const chrome_flags = _.clone(this.config.chrome_flags);

    if (this.pluggable && this.pluggable.start_browser) {
      // launch_args.config = this.config;
      this.browser = await this.pluggable.start_browser({
        config: this.config,
      });
      // console.log("229")
      this.page = await this.browser.newPage();
    } else {

      // if no custom start_browser functionality was given
      // use puppeteer-cluster for scraping

      let proxies;
      // if we have at least one proxy, always use CONCURRENCY_BROWSER
      // and set maxConcurrency to this.config.proxies.length + 1
      // else use whatever this.configuration was passed
      if (this.config.proxies && this.config.proxies.length > 0) {
        // because we use real browsers, we ran out of memory on normal laptops
        // when using more than maybe 5 or 6 browsers.
        // therefore hardcode a limit here
        // TODO not sure this what we want
        this.numClusters = Math.min(
          this.config.proxies.length + (this.config.use_proxies_only ? 0 : 1),
          MAX_ALLOWED_BROWSERS
        );
        proxies = _.clone(this.config.proxies);

        // Insert a first config without proxy if use_proxy_only is false
        if (this.config.use_proxies_only === false) {
          proxies.unshift(null);
        }
      } else {
        this.numClusters = this.config.puppeteer_cluster_config.maxConcurrency;
        proxies = _.times(this.numClusters, null);
      }

      this.logger.info(`Using ${this.numClusters} clusters.`);

      // Give the per browser options
      const perBrowserOptions = _.map(proxies, (proxy) => {
        const userAgent = this.config.random_user_agent
          ? new UserAgent({ deviceCategory: "desktop" }).toString()
          : this.config.user_agent;
        let args = chrome_flags.concat([`--user-agent=${userAgent}`]);

        if (proxy) {
          args = args.concat([`--proxy-server=${proxy}`]);
        }

        return {
          headless: this.config.headless,
          ignoreHTTPSErrors: true,
          args,
        };
      });

      debug("perBrowserOptions=%O", perBrowserOptions);

      // puppeteer.use(_StealthPlugin());
      // puppeteer.use(_AdblockerPlugin());

      const puppeteer = addExtra(vanillaPuppeteer);

      // Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
      //  puppeteer.use(Stealth());

      // Add adblocker plugin to block all ads and trackers (saves bandwidth)
      // puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

      this.cluster = await Cluster.launch({
        puppeteer,
        monitor: this.config.puppeteer_cluster_config.monitor,
        timeout: this.config.puppeteer_cluster_config.timeout, // max timeout set to 30 minutes
        concurrency: CustomConcurrencyImpl,
        maxConcurrency: this.numClusters,
        puppeteerOptions: {
          // puppeteer:puppeteer,
          perBrowserOptions: perBrowserOptions,
        },
      });
    }
  }

  /*
   * login the socila media platform
   */
  async login(scrape_config = {}) {
    Object.assign(this.config, scrape_config);

    // var results = {};
    // var num_requests = 0;
    // var metadata = {};
    // var startTime = Date.now();

    if (this.pluggable && this.pluggable.start_browser) {
      // console.log(this.config.platform)
      this.scraper = getScraper(this.config.platform, {
        config: this.config,
        context: this.context,
        pluggable: this.pluggable,
        page: this.page,
        // tmppath: this.tmppath,
      });

      await this.scraper.runLogin({ page: this.page });
    } else {
      // Each browser will get N/(K+1) keywords and will issue N/(K+1) * M total requests to the search engine.
      // https://github.com/GoogleChrome/puppeteer/issues/678
      // The question is: Is it possible to set proxies per Page? Per Browser?
      // as far as I can see, puppeteer cluster uses the same puppeteerOptions
      // for every browser instance. We will use our custom puppeteer-cluster version.
      // https://www.npmjs.com/package/proxy-chain
      // this answer looks nice: https://github.com/GoogleChrome/puppeteer/issues/678#issuecomment-389096077
      const chunks: [][] = [];
      for (let n = 0; n < this.numClusters; n++) {
        chunks.push([]);
      }
      for (let k = 0; k < this.config.keywords.length; k++) {
        chunks[k % this.numClusters].push(this.config.keywords[k] as never);
      }

      debug("chunks=%o", chunks);

      const execPromises = [];
      for (let c = 0; c < chunks.length; c++) {
        const config = _.clone(this.config);
        config.keywords = chunks[c];

        const obj = getScraper(this.config.platform, {
          config: config,
          context: {},
          pluggable: this.pluggable,
        });

        const boundMethod = obj.runLogin.bind(obj);
        execPromises.push(this.cluster.execute({}, boundMethod) as never);
      }

      await Promise.all(execPromises);

      // Merge results and metadata per keyword
      // for (let promiseReturn of promiseReturns) {
      //     Object.assign(results, promiseReturn.results);
      //     Object.assign(metadata, promiseReturn.metadata);
      //     num_requests += promiseReturn.num_requests;
      // }
    }

    // let timeDelta = Date.now() - startTime;
    // let ms_per_request = timeDelta/num_requests;

    // this.logger.info(`Scraper took ${timeDelta}ms to perform ${num_requests} requests.`);
    // this.logger.info(`On average ms/request: ${ms_per_request}ms/request`);

    // if (this.pluggable && this.pluggable.handle_results) {
    //     await this.pluggable.handle_results(results);
    // }

    // metadata.elapsed_time = timeDelta.toString();
    // metadata.ms_per_keyword = ms_per_request.toString();
    // metadata.num_requests = num_requests;

    // debug('metadata=%O', metadata);

    // if (this.pluggable && this.pluggable.handle_metadata) {
    //     await this.pluggable.handle_metadata(metadata);
    // }

    // if (this.config.output_file) {
    //     this.logger.info(`Writing results to ${this.config.output_file}`);
    //     write_results(this.config.output_file, JSON.stringify(results, null, 4));
    // }

    // return {
    //     results: results,
    //     metadata: metadata || {},
    // };
  }

  /*
   * get data url from platform
   */
  async searchdata(scrape_config = {}) {
    Object.assign(this.config, scrape_config);

    if (this.pluggable && this.pluggable.start_browser) {
      // console.log(this.config.platform)
      this.scraper = getScraper(this.config.platform, {
        config: this.config,
        context: this.context,
        pluggable: this.pluggable,
        page: this.page,
        taskid: this.taskid,
        taskrunid: this.taskrunId,
        // taskid?: number,
        // taskrunid?:number,
        // tmppath: this.tmppath,
      });
      const searobj: WosearchObj = { page: this.page };
      await this.scraper.workersearchdata(searobj);
    } else {
      // Each browser will get N/(K+1) keywords and will issue N/(K+1) * M total requests to the search engine.
      // https://github.com/GoogleChrome/puppeteer/issues/678
      // The question is: Is it possible to set proxies per Page? Per Browser?
      // as far as I can see, puppeteer cluster uses the same puppeteerOptions
      // for every browser instance. We will use our custom puppeteer-cluster version.
      // https://www.npmjs.com/package/proxy-chain
      // this answer looks nice: https://github.com/GoogleChrome/puppeteer/issues/678#issuecomment-389096077
      const chunks: [][] = [];
      for (let n = 0; n < this.numClusters; n++) {
        chunks.push([] as never);
      }
      for (let k = 0; k < this.config.keywords.length; k++) {
        chunks[k % this.numClusters].push(this.config.keywords[k] as never);
      }

      debug("chunks=%o", chunks);

      const execPromises = [];
      for (let c = 0; c < chunks.length; c++) {
        const config = _.clone(this.config);
        config.keywords = chunks[c];
        console.log("task run id is" + config.taskrunid)
        const obj = getScraper(this.config.platform, {
          config: config,
          context: {},
          pluggable: this.pluggable,
          taskid: config.taskid,
          taskrunid: config.taskrunid,

        });

        const boundMethod = obj.workersearchdata.bind(obj);
        execPromises.push(this.cluster.execute({}, boundMethod) as never);
      }

      await Promise.all(execPromises);

      // Merge results and metadata per keyword
      // for (let promiseReturn of promiseReturns) {
      //     Object.assign(results, promiseReturn.results);
      //     Object.assign(metadata, promiseReturn.metadata);
      //     num_requests += promiseReturn.num_requests;
      // }
    }

    // let timeDelta = Date.now() - startTime;
    // let ms_per_request = timeDelta/num_requests;

    // this.logger.info(`Scraper took ${timeDelta}ms to perform ${num_requests} requests.`);
    // this.logger.info(`On average ms/request: ${ms_per_request}ms/request`);

    // if (this.pluggable && this.pluggable.handle_results) {
    //     await this.pluggable.handle_results(results);
    // }

    // metadata.elapsed_time = timeDelta.toString();
    // metadata.ms_per_keyword = ms_per_request.toString();
    // metadata.num_requests = num_requests;

    // debug('metadata=%O', metadata);

    // if (this.pluggable && this.pluggable.handle_metadata) {
    //     await this.pluggable.handle_metadata(metadata);
    // }

    // if (this.config.output_file) {
    //     this.logger.info(`Writing results to ${this.config.output_file}`);
    //     write_results(this.config.output_file, JSON.stringify(results, null, 4));
    // }

    // return {
    //     results: results,
    //     metadata: metadata || {},
    // };
  }

  /*
   * Quit the puppeteer cluster/browser.
   */
  async quit() {
    if (this.pluggable && this.pluggable.close_browser) {
      await this.pluggable.close_browser();
    } else {
      await this.cluster.idle();
      await this.cluster.close();
    }
  }
  async downloadPlatomvideo(links: Array<Linkdata>) {
    //check whether user send correct platform parameter 
    const availPlatform = ["bilibili"];
    if (!availPlatform.includes(this.config.platform)) {
      throw new Error("download video function not work at platform " + this.config.platform)
    }
    this.scraper = getScraper(this.config.platform, {
      config: this.config,
      context: this.context,
      pluggable: this.pluggable,
      page: this.page,
      // tmppath: this.tmppath,
    });
    debug("links=%o", links)
    //console.log(this.scraper)

    //add observer before download video
    const videodownObser = new videodownloadObserver();
    this.scraper.attach(videodownObser);
    await this.scraper.downloadvideo(links)


  }
}



module.exports = {
  ScrapeManager: ScrapeManager,
};
