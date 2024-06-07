import { searchEngineImpl } from "@/modules/interface/searchEngineImpl"
import { Page } from 'puppeteer';
import { SMconfig, ScrapeOptions,clusterData } from "@/entityTypes/scrapeType"
import { evadeChromeHeadlessDetection } from "@/modules/lib/function"
import { get_http_headers, get_ip_data } from "@/modules/metadata"
import debug from 'debug';
const logger = debug('SearchScrape');

export class SearchScrape implements searchEngineImpl {
    config: SMconfig;
    page: Page
    last_response: object | null;
    metadata: { http_headers?: object, ipinfo?: { ip: string }, scraping_detected?: boolean };
    pluggable?: object;
    context?: object;
    logger: SMconfig["logger"];
    proxy: string;
    keywords: Array<string>;
    STANDARD_TIMEOUT: number;
    SOLVE_CAPTCHA_TIME: number;
    results: object;
    result_rank: number;
    num_requests: number;
    num_keywords: number;
    constructor(options: ScrapeOptions) {
        if (options.page) {
            this.page = options.page;
        }
        this.last_response = null; // the last response object
        this.metadata = {
            scraping_detected: false,
        };
        this.pluggable = options.pluggable;
        this.config = options.config;
        this.logger = this.config.logger;
        this.context = options.context;
        // if(options.config.proxy){
        // this.proxy = options.config.proxy;
        // }
        if (options.config.keywords) {
            this.keywords = options.config.keywords;
        }
        // if (options.taskid) {
        //     this.taskid = options.taskid;
        // }
        // if(options.taskrunid){
        //     this.taskrunid=options.taskrunid;
        // }
        this.STANDARD_TIMEOUT = 10000;
        this.SOLVE_CAPTCHA_TIME = 45000;

        this.results = {};
        this.result_rank = 1;
        // keep track of the requests done
        this.num_requests = 0;
        // keep track of the keywords searched
        this.num_keywords = 0;

        let settings = this.config[`${this.config.platform}_settings`];
        if (settings) {
            if (typeof settings === 'string') {
                settings = JSON.parse(settings);
                this.config[`${this.config.platform}_settings`] = settings;
            }
        }
    }
    async searchData(data: clusterData): Promise<void> {
        //achieve it in child
    }

    /**
    * Action that runs only once in the beginning of the
    * scraping procedure.
    *
    * @returns {Promise<void>} true if everything is correct.
    */
    async load_browser_engine(): Promise<void> {

        if (this.config.apply_evasion_techniques === true) {
            // prevent detection by evading common detection techniques
            await evadeChromeHeadlessDetection(this.page);
        }

        // block some assets to speed up scraping
        if (this.config.block_assets === true) {
            await this.page.setRequestInterception(true);
            this.page.on('request', (req) => {
                const type = req.resourceType();
                const block = ['stylesheet', 'font', 'image', 'media'];
                if (block.includes(type)) {
                    req.abort();
                } else {
                    req.continue();
                }
            });
        }

        if (this.config.test_evasion === true) {
            // Navigate to the page that will perform the tests.
            const testUrl = 'https://bot.sannysoft.com';
            await this.page.goto(testUrl);
            // Save a screenshot of the results.
            await this.page.screenshot({ path: 'headless-evasion-result.png' });
        }

        if (this.config.log_http_headers === true) {
            this.metadata.http_headers = await get_http_headers(this.page);
            // debug('this.metadata.http_headers=%O', this.metadata.http_headers);
        }

        if (this.config.log_ip_address === true) {
            const ipinfo = await get_ip_data(this.page);
            this.metadata.ipinfo = ipinfo;
            // debug('this.metadata.ipinfo', this.metadata.ipinfo);
        }

        // check that our proxy is working by confirming
        // that ipinfo.io sees the proxy IP address
        if (this.proxy && this.config.log_ip_address === true) {
            debug(`${this.metadata.ipinfo?.ip} vs ${this.proxy}`);

            // if the ip returned by ipinfo is not a substring of our proxystring, get the heck outta here
            if (this.metadata.ipinfo?.ip && (!this.proxy.includes(this.metadata.ipinfo?.ip))) {
                throw new Error(`Proxy output ip ${this.proxy} does not match with provided one`);
            } else {
                this.logger.info(`Using valid Proxy: ${this.proxy}`);
            }

        }

        return await this.load_start_page();
    }

 //achieve it in subclass
    async load_start_page() {
        //achieve it in subclass
    }
    scraping_loop(): void {
        // Implement the scraping loop logic here
    }

    build_start_url(): string {
        // Implement the logic to build the start URL here
        return "https://example.com";
    }

    parse(html: any) {
        // Implement the logic to parse the HTML here
    }

    parse_async(html: any) {
        // Implement the logic to parse the HTML asynchronously here
    }

    search_keyword(keywords:string) {
        // Implement the logic to perform a keyword search here
    }

    async set_input_value(selector:string, value:string) {
        await this.page.waitForSelector(selector);
        await this.page.evaluate((value, selector) => {
            const inputElement = document.querySelector(selector) as HTMLInputElement;
            if (inputElement) {
                inputElement.value = value;
            }
        }, value, selector);
    }
    next_page(){
        //implemet in sub class
    }

    // Add the missing properties here
}