'use strict';
import { SearchScrape } from "@/childprocess/searchScraper"
import { ScrapeOptions, SearchData,SearchResult } from "@/entityTypes/scrapeType"
import { CustomError } from "@/modules/customError"
// import debug from 'debug';
// import { e } from "vitest/dist/reporters-1evA5lom";
//import { R } from "vitest/dist/reporters-1evA5lom";
// import { Page } from 'puppeteer';
// import { promises } from "dns";
// const logger = debug('SearchScrape');

// type googleAdobjLinks = {
//     tracking_link: string;
//     link: string;
//     title: string;
// }
// type googleAdobj = {
//     visible_link?: string;
//     tracking_link?: string;
//     link: string;
//     title: string;
//     snippet: string;
//     links?: Array<googleAdobjLinks>,
// }

export type googlePlaces = {
    heading: string;
    rating: string;
    contact: string;
    hours: string;
}

export class GoogleScraper extends SearchScrape {
    private readonly searchSelectors = [
        'textarea[name="q"]',
        'input[name="q"]',
        'input[type="search"]',
        'input.search-input',
        'input.search',
        'input#search',
        'input.searchbox',
        'input.search-field'
    ];

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
         let searchRes: SearchResult[] = [];
        //  const searchResultsExist = await this.page.$('#search .MjjYud');
        //  if (!searchResultsExist) {
             // Try alternative selectors for search results
             const alternativeSelectors = [
                '#main .Gx5Zad',
                '#main .MjjYud',
                '#search .MjjYud',
                '#search .g',
                 '#search .rc',
                 '#search .srg .g',
                 '#search .srg .rc',
                 '#search .srg .g .rc'
             ];
             
             for (const selector of alternativeSelectors) {
                 const results = await this.page.$(selector);
                 if (results) {
                     // Found results with alternative selector
                     const searchRes = await this.page.$$eval(selector, elements =>
                         elements.map(el => {
                             const selectors = [
                                 { link: 'a', title: 'h3', snippet: '.VwiC3b span, .st', visible: 'cite' },
                                 { link: 'a', title: 'h3', snippet: '.kCrYT span', visible: '.sCuL3' },
                                 { link: 'a', title: '.v7jaNc', snippet: '.VwiC3b span', visible: '.ob9lvb' },
                                 { link: '.yuRUbf a', title: '.yuRUbf a h3', snippet: '.VwiC3b span', visible: '.yuRUbf cite' },
                                 { link: '.g a', title: '.g h3', snippet: '.st', visible: '.g cite' }
                             ];

                             let link = '', title = '', snippet = '', visible_link = '';
                             
                             for (const selector of selectors) {
                                 const linkEl = el.querySelector(selector.link);
                                 const titleEl = el.querySelector(selector.title);
                                 const snippetEl = el.querySelector(selector.snippet);
                                 const visibleEl = el.querySelector(selector.visible);
                                 
                                 if (linkEl && titleEl) {
                                     link = linkEl.getAttribute('href') || '';
                                     title = titleEl.textContent || '';
                                     snippet = snippetEl?.textContent || '';
                                     visible_link = visibleEl?.textContent || '';
                                     break;
                                 }
                             }
                             
                             const serp_obj: SearchResult = {
                                 link: link ? link : '',
                                 title: title ? title : '',
                                 snippet: el.querySelector('.VwiC3b span, .st')?.textContent,
                                 visible_link: el.querySelector('cite')?.textContent
                             };
                             return serp_obj;
                         })
                     );
                     
                     for (const resValue of searchRes) {
                         result.results.push(resValue);
                     }
                     break; // Exit loop once we find results
                 }
             }
        //  }else{
        //  searchRes= await this.page.$$eval('#search .MjjYud', elements =>
        //     elements.map(el => {
        //         const link=el.querySelector('.yuRUbf a')?.getAttribute('href')
                
        //         const title=el.querySelector('.yuRUbf a h3')?.textContent
                
               
        //                 const serp_obj:SearchResult  = {
        //                     // link: await (window as any)._attr(el, '.yuRUbf a', 'href'),
        //                     //link: el.getAttribute('href'),
        //                     link:link?link:'',
        //                     // title: await (window as any)._text(el, '.yuRUbf a h3'),
        //                     title:title,
        //                     //snippet: await (window as any)._text(el, '.VwiC3b span'),
        //                     snippet: el.querySelector('.VwiC3b span')?.textContent,
        //                     //visible_link: await (window as any)._text(el, '.yuRUbf cite'),
        //                     visible_link: el.querySelector('.yuRUbf cite')?.textContent,
        //                     // date: _text(el, 'span.f'),
        //                 }
        //                 return serp_obj 
        //             }
        // ))
        // }
        console.log(searchRes)
        if (!searchRes || searchRes.length === 0) {
            throw new CustomError('No search results found,may be element not found', 202405301120304);
        }
        for( const resValue of searchRes){
           
            result.results.push(resValue);
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
        const startUrl = 'https://www.google.com/ncr';//ncr means no country redirect

        this.logger.info('Using startUrl: ' + startUrl);

        this.last_response = await this.page.goto(startUrl,{
            waitUntil: "networkidle2",
            timeout: 60000
        });
        
        // Wait for user to take action
        // this.logger.info('Waiting for user to take action...');
        
        // // Display a message on the page to inform the user
        // await this.page.evaluate(() => {
        //     const div = document.createElement('div');
        //     div.style.position = 'fixed';
        //     div.style.top = '0';
        //     div.style.left = '0';
        //     div.style.width = '100%';
        //     div.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
        //     div.style.color = 'white';
        //     div.style.padding = '10px';
        //     div.style.zIndex = '9999';
        //     div.style.textAlign = 'center';
        //     div.style.fontSize = '16px';
        //     div.textContent = 'Please take action and press Enter when ready to continue...';
        //     document.body.appendChild(div);
        // });
        
        // // Wait for user to press Enter
        // await this.page.waitForFunction(() => {
        //     return new Promise(resolve => {
        //         const listener = (e) => {
        //             if (e.key === 'Enter') {
        //                 document.removeEventListener('keydown', listener);
        //                 resolve(true);
        //             }
        //         };
        //         document.addEventListener('keydown', listener);
        //     });
        // }, { timeout: 0 }); // No timeout, wait indefinitely
        
        // // Remove the message
        // await this.page.evaluate(() => {
        //     const div = document.querySelector('div[style*="position: fixed"]');
        //     if (div) div.remove();
        // });
        
        // this.logger.info('User action completed, continuing...');

        // Try multiple selectors for the search input
        for (const selector of this.searchSelectors) {
            try {
                const element = await this.page.$(selector);
                if (element) {
                    this.logger.info(`Found search input with selector: ${selector}`);
                    return true;
                }
            } catch (error) {
                continue;
            }
        }

        throw new CustomError("No search input found with any of the common selectors", 202405301120304);
    }

    async search_keyword(keyword: string) {
        for (const selector of this.searchSelectors) {
            try {
                const input = await this.page.$(selector);
                if (input) {
                    await this.set_input_value(selector, keyword);
                    await this.page.evaluate(async () => {
                        await new Promise(function (resolve) {
                            setTimeout(resolve, 1000)
                        });
                    });
                    await input.focus();
                    await this.page.keyboard.press("Enter");
                    return;
                }
            } catch (error) {
                continue;
            }
        }
        throw new CustomError("input keyword button not found", 202405301120303)
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
        const html = await this.page.content();
        if (html.includes("Our systems have detected unusual traffic from your computer network")) {
            this.logger.warn("Google detected unusual traffic");
            //return true;
            throw new CustomError("Google detected unusual traffic", 202405301120304);
        }
        const waitSelectors = [
            '#fbar',
            '#search',
            '#res',
            '#main',
            '.g',
            '#rcnt'
        ];

        for (const selector of waitSelectors) {
            try {
                const element = await this.page.waitForSelector(selector, { timeout: this.STANDARD_TIMEOUT });
                if (element) {
                    return; // If any selector is found, exit the function
                }
            } catch (error) {
                // Continue to the next selector if this one times out
                continue;
            }
        }
        const recaptchaElement = await this.page.$('#recaptcha');
        if (recaptchaElement) {
            throw new CustomError("Google reCAPTCHA detected", 202405301120305);
        }
        throw new CustomError("No search results found - possible detection or page load failure", 202405301120304);
        // If none of the selectors are found, throw an error or log a warning
        //this.logger.warn('None of the expected result selectors were found within the timeout period');
        //await this.page.waitForSelector('#fbar', { timeout: this.STANDARD_TIMEOUT });
    }

    async detected() {
        const title = await this.page.title();
        const html = await this.page.content();
        return html.indexOf('detected unusual traffic') !== -1 || title.indexOf('/sorry/') !== -1;
    }

}