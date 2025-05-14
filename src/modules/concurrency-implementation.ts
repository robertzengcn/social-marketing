//import ConcurrencyImplementation from 'puppeteer-cluster/dist/concurrency/ConcurrencyImplementation';
//import ConcurrencyImplementation from 'puppeteer-cluster/dist/concurrency/ConcurrencyImplementation';
import { WorkerInstance } from 'puppeteer-cluster/dist/concurrency/ConcurrencyImplementation';
// const debug = require('debug')('se-scraper:CustomConcurrency');
import * as puppeteer from 'puppeteer';
// import debug from 'debug';
import { timeoutExecute } from 'puppeteer-cluster/dist/util';
// import {WorkerInstance} from 'puppeteer-cluster/dist/concurrency/ConcurrencyImplementation'
import {Browser} from 'puppeteer-cluster/dist/concurrency/builtInConcurrency';
import { detectBrowserPlatform, install, canDownload, Browser as PuppeteerBrowser, getInstalledBrowsers } from '@puppeteer/browsers';
import * as path from 'path';
//import { app } from 'electron';
import * as os from 'os';
const BROWSER_TIMEOUT = 5000;

// Use Puppeteer's built-in Chrome version
// Use a specific Chrome version that's compatible with Puppeteer
const CHROME_BUILD_ID = '126.0.6478.182';

// Use Puppeteer's built-in Chrome version
//const CHROME_BUILD_ID = 'chrome'; // This will use the version that comes with Puppeteer

// Function to get the correct cache directory path
function getCacheDir(): string {
    const homeDir = os.homedir();
    return path.join(homeDir, '.cache', 'puppeteer');
}

export class CustomConcurrency extends Browser {

    async init() {
        //init
    }
    async close() {
        //close
    }

    async workerInstance(perBrowserOptions: puppeteer.LaunchOptions | undefined):Promise<WorkerInstance> {
        const options = perBrowserOptions || this.options;
        const cacheDir = getCacheDir();
        
        // Try to install Chrome if not found
        try {
            const platform = await detectBrowserPlatform();
            if (platform) {
                const browser = 'chrome' as PuppeteerBrowser;
                
                // Check if Chrome is already installed
                const installedBrowsers = await getInstalledBrowsers({ cacheDir });
                const isChromeInstalled = installedBrowsers.some(
                    installed => installed.browser === browser
                );

                if (!isChromeInstalled) {
                    const canDownloadBrowser = await canDownload({
                        browser,
                        buildId: CHROME_BUILD_ID,
                        platform,
                        cacheDir
                    });
                    
                    if (canDownloadBrowser) {
                        await install({
                            browser,
                            buildId: CHROME_BUILD_ID,
                            platform,
                            cacheDir
                        });
                    }
                }
            }
        } catch (error) {
            console.error('Failed to install Chrome:', error);
        }
        
        // Add configuration for packaged environment
        const launchOptions: puppeteer.PuppeteerLaunchOptions = {
            ...options,
            args: [
                ...((options as any).args || []),
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--window-size=1280,768'
            ]
        };

        let chrome = await this.puppeteer.launch(launchOptions) as puppeteer.Browser;
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
                // if(page){
                //     page.close();
                // }
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

