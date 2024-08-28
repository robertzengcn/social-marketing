//import ConcurrencyImplementation from 'puppeteer-cluster/dist/concurrency/ConcurrencyImplementation';
//import ConcurrencyImplementation from 'puppeteer-cluster/dist/concurrency/ConcurrencyImplementation';
import { WorkerInstance } from 'puppeteer-cluster/dist/concurrency/ConcurrencyImplementation';
// const debug = require('debug')('se-scraper:CustomConcurrency');
import * as puppeteer from 'puppeteer';
// import debug from 'debug';
import { timeoutExecute } from 'puppeteer-cluster/dist/util';
// import {WorkerInstance} from 'puppeteer-cluster/dist/concurrency/ConcurrencyImplementation'
import {Browser} from 'puppeteer-cluster/dist/concurrency/builtInConcurrency';
const BROWSER_TIMEOUT = 5000;

export class CustomConcurrency extends Browser {

    async init() {
        //init
    }
    async close() {
        //close
    }

    async workerInstance(perBrowserOptions: puppeteer.LaunchOptions | undefined):Promise<WorkerInstance> {
        // const options = this.options.perBrowserOptions.shift();
        // debug('Launch puppeteer instance with options=%o', options);
        const options = perBrowserOptions || this.options;
        let chrome = await this.puppeteer.launch(options) as puppeteer.Browser;
        let page: puppeteer.Page;
        let context;

        return {
            jobInstance: async () => {
                await timeoutExecute(BROWSER_TIMEOUT, (async () => {
                    //context = await chrome.createIncognitoBrowserContext();
                    context = await chrome.createBrowserContext();
                    page = await context.newPage();
                    //page = await context.Page();
                })());

                return {
                    resources: {
                        page,
                    },

                    close: async () => {
                        await timeoutExecute(BROWSER_TIMEOUT, context.close());
                    },
                };
            },

            close: async () => {
                if(page){
                    page.close();
                }
                await chrome.close();
            },

            repair: async () => {
                // debug('Starting repair');
                try {
                    // will probably fail, but just in case the repair was not necessary
                    // await chrome.close();
                    await timeoutExecute(BROWSER_TIMEOUT, chrome.close());
                } catch (e) {
                    // debug('Failed to close chrome: %o', e);
                    // just relaunch as there is only one page per browser
                    chrome = await this.puppeteer.launch(options);
                }

                // just relaunch as there is only one page per browser
                chrome = await this.puppeteer.launch(options);
            },
        };
    }
}
export default CustomConcurrency;

