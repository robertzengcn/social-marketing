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

/***/ "./run.ts":
/*!****************!*\
  !*** ./run.ts ***!
  \****************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var se_scraper = __webpack_require__(/*! ./index */ "./index.ts");
var ArgumentParser = (__webpack_require__(/*! argparse */ "argparse").ArgumentParser);
var RemoteSource = (__webpack_require__(/*! ./src/remotesource */ "./src/remotesource.ts").RemoteSource);
var version = (__webpack_require__(/*! ./package.json */ "./package.json").version);
var fs = __webpack_require__(/*! fs */ "fs");
var resolve = (__webpack_require__(/*! path */ "path").resolve);
var debug = __webpack_require__(/*! debug */ "debug")('runjs:runjs');
// const { data } = require("cheerio/lib/api/attributes.js");
var parser = new ArgumentParser({
    description: "Social martketing",
});
parser.add_argument("-v", "--version", { action: "version", version: version });
parser.add_argument("-a", "--action", {
    help: "Tha action you want to the program to take",
});
parser.add_argument("-c", "--campaign", {
    help: "Tha campaign id you want to program to take",
});
var parearg = parser.parse_args();
// those options need to be provided on startup
// and cannot give to se-scraper on scrape() calls
var browser_config = {
    // the user agent to scrape with
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
    // if random_user_agent is set to True, a random user agent is chosen
    random_user_agent: false,
    // whether to start the browser in headless mode
    headless: false,
    // whether debug information should be printed
    // level 0: print nothing
    // level 1: print most important info
    // ...
    // level 4: print all shit nobody wants to know
    debug_level: 1,
    // specify flags passed to chrome here
    chrome_flags: [],
    // path to js module that extends functionality
    // this module should export the functions:
    // get_browser, handle_metadata, close_browser
    // must be an absolute path to the module
    //custom_func: resolve('examples/pluggable.js'),
    custom_func: "",
    // use a proxy for all connections
    // example: 'socks5://78.94.172.42:1080'
    // example: 'http://118.174.233.10:48400'
    proxy: "",
    // a file with one proxy per line. Example:
    // socks5://78.94.172.42:1080
    // http://118.174.233.10:48400
    proxy_file: "",
    use_cluster: false,
    puppeteer_cluster_config: {
        timeout: 10 * 60 * 1000,
        monitor: false,
        concurrency: 1,
        maxConcurrency: 1, // scrape with 1 tab
    },
};
var scrape_config = {
    // which search engine to scrape
    // platform: "facebook",
    // an array of keywords to scrape
    keywords: ["cloud service test"],
    // the number of pages to scrape for each keyword
    num_pages: 1,
    // OPTIONAL PARAMS BELOW:
    // google_settings: {
    //     gl: 'us', // The gl parameter determines the Google country to use for the query.
    //     hl: 'fr', // The hl parameter determines the Google UI language to return results.
    //     start: 0, // Determines the results offset to use, defaults to 0.
    //     num: 100, // Determines the number of results to show, defaults to 10. Maximum is 100.
    // },
    // instead of keywords you can specify a keyword_file. this overwrites the keywords array
    keyword_file: "",
    // how long to sleep between requests. a random sleep interval within the range [a,b]
    // is drawn before every request. empty string for no sleeping.
    sleep_range: "",
    // path to output file, data will be stored in JSON
    output_file: "/tmp/test/test.json",
    // whether to prevent images, css, fonts from being loaded
    // will speed up scraping a great deal
    block_assets: false,
    // check if headless chrome escapes common detection techniques
    // this is a quick test and should be used for debugging
    test_evasion: false,
    apply_evasion_techniques: true,
    // log ip address data
    log_ip_address: false,
    // log http headers
    log_http_headers: false,
    platform: "facebook",
};
function get(object, key, default_value) {
    var result = object[key];
    return typeof result !== "undefined" ? result : default_value;
}
function runCommand(parearg) {
    return __awaiter(this, void 0, void 0, function () {
        var action;
        return __generator(this, function (_a) {
            action = get(parearg, "action", false);
            if (!action) {
                console.log("no parameter action been passed");
            }
            switch (action) {
                case "login":
                    login();
                    break;
                case "task":
                    getcampaign();
                    break;
            }
            return [2 /*return*/];
        });
    });
}
//get campaign
function getcampaign() {
    return __awaiter(this, void 0, void 0, function () {
        var remotesource, campaignlist, _i, campaignlist_1, campaign;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    remotesource = new RemoteSource();
                    return [4 /*yield*/, remotesource.getCampaignlist()];
                case 1:
                    campaignlist = _a.sent();
                    debug(campaignlist);
                    if (campaignlist.length == 0) {
                        console.log("not campaign need to run");
                    }
                    for (_i = 0, campaignlist_1 = campaignlist; _i < campaignlist_1.length; _i++) {
                        campaign = campaignlist_1[_i];
                        switch (campaign.type) {
                            case "bilibilidownload":
                                scrape_config.platform = "bilibili";
                                scrape_config.keywords = campaign.keywords;
                                se_scraper.searchdata(browser_config, scrape_config);
                                break;
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//login to facebook
function login() {
    return __awaiter(this, void 0, void 0, function () {
        var campaignId, remotesource, sosetting, tmppath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    campaignId = get(parearg, "campaign", false);
                    remotesource = new RemoteSource();
                    return [4 /*yield*/, remotesource.getRemoteConfig(campaignId)];
                case 1:
                    sosetting = _a.sent();
                    debug(sosetting);
                    if (sosetting == null) {
                        throw new Error("sosetting is undefined");
                    }
                    scrape_config.platform = sosetting.sotype;
                    scrape_config.user = sosetting.socialuser;
                    scrape_config.pass = sosetting.socialpass;
                    console.log(sosetting);
                    tmppath = resolve("./tmp/" + scrape_config.platform + "/" + sosetting.socialuser);
                    return [4 /*yield*/, createPath(tmppath)];
                case 2:
                    _a.sent();
                    scrape_config.tmppath = tmppath;
                    return [4 /*yield*/, se_scraper.login(browser_config, scrape_config)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createPath(path) {
    path.split("/").reduce(function (directories, directory) {
        directories += "".concat(directory, "/");
        if (!fs.existsSync(directories)) {
            fs.mkdirSync(directories);
        }
        return directories;
    }, "");
}
runCommand(parearg);


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

/***/ "./src/remotesource.ts":
/*!*****************************!*\
  !*** ./src/remotesource.ts ***!
  \*****************************/
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
var axios = __webpack_require__(/*! axios */ "axios");
var debug = __webpack_require__(/*! debug */ "debug")('RemoteSource:RemoteSource');
var RemoteSource = /** @class */ (function () {
    function RemoteSource() {
        var config = this.readenv();
        this.REMOTEADD = config.REMOTEADD;
        this.REMOTEUSERNAME = config.REMOTEUSERNAME;
        this.REMOTEPASSWORD = config.REMOTEPASSWORD;
    }
    RemoteSource.prototype.readenv = function () {
        //read config from .env file
        var envcofig = this.readConfig();
        debug(envcofig);
        //check key exist in object
        if (!envcofig.hasOwnProperty("REMOTEADD")) {
            throw new Error("REMOTEADD not found in .env file");
        }
        if (!envcofig.hasOwnProperty("REMOTEUSERNAME")) {
            throw new Error("USERNAME not found in .env file");
        }
        if (!envcofig.hasOwnProperty("REMOTEPASSWORD")) {
            throw new Error("PASSWORD not found in .env file");
        }
        return envcofig;
    };
    /**
     * read config from .env File
     *
     * @returns {object} config
     * */
    RemoteSource.prototype.readConfig = function () {
        var result = (__webpack_require__(/*! dotenv */ "dotenv").config)();
        if (result.error) {
            throw result.error;
        }
        return result.parsed;
    };
    /**
     * get response from remote servive
     * @return object
     */
    RemoteSource.prototype.getRemoteConfig = function (campaignId) {
        return __awaiter(this, void 0, void 0, function () {
            var sosetvar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios
                            .get(this.REMOTEADD + "/api/getsobyCam/?campaign_id=" + campaignId, {
                            auth: {
                                username: this.REMOTEUSERNAME,
                                password: this.REMOTEPASSWORD,
                            },
                        })
                            .then(function (res) {
                            if (parseInt(res.status) != 200) {
                                throw new Error("code not equal 200");
                            }
                            if (!res.data.status) {
                                throw new Error("code not equal 200");
                            }
                            // console.log(res.status)
                            // console.log(res.data.data.user)
                            // console.log(res.data.data.pass)
                            // console.log(res.data.data.proxy)
                            var sosetting = {
                                sotype: res.data.data.sotype,
                                socialuser: res.data.data.user,
                                socialpass: res.data.data.pass,
                                proxy: {
                                    proxy: res.data.data.proxy.url,
                                    user: res.data.data.proxy.user,
                                    pass: res.data.data.proxy.pass,
                                },
                            };
                            return sosetting;
                        })
                            .catch(function (error) {
                            console.error(error);
                        })];
                    case 1:
                        sosetvar = _a.sent();
                        return [2 /*return*/, sosetvar];
                }
            });
        });
    };
    /**
     * get campaign from remote servive
     */
    RemoteSource.prototype.getCampaignlist = function () {
        return __awaiter(this, void 0, void 0, function () {
            var campignlist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios
                            .get(this.REMOTEADD + "/api/listsotask", {
                            auth: {
                                username: this.REMOTEUSERNAME,
                                password: this.REMOTEPASSWORD,
                            },
                        })
                            .then(function (res) {
                            if (parseInt(res.status) != 200) {
                                throw new Error("code not equal 200");
                            }
                            return res.data.data;
                        })
                            .catch(function (error) {
                            console.error(error);
                        })];
                    case 1:
                        campignlist = _a.sent();
                        return [2 /*return*/, campignlist];
                }
            });
        });
    };
    RemoteSource.prototype.saveLinkremote = function (_a) {
        var data = _a.data;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                axios.post(this.REMOTEADD + "/api/savelink", data)
                    .then(function (response) {
                    console.log(response);
                })
                    .catch(function (error) {
                    console.log(error);
                });
                return [2 /*return*/];
            });
        });
    };
    return RemoteSource;
}());
module.exports = {
    RemoteSource: RemoteSource,
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

/***/ "argparse":
/*!***************************!*\
  !*** external "argparse" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("argparse");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("axios");

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

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

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

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"social-marketing","version":"1.0.0","description":"A module using puppeteer to do social marketing","main":"index.js","scripts":{"build":"tsc --build","clean":"tsc --build --clean","test":"mocha test test/modules","login":"node run.js -a login -c","task":"node run.js -a task","testdownload":"mocha test test/modules --grep download download single video","testgetlinks":"mocha test test/modules --grep get video play link","testgetalllinks":"mocha test test/modules --grep video-url-list","dev":"webpack --config webpack.dev.js"},"keywords":["scraping","search-engines","google","bing","web-scraping"],"author":"Robert Zeng","repository":{"type":"git","url":"https://github.com/robertzengcn/social-marketing.git"},"license":"ISC","dependencies":{"argparse":"^2.0.1","axios":"^1.3.6","cheerio":"^1.0.0-rc.3","clean-webpack-plugin":"^4.0.0","copy-webpack-plugin":"^11.0.0","cron":"^2.3.0","debug":"^4.3.4","dotenv":"^16.0.3","filenamify":"^4.3.0","got":"^9.6.0","jshint":"^2.13.6","lodash":"^4.17.21","progress-stream":"^2.0.0","puppeteer":"^18.1.0","puppeteer-cluster":"^0.23.0","puppeteer-extra":"^3.3.6","puppeteer-extra-plugin-adblocker":"^2.13.6","puppeteer-extra-plugin-stealth":"^2.11.2","puppeteer-stream":"^3.0.3","puppeteer-video-recorder":"^1.0.5","sqlite3":"^5.1.6","user-agents":"^1.0.1354","webpack-livereload-plugin":"^3.0.2","webpack-manifest-plugin":"^5.0.0","webpack-merge":"^5.9.0","winston":"^3.2.1"},"engines":{"npm":">=9.3.1","node":">=18.14.0"},"devDependencies":{"bluebird":"^3.7.2","chai":"^4.2.0","chai-string":"^1.5.0","eslint":"^8.38.0","express":"^4.17.1","http-mitm-proxy":"^0.8.2","key-cert":"^1.0.1","mocha":"^6.1.4","prettier":"2.8.4","ts-loader":"^9.4.3","typescript":"^5.1.3","ua-parser-js":"^0.7.21","webpack":"^5.86.0","webpack-cli":"^5.1.4","webpack-dev-server":"^4.15.1","webpack-node-externals":"^3.0.0"}}');

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
/******/ 	var __webpack_exports__ = __webpack_require__("./run.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsSUFBSSxHQUFHLGtDQUFrQztBQUM1RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLCtEQUErRCxnQ0FBZ0M7QUFDL0Y7QUFDQSx1REFBdUQsWUFBWTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDUkE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3J1bi50cyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL25vZGVfc29jaWFsbWsudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9yZW1vdGVzb3VyY2UudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9jb25jdXJyZW5jeS1pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvYmlsaWJpbGkvZG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvYmlsaWJpbGlfc2NyYXBlci5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvZmFjZWJvb2tfc2NyYXBlci5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvbGliL2Z1bmN0aW9uLmpzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9tZXRhZGF0YS5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvc29jaWFsX3NjcmFwZXIuanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL3lvdXR1YmVfc2NyYXBlci5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjLyBzeW5jIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJhcmdwYXJzZVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJheGlvc1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJjaGVlcmlvXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImRlYnVnXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJmaWxlbmFtaWZ5XCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImxvZGFzaFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInByb2dyZXNzLXN0cmVhbVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwdXBwZXRlZXJcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXJcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC9jb25jdXJyZW5jeS9idWlsdEluQ29uY3VycmVuY3lcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC91dGlsXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInB1cHBldGVlci1leHRyYVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJ1c2VyLWFnZW50c1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJ3aW5zdG9uXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwib3NcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2Vfc2NyYXBlciA9IHJlcXVpcmUoXCIuL3NyYy9ub2RlX3NvY2lhbG1rXCIpO1xudmFyIFNjcmFwZXIgPSByZXF1aXJlKFwiLi9zcmMvbW9kdWxlcy9zb2NpYWxfc2NyYXBlclwiKTtcblxuYXN5bmMgZnVuY3Rpb24gbG9naW4oYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpIHtcbiAgLy8gc2NyYXBlIGNvbmZpZyBvdmVyd3JpdGVzIHRoZSBicm93c2VyX2NvbmZpZ1xuICBPYmplY3QuYXNzaWduKGJyb3dzZXJfY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcblxuICB2YXIgc2NyYXBlciA9IG5ldyBzZV9zY3JhcGVyLlNjcmFwZU1hbmFnZXIoYnJvd3Nlcl9jb25maWcpO1xuICAvLyB2YXIgcmVtb3RlQ29uZmlnPWF3YWl0IHNjcmFwZXIuZ2V0UmVtb3RlQ29uZmlnKCk7XG4gIGF3YWl0IHNjcmFwZXIuc3RhcnQoKTtcblxuICB2YXIgcmVzdWx0cyA9IGF3YWl0IHNjcmFwZXIubG9naW4oc2NyYXBlX2NvbmZpZyk7XG5cbiAgYXdhaXQgc2NyYXBlci5xdWl0KCk7XG5cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG4vL2dldCBkYXRhIHVybHNcbmFzeW5jIGZ1bmN0aW9uIHNlYXJjaGRhdGEoYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpIHtcbiAgLy8gc2NyYXBlIGNvbmZpZyBvdmVyd3JpdGVzIHRoZSBicm93c2VyX2NvbmZpZ1xuICBPYmplY3QuYXNzaWduKGJyb3dzZXJfY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcblxuICB2YXIgc2NyYXBlciA9IG5ldyBzZV9zY3JhcGVyLlNjcmFwZU1hbmFnZXIoYnJvd3Nlcl9jb25maWcpO1xuICAvLyB2YXIgcmVtb3RlQ29uZmlnPWF3YWl0IHNjcmFwZXIuZ2V0UmVtb3RlQ29uZmlnKCk7XG4gIGF3YWl0IHNjcmFwZXIuc3RhcnQoKTtcbiAgdmFyIHJlc3VsdHMgPSBhd2FpdCBzY3JhcGVyLnNlYXJjaGRhdGEoc2NyYXBlX2NvbmZpZyk7XG5cbiAgYXdhaXQgc2NyYXBlci5xdWl0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZWFyY2hkYXRhOiBzZWFyY2hkYXRhLFxuICBsb2dpbjogbG9naW4sXG4gIC8vIHl0YmxvZ2luOnl0YmxvZ2luLFxuICBTY3JhcGVNYW5hZ2VyOiBzZV9zY3JhcGVyLlNjcmFwZU1hbmFnZXIsXG4gIFNjcmFwZXI6IFNjcmFwZXIsXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnQge307XG5jb25zdCBzZV9zY3JhcGVyID0gcmVxdWlyZShcIi4vaW5kZXhcIik7XG5jb25zdCB7IEFyZ3VtZW50UGFyc2VyIH0gPSByZXF1aXJlKFwiYXJncGFyc2VcIik7XG5jb25zdCB7UmVtb3RlU291cmNlfSA9IHJlcXVpcmUoXCIuL3NyYy9yZW1vdGVzb3VyY2VcIik7XG5jb25zdCB7IHZlcnNpb24gfSA9IHJlcXVpcmUoXCIuL3BhY2thZ2UuanNvblwiKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHJlc29sdmUgPSByZXF1aXJlKCdwYXRoJykucmVzb2x2ZTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgncnVuanM6cnVuanMnKTtcbi8vIGNvbnN0IHsgZGF0YSB9ID0gcmVxdWlyZShcImNoZWVyaW8vbGliL2FwaS9hdHRyaWJ1dGVzLmpzXCIpO1xuXG5jb25zdCBwYXJzZXIgPSBuZXcgQXJndW1lbnRQYXJzZXIoe1xuICBkZXNjcmlwdGlvbjogXCJTb2NpYWwgbWFydGtldGluZ1wiLFxufSk7XG5cbnBhcnNlci5hZGRfYXJndW1lbnQoXCItdlwiLCBcIi0tdmVyc2lvblwiLCB7IGFjdGlvbjogXCJ2ZXJzaW9uXCIsIHZlcnNpb24gfSk7XG5wYXJzZXIuYWRkX2FyZ3VtZW50KFwiLWFcIiwgXCItLWFjdGlvblwiLCB7XG4gIGhlbHA6IFwiVGhhIGFjdGlvbiB5b3Ugd2FudCB0byB0aGUgcHJvZ3JhbSB0byB0YWtlXCIsXG59KTtcbnBhcnNlci5hZGRfYXJndW1lbnQoXCItY1wiLCBcIi0tY2FtcGFpZ25cIiwge1xuICBoZWxwOiBcIlRoYSBjYW1wYWlnbiBpZCB5b3Ugd2FudCB0byBwcm9ncmFtIHRvIHRha2VcIixcbn0pO1xuXG5sZXQgcGFyZWFyZyA9IHBhcnNlci5wYXJzZV9hcmdzKCk7XG5cbi8vIHRob3NlIG9wdGlvbnMgbmVlZCB0byBiZSBwcm92aWRlZCBvbiBzdGFydHVwXG4vLyBhbmQgY2Fubm90IGdpdmUgdG8gc2Utc2NyYXBlciBvbiBzY3JhcGUoKSBjYWxsc1xubGV0IGJyb3dzZXJfY29uZmlnID0ge1xuICAvLyB0aGUgdXNlciBhZ2VudCB0byBzY3JhcGUgd2l0aFxuICB1c2VyX2FnZW50OlxuICAgIFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwNy4wLjAuMCBTYWZhcmkvNTM3LjM2XCIsXG4gIC8vIGlmIHJhbmRvbV91c2VyX2FnZW50IGlzIHNldCB0byBUcnVlLCBhIHJhbmRvbSB1c2VyIGFnZW50IGlzIGNob3NlblxuICByYW5kb21fdXNlcl9hZ2VudDogZmFsc2UsXG4gIC8vIHdoZXRoZXIgdG8gc3RhcnQgdGhlIGJyb3dzZXIgaW4gaGVhZGxlc3MgbW9kZVxuICBoZWFkbGVzczogZmFsc2UsXG4gIC8vIHdoZXRoZXIgZGVidWcgaW5mb3JtYXRpb24gc2hvdWxkIGJlIHByaW50ZWRcbiAgLy8gbGV2ZWwgMDogcHJpbnQgbm90aGluZ1xuICAvLyBsZXZlbCAxOiBwcmludCBtb3N0IGltcG9ydGFudCBpbmZvXG4gIC8vIC4uLlxuICAvLyBsZXZlbCA0OiBwcmludCBhbGwgc2hpdCBub2JvZHkgd2FudHMgdG8ga25vd1xuICBkZWJ1Z19sZXZlbDogMSxcbiAgLy8gc3BlY2lmeSBmbGFncyBwYXNzZWQgdG8gY2hyb21lIGhlcmVcbiAgY2hyb21lX2ZsYWdzOiBbXSxcbiAgLy8gcGF0aCB0byBqcyBtb2R1bGUgdGhhdCBleHRlbmRzIGZ1bmN0aW9uYWxpdHlcbiAgLy8gdGhpcyBtb2R1bGUgc2hvdWxkIGV4cG9ydCB0aGUgZnVuY3Rpb25zOlxuICAvLyBnZXRfYnJvd3NlciwgaGFuZGxlX21ldGFkYXRhLCBjbG9zZV9icm93c2VyXG4gIC8vIG11c3QgYmUgYW4gYWJzb2x1dGUgcGF0aCB0byB0aGUgbW9kdWxlXG4gIC8vY3VzdG9tX2Z1bmM6IHJlc29sdmUoJ2V4YW1wbGVzL3BsdWdnYWJsZS5qcycpLFxuICBjdXN0b21fZnVuYzogXCJcIixcbiAgLy8gdXNlIGEgcHJveHkgZm9yIGFsbCBjb25uZWN0aW9uc1xuICAvLyBleGFtcGxlOiAnc29ja3M1Oi8vNzguOTQuMTcyLjQyOjEwODAnXG4gIC8vIGV4YW1wbGU6ICdodHRwOi8vMTE4LjE3NC4yMzMuMTA6NDg0MDAnXG4gIHByb3h5OiBcIlwiLFxuICAvLyBhIGZpbGUgd2l0aCBvbmUgcHJveHkgcGVyIGxpbmUuIEV4YW1wbGU6XG4gIC8vIHNvY2tzNTovLzc4Ljk0LjE3Mi40MjoxMDgwXG4gIC8vIGh0dHA6Ly8xMTguMTc0LjIzMy4xMDo0ODQwMFxuICBwcm94eV9maWxlOiBcIlwiLFxuICB1c2VfY2x1c3RlcjpmYWxzZSxcbiAgcHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnOiB7XG4gICAgdGltZW91dDogMTAgKiA2MCAqIDEwMDAsIC8vIG1heCB0aW1lb3V0IHNldCB0byAxMCBtaW51dGVzXG4gICAgbW9uaXRvcjogZmFsc2UsXG4gICAgY29uY3VycmVuY3k6IDEsIC8vIG9uZSBzY3JhcGVyIHBlciB0YWJcbiAgICBtYXhDb25jdXJyZW5jeTogMSwgLy8gc2NyYXBlIHdpdGggMSB0YWJcbiAgfSxcbn07XG5cbmxldCBzY3JhcGVfY29uZmlnID0ge1xuICAvLyB3aGljaCBzZWFyY2ggZW5naW5lIHRvIHNjcmFwZVxuICAvLyBwbGF0Zm9ybTogXCJmYWNlYm9va1wiLFxuICAvLyBhbiBhcnJheSBvZiBrZXl3b3JkcyB0byBzY3JhcGVcbiAga2V5d29yZHM6IFtcImNsb3VkIHNlcnZpY2UgdGVzdFwiXSxcbiAgLy8gdGhlIG51bWJlciBvZiBwYWdlcyB0byBzY3JhcGUgZm9yIGVhY2gga2V5d29yZFxuICBudW1fcGFnZXM6IDEsXG5cbiAgLy8gT1BUSU9OQUwgUEFSQU1TIEJFTE9XOlxuICAvLyBnb29nbGVfc2V0dGluZ3M6IHtcbiAgLy8gICAgIGdsOiAndXMnLCAvLyBUaGUgZ2wgcGFyYW1ldGVyIGRldGVybWluZXMgdGhlIEdvb2dsZSBjb3VudHJ5IHRvIHVzZSBmb3IgdGhlIHF1ZXJ5LlxuICAvLyAgICAgaGw6ICdmcicsIC8vIFRoZSBobCBwYXJhbWV0ZXIgZGV0ZXJtaW5lcyB0aGUgR29vZ2xlIFVJIGxhbmd1YWdlIHRvIHJldHVybiByZXN1bHRzLlxuICAvLyAgICAgc3RhcnQ6IDAsIC8vIERldGVybWluZXMgdGhlIHJlc3VsdHMgb2Zmc2V0IHRvIHVzZSwgZGVmYXVsdHMgdG8gMC5cbiAgLy8gICAgIG51bTogMTAwLCAvLyBEZXRlcm1pbmVzIHRoZSBudW1iZXIgb2YgcmVzdWx0cyB0byBzaG93LCBkZWZhdWx0cyB0byAxMC4gTWF4aW11bSBpcyAxMDAuXG4gIC8vIH0sXG4gIC8vIGluc3RlYWQgb2Yga2V5d29yZHMgeW91IGNhbiBzcGVjaWZ5IGEga2V5d29yZF9maWxlLiB0aGlzIG92ZXJ3cml0ZXMgdGhlIGtleXdvcmRzIGFycmF5XG4gIGtleXdvcmRfZmlsZTogXCJcIixcbiAgLy8gaG93IGxvbmcgdG8gc2xlZXAgYmV0d2VlbiByZXF1ZXN0cy4gYSByYW5kb20gc2xlZXAgaW50ZXJ2YWwgd2l0aGluIHRoZSByYW5nZSBbYSxiXVxuICAvLyBpcyBkcmF3biBiZWZvcmUgZXZlcnkgcmVxdWVzdC4gZW1wdHkgc3RyaW5nIGZvciBubyBzbGVlcGluZy5cbiAgc2xlZXBfcmFuZ2U6IFwiXCIsXG4gIC8vIHBhdGggdG8gb3V0cHV0IGZpbGUsIGRhdGEgd2lsbCBiZSBzdG9yZWQgaW4gSlNPTlxuICBvdXRwdXRfZmlsZTogXCIvdG1wL3Rlc3QvdGVzdC5qc29uXCIsXG4gIC8vIHdoZXRoZXIgdG8gcHJldmVudCBpbWFnZXMsIGNzcywgZm9udHMgZnJvbSBiZWluZyBsb2FkZWRcbiAgLy8gd2lsbCBzcGVlZCB1cCBzY3JhcGluZyBhIGdyZWF0IGRlYWxcbiAgYmxvY2tfYXNzZXRzOiBmYWxzZSxcbiAgLy8gY2hlY2sgaWYgaGVhZGxlc3MgY2hyb21lIGVzY2FwZXMgY29tbW9uIGRldGVjdGlvbiB0ZWNobmlxdWVzXG4gIC8vIHRoaXMgaXMgYSBxdWljayB0ZXN0IGFuZCBzaG91bGQgYmUgdXNlZCBmb3IgZGVidWdnaW5nXG4gIHRlc3RfZXZhc2lvbjogZmFsc2UsXG4gIGFwcGx5X2V2YXNpb25fdGVjaG5pcXVlczogdHJ1ZSxcbiAgLy8gbG9nIGlwIGFkZHJlc3MgZGF0YVxuICBsb2dfaXBfYWRkcmVzczogZmFsc2UsXG4gIC8vIGxvZyBodHRwIGhlYWRlcnNcbiAgbG9nX2h0dHBfaGVhZGVyczogZmFsc2UsXG4gIHBsYXRmb3JtOiBcImZhY2Vib29rXCIsXG59O1xuXG5mdW5jdGlvbiBnZXQob2JqZWN0LCBrZXksIGRlZmF1bHRfdmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IG9iamVjdFtrZXldO1xuICByZXR1cm4gdHlwZW9mIHJlc3VsdCAhPT0gXCJ1bmRlZmluZWRcIiA/IHJlc3VsdCA6IGRlZmF1bHRfdmFsdWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bkNvbW1hbmQocGFyZWFyZykge1xuICBsZXQgYWN0aW9uID0gZ2V0KHBhcmVhcmcsIFwiYWN0aW9uXCIsIGZhbHNlKTtcbiAgaWYgKCFhY3Rpb24pIHtcbiAgICBjb25zb2xlLmxvZyhcIm5vIHBhcmFtZXRlciBhY3Rpb24gYmVlbiBwYXNzZWRcIik7XG4gIH1cbiBcbiAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICBjYXNlIFwibG9naW5cIjpcbiAgICAgIGxvZ2luKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwidGFza1wiOlxuICAgICAgZ2V0Y2FtcGFpZ24oKTtcbiAgICAgIGJyZWFrOyBcbiAgfVxufVxuLy9nZXQgY2FtcGFpZ25cbmFzeW5jIGZ1bmN0aW9uIGdldGNhbXBhaWduKCkge1xuICB2YXIgcmVtb3Rlc291cmNlID1uZXcgUmVtb3RlU291cmNlKCk7XG4gIGNvbnN0IGNhbXBhaWdubGlzdD1hd2FpdCByZW1vdGVzb3VyY2UuZ2V0Q2FtcGFpZ25saXN0KClcbiAgZGVidWcoY2FtcGFpZ25saXN0KVxuICBpZihjYW1wYWlnbmxpc3QubGVuZ3RoPT0wKXtcbiAgICBjb25zb2xlLmxvZyhcIm5vdCBjYW1wYWlnbiBuZWVkIHRvIHJ1blwiKVxuICB9XG4gIGZvciAoY29uc3QgY2FtcGFpZ24gb2YgY2FtcGFpZ25saXN0KSB7XG4gICAgc3dpdGNoIChjYW1wYWlnbi50eXBlKSB7XG4gICAgICBjYXNlIFwiYmlsaWJpbGlkb3dubG9hZFwiOlxuICAgICAgICBzY3JhcGVfY29uZmlnLnBsYXRmb3JtPVwiYmlsaWJpbGlcIlxuICAgICAgICBzY3JhcGVfY29uZmlnLmtleXdvcmRzPWNhbXBhaWduLmtleXdvcmRzXG4gICAgICAgIHNlX3NjcmFwZXIuc2VhcmNoZGF0YShicm93c2VyX2NvbmZpZywgc2NyYXBlX2NvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSAgXG59XG4vL2xvZ2luIHRvIGZhY2Vib29rXG5hc3luYyBmdW5jdGlvbiBsb2dpbigpIHtcbiAgbGV0IGNhbXBhaWduSWQgPSBnZXQocGFyZWFyZywgXCJjYW1wYWlnblwiLCBmYWxzZSk7XG4gIHZhciByZW1vdGVzb3VyY2UgPW5ldyBSZW1vdGVTb3VyY2UoKTtcbiAgbGV0IHNvc2V0dGluZyA9IGF3YWl0IHJlbW90ZXNvdXJjZS5nZXRSZW1vdGVDb25maWcoY2FtcGFpZ25JZCk7XG4gIGRlYnVnKHNvc2V0dGluZylcbiAgaWYoc29zZXR0aW5nPT0gbnVsbCl7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwic29zZXR0aW5nIGlzIHVuZGVmaW5lZFwiKTtcbiAgfVxuICBzY3JhcGVfY29uZmlnLnBsYXRmb3JtID0gc29zZXR0aW5nLnNvdHlwZTtcbiAgc2NyYXBlX2NvbmZpZy51c2VyID0gc29zZXR0aW5nLnNvY2lhbHVzZXI7XG4gIHNjcmFwZV9jb25maWcucGFzcyA9IHNvc2V0dGluZy5zb2NpYWxwYXNzO1xuICBjb25zb2xlLmxvZyhzb3NldHRpbmcpO1xuICAvL2NyZWF0ZSBhIHRtcCBmb2xkZXJcbiAgY29uc3QgdG1wcGF0aCA9IHJlc29sdmUoXCIuL3RtcC9cIiArIHNjcmFwZV9jb25maWcucGxhdGZvcm0gKyBcIi9cIiArIHNvc2V0dGluZy5zb2NpYWx1c2VyKTtcbiAgYXdhaXQgY3JlYXRlUGF0aCh0bXBwYXRoKTtcbiAgc2NyYXBlX2NvbmZpZy50bXBwYXRoPXRtcHBhdGhcblxuICBhd2FpdCBzZV9zY3JhcGVyLmxvZ2luKGJyb3dzZXJfY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGF0aChwYXRoKSB7XG4gIHBhdGguc3BsaXQoXCIvXCIpLnJlZHVjZSgoZGlyZWN0b3JpZXMsIGRpcmVjdG9yeSkgPT4ge1xuICAgIGRpcmVjdG9yaWVzICs9IGAke2RpcmVjdG9yeX0vYDtcblxuICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXJlY3RvcmllcykpIHtcbiAgICAgIGZzLm1rZGlyU3luYyhkaXJlY3Rvcmllcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yaWVzO1xuICB9LCBcIlwiKTtcbn1cblxucnVuQ29tbWFuZChwYXJlYXJnKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gVXNlIFR5cGVTY3JpcHQgbW9kdWxlcyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNTc1ODU4NC9jYW5ub3QtcmVkZWNsYXJlLWJsb2NrLXNjb3BlZC12YXJpYWJsZVxuZXhwb3J0IHt9O1xuY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCBvcyA9IHJlcXVpcmUoXCJvc1wiKTtcbmNvbnN0IF8gPSByZXF1aXJlKFwibG9kYXNoXCIpO1xuY29uc3QgeyBjcmVhdGVMb2dnZXIsIGZvcm1hdCwgdHJhbnNwb3J0cyB9ID0gcmVxdWlyZShcIndpbnN0b25cIik7XG5jb25zdCB7IGNvbWJpbmUsIHRpbWVzdGFtcCwgcHJpbnRmIH0gPSBmb3JtYXQ7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKShcInNlLXNjcmFwZXI6U2NyYXBlTWFuYWdlclwiKTtcbmNvbnN0IHsgQ2x1c3RlciB9ID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyXCIpO1xuY29uc3QgdmFuaWxsYVB1cHBldGVlciA9IHJlcXVpcmUoXCJwdXBwZXRlZXJcIik7XG5jb25zdCB7IGFkZEV4dHJhIH0gPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhXCIpO1xuLy8gY29uc3QgU3RlYWx0aCA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmEtcGx1Z2luLXN0ZWFsdGhcIik7XG4vLyBjb25zdCBBZGJsb2NrZXJQbHVnaW4gPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhLXBsdWdpbi1hZGJsb2NrZXJcIik7XG5cbmNvbnN0IFVzZXJBZ2VudCA9IHJlcXVpcmUoXCJ1c2VyLWFnZW50c1wiKTtcbmNvbnN0IGZhY2Vib29rID0gcmVxdWlyZShcIi4vbW9kdWxlcy9mYWNlYm9va19zY3JhcGVyLmpzXCIpO1xuY29uc3QgeW91dHViZSA9IHJlcXVpcmUoXCIuL21vZHVsZXMveW91dHViZV9zY3JhcGVyLmpzXCIpO1xuY29uc3QgYmlsaWJpbGkgPSByZXF1aXJlKFwiLi9tb2R1bGVzL2JpbGliaWxpX3NjcmFwZXIuanNcIik7XG4vLyBjb25zdCBiaW5nID0gcmVxdWlyZSgnLi9tb2R1bGVzL2JpbmcuanMnKTtcbi8vIGNvbnN0IHlhbmRleCA9IHJlcXVpcmUoJy4vbW9kdWxlcy95YW5kZXguanMnKTtcbi8vIGNvbnN0IGluZm9zcGFjZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy9pbmZvc3BhY2UuanMnKTtcbi8vIGNvbnN0IGR1Y2tkdWNrZ28gPSByZXF1aXJlKCcuL21vZHVsZXMvZHVja2R1Y2tnby5qcycpO1xuY29uc3QgQ3VzdG9tQ29uY3VycmVuY3lJbXBsID0gcmVxdWlyZShcIi4vY29uY3VycmVuY3ktaW1wbGVtZW50YXRpb25cIik7XG4vLyBjb25zdCBheGlvcyA9IHJlcXVpcmUoXCJheGlvc1wiKTtcbmNvbnN0IE1BWF9BTExPV0VEX0JST1dTRVJTID0gNjtcbi8vIGNvbnN0IHB1cHBldGVlciA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmFcIik7XG4vLyBjb25zdCBfU3RlYWx0aFBsdWdpbiA9IHJlcXVpcmUoJ3B1cHBldGVlci1leHRyYS1wbHVnaW4tc3RlYWx0aCcpO1xuLy8gY29uc3QgX0FkYmxvY2tlclBsdWdpbiA9IHJlcXVpcmUoJ3B1cHBldGVlci1leHRyYS1wbHVnaW4tYWRibG9ja2VyJyk7XG5cbmZ1bmN0aW9uIHdyaXRlX3Jlc3VsdHMoZm5hbWUsIGRhdGEpIHtcbiAgZnMud3JpdGVGaWxlU3luYyhmbmFtZSwgZGF0YSwgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHRocm93IGVycjtcbiAgICBjb25zb2xlLmxvZyhgUmVzdWx0cyB3cml0dGVuIHRvIGZpbGUgJHtmbmFtZX1gKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlYWRfa2V5d29yZHNfZnJvbV9maWxlKGZuYW1lKSB7XG4gIGxldCBrd3MgPSBmcy5yZWFkRmlsZVN5bmMoZm5hbWUpLnRvU3RyaW5nKCkuc3BsaXQob3MuRU9MKTtcbiAgLy8gY2xlYW4ga2V5d29yZHNcbiAga3dzID0ga3dzLmZpbHRlcigoa3cpID0+IHtcbiAgICByZXR1cm4ga3cudHJpbSgpLmxlbmd0aCA+IDA7XG4gIH0pO1xuICByZXR1cm4ga3dzO1xufVxuXG5cbmZ1bmN0aW9uIGdldFNjcmFwZXIoc2VhcmNoX2VuZ2luZTpzdHJpbmcsIGFyZ3M6YW55KSB7XG4gIGlmICh0eXBlb2Ygc2VhcmNoX2VuZ2luZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBuZXcge1xuICAgICAgZmFjZWJvb2s6IGZhY2Vib29rLkZhY2Vib29rU2NyYXBlcixcbiAgICAgIHlvdXR1YmU6IHlvdXR1YmUuWW91dHViZVNjcmFwZXIsXG4gICAgICBiaWxpYmlsaTogYmlsaWJpbGkuQmlsaWJpbGlTY3JhcGVyLFxuICAgIH1bc2VhcmNoX2VuZ2luZV0oYXJncyk7XG4gIH0gXG4gIC8vIGVsc2UgaWYgKHR5cGVvZiBzZWFyY2hfZW5naW5lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgLy8gICByZXR1cm4gbmV3IHNlYXJjaF9lbmdpbmUoYXJncyk7XG4gIC8vIH0gXG4gIGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBzb2NpYWwgcGxhdGZvcm0gbXVzdCBlaXRoZXIgYmUgYSBzdHJpbmcgb2YgY2xhc3MgKGZ1bmN0aW9uKWBcbiAgICApO1xuICB9XG59XG50eXBlIFNNY29uZmlnID17XG4gIGxvZ2dlcjp7aW5mbzpGdW5jdGlvbn07XG4gIGtleXdvcmRzOkFycmF5PHN0cmluZz47XG4gIHByb3hpZXM6QXJyYXk8c3RyaW5nPjtcbiAga2V5d29yZF9maWxlOnN0cmluZztcbiAgcHJveHlfZmlsZTpzdHJpbmc7XG4gIHVzZV9wcm94aWVzX29ubHk6Ym9vbGVhbjtcbiAgY3VzdG9tX2Z1bmM6c3RyaW5nO1xuICBjaHJvbWVfZmxhZ3M6QXJyYXk8c3RyaW5nPjtcbiAgcHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnOntcbiAgICBtYXhDb25jdXJyZW5jeTpudW1iZXI7XG4gICAgbW9uaXRvcjpib29sZWFuO1xuICAgIHRpbWVvdXQ6bnVtYmVyO1xuICB9XG4gIHJhbmRvbV91c2VyX2FnZW50OmJvb2xlYW47XG4gIHVzZXJfYWdlbnQ6c3RyaW5nO1xuICBoZWFkbGVzczpib29sZWFuO1xuICBwbGF0Zm9ybTpzdHJpbmc7XG59XG5jbGFzcyBTY3JhcGVNYW5hZ2VyIHtcbiAgY2x1c3Rlcjp7ZXhlY3V0ZTpGdW5jdGlvbjtpZGxlOkZ1bmN0aW9uO2Nsb3NlOkZ1bmN0aW9ufTtcbiAgcGx1Z2dhYmxlOntzdGFydF9icm93c2VyPzpGdW5jdGlvbixjbG9zZV9icm93c2VyPzpGdW5jdGlvbixoYW5kbGVfcmVzdWx0cz86RnVuY3Rpb24saGFuZGxlX21ldGFkYXRhPzpGdW5jdGlvbn07XG4gIHNjcmFwZXI6e3J1bkxvZ2luOkZ1bmN0aW9uO3dvcmtlcnNlYXJjaGRhdGE6RnVuY3Rpb259O1xuICBjb250ZXh0Om9iamVjdDtcbiAgY29uZmlnOlNNY29uZmlnO1xuICBsb2dnZXI6e2luZm86RnVuY3Rpb259O1xuICBicm93c2VyOntuZXdQYWdlOkZ1bmN0aW9ufTtcbiAgcGFnZTpvYmplY3Q7XG4gIG51bUNsdXN0ZXJzOm51bWJlcjtcbiAgdG1wcGF0aDpzdHJpbmc7XG4gIHJ1bkxvZ2luOkZ1bmN0aW9uO1xuICBjb25zdHJ1Y3Rvcihjb25maWcsIGNvbnRleHQgPSB7fSkge1xuICAgIHRoaXMuY2x1c3RlciA9IG51bGw7XG4gICAgdGhpcy5wbHVnZ2FibGUgPSBudWxsO1xuICAgIHRoaXMuc2NyYXBlciA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICBcbiAgICAvLyBhd2FpdCB0aGlzLmdldFJlbW90ZUNvbmZpZyhjYW1wYWlnbklkKVxuXG4gICAgdGhpcy5jb25maWcgPSBfLmRlZmF1bHRzKGNvbmZpZywge1xuICAgICAgLy8gcmVtb3RlX2FkZDplbmRjb2ZpZy5SRU1PVEVBREQsXG4gICAgICAvLyByZW1vdGVfdXNlcm5hbWU6ZW5kY29maWcuVVNFUk5BTUUsXG4gICAgICAvLyByZW1vdGVfcGFzc3dvcmQ6ZW5kY29maWcuUEFTU1dPUkQsXG4gICAgICAvLyB0aGUgdXNlciBhZ2VudCB0byBzY3JhcGUgd2l0aFxuICAgICAgdXNlcl9hZ2VudDpcbiAgICAgICAgXCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTA3LjAuMC4wIFNhZmFyaS81MzcuMzZcIixcbiAgICAgIC8vIGlmIHJhbmRvbV91c2VyX2FnZW50IGlzIHNldCB0byBUcnVlLCBhIHJhbmRvbSB1c2VyIGFnZW50IGlzIGNob3NlblxuICAgICAgcmFuZG9tX3VzZXJfYWdlbnQ6IGZhbHNlLFxuICAgICAgLy8gd2hldGhlciB0byBzZWxlY3QgbWFudWFsIHNldHRpbmdzIGluIHZpc2libGUgbW9kZVxuICAgICAgc2V0X21hbnVhbF9zZXR0aW5nczogZmFsc2UsXG4gICAgICAvLyBsb2cgaXAgYWRkcmVzcyBkYXRhXG4gICAgICBsb2dfaXBfYWRkcmVzczogZmFsc2UsXG4gICAgICAvLyBsb2cgaHR0cCBoZWFkZXJzXG4gICAgICBsb2dfaHR0cF9oZWFkZXJzOiBmYWxzZSxcbiAgICAgIC8vIGhvdyBsb25nIHRvIHNsZWVwIGJldHdlZW4gcmVxdWVzdHMuIGEgcmFuZG9tIHNsZWVwIGludGVydmFsIHdpdGhpbiB0aGUgcmFuZ2UgW2EsYl1cbiAgICAgIC8vIGlzIGRyYXduIGJlZm9yZSBldmVyeSByZXF1ZXN0LiBlbXB0eSBzdHJpbmcgZm9yIG5vIHNsZWVwaW5nLlxuICAgICAgc2xlZXBfcmFuZ2U6IG51bGwsXG5cbiAgICAgIGxvZ2dlcjogY3JlYXRlTG9nZ2VyKHtcbiAgICAgICAgbGV2ZWw6IFwiaW5mb1wiLFxuICAgICAgICBmb3JtYXQ6IGNvbWJpbmUoXG4gICAgICAgICAgdGltZXN0YW1wKCksXG4gICAgICAgICAgcHJpbnRmKCh7IGxldmVsLCBtZXNzYWdlLCB0aW1lc3RhbXAgfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RpbWVzdGFtcH0gWyR7bGV2ZWx9XSAke21lc3NhZ2V9YDtcbiAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICB0cmFuc3BvcnRzOiBbbmV3IHRyYW5zcG9ydHMuQ29uc29sZSgpXSxcbiAgICAgIH0pLFxuICAgICAgcGxhdGZvcm06IFwiZmFjZWJvb2tcIixcbiAgICAgIGtleXdvcmRzOiBbXCJub2RlanMgcm9ja3NcIl0sXG4gICAgICAvLyB3aGV0aGVyIHRvIHN0YXJ0IHRoZSBicm93c2VyIGluIGhlYWRsZXNzIG1vZGVcbiAgICAgIGhlYWRsZXNzOiB0cnVlLFxuICAgICAgLy8gc3BlY2lmeSBmbGFncyBwYXNzZWQgdG8gY2hyb21lIGhlcmVcbiAgICAgIC8vIEFib3V0IG91ciBkZWZhdWx0cyB2YWx1ZXMgaHR0cHM6Ly9wZXRlci5zaC9leHBlcmltZW50cy9jaHJvbWl1bS1jb21tYW5kLWxpbmUtc3dpdGNoZXMvXG4gICAgICBjaHJvbWVfZmxhZ3M6IFtcbiAgICAgICAgXCItLWRpc2FibGUtaW5mb2JhcnNcIixcbiAgICAgICAgXCItLXdpbmRvdy1wb3NpdGlvbj0wLDBcIixcbiAgICAgICAgXCItLWlnbm9yZS1jZXJ0aWZjYXRlLWVycm9yc1wiLFxuICAgICAgICBcIi0taWdub3JlLWNlcnRpZmNhdGUtZXJyb3JzLXNwa2ktbGlzdFwiLFxuICAgICAgICBcIi0tbm8tc2FuZGJveFwiLFxuICAgICAgICBcIi0tZGlzYWJsZS1zZXR1aWQtc2FuZGJveFwiLFxuICAgICAgICBcIi0tZGlzYWJsZS1kZXYtc2htLXVzYWdlXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWFjY2VsZXJhdGVkLTJkLWNhbnZhc1wiLFxuICAgICAgICBcIi0tZGlzYWJsZS1ncHVcIixcbiAgICAgICAgXCItLXdpbmRvdy1zaXplPTEyODAsNzY4XCIsXG4gICAgICAgIFwiLS1zdGFydC1mdWxsc2NyZWVuXCIsXG4gICAgICAgIFwiLS1oaWRlLXNjcm9sbGJhcnNcIixcbiAgICAgICAgXCItLWRpc2FibGUtbm90aWZpY2F0aW9uc1wiLFxuICAgICAgXSxcbiAgICAgIC8vZml4IGdvb2dsZSBhY2NvdW50IGNhbiBub3QgbG9naW5cbiAgICAgIGlnbm9yZURlZmF1bHRBcmdzOiBbXG4gICAgICAgIFwiLS1lbmFibGUtYXV0b21hdGlvblwiLFxuICAgICAgICBcIi0tZGlzYWJsZS1leHRlbnNpb25zXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWRlZmF1bHQtYXBwc1wiLFxuICAgICAgICBcIi0tZGlzYWJsZS1jb21wb25lbnQtZXh0ZW5zaW9ucy13aXRoLWJhY2tncm91bmQtcGFnZXNcIixcbiAgICAgIF0sXG4gICAgICAvLyB0aGUgbnVtYmVyIG9mIHBhZ2VzIHRvIHNjcmFwZSBmb3IgZWFjaCBrZXl3b3JkXG4gICAgICBudW1fcGFnZXM6IDEsXG4gICAgICAvLyBwYXRoIHRvIG91dHB1dCBmaWxlLCBkYXRhIHdpbGwgYmUgc3RvcmVkIGluIEpTT05cbiAgICAgIG91dHB1dF9maWxlOiBcIlwiLFxuICAgICAgLy8gd2hldGhlciB0byBhbHNvIHBhc3N0aHJ1IGFsbCB0aGUgaHRtbCBvdXRwdXQgb2YgdGhlIHNlcnAgcGFnZXNcbiAgICAgIGh0bWxfb3V0cHV0OiBmYWxzZSxcbiAgICAgIC8vIHdoZXRoZXIgdG8gc3RyaXAgSlMgYW5kIENTUyBmcm9tIHRoZSBodG1sX291dHB1dFxuICAgICAgLy8gaGFzIG9ubHkgYW4gZWZmZWN0IGlmIGBodG1sX291dHB1dGAgaXMgdHJ1ZVxuICAgICAgY2xlYW5faHRtbF9vdXRwdXQ6IHRydWUsXG4gICAgICAvLyByZW1vdmUgYWxsIGRhdGEgaW1hZ2VzIGZyb20gdGhlIGh0bWxcbiAgICAgIGNsZWFuX2RhdGFfaW1hZ2VzOiB0cnVlLFxuICAgICAgLy8gd2hldGhlciB0byByZXR1cm4gYSBzY3JlZW5zaG90IG9mIHNlcnAgcGFnZXMgYXMgYjY0IGRhdGFcbiAgICAgIHNjcmVlbl9vdXRwdXQ6IGZhbHNlLFxuICAgICAgLy8gU2NyYXBlIHVybCBmcm9tIGxvY2FsIGZpbGUuIE1haW5seSB1c2VkIGZvciB0ZXN0aW5nLlxuICAgICAgc2NyYXBlX2Zyb21fZmlsZTogXCJcIixcbiAgICAgIC8vIHdoZXRoZXIgdG8gcHJldmVudCBpbWFnZXMsIGNzcywgZm9udHMgYW5kIG1lZGlhIGZyb20gYmVpbmcgbG9hZGVkXG4gICAgICAvLyB3aWxsIHNwZWVkIHVwIHNjcmFwaW5nIGEgZ3JlYXQgZGVhbFxuICAgICAgYmxvY2tfYXNzZXRzOiB0cnVlLFxuICAgICAgLy8gcGF0aCB0byBqcyBtb2R1bGUgdGhhdCBleHRlbmRzIGZ1bmN0aW9uYWxpdHlcbiAgICAgIC8vIHRoaXMgbW9kdWxlIHNob3VsZCBleHBvcnQgdGhlIGZ1bmN0aW9uczpcbiAgICAgIC8vIGdldF9icm93c2VyLCBoYW5kbGVfbWV0YWRhdGEsIGNsb3NlX2Jyb3dzZXJcbiAgICAgIC8vY3VzdG9tX2Z1bmM6IHJlc29sdmUoJ2V4YW1wbGVzL3BsdWdnYWJsZS5qcycpLFxuICAgICAgY3VzdG9tX2Z1bmM6IG51bGwsXG4gICAgICB0aHJvd19vbl9kZXRlY3Rpb246IGZhbHNlLFxuICAgICAgLy8gTGlzdCBvZiBwcm94aWVzIHRvIHVzZSBbJ3NvY2tzNTovLzc4Ljk0LjE3Mi40MjoxMDgwJywgJ2h0dHA6Ly9sb2NhbGhvc3Q6MTA4MCddXG4gICAgICBwcm94aWVzOiBudWxsLFxuICAgICAgLy8gYSBmaWxlIHdpdGggb25lIHByb3h5IHBlciBsaW5lLiBFeGFtcGxlOlxuICAgICAgLy8gc29ja3M1Oi8vNzguOTQuMTcyLjQyOjEwODBcbiAgICAgIC8vIGh0dHA6Ly8xMTguMTc0LjIzMy4xMDo0ODQwMFxuICAgICAgcHJveHlfZmlsZTogXCJcIixcbiAgICAgIC8vIHdoZXRoZXIgdG8gdXNlIHByb3hpZXMgb25seVxuICAgICAgLy8gd2hlbiB0aGlzIGlzIHNldCB0byB0cnVlLCBzZS1zY3JhcGVyIHdpbGwgbm90IHVzZVxuICAgICAgLy8geW91ciBkZWZhdWx0IElQIGFkZHJlc3NcbiAgICAgIHVzZV9wcm94aWVzX29ubHk6IGZhbHNlLFxuICAgICAgLy8gY2hlY2sgaWYgaGVhZGxlc3MgY2hyb21lIGVzY2FwZXMgY29tbW9uIGRldGVjdGlvbiB0ZWNobmlxdWVzXG4gICAgICAvLyB0aGlzIGlzIGEgcXVpY2sgdGVzdCBhbmQgc2hvdWxkIGJlIHVzZWQgZm9yIGRlYnVnZ2luZ1xuICAgICAgdGVzdF9ldmFzaW9uOiBmYWxzZSxcbiAgICAgIGFwcGx5X2V2YXNpb25fdGVjaG5pcXVlczogdHJ1ZSxcbiAgICAgIC8vIHNldHRpbmdzIGZvciBwdXBwZXRlZXItY2x1c3RlclxuICAgICAgcHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnOiB7XG4gICAgICAgIHRpbWVvdXQ6IDMwICogNjAgKiAxMDAwLCAvLyBtYXggdGltZW91dCBzZXQgdG8gMzAgbWludXRlc1xuICAgICAgICBtb25pdG9yOiBmYWxzZSxcbiAgICAgICAgY29uY3VycmVuY3k6IENsdXN0ZXIuQ09OQ1VSUkVOQ1lfQlJPV1NFUixcbiAgICAgICAgbWF4Q29uY3VycmVuY3k6IDEsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIFxuICAgIHRoaXMubG9nZ2VyID0gdGhpcy5jb25maWcubG9nZ2VyO1xuXG4gICAgaWYgKGNvbmZpZy5zbGVlcF9yYW5nZSkge1xuICAgICAgLy8gcGFyc2UgYW4gYXJyYXlcbiAgICAgIGNvbmZpZy5zbGVlcF9yYW5nZSA9IGV2YWwoY29uZmlnLnNsZWVwX3JhbmdlKTtcblxuICAgICAgaWYgKFxuICAgICAgICBjb25maWcuc2xlZXBfcmFuZ2UubGVuZ3RoICE9PSAyIFxuICAgICAgKSB7XG4gICAgICAgIHRocm93IFwic2xlZXBfcmFuZ2UgaXMgbm90IGEgdmFsaWQgYXJyYXkgb2YgdHdvIGludGVnZXJzLlwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHRoaXMuY29uZmlnLmtleXdvcmRfZmlsZSkpIHtcbiAgICAgIHRoaXMuY29uZmlnLmtleXdvcmRzID0gcmVhZF9rZXl3b3Jkc19mcm9tX2ZpbGUodGhpcy5jb25maWcua2V5d29yZF9maWxlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcucHJveGllcyAmJiB0aGlzLmNvbmZpZy5wcm94eV9maWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiRWl0aGVyIHVzZSBhIHByb3h5X2ZpbGUgb3Igc3BlY2lmeSBhIHByb3h5IGZvciBhbGwgY29ubmVjdGlvbnMuIERvIG5vdCB1c2UgYm90aCBvcHRpb25zLlwiXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5wcm94eV9maWxlKSB7XG4gICAgICB0aGlzLmNvbmZpZy5wcm94aWVzID0gcmVhZF9rZXl3b3Jkc19mcm9tX2ZpbGUodGhpcy5jb25maWcucHJveHlfZmlsZSk7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKGAke3RoaXMuY29uZmlnLnByb3hpZXMubGVuZ3RofSBwcm94aWVzIHJlYWQgZnJvbSBmaWxlLmApO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jb25maWcucHJveGllcyAmJiB0aGlzLmNvbmZpZy51c2VfcHJveGllc19vbmx5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiTXVzdCBwcm92aWRlIGF0IGxlYXN0IG9uZSBwcm94eSBpbiBwcm94aWVzIGlmIHlvdSBlbmFibGUgdXNlX3Byb3hpZXNfb25seVwiXG4gICAgICApO1xuICAgIH1cblxuICAgIGRlYnVnKFwidGhpcy5jb25maWc9JU9cIiwgdGhpcy5jb25maWcpO1xuICB9XG5cbiAgLypcbiAgICogTGF1bmNoZXMgdGhlIHB1cHBldGVlciBjbHVzdGVyIG9yIGJyb3dzZXIuXG4gICAqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgYnJvd3NlciB3YXMgc3VjY2Vzc2Z1bGx5IGxhdW5jaGVkLiBPdGhlcndpc2Ugd2lsbCByZXR1cm4gZmFsc2UuXG4gICAqL1xuICBhc3luYyBzdGFydCgpIHtcbiAgICBpZiAodGhpcy5jb25maWcuY3VzdG9tX2Z1bmMpIHtcbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHRoaXMuY29uZmlnLmN1c3RvbV9mdW5jKSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IFBsdWdnYWJsZUNsYXNzID0gcmVxdWlyZSh0aGlzLmNvbmZpZy5jdXN0b21fZnVuYyk7XG4gICAgICAgICAgdGhpcy5wbHVnZ2FibGUgPSBuZXcgUGx1Z2dhYmxlQ2xhc3Moe1xuICAgICAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihleGNlcHRpb24pO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRmlsZSBcIiR7dGhpcy5jb25maWcuY3VzdG9tX2Z1bmN9XCIgZG9lcyBub3QgZXhpc3QhYCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaHJvbWVfZmxhZ3MgPSBfLmNsb25lKHRoaXMuY29uZmlnLmNocm9tZV9mbGFncyk7XG5cbiAgICBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuc3RhcnRfYnJvd3Nlcikge1xuICAgICAgLy8gbGF1bmNoX2FyZ3MuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICB0aGlzLmJyb3dzZXIgPSBhd2FpdCB0aGlzLnBsdWdnYWJsZS5zdGFydF9icm93c2VyKHtcbiAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIH0pO1xuICAgICAgLy8gY29uc29sZS5sb2coXCIyMjlcIilcbiAgICAgIHRoaXMucGFnZSA9IGF3YWl0IHRoaXMuYnJvd3Nlci5uZXdQYWdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFxuICAgICAgLy8gaWYgbm8gY3VzdG9tIHN0YXJ0X2Jyb3dzZXIgZnVuY3Rpb25hbGl0eSB3YXMgZ2l2ZW5cbiAgICAgIC8vIHVzZSBwdXBwZXRlZXItY2x1c3RlciBmb3Igc2NyYXBpbmdcblxuICAgICAgbGV0IHByb3hpZXM7XG4gICAgICAvLyBpZiB3ZSBoYXZlIGF0IGxlYXN0IG9uZSBwcm94eSwgYWx3YXlzIHVzZSBDT05DVVJSRU5DWV9CUk9XU0VSXG4gICAgICAvLyBhbmQgc2V0IG1heENvbmN1cnJlbmN5IHRvIHRoaXMuY29uZmlnLnByb3hpZXMubGVuZ3RoICsgMVxuICAgICAgLy8gZWxzZSB1c2Ugd2hhdGV2ZXIgdGhpcy5jb25maWd1cmF0aW9uIHdhcyBwYXNzZWRcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5wcm94aWVzICYmIHRoaXMuY29uZmlnLnByb3hpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBiZWNhdXNlIHdlIHVzZSByZWFsIGJyb3dzZXJzLCB3ZSByYW4gb3V0IG9mIG1lbW9yeSBvbiBub3JtYWwgbGFwdG9wc1xuICAgICAgICAvLyB3aGVuIHVzaW5nIG1vcmUgdGhhbiBtYXliZSA1IG9yIDYgYnJvd3NlcnMuXG4gICAgICAgIC8vIHRoZXJlZm9yZSBoYXJkY29kZSBhIGxpbWl0IGhlcmVcbiAgICAgICAgLy8gVE9ETyBub3Qgc3VyZSB0aGlzIHdoYXQgd2Ugd2FudFxuICAgICAgICB0aGlzLm51bUNsdXN0ZXJzID0gTWF0aC5taW4oXG4gICAgICAgICAgdGhpcy5jb25maWcucHJveGllcy5sZW5ndGggKyAodGhpcy5jb25maWcudXNlX3Byb3hpZXNfb25seSA/IDAgOiAxKSxcbiAgICAgICAgICBNQVhfQUxMT1dFRF9CUk9XU0VSU1xuICAgICAgICApO1xuICAgICAgICBwcm94aWVzID0gXy5jbG9uZSh0aGlzLmNvbmZpZy5wcm94aWVzKTtcblxuICAgICAgICAvLyBJbnNlcnQgYSBmaXJzdCBjb25maWcgd2l0aG91dCBwcm94eSBpZiB1c2VfcHJveHlfb25seSBpcyBmYWxzZVxuICAgICAgICBpZiAodGhpcy5jb25maWcudXNlX3Byb3hpZXNfb25seSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBwcm94aWVzLnVuc2hpZnQobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubnVtQ2x1c3RlcnMgPSB0aGlzLmNvbmZpZy5wdXBwZXRlZXJfY2x1c3Rlcl9jb25maWcubWF4Q29uY3VycmVuY3k7XG4gICAgICAgIHByb3hpZXMgPSBfLnRpbWVzKHRoaXMubnVtQ2x1c3RlcnMsIG51bGwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKGBVc2luZyAke3RoaXMubnVtQ2x1c3RlcnN9IGNsdXN0ZXJzLmApO1xuXG4gICAgICAvLyBHaXZlIHRoZSBwZXIgYnJvd3NlciBvcHRpb25zXG4gICAgICBjb25zdCBwZXJCcm93c2VyT3B0aW9ucyA9IF8ubWFwKHByb3hpZXMsIChwcm94eSkgPT4ge1xuICAgICAgICBjb25zdCB1c2VyQWdlbnQgPSB0aGlzLmNvbmZpZy5yYW5kb21fdXNlcl9hZ2VudFxuICAgICAgICAgID8gbmV3IFVzZXJBZ2VudCh7IGRldmljZUNhdGVnb3J5OiBcImRlc2t0b3BcIiB9KS50b1N0cmluZygpXG4gICAgICAgICAgOiB0aGlzLmNvbmZpZy51c2VyX2FnZW50O1xuICAgICAgICBsZXQgYXJncyA9IGNocm9tZV9mbGFncy5jb25jYXQoW2AtLXVzZXItYWdlbnQ9JHt1c2VyQWdlbnR9YF0pO1xuXG4gICAgICAgIGlmIChwcm94eSkge1xuICAgICAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdChbYC0tcHJveHktc2VydmVyPSR7cHJveHl9YF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoZWFkbGVzczogdGhpcy5jb25maWcuaGVhZGxlc3MsXG4gICAgICAgICAgaWdub3JlSFRUUFNFcnJvcnM6IHRydWUsXG4gICAgICAgICAgYXJncyxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICBkZWJ1ZyhcInBlckJyb3dzZXJPcHRpb25zPSVPXCIsIHBlckJyb3dzZXJPcHRpb25zKTtcblxuICAgICAgLy8gcHVwcGV0ZWVyLnVzZShfU3RlYWx0aFBsdWdpbigpKTtcbiAgICAgIC8vIHB1cHBldGVlci51c2UoX0FkYmxvY2tlclBsdWdpbigpKTtcblxuICAgICAgY29uc3QgcHVwcGV0ZWVyID0gYWRkRXh0cmEodmFuaWxsYVB1cHBldGVlcik7XG5cbiAgICAgIC8vIEFkZCBzdGVhbHRoIHBsdWdpbiBhbmQgdXNlIGRlZmF1bHRzIChhbGwgdHJpY2tzIHRvIGhpZGUgcHVwcGV0ZWVyIHVzYWdlKVxuICAgICAgLy8gIHB1cHBldGVlci51c2UoU3RlYWx0aCgpKTtcblxuICAgICAgLy8gQWRkIGFkYmxvY2tlciBwbHVnaW4gdG8gYmxvY2sgYWxsIGFkcyBhbmQgdHJhY2tlcnMgKHNhdmVzIGJhbmR3aWR0aClcbiAgICAgIC8vIHB1cHBldGVlci51c2UoQWRibG9ja2VyUGx1Z2luKHsgYmxvY2tUcmFja2VyczogdHJ1ZSB9KSk7XG5cbiAgICAgIHRoaXMuY2x1c3RlciA9IGF3YWl0IENsdXN0ZXIubGF1bmNoKHtcbiAgICAgICAgcHVwcGV0ZWVyLFxuICAgICAgICBtb25pdG9yOiB0aGlzLmNvbmZpZy5wdXBwZXRlZXJfY2x1c3Rlcl9jb25maWcubW9uaXRvcixcbiAgICAgICAgdGltZW91dDogdGhpcy5jb25maWcucHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnLnRpbWVvdXQsIC8vIG1heCB0aW1lb3V0IHNldCB0byAzMCBtaW51dGVzXG4gICAgICAgIGNvbmN1cnJlbmN5OiBDdXN0b21Db25jdXJyZW5jeUltcGwsXG4gICAgICAgIG1heENvbmN1cnJlbmN5OiB0aGlzLm51bUNsdXN0ZXJzLFxuICAgICAgICBwdXBwZXRlZXJPcHRpb25zOiB7XG4gICAgICAgICAgLy8gcHVwcGV0ZWVyOnB1cHBldGVlcixcbiAgICAgICAgICBwZXJCcm93c2VyT3B0aW9uczogcGVyQnJvd3Nlck9wdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBsb2dpbiB0aGUgc29jaWxhIG1lZGlhIHBsYXRmb3JtXG4gICAqL1xuICBhc3luYyBsb2dpbihzY3JhcGVfY29uZmlnID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcblxuICAgIC8vIHZhciByZXN1bHRzID0ge307XG4gICAgLy8gdmFyIG51bV9yZXF1ZXN0cyA9IDA7XG4gICAgLy8gdmFyIG1ldGFkYXRhID0ge307XG4gICAgLy8gdmFyIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG5cbiAgICBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuc3RhcnRfYnJvd3Nlcikge1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5jb25maWcucGxhdGZvcm0pXG4gICAgICB0aGlzLnNjcmFwZXIgPSBnZXRTY3JhcGVyKHRoaXMuY29uZmlnLnBsYXRmb3JtLCB7XG4gICAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcbiAgICAgICAgcGx1Z2dhYmxlOiB0aGlzLnBsdWdnYWJsZSxcbiAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxuICAgICAgICB0bXBwYXRoOiB0aGlzLnRtcHBhdGgsXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgdGhpcy5zY3JhcGVyLnJ1bkxvZ2luKHRoaXMucGFnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEVhY2ggYnJvd3NlciB3aWxsIGdldCBOLyhLKzEpIGtleXdvcmRzIGFuZCB3aWxsIGlzc3VlIE4vKEsrMSkgKiBNIHRvdGFsIHJlcXVlc3RzIHRvIHRoZSBzZWFyY2ggZW5naW5lLlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9wdXBwZXRlZXIvaXNzdWVzLzY3OFxuICAgICAgLy8gVGhlIHF1ZXN0aW9uIGlzOiBJcyBpdCBwb3NzaWJsZSB0byBzZXQgcHJveGllcyBwZXIgUGFnZT8gUGVyIEJyb3dzZXI/XG4gICAgICAvLyBhcyBmYXIgYXMgSSBjYW4gc2VlLCBwdXBwZXRlZXIgY2x1c3RlciB1c2VzIHRoZSBzYW1lIHB1cHBldGVlck9wdGlvbnNcbiAgICAgIC8vIGZvciBldmVyeSBicm93c2VyIGluc3RhbmNlLiBXZSB3aWxsIHVzZSBvdXIgY3VzdG9tIHB1cHBldGVlci1jbHVzdGVyIHZlcnNpb24uXG4gICAgICAvLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9wcm94eS1jaGFpblxuICAgICAgLy8gdGhpcyBhbnN3ZXIgbG9va3MgbmljZTogaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9wdXBwZXRlZXIvaXNzdWVzLzY3OCNpc3N1ZWNvbW1lbnQtMzg5MDk2MDc3XG4gICAgICBsZXQgY2h1bmtzID0gW107XG4gICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHRoaXMubnVtQ2x1c3RlcnM7IG4rKykge1xuICAgICAgICBjaHVua3MucHVzaChbXSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuY29uZmlnLmtleXdvcmRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGNodW5rc1trICUgdGhpcy5udW1DbHVzdGVyc10ucHVzaCh0aGlzLmNvbmZpZy5rZXl3b3Jkc1trXSk7XG4gICAgICB9XG5cbiAgICAgIGRlYnVnKFwiY2h1bmtzPSVvXCIsIGNodW5rcyk7XG5cbiAgICAgIGxldCBleGVjUHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgY2h1bmtzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IF8uY2xvbmUodGhpcy5jb25maWcpO1xuICAgICAgICBjb25maWcua2V5d29yZHMgPSBjaHVua3NbY107XG5cbiAgICAgICAgdmFyIG9iaiA9IGdldFNjcmFwZXIodGhpcy5jb25maWcucGxhdGZvcm0sIHtcbiAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICBjb250ZXh0OiB7fSxcbiAgICAgICAgICBwbHVnZ2FibGU6IHRoaXMucGx1Z2dhYmxlLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgYm91bmRNZXRob2QgPSBvYmoucnVuTG9naW4uYmluZChvYmopO1xuICAgICAgICBleGVjUHJvbWlzZXMucHVzaCh0aGlzLmNsdXN0ZXIuZXhlY3V0ZSh7fSwgYm91bmRNZXRob2QpKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoZXhlY1Byb21pc2VzKTtcblxuICAgICAgLy8gTWVyZ2UgcmVzdWx0cyBhbmQgbWV0YWRhdGEgcGVyIGtleXdvcmRcbiAgICAgIC8vIGZvciAobGV0IHByb21pc2VSZXR1cm4gb2YgcHJvbWlzZVJldHVybnMpIHtcbiAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKHJlc3VsdHMsIHByb21pc2VSZXR1cm4ucmVzdWx0cyk7XG4gICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihtZXRhZGF0YSwgcHJvbWlzZVJldHVybi5tZXRhZGF0YSk7XG4gICAgICAvLyAgICAgbnVtX3JlcXVlc3RzICs9IHByb21pc2VSZXR1cm4ubnVtX3JlcXVlc3RzO1xuICAgICAgLy8gfVxuICAgIH1cblxuICAgIC8vIGxldCB0aW1lRGVsdGEgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgIC8vIGxldCBtc19wZXJfcmVxdWVzdCA9IHRpbWVEZWx0YS9udW1fcmVxdWVzdHM7XG5cbiAgICAvLyB0aGlzLmxvZ2dlci5pbmZvKGBTY3JhcGVyIHRvb2sgJHt0aW1lRGVsdGF9bXMgdG8gcGVyZm9ybSAke251bV9yZXF1ZXN0c30gcmVxdWVzdHMuYCk7XG4gICAgLy8gdGhpcy5sb2dnZXIuaW5mbyhgT24gYXZlcmFnZSBtcy9yZXF1ZXN0OiAke21zX3Blcl9yZXF1ZXN0fW1zL3JlcXVlc3RgKTtcblxuICAgIC8vIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfcmVzdWx0cykge1xuICAgIC8vICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfcmVzdWx0cyhyZXN1bHRzKTtcbiAgICAvLyB9XG5cbiAgICAvLyBtZXRhZGF0YS5lbGFwc2VkX3RpbWUgPSB0aW1lRGVsdGEudG9TdHJpbmcoKTtcbiAgICAvLyBtZXRhZGF0YS5tc19wZXJfa2V5d29yZCA9IG1zX3Blcl9yZXF1ZXN0LnRvU3RyaW5nKCk7XG4gICAgLy8gbWV0YWRhdGEubnVtX3JlcXVlc3RzID0gbnVtX3JlcXVlc3RzO1xuXG4gICAgLy8gZGVidWcoJ21ldGFkYXRhPSVPJywgbWV0YWRhdGEpO1xuXG4gICAgLy8gaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9tZXRhZGF0YSkge1xuICAgIC8vICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfbWV0YWRhdGEobWV0YWRhdGEpO1xuICAgIC8vIH1cblxuICAgIC8vIGlmICh0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZSkge1xuICAgIC8vICAgICB0aGlzLmxvZ2dlci5pbmZvKGBXcml0aW5nIHJlc3VsdHMgdG8gJHt0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZX1gKTtcbiAgICAvLyAgICAgd3JpdGVfcmVzdWx0cyh0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZSwgSlNPTi5zdHJpbmdpZnkocmVzdWx0cywgbnVsbCwgNCkpO1xuICAgIC8vIH1cblxuICAgIC8vIHJldHVybiB7XG4gICAgLy8gICAgIHJlc3VsdHM6IHJlc3VsdHMsXG4gICAgLy8gICAgIG1ldGFkYXRhOiBtZXRhZGF0YSB8fCB7fSxcbiAgICAvLyB9O1xuICB9XG5cbiAgLypcbiAgICogZ2V0IGRhdGEgdXJsIGZyb20gcGxhdGZvcm1cbiAgICovXG4gIGFzeW5jIHNlYXJjaGRhdGEoc2NyYXBlX2NvbmZpZyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgc2NyYXBlX2NvbmZpZyk7XG5cbiAgICBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuc3RhcnRfYnJvd3Nlcikge1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5jb25maWcucGxhdGZvcm0pXG4gICAgICB0aGlzLnNjcmFwZXIgPSBnZXRTY3JhcGVyKHRoaXMuY29uZmlnLnBsYXRmb3JtLCB7XG4gICAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcbiAgICAgICAgcGx1Z2dhYmxlOiB0aGlzLnBsdWdnYWJsZSxcbiAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxuICAgICAgICB0bXBwYXRoOiB0aGlzLnRtcHBhdGgsXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgdGhpcy5zY3JhcGVyLndvcmtlcnNlYXJjaGRhdGEodGhpcy5wYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRWFjaCBicm93c2VyIHdpbGwgZ2V0IE4vKEsrMSkga2V5d29yZHMgYW5kIHdpbGwgaXNzdWUgTi8oSysxKSAqIE0gdG90YWwgcmVxdWVzdHMgdG8gdGhlIHNlYXJjaCBlbmdpbmUuXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3B1cHBldGVlci9pc3N1ZXMvNjc4XG4gICAgICAvLyBUaGUgcXVlc3Rpb24gaXM6IElzIGl0IHBvc3NpYmxlIHRvIHNldCBwcm94aWVzIHBlciBQYWdlPyBQZXIgQnJvd3Nlcj9cbiAgICAgIC8vIGFzIGZhciBhcyBJIGNhbiBzZWUsIHB1cHBldGVlciBjbHVzdGVyIHVzZXMgdGhlIHNhbWUgcHVwcGV0ZWVyT3B0aW9uc1xuICAgICAgLy8gZm9yIGV2ZXJ5IGJyb3dzZXIgaW5zdGFuY2UuIFdlIHdpbGwgdXNlIG91ciBjdXN0b20gcHVwcGV0ZWVyLWNsdXN0ZXIgdmVyc2lvbi5cbiAgICAgIC8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3Byb3h5LWNoYWluXG4gICAgICAvLyB0aGlzIGFuc3dlciBsb29rcyBuaWNlOiBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3B1cHBldGVlci9pc3N1ZXMvNjc4I2lzc3VlY29tbWVudC0zODkwOTYwNzdcbiAgICAgIGxldCBjaHVua3MgPSBbXTtcbiAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdGhpcy5udW1DbHVzdGVyczsgbisrKSB7XG4gICAgICAgIGNodW5rcy5wdXNoKFtdKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5jb25maWcua2V5d29yZHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgY2h1bmtzW2sgJSB0aGlzLm51bUNsdXN0ZXJzXS5wdXNoKHRoaXMuY29uZmlnLmtleXdvcmRzW2tdKTtcbiAgICAgIH1cblxuICAgICAgZGVidWcoXCJjaHVua3M9JW9cIiwgY2h1bmtzKTtcblxuICAgICAgbGV0IGV4ZWNQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBjaHVua3MubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gXy5jbG9uZSh0aGlzLmNvbmZpZyk7XG4gICAgICAgIGNvbmZpZy5rZXl3b3JkcyA9IGNodW5rc1tjXTtcblxuICAgICAgICB2YXIgb2JqID0gZ2V0U2NyYXBlcih0aGlzLmNvbmZpZy5wbGF0Zm9ybSwge1xuICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgICAgIHBsdWdnYWJsZTogdGhpcy5wbHVnZ2FibGUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBib3VuZE1ldGhvZCA9IG9iai53b3JrZXJzZWFyY2hkYXRhLmJpbmQob2JqKTtcbiAgICAgICAgZXhlY1Byb21pc2VzLnB1c2godGhpcy5jbHVzdGVyLmV4ZWN1dGUoe30sIGJvdW5kTWV0aG9kKSk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGV4ZWNQcm9taXNlcyk7XG5cbiAgICAgIC8vIE1lcmdlIHJlc3VsdHMgYW5kIG1ldGFkYXRhIHBlciBrZXl3b3JkXG4gICAgICAvLyBmb3IgKGxldCBwcm9taXNlUmV0dXJuIG9mIHByb21pc2VSZXR1cm5zKSB7XG4gICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHRzLCBwcm9taXNlUmV0dXJuLnJlc3VsdHMpO1xuICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24obWV0YWRhdGEsIHByb21pc2VSZXR1cm4ubWV0YWRhdGEpO1xuICAgICAgLy8gICAgIG51bV9yZXF1ZXN0cyArPSBwcm9taXNlUmV0dXJuLm51bV9yZXF1ZXN0cztcbiAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvLyBsZXQgdGltZURlbHRhID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAvLyBsZXQgbXNfcGVyX3JlcXVlc3QgPSB0aW1lRGVsdGEvbnVtX3JlcXVlc3RzO1xuXG4gICAgLy8gdGhpcy5sb2dnZXIuaW5mbyhgU2NyYXBlciB0b29rICR7dGltZURlbHRhfW1zIHRvIHBlcmZvcm0gJHtudW1fcmVxdWVzdHN9IHJlcXVlc3RzLmApO1xuICAgIC8vIHRoaXMubG9nZ2VyLmluZm8oYE9uIGF2ZXJhZ2UgbXMvcmVxdWVzdDogJHttc19wZXJfcmVxdWVzdH1tcy9yZXF1ZXN0YCk7XG5cbiAgICAvLyBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX3Jlc3VsdHMpIHtcbiAgICAvLyAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX3Jlc3VsdHMocmVzdWx0cyk7XG4gICAgLy8gfVxuXG4gICAgLy8gbWV0YWRhdGEuZWxhcHNlZF90aW1lID0gdGltZURlbHRhLnRvU3RyaW5nKCk7XG4gICAgLy8gbWV0YWRhdGEubXNfcGVyX2tleXdvcmQgPSBtc19wZXJfcmVxdWVzdC50b1N0cmluZygpO1xuICAgIC8vIG1ldGFkYXRhLm51bV9yZXF1ZXN0cyA9IG51bV9yZXF1ZXN0cztcblxuICAgIC8vIGRlYnVnKCdtZXRhZGF0YT0lTycsIG1ldGFkYXRhKTtcblxuICAgIC8vIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfbWV0YWRhdGEpIHtcbiAgICAvLyAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX21ldGFkYXRhKG1ldGFkYXRhKTtcbiAgICAvLyB9XG5cbiAgICAvLyBpZiAodGhpcy5jb25maWcub3V0cHV0X2ZpbGUpIHtcbiAgICAvLyAgICAgdGhpcy5sb2dnZXIuaW5mbyhgV3JpdGluZyByZXN1bHRzIHRvICR7dGhpcy5jb25maWcub3V0cHV0X2ZpbGV9YCk7XG4gICAgLy8gICAgIHdyaXRlX3Jlc3VsdHModGhpcy5jb25maWcub3V0cHV0X2ZpbGUsIEpTT04uc3RyaW5naWZ5KHJlc3VsdHMsIG51bGwsIDQpKTtcbiAgICAvLyB9XG5cbiAgICAvLyByZXR1cm4ge1xuICAgIC8vICAgICByZXN1bHRzOiByZXN1bHRzLFxuICAgIC8vICAgICBtZXRhZGF0YTogbWV0YWRhdGEgfHwge30sXG4gICAgLy8gfTtcbiAgfVxuXG4gIC8qXG4gICAqIFF1aXQgdGhlIHB1cHBldGVlciBjbHVzdGVyL2Jyb3dzZXIuXG4gICAqL1xuICBhc3luYyBxdWl0KCkge1xuICAgIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5jbG9zZV9icm93c2VyKSB7XG4gICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5jbG9zZV9icm93c2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHRoaXMuY2x1c3Rlci5pZGxlKCk7XG4gICAgICBhd2FpdCB0aGlzLmNsdXN0ZXIuY2xvc2UoKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNjcmFwZU1hbmFnZXI6IFNjcmFwZU1hbmFnZXIsXG59O1xuIiwiZXhwb3J0IHt9O1xuY29uc3QgYXhpb3MgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ1JlbW90ZVNvdXJjZTpSZW1vdGVTb3VyY2UnKTtcbnR5cGUgc29zZXR0aW5nID0ge1xuICBzb3R5cGU6IHN0cmluZztcbiAgc29jaWFsdXNlcjogc3RyaW5nO1xuICBzb2NpYWxwYXNzOiBzdHJpbmc7XG4gICAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAgIHByb3h5OiBzdHJpbmc7XG4gICAgICAgICAgICB1c2VyOiBzdHJpbmc7XG4gICAgICAgICAgICBwYXNzOiBzdHJpbmc7XG4gICAgICAgICAgfSxcbn1cbmNsYXNzIFJlbW90ZVNvdXJjZSB7XG4gIFJFTU9URUFERDogc3RyaW5nO1xuICBSRU1PVEVVU0VSTkFNRTogc3RyaW5nO1xuICBSRU1PVEVQQVNTV09SRDogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLnJlYWRlbnYoKTtcbiAgICB0aGlzLlJFTU9URUFERCA9IGNvbmZpZy5SRU1PVEVBREQ7XG4gICAgdGhpcy5SRU1PVEVVU0VSTkFNRSA9IGNvbmZpZy5SRU1PVEVVU0VSTkFNRTtcbiAgICB0aGlzLlJFTU9URVBBU1NXT1JEID0gY29uZmlnLlJFTU9URVBBU1NXT1JEO1xuICB9XG4gXG5cbiAgcmVhZGVudigpIHtcbiAgICAvL3JlYWQgY29uZmlnIGZyb20gLmVudiBmaWxlXG4gICAgbGV0IGVudmNvZmlnID0gdGhpcy5yZWFkQ29uZmlnKCk7XG4gICAgZGVidWcoZW52Y29maWcpXG4gICAgLy9jaGVjayBrZXkgZXhpc3QgaW4gb2JqZWN0XG4gICAgaWYgKCFlbnZjb2ZpZy5oYXNPd25Qcm9wZXJ0eShcIlJFTU9URUFERFwiKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBSRU1PVEVBREQgbm90IGZvdW5kIGluIC5lbnYgZmlsZWApO1xuICAgIH1cbiAgICBpZiAoIWVudmNvZmlnLmhhc093blByb3BlcnR5KFwiUkVNT1RFVVNFUk5BTUVcIikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVVNFUk5BTUUgbm90IGZvdW5kIGluIC5lbnYgZmlsZWApO1xuICAgIH1cbiAgICBpZiAoIWVudmNvZmlnLmhhc093blByb3BlcnR5KFwiUkVNT1RFUEFTU1dPUkRcIikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUEFTU1dPUkQgbm90IGZvdW5kIGluIC5lbnYgZmlsZWApO1xuICAgIH1cbiAgICByZXR1cm4gZW52Y29maWc7XG4gIH1cblxuICAvKipcbiAgICogcmVhZCBjb25maWcgZnJvbSAuZW52IEZpbGVcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gY29uZmlnXG4gICAqICovXG4gIHJlYWRDb25maWcoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gcmVxdWlyZShcImRvdGVudlwiKS5jb25maWcoKTtcbiAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICB0aHJvdyByZXN1bHQuZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQucGFyc2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCByZXNwb25zZSBmcm9tIHJlbW90ZSBzZXJ2aXZlXG4gICAqIEByZXR1cm4gb2JqZWN0XG4gICAqL1xuICBhc3luYyBnZXRSZW1vdGVDb25maWcoY2FtcGFpZ25JZCk6IFByb21pc2U8c29zZXR0aW5nPiB7XG4gICAgLy8gbGV0IGVudmNvbmZpZyA9IGF3YWl0IHJlYWRlbnYoKTtcblxuICAgIGxldCBzb3NldHZhciA9IGF3YWl0IGF4aW9zXG4gICAgICAuZ2V0KHRoaXMuUkVNT1RFQUREICsgXCIvYXBpL2dldHNvYnlDYW0vP2NhbXBhaWduX2lkPVwiICsgY2FtcGFpZ25JZCwge1xuICAgICAgICBhdXRoOiB7XG4gICAgICAgICAgdXNlcm5hbWU6IHRoaXMuUkVNT1RFVVNFUk5BTUUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMuUkVNT1RFUEFTU1dPUkQsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocGFyc2VJbnQocmVzLnN0YXR1cykgIT0gMjAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29kZSBub3QgZXF1YWwgMjAwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzLmRhdGEuc3RhdHVzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29kZSBub3QgZXF1YWwgMjAwXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy5zdGF0dXMpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEudXNlcilcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmRhdGEuZGF0YS5wYXNzKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhLnByb3h5KVxuICAgICAgICBjb25zdCBzb3NldHRpbmcgPSB7XG4gICAgICAgICAgc290eXBlOiByZXMuZGF0YS5kYXRhLnNvdHlwZSxcbiAgICAgICAgICBzb2NpYWx1c2VyOiByZXMuZGF0YS5kYXRhLnVzZXIsXG4gICAgICAgICAgc29jaWFscGFzczogcmVzLmRhdGEuZGF0YS5wYXNzLFxuICAgICAgICAgIHByb3h5OiB7XG4gICAgICAgICAgICBwcm94eTogcmVzLmRhdGEuZGF0YS5wcm94eS51cmwsXG4gICAgICAgICAgICB1c2VyOiByZXMuZGF0YS5kYXRhLnByb3h5LnVzZXIsXG4gICAgICAgICAgICBwYXNzOiByZXMuZGF0YS5kYXRhLnByb3h5LnBhc3MsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHNvc2V0dGluZztcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gc29zZXR2YXI7XG4gIH1cbiAgLyoqXG4gICAqIGdldCBjYW1wYWlnbiBmcm9tIHJlbW90ZSBzZXJ2aXZlXG4gICAqL1xuICBhc3luYyBnZXRDYW1wYWlnbmxpc3QoKSB7XG4gICAgY29uc3QgY2FtcGlnbmxpc3QgPSBhd2FpdCBheGlvc1xuICAgICAgLmdldCh0aGlzLlJFTU9URUFERCArIFwiL2FwaS9saXN0c290YXNrXCIsIHtcbiAgICAgICAgYXV0aDoge1xuICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLlJFTU9URVVTRVJOQU1FLFxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLlJFTU9URVBBU1NXT1JELFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHBhcnNlSW50KHJlcy5zdGF0dXMpICE9IDIwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvZGUgbm90IGVxdWFsIDIwMFwiKTtcbiAgICAgICAgfSBcbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhLmRhdGE7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIH0pO1xuICAgIHJldHVybiBjYW1waWdubGlzdDtcbiAgfVxuICBhc3luYyBzYXZlTGlua3JlbW90ZSh7ZGF0YX0pIHtcbiAgICBheGlvcy5wb3N0KHRoaXMuUkVNT1RFQUREICsgXCIvYXBpL3NhdmVsaW5rXCIsZGF0YSlcbiAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBSZW1vdGVTb3VyY2U6IFJlbW90ZVNvdXJjZSxcbn07XG4iLCJjb25zdCB7IEJyb3dzZXIgfSA9IHJlcXVpcmUoJ3B1cHBldGVlci1jbHVzdGVyL2Rpc3QvY29uY3VycmVuY3kvYnVpbHRJbkNvbmN1cnJlbmN5Jyk7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NlLXNjcmFwZXI6Q3VzdG9tQ29uY3VycmVuY3knKTtcbmNvbnN0IHsgdGltZW91dEV4ZWN1dGUgfSA9IHJlcXVpcmUoJ3B1cHBldGVlci1jbHVzdGVyL2Rpc3QvdXRpbCcpO1xuXG5jb25zdCBCUk9XU0VSX1RJTUVPVVQgPSA1MDAwO1xuXG5jbGFzcyBDdXN0b21Db25jdXJyZW5jeSBleHRlbmRzIEJyb3dzZXIge1xuXG4gICAgYXN5bmMgaW5pdCgpIHt9XG4gICAgYXN5bmMgY2xvc2UoKSB7fVxuXG4gICAgYXN5bmMgd29ya2VySW5zdGFuY2UoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMucGVyQnJvd3Nlck9wdGlvbnMuc2hpZnQoKTtcbiAgICAgICAgZGVidWcoJ0xhdW5jaCBwdXBwZXRlZXIgaW5zdGFuY2Ugd2l0aCBvcHRpb25zPSVvJywgb3B0aW9ucyk7XG4gICAgICAgIGxldCBjaHJvbWUgPSBhd2FpdCB0aGlzLnB1cHBldGVlci5sYXVuY2gob3B0aW9ucyk7XG4gICAgICAgIGxldCBwYWdlO1xuICAgICAgICBsZXQgY29udGV4dDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgam9iSW5zdGFuY2U6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aW1lb3V0RXhlY3V0ZShCUk9XU0VSX1RJTUVPVVQsIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBhd2FpdCBjaHJvbWUuY3JlYXRlSW5jb2duaXRvQnJvd3NlckNvbnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgcGFnZSA9IGF3YWl0IGNvbnRleHQubmV3UGFnZSgpO1xuICAgICAgICAgICAgICAgIH0pKCkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aW1lb3V0RXhlY3V0ZShCUk9XU0VSX1RJTUVPVVQsIGNvbnRleHQuY2xvc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNsb3NlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgY2hyb21lLmNsb3NlKCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZXBhaXI6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBkZWJ1ZygnU3RhcnRpbmcgcmVwYWlyJyk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2lsbCBwcm9iYWJseSBmYWlsLCBidXQganVzdCBpbiBjYXNlIHRoZSByZXBhaXIgd2FzIG5vdCBuZWNlc3NhcnlcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY2hyb21lLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICAgICAgICAgIC8vIGp1c3QgcmVsYXVuY2ggYXMgdGhlcmUgaXMgb25seSBvbmUgcGFnZSBwZXIgYnJvd3NlclxuICAgICAgICAgICAgICAgIGNocm9tZSA9IGF3YWl0IHRoaXMucHVwcGV0ZWVyLmxhdW5jaChvcHRpb25zKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDdXN0b21Db25jdXJyZW5jeTsiLCJjb25zdCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcbmNvbnN0IGNyeXB0byA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5jb25zdCBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG5jb25zdCBodHRwcyA9IHJlcXVpcmUoXCJodHRwc1wiKTtcbmNvbnN0IHByb2dyZXNzID0gcmVxdWlyZShcInByb2dyZXNzLXN0cmVhbVwiKTtcblxuY2xhc3MgVGFzayB7XG5cdGNvbnN0cnVjdG9yKHVybCkge1xuXHRcdHRoaXMudXJsID0gdXJsO1xuXHRcdHRoaXMuZmluaXNoZWQgPSBmYWxzZTtcblx0fVxufVxuXG5jbGFzcyBEb3dubG9hZGVyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy50eXBlID0gXCJcIjtcblx0XHR0aGlzLmlkID0gXCJcIjtcblx0XHR0aGlzLnVybCA9IFwiXCI7XG5cdFx0dGhpcy5haWQgPSAtMTtcblx0XHR0aGlzLnBpZCA9IDE7XG5cdFx0dGhpcy5jaWQgPSAtMTtcblx0XHR0aGlzLm5hbWUgPSBcIlwiO1xuXHRcdHRoaXMubGlua3MgPSBbXTtcblx0XHR0aGlzLnRhc2tzID0gW107XG5cdH1cblxuXHRnZXRWaWRlb1VybCh2aWRlb1VybCkge1xuXHRcdHRoaXMudXJsID0gXCJcIjtcblx0XHRjb25zdCBtYXBwaW5nID0ge1xuXHRcdFx0XCJCVlwiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS92aWRlby9cIixcblx0XHRcdFwiYnZcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vdmlkZW8vXCIsXG5cdFx0XHRcImF2XCI6IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL3ZpZGVvL1wiLFxuXHRcdFx0XCJlcFwiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS9iYW5ndW1pL3BsYXkvXCIsXG5cdFx0XHRcInNzXCI6IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL2Jhbmd1bWkvcGxheS9cIlxuXHRcdH07XG5cdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMobWFwcGluZykpIHtcblx0XHRcdGlmICh2aWRlb1VybC5pbmNsdWRlcyhrZXkpKSB7XG5cdFx0XHRcdHRoaXMudHlwZSA9IGtleTtcblx0XHRcdFx0dGhpcy5pZCA9IGtleSArIHZpZGVvVXJsLnNwbGl0KGtleSlbMV07XG5cdFx0XHRcdHRoaXMudXJsID0gdmFsdWUgKyB0aGlzLmlkO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhc3luYyBnZXRBaWQoKSB7XG5cdFx0Y29uc3QgeyB0eXBlLCB1cmwgfSA9IHRoaXM7XG5cdFx0aWYgKCF1cmwpIHJldHVybjtcblx0XHRyZXR1cm4gZmV0Y2godXJsKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxuXHRcdFx0LnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdFx0bGV0IGRhdGEgPSByZXN1bHQubWF0Y2goL19fSU5JVElBTF9TVEFURV9fPSguKj8pO1xcKGZ1bmN0aW9uXFwoXFwpLylbMV07XG5cdFx0XHRcdGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIklOSVRJQUwgU1RBVEVcIiwgZGF0YSk7XG5cdFx0XHRcdGlmICh0eXBlID09PSBcIkJWXCIgfHwgdHlwZSA9PT0gXCJidlwiIHx8IHR5cGUgPT09IFwiYXZcIikge1xuXHRcdFx0XHRcdHRoaXMuYWlkID0gZGF0YS52aWRlb0RhdGEuYWlkO1xuXHRcdFx0XHRcdHRoaXMucGlkID0gcGFyc2VJbnQodXJsLnNwbGl0KFwicD1cIilbMV0sIDEwKSB8fCAxO1xuXHRcdFx0XHRcdHRoaXMuY2lkID0gZGF0YS52aWRlb0RhdGEucGFnZXNbdGhpcy5waWQgLSAxXS5jaWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAodHlwZSA9PT0gXCJlcFwiKSB7XG5cdFx0XHRcdFx0dGhpcy5haWQgPSBkYXRhLmVwSW5mby5haWQ7XG5cdFx0XHRcdFx0dGhpcy5jaWQgPSBkYXRhLmVwSW5mby5jaWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAodHlwZSA9PT0gXCJzc1wiKSB7XG5cdFx0XHRcdFx0dGhpcy5haWQgPSBkYXRhLmVwTGlzdFswXS5haWQ7XG5cdFx0XHRcdFx0dGhpcy5jaWQgPSBkYXRhLmVwTGlzdFswXS5jaWQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZXJyb3IgPT4gc2hvd0Vycm9yKFwi6I635Y+W6KeG6aKRIGFpZCDlh7rplJnvvIFcIikpO1xuXHR9XG5cblx0YXN5bmMgZ2V0SW5mbygpIHtcblx0XHRjb25zdCB7IGFpZCwgY2lkIH0gPSB0aGlzO1xuXHRcdGlmICghY2lkKSB7XG5cdFx0XHRzaG93RXJyb3IoXCLojrflj5bop4bpopEgY2lkIOWHuumUme+8gVwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Ly8gZ2V0RGFubWFrdSgpOyAvL+iOt+WPlmNpZOWQju+8jOiOt+WPluS4i+i9vemTvuaOpeWSjOW8ueW5leS/oeaBr1xuXHRcdHJldHVybiBmZXRjaChcImh0dHBzOi8vYXBpLmJpbGliaWxpLmNvbS94L3dlYi1pbnRlcmZhY2Uvdmlldz9haWQ9XCIgKyBhaWQpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG5cdFx0XHQuY2F0Y2goZXJyb3IgPT4gc2hvd0Vycm9yKFwi6I635Y+W6KeG6aKR5L+h5oGv5Ye66ZSZ77yBXCIpKTtcblx0fVxuXG5cdGFzeW5jIGdldERhdGEoZmFsbGJhY2spIHtcblx0XHRjb25zdCB7IGNpZCwgdHlwZSB9ID0gdGhpcztcblx0XHRsZXQgcGxheVVybDtcblx0XHRpZiAoZmFsbGJhY2spIHtcblx0XHRcdGNvbnN0IHBhcmFtcyA9IGBjaWQ9JHtjaWR9Jm1vZHVsZT1tb3ZpZSZwbGF5ZXI9MSZxdWFsaXR5PTExMiZ0cz0xYDtcblx0XHRcdGNvbnN0IHNpZ24gPSBjcnlwdG8uY3JlYXRlSGFzaChcIm1kNVwiKS51cGRhdGUocGFyYW1zICsgXCI5YjI4ODE0N2U1NDc0ZGQyYWE2NzA4NWY3MTZjNTYwZFwiKS5kaWdlc3QoXCJoZXhcIik7XG5cdFx0XHRwbGF5VXJsID0gYGh0dHBzOi8vYmFuZ3VtaS5iaWxpYmlsaS5jb20vcGxheWVyL3dlYl9hcGkvcGxheXVybD8ke3BhcmFtc30mc2lnbj0ke3NpZ259YDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHR5cGUgPT09IFwiQlZcIiB8fCB0eXBlID09PSBcImJ2XCIgfHwgdHlwZSA9PT0gXCJhdlwiKSB7XG5cdFx0XHRcdGNvbnN0IHBhcmFtcyA9IGBhcHBrZXk9aVZHVVRqc3h2cExldURDZiZjaWQ9JHtjaWR9Jm90eXBlPWpzb24mcW49MTEyJnF1YWxpdHk9MTEyJnR5cGU9YDtcblx0XHRcdFx0Y29uc3Qgc2lnbiA9IGNyeXB0by5jcmVhdGVIYXNoKFwibWQ1XCIpLnVwZGF0ZShwYXJhbXMgKyBcImFIUm1oV01Ma2RlTXVJTHFPUm5ZWm9jd01CcE1FT2R0XCIpLmRpZ2VzdChcImhleFwiKTtcblx0XHRcdFx0cGxheVVybCA9IGBodHRwczovL2ludGVyZmFjZS5iaWxpYmlsaS5jb20vdjIvcGxheXVybD8ke3BhcmFtc30mc2lnbj0ke3NpZ259YDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHBsYXlVcmwgPSBgaHR0cHM6Ly9hcGkuYmlsaWJpbGkuY29tL3BnYy9wbGF5ZXIvd2ViL3BsYXl1cmw/cW49ODAmY2lkPSR7Y2lkfWA7XG5cdFx0XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmV0Y2gocGxheVVybClcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcblx0XHRcdC50aGVuKHJlc3VsdCA9PiB7XG5cdFx0XHRcdGNvbnN0IGRhdGEgPSBmYWxsYmFjayA/IHRoaXMucGFyc2VEYXRhKHJlc3VsdCkgOiBKU09OLnBhcnNlKHJlc3VsdCk7XG5cdFx0XHRcdGNvbnN0IHRhcmdldCA9IGRhdGEuZHVybCB8fCBkYXRhLnJlc3VsdC5kdXJsO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlBMQVkgVVJMXCIsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rcyA9IHRhcmdldC5tYXAocGFydCA9PiBwYXJ0LnVybCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjaywgZGF0YVxuICAgICAgICAgICAgICAgICAgICB9O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmIChmYWxsYmFjaykgdGhyb3cgRXJyb3IoKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0c2hvd0Vycm9yKFwi6I635Y+WIFBsYXlVcmwg5oiW5LiL6L296ZO+5o6l5Ye66ZSZ77yB55Sx5LqOQuermemZkOWItu+8jOWPquiDveS4i+i9veS9jua4heaZsOW6puinhumikeOAglwiKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0cGFyc2VEYXRhKHRhcmdldCkge1xuXHRcdGNvbnN0IGRhdGEgPSAkKHRhcmdldCk7XG5cdFx0Y29uc3QgcmVzdWx0ID0ge307XG5cdFx0cmVzdWx0LmR1cmwgPSBbXTtcblx0XHRyZXN1bHQucXVhbGl0eSA9IGRhdGEuZmluZChcInF1YWxpdHlcIikudGV4dCgpO1xuXHRcdGRhdGEuZmluZChcImR1cmxcIikuZWFjaCgoaSwgbykgPT4ge1xuXHRcdFx0Y29uc3QgcGFydCA9ICQobyk7XG5cdFx0XHRyZXN1bHQuZHVybC5wdXNoKHtcblx0XHRcdFx0dXJsOiBwYXJ0LmZpbmQoXCJ1cmxcIikudGV4dCgpLFxuXHRcdFx0XHRvcmRlcjogcGFydC5maW5kKFwib3JkZXJcIikudGV4dCgpLFxuXHRcdFx0XHRsZW5ndGg6IHBhcnQuZmluZChcImxlbmd0aFwiKS50ZXh0KCksXG5cdFx0XHRcdHNpemU6IHBhcnQuZmluZChcInNpemVcIikudGV4dCgpXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZG93bmxvYWRCeUluZGV4KHBhcnQsIGZpbGUsIGNhbGxiYWNrID0gKCkgPT4ge30pIHtcblx0XHRjb25zdCB7IHVybCB9ID0gdGhpcztcblxuXHRcdGlmICh0aGlzLnRhc2tzLnNvbWUoaXRlbSA9PiBpdGVtLnVybCA9PT0gdGhpcy5saW5rc1twYXJ0XSkpIHJldHVybiBcIkRVUExJQ0FURVwiO1xuXHRcdHRoaXMudGFza3MucHVzaChuZXcgVGFzayh0aGlzLmxpbmtzW3BhcnRdKSk7XG5cdFx0bGV0IHN0YXRlO1xuXHRcdHRyeSB7XG5cdFx0XHRzdGF0ZSA9IGZzLnN0YXRTeW5jKGZpbGUpO1xuXHRcdH1cblx0XHRjYXRjaCAoZXJyb3IpIHtcblx0XHR9XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdHVybDogdGhpcy5saW5rc1twYXJ0XSxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XCJSYW5nZVwiOiBgYnl0ZXM9JHtzdGF0ZSA/IHN0YXRlLnNpemUgOiAwfS1gLCAvL+aWreeCuee7reS8oFxuXHRcdFx0XHRcIlVzZXItQWdlbnRcIjogXCJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xNV83KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTAuMC40NDMwLjIxMiBTYWZhcmkvNTM3LjM2XCIsXG5cdFx0XHRcdFwiUmVmZXJlclwiOiB1cmxcblx0XHRcdH1cblx0XHR9O1xuXHRcdGNvbnN0IHN0cmVhbSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGZpbGUsIHN0YXRlID8geyBmbGFnczogXCJhXCIgfSA6IHt9KTtcblx0XHR0aGlzLmRvd25sb2FkKG9wdGlvbnMsIHN0cmVhbSwgY2FsbGJhY2spO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0ZG93bmxvYWQob3B0aW9ucywgc3RyZWFtLCBjYWxsYmFjaykge1xuXHRcdC8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3Byb2dyZXNzLXN0cmVhbVxuXHRcdGNvbnN0IGluZGV4ID0gdGhpcy50YXNrcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLnVybCA9PT0gb3B0aW9ucy51cmwpO1xuXHRcdGNvbnN0IHByb1N0cmVhbSA9IHByb2dyZXNzKHtcblx0XHRcdHRpbWU6IDI1MCAvL+WNleS9jW1zXG5cdFx0fSkub24oXCJwcm9ncmVzc1wiLCBwcm9ncmVzcyA9PiB7XG5cdFx0XHRjb25zdCB7IHBlcmNlbnRhZ2UgfSA9IHByb2dyZXNzOyAvL+aYvuekuui/m+W6puadoVxuXHRcdFx0aWYgKHBlcmNlbnRhZ2UgPT09IDEwMCkge1xuXHRcdFx0XHR0aGlzLnRhc2tzW2luZGV4XS5maW5pc2hlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRjYWxsYmFjayhwcm9ncmVzcywgaW5kZXgpO1xuXHRcdH0pO1xuXG5cdFx0bGV0IHsgdXJsIH0gPSBvcHRpb25zO1xuXHRcdGZ1bmN0aW9uIGRvd25sb2FkTGluayh1cmwpIHtcblx0XHRcdCh1cmwuc3RhcnRzV2l0aChcImh0dHBzXCIpID8gaHR0cHMgOiBodHRwKS5nZXQodXJsLCBvcHRpb25zLCByZXMgPT4ge1xuXHRcdFx0XHRpZiAocmVzLnN0YXR1c0NvZGUgPT09IDMwMikge1xuXHRcdFx0XHRcdHVybCA9IHJlcy5oZWFkZXJzLmxvY2F0aW9uO1xuXHRcdFx0XHRcdHJldHVybiBkb3dubG9hZExpbmsodXJsKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRwcm9TdHJlYW0uc2V0TGVuZ3RoKHJlcy5oZWFkZXJzW1wiY29udGVudC1sZW5ndGhcIl0pO1xuXHRcdFx0XHQvL+WFiHBpcGXliLBwcm9TdHJlYW3lho1waXBl5Yiw5paH5Lu255qE5YaZ5YWl5rWB5LitXG5cdFx0XHRcdHJlcy5waXBlKHByb1N0cmVhbSkucGlwZShzdHJlYW0pLm9uKFwiZXJyb3JcIiwgZXJyb3IgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRkb3dubG9hZExpbmsodXJsKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgVGFzaywgRG93bmxvYWRlciB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGNoZWVyaW8gPSByZXF1aXJlKFwiY2hlZXJpb1wiKTtcbmNvbnN0IFNjcmFwZXIgPSByZXF1aXJlKFwiLi9zb2NpYWxfc2NyYXBlclwiKTtcbmNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3QgeyBEb3dubG9hZGVyIH0gPSByZXF1aXJlKFwiLi9iaWxpYmlsaS9kb3dubG9hZGVyLmpzXCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3Qgc2FuaXRpemUgPSByZXF1aXJlKFwiZmlsZW5hbWlmeVwiKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZShcImRlYnVnXCIpKFwiYmlsaWJpbGktc2NyYXBlcjpTY3JhcGVyXCIpO1xuY29uc3QgeyBhdXRvU2Nyb2xsLCBkZWxheSB9ID0gcmVxdWlyZShcIi4vbGliL2Z1bmN0aW9uLmpzXCIpO1xuLy8gaW1wb3J0IGZpbGVuYW1pZnkgZnJvbSAnZmlsZW5hbWlmeSc7XG4vLyBjb25zdCB7IGxhdW5jaCwgZ2V0U3RyZWFtIH0gPSByZXF1aXJlKFwicHVwcGV0ZWVyLXN0cmVhbVwiKTtcbi8vIGNvbnN0IFB1cHBldGVlclZpZGVvUmVjb3JkZXIgPSByZXF1aXJlKCdwdXBwZXRlZXItdmlkZW8tcmVjb3JkZXInKTtcbmNsYXNzIEJpbGliaWxpU2NyYXBlciBleHRlbmRzIFNjcmFwZXIge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gICAgdGhpcy5zdGFydFVybCA9IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tXCI7XG4gIH1cbiAgYXN5bmMgbG9hZF9zdGFydF9wYWdlKCkge1xuICAgIGRlYnVnKFwibG9hZCBzdGFydCBwYWdlXCIpXG4gICAgaWYgKHRoaXMuY29uZmlnLmJpbGliaWxpX3NldHRpbmdzKSB7XG4gICAgICB0aGlzLnN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LiR7dGhpcy5jb25maWcuYmlsaWJpbGlfc2V0dGluZ3MuYmlsaWJpbGlfZG9tYWlufWA7XG4gICAgICBpZiAodGhpcy5jb25maWcuYmlsaWJpbGlfc2V0dGluZ3MuYmlsaWJpbGlfZG9tYWluKSB7XG4gICAgICAgIHRoaXMuc3RhcnRVcmwgPSBgaHR0cHM6Ly93d3cuJHt0aGlzLmNvbmZpZy5iaWxpYmlsaV9zZXR0aW5ncy5iaWxpYmlsaV9kb21haW59YDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuY29uZmlnLmJpbGliaWxpX3NldHRpbmdzKSB7XG4gICAgICAgIGlmIChrZXkgIT09IFwiYmlsaWJpbGlfZG9tYWluXCIpIHtcbiAgICAgICAgICB0aGlzLnN0YXJ0VXJsICs9IGAke2tleX09JHt0aGlzLmNvbmZpZy5iaWxpYmlsaV9zZXR0aW5nc1trZXldfSZgO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vbG9naW4gaW50byBiaWxpYmlsaVxuICBhc3luYyBtYWtlbG9naW5hY3Rpb24oKSB7XG4gICAgLy8gbGV0IHN0YXJ0VXJsID0gXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb21cIjtcblxuICAgIHRoaXMubG9nZ2VyLmluZm8oXCJVc2luZyBsb2dpblVybDogXCIgKyB0aGlzLnN0YXJ0VXJsKTtcbiAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0QnlwYXNzQ1NQKHRydWUpO1xuICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IGF3YWl0IHRoaXMucGFnZS5nb3RvKHRoaXMuc3RhcnRVcmwpO1xuXG4gICAgY29uc29sZS5sb2coXG4gICAgICBcImxvZ2luIHN1Y2Nlc3MsIGNvb2tpZXMgaGFzIGJlZW4gc2F2ZSBhdCBcIiArIHRoaXMuY29uZmlnLnRtcHBhdGhcbiAgICApO1xuICAgIC8vY2xpY2sgbG9naW4gYnRuXG4gICAgYXdhaXQgdGhpcy5wYWdlLmNsaWNrKFwiLmhlYWRlci1sb2dpbi1lbnRyeVwiKTtcbiAgICAvLyBhd2FpdCB0aGlzLnBhZ2UuZXZhbHVhdGUoXyA9PiB7XG4gICAgLy8gdmFyIGljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ29cIik7XG4gICAgLy8gaWNvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgLy8gfSk7XG4gICAgLy93YWl0IGxvZ2luIGJveCBzaG93XG4gICAgYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcihcIi5iaWxpLW1pbmktY29udGVudC13cFwiLCB7XG4gICAgICB0aW1lb3V0OiB0aGlzLlNUQU5EQVJEX1RJTUVPVVQsXG4gICAgfSk7XG4gICAgLy9jbGljayBsb2dpbiBieSBzbXNcbiAgICBjb25zdCBbYnV0dG9uXSA9IGF3YWl0IHRoaXMucGFnZS4keChcIi8vZGl2W2NvbnRhaW5zKC4sICcg55+t5L+h55m75b2VICcpXVwiKTtcbiAgICBpZiAoYnV0dG9uKSB7XG4gICAgICBhd2FpdCBidXR0b24uY2xpY2soKTtcbiAgICB9XG4gICAgLy9hd2FpdCBmb3IgdXNlciB0byB0YWtlIGFjdGlvblxuICAgIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoXCIuaGVhZGVyLWVudHJ5LW1pbmlcIiwgeyB0aW1lb3V0OiAwIH0pO1xuICAgIC8vdXNlciBoYXMgc3VjY2VzcyBsb2dpblxuICAgIC8vc2F2ZSBjb29raWVzXG4gICAgY29uc3QgY29va2llcyA9IGF3YWl0IHRoaXMucGFnZS5jb29raWVzKCk7XG5cbiAgICBhd2FpdCBmcy53cml0ZUZpbGUoXG4gICAgICB0aGlzLmNvbmZpZy50bXBwYXRoICsgXCIvY29va2llcy5qc29uXCIsXG4gICAgICBKU09OLnN0cmluZ2lmeShjb29raWVzLCBudWxsLCAyKSxcbiAgICAgIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5wYWdlLmNsb3NlKCk7XG4gICAgLy8gYXdhaXQgdGhpcy5icm93c2Vycy5jbG9zZSgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB2aWRlbyBsaXN0IHBhZ2VcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleXdvcmRcbiAgICogQHJldHVybnMgZWxlbWVudFxuICAgKi9cbiAgYXN5bmMgY2xpY2tTZWFyY2hidG4oeyBwYWdlLCBrZXl3b3JkIH0pIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG5cbiAgICB0aGlzLmxvZ2dlci5pbmZvKFwiVXNpbmcgbG9naW5Vcmw6IFwiICsgdGhpcy5zdGFydFVybCk7XG4gICAgYXdhaXQgdGhpcy5wYWdlLnNldEJ5cGFzc0NTUCh0cnVlKTtcbiAgICB0aGlzLmxhc3RfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnBhZ2UuZ290byh0aGlzLnN0YXJ0VXJsKTtcbiAgICBhd2FpdCBwYWdlLnR5cGUoXCIubmF2LXNlYXJjaC1pbnB1dFwiLCBrZXl3b3JkKTtcbiAgICAvLyBhd2FpdCB0aGlzLnBhZ2UuJGV2YWwoXCIubmF2LXNlYXJjaC1pbnB1dFwiLCBmdW5jdGlvbiAoa2V5d29yZCkge1xuICAgIC8vICAgdGhpcy52YWx1ZSA9IGtleXdvcmQ7XG4gICAgLy8gfSk7XG4gICAgLy8gYXdhaXQgcGFnZS4kZXZhbCgnLm5hdi1zZWFyY2gtaW5wdXQnLCBlbCA9PiBlbC52YWx1ZSA9IFwiXCIpO1xuICAgIGNvbnN0IHNlYXJjaGJ0biA9IGF3YWl0IHRoaXMucGFnZS4kKFwiLm5hdi1zZWFyY2gtYnRuXCIpO1xuICAgIHNlYXJjaGJ0bi5jbGljaygpO1xuICAgIHJldHVybiBzZWFyY2hidG47XG4gIH1cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYWdlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXl3b3JkXG4gICAqIEByZXR1cm5zIGFycmF5XG4gICAqL1xuICBhc3luYyBzZWFyY2hkYXRhKHsgcGFnZSwga2V5d29yZCB9KSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgfVxuICAgIGxldCByZXN1bHQ9W11cbiAgICBpZihBcnJheS5pc0FycmF5KGtleXdvcmQpKXtcbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBrZXl3b3JkKSB7XG4gICAgICAgIGxldCBsaW5rcmVzPWF3YWl0IHRoaXMuZ2V0VmlkZW91cmxzKHsgcGFnZTogdGhpcy5wYWdlLCBrZXl3b3JkOiBlbGVtZW50IH0pO1xuICAgICAgICBkZWJ1ZyhsaW5rcmVzKVxuICAgICAgICBmb3IoY29uc3QgbGluayBvZiBsaW5rcmVzKXsgXG4gICAgICAgICAgcmVzdWx0LnB1c2gobGluaylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgfWVsc2UgaWYodHlwZW9mIGtleXdvcmQgPT09ICdzdHJpbmcnKXtcbiAgICAgIGxldCBsaW5rcmVzPWF3YWl0IHRoaXMuZ2V0VmlkZW91cmxzKHsgcGFnZTogdGhpcy5wYWdlLCBrZXl3b3JkOiBrZXl3b3JkIH0pO1xuICAgICAgZm9yKGNvbnN0IGxpbmsgb2YgbGlua3Jlcyl7XG4gICAgICAgIFxuICAgICAgICByZXN1bHQucHVzaChsaW5rcmVzKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gICAgLy8gcmV0dXJuIGF3YWl0IHRoaXMuZ2V0VmlkZW91cmxzKHsgcGFnZTogdGhpcy5wYWdlLCBrZXl3b3JkOiBrZXl3b3JkIH0pO1xuICB9XG4gIC8vZ2V0IHZpZGVvIHVybCByZXR1cm4gaW4gYXJyYXlcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0LHN0cmluZyxzdHJpbmd9XG4gICAqIEByZXR1cm5zIGFycmF5XG4gICAqL1xuICBhc3luYyBnZXRWaWRlb3VybHMoeyBwYWdlLCBrZXl3b3JkLCBjb29raWVzUGF0aCB9KSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgfVxuICAgIGlmIChjb29raWVzUGF0aCkge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGNvb2tpZXNQYXRoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIGNvb2tpZXMgZmlsZSBhdCAke2Nvb2tpZXNQYXRofWApO1xuICAgICAgfVxuXG4gICAgICBsZXQgY29va2llcyA9IEpTT04ucGFyc2UoYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoY29va2llc1BhdGgpKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGNvb2tpZXMpO1xuICAgICAgYXdhaXQgdGhpcy5wYWdlLnNldENvb2tpZSguLi5jb29raWVzKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWFyY2hidG4gPSBhd2FpdCB0aGlzLmNsaWNrU2VhcmNoYnRuKHtcbiAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgIGtleXdvcmQ6IGtleXdvcmQsXG4gICAgfSk7XG4gICAgbGV0IGJyb3dzZXIgPSB0aGlzLnBhZ2UuYnJvd3NlcigpO1xuICAgIGNvbnN0IG5ld1BhZ2UgPSBhd2FpdCBicm93c2VyLndhaXRGb3JUYXJnZXQoKHRhcmdldCkgPT5cbiAgICAgIHRhcmdldC51cmwoKS5pbmNsdWRlcyhcInNlYXJjaC5iaWxpYmlsaS5jb21cIilcbiAgICApO1xuICAgIGNvbnN0IHBhZ2VzID0gYXdhaXQgYnJvd3Nlci5wYWdlcygpO1xuICAgIGxldCBzZWFyY2hQYWdlO1xuICAgIGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuICAgICAgY29uc3QgcGFnZXVybCA9IGF3YWl0IHBhZ2UudXJsKCk7IC8vIG5ldyBwYWdlIG5vdyBhcHBlYXIhXG4gICAgICAvLyBkZWJ1Zyhhd2FpdCBwYWdlLnRpdGxlKCkpXG4gICAgICBpZiAocGFnZXVybC5pbmNsdWRlcyhcInNlYXJjaC5iaWxpYmlsaS5jb21cIikpIHtcbiAgICAgICAgc2VhcmNoUGFnZSA9IHBhZ2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXNlYXJjaFBhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInNlYXJjaCBwYWdlIG5vdCBmb3VuZFwiKTtcbiAgICB9XG4gICAgLy8gdGhpcy5wYWdlLndhaXRGb3IoMjAwMCk7XG4gICAgLy8gdGhpcy5icm93c2VyLm9uKCd0YXJnZXRjcmVhdGVkJywgZnVuY3Rpb24oKXtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdOZXcgVGFiIENyZWF0ZWQnKTtcbiAgICAvLyB9KTtcbiAgICAvLyBsZXQgYnJvd3Nlcj10aGlzLnBhZ2UuYnJvd3NlcigpXG4gICAgLy8gY29uc29sZS5sb2coXCJjdXJyZW50IHBhZ2UgY291bnQgXCIsIChhd2FpdCBicm93c2VyLnBhZ2VzKCkpLmxlbmd0aCk7XG4gICAgLy8gY29uc3QgdGFibGVzID0gYXdhaXQgYnJvd3Nlci5wYWdlcygpXG4gICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgIGRlYnVnKGF3YWl0IHRhYmxlc1tpXS50aXRsZSgpKVxuICAgIC8vIH1cblxuICAgIC8vIGNvbnN0IFt0YWJPbmUsIHRhYlR3b10gPSAoYXdhaXQgYnJvd3Nlci5wYWdlcygpKTtcbiAgICAvLyBkZWJ1Zyhhd2FpdCB0YWJPbmUudGl0bGUoKSlcbiAgICAvLyBkZWJ1Zyhhd2FpdCB0YWJUd28udGl0bGUoKSlcbiAgICAvLyBhd2FpdCB0aGlzLnBhZ2Uud2FpdEZvck5hdmlnYXRpb24oKVxuICAgIC8vIGF3YWl0IGRlbGF5KDUwMDApO1xuICAgIGF3YWl0IGF1dG9TY3JvbGwoc2VhcmNoUGFnZSk7XG4gICAgLy8gYXdhaXQgcGFnZS5zY3JlZW5zaG90KHtcbiAgICAvLyAgIHBhdGg6ICcvaG9tZS9yb2JlcnR6ZW5nL3NjcmVlbnNob3QuanBnJ1xuICAgIC8vIH0pO1xuXG4gICAgYXdhaXQgc2VhcmNoUGFnZS53YWl0Rm9yU2VsZWN0b3IoXCIudnVpX3BhZ2VuYXRpb25cIiwgeyB0aW1lb3V0OiA1MDAwIH0pO1xuXG4gICAgbGV0IGxpbmtyZXMgPSBbXTtcbiAgICAvLyBhd2FpdCB0aGlzLnBhZ2UuJCQoXCJidXR0b24udnVpX2J1dHRvblwiLCBlbGVtZW50cz0+e1xuICAgIC8vICAgY29uc29sZS5sb2coZWxlbWVudHMpXG4gICAgLy8gfSlcbiAgICBjb25zdCBsaW5rUGFnZSA9IGF3YWl0IHNlYXJjaFBhZ2UuJCQoXCJidXR0b24udnVpX2J1dHRvblwiKTtcbiAgICBkZWJ1ZyhsaW5rUGFnZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5rUGFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gYXdhaXQgYXV0b1Njcm9sbCh0YWJUd28gKVxuICAgICAgLy8gYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JOYXZpZ2F0aW9uKHtcbiAgICAgIC8vICAgd2FpdFVudGlsOiAnbmV0d29ya2lkbGUwJyxcbiAgICAgIC8vIH0pO1xuICAgICAgLy8gYXdhaXQgbGlua1BhZ2VbaV0uY2xpY2soKVxuICAgICAgYXdhaXQgc2VhcmNoUGFnZS5ldmFsdWF0ZSgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgICB9LCBsaW5rUGFnZVtpXSk7XG4gICAgICBjb25zdCBsaW5rcyA9IGF3YWl0IHRoaXMuZ2V0VmlkZW9saXN0bGluayh7IHBhZ2U6IHNlYXJjaFBhZ2UgfSk7XG4gICAgICBkZWJ1ZyhsaW5rcyk7XG4gICAgICBsaW5rcy5tYXAoKGxpbmspID0+IHtcbiAgICAgICAgbGlua3Jlcy5wdXNoKGxpbmspO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLiQkZXZhbChcImJ1dHRvbi52dWlfYnV0dG9uXCIsIGFzeW5jIGVsZW1lbnRzPT57XG4gICAgLy8gICAvLyBhd2FpdCBhdXRvU2Nyb2xsKHRoaXMucGFnZSApXG4gICAgLy8gICBlbGVtZW50cy5tYXAoYXN5bmMgZWxlbWVudD0+e1xuICAgIC8vICAgICBhd2FpdCBhdXRvU2Nyb2xsKHRoaXMucGFnZSApXG4gICAgLy8gICBhd2FpdCBlbGVtZW50LmNsaWNrKClcbiAgICAvLyAgIGNvbnN0IGxpbmtzPWF3YWl0IHRoaXMuZ2V0VmlkZW9saXN0bGluayh7IHBhZ2U6dGhpcy5wYWdlIH0pO1xuICAgIC8vICAgZGVidWcobGlua3MpXG4gICAgLy8gICBsaW5rcy5tYXAoKGxpbmspPT57XG4gICAgLy8gICAgIGxpbmtyZXMucHVzaChsaW5rKVxuICAgIC8vICAgfSlcbiAgICAvLyB9KVxuICAgIC8vIH0pXG4gICAgZGVidWcobGlua3Jlcyk7XG4gICAgcmV0dXJuIGxpbmtyZXM7XG4gIH1cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7cGFnZX0gcGFnZVxuICAgKiBAcmV0dXJucyBhcnJheVxuICAgKi9cbiAgYXN5bmMgZ2V0VmlkZW9saXN0bGluayh7IHBhZ2UgfSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgICAvLyBjb25zdCBlbEhhbmRsZUFycmF5ID0gYXdhaXQgcGFnZS4kJChcbiAgICAvLyAgIFwiLmJpbGktdmlkZW8tY2FyZF9faW5mby0tcmlnaHQgYTpudGgtY2hpbGQoMSlcIlxuICAgIC8vICk7XG5cbiAgICAvLyBsZXQgbGlua21hcCA9IFtdO1xuICAgIGxldCBsaW5rbWFwID0gYXdhaXQgcGFnZS4kJGV2YWwoXG4gICAgICBcIi5iaWxpLXZpZGVvLWNhcmRfX2luZm8tLXJpZ2h0ID5hOmZpcnN0LWNoaWxkXCIsXG4gICAgICAoYWxpbmtzKSA9PiB7XG4gICAgICAgIHJldHVybiBhbGlua3MubWFwKChhbGluaykgPT4ge1xuICAgICAgICAgIHZhciBsaW5rYXJyID0ge307XG4gICAgICAgICAgbGlua2Fyci5saW5rID0gYWxpbmsuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhhbGluayk7XG4gICAgICAgICAgaHRpdGxlID0gYWxpbmsucXVlcnlTZWxlY3RvcihcImgzXCIpO1xuICAgICAgICAgIGxpbmthcnIudGl0bGUgPSBodGl0bGUuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgcmV0dXJuIGxpbmthcnI7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG4gICAgLy8gZGVidWcoXCJxdWVyeSBsaW5rIGZpbmlzaFwiKTtcbiAgICAvLyBkZWJ1ZyhsaW5rbWFwKTtcbiAgICAvLyBkZWJ1ZyhcInNob3cgbGluayBmaW5pc2hcIik7XG4gICAgLy8gY29uc29sZS5sb2cobGlua21hcClcblxuICAgIGF3YWl0IGxpbmttYXAuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGlmICghZWxlbWVudC5saW5rLmluY2x1ZGVzKFwiL3ZpZGVvL1wiKSkge1xuICAgICAgICAvLyBkZWJ1ZyhcImVsZW1lbnQgaGFzIHZpZGVvIFwiK2VsZW1lbnQpXG4gICAgICAgIGxpbmttYXAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBhd2FpdCBsaW5rbWFwLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoZWxlbWVudC5saW5rLmluY2x1ZGVzKFwiL2FwaS9cIikpIHtcbiAgICAgICAgZGVidWcoXCJlbGVtZW50IGhhcyBhcGkgXCIgKyBlbGVtZW50KTtcbiAgICAgICAgbGlua21hcC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vZGVidWcoXCJmaWx0ZXIgbGluayBmaW5pc2hcIik7XG4gICAgZGVidWcobGlua21hcCk7XG5cbiAgICByZXR1cm4gbGlua21hcDtcbiAgfVxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxpbmtcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZpZGVvcGF0aFxuICAgKi9cbiAgYXN5bmMgZG93bmxvYWRTaWdsZVZpZGVvKHsgbGluaywgdmlkZW9wYXRoIH0pIHtcbiAgICAvLyBpZiAocGFnZSkge1xuICAgIC8vICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICAvLyB9XG5cbiAgICAvLyBjb25zb2xlLmxvZyhsaW5rKVxuICAgIC8vIGF3YWl0IHRoaXMucGFnZS5nb3RvKGxpbmsse1xuICAgIC8vICAgd2FpdFVudGlsOiAnZG9tY29udGVudGxvYWRlZCcsXG4gICAgLy8gfSk7XG4gICAgLy8gY29uc29sZS5sb2codmlkZW9wYXRoKVxuICAgIC8vIGNvbnN0IGZpbGUgPSBmcy5jcmVhdGVXcml0ZVN0cmVhbSh2aWRlb3BhdGggKyBcIi90ZXN0LndlYm1cIik7XG4gICAgLy8gYXdhaXQgcGFnZS5ldmFsdWF0ZShhc3luYyAoKSA9PiB7XG4gICAgLy8gY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnB4LXBsYXllci12aWRlby13cmFwID4gdmlkZW86bnRoLWNoaWxkKDEpJyk7XG4gICAgLy8gY29uc29sZS5sb2coZWwpO1xuICAgIC8vIGNvbnN0IHtzcmN9ID0gZWwucXVlcnlTZWxlY3Rvcignc291cmNlJyk7XG4gICAgLy8gY29uc29sZS5sb2coc3JjKTtcbiAgICAvLyB9KTtcbiAgICAvLyBjb25zdCBodG1sID0gYXdhaXQgcGFnZS4kZXZhbCgnI2JpbGliaWxpLXBsYXllcicsIGVsID0+IGVsLm91dGVySFRNTCk7XG4gICAgLy8gY29uc29sZS5sb2coaHRtbClcbiAgICAvLyBjb25zdCBzcmMgPSBhd2FpdCBwYWdlLiRldmFsKFwiI2JpbGliaWxpLXBsYXllciB2aWRlb1wiLGVsID0+IGVsLmdldEF0dHJpYnV0ZShcInNyY1wiKSlcblxuICAgIGNvbnN0IGRvd25sb2FkZXIgPSBuZXcgRG93bmxvYWRlcigpO1xuICAgIGRvd25sb2FkZXIuZ2V0VmlkZW9VcmwobGluayk7XG4gICAgaWYgKCFkb3dubG9hZGVyLnVybCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidmlkZW8gdXJsIGludmFsaWRcIik7XG4gICAgfVxuICAgIGF3YWl0IGRvd25sb2FkZXIuZ2V0QWlkKCk7XG5cbiAgICBsZXQgdmlkZW9yZXMgPSBhd2FpdCBkb3dubG9hZGVyLmdldEluZm8oKTtcbiAgICBkZWJ1ZyhcIlZJREVPIElORk9cIiwgdmlkZW9yZXMpO1xuICAgIC8vIGNvbnN0IGRvd25sb2FkUGF0aCA9Jy9ob21lL3JvYmVydHplbmcvZG93bmxvYWR0ZXN0JztcbiAgICBjb25zdCBmaWxlbmFtZSA9IHZpZGVvcmVzLmRhdGEudGl0bGU7XG4gICAgY29uc3QgeyBkYXRhLCBmYWxsYmFjayB9ID0gYXdhaXQgZG93bmxvYWRlci5nZXREYXRhKCk7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkYXRhLmR1cmwgfHwgZGF0YS5yZXN1bHQuZHVybDtcbiAgICBjb25zdCBxdWFsaXR5ID0gZGF0YS5xdWFsaXR5IHx8IGRhdGEucmVzdWx0LnF1YWxpdHksXG4gICAgICBxdWFsaXR5QXJyYXkgPSB7XG4gICAgICAgIDExMjogXCIxMDgwUCtcIixcbiAgICAgICAgODA6IFwiMTA4MFBcIixcbiAgICAgICAgNzQ6IFwiNzIwUDYwXCIsXG4gICAgICAgIDY0OiBcIjcyMFBcIixcbiAgICAgICAgNDg6IFwiNzIwUFwiLFxuICAgICAgICAzMjogXCI0ODBQXCIsXG4gICAgICAgIDE2OiBcIjM2MFBcIixcbiAgICAgICAgMTU6IFwiMzYwUFwiLFxuICAgICAgfTtcbiAgICBjb25zdCB2aWRlb1F1YW50aXR5ID0gcXVhbGl0eUFycmF5W3F1YWxpdHldIHx8IFwidW5rbm93blwiO1xuICAgIGNvbnNvbGUubG9nKFwidmlkZW9RdWFudGl0eSBpcyBcIiArIHZpZGVvUXVhbnRpdHkpO1xuICAgIGlmIChmYWxsYmFjaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZXJyb3IgaGFwcGVuIHdoZW4gZ2V0IHZpZGVvIGRhdGFcIik7XG4gICAgfVxuICAgIGRlYnVnKFwiZWNobyB0YXJnZXRcIik7XG4gICAgZGVidWcodGFyZ2V0KTtcbiAgICB0YXJnZXQuZm9yRWFjaCgoZWxlbWVudCwgcGFydCkgPT4ge1xuICAgICAgY29uc3QgZmlsZSA9IHBhdGguam9pbih2aWRlb3BhdGgsIGAke3Nhbml0aXplKGZpbGVuYW1lKX0tJHtwYXJ0fS5mbHZgKTtcbiAgICAgIGRlYnVnKFwicGFydCBpcyAlb1wiLCBwYXJ0KTtcbiAgICAgIGRlYnVnKFwiZmlsZSBuYW1lICVvXCIsIGZpbGUpO1xuICAgICAgY29uc3Qgc3RhdGUgPSBkb3dubG9hZGVyLmRvd25sb2FkQnlJbmRleChcbiAgICAgICAgcGFydCxcbiAgICAgICAgZmlsZSxcbiAgICAgICAgKHByb2dyZXNzLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgc3BlZWQsIGV0YSwgcGVyY2VudGFnZSB9ID0gcHJvZ3Jlc3M7IC8v5pi+56S66L+b5bqm5p2hXG4gICAgICAgICAgY29uc29sZS5sb2coXCJzcGVlZDogXCIgKyBNYXRoLnJvdW5kKHNwZWVkIC8gMWUzKSArIFwiS0Ivc1wiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgZXRhOiR7ZXRhfXNgKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIC8qKlxuICAgKiBnZXQgdmlkZW8gZGV0YWlsXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYWdlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsaW5rXG4gICAqL1xuICBhc3luYyBnZXRWaWRlb2RldGFpbChwYWdlLCBsaW5rKSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMucGFnZS5nb3RvKGxpbmssIHtcbiAgICAgIHdhaXRVbnRpbDogXCJkb21jb250ZW50bG9hZGVkXCIsXG4gICAgfSk7XG5cbiAgICAvLyBhd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEJpbGliaWxpU2NyYXBlcjogQmlsaWJpbGlTY3JhcGVyLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY2hlZXJpbyA9IHJlcXVpcmUoJ2NoZWVyaW8nKTtcbmNvbnN0IFNjcmFwZXIgPSByZXF1aXJlKCcuL3NvY2lhbF9zY3JhcGVyJyk7XG5cbmNsYXNzIEZhY2Vib29rU2NyYXBlciBleHRlbmRzIFNjcmFwZXIge1xuXG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcbiAgICB9XG4gXG5cbiAgICBhc3luYyBsb2FkX2xvZ2luX3BhZ2UoKSB7XG4gICAgICAgIGxldCBzdGFydFVybCA9ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20nO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncykge1xuICAgICAgICAgICAgc3RhcnRVcmwgPSBgaHR0cHM6Ly93d3cuJHt0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncy5mYWNlYm9va19kb21haW59YDtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncy5mYWNlYm9va19kb21haW4pIHtcbiAgICAgICAgICAgICAgICBzdGFydFVybCA9IGBodHRwczovL3d3dy4ke3RoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzLmZhY2Vib29rX2RvbWFpbn1gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFydFVybCA9IGBodHRwczovL3d3dy5mYWNlYm9vay5jb21gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAnZmFjZWJvb2tfZG9tYWluJykge1xuICAgICAgICAgICAgICAgICAgICBzdGFydFVybCArPSBgJHtrZXl9PSR7dGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3Nba2V5XX0mYFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ1VzaW5nIGxvZ2luVXJsOiAnICsgc3RhcnRVcmwpO1xuXG4gICAgICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IGF3YWl0IHRoaXMucGFnZS5nb3RvKHN0YXJ0VXJsKTtcblxuICAgICAgICAvL2F3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoJ2lucHV0W25hbWU9XCJxXCJdJywgeyB0aW1lb3V0OiB0aGlzLlNUQU5EQVJEX1RJTUVPVVQgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vdXNlciBsb2dpbiBieSBoYW5kXG4gICAgYXN5bmMgdXNlcmxvZ2luYWN0aW9uKCl7XG5cbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgRmFjZWJvb2tTY3JhcGVyOiBGYWNlYm9va1NjcmFwZXIsXG59O1xuIiwiLy9zY3JvbGwgZG93biB0byB0aGUgYm90dG9tIG9mIHRoZSBwYWdlXG5hc3luYyBmdW5jdGlvbiBhdXRvU2Nyb2xsKHBhZ2Upe1xuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGUoYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIHRvdGFsSGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IDEwMDtcbiAgICAgICAgICAgIHZhciB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIGRpc3RhbmNlKTtcbiAgICAgICAgICAgICAgICB0b3RhbEhlaWdodCArPSBkaXN0YW5jZTtcblxuICAgICAgICAgICAgICAgIGlmKHRvdGFsSGVpZ2h0ID49IHNjcm9sbEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBkZWxheSh0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHsgXG4gICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSlcbiAgICB9KTtcbiB9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF1dG9TY3JvbGw6YXV0b1Njcm9sbCxcbiAgICBkZWxheTpkZWxheVxufSIsImNvbnN0IGNoZWVyaW8gPSByZXF1aXJlKCdjaGVlcmlvJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldF9pcF9kYXRhOiBnZXRfaXBfZGF0YSxcbiAgICBnZXRfaHR0cF9oZWFkZXJzOiBnZXRfaHR0cF9oZWFkZXJzLFxufTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0X2lwX2RhdGEocGFnZSkge1xuICAgIGF3YWl0IHBhZ2UuZ290bygnaHR0cHM6Ly9pcGluZm8uaW8vanNvbicsIHtcbiAgICAgIHdhaXRMb2FkOiB0cnVlLFxuICAgICAgd2FpdE5ldHdvcmtJZGxlOiB0cnVlXG4gICAgfSk7XG4gICAgbGV0IGpzb24gPSBhd2FpdCBwYWdlLmNvbnRlbnQoe1xuICAgICAgICB0aW1lb3V0OiAyMDAwMFxuICAgIH0pO1xuICAgIGNvbnN0ICQgPSBjaGVlcmlvLmxvYWQoanNvbik7XG4gICAgbGV0IGlwaW5mb190ZXh0ID0gICQoJ3ByZScpLnRleHQoKTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShpcGluZm9fdGV4dCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldF9odHRwX2hlYWRlcnMocGFnZSkge1xuICAgIGF3YWl0IHBhZ2UuZ290bygnaHR0cHM6Ly9odHRwYmluLm9yZy9nZXQnLCB7XG4gICAgICB3YWl0TG9hZDogdHJ1ZSxcbiAgICAgIHdhaXROZXR3b3JrSWRsZTogdHJ1ZVxuICAgIH0pO1xuICAgIGxldCBoZWFkZXJzID0gYXdhaXQgcGFnZS5jb250ZW50KCk7XG5cbiAgICBjb25zdCAkID0gY2hlZXJpby5sb2FkKGhlYWRlcnMpO1xuICAgIGxldCBoZWFkZXJzX3RleHQgPSAgJCgncHJlJykudGV4dCgpO1xuICAgIHJldHVybiBKU09OLnBhcnNlKGhlYWRlcnNfdGV4dCk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBtZXRhID0gcmVxdWlyZSgnLi9tZXRhZGF0YS5qcycpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzZS1zY3JhcGVyOlNjcmFwZXInKTtcbi8qKlxuICogdGhpcyBpcyBwYXJlbnQgY2xhc3MgZm9yIHNvY2lhbCBzY3JhcHllciBub2RlXG4gKiAgKi8gXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFNvY2lhbFNjcmFwZXIge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBkZWJ1ZygnY29uc3RydWN0b3InKTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY29uZmlnID0ge30sXG4gICAgICAgICAgICBjb250ZXh0ID0ge30sXG4gICAgICAgICAgICBwbHVnZ2FibGUgPSBudWxsLFxuICAgICAgICAgICAgcGFnZSA9IG51bGwsXG4gICAgICAgICAgICAvLyBicm93c2Vycz1udWxsXG4gICAgICAgIH0gPSBvcHRpb25zO1xuICAgICAgICAvLyB0aGlzLmJyb3dzZXI9YnJvd3NlcjtcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICAgICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gbnVsbDsgLy8gdGhlIGxhc3QgcmVzcG9uc2Ugb2JqZWN0XG4gICAgICAgIHRoaXMubWV0YWRhdGEgPSB7XG4gICAgICAgICAgICBzY3JhcGluZ19kZXRlY3RlZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGx1Z2dhYmxlID0gcGx1Z2dhYmxlO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgdGhpcy5sb2dnZXIgPSB0aGlzLmNvbmZpZy5sb2dnZXI7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG5cbiAgICAgICAgdGhpcy5wcm94eSA9IGNvbmZpZy5wcm94eTtcbiAgICAgICAgdGhpcy5rZXl3b3JkcyA9IGNvbmZpZy5rZXl3b3JkcztcblxuICAgICAgICB0aGlzLlNUQU5EQVJEX1RJTUVPVVQgPSAxMDAwMDtcbiAgICAgICAgdGhpcy5TT0xWRV9DQVBUQ0hBX1RJTUUgPSA0NTAwMDtcblxuICAgICAgICB0aGlzLnJlc3VsdHMgPSB7fTtcbiAgICAgICAgdGhpcy5yZXN1bHRfcmFuayA9IDE7XG4gICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgdGhlIHJlcXVlc3RzIGRvbmVcbiAgICAgICAgdGhpcy5udW1fcmVxdWVzdHMgPSAwO1xuICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSBrZXl3b3JkcyBzZWFyY2hlZFxuICAgICAgICB0aGlzLm51bV9rZXl3b3JkcyA9IDA7XG5cbiAgICAgICAgbGV0IHNldHRpbmdzID0gdGhpcy5jb25maWdbYCR7dGhpcy5jb25maWcuc2VhcmNoX2VuZ2luZX1fc2V0dGluZ3NgXTtcbiAgICAgICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNldHRpbmdzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzID0gSlNPTi5wYXJzZShzZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWdbYCR7dGhpcy5jb25maWcuc2VhcmNoX2VuZ2luZX1fc2V0dGluZ3NgXSA9IHNldHRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vc3RhcnQgdG8gbG9naW4gc29jaWFsIG1lZGlhIHBsYXRmb3JtXG4gICAgYXN5bmMgcnVuTG9naW4oeyBwYWdlLCBkYXRhLCB3b3JrZXIgfSkge1xuXG4gICAgICAgIGRlYnVnKCd3b3JrZXI9JW8nLCB3b3JrZXIsIHRoaXMuY29uZmlnLmtleXdvcmRzKTtcblxuICAgICAgICBpZiAocGFnZSkge1xuICAgICAgICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS5zZXRWaWV3cG9ydCh7IHdpZHRoOiAxMjgwLCBoZWlnaHQ6IDgwMCB9KTtcblxuICAgICBcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkX2Jyb3dzZXJfZW5naW5lKCk7XG4gICAgICAgIGF3YWl0IHRoaXMubWFrZWxvZ2luYWN0aW9uKClcbiAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY3Rpb24gdGhhdCBydW5zIG9ubHkgb25jZSBpbiB0aGUgYmVnaW5uaW5nIG9mIHRoZVxuICAgICAqIHNjcmFwaW5nIHByb2NlZHVyZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSB0cnVlIGlmIGV2ZXJ5dGhpbmcgaXMgY29ycmVjdC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkX2Jyb3dzZXJfZW5naW5lKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hcHBseV9ldmFzaW9uX3RlY2huaXF1ZXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgZGV0ZWN0aW9uIGJ5IGV2YWRpbmcgY29tbW9uIGRldGVjdGlvbiB0ZWNobmlxdWVzXG4gICAgICAgICAgICBhd2FpdCBldmFkZUNocm9tZUhlYWRsZXNzRGV0ZWN0aW9uKHRoaXMucGFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBibG9jayBzb21lIGFzc2V0cyB0byBzcGVlZCB1cCBzY3JhcGluZ1xuICAgICAgICBpZiAodGhpcy5jb25maWcuYmxvY2tfYXNzZXRzID09PSB0cnVlKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0UmVxdWVzdEludGVyY2VwdGlvbih0cnVlKTtcbiAgICAgICAgICAgIHRoaXMucGFnZS5vbigncmVxdWVzdCcsIChyZXEpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IHJlcS5yZXNvdXJjZVR5cGUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9jayA9IFsnc3R5bGVzaGVldCcsICdmb250JywgJ2ltYWdlJywgJ21lZGlhJ107XG4gICAgICAgICAgICAgICAgaWYgKGJsb2NrLmluY2x1ZGVzKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5jb250aW51ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnRlc3RfZXZhc2lvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gTmF2aWdhdGUgdG8gdGhlIHBhZ2UgdGhhdCB3aWxsIHBlcmZvcm0gdGhlIHRlc3RzLlxuICAgICAgICAgICAgY29uc3QgdGVzdFVybCA9ICdodHRwczovL2JvdC5zYW5ueXNvZnQuY29tJztcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGFnZS5nb3RvKHRlc3RVcmwpO1xuICAgICAgICAgICAgLy8gU2F2ZSBhIHNjcmVlbnNob3Qgb2YgdGhlIHJlc3VsdHMuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2NyZWVuc2hvdCh7IHBhdGg6ICdoZWFkbGVzcy1ldmFzaW9uLXJlc3VsdC5wbmcnIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmxvZ19odHRwX2hlYWRlcnMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMubWV0YWRhdGEuaHR0cF9oZWFkZXJzID0gYXdhaXQgbWV0YS5nZXRfaHR0cF9oZWFkZXJzKHRoaXMucGFnZSk7XG4gICAgICAgICAgICBkZWJ1ZygndGhpcy5tZXRhZGF0YS5odHRwX2hlYWRlcnM9JU8nLCB0aGlzLm1ldGFkYXRhLmh0dHBfaGVhZGVycyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb25maWcubG9nX2lwX2FkZHJlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxldCBpcGluZm8gPSBhd2FpdCBtZXRhLmdldF9pcF9kYXRhKHRoaXMucGFnZSk7XG4gICAgICAgICAgICB0aGlzLm1ldGFkYXRhLmlwaW5mbyA9IGlwaW5mbztcbiAgICAgICAgICAgIGRlYnVnKCd0aGlzLm1ldGFkYXRhLmlwaW5mbycsIHRoaXMubWV0YWRhdGEuaXBpbmZvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIHRoYXQgb3VyIHByb3h5IGlzIHdvcmtpbmcgYnkgY29uZmlybWluZ1xuICAgICAgICAvLyB0aGF0IGlwaW5mby5pbyBzZWVzIHRoZSBwcm94eSBJUCBhZGRyZXNzXG4gICAgICAgIGlmICh0aGlzLnByb3h5ICYmIHRoaXMuY29uZmlnLmxvZ19pcF9hZGRyZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgICBkZWJ1ZyhgJHt0aGlzLm1ldGFkYXRhLmlwaW5mby5pcH0gdnMgJHt0aGlzLnByb3h5fWApO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgaXAgcmV0dXJuZWQgYnkgaXBpbmZvIGlzIG5vdCBhIHN1YnN0cmluZyBvZiBvdXIgcHJveHlzdHJpbmcsIGdldCB0aGUgaGVjayBvdXR0YSBoZXJlXG4gICAgICAgICAgICBpZiAoIXRoaXMucHJveHkuaW5jbHVkZXModGhpcy5tZXRhZGF0YS5pcGluZm8uaXApKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm94eSBvdXRwdXQgaXAgJHt0aGlzLnByb3h5fSBkb2VzIG5vdCBtYXRjaCB3aXRoIHByb3ZpZGVkIG9uZWApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBVc2luZyB2YWxpZCBQcm94eTogJHt0aGlzLnByb3h5fWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5sb2FkX3N0YXJ0X3BhZ2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICpcbiAgKiBAcmV0dXJucyB0cnVlIGlmIHN0YXJ0cGFnZSB3YXMgbG9hZGVkIGNvcnJlY3RseS5cbiAgKi9cbiAgICBhc3luYyBsb2FkX2xvZ2luX3BhZ2UoKSB7XG5cbiAgICB9XG4gICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiBzdGFydHBhZ2Ugd2FzIGxvYWRlZCBjb3JyZWN0bHkuXG4gICAgICovXG4gICAgIGFzeW5jIGxvYWRfc3RhcnRfcGFnZSgpIHtcblxuICAgICB9XG4gICAgLyoqXG4gICAgICogbWFrZSBsb2dpbiBhY3Rpb25cbiAgICAgKi9cbiAgICBhc3luYyBtYWtlbG9naW5hY3Rpb24oKXtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiB1c2VyIGxvZ2luIGJ5IHRoZWlyIGhhbmRcbiAgICAgKi9cbiAgICBhc3luYyB1c2VybG9naW5hY3Rpb24oKSB7XG5cbiAgICB9XG5cbiAgICBhc3luYyBzZWFyY2hkYXRhKCkge1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIHVzZSB3b3JrZXIgdG8gc2VhcmNoIGRhdGFcbiAgICAgKiBAcGFyYW0gYXJyYXkga2V5d29yZCBcbiAgICAgKi9cbiAgICBhc3luYyB3b3JrZXJzZWFyY2hkYXRhKHtwYWdlLHdvcmtlcn0pIHtcbiAgICAgICAgIGRlYnVnKCd3b3JrZXI9JW8nLCB3b3JrZXIsIHRoaXMuY29uZmlnLmtleXdvcmRzKTtcblxuICAgICAgICBpZiAocGFnZSkge1xuICAgICAgICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS5zZXRWaWV3cG9ydCh7IHdpZHRoOiAxMjgwLCBoZWlnaHQ6IDgwMCB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkX2Jyb3dzZXJfZW5naW5lKClcbiAgICAgICAgY29uc3QgbGlua3M9YXdhaXQgdGhpcy5zZWFyY2hkYXRhKHtrZXl3b3JkOnRoaXMuY29uZmlnLmtleXdvcmRzfSlcbiAgICAgICAgZGVidWcobGlua3MpXG4gICAgfVxuXG59XG4vLyBUaGlzIGlzIHdoZXJlIHdlJ2xsIHB1dCB0aGUgY29kZSB0byBnZXQgYXJvdW5kIHRoZSB0ZXN0cy5cbmFzeW5jIGZ1bmN0aW9uIGV2YWRlQ2hyb21lSGVhZGxlc3NEZXRlY3Rpb24ocGFnZSkge1xuXG4gICAgLy8gUGFzcyB0aGUgV2ViZHJpdmVyIFRlc3QuXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdQcm90byA9IG5hdmlnYXRvci5fX3Byb3RvX187XG4gICAgICAgIGRlbGV0ZSBuZXdQcm90by53ZWJkcml2ZXI7XG4gICAgICAgIG5hdmlnYXRvci5fX3Byb3RvX18gPSBuZXdQcm90bztcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdGhlIENocm9tZSBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgLy8gV2UgY2FuIG1vY2sgdGhpcyBpbiBhcyBtdWNoIGRlcHRoIGFzIHdlIG5lZWQgZm9yIHRoZSB0ZXN0LlxuICAgICAgICBjb25zdCBtb2NrT2JqID0ge1xuICAgICAgICAgICAgYXBwOiB7XG4gICAgICAgICAgICAgICAgaXNJbnN0YWxsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdlYnN0b3JlOiB7XG4gICAgICAgICAgICAgICAgb25JbnN0YWxsU3RhZ2VDaGFuZ2VkOiB7fSxcbiAgICAgICAgICAgICAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bnRpbWU6IHtcbiAgICAgICAgICAgICAgICBQbGF0Zm9ybU9zOiB7XG4gICAgICAgICAgICAgICAgICAgIE1BQzogJ21hYycsXG4gICAgICAgICAgICAgICAgICAgIFdJTjogJ3dpbicsXG4gICAgICAgICAgICAgICAgICAgIEFORFJPSUQ6ICdhbmRyb2lkJyxcbiAgICAgICAgICAgICAgICAgICAgQ1JPUzogJ2Nyb3MnLFxuICAgICAgICAgICAgICAgICAgICBMSU5VWDogJ2xpbnV4JyxcbiAgICAgICAgICAgICAgICAgICAgT1BFTkJTRDogJ29wZW5ic2QnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgUGxhdGZvcm1BcmNoOiB7XG4gICAgICAgICAgICAgICAgICAgIEFSTTogJ2FybScsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl8zMjogJ3g4Ni0zMicsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl82NDogJ3g4Ni02NCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBQbGF0Zm9ybU5hY2xBcmNoOiB7XG4gICAgICAgICAgICAgICAgICAgIEFSTTogJ2FybScsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl8zMjogJ3g4Ni0zMicsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl82NDogJ3g4Ni02NCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBSZXF1ZXN0VXBkYXRlQ2hlY2tTdGF0dXM6IHtcbiAgICAgICAgICAgICAgICAgICAgVEhST1RUTEVEOiAndGhyb3R0bGVkJyxcbiAgICAgICAgICAgICAgICAgICAgTk9fVVBEQVRFOiAnbm9fdXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgVVBEQVRFX0FWQUlMQUJMRTogJ3VwZGF0ZV9hdmFpbGFibGUnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgT25JbnN0YWxsZWRSZWFzb246IHtcbiAgICAgICAgICAgICAgICAgICAgSU5TVEFMTDogJ2luc3RhbGwnLFxuICAgICAgICAgICAgICAgICAgICBVUERBVEU6ICd1cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBDSFJPTUVfVVBEQVRFOiAnY2hyb21lX3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIFNIQVJFRF9NT0RVTEVfVVBEQVRFOiAnc2hhcmVkX21vZHVsZV91cGRhdGUnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgT25SZXN0YXJ0UmVxdWlyZWRSZWFzb246IHtcbiAgICAgICAgICAgICAgICAgICAgQVBQX1VQREFURTogJ2FwcF91cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBPU19VUERBVEU6ICdvc191cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBQRVJJT0RJQzogJ3BlcmlvZGljJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICB3aW5kb3cubmF2aWdhdG9yLmNocm9tZSA9IG1vY2tPYmo7XG4gICAgICAgIHdpbmRvdy5jaHJvbWUgPSBtb2NrT2JqO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0aGUgUGVybWlzc2lvbnMgVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsUXVlcnkgPSB3aW5kb3cubmF2aWdhdG9yLnBlcm1pc3Npb25zLnF1ZXJ5O1xuICAgICAgICB3aW5kb3cubmF2aWdhdG9yLnBlcm1pc3Npb25zLl9fcHJvdG9fXy5xdWVyeSA9IHBhcmFtZXRlcnMgPT5cbiAgICAgICAgICAgIHBhcmFtZXRlcnMubmFtZSA9PT0gJ25vdGlmaWNhdGlvbnMnXG4gICAgICAgICAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoe3N0YXRlOiBOb3RpZmljYXRpb24ucGVybWlzc2lvbn0pXG4gICAgICAgICAgICAgICAgOiBvcmlnaW5hbFF1ZXJ5KHBhcmFtZXRlcnMpO1xuXG4gICAgICAgIC8vIEluc3BpcmVkIGJ5OiBodHRwczovL2dpdGh1Yi5jb20vaWthcmllbmF0b3IvcGhhbnRvbWpzX2hpZGVfYW5kX3NlZWsvYmxvYi9tYXN0ZXIvNS5zcG9vZkZ1bmN0aW9uQmluZC5qc1xuICAgICAgICBjb25zdCBvbGRDYWxsID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGw7XG5cbiAgICAgICAgZnVuY3Rpb24gY2FsbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBvbGRDYWxsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbCA9IGNhbGw7XG5cbiAgICAgICAgY29uc3QgbmF0aXZlVG9TdHJpbmdGdW5jdGlvblN0cmluZyA9IEVycm9yLnRvU3RyaW5nKCkucmVwbGFjZSgvRXJyb3IvZywgXCJ0b1N0cmluZ1wiKTtcbiAgICAgICAgY29uc3Qgb2xkVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbiAgICAgICAgZnVuY3Rpb24gZnVuY3Rpb25Ub1N0cmluZygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzID09PSB3aW5kb3cubmF2aWdhdG9yLnBlcm1pc3Npb25zLnF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZnVuY3Rpb24gcXVlcnkoKSB7IFtuYXRpdmUgY29kZV0gfVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMgPT09IGZ1bmN0aW9uVG9TdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmF0aXZlVG9TdHJpbmdGdW5jdGlvblN0cmluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvbGRDYWxsLmNhbGwob2xkVG9TdHJpbmcsIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb25Ub1N0cmluZztcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdGhlIFBsdWdpbnMgTGVuZ3RoIFRlc3QuXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICAvLyBPdmVyd3JpdGUgdGhlIGBwbHVnaW5zYCBwcm9wZXJ0eSB0byB1c2UgYSBjdXN0b20gZ2V0dGVyLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmF2aWdhdG9yLCAncGx1Z2lucycsIHtcbiAgICAgICAgICAgIC8vIFRoaXMganVzdCBuZWVkcyB0byBoYXZlIGBsZW5ndGggPiAwYCBmb3IgdGhlIGN1cnJlbnQgdGVzdCxcbiAgICAgICAgICAgIC8vIGJ1dCB3ZSBjb3VsZCBtb2NrIHRoZSBwbHVnaW5zIHRvbyBpZiBuZWNlc3NhcnkuXG4gICAgICAgICAgICBnZXQ6ICgpID0+IFsxLCAyLCAzLCA0LCA1XVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdGhlIExhbmd1YWdlcyBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgLy8gT3ZlcndyaXRlIHRoZSBgcGx1Z2luc2AgcHJvcGVydHkgdG8gdXNlIGEgY3VzdG9tIGdldHRlci5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5hdmlnYXRvciwgJ2xhbmd1YWdlcycsIHtcbiAgICAgICAgICAgIGdldDogKCkgPT4gWydlbi1VUycsICdlbiddXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0aGUgaWZyYW1lIFRlc3RcbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MSUZyYW1lRWxlbWVudC5wcm90b3R5cGUsICdjb250ZW50V2luZG93Jywge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRvU3RyaW5nIHRlc3QsIHRob3VnaCBpdCBicmVha3MgY29uc29sZS5kZWJ1ZygpIGZyb20gd29ya2luZ1xuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgd2luZG93LmNvbnNvbGUuZGVidWcgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNoZWVyaW8gPSByZXF1aXJlKCdjaGVlcmlvJyk7XG5jb25zdCBTY3JhcGVyID0gcmVxdWlyZSgnLi9zb2NpYWxfc2NyYXBlcicpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jbGFzcyBZb3V0dWJlU2NyYXBlciBleHRlbmRzIFNjcmFwZXIge1xuXG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTsgICAgXG4gICAgfVxuXG5cbiAgICBhc3luYyBsb2FkX2xvZ2luX3BhZ2UoKSB7XG4gICAgICAgIFxuICAgICAgICAvLyBhd2FpdCB0aGlzLnBhZ2Uuc2V0UmVxdWVzdEludGVyY2VwdGlvbih0cnVlKTtcbiAgICAgICAgLy93aGV0aGVyIHRvIGRpc2FibGUgaW1hZ2UgbG9hZGluZ1xuICAgICAgICAgICAgLy8gdGhpcy5wYWdlLm9uKCdyZXF1ZXN0JywgcmVxdWVzdCA9PiB7XG4gICAgICAgICAgICAvLyAgICAgaWYgKHJlcXVlc3QucmVzb3VyY2VUeXBlKCkgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJlcXVlc3QuY29udGludWUoKTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgbGV0IHN0YXJ0VXJsID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tJztcblxuICAgICAgICBpZiAodGhpcy5jb25maWcueW91dHViZV9zZXR0aW5ncykge1xuICAgICAgICAgICAgc3RhcnRVcmwgPSBgaHR0cHM6Ly93d3cuJHt0aGlzLmNvbmZpZy55b3V0dWJlX3NldHRpbmdzLnlvdXR1YmVfZG9tYWlufWA7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcueW91dHViZV9zZXR0aW5ncy55b3V0dWJlX2RvbWFpbikge1xuICAgICAgICAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LiR7dGhpcy5jb25maWcueW91dHViZV9zZXR0aW5ncy55b3V0dWJlX2RvbWFpbn1gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFydFVybCA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgIT09ICd5b3V0dWJlX2RvbWFpbicpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRVcmwgKz0gYCR7a2V5fT0ke3RoaXMuY29uZmlnLnlvdXR1YmVfc2V0dGluZ3Nba2V5XX0mYFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ1VzaW5nIGxvZ2luVXJsOiAnICsgc3RhcnRVcmwpO1xuICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0QnlwYXNzQ1NQKHRydWUpO1xuICAgICAgICB0aGlzLmxhc3RfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnBhZ2UuZ290byhzdGFydFVybCk7XG4gICAgICAgIFxuICAgICAgICAvL2hpZGRlbiBpY29uXG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS5ldmFsdWF0ZShfID0+IHtcbiAgICAgICAgdmFyIGljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ28taWNvblwiKTtcbiAgICAgICAgaWNvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZy50bXBwYXRoKVxuICAgICAgICAvL2F3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoJ2lucHV0W25hbWU9XCJxXCJdJywgeyB0aW1lb3V0OiB0aGlzLlNUQU5EQVJEX1RJTUVPVVQgfSk7XG4gICAgICAgIC8vYXdhaXQgZm9yIHVzZXIgdG8gdGFrZSBhY3Rpb25cbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcignI2F2YXRhci1idG4nLHsndGltZW91dCc6MH0pO1xuICAgICAgICAvL3VzZXIgaGFzIHN1Y2Nlc3MgbG9naW5cbiAgICAgICAgLy9zYXZlIGNvb2tpZXMgXG4gICAgICAgIGNvbnN0IGNvb2tpZXMgPSBhd2FpdCB0aGlzLnBhZ2UuY29va2llcygpO1xuICAgICAgICBcbiAgICAgICAgYXdhaXQgZnMud3JpdGVGaWxlKHRoaXMuY29uZmlnLnRtcHBhdGgrJy9jb29raWVzLmpzb24nLCBKU09OLnN0cmluZ2lmeShjb29raWVzLCBudWxsLCAyKSk7XG4gICAgICAgIGF3YWl0IGJyb3dzZXIuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG5cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBZb3V0dWJlU2NyYXBlcjogWW91dHViZVNjcmFwZXIsXG59O1xuIiwiZnVuY3Rpb24gd2VicGFja0VtcHR5Q29udGV4dChyZXEpIHtcblx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdHRocm93IGU7XG59XG53ZWJwYWNrRW1wdHlDb250ZXh0LmtleXMgPSAoKSA9PiAoW10pO1xud2VicGFja0VtcHR5Q29udGV4dC5yZXNvbHZlID0gd2VicGFja0VtcHR5Q29udGV4dDtcbndlYnBhY2tFbXB0eUNvbnRleHQuaWQgPSBcIi4vc3JjIHN5bmMgcmVjdXJzaXZlXCI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXJncGFyc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hlZXJpb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlsZW5hbWlmeVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9ncmVzcy1zdHJlYW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyL2Rpc3QvY29uY3VycmVuY3kvYnVpbHRJbkNvbmN1cnJlbmN5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyL2Rpc3QvdXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXNlci1hZ2VudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vcnVuLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9