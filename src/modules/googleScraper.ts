'use strict';
import {SearchScrape} from "@/modules/searchScraper"
import {ScrapeOptions} from "@/entityTypes/scrapeType"
import {CustomError} from "@/modules/customError"
import debug from 'debug';
const logger = debug('SearchScrape');

type googleAdobjLinks={
    tracking_link: string;
    link: string;
    title: string;
}
type googleAdobj={
    visible_link: string;
    tracking_link: string;
    link: string;
    title: string;
    snippet: string;
    links: Array<googleAdobjLinks>,
}
export type SearchResult={
    link: string;
    title: string;
    snippet: string;
    visible_link: string;
    date: string;
}
export type SearchData={
    num_results: string,
    no_results: boolean,
    effective_query: string,
    right_info: object,
    results: Array<SearchResult>,
    top_products: [],
    right_products: [],
    top_ads: [],
    bottom_ads: [],
    places: Array<googlePlaces>,
}
export type googlePlaces={
    heading: string;
    rating: string;
    contact: string;
    hours: string;
}

export class GoogleScraper extends SearchScrape {
    constructor(options: ScrapeOptions) {
        super(options);
    }
    async searchData(): Promise<void> {
        logger("search data in google")
    }
    async parse_async() {

        const results = await this.page.evaluate(() => {

            const _text = (el, s) => {
                const n = el.querySelector(s);

                if (n) {
                    return n.innerText;
                } else {
                    return '';
                }
            };

            const _attr = (el, s, attr) => {
                const n = el.querySelector(s);

                if (n) {
                    return n.getAttribute(attr);
                } else {
                    return null;
                }
            };

            const results:SearchData = {
                num_results: '',
                no_results: false,
                effective_query: '',
                right_info: {},
                results: [],
                top_products: [],
                right_products: [],
                top_ads: [],
                bottom_ads: [],
                places: [],
            };

            const num_results_el = document.getElementById('resultStats');

            if (num_results_el) {
                results.num_results = num_results_el.innerText;
            }

            const organic_results = document.querySelectorAll('#center_col .g');

            organic_results.forEach((el) => {

                const serp_obj = {
                    link: _attr(el, '.r a', 'href'),
                    title: _text(el, '.r a h3'),
                    snippet: _text(el, 'span.st'),
                    visible_link: _text(el, '.r cite'),
                    date: _text(el, 'span.f'),
                };

                if (serp_obj.date) {
                    serp_obj.date = serp_obj.date.replace(' - ', '');
                }

                results.results.push(serp_obj);
            });

            // check if no results
            results.no_results = (results.results.length === 0);

            const parseAds = (container, selector) => {
                document.querySelectorAll(selector).forEach((el) => {
                    const ad_obj:googleAdobj = {
                        visible_link: _text(el, '.ads-visurl cite'),
                        tracking_link: _attr(el, 'a:first-child', 'href'),
                        link: _attr(el, 'a:nth-child(2)', 'href'),
                        title: _text(el, 'a h3'),
                        snippet: _text(el, '.ads-creative'),
                        links: [],
                    };
                    el.querySelectorAll('ul li a').forEach((node) => {
                        ad_obj.links.push({
                            tracking_link: node.getAttribute('data-arwt'),
                            link: node.getAttribute('href'),
                            title: node.innerText,
                        })
                    });
                    container.push(ad_obj);
                });
            };

            parseAds(results.top_ads, '#tads .ads-ad');
            parseAds(results.bottom_ads, '#tadsb .ads-ad');

            // parse google places
            // document.querySelectorAll('.rllt__link').forEach((el) => {
            //     results.places.push({
            //         heading: _text(el, '[role="heading"] span'),
            //         rating: _text(el, '.rllt__details div:first-child'),
            //         contact: _text(el, '.rllt__details div:nth-child(2)'),
            //         hours: _text(el, '.rllt__details div:nth-child(3)'),
            //     })
            // });

            // parse right side product information
            // results.right_info.review = _attr(document, '#rhs .cu-container g-review-stars span', 'aria-label');

            // let title_el = document.querySelector('#rhs .cu-container g-review-stars');
            // if (title_el) {
            //     results.right_info.review.title = title_el.parentNode.querySelector('div:first-child').innerText;
            // }

            // let num_reviews_el = document.querySelector('#rhs .cu-container g-review-stars');
            // if (num_reviews_el) {
            //     results.right_info.num_reviews = num_reviews_el.parentNode.querySelector('div:nth-of-type(2)').innerText;
            // }

            // results.right_info.vendors = [];
            // results.right_info.info = _text(document, '#rhs_block > div > div > div > div:nth-child(5) > div > div');

            // document.querySelectorAll('#rhs .cu-container .rhsvw > div > div:nth-child(4) > div > div:nth-child(3) > div').forEach((el) => {
            //     results.right_info.vendors.push({
            //         price: _text(el, 'span:nth-of-type(1)'),
            //         merchant_name: _text(el, 'span:nth-child(3) a:nth-child(2)'),
            //         merchant_ad_link: _attr(el, 'span:nth-child(3) a:first-child', 'href'),
            //         merchant_link: _attr(el, 'span:nth-child(3) a:nth-child(2)', 'href'),
            //         source_name: _text(el, 'span:nth-child(4) a'),
            //         source_link: _attr(el, 'span:nth-child(4) a', 'href'),
            //         info: _text(el, 'div span'),
            //         shipping: _text(el, 'span:last-child > span'),
            //     })
            // });

            // if (!results.right_info.title) {
            //     results.right_info = {};
            // }

            // let right_side_info_el = document.getElementById('rhs');

            // if (right_side_info_el) {
            //     let right_side_info_text = right_side_info_el.innerText;

            //     if (right_side_info_text && right_side_info_text.length > 0) {
            //         results.right_side_info_text = right_side_info_text;
            //     }
            // }

            // parse top main column product information
            // #tvcap .pla-unit
            // document.querySelectorAll('#tvcap .pla-unit').forEach((el) => {
            //     let top_product = {
            //         tracking_link: _attr(el, '.pla-unit-title a:first-child', 'href'),
            //         link: _attr(el, '.pla-unit-title a:nth-child(2)', 'href'),
            //         title: _text(el, '.pla-unit-title a:nth-child(2) span'),
            //         price: _text(el, '.pla-unit-title + div'),
            //         shipping: _text(el, '.pla-extensions-container div:nth-of-type(1)'),
            //         vendor_link: _attr(el,'.pla-extensions-container div > a', 'href'),
            //     };

            //     let merchant_node = el.querySelector('.pla-unit-title');
            //     if (merchant_node) {
            //         let node = merchant_node.parentNode.querySelector('div > span');
            //         if (node) {
            //             top_product.merchant_name = node.innerText;
            //         }
            //     }

            //     results.top_products.push(top_product);
            // });

            // parse top right product information
            // #tvcap .pla-unit
            // document.querySelectorAll('#rhs_block .pla-unit').forEach((el) => {
            //     let right_product = {
            //         tracking_link: _attr(el, '.pla-unit-title a:first-child', 'href'),
            //         link: _attr(el, '.pla-unit-title a:nth-child(2)', 'href'),
            //         title: _text(el, '.pla-unit-title a:nth-child(2) span:first-child'),
            //         price: _text(el,'.pla-unit-title + div'),
            //         shipping: _text(el,'.pla-extensions-container > div'),
            //         vendor_link: _text(el,'.pla-extensions-container div > a'),
            //         vendor_name: _text(el,'.pla-extensions-container div > a > div'),
            //     };

            //     let merchant_node = el.querySelector('.pla-unit-title');
            //     if (merchant_node) {
            //         let node = merchant_node.parentNode.querySelector('div > span:first-child');
            //         if (node) {
            //             right_product.merchant_name = node.innerText;
            //         }
            //     }

            //     results.right_products.push(right_product);
            // });

            // let effective_query_el = document.getElementById('fprsl');

            // if (effective_query_el) {

            //     results.effective_query = effective_query_el.innerText;
            //     if (!results.effective_query) {
            //         let effective_query_el2 = document.querySelector('#fprs a');
            //         if (effective_query_el2) {
            //             results.effective_query = document.querySelector('#fprs a').innerText;
            //         }
            //     }
            // }

            return results;
        });

        // clean some results
        // results.top_products = this.clean_results(results.top_products, ['title', 'link']);
        // results.right_products = this.clean_results(results.right_products, ['title', 'link']);
        // results.results = this.clean_results(results.results, ['title', 'link' , 'snippet']);

        // results.time = (new Date()).toUTCString();
        return results;
    }

    async load_start_page() {
        const startUrl = 'https://www.google.com';

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

        await this.page.waitForSelector('input[name="q"]', { timeout: this.STANDARD_TIMEOUT });

        // return true;
    }

    async search_keyword(keyword) {
        const input = await this.page.$('input[name="q"]');
        if(input){
        await this.set_input_value(`input[name="q"]`, keyword);
        // await this.page.waitForTimeout(50);
        await this.page.evaluate(async() => {
            await new Promise(function(resolve) { 
                   setTimeout(resolve, 1000)
            });
        });
        await input.focus();
        await this.page.keyboard.press("Enter");
        }else{
           throw new CustomError("input keyword button not found",202405301120303) 
        } 
    }

    async next_page() {
        const next_page_link = await this.page.$('#pnnext');
        if (!next_page_link) {
            return false;
        }
        await next_page_link.click();

        return true;
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