'use strict';
import { SearchScrape } from "@/childprocess/searchScraper"
import { ScrapeOptions, SearchData, SearchResult } from "@/entityTypes/scrapeType"
import { CustomError } from "@/modules/customError"
import { TimeoutError,InterceptResolutionAction } from 'puppeteer';
//import { delay } from "@/modules/lib/function";
import useProxy from "@lem0-packages/puppeteer-page-proxy"


// export type googlePlaces = {
//     heading: string;
//     rating: string;
//     contact: string;
//     hours: string;
// }

export class BingScraper extends SearchScrape {
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


    async parse_async(): Promise<SearchData> {

        // const _text = (el, s) => {
        //     const n = el.querySelector(s);

        //     if (n) {
        //         return n.innerText;
        //     } else {
        //         return '';
        //     }
        // };
        // const _attr = (el, s, attr) => {
        //     const n = el.querySelector(s);

        //     if (n) {
        //         return n.getAttribute(attr);
        //     } else {
        //         return null;
        //     }
        // };

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
        const searchRes = await this.page.$$eval('#b_results .b_algo', elements =>
            elements.map(el => {
                const link = el.querySelector('.b_tpcn a')?.getAttribute('href')

                let title = el.querySelector('h2 a')?.textContent
                if (!title) {
                    title = el.querySelector('.b_topTitle')?.textContent
                }
                let visible_link = el.querySelector('.tptt')?.textContent
                if (!visible_link) {
                    visible_link = el.querySelector('.tptxt cite')?.textContent
                }
                // if(link?.indexOf('www.bing.com')==-1){
                //     // const response = await fetch(link, { method: 'GET' });
                //     // if(response.status==200){
                //     //     link=response.url
                //     // }
                //     const browser = await this.page.browser();
                //     const newPage = await browser.newPage();
                //     const response = await newPage.goto(link, { waitUntil: 'domcontentloaded' });
                //     if (response && response.status() === 200) {
                //         link = response.url();
                //     }
                //     await newPage.close();
                // }

                const serp_obj: SearchResult = {
                    // link: await (window as any)._attr(el, '.yuRUbf a', 'href'),
                    //link: el.getAttribute('href'),
                    link: link ? link : '',
                    // title: await (window as any)._text(el, '.yuRUbf a h3'),
                    title: title,
                    //snippet: await (window as any)._text(el, '.VwiC3b span'),
                    snippet: el.querySelector('.b_caption p')?.textContent,
                    //visible_link: await (window as any)._text(el, '.yuRUbf cite'),
                    visible_link: visible_link,

                    // date: _text(el, 'span.f'),
                }
                return serp_obj
            }
            ))
        for (const seval of searchRes) {
            if (seval.link?.includes('www.bing.com')) {
                // const response = await fetch(link, { method: 'GET' });
                // if(response.status==200){
                //     link=response.url
                // }

                const browser = await this.page.browser();
                try {
                    const newPage = await browser.newPage();
                    try {

                        if (this.proxyServer && this.proxyServer.length > 0) {
                            await newPage.setRequestInterception(true);
                            newPage.on("request", async (interceptedRequest) => {
                                if (interceptedRequest.interceptResolutionState().action === InterceptResolutionAction.AlreadyHandled) return;
                                // if (interceptedRequest.resourceType() === "image") {
                                //     interceptedRequest.abort();
                                // } else {
                                await useProxy(interceptedRequest, this.proxyServer!);
                                if (interceptedRequest.interceptResolutionState().action === InterceptResolutionAction.AlreadyHandled) return;
                                interceptedRequest.continue();
                                // }
                            });
                        }

                        const response = await newPage.goto(seval.link, {
                            waitUntil: "networkidle2",
                            timeout: 60000
                        });
                        if (response && response.status() === 200) {
                            seval.link = response.url();
                        }
                        //await newPage.close();
                    } catch (error) {
                        //catch time out error
                        if (error instanceof TimeoutError) {
                            // Do something if this is a timeout.
                            console.log('Navigation timed out:', error);
                        }
                    } finally {
                        if (!newPage.isClosed()) {
                            await newPage.close();
                        }
                    }
                } catch (error) {
                    console.error('Error creating new page:', error);
                }
            }
            result.results.push(seval);
        }

        // const topad=await this.page.$$eval('#tvcap .uEierd', elements =>elements.map(
        //     el => async () =>{
        //         const ad_obj: SearchResult = {
        //             // visible_link: _text(el, '.ads-visurl cite'),
        //             // tracking_link: _attr(el, 'a:first-child', 'href'),
        //             // link: await (window as any)._attr(el, 'a', 'href'),
        //             link: el.querySelector('a')?.getAttribute('href'),
        //             //title: await (window as any)._text(el, 'span:nth-child(2)'),
        //             title: el.querySelector('span:nth-child(2)')?.textContent,
        //             //snippet: await (window as any)._text(el, '.Va3FIb span'),
        //             snippet: el.querySelector('.Va3FIb span')?.textContent,
        //             // links: [],
        //         };

        //         return ad_obj
        //     }
        // ))
        // for( const tValue of topad){
        //     const atValue = await tValue();
        //     result.results.push(atValue)
        // }
        // const bottomAd=await this.page.$$eval('#tadsb .uEierd', elements =>elements.map(
        //     el => async () =>{
        //         const ad_obj: SearchResult = {
        //             // visible_link: _text(el, '.ads-visurl cite'),
        //             // tracking_link: _attr(el, 'a:first-child', 'href'),
        //             //link: await (window as any)._attr(el, 'a', 'href'),
        //             link: el.querySelector('a')?.getAttribute('href'),
        //             title:el.querySelector('span:nth-child(2)')?.textContent,
        //             //snippet: await (window as any)._text(el, '.Va3FIb span'),
        //             snippet: el.querySelector('.Va3FIb span')?.textContent,
        //             // links: [],
        //         };

        //         return ad_obj
        //     }
        // ))
        // for( const tValue of bottomAd){
        //     const atValue= await tValue();
        //     result.results.push(atValue)
        // }
        // const num=await this.page.$eval('#resultStats', el => el.textContent);
        // if(num){
        //     result.num_results = num;
        // }
        return result;
    }

    async load_start_page(): Promise<boolean | void> {
        const startUrl = 'https://www.bing.com';//ncr means no country redirect


        this.logger.info('Using startUrl: ' + startUrl);

        this.last_response = await this.page.goto(startUrl, {
            waitUntil: "networkidle2",
            timeout: 60000
        });

        // await this.page.waitForSelector('textarea[name="q"]', { timeout: this.STANDARD_TIMEOUT });

        return true;
    }

    async search_keyword(keyword: string) {
        //wait for full page loading
        // await delay(5000)
        const textareaSearch = await this.page.$('textarea[name="q"]');
        if (textareaSearch) {

            // await this.set_input_value(`textarea[name="q"]`, keyword);
            await this.page.evaluate((element, value) => {
                element.value = value;
            }, textareaSearch, keyword);
            // await this.page.waitForTimeout(50);
            await this.page.evaluate(async () => {
                await new Promise(function (resolve) {
                    setTimeout(resolve, 1000)
                });
            });
            // await textareaSearch.focus();
            // await this.page.keyboard.press("Enter");
    
            // const labelSelector = '#search_icon';
            // const svgSelector = 'svg';
            // await this.page.evaluate((labelSel, svgSel) => {
            //     const label = document.querySelector(labelSel);
            //     if (label) {
            //       const svg = label.querySelector(svgSel) as HTMLElement;
            //       if (svg) {
            //         // const clickEvent = new MouseEvent('click', {
            //         //     view: window,
            //         //     bubbles: true,
            //         //     cancelable: true
            //         //   });
            //         //   svg.dispatchEvent(clickEvent);
            //         const rect = svg.getBoundingClientRect();
            //         return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            //       }
            //       return null;
            //     }
            //   }, labelSelector, svgSelector).then(async (position) => {
            //     if (position) {
            //         await this.page.mouse.move(position.x, position.y);
            //         await this.page.mouse.click(position.x, position.y);
            //       }
            //   });
            await this.page.evaluate(async () => {
                const form = document.querySelector('form[action="/search"]') as HTMLFormElement;
                if (form) {
                    form.submit();
                }
            });

              //#search_icon
            
            // const clickbtn = await this.page.$('#search_icon');
            // if(!clickbtn){
            //     //click button not found
            //     throw new CustomError("click button not found", 202408291119318)
            // }else{
            //     clickbtn.click();
            // }
            // await this.page.click(`#search_icon`);
        } else {
            const input = await this.page.$('input[name="q"]');
            if (input) {
                // await this.set_input_value(`input[name="q"]`, keyword);
                await this.page.evaluate((element, value) => {
                    element.value = value;
                }, input, keyword);
                // await this.page.waitForTimeout(50);
                await this.page.evaluate(async () => {
                    await new Promise(function (resolve) {
                        setTimeout(resolve, 3000)
                    });
                });

                await input.focus();
                await this.page.keyboard.press("Enter");
            } else {
                throw new CustomError("input keyword button not found", 202408191127280)
            }
        }
    }
    //click next page
    async next_page(): Promise<boolean | void> {
        const next_page_link = await this.page.$('.sb_pagN');
        if (!next_page_link) {
            //return false;
            const targetElement = await this.page.$('[aria-label="Next page"]')
            if (targetElement) {
                await targetElement.scrollIntoView();
                targetElement.click();
                return true
            } else {
                const targetElements = await this.page.$('[title="Next page"]');
                if (targetElements) {
                    await targetElements.scrollIntoView();
                    await targetElements.click();
                    return true;
                }
            }

        } else {
            await next_page_link.click();
            return true;
        }


        return false;
    }

    async wait_for_results() {
        await this.page.waitForSelector('#b_tween', { timeout: this.STANDARD_TIMEOUT });
    }

    async detected() {
        const title = await this.page.title();
        const html = await this.page.content();
        return html.indexOf('detected unusual traffic') !== -1 || title.indexOf('/sorry/') !== -1;
    }

}