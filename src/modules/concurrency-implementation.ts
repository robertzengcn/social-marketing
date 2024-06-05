import { Browser } from 'puppeteer-cluster/dist/concurrency/builtInConcurrency';
import * as puppeteer from 'puppeteer';
// const debug = require('debug')('se-scraper:CustomConcurrency');
import debug from 'debug';
import { timeoutExecute } from 'puppeteer-cluster/dist/util';
import {WorkerInstance} from 'puppeteer-cluster/dist/concurrency/ConcurrencyImplementation'

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
                    context = await chrome.createIncognitoBrowserContext();
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
                await chrome.close();
            },

            repair: async () => {
                debug('Starting repair');
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

// module.exports = CustomConcurrency;