'use strict';
import { SearchScrape } from "@/modules/searchScraper"
import { ScrapeOptions, SearchData,SearchResult } from "@/entityTypes/scrapeType"
import { CustomError } from "@/modules/customError"
import debug from 'debug';
// import { Page } from 'puppeteer';
// import { promises } from "dns";
const logger = debug('SearchScrape');

type googleAdobjLinks = {
    tracking_link: string;
    link: string;
    title: string;
}
type googleAdobj = {
    visible_link?: string;
    tracking_link?: string;
    link: string;
    title: string;
    snippet: string;
    links?: Array<googleAdobjLinks>,
}

export type googlePlaces = {
    heading: string;
    rating: string;
    contact: string;
    hours: string;
}

export class GoogleScraper extends SearchScrape {
    constructor(options: ScrapeOptions) {
        super(options);
    }
    // async searchData(data: ClusterSearchData): Promise<void> {
    //     // logger("search data in google")
    //     if(data.page){
    //         this.page=data.page
    //     }
    //     await this.load_start_page()
    //     await this.search_keyword(data.keywords)
    // }

    _text = (el, s) => {
        const n = el.querySelector(s);

        if (n) {
            return n.innerText;
        } else {
            return '';
        }
    };
    _attr = (el, s, attr) => {
        const n = el.querySelector(s);

        if (n) {
            return n.getAttribute(attr);
        } else {
            return null;
        }
    };
    async parse_async(): Promise<SearchData> {

        // const results = await this.page.evaluate(() => {





        //     const results: SearchData = {
        //         num_results: '',
        //         no_results: false,
        //         effective_query: '',
        //         right_info: {},
        //         results: [],
        //         top_products: [],
        //         right_products: [],
        //         top_ads: [],
        //         bottom_ads: [],
        //         // places: [],
        //     };

        //     const num_results_el = document.getElementById('resultStats');

        //     if (num_results_el) {
        //         results.num_results = num_results_el.innerText;
        //     }

        //     const organic_results = document.querySelectorAll('#search .MjjYud');

        //     organic_results.forEach((el) => {

        //         const serp_obj = {
        //             link: _attr(el, '.yuRUbf a', 'href'),
        //             title: _text(el, '.yuRUbf a h3'),
        //             snippet: _text(el, '.VwiC3b span'),
        //             visible_link: _text(el, '.yuRUbf cite'),
        //             // date: _text(el, 'span.f'),
        //         };


        //         results.results.push(serp_obj);
        //     });


        //     // check if no results
        //     results.no_results = (results.results.length === 0);

            // const parseAds = (container, selector) => {
            //     document.querySelectorAll(selector).forEach((el) => {
            //         const ad_obj: googleAdobj = {
            //             // visible_link: _text(el, '.ads-visurl cite'),
            //             // tracking_link: _attr(el, 'a:first-child', 'href'),
            //             link: _attr(el, 'a', 'href'),
            //             title: _text(el, 'span:nth-child(2)'),
            //             snippet: _text(el, '.Va3FIb span'),
            //             links: [],
            //         };
            //         // el.querySelectorAll('ul li a').forEach((node) => {
            //         //     ad_obj.links.push({
            //         //         tracking_link: node.getAttribute('data-arwt'),
            //         //         link: node.getAttribute('href'),
            //         //         title: node.innerText,
            //         //     })
            //         // });
            //         container.push(ad_obj);
            //     });
            // };

        //     parseAds(results.top_ads, '#tvcap .uEierd');
        //     parseAds(results.bottom_ads, '#tadsb .uEierd');




        //     return results;
        // });



        // clean some results
        // results.top_products = this.clean_results(results.top_products, ['title', 'link']);
        // results.right_products = this.clean_results(results.right_products, ['title', 'link']);
        // results.results = this.clean_results(results.results, ['title', 'link' , 'snippet']);

        // results.time = (new Date()).toUTCString();
          const result: SearchData = {
                num_results: '',
                no_results: false,
                effective_query: '',
                right_info: {},
                results: [],
                top_products: [],
                right_products: [],
                top_ads: [],
                bottom_ads: [],
                // places: [],
            };
         result.results= await this.page.$$eval('#search .MjjYud', elements =>
            elements.map(el => {
                        const serp_obj:SearchResult  = {
                            link: this._attr(el, '.yuRUbf a', 'href'),
                            title: this._text(el, '.yuRUbf a h3'),
                            snippet: this._text(el, '.VwiC3b span'),
                            visible_link: this._text(el, '.yuRUbf cite'),
                            // date: _text(el, 'span.f'),
                        }
                        return serp_obj 
                    }
        ))

        await this.page.$$eval('#tvcap .uEierd', elements =>elements.map(
            el => {
                const ad_obj: googleAdobj = {
                    // visible_link: _text(el, '.ads-visurl cite'),
                    // tracking_link: _attr(el, 'a:first-child', 'href'),
                    link: this._attr(el, 'a', 'href'),
                    title: this._text(el, 'span:nth-child(2)'),
                    snippet: this._text(el, '.Va3FIb span'),
                    links: [],
                };
                // el.querySelectorAll('ul li a').forEach((node) => {
                //     ad_obj.links.push({
                //         tracking_link: node.getAttribute('data-arwt'),
                //         link: node.getAttribute('href'),
                //         title: node.innerText,
                //     })
                // });
                // result.top_ads.push(ad_obj);
                return ad_obj
            }
        ))
        const num=await this.page.$eval('#resultStats', el => el.textContent);
        if(num){
            result.num_results = num;
        }
        return result;
    }

    async load_start_page(): Promise<boolean | void> {
        const startUrl = 'https://www.google.com/ncr';//ncr means no country redirect

        // if (this.config.google_settings) {
        //     startUrl = `https://www.${this.config.google_settings.google_domain}/search?q=`;
        //     if (this.config.google_settings.google_domain) {
        //         startUrl = `https://www.${this.config.google_settings.google_domain}/search?`;
        //     } else {
        //         startUrl = `https://www.google.com/search?`;
        //     }

        //     for (var key in this.config.google_settings) {
        //         if (key !== 'google_domain') {
        //             startUrl += `${key}=${this.config.google_settings[key]}&`
        //         }
        //     }
        // }

        this.logger.info('Using startUrl: ' + startUrl);

        this.last_response = await this.page.goto(startUrl);

        await this.page.waitForSelector('textarea[name="q"]', { timeout: this.STANDARD_TIMEOUT });

        return true;
    }

    async search_keyword(keyword: string) {
        const input = await this.page.$('textarea[name="q"]');
        if (input) {
            await this.set_input_value(`textarea[name="q"]`, keyword);
            // await this.page.waitForTimeout(50);
            await this.page.evaluate(async () => {
                await new Promise(function (resolve) {
                    setTimeout(resolve, 1000)
                });
            });
            await input.focus();
            await this.page.keyboard.press("Enter");
        } else {
            throw new CustomError("input keyword button not found", 202405301120303)
        }
    }
    //click next page
    async next_page(): Promise<boolean | void> {
        const next_page_link = await this.page.$('#pnnext');
        if (!next_page_link) {
            //return false;
            const targetElement = await this.page.$('.RVQdVd')
            if (targetElement) {
                await targetElement.scrollIntoView();
                targetElement.click();
                return true
            }

        } else {
            await next_page_link.click();
            return true;
        }


        return false;
    }

    async wait_for_results() {
        await this.page.waitForSelector('#fbar', { timeout: this.STANDARD_TIMEOUT });
    }

    async detected() {
        const title = await this.page.title();
        const html = await this.page.content();
        return html.indexOf('detected unusual traffic') !== -1 || title.indexOf('/sorry/') !== -1;
    }

}