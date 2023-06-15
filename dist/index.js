/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var se_scraper = __webpack_require__(/*! ./src/node_socialmk */ "./src/node_socialmk.ts");
var Scraper = __webpack_require__(/*! ./src/modules/social_scraper */ "./src/modules/social_scraper.js");
function login(browser_config, scrape_config) {
    return __awaiter(this, void 0, void 0, function () {
        var scraper, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // scrape config overwrites the browser_config
                    Object.assign(browser_config, scrape_config);
                    scraper = new se_scraper.ScrapeManager(browser_config);
                    // var remoteConfig=await scraper.getRemoteConfig();
                    return [4 /*yield*/, scraper.start()];
                case 1:
                    // var remoteConfig=await scraper.getRemoteConfig();
                    _a.sent();
                    return [4 /*yield*/, scraper.login(scrape_config)];
                case 2:
                    results = _a.sent();
                    return [4 /*yield*/, scraper.quit()];
                case 3:
                    _a.sent();
                    return [2 /*return*/, results];
            }
        });
    });
}
//get data urls
function searchdata(browser_config, scrape_config) {
    return __awaiter(this, void 0, void 0, function () {
        var scraper, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // scrape config overwrites the browser_config
                    Object.assign(browser_config, scrape_config);
                    scraper = new se_scraper.ScrapeManager(browser_config);
                    // var remoteConfig=await scraper.getRemoteConfig();
                    return [4 /*yield*/, scraper.start()];
                case 1:
                    // var remoteConfig=await scraper.getRemoteConfig();
                    _a.sent();
                    return [4 /*yield*/, scraper.searchdata(scrape_config)];
                case 2:
                    results = _a.sent();
                    return [4 /*yield*/, scraper.quit()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    searchdata: searchdata,
    login: login,
    // ytblogin:ytblogin,
    ScrapeManager: se_scraper.ScrapeManager,
    Scraper: Scraper,
};


/***/ }),

/***/ "./src/node_socialmk.ts":
/*!******************************!*\
  !*** ./src/node_socialmk.ts ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var fs = __webpack_require__(/*! fs */ "fs");
var os = __webpack_require__(/*! os */ "os");
var _ = __webpack_require__(/*! lodash */ "lodash");
var _a = __webpack_require__(/*! winston */ "winston"), createLogger = _a.createLogger, format = _a.format, transports = _a.transports;
var combine = format.combine, timestamp = format.timestamp, printf = format.printf;
var debug = __webpack_require__(/*! debug */ "debug")("se-scraper:ScrapeManager");
var Cluster = (__webpack_require__(/*! puppeteer-cluster */ "puppeteer-cluster").Cluster);
var vanillaPuppeteer = __webpack_require__(/*! puppeteer */ "puppeteer");
var addExtra = (__webpack_require__(/*! puppeteer-extra */ "puppeteer-extra").addExtra);
// const Stealth = require("puppeteer-extra-plugin-stealth");
// const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
var UserAgent = __webpack_require__(/*! user-agents */ "user-agents");
var facebook = __webpack_require__(/*! ./modules/facebook_scraper.js */ "./src/modules/facebook_scraper.js");
var youtube = __webpack_require__(/*! ./modules/youtube_scraper.js */ "./src/modules/youtube_scraper.js");
var bilibili = __webpack_require__(/*! ./modules/bilibili_scraper.js */ "./src/modules/bilibili_scraper.js");
// const bing = require('./modules/bing.js');
// const yandex = require('./modules/yandex.js');
// const infospace = require('./modules/infospace.js');
// const duckduckgo = require('./modules/duckduckgo.js');
var CustomConcurrencyImpl = __webpack_require__(/*! ./concurrency-implementation */ "./src/concurrency-implementation.js");
// const axios = require("axios");
var MAX_ALLOWED_BROWSERS = 6;
// const puppeteer = require("puppeteer-extra");
// const _StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const _AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
function write_results(fname, data) {
    fs.writeFileSync(fname, data, function (err) {
        if (err)
            throw err;
        console.log("Results written to file ".concat(fname));
    });
}
function read_keywords_from_file(fname) {
    var kws = fs.readFileSync(fname).toString().split(os.EOL);
    // clean keywords
    kws = kws.filter(function (kw) {
        return kw.trim().length > 0;
    });
    return kws;
}
function getScraper(search_engine, args) {
    if (typeof search_engine === "string") {
        return new {
            facebook: facebook.FacebookScraper,
            youtube: youtube.YoutubeScraper,
            bilibili: bilibili.BilibiliScraper,
        }[search_engine](args);
    }
    // else if (typeof search_engine === "function") {
    //   return new search_engine(args);
    // } 
    else {
        throw new Error("social platform must either be a string of class (function)");
    }
}
var ScrapeManager = /** @class */ (function () {
    function ScrapeManager(config, context) {
        if (context === void 0) { context = {}; }
        this.cluster = null;
        this.pluggable = null;
        this.scraper = null;
        this.context = context;
        // await this.getRemoteConfig(campaignId)
        this.config = _.defaults(config, {
            // remote_add:endcofig.REMOTEADD,
            // remote_username:endcofig.USERNAME,
            // remote_password:endcofig.PASSWORD,
            // the user agent to scrape with
            user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
            // if random_user_agent is set to True, a random user agent is chosen
            random_user_agent: false,
            // whether to select manual settings in visible mode
            set_manual_settings: false,
            // log ip address data
            log_ip_address: false,
            // log http headers
            log_http_headers: false,
            // how long to sleep between requests. a random sleep interval within the range [a,b]
            // is drawn before every request. empty string for no sleeping.
            sleep_range: null,
            logger: createLogger({
                level: "info",
                format: combine(timestamp(), printf(function (_a) {
                    var level = _a.level, message = _a.message, timestamp = _a.timestamp;
                    return "".concat(timestamp, " [").concat(level, "] ").concat(message);
                })),
                transports: [new transports.Console()],
            }),
            platform: "facebook",
            keywords: ["nodejs rocks"],
            // whether to start the browser in headless mode
            headless: true,
            // specify flags passed to chrome here
            // About our defaults values https://peter.sh/experiments/chromium-command-line-switches/
            chrome_flags: [
                "--disable-infobars",
                "--window-position=0,0",
                "--ignore-certifcate-errors",
                "--ignore-certifcate-errors-spki-list",
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-accelerated-2d-canvas",
                "--disable-gpu",
                "--window-size=1280,768",
                "--start-fullscreen",
                "--hide-scrollbars",
                "--disable-notifications",
            ],
            //fix google account can not login
            ignoreDefaultArgs: [
                "--enable-automation",
                "--disable-extensions",
                "--disable-default-apps",
                "--disable-component-extensions-with-background-pages",
            ],
            // the number of pages to scrape for each keyword
            num_pages: 1,
            // path to output file, data will be stored in JSON
            output_file: "",
            // whether to also passthru all the html output of the serp pages
            html_output: false,
            // whether to strip JS and CSS from the html_output
            // has only an effect if `html_output` is true
            clean_html_output: true,
            // remove all data images from the html
            clean_data_images: true,
            // whether to return a screenshot of serp pages as b64 data
            screen_output: false,
            // Scrape url from local file. Mainly used for testing.
            scrape_from_file: "",
            // whether to prevent images, css, fonts and media from being loaded
            // will speed up scraping a great deal
            block_assets: true,
            // path to js module that extends functionality
            // this module should export the functions:
            // get_browser, handle_metadata, close_browser
            //custom_func: resolve('examples/pluggable.js'),
            custom_func: null,
            throw_on_detection: false,
            // List of proxies to use ['socks5://78.94.172.42:1080', 'http://localhost:1080']
            proxies: null,
            // a file with one proxy per line. Example:
            // socks5://78.94.172.42:1080
            // http://118.174.233.10:48400
            proxy_file: "",
            // whether to use proxies only
            // when this is set to true, se-scraper will not use
            // your default IP address
            use_proxies_only: false,
            // check if headless chrome escapes common detection techniques
            // this is a quick test and should be used for debugging
            test_evasion: false,
            apply_evasion_techniques: true,
            // settings for puppeteer-cluster
            puppeteer_cluster_config: {
                timeout: 30 * 60 * 1000,
                monitor: false,
                concurrency: Cluster.CONCURRENCY_BROWSER,
                maxConcurrency: 1,
            },
        });
        this.logger = this.config.logger;
        if (config.sleep_range) {
            // parse an array
            config.sleep_range = eval(config.sleep_range);
            if (config.sleep_range.length !== 2) {
                throw "sleep_range is not a valid array of two integers.";
            }
        }
        if (fs.existsSync(this.config.keyword_file)) {
            this.config.keywords = read_keywords_from_file(this.config.keyword_file);
        }
        if (this.config.proxies && this.config.proxy_file) {
            throw new Error("Either use a proxy_file or specify a proxy for all connections. Do not use both options.");
        }
        if (this.config.proxy_file) {
            this.config.proxies = read_keywords_from_file(this.config.proxy_file);
            this.logger.info("".concat(this.config.proxies.length, " proxies read from file."));
        }
        if (!this.config.proxies && this.config.use_proxies_only) {
            throw new Error("Must provide at least one proxy in proxies if you enable use_proxies_only");
        }
        debug("this.config=%O", this.config);
    }
    /*
     * Launches the puppeteer cluster or browser.
     *
     * Returns true if the browser was successfully launched. Otherwise will return false.
     */
    ScrapeManager.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var PluggableClass, chrome_flags, _a, _b, proxies, perBrowserOptions, puppeteer, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.config.custom_func) {
                            if (fs.existsSync(this.config.custom_func)) {
                                try {
                                    PluggableClass = __webpack_require__("./src sync recursive")(this.config.custom_func);
                                    this.pluggable = new PluggableClass({
                                        config: this.config,
                                        context: this.context,
                                    });
                                }
                                catch (exception) {
                                    console.error(exception);
                                    return [2 /*return*/, false];
                                }
                            }
                            else {
                                console.error("File \"".concat(this.config.custom_func, "\" does not exist!"));
                                return [2 /*return*/, false];
                            }
                        }
                        chrome_flags = _.clone(this.config.chrome_flags);
                        if (!(this.pluggable && this.pluggable.start_browser)) return [3 /*break*/, 3];
                        // launch_args.config = this.config;
                        _a = this;
                        return [4 /*yield*/, this.pluggable.start_browser({
                                config: this.config,
                            })];
                    case 1:
                        // launch_args.config = this.config;
                        _a.browser = _d.sent();
                        // console.log("229")
                        _b = this;
                        return [4 /*yield*/, this.browser.newPage()];
                    case 2:
                        // console.log("229")
                        _b.page = _d.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        proxies = void 0;
                        // if we have at least one proxy, always use CONCURRENCY_BROWSER
                        // and set maxConcurrency to this.config.proxies.length + 1
                        // else use whatever this.configuration was passed
                        if (this.config.proxies && this.config.proxies.length > 0) {
                            // because we use real browsers, we ran out of memory on normal laptops
                            // when using more than maybe 5 or 6 browsers.
                            // therefore hardcode a limit here
                            // TODO not sure this what we want
                            this.numClusters = Math.min(this.config.proxies.length + (this.config.use_proxies_only ? 0 : 1), MAX_ALLOWED_BROWSERS);
                            proxies = _.clone(this.config.proxies);
                            // Insert a first config without proxy if use_proxy_only is false
                            if (this.config.use_proxies_only === false) {
                                proxies.unshift(null);
                            }
                        }
                        else {
                            this.numClusters = this.config.puppeteer_cluster_config.maxConcurrency;
                            proxies = _.times(this.numClusters, null);
                        }
                        this.logger.info("Using ".concat(this.numClusters, " clusters."));
                        perBrowserOptions = _.map(proxies, function (proxy) {
                            var userAgent = _this.config.random_user_agent
                                ? new UserAgent({ deviceCategory: "desktop" }).toString()
                                : _this.config.user_agent;
                            var args = chrome_flags.concat(["--user-agent=".concat(userAgent)]);
                            if (proxy) {
                                args = args.concat(["--proxy-server=".concat(proxy)]);
                            }
                            return {
                                headless: _this.config.headless,
                                ignoreHTTPSErrors: true,
                                args: args,
                            };
                        });
                        debug("perBrowserOptions=%O", perBrowserOptions);
                        puppeteer = addExtra(vanillaPuppeteer);
                        // Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
                        //  puppeteer.use(Stealth());
                        // Add adblocker plugin to block all ads and trackers (saves bandwidth)
                        // puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
                        _c = this;
                        return [4 /*yield*/, Cluster.launch({
                                puppeteer: puppeteer,
                                monitor: this.config.puppeteer_cluster_config.monitor,
                                timeout: this.config.puppeteer_cluster_config.timeout,
                                concurrency: CustomConcurrencyImpl,
                                maxConcurrency: this.numClusters,
                                puppeteerOptions: {
                                    // puppeteer:puppeteer,
                                    perBrowserOptions: perBrowserOptions,
                                },
                            })];
                    case 4:
                        // Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
                        //  puppeteer.use(Stealth());
                        // Add adblocker plugin to block all ads and trackers (saves bandwidth)
                        // puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
                        _c.cluster = _d.sent();
                        _d.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /*
     * login the socila media platform
     */
    ScrapeManager.prototype.login = function (scrape_config) {
        if (scrape_config === void 0) { scrape_config = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var chunks, n, k, execPromises, c, config, obj, boundMethod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Object.assign(this.config, scrape_config);
                        if (!(this.pluggable && this.pluggable.start_browser)) return [3 /*break*/, 2];
                        // console.log(this.config.platform)
                        this.scraper = getScraper(this.config.platform, {
                            config: this.config,
                            context: this.context,
                            pluggable: this.pluggable,
                            page: this.page,
                            tmppath: this.tmppath,
                        });
                        return [4 /*yield*/, this.scraper.runLogin(this.page)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        chunks = [];
                        for (n = 0; n < this.numClusters; n++) {
                            chunks.push([]);
                        }
                        for (k = 0; k < this.config.keywords.length; k++) {
                            chunks[k % this.numClusters].push(this.config.keywords[k]);
                        }
                        debug("chunks=%o", chunks);
                        execPromises = [];
                        for (c = 0; c < chunks.length; c++) {
                            config = _.clone(this.config);
                            config.keywords = chunks[c];
                            obj = getScraper(this.config.platform, {
                                config: config,
                                context: {},
                                pluggable: this.pluggable,
                            });
                            boundMethod = obj.runLogin.bind(obj);
                            execPromises.push(this.cluster.execute({}, boundMethod));
                        }
                        return [4 /*yield*/, Promise.all(execPromises)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /*
     * get data url from platform
     */
    ScrapeManager.prototype.searchdata = function (scrape_config) {
        if (scrape_config === void 0) { scrape_config = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var chunks, n, k, execPromises, c, config, obj, boundMethod;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Object.assign(this.config, scrape_config);
                        if (!(this.pluggable && this.pluggable.start_browser)) return [3 /*break*/, 2];
                        // console.log(this.config.platform)
                        this.scraper = getScraper(this.config.platform, {
                            config: this.config,
                            context: this.context,
                            pluggable: this.pluggable,
                            page: this.page,
                            tmppath: this.tmppath,
                        });
                        return [4 /*yield*/, this.scraper.workersearchdata(this.page)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        chunks = [];
                        for (n = 0; n < this.numClusters; n++) {
                            chunks.push([]);
                        }
                        for (k = 0; k < this.config.keywords.length; k++) {
                            chunks[k % this.numClusters].push(this.config.keywords[k]);
                        }
                        debug("chunks=%o", chunks);
                        execPromises = [];
                        for (c = 0; c < chunks.length; c++) {
                            config = _.clone(this.config);
                            config.keywords = chunks[c];
                            obj = getScraper(this.config.platform, {
                                config: config,
                                context: {},
                                pluggable: this.pluggable,
                            });
                            boundMethod = obj.workersearchdata.bind(obj);
                            execPromises.push(this.cluster.execute({}, boundMethod));
                        }
                        return [4 /*yield*/, Promise.all(execPromises)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /*
     * Quit the puppeteer cluster/browser.
     */
    ScrapeManager.prototype.quit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.pluggable && this.pluggable.close_browser)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.pluggable.close_browser()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.cluster.idle()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.cluster.close()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ScrapeManager;
}());
module.exports = {
    ScrapeManager: ScrapeManager,
};


/***/ }),

/***/ "./src/concurrency-implementation.js":
/*!*******************************************!*\
  !*** ./src/concurrency-implementation.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Browser } = __webpack_require__(/*! puppeteer-cluster/dist/concurrency/builtInConcurrency */ "puppeteer-cluster/dist/concurrency/builtInConcurrency");
const debug = __webpack_require__(/*! debug */ "debug")('se-scraper:CustomConcurrency');
const { timeoutExecute } = __webpack_require__(/*! puppeteer-cluster/dist/util */ "puppeteer-cluster/dist/util");

const BROWSER_TIMEOUT = 5000;

class CustomConcurrency extends Browser {

    async init() {}
    async close() {}

    async workerInstance() {
        const options = this.options.perBrowserOptions.shift();
        debug('Launch puppeteer instance with options=%o', options);
        let chrome = await this.puppeteer.launch(options);
        let page;
        let context;

        return {
            jobInstance: async () => {
                await timeoutExecute(BROWSER_TIMEOUT, (async () => {
                    context = await chrome.createIncognitoBrowserContext();
                    page = await context.newPage();
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
                    await chrome.close();
                } catch (e) {}

                // just relaunch as there is only one page per browser
                chrome = await this.puppeteer.launch(options);
            },
        };
    }
};

module.exports = CustomConcurrency;

/***/ }),

/***/ "./src/modules/bilibili/downloader.js":
/*!********************************************!*\
  !*** ./src/modules/bilibili/downloader.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const fs = __webpack_require__(/*! fs */ "fs");
const crypto = __webpack_require__(/*! crypto */ "crypto");
const http = __webpack_require__(/*! http */ "http");
const https = __webpack_require__(/*! https */ "https");
const progress = __webpack_require__(/*! progress-stream */ "progress-stream");

class Task {
	constructor(url) {
		this.url = url;
		this.finished = false;
	}
}

class Downloader {
	constructor() {
		this.type = "";
		this.id = "";
		this.url = "";
		this.aid = -1;
		this.pid = 1;
		this.cid = -1;
		this.name = "";
		this.links = [];
		this.tasks = [];
	}

	getVideoUrl(videoUrl) {
		this.url = "";
		const mapping = {
			"BV": "https://www.bilibili.com/video/",
			"bv": "https://www.bilibili.com/video/",
			"av": "https://www.bilibili.com/video/",
			"ep": "https://www.bilibili.com/bangumi/play/",
			"ss": "https://www.bilibili.com/bangumi/play/"
		};
		for (const [key, value] of Object.entries(mapping)) {
			if (videoUrl.includes(key)) {
				this.type = key;
				this.id = key + videoUrl.split(key)[1];
				this.url = value + this.id;
				break;
			}
		}
	}

	async getAid() {
		const { type, url } = this;
		if (!url) return;
		return fetch(url)
			.then(response => response.text())
			.then(result => {
				let data = result.match(/__INITIAL_STATE__=(.*?);\(function\(\)/)[1];
				data = JSON.parse(data);
				console.log("INITIAL STATE", data);
				if (type === "BV" || type === "bv" || type === "av") {
					this.aid = data.videoData.aid;
					this.pid = parseInt(url.split("p=")[1], 10) || 1;
					this.cid = data.videoData.pages[this.pid - 1].cid;
				}
				else if (type === "ep") {
					this.aid = data.epInfo.aid;
					this.cid = data.epInfo.cid;
				}
				else if (type === "ss") {
					this.aid = data.epList[0].aid;
					this.cid = data.epList[0].cid;
				}
			})
			.catch(error => showError("获取视频 aid 出错！"));
	}

	async getInfo() {
		const { aid, cid } = this;
		if (!cid) {
			showError("获取视频 cid 出错！");
			return;
		}
		// getDanmaku(); //获取cid后，获取下载链接和弹幕信息
		return fetch("https://api.bilibili.com/x/web-interface/view?aid=" + aid)
			.then(response => response.json())
			.catch(error => showError("获取视频信息出错！"));
	}

	async getData(fallback) {
		const { cid, type } = this;
		let playUrl;
		if (fallback) {
			const params = `cid=${cid}&module=movie&player=1&quality=112&ts=1`;
			const sign = crypto.createHash("md5").update(params + "9b288147e5474dd2aa67085f716c560d").digest("hex");
			playUrl = `https://bangumi.bilibili.com/player/web_api/playurl?${params}&sign=${sign}`;
		} else {
			if (type === "BV" || type === "bv" || type === "av") {
				const params = `appkey=iVGUTjsxvpLeuDCf&cid=${cid}&otype=json&qn=112&quality=112&type=`;
				const sign = crypto.createHash("md5").update(params + "aHRmhWMLkdeMuILqORnYZocwMBpMEOdt").digest("hex");
				playUrl = `https://interface.bilibili.com/v2/playurl?${params}&sign=${sign}`;
			} else {
				playUrl = `https://api.bilibili.com/pgc/player/web/playurl?qn=80&cid=${cid}`;
				
			}
		}
		return fetch(playUrl)
			.then(response => response.text())
			.then(result => {
				const data = fallback ? this.parseData(result) : JSON.parse(result);
				const target = data.durl || data.result.durl;
				console.log("PLAY URL", data);
                if (target) {
                    this.links = target.map(part => part.url);
                    return {
                        fallback, data
                    };
				} else {
					if (fallback) throw Error();
					return this.getData(true);
				}
			})
			.catch(error => {
				showError("获取 PlayUrl 或下载链接出错！由于B站限制，只能下载低清晰度视频。");
			});
	}

	parseData(target) {
		const data = $(target);
		const result = {};
		result.durl = [];
		result.quality = data.find("quality").text();
		data.find("durl").each((i, o) => {
			const part = $(o);
			result.durl.push({
				url: part.find("url").text(),
				order: part.find("order").text(),
				length: part.find("length").text(),
				size: part.find("size").text()
			});
		});
		return result;
	}

	downloadByIndex(part, file, callback = () => {}) {
		const { url } = this;

		if (this.tasks.some(item => item.url === this.links[part])) return "DUPLICATE";
		this.tasks.push(new Task(this.links[part]));
		let state;
		try {
			state = fs.statSync(file);
		}
		catch (error) {
		}
		const options = {
			url: this.links[part],
			headers: {
				"Range": `bytes=${state ? state.size : 0}-`, //断点续传
				"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
				"Referer": url
			}
		};
		const stream = fs.createWriteStream(file, state ? { flags: "a" } : {});
		this.download(options, stream, callback);

		return state;
	}

	download(options, stream, callback) {
		// https://www.npmjs.com/package/progress-stream
		const index = this.tasks.findIndex(item => item.url === options.url);
		const proStream = progress({
			time: 250 //单位ms
		}).on("progress", progress => {
			const { percentage } = progress; //显示进度条
			if (percentage === 100) {
				this.tasks[index].finished = true;
			}
			callback(progress, index);
		});

		let { url } = options;
		function downloadLink(url) {
			(url.startsWith("https") ? https : http).get(url, options, res => {
				if (res.statusCode === 302) {
					url = res.headers.location;
					return downloadLink(url);
				}
				proStream.setLength(res.headers["content-length"]);
				//先pipe到proStream再pipe到文件的写入流中
				res.pipe(proStream).pipe(stream).on("error", error => {
					console.error(error);
				});
			});
		}
		downloadLink(url);
	}
}

module.exports = { Task, Downloader };


/***/ }),

/***/ "./src/modules/bilibili_scraper.js":
/*!*****************************************!*\
  !*** ./src/modules/bilibili_scraper.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cheerio = __webpack_require__(/*! cheerio */ "cheerio");
const Scraper = __webpack_require__(/*! ./social_scraper */ "./src/modules/social_scraper.js");
const fs = __webpack_require__(/*! fs */ "fs");
const { Downloader } = __webpack_require__(/*! ./bilibili/downloader.js */ "./src/modules/bilibili/downloader.js");
const path = __webpack_require__(/*! path */ "path");
const sanitize = __webpack_require__(/*! filenamify */ "filenamify");
const debug = __webpack_require__(/*! debug */ "debug")("bilibili-scraper:Scraper");
const { autoScroll, delay } = __webpack_require__(/*! ./lib/function.js */ "./src/modules/lib/function.js");
// import filenamify from 'filenamify';
// const { launch, getStream } = require("puppeteer-stream");
// const PuppeteerVideoRecorder = require('puppeteer-video-recorder');
class BilibiliScraper extends Scraper {
  constructor(...args) {
    super(...args);
    this.startUrl = "https://www.bilibili.com";
  }
  async load_start_page() {
    debug("load start page")
    if (this.config.bilibili_settings) {
      this.startUrl = `https://www.${this.config.bilibili_settings.bilibili_domain}`;
      if (this.config.bilibili_settings.bilibili_domain) {
        this.startUrl = `https://www.${this.config.bilibili_settings.bilibili_domain}`;
      }

      for (var key in this.config.bilibili_settings) {
        if (key !== "bilibili_domain") {
          this.startUrl += `${key}=${this.config.bilibili_settings[key]}&`;
        }
      }
    }
  }
  //login into bilibili
  async makeloginaction() {
    // let startUrl = "https://www.bilibili.com";

    this.logger.info("Using loginUrl: " + this.startUrl);
    await this.page.setBypassCSP(true);
    this.last_response = await this.page.goto(this.startUrl);

    console.log(
      "login success, cookies has been save at " + this.config.tmppath
    );
    //click login btn
    await this.page.click(".header-login-entry");
    // await this.page.evaluate(_ => {
    // var icon = document.getElementById("logo");
    // icon.style.display = "none";
    // });
    //wait login box show
    await this.page.waitForSelector(".bili-mini-content-wp", {
      timeout: this.STANDARD_TIMEOUT,
    });
    //click login by sms
    const [button] = await this.page.$x("//div[contains(., ' 短信登录 ')]");
    if (button) {
      await button.click();
    }
    //await for user to take action
    await this.page.waitForSelector(".header-entry-mini", { timeout: 0 });
    //user has success login
    //save cookies
    const cookies = await this.page.cookies();

    await fs.writeFile(
      this.config.tmppath + "/cookies.json",
      JSON.stringify(cookies, null, 2),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
    await this.page.close();
    // await this.browsers.close();
    return true;
  }

  /**
   * get video list page
   * @param {object} page
   * @param {string} keyword
   * @returns element
   */
  async clickSearchbtn({ page, keyword }) {
    if (page) {
      this.page = page;
    }

    this.logger.info("Using loginUrl: " + this.startUrl);
    await this.page.setBypassCSP(true);
    this.last_response = await this.page.goto(this.startUrl);
    await page.type(".nav-search-input", keyword);
    // await this.page.$eval(".nav-search-input", function (keyword) {
    //   this.value = keyword;
    // });
    // await page.$eval('.nav-search-input', el => el.value = "");
    const searchbtn = await this.page.$(".nav-search-btn");
    searchbtn.click();
    return searchbtn;
  }
  /**
   *
   * @param {object} page
   * @param {string} keyword
   * @returns array
   */
  async searchdata({ page, keyword }) {
    if (page) {
      this.page = page;
    }
    let result=[]
    if(Array.isArray(keyword)){
      for (const element of keyword) {
        let linkres=await this.getVideourls({ page: this.page, keyword: element });
        debug(linkres)
        for(const link of linkres){ 
          result.push(link)
        }
      }
      
    }else if(typeof keyword === 'string'){
      let linkres=await this.getVideourls({ page: this.page, keyword: keyword });
      for(const link of linkres){
        
        result.push(linkres)
      }
    }
    return result
    // return await this.getVideourls({ page: this.page, keyword: keyword });
  }
  //get video url return in array
  /**
   *
   * @param {object,string,string}
   * @returns array
   */
  async getVideourls({ page, keyword, cookiesPath }) {
    if (page) {
      this.page = page;
    }
    if (cookiesPath) {
      if (!fs.existsSync(cookiesPath)) {
        throw new Error(`Cannot find cookies file at ${cookiesPath}`);
      }

      let cookies = JSON.parse(await fs.promises.readFile(cookiesPath));
      // console.log(cookies);
      await this.page.setCookie(...cookies);
    }

    const searchbtn = await this.clickSearchbtn({
      page: this.page,
      keyword: keyword,
    });
    let browser = this.page.browser();
    const newPage = await browser.waitForTarget((target) =>
      target.url().includes("search.bilibili.com")
    );
    const pages = await browser.pages();
    let searchPage;
    for (const page of pages) {
      const pageurl = await page.url(); // new page now appear!
      // debug(await page.title())
      if (pageurl.includes("search.bilibili.com")) {
        searchPage = page;
        break;
      }
    }
    if (!searchPage) {
      throw new Error("search page not found");
    }
    // this.page.waitFor(2000);
    // this.browser.on('targetcreated', function(){
    //   console.log('New Tab Created');
    // });
    // let browser=this.page.browser()
    // console.log("current page count ", (await browser.pages()).length);
    // const tables = await browser.pages()
    // for (let i = 0; i < tables.length; i++) {
    //   debug(await tables[i].title())
    // }

    // const [tabOne, tabTwo] = (await browser.pages());
    // debug(await tabOne.title())
    // debug(await tabTwo.title())
    // await this.page.waitForNavigation()
    // await delay(5000);
    await autoScroll(searchPage);
    // await page.screenshot({
    //   path: '/home/robertzeng/screenshot.jpg'
    // });

    await searchPage.waitForSelector(".vui_pagenation", { timeout: 5000 });

    let linkres = [];
    // await this.page.$$("button.vui_button", elements=>{
    //   console.log(elements)
    // })
    const linkPage = await searchPage.$$("button.vui_button");
    debug(linkPage);
    for (let i = 0; i < linkPage.length; i++) {
      // await autoScroll(tabTwo )
      // await this.page.waitForNavigation({
      //   waitUntil: 'networkidle0',
      // });
      // await linkPage[i].click()
      await searchPage.evaluate((element) => {
        element.click();
      }, linkPage[i]);
      const links = await this.getVideolistlink({ page: searchPage });
      debug(links);
      links.map((link) => {
        linkres.push(link);
      });
    }

    // await this.page.$$eval("button.vui_button", async elements=>{
    //   // await autoScroll(this.page )
    //   elements.map(async element=>{
    //     await autoScroll(this.page )
    //   await element.click()
    //   const links=await this.getVideolistlink({ page:this.page });
    //   debug(links)
    //   links.map((link)=>{
    //     linkres.push(link)
    //   })
    // })
    // })
    debug(linkres);
    return linkres;
  }
  /**
   *
   * @param {page} page
   * @returns array
   */
  async getVideolistlink({ page }) {
    if (page) {
      this.page = page;
    }
    // const elHandleArray = await page.$$(
    //   ".bili-video-card__info--right a:nth-child(1)"
    // );

    // let linkmap = [];
    let linkmap = await page.$$eval(
      ".bili-video-card__info--right >a:first-child",
      (alinks) => {
        return alinks.map((alink) => {
          var linkarr = {};
          linkarr.link = alink.getAttribute("href");
          console.log(alink);
          htitle = alink.querySelector("h3");
          linkarr.title = htitle.getAttribute("title");
          return linkarr;
        });
      }
    );
    // debug("query link finish");
    // debug(linkmap);
    // debug("show link finish");
    // console.log(linkmap)

    await linkmap.forEach((element, index) => {
      if (!element.link.includes("/video/")) {
        // debug("element has video "+element)
        linkmap.splice(index, 1);
      }
    });
    await linkmap.forEach((element, index) => {
      if (element.link.includes("/api/")) {
        debug("element has api " + element);
        linkmap.splice(index, 1);
      }
    });
    //debug("filter link finish");
    debug(linkmap);

    return linkmap;
  }
  /**
   *
   * @param {object} page
   * @param {string} link
   * @param {string} videopath
   */
  async downloadSigleVideo({ link, videopath }) {
    // if (page) {
    //   this.page = page;
    // }

    // console.log(link)
    // await this.page.goto(link,{
    //   waitUntil: 'domcontentloaded',
    // });
    // console.log(videopath)
    // const file = fs.createWriteStream(videopath + "/test.webm");
    // await page.evaluate(async () => {
    // const el = document.querySelector('.bpx-player-video-wrap > video:nth-child(1)');
    // console.log(el);
    // const {src} = el.querySelector('source');
    // console.log(src);
    // });
    // const html = await page.$eval('#bilibili-player', el => el.outerHTML);
    // console.log(html)
    // const src = await page.$eval("#bilibili-player video",el => el.getAttribute("src"))

    const downloader = new Downloader();
    downloader.getVideoUrl(link);
    if (!downloader.url) {
      throw new Error("video url invalid");
    }
    await downloader.getAid();

    let videores = await downloader.getInfo();
    debug("VIDEO INFO", videores);
    // const downloadPath ='/home/robertzeng/downloadtest';
    const filename = videores.data.title;
    const { data, fallback } = await downloader.getData();

    const target = data.durl || data.result.durl;
    const quality = data.quality || data.result.quality,
      qualityArray = {
        112: "1080P+",
        80: "1080P",
        74: "720P60",
        64: "720P",
        48: "720P",
        32: "480P",
        16: "360P",
        15: "360P",
      };
    const videoQuantity = qualityArray[quality] || "unknown";
    console.log("videoQuantity is " + videoQuantity);
    if (fallback) {
      throw new Error("error happen when get video data");
    }
    debug("echo target");
    debug(target);
    target.forEach((element, part) => {
      const file = path.join(videopath, `${sanitize(filename)}-${part}.flv`);
      debug("part is %o", part);
      debug("file name %o", file);
      const state = downloader.downloadByIndex(
        part,
        file,
        (progress, index) => {
          const { speed, eta, percentage } = progress; //显示进度条
          console.log("speed: " + Math.round(speed / 1e3) + "KB/s");
          console.log(`eta:${eta}s`);
        }
      );
    });

    return true;
  }
  /**
   * get video detail
   * @param {object} page
   * @param {string} link
   */
  async getVideodetail(page, link) {
    if (page) {
      this.page = page;
    }
    await this.page.goto(link, {
      waitUntil: "domcontentloaded",
    });

    // await this.page.waitForSe
  }
}

module.exports = {
  BilibiliScraper: BilibiliScraper,
};


/***/ }),

/***/ "./src/modules/facebook_scraper.js":
/*!*****************************************!*\
  !*** ./src/modules/facebook_scraper.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cheerio = __webpack_require__(/*! cheerio */ "cheerio");
const Scraper = __webpack_require__(/*! ./social_scraper */ "./src/modules/social_scraper.js");

class FacebookScraper extends Scraper {

    constructor(...args) {
        super(...args);
    }
 

    async load_login_page() {
        let startUrl = 'https://www.facebook.com';

        if (this.config.facebook_settings) {
            startUrl = `https://www.${this.config.facebook_settings.facebook_domain}`;
            if (this.config.facebook_settings.facebook_domain) {
                startUrl = `https://www.${this.config.facebook_settings.facebook_domain}`;
            } else {
                startUrl = `https://www.facebook.com`;
            }

            for (var key in this.config.facebook_settings) {
                if (key !== 'facebook_domain') {
                    startUrl += `${key}=${this.config.facebook_settings[key]}&`
                }
            }
        }

        this.logger.info('Using loginUrl: ' + startUrl);

        this.last_response = await this.page.goto(startUrl);

        //await this.page.waitForSelector('input[name="q"]', { timeout: this.STANDARD_TIMEOUT });

        return true;
    }
    //user login by hand
    async userloginaction(){

    }

}

module.exports = {
    FacebookScraper: FacebookScraper,
};


/***/ }),

/***/ "./src/modules/lib/function.js":
/*!*************************************!*\
  !*** ./src/modules/lib/function.js ***!
  \*************************************/
/***/ ((module) => {

//scroll down to the bottom of the page
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

module.exports = {
    autoScroll:autoScroll,
    delay:delay
}

/***/ }),

/***/ "./src/modules/metadata.js":
/*!*********************************!*\
  !*** ./src/modules/metadata.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const cheerio = __webpack_require__(/*! cheerio */ "cheerio");

module.exports = {
    get_ip_data: get_ip_data,
    get_http_headers: get_http_headers,
};

async function get_ip_data(page) {
    await page.goto('https://ipinfo.io/json', {
      waitLoad: true,
      waitNetworkIdle: true
    });
    let json = await page.content({
        timeout: 20000
    });
    const $ = cheerio.load(json);
    let ipinfo_text =  $('pre').text();
    return JSON.parse(ipinfo_text);
}

async function get_http_headers(page) {
    await page.goto('https://httpbin.org/get', {
      waitLoad: true,
      waitNetworkIdle: true
    });
    let headers = await page.content();

    const $ = cheerio.load(headers);
    let headers_text =  $('pre').text();
    return JSON.parse(headers_text);
}

/***/ }),

/***/ "./src/modules/social_scraper.js":
/*!***************************************!*\
  !*** ./src/modules/social_scraper.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const meta = __webpack_require__(/*! ./metadata.js */ "./src/modules/metadata.js");
const debug = __webpack_require__(/*! debug */ "debug")('se-scraper:Scraper');
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
        await this.makeloginaction()
       
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

        return await this.load_start_page();
    }
    /**
  *
  * @returns true if startpage was loaded correctly.
  */
    async load_login_page() {

    }
     /**
     *
     * @returns true if startpage was loaded correctly.
     */
     async load_start_page() {

     }
    /**
     * make login action
     */
    async makeloginaction(){

    }
    /**
     * user login by their hand
     */
    async userloginaction() {

    }

    async searchdata() {

    }
    /**
     * use worker to search data
     * @param array keyword 
     */
    async workersearchdata({page,worker}) {
         debug('worker=%o', worker, this.config.keywords);

        if (page) {
            this.page = page;
        }

        await this.page.setViewport({ width: 1280, height: 800 });
        await this.load_browser_engine()
        const links=await this.searchdata({keyword:this.config.keywords})
        debug(links)
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

/***/ }),

/***/ "./src/modules/youtube_scraper.js":
/*!****************************************!*\
  !*** ./src/modules/youtube_scraper.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cheerio = __webpack_require__(/*! cheerio */ "cheerio");
const Scraper = __webpack_require__(/*! ./social_scraper */ "./src/modules/social_scraper.js");
const fs = __webpack_require__(/*! fs */ "fs");

class YoutubeScraper extends Scraper {

    constructor(...args) {
        super(...args);    
    }


    async load_login_page() {
        
        // await this.page.setRequestInterception(true);
        //whether to disable image loading
            // this.page.on('request', request => {
            //     if (request.resourceType() === 'image') {
            //         request.abort();
            //     } else {
            //         request.continue();
            //     }
            // });
        let startUrl = 'https://www.youtube.com';

        if (this.config.youtube_settings) {
            startUrl = `https://www.${this.config.youtube_settings.youtube_domain}`;
            if (this.config.youtube_settings.youtube_domain) {
                startUrl = `https://www.${this.config.youtube_settings.youtube_domain}`;
            } else {
                startUrl = `https://www.youtube.com`;
            }

            for (var key in this.config.facebook_settings) {
                if (key !== 'youtube_domain') {
                    startUrl += `${key}=${this.config.youtube_settings[key]}&`
                }
            }
        }

        this.logger.info('Using loginUrl: ' + startUrl);
        await this.page.setBypassCSP(true);
        this.last_response = await this.page.goto(startUrl);
        
        //hidden icon
        await this.page.evaluate(_ => {
        var icon = document.getElementById("logo-icon");
        icon.style.display = "none";
        });
        console.log(this.config.tmppath)
        //await this.page.waitForSelector('input[name="q"]', { timeout: this.STANDARD_TIMEOUT });
        //await for user to take action
        await this.page.waitForSelector('#avatar-btn',{'timeout':0});
        //user has success login
        //save cookies 
        const cookies = await this.page.cookies();
        
        await fs.writeFile(this.config.tmppath+'/cookies.json', JSON.stringify(cookies, null, 2));
        await browser.close();
        return true;
    }



}

module.exports = {
    YoutubeScraper: YoutubeScraper,
};


/***/ }),

/***/ "./src sync recursive":
/*!*******************!*\
  !*** ./src/ sync ***!
  \*******************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "./src sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "cheerio":
/*!**************************!*\
  !*** external "cheerio" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("cheerio");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("debug");

/***/ }),

/***/ "filenamify":
/*!*****************************!*\
  !*** external "filenamify" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("filenamify");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "progress-stream":
/*!**********************************!*\
  !*** external "progress-stream" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("progress-stream");

/***/ }),

/***/ "puppeteer":
/*!****************************!*\
  !*** external "puppeteer" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("puppeteer");

/***/ }),

/***/ "puppeteer-cluster":
/*!************************************!*\
  !*** external "puppeteer-cluster" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("puppeteer-cluster");

/***/ }),

/***/ "puppeteer-cluster/dist/concurrency/builtInConcurrency":
/*!************************************************************************!*\
  !*** external "puppeteer-cluster/dist/concurrency/builtInConcurrency" ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("puppeteer-cluster/dist/concurrency/builtInConcurrency");

/***/ }),

/***/ "puppeteer-cluster/dist/util":
/*!**********************************************!*\
  !*** external "puppeteer-cluster/dist/util" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("puppeteer-cluster/dist/util");

/***/ }),

/***/ "puppeteer-extra":
/*!**********************************!*\
  !*** external "puppeteer-extra" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("puppeteer-extra");

/***/ }),

/***/ "user-agents":
/*!******************************!*\
  !*** external "user-agents" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("user-agents");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("winston");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNLFVBQVUsR0FBRyxtQkFBTyxDQUFDLG1EQUFxQixDQUFDLENBQUM7QUFDbEQsSUFBSSxPQUFPLEdBQUcsbUJBQU8sQ0FBQyxxRUFBOEIsQ0FBQyxDQUFDO0FBRXRELFNBQWUsS0FBSyxDQUFDLGNBQXFCLEVBQUUsYUFBb0I7Ozs7OztvQkFDOUQsOENBQThDO29CQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztvQkFFekMsT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDM0Qsb0RBQW9EO29CQUNwRCxxQkFBTSxPQUFPLENBQUMsS0FBSyxFQUFFOztvQkFEckIsb0RBQW9EO29CQUNwRCxTQUFxQixDQUFDO29CQUVSLHFCQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDOztvQkFBNUMsT0FBTyxHQUFHLFNBQWtDO29CQUVoRCxxQkFBTSxPQUFPLENBQUMsSUFBSSxFQUFFOztvQkFBcEIsU0FBb0IsQ0FBQztvQkFFckIsc0JBQU8sT0FBTyxFQUFDOzs7O0NBQ2hCO0FBQ0QsZUFBZTtBQUNmLFNBQWUsVUFBVSxDQUFDLGNBQWMsRUFBRSxhQUFhOzs7Ozs7b0JBQ3JELDhDQUE4QztvQkFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7b0JBRXpDLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzNELG9EQUFvRDtvQkFDcEQscUJBQU0sT0FBTyxDQUFDLEtBQUssRUFBRTs7b0JBRHJCLG9EQUFvRDtvQkFDcEQsU0FBcUIsQ0FBQztvQkFDUixxQkFBTSxPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQzs7b0JBQWpELE9BQU8sR0FBRyxTQUF1QztvQkFFckQscUJBQU0sT0FBTyxDQUFDLElBQUksRUFBRTs7b0JBQXBCLFNBQW9CLENBQUM7Ozs7O0NBQ3RCO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLFVBQVUsRUFBRSxVQUFVO0lBQ3RCLEtBQUssRUFBRSxLQUFLO0lBQ1oscUJBQXFCO0lBQ3JCLGFBQWEsRUFBRSxVQUFVLENBQUMsYUFBYTtJQUN2QyxPQUFPLEVBQUUsT0FBTztDQUNqQixDQUFDOzs7Ozs7Ozs7Ozs7QUNwQ1c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2IsSUFBTSxFQUFFLEdBQUcsbUJBQU8sQ0FBQyxjQUFJLENBQUMsQ0FBQztBQUN6QixJQUFNLEVBQUUsR0FBRyxtQkFBTyxDQUFDLGNBQUksQ0FBQyxDQUFDO0FBQ3pCLElBQU0sQ0FBQyxHQUFHLG1CQUFPLENBQUMsc0JBQVEsQ0FBQyxDQUFDO0FBQ3RCLFNBQXVDLG1CQUFPLENBQUMsd0JBQVMsQ0FBQyxFQUF2RCxZQUFZLG9CQUFFLE1BQU0sY0FBRSxVQUFVLGdCQUF1QixDQUFDO0FBQ3hELFdBQU8sR0FBd0IsTUFBTSxRQUE5QixFQUFFLFNBQVMsR0FBYSxNQUFNLFVBQW5CLEVBQUUsTUFBTSxHQUFLLE1BQU0sT0FBWCxDQUFZO0FBQzlDLElBQU0sS0FBSyxHQUFHLG1CQUFPLENBQUMsb0JBQU8sQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDbkQsV0FBTyxHQUFLLDJFQUFMLENBQWtDO0FBQ2pELElBQU0sZ0JBQWdCLEdBQUcsbUJBQU8sQ0FBQyw0QkFBVyxDQUFDLENBQUM7QUFDdEMsWUFBUSxHQUFLLHdFQUFMLENBQWdDO0FBQ2hELDZEQUE2RDtBQUM3RCx1RUFBdUU7QUFFdkUsSUFBTSxTQUFTLEdBQUcsbUJBQU8sQ0FBQyxnQ0FBYSxDQUFDLENBQUM7QUFDekMsSUFBTSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyx3RUFBK0IsQ0FBQyxDQUFDO0FBQzFELElBQU0sT0FBTyxHQUFHLG1CQUFPLENBQUMsc0VBQThCLENBQUMsQ0FBQztBQUN4RCxJQUFNLFFBQVEsR0FBRyxtQkFBTyxDQUFDLHdFQUErQixDQUFDLENBQUM7QUFDMUQsNkNBQTZDO0FBQzdDLGlEQUFpRDtBQUNqRCx1REFBdUQ7QUFDdkQseURBQXlEO0FBQ3pELElBQU0scUJBQXFCLEdBQUcsbUJBQU8sQ0FBQyx5RUFBOEIsQ0FBQyxDQUFDO0FBQ3RFLGtDQUFrQztBQUNsQyxJQUFNLG9CQUFvQixHQUFHLENBQUMsQ0FBQztBQUMvQixnREFBZ0Q7QUFDaEQsb0VBQW9FO0FBQ3BFLHdFQUF3RTtBQUV4RSxTQUFTLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSTtJQUNoQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBQyxHQUFHO1FBQ2hDLElBQUksR0FBRztZQUFFLE1BQU0sR0FBRyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQTJCLEtBQUssQ0FBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyx1QkFBdUIsQ0FBQyxLQUFLO0lBQ3BDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxRCxpQkFBaUI7SUFDakIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQyxFQUFFO1FBQ2xCLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFHRCxTQUFTLFVBQVUsQ0FBQyxhQUFvQixFQUFFLElBQVE7SUFDaEQsSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUU7UUFDckMsT0FBTyxJQUFJO1lBQ1QsUUFBUSxFQUFFLFFBQVEsQ0FBQyxlQUFlO1lBQ2xDLE9BQU8sRUFBRSxPQUFPLENBQUMsY0FBYztZQUMvQixRQUFRLEVBQUUsUUFBUSxDQUFDLGVBQWU7U0FDbkMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4QjtJQUNELGtEQUFrRDtJQUNsRCxvQ0FBb0M7SUFDcEMsS0FBSztTQUNBO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FDYiw2REFBNkQsQ0FDOUQsQ0FBQztLQUNIO0FBQ0gsQ0FBQztBQW9CRDtJQVlFLHVCQUFZLE1BQU0sRUFBRSxPQUFZO1FBQVosc0NBQVk7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIseUNBQXlDO1FBRXpDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDL0IsaUNBQWlDO1lBQ2pDLHFDQUFxQztZQUNyQyxxQ0FBcUM7WUFDckMsZ0NBQWdDO1lBQ2hDLFVBQVUsRUFDUixpSEFBaUg7WUFDbkgscUVBQXFFO1lBQ3JFLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsb0RBQW9EO1lBQ3BELG1CQUFtQixFQUFFLEtBQUs7WUFDMUIsc0JBQXNCO1lBQ3RCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLG1CQUFtQjtZQUNuQixnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLHFGQUFxRjtZQUNyRiwrREFBK0Q7WUFDL0QsV0FBVyxFQUFFLElBQUk7WUFFakIsTUFBTSxFQUFFLFlBQVksQ0FBQztnQkFDbkIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLE9BQU8sQ0FDYixTQUFTLEVBQUUsRUFDWCxNQUFNLENBQUMsVUFBQyxFQUE2Qjt3QkFBM0IsS0FBSyxhQUFFLE9BQU8sZUFBRSxTQUFTO29CQUNqQyxPQUFPLFVBQUcsU0FBUyxlQUFLLEtBQUssZUFBSyxPQUFPLENBQUUsQ0FBQztnQkFDOUMsQ0FBQyxDQUFDLENBQ0g7Z0JBQ0QsVUFBVSxFQUFFLENBQUMsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdkMsQ0FBQztZQUNGLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUMxQixnREFBZ0Q7WUFDaEQsUUFBUSxFQUFFLElBQUk7WUFDZCxzQ0FBc0M7WUFDdEMseUZBQXlGO1lBQ3pGLFlBQVksRUFBRTtnQkFDWixvQkFBb0I7Z0JBQ3BCLHVCQUF1QjtnQkFDdkIsNEJBQTRCO2dCQUM1QixzQ0FBc0M7Z0JBQ3RDLGNBQWM7Z0JBQ2QsMEJBQTBCO2dCQUMxQix5QkFBeUI7Z0JBQ3pCLGlDQUFpQztnQkFDakMsZUFBZTtnQkFDZix3QkFBd0I7Z0JBQ3hCLG9CQUFvQjtnQkFDcEIsbUJBQW1CO2dCQUNuQix5QkFBeUI7YUFDMUI7WUFDRCxrQ0FBa0M7WUFDbEMsaUJBQWlCLEVBQUU7Z0JBQ2pCLHFCQUFxQjtnQkFDckIsc0JBQXNCO2dCQUN0Qix3QkFBd0I7Z0JBQ3hCLHNEQUFzRDthQUN2RDtZQUNELGlEQUFpRDtZQUNqRCxTQUFTLEVBQUUsQ0FBQztZQUNaLG1EQUFtRDtZQUNuRCxXQUFXLEVBQUUsRUFBRTtZQUNmLGlFQUFpRTtZQUNqRSxXQUFXLEVBQUUsS0FBSztZQUNsQixtREFBbUQ7WUFDbkQsOENBQThDO1lBQzlDLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsdUNBQXVDO1lBQ3ZDLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsMkRBQTJEO1lBQzNELGFBQWEsRUFBRSxLQUFLO1lBQ3BCLHVEQUF1RDtZQUN2RCxnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLG9FQUFvRTtZQUNwRSxzQ0FBc0M7WUFDdEMsWUFBWSxFQUFFLElBQUk7WUFDbEIsK0NBQStDO1lBQy9DLDJDQUEyQztZQUMzQyw4Q0FBOEM7WUFDOUMsZ0RBQWdEO1lBQ2hELFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsaUZBQWlGO1lBQ2pGLE9BQU8sRUFBRSxJQUFJO1lBQ2IsMkNBQTJDO1lBQzNDLDZCQUE2QjtZQUM3Qiw4QkFBOEI7WUFDOUIsVUFBVSxFQUFFLEVBQUU7WUFDZCw4QkFBOEI7WUFDOUIsb0RBQW9EO1lBQ3BELDBCQUEwQjtZQUMxQixnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLCtEQUErRDtZQUMvRCx3REFBd0Q7WUFDeEQsWUFBWSxFQUFFLEtBQUs7WUFDbkIsd0JBQXdCLEVBQUUsSUFBSTtZQUM5QixpQ0FBaUM7WUFDakMsd0JBQXdCLEVBQUU7Z0JBQ3hCLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7Z0JBQ3ZCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFdBQVcsRUFBRSxPQUFPLENBQUMsbUJBQW1CO2dCQUN4QyxjQUFjLEVBQUUsQ0FBQzthQUNsQjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFakMsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQ3RCLGlCQUFpQjtZQUNqQixNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFOUMsSUFDRSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQy9CO2dCQUNBLE1BQU0sbURBQW1ELENBQUM7YUFDM0Q7U0FDRjtRQUVELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDMUU7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQ2pELE1BQU0sSUFBSSxLQUFLLENBQ2IsMEZBQTBGLENBQzNGLENBQUM7U0FDSDtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sNkJBQTBCLENBQUMsQ0FBQztTQUMzRTtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFO1lBQ3hELE1BQU0sSUFBSSxLQUFLLENBQ2IsMkVBQTJFLENBQzVFLENBQUM7U0FDSDtRQUVELEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDRyw2QkFBSyxHQUFYOzs7Ozs7O3dCQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7NEJBQzNCLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dDQUMxQyxJQUFJO29DQUNJLGNBQWMsR0FBRyw0Q0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29DQUN4RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksY0FBYyxDQUFDO3dDQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07d0NBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztxQ0FDdEIsQ0FBQyxDQUFDO2lDQUNKO2dDQUFDLE9BQU8sU0FBUyxFQUFFO29DQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29DQUN6QixzQkFBTyxLQUFLLEVBQUM7aUNBQ2Q7NkJBQ0Y7aUNBQU07Z0NBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBUyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsdUJBQW1CLENBQUMsQ0FBQztnQ0FDbkUsc0JBQU8sS0FBSyxFQUFDOzZCQUNkO3lCQUNGO3dCQUVLLFlBQVksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7NkJBRW5ELEtBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQTlDLHdCQUE4Qzt3QkFDaEQsb0NBQW9DO3dCQUNwQyxTQUFJO3dCQUFXLHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO2dDQUNoRCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07NkJBQ3BCLENBQUM7O3dCQUhGLG9DQUFvQzt3QkFDcEMsR0FBSyxPQUFPLEdBQUcsU0FFYixDQUFDO3dCQUNILHFCQUFxQjt3QkFDckIsU0FBSTt3QkFBUSxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTs7d0JBRHhDLHFCQUFxQjt3QkFDckIsR0FBSyxJQUFJLEdBQUcsU0FBNEIsQ0FBQzs7O3dCQU1yQyxPQUFPLFVBQUM7d0JBQ1osZ0VBQWdFO3dCQUNoRSwyREFBMkQ7d0JBQzNELGtEQUFrRDt3QkFDbEQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzRCQUN6RCx1RUFBdUU7NEJBQ3ZFLDhDQUE4Qzs0QkFDOUMsa0NBQWtDOzRCQUNsQyxrQ0FBa0M7NEJBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDbkUsb0JBQW9CLENBQ3JCLENBQUM7NEJBQ0YsT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFFdkMsaUVBQWlFOzRCQUNqRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEtBQUssS0FBSyxFQUFFO2dDQUMxQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUN2Qjt5QkFDRjs2QkFBTTs0QkFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsY0FBYyxDQUFDOzRCQUN2RSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUMzQzt3QkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBUyxJQUFJLENBQUMsV0FBVyxlQUFZLENBQUMsQ0FBQzt3QkFHbEQsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFLOzRCQUM3QyxJQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQjtnQ0FDN0MsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFO2dDQUN6RCxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7NEJBQzNCLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyx1QkFBZ0IsU0FBUyxDQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUU5RCxJQUFJLEtBQUssRUFBRTtnQ0FDVCxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLHlCQUFrQixLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUM7NkJBQ2pEOzRCQUVELE9BQU87Z0NBQ0wsUUFBUSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTtnQ0FDOUIsaUJBQWlCLEVBQUUsSUFBSTtnQ0FDdkIsSUFBSTs2QkFDTCxDQUFDO3dCQUNKLENBQUMsQ0FBQyxDQUFDO3dCQUVILEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO3dCQUszQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7d0JBRTdDLDJFQUEyRTt3QkFDM0UsNkJBQTZCO3dCQUU3Qix1RUFBdUU7d0JBQ3ZFLDJEQUEyRDt3QkFFM0QsU0FBSTt3QkFBVyxxQkFBTSxPQUFPLENBQUMsTUFBTSxDQUFDO2dDQUNsQyxTQUFTO2dDQUNULE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE9BQU87Z0NBQ3JELE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE9BQU87Z0NBQ3JELFdBQVcsRUFBRSxxQkFBcUI7Z0NBQ2xDLGNBQWMsRUFBRSxJQUFJLENBQUMsV0FBVztnQ0FDaEMsZ0JBQWdCLEVBQUU7b0NBQ2hCLHVCQUF1QjtvQ0FDdkIsaUJBQWlCLEVBQUUsaUJBQWlCO2lDQUNyQzs2QkFDRixDQUFDOzt3QkFoQkYsMkVBQTJFO3dCQUMzRSw2QkFBNkI7d0JBRTdCLHVFQUF1RTt3QkFDdkUsMkRBQTJEO3dCQUUzRCxHQUFLLE9BQU8sR0FBRyxTQVViLENBQUM7Ozs7OztLQUVOO0lBRUQ7O09BRUc7SUFDRyw2QkFBSyxHQUFYLFVBQVksYUFBa0I7UUFBbEIsa0RBQWtCOzs7Ozs7d0JBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQzs2QkFPdEMsS0FBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBOUMsd0JBQThDO3dCQUNoRCxvQ0FBb0M7d0JBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFOzRCQUM5QyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07NEJBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzs0QkFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTOzRCQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7NEJBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO3lCQUN0QixDQUFDLENBQUM7d0JBRUgscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7d0JBQXRDLFNBQXNDLENBQUM7Ozt3QkFTbkMsTUFBTSxHQUFHLEVBQUUsQ0FBQzt3QkFDaEIsS0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3lCQUNqQjt3QkFDRCxLQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDcEQsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzVEO3dCQUVELEtBQUssQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBRXZCLFlBQVksR0FBRyxFQUFFLENBQUM7d0JBQ3RCLEtBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDaEMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNwQyxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFeEIsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQ0FDekMsTUFBTSxFQUFFLE1BQU07Z0NBQ2QsT0FBTyxFQUFFLEVBQUU7Z0NBQ1gsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTOzZCQUMxQixDQUFDLENBQUM7NEJBRUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUN6QyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO3lCQUMxRDt3QkFFRCxxQkFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQzs7d0JBQS9CLFNBQStCLENBQUM7Ozs7OztLQXVDbkM7SUFFRDs7T0FFRztJQUNHLGtDQUFVLEdBQWhCLFVBQWlCLGFBQWtCO1FBQWxCLGtEQUFrQjs7Ozs7O3dCQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7NkJBRXRDLEtBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQTlDLHdCQUE4Qzt3QkFDaEQsb0NBQW9DO3dCQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTs0QkFDOUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNOzRCQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87NEJBQ3JCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUzs0QkFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJOzRCQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzt5QkFDdEIsQ0FBQyxDQUFDO3dCQUVILHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7d0JBQTlDLFNBQThDLENBQUM7Ozt3QkFTM0MsTUFBTSxHQUFHLEVBQUUsQ0FBQzt3QkFDaEIsS0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3lCQUNqQjt3QkFDRCxLQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDcEQsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzVEO3dCQUVELEtBQUssQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBRXZCLFlBQVksR0FBRyxFQUFFLENBQUM7d0JBQ3RCLEtBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDaEMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNwQyxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFeEIsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQ0FDekMsTUFBTSxFQUFFLE1BQU07Z0NBQ2QsT0FBTyxFQUFFLEVBQUU7Z0NBQ1gsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTOzZCQUMxQixDQUFDLENBQUM7NEJBRUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2pELFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7eUJBQzFEO3dCQUVELHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDOzt3QkFBL0IsU0FBK0IsQ0FBQzs7Ozs7O0tBdUNuQztJQUVEOztPQUVHO0lBQ0csNEJBQUksR0FBVjs7Ozs7NkJBQ00sS0FBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBOUMsd0JBQThDO3dCQUNoRCxxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRTs7d0JBQXBDLFNBQW9DLENBQUM7OzRCQUVyQyxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTs7d0JBQXpCLFNBQXlCLENBQUM7d0JBQzFCLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFOzt3QkFBMUIsU0FBMEIsQ0FBQzs7Ozs7O0tBRTlCO0lBQ0gsb0JBQUM7QUFBRCxDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLGFBQWEsRUFBRSxhQUFhO0NBQzdCLENBQUM7Ozs7Ozs7Ozs7O0FDM2lCRixRQUFRLFVBQVUsRUFBRSxtQkFBTyxDQUFDLG9IQUF1RDtBQUNuRixjQUFjLG1CQUFPLENBQUMsb0JBQU87QUFDN0IsUUFBUSxpQkFBaUIsRUFBRSxtQkFBTyxDQUFDLGdFQUE2Qjs7QUFFaEU7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3REQSxXQUFXLG1CQUFPLENBQUMsY0FBSTtBQUN2QixlQUFlLG1CQUFPLENBQUMsc0JBQVE7QUFDL0IsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGNBQWMsbUJBQU8sQ0FBQyxvQkFBTztBQUM3QixpQkFBaUIsbUJBQU8sQ0FBQyx3Q0FBaUI7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxZQUFZO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsVUFBVSxXQUFXO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxZQUFZO0FBQ3RCO0FBQ0E7QUFDQSx5QkFBeUIsSUFBSTtBQUM3QjtBQUNBLG9FQUFvRSxPQUFPLFFBQVEsS0FBSztBQUN4RixJQUFJO0FBQ0o7QUFDQSxrREFBa0QsSUFBSTtBQUN0RDtBQUNBLDJEQUEyRCxPQUFPLFFBQVEsS0FBSztBQUMvRSxLQUFLO0FBQ0wsMkVBQTJFLElBQUk7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7O0FBRUEsZ0RBQWdEO0FBQ2hELFVBQVUsTUFBTTs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix1QkFBdUI7QUFDN0MsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxhQUFhLElBQUk7QUFDdkU7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILFdBQVcsYUFBYSxZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxRQUFRLE1BQU07QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1COzs7Ozs7Ozs7Ozs7QUNsTU47O0FBRWIsZ0JBQWdCLG1CQUFPLENBQUMsd0JBQVM7QUFDakMsZ0JBQWdCLG1CQUFPLENBQUMseURBQWtCO0FBQzFDLFdBQVcsbUJBQU8sQ0FBQyxjQUFJO0FBQ3ZCLFFBQVEsYUFBYSxFQUFFLG1CQUFPLENBQUMsc0VBQTBCO0FBQ3pELGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQixpQkFBaUIsbUJBQU8sQ0FBQyw4QkFBWTtBQUNyQyxjQUFjLG1CQUFPLENBQUMsb0JBQU87QUFDN0IsUUFBUSxvQkFBb0IsRUFBRSxtQkFBTyxDQUFDLHdEQUFtQjtBQUN6RDtBQUNBLFdBQVcsb0JBQW9CO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw4Q0FBOEM7QUFDbkY7QUFDQSx1Q0FBdUMsOENBQThDO0FBQ3JGOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIsSUFBSSxHQUFHLG1DQUFtQztBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELFlBQVk7QUFDeEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQSx5QkFBeUIsZUFBZTtBQUN4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLG1DQUFtQztBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsNENBQTRDLG1DQUFtQztBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsbUNBQW1DO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSx1QkFBdUIsNEJBQTRCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsWUFBWTtBQUNuRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTs7QUFFUiwwREFBMEQsZUFBZTs7QUFFekU7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxvQkFBb0IscUJBQXFCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1Asa0RBQWtELGtCQUFrQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxnQkFBZ0I7QUFDbkU7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLFFBQVE7QUFDUixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0EsMkJBQTJCLE1BQU07QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckI7QUFDQSw2QkFBNkIsaUJBQWlCO0FBQzlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsS0FBSztBQUNuQjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxpQkFBaUI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsbUJBQW1CLEdBQUcsS0FBSztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IseUJBQXlCLFlBQVk7QUFDdkQ7QUFDQSw2QkFBNkIsSUFBSTtBQUNqQztBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pYYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyx3QkFBUztBQUNqQyxnQkFBZ0IsbUJBQU8sQ0FBQyx5REFBa0I7O0FBRTFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzQ0FBc0MsOENBQThDO0FBQ3BGO0FBQ0EsMENBQTBDLDhDQUE4QztBQUN4RixjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLElBQUksR0FBRyxtQ0FBbUM7QUFDN0U7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLCtEQUErRCxnQ0FBZ0M7O0FBRS9GO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVCQSxnQkFBZ0IsbUJBQU8sQ0FBQyx3QkFBUzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM5QmE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLGdEQUFlO0FBQ3BDLGNBQWMsbUJBQU8sQ0FBQyxvQkFBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNDQUFzQywwQkFBMEI7QUFDaEU7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDBCQUEwQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvQkFBb0I7O0FBRXpDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBc0MsMEJBQTBCOztBQUVoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGVBQWU7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxxQ0FBcUM7QUFDOUU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIseUJBQXlCLEtBQUssV0FBVzs7QUFFOUQ7QUFDQTtBQUNBLG1EQUFtRCxZQUFZO0FBQy9ELGNBQWM7QUFDZCx1REFBdUQsV0FBVztBQUNsRTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsWUFBWTtBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXNDLDBCQUEwQjtBQUNoRTtBQUNBLDJDQUEyQyw2QkFBNkI7QUFDeEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EseUNBQXlDO0FBQ3pDLHNDQUFzQztBQUN0QyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLCtCQUErQjtBQUNsRTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQ0FBMkMsZUFBZTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7O0FDalRhOztBQUViLGdCQUFnQixtQkFBTyxDQUFDLHdCQUFTO0FBQ2pDLGdCQUFnQixtQkFBTyxDQUFDLHlEQUFrQjtBQUMxQyxXQUFXLG1CQUFPLENBQUMsY0FBSTs7QUFFdkI7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0Esc0NBQXNDLDRDQUE0QztBQUNsRjtBQUNBLDBDQUEwQyw0Q0FBNEM7QUFDdEYsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQyxJQUFJLEdBQUcsa0NBQWtDO0FBQzVFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsK0RBQStELGdDQUFnQztBQUMvRjtBQUNBLHVEQUF1RCxZQUFZO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9ub2RlX3NvY2lhbG1rLnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvY29uY3VycmVuY3ktaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL2JpbGliaWxpL2Rvd25sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL2JpbGliaWxpX3NjcmFwZXIuanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL2ZhY2Vib29rX3NjcmFwZXIuanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL2xpYi9mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvbWV0YWRhdGEuanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL3NvY2lhbF9zY3JhcGVyLmpzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy95b3V0dWJlX3NjcmFwZXIuanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy8gc3luYyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwiY2hlZXJpb1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJkZWJ1Z1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJmaWxlbmFtaWZ5XCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImxvZGFzaFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInByb2dyZXNzLXN0cmVhbVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwdXBwZXRlZXJcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXJcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC9jb25jdXJyZW5jeS9idWlsdEluQ29uY3VycmVuY3lcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC91dGlsXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInB1cHBldGVlci1leHRyYVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJ1c2VyLWFnZW50c1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJ3aW5zdG9uXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwib3NcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2Vfc2NyYXBlciA9IHJlcXVpcmUoXCIuL3NyYy9ub2RlX3NvY2lhbG1rXCIpO1xudmFyIFNjcmFwZXIgPSByZXF1aXJlKFwiLi9zcmMvbW9kdWxlcy9zb2NpYWxfc2NyYXBlclwiKTtcblxuYXN5bmMgZnVuY3Rpb24gbG9naW4oYnJvd3Nlcl9jb25maWc6b2JqZWN0LCBzY3JhcGVfY29uZmlnOm9iamVjdCkge1xuICAvLyBzY3JhcGUgY29uZmlnIG92ZXJ3cml0ZXMgdGhlIGJyb3dzZXJfY29uZmlnXG4gIE9iamVjdC5hc3NpZ24oYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpO1xuXG4gIHZhciBzY3JhcGVyID0gbmV3IHNlX3NjcmFwZXIuU2NyYXBlTWFuYWdlcihicm93c2VyX2NvbmZpZyk7XG4gIC8vIHZhciByZW1vdGVDb25maWc9YXdhaXQgc2NyYXBlci5nZXRSZW1vdGVDb25maWcoKTtcbiAgYXdhaXQgc2NyYXBlci5zdGFydCgpO1xuXG4gIHZhciByZXN1bHRzID0gYXdhaXQgc2NyYXBlci5sb2dpbihzY3JhcGVfY29uZmlnKTtcblxuICBhd2FpdCBzY3JhcGVyLnF1aXQoKTtcblxuICByZXR1cm4gcmVzdWx0cztcbn1cbi8vZ2V0IGRhdGEgdXJsc1xuYXN5bmMgZnVuY3Rpb24gc2VhcmNoZGF0YShicm93c2VyX2NvbmZpZywgc2NyYXBlX2NvbmZpZykge1xuICAvLyBzY3JhcGUgY29uZmlnIG92ZXJ3cml0ZXMgdGhlIGJyb3dzZXJfY29uZmlnXG4gIE9iamVjdC5hc3NpZ24oYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpO1xuXG4gIHZhciBzY3JhcGVyID0gbmV3IHNlX3NjcmFwZXIuU2NyYXBlTWFuYWdlcihicm93c2VyX2NvbmZpZyk7XG4gIC8vIHZhciByZW1vdGVDb25maWc9YXdhaXQgc2NyYXBlci5nZXRSZW1vdGVDb25maWcoKTtcbiAgYXdhaXQgc2NyYXBlci5zdGFydCgpO1xuICB2YXIgcmVzdWx0cyA9IGF3YWl0IHNjcmFwZXIuc2VhcmNoZGF0YShzY3JhcGVfY29uZmlnKTtcblxuICBhd2FpdCBzY3JhcGVyLnF1aXQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlYXJjaGRhdGE6IHNlYXJjaGRhdGEsXG4gIGxvZ2luOiBsb2dpbixcbiAgLy8geXRibG9naW46eXRibG9naW4sXG4gIFNjcmFwZU1hbmFnZXI6IHNlX3NjcmFwZXIuU2NyYXBlTWFuYWdlcixcbiAgU2NyYXBlcjogU2NyYXBlcixcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIFVzZSBUeXBlU2NyaXB0IG1vZHVsZXMgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU3NTg1ODQvY2Fubm90LXJlZGVjbGFyZS1ibG9jay1zY29wZWQtdmFyaWFibGVcbmV4cG9ydCB7fTtcbmNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3Qgb3MgPSByZXF1aXJlKFwib3NcIik7XG5jb25zdCBfID0gcmVxdWlyZShcImxvZGFzaFwiKTtcbmNvbnN0IHsgY3JlYXRlTG9nZ2VyLCBmb3JtYXQsIHRyYW5zcG9ydHMgfSA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpO1xuY29uc3QgeyBjb21iaW5lLCB0aW1lc3RhbXAsIHByaW50ZiB9ID0gZm9ybWF0O1xuY29uc3QgZGVidWcgPSByZXF1aXJlKFwiZGVidWdcIikoXCJzZS1zY3JhcGVyOlNjcmFwZU1hbmFnZXJcIik7XG5jb25zdCB7IENsdXN0ZXIgfSA9IHJlcXVpcmUoXCJwdXBwZXRlZXItY2x1c3RlclwiKTtcbmNvbnN0IHZhbmlsbGFQdXBwZXRlZXIgPSByZXF1aXJlKFwicHVwcGV0ZWVyXCIpO1xuY29uc3QgeyBhZGRFeHRyYSB9ID0gcmVxdWlyZShcInB1cHBldGVlci1leHRyYVwiKTtcbi8vIGNvbnN0IFN0ZWFsdGggPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhLXBsdWdpbi1zdGVhbHRoXCIpO1xuLy8gY29uc3QgQWRibG9ja2VyUGx1Z2luID0gcmVxdWlyZShcInB1cHBldGVlci1leHRyYS1wbHVnaW4tYWRibG9ja2VyXCIpO1xuXG5jb25zdCBVc2VyQWdlbnQgPSByZXF1aXJlKFwidXNlci1hZ2VudHNcIik7XG5jb25zdCBmYWNlYm9vayA9IHJlcXVpcmUoXCIuL21vZHVsZXMvZmFjZWJvb2tfc2NyYXBlci5qc1wiKTtcbmNvbnN0IHlvdXR1YmUgPSByZXF1aXJlKFwiLi9tb2R1bGVzL3lvdXR1YmVfc2NyYXBlci5qc1wiKTtcbmNvbnN0IGJpbGliaWxpID0gcmVxdWlyZShcIi4vbW9kdWxlcy9iaWxpYmlsaV9zY3JhcGVyLmpzXCIpO1xuLy8gY29uc3QgYmluZyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9iaW5nLmpzJyk7XG4vLyBjb25zdCB5YW5kZXggPSByZXF1aXJlKCcuL21vZHVsZXMveWFuZGV4LmpzJyk7XG4vLyBjb25zdCBpbmZvc3BhY2UgPSByZXF1aXJlKCcuL21vZHVsZXMvaW5mb3NwYWNlLmpzJyk7XG4vLyBjb25zdCBkdWNrZHVja2dvID0gcmVxdWlyZSgnLi9tb2R1bGVzL2R1Y2tkdWNrZ28uanMnKTtcbmNvbnN0IEN1c3RvbUNvbmN1cnJlbmN5SW1wbCA9IHJlcXVpcmUoXCIuL2NvbmN1cnJlbmN5LWltcGxlbWVudGF0aW9uXCIpO1xuLy8gY29uc3QgYXhpb3MgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5jb25zdCBNQVhfQUxMT1dFRF9CUk9XU0VSUyA9IDY7XG4vLyBjb25zdCBwdXBwZXRlZXIgPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhXCIpO1xuLy8gY29uc3QgX1N0ZWFsdGhQbHVnaW4gPSByZXF1aXJlKCdwdXBwZXRlZXItZXh0cmEtcGx1Z2luLXN0ZWFsdGgnKTtcbi8vIGNvbnN0IF9BZGJsb2NrZXJQbHVnaW4gPSByZXF1aXJlKCdwdXBwZXRlZXItZXh0cmEtcGx1Z2luLWFkYmxvY2tlcicpO1xuXG5mdW5jdGlvbiB3cml0ZV9yZXN1bHRzKGZuYW1lLCBkYXRhKSB7XG4gIGZzLndyaXRlRmlsZVN5bmMoZm5hbWUsIGRhdGEsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gICAgY29uc29sZS5sb2coYFJlc3VsdHMgd3JpdHRlbiB0byBmaWxlICR7Zm5hbWV9YCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWFkX2tleXdvcmRzX2Zyb21fZmlsZShmbmFtZSkge1xuICBsZXQga3dzID0gZnMucmVhZEZpbGVTeW5jKGZuYW1lKS50b1N0cmluZygpLnNwbGl0KG9zLkVPTCk7XG4gIC8vIGNsZWFuIGtleXdvcmRzXG4gIGt3cyA9IGt3cy5maWx0ZXIoKGt3KSA9PiB7XG4gICAgcmV0dXJuIGt3LnRyaW0oKS5sZW5ndGggPiAwO1xuICB9KTtcbiAgcmV0dXJuIGt3cztcbn1cblxuXG5mdW5jdGlvbiBnZXRTY3JhcGVyKHNlYXJjaF9lbmdpbmU6c3RyaW5nLCBhcmdzOmFueSkge1xuICBpZiAodHlwZW9mIHNlYXJjaF9lbmdpbmUgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gbmV3IHtcbiAgICAgIGZhY2Vib29rOiBmYWNlYm9vay5GYWNlYm9va1NjcmFwZXIsXG4gICAgICB5b3V0dWJlOiB5b3V0dWJlLllvdXR1YmVTY3JhcGVyLFxuICAgICAgYmlsaWJpbGk6IGJpbGliaWxpLkJpbGliaWxpU2NyYXBlcixcbiAgICB9W3NlYXJjaF9lbmdpbmVdKGFyZ3MpO1xuICB9IFxuICAvLyBlbHNlIGlmICh0eXBlb2Ygc2VhcmNoX2VuZ2luZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gIC8vICAgcmV0dXJuIG5ldyBzZWFyY2hfZW5naW5lKGFyZ3MpO1xuICAvLyB9IFxuICBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgc29jaWFsIHBsYXRmb3JtIG11c3QgZWl0aGVyIGJlIGEgc3RyaW5nIG9mIGNsYXNzIChmdW5jdGlvbilgXG4gICAgKTtcbiAgfVxufVxudHlwZSBTTWNvbmZpZyA9e1xuICBsb2dnZXI6e2luZm86RnVuY3Rpb259O1xuICBrZXl3b3JkczpBcnJheTxzdHJpbmc+O1xuICBwcm94aWVzOkFycmF5PHN0cmluZz47XG4gIGtleXdvcmRfZmlsZTpzdHJpbmc7XG4gIHByb3h5X2ZpbGU6c3RyaW5nO1xuICB1c2VfcHJveGllc19vbmx5OmJvb2xlYW47XG4gIGN1c3RvbV9mdW5jOnN0cmluZztcbiAgY2hyb21lX2ZsYWdzOkFycmF5PHN0cmluZz47XG4gIHB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZzp7XG4gICAgbWF4Q29uY3VycmVuY3k6bnVtYmVyO1xuICAgIG1vbml0b3I6Ym9vbGVhbjtcbiAgICB0aW1lb3V0Om51bWJlcjtcbiAgfVxuICByYW5kb21fdXNlcl9hZ2VudDpib29sZWFuO1xuICB1c2VyX2FnZW50OnN0cmluZztcbiAgaGVhZGxlc3M6Ym9vbGVhbjtcbiAgcGxhdGZvcm06c3RyaW5nO1xufVxuY2xhc3MgU2NyYXBlTWFuYWdlciB7XG4gIGNsdXN0ZXI6e2V4ZWN1dGU6RnVuY3Rpb247aWRsZTpGdW5jdGlvbjtjbG9zZTpGdW5jdGlvbn07XG4gIHBsdWdnYWJsZTp7c3RhcnRfYnJvd3Nlcj86RnVuY3Rpb24sY2xvc2VfYnJvd3Nlcj86RnVuY3Rpb24saGFuZGxlX3Jlc3VsdHM/OkZ1bmN0aW9uLGhhbmRsZV9tZXRhZGF0YT86RnVuY3Rpb259O1xuICBzY3JhcGVyOntydW5Mb2dpbjpGdW5jdGlvbjt3b3JrZXJzZWFyY2hkYXRhOkZ1bmN0aW9ufTtcbiAgY29udGV4dDpvYmplY3Q7XG4gIGNvbmZpZzpTTWNvbmZpZztcbiAgbG9nZ2VyOntpbmZvOkZ1bmN0aW9ufTtcbiAgYnJvd3Nlcjp7bmV3UGFnZTpGdW5jdGlvbn07XG4gIHBhZ2U6b2JqZWN0O1xuICBudW1DbHVzdGVyczpudW1iZXI7XG4gIHRtcHBhdGg6c3RyaW5nO1xuICBydW5Mb2dpbjpGdW5jdGlvbjtcbiAgY29uc3RydWN0b3IoY29uZmlnLCBjb250ZXh0ID0ge30pIHtcbiAgICB0aGlzLmNsdXN0ZXIgPSBudWxsO1xuICAgIHRoaXMucGx1Z2dhYmxlID0gbnVsbDtcbiAgICB0aGlzLnNjcmFwZXIgPSBudWxsO1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgXG4gICAgLy8gYXdhaXQgdGhpcy5nZXRSZW1vdGVDb25maWcoY2FtcGFpZ25JZClcblxuICAgIHRoaXMuY29uZmlnID0gXy5kZWZhdWx0cyhjb25maWcsIHtcbiAgICAgIC8vIHJlbW90ZV9hZGQ6ZW5kY29maWcuUkVNT1RFQURELFxuICAgICAgLy8gcmVtb3RlX3VzZXJuYW1lOmVuZGNvZmlnLlVTRVJOQU1FLFxuICAgICAgLy8gcmVtb3RlX3Bhc3N3b3JkOmVuZGNvZmlnLlBBU1NXT1JELFxuICAgICAgLy8gdGhlIHVzZXIgYWdlbnQgdG8gc2NyYXBlIHdpdGhcbiAgICAgIHVzZXJfYWdlbnQ6XG4gICAgICAgIFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwNy4wLjAuMCBTYWZhcmkvNTM3LjM2XCIsXG4gICAgICAvLyBpZiByYW5kb21fdXNlcl9hZ2VudCBpcyBzZXQgdG8gVHJ1ZSwgYSByYW5kb20gdXNlciBhZ2VudCBpcyBjaG9zZW5cbiAgICAgIHJhbmRvbV91c2VyX2FnZW50OiBmYWxzZSxcbiAgICAgIC8vIHdoZXRoZXIgdG8gc2VsZWN0IG1hbnVhbCBzZXR0aW5ncyBpbiB2aXNpYmxlIG1vZGVcbiAgICAgIHNldF9tYW51YWxfc2V0dGluZ3M6IGZhbHNlLFxuICAgICAgLy8gbG9nIGlwIGFkZHJlc3MgZGF0YVxuICAgICAgbG9nX2lwX2FkZHJlc3M6IGZhbHNlLFxuICAgICAgLy8gbG9nIGh0dHAgaGVhZGVyc1xuICAgICAgbG9nX2h0dHBfaGVhZGVyczogZmFsc2UsXG4gICAgICAvLyBob3cgbG9uZyB0byBzbGVlcCBiZXR3ZWVuIHJlcXVlc3RzLiBhIHJhbmRvbSBzbGVlcCBpbnRlcnZhbCB3aXRoaW4gdGhlIHJhbmdlIFthLGJdXG4gICAgICAvLyBpcyBkcmF3biBiZWZvcmUgZXZlcnkgcmVxdWVzdC4gZW1wdHkgc3RyaW5nIGZvciBubyBzbGVlcGluZy5cbiAgICAgIHNsZWVwX3JhbmdlOiBudWxsLFxuXG4gICAgICBsb2dnZXI6IGNyZWF0ZUxvZ2dlcih7XG4gICAgICAgIGxldmVsOiBcImluZm9cIixcbiAgICAgICAgZm9ybWF0OiBjb21iaW5lKFxuICAgICAgICAgIHRpbWVzdGFtcCgpLFxuICAgICAgICAgIHByaW50ZigoeyBsZXZlbCwgbWVzc2FnZSwgdGltZXN0YW1wIH0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aW1lc3RhbXB9IFske2xldmVsfV0gJHttZXNzYWdlfWA7XG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgICAgdHJhbnNwb3J0czogW25ldyB0cmFuc3BvcnRzLkNvbnNvbGUoKV0sXG4gICAgICB9KSxcbiAgICAgIHBsYXRmb3JtOiBcImZhY2Vib29rXCIsXG4gICAgICBrZXl3b3JkczogW1wibm9kZWpzIHJvY2tzXCJdLFxuICAgICAgLy8gd2hldGhlciB0byBzdGFydCB0aGUgYnJvd3NlciBpbiBoZWFkbGVzcyBtb2RlXG4gICAgICBoZWFkbGVzczogdHJ1ZSxcbiAgICAgIC8vIHNwZWNpZnkgZmxhZ3MgcGFzc2VkIHRvIGNocm9tZSBoZXJlXG4gICAgICAvLyBBYm91dCBvdXIgZGVmYXVsdHMgdmFsdWVzIGh0dHBzOi8vcGV0ZXIuc2gvZXhwZXJpbWVudHMvY2hyb21pdW0tY29tbWFuZC1saW5lLXN3aXRjaGVzL1xuICAgICAgY2hyb21lX2ZsYWdzOiBbXG4gICAgICAgIFwiLS1kaXNhYmxlLWluZm9iYXJzXCIsXG4gICAgICAgIFwiLS13aW5kb3ctcG9zaXRpb249MCwwXCIsXG4gICAgICAgIFwiLS1pZ25vcmUtY2VydGlmY2F0ZS1lcnJvcnNcIixcbiAgICAgICAgXCItLWlnbm9yZS1jZXJ0aWZjYXRlLWVycm9ycy1zcGtpLWxpc3RcIixcbiAgICAgICAgXCItLW5vLXNhbmRib3hcIixcbiAgICAgICAgXCItLWRpc2FibGUtc2V0dWlkLXNhbmRib3hcIixcbiAgICAgICAgXCItLWRpc2FibGUtZGV2LXNobS11c2FnZVwiLFxuICAgICAgICBcIi0tZGlzYWJsZS1hY2NlbGVyYXRlZC0yZC1jYW52YXNcIixcbiAgICAgICAgXCItLWRpc2FibGUtZ3B1XCIsXG4gICAgICAgIFwiLS13aW5kb3ctc2l6ZT0xMjgwLDc2OFwiLFxuICAgICAgICBcIi0tc3RhcnQtZnVsbHNjcmVlblwiLFxuICAgICAgICBcIi0taGlkZS1zY3JvbGxiYXJzXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLW5vdGlmaWNhdGlvbnNcIixcbiAgICAgIF0sXG4gICAgICAvL2ZpeCBnb29nbGUgYWNjb3VudCBjYW4gbm90IGxvZ2luXG4gICAgICBpZ25vcmVEZWZhdWx0QXJnczogW1xuICAgICAgICBcIi0tZW5hYmxlLWF1dG9tYXRpb25cIixcbiAgICAgICAgXCItLWRpc2FibGUtZXh0ZW5zaW9uc1wiLFxuICAgICAgICBcIi0tZGlzYWJsZS1kZWZhdWx0LWFwcHNcIixcbiAgICAgICAgXCItLWRpc2FibGUtY29tcG9uZW50LWV4dGVuc2lvbnMtd2l0aC1iYWNrZ3JvdW5kLXBhZ2VzXCIsXG4gICAgICBdLFxuICAgICAgLy8gdGhlIG51bWJlciBvZiBwYWdlcyB0byBzY3JhcGUgZm9yIGVhY2gga2V5d29yZFxuICAgICAgbnVtX3BhZ2VzOiAxLFxuICAgICAgLy8gcGF0aCB0byBvdXRwdXQgZmlsZSwgZGF0YSB3aWxsIGJlIHN0b3JlZCBpbiBKU09OXG4gICAgICBvdXRwdXRfZmlsZTogXCJcIixcbiAgICAgIC8vIHdoZXRoZXIgdG8gYWxzbyBwYXNzdGhydSBhbGwgdGhlIGh0bWwgb3V0cHV0IG9mIHRoZSBzZXJwIHBhZ2VzXG4gICAgICBodG1sX291dHB1dDogZmFsc2UsXG4gICAgICAvLyB3aGV0aGVyIHRvIHN0cmlwIEpTIGFuZCBDU1MgZnJvbSB0aGUgaHRtbF9vdXRwdXRcbiAgICAgIC8vIGhhcyBvbmx5IGFuIGVmZmVjdCBpZiBgaHRtbF9vdXRwdXRgIGlzIHRydWVcbiAgICAgIGNsZWFuX2h0bWxfb3V0cHV0OiB0cnVlLFxuICAgICAgLy8gcmVtb3ZlIGFsbCBkYXRhIGltYWdlcyBmcm9tIHRoZSBodG1sXG4gICAgICBjbGVhbl9kYXRhX2ltYWdlczogdHJ1ZSxcbiAgICAgIC8vIHdoZXRoZXIgdG8gcmV0dXJuIGEgc2NyZWVuc2hvdCBvZiBzZXJwIHBhZ2VzIGFzIGI2NCBkYXRhXG4gICAgICBzY3JlZW5fb3V0cHV0OiBmYWxzZSxcbiAgICAgIC8vIFNjcmFwZSB1cmwgZnJvbSBsb2NhbCBmaWxlLiBNYWlubHkgdXNlZCBmb3IgdGVzdGluZy5cbiAgICAgIHNjcmFwZV9mcm9tX2ZpbGU6IFwiXCIsXG4gICAgICAvLyB3aGV0aGVyIHRvIHByZXZlbnQgaW1hZ2VzLCBjc3MsIGZvbnRzIGFuZCBtZWRpYSBmcm9tIGJlaW5nIGxvYWRlZFxuICAgICAgLy8gd2lsbCBzcGVlZCB1cCBzY3JhcGluZyBhIGdyZWF0IGRlYWxcbiAgICAgIGJsb2NrX2Fzc2V0czogdHJ1ZSxcbiAgICAgIC8vIHBhdGggdG8ganMgbW9kdWxlIHRoYXQgZXh0ZW5kcyBmdW5jdGlvbmFsaXR5XG4gICAgICAvLyB0aGlzIG1vZHVsZSBzaG91bGQgZXhwb3J0IHRoZSBmdW5jdGlvbnM6XG4gICAgICAvLyBnZXRfYnJvd3NlciwgaGFuZGxlX21ldGFkYXRhLCBjbG9zZV9icm93c2VyXG4gICAgICAvL2N1c3RvbV9mdW5jOiByZXNvbHZlKCdleGFtcGxlcy9wbHVnZ2FibGUuanMnKSxcbiAgICAgIGN1c3RvbV9mdW5jOiBudWxsLFxuICAgICAgdGhyb3dfb25fZGV0ZWN0aW9uOiBmYWxzZSxcbiAgICAgIC8vIExpc3Qgb2YgcHJveGllcyB0byB1c2UgWydzb2NrczU6Ly83OC45NC4xNzIuNDI6MTA4MCcsICdodHRwOi8vbG9jYWxob3N0OjEwODAnXVxuICAgICAgcHJveGllczogbnVsbCxcbiAgICAgIC8vIGEgZmlsZSB3aXRoIG9uZSBwcm94eSBwZXIgbGluZS4gRXhhbXBsZTpcbiAgICAgIC8vIHNvY2tzNTovLzc4Ljk0LjE3Mi40MjoxMDgwXG4gICAgICAvLyBodHRwOi8vMTE4LjE3NC4yMzMuMTA6NDg0MDBcbiAgICAgIHByb3h5X2ZpbGU6IFwiXCIsXG4gICAgICAvLyB3aGV0aGVyIHRvIHVzZSBwcm94aWVzIG9ubHlcbiAgICAgIC8vIHdoZW4gdGhpcyBpcyBzZXQgdG8gdHJ1ZSwgc2Utc2NyYXBlciB3aWxsIG5vdCB1c2VcbiAgICAgIC8vIHlvdXIgZGVmYXVsdCBJUCBhZGRyZXNzXG4gICAgICB1c2VfcHJveGllc19vbmx5OiBmYWxzZSxcbiAgICAgIC8vIGNoZWNrIGlmIGhlYWRsZXNzIGNocm9tZSBlc2NhcGVzIGNvbW1vbiBkZXRlY3Rpb24gdGVjaG5pcXVlc1xuICAgICAgLy8gdGhpcyBpcyBhIHF1aWNrIHRlc3QgYW5kIHNob3VsZCBiZSB1c2VkIGZvciBkZWJ1Z2dpbmdcbiAgICAgIHRlc3RfZXZhc2lvbjogZmFsc2UsXG4gICAgICBhcHBseV9ldmFzaW9uX3RlY2huaXF1ZXM6IHRydWUsXG4gICAgICAvLyBzZXR0aW5ncyBmb3IgcHVwcGV0ZWVyLWNsdXN0ZXJcbiAgICAgIHB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZzoge1xuICAgICAgICB0aW1lb3V0OiAzMCAqIDYwICogMTAwMCwgLy8gbWF4IHRpbWVvdXQgc2V0IHRvIDMwIG1pbnV0ZXNcbiAgICAgICAgbW9uaXRvcjogZmFsc2UsXG4gICAgICAgIGNvbmN1cnJlbmN5OiBDbHVzdGVyLkNPTkNVUlJFTkNZX0JST1dTRVIsXG4gICAgICAgIG1heENvbmN1cnJlbmN5OiAxLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBcbiAgICB0aGlzLmxvZ2dlciA9IHRoaXMuY29uZmlnLmxvZ2dlcjtcblxuICAgIGlmIChjb25maWcuc2xlZXBfcmFuZ2UpIHtcbiAgICAgIC8vIHBhcnNlIGFuIGFycmF5XG4gICAgICBjb25maWcuc2xlZXBfcmFuZ2UgPSBldmFsKGNvbmZpZy5zbGVlcF9yYW5nZSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgY29uZmlnLnNsZWVwX3JhbmdlLmxlbmd0aCAhPT0gMiBcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBcInNsZWVwX3JhbmdlIGlzIG5vdCBhIHZhbGlkIGFycmF5IG9mIHR3byBpbnRlZ2Vycy5cIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZnMuZXhpc3RzU3luYyh0aGlzLmNvbmZpZy5rZXl3b3JkX2ZpbGUpKSB7XG4gICAgICB0aGlzLmNvbmZpZy5rZXl3b3JkcyA9IHJlYWRfa2V5d29yZHNfZnJvbV9maWxlKHRoaXMuY29uZmlnLmtleXdvcmRfZmlsZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLnByb3hpZXMgJiYgdGhpcy5jb25maWcucHJveHlfZmlsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkVpdGhlciB1c2UgYSBwcm94eV9maWxlIG9yIHNwZWNpZnkgYSBwcm94eSBmb3IgYWxsIGNvbm5lY3Rpb25zLiBEbyBub3QgdXNlIGJvdGggb3B0aW9ucy5cIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcucHJveHlfZmlsZSkge1xuICAgICAgdGhpcy5jb25maWcucHJveGllcyA9IHJlYWRfa2V5d29yZHNfZnJvbV9maWxlKHRoaXMuY29uZmlnLnByb3h5X2ZpbGUpO1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgJHt0aGlzLmNvbmZpZy5wcm94aWVzLmxlbmd0aH0gcHJveGllcyByZWFkIGZyb20gZmlsZS5gKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY29uZmlnLnByb3hpZXMgJiYgdGhpcy5jb25maWcudXNlX3Byb3hpZXNfb25seSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIk11c3QgcHJvdmlkZSBhdCBsZWFzdCBvbmUgcHJveHkgaW4gcHJveGllcyBpZiB5b3UgZW5hYmxlIHVzZV9wcm94aWVzX29ubHlcIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBkZWJ1ZyhcInRoaXMuY29uZmlnPSVPXCIsIHRoaXMuY29uZmlnKTtcbiAgfVxuXG4gIC8qXG4gICAqIExhdW5jaGVzIHRoZSBwdXBwZXRlZXIgY2x1c3RlciBvciBicm93c2VyLlxuICAgKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGJyb3dzZXIgd2FzIHN1Y2Nlc3NmdWxseSBsYXVuY2hlZC4gT3RoZXJ3aXNlIHdpbGwgcmV0dXJuIGZhbHNlLlxuICAgKi9cbiAgYXN5bmMgc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmN1c3RvbV9mdW5jKSB7XG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyh0aGlzLmNvbmZpZy5jdXN0b21fZnVuYykpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBQbHVnZ2FibGVDbGFzcyA9IHJlcXVpcmUodGhpcy5jb25maWcuY3VzdG9tX2Z1bmMpO1xuICAgICAgICAgIHRoaXMucGx1Z2dhYmxlID0gbmV3IFBsdWdnYWJsZUNsYXNzKHtcbiAgICAgICAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXhjZXB0aW9uKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEZpbGUgXCIke3RoaXMuY29uZmlnLmN1c3RvbV9mdW5jfVwiIGRvZXMgbm90IGV4aXN0IWApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2hyb21lX2ZsYWdzID0gXy5jbG9uZSh0aGlzLmNvbmZpZy5jaHJvbWVfZmxhZ3MpO1xuXG4gICAgaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLnN0YXJ0X2Jyb3dzZXIpIHtcbiAgICAgIC8vIGxhdW5jaF9hcmdzLmNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgdGhpcy5icm93c2VyID0gYXdhaXQgdGhpcy5wbHVnZ2FibGUuc3RhcnRfYnJvd3Nlcih7XG4gICAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICB9KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiMjI5XCIpXG4gICAgICB0aGlzLnBhZ2UgPSBhd2FpdCB0aGlzLmJyb3dzZXIubmV3UGFnZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBcbiAgICAgIC8vIGlmIG5vIGN1c3RvbSBzdGFydF9icm93c2VyIGZ1bmN0aW9uYWxpdHkgd2FzIGdpdmVuXG4gICAgICAvLyB1c2UgcHVwcGV0ZWVyLWNsdXN0ZXIgZm9yIHNjcmFwaW5nXG5cbiAgICAgIGxldCBwcm94aWVzO1xuICAgICAgLy8gaWYgd2UgaGF2ZSBhdCBsZWFzdCBvbmUgcHJveHksIGFsd2F5cyB1c2UgQ09OQ1VSUkVOQ1lfQlJPV1NFUlxuICAgICAgLy8gYW5kIHNldCBtYXhDb25jdXJyZW5jeSB0byB0aGlzLmNvbmZpZy5wcm94aWVzLmxlbmd0aCArIDFcbiAgICAgIC8vIGVsc2UgdXNlIHdoYXRldmVyIHRoaXMuY29uZmlndXJhdGlvbiB3YXMgcGFzc2VkXG4gICAgICBpZiAodGhpcy5jb25maWcucHJveGllcyAmJiB0aGlzLmNvbmZpZy5wcm94aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gYmVjYXVzZSB3ZSB1c2UgcmVhbCBicm93c2Vycywgd2UgcmFuIG91dCBvZiBtZW1vcnkgb24gbm9ybWFsIGxhcHRvcHNcbiAgICAgICAgLy8gd2hlbiB1c2luZyBtb3JlIHRoYW4gbWF5YmUgNSBvciA2IGJyb3dzZXJzLlxuICAgICAgICAvLyB0aGVyZWZvcmUgaGFyZGNvZGUgYSBsaW1pdCBoZXJlXG4gICAgICAgIC8vIFRPRE8gbm90IHN1cmUgdGhpcyB3aGF0IHdlIHdhbnRcbiAgICAgICAgdGhpcy5udW1DbHVzdGVycyA9IE1hdGgubWluKFxuICAgICAgICAgIHRoaXMuY29uZmlnLnByb3hpZXMubGVuZ3RoICsgKHRoaXMuY29uZmlnLnVzZV9wcm94aWVzX29ubHkgPyAwIDogMSksXG4gICAgICAgICAgTUFYX0FMTE9XRURfQlJPV1NFUlNcbiAgICAgICAgKTtcbiAgICAgICAgcHJveGllcyA9IF8uY2xvbmUodGhpcy5jb25maWcucHJveGllcyk7XG5cbiAgICAgICAgLy8gSW5zZXJ0IGEgZmlyc3QgY29uZmlnIHdpdGhvdXQgcHJveHkgaWYgdXNlX3Byb3h5X29ubHkgaXMgZmFsc2VcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnVzZV9wcm94aWVzX29ubHkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcHJveGllcy51bnNoaWZ0KG51bGwpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm51bUNsdXN0ZXJzID0gdGhpcy5jb25maWcucHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnLm1heENvbmN1cnJlbmN5O1xuICAgICAgICBwcm94aWVzID0gXy50aW1lcyh0aGlzLm51bUNsdXN0ZXJzLCBudWxsKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgVXNpbmcgJHt0aGlzLm51bUNsdXN0ZXJzfSBjbHVzdGVycy5gKTtcblxuICAgICAgLy8gR2l2ZSB0aGUgcGVyIGJyb3dzZXIgb3B0aW9uc1xuICAgICAgY29uc3QgcGVyQnJvd3Nlck9wdGlvbnMgPSBfLm1hcChwcm94aWVzLCAocHJveHkpID0+IHtcbiAgICAgICAgY29uc3QgdXNlckFnZW50ID0gdGhpcy5jb25maWcucmFuZG9tX3VzZXJfYWdlbnRcbiAgICAgICAgICA/IG5ldyBVc2VyQWdlbnQoeyBkZXZpY2VDYXRlZ29yeTogXCJkZXNrdG9wXCIgfSkudG9TdHJpbmcoKVxuICAgICAgICAgIDogdGhpcy5jb25maWcudXNlcl9hZ2VudDtcbiAgICAgICAgbGV0IGFyZ3MgPSBjaHJvbWVfZmxhZ3MuY29uY2F0KFtgLS11c2VyLWFnZW50PSR7dXNlckFnZW50fWBdKTtcblxuICAgICAgICBpZiAocHJveHkpIHtcbiAgICAgICAgICBhcmdzID0gYXJncy5jb25jYXQoW2AtLXByb3h5LXNlcnZlcj0ke3Byb3h5fWBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaGVhZGxlc3M6IHRoaXMuY29uZmlnLmhlYWRsZXNzLFxuICAgICAgICAgIGlnbm9yZUhUVFBTRXJyb3JzOiB0cnVlLFxuICAgICAgICAgIGFyZ3MsXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgZGVidWcoXCJwZXJCcm93c2VyT3B0aW9ucz0lT1wiLCBwZXJCcm93c2VyT3B0aW9ucyk7XG5cbiAgICAgIC8vIHB1cHBldGVlci51c2UoX1N0ZWFsdGhQbHVnaW4oKSk7XG4gICAgICAvLyBwdXBwZXRlZXIudXNlKF9BZGJsb2NrZXJQbHVnaW4oKSk7XG5cbiAgICAgIGNvbnN0IHB1cHBldGVlciA9IGFkZEV4dHJhKHZhbmlsbGFQdXBwZXRlZXIpO1xuXG4gICAgICAvLyBBZGQgc3RlYWx0aCBwbHVnaW4gYW5kIHVzZSBkZWZhdWx0cyAoYWxsIHRyaWNrcyB0byBoaWRlIHB1cHBldGVlciB1c2FnZSlcbiAgICAgIC8vICBwdXBwZXRlZXIudXNlKFN0ZWFsdGgoKSk7XG5cbiAgICAgIC8vIEFkZCBhZGJsb2NrZXIgcGx1Z2luIHRvIGJsb2NrIGFsbCBhZHMgYW5kIHRyYWNrZXJzIChzYXZlcyBiYW5kd2lkdGgpXG4gICAgICAvLyBwdXBwZXRlZXIudXNlKEFkYmxvY2tlclBsdWdpbih7IGJsb2NrVHJhY2tlcnM6IHRydWUgfSkpO1xuXG4gICAgICB0aGlzLmNsdXN0ZXIgPSBhd2FpdCBDbHVzdGVyLmxhdW5jaCh7XG4gICAgICAgIHB1cHBldGVlcixcbiAgICAgICAgbW9uaXRvcjogdGhpcy5jb25maWcucHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnLm1vbml0b3IsXG4gICAgICAgIHRpbWVvdXQ6IHRoaXMuY29uZmlnLnB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZy50aW1lb3V0LCAvLyBtYXggdGltZW91dCBzZXQgdG8gMzAgbWludXRlc1xuICAgICAgICBjb25jdXJyZW5jeTogQ3VzdG9tQ29uY3VycmVuY3lJbXBsLFxuICAgICAgICBtYXhDb25jdXJyZW5jeTogdGhpcy5udW1DbHVzdGVycyxcbiAgICAgICAgcHVwcGV0ZWVyT3B0aW9uczoge1xuICAgICAgICAgIC8vIHB1cHBldGVlcjpwdXBwZXRlZXIsXG4gICAgICAgICAgcGVyQnJvd3Nlck9wdGlvbnM6IHBlckJyb3dzZXJPcHRpb25zLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogbG9naW4gdGhlIHNvY2lsYSBtZWRpYSBwbGF0Zm9ybVxuICAgKi9cbiAgYXN5bmMgbG9naW4oc2NyYXBlX2NvbmZpZyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgc2NyYXBlX2NvbmZpZyk7XG5cbiAgICAvLyB2YXIgcmVzdWx0cyA9IHt9O1xuICAgIC8vIHZhciBudW1fcmVxdWVzdHMgPSAwO1xuICAgIC8vIHZhciBtZXRhZGF0YSA9IHt9O1xuICAgIC8vIHZhciBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLnN0YXJ0X2Jyb3dzZXIpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29uZmlnLnBsYXRmb3JtKVxuICAgICAgdGhpcy5zY3JhcGVyID0gZ2V0U2NyYXBlcih0aGlzLmNvbmZpZy5wbGF0Zm9ybSwge1xuICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXG4gICAgICAgIHBsdWdnYWJsZTogdGhpcy5wbHVnZ2FibGUsXG4gICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgICAgdG1wcGF0aDogdGhpcy50bXBwYXRoLFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMuc2NyYXBlci5ydW5Mb2dpbih0aGlzLnBhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBFYWNoIGJyb3dzZXIgd2lsbCBnZXQgTi8oSysxKSBrZXl3b3JkcyBhbmQgd2lsbCBpc3N1ZSBOLyhLKzEpICogTSB0b3RhbCByZXF1ZXN0cyB0byB0aGUgc2VhcmNoIGVuZ2luZS5cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvcHVwcGV0ZWVyL2lzc3Vlcy82NzhcbiAgICAgIC8vIFRoZSBxdWVzdGlvbiBpczogSXMgaXQgcG9zc2libGUgdG8gc2V0IHByb3hpZXMgcGVyIFBhZ2U/IFBlciBCcm93c2VyP1xuICAgICAgLy8gYXMgZmFyIGFzIEkgY2FuIHNlZSwgcHVwcGV0ZWVyIGNsdXN0ZXIgdXNlcyB0aGUgc2FtZSBwdXBwZXRlZXJPcHRpb25zXG4gICAgICAvLyBmb3IgZXZlcnkgYnJvd3NlciBpbnN0YW5jZS4gV2Ugd2lsbCB1c2Ugb3VyIGN1c3RvbSBwdXBwZXRlZXItY2x1c3RlciB2ZXJzaW9uLlxuICAgICAgLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvcHJveHktY2hhaW5cbiAgICAgIC8vIHRoaXMgYW5zd2VyIGxvb2tzIG5pY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvcHVwcGV0ZWVyL2lzc3Vlcy82NzgjaXNzdWVjb21tZW50LTM4OTA5NjA3N1xuICAgICAgbGV0IGNodW5rcyA9IFtdO1xuICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB0aGlzLm51bUNsdXN0ZXJzOyBuKyspIHtcbiAgICAgICAgY2h1bmtzLnB1c2goW10pO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmNvbmZpZy5rZXl3b3Jkcy5sZW5ndGg7IGsrKykge1xuICAgICAgICBjaHVua3NbayAlIHRoaXMubnVtQ2x1c3RlcnNdLnB1c2godGhpcy5jb25maWcua2V5d29yZHNba10pO1xuICAgICAgfVxuXG4gICAgICBkZWJ1ZyhcImNodW5rcz0lb1wiLCBjaHVua3MpO1xuXG4gICAgICBsZXQgZXhlY1Byb21pc2VzID0gW107XG4gICAgICBmb3IgKHZhciBjID0gMDsgYyA8IGNodW5rcy5sZW5ndGg7IGMrKykge1xuICAgICAgICBjb25zdCBjb25maWcgPSBfLmNsb25lKHRoaXMuY29uZmlnKTtcbiAgICAgICAgY29uZmlnLmtleXdvcmRzID0gY2h1bmtzW2NdO1xuXG4gICAgICAgIHZhciBvYmogPSBnZXRTY3JhcGVyKHRoaXMuY29uZmlnLnBsYXRmb3JtLCB7XG4gICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgY29udGV4dDoge30sXG4gICAgICAgICAgcGx1Z2dhYmxlOiB0aGlzLnBsdWdnYWJsZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGJvdW5kTWV0aG9kID0gb2JqLnJ1bkxvZ2luLmJpbmQob2JqKTtcbiAgICAgICAgZXhlY1Byb21pc2VzLnB1c2godGhpcy5jbHVzdGVyLmV4ZWN1dGUoe30sIGJvdW5kTWV0aG9kKSk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGV4ZWNQcm9taXNlcyk7XG5cbiAgICAgIC8vIE1lcmdlIHJlc3VsdHMgYW5kIG1ldGFkYXRhIHBlciBrZXl3b3JkXG4gICAgICAvLyBmb3IgKGxldCBwcm9taXNlUmV0dXJuIG9mIHByb21pc2VSZXR1cm5zKSB7XG4gICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHRzLCBwcm9taXNlUmV0dXJuLnJlc3VsdHMpO1xuICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24obWV0YWRhdGEsIHByb21pc2VSZXR1cm4ubWV0YWRhdGEpO1xuICAgICAgLy8gICAgIG51bV9yZXF1ZXN0cyArPSBwcm9taXNlUmV0dXJuLm51bV9yZXF1ZXN0cztcbiAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvLyBsZXQgdGltZURlbHRhID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAvLyBsZXQgbXNfcGVyX3JlcXVlc3QgPSB0aW1lRGVsdGEvbnVtX3JlcXVlc3RzO1xuXG4gICAgLy8gdGhpcy5sb2dnZXIuaW5mbyhgU2NyYXBlciB0b29rICR7dGltZURlbHRhfW1zIHRvIHBlcmZvcm0gJHtudW1fcmVxdWVzdHN9IHJlcXVlc3RzLmApO1xuICAgIC8vIHRoaXMubG9nZ2VyLmluZm8oYE9uIGF2ZXJhZ2UgbXMvcmVxdWVzdDogJHttc19wZXJfcmVxdWVzdH1tcy9yZXF1ZXN0YCk7XG5cbiAgICAvLyBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX3Jlc3VsdHMpIHtcbiAgICAvLyAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX3Jlc3VsdHMocmVzdWx0cyk7XG4gICAgLy8gfVxuXG4gICAgLy8gbWV0YWRhdGEuZWxhcHNlZF90aW1lID0gdGltZURlbHRhLnRvU3RyaW5nKCk7XG4gICAgLy8gbWV0YWRhdGEubXNfcGVyX2tleXdvcmQgPSBtc19wZXJfcmVxdWVzdC50b1N0cmluZygpO1xuICAgIC8vIG1ldGFkYXRhLm51bV9yZXF1ZXN0cyA9IG51bV9yZXF1ZXN0cztcblxuICAgIC8vIGRlYnVnKCdtZXRhZGF0YT0lTycsIG1ldGFkYXRhKTtcblxuICAgIC8vIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfbWV0YWRhdGEpIHtcbiAgICAvLyAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX21ldGFkYXRhKG1ldGFkYXRhKTtcbiAgICAvLyB9XG5cbiAgICAvLyBpZiAodGhpcy5jb25maWcub3V0cHV0X2ZpbGUpIHtcbiAgICAvLyAgICAgdGhpcy5sb2dnZXIuaW5mbyhgV3JpdGluZyByZXN1bHRzIHRvICR7dGhpcy5jb25maWcub3V0cHV0X2ZpbGV9YCk7XG4gICAgLy8gICAgIHdyaXRlX3Jlc3VsdHModGhpcy5jb25maWcub3V0cHV0X2ZpbGUsIEpTT04uc3RyaW5naWZ5KHJlc3VsdHMsIG51bGwsIDQpKTtcbiAgICAvLyB9XG5cbiAgICAvLyByZXR1cm4ge1xuICAgIC8vICAgICByZXN1bHRzOiByZXN1bHRzLFxuICAgIC8vICAgICBtZXRhZGF0YTogbWV0YWRhdGEgfHwge30sXG4gICAgLy8gfTtcbiAgfVxuXG4gIC8qXG4gICAqIGdldCBkYXRhIHVybCBmcm9tIHBsYXRmb3JtXG4gICAqL1xuICBhc3luYyBzZWFyY2hkYXRhKHNjcmFwZV9jb25maWcgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIHNjcmFwZV9jb25maWcpO1xuXG4gICAgaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLnN0YXJ0X2Jyb3dzZXIpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29uZmlnLnBsYXRmb3JtKVxuICAgICAgdGhpcy5zY3JhcGVyID0gZ2V0U2NyYXBlcih0aGlzLmNvbmZpZy5wbGF0Zm9ybSwge1xuICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXG4gICAgICAgIHBsdWdnYWJsZTogdGhpcy5wbHVnZ2FibGUsXG4gICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgICAgdG1wcGF0aDogdGhpcy50bXBwYXRoLFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMuc2NyYXBlci53b3JrZXJzZWFyY2hkYXRhKHRoaXMucGFnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEVhY2ggYnJvd3NlciB3aWxsIGdldCBOLyhLKzEpIGtleXdvcmRzIGFuZCB3aWxsIGlzc3VlIE4vKEsrMSkgKiBNIHRvdGFsIHJlcXVlc3RzIHRvIHRoZSBzZWFyY2ggZW5naW5lLlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9wdXBwZXRlZXIvaXNzdWVzLzY3OFxuICAgICAgLy8gVGhlIHF1ZXN0aW9uIGlzOiBJcyBpdCBwb3NzaWJsZSB0byBzZXQgcHJveGllcyBwZXIgUGFnZT8gUGVyIEJyb3dzZXI/XG4gICAgICAvLyBhcyBmYXIgYXMgSSBjYW4gc2VlLCBwdXBwZXRlZXIgY2x1c3RlciB1c2VzIHRoZSBzYW1lIHB1cHBldGVlck9wdGlvbnNcbiAgICAgIC8vIGZvciBldmVyeSBicm93c2VyIGluc3RhbmNlLiBXZSB3aWxsIHVzZSBvdXIgY3VzdG9tIHB1cHBldGVlci1jbHVzdGVyIHZlcnNpb24uXG4gICAgICAvLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9wcm94eS1jaGFpblxuICAgICAgLy8gdGhpcyBhbnN3ZXIgbG9va3MgbmljZTogaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9wdXBwZXRlZXIvaXNzdWVzLzY3OCNpc3N1ZWNvbW1lbnQtMzg5MDk2MDc3XG4gICAgICBsZXQgY2h1bmtzID0gW107XG4gICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHRoaXMubnVtQ2x1c3RlcnM7IG4rKykge1xuICAgICAgICBjaHVua3MucHVzaChbXSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuY29uZmlnLmtleXdvcmRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGNodW5rc1trICUgdGhpcy5udW1DbHVzdGVyc10ucHVzaCh0aGlzLmNvbmZpZy5rZXl3b3Jkc1trXSk7XG4gICAgICB9XG5cbiAgICAgIGRlYnVnKFwiY2h1bmtzPSVvXCIsIGNodW5rcyk7XG5cbiAgICAgIGxldCBleGVjUHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgY2h1bmtzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IF8uY2xvbmUodGhpcy5jb25maWcpO1xuICAgICAgICBjb25maWcua2V5d29yZHMgPSBjaHVua3NbY107XG5cbiAgICAgICAgdmFyIG9iaiA9IGdldFNjcmFwZXIodGhpcy5jb25maWcucGxhdGZvcm0sIHtcbiAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICBjb250ZXh0OiB7fSxcbiAgICAgICAgICBwbHVnZ2FibGU6IHRoaXMucGx1Z2dhYmxlLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgYm91bmRNZXRob2QgPSBvYmoud29ya2Vyc2VhcmNoZGF0YS5iaW5kKG9iaik7XG4gICAgICAgIGV4ZWNQcm9taXNlcy5wdXNoKHRoaXMuY2x1c3Rlci5leGVjdXRlKHt9LCBib3VuZE1ldGhvZCkpO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChleGVjUHJvbWlzZXMpO1xuXG4gICAgICAvLyBNZXJnZSByZXN1bHRzIGFuZCBtZXRhZGF0YSBwZXIga2V5d29yZFxuICAgICAgLy8gZm9yIChsZXQgcHJvbWlzZVJldHVybiBvZiBwcm9taXNlUmV0dXJucykge1xuICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0cywgcHJvbWlzZVJldHVybi5yZXN1bHRzKTtcbiAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKG1ldGFkYXRhLCBwcm9taXNlUmV0dXJuLm1ldGFkYXRhKTtcbiAgICAgIC8vICAgICBudW1fcmVxdWVzdHMgKz0gcHJvbWlzZVJldHVybi5udW1fcmVxdWVzdHM7XG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgLy8gbGV0IHRpbWVEZWx0YSA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XG4gICAgLy8gbGV0IG1zX3Blcl9yZXF1ZXN0ID0gdGltZURlbHRhL251bV9yZXF1ZXN0cztcblxuICAgIC8vIHRoaXMubG9nZ2VyLmluZm8oYFNjcmFwZXIgdG9vayAke3RpbWVEZWx0YX1tcyB0byBwZXJmb3JtICR7bnVtX3JlcXVlc3RzfSByZXF1ZXN0cy5gKTtcbiAgICAvLyB0aGlzLmxvZ2dlci5pbmZvKGBPbiBhdmVyYWdlIG1zL3JlcXVlc3Q6ICR7bXNfcGVyX3JlcXVlc3R9bXMvcmVxdWVzdGApO1xuXG4gICAgLy8gaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9yZXN1bHRzKSB7XG4gICAgLy8gICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9yZXN1bHRzKHJlc3VsdHMpO1xuICAgIC8vIH1cblxuICAgIC8vIG1ldGFkYXRhLmVsYXBzZWRfdGltZSA9IHRpbWVEZWx0YS50b1N0cmluZygpO1xuICAgIC8vIG1ldGFkYXRhLm1zX3Blcl9rZXl3b3JkID0gbXNfcGVyX3JlcXVlc3QudG9TdHJpbmcoKTtcbiAgICAvLyBtZXRhZGF0YS5udW1fcmVxdWVzdHMgPSBudW1fcmVxdWVzdHM7XG5cbiAgICAvLyBkZWJ1ZygnbWV0YWRhdGE9JU8nLCBtZXRhZGF0YSk7XG5cbiAgICAvLyBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX21ldGFkYXRhKSB7XG4gICAgLy8gICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9tZXRhZGF0YShtZXRhZGF0YSk7XG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKHRoaXMuY29uZmlnLm91dHB1dF9maWxlKSB7XG4gICAgLy8gICAgIHRoaXMubG9nZ2VyLmluZm8oYFdyaXRpbmcgcmVzdWx0cyB0byAke3RoaXMuY29uZmlnLm91dHB1dF9maWxlfWApO1xuICAgIC8vICAgICB3cml0ZV9yZXN1bHRzKHRoaXMuY29uZmlnLm91dHB1dF9maWxlLCBKU09OLnN0cmluZ2lmeShyZXN1bHRzLCBudWxsLCA0KSk7XG4gICAgLy8gfVxuXG4gICAgLy8gcmV0dXJuIHtcbiAgICAvLyAgICAgcmVzdWx0czogcmVzdWx0cyxcbiAgICAvLyAgICAgbWV0YWRhdGE6IG1ldGFkYXRhIHx8IHt9LFxuICAgIC8vIH07XG4gIH1cblxuICAvKlxuICAgKiBRdWl0IHRoZSBwdXBwZXRlZXIgY2x1c3Rlci9icm93c2VyLlxuICAgKi9cbiAgYXN5bmMgcXVpdCgpIHtcbiAgICBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuY2xvc2VfYnJvd3Nlcikge1xuICAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuY2xvc2VfYnJvd3NlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCB0aGlzLmNsdXN0ZXIuaWRsZSgpO1xuICAgICAgYXdhaXQgdGhpcy5jbHVzdGVyLmNsb3NlKCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTY3JhcGVNYW5hZ2VyOiBTY3JhcGVNYW5hZ2VyLFxufTtcbiIsImNvbnN0IHsgQnJvd3NlciB9ID0gcmVxdWlyZSgncHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC9jb25jdXJyZW5jeS9idWlsdEluQ29uY3VycmVuY3knKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc2Utc2NyYXBlcjpDdXN0b21Db25jdXJyZW5jeScpO1xuY29uc3QgeyB0aW1lb3V0RXhlY3V0ZSB9ID0gcmVxdWlyZSgncHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC91dGlsJyk7XG5cbmNvbnN0IEJST1dTRVJfVElNRU9VVCA9IDUwMDA7XG5cbmNsYXNzIEN1c3RvbUNvbmN1cnJlbmN5IGV4dGVuZHMgQnJvd3NlciB7XG5cbiAgICBhc3luYyBpbml0KCkge31cbiAgICBhc3luYyBjbG9zZSgpIHt9XG5cbiAgICBhc3luYyB3b3JrZXJJbnN0YW5jZSgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucy5wZXJCcm93c2VyT3B0aW9ucy5zaGlmdCgpO1xuICAgICAgICBkZWJ1ZygnTGF1bmNoIHB1cHBldGVlciBpbnN0YW5jZSB3aXRoIG9wdGlvbnM9JW8nLCBvcHRpb25zKTtcbiAgICAgICAgbGV0IGNocm9tZSA9IGF3YWl0IHRoaXMucHVwcGV0ZWVyLmxhdW5jaChvcHRpb25zKTtcbiAgICAgICAgbGV0IHBhZ2U7XG4gICAgICAgIGxldCBjb250ZXh0O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBqb2JJbnN0YW5jZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRpbWVvdXRFeGVjdXRlKEJST1dTRVJfVElNRU9VVCwgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IGF3YWl0IGNocm9tZS5jcmVhdGVJbmNvZ25pdG9Ccm93c2VyQ29udGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBwYWdlID0gYXdhaXQgY29udGV4dC5uZXdQYWdlKCk7XG4gICAgICAgICAgICAgICAgfSkoKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgY2xvc2U6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRpbWVvdXRFeGVjdXRlKEJST1dTRVJfVElNRU9VVCwgY29udGV4dC5jbG9zZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2xvc2U6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBjaHJvbWUuY2xvc2UoKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlcGFpcjogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdTdGFydGluZyByZXBhaXInKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIHByb2JhYmx5IGZhaWwsIGJ1dCBqdXN0IGluIGNhc2UgdGhlIHJlcGFpciB3YXMgbm90IG5lY2Vzc2FyeVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBjaHJvbWUuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgICAgICAgICAgLy8ganVzdCByZWxhdW5jaCBhcyB0aGVyZSBpcyBvbmx5IG9uZSBwYWdlIHBlciBicm93c2VyXG4gICAgICAgICAgICAgICAgY2hyb21lID0gYXdhaXQgdGhpcy5wdXBwZXRlZXIubGF1bmNoKG9wdGlvbnMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEN1c3RvbUNvbmN1cnJlbmN5OyIsImNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3QgY3J5cHRvID0gcmVxdWlyZShcImNyeXB0b1wiKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbmNvbnN0IGh0dHBzID0gcmVxdWlyZShcImh0dHBzXCIpO1xuY29uc3QgcHJvZ3Jlc3MgPSByZXF1aXJlKFwicHJvZ3Jlc3Mtc3RyZWFtXCIpO1xuXG5jbGFzcyBUYXNrIHtcblx0Y29uc3RydWN0b3IodXJsKSB7XG5cdFx0dGhpcy51cmwgPSB1cmw7XG5cdFx0dGhpcy5maW5pc2hlZCA9IGZhbHNlO1xuXHR9XG59XG5cbmNsYXNzIERvd25sb2FkZXIge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnR5cGUgPSBcIlwiO1xuXHRcdHRoaXMuaWQgPSBcIlwiO1xuXHRcdHRoaXMudXJsID0gXCJcIjtcblx0XHR0aGlzLmFpZCA9IC0xO1xuXHRcdHRoaXMucGlkID0gMTtcblx0XHR0aGlzLmNpZCA9IC0xO1xuXHRcdHRoaXMubmFtZSA9IFwiXCI7XG5cdFx0dGhpcy5saW5rcyA9IFtdO1xuXHRcdHRoaXMudGFza3MgPSBbXTtcblx0fVxuXG5cdGdldFZpZGVvVXJsKHZpZGVvVXJsKSB7XG5cdFx0dGhpcy51cmwgPSBcIlwiO1xuXHRcdGNvbnN0IG1hcHBpbmcgPSB7XG5cdFx0XHRcIkJWXCI6IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL3ZpZGVvL1wiLFxuXHRcdFx0XCJidlwiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS92aWRlby9cIixcblx0XHRcdFwiYXZcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vdmlkZW8vXCIsXG5cdFx0XHRcImVwXCI6IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL2Jhbmd1bWkvcGxheS9cIixcblx0XHRcdFwic3NcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vYmFuZ3VtaS9wbGF5L1wiXG5cdFx0fTtcblx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhtYXBwaW5nKSkge1xuXHRcdFx0aWYgKHZpZGVvVXJsLmluY2x1ZGVzKGtleSkpIHtcblx0XHRcdFx0dGhpcy50eXBlID0ga2V5O1xuXHRcdFx0XHR0aGlzLmlkID0ga2V5ICsgdmlkZW9Vcmwuc3BsaXQoa2V5KVsxXTtcblx0XHRcdFx0dGhpcy51cmwgPSB2YWx1ZSArIHRoaXMuaWQ7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFzeW5jIGdldEFpZCgpIHtcblx0XHRjb25zdCB7IHR5cGUsIHVybCB9ID0gdGhpcztcblx0XHRpZiAoIXVybCkgcmV0dXJuO1xuXHRcdHJldHVybiBmZXRjaCh1cmwpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG5cdFx0XHQudGhlbihyZXN1bHQgPT4ge1xuXHRcdFx0XHRsZXQgZGF0YSA9IHJlc3VsdC5tYXRjaCgvX19JTklUSUFMX1NUQVRFX189KC4qPyk7XFwoZnVuY3Rpb25cXChcXCkvKVsxXTtcblx0XHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiSU5JVElBTCBTVEFURVwiLCBkYXRhKTtcblx0XHRcdFx0aWYgKHR5cGUgPT09IFwiQlZcIiB8fCB0eXBlID09PSBcImJ2XCIgfHwgdHlwZSA9PT0gXCJhdlwiKSB7XG5cdFx0XHRcdFx0dGhpcy5haWQgPSBkYXRhLnZpZGVvRGF0YS5haWQ7XG5cdFx0XHRcdFx0dGhpcy5waWQgPSBwYXJzZUludCh1cmwuc3BsaXQoXCJwPVwiKVsxXSwgMTApIHx8IDE7XG5cdFx0XHRcdFx0dGhpcy5jaWQgPSBkYXRhLnZpZGVvRGF0YS5wYWdlc1t0aGlzLnBpZCAtIDFdLmNpZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICh0eXBlID09PSBcImVwXCIpIHtcblx0XHRcdFx0XHR0aGlzLmFpZCA9IGRhdGEuZXBJbmZvLmFpZDtcblx0XHRcdFx0XHR0aGlzLmNpZCA9IGRhdGEuZXBJbmZvLmNpZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICh0eXBlID09PSBcInNzXCIpIHtcblx0XHRcdFx0XHR0aGlzLmFpZCA9IGRhdGEuZXBMaXN0WzBdLmFpZDtcblx0XHRcdFx0XHR0aGlzLmNpZCA9IGRhdGEuZXBMaXN0WzBdLmNpZDtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChlcnJvciA9PiBzaG93RXJyb3IoXCLojrflj5bop4bpopEgYWlkIOWHuumUme+8gVwiKSk7XG5cdH1cblxuXHRhc3luYyBnZXRJbmZvKCkge1xuXHRcdGNvbnN0IHsgYWlkLCBjaWQgfSA9IHRoaXM7XG5cdFx0aWYgKCFjaWQpIHtcblx0XHRcdHNob3dFcnJvcihcIuiOt+WPluinhumikSBjaWQg5Ye66ZSZ77yBXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQvLyBnZXREYW5tYWt1KCk7IC8v6I635Y+WY2lk5ZCO77yM6I635Y+W5LiL6L296ZO+5o6l5ZKM5by55bmV5L+h5oGvXG5cdFx0cmV0dXJuIGZldGNoKFwiaHR0cHM6Ly9hcGkuYmlsaWJpbGkuY29tL3gvd2ViLWludGVyZmFjZS92aWV3P2FpZD1cIiArIGFpZClcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XHRcdC5jYXRjaChlcnJvciA9PiBzaG93RXJyb3IoXCLojrflj5bop4bpopHkv6Hmga/lh7rplJnvvIFcIikpO1xuXHR9XG5cblx0YXN5bmMgZ2V0RGF0YShmYWxsYmFjaykge1xuXHRcdGNvbnN0IHsgY2lkLCB0eXBlIH0gPSB0aGlzO1xuXHRcdGxldCBwbGF5VXJsO1xuXHRcdGlmIChmYWxsYmFjaykge1xuXHRcdFx0Y29uc3QgcGFyYW1zID0gYGNpZD0ke2NpZH0mbW9kdWxlPW1vdmllJnBsYXllcj0xJnF1YWxpdHk9MTEyJnRzPTFgO1xuXHRcdFx0Y29uc3Qgc2lnbiA9IGNyeXB0by5jcmVhdGVIYXNoKFwibWQ1XCIpLnVwZGF0ZShwYXJhbXMgKyBcIjliMjg4MTQ3ZTU0NzRkZDJhYTY3MDg1ZjcxNmM1NjBkXCIpLmRpZ2VzdChcImhleFwiKTtcblx0XHRcdHBsYXlVcmwgPSBgaHR0cHM6Ly9iYW5ndW1pLmJpbGliaWxpLmNvbS9wbGF5ZXIvd2ViX2FwaS9wbGF5dXJsPyR7cGFyYW1zfSZzaWduPSR7c2lnbn1gO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAodHlwZSA9PT0gXCJCVlwiIHx8IHR5cGUgPT09IFwiYnZcIiB8fCB0eXBlID09PSBcImF2XCIpIHtcblx0XHRcdFx0Y29uc3QgcGFyYW1zID0gYGFwcGtleT1pVkdVVGpzeHZwTGV1RENmJmNpZD0ke2NpZH0mb3R5cGU9anNvbiZxbj0xMTImcXVhbGl0eT0xMTImdHlwZT1gO1xuXHRcdFx0XHRjb25zdCBzaWduID0gY3J5cHRvLmNyZWF0ZUhhc2goXCJtZDVcIikudXBkYXRlKHBhcmFtcyArIFwiYUhSbWhXTUxrZGVNdUlMcU9Sbllab2N3TUJwTUVPZHRcIikuZGlnZXN0KFwiaGV4XCIpO1xuXHRcdFx0XHRwbGF5VXJsID0gYGh0dHBzOi8vaW50ZXJmYWNlLmJpbGliaWxpLmNvbS92Mi9wbGF5dXJsPyR7cGFyYW1zfSZzaWduPSR7c2lnbn1gO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cGxheVVybCA9IGBodHRwczovL2FwaS5iaWxpYmlsaS5jb20vcGdjL3BsYXllci93ZWIvcGxheXVybD9xbj04MCZjaWQ9JHtjaWR9YDtcblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmZXRjaChwbGF5VXJsKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxuXHRcdFx0LnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdFx0Y29uc3QgZGF0YSA9IGZhbGxiYWNrID8gdGhpcy5wYXJzZURhdGEocmVzdWx0KSA6IEpTT04ucGFyc2UocmVzdWx0KTtcblx0XHRcdFx0Y29uc3QgdGFyZ2V0ID0gZGF0YS5kdXJsIHx8IGRhdGEucmVzdWx0LmR1cmw7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiUExBWSBVUkxcIiwgZGF0YSk7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmtzID0gdGFyZ2V0Lm1hcChwYXJ0ID0+IHBhcnQudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhbGxiYWNrLCBkYXRhXG4gICAgICAgICAgICAgICAgICAgIH07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGZhbGxiYWNrKSB0aHJvdyBFcnJvcigpO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldERhdGEodHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRzaG93RXJyb3IoXCLojrflj5YgUGxheVVybCDmiJbkuIvovb3pk77mjqXlh7rplJnvvIHnlLHkuo5C56uZ6ZmQ5Yi277yM5Y+q6IO95LiL6L295L2O5riF5pmw5bqm6KeG6aKR44CCXCIpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRwYXJzZURhdGEodGFyZ2V0KSB7XG5cdFx0Y29uc3QgZGF0YSA9ICQodGFyZ2V0KTtcblx0XHRjb25zdCByZXN1bHQgPSB7fTtcblx0XHRyZXN1bHQuZHVybCA9IFtdO1xuXHRcdHJlc3VsdC5xdWFsaXR5ID0gZGF0YS5maW5kKFwicXVhbGl0eVwiKS50ZXh0KCk7XG5cdFx0ZGF0YS5maW5kKFwiZHVybFwiKS5lYWNoKChpLCBvKSA9PiB7XG5cdFx0XHRjb25zdCBwYXJ0ID0gJChvKTtcblx0XHRcdHJlc3VsdC5kdXJsLnB1c2goe1xuXHRcdFx0XHR1cmw6IHBhcnQuZmluZChcInVybFwiKS50ZXh0KCksXG5cdFx0XHRcdG9yZGVyOiBwYXJ0LmZpbmQoXCJvcmRlclwiKS50ZXh0KCksXG5cdFx0XHRcdGxlbmd0aDogcGFydC5maW5kKFwibGVuZ3RoXCIpLnRleHQoKSxcblx0XHRcdFx0c2l6ZTogcGFydC5maW5kKFwic2l6ZVwiKS50ZXh0KClcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRkb3dubG9hZEJ5SW5kZXgocGFydCwgZmlsZSwgY2FsbGJhY2sgPSAoKSA9PiB7fSkge1xuXHRcdGNvbnN0IHsgdXJsIH0gPSB0aGlzO1xuXG5cdFx0aWYgKHRoaXMudGFza3Muc29tZShpdGVtID0+IGl0ZW0udXJsID09PSB0aGlzLmxpbmtzW3BhcnRdKSkgcmV0dXJuIFwiRFVQTElDQVRFXCI7XG5cdFx0dGhpcy50YXNrcy5wdXNoKG5ldyBUYXNrKHRoaXMubGlua3NbcGFydF0pKTtcblx0XHRsZXQgc3RhdGU7XG5cdFx0dHJ5IHtcblx0XHRcdHN0YXRlID0gZnMuc3RhdFN5bmMoZmlsZSk7XG5cdFx0fVxuXHRcdGNhdGNoIChlcnJvcikge1xuXHRcdH1cblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0dXJsOiB0aGlzLmxpbmtzW3BhcnRdLFxuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcIlJhbmdlXCI6IGBieXRlcz0ke3N0YXRlID8gc3RhdGUuc2l6ZSA6IDB9LWAsIC8v5pat54K557ut5LygXG5cdFx0XHRcdFwiVXNlci1BZ2VudFwiOiBcIk1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85MC4wLjQ0MzAuMjEyIFNhZmFyaS81MzcuMzZcIixcblx0XHRcdFx0XCJSZWZlcmVyXCI6IHVybFxuXHRcdFx0fVxuXHRcdH07XG5cdFx0Y29uc3Qgc3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZmlsZSwgc3RhdGUgPyB7IGZsYWdzOiBcImFcIiB9IDoge30pO1xuXHRcdHRoaXMuZG93bmxvYWQob3B0aW9ucywgc3RyZWFtLCBjYWxsYmFjayk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRkb3dubG9hZChvcHRpb25zLCBzdHJlYW0sIGNhbGxiYWNrKSB7XG5cdFx0Ly8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvcHJvZ3Jlc3Mtc3RyZWFtXG5cdFx0Y29uc3QgaW5kZXggPSB0aGlzLnRhc2tzLmZpbmRJbmRleChpdGVtID0+IGl0ZW0udXJsID09PSBvcHRpb25zLnVybCk7XG5cdFx0Y29uc3QgcHJvU3RyZWFtID0gcHJvZ3Jlc3Moe1xuXHRcdFx0dGltZTogMjUwIC8v5Y2V5L2NbXNcblx0XHR9KS5vbihcInByb2dyZXNzXCIsIHByb2dyZXNzID0+IHtcblx0XHRcdGNvbnN0IHsgcGVyY2VudGFnZSB9ID0gcHJvZ3Jlc3M7IC8v5pi+56S66L+b5bqm5p2hXG5cdFx0XHRpZiAocGVyY2VudGFnZSA9PT0gMTAwKSB7XG5cdFx0XHRcdHRoaXMudGFza3NbaW5kZXhdLmZpbmlzaGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGNhbGxiYWNrKHByb2dyZXNzLCBpbmRleCk7XG5cdFx0fSk7XG5cblx0XHRsZXQgeyB1cmwgfSA9IG9wdGlvbnM7XG5cdFx0ZnVuY3Rpb24gZG93bmxvYWRMaW5rKHVybCkge1xuXHRcdFx0KHVybC5zdGFydHNXaXRoKFwiaHR0cHNcIikgPyBodHRwcyA6IGh0dHApLmdldCh1cmwsIG9wdGlvbnMsIHJlcyA9PiB7XG5cdFx0XHRcdGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMzAyKSB7XG5cdFx0XHRcdFx0dXJsID0gcmVzLmhlYWRlcnMubG9jYXRpb247XG5cdFx0XHRcdFx0cmV0dXJuIGRvd25sb2FkTGluayh1cmwpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHByb1N0cmVhbS5zZXRMZW5ndGgocmVzLmhlYWRlcnNbXCJjb250ZW50LWxlbmd0aFwiXSk7XG5cdFx0XHRcdC8v5YWIcGlwZeWIsHByb1N0cmVhbeWGjXBpcGXliLDmlofku7bnmoTlhpnlhaXmtYHkuK1cblx0XHRcdFx0cmVzLnBpcGUocHJvU3RyZWFtKS5waXBlKHN0cmVhbSkub24oXCJlcnJvclwiLCBlcnJvciA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGRvd25sb2FkTGluayh1cmwpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBUYXNrLCBEb3dubG9hZGVyIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgY2hlZXJpbyA9IHJlcXVpcmUoXCJjaGVlcmlvXCIpO1xuY29uc3QgU2NyYXBlciA9IHJlcXVpcmUoXCIuL3NvY2lhbF9zY3JhcGVyXCIpO1xuY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCB7IERvd25sb2FkZXIgfSA9IHJlcXVpcmUoXCIuL2JpbGliaWxpL2Rvd25sb2FkZXIuanNcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCBzYW5pdGl6ZSA9IHJlcXVpcmUoXCJmaWxlbmFtaWZ5XCIpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKFwiZGVidWdcIikoXCJiaWxpYmlsaS1zY3JhcGVyOlNjcmFwZXJcIik7XG5jb25zdCB7IGF1dG9TY3JvbGwsIGRlbGF5IH0gPSByZXF1aXJlKFwiLi9saWIvZnVuY3Rpb24uanNcIik7XG4vLyBpbXBvcnQgZmlsZW5hbWlmeSBmcm9tICdmaWxlbmFtaWZ5Jztcbi8vIGNvbnN0IHsgbGF1bmNoLCBnZXRTdHJlYW0gfSA9IHJlcXVpcmUoXCJwdXBwZXRlZXItc3RyZWFtXCIpO1xuLy8gY29uc3QgUHVwcGV0ZWVyVmlkZW9SZWNvcmRlciA9IHJlcXVpcmUoJ3B1cHBldGVlci12aWRlby1yZWNvcmRlcicpO1xuY2xhc3MgQmlsaWJpbGlTY3JhcGVyIGV4dGVuZHMgU2NyYXBlciB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLnN0YXJ0VXJsID0gXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb21cIjtcbiAgfVxuICBhc3luYyBsb2FkX3N0YXJ0X3BhZ2UoKSB7XG4gICAgZGVidWcoXCJsb2FkIHN0YXJ0IHBhZ2VcIilcbiAgICBpZiAodGhpcy5jb25maWcuYmlsaWJpbGlfc2V0dGluZ3MpIHtcbiAgICAgIHRoaXMuc3RhcnRVcmwgPSBgaHR0cHM6Ly93d3cuJHt0aGlzLmNvbmZpZy5iaWxpYmlsaV9zZXR0aW5ncy5iaWxpYmlsaV9kb21haW59YDtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5iaWxpYmlsaV9zZXR0aW5ncy5iaWxpYmlsaV9kb21haW4pIHtcbiAgICAgICAgdGhpcy5zdGFydFVybCA9IGBodHRwczovL3d3dy4ke3RoaXMuY29uZmlnLmJpbGliaWxpX3NldHRpbmdzLmJpbGliaWxpX2RvbWFpbn1gO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jb25maWcuYmlsaWJpbGlfc2V0dGluZ3MpIHtcbiAgICAgICAgaWYgKGtleSAhPT0gXCJiaWxpYmlsaV9kb21haW5cIikge1xuICAgICAgICAgIHRoaXMuc3RhcnRVcmwgKz0gYCR7a2V5fT0ke3RoaXMuY29uZmlnLmJpbGliaWxpX3NldHRpbmdzW2tleV19JmA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy9sb2dpbiBpbnRvIGJpbGliaWxpXG4gIGFzeW5jIG1ha2Vsb2dpbmFjdGlvbigpIHtcbiAgICAvLyBsZXQgc3RhcnRVcmwgPSBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbVwiO1xuXG4gICAgdGhpcy5sb2dnZXIuaW5mbyhcIlVzaW5nIGxvZ2luVXJsOiBcIiArIHRoaXMuc3RhcnRVcmwpO1xuICAgIGF3YWl0IHRoaXMucGFnZS5zZXRCeXBhc3NDU1AodHJ1ZSk7XG4gICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8odGhpcy5zdGFydFVybCk7XG5cbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIFwibG9naW4gc3VjY2VzcywgY29va2llcyBoYXMgYmVlbiBzYXZlIGF0IFwiICsgdGhpcy5jb25maWcudG1wcGF0aFxuICAgICk7XG4gICAgLy9jbGljayBsb2dpbiBidG5cbiAgICBhd2FpdCB0aGlzLnBhZ2UuY2xpY2soXCIuaGVhZGVyLWxvZ2luLWVudHJ5XCIpO1xuICAgIC8vIGF3YWl0IHRoaXMucGFnZS5ldmFsdWF0ZShfID0+IHtcbiAgICAvLyB2YXIgaWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb1wiKTtcbiAgICAvLyBpY29uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAvLyB9KTtcbiAgICAvL3dhaXQgbG9naW4gYm94IHNob3dcbiAgICBhd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlbGVjdG9yKFwiLmJpbGktbWluaS1jb250ZW50LXdwXCIsIHtcbiAgICAgIHRpbWVvdXQ6IHRoaXMuU1RBTkRBUkRfVElNRU9VVCxcbiAgICB9KTtcbiAgICAvL2NsaWNrIGxvZ2luIGJ5IHNtc1xuICAgIGNvbnN0IFtidXR0b25dID0gYXdhaXQgdGhpcy5wYWdlLiR4KFwiLy9kaXZbY29udGFpbnMoLiwgJyDnn63kv6HnmbvlvZUgJyldXCIpO1xuICAgIGlmIChidXR0b24pIHtcbiAgICAgIGF3YWl0IGJ1dHRvbi5jbGljaygpO1xuICAgIH1cbiAgICAvL2F3YWl0IGZvciB1c2VyIHRvIHRha2UgYWN0aW9uXG4gICAgYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcihcIi5oZWFkZXItZW50cnktbWluaVwiLCB7IHRpbWVvdXQ6IDAgfSk7XG4gICAgLy91c2VyIGhhcyBzdWNjZXNzIGxvZ2luXG4gICAgLy9zYXZlIGNvb2tpZXNcbiAgICBjb25zdCBjb29raWVzID0gYXdhaXQgdGhpcy5wYWdlLmNvb2tpZXMoKTtcblxuICAgIGF3YWl0IGZzLndyaXRlRmlsZShcbiAgICAgIHRoaXMuY29uZmlnLnRtcHBhdGggKyBcIi9jb29raWVzLmpzb25cIixcbiAgICAgIEpTT04uc3RyaW5naWZ5KGNvb2tpZXMsIG51bGwsIDIpLFxuICAgICAgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLnBhZ2UuY2xvc2UoKTtcbiAgICAvLyBhd2FpdCB0aGlzLmJyb3dzZXJzLmNsb3NlKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHZpZGVvIGxpc3QgcGFnZVxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5d29yZFxuICAgKiBAcmV0dXJucyBlbGVtZW50XG4gICAqL1xuICBhc3luYyBjbGlja1NlYXJjaGJ0bih7IHBhZ2UsIGtleXdvcmQgfSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmluZm8oXCJVc2luZyBsb2dpblVybDogXCIgKyB0aGlzLnN0YXJ0VXJsKTtcbiAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0QnlwYXNzQ1NQKHRydWUpO1xuICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IGF3YWl0IHRoaXMucGFnZS5nb3RvKHRoaXMuc3RhcnRVcmwpO1xuICAgIGF3YWl0IHBhZ2UudHlwZShcIi5uYXYtc2VhcmNoLWlucHV0XCIsIGtleXdvcmQpO1xuICAgIC8vIGF3YWl0IHRoaXMucGFnZS4kZXZhbChcIi5uYXYtc2VhcmNoLWlucHV0XCIsIGZ1bmN0aW9uIChrZXl3b3JkKSB7XG4gICAgLy8gICB0aGlzLnZhbHVlID0ga2V5d29yZDtcbiAgICAvLyB9KTtcbiAgICAvLyBhd2FpdCBwYWdlLiRldmFsKCcubmF2LXNlYXJjaC1pbnB1dCcsIGVsID0+IGVsLnZhbHVlID0gXCJcIik7XG4gICAgY29uc3Qgc2VhcmNoYnRuID0gYXdhaXQgdGhpcy5wYWdlLiQoXCIubmF2LXNlYXJjaC1idG5cIik7XG4gICAgc2VhcmNoYnRuLmNsaWNrKCk7XG4gICAgcmV0dXJuIHNlYXJjaGJ0bjtcbiAgfVxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleXdvcmRcbiAgICogQHJldHVybnMgYXJyYXlcbiAgICovXG4gIGFzeW5jIHNlYXJjaGRhdGEoeyBwYWdlLCBrZXl3b3JkIH0pIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG4gICAgbGV0IHJlc3VsdD1bXVxuICAgIGlmKEFycmF5LmlzQXJyYXkoa2V5d29yZCkpe1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGtleXdvcmQpIHtcbiAgICAgICAgbGV0IGxpbmtyZXM9YXdhaXQgdGhpcy5nZXRWaWRlb3VybHMoeyBwYWdlOiB0aGlzLnBhZ2UsIGtleXdvcmQ6IGVsZW1lbnQgfSk7XG4gICAgICAgIGRlYnVnKGxpbmtyZXMpXG4gICAgICAgIGZvcihjb25zdCBsaW5rIG9mIGxpbmtyZXMpeyBcbiAgICAgICAgICByZXN1bHQucHVzaChsaW5rKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBcbiAgICB9ZWxzZSBpZih0eXBlb2Yga2V5d29yZCA9PT0gJ3N0cmluZycpe1xuICAgICAgbGV0IGxpbmtyZXM9YXdhaXQgdGhpcy5nZXRWaWRlb3VybHMoeyBwYWdlOiB0aGlzLnBhZ2UsIGtleXdvcmQ6IGtleXdvcmQgfSk7XG4gICAgICBmb3IoY29uc3QgbGluayBvZiBsaW5rcmVzKXtcbiAgICAgICAgXG4gICAgICAgIHJlc3VsdC5wdXNoKGxpbmtyZXMpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgICAvLyByZXR1cm4gYXdhaXQgdGhpcy5nZXRWaWRlb3VybHMoeyBwYWdlOiB0aGlzLnBhZ2UsIGtleXdvcmQ6IGtleXdvcmQgfSk7XG4gIH1cbiAgLy9nZXQgdmlkZW8gdXJsIHJldHVybiBpbiBhcnJheVxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3Qsc3RyaW5nLHN0cmluZ31cbiAgICogQHJldHVybnMgYXJyYXlcbiAgICovXG4gIGFzeW5jIGdldFZpZGVvdXJscyh7IHBhZ2UsIGtleXdvcmQsIGNvb2tpZXNQYXRoIH0pIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG4gICAgaWYgKGNvb2tpZXNQYXRoKSB7XG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoY29va2llc1BhdGgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgY29va2llcyBmaWxlIGF0ICR7Y29va2llc1BhdGh9YCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBjb29raWVzID0gSlNPTi5wYXJzZShhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShjb29raWVzUGF0aCkpO1xuICAgICAgLy8gY29uc29sZS5sb2coY29va2llcyk7XG4gICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0Q29va2llKC4uLmNvb2tpZXMpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlYXJjaGJ0biA9IGF3YWl0IHRoaXMuY2xpY2tTZWFyY2hidG4oe1xuICAgICAgcGFnZTogdGhpcy5wYWdlLFxuICAgICAga2V5d29yZDoga2V5d29yZCxcbiAgICB9KTtcbiAgICBsZXQgYnJvd3NlciA9IHRoaXMucGFnZS5icm93c2VyKCk7XG4gICAgY29uc3QgbmV3UGFnZSA9IGF3YWl0IGJyb3dzZXIud2FpdEZvclRhcmdldCgodGFyZ2V0KSA9PlxuICAgICAgdGFyZ2V0LnVybCgpLmluY2x1ZGVzKFwic2VhcmNoLmJpbGliaWxpLmNvbVwiKVxuICAgICk7XG4gICAgY29uc3QgcGFnZXMgPSBhd2FpdCBicm93c2VyLnBhZ2VzKCk7XG4gICAgbGV0IHNlYXJjaFBhZ2U7XG4gICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgICBjb25zdCBwYWdldXJsID0gYXdhaXQgcGFnZS51cmwoKTsgLy8gbmV3IHBhZ2Ugbm93IGFwcGVhciFcbiAgICAgIC8vIGRlYnVnKGF3YWl0IHBhZ2UudGl0bGUoKSlcbiAgICAgIGlmIChwYWdldXJsLmluY2x1ZGVzKFwic2VhcmNoLmJpbGliaWxpLmNvbVwiKSkge1xuICAgICAgICBzZWFyY2hQYWdlID0gcGFnZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghc2VhcmNoUGFnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2VhcmNoIHBhZ2Ugbm90IGZvdW5kXCIpO1xuICAgIH1cbiAgICAvLyB0aGlzLnBhZ2Uud2FpdEZvcigyMDAwKTtcbiAgICAvLyB0aGlzLmJyb3dzZXIub24oJ3RhcmdldGNyZWF0ZWQnLCBmdW5jdGlvbigpe1xuICAgIC8vICAgY29uc29sZS5sb2coJ05ldyBUYWIgQ3JlYXRlZCcpO1xuICAgIC8vIH0pO1xuICAgIC8vIGxldCBicm93c2VyPXRoaXMucGFnZS5icm93c2VyKClcbiAgICAvLyBjb25zb2xlLmxvZyhcImN1cnJlbnQgcGFnZSBjb3VudCBcIiwgKGF3YWl0IGJyb3dzZXIucGFnZXMoKSkubGVuZ3RoKTtcbiAgICAvLyBjb25zdCB0YWJsZXMgPSBhd2FpdCBicm93c2VyLnBhZ2VzKClcbiAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgIC8vICAgZGVidWcoYXdhaXQgdGFibGVzW2ldLnRpdGxlKCkpXG4gICAgLy8gfVxuXG4gICAgLy8gY29uc3QgW3RhYk9uZSwgdGFiVHdvXSA9IChhd2FpdCBicm93c2VyLnBhZ2VzKCkpO1xuICAgIC8vIGRlYnVnKGF3YWl0IHRhYk9uZS50aXRsZSgpKVxuICAgIC8vIGRlYnVnKGF3YWl0IHRhYlR3by50aXRsZSgpKVxuICAgIC8vIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yTmF2aWdhdGlvbigpXG4gICAgLy8gYXdhaXQgZGVsYXkoNTAwMCk7XG4gICAgYXdhaXQgYXV0b1Njcm9sbChzZWFyY2hQYWdlKTtcbiAgICAvLyBhd2FpdCBwYWdlLnNjcmVlbnNob3Qoe1xuICAgIC8vICAgcGF0aDogJy9ob21lL3JvYmVydHplbmcvc2NyZWVuc2hvdC5qcGcnXG4gICAgLy8gfSk7XG5cbiAgICBhd2FpdCBzZWFyY2hQYWdlLndhaXRGb3JTZWxlY3RvcihcIi52dWlfcGFnZW5hdGlvblwiLCB7IHRpbWVvdXQ6IDUwMDAgfSk7XG5cbiAgICBsZXQgbGlua3JlcyA9IFtdO1xuICAgIC8vIGF3YWl0IHRoaXMucGFnZS4kJChcImJ1dHRvbi52dWlfYnV0dG9uXCIsIGVsZW1lbnRzPT57XG4gICAgLy8gICBjb25zb2xlLmxvZyhlbGVtZW50cylcbiAgICAvLyB9KVxuICAgIGNvbnN0IGxpbmtQYWdlID0gYXdhaXQgc2VhcmNoUGFnZS4kJChcImJ1dHRvbi52dWlfYnV0dG9uXCIpO1xuICAgIGRlYnVnKGxpbmtQYWdlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtQYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBhd2FpdCBhdXRvU2Nyb2xsKHRhYlR3byApXG4gICAgICAvLyBhd2FpdCB0aGlzLnBhZ2Uud2FpdEZvck5hdmlnYXRpb24oe1xuICAgICAgLy8gICB3YWl0VW50aWw6ICduZXR3b3JraWRsZTAnLFxuICAgICAgLy8gfSk7XG4gICAgICAvLyBhd2FpdCBsaW5rUGFnZVtpXS5jbGljaygpXG4gICAgICBhd2FpdCBzZWFyY2hQYWdlLmV2YWx1YXRlKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xpY2soKTtcbiAgICAgIH0sIGxpbmtQYWdlW2ldKTtcbiAgICAgIGNvbnN0IGxpbmtzID0gYXdhaXQgdGhpcy5nZXRWaWRlb2xpc3RsaW5rKHsgcGFnZTogc2VhcmNoUGFnZSB9KTtcbiAgICAgIGRlYnVnKGxpbmtzKTtcbiAgICAgIGxpbmtzLm1hcCgobGluaykgPT4ge1xuICAgICAgICBsaW5rcmVzLnB1c2gobGluayk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhd2FpdCB0aGlzLnBhZ2UuJCRldmFsKFwiYnV0dG9uLnZ1aV9idXR0b25cIiwgYXN5bmMgZWxlbWVudHM9PntcbiAgICAvLyAgIC8vIGF3YWl0IGF1dG9TY3JvbGwodGhpcy5wYWdlIClcbiAgICAvLyAgIGVsZW1lbnRzLm1hcChhc3luYyBlbGVtZW50PT57XG4gICAgLy8gICAgIGF3YWl0IGF1dG9TY3JvbGwodGhpcy5wYWdlIClcbiAgICAvLyAgIGF3YWl0IGVsZW1lbnQuY2xpY2soKVxuICAgIC8vICAgY29uc3QgbGlua3M9YXdhaXQgdGhpcy5nZXRWaWRlb2xpc3RsaW5rKHsgcGFnZTp0aGlzLnBhZ2UgfSk7XG4gICAgLy8gICBkZWJ1ZyhsaW5rcylcbiAgICAvLyAgIGxpbmtzLm1hcCgobGluayk9PntcbiAgICAvLyAgICAgbGlua3Jlcy5wdXNoKGxpbmspXG4gICAgLy8gICB9KVxuICAgIC8vIH0pXG4gICAgLy8gfSlcbiAgICBkZWJ1ZyhsaW5rcmVzKTtcbiAgICByZXR1cm4gbGlua3JlcztcbiAgfVxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtwYWdlfSBwYWdlXG4gICAqIEByZXR1cm5zIGFycmF5XG4gICAqL1xuICBhc3luYyBnZXRWaWRlb2xpc3RsaW5rKHsgcGFnZSB9KSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgfVxuICAgIC8vIGNvbnN0IGVsSGFuZGxlQXJyYXkgPSBhd2FpdCBwYWdlLiQkKFxuICAgIC8vICAgXCIuYmlsaS12aWRlby1jYXJkX19pbmZvLS1yaWdodCBhOm50aC1jaGlsZCgxKVwiXG4gICAgLy8gKTtcblxuICAgIC8vIGxldCBsaW5rbWFwID0gW107XG4gICAgbGV0IGxpbmttYXAgPSBhd2FpdCBwYWdlLiQkZXZhbChcbiAgICAgIFwiLmJpbGktdmlkZW8tY2FyZF9faW5mby0tcmlnaHQgPmE6Zmlyc3QtY2hpbGRcIixcbiAgICAgIChhbGlua3MpID0+IHtcbiAgICAgICAgcmV0dXJuIGFsaW5rcy5tYXAoKGFsaW5rKSA9PiB7XG4gICAgICAgICAgdmFyIGxpbmthcnIgPSB7fTtcbiAgICAgICAgICBsaW5rYXJyLmxpbmsgPSBhbGluay5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGFsaW5rKTtcbiAgICAgICAgICBodGl0bGUgPSBhbGluay5xdWVyeVNlbGVjdG9yKFwiaDNcIik7XG4gICAgICAgICAgbGlua2Fyci50aXRsZSA9IGh0aXRsZS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICByZXR1cm4gbGlua2FycjtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcbiAgICAvLyBkZWJ1ZyhcInF1ZXJ5IGxpbmsgZmluaXNoXCIpO1xuICAgIC8vIGRlYnVnKGxpbmttYXApO1xuICAgIC8vIGRlYnVnKFwic2hvdyBsaW5rIGZpbmlzaFwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhsaW5rbWFwKVxuXG4gICAgYXdhaXQgbGlua21hcC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKCFlbGVtZW50LmxpbmsuaW5jbHVkZXMoXCIvdmlkZW8vXCIpKSB7XG4gICAgICAgIC8vIGRlYnVnKFwiZWxlbWVudCBoYXMgdmlkZW8gXCIrZWxlbWVudClcbiAgICAgICAgbGlua21hcC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGF3YWl0IGxpbmttYXAuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChlbGVtZW50LmxpbmsuaW5jbHVkZXMoXCIvYXBpL1wiKSkge1xuICAgICAgICBkZWJ1ZyhcImVsZW1lbnQgaGFzIGFwaSBcIiArIGVsZW1lbnQpO1xuICAgICAgICBsaW5rbWFwLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy9kZWJ1ZyhcImZpbHRlciBsaW5rIGZpbmlzaFwiKTtcbiAgICBkZWJ1ZyhsaW5rbWFwKTtcblxuICAgIHJldHVybiBsaW5rbWFwO1xuICB9XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGlua1xuICAgKiBAcGFyYW0ge3N0cmluZ30gdmlkZW9wYXRoXG4gICAqL1xuICBhc3luYyBkb3dubG9hZFNpZ2xlVmlkZW8oeyBsaW5rLCB2aWRlb3BhdGggfSkge1xuICAgIC8vIGlmIChwYWdlKSB7XG4gICAgLy8gICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIC8vIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKGxpbmspXG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLmdvdG8obGluayx7XG4gICAgLy8gICB3YWl0VW50aWw6ICdkb21jb250ZW50bG9hZGVkJyxcbiAgICAvLyB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyh2aWRlb3BhdGgpXG4gICAgLy8gY29uc3QgZmlsZSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKHZpZGVvcGF0aCArIFwiL3Rlc3Qud2VibVwiKTtcbiAgICAvLyBhd2FpdCBwYWdlLmV2YWx1YXRlKGFzeW5jICgpID0+IHtcbiAgICAvLyBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5icHgtcGxheWVyLXZpZGVvLXdyYXAgPiB2aWRlbzpudGgtY2hpbGQoMSknKTtcbiAgICAvLyBjb25zb2xlLmxvZyhlbCk7XG4gICAgLy8gY29uc3Qge3NyY30gPSBlbC5xdWVyeVNlbGVjdG9yKCdzb3VyY2UnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhzcmMpO1xuICAgIC8vIH0pO1xuICAgIC8vIGNvbnN0IGh0bWwgPSBhd2FpdCBwYWdlLiRldmFsKCcjYmlsaWJpbGktcGxheWVyJywgZWwgPT4gZWwub3V0ZXJIVE1MKTtcbiAgICAvLyBjb25zb2xlLmxvZyhodG1sKVxuICAgIC8vIGNvbnN0IHNyYyA9IGF3YWl0IHBhZ2UuJGV2YWwoXCIjYmlsaWJpbGktcGxheWVyIHZpZGVvXCIsZWwgPT4gZWwuZ2V0QXR0cmlidXRlKFwic3JjXCIpKVxuXG4gICAgY29uc3QgZG93bmxvYWRlciA9IG5ldyBEb3dubG9hZGVyKCk7XG4gICAgZG93bmxvYWRlci5nZXRWaWRlb1VybChsaW5rKTtcbiAgICBpZiAoIWRvd25sb2FkZXIudXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ2aWRlbyB1cmwgaW52YWxpZFwiKTtcbiAgICB9XG4gICAgYXdhaXQgZG93bmxvYWRlci5nZXRBaWQoKTtcblxuICAgIGxldCB2aWRlb3JlcyA9IGF3YWl0IGRvd25sb2FkZXIuZ2V0SW5mbygpO1xuICAgIGRlYnVnKFwiVklERU8gSU5GT1wiLCB2aWRlb3Jlcyk7XG4gICAgLy8gY29uc3QgZG93bmxvYWRQYXRoID0nL2hvbWUvcm9iZXJ0emVuZy9kb3dubG9hZHRlc3QnO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gdmlkZW9yZXMuZGF0YS50aXRsZTtcbiAgICBjb25zdCB7IGRhdGEsIGZhbGxiYWNrIH0gPSBhd2FpdCBkb3dubG9hZGVyLmdldERhdGEoKTtcblxuICAgIGNvbnN0IHRhcmdldCA9IGRhdGEuZHVybCB8fCBkYXRhLnJlc3VsdC5kdXJsO1xuICAgIGNvbnN0IHF1YWxpdHkgPSBkYXRhLnF1YWxpdHkgfHwgZGF0YS5yZXN1bHQucXVhbGl0eSxcbiAgICAgIHF1YWxpdHlBcnJheSA9IHtcbiAgICAgICAgMTEyOiBcIjEwODBQK1wiLFxuICAgICAgICA4MDogXCIxMDgwUFwiLFxuICAgICAgICA3NDogXCI3MjBQNjBcIixcbiAgICAgICAgNjQ6IFwiNzIwUFwiLFxuICAgICAgICA0ODogXCI3MjBQXCIsXG4gICAgICAgIDMyOiBcIjQ4MFBcIixcbiAgICAgICAgMTY6IFwiMzYwUFwiLFxuICAgICAgICAxNTogXCIzNjBQXCIsXG4gICAgICB9O1xuICAgIGNvbnN0IHZpZGVvUXVhbnRpdHkgPSBxdWFsaXR5QXJyYXlbcXVhbGl0eV0gfHwgXCJ1bmtub3duXCI7XG4gICAgY29uc29sZS5sb2coXCJ2aWRlb1F1YW50aXR5IGlzIFwiICsgdmlkZW9RdWFudGl0eSk7XG4gICAgaWYgKGZhbGxiYWNrKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJlcnJvciBoYXBwZW4gd2hlbiBnZXQgdmlkZW8gZGF0YVwiKTtcbiAgICB9XG4gICAgZGVidWcoXCJlY2hvIHRhcmdldFwiKTtcbiAgICBkZWJ1Zyh0YXJnZXQpO1xuICAgIHRhcmdldC5mb3JFYWNoKChlbGVtZW50LCBwYXJ0KSA9PiB7XG4gICAgICBjb25zdCBmaWxlID0gcGF0aC5qb2luKHZpZGVvcGF0aCwgYCR7c2FuaXRpemUoZmlsZW5hbWUpfS0ke3BhcnR9LmZsdmApO1xuICAgICAgZGVidWcoXCJwYXJ0IGlzICVvXCIsIHBhcnQpO1xuICAgICAgZGVidWcoXCJmaWxlIG5hbWUgJW9cIiwgZmlsZSk7XG4gICAgICBjb25zdCBzdGF0ZSA9IGRvd25sb2FkZXIuZG93bmxvYWRCeUluZGV4KFxuICAgICAgICBwYXJ0LFxuICAgICAgICBmaWxlLFxuICAgICAgICAocHJvZ3Jlc3MsIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBzcGVlZCwgZXRhLCBwZXJjZW50YWdlIH0gPSBwcm9ncmVzczsgLy/mmL7npLrov5vluqbmnaFcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInNwZWVkOiBcIiArIE1hdGgucm91bmQoc3BlZWQgLyAxZTMpICsgXCJLQi9zXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBldGE6JHtldGF9c2ApO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLyoqXG4gICAqIGdldCB2aWRlbyBkZXRhaWxcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxpbmtcbiAgICovXG4gIGFzeW5jIGdldFZpZGVvZGV0YWlsKHBhZ2UsIGxpbmspIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5wYWdlLmdvdG8obGluaywge1xuICAgICAgd2FpdFVudGlsOiBcImRvbWNvbnRlbnRsb2FkZWRcIixcbiAgICB9KTtcblxuICAgIC8vIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQmlsaWJpbGlTY3JhcGVyOiBCaWxpYmlsaVNjcmFwZXIsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjaGVlcmlvID0gcmVxdWlyZSgnY2hlZXJpbycpO1xuY29uc3QgU2NyYXBlciA9IHJlcXVpcmUoJy4vc29jaWFsX3NjcmFwZXInKTtcblxuY2xhc3MgRmFjZWJvb2tTY3JhcGVyIGV4dGVuZHMgU2NyYXBlciB7XG5cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIH1cbiBcblxuICAgIGFzeW5jIGxvYWRfbG9naW5fcGFnZSgpIHtcbiAgICAgICAgbGV0IHN0YXJ0VXJsID0gJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbSc7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzKSB7XG4gICAgICAgICAgICBzdGFydFVybCA9IGBodHRwczovL3d3dy4ke3RoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzLmZhY2Vib29rX2RvbWFpbn1gO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzLmZhY2Vib29rX2RvbWFpbikge1xuICAgICAgICAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LiR7dGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MuZmFjZWJvb2tfZG9tYWlufWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgIT09ICdmYWNlYm9va19kb21haW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VXJsICs9IGAke2tleX09JHt0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5nc1trZXldfSZgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnVXNpbmcgbG9naW5Vcmw6ICcgKyBzdGFydFVybCk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8oc3RhcnRVcmwpO1xuXG4gICAgICAgIC8vYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcignaW5wdXRbbmFtZT1cInFcIl0nLCB7IHRpbWVvdXQ6IHRoaXMuU1RBTkRBUkRfVElNRU9VVCB9KTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy91c2VyIGxvZ2luIGJ5IGhhbmRcbiAgICBhc3luYyB1c2VybG9naW5hY3Rpb24oKXtcblxuICAgIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBGYWNlYm9va1NjcmFwZXI6IEZhY2Vib29rU2NyYXBlcixcbn07XG4iLCIvL3Njcm9sbCBkb3duIHRvIHRoZSBib3R0b20gb2YgdGhlIHBhZ2VcbmFzeW5jIGZ1bmN0aW9uIGF1dG9TY3JvbGwocGFnZSl7XG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZShhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB2YXIgdG90YWxIZWlnaHQgPSAwO1xuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gMTAwO1xuICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsQnkoMCwgZGlzdGFuY2UpO1xuICAgICAgICAgICAgICAgIHRvdGFsSGVpZ2h0ICs9IGRpc3RhbmNlO1xuXG4gICAgICAgICAgICAgICAgaWYodG90YWxIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGRlbGF5KHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkgeyBcbiAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCB0aW1lKVxuICAgIH0pO1xuIH1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXV0b1Njcm9sbDphdXRvU2Nyb2xsLFxuICAgIGRlbGF5OmRlbGF5XG59IiwiY29uc3QgY2hlZXJpbyA9IHJlcXVpcmUoJ2NoZWVyaW8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0X2lwX2RhdGE6IGdldF9pcF9kYXRhLFxuICAgIGdldF9odHRwX2hlYWRlcnM6IGdldF9odHRwX2hlYWRlcnMsXG59O1xuXG5hc3luYyBmdW5jdGlvbiBnZXRfaXBfZGF0YShwYWdlKSB7XG4gICAgYXdhaXQgcGFnZS5nb3RvKCdodHRwczovL2lwaW5mby5pby9qc29uJywge1xuICAgICAgd2FpdExvYWQ6IHRydWUsXG4gICAgICB3YWl0TmV0d29ya0lkbGU6IHRydWVcbiAgICB9KTtcbiAgICBsZXQganNvbiA9IGF3YWl0IHBhZ2UuY29udGVudCh7XG4gICAgICAgIHRpbWVvdXQ6IDIwMDAwXG4gICAgfSk7XG4gICAgY29uc3QgJCA9IGNoZWVyaW8ubG9hZChqc29uKTtcbiAgICBsZXQgaXBpbmZvX3RleHQgPSAgJCgncHJlJykudGV4dCgpO1xuICAgIHJldHVybiBKU09OLnBhcnNlKGlwaW5mb190ZXh0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0X2h0dHBfaGVhZGVycyhwYWdlKSB7XG4gICAgYXdhaXQgcGFnZS5nb3RvKCdodHRwczovL2h0dHBiaW4ub3JnL2dldCcsIHtcbiAgICAgIHdhaXRMb2FkOiB0cnVlLFxuICAgICAgd2FpdE5ldHdvcmtJZGxlOiB0cnVlXG4gICAgfSk7XG4gICAgbGV0IGhlYWRlcnMgPSBhd2FpdCBwYWdlLmNvbnRlbnQoKTtcblxuICAgIGNvbnN0ICQgPSBjaGVlcmlvLmxvYWQoaGVhZGVycyk7XG4gICAgbGV0IGhlYWRlcnNfdGV4dCA9ICAkKCdwcmUnKS50ZXh0KCk7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoaGVhZGVyc190ZXh0KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG1ldGEgPSByZXF1aXJlKCcuL21ldGFkYXRhLmpzJyk7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NlLXNjcmFwZXI6U2NyYXBlcicpO1xuLyoqXG4gKiB0aGlzIGlzIHBhcmVudCBjbGFzcyBmb3Igc29jaWFsIHNjcmFweWVyIG5vZGVcbiAqICAqLyBcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgU29jaWFsU2NyYXBlciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGRlYnVnKCdjb25zdHJ1Y3RvcicpO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBjb25maWcgPSB7fSxcbiAgICAgICAgICAgIGNvbnRleHQgPSB7fSxcbiAgICAgICAgICAgIHBsdWdnYWJsZSA9IG51bGwsXG4gICAgICAgICAgICBwYWdlID0gbnVsbCxcbiAgICAgICAgICAgIC8vIGJyb3dzZXJzPW51bGxcbiAgICAgICAgfSA9IG9wdGlvbnM7XG4gICAgICAgIC8vIHRoaXMuYnJvd3Nlcj1icm93c2VyO1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgICAgICB0aGlzLmxhc3RfcmVzcG9uc2UgPSBudWxsOyAvLyB0aGUgbGFzdCByZXNwb25zZSBvYmplY3RcbiAgICAgICAgdGhpcy5tZXRhZGF0YSA9IHtcbiAgICAgICAgICAgIHNjcmFwaW5nX2RldGVjdGVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wbHVnZ2FibGUgPSBwbHVnZ2FibGU7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IHRoaXMuY29uZmlnLmxvZ2dlcjtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcblxuICAgICAgICB0aGlzLnByb3h5ID0gY29uZmlnLnByb3h5O1xuICAgICAgICB0aGlzLmtleXdvcmRzID0gY29uZmlnLmtleXdvcmRzO1xuXG4gICAgICAgIHRoaXMuU1RBTkRBUkRfVElNRU9VVCA9IDEwMDAwO1xuICAgICAgICB0aGlzLlNPTFZFX0NBUFRDSEFfVElNRSA9IDQ1MDAwO1xuXG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHt9O1xuICAgICAgICB0aGlzLnJlc3VsdF9yYW5rID0gMTtcbiAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUgcmVxdWVzdHMgZG9uZVxuICAgICAgICB0aGlzLm51bV9yZXF1ZXN0cyA9IDA7XG4gICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgdGhlIGtleXdvcmRzIHNlYXJjaGVkXG4gICAgICAgIHRoaXMubnVtX2tleXdvcmRzID0gMDtcblxuICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLmNvbmZpZ1tgJHt0aGlzLmNvbmZpZy5zZWFyY2hfZW5naW5lfV9zZXR0aW5nc2BdO1xuICAgICAgICBpZiAoc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSBKU09OLnBhcnNlKHNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ1tgJHt0aGlzLmNvbmZpZy5zZWFyY2hfZW5naW5lfV9zZXR0aW5nc2BdID0gc2V0dGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9zdGFydCB0byBsb2dpbiBzb2NpYWwgbWVkaWEgcGxhdGZvcm1cbiAgICBhc3luYyBydW5Mb2dpbih7IHBhZ2UsIGRhdGEsIHdvcmtlciB9KSB7XG5cbiAgICAgICAgZGVidWcoJ3dvcmtlcj0lbycsIHdvcmtlciwgdGhpcy5jb25maWcua2V5d29yZHMpO1xuXG4gICAgICAgIGlmIChwYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNldFZpZXdwb3J0KHsgd2lkdGg6IDEyODAsIGhlaWdodDogODAwIH0pO1xuXG4gICAgIFxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRfYnJvd3Nlcl9lbmdpbmUoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5tYWtlbG9naW5hY3Rpb24oKVxuICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGlvbiB0aGF0IHJ1bnMgb25seSBvbmNlIGluIHRoZSBiZWdpbm5pbmcgb2YgdGhlXG4gICAgICogc2NyYXBpbmcgcHJvY2VkdXJlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IHRydWUgaWYgZXZlcnl0aGluZyBpcyBjb3JyZWN0LlxuICAgICAqL1xuICAgIGFzeW5jIGxvYWRfYnJvd3Nlcl9lbmdpbmUoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFwcGx5X2V2YXNpb25fdGVjaG5pcXVlcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gcHJldmVudCBkZXRlY3Rpb24gYnkgZXZhZGluZyBjb21tb24gZGV0ZWN0aW9uIHRlY2huaXF1ZXNcbiAgICAgICAgICAgIGF3YWl0IGV2YWRlQ2hyb21lSGVhZGxlc3NEZXRlY3Rpb24odGhpcy5wYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJsb2NrIHNvbWUgYXNzZXRzIHRvIHNwZWVkIHVwIHNjcmFwaW5nXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5ibG9ja19hc3NldHMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGFnZS5zZXRSZXF1ZXN0SW50ZXJjZXB0aW9uKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5wYWdlLm9uKCdyZXF1ZXN0JywgKHJlcSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gcmVxLnJlc291cmNlVHlwZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrID0gWydzdHlsZXNoZWV0JywgJ2ZvbnQnLCAnaW1hZ2UnLCAnbWVkaWEnXTtcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2suaW5jbHVkZXModHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxLmNvbnRpbnVlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb25maWcudGVzdF9ldmFzaW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBOYXZpZ2F0ZSB0byB0aGUgcGFnZSB0aGF0IHdpbGwgcGVyZm9ybSB0aGUgdGVzdHMuXG4gICAgICAgICAgICBjb25zdCB0ZXN0VXJsID0gJ2h0dHBzOi8vYm90LnNhbm55c29mdC5jb20nO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYWdlLmdvdG8odGVzdFVybCk7XG4gICAgICAgICAgICAvLyBTYXZlIGEgc2NyZWVuc2hvdCBvZiB0aGUgcmVzdWx0cy5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGFnZS5zY3JlZW5zaG90KHsgcGF0aDogJ2hlYWRsZXNzLWV2YXNpb24tcmVzdWx0LnBuZycgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb25maWcubG9nX2h0dHBfaGVhZGVycyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5tZXRhZGF0YS5odHRwX2hlYWRlcnMgPSBhd2FpdCBtZXRhLmdldF9odHRwX2hlYWRlcnModGhpcy5wYWdlKTtcbiAgICAgICAgICAgIGRlYnVnKCd0aGlzLm1ldGFkYXRhLmh0dHBfaGVhZGVycz0lTycsIHRoaXMubWV0YWRhdGEuaHR0cF9oZWFkZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5sb2dfaXBfYWRkcmVzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbGV0IGlwaW5mbyA9IGF3YWl0IG1ldGEuZ2V0X2lwX2RhdGEodGhpcy5wYWdlKTtcbiAgICAgICAgICAgIHRoaXMubWV0YWRhdGEuaXBpbmZvID0gaXBpbmZvO1xuICAgICAgICAgICAgZGVidWcoJ3RoaXMubWV0YWRhdGEuaXBpbmZvJywgdGhpcy5tZXRhZGF0YS5pcGluZm8pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgdGhhdCBvdXIgcHJveHkgaXMgd29ya2luZyBieSBjb25maXJtaW5nXG4gICAgICAgIC8vIHRoYXQgaXBpbmZvLmlvIHNlZXMgdGhlIHByb3h5IElQIGFkZHJlc3NcbiAgICAgICAgaWYgKHRoaXMucHJveHkgJiYgdGhpcy5jb25maWcubG9nX2lwX2FkZHJlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGRlYnVnKGAke3RoaXMubWV0YWRhdGEuaXBpbmZvLmlwfSB2cyAke3RoaXMucHJveHl9YCk7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBpcCByZXR1cm5lZCBieSBpcGluZm8gaXMgbm90IGEgc3Vic3RyaW5nIG9mIG91ciBwcm94eXN0cmluZywgZ2V0IHRoZSBoZWNrIG91dHRhIGhlcmVcbiAgICAgICAgICAgIGlmICghdGhpcy5wcm94eS5pbmNsdWRlcyh0aGlzLm1ldGFkYXRhLmlwaW5mby5pcCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFByb3h5IG91dHB1dCBpcCAke3RoaXMucHJveHl9IGRvZXMgbm90IG1hdGNoIHdpdGggcHJvdmlkZWQgb25lYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFVzaW5nIHZhbGlkIFByb3h5OiAke3RoaXMucHJveHl9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmxvYWRfc3RhcnRfcGFnZSgpO1xuICAgIH1cbiAgICAvKipcbiAgKlxuICAqIEByZXR1cm5zIHRydWUgaWYgc3RhcnRwYWdlIHdhcyBsb2FkZWQgY29ycmVjdGx5LlxuICAqL1xuICAgIGFzeW5jIGxvYWRfbG9naW5fcGFnZSgpIHtcblxuICAgIH1cbiAgICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIHN0YXJ0cGFnZSB3YXMgbG9hZGVkIGNvcnJlY3RseS5cbiAgICAgKi9cbiAgICAgYXN5bmMgbG9hZF9zdGFydF9wYWdlKCkge1xuXG4gICAgIH1cbiAgICAvKipcbiAgICAgKiBtYWtlIGxvZ2luIGFjdGlvblxuICAgICAqL1xuICAgIGFzeW5jIG1ha2Vsb2dpbmFjdGlvbigpe1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIHVzZXIgbG9naW4gYnkgdGhlaXIgaGFuZFxuICAgICAqL1xuICAgIGFzeW5jIHVzZXJsb2dpbmFjdGlvbigpIHtcblxuICAgIH1cblxuICAgIGFzeW5jIHNlYXJjaGRhdGEoKSB7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogdXNlIHdvcmtlciB0byBzZWFyY2ggZGF0YVxuICAgICAqIEBwYXJhbSBhcnJheSBrZXl3b3JkIFxuICAgICAqL1xuICAgIGFzeW5jIHdvcmtlcnNlYXJjaGRhdGEoe3BhZ2Usd29ya2VyfSkge1xuICAgICAgICAgZGVidWcoJ3dvcmtlcj0lbycsIHdvcmtlciwgdGhpcy5jb25maWcua2V5d29yZHMpO1xuXG4gICAgICAgIGlmIChwYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNldFZpZXdwb3J0KHsgd2lkdGg6IDEyODAsIGhlaWdodDogODAwIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmxvYWRfYnJvd3Nlcl9lbmdpbmUoKVxuICAgICAgICBjb25zdCBsaW5rcz1hd2FpdCB0aGlzLnNlYXJjaGRhdGEoe2tleXdvcmQ6dGhpcy5jb25maWcua2V5d29yZHN9KVxuICAgICAgICBkZWJ1ZyhsaW5rcylcbiAgICB9XG5cbn1cbi8vIFRoaXMgaXMgd2hlcmUgd2UnbGwgcHV0IHRoZSBjb2RlIHRvIGdldCBhcm91bmQgdGhlIHRlc3RzLlxuYXN5bmMgZnVuY3Rpb24gZXZhZGVDaHJvbWVIZWFkbGVzc0RldGVjdGlvbihwYWdlKSB7XG5cbiAgICAvLyBQYXNzIHRoZSBXZWJkcml2ZXIgVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1Byb3RvID0gbmF2aWdhdG9yLl9fcHJvdG9fXztcbiAgICAgICAgZGVsZXRlIG5ld1Byb3RvLndlYmRyaXZlcjtcbiAgICAgICAgbmF2aWdhdG9yLl9fcHJvdG9fXyA9IG5ld1Byb3RvO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0aGUgQ2hyb21lIFRlc3QuXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICAvLyBXZSBjYW4gbW9jayB0aGlzIGluIGFzIG11Y2ggZGVwdGggYXMgd2UgbmVlZCBmb3IgdGhlIHRlc3QuXG4gICAgICAgIGNvbnN0IG1vY2tPYmogPSB7XG4gICAgICAgICAgICBhcHA6IHtcbiAgICAgICAgICAgICAgICBpc0luc3RhbGxlZDogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2Vic3RvcmU6IHtcbiAgICAgICAgICAgICAgICBvbkluc3RhbGxTdGFnZUNoYW5nZWQ6IHt9LFxuICAgICAgICAgICAgICAgIG9uRG93bmxvYWRQcm9ncmVzczoge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcnVudGltZToge1xuICAgICAgICAgICAgICAgIFBsYXRmb3JtT3M6IHtcbiAgICAgICAgICAgICAgICAgICAgTUFDOiAnbWFjJyxcbiAgICAgICAgICAgICAgICAgICAgV0lOOiAnd2luJyxcbiAgICAgICAgICAgICAgICAgICAgQU5EUk9JRDogJ2FuZHJvaWQnLFxuICAgICAgICAgICAgICAgICAgICBDUk9TOiAnY3JvcycsXG4gICAgICAgICAgICAgICAgICAgIExJTlVYOiAnbGludXgnLFxuICAgICAgICAgICAgICAgICAgICBPUEVOQlNEOiAnb3BlbmJzZCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBQbGF0Zm9ybUFyY2g6IHtcbiAgICAgICAgICAgICAgICAgICAgQVJNOiAnYXJtJyxcbiAgICAgICAgICAgICAgICAgICAgWDg2XzMyOiAneDg2LTMyJyxcbiAgICAgICAgICAgICAgICAgICAgWDg2XzY0OiAneDg2LTY0JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFBsYXRmb3JtTmFjbEFyY2g6IHtcbiAgICAgICAgICAgICAgICAgICAgQVJNOiAnYXJtJyxcbiAgICAgICAgICAgICAgICAgICAgWDg2XzMyOiAneDg2LTMyJyxcbiAgICAgICAgICAgICAgICAgICAgWDg2XzY0OiAneDg2LTY0JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFJlcXVlc3RVcGRhdGVDaGVja1N0YXR1czoge1xuICAgICAgICAgICAgICAgICAgICBUSFJPVFRMRUQ6ICd0aHJvdHRsZWQnLFxuICAgICAgICAgICAgICAgICAgICBOT19VUERBVEU6ICdub191cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBVUERBVEVfQVZBSUxBQkxFOiAndXBkYXRlX2F2YWlsYWJsZScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBPbkluc3RhbGxlZFJlYXNvbjoge1xuICAgICAgICAgICAgICAgICAgICBJTlNUQUxMOiAnaW5zdGFsbCcsXG4gICAgICAgICAgICAgICAgICAgIFVQREFURTogJ3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIENIUk9NRV9VUERBVEU6ICdjaHJvbWVfdXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgU0hBUkVEX01PRFVMRV9VUERBVEU6ICdzaGFyZWRfbW9kdWxlX3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBPblJlc3RhcnRSZXF1aXJlZFJlYXNvbjoge1xuICAgICAgICAgICAgICAgICAgICBBUFBfVVBEQVRFOiAnYXBwX3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIE9TX1VQREFURTogJ29zX3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIFBFUklPRElDOiAncGVyaW9kaWMnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IuY2hyb21lID0gbW9ja09iajtcbiAgICAgICAgd2luZG93LmNocm9tZSA9IG1vY2tPYmo7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBQZXJtaXNzaW9ucyBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxRdWVyeSA9IHdpbmRvdy5uYXZpZ2F0b3IucGVybWlzc2lvbnMucXVlcnk7XG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IucGVybWlzc2lvbnMuX19wcm90b19fLnF1ZXJ5ID0gcGFyYW1ldGVycyA9PlxuICAgICAgICAgICAgcGFyYW1ldGVycy5uYW1lID09PSAnbm90aWZpY2F0aW9ucydcbiAgICAgICAgICAgICAgICA/IFByb21pc2UucmVzb2x2ZSh7c3RhdGU6IE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9ufSlcbiAgICAgICAgICAgICAgICA6IG9yaWdpbmFsUXVlcnkocGFyYW1ldGVycyk7XG5cbiAgICAgICAgLy8gSW5zcGlyZWQgYnk6IGh0dHBzOi8vZ2l0aHViLmNvbS9pa2FyaWVuYXRvci9waGFudG9tanNfaGlkZV9hbmRfc2Vlay9ibG9iL21hc3Rlci81LnNwb29mRnVuY3Rpb25CaW5kLmpzXG4gICAgICAgIGNvbnN0IG9sZENhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcblxuICAgICAgICBmdW5jdGlvbiBjYWxsKCkge1xuICAgICAgICAgICAgcmV0dXJuIG9sZENhbGwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsID0gY2FsbDtcblxuICAgICAgICBjb25zdCBuYXRpdmVUb1N0cmluZ0Z1bmN0aW9uU3RyaW5nID0gRXJyb3IudG9TdHJpbmcoKS5yZXBsYWNlKC9FcnJvci9nLCBcInRvU3RyaW5nXCIpO1xuICAgICAgICBjb25zdCBvbGRUb1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuICAgICAgICBmdW5jdGlvbiBmdW5jdGlvblRvU3RyaW5nKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMgPT09IHdpbmRvdy5uYXZpZ2F0b3IucGVybWlzc2lvbnMucXVlcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJmdW5jdGlvbiBxdWVyeSgpIHsgW25hdGl2ZSBjb2RlXSB9XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcyA9PT0gZnVuY3Rpb25Ub1N0cmluZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuYXRpdmVUb1N0cmluZ0Z1bmN0aW9uU3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9sZENhbGwuY2FsbChvbGRUb1N0cmluZywgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvblRvU3RyaW5nO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0aGUgUGx1Z2lucyBMZW5ndGggVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIC8vIE92ZXJ3cml0ZSB0aGUgYHBsdWdpbnNgIHByb3BlcnR5IHRvIHVzZSBhIGN1c3RvbSBnZXR0ZXIuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXZpZ2F0b3IsICdwbHVnaW5zJywge1xuICAgICAgICAgICAgLy8gVGhpcyBqdXN0IG5lZWRzIHRvIGhhdmUgYGxlbmd0aCA+IDBgIGZvciB0aGUgY3VycmVudCB0ZXN0LFxuICAgICAgICAgICAgLy8gYnV0IHdlIGNvdWxkIG1vY2sgdGhlIHBsdWdpbnMgdG9vIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgICAgIGdldDogKCkgPT4gWzEsIDIsIDMsIDQsIDVdXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0aGUgTGFuZ3VhZ2VzIFRlc3QuXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICAvLyBPdmVyd3JpdGUgdGhlIGBwbHVnaW5zYCBwcm9wZXJ0eSB0byB1c2UgYSBjdXN0b20gZ2V0dGVyLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmF2aWdhdG9yLCAnbGFuZ3VhZ2VzJywge1xuICAgICAgICAgICAgZ2V0OiAoKSA9PiBbJ2VuLVVTJywgJ2VuJ11cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBpZnJhbWUgVGVzdFxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUxJRnJhbWVFbGVtZW50LnByb3RvdHlwZSwgJ2NvbnRlbnRXaW5kb3cnLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdG9TdHJpbmcgdGVzdCwgdGhvdWdoIGl0IGJyZWFrcyBjb25zb2xlLmRlYnVnKCkgZnJvbSB3b3JraW5nXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICB3aW5kb3cuY29uc29sZS5kZWJ1ZyA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY2hlZXJpbyA9IHJlcXVpcmUoJ2NoZWVyaW8nKTtcbmNvbnN0IFNjcmFwZXIgPSByZXF1aXJlKCcuL3NvY2lhbF9zY3JhcGVyJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmNsYXNzIFlvdXR1YmVTY3JhcGVyIGV4dGVuZHMgU2NyYXBlciB7XG5cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpOyAgICBcbiAgICB9XG5cblxuICAgIGFzeW5jIGxvYWRfbG9naW5fcGFnZSgpIHtcbiAgICAgICAgXG4gICAgICAgIC8vIGF3YWl0IHRoaXMucGFnZS5zZXRSZXF1ZXN0SW50ZXJjZXB0aW9uKHRydWUpO1xuICAgICAgICAvL3doZXRoZXIgdG8gZGlzYWJsZSBpbWFnZSBsb2FkaW5nXG4gICAgICAgICAgICAvLyB0aGlzLnBhZ2Uub24oJ3JlcXVlc3QnLCByZXF1ZXN0ID0+IHtcbiAgICAgICAgICAgIC8vICAgICBpZiAocmVxdWVzdC5yZXNvdXJjZVR5cGUoKSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgLy8gICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmVxdWVzdC5jb250aW51ZSgpO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICBsZXQgc3RhcnRVcmwgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20nO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy55b3V0dWJlX3NldHRpbmdzKSB7XG4gICAgICAgICAgICBzdGFydFVybCA9IGBodHRwczovL3d3dy4ke3RoaXMuY29uZmlnLnlvdXR1YmVfc2V0dGluZ3MueW91dHViZV9kb21haW59YDtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy55b3V0dWJlX3NldHRpbmdzLnlvdXR1YmVfZG9tYWluKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRVcmwgPSBgaHR0cHM6Ly93d3cuJHt0aGlzLmNvbmZpZy55b3V0dWJlX3NldHRpbmdzLnlvdXR1YmVfZG9tYWlufWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tYDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gJ3lvdXR1YmVfZG9tYWluJykge1xuICAgICAgICAgICAgICAgICAgICBzdGFydFVybCArPSBgJHtrZXl9PSR7dGhpcy5jb25maWcueW91dHViZV9zZXR0aW5nc1trZXldfSZgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnVXNpbmcgbG9naW5Vcmw6ICcgKyBzdGFydFVybCk7XG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS5zZXRCeXBhc3NDU1AodHJ1ZSk7XG4gICAgICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IGF3YWl0IHRoaXMucGFnZS5nb3RvKHN0YXJ0VXJsKTtcbiAgICAgICAgXG4gICAgICAgIC8vaGlkZGVuIGljb25cbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLmV2YWx1YXRlKF8gPT4ge1xuICAgICAgICB2YXIgaWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nby1pY29uXCIpO1xuICAgICAgICBpY29uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29uZmlnLnRtcHBhdGgpXG4gICAgICAgIC8vYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcignaW5wdXRbbmFtZT1cInFcIl0nLCB7IHRpbWVvdXQ6IHRoaXMuU1RBTkRBUkRfVElNRU9VVCB9KTtcbiAgICAgICAgLy9hd2FpdCBmb3IgdXNlciB0byB0YWtlIGFjdGlvblxuICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlbGVjdG9yKCcjYXZhdGFyLWJ0bicseyd0aW1lb3V0JzowfSk7XG4gICAgICAgIC8vdXNlciBoYXMgc3VjY2VzcyBsb2dpblxuICAgICAgICAvL3NhdmUgY29va2llcyBcbiAgICAgICAgY29uc3QgY29va2llcyA9IGF3YWl0IHRoaXMucGFnZS5jb29raWVzKCk7XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBmcy53cml0ZUZpbGUodGhpcy5jb25maWcudG1wcGF0aCsnL2Nvb2tpZXMuanNvbicsIEpTT04uc3RyaW5naWZ5KGNvb2tpZXMsIG51bGwsIDIpKTtcbiAgICAgICAgYXdhaXQgYnJvd3Nlci5jbG9zZSgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFlvdXR1YmVTY3JhcGVyOiBZb3V0dWJlU2NyYXBlcixcbn07XG4iLCJmdW5jdGlvbiB3ZWJwYWNrRW1wdHlDb250ZXh0KHJlcSkge1xuXHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0dGhyb3cgZTtcbn1cbndlYnBhY2tFbXB0eUNvbnRleHQua2V5cyA9ICgpID0+IChbXSk7XG53ZWJwYWNrRW1wdHlDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xud2VicGFja0VtcHR5Q29udGV4dC5pZCA9IFwiLi9zcmMgc3luYyByZWN1cnNpdmVcIjtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0VtcHR5Q29udGV4dDsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGVlcmlvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRlYnVnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpbGVuYW1pZnlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJvZ3Jlc3Mtc3RyZWFtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItY2x1c3RlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItY2x1c3Rlci9kaXN0L2NvbmN1cnJlbmN5L2J1aWx0SW5Db25jdXJyZW5jeVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItY2x1c3Rlci9kaXN0L3V0aWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVzZXItYWdlbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9