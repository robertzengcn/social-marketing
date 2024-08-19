import { searchEngineImpl } from "@/modules/interface/searchEngineImpl"
import { Page,Browser } from 'puppeteer';
import { SMconfig, ScrapeOptions,clusterData,RunResult,ParseType,SearchData,ResultParseType } from "@/entityTypes/scrapeType"
import { evadeChromeHeadlessDetection } from "@/modules/lib/function"
import { get_http_headers, get_ip_data } from "@/modules/metadata"
import debug from 'debug';


// const logger = debug('SearchScrape');

export class SearchScrape implements searchEngineImpl {
    config: SMconfig;
    page: Page
    browser: Browser
    last_response: object | null;
    metadata: { http_headers?: object, ipinfo?: { ip: string }, scraping_detected?: boolean|void };
    pluggable?: ScrapeOptions["pluggable"];
    context?: object;
    logger: SMconfig["logger"];
    proxy: string;
    keywords: Array<string>;
    STANDARD_TIMEOUT: number;
    SOLVE_CAPTCHA_TIME: number;
    results; // change it to map:
    // https://stackoverflow.com/questions/40976536/how-to-define-typescript-map-of-key-value-pair-where-key-is-a-number-and-value
    // https://howtodoinjava.com/typescript/maps/ 
    result_rank: number;
    num_requests: number;
    num_keywords: number;
    keyword:string;
    page_num: number;
    constructor(options: ScrapeOptions) {
        if (options.page) {
            this.page = options.page;
        }
        // if(options.browser){
        //     this.browser=options.browser;
        // }
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

        // this.results = new Map();
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
       this.results=new Map<string,ParseType>();
    }

    async run(data:{page:Page, data, worker}):Promise<RunResult> {

        // debug('worker=%o', worker, this.config.keywords);

        

        if (data.page) {
            this.page = data.page;
        }

       // await this.exposeFunction()

        this.keywords=data.data.keywords

        await this.page.setViewport({ width: 1920, height: 1040 });
        let do_continue:boolean|void = true;

        if (!this.config.scrape_from_file||this.config.scrape_from_file.length <= 0) {
            do_continue = await this.load_search_engine();
        }

        if (!do_continue) {
            console.error('Failed to load the search engine: load_search_engine()');
        } else {
            await this.scraping_loop();
        }

        return {
            results: this.results,
            metadata: this.metadata,
            num_requests: this.num_requests,
        }
    }

    async exposeFunction(){
        const _text = async (el, s) => {
            const n = await el.$eval(s);
    
            if (n) {
                return n.innerText;
            } else {
                return '';
            }
        };
        
        const _attr = async (el, s, attr) => {
            const n = await el.$eval(s);
    
            if (n) {
                return n.getAttribute(attr);
            } else {
                return null;
            }
        };

        //set common function

        await this.page.exposeFunction("_text", _text);
        await this.page.exposeFunction("_attr", _attr);
    }

      /**
     * Action that runs only once in the beginning of the
     * scraping procedure.
     *
     * @returns {Promise<boolean>} true if everything is correct.
     */
      async load_search_engine():Promise<boolean|void> {

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
            await this.page.screenshot({path: 'headless-evasion-result.png'});
        }

        if (this.config.log_http_headers === true) {
            this.metadata.http_headers = await get_http_headers(this.page);
            //debug('this.metadata.http_headers=%O', this.metadata.http_headers);
        }

        if (this.config.log_ip_address === true) {
            const ipinfo = await get_ip_data(this.page);
            this.metadata.ipinfo = ipinfo;
            //debug('this.metadata.ipinfo', this.metadata.ipinfo);
        }

        // check that our proxy is working by confirming
        // that ipinfo.io sees the proxy IP address
        if (this.proxy && this.config.log_ip_address === true) {
            //debug(`${this.metadata.ipinfo.ip} vs ${this.proxy}`);

            // if the ip returned by ipinfo is not a substring of our proxystring, get the heck outta here
            if (this.metadata.ipinfo&&(!this.proxy.includes(this.metadata.ipinfo.ip))) {
                throw new Error(`Proxy output ip ${this.proxy} does not match with provided one`);
            } else {
                this.logger.info(`Using valid Proxy: ${this.proxy}`);
            }

        }

        return await this.load_start_page();
    }
    async searchData(data: clusterData): Promise<void> {
        //achieve it in child
    }


    /**
    * Action that runs only once in the beginning of the
    * scraping procedure.
    *
    * @returns {Promise<boolean>} true if everything is correct.
    */
    async load_browser_engine(): Promise<boolean|void> {

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
    async load_start_page(): Promise<boolean|void> {
        //achieve it in subclass
        // return true
    }
    /**
     * Each scraper basically iterates over a list of
     * keywords and a list of pages. This is the generic
     * method for that.
     *
     * @returns {Promise<void>}
     */
    async scraping_loop(): Promise<void> {
        // Implement the scraping loop logic here
        for (const keyword of this.keywords) {
            this.num_keywords++;
            this.keyword = keyword;
            this.results[keyword] = {};
            // this.results.set(keyword, {});
            this.result_rank = 1;

            try {

                // if (this.pluggable && this.pluggable.before_keyword_scraped) {
                //     await this.pluggable.before_keyword_scraped({
                //         results: this.results,
                //         num_keywords: this.num_keywords,
                //         num_requests: this.num_requests,
                //         keyword: keyword,
                //     });
                // }

                this.page_num = 1;

                // load scraped page from file if `scrape_from_file` is given
                if (!this.config.scrape_from_file||this.config.scrape_from_file.length <= 0) {
                    await this.search_keyword(keyword);
                } else {
                    this.last_response = await this.page.goto(this.config.scrape_from_file);
                }

                // when searching the keyword fails, num_requests will not
                // be incremented.
                this.num_requests++;

                do {

                    // this.logger.info(`${this.config.search_engine_name} scrapes keyword "${keyword}" on page ${this.page_num}`);

                    await this.wait_for_results();

                    if (this.config.sleep_range) {
                        await this.random_sleep();
                    }
                    this.results[keyword][this.page_num] = {};
                    const html = await this.page.content();
                    const parsed = this.parse(html);
                    if(parsed){
                        //this.results[keyword][this.page_num].value = parsed 
                        //const setdata:ParseType=new map();

                        // setdata.value=parsed;
                        this.results[keyword][this.page_num].value=parsed
                    }else{
                        // this.results[keyword][this.page_num] = await this.parse_async(html);
                        const pareseres: SearchData|void = await this.parse_async();
                        if(pareseres){
                            this.results[keyword][this.page_num].value = pareseres.results;
                            //this.results[keyword].set(this.page_num,{value:pareseres.results})
                        }else{
                            this.logger.warn(`No results found for keyword "${keyword}" on page ${this.page_num}`);
                           // this.results[keyword][this.page_num].value =""
                            this.results[keyword][this.page_num].value=null
                        }
                    }
                    // this.results[keyword][this.page_num] = parsed ? parsed : await this.parse_async(html);


                    if (this.config.screen_output) {
                        this.results[keyword][this.page_num].screenshot = await this.page.screenshot({
                            encoding: 'base64',
                            fullPage: false,
                        });
                    }

                    if (this.config.html_output) {

                        if (this.config.clean_html_output) {
                            await this.page.evaluate(() => {
                                // remove script and style tags
                                Array.prototype.slice.call(document.getElementsByTagName('script')).forEach(
                                  function(item) {
                                    item.remove();
                                });
                                Array.prototype.slice.call(document.getElementsByTagName('style')).forEach(
                                  function(item) {
                                    item.remove();
                                });

                                // remove all comment nodes
                                // const nodeIterator = document.createNodeIterator(
                                //     document.body,
                                //     NodeFilter.SHOW_COMMENT,    
                                //     { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } }
                                // );
                                // while(nodeIterator.nextNode()){
                                //     const commentNode = nodeIterator.referenceNode;
                                //     commentNode.removeChild()
                                // }
                            });
                        }

                        if (this.config.clean_data_images) {
                            await this.page.evaluate(() => {
                                Array.prototype.slice.call(document.getElementsByTagName('img')).forEach(
                                  function(item) {
                                    const src = item.getAttribute('src');
                                    if (src && src.startsWith('data:')) {
                                        item.setAttribute('src', '');
                                    }
                                });
                            });
                        }

                        let html_contents = await this.page.content();
                        // https://stackoverflow.com/questions/27841112/how-to-remove-white-space-between-html-tags-using-javascript
                        // TODO: not sure if this is save!
                        html_contents = html_contents.replace(/>\s+</g,'><');
                        this.results[keyword][this.page_num].html = html_contents;
                    }

                    this.page_num += 1;

                    // only load the next page when we will pass the next iteration
                    // step from the while loop
                    if (this.page_num <= this.config.num_pages) {

                        const next_page_loaded = await this.next_page();

                        if (!next_page_loaded) {
                            break;
                        } else {
                            this.num_requests++;
                        }
                    }

                } while (this.page_num <= this.config.num_pages);

            } catch (e) {

                this.logger.warn(`Problem with scraping ${keyword} in search engine: ${(e as Error).message}`);
                this.logger.warn((e as Error).stack);
                //debug('this.last_response=%O', this.last_response);

                if (this.config.take_screenshot_on_error) {
                    await this.page.screenshot({ path: `debug_se_scraper_${this.config.search_engine_name}_${keyword}.png` });
                }

                this.metadata.scraping_detected = await this.detected();

                if (this.metadata.scraping_detected === true) {
                    this.logger.warn(`${this.config.search_engine_name} detected the scraping!`);

                    if (this.config.is_local === true) {
                        await this.sleep(this.SOLVE_CAPTCHA_TIME);
                        this.logger.info(`You have ${this.SOLVE_CAPTCHA_TIME}ms to enter the captcha.`);
                        // expect that user filled out necessary captcha
                    } else {
                        if (this.config.throw_on_detection === true) {
                            throw( e );
                        } else {
                            continue;
                        }
                    }
                } else {
                    // some other error, quit scraping process if stuff is broken
                    // if (this.config.throw_on_detection === true) {
                    //     throw( e );
                    // } else {
                    //     return;
                    // }
                    //continue to next keyword
                    continue;
                }
            }
        }
    }
    async wait_for_results() {
        //Implement the logic to wait for the results here
    }
    async random_sleep() {
        let max=0
        let min=0
        if(this.config.sleep_range){
        const sleepRange = this.config.sleep_range; // Default sleep range if undefined
        // const [min, max] = sleepRange;
         min = sleepRange.min;
        max = sleepRange.max;
        }
        const rand = Math.floor(Math.random() * (max - min + 1) + min); //Generate Random number
        // this.logger.info(`Sleeping for ${rand}s`);
        await this.sleep(rand * 1000);
    }
    async sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }
    async detected():Promise<boolean|void> {
        // Implement the logic to detect if the scraping is detected here
    }

    build_start_url(): string {
        // Implement the logic to build the start URL here
        return "https://example.com";
    }

    parse(html: any):string|void {
        // Implement the logic to parse the HTML here
    }

    async parse_async(): Promise<SearchData|void> {

        // Implement the logic to parse the HTML asynchronously here     
    }

    async search_keyword(keywords:string) {
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
    async next_page():Promise<boolean|void>{
        //implemet in sub class
    }

    // Add the missing properties here
}