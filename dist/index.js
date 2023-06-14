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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL2luZGV4LnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbm9kZV9zb2NpYWxtay50cyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL2NvbmN1cnJlbmN5LWltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9iaWxpYmlsaS9kb3dubG9hZGVyLmpzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9iaWxpYmlsaV9zY3JhcGVyLmpzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9mYWNlYm9va19zY3JhcGVyLmpzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9saWIvZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL21ldGFkYXRhLmpzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9zb2NpYWxfc2NyYXBlci5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMveW91dHViZV9zY3JhcGVyLmpzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvIHN5bmMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImNoZWVyaW9cIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwiZGVidWdcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwiZmlsZW5hbWlmeVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJmc1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicGF0aFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwcm9ncmVzcy1zdHJlYW1cIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInB1cHBldGVlci1jbHVzdGVyXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInB1cHBldGVlci1jbHVzdGVyL2Rpc3QvY29uY3VycmVuY3kvYnVpbHRJbkNvbmN1cnJlbmN5XCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInB1cHBldGVlci1jbHVzdGVyL2Rpc3QvdXRpbFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwdXBwZXRlZXItZXh0cmFcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwidXNlci1hZ2VudHNcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwid2luc3RvblwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImNyeXB0b1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwc1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm9zXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNlX3NjcmFwZXIgPSByZXF1aXJlKFwiLi9zcmMvbm9kZV9zb2NpYWxta1wiKTtcbnZhciBTY3JhcGVyID0gcmVxdWlyZShcIi4vc3JjL21vZHVsZXMvc29jaWFsX3NjcmFwZXJcIik7XG5cbmFzeW5jIGZ1bmN0aW9uIGxvZ2luKGJyb3dzZXJfY29uZmlnLCBzY3JhcGVfY29uZmlnKSB7XG4gIC8vIHNjcmFwZSBjb25maWcgb3ZlcndyaXRlcyB0aGUgYnJvd3Nlcl9jb25maWdcbiAgT2JqZWN0LmFzc2lnbihicm93c2VyX2NvbmZpZywgc2NyYXBlX2NvbmZpZyk7XG5cbiAgdmFyIHNjcmFwZXIgPSBuZXcgc2Vfc2NyYXBlci5TY3JhcGVNYW5hZ2VyKGJyb3dzZXJfY29uZmlnKTtcbiAgLy8gdmFyIHJlbW90ZUNvbmZpZz1hd2FpdCBzY3JhcGVyLmdldFJlbW90ZUNvbmZpZygpO1xuICBhd2FpdCBzY3JhcGVyLnN0YXJ0KCk7XG5cbiAgdmFyIHJlc3VsdHMgPSBhd2FpdCBzY3JhcGVyLmxvZ2luKHNjcmFwZV9jb25maWcpO1xuXG4gIGF3YWl0IHNjcmFwZXIucXVpdCgpO1xuXG4gIHJldHVybiByZXN1bHRzO1xufVxuLy9nZXQgZGF0YSB1cmxzXG5hc3luYyBmdW5jdGlvbiBzZWFyY2hkYXRhKGJyb3dzZXJfY29uZmlnLCBzY3JhcGVfY29uZmlnKSB7XG4gIC8vIHNjcmFwZSBjb25maWcgb3ZlcndyaXRlcyB0aGUgYnJvd3Nlcl9jb25maWdcbiAgT2JqZWN0LmFzc2lnbihicm93c2VyX2NvbmZpZywgc2NyYXBlX2NvbmZpZyk7XG5cbiAgdmFyIHNjcmFwZXIgPSBuZXcgc2Vfc2NyYXBlci5TY3JhcGVNYW5hZ2VyKGJyb3dzZXJfY29uZmlnKTtcbiAgLy8gdmFyIHJlbW90ZUNvbmZpZz1hd2FpdCBzY3JhcGVyLmdldFJlbW90ZUNvbmZpZygpO1xuICBhd2FpdCBzY3JhcGVyLnN0YXJ0KCk7XG4gIHZhciByZXN1bHRzID0gYXdhaXQgc2NyYXBlci5zZWFyY2hkYXRhKHNjcmFwZV9jb25maWcpO1xuXG4gIGF3YWl0IHNjcmFwZXIucXVpdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2VhcmNoZGF0YTogc2VhcmNoZGF0YSxcbiAgbG9naW46IGxvZ2luLFxuICAvLyB5dGJsb2dpbjp5dGJsb2dpbixcbiAgU2NyYXBlTWFuYWdlcjogc2Vfc2NyYXBlci5TY3JhcGVNYW5hZ2VyLFxuICBTY3JhcGVyOiBTY3JhcGVyLFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gVXNlIFR5cGVTY3JpcHQgbW9kdWxlcyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNTc1ODU4NC9jYW5ub3QtcmVkZWNsYXJlLWJsb2NrLXNjb3BlZC12YXJpYWJsZVxuZXhwb3J0IHt9O1xuY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCBvcyA9IHJlcXVpcmUoXCJvc1wiKTtcbmNvbnN0IF8gPSByZXF1aXJlKFwibG9kYXNoXCIpO1xuY29uc3QgeyBjcmVhdGVMb2dnZXIsIGZvcm1hdCwgdHJhbnNwb3J0cyB9ID0gcmVxdWlyZShcIndpbnN0b25cIik7XG5jb25zdCB7IGNvbWJpbmUsIHRpbWVzdGFtcCwgcHJpbnRmIH0gPSBmb3JtYXQ7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKShcInNlLXNjcmFwZXI6U2NyYXBlTWFuYWdlclwiKTtcbmNvbnN0IHsgQ2x1c3RlciB9ID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyXCIpO1xuY29uc3QgdmFuaWxsYVB1cHBldGVlciA9IHJlcXVpcmUoXCJwdXBwZXRlZXJcIik7XG5jb25zdCB7IGFkZEV4dHJhIH0gPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhXCIpO1xuLy8gY29uc3QgU3RlYWx0aCA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmEtcGx1Z2luLXN0ZWFsdGhcIik7XG4vLyBjb25zdCBBZGJsb2NrZXJQbHVnaW4gPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhLXBsdWdpbi1hZGJsb2NrZXJcIik7XG5cbmNvbnN0IFVzZXJBZ2VudCA9IHJlcXVpcmUoXCJ1c2VyLWFnZW50c1wiKTtcbmNvbnN0IGZhY2Vib29rID0gcmVxdWlyZShcIi4vbW9kdWxlcy9mYWNlYm9va19zY3JhcGVyLmpzXCIpO1xuY29uc3QgeW91dHViZSA9IHJlcXVpcmUoXCIuL21vZHVsZXMveW91dHViZV9zY3JhcGVyLmpzXCIpO1xuY29uc3QgYmlsaWJpbGkgPSByZXF1aXJlKFwiLi9tb2R1bGVzL2JpbGliaWxpX3NjcmFwZXIuanNcIik7XG4vLyBjb25zdCBiaW5nID0gcmVxdWlyZSgnLi9tb2R1bGVzL2JpbmcuanMnKTtcbi8vIGNvbnN0IHlhbmRleCA9IHJlcXVpcmUoJy4vbW9kdWxlcy95YW5kZXguanMnKTtcbi8vIGNvbnN0IGluZm9zcGFjZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy9pbmZvc3BhY2UuanMnKTtcbi8vIGNvbnN0IGR1Y2tkdWNrZ28gPSByZXF1aXJlKCcuL21vZHVsZXMvZHVja2R1Y2tnby5qcycpO1xuY29uc3QgQ3VzdG9tQ29uY3VycmVuY3lJbXBsID0gcmVxdWlyZShcIi4vY29uY3VycmVuY3ktaW1wbGVtZW50YXRpb25cIik7XG4vLyBjb25zdCBheGlvcyA9IHJlcXVpcmUoXCJheGlvc1wiKTtcbmNvbnN0IE1BWF9BTExPV0VEX0JST1dTRVJTID0gNjtcbi8vIGNvbnN0IHB1cHBldGVlciA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmFcIik7XG4vLyBjb25zdCBfU3RlYWx0aFBsdWdpbiA9IHJlcXVpcmUoJ3B1cHBldGVlci1leHRyYS1wbHVnaW4tc3RlYWx0aCcpO1xuLy8gY29uc3QgX0FkYmxvY2tlclBsdWdpbiA9IHJlcXVpcmUoJ3B1cHBldGVlci1leHRyYS1wbHVnaW4tYWRibG9ja2VyJyk7XG5cbmZ1bmN0aW9uIHdyaXRlX3Jlc3VsdHMoZm5hbWUsIGRhdGEpIHtcbiAgZnMud3JpdGVGaWxlU3luYyhmbmFtZSwgZGF0YSwgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHRocm93IGVycjtcbiAgICBjb25zb2xlLmxvZyhgUmVzdWx0cyB3cml0dGVuIHRvIGZpbGUgJHtmbmFtZX1gKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlYWRfa2V5d29yZHNfZnJvbV9maWxlKGZuYW1lKSB7XG4gIGxldCBrd3MgPSBmcy5yZWFkRmlsZVN5bmMoZm5hbWUpLnRvU3RyaW5nKCkuc3BsaXQob3MuRU9MKTtcbiAgLy8gY2xlYW4ga2V5d29yZHNcbiAga3dzID0ga3dzLmZpbHRlcigoa3cpID0+IHtcbiAgICByZXR1cm4ga3cudHJpbSgpLmxlbmd0aCA+IDA7XG4gIH0pO1xuICByZXR1cm4ga3dzO1xufVxuXG5cbmZ1bmN0aW9uIGdldFNjcmFwZXIoc2VhcmNoX2VuZ2luZTpzdHJpbmcsIGFyZ3M6YW55KSB7XG4gIGlmICh0eXBlb2Ygc2VhcmNoX2VuZ2luZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBuZXcge1xuICAgICAgZmFjZWJvb2s6IGZhY2Vib29rLkZhY2Vib29rU2NyYXBlcixcbiAgICAgIHlvdXR1YmU6IHlvdXR1YmUuWW91dHViZVNjcmFwZXIsXG4gICAgICBiaWxpYmlsaTogYmlsaWJpbGkuQmlsaWJpbGlTY3JhcGVyLFxuICAgIH1bc2VhcmNoX2VuZ2luZV0oYXJncyk7XG4gIH0gXG4gIC8vIGVsc2UgaWYgKHR5cGVvZiBzZWFyY2hfZW5naW5lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgLy8gICByZXR1cm4gbmV3IHNlYXJjaF9lbmdpbmUoYXJncyk7XG4gIC8vIH0gXG4gIGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBzb2NpYWwgcGxhdGZvcm0gbXVzdCBlaXRoZXIgYmUgYSBzdHJpbmcgb2YgY2xhc3MgKGZ1bmN0aW9uKWBcbiAgICApO1xuICB9XG59XG50eXBlIFNNY29uZmlnID17XG4gIGxvZ2dlcjp7aW5mbzpGdW5jdGlvbn07XG4gIGtleXdvcmRzOkFycmF5PHN0cmluZz47XG4gIHByb3hpZXM6QXJyYXk8c3RyaW5nPjtcbiAga2V5d29yZF9maWxlOnN0cmluZztcbiAgcHJveHlfZmlsZTpzdHJpbmc7XG4gIHVzZV9wcm94aWVzX29ubHk6Ym9vbGVhbjtcbiAgY3VzdG9tX2Z1bmM6c3RyaW5nO1xuICBjaHJvbWVfZmxhZ3M6QXJyYXk8c3RyaW5nPjtcbiAgcHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnOntcbiAgICBtYXhDb25jdXJyZW5jeTpudW1iZXI7XG4gICAgbW9uaXRvcjpib29sZWFuO1xuICAgIHRpbWVvdXQ6bnVtYmVyO1xuICB9XG4gIHJhbmRvbV91c2VyX2FnZW50OmJvb2xlYW47XG4gIHVzZXJfYWdlbnQ6c3RyaW5nO1xuICBoZWFkbGVzczpib29sZWFuO1xuICBwbGF0Zm9ybTpzdHJpbmc7XG59XG5jbGFzcyBTY3JhcGVNYW5hZ2VyIHtcbiAgY2x1c3Rlcjp7ZXhlY3V0ZTpGdW5jdGlvbjtpZGxlOkZ1bmN0aW9uO2Nsb3NlOkZ1bmN0aW9ufTtcbiAgcGx1Z2dhYmxlOntzdGFydF9icm93c2VyPzpGdW5jdGlvbixjbG9zZV9icm93c2VyPzpGdW5jdGlvbixoYW5kbGVfcmVzdWx0cz86RnVuY3Rpb24saGFuZGxlX21ldGFkYXRhPzpGdW5jdGlvbn07XG4gIHNjcmFwZXI6e3J1bkxvZ2luOkZ1bmN0aW9uO3dvcmtlcnNlYXJjaGRhdGE6RnVuY3Rpb259O1xuICBjb250ZXh0Om9iamVjdDtcbiAgY29uZmlnOlNNY29uZmlnO1xuICBsb2dnZXI6e2luZm86RnVuY3Rpb259O1xuICBicm93c2VyOntuZXdQYWdlOkZ1bmN0aW9ufTtcbiAgcGFnZTpvYmplY3Q7XG4gIG51bUNsdXN0ZXJzOm51bWJlcjtcbiAgdG1wcGF0aDpzdHJpbmc7XG4gIHJ1bkxvZ2luOkZ1bmN0aW9uO1xuICBjb25zdHJ1Y3Rvcihjb25maWcsIGNvbnRleHQgPSB7fSkge1xuICAgIHRoaXMuY2x1c3RlciA9IG51bGw7XG4gICAgdGhpcy5wbHVnZ2FibGUgPSBudWxsO1xuICAgIHRoaXMuc2NyYXBlciA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICBcbiAgICAvLyBhd2FpdCB0aGlzLmdldFJlbW90ZUNvbmZpZyhjYW1wYWlnbklkKVxuXG4gICAgdGhpcy5jb25maWcgPSBfLmRlZmF1bHRzKGNvbmZpZywge1xuICAgICAgLy8gcmVtb3RlX2FkZDplbmRjb2ZpZy5SRU1PVEVBREQsXG4gICAgICAvLyByZW1vdGVfdXNlcm5hbWU6ZW5kY29maWcuVVNFUk5BTUUsXG4gICAgICAvLyByZW1vdGVfcGFzc3dvcmQ6ZW5kY29maWcuUEFTU1dPUkQsXG4gICAgICAvLyB0aGUgdXNlciBhZ2VudCB0byBzY3JhcGUgd2l0aFxuICAgICAgdXNlcl9hZ2VudDpcbiAgICAgICAgXCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTA3LjAuMC4wIFNhZmFyaS81MzcuMzZcIixcbiAgICAgIC8vIGlmIHJhbmRvbV91c2VyX2FnZW50IGlzIHNldCB0byBUcnVlLCBhIHJhbmRvbSB1c2VyIGFnZW50IGlzIGNob3NlblxuICAgICAgcmFuZG9tX3VzZXJfYWdlbnQ6IGZhbHNlLFxuICAgICAgLy8gd2hldGhlciB0byBzZWxlY3QgbWFudWFsIHNldHRpbmdzIGluIHZpc2libGUgbW9kZVxuICAgICAgc2V0X21hbnVhbF9zZXR0aW5nczogZmFsc2UsXG4gICAgICAvLyBsb2cgaXAgYWRkcmVzcyBkYXRhXG4gICAgICBsb2dfaXBfYWRkcmVzczogZmFsc2UsXG4gICAgICAvLyBsb2cgaHR0cCBoZWFkZXJzXG4gICAgICBsb2dfaHR0cF9oZWFkZXJzOiBmYWxzZSxcbiAgICAgIC8vIGhvdyBsb25nIHRvIHNsZWVwIGJldHdlZW4gcmVxdWVzdHMuIGEgcmFuZG9tIHNsZWVwIGludGVydmFsIHdpdGhpbiB0aGUgcmFuZ2UgW2EsYl1cbiAgICAgIC8vIGlzIGRyYXduIGJlZm9yZSBldmVyeSByZXF1ZXN0LiBlbXB0eSBzdHJpbmcgZm9yIG5vIHNsZWVwaW5nLlxuICAgICAgc2xlZXBfcmFuZ2U6IG51bGwsXG5cbiAgICAgIGxvZ2dlcjogY3JlYXRlTG9nZ2VyKHtcbiAgICAgICAgbGV2ZWw6IFwiaW5mb1wiLFxuICAgICAgICBmb3JtYXQ6IGNvbWJpbmUoXG4gICAgICAgICAgdGltZXN0YW1wKCksXG4gICAgICAgICAgcHJpbnRmKCh7IGxldmVsLCBtZXNzYWdlLCB0aW1lc3RhbXAgfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RpbWVzdGFtcH0gWyR7bGV2ZWx9XSAke21lc3NhZ2V9YDtcbiAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICB0cmFuc3BvcnRzOiBbbmV3IHRyYW5zcG9ydHMuQ29uc29sZSgpXSxcbiAgICAgIH0pLFxuICAgICAgcGxhdGZvcm06IFwiZmFjZWJvb2tcIixcbiAgICAgIGtleXdvcmRzOiBbXCJub2RlanMgcm9ja3NcIl0sXG4gICAgICAvLyB3aGV0aGVyIHRvIHN0YXJ0IHRoZSBicm93c2VyIGluIGhlYWRsZXNzIG1vZGVcbiAgICAgIGhlYWRsZXNzOiB0cnVlLFxuICAgICAgLy8gc3BlY2lmeSBmbGFncyBwYXNzZWQgdG8gY2hyb21lIGhlcmVcbiAgICAgIC8vIEFib3V0IG91ciBkZWZhdWx0cyB2YWx1ZXMgaHR0cHM6Ly9wZXRlci5zaC9leHBlcmltZW50cy9jaHJvbWl1bS1jb21tYW5kLWxpbmUtc3dpdGNoZXMvXG4gICAgICBjaHJvbWVfZmxhZ3M6IFtcbiAgICAgICAgXCItLWRpc2FibGUtaW5mb2JhcnNcIixcbiAgICAgICAgXCItLXdpbmRvdy1wb3NpdGlvbj0wLDBcIixcbiAgICAgICAgXCItLWlnbm9yZS1jZXJ0aWZjYXRlLWVycm9yc1wiLFxuICAgICAgICBcIi0taWdub3JlLWNlcnRpZmNhdGUtZXJyb3JzLXNwa2ktbGlzdFwiLFxuICAgICAgICBcIi0tbm8tc2FuZGJveFwiLFxuICAgICAgICBcIi0tZGlzYWJsZS1zZXR1aWQtc2FuZGJveFwiLFxuICAgICAgICBcIi0tZGlzYWJsZS1kZXYtc2htLXVzYWdlXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWFjY2VsZXJhdGVkLTJkLWNhbnZhc1wiLFxuICAgICAgICBcIi0tZGlzYWJsZS1ncHVcIixcbiAgICAgICAgXCItLXdpbmRvdy1zaXplPTEyODAsNzY4XCIsXG4gICAgICAgIFwiLS1zdGFydC1mdWxsc2NyZWVuXCIsXG4gICAgICAgIFwiLS1oaWRlLXNjcm9sbGJhcnNcIixcbiAgICAgICAgXCItLWRpc2FibGUtbm90aWZpY2F0aW9uc1wiLFxuICAgICAgXSxcbiAgICAgIC8vZml4IGdvb2dsZSBhY2NvdW50IGNhbiBub3QgbG9naW5cbiAgICAgIGlnbm9yZURlZmF1bHRBcmdzOiBbXG4gICAgICAgIFwiLS1lbmFibGUtYXV0b21hdGlvblwiLFxuICAgICAgICBcIi0tZGlzYWJsZS1leHRlbnNpb25zXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWRlZmF1bHQtYXBwc1wiLFxuICAgICAgICBcIi0tZGlzYWJsZS1jb21wb25lbnQtZXh0ZW5zaW9ucy13aXRoLWJhY2tncm91bmQtcGFnZXNcIixcbiAgICAgIF0sXG4gICAgICAvLyB0aGUgbnVtYmVyIG9mIHBhZ2VzIHRvIHNjcmFwZSBmb3IgZWFjaCBrZXl3b3JkXG4gICAgICBudW1fcGFnZXM6IDEsXG4gICAgICAvLyBwYXRoIHRvIG91dHB1dCBmaWxlLCBkYXRhIHdpbGwgYmUgc3RvcmVkIGluIEpTT05cbiAgICAgIG91dHB1dF9maWxlOiBcIlwiLFxuICAgICAgLy8gd2hldGhlciB0byBhbHNvIHBhc3N0aHJ1IGFsbCB0aGUgaHRtbCBvdXRwdXQgb2YgdGhlIHNlcnAgcGFnZXNcbiAgICAgIGh0bWxfb3V0cHV0OiBmYWxzZSxcbiAgICAgIC8vIHdoZXRoZXIgdG8gc3RyaXAgSlMgYW5kIENTUyBmcm9tIHRoZSBodG1sX291dHB1dFxuICAgICAgLy8gaGFzIG9ubHkgYW4gZWZmZWN0IGlmIGBodG1sX291dHB1dGAgaXMgdHJ1ZVxuICAgICAgY2xlYW5faHRtbF9vdXRwdXQ6IHRydWUsXG4gICAgICAvLyByZW1vdmUgYWxsIGRhdGEgaW1hZ2VzIGZyb20gdGhlIGh0bWxcbiAgICAgIGNsZWFuX2RhdGFfaW1hZ2VzOiB0cnVlLFxuICAgICAgLy8gd2hldGhlciB0byByZXR1cm4gYSBzY3JlZW5zaG90IG9mIHNlcnAgcGFnZXMgYXMgYjY0IGRhdGFcbiAgICAgIHNjcmVlbl9vdXRwdXQ6IGZhbHNlLFxuICAgICAgLy8gU2NyYXBlIHVybCBmcm9tIGxvY2FsIGZpbGUuIE1haW5seSB1c2VkIGZvciB0ZXN0aW5nLlxuICAgICAgc2NyYXBlX2Zyb21fZmlsZTogXCJcIixcbiAgICAgIC8vIHdoZXRoZXIgdG8gcHJldmVudCBpbWFnZXMsIGNzcywgZm9udHMgYW5kIG1lZGlhIGZyb20gYmVpbmcgbG9hZGVkXG4gICAgICAvLyB3aWxsIHNwZWVkIHVwIHNjcmFwaW5nIGEgZ3JlYXQgZGVhbFxuICAgICAgYmxvY2tfYXNzZXRzOiB0cnVlLFxuICAgICAgLy8gcGF0aCB0byBqcyBtb2R1bGUgdGhhdCBleHRlbmRzIGZ1bmN0aW9uYWxpdHlcbiAgICAgIC8vIHRoaXMgbW9kdWxlIHNob3VsZCBleHBvcnQgdGhlIGZ1bmN0aW9uczpcbiAgICAgIC8vIGdldF9icm93c2VyLCBoYW5kbGVfbWV0YWRhdGEsIGNsb3NlX2Jyb3dzZXJcbiAgICAgIC8vY3VzdG9tX2Z1bmM6IHJlc29sdmUoJ2V4YW1wbGVzL3BsdWdnYWJsZS5qcycpLFxuICAgICAgY3VzdG9tX2Z1bmM6IG51bGwsXG4gICAgICB0aHJvd19vbl9kZXRlY3Rpb246IGZhbHNlLFxuICAgICAgLy8gTGlzdCBvZiBwcm94aWVzIHRvIHVzZSBbJ3NvY2tzNTovLzc4Ljk0LjE3Mi40MjoxMDgwJywgJ2h0dHA6Ly9sb2NhbGhvc3Q6MTA4MCddXG4gICAgICBwcm94aWVzOiBudWxsLFxuICAgICAgLy8gYSBmaWxlIHdpdGggb25lIHByb3h5IHBlciBsaW5lLiBFeGFtcGxlOlxuICAgICAgLy8gc29ja3M1Oi8vNzguOTQuMTcyLjQyOjEwODBcbiAgICAgIC8vIGh0dHA6Ly8xMTguMTc0LjIzMy4xMDo0ODQwMFxuICAgICAgcHJveHlfZmlsZTogXCJcIixcbiAgICAgIC8vIHdoZXRoZXIgdG8gdXNlIHByb3hpZXMgb25seVxuICAgICAgLy8gd2hlbiB0aGlzIGlzIHNldCB0byB0cnVlLCBzZS1zY3JhcGVyIHdpbGwgbm90IHVzZVxuICAgICAgLy8geW91ciBkZWZhdWx0IElQIGFkZHJlc3NcbiAgICAgIHVzZV9wcm94aWVzX29ubHk6IGZhbHNlLFxuICAgICAgLy8gY2hlY2sgaWYgaGVhZGxlc3MgY2hyb21lIGVzY2FwZXMgY29tbW9uIGRldGVjdGlvbiB0ZWNobmlxdWVzXG4gICAgICAvLyB0aGlzIGlzIGEgcXVpY2sgdGVzdCBhbmQgc2hvdWxkIGJlIHVzZWQgZm9yIGRlYnVnZ2luZ1xuICAgICAgdGVzdF9ldmFzaW9uOiBmYWxzZSxcbiAgICAgIGFwcGx5X2V2YXNpb25fdGVjaG5pcXVlczogdHJ1ZSxcbiAgICAgIC8vIHNldHRpbmdzIGZvciBwdXBwZXRlZXItY2x1c3RlclxuICAgICAgcHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnOiB7XG4gICAgICAgIHRpbWVvdXQ6IDMwICogNjAgKiAxMDAwLCAvLyBtYXggdGltZW91dCBzZXQgdG8gMzAgbWludXRlc1xuICAgICAgICBtb25pdG9yOiBmYWxzZSxcbiAgICAgICAgY29uY3VycmVuY3k6IENsdXN0ZXIuQ09OQ1VSUkVOQ1lfQlJPV1NFUixcbiAgICAgICAgbWF4Q29uY3VycmVuY3k6IDEsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIFxuICAgIHRoaXMubG9nZ2VyID0gdGhpcy5jb25maWcubG9nZ2VyO1xuXG4gICAgaWYgKGNvbmZpZy5zbGVlcF9yYW5nZSkge1xuICAgICAgLy8gcGFyc2UgYW4gYXJyYXlcbiAgICAgIGNvbmZpZy5zbGVlcF9yYW5nZSA9IGV2YWwoY29uZmlnLnNsZWVwX3JhbmdlKTtcblxuICAgICAgaWYgKFxuICAgICAgICBjb25maWcuc2xlZXBfcmFuZ2UubGVuZ3RoICE9PSAyIFxuICAgICAgKSB7XG4gICAgICAgIHRocm93IFwic2xlZXBfcmFuZ2UgaXMgbm90IGEgdmFsaWQgYXJyYXkgb2YgdHdvIGludGVnZXJzLlwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHRoaXMuY29uZmlnLmtleXdvcmRfZmlsZSkpIHtcbiAgICAgIHRoaXMuY29uZmlnLmtleXdvcmRzID0gcmVhZF9rZXl3b3Jkc19mcm9tX2ZpbGUodGhpcy5jb25maWcua2V5d29yZF9maWxlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcucHJveGllcyAmJiB0aGlzLmNvbmZpZy5wcm94eV9maWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiRWl0aGVyIHVzZSBhIHByb3h5X2ZpbGUgb3Igc3BlY2lmeSBhIHByb3h5IGZvciBhbGwgY29ubmVjdGlvbnMuIERvIG5vdCB1c2UgYm90aCBvcHRpb25zLlwiXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5wcm94eV9maWxlKSB7XG4gICAgICB0aGlzLmNvbmZpZy5wcm94aWVzID0gcmVhZF9rZXl3b3Jkc19mcm9tX2ZpbGUodGhpcy5jb25maWcucHJveHlfZmlsZSk7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKGAke3RoaXMuY29uZmlnLnByb3hpZXMubGVuZ3RofSBwcm94aWVzIHJlYWQgZnJvbSBmaWxlLmApO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jb25maWcucHJveGllcyAmJiB0aGlzLmNvbmZpZy51c2VfcHJveGllc19vbmx5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiTXVzdCBwcm92aWRlIGF0IGxlYXN0IG9uZSBwcm94eSBpbiBwcm94aWVzIGlmIHlvdSBlbmFibGUgdXNlX3Byb3hpZXNfb25seVwiXG4gICAgICApO1xuICAgIH1cblxuICAgIGRlYnVnKFwidGhpcy5jb25maWc9JU9cIiwgdGhpcy5jb25maWcpO1xuICB9XG5cbiAgLypcbiAgICogTGF1bmNoZXMgdGhlIHB1cHBldGVlciBjbHVzdGVyIG9yIGJyb3dzZXIuXG4gICAqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgYnJvd3NlciB3YXMgc3VjY2Vzc2Z1bGx5IGxhdW5jaGVkLiBPdGhlcndpc2Ugd2lsbCByZXR1cm4gZmFsc2UuXG4gICAqL1xuICBhc3luYyBzdGFydCgpIHtcbiAgICBpZiAodGhpcy5jb25maWcuY3VzdG9tX2Z1bmMpIHtcbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHRoaXMuY29uZmlnLmN1c3RvbV9mdW5jKSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IFBsdWdnYWJsZUNsYXNzID0gcmVxdWlyZSh0aGlzLmNvbmZpZy5jdXN0b21fZnVuYyk7XG4gICAgICAgICAgdGhpcy5wbHVnZ2FibGUgPSBuZXcgUGx1Z2dhYmxlQ2xhc3Moe1xuICAgICAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihleGNlcHRpb24pO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRmlsZSBcIiR7dGhpcy5jb25maWcuY3VzdG9tX2Z1bmN9XCIgZG9lcyBub3QgZXhpc3QhYCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaHJvbWVfZmxhZ3MgPSBfLmNsb25lKHRoaXMuY29uZmlnLmNocm9tZV9mbGFncyk7XG5cbiAgICBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuc3RhcnRfYnJvd3Nlcikge1xuICAgICAgLy8gbGF1bmNoX2FyZ3MuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICB0aGlzLmJyb3dzZXIgPSBhd2FpdCB0aGlzLnBsdWdnYWJsZS5zdGFydF9icm93c2VyKHtcbiAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIH0pO1xuICAgICAgLy8gY29uc29sZS5sb2coXCIyMjlcIilcbiAgICAgIHRoaXMucGFnZSA9IGF3YWl0IHRoaXMuYnJvd3Nlci5uZXdQYWdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFxuICAgICAgLy8gaWYgbm8gY3VzdG9tIHN0YXJ0X2Jyb3dzZXIgZnVuY3Rpb25hbGl0eSB3YXMgZ2l2ZW5cbiAgICAgIC8vIHVzZSBwdXBwZXRlZXItY2x1c3RlciBmb3Igc2NyYXBpbmdcblxuICAgICAgbGV0IHByb3hpZXM7XG4gICAgICAvLyBpZiB3ZSBoYXZlIGF0IGxlYXN0IG9uZSBwcm94eSwgYWx3YXlzIHVzZSBDT05DVVJSRU5DWV9CUk9XU0VSXG4gICAgICAvLyBhbmQgc2V0IG1heENvbmN1cnJlbmN5IHRvIHRoaXMuY29uZmlnLnByb3hpZXMubGVuZ3RoICsgMVxuICAgICAgLy8gZWxzZSB1c2Ugd2hhdGV2ZXIgdGhpcy5jb25maWd1cmF0aW9uIHdhcyBwYXNzZWRcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5wcm94aWVzICYmIHRoaXMuY29uZmlnLnByb3hpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBiZWNhdXNlIHdlIHVzZSByZWFsIGJyb3dzZXJzLCB3ZSByYW4gb3V0IG9mIG1lbW9yeSBvbiBub3JtYWwgbGFwdG9wc1xuICAgICAgICAvLyB3aGVuIHVzaW5nIG1vcmUgdGhhbiBtYXliZSA1IG9yIDYgYnJvd3NlcnMuXG4gICAgICAgIC8vIHRoZXJlZm9yZSBoYXJkY29kZSBhIGxpbWl0IGhlcmVcbiAgICAgICAgLy8gVE9ETyBub3Qgc3VyZSB0aGlzIHdoYXQgd2Ugd2FudFxuICAgICAgICB0aGlzLm51bUNsdXN0ZXJzID0gTWF0aC5taW4oXG4gICAgICAgICAgdGhpcy5jb25maWcucHJveGllcy5sZW5ndGggKyAodGhpcy5jb25maWcudXNlX3Byb3hpZXNfb25seSA/IDAgOiAxKSxcbiAgICAgICAgICBNQVhfQUxMT1dFRF9CUk9XU0VSU1xuICAgICAgICApO1xuICAgICAgICBwcm94aWVzID0gXy5jbG9uZSh0aGlzLmNvbmZpZy5wcm94aWVzKTtcblxuICAgICAgICAvLyBJbnNlcnQgYSBmaXJzdCBjb25maWcgd2l0aG91dCBwcm94eSBpZiB1c2VfcHJveHlfb25seSBpcyBmYWxzZVxuICAgICAgICBpZiAodGhpcy5jb25maWcudXNlX3Byb3hpZXNfb25seSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBwcm94aWVzLnVuc2hpZnQobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubnVtQ2x1c3RlcnMgPSB0aGlzLmNvbmZpZy5wdXBwZXRlZXJfY2x1c3Rlcl9jb25maWcubWF4Q29uY3VycmVuY3k7XG4gICAgICAgIHByb3hpZXMgPSBfLnRpbWVzKHRoaXMubnVtQ2x1c3RlcnMsIG51bGwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKGBVc2luZyAke3RoaXMubnVtQ2x1c3RlcnN9IGNsdXN0ZXJzLmApO1xuXG4gICAgICAvLyBHaXZlIHRoZSBwZXIgYnJvd3NlciBvcHRpb25zXG4gICAgICBjb25zdCBwZXJCcm93c2VyT3B0aW9ucyA9IF8ubWFwKHByb3hpZXMsIChwcm94eSkgPT4ge1xuICAgICAgICBjb25zdCB1c2VyQWdlbnQgPSB0aGlzLmNvbmZpZy5yYW5kb21fdXNlcl9hZ2VudFxuICAgICAgICAgID8gbmV3IFVzZXJBZ2VudCh7IGRldmljZUNhdGVnb3J5OiBcImRlc2t0b3BcIiB9KS50b1N0cmluZygpXG4gICAgICAgICAgOiB0aGlzLmNvbmZpZy51c2VyX2FnZW50O1xuICAgICAgICBsZXQgYXJncyA9IGNocm9tZV9mbGFncy5jb25jYXQoW2AtLXVzZXItYWdlbnQ9JHt1c2VyQWdlbnR9YF0pO1xuXG4gICAgICAgIGlmIChwcm94eSkge1xuICAgICAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdChbYC0tcHJveHktc2VydmVyPSR7cHJveHl9YF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoZWFkbGVzczogdGhpcy5jb25maWcuaGVhZGxlc3MsXG4gICAgICAgICAgaWdub3JlSFRUUFNFcnJvcnM6IHRydWUsXG4gICAgICAgICAgYXJncyxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICBkZWJ1ZyhcInBlckJyb3dzZXJPcHRpb25zPSVPXCIsIHBlckJyb3dzZXJPcHRpb25zKTtcblxuICAgICAgLy8gcHVwcGV0ZWVyLnVzZShfU3RlYWx0aFBsdWdpbigpKTtcbiAgICAgIC8vIHB1cHBldGVlci51c2UoX0FkYmxvY2tlclBsdWdpbigpKTtcblxuICAgICAgY29uc3QgcHVwcGV0ZWVyID0gYWRkRXh0cmEodmFuaWxsYVB1cHBldGVlcik7XG5cbiAgICAgIC8vIEFkZCBzdGVhbHRoIHBsdWdpbiBhbmQgdXNlIGRlZmF1bHRzIChhbGwgdHJpY2tzIHRvIGhpZGUgcHVwcGV0ZWVyIHVzYWdlKVxuICAgICAgLy8gIHB1cHBldGVlci51c2UoU3RlYWx0aCgpKTtcblxuICAgICAgLy8gQWRkIGFkYmxvY2tlciBwbHVnaW4gdG8gYmxvY2sgYWxsIGFkcyBhbmQgdHJhY2tlcnMgKHNhdmVzIGJhbmR3aWR0aClcbiAgICAgIC8vIHB1cHBldGVlci51c2UoQWRibG9ja2VyUGx1Z2luKHsgYmxvY2tUcmFja2VyczogdHJ1ZSB9KSk7XG5cbiAgICAgIHRoaXMuY2x1c3RlciA9IGF3YWl0IENsdXN0ZXIubGF1bmNoKHtcbiAgICAgICAgcHVwcGV0ZWVyLFxuICAgICAgICBtb25pdG9yOiB0aGlzLmNvbmZpZy5wdXBwZXRlZXJfY2x1c3Rlcl9jb25maWcubW9uaXRvcixcbiAgICAgICAgdGltZW91dDogdGhpcy5jb25maWcucHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnLnRpbWVvdXQsIC8vIG1heCB0aW1lb3V0IHNldCB0byAzMCBtaW51dGVzXG4gICAgICAgIGNvbmN1cnJlbmN5OiBDdXN0b21Db25jdXJyZW5jeUltcGwsXG4gICAgICAgIG1heENvbmN1cnJlbmN5OiB0aGlzLm51bUNsdXN0ZXJzLFxuICAgICAgICBwdXBwZXRlZXJPcHRpb25zOiB7XG4gICAgICAgICAgLy8gcHVwcGV0ZWVyOnB1cHBldGVlcixcbiAgICAgICAgICBwZXJCcm93c2VyT3B0aW9uczogcGVyQnJvd3Nlck9wdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBsb2dpbiB0aGUgc29jaWxhIG1lZGlhIHBsYXRmb3JtXG4gICAqL1xuICBhc3luYyBsb2dpbihzY3JhcGVfY29uZmlnID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcblxuICAgIC8vIHZhciByZXN1bHRzID0ge307XG4gICAgLy8gdmFyIG51bV9yZXF1ZXN0cyA9IDA7XG4gICAgLy8gdmFyIG1ldGFkYXRhID0ge307XG4gICAgLy8gdmFyIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG5cbiAgICBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuc3RhcnRfYnJvd3Nlcikge1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5jb25maWcucGxhdGZvcm0pXG4gICAgICB0aGlzLnNjcmFwZXIgPSBnZXRTY3JhcGVyKHRoaXMuY29uZmlnLnBsYXRmb3JtLCB7XG4gICAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcbiAgICAgICAgcGx1Z2dhYmxlOiB0aGlzLnBsdWdnYWJsZSxcbiAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxuICAgICAgICB0bXBwYXRoOiB0aGlzLnRtcHBhdGgsXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgdGhpcy5zY3JhcGVyLnJ1bkxvZ2luKHRoaXMucGFnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEVhY2ggYnJvd3NlciB3aWxsIGdldCBOLyhLKzEpIGtleXdvcmRzIGFuZCB3aWxsIGlzc3VlIE4vKEsrMSkgKiBNIHRvdGFsIHJlcXVlc3RzIHRvIHRoZSBzZWFyY2ggZW5naW5lLlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9wdXBwZXRlZXIvaXNzdWVzLzY3OFxuICAgICAgLy8gVGhlIHF1ZXN0aW9uIGlzOiBJcyBpdCBwb3NzaWJsZSB0byBzZXQgcHJveGllcyBwZXIgUGFnZT8gUGVyIEJyb3dzZXI/XG4gICAgICAvLyBhcyBmYXIgYXMgSSBjYW4gc2VlLCBwdXBwZXRlZXIgY2x1c3RlciB1c2VzIHRoZSBzYW1lIHB1cHBldGVlck9wdGlvbnNcbiAgICAgIC8vIGZvciBldmVyeSBicm93c2VyIGluc3RhbmNlLiBXZSB3aWxsIHVzZSBvdXIgY3VzdG9tIHB1cHBldGVlci1jbHVzdGVyIHZlcnNpb24uXG4gICAgICAvLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9wcm94eS1jaGFpblxuICAgICAgLy8gdGhpcyBhbnN3ZXIgbG9va3MgbmljZTogaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9wdXBwZXRlZXIvaXNzdWVzLzY3OCNpc3N1ZWNvbW1lbnQtMzg5MDk2MDc3XG4gICAgICBsZXQgY2h1bmtzID0gW107XG4gICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHRoaXMubnVtQ2x1c3RlcnM7IG4rKykge1xuICAgICAgICBjaHVua3MucHVzaChbXSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuY29uZmlnLmtleXdvcmRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGNodW5rc1trICUgdGhpcy5udW1DbHVzdGVyc10ucHVzaCh0aGlzLmNvbmZpZy5rZXl3b3Jkc1trXSk7XG4gICAgICB9XG5cbiAgICAgIGRlYnVnKFwiY2h1bmtzPSVvXCIsIGNodW5rcyk7XG5cbiAgICAgIGxldCBleGVjUHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgY2h1bmtzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IF8uY2xvbmUodGhpcy5jb25maWcpO1xuICAgICAgICBjb25maWcua2V5d29yZHMgPSBjaHVua3NbY107XG5cbiAgICAgICAgdmFyIG9iaiA9IGdldFNjcmFwZXIodGhpcy5jb25maWcucGxhdGZvcm0sIHtcbiAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICBjb250ZXh0OiB7fSxcbiAgICAgICAgICBwbHVnZ2FibGU6IHRoaXMucGx1Z2dhYmxlLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgYm91bmRNZXRob2QgPSBvYmoucnVuTG9naW4uYmluZChvYmopO1xuICAgICAgICBleGVjUHJvbWlzZXMucHVzaCh0aGlzLmNsdXN0ZXIuZXhlY3V0ZSh7fSwgYm91bmRNZXRob2QpKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoZXhlY1Byb21pc2VzKTtcblxuICAgICAgLy8gTWVyZ2UgcmVzdWx0cyBhbmQgbWV0YWRhdGEgcGVyIGtleXdvcmRcbiAgICAgIC8vIGZvciAobGV0IHByb21pc2VSZXR1cm4gb2YgcHJvbWlzZVJldHVybnMpIHtcbiAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKHJlc3VsdHMsIHByb21pc2VSZXR1cm4ucmVzdWx0cyk7XG4gICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihtZXRhZGF0YSwgcHJvbWlzZVJldHVybi5tZXRhZGF0YSk7XG4gICAgICAvLyAgICAgbnVtX3JlcXVlc3RzICs9IHByb21pc2VSZXR1cm4ubnVtX3JlcXVlc3RzO1xuICAgICAgLy8gfVxuICAgIH1cblxuICAgIC8vIGxldCB0aW1lRGVsdGEgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgIC8vIGxldCBtc19wZXJfcmVxdWVzdCA9IHRpbWVEZWx0YS9udW1fcmVxdWVzdHM7XG5cbiAgICAvLyB0aGlzLmxvZ2dlci5pbmZvKGBTY3JhcGVyIHRvb2sgJHt0aW1lRGVsdGF9bXMgdG8gcGVyZm9ybSAke251bV9yZXF1ZXN0c30gcmVxdWVzdHMuYCk7XG4gICAgLy8gdGhpcy5sb2dnZXIuaW5mbyhgT24gYXZlcmFnZSBtcy9yZXF1ZXN0OiAke21zX3Blcl9yZXF1ZXN0fW1zL3JlcXVlc3RgKTtcblxuICAgIC8vIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfcmVzdWx0cykge1xuICAgIC8vICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfcmVzdWx0cyhyZXN1bHRzKTtcbiAgICAvLyB9XG5cbiAgICAvLyBtZXRhZGF0YS5lbGFwc2VkX3RpbWUgPSB0aW1lRGVsdGEudG9TdHJpbmcoKTtcbiAgICAvLyBtZXRhZGF0YS5tc19wZXJfa2V5d29yZCA9IG1zX3Blcl9yZXF1ZXN0LnRvU3RyaW5nKCk7XG4gICAgLy8gbWV0YWRhdGEubnVtX3JlcXVlc3RzID0gbnVtX3JlcXVlc3RzO1xuXG4gICAgLy8gZGVidWcoJ21ldGFkYXRhPSVPJywgbWV0YWRhdGEpO1xuXG4gICAgLy8gaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9tZXRhZGF0YSkge1xuICAgIC8vICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfbWV0YWRhdGEobWV0YWRhdGEpO1xuICAgIC8vIH1cblxuICAgIC8vIGlmICh0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZSkge1xuICAgIC8vICAgICB0aGlzLmxvZ2dlci5pbmZvKGBXcml0aW5nIHJlc3VsdHMgdG8gJHt0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZX1gKTtcbiAgICAvLyAgICAgd3JpdGVfcmVzdWx0cyh0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZSwgSlNPTi5zdHJpbmdpZnkocmVzdWx0cywgbnVsbCwgNCkpO1xuICAgIC8vIH1cblxuICAgIC8vIHJldHVybiB7XG4gICAgLy8gICAgIHJlc3VsdHM6IHJlc3VsdHMsXG4gICAgLy8gICAgIG1ldGFkYXRhOiBtZXRhZGF0YSB8fCB7fSxcbiAgICAvLyB9O1xuICB9XG5cbiAgLypcbiAgICogZ2V0IGRhdGEgdXJsIGZyb20gcGxhdGZvcm1cbiAgICovXG4gIGFzeW5jIHNlYXJjaGRhdGEoc2NyYXBlX2NvbmZpZyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgc2NyYXBlX2NvbmZpZyk7XG5cbiAgICBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuc3RhcnRfYnJvd3Nlcikge1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5jb25maWcucGxhdGZvcm0pXG4gICAgICB0aGlzLnNjcmFwZXIgPSBnZXRTY3JhcGVyKHRoaXMuY29uZmlnLnBsYXRmb3JtLCB7XG4gICAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcbiAgICAgICAgcGx1Z2dhYmxlOiB0aGlzLnBsdWdnYWJsZSxcbiAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxuICAgICAgICB0bXBwYXRoOiB0aGlzLnRtcHBhdGgsXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgdGhpcy5zY3JhcGVyLndvcmtlcnNlYXJjaGRhdGEodGhpcy5wYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRWFjaCBicm93c2VyIHdpbGwgZ2V0IE4vKEsrMSkga2V5d29yZHMgYW5kIHdpbGwgaXNzdWUgTi8oSysxKSAqIE0gdG90YWwgcmVxdWVzdHMgdG8gdGhlIHNlYXJjaCBlbmdpbmUuXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3B1cHBldGVlci9pc3N1ZXMvNjc4XG4gICAgICAvLyBUaGUgcXVlc3Rpb24gaXM6IElzIGl0IHBvc3NpYmxlIHRvIHNldCBwcm94aWVzIHBlciBQYWdlPyBQZXIgQnJvd3Nlcj9cbiAgICAgIC8vIGFzIGZhciBhcyBJIGNhbiBzZWUsIHB1cHBldGVlciBjbHVzdGVyIHVzZXMgdGhlIHNhbWUgcHVwcGV0ZWVyT3B0aW9uc1xuICAgICAgLy8gZm9yIGV2ZXJ5IGJyb3dzZXIgaW5zdGFuY2UuIFdlIHdpbGwgdXNlIG91ciBjdXN0b20gcHVwcGV0ZWVyLWNsdXN0ZXIgdmVyc2lvbi5cbiAgICAgIC8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3Byb3h5LWNoYWluXG4gICAgICAvLyB0aGlzIGFuc3dlciBsb29rcyBuaWNlOiBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3B1cHBldGVlci9pc3N1ZXMvNjc4I2lzc3VlY29tbWVudC0zODkwOTYwNzdcbiAgICAgIGxldCBjaHVua3MgPSBbXTtcbiAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdGhpcy5udW1DbHVzdGVyczsgbisrKSB7XG4gICAgICAgIGNodW5rcy5wdXNoKFtdKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5jb25maWcua2V5d29yZHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgY2h1bmtzW2sgJSB0aGlzLm51bUNsdXN0ZXJzXS5wdXNoKHRoaXMuY29uZmlnLmtleXdvcmRzW2tdKTtcbiAgICAgIH1cblxuICAgICAgZGVidWcoXCJjaHVua3M9JW9cIiwgY2h1bmtzKTtcblxuICAgICAgbGV0IGV4ZWNQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBjaHVua3MubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gXy5jbG9uZSh0aGlzLmNvbmZpZyk7XG4gICAgICAgIGNvbmZpZy5rZXl3b3JkcyA9IGNodW5rc1tjXTtcblxuICAgICAgICB2YXIgb2JqID0gZ2V0U2NyYXBlcih0aGlzLmNvbmZpZy5wbGF0Zm9ybSwge1xuICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgICAgIHBsdWdnYWJsZTogdGhpcy5wbHVnZ2FibGUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBib3VuZE1ldGhvZCA9IG9iai53b3JrZXJzZWFyY2hkYXRhLmJpbmQob2JqKTtcbiAgICAgICAgZXhlY1Byb21pc2VzLnB1c2godGhpcy5jbHVzdGVyLmV4ZWN1dGUoe30sIGJvdW5kTWV0aG9kKSk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGV4ZWNQcm9taXNlcyk7XG5cbiAgICAgIC8vIE1lcmdlIHJlc3VsdHMgYW5kIG1ldGFkYXRhIHBlciBrZXl3b3JkXG4gICAgICAvLyBmb3IgKGxldCBwcm9taXNlUmV0dXJuIG9mIHByb21pc2VSZXR1cm5zKSB7XG4gICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHRzLCBwcm9taXNlUmV0dXJuLnJlc3VsdHMpO1xuICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24obWV0YWRhdGEsIHByb21pc2VSZXR1cm4ubWV0YWRhdGEpO1xuICAgICAgLy8gICAgIG51bV9yZXF1ZXN0cyArPSBwcm9taXNlUmV0dXJuLm51bV9yZXF1ZXN0cztcbiAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvLyBsZXQgdGltZURlbHRhID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAvLyBsZXQgbXNfcGVyX3JlcXVlc3QgPSB0aW1lRGVsdGEvbnVtX3JlcXVlc3RzO1xuXG4gICAgLy8gdGhpcy5sb2dnZXIuaW5mbyhgU2NyYXBlciB0b29rICR7dGltZURlbHRhfW1zIHRvIHBlcmZvcm0gJHtudW1fcmVxdWVzdHN9IHJlcXVlc3RzLmApO1xuICAgIC8vIHRoaXMubG9nZ2VyLmluZm8oYE9uIGF2ZXJhZ2UgbXMvcmVxdWVzdDogJHttc19wZXJfcmVxdWVzdH1tcy9yZXF1ZXN0YCk7XG5cbiAgICAvLyBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX3Jlc3VsdHMpIHtcbiAgICAvLyAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX3Jlc3VsdHMocmVzdWx0cyk7XG4gICAgLy8gfVxuXG4gICAgLy8gbWV0YWRhdGEuZWxhcHNlZF90aW1lID0gdGltZURlbHRhLnRvU3RyaW5nKCk7XG4gICAgLy8gbWV0YWRhdGEubXNfcGVyX2tleXdvcmQgPSBtc19wZXJfcmVxdWVzdC50b1N0cmluZygpO1xuICAgIC8vIG1ldGFkYXRhLm51bV9yZXF1ZXN0cyA9IG51bV9yZXF1ZXN0cztcblxuICAgIC8vIGRlYnVnKCdtZXRhZGF0YT0lTycsIG1ldGFkYXRhKTtcblxuICAgIC8vIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfbWV0YWRhdGEpIHtcbiAgICAvLyAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX21ldGFkYXRhKG1ldGFkYXRhKTtcbiAgICAvLyB9XG5cbiAgICAvLyBpZiAodGhpcy5jb25maWcub3V0cHV0X2ZpbGUpIHtcbiAgICAvLyAgICAgdGhpcy5sb2dnZXIuaW5mbyhgV3JpdGluZyByZXN1bHRzIHRvICR7dGhpcy5jb25maWcub3V0cHV0X2ZpbGV9YCk7XG4gICAgLy8gICAgIHdyaXRlX3Jlc3VsdHModGhpcy5jb25maWcub3V0cHV0X2ZpbGUsIEpTT04uc3RyaW5naWZ5KHJlc3VsdHMsIG51bGwsIDQpKTtcbiAgICAvLyB9XG5cbiAgICAvLyByZXR1cm4ge1xuICAgIC8vICAgICByZXN1bHRzOiByZXN1bHRzLFxuICAgIC8vICAgICBtZXRhZGF0YTogbWV0YWRhdGEgfHwge30sXG4gICAgLy8gfTtcbiAgfVxuXG4gIC8qXG4gICAqIFF1aXQgdGhlIHB1cHBldGVlciBjbHVzdGVyL2Jyb3dzZXIuXG4gICAqL1xuICBhc3luYyBxdWl0KCkge1xuICAgIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5jbG9zZV9icm93c2VyKSB7XG4gICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5jbG9zZV9icm93c2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHRoaXMuY2x1c3Rlci5pZGxlKCk7XG4gICAgICBhd2FpdCB0aGlzLmNsdXN0ZXIuY2xvc2UoKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNjcmFwZU1hbmFnZXI6IFNjcmFwZU1hbmFnZXIsXG59O1xuIiwiY29uc3QgeyBCcm93c2VyIH0gPSByZXF1aXJlKCdwdXBwZXRlZXItY2x1c3Rlci9kaXN0L2NvbmN1cnJlbmN5L2J1aWx0SW5Db25jdXJyZW5jeScpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzZS1zY3JhcGVyOkN1c3RvbUNvbmN1cnJlbmN5Jyk7XG5jb25zdCB7IHRpbWVvdXRFeGVjdXRlIH0gPSByZXF1aXJlKCdwdXBwZXRlZXItY2x1c3Rlci9kaXN0L3V0aWwnKTtcblxuY29uc3QgQlJPV1NFUl9USU1FT1VUID0gNTAwMDtcblxuY2xhc3MgQ3VzdG9tQ29uY3VycmVuY3kgZXh0ZW5kcyBCcm93c2VyIHtcblxuICAgIGFzeW5jIGluaXQoKSB7fVxuICAgIGFzeW5jIGNsb3NlKCkge31cblxuICAgIGFzeW5jIHdvcmtlckluc3RhbmNlKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zLnBlckJyb3dzZXJPcHRpb25zLnNoaWZ0KCk7XG4gICAgICAgIGRlYnVnKCdMYXVuY2ggcHVwcGV0ZWVyIGluc3RhbmNlIHdpdGggb3B0aW9ucz0lbycsIG9wdGlvbnMpO1xuICAgICAgICBsZXQgY2hyb21lID0gYXdhaXQgdGhpcy5wdXBwZXRlZXIubGF1bmNoKG9wdGlvbnMpO1xuICAgICAgICBsZXQgcGFnZTtcbiAgICAgICAgbGV0IGNvbnRleHQ7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGpvYkluc3RhbmNlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGltZW91dEV4ZWN1dGUoQlJPV1NFUl9USU1FT1VULCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gYXdhaXQgY2hyb21lLmNyZWF0ZUluY29nbml0b0Jyb3dzZXJDb250ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2UgPSBhd2FpdCBjb250ZXh0Lm5ld1BhZ2UoKTtcbiAgICAgICAgICAgICAgICB9KSgpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBjbG9zZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGltZW91dEV4ZWN1dGUoQlJPV1NFUl9USU1FT1VULCBjb250ZXh0LmNsb3NlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjbG9zZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IGNocm9tZS5jbG9zZSgpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVwYWlyOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ1N0YXJ0aW5nIHJlcGFpcicpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdpbGwgcHJvYmFibHkgZmFpbCwgYnV0IGp1c3QgaW4gY2FzZSB0aGUgcmVwYWlyIHdhcyBub3QgbmVjZXNzYXJ5XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGNocm9tZS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgICAgICAgICAvLyBqdXN0IHJlbGF1bmNoIGFzIHRoZXJlIGlzIG9ubHkgb25lIHBhZ2UgcGVyIGJyb3dzZXJcbiAgICAgICAgICAgICAgICBjaHJvbWUgPSBhd2FpdCB0aGlzLnB1cHBldGVlci5sYXVuY2gob3B0aW9ucyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ3VzdG9tQ29uY3VycmVuY3k7IiwiY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCBjcnlwdG8gPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuY29uc3QgaHR0cHMgPSByZXF1aXJlKFwiaHR0cHNcIik7XG5jb25zdCBwcm9ncmVzcyA9IHJlcXVpcmUoXCJwcm9ncmVzcy1zdHJlYW1cIik7XG5cbmNsYXNzIFRhc2sge1xuXHRjb25zdHJ1Y3Rvcih1cmwpIHtcblx0XHR0aGlzLnVybCA9IHVybDtcblx0XHR0aGlzLmZpbmlzaGVkID0gZmFsc2U7XG5cdH1cbn1cblxuY2xhc3MgRG93bmxvYWRlciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMudHlwZSA9IFwiXCI7XG5cdFx0dGhpcy5pZCA9IFwiXCI7XG5cdFx0dGhpcy51cmwgPSBcIlwiO1xuXHRcdHRoaXMuYWlkID0gLTE7XG5cdFx0dGhpcy5waWQgPSAxO1xuXHRcdHRoaXMuY2lkID0gLTE7XG5cdFx0dGhpcy5uYW1lID0gXCJcIjtcblx0XHR0aGlzLmxpbmtzID0gW107XG5cdFx0dGhpcy50YXNrcyA9IFtdO1xuXHR9XG5cblx0Z2V0VmlkZW9VcmwodmlkZW9VcmwpIHtcblx0XHR0aGlzLnVybCA9IFwiXCI7XG5cdFx0Y29uc3QgbWFwcGluZyA9IHtcblx0XHRcdFwiQlZcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vdmlkZW8vXCIsXG5cdFx0XHRcImJ2XCI6IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL3ZpZGVvL1wiLFxuXHRcdFx0XCJhdlwiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS92aWRlby9cIixcblx0XHRcdFwiZXBcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vYmFuZ3VtaS9wbGF5L1wiLFxuXHRcdFx0XCJzc1wiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS9iYW5ndW1pL3BsYXkvXCJcblx0XHR9O1xuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG1hcHBpbmcpKSB7XG5cdFx0XHRpZiAodmlkZW9VcmwuaW5jbHVkZXMoa2V5KSkge1xuXHRcdFx0XHR0aGlzLnR5cGUgPSBrZXk7XG5cdFx0XHRcdHRoaXMuaWQgPSBrZXkgKyB2aWRlb1VybC5zcGxpdChrZXkpWzFdO1xuXHRcdFx0XHR0aGlzLnVybCA9IHZhbHVlICsgdGhpcy5pZDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YXN5bmMgZ2V0QWlkKCkge1xuXHRcdGNvbnN0IHsgdHlwZSwgdXJsIH0gPSB0aGlzO1xuXHRcdGlmICghdXJsKSByZXR1cm47XG5cdFx0cmV0dXJuIGZldGNoKHVybClcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcblx0XHRcdC50aGVuKHJlc3VsdCA9PiB7XG5cdFx0XHRcdGxldCBkYXRhID0gcmVzdWx0Lm1hdGNoKC9fX0lOSVRJQUxfU1RBVEVfXz0oLio/KTtcXChmdW5jdGlvblxcKFxcKS8pWzFdO1xuXHRcdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJJTklUSUFMIFNUQVRFXCIsIGRhdGEpO1xuXHRcdFx0XHRpZiAodHlwZSA9PT0gXCJCVlwiIHx8IHR5cGUgPT09IFwiYnZcIiB8fCB0eXBlID09PSBcImF2XCIpIHtcblx0XHRcdFx0XHR0aGlzLmFpZCA9IGRhdGEudmlkZW9EYXRhLmFpZDtcblx0XHRcdFx0XHR0aGlzLnBpZCA9IHBhcnNlSW50KHVybC5zcGxpdChcInA9XCIpWzFdLCAxMCkgfHwgMTtcblx0XHRcdFx0XHR0aGlzLmNpZCA9IGRhdGEudmlkZW9EYXRhLnBhZ2VzW3RoaXMucGlkIC0gMV0uY2lkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKHR5cGUgPT09IFwiZXBcIikge1xuXHRcdFx0XHRcdHRoaXMuYWlkID0gZGF0YS5lcEluZm8uYWlkO1xuXHRcdFx0XHRcdHRoaXMuY2lkID0gZGF0YS5lcEluZm8uY2lkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKHR5cGUgPT09IFwic3NcIikge1xuXHRcdFx0XHRcdHRoaXMuYWlkID0gZGF0YS5lcExpc3RbMF0uYWlkO1xuXHRcdFx0XHRcdHRoaXMuY2lkID0gZGF0YS5lcExpc3RbMF0uY2lkO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGVycm9yID0+IHNob3dFcnJvcihcIuiOt+WPluinhumikSBhaWQg5Ye66ZSZ77yBXCIpKTtcblx0fVxuXG5cdGFzeW5jIGdldEluZm8oKSB7XG5cdFx0Y29uc3QgeyBhaWQsIGNpZCB9ID0gdGhpcztcblx0XHRpZiAoIWNpZCkge1xuXHRcdFx0c2hvd0Vycm9yKFwi6I635Y+W6KeG6aKRIGNpZCDlh7rplJnvvIFcIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vIGdldERhbm1ha3UoKTsgLy/ojrflj5ZjaWTlkI7vvIzojrflj5bkuIvovb3pk77mjqXlkozlvLnluZXkv6Hmga9cblx0XHRyZXR1cm4gZmV0Y2goXCJodHRwczovL2FwaS5iaWxpYmlsaS5jb20veC93ZWItaW50ZXJmYWNlL3ZpZXc/YWlkPVwiICsgYWlkKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuXHRcdFx0LmNhdGNoKGVycm9yID0+IHNob3dFcnJvcihcIuiOt+WPluinhumikeS/oeaBr+WHuumUme+8gVwiKSk7XG5cdH1cblxuXHRhc3luYyBnZXREYXRhKGZhbGxiYWNrKSB7XG5cdFx0Y29uc3QgeyBjaWQsIHR5cGUgfSA9IHRoaXM7XG5cdFx0bGV0IHBsYXlVcmw7XG5cdFx0aWYgKGZhbGxiYWNrKSB7XG5cdFx0XHRjb25zdCBwYXJhbXMgPSBgY2lkPSR7Y2lkfSZtb2R1bGU9bW92aWUmcGxheWVyPTEmcXVhbGl0eT0xMTImdHM9MWA7XG5cdFx0XHRjb25zdCBzaWduID0gY3J5cHRvLmNyZWF0ZUhhc2goXCJtZDVcIikudXBkYXRlKHBhcmFtcyArIFwiOWIyODgxNDdlNTQ3NGRkMmFhNjcwODVmNzE2YzU2MGRcIikuZGlnZXN0KFwiaGV4XCIpO1xuXHRcdFx0cGxheVVybCA9IGBodHRwczovL2Jhbmd1bWkuYmlsaWJpbGkuY29tL3BsYXllci93ZWJfYXBpL3BsYXl1cmw/JHtwYXJhbXN9JnNpZ249JHtzaWdufWA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0eXBlID09PSBcIkJWXCIgfHwgdHlwZSA9PT0gXCJidlwiIHx8IHR5cGUgPT09IFwiYXZcIikge1xuXHRcdFx0XHRjb25zdCBwYXJhbXMgPSBgYXBwa2V5PWlWR1VUanN4dnBMZXVEQ2YmY2lkPSR7Y2lkfSZvdHlwZT1qc29uJnFuPTExMiZxdWFsaXR5PTExMiZ0eXBlPWA7XG5cdFx0XHRcdGNvbnN0IHNpZ24gPSBjcnlwdG8uY3JlYXRlSGFzaChcIm1kNVwiKS51cGRhdGUocGFyYW1zICsgXCJhSFJtaFdNTGtkZU11SUxxT1JuWVpvY3dNQnBNRU9kdFwiKS5kaWdlc3QoXCJoZXhcIik7XG5cdFx0XHRcdHBsYXlVcmwgPSBgaHR0cHM6Ly9pbnRlcmZhY2UuYmlsaWJpbGkuY29tL3YyL3BsYXl1cmw/JHtwYXJhbXN9JnNpZ249JHtzaWdufWA7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwbGF5VXJsID0gYGh0dHBzOi8vYXBpLmJpbGliaWxpLmNvbS9wZ2MvcGxheWVyL3dlYi9wbGF5dXJsP3FuPTgwJmNpZD0ke2NpZH1gO1xuXHRcdFx0XHRcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZldGNoKHBsYXlVcmwpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG5cdFx0XHQudGhlbihyZXN1bHQgPT4ge1xuXHRcdFx0XHRjb25zdCBkYXRhID0gZmFsbGJhY2sgPyB0aGlzLnBhcnNlRGF0YShyZXN1bHQpIDogSlNPTi5wYXJzZShyZXN1bHQpO1xuXHRcdFx0XHRjb25zdCB0YXJnZXQgPSBkYXRhLmR1cmwgfHwgZGF0YS5yZXN1bHQuZHVybDtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJQTEFZIFVSTFwiLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua3MgPSB0YXJnZXQubWFwKHBhcnQgPT4gcGFydC51cmwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2ssIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgfTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoZmFsbGJhY2spIHRocm93IEVycm9yKCk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSh0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdHNob3dFcnJvcihcIuiOt+WPliBQbGF5VXJsIOaIluS4i+i9vemTvuaOpeWHuumUme+8geeUseS6jkLnq5npmZDliLbvvIzlj6rog73kuIvovb3kvY7muIXmmbDluqbop4bpopHjgIJcIik7XG5cdFx0XHR9KTtcblx0fVxuXG5cdHBhcnNlRGF0YSh0YXJnZXQpIHtcblx0XHRjb25zdCBkYXRhID0gJCh0YXJnZXQpO1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXHRcdHJlc3VsdC5kdXJsID0gW107XG5cdFx0cmVzdWx0LnF1YWxpdHkgPSBkYXRhLmZpbmQoXCJxdWFsaXR5XCIpLnRleHQoKTtcblx0XHRkYXRhLmZpbmQoXCJkdXJsXCIpLmVhY2goKGksIG8pID0+IHtcblx0XHRcdGNvbnN0IHBhcnQgPSAkKG8pO1xuXHRcdFx0cmVzdWx0LmR1cmwucHVzaCh7XG5cdFx0XHRcdHVybDogcGFydC5maW5kKFwidXJsXCIpLnRleHQoKSxcblx0XHRcdFx0b3JkZXI6IHBhcnQuZmluZChcIm9yZGVyXCIpLnRleHQoKSxcblx0XHRcdFx0bGVuZ3RoOiBwYXJ0LmZpbmQoXCJsZW5ndGhcIikudGV4dCgpLFxuXHRcdFx0XHRzaXplOiBwYXJ0LmZpbmQoXCJzaXplXCIpLnRleHQoKVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGRvd25sb2FkQnlJbmRleChwYXJ0LCBmaWxlLCBjYWxsYmFjayA9ICgpID0+IHt9KSB7XG5cdFx0Y29uc3QgeyB1cmwgfSA9IHRoaXM7XG5cblx0XHRpZiAodGhpcy50YXNrcy5zb21lKGl0ZW0gPT4gaXRlbS51cmwgPT09IHRoaXMubGlua3NbcGFydF0pKSByZXR1cm4gXCJEVVBMSUNBVEVcIjtcblx0XHR0aGlzLnRhc2tzLnB1c2gobmV3IFRhc2sodGhpcy5saW5rc1twYXJ0XSkpO1xuXHRcdGxldCBzdGF0ZTtcblx0XHR0cnkge1xuXHRcdFx0c3RhdGUgPSBmcy5zdGF0U3luYyhmaWxlKTtcblx0XHR9XG5cdFx0Y2F0Y2ggKGVycm9yKSB7XG5cdFx0fVxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHR1cmw6IHRoaXMubGlua3NbcGFydF0sXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFwiUmFuZ2VcIjogYGJ5dGVzPSR7c3RhdGUgPyBzdGF0ZS5zaXplIDogMH0tYCwgLy/mlq3ngrnnu63kvKBcblx0XHRcdFx0XCJVc2VyLUFnZW50XCI6IFwiTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNykgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkwLjAuNDQzMC4yMTIgU2FmYXJpLzUzNy4zNlwiLFxuXHRcdFx0XHRcIlJlZmVyZXJcIjogdXJsXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRjb25zdCBzdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShmaWxlLCBzdGF0ZSA/IHsgZmxhZ3M6IFwiYVwiIH0gOiB7fSk7XG5cdFx0dGhpcy5kb3dubG9hZChvcHRpb25zLCBzdHJlYW0sIGNhbGxiYWNrKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGRvd25sb2FkKG9wdGlvbnMsIHN0cmVhbSwgY2FsbGJhY2spIHtcblx0XHQvLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9wcm9ncmVzcy1zdHJlYW1cblx0XHRjb25zdCBpbmRleCA9IHRoaXMudGFza3MuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS51cmwgPT09IG9wdGlvbnMudXJsKTtcblx0XHRjb25zdCBwcm9TdHJlYW0gPSBwcm9ncmVzcyh7XG5cdFx0XHR0aW1lOiAyNTAgLy/ljZXkvY1tc1xuXHRcdH0pLm9uKFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3MgPT4ge1xuXHRcdFx0Y29uc3QgeyBwZXJjZW50YWdlIH0gPSBwcm9ncmVzczsgLy/mmL7npLrov5vluqbmnaFcblx0XHRcdGlmIChwZXJjZW50YWdlID09PSAxMDApIHtcblx0XHRcdFx0dGhpcy50YXNrc1tpbmRleF0uZmluaXNoZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0Y2FsbGJhY2socHJvZ3Jlc3MsIGluZGV4KTtcblx0XHR9KTtcblxuXHRcdGxldCB7IHVybCB9ID0gb3B0aW9ucztcblx0XHRmdW5jdGlvbiBkb3dubG9hZExpbmsodXJsKSB7XG5cdFx0XHQodXJsLnN0YXJ0c1dpdGgoXCJodHRwc1wiKSA/IGh0dHBzIDogaHR0cCkuZ2V0KHVybCwgb3B0aW9ucywgcmVzID0+IHtcblx0XHRcdFx0aWYgKHJlcy5zdGF0dXNDb2RlID09PSAzMDIpIHtcblx0XHRcdFx0XHR1cmwgPSByZXMuaGVhZGVycy5sb2NhdGlvbjtcblx0XHRcdFx0XHRyZXR1cm4gZG93bmxvYWRMaW5rKHVybCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHJvU3RyZWFtLnNldExlbmd0aChyZXMuaGVhZGVyc1tcImNvbnRlbnQtbGVuZ3RoXCJdKTtcblx0XHRcdFx0Ly/lhYhwaXBl5YiwcHJvU3RyZWFt5YaNcGlwZeWIsOaWh+S7tueahOWGmeWFpea1geS4rVxuXHRcdFx0XHRyZXMucGlwZShwcm9TdHJlYW0pLnBpcGUoc3RyZWFtKS5vbihcImVycm9yXCIsIGVycm9yID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZG93bmxvYWRMaW5rKHVybCk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IFRhc2ssIERvd25sb2FkZXIgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBjaGVlcmlvID0gcmVxdWlyZShcImNoZWVyaW9cIik7XG5jb25zdCBTY3JhcGVyID0gcmVxdWlyZShcIi4vc29jaWFsX3NjcmFwZXJcIik7XG5jb25zdCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcbmNvbnN0IHsgRG93bmxvYWRlciB9ID0gcmVxdWlyZShcIi4vYmlsaWJpbGkvZG93bmxvYWRlci5qc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IHNhbml0aXplID0gcmVxdWlyZShcImZpbGVuYW1pZnlcIik7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKShcImJpbGliaWxpLXNjcmFwZXI6U2NyYXBlclwiKTtcbmNvbnN0IHsgYXV0b1Njcm9sbCwgZGVsYXkgfSA9IHJlcXVpcmUoXCIuL2xpYi9mdW5jdGlvbi5qc1wiKTtcbi8vIGltcG9ydCBmaWxlbmFtaWZ5IGZyb20gJ2ZpbGVuYW1pZnknO1xuLy8gY29uc3QgeyBsYXVuY2gsIGdldFN0cmVhbSB9ID0gcmVxdWlyZShcInB1cHBldGVlci1zdHJlYW1cIik7XG4vLyBjb25zdCBQdXBwZXRlZXJWaWRlb1JlY29yZGVyID0gcmVxdWlyZSgncHVwcGV0ZWVyLXZpZGVvLXJlY29yZGVyJyk7XG5jbGFzcyBCaWxpYmlsaVNjcmFwZXIgZXh0ZW5kcyBTY3JhcGVyIHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuc3RhcnRVcmwgPSBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbVwiO1xuICB9XG4gIGFzeW5jIGxvYWRfc3RhcnRfcGFnZSgpIHtcbiAgICBkZWJ1ZyhcImxvYWQgc3RhcnQgcGFnZVwiKVxuICAgIGlmICh0aGlzLmNvbmZpZy5iaWxpYmlsaV9zZXR0aW5ncykge1xuICAgICAgdGhpcy5zdGFydFVybCA9IGBodHRwczovL3d3dy4ke3RoaXMuY29uZmlnLmJpbGliaWxpX3NldHRpbmdzLmJpbGliaWxpX2RvbWFpbn1gO1xuICAgICAgaWYgKHRoaXMuY29uZmlnLmJpbGliaWxpX3NldHRpbmdzLmJpbGliaWxpX2RvbWFpbikge1xuICAgICAgICB0aGlzLnN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LiR7dGhpcy5jb25maWcuYmlsaWJpbGlfc2V0dGluZ3MuYmlsaWJpbGlfZG9tYWlufWA7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmNvbmZpZy5iaWxpYmlsaV9zZXR0aW5ncykge1xuICAgICAgICBpZiAoa2V5ICE9PSBcImJpbGliaWxpX2RvbWFpblwiKSB7XG4gICAgICAgICAgdGhpcy5zdGFydFVybCArPSBgJHtrZXl9PSR7dGhpcy5jb25maWcuYmlsaWJpbGlfc2V0dGluZ3Nba2V5XX0mYDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvL2xvZ2luIGludG8gYmlsaWJpbGlcbiAgYXN5bmMgbWFrZWxvZ2luYWN0aW9uKCkge1xuICAgIC8vIGxldCBzdGFydFVybCA9IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tXCI7XG5cbiAgICB0aGlzLmxvZ2dlci5pbmZvKFwiVXNpbmcgbG9naW5Vcmw6IFwiICsgdGhpcy5zdGFydFVybCk7XG4gICAgYXdhaXQgdGhpcy5wYWdlLnNldEJ5cGFzc0NTUCh0cnVlKTtcbiAgICB0aGlzLmxhc3RfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnBhZ2UuZ290byh0aGlzLnN0YXJ0VXJsKTtcblxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJsb2dpbiBzdWNjZXNzLCBjb29raWVzIGhhcyBiZWVuIHNhdmUgYXQgXCIgKyB0aGlzLmNvbmZpZy50bXBwYXRoXG4gICAgKTtcbiAgICAvL2NsaWNrIGxvZ2luIGJ0blxuICAgIGF3YWl0IHRoaXMucGFnZS5jbGljayhcIi5oZWFkZXItbG9naW4tZW50cnlcIik7XG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLmV2YWx1YXRlKF8gPT4ge1xuICAgIC8vIHZhciBpY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvXCIpO1xuICAgIC8vIGljb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIC8vIH0pO1xuICAgIC8vd2FpdCBsb2dpbiBib3ggc2hvd1xuICAgIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoXCIuYmlsaS1taW5pLWNvbnRlbnQtd3BcIiwge1xuICAgICAgdGltZW91dDogdGhpcy5TVEFOREFSRF9USU1FT1VULFxuICAgIH0pO1xuICAgIC8vY2xpY2sgbG9naW4gYnkgc21zXG4gICAgY29uc3QgW2J1dHRvbl0gPSBhd2FpdCB0aGlzLnBhZ2UuJHgoXCIvL2Rpdltjb250YWlucyguLCAnIOefreS/oeeZu+W9lSAnKV1cIik7XG4gICAgaWYgKGJ1dHRvbikge1xuICAgICAgYXdhaXQgYnV0dG9uLmNsaWNrKCk7XG4gICAgfVxuICAgIC8vYXdhaXQgZm9yIHVzZXIgdG8gdGFrZSBhY3Rpb25cbiAgICBhd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlbGVjdG9yKFwiLmhlYWRlci1lbnRyeS1taW5pXCIsIHsgdGltZW91dDogMCB9KTtcbiAgICAvL3VzZXIgaGFzIHN1Y2Nlc3MgbG9naW5cbiAgICAvL3NhdmUgY29va2llc1xuICAgIGNvbnN0IGNvb2tpZXMgPSBhd2FpdCB0aGlzLnBhZ2UuY29va2llcygpO1xuXG4gICAgYXdhaXQgZnMud3JpdGVGaWxlKFxuICAgICAgdGhpcy5jb25maWcudG1wcGF0aCArIFwiL2Nvb2tpZXMuanNvblwiLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoY29va2llcywgbnVsbCwgMiksXG4gICAgICAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIGF3YWl0IHRoaXMucGFnZS5jbG9zZSgpO1xuICAgIC8vIGF3YWl0IHRoaXMuYnJvd3NlcnMuY2xvc2UoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdmlkZW8gbGlzdCBwYWdlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYWdlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXl3b3JkXG4gICAqIEByZXR1cm5zIGVsZW1lbnRcbiAgICovXG4gIGFzeW5jIGNsaWNrU2VhcmNoYnRuKHsgcGFnZSwga2V5d29yZCB9KSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgfVxuXG4gICAgdGhpcy5sb2dnZXIuaW5mbyhcIlVzaW5nIGxvZ2luVXJsOiBcIiArIHRoaXMuc3RhcnRVcmwpO1xuICAgIGF3YWl0IHRoaXMucGFnZS5zZXRCeXBhc3NDU1AodHJ1ZSk7XG4gICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8odGhpcy5zdGFydFVybCk7XG4gICAgYXdhaXQgcGFnZS50eXBlKFwiLm5hdi1zZWFyY2gtaW5wdXRcIiwga2V5d29yZCk7XG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLiRldmFsKFwiLm5hdi1zZWFyY2gtaW5wdXRcIiwgZnVuY3Rpb24gKGtleXdvcmQpIHtcbiAgICAvLyAgIHRoaXMudmFsdWUgPSBrZXl3b3JkO1xuICAgIC8vIH0pO1xuICAgIC8vIGF3YWl0IHBhZ2UuJGV2YWwoJy5uYXYtc2VhcmNoLWlucHV0JywgZWwgPT4gZWwudmFsdWUgPSBcIlwiKTtcbiAgICBjb25zdCBzZWFyY2hidG4gPSBhd2FpdCB0aGlzLnBhZ2UuJChcIi5uYXYtc2VhcmNoLWJ0blwiKTtcbiAgICBzZWFyY2hidG4uY2xpY2soKTtcbiAgICByZXR1cm4gc2VhcmNoYnRuO1xuICB9XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5d29yZFxuICAgKiBAcmV0dXJucyBhcnJheVxuICAgKi9cbiAgYXN5bmMgc2VhcmNoZGF0YSh7IHBhZ2UsIGtleXdvcmQgfSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0PVtdXG4gICAgaWYoQXJyYXkuaXNBcnJheShrZXl3b3JkKSl7XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2Yga2V5d29yZCkge1xuICAgICAgICBsZXQgbGlua3Jlcz1hd2FpdCB0aGlzLmdldFZpZGVvdXJscyh7IHBhZ2U6IHRoaXMucGFnZSwga2V5d29yZDogZWxlbWVudCB9KTtcbiAgICAgICAgZGVidWcobGlua3JlcylcbiAgICAgICAgZm9yKGNvbnN0IGxpbmsgb2YgbGlua3Jlcyl7IFxuICAgICAgICAgIHJlc3VsdC5wdXNoKGxpbmspXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgIH1lbHNlIGlmKHR5cGVvZiBrZXl3b3JkID09PSAnc3RyaW5nJyl7XG4gICAgICBsZXQgbGlua3Jlcz1hd2FpdCB0aGlzLmdldFZpZGVvdXJscyh7IHBhZ2U6IHRoaXMucGFnZSwga2V5d29yZDoga2V5d29yZCB9KTtcbiAgICAgIGZvcihjb25zdCBsaW5rIG9mIGxpbmtyZXMpe1xuICAgICAgICBcbiAgICAgICAgcmVzdWx0LnB1c2gobGlua3JlcylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICAgIC8vIHJldHVybiBhd2FpdCB0aGlzLmdldFZpZGVvdXJscyh7IHBhZ2U6IHRoaXMucGFnZSwga2V5d29yZDoga2V5d29yZCB9KTtcbiAgfVxuICAvL2dldCB2aWRlbyB1cmwgcmV0dXJuIGluIGFycmF5XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdCxzdHJpbmcsc3RyaW5nfVxuICAgKiBAcmV0dXJucyBhcnJheVxuICAgKi9cbiAgYXN5bmMgZ2V0VmlkZW91cmxzKHsgcGFnZSwga2V5d29yZCwgY29va2llc1BhdGggfSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgICBpZiAoY29va2llc1BhdGgpIHtcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhjb29raWVzUGF0aCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBjb29raWVzIGZpbGUgYXQgJHtjb29raWVzUGF0aH1gKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGNvb2tpZXMgPSBKU09OLnBhcnNlKGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGNvb2tpZXNQYXRoKSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhjb29raWVzKTtcbiAgICAgIGF3YWl0IHRoaXMucGFnZS5zZXRDb29raWUoLi4uY29va2llcyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VhcmNoYnRuID0gYXdhaXQgdGhpcy5jbGlja1NlYXJjaGJ0bih7XG4gICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICBrZXl3b3JkOiBrZXl3b3JkLFxuICAgIH0pO1xuICAgIGxldCBicm93c2VyID0gdGhpcy5wYWdlLmJyb3dzZXIoKTtcbiAgICBjb25zdCBuZXdQYWdlID0gYXdhaXQgYnJvd3Nlci53YWl0Rm9yVGFyZ2V0KCh0YXJnZXQpID0+XG4gICAgICB0YXJnZXQudXJsKCkuaW5jbHVkZXMoXCJzZWFyY2guYmlsaWJpbGkuY29tXCIpXG4gICAgKTtcbiAgICBjb25zdCBwYWdlcyA9IGF3YWl0IGJyb3dzZXIucGFnZXMoKTtcbiAgICBsZXQgc2VhcmNoUGFnZTtcbiAgICBmb3IgKGNvbnN0IHBhZ2Ugb2YgcGFnZXMpIHtcbiAgICAgIGNvbnN0IHBhZ2V1cmwgPSBhd2FpdCBwYWdlLnVybCgpOyAvLyBuZXcgcGFnZSBub3cgYXBwZWFyIVxuICAgICAgLy8gZGVidWcoYXdhaXQgcGFnZS50aXRsZSgpKVxuICAgICAgaWYgKHBhZ2V1cmwuaW5jbHVkZXMoXCJzZWFyY2guYmlsaWJpbGkuY29tXCIpKSB7XG4gICAgICAgIHNlYXJjaFBhZ2UgPSBwYWdlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFzZWFyY2hQYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZWFyY2ggcGFnZSBub3QgZm91bmRcIik7XG4gICAgfVxuICAgIC8vIHRoaXMucGFnZS53YWl0Rm9yKDIwMDApO1xuICAgIC8vIHRoaXMuYnJvd3Nlci5vbigndGFyZ2V0Y3JlYXRlZCcsIGZ1bmN0aW9uKCl7XG4gICAgLy8gICBjb25zb2xlLmxvZygnTmV3IFRhYiBDcmVhdGVkJyk7XG4gICAgLy8gfSk7XG4gICAgLy8gbGV0IGJyb3dzZXI9dGhpcy5wYWdlLmJyb3dzZXIoKVxuICAgIC8vIGNvbnNvbGUubG9nKFwiY3VycmVudCBwYWdlIGNvdW50IFwiLCAoYXdhaXQgYnJvd3Nlci5wYWdlcygpKS5sZW5ndGgpO1xuICAgIC8vIGNvbnN0IHRhYmxlcyA9IGF3YWl0IGJyb3dzZXIucGFnZXMoKVxuICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICBkZWJ1Zyhhd2FpdCB0YWJsZXNbaV0udGl0bGUoKSlcbiAgICAvLyB9XG5cbiAgICAvLyBjb25zdCBbdGFiT25lLCB0YWJUd29dID0gKGF3YWl0IGJyb3dzZXIucGFnZXMoKSk7XG4gICAgLy8gZGVidWcoYXdhaXQgdGFiT25lLnRpdGxlKCkpXG4gICAgLy8gZGVidWcoYXdhaXQgdGFiVHdvLnRpdGxlKCkpXG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JOYXZpZ2F0aW9uKClcbiAgICAvLyBhd2FpdCBkZWxheSg1MDAwKTtcbiAgICBhd2FpdCBhdXRvU2Nyb2xsKHNlYXJjaFBhZ2UpO1xuICAgIC8vIGF3YWl0IHBhZ2Uuc2NyZWVuc2hvdCh7XG4gICAgLy8gICBwYXRoOiAnL2hvbWUvcm9iZXJ0emVuZy9zY3JlZW5zaG90LmpwZydcbiAgICAvLyB9KTtcblxuICAgIGF3YWl0IHNlYXJjaFBhZ2Uud2FpdEZvclNlbGVjdG9yKFwiLnZ1aV9wYWdlbmF0aW9uXCIsIHsgdGltZW91dDogNTAwMCB9KTtcblxuICAgIGxldCBsaW5rcmVzID0gW107XG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLiQkKFwiYnV0dG9uLnZ1aV9idXR0b25cIiwgZWxlbWVudHM9PntcbiAgICAvLyAgIGNvbnNvbGUubG9nKGVsZW1lbnRzKVxuICAgIC8vIH0pXG4gICAgY29uc3QgbGlua1BhZ2UgPSBhd2FpdCBzZWFyY2hQYWdlLiQkKFwiYnV0dG9uLnZ1aV9idXR0b25cIik7XG4gICAgZGVidWcobGlua1BhZ2UpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlua1BhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIGF3YWl0IGF1dG9TY3JvbGwodGFiVHdvIClcbiAgICAgIC8vIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yTmF2aWdhdGlvbih7XG4gICAgICAvLyAgIHdhaXRVbnRpbDogJ25ldHdvcmtpZGxlMCcsXG4gICAgICAvLyB9KTtcbiAgICAgIC8vIGF3YWl0IGxpbmtQYWdlW2ldLmNsaWNrKClcbiAgICAgIGF3YWl0IHNlYXJjaFBhZ2UuZXZhbHVhdGUoKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5jbGljaygpO1xuICAgICAgfSwgbGlua1BhZ2VbaV0pO1xuICAgICAgY29uc3QgbGlua3MgPSBhd2FpdCB0aGlzLmdldFZpZGVvbGlzdGxpbmsoeyBwYWdlOiBzZWFyY2hQYWdlIH0pO1xuICAgICAgZGVidWcobGlua3MpO1xuICAgICAgbGlua3MubWFwKChsaW5rKSA9PiB7XG4gICAgICAgIGxpbmtyZXMucHVzaChsaW5rKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGF3YWl0IHRoaXMucGFnZS4kJGV2YWwoXCJidXR0b24udnVpX2J1dHRvblwiLCBhc3luYyBlbGVtZW50cz0+e1xuICAgIC8vICAgLy8gYXdhaXQgYXV0b1Njcm9sbCh0aGlzLnBhZ2UgKVxuICAgIC8vICAgZWxlbWVudHMubWFwKGFzeW5jIGVsZW1lbnQ9PntcbiAgICAvLyAgICAgYXdhaXQgYXV0b1Njcm9sbCh0aGlzLnBhZ2UgKVxuICAgIC8vICAgYXdhaXQgZWxlbWVudC5jbGljaygpXG4gICAgLy8gICBjb25zdCBsaW5rcz1hd2FpdCB0aGlzLmdldFZpZGVvbGlzdGxpbmsoeyBwYWdlOnRoaXMucGFnZSB9KTtcbiAgICAvLyAgIGRlYnVnKGxpbmtzKVxuICAgIC8vICAgbGlua3MubWFwKChsaW5rKT0+e1xuICAgIC8vICAgICBsaW5rcmVzLnB1c2gobGluaylcbiAgICAvLyAgIH0pXG4gICAgLy8gfSlcbiAgICAvLyB9KVxuICAgIGRlYnVnKGxpbmtyZXMpO1xuICAgIHJldHVybiBsaW5rcmVzO1xuICB9XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge3BhZ2V9IHBhZ2VcbiAgICogQHJldHVybnMgYXJyYXlcbiAgICovXG4gIGFzeW5jIGdldFZpZGVvbGlzdGxpbmsoeyBwYWdlIH0pIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG4gICAgLy8gY29uc3QgZWxIYW5kbGVBcnJheSA9IGF3YWl0IHBhZ2UuJCQoXG4gICAgLy8gICBcIi5iaWxpLXZpZGVvLWNhcmRfX2luZm8tLXJpZ2h0IGE6bnRoLWNoaWxkKDEpXCJcbiAgICAvLyApO1xuXG4gICAgLy8gbGV0IGxpbmttYXAgPSBbXTtcbiAgICBsZXQgbGlua21hcCA9IGF3YWl0IHBhZ2UuJCRldmFsKFxuICAgICAgXCIuYmlsaS12aWRlby1jYXJkX19pbmZvLS1yaWdodCA+YTpmaXJzdC1jaGlsZFwiLFxuICAgICAgKGFsaW5rcykgPT4ge1xuICAgICAgICByZXR1cm4gYWxpbmtzLm1hcCgoYWxpbmspID0+IHtcbiAgICAgICAgICB2YXIgbGlua2FyciA9IHt9O1xuICAgICAgICAgIGxpbmthcnIubGluayA9IGFsaW5rLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gICAgICAgICAgY29uc29sZS5sb2coYWxpbmspO1xuICAgICAgICAgIGh0aXRsZSA9IGFsaW5rLnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKTtcbiAgICAgICAgICBsaW5rYXJyLnRpdGxlID0gaHRpdGxlLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgICAgICAgIHJldHVybiBsaW5rYXJyO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApO1xuICAgIC8vIGRlYnVnKFwicXVlcnkgbGluayBmaW5pc2hcIik7XG4gICAgLy8gZGVidWcobGlua21hcCk7XG4gICAgLy8gZGVidWcoXCJzaG93IGxpbmsgZmluaXNoXCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKGxpbmttYXApXG5cbiAgICBhd2FpdCBsaW5rbWFwLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoIWVsZW1lbnQubGluay5pbmNsdWRlcyhcIi92aWRlby9cIikpIHtcbiAgICAgICAgLy8gZGVidWcoXCJlbGVtZW50IGhhcyB2aWRlbyBcIitlbGVtZW50KVxuICAgICAgICBsaW5rbWFwLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYXdhaXQgbGlua21hcC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGVsZW1lbnQubGluay5pbmNsdWRlcyhcIi9hcGkvXCIpKSB7XG4gICAgICAgIGRlYnVnKFwiZWxlbWVudCBoYXMgYXBpIFwiICsgZWxlbWVudCk7XG4gICAgICAgIGxpbmttYXAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvL2RlYnVnKFwiZmlsdGVyIGxpbmsgZmluaXNoXCIpO1xuICAgIGRlYnVnKGxpbmttYXApO1xuXG4gICAgcmV0dXJuIGxpbmttYXA7XG4gIH1cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYWdlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsaW5rXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2aWRlb3BhdGhcbiAgICovXG4gIGFzeW5jIGRvd25sb2FkU2lnbGVWaWRlbyh7IGxpbmssIHZpZGVvcGF0aCB9KSB7XG4gICAgLy8gaWYgKHBhZ2UpIHtcbiAgICAvLyAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgLy8gfVxuXG4gICAgLy8gY29uc29sZS5sb2cobGluaylcbiAgICAvLyBhd2FpdCB0aGlzLnBhZ2UuZ290byhsaW5rLHtcbiAgICAvLyAgIHdhaXRVbnRpbDogJ2RvbWNvbnRlbnRsb2FkZWQnLFxuICAgIC8vIH0pO1xuICAgIC8vIGNvbnNvbGUubG9nKHZpZGVvcGF0aClcbiAgICAvLyBjb25zdCBmaWxlID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0odmlkZW9wYXRoICsgXCIvdGVzdC53ZWJtXCIpO1xuICAgIC8vIGF3YWl0IHBhZ2UuZXZhbHVhdGUoYXN5bmMgKCkgPT4ge1xuICAgIC8vIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJweC1wbGF5ZXItdmlkZW8td3JhcCA+IHZpZGVvOm50aC1jaGlsZCgxKScpO1xuICAgIC8vIGNvbnNvbGUubG9nKGVsKTtcbiAgICAvLyBjb25zdCB7c3JjfSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ3NvdXJjZScpO1xuICAgIC8vIGNvbnNvbGUubG9nKHNyYyk7XG4gICAgLy8gfSk7XG4gICAgLy8gY29uc3QgaHRtbCA9IGF3YWl0IHBhZ2UuJGV2YWwoJyNiaWxpYmlsaS1wbGF5ZXInLCBlbCA9PiBlbC5vdXRlckhUTUwpO1xuICAgIC8vIGNvbnNvbGUubG9nKGh0bWwpXG4gICAgLy8gY29uc3Qgc3JjID0gYXdhaXQgcGFnZS4kZXZhbChcIiNiaWxpYmlsaS1wbGF5ZXIgdmlkZW9cIixlbCA9PiBlbC5nZXRBdHRyaWJ1dGUoXCJzcmNcIikpXG5cbiAgICBjb25zdCBkb3dubG9hZGVyID0gbmV3IERvd25sb2FkZXIoKTtcbiAgICBkb3dubG9hZGVyLmdldFZpZGVvVXJsKGxpbmspO1xuICAgIGlmICghZG93bmxvYWRlci51cmwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInZpZGVvIHVybCBpbnZhbGlkXCIpO1xuICAgIH1cbiAgICBhd2FpdCBkb3dubG9hZGVyLmdldEFpZCgpO1xuXG4gICAgbGV0IHZpZGVvcmVzID0gYXdhaXQgZG93bmxvYWRlci5nZXRJbmZvKCk7XG4gICAgZGVidWcoXCJWSURFTyBJTkZPXCIsIHZpZGVvcmVzKTtcbiAgICAvLyBjb25zdCBkb3dubG9hZFBhdGggPScvaG9tZS9yb2JlcnR6ZW5nL2Rvd25sb2FkdGVzdCc7XG4gICAgY29uc3QgZmlsZW5hbWUgPSB2aWRlb3Jlcy5kYXRhLnRpdGxlO1xuICAgIGNvbnN0IHsgZGF0YSwgZmFsbGJhY2sgfSA9IGF3YWl0IGRvd25sb2FkZXIuZ2V0RGF0YSgpO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gZGF0YS5kdXJsIHx8IGRhdGEucmVzdWx0LmR1cmw7XG4gICAgY29uc3QgcXVhbGl0eSA9IGRhdGEucXVhbGl0eSB8fCBkYXRhLnJlc3VsdC5xdWFsaXR5LFxuICAgICAgcXVhbGl0eUFycmF5ID0ge1xuICAgICAgICAxMTI6IFwiMTA4MFArXCIsXG4gICAgICAgIDgwOiBcIjEwODBQXCIsXG4gICAgICAgIDc0OiBcIjcyMFA2MFwiLFxuICAgICAgICA2NDogXCI3MjBQXCIsXG4gICAgICAgIDQ4OiBcIjcyMFBcIixcbiAgICAgICAgMzI6IFwiNDgwUFwiLFxuICAgICAgICAxNjogXCIzNjBQXCIsXG4gICAgICAgIDE1OiBcIjM2MFBcIixcbiAgICAgIH07XG4gICAgY29uc3QgdmlkZW9RdWFudGl0eSA9IHF1YWxpdHlBcnJheVtxdWFsaXR5XSB8fCBcInVua25vd25cIjtcbiAgICBjb25zb2xlLmxvZyhcInZpZGVvUXVhbnRpdHkgaXMgXCIgKyB2aWRlb1F1YW50aXR5KTtcbiAgICBpZiAoZmFsbGJhY2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImVycm9yIGhhcHBlbiB3aGVuIGdldCB2aWRlbyBkYXRhXCIpO1xuICAgIH1cbiAgICBkZWJ1ZyhcImVjaG8gdGFyZ2V0XCIpO1xuICAgIGRlYnVnKHRhcmdldCk7XG4gICAgdGFyZ2V0LmZvckVhY2goKGVsZW1lbnQsIHBhcnQpID0+IHtcbiAgICAgIGNvbnN0IGZpbGUgPSBwYXRoLmpvaW4odmlkZW9wYXRoLCBgJHtzYW5pdGl6ZShmaWxlbmFtZSl9LSR7cGFydH0uZmx2YCk7XG4gICAgICBkZWJ1ZyhcInBhcnQgaXMgJW9cIiwgcGFydCk7XG4gICAgICBkZWJ1ZyhcImZpbGUgbmFtZSAlb1wiLCBmaWxlKTtcbiAgICAgIGNvbnN0IHN0YXRlID0gZG93bmxvYWRlci5kb3dubG9hZEJ5SW5kZXgoXG4gICAgICAgIHBhcnQsXG4gICAgICAgIGZpbGUsXG4gICAgICAgIChwcm9ncmVzcywgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCB7IHNwZWVkLCBldGEsIHBlcmNlbnRhZ2UgfSA9IHByb2dyZXNzOyAvL+aYvuekuui/m+W6puadoVxuICAgICAgICAgIGNvbnNvbGUubG9nKFwic3BlZWQ6IFwiICsgTWF0aC5yb3VuZChzcGVlZCAvIDFlMykgKyBcIktCL3NcIik7XG4gICAgICAgICAgY29uc29sZS5sb2coYGV0YToke2V0YX1zYCk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvKipcbiAgICogZ2V0IHZpZGVvIGRldGFpbFxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGlua1xuICAgKi9cbiAgYXN5bmMgZ2V0VmlkZW9kZXRhaWwocGFnZSwgbGluaykge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLnBhZ2UuZ290byhsaW5rLCB7XG4gICAgICB3YWl0VW50aWw6IFwiZG9tY29udGVudGxvYWRlZFwiLFxuICAgIH0pO1xuXG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBCaWxpYmlsaVNjcmFwZXI6IEJpbGliaWxpU2NyYXBlcixcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNoZWVyaW8gPSByZXF1aXJlKCdjaGVlcmlvJyk7XG5jb25zdCBTY3JhcGVyID0gcmVxdWlyZSgnLi9zb2NpYWxfc2NyYXBlcicpO1xuXG5jbGFzcyBGYWNlYm9va1NjcmFwZXIgZXh0ZW5kcyBTY3JhcGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG4gICAgfVxuIFxuXG4gICAgYXN5bmMgbG9hZF9sb2dpbl9wYWdlKCkge1xuICAgICAgICBsZXQgc3RhcnRVcmwgPSAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tJztcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LiR7dGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MuZmFjZWJvb2tfZG9tYWlufWA7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MuZmFjZWJvb2tfZG9tYWluKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRVcmwgPSBgaHR0cHM6Ly93d3cuJHt0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncy5mYWNlYm9va19kb21haW59YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhcnRVcmwgPSBgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tYDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gJ2ZhY2Vib29rX2RvbWFpbicpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRVcmwgKz0gYCR7a2V5fT0ke3RoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzW2tleV19JmBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdVc2luZyBsb2dpblVybDogJyArIHN0YXJ0VXJsKTtcblxuICAgICAgICB0aGlzLmxhc3RfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnBhZ2UuZ290byhzdGFydFVybCk7XG5cbiAgICAgICAgLy9hd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicVwiXScsIHsgdGltZW91dDogdGhpcy5TVEFOREFSRF9USU1FT1VUIH0pO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvL3VzZXIgbG9naW4gYnkgaGFuZFxuICAgIGFzeW5jIHVzZXJsb2dpbmFjdGlvbigpe1xuXG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIEZhY2Vib29rU2NyYXBlcjogRmFjZWJvb2tTY3JhcGVyLFxufTtcbiIsIi8vc2Nyb2xsIGRvd24gdG8gdGhlIGJvdHRvbSBvZiB0aGUgcGFnZVxuYXN5bmMgZnVuY3Rpb24gYXV0b1Njcm9sbChwYWdlKXtcbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlKGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHZhciB0b3RhbEhlaWdodCA9IDA7XG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSAxMDA7XG4gICAgICAgICAgICB2YXIgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxCeSgwLCBkaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgdG90YWxIZWlnaHQgKz0gZGlzdGFuY2U7XG5cbiAgICAgICAgICAgICAgICBpZih0b3RhbEhlaWdodCA+PSBzY3JvbGxIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZGVsYXkodGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7IFxuICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIHRpbWUpXG4gICAgfSk7XG4gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdXRvU2Nyb2xsOmF1dG9TY3JvbGwsXG4gICAgZGVsYXk6ZGVsYXlcbn0iLCJjb25zdCBjaGVlcmlvID0gcmVxdWlyZSgnY2hlZXJpbycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRfaXBfZGF0YTogZ2V0X2lwX2RhdGEsXG4gICAgZ2V0X2h0dHBfaGVhZGVyczogZ2V0X2h0dHBfaGVhZGVycyxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldF9pcF9kYXRhKHBhZ2UpIHtcbiAgICBhd2FpdCBwYWdlLmdvdG8oJ2h0dHBzOi8vaXBpbmZvLmlvL2pzb24nLCB7XG4gICAgICB3YWl0TG9hZDogdHJ1ZSxcbiAgICAgIHdhaXROZXR3b3JrSWRsZTogdHJ1ZVxuICAgIH0pO1xuICAgIGxldCBqc29uID0gYXdhaXQgcGFnZS5jb250ZW50KHtcbiAgICAgICAgdGltZW91dDogMjAwMDBcbiAgICB9KTtcbiAgICBjb25zdCAkID0gY2hlZXJpby5sb2FkKGpzb24pO1xuICAgIGxldCBpcGluZm9fdGV4dCA9ICAkKCdwcmUnKS50ZXh0KCk7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoaXBpbmZvX3RleHQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRfaHR0cF9oZWFkZXJzKHBhZ2UpIHtcbiAgICBhd2FpdCBwYWdlLmdvdG8oJ2h0dHBzOi8vaHR0cGJpbi5vcmcvZ2V0Jywge1xuICAgICAgd2FpdExvYWQ6IHRydWUsXG4gICAgICB3YWl0TmV0d29ya0lkbGU6IHRydWVcbiAgICB9KTtcbiAgICBsZXQgaGVhZGVycyA9IGF3YWl0IHBhZ2UuY29udGVudCgpO1xuXG4gICAgY29uc3QgJCA9IGNoZWVyaW8ubG9hZChoZWFkZXJzKTtcbiAgICBsZXQgaGVhZGVyc190ZXh0ID0gICQoJ3ByZScpLnRleHQoKTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShoZWFkZXJzX3RleHQpO1xufSIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbWV0YSA9IHJlcXVpcmUoJy4vbWV0YWRhdGEuanMnKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc2Utc2NyYXBlcjpTY3JhcGVyJyk7XG4vKipcbiAqIHRoaXMgaXMgcGFyZW50IGNsYXNzIGZvciBzb2NpYWwgc2NyYXB5ZXIgbm9kZVxuICogICovIFxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBTb2NpYWxTY3JhcGVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgZGVidWcoJ2NvbnN0cnVjdG9yJyk7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNvbmZpZyA9IHt9LFxuICAgICAgICAgICAgY29udGV4dCA9IHt9LFxuICAgICAgICAgICAgcGx1Z2dhYmxlID0gbnVsbCxcbiAgICAgICAgICAgIHBhZ2UgPSBudWxsLFxuICAgICAgICAgICAgLy8gYnJvd3NlcnM9bnVsbFxuICAgICAgICB9ID0gb3B0aW9ucztcbiAgICAgICAgLy8gdGhpcy5icm93c2VyPWJyb3dzZXI7XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IG51bGw7IC8vIHRoZSBsYXN0IHJlc3BvbnNlIG9iamVjdFxuICAgICAgICB0aGlzLm1ldGFkYXRhID0ge1xuICAgICAgICAgICAgc2NyYXBpbmdfZGV0ZWN0ZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBsdWdnYWJsZSA9IHBsdWdnYWJsZTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gdGhpcy5jb25maWcubG9nZ2VyO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuXG4gICAgICAgIHRoaXMucHJveHkgPSBjb25maWcucHJveHk7XG4gICAgICAgIHRoaXMua2V5d29yZHMgPSBjb25maWcua2V5d29yZHM7XG5cbiAgICAgICAgdGhpcy5TVEFOREFSRF9USU1FT1VUID0gMTAwMDA7XG4gICAgICAgIHRoaXMuU09MVkVfQ0FQVENIQV9USU1FID0gNDUwMDA7XG5cbiAgICAgICAgdGhpcy5yZXN1bHRzID0ge307XG4gICAgICAgIHRoaXMucmVzdWx0X3JhbmsgPSAxO1xuICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSByZXF1ZXN0cyBkb25lXG4gICAgICAgIHRoaXMubnVtX3JlcXVlc3RzID0gMDtcbiAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUga2V5d29yZHMgc2VhcmNoZWRcbiAgICAgICAgdGhpcy5udW1fa2V5d29yZHMgPSAwO1xuXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IHRoaXMuY29uZmlnW2Ake3RoaXMuY29uZmlnLnNlYXJjaF9lbmdpbmV9X3NldHRpbmdzYF07XG4gICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IEpTT04ucGFyc2Uoc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnW2Ake3RoaXMuY29uZmlnLnNlYXJjaF9lbmdpbmV9X3NldHRpbmdzYF0gPSBzZXR0aW5ncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvL3N0YXJ0IHRvIGxvZ2luIHNvY2lhbCBtZWRpYSBwbGF0Zm9ybVxuICAgIGFzeW5jIHJ1bkxvZ2luKHsgcGFnZSwgZGF0YSwgd29ya2VyIH0pIHtcblxuICAgICAgICBkZWJ1Zygnd29ya2VyPSVvJywgd29ya2VyLCB0aGlzLmNvbmZpZy5rZXl3b3Jkcyk7XG5cbiAgICAgICAgaWYgKHBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0Vmlld3BvcnQoeyB3aWR0aDogMTI4MCwgaGVpZ2h0OiA4MDAgfSk7XG5cbiAgICAgXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZF9icm93c2VyX2VuZ2luZSgpO1xuICAgICAgICBhd2FpdCB0aGlzLm1ha2Vsb2dpbmFjdGlvbigpXG4gICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9uIHRoYXQgcnVucyBvbmx5IG9uY2UgaW4gdGhlIGJlZ2lubmluZyBvZiB0aGVcbiAgICAgKiBzY3JhcGluZyBwcm9jZWR1cmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gdHJ1ZSBpZiBldmVyeXRoaW5nIGlzIGNvcnJlY3QuXG4gICAgICovXG4gICAgYXN5bmMgbG9hZF9icm93c2VyX2VuZ2luZSgpIHtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuYXBwbHlfZXZhc2lvbl90ZWNobmlxdWVzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IGRldGVjdGlvbiBieSBldmFkaW5nIGNvbW1vbiBkZXRlY3Rpb24gdGVjaG5pcXVlc1xuICAgICAgICAgICAgYXdhaXQgZXZhZGVDaHJvbWVIZWFkbGVzc0RldGVjdGlvbih0aGlzLnBhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYmxvY2sgc29tZSBhc3NldHMgdG8gc3BlZWQgdXAgc2NyYXBpbmdcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmJsb2NrX2Fzc2V0cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNldFJlcXVlc3RJbnRlcmNlcHRpb24odHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLnBhZ2Uub24oJ3JlcXVlc3QnLCAocmVxKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSByZXEucmVzb3VyY2VUeXBlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2sgPSBbJ3N0eWxlc2hlZXQnLCAnZm9udCcsICdpbWFnZScsICdtZWRpYSddO1xuICAgICAgICAgICAgICAgIGlmIChibG9jay5pbmNsdWRlcyh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXEuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXEuY29udGludWUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy50ZXN0X2V2YXNpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIE5hdmlnYXRlIHRvIHRoZSBwYWdlIHRoYXQgd2lsbCBwZXJmb3JtIHRoZSB0ZXN0cy5cbiAgICAgICAgICAgIGNvbnN0IHRlc3RVcmwgPSAnaHR0cHM6Ly9ib3Quc2Fubnlzb2Z0LmNvbSc7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBhZ2UuZ290byh0ZXN0VXJsKTtcbiAgICAgICAgICAgIC8vIFNhdmUgYSBzY3JlZW5zaG90IG9mIHRoZSByZXN1bHRzLlxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNjcmVlbnNob3QoeyBwYXRoOiAnaGVhZGxlc3MtZXZhc2lvbi1yZXN1bHQucG5nJyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5sb2dfaHR0cF9oZWFkZXJzID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLm1ldGFkYXRhLmh0dHBfaGVhZGVycyA9IGF3YWl0IG1ldGEuZ2V0X2h0dHBfaGVhZGVycyh0aGlzLnBhZ2UpO1xuICAgICAgICAgICAgZGVidWcoJ3RoaXMubWV0YWRhdGEuaHR0cF9oZWFkZXJzPSVPJywgdGhpcy5tZXRhZGF0YS5odHRwX2hlYWRlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmxvZ19pcF9hZGRyZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsZXQgaXBpbmZvID0gYXdhaXQgbWV0YS5nZXRfaXBfZGF0YSh0aGlzLnBhZ2UpO1xuICAgICAgICAgICAgdGhpcy5tZXRhZGF0YS5pcGluZm8gPSBpcGluZm87XG4gICAgICAgICAgICBkZWJ1ZygndGhpcy5tZXRhZGF0YS5pcGluZm8nLCB0aGlzLm1ldGFkYXRhLmlwaW5mbyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayB0aGF0IG91ciBwcm94eSBpcyB3b3JraW5nIGJ5IGNvbmZpcm1pbmdcbiAgICAgICAgLy8gdGhhdCBpcGluZm8uaW8gc2VlcyB0aGUgcHJveHkgSVAgYWRkcmVzc1xuICAgICAgICBpZiAodGhpcy5wcm94eSAmJiB0aGlzLmNvbmZpZy5sb2dfaXBfYWRkcmVzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZGVidWcoYCR7dGhpcy5tZXRhZGF0YS5pcGluZm8uaXB9IHZzICR7dGhpcy5wcm94eX1gKTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIGlwIHJldHVybmVkIGJ5IGlwaW5mbyBpcyBub3QgYSBzdWJzdHJpbmcgb2Ygb3VyIHByb3h5c3RyaW5nLCBnZXQgdGhlIGhlY2sgb3V0dGEgaGVyZVxuICAgICAgICAgICAgaWYgKCF0aGlzLnByb3h5LmluY2x1ZGVzKHRoaXMubWV0YWRhdGEuaXBpbmZvLmlwKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUHJveHkgb3V0cHV0IGlwICR7dGhpcy5wcm94eX0gZG9lcyBub3QgbWF0Y2ggd2l0aCBwcm92aWRlZCBvbmVgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgVXNpbmcgdmFsaWQgUHJveHk6ICR7dGhpcy5wcm94eX1gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubG9hZF9zdGFydF9wYWdlKCk7XG4gICAgfVxuICAgIC8qKlxuICAqXG4gICogQHJldHVybnMgdHJ1ZSBpZiBzdGFydHBhZ2Ugd2FzIGxvYWRlZCBjb3JyZWN0bHkuXG4gICovXG4gICAgYXN5bmMgbG9hZF9sb2dpbl9wYWdlKCkge1xuXG4gICAgfVxuICAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgc3RhcnRwYWdlIHdhcyBsb2FkZWQgY29ycmVjdGx5LlxuICAgICAqL1xuICAgICBhc3luYyBsb2FkX3N0YXJ0X3BhZ2UoKSB7XG5cbiAgICAgfVxuICAgIC8qKlxuICAgICAqIG1ha2UgbG9naW4gYWN0aW9uXG4gICAgICovXG4gICAgYXN5bmMgbWFrZWxvZ2luYWN0aW9uKCl7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogdXNlciBsb2dpbiBieSB0aGVpciBoYW5kXG4gICAgICovXG4gICAgYXN5bmMgdXNlcmxvZ2luYWN0aW9uKCkge1xuXG4gICAgfVxuXG4gICAgYXN5bmMgc2VhcmNoZGF0YSgpIHtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiB1c2Ugd29ya2VyIHRvIHNlYXJjaCBkYXRhXG4gICAgICogQHBhcmFtIGFycmF5IGtleXdvcmQgXG4gICAgICovXG4gICAgYXN5bmMgd29ya2Vyc2VhcmNoZGF0YSh7cGFnZSx3b3JrZXJ9KSB7XG4gICAgICAgICBkZWJ1Zygnd29ya2VyPSVvJywgd29ya2VyLCB0aGlzLmNvbmZpZy5rZXl3b3Jkcyk7XG5cbiAgICAgICAgaWYgKHBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0Vmlld3BvcnQoeyB3aWR0aDogMTI4MCwgaGVpZ2h0OiA4MDAgfSk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9hZF9icm93c2VyX2VuZ2luZSgpXG4gICAgICAgIGNvbnN0IGxpbmtzPWF3YWl0IHRoaXMuc2VhcmNoZGF0YSh7a2V5d29yZDp0aGlzLmNvbmZpZy5rZXl3b3Jkc30pXG4gICAgICAgIGRlYnVnKGxpbmtzKVxuICAgIH1cblxufVxuLy8gVGhpcyBpcyB3aGVyZSB3ZSdsbCBwdXQgdGhlIGNvZGUgdG8gZ2V0IGFyb3VuZCB0aGUgdGVzdHMuXG5hc3luYyBmdW5jdGlvbiBldmFkZUNocm9tZUhlYWRsZXNzRGV0ZWN0aW9uKHBhZ2UpIHtcblxuICAgIC8vIFBhc3MgdGhlIFdlYmRyaXZlciBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3UHJvdG8gPSBuYXZpZ2F0b3IuX19wcm90b19fO1xuICAgICAgICBkZWxldGUgbmV3UHJvdG8ud2ViZHJpdmVyO1xuICAgICAgICBuYXZpZ2F0b3IuX19wcm90b19fID0gbmV3UHJvdG87XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBDaHJvbWUgVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIC8vIFdlIGNhbiBtb2NrIHRoaXMgaW4gYXMgbXVjaCBkZXB0aCBhcyB3ZSBuZWVkIGZvciB0aGUgdGVzdC5cbiAgICAgICAgY29uc3QgbW9ja09iaiA9IHtcbiAgICAgICAgICAgIGFwcDoge1xuICAgICAgICAgICAgICAgIGlzSW5zdGFsbGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3ZWJzdG9yZToge1xuICAgICAgICAgICAgICAgIG9uSW5zdGFsbFN0YWdlQ2hhbmdlZDoge30sXG4gICAgICAgICAgICAgICAgb25Eb3dubG9hZFByb2dyZXNzOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBydW50aW1lOiB7XG4gICAgICAgICAgICAgICAgUGxhdGZvcm1Pczoge1xuICAgICAgICAgICAgICAgICAgICBNQUM6ICdtYWMnLFxuICAgICAgICAgICAgICAgICAgICBXSU46ICd3aW4nLFxuICAgICAgICAgICAgICAgICAgICBBTkRST0lEOiAnYW5kcm9pZCcsXG4gICAgICAgICAgICAgICAgICAgIENST1M6ICdjcm9zJyxcbiAgICAgICAgICAgICAgICAgICAgTElOVVg6ICdsaW51eCcsXG4gICAgICAgICAgICAgICAgICAgIE9QRU5CU0Q6ICdvcGVuYnNkJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFBsYXRmb3JtQXJjaDoge1xuICAgICAgICAgICAgICAgICAgICBBUk06ICdhcm0nLFxuICAgICAgICAgICAgICAgICAgICBYODZfMzI6ICd4ODYtMzInLFxuICAgICAgICAgICAgICAgICAgICBYODZfNjQ6ICd4ODYtNjQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgUGxhdGZvcm1OYWNsQXJjaDoge1xuICAgICAgICAgICAgICAgICAgICBBUk06ICdhcm0nLFxuICAgICAgICAgICAgICAgICAgICBYODZfMzI6ICd4ODYtMzInLFxuICAgICAgICAgICAgICAgICAgICBYODZfNjQ6ICd4ODYtNjQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgUmVxdWVzdFVwZGF0ZUNoZWNrU3RhdHVzOiB7XG4gICAgICAgICAgICAgICAgICAgIFRIUk9UVExFRDogJ3Rocm90dGxlZCcsXG4gICAgICAgICAgICAgICAgICAgIE5PX1VQREFURTogJ25vX3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIFVQREFURV9BVkFJTEFCTEU6ICd1cGRhdGVfYXZhaWxhYmxlJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIE9uSW5zdGFsbGVkUmVhc29uOiB7XG4gICAgICAgICAgICAgICAgICAgIElOU1RBTEw6ICdpbnN0YWxsJyxcbiAgICAgICAgICAgICAgICAgICAgVVBEQVRFOiAndXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgQ0hST01FX1VQREFURTogJ2Nocm9tZV91cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBTSEFSRURfTU9EVUxFX1VQREFURTogJ3NoYXJlZF9tb2R1bGVfdXBkYXRlJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIE9uUmVzdGFydFJlcXVpcmVkUmVhc29uOiB7XG4gICAgICAgICAgICAgICAgICAgIEFQUF9VUERBVEU6ICdhcHBfdXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgT1NfVVBEQVRFOiAnb3NfdXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgUEVSSU9ESUM6ICdwZXJpb2RpYycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgd2luZG93Lm5hdmlnYXRvci5jaHJvbWUgPSBtb2NrT2JqO1xuICAgICAgICB3aW5kb3cuY2hyb21lID0gbW9ja09iajtcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdGhlIFBlcm1pc3Npb25zIFRlc3QuXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICBjb25zdCBvcmlnaW5hbFF1ZXJ5ID0gd2luZG93Lm5hdmlnYXRvci5wZXJtaXNzaW9ucy5xdWVyeTtcbiAgICAgICAgd2luZG93Lm5hdmlnYXRvci5wZXJtaXNzaW9ucy5fX3Byb3RvX18ucXVlcnkgPSBwYXJhbWV0ZXJzID0+XG4gICAgICAgICAgICBwYXJhbWV0ZXJzLm5hbWUgPT09ICdub3RpZmljYXRpb25zJ1xuICAgICAgICAgICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKHtzdGF0ZTogTm90aWZpY2F0aW9uLnBlcm1pc3Npb259KVxuICAgICAgICAgICAgICAgIDogb3JpZ2luYWxRdWVyeShwYXJhbWV0ZXJzKTtcblxuICAgICAgICAvLyBJbnNwaXJlZCBieTogaHR0cHM6Ly9naXRodWIuY29tL2lrYXJpZW5hdG9yL3BoYW50b21qc19oaWRlX2FuZF9zZWVrL2Jsb2IvbWFzdGVyLzUuc3Bvb2ZGdW5jdGlvbkJpbmQuanNcbiAgICAgICAgY29uc3Qgb2xkQ2FsbCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNhbGwoKSB7XG4gICAgICAgICAgICByZXR1cm4gb2xkQ2FsbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwgPSBjYWxsO1xuXG4gICAgICAgIGNvbnN0IG5hdGl2ZVRvU3RyaW5nRnVuY3Rpb25TdHJpbmcgPSBFcnJvci50b1N0cmluZygpLnJlcGxhY2UoL0Vycm9yL2csIFwidG9TdHJpbmdcIik7XG4gICAgICAgIGNvbnN0IG9sZFRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZ1bmN0aW9uVG9TdHJpbmcoKSB7XG4gICAgICAgICAgICBpZiAodGhpcyA9PT0gd2luZG93Lm5hdmlnYXRvci5wZXJtaXNzaW9ucy5xdWVyeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcImZ1bmN0aW9uIHF1ZXJ5KCkgeyBbbmF0aXZlIGNvZGVdIH1cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzID09PSBmdW5jdGlvblRvU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZVRvU3RyaW5nRnVuY3Rpb25TdHJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2xkQ2FsbC5jYWxsKG9sZFRvU3RyaW5nLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uVG9TdHJpbmc7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBQbHVnaW5zIExlbmd0aCBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgLy8gT3ZlcndyaXRlIHRoZSBgcGx1Z2luc2AgcHJvcGVydHkgdG8gdXNlIGEgY3VzdG9tIGdldHRlci5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5hdmlnYXRvciwgJ3BsdWdpbnMnLCB7XG4gICAgICAgICAgICAvLyBUaGlzIGp1c3QgbmVlZHMgdG8gaGF2ZSBgbGVuZ3RoID4gMGAgZm9yIHRoZSBjdXJyZW50IHRlc3QsXG4gICAgICAgICAgICAvLyBidXQgd2UgY291bGQgbW9jayB0aGUgcGx1Z2lucyB0b28gaWYgbmVjZXNzYXJ5LlxuICAgICAgICAgICAgZ2V0OiAoKSA9PiBbMSwgMiwgMywgNCwgNV1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBMYW5ndWFnZXMgVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIC8vIE92ZXJ3cml0ZSB0aGUgYHBsdWdpbnNgIHByb3BlcnR5IHRvIHVzZSBhIGN1c3RvbSBnZXR0ZXIuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXZpZ2F0b3IsICdsYW5ndWFnZXMnLCB7XG4gICAgICAgICAgICBnZXQ6ICgpID0+IFsnZW4tVVMnLCAnZW4nXVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdGhlIGlmcmFtZSBUZXN0XG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSFRNTElGcmFtZUVsZW1lbnQucHJvdG90eXBlLCAnY29udGVudFdpbmRvdycsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0b1N0cmluZyB0ZXN0LCB0aG91Z2ggaXQgYnJlYWtzIGNvbnNvbGUuZGVidWcoKSBmcm9tIHdvcmtpbmdcbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmRlYnVnID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjaGVlcmlvID0gcmVxdWlyZSgnY2hlZXJpbycpO1xuY29uc3QgU2NyYXBlciA9IHJlcXVpcmUoJy4vc29jaWFsX3NjcmFwZXInKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY2xhc3MgWW91dHViZVNjcmFwZXIgZXh0ZW5kcyBTY3JhcGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7ICAgIFxuICAgIH1cblxuXG4gICAgYXN5bmMgbG9hZF9sb2dpbl9wYWdlKCkge1xuICAgICAgICBcbiAgICAgICAgLy8gYXdhaXQgdGhpcy5wYWdlLnNldFJlcXVlc3RJbnRlcmNlcHRpb24odHJ1ZSk7XG4gICAgICAgIC8vd2hldGhlciB0byBkaXNhYmxlIGltYWdlIGxvYWRpbmdcbiAgICAgICAgICAgIC8vIHRoaXMucGFnZS5vbigncmVxdWVzdCcsIHJlcXVlc3QgPT4ge1xuICAgICAgICAgICAgLy8gICAgIGlmIChyZXF1ZXN0LnJlc291cmNlVHlwZSgpID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICByZXF1ZXN0LmNvbnRpbnVlKCk7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgIGxldCBzdGFydFVybCA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbSc7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnlvdXR1YmVfc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LiR7dGhpcy5jb25maWcueW91dHViZV9zZXR0aW5ncy55b3V0dWJlX2RvbWFpbn1gO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnlvdXR1YmVfc2V0dGluZ3MueW91dHViZV9kb21haW4pIHtcbiAgICAgICAgICAgICAgICBzdGFydFVybCA9IGBodHRwczovL3d3dy4ke3RoaXMuY29uZmlnLnlvdXR1YmVfc2V0dGluZ3MueW91dHViZV9kb21haW59YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhcnRVcmwgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb21gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAneW91dHViZV9kb21haW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VXJsICs9IGAke2tleX09JHt0aGlzLmNvbmZpZy55b3V0dWJlX3NldHRpbmdzW2tleV19JmBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdVc2luZyBsb2dpblVybDogJyArIHN0YXJ0VXJsKTtcbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNldEJ5cGFzc0NTUCh0cnVlKTtcbiAgICAgICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8oc3RhcnRVcmwpO1xuICAgICAgICBcbiAgICAgICAgLy9oaWRkZW4gaWNvblxuICAgICAgICBhd2FpdCB0aGlzLnBhZ2UuZXZhbHVhdGUoXyA9PiB7XG4gICAgICAgIHZhciBpY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvLWljb25cIik7XG4gICAgICAgIGljb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb25maWcudG1wcGF0aClcbiAgICAgICAgLy9hd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicVwiXScsIHsgdGltZW91dDogdGhpcy5TVEFOREFSRF9USU1FT1VUIH0pO1xuICAgICAgICAvL2F3YWl0IGZvciB1c2VyIHRvIHRha2UgYWN0aW9uXG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoJyNhdmF0YXItYnRuJyx7J3RpbWVvdXQnOjB9KTtcbiAgICAgICAgLy91c2VyIGhhcyBzdWNjZXNzIGxvZ2luXG4gICAgICAgIC8vc2F2ZSBjb29raWVzIFxuICAgICAgICBjb25zdCBjb29raWVzID0gYXdhaXQgdGhpcy5wYWdlLmNvb2tpZXMoKTtcbiAgICAgICAgXG4gICAgICAgIGF3YWl0IGZzLndyaXRlRmlsZSh0aGlzLmNvbmZpZy50bXBwYXRoKycvY29va2llcy5qc29uJywgSlNPTi5zdHJpbmdpZnkoY29va2llcywgbnVsbCwgMikpO1xuICAgICAgICBhd2FpdCBicm93c2VyLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgWW91dHViZVNjcmFwZXI6IFlvdXR1YmVTY3JhcGVyLFxufTtcbiIsImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUNvbnRleHQocmVxKSB7XG5cdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHR0aHJvdyBlO1xufVxud2VicGFja0VtcHR5Q29udGV4dC5rZXlzID0gKCkgPT4gKFtdKTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gXCIuL3NyYyBzeW5jIHJlY3Vyc2l2ZVwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlDb250ZXh0OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoZWVyaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZGVidWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlsZW5hbWlmeVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9ncmVzcy1zdHJlYW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyL2Rpc3QvY29uY3VycmVuY3kvYnVpbHRJbkNvbmN1cnJlbmN5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyL2Rpc3QvdXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXNlci1hZ2VudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=