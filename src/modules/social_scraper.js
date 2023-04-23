'use strict';

const meta = require('./metadata.js');
const debug = require('debug')('se-scraper:Scraper');
/**
 * this is parent class for social scrapyer node
 *  */ 
module.exports = class SocialScraper {
    constructor(options = {}) {
        debug('constructor');
        const {
            config = {},
            context = {},
            pluggable = null,
            page = null,
            // browsers=null
        } = options;
        // this.browser=browser;
        this.page = page;
        this.last_response = null; // the last response object
        this.metadata = {
            scraping_detected: false,
        };
        this.pluggable = pluggable;
        this.config = config;
        this.logger = this.config.logger;
        this.context = context;

        this.proxy = config.proxy;
        this.keywords = config.keywords;

        this.STANDARD_TIMEOUT = 10000;
        this.SOLVE_CAPTCHA_TIME = 45000;

        this.results = {};
        this.result_rank = 1;
        // keep track of the requests done
        this.num_requests = 0;
        // keep track of the keywords searched
        this.num_keywords = 0;

        let settings = this.config[`${this.config.search_engine}_settings`];
        if (settings) {
            if (typeof settings === 'string') {
                settings = JSON.parse(settings);
                this.config[`${this.config.search_engine}_settings`] = settings;
            }
        }
    }
    //start to login social media platform
    async runLogin({ page, data, worker }) {

        debug('worker=%o', worker, this.config.keywords);

        if (page) {
            this.page = page;
        }

        await this.page.setViewport({ width: 1280, height: 800 });

     
       await this.load_browser_engine();
       
    }

    /**
     * Action that runs only once in the beginning of the
     * scraping procedure.
     *
     * @returns {Promise<void>} true if everything is correct.
     */
    async load_browser_engine() {

        if (this.config.apply_evasion_techniques === true) {
            // prevent detection by evading common detection techniques
            await evadeChromeHeadlessDetection(this.page);
        }

        // block some assets to speed up scraping
        if (this.config.block_assets === true) {
            await this.page.setRequestInterception(true);
            this.page.on('request', (req) => {
                let type = req.resourceType();
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
            this.metadata.http_headers = await meta.get_http_headers(this.page);
            debug('this.metadata.http_headers=%O', this.metadata.http_headers);
        }

        if (this.config.log_ip_address === true) {
            let ipinfo = await meta.get_ip_data(this.page);
            this.metadata.ipinfo = ipinfo;
            debug('this.metadata.ipinfo', this.metadata.ipinfo);
        }

        // check that our proxy is working by confirming
        // that ipinfo.io sees the proxy IP address
        if (this.proxy && this.config.log_ip_address === true) {
            debug(`${this.metadata.ipinfo.ip} vs ${this.proxy}`);

            // if the ip returned by ipinfo is not a substring of our proxystring, get the heck outta here
            if (!this.proxy.includes(this.metadata.ipinfo.ip)) {
                throw new Error(`Proxy output ip ${this.proxy} does not match with provided one`);
            } else {
                this.logger.info(`Using valid Proxy: ${this.proxy}`);
            }

        }

        return await this.load_login_page();
    }
    /**
  *
  * @returns true if startpage was loaded correctly.
  */
    async load_login_page() {

    }
    /**
     * user login by their hand
     */
    async userloginaction() {

    }

}
// This is where we'll put the code to get around the tests.
async function evadeChromeHeadlessDetection(page) {

    // Pass the Webdriver Test.
    await page.evaluateOnNewDocument(() => {
        const newProto = navigator.__proto__;
        delete newProto.webdriver;
        navigator.__proto__ = newProto;
    });

    // Pass the Chrome Test.
    await page.evaluateOnNewDocument(() => {
        // We can mock this in as much depth as we need for the test.
        const mockObj = {
            app: {
                isInstalled: false,
            },
            webstore: {
                onInstallStageChanged: {},
                onDownloadProgress: {},
            },
            runtime: {
                PlatformOs: {
                    MAC: 'mac',
                    WIN: 'win',
                    ANDROID: 'android',
                    CROS: 'cros',
                    LINUX: 'linux',
                    OPENBSD: 'openbsd',
                },
                PlatformArch: {
                    ARM: 'arm',
                    X86_32: 'x86-32',
                    X86_64: 'x86-64',
                },
                PlatformNaclArch: {
                    ARM: 'arm',
                    X86_32: 'x86-32',
                    X86_64: 'x86-64',
                },
                RequestUpdateCheckStatus: {
                    THROTTLED: 'throttled',
                    NO_UPDATE: 'no_update',
                    UPDATE_AVAILABLE: 'update_available',
                },
                OnInstalledReason: {
                    INSTALL: 'install',
                    UPDATE: 'update',
                    CHROME_UPDATE: 'chrome_update',
                    SHARED_MODULE_UPDATE: 'shared_module_update',
                },
                OnRestartRequiredReason: {
                    APP_UPDATE: 'app_update',
                    OS_UPDATE: 'os_update',
                    PERIODIC: 'periodic',
                },
            },
        };

        window.navigator.chrome = mockObj;
        window.chrome = mockObj;
    });

    // Pass the Permissions Test.
    await page.evaluateOnNewDocument(() => {
        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.__proto__.query = parameters =>
            parameters.name === 'notifications'
                ? Promise.resolve({state: Notification.permission})
                : originalQuery(parameters);

        // Inspired by: https://github.com/ikarienator/phantomjs_hide_and_seek/blob/master/5.spoofFunctionBind.js
        const oldCall = Function.prototype.call;

        function call() {
            return oldCall.apply(this, arguments);
        }

        Function.prototype.call = call;

        const nativeToStringFunctionString = Error.toString().replace(/Error/g, "toString");
        const oldToString = Function.prototype.toString;

        function functionToString() {
            if (this === window.navigator.permissions.query) {
                return "function query() { [native code] }";
            }
            if (this === functionToString) {
                return nativeToStringFunctionString;
            }
            return oldCall.call(oldToString, this);
        }

        Function.prototype.toString = functionToString;
    });

    // Pass the Plugins Length Test.
    await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        Object.defineProperty(navigator, 'plugins', {
            // This just needs to have `length > 0` for the current test,
            // but we could mock the plugins too if necessary.
            get: () => [1, 2, 3, 4, 5]
        });
    });

    // Pass the Languages Test.
    await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        Object.defineProperty(navigator, 'languages', {
            get: () => ['en-US', 'en']
        });
    });

    // Pass the iframe Test
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {
            get: function () {
                return window;
            }
        });
    });

    // Pass toString test, though it breaks console.debug() from working
    await page.evaluateOnNewDocument(() => {
        window.console.debug = () => {
            return null;
        };
    });
}