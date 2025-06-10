//import ConcurrencyImplementation from 'puppeteer-cluster/dist/concurrency/ConcurrencyImplementation';
//import ConcurrencyImplementation from 'puppeteer-cluster/dist/concurrency/ConcurrencyImplementation';
import { WorkerInstance } from 'puppeteer-cluster/dist/concurrency/ConcurrencyImplementation';
// const debug = require('debug')('se-scraper:CustomConcurrency');
import * as puppeteer from 'puppeteer';
// import debug from 'debug';
import { timeoutExecute } from 'puppeteer-cluster/dist/util';
// import {WorkerInstance} from 'puppeteer-cluster/dist/concurrency/ConcurrencyImplementation'
import {Browser} from 'puppeteer-cluster/dist/concurrency/builtInConcurrency';
import { detectBrowserPlatform, install, canDownload, Browser as PuppeteerBrowser, getInstalledBrowsers, resolveBuildId } from '@puppeteer/browsers';
import * as path from 'path';
//import { app } from 'electron';
import * as os from 'os';
//import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
//import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import vanillaPuppeteer from 'puppeteer';
import {addExtra} from 'puppeteer-extra';
import * as fs from 'fs';
//import { execSync } from 'child_process';
//import { executablePath } from 'puppeteer';
const BROWSER_TIMEOUT = 5000;

// Use Puppeteer's built-in Chrome version
// Use a specific Chrome version that's compatible with Puppeteer
let CHROME_BUILD_ID = '136.0.7103.94';

// Function to get the correct cache directory path
function getCacheDir(): string {
    const homeDir = os.homedir();
    return path.join(homeDir, '.cache', 'puppeteer');
}

// Function to get the latest Chrome version
async function getLatestChromeVersion(): Promise<string> {
    //return CHROME_BUILD_ID;
    try {
        const platform = await detectBrowserPlatform();
        if (platform) {
            const browser = 'chrome' as PuppeteerBrowser;
            const latestBuildId = await resolveBuildId(browser, platform, 'latest');
            return latestBuildId;
        }
    } catch (error) {
        console.error('Failed to resolve latest Chrome version:', error);
    }
    return CHROME_BUILD_ID; // Fallback to default version if resolution fails
}

//puppeteerExtra.use(StealthPlugin());

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
        
        // Try to find local Chrome installation
        let executablePath: string | undefined;
        const localBrowserPath = process.env.LOCAL_BROWSER_EXCUTE_PATH;
        console.log("localBrowserPath", localBrowserPath);
        if (localBrowserPath && fs.existsSync(localBrowserPath)) {
            executablePath = localBrowserPath;
            console.log('Using local browser installation:', executablePath);
        } else {
            try {
                const platform = await detectBrowserPlatform();
                if (platform) {
                    const browser = 'chrome' as PuppeteerBrowser;
                    
                    // Get the latest Chrome version
                    //CHROME_BUILD_ID = await getLatestChromeVersion();
                    console.log('Using Chrome version:', CHROME_BUILD_ID);
                    
                    // Check cache directory for installed browsers
                    const installedBrowsers = await getInstalledBrowsers({ cacheDir });
                    const chromeInstallation = installedBrowsers.find(
                        installed => installed.browser === browser
                    );
                    
                    if (chromeInstallation) {
                        executablePath = chromeInstallation.executablePath;
                        console.log('Using cached Chrome installation:', executablePath);
                    } else {
                        console.log('No Chrome installation found, will download browser');
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
                console.error('Failed to detect/install Chrome:', error);
            }
        }
        // Add configuration for packaged environment
        const launchOptions:puppeteer.LaunchOptions = {
            ...options,
            executablePath,
            //product: executablePath?.includes('firefox') ? 'firefox' : 'chrome',
            //userDataDir: process.env.USEDATADIR && process.env.USEDATADIR.trim() !== '' ? process.env.USEDATADIR : undefined,
            args: [
                ...((options as any).args || []),
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                // '--enable-webgl',
                // '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
                //'--use-gl=swiftshader',
                //'--use-gl=angle',
                '--disable-blink-features=AutomationControlled',
                // '--disable-features=IsolateOrigins,site-per-process',
                // '--disable-site-isolation-trials',
                // '--disable-web-security',
                // '--disable-features=BlockInsecurePrivateNetworkRequests',
                // //'--disable-features=IsolateOrigins',
                // '--disable-site-isolation-trials'
            ],
            //...(process.env.USEDATADIR && process.env.USEDATADIR.trim() !== '' ? {} : {
                //ignoreDefaultArgs: ['--password-store=basic','--use-mock-keychain'],
            //}),
            // defaultViewport: {
            //     width: 1280 + Math.floor(Math.random() * 100),
            //     height: 768 + Math.floor(Math.random() * 100),
            //     deviceScaleFactor: 1,
            //     hasTouch: false,
            //     isLandscape: true,
            //     isMobile: false
            // }
        };
        console.log('launchOptions', launchOptions);
        const puppeteers = addExtra(vanillaPuppeteer);
        puppeteers.use(StealthPlugin());
        // puppeteers.use(AdblockerPlugin({
        //     // Block trackers
        //     blockTrackers: true
        // }));
        // Only add reCAPTCHA plugin if token exists and is not empty
        if (process.env.TWOCAPTCHA_TOKEN && process.env.TWOCAPTCHA_TOKEN.trim() !== '') {
            puppeteers.use(
                RecaptchaPlugin({
                    provider: {
                        id: '2captcha',
                        token: process.env.TWOCAPTCHA_TOKEN,
                    },
                    visualFeedback: true,
                    solveInViewportOnly: true,
                    solveScoreBased: true,
                    solveInactiveChallenges: true,
                })
            );
        }
        // Add reCAPTCHA solver
        // puppeteers.use(
        //     RecaptchaPlugin({
        //         provider: {
        //             id: '2captcha',
        //             token: process.env.TWOCAPTCHA_TOKEN || '', // Your 2captcha API token
        //         },
        //         visualFeedback: true, // Show a visual feedback when solving a CAPTCHA
        //         solveInViewportOnly: true, // Only solve CAPTCHAs that are in the viewport
        //         solveScoreBased: true, // Solve score-based CAPTCHAs
        //         solveInactiveChallenges: true, // Solve inactive challenges
        //     })
        // );
        
        let chrome = await puppeteers.launch(launchOptions) as puppeteer.Browser;
        let page: puppeteer.Page;
        let context;

        return {
            jobInstance: async () => {
                await timeoutExecute(BROWSER_TIMEOUT, (async () => {
                    context = await chrome.createBrowserContext();
                    page = await context.newPage();
                    
                    // Additional anti-detection measures
                    await page.evaluateOnNewDocument(() => {
                        // Overwrite the 'navigator.webdriver' property
                        // Object.defineProperty(navigator, 'webdriver', {
                        //     get: () => undefined
                        // });
                        
                        // Overwrite the 'plugins' property
                        // Object.defineProperty(navigator, 'plugins', {
                        //     get: () => {
                        //         const plugins = [
                        //             {
                        //                 name: 'Chrome PDF Plugin',
                        //                 filename: 'internal-pdf-viewer',
                        //                 description: 'Portable Document Format',
                        //                 version: '1.0.0'
                        //             },
                        //             {
                        //                 name: 'Chrome PDF Viewer',
                        //                 filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai',
                        //                 description: 'Portable Document Format',
                        //                 version: '1.0.0'
                        //             },
                        //             {
                        //                 name: 'Native Client',
                        //                 filename: 'internal-nacl-plugin',
                        //                 description: 'Native Client Executable',
                        //                 version: '1.0.0'
                        //             }
                        //         ];

                        //         const pluginArray = {
                        //             length: plugins.length,
                        //             refresh: () => {},
                        //             item: (index: number) => plugins[index],
                        //             namedItem: (name: string) => plugins.find(p => p.name === name),
                        //             [Symbol.iterator]: function* () {
                        //                 for (let i = 0; i < plugins.length; i++) {
                        //                     yield plugins[i];
                        //                 }
                        //             }
                        //         };

                        //         // Add numeric properties
                        //         plugins.forEach((plugin, index) => {
                        //             Object.defineProperty(pluginArray, index, {
                        //                 value: plugin,
                        //                 enumerable: true
                        //             });
                        //         });

                        //         return pluginArray;
                        //     }
                        // });
                        
                        // Overwrite the 'languages' property
                        Object.defineProperty(navigator, 'languages', {
                            get: () => ['en-US', 'en']
                        });

                        // Add permissions API
                        // Object.defineProperty(navigator, 'permissions', {
                        //     get: () => ({
                        //         query: async (permissionDesc: { name: string }) => {
                        //             const permissionStates = {
                        //                 'geolocation': 'prompt',
                        //                 'notifications': 'prompt',
                        //                 'push': 'prompt',
                        //                 'midi': 'prompt',
                        //                 'camera': 'prompt',
                        //                 'microphone': 'prompt',
                        //                 'speaker': 'prompt',
                        //                 'device-info': 'prompt',
                        //                 'background-fetch': 'prompt',
                        //                 'background-sync': 'prompt',
                        //                 'bluetooth': 'prompt',
                        //                 'persistent-storage': 'prompt',
                        //                 'ambient-light-sensor': 'prompt',
                        //                 'accelerometer': 'prompt',
                        //                 'gyroscope': 'prompt',
                        //                 'magnetometer': 'prompt',
                        //                 'clipboard-read': 'prompt',
                        //                 'clipboard-write': 'prompt',
                        //                 'payment-handler': 'prompt'
                        //             };
                                    
                        //             return {
                        //                 state: permissionStates[permissionDesc.name] || 'prompt',
                        //                 onchange: null
                        //             };
                        //         }
                        //     })
                        // });

                        // Set WebGL vendor and renderer
                        // const getParameter = WebGLRenderingContext.prototype.getParameter;
                        // WebGLRenderingContext.prototype.getParameter = function(parameter) {
                        //     // UNMASKED_VENDOR_WEBGL
                        //     if (parameter === 37445) {
                        //         return 'Intel Inc.';
                        //     }
                        //     // UNMASKED_RENDERER_WEBGL
                        //     if (parameter === 37446) {
                        //         return 'Intel Iris OpenGL Engine';
                        //     }
                        //     return getParameter.apply(this, [parameter]);
                        // };
                        
                        // Add Chrome-specific properties
                        (window as any).chrome = {
                            runtime: {},
                            loadTimes: function() {},
                            csi: function() {},
                            app: {}
                        };
                    });
                    
                    // Set a realistic user agent
                    //await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36');
                    
                    // Enable JavaScript
                    await page.setJavaScriptEnabled(true);
                    
                    // Set extra HTTP headers
                    // await page.setExtraHTTPHeaders({
                    //     'Accept-Language': 'en-US,en;q=0.9',
                    //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    //     'Accept-Encoding': 'gzip, deflate, br',
                    //     'Connection': 'keep-alive',
                    //     'Upgrade-Insecure-Requests': '1'
                    // });
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
                    chrome = await puppeteer.launch(options);
                }

                // just relaunch as there is only one page per browser
                chrome = await puppeteer.launch(options);
            },
        };
    }
}
export default CustomConcurrency;

