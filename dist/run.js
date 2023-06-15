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
    user: "",
    pass: "",
    tmppath: "",
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
module.exports = JSON.parse('{"name":"social-marketing","version":"1.0.0","description":"A module using puppeteer to do social marketing","main":"index.js","scripts":{"build":"tsc --build","clean":"tsc --build --clean","test":"mocha test test/modules","login":"ts-node run.ts -a login -c","task":"ts-node run.ts -a task","testdownload":"mocha test test/modules --grep download download single video","testgetlinks":"mocha test test/modules --grep get video play link","testgetalllinks":"mocha test test/modules --grep video-url-list","dev":"webpack --config webpack.dev.js"},"keywords":["scraping","search-engines","google","bing","web-scraping"],"author":"Robert Zeng","repository":{"type":"git","url":"https://github.com/robertzengcn/social-marketing.git"},"license":"ISC","dependencies":{"argparse":"^2.0.1","axios":"^1.3.6","cheerio":"^1.0.0-rc.3","clean-webpack-plugin":"^4.0.0","copy-webpack-plugin":"^11.0.0","cron":"^2.3.0","debug":"^4.3.4","dotenv":"^16.0.3","filenamify":"^4.3.0","got":"^9.6.0","jshint":"^2.13.6","lodash":"^4.17.21","progress-stream":"^2.0.0","puppeteer":"^18.1.0","puppeteer-cluster":"^0.23.0","puppeteer-extra":"^3.3.6","puppeteer-extra-plugin-adblocker":"^2.13.6","puppeteer-extra-plugin-stealth":"^2.11.2","puppeteer-stream":"^3.0.3","puppeteer-video-recorder":"^1.0.5","request":"^2.88.2","sqlite3":"^5.1.6","user-agents":"^1.0.1354","webpack-livereload-plugin":"^3.0.2","webpack-manifest-plugin":"^5.0.0","webpack-merge":"^5.9.0","winston":"^3.2.1"},"engines":{"npm":">=9.3.1","node":">=18.14.0"},"devDependencies":{"@types/node":"^20.3.1","bluebird":"^3.7.2","chai":"^4.2.0","chai-string":"^1.5.0","eslint":"^8.38.0","express":"^4.17.1","http-mitm-proxy":"^0.8.2","key-cert":"^1.0.1","mocha":"^6.1.4","prettier":"2.8.4","ts-loader":"^9.4.3","ts-node":"^10.9.1","tslib":"^2.5.3","typescript":"^5.1.3","ua-parser-js":"^0.7.21","webpack":"^5.86.0","webpack-cli":"^5.1.4","webpack-dev-server":"^4.15.1","webpack-node-externals":"^3.0.0"}}');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLHNDQUFzQyw0Q0FBNEM7QUFDbEY7QUFDQSwwQ0FBMEMsNENBQTRDO0FBQ3RGLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsSUFBSSxHQUFHLGtDQUFrQztBQUM1RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLCtEQUErRCxnQ0FBZ0M7QUFDL0Y7QUFDQSx1REFBdUQsWUFBWTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDUkE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3J1bi50cyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL25vZGVfc29jaWFsbWsudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9yZW1vdGVzb3VyY2UudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9jb25jdXJyZW5jeS1pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvYmlsaWJpbGkvZG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvYmlsaWJpbGlfc2NyYXBlci5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvZmFjZWJvb2tfc2NyYXBlci5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvbGliL2Z1bmN0aW9uLmpzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9tZXRhZGF0YS5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvc29jaWFsX3NjcmFwZXIuanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL3lvdXR1YmVfc2NyYXBlci5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjLyBzeW5jIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJhcmdwYXJzZVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJheGlvc1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJjaGVlcmlvXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImRlYnVnXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJmaWxlbmFtaWZ5XCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImxvZGFzaFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInByb2dyZXNzLXN0cmVhbVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwdXBwZXRlZXJcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXJcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC9jb25jdXJyZW5jeS9idWlsdEluQ29uY3VycmVuY3lcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC91dGlsXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInB1cHBldGVlci1leHRyYVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJ1c2VyLWFnZW50c1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJ3aW5zdG9uXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwib3NcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2Vfc2NyYXBlciA9IHJlcXVpcmUoXCIuL3NyYy9ub2RlX3NvY2lhbG1rXCIpO1xudmFyIFNjcmFwZXIgPSByZXF1aXJlKFwiLi9zcmMvbW9kdWxlcy9zb2NpYWxfc2NyYXBlclwiKTtcblxuYXN5bmMgZnVuY3Rpb24gbG9naW4oYnJvd3Nlcl9jb25maWc6b2JqZWN0LCBzY3JhcGVfY29uZmlnOm9iamVjdCkge1xuICAvLyBzY3JhcGUgY29uZmlnIG92ZXJ3cml0ZXMgdGhlIGJyb3dzZXJfY29uZmlnXG4gIE9iamVjdC5hc3NpZ24oYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpO1xuXG4gIHZhciBzY3JhcGVyID0gbmV3IHNlX3NjcmFwZXIuU2NyYXBlTWFuYWdlcihicm93c2VyX2NvbmZpZyk7XG4gIC8vIHZhciByZW1vdGVDb25maWc9YXdhaXQgc2NyYXBlci5nZXRSZW1vdGVDb25maWcoKTtcbiAgYXdhaXQgc2NyYXBlci5zdGFydCgpO1xuXG4gIHZhciByZXN1bHRzID0gYXdhaXQgc2NyYXBlci5sb2dpbihzY3JhcGVfY29uZmlnKTtcblxuICBhd2FpdCBzY3JhcGVyLnF1aXQoKTtcblxuICByZXR1cm4gcmVzdWx0cztcbn1cbi8vZ2V0IGRhdGEgdXJsc1xuYXN5bmMgZnVuY3Rpb24gc2VhcmNoZGF0YShicm93c2VyX2NvbmZpZywgc2NyYXBlX2NvbmZpZykge1xuICAvLyBzY3JhcGUgY29uZmlnIG92ZXJ3cml0ZXMgdGhlIGJyb3dzZXJfY29uZmlnXG4gIE9iamVjdC5hc3NpZ24oYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpO1xuXG4gIHZhciBzY3JhcGVyID0gbmV3IHNlX3NjcmFwZXIuU2NyYXBlTWFuYWdlcihicm93c2VyX2NvbmZpZyk7XG4gIC8vIHZhciByZW1vdGVDb25maWc9YXdhaXQgc2NyYXBlci5nZXRSZW1vdGVDb25maWcoKTtcbiAgYXdhaXQgc2NyYXBlci5zdGFydCgpO1xuICB2YXIgcmVzdWx0cyA9IGF3YWl0IHNjcmFwZXIuc2VhcmNoZGF0YShzY3JhcGVfY29uZmlnKTtcblxuICBhd2FpdCBzY3JhcGVyLnF1aXQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlYXJjaGRhdGE6IHNlYXJjaGRhdGEsXG4gIGxvZ2luOiBsb2dpbixcbiAgLy8geXRibG9naW46eXRibG9naW4sXG4gIFNjcmFwZU1hbmFnZXI6IHNlX3NjcmFwZXIuU2NyYXBlTWFuYWdlcixcbiAgU2NyYXBlcjogU2NyYXBlcixcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydCB7fTtcbmNvbnN0IHNlX3NjcmFwZXIgPSByZXF1aXJlKFwiLi9pbmRleFwiKTtcbmNvbnN0IHsgQXJndW1lbnRQYXJzZXIgfSA9IHJlcXVpcmUoXCJhcmdwYXJzZVwiKTtcbmNvbnN0IHtSZW1vdGVTb3VyY2V9ID0gcmVxdWlyZShcIi4vc3JjL3JlbW90ZXNvdXJjZVwiKTtcbmNvbnN0IHsgdmVyc2lvbiB9ID0gcmVxdWlyZShcIi4vcGFja2FnZS5qc29uXCIpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcmVzb2x2ZSA9IHJlcXVpcmUoJ3BhdGgnKS5yZXNvbHZlO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdydW5qczpydW5qcycpO1xuLy8gY29uc3QgeyBkYXRhIH0gPSByZXF1aXJlKFwiY2hlZXJpby9saWIvYXBpL2F0dHJpYnV0ZXMuanNcIik7XG5cbmNvbnN0IHBhcnNlciA9IG5ldyBBcmd1bWVudFBhcnNlcih7XG4gIGRlc2NyaXB0aW9uOiBcIlNvY2lhbCBtYXJ0a2V0aW5nXCIsXG59KTtcblxucGFyc2VyLmFkZF9hcmd1bWVudChcIi12XCIsIFwiLS12ZXJzaW9uXCIsIHsgYWN0aW9uOiBcInZlcnNpb25cIiwgdmVyc2lvbiB9KTtcbnBhcnNlci5hZGRfYXJndW1lbnQoXCItYVwiLCBcIi0tYWN0aW9uXCIsIHtcbiAgaGVscDogXCJUaGEgYWN0aW9uIHlvdSB3YW50IHRvIHRoZSBwcm9ncmFtIHRvIHRha2VcIixcbn0pO1xucGFyc2VyLmFkZF9hcmd1bWVudChcIi1jXCIsIFwiLS1jYW1wYWlnblwiLCB7XG4gIGhlbHA6IFwiVGhhIGNhbXBhaWduIGlkIHlvdSB3YW50IHRvIHByb2dyYW0gdG8gdGFrZVwiLFxufSk7XG5cbmxldCBwYXJlYXJnID0gcGFyc2VyLnBhcnNlX2FyZ3MoKTtcblxuLy8gdGhvc2Ugb3B0aW9ucyBuZWVkIHRvIGJlIHByb3ZpZGVkIG9uIHN0YXJ0dXBcbi8vIGFuZCBjYW5ub3QgZ2l2ZSB0byBzZS1zY3JhcGVyIG9uIHNjcmFwZSgpIGNhbGxzXG5sZXQgYnJvd3Nlcl9jb25maWcgPSB7XG4gIC8vIHRoZSB1c2VyIGFnZW50IHRvIHNjcmFwZSB3aXRoXG4gIHVzZXJfYWdlbnQ6XG4gICAgXCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTA3LjAuMC4wIFNhZmFyaS81MzcuMzZcIixcbiAgLy8gaWYgcmFuZG9tX3VzZXJfYWdlbnQgaXMgc2V0IHRvIFRydWUsIGEgcmFuZG9tIHVzZXIgYWdlbnQgaXMgY2hvc2VuXG4gIHJhbmRvbV91c2VyX2FnZW50OiBmYWxzZSxcbiAgLy8gd2hldGhlciB0byBzdGFydCB0aGUgYnJvd3NlciBpbiBoZWFkbGVzcyBtb2RlXG4gIGhlYWRsZXNzOiBmYWxzZSxcbiAgLy8gd2hldGhlciBkZWJ1ZyBpbmZvcm1hdGlvbiBzaG91bGQgYmUgcHJpbnRlZFxuICAvLyBsZXZlbCAwOiBwcmludCBub3RoaW5nXG4gIC8vIGxldmVsIDE6IHByaW50IG1vc3QgaW1wb3J0YW50IGluZm9cbiAgLy8gLi4uXG4gIC8vIGxldmVsIDQ6IHByaW50IGFsbCBzaGl0IG5vYm9keSB3YW50cyB0byBrbm93XG4gIGRlYnVnX2xldmVsOiAxLFxuICAvLyBzcGVjaWZ5IGZsYWdzIHBhc3NlZCB0byBjaHJvbWUgaGVyZVxuICBjaHJvbWVfZmxhZ3M6IFtdLFxuICAvLyBwYXRoIHRvIGpzIG1vZHVsZSB0aGF0IGV4dGVuZHMgZnVuY3Rpb25hbGl0eVxuICAvLyB0aGlzIG1vZHVsZSBzaG91bGQgZXhwb3J0IHRoZSBmdW5jdGlvbnM6XG4gIC8vIGdldF9icm93c2VyLCBoYW5kbGVfbWV0YWRhdGEsIGNsb3NlX2Jyb3dzZXJcbiAgLy8gbXVzdCBiZSBhbiBhYnNvbHV0ZSBwYXRoIHRvIHRoZSBtb2R1bGVcbiAgLy9jdXN0b21fZnVuYzogcmVzb2x2ZSgnZXhhbXBsZXMvcGx1Z2dhYmxlLmpzJyksXG4gIGN1c3RvbV9mdW5jOiBcIlwiLFxuICAvLyB1c2UgYSBwcm94eSBmb3IgYWxsIGNvbm5lY3Rpb25zXG4gIC8vIGV4YW1wbGU6ICdzb2NrczU6Ly83OC45NC4xNzIuNDI6MTA4MCdcbiAgLy8gZXhhbXBsZTogJ2h0dHA6Ly8xMTguMTc0LjIzMy4xMDo0ODQwMCdcbiAgcHJveHk6IFwiXCIsXG4gIC8vIGEgZmlsZSB3aXRoIG9uZSBwcm94eSBwZXIgbGluZS4gRXhhbXBsZTpcbiAgLy8gc29ja3M1Oi8vNzguOTQuMTcyLjQyOjEwODBcbiAgLy8gaHR0cDovLzExOC4xNzQuMjMzLjEwOjQ4NDAwXG4gIHByb3h5X2ZpbGU6IFwiXCIsXG4gIHVzZV9jbHVzdGVyOmZhbHNlLFxuICBwdXBwZXRlZXJfY2x1c3Rlcl9jb25maWc6IHtcbiAgICB0aW1lb3V0OiAxMCAqIDYwICogMTAwMCwgLy8gbWF4IHRpbWVvdXQgc2V0IHRvIDEwIG1pbnV0ZXNcbiAgICBtb25pdG9yOiBmYWxzZSxcbiAgICBjb25jdXJyZW5jeTogMSwgLy8gb25lIHNjcmFwZXIgcGVyIHRhYlxuICAgIG1heENvbmN1cnJlbmN5OiAxLCAvLyBzY3JhcGUgd2l0aCAxIHRhYlxuICB9LFxufTtcblxubGV0IHNjcmFwZV9jb25maWcgPSB7XG4gIC8vIHdoaWNoIHNlYXJjaCBlbmdpbmUgdG8gc2NyYXBlXG4gIC8vIHBsYXRmb3JtOiBcImZhY2Vib29rXCIsXG4gIC8vIGFuIGFycmF5IG9mIGtleXdvcmRzIHRvIHNjcmFwZVxuICBrZXl3b3JkczogW1wiY2xvdWQgc2VydmljZSB0ZXN0XCJdLFxuICAvLyB0aGUgbnVtYmVyIG9mIHBhZ2VzIHRvIHNjcmFwZSBmb3IgZWFjaCBrZXl3b3JkXG4gIG51bV9wYWdlczogMSxcblxuICAvLyBPUFRJT05BTCBQQVJBTVMgQkVMT1c6XG4gIC8vIGdvb2dsZV9zZXR0aW5nczoge1xuICAvLyAgICAgZ2w6ICd1cycsIC8vIFRoZSBnbCBwYXJhbWV0ZXIgZGV0ZXJtaW5lcyB0aGUgR29vZ2xlIGNvdW50cnkgdG8gdXNlIGZvciB0aGUgcXVlcnkuXG4gIC8vICAgICBobDogJ2ZyJywgLy8gVGhlIGhsIHBhcmFtZXRlciBkZXRlcm1pbmVzIHRoZSBHb29nbGUgVUkgbGFuZ3VhZ2UgdG8gcmV0dXJuIHJlc3VsdHMuXG4gIC8vICAgICBzdGFydDogMCwgLy8gRGV0ZXJtaW5lcyB0aGUgcmVzdWx0cyBvZmZzZXQgdG8gdXNlLCBkZWZhdWx0cyB0byAwLlxuICAvLyAgICAgbnVtOiAxMDAsIC8vIERldGVybWluZXMgdGhlIG51bWJlciBvZiByZXN1bHRzIHRvIHNob3csIGRlZmF1bHRzIHRvIDEwLiBNYXhpbXVtIGlzIDEwMC5cbiAgLy8gfSxcbiAgLy8gaW5zdGVhZCBvZiBrZXl3b3JkcyB5b3UgY2FuIHNwZWNpZnkgYSBrZXl3b3JkX2ZpbGUuIHRoaXMgb3ZlcndyaXRlcyB0aGUga2V5d29yZHMgYXJyYXlcbiAga2V5d29yZF9maWxlOiBcIlwiLFxuICAvLyBob3cgbG9uZyB0byBzbGVlcCBiZXR3ZWVuIHJlcXVlc3RzLiBhIHJhbmRvbSBzbGVlcCBpbnRlcnZhbCB3aXRoaW4gdGhlIHJhbmdlIFthLGJdXG4gIC8vIGlzIGRyYXduIGJlZm9yZSBldmVyeSByZXF1ZXN0LiBlbXB0eSBzdHJpbmcgZm9yIG5vIHNsZWVwaW5nLlxuICBzbGVlcF9yYW5nZTogXCJcIixcbiAgLy8gcGF0aCB0byBvdXRwdXQgZmlsZSwgZGF0YSB3aWxsIGJlIHN0b3JlZCBpbiBKU09OXG4gIG91dHB1dF9maWxlOiBcIi90bXAvdGVzdC90ZXN0Lmpzb25cIixcbiAgLy8gd2hldGhlciB0byBwcmV2ZW50IGltYWdlcywgY3NzLCBmb250cyBmcm9tIGJlaW5nIGxvYWRlZFxuICAvLyB3aWxsIHNwZWVkIHVwIHNjcmFwaW5nIGEgZ3JlYXQgZGVhbFxuICBibG9ja19hc3NldHM6IGZhbHNlLFxuICAvLyBjaGVjayBpZiBoZWFkbGVzcyBjaHJvbWUgZXNjYXBlcyBjb21tb24gZGV0ZWN0aW9uIHRlY2huaXF1ZXNcbiAgLy8gdGhpcyBpcyBhIHF1aWNrIHRlc3QgYW5kIHNob3VsZCBiZSB1c2VkIGZvciBkZWJ1Z2dpbmdcbiAgdGVzdF9ldmFzaW9uOiBmYWxzZSxcbiAgYXBwbHlfZXZhc2lvbl90ZWNobmlxdWVzOiB0cnVlLFxuICAvLyBsb2cgaXAgYWRkcmVzcyBkYXRhXG4gIGxvZ19pcF9hZGRyZXNzOiBmYWxzZSxcbiAgLy8gbG9nIGh0dHAgaGVhZGVyc1xuICBsb2dfaHR0cF9oZWFkZXJzOiBmYWxzZSxcbiAgcGxhdGZvcm06IFwiZmFjZWJvb2tcIixcbiAgdXNlcjogXCJcIixcbiAgcGFzczogXCJcIixcbiAgdG1wcGF0aDpcIlwiLFxufTtcblxuZnVuY3Rpb24gZ2V0KG9iamVjdDpBcnJheTxzdHJpbmc+LCBrZXk6c3RyaW5nLCBkZWZhdWx0X3ZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSBvYmplY3Rba2V5XTtcbiAgcmV0dXJuIHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIgPyByZXN1bHQgOiBkZWZhdWx0X3ZhbHVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5Db21tYW5kKHBhcmVhcmcpIHtcbiAgbGV0IGFjdGlvbiA9IGdldChwYXJlYXJnLCBcImFjdGlvblwiLCBmYWxzZSk7XG4gIGlmICghYWN0aW9uKSB7XG4gICAgY29uc29sZS5sb2coXCJubyBwYXJhbWV0ZXIgYWN0aW9uIGJlZW4gcGFzc2VkXCIpO1xuICB9XG4gXG4gIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgY2FzZSBcImxvZ2luXCI6XG4gICAgICBsb2dpbigpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInRhc2tcIjpcbiAgICAgIGdldGNhbXBhaWduKCk7XG4gICAgICBicmVhazsgXG4gIH1cbn1cbi8vZ2V0IGNhbXBhaWduXG5hc3luYyBmdW5jdGlvbiBnZXRjYW1wYWlnbigpIHtcbiAgdmFyIHJlbW90ZXNvdXJjZSA9bmV3IFJlbW90ZVNvdXJjZSgpO1xuICBjb25zdCBjYW1wYWlnbmxpc3Q9YXdhaXQgcmVtb3Rlc291cmNlLmdldENhbXBhaWdubGlzdCgpXG4gIGRlYnVnKGNhbXBhaWdubGlzdClcbiAgaWYoY2FtcGFpZ25saXN0Lmxlbmd0aD09MCl7XG4gICAgY29uc29sZS5sb2coXCJub3QgY2FtcGFpZ24gbmVlZCB0byBydW5cIilcbiAgfVxuICBmb3IgKGNvbnN0IGNhbXBhaWduIG9mIGNhbXBhaWdubGlzdCkge1xuICAgIHN3aXRjaCAoY2FtcGFpZ24udHlwZSkge1xuICAgICAgY2FzZSBcImJpbGliaWxpZG93bmxvYWRcIjpcbiAgICAgICAgc2NyYXBlX2NvbmZpZy5wbGF0Zm9ybT1cImJpbGliaWxpXCJcbiAgICAgICAgc2NyYXBlX2NvbmZpZy5rZXl3b3Jkcz1jYW1wYWlnbi5rZXl3b3Jkc1xuICAgICAgICBzZV9zY3JhcGVyLnNlYXJjaGRhdGEoYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0gIFxufVxuLy9sb2dpbiB0byBmYWNlYm9va1xuYXN5bmMgZnVuY3Rpb24gbG9naW4oKSB7XG4gIGxldCBjYW1wYWlnbklkID0gZ2V0KHBhcmVhcmcsIFwiY2FtcGFpZ25cIiwgZmFsc2UpO1xuICB2YXIgcmVtb3Rlc291cmNlID1uZXcgUmVtb3RlU291cmNlKCk7XG4gIGxldCBzb3NldHRpbmcgPSBhd2FpdCByZW1vdGVzb3VyY2UuZ2V0UmVtb3RlQ29uZmlnKGNhbXBhaWduSWQpO1xuICBkZWJ1Zyhzb3NldHRpbmcpXG4gIGlmKHNvc2V0dGluZz09IG51bGwpe1xuICAgIHRocm93IG5ldyBFcnJvcihcInNvc2V0dGluZyBpcyB1bmRlZmluZWRcIik7XG4gIH1cbiAgc2NyYXBlX2NvbmZpZy5wbGF0Zm9ybSA9IHNvc2V0dGluZy5zb3R5cGU7XG4gIHNjcmFwZV9jb25maWcudXNlciA9IHNvc2V0dGluZy5zb2NpYWx1c2VyO1xuICBzY3JhcGVfY29uZmlnLnBhc3MgPSBzb3NldHRpbmcuc29jaWFscGFzcztcbiAgY29uc29sZS5sb2coc29zZXR0aW5nKTtcbiAgLy9jcmVhdGUgYSB0bXAgZm9sZGVyXG4gIGNvbnN0IHRtcHBhdGggPSByZXNvbHZlKFwiLi90bXAvXCIgKyBzY3JhcGVfY29uZmlnLnBsYXRmb3JtICsgXCIvXCIgKyBzb3NldHRpbmcuc29jaWFsdXNlcik7XG4gIGF3YWl0IGNyZWF0ZVBhdGgodG1wcGF0aCk7XG4gIHNjcmFwZV9jb25maWcudG1wcGF0aD10bXBwYXRoXG5cbiAgYXdhaXQgc2Vfc2NyYXBlci5sb2dpbihicm93c2VyX2NvbmZpZywgc2NyYXBlX2NvbmZpZyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhdGgocGF0aCkge1xuICBwYXRoLnNwbGl0KFwiL1wiKS5yZWR1Y2UoKGRpcmVjdG9yaWVzLCBkaXJlY3RvcnkpID0+IHtcbiAgICBkaXJlY3RvcmllcyArPSBgJHtkaXJlY3Rvcnl9L2A7XG5cbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlyZWN0b3JpZXMpKSB7XG4gICAgICBmcy5ta2RpclN5bmMoZGlyZWN0b3JpZXMpO1xuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcmllcztcbiAgfSwgXCJcIik7XG59XG5cbnJ1bkNvbW1hbmQocGFyZWFyZyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIFVzZSBUeXBlU2NyaXB0IG1vZHVsZXMgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU3NTg1ODQvY2Fubm90LXJlZGVjbGFyZS1ibG9jay1zY29wZWQtdmFyaWFibGVcbmV4cG9ydCB7fTtcbmNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3Qgb3MgPSByZXF1aXJlKFwib3NcIik7XG5jb25zdCBfID0gcmVxdWlyZShcImxvZGFzaFwiKTtcbmNvbnN0IHsgY3JlYXRlTG9nZ2VyLCBmb3JtYXQsIHRyYW5zcG9ydHMgfSA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpO1xuY29uc3QgeyBjb21iaW5lLCB0aW1lc3RhbXAsIHByaW50ZiB9ID0gZm9ybWF0O1xuY29uc3QgZGVidWcgPSByZXF1aXJlKFwiZGVidWdcIikoXCJzZS1zY3JhcGVyOlNjcmFwZU1hbmFnZXJcIik7XG5jb25zdCB7IENsdXN0ZXIgfSA9IHJlcXVpcmUoXCJwdXBwZXRlZXItY2x1c3RlclwiKTtcbmNvbnN0IHZhbmlsbGFQdXBwZXRlZXIgPSByZXF1aXJlKFwicHVwcGV0ZWVyXCIpO1xuY29uc3QgeyBhZGRFeHRyYSB9ID0gcmVxdWlyZShcInB1cHBldGVlci1leHRyYVwiKTtcbi8vIGNvbnN0IFN0ZWFsdGggPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhLXBsdWdpbi1zdGVhbHRoXCIpO1xuLy8gY29uc3QgQWRibG9ja2VyUGx1Z2luID0gcmVxdWlyZShcInB1cHBldGVlci1leHRyYS1wbHVnaW4tYWRibG9ja2VyXCIpO1xuXG5jb25zdCBVc2VyQWdlbnQgPSByZXF1aXJlKFwidXNlci1hZ2VudHNcIik7XG5jb25zdCBmYWNlYm9vayA9IHJlcXVpcmUoXCIuL21vZHVsZXMvZmFjZWJvb2tfc2NyYXBlci5qc1wiKTtcbmNvbnN0IHlvdXR1YmUgPSByZXF1aXJlKFwiLi9tb2R1bGVzL3lvdXR1YmVfc2NyYXBlci5qc1wiKTtcbmNvbnN0IGJpbGliaWxpID0gcmVxdWlyZShcIi4vbW9kdWxlcy9iaWxpYmlsaV9zY3JhcGVyLmpzXCIpO1xuLy8gY29uc3QgYmluZyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9iaW5nLmpzJyk7XG4vLyBjb25zdCB5YW5kZXggPSByZXF1aXJlKCcuL21vZHVsZXMveWFuZGV4LmpzJyk7XG4vLyBjb25zdCBpbmZvc3BhY2UgPSByZXF1aXJlKCcuL21vZHVsZXMvaW5mb3NwYWNlLmpzJyk7XG4vLyBjb25zdCBkdWNrZHVja2dvID0gcmVxdWlyZSgnLi9tb2R1bGVzL2R1Y2tkdWNrZ28uanMnKTtcbmNvbnN0IEN1c3RvbUNvbmN1cnJlbmN5SW1wbCA9IHJlcXVpcmUoXCIuL2NvbmN1cnJlbmN5LWltcGxlbWVudGF0aW9uXCIpO1xuLy8gY29uc3QgYXhpb3MgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5jb25zdCBNQVhfQUxMT1dFRF9CUk9XU0VSUyA9IDY7XG4vLyBjb25zdCBwdXBwZXRlZXIgPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhXCIpO1xuLy8gY29uc3QgX1N0ZWFsdGhQbHVnaW4gPSByZXF1aXJlKCdwdXBwZXRlZXItZXh0cmEtcGx1Z2luLXN0ZWFsdGgnKTtcbi8vIGNvbnN0IF9BZGJsb2NrZXJQbHVnaW4gPSByZXF1aXJlKCdwdXBwZXRlZXItZXh0cmEtcGx1Z2luLWFkYmxvY2tlcicpO1xuXG5mdW5jdGlvbiB3cml0ZV9yZXN1bHRzKGZuYW1lLCBkYXRhKSB7XG4gIGZzLndyaXRlRmlsZVN5bmMoZm5hbWUsIGRhdGEsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gICAgY29uc29sZS5sb2coYFJlc3VsdHMgd3JpdHRlbiB0byBmaWxlICR7Zm5hbWV9YCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWFkX2tleXdvcmRzX2Zyb21fZmlsZShmbmFtZSkge1xuICBsZXQga3dzID0gZnMucmVhZEZpbGVTeW5jKGZuYW1lKS50b1N0cmluZygpLnNwbGl0KG9zLkVPTCk7XG4gIC8vIGNsZWFuIGtleXdvcmRzXG4gIGt3cyA9IGt3cy5maWx0ZXIoKGt3KSA9PiB7XG4gICAgcmV0dXJuIGt3LnRyaW0oKS5sZW5ndGggPiAwO1xuICB9KTtcbiAgcmV0dXJuIGt3cztcbn1cblxuXG5mdW5jdGlvbiBnZXRTY3JhcGVyKHNlYXJjaF9lbmdpbmU6c3RyaW5nLCBhcmdzOmFueSkge1xuICBpZiAodHlwZW9mIHNlYXJjaF9lbmdpbmUgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gbmV3IHtcbiAgICAgIGZhY2Vib29rOiBmYWNlYm9vay5GYWNlYm9va1NjcmFwZXIsXG4gICAgICB5b3V0dWJlOiB5b3V0dWJlLllvdXR1YmVTY3JhcGVyLFxuICAgICAgYmlsaWJpbGk6IGJpbGliaWxpLkJpbGliaWxpU2NyYXBlcixcbiAgICB9W3NlYXJjaF9lbmdpbmVdKGFyZ3MpO1xuICB9IFxuICAvLyBlbHNlIGlmICh0eXBlb2Ygc2VhcmNoX2VuZ2luZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gIC8vICAgcmV0dXJuIG5ldyBzZWFyY2hfZW5naW5lKGFyZ3MpO1xuICAvLyB9IFxuICBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgc29jaWFsIHBsYXRmb3JtIG11c3QgZWl0aGVyIGJlIGEgc3RyaW5nIG9mIGNsYXNzIChmdW5jdGlvbilgXG4gICAgKTtcbiAgfVxufVxudHlwZSBTTWNvbmZpZyA9e1xuICBsb2dnZXI6e2luZm86RnVuY3Rpb259O1xuICBrZXl3b3JkczpBcnJheTxzdHJpbmc+O1xuICBwcm94aWVzOkFycmF5PHN0cmluZz47XG4gIGtleXdvcmRfZmlsZTpzdHJpbmc7XG4gIHByb3h5X2ZpbGU6c3RyaW5nO1xuICB1c2VfcHJveGllc19vbmx5OmJvb2xlYW47XG4gIGN1c3RvbV9mdW5jOnN0cmluZztcbiAgY2hyb21lX2ZsYWdzOkFycmF5PHN0cmluZz47XG4gIHB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZzp7XG4gICAgbWF4Q29uY3VycmVuY3k6bnVtYmVyO1xuICAgIG1vbml0b3I6Ym9vbGVhbjtcbiAgICB0aW1lb3V0Om51bWJlcjtcbiAgfVxuICByYW5kb21fdXNlcl9hZ2VudDpib29sZWFuO1xuICB1c2VyX2FnZW50OnN0cmluZztcbiAgaGVhZGxlc3M6Ym9vbGVhbjtcbiAgcGxhdGZvcm06c3RyaW5nO1xufVxuY2xhc3MgU2NyYXBlTWFuYWdlciB7XG4gIGNsdXN0ZXI6e2V4ZWN1dGU6RnVuY3Rpb247aWRsZTpGdW5jdGlvbjtjbG9zZTpGdW5jdGlvbn07XG4gIHBsdWdnYWJsZTp7c3RhcnRfYnJvd3Nlcj86RnVuY3Rpb24sY2xvc2VfYnJvd3Nlcj86RnVuY3Rpb24saGFuZGxlX3Jlc3VsdHM/OkZ1bmN0aW9uLGhhbmRsZV9tZXRhZGF0YT86RnVuY3Rpb259O1xuICBzY3JhcGVyOntydW5Mb2dpbjpGdW5jdGlvbjt3b3JrZXJzZWFyY2hkYXRhOkZ1bmN0aW9ufTtcbiAgY29udGV4dDpvYmplY3Q7XG4gIGNvbmZpZzpTTWNvbmZpZztcbiAgbG9nZ2VyOntpbmZvOkZ1bmN0aW9ufTtcbiAgYnJvd3Nlcjp7bmV3UGFnZTpGdW5jdGlvbn07XG4gIHBhZ2U6b2JqZWN0O1xuICBudW1DbHVzdGVyczpudW1iZXI7XG4gIHRtcHBhdGg6c3RyaW5nO1xuICBydW5Mb2dpbjpGdW5jdGlvbjtcbiAgY29uc3RydWN0b3IoY29uZmlnLCBjb250ZXh0ID0ge30pIHtcbiAgICB0aGlzLmNsdXN0ZXIgPSBudWxsO1xuICAgIHRoaXMucGx1Z2dhYmxlID0gbnVsbDtcbiAgICB0aGlzLnNjcmFwZXIgPSBudWxsO1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgXG4gICAgLy8gYXdhaXQgdGhpcy5nZXRSZW1vdGVDb25maWcoY2FtcGFpZ25JZClcblxuICAgIHRoaXMuY29uZmlnID0gXy5kZWZhdWx0cyhjb25maWcsIHtcbiAgICAgIC8vIHJlbW90ZV9hZGQ6ZW5kY29maWcuUkVNT1RFQURELFxuICAgICAgLy8gcmVtb3RlX3VzZXJuYW1lOmVuZGNvZmlnLlVTRVJOQU1FLFxuICAgICAgLy8gcmVtb3RlX3Bhc3N3b3JkOmVuZGNvZmlnLlBBU1NXT1JELFxuICAgICAgLy8gdGhlIHVzZXIgYWdlbnQgdG8gc2NyYXBlIHdpdGhcbiAgICAgIHVzZXJfYWdlbnQ6XG4gICAgICAgIFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwNy4wLjAuMCBTYWZhcmkvNTM3LjM2XCIsXG4gICAgICAvLyBpZiByYW5kb21fdXNlcl9hZ2VudCBpcyBzZXQgdG8gVHJ1ZSwgYSByYW5kb20gdXNlciBhZ2VudCBpcyBjaG9zZW5cbiAgICAgIHJhbmRvbV91c2VyX2FnZW50OiBmYWxzZSxcbiAgICAgIC8vIHdoZXRoZXIgdG8gc2VsZWN0IG1hbnVhbCBzZXR0aW5ncyBpbiB2aXNpYmxlIG1vZGVcbiAgICAgIHNldF9tYW51YWxfc2V0dGluZ3M6IGZhbHNlLFxuICAgICAgLy8gbG9nIGlwIGFkZHJlc3MgZGF0YVxuICAgICAgbG9nX2lwX2FkZHJlc3M6IGZhbHNlLFxuICAgICAgLy8gbG9nIGh0dHAgaGVhZGVyc1xuICAgICAgbG9nX2h0dHBfaGVhZGVyczogZmFsc2UsXG4gICAgICAvLyBob3cgbG9uZyB0byBzbGVlcCBiZXR3ZWVuIHJlcXVlc3RzLiBhIHJhbmRvbSBzbGVlcCBpbnRlcnZhbCB3aXRoaW4gdGhlIHJhbmdlIFthLGJdXG4gICAgICAvLyBpcyBkcmF3biBiZWZvcmUgZXZlcnkgcmVxdWVzdC4gZW1wdHkgc3RyaW5nIGZvciBubyBzbGVlcGluZy5cbiAgICAgIHNsZWVwX3JhbmdlOiBudWxsLFxuXG4gICAgICBsb2dnZXI6IGNyZWF0ZUxvZ2dlcih7XG4gICAgICAgIGxldmVsOiBcImluZm9cIixcbiAgICAgICAgZm9ybWF0OiBjb21iaW5lKFxuICAgICAgICAgIHRpbWVzdGFtcCgpLFxuICAgICAgICAgIHByaW50ZigoeyBsZXZlbCwgbWVzc2FnZSwgdGltZXN0YW1wIH0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aW1lc3RhbXB9IFske2xldmVsfV0gJHttZXNzYWdlfWA7XG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgICAgdHJhbnNwb3J0czogW25ldyB0cmFuc3BvcnRzLkNvbnNvbGUoKV0sXG4gICAgICB9KSxcbiAgICAgIHBsYXRmb3JtOiBcImZhY2Vib29rXCIsXG4gICAgICBrZXl3b3JkczogW1wibm9kZWpzIHJvY2tzXCJdLFxuICAgICAgLy8gd2hldGhlciB0byBzdGFydCB0aGUgYnJvd3NlciBpbiBoZWFkbGVzcyBtb2RlXG4gICAgICBoZWFkbGVzczogdHJ1ZSxcbiAgICAgIC8vIHNwZWNpZnkgZmxhZ3MgcGFzc2VkIHRvIGNocm9tZSBoZXJlXG4gICAgICAvLyBBYm91dCBvdXIgZGVmYXVsdHMgdmFsdWVzIGh0dHBzOi8vcGV0ZXIuc2gvZXhwZXJpbWVudHMvY2hyb21pdW0tY29tbWFuZC1saW5lLXN3aXRjaGVzL1xuICAgICAgY2hyb21lX2ZsYWdzOiBbXG4gICAgICAgIFwiLS1kaXNhYmxlLWluZm9iYXJzXCIsXG4gICAgICAgIFwiLS13aW5kb3ctcG9zaXRpb249MCwwXCIsXG4gICAgICAgIFwiLS1pZ25vcmUtY2VydGlmY2F0ZS1lcnJvcnNcIixcbiAgICAgICAgXCItLWlnbm9yZS1jZXJ0aWZjYXRlLWVycm9ycy1zcGtpLWxpc3RcIixcbiAgICAgICAgXCItLW5vLXNhbmRib3hcIixcbiAgICAgICAgXCItLWRpc2FibGUtc2V0dWlkLXNhbmRib3hcIixcbiAgICAgICAgXCItLWRpc2FibGUtZGV2LXNobS11c2FnZVwiLFxuICAgICAgICBcIi0tZGlzYWJsZS1hY2NlbGVyYXRlZC0yZC1jYW52YXNcIixcbiAgICAgICAgXCItLWRpc2FibGUtZ3B1XCIsXG4gICAgICAgIFwiLS13aW5kb3ctc2l6ZT0xMjgwLDc2OFwiLFxuICAgICAgICBcIi0tc3RhcnQtZnVsbHNjcmVlblwiLFxuICAgICAgICBcIi0taGlkZS1zY3JvbGxiYXJzXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLW5vdGlmaWNhdGlvbnNcIixcbiAgICAgIF0sXG4gICAgICAvL2ZpeCBnb29nbGUgYWNjb3VudCBjYW4gbm90IGxvZ2luXG4gICAgICBpZ25vcmVEZWZhdWx0QXJnczogW1xuICAgICAgICBcIi0tZW5hYmxlLWF1dG9tYXRpb25cIixcbiAgICAgICAgXCItLWRpc2FibGUtZXh0ZW5zaW9uc1wiLFxuICAgICAgICBcIi0tZGlzYWJsZS1kZWZhdWx0LWFwcHNcIixcbiAgICAgICAgXCItLWRpc2FibGUtY29tcG9uZW50LWV4dGVuc2lvbnMtd2l0aC1iYWNrZ3JvdW5kLXBhZ2VzXCIsXG4gICAgICBdLFxuICAgICAgLy8gdGhlIG51bWJlciBvZiBwYWdlcyB0byBzY3JhcGUgZm9yIGVhY2gga2V5d29yZFxuICAgICAgbnVtX3BhZ2VzOiAxLFxuICAgICAgLy8gcGF0aCB0byBvdXRwdXQgZmlsZSwgZGF0YSB3aWxsIGJlIHN0b3JlZCBpbiBKU09OXG4gICAgICBvdXRwdXRfZmlsZTogXCJcIixcbiAgICAgIC8vIHdoZXRoZXIgdG8gYWxzbyBwYXNzdGhydSBhbGwgdGhlIGh0bWwgb3V0cHV0IG9mIHRoZSBzZXJwIHBhZ2VzXG4gICAgICBodG1sX291dHB1dDogZmFsc2UsXG4gICAgICAvLyB3aGV0aGVyIHRvIHN0cmlwIEpTIGFuZCBDU1MgZnJvbSB0aGUgaHRtbF9vdXRwdXRcbiAgICAgIC8vIGhhcyBvbmx5IGFuIGVmZmVjdCBpZiBgaHRtbF9vdXRwdXRgIGlzIHRydWVcbiAgICAgIGNsZWFuX2h0bWxfb3V0cHV0OiB0cnVlLFxuICAgICAgLy8gcmVtb3ZlIGFsbCBkYXRhIGltYWdlcyBmcm9tIHRoZSBodG1sXG4gICAgICBjbGVhbl9kYXRhX2ltYWdlczogdHJ1ZSxcbiAgICAgIC8vIHdoZXRoZXIgdG8gcmV0dXJuIGEgc2NyZWVuc2hvdCBvZiBzZXJwIHBhZ2VzIGFzIGI2NCBkYXRhXG4gICAgICBzY3JlZW5fb3V0cHV0OiBmYWxzZSxcbiAgICAgIC8vIFNjcmFwZSB1cmwgZnJvbSBsb2NhbCBmaWxlLiBNYWlubHkgdXNlZCBmb3IgdGVzdGluZy5cbiAgICAgIHNjcmFwZV9mcm9tX2ZpbGU6IFwiXCIsXG4gICAgICAvLyB3aGV0aGVyIHRvIHByZXZlbnQgaW1hZ2VzLCBjc3MsIGZvbnRzIGFuZCBtZWRpYSBmcm9tIGJlaW5nIGxvYWRlZFxuICAgICAgLy8gd2lsbCBzcGVlZCB1cCBzY3JhcGluZyBhIGdyZWF0IGRlYWxcbiAgICAgIGJsb2NrX2Fzc2V0czogdHJ1ZSxcbiAgICAgIC8vIHBhdGggdG8ganMgbW9kdWxlIHRoYXQgZXh0ZW5kcyBmdW5jdGlvbmFsaXR5XG4gICAgICAvLyB0aGlzIG1vZHVsZSBzaG91bGQgZXhwb3J0IHRoZSBmdW5jdGlvbnM6XG4gICAgICAvLyBnZXRfYnJvd3NlciwgaGFuZGxlX21ldGFkYXRhLCBjbG9zZV9icm93c2VyXG4gICAgICAvL2N1c3RvbV9mdW5jOiByZXNvbHZlKCdleGFtcGxlcy9wbHVnZ2FibGUuanMnKSxcbiAgICAgIGN1c3RvbV9mdW5jOiBudWxsLFxuICAgICAgdGhyb3dfb25fZGV0ZWN0aW9uOiBmYWxzZSxcbiAgICAgIC8vIExpc3Qgb2YgcHJveGllcyB0byB1c2UgWydzb2NrczU6Ly83OC45NC4xNzIuNDI6MTA4MCcsICdodHRwOi8vbG9jYWxob3N0OjEwODAnXVxuICAgICAgcHJveGllczogbnVsbCxcbiAgICAgIC8vIGEgZmlsZSB3aXRoIG9uZSBwcm94eSBwZXIgbGluZS4gRXhhbXBsZTpcbiAgICAgIC8vIHNvY2tzNTovLzc4Ljk0LjE3Mi40MjoxMDgwXG4gICAgICAvLyBodHRwOi8vMTE4LjE3NC4yMzMuMTA6NDg0MDBcbiAgICAgIHByb3h5X2ZpbGU6IFwiXCIsXG4gICAgICAvLyB3aGV0aGVyIHRvIHVzZSBwcm94aWVzIG9ubHlcbiAgICAgIC8vIHdoZW4gdGhpcyBpcyBzZXQgdG8gdHJ1ZSwgc2Utc2NyYXBlciB3aWxsIG5vdCB1c2VcbiAgICAgIC8vIHlvdXIgZGVmYXVsdCBJUCBhZGRyZXNzXG4gICAgICB1c2VfcHJveGllc19vbmx5OiBmYWxzZSxcbiAgICAgIC8vIGNoZWNrIGlmIGhlYWRsZXNzIGNocm9tZSBlc2NhcGVzIGNvbW1vbiBkZXRlY3Rpb24gdGVjaG5pcXVlc1xuICAgICAgLy8gdGhpcyBpcyBhIHF1aWNrIHRlc3QgYW5kIHNob3VsZCBiZSB1c2VkIGZvciBkZWJ1Z2dpbmdcbiAgICAgIHRlc3RfZXZhc2lvbjogZmFsc2UsXG4gICAgICBhcHBseV9ldmFzaW9uX3RlY2huaXF1ZXM6IHRydWUsXG4gICAgICAvLyBzZXR0aW5ncyBmb3IgcHVwcGV0ZWVyLWNsdXN0ZXJcbiAgICAgIHB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZzoge1xuICAgICAgICB0aW1lb3V0OiAzMCAqIDYwICogMTAwMCwgLy8gbWF4IHRpbWVvdXQgc2V0IHRvIDMwIG1pbnV0ZXNcbiAgICAgICAgbW9uaXRvcjogZmFsc2UsXG4gICAgICAgIGNvbmN1cnJlbmN5OiBDbHVzdGVyLkNPTkNVUlJFTkNZX0JST1dTRVIsXG4gICAgICAgIG1heENvbmN1cnJlbmN5OiAxLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBcbiAgICB0aGlzLmxvZ2dlciA9IHRoaXMuY29uZmlnLmxvZ2dlcjtcblxuICAgIGlmIChjb25maWcuc2xlZXBfcmFuZ2UpIHtcbiAgICAgIC8vIHBhcnNlIGFuIGFycmF5XG4gICAgICBjb25maWcuc2xlZXBfcmFuZ2UgPSBldmFsKGNvbmZpZy5zbGVlcF9yYW5nZSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgY29uZmlnLnNsZWVwX3JhbmdlLmxlbmd0aCAhPT0gMiBcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBcInNsZWVwX3JhbmdlIGlzIG5vdCBhIHZhbGlkIGFycmF5IG9mIHR3byBpbnRlZ2Vycy5cIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZnMuZXhpc3RzU3luYyh0aGlzLmNvbmZpZy5rZXl3b3JkX2ZpbGUpKSB7XG4gICAgICB0aGlzLmNvbmZpZy5rZXl3b3JkcyA9IHJlYWRfa2V5d29yZHNfZnJvbV9maWxlKHRoaXMuY29uZmlnLmtleXdvcmRfZmlsZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLnByb3hpZXMgJiYgdGhpcy5jb25maWcucHJveHlfZmlsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkVpdGhlciB1c2UgYSBwcm94eV9maWxlIG9yIHNwZWNpZnkgYSBwcm94eSBmb3IgYWxsIGNvbm5lY3Rpb25zLiBEbyBub3QgdXNlIGJvdGggb3B0aW9ucy5cIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcucHJveHlfZmlsZSkge1xuICAgICAgdGhpcy5jb25maWcucHJveGllcyA9IHJlYWRfa2V5d29yZHNfZnJvbV9maWxlKHRoaXMuY29uZmlnLnByb3h5X2ZpbGUpO1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgJHt0aGlzLmNvbmZpZy5wcm94aWVzLmxlbmd0aH0gcHJveGllcyByZWFkIGZyb20gZmlsZS5gKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY29uZmlnLnByb3hpZXMgJiYgdGhpcy5jb25maWcudXNlX3Byb3hpZXNfb25seSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIk11c3QgcHJvdmlkZSBhdCBsZWFzdCBvbmUgcHJveHkgaW4gcHJveGllcyBpZiB5b3UgZW5hYmxlIHVzZV9wcm94aWVzX29ubHlcIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBkZWJ1ZyhcInRoaXMuY29uZmlnPSVPXCIsIHRoaXMuY29uZmlnKTtcbiAgfVxuXG4gIC8qXG4gICAqIExhdW5jaGVzIHRoZSBwdXBwZXRlZXIgY2x1c3RlciBvciBicm93c2VyLlxuICAgKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGJyb3dzZXIgd2FzIHN1Y2Nlc3NmdWxseSBsYXVuY2hlZC4gT3RoZXJ3aXNlIHdpbGwgcmV0dXJuIGZhbHNlLlxuICAgKi9cbiAgYXN5bmMgc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmN1c3RvbV9mdW5jKSB7XG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyh0aGlzLmNvbmZpZy5jdXN0b21fZnVuYykpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBQbHVnZ2FibGVDbGFzcyA9IHJlcXVpcmUodGhpcy5jb25maWcuY3VzdG9tX2Z1bmMpO1xuICAgICAgICAgIHRoaXMucGx1Z2dhYmxlID0gbmV3IFBsdWdnYWJsZUNsYXNzKHtcbiAgICAgICAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXhjZXB0aW9uKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEZpbGUgXCIke3RoaXMuY29uZmlnLmN1c3RvbV9mdW5jfVwiIGRvZXMgbm90IGV4aXN0IWApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2hyb21lX2ZsYWdzID0gXy5jbG9uZSh0aGlzLmNvbmZpZy5jaHJvbWVfZmxhZ3MpO1xuXG4gICAgaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLnN0YXJ0X2Jyb3dzZXIpIHtcbiAgICAgIC8vIGxhdW5jaF9hcmdzLmNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgdGhpcy5icm93c2VyID0gYXdhaXQgdGhpcy5wbHVnZ2FibGUuc3RhcnRfYnJvd3Nlcih7XG4gICAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICB9KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiMjI5XCIpXG4gICAgICB0aGlzLnBhZ2UgPSBhd2FpdCB0aGlzLmJyb3dzZXIubmV3UGFnZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBcbiAgICAgIC8vIGlmIG5vIGN1c3RvbSBzdGFydF9icm93c2VyIGZ1bmN0aW9uYWxpdHkgd2FzIGdpdmVuXG4gICAgICAvLyB1c2UgcHVwcGV0ZWVyLWNsdXN0ZXIgZm9yIHNjcmFwaW5nXG5cbiAgICAgIGxldCBwcm94aWVzO1xuICAgICAgLy8gaWYgd2UgaGF2ZSBhdCBsZWFzdCBvbmUgcHJveHksIGFsd2F5cyB1c2UgQ09OQ1VSUkVOQ1lfQlJPV1NFUlxuICAgICAgLy8gYW5kIHNldCBtYXhDb25jdXJyZW5jeSB0byB0aGlzLmNvbmZpZy5wcm94aWVzLmxlbmd0aCArIDFcbiAgICAgIC8vIGVsc2UgdXNlIHdoYXRldmVyIHRoaXMuY29uZmlndXJhdGlvbiB3YXMgcGFzc2VkXG4gICAgICBpZiAodGhpcy5jb25maWcucHJveGllcyAmJiB0aGlzLmNvbmZpZy5wcm94aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gYmVjYXVzZSB3ZSB1c2UgcmVhbCBicm93c2Vycywgd2UgcmFuIG91dCBvZiBtZW1vcnkgb24gbm9ybWFsIGxhcHRvcHNcbiAgICAgICAgLy8gd2hlbiB1c2luZyBtb3JlIHRoYW4gbWF5YmUgNSBvciA2IGJyb3dzZXJzLlxuICAgICAgICAvLyB0aGVyZWZvcmUgaGFyZGNvZGUgYSBsaW1pdCBoZXJlXG4gICAgICAgIC8vIFRPRE8gbm90IHN1cmUgdGhpcyB3aGF0IHdlIHdhbnRcbiAgICAgICAgdGhpcy5udW1DbHVzdGVycyA9IE1hdGgubWluKFxuICAgICAgICAgIHRoaXMuY29uZmlnLnByb3hpZXMubGVuZ3RoICsgKHRoaXMuY29uZmlnLnVzZV9wcm94aWVzX29ubHkgPyAwIDogMSksXG4gICAgICAgICAgTUFYX0FMTE9XRURfQlJPV1NFUlNcbiAgICAgICAgKTtcbiAgICAgICAgcHJveGllcyA9IF8uY2xvbmUodGhpcy5jb25maWcucHJveGllcyk7XG5cbiAgICAgICAgLy8gSW5zZXJ0IGEgZmlyc3QgY29uZmlnIHdpdGhvdXQgcHJveHkgaWYgdXNlX3Byb3h5X29ubHkgaXMgZmFsc2VcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnVzZV9wcm94aWVzX29ubHkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcHJveGllcy51bnNoaWZ0KG51bGwpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm51bUNsdXN0ZXJzID0gdGhpcy5jb25maWcucHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnLm1heENvbmN1cnJlbmN5O1xuICAgICAgICBwcm94aWVzID0gXy50aW1lcyh0aGlzLm51bUNsdXN0ZXJzLCBudWxsKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgVXNpbmcgJHt0aGlzLm51bUNsdXN0ZXJzfSBjbHVzdGVycy5gKTtcblxuICAgICAgLy8gR2l2ZSB0aGUgcGVyIGJyb3dzZXIgb3B0aW9uc1xuICAgICAgY29uc3QgcGVyQnJvd3Nlck9wdGlvbnMgPSBfLm1hcChwcm94aWVzLCAocHJveHkpID0+IHtcbiAgICAgICAgY29uc3QgdXNlckFnZW50ID0gdGhpcy5jb25maWcucmFuZG9tX3VzZXJfYWdlbnRcbiAgICAgICAgICA/IG5ldyBVc2VyQWdlbnQoeyBkZXZpY2VDYXRlZ29yeTogXCJkZXNrdG9wXCIgfSkudG9TdHJpbmcoKVxuICAgICAgICAgIDogdGhpcy5jb25maWcudXNlcl9hZ2VudDtcbiAgICAgICAgbGV0IGFyZ3MgPSBjaHJvbWVfZmxhZ3MuY29uY2F0KFtgLS11c2VyLWFnZW50PSR7dXNlckFnZW50fWBdKTtcblxuICAgICAgICBpZiAocHJveHkpIHtcbiAgICAgICAgICBhcmdzID0gYXJncy5jb25jYXQoW2AtLXByb3h5LXNlcnZlcj0ke3Byb3h5fWBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaGVhZGxlc3M6IHRoaXMuY29uZmlnLmhlYWRsZXNzLFxuICAgICAgICAgIGlnbm9yZUhUVFBTRXJyb3JzOiB0cnVlLFxuICAgICAgICAgIGFyZ3MsXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgZGVidWcoXCJwZXJCcm93c2VyT3B0aW9ucz0lT1wiLCBwZXJCcm93c2VyT3B0aW9ucyk7XG5cbiAgICAgIC8vIHB1cHBldGVlci51c2UoX1N0ZWFsdGhQbHVnaW4oKSk7XG4gICAgICAvLyBwdXBwZXRlZXIudXNlKF9BZGJsb2NrZXJQbHVnaW4oKSk7XG5cbiAgICAgIGNvbnN0IHB1cHBldGVlciA9IGFkZEV4dHJhKHZhbmlsbGFQdXBwZXRlZXIpO1xuXG4gICAgICAvLyBBZGQgc3RlYWx0aCBwbHVnaW4gYW5kIHVzZSBkZWZhdWx0cyAoYWxsIHRyaWNrcyB0byBoaWRlIHB1cHBldGVlciB1c2FnZSlcbiAgICAgIC8vICBwdXBwZXRlZXIudXNlKFN0ZWFsdGgoKSk7XG5cbiAgICAgIC8vIEFkZCBhZGJsb2NrZXIgcGx1Z2luIHRvIGJsb2NrIGFsbCBhZHMgYW5kIHRyYWNrZXJzIChzYXZlcyBiYW5kd2lkdGgpXG4gICAgICAvLyBwdXBwZXRlZXIudXNlKEFkYmxvY2tlclBsdWdpbih7IGJsb2NrVHJhY2tlcnM6IHRydWUgfSkpO1xuXG4gICAgICB0aGlzLmNsdXN0ZXIgPSBhd2FpdCBDbHVzdGVyLmxhdW5jaCh7XG4gICAgICAgIHB1cHBldGVlcixcbiAgICAgICAgbW9uaXRvcjogdGhpcy5jb25maWcucHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnLm1vbml0b3IsXG4gICAgICAgIHRpbWVvdXQ6IHRoaXMuY29uZmlnLnB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZy50aW1lb3V0LCAvLyBtYXggdGltZW91dCBzZXQgdG8gMzAgbWludXRlc1xuICAgICAgICBjb25jdXJyZW5jeTogQ3VzdG9tQ29uY3VycmVuY3lJbXBsLFxuICAgICAgICBtYXhDb25jdXJyZW5jeTogdGhpcy5udW1DbHVzdGVycyxcbiAgICAgICAgcHVwcGV0ZWVyT3B0aW9uczoge1xuICAgICAgICAgIC8vIHB1cHBldGVlcjpwdXBwZXRlZXIsXG4gICAgICAgICAgcGVyQnJvd3Nlck9wdGlvbnM6IHBlckJyb3dzZXJPcHRpb25zLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogbG9naW4gdGhlIHNvY2lsYSBtZWRpYSBwbGF0Zm9ybVxuICAgKi9cbiAgYXN5bmMgbG9naW4oc2NyYXBlX2NvbmZpZyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgc2NyYXBlX2NvbmZpZyk7XG5cbiAgICAvLyB2YXIgcmVzdWx0cyA9IHt9O1xuICAgIC8vIHZhciBudW1fcmVxdWVzdHMgPSAwO1xuICAgIC8vIHZhciBtZXRhZGF0YSA9IHt9O1xuICAgIC8vIHZhciBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLnN0YXJ0X2Jyb3dzZXIpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29uZmlnLnBsYXRmb3JtKVxuICAgICAgdGhpcy5zY3JhcGVyID0gZ2V0U2NyYXBlcih0aGlzLmNvbmZpZy5wbGF0Zm9ybSwge1xuICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXG4gICAgICAgIHBsdWdnYWJsZTogdGhpcy5wbHVnZ2FibGUsXG4gICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgICAgdG1wcGF0aDogdGhpcy50bXBwYXRoLFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMuc2NyYXBlci5ydW5Mb2dpbih0aGlzLnBhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBFYWNoIGJyb3dzZXIgd2lsbCBnZXQgTi8oSysxKSBrZXl3b3JkcyBhbmQgd2lsbCBpc3N1ZSBOLyhLKzEpICogTSB0b3RhbCByZXF1ZXN0cyB0byB0aGUgc2VhcmNoIGVuZ2luZS5cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvcHVwcGV0ZWVyL2lzc3Vlcy82NzhcbiAgICAgIC8vIFRoZSBxdWVzdGlvbiBpczogSXMgaXQgcG9zc2libGUgdG8gc2V0IHByb3hpZXMgcGVyIFBhZ2U/IFBlciBCcm93c2VyP1xuICAgICAgLy8gYXMgZmFyIGFzIEkgY2FuIHNlZSwgcHVwcGV0ZWVyIGNsdXN0ZXIgdXNlcyB0aGUgc2FtZSBwdXBwZXRlZXJPcHRpb25zXG4gICAgICAvLyBmb3IgZXZlcnkgYnJvd3NlciBpbnN0YW5jZS4gV2Ugd2lsbCB1c2Ugb3VyIGN1c3RvbSBwdXBwZXRlZXItY2x1c3RlciB2ZXJzaW9uLlxuICAgICAgLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvcHJveHktY2hhaW5cbiAgICAgIC8vIHRoaXMgYW5zd2VyIGxvb2tzIG5pY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvcHVwcGV0ZWVyL2lzc3Vlcy82NzgjaXNzdWVjb21tZW50LTM4OTA5NjA3N1xuICAgICAgbGV0IGNodW5rcyA9IFtdO1xuICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB0aGlzLm51bUNsdXN0ZXJzOyBuKyspIHtcbiAgICAgICAgY2h1bmtzLnB1c2goW10pO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmNvbmZpZy5rZXl3b3Jkcy5sZW5ndGg7IGsrKykge1xuICAgICAgICBjaHVua3NbayAlIHRoaXMubnVtQ2x1c3RlcnNdLnB1c2godGhpcy5jb25maWcua2V5d29yZHNba10pO1xuICAgICAgfVxuXG4gICAgICBkZWJ1ZyhcImNodW5rcz0lb1wiLCBjaHVua3MpO1xuXG4gICAgICBsZXQgZXhlY1Byb21pc2VzID0gW107XG4gICAgICBmb3IgKHZhciBjID0gMDsgYyA8IGNodW5rcy5sZW5ndGg7IGMrKykge1xuICAgICAgICBjb25zdCBjb25maWcgPSBfLmNsb25lKHRoaXMuY29uZmlnKTtcbiAgICAgICAgY29uZmlnLmtleXdvcmRzID0gY2h1bmtzW2NdO1xuXG4gICAgICAgIHZhciBvYmogPSBnZXRTY3JhcGVyKHRoaXMuY29uZmlnLnBsYXRmb3JtLCB7XG4gICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgY29udGV4dDoge30sXG4gICAgICAgICAgcGx1Z2dhYmxlOiB0aGlzLnBsdWdnYWJsZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGJvdW5kTWV0aG9kID0gb2JqLnJ1bkxvZ2luLmJpbmQob2JqKTtcbiAgICAgICAgZXhlY1Byb21pc2VzLnB1c2godGhpcy5jbHVzdGVyLmV4ZWN1dGUoe30sIGJvdW5kTWV0aG9kKSk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGV4ZWNQcm9taXNlcyk7XG5cbiAgICAgIC8vIE1lcmdlIHJlc3VsdHMgYW5kIG1ldGFkYXRhIHBlciBrZXl3b3JkXG4gICAgICAvLyBmb3IgKGxldCBwcm9taXNlUmV0dXJuIG9mIHByb21pc2VSZXR1cm5zKSB7XG4gICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHRzLCBwcm9taXNlUmV0dXJuLnJlc3VsdHMpO1xuICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24obWV0YWRhdGEsIHByb21pc2VSZXR1cm4ubWV0YWRhdGEpO1xuICAgICAgLy8gICAgIG51bV9yZXF1ZXN0cyArPSBwcm9taXNlUmV0dXJuLm51bV9yZXF1ZXN0cztcbiAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvLyBsZXQgdGltZURlbHRhID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAvLyBsZXQgbXNfcGVyX3JlcXVlc3QgPSB0aW1lRGVsdGEvbnVtX3JlcXVlc3RzO1xuXG4gICAgLy8gdGhpcy5sb2dnZXIuaW5mbyhgU2NyYXBlciB0b29rICR7dGltZURlbHRhfW1zIHRvIHBlcmZvcm0gJHtudW1fcmVxdWVzdHN9IHJlcXVlc3RzLmApO1xuICAgIC8vIHRoaXMubG9nZ2VyLmluZm8oYE9uIGF2ZXJhZ2UgbXMvcmVxdWVzdDogJHttc19wZXJfcmVxdWVzdH1tcy9yZXF1ZXN0YCk7XG5cbiAgICAvLyBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX3Jlc3VsdHMpIHtcbiAgICAvLyAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX3Jlc3VsdHMocmVzdWx0cyk7XG4gICAgLy8gfVxuXG4gICAgLy8gbWV0YWRhdGEuZWxhcHNlZF90aW1lID0gdGltZURlbHRhLnRvU3RyaW5nKCk7XG4gICAgLy8gbWV0YWRhdGEubXNfcGVyX2tleXdvcmQgPSBtc19wZXJfcmVxdWVzdC50b1N0cmluZygpO1xuICAgIC8vIG1ldGFkYXRhLm51bV9yZXF1ZXN0cyA9IG51bV9yZXF1ZXN0cztcblxuICAgIC8vIGRlYnVnKCdtZXRhZGF0YT0lTycsIG1ldGFkYXRhKTtcblxuICAgIC8vIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfbWV0YWRhdGEpIHtcbiAgICAvLyAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX21ldGFkYXRhKG1ldGFkYXRhKTtcbiAgICAvLyB9XG5cbiAgICAvLyBpZiAodGhpcy5jb25maWcub3V0cHV0X2ZpbGUpIHtcbiAgICAvLyAgICAgdGhpcy5sb2dnZXIuaW5mbyhgV3JpdGluZyByZXN1bHRzIHRvICR7dGhpcy5jb25maWcub3V0cHV0X2ZpbGV9YCk7XG4gICAgLy8gICAgIHdyaXRlX3Jlc3VsdHModGhpcy5jb25maWcub3V0cHV0X2ZpbGUsIEpTT04uc3RyaW5naWZ5KHJlc3VsdHMsIG51bGwsIDQpKTtcbiAgICAvLyB9XG5cbiAgICAvLyByZXR1cm4ge1xuICAgIC8vICAgICByZXN1bHRzOiByZXN1bHRzLFxuICAgIC8vICAgICBtZXRhZGF0YTogbWV0YWRhdGEgfHwge30sXG4gICAgLy8gfTtcbiAgfVxuXG4gIC8qXG4gICAqIGdldCBkYXRhIHVybCBmcm9tIHBsYXRmb3JtXG4gICAqL1xuICBhc3luYyBzZWFyY2hkYXRhKHNjcmFwZV9jb25maWcgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIHNjcmFwZV9jb25maWcpO1xuXG4gICAgaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLnN0YXJ0X2Jyb3dzZXIpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29uZmlnLnBsYXRmb3JtKVxuICAgICAgdGhpcy5zY3JhcGVyID0gZ2V0U2NyYXBlcih0aGlzLmNvbmZpZy5wbGF0Zm9ybSwge1xuICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXG4gICAgICAgIHBsdWdnYWJsZTogdGhpcy5wbHVnZ2FibGUsXG4gICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgICAgdG1wcGF0aDogdGhpcy50bXBwYXRoLFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMuc2NyYXBlci53b3JrZXJzZWFyY2hkYXRhKHRoaXMucGFnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEVhY2ggYnJvd3NlciB3aWxsIGdldCBOLyhLKzEpIGtleXdvcmRzIGFuZCB3aWxsIGlzc3VlIE4vKEsrMSkgKiBNIHRvdGFsIHJlcXVlc3RzIHRvIHRoZSBzZWFyY2ggZW5naW5lLlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9wdXBwZXRlZXIvaXNzdWVzLzY3OFxuICAgICAgLy8gVGhlIHF1ZXN0aW9uIGlzOiBJcyBpdCBwb3NzaWJsZSB0byBzZXQgcHJveGllcyBwZXIgUGFnZT8gUGVyIEJyb3dzZXI/XG4gICAgICAvLyBhcyBmYXIgYXMgSSBjYW4gc2VlLCBwdXBwZXRlZXIgY2x1c3RlciB1c2VzIHRoZSBzYW1lIHB1cHBldGVlck9wdGlvbnNcbiAgICAgIC8vIGZvciBldmVyeSBicm93c2VyIGluc3RhbmNlLiBXZSB3aWxsIHVzZSBvdXIgY3VzdG9tIHB1cHBldGVlci1jbHVzdGVyIHZlcnNpb24uXG4gICAgICAvLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9wcm94eS1jaGFpblxuICAgICAgLy8gdGhpcyBhbnN3ZXIgbG9va3MgbmljZTogaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9wdXBwZXRlZXIvaXNzdWVzLzY3OCNpc3N1ZWNvbW1lbnQtMzg5MDk2MDc3XG4gICAgICBsZXQgY2h1bmtzID0gW107XG4gICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHRoaXMubnVtQ2x1c3RlcnM7IG4rKykge1xuICAgICAgICBjaHVua3MucHVzaChbXSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuY29uZmlnLmtleXdvcmRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGNodW5rc1trICUgdGhpcy5udW1DbHVzdGVyc10ucHVzaCh0aGlzLmNvbmZpZy5rZXl3b3Jkc1trXSk7XG4gICAgICB9XG5cbiAgICAgIGRlYnVnKFwiY2h1bmtzPSVvXCIsIGNodW5rcyk7XG5cbiAgICAgIGxldCBleGVjUHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgY2h1bmtzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IF8uY2xvbmUodGhpcy5jb25maWcpO1xuICAgICAgICBjb25maWcua2V5d29yZHMgPSBjaHVua3NbY107XG5cbiAgICAgICAgdmFyIG9iaiA9IGdldFNjcmFwZXIodGhpcy5jb25maWcucGxhdGZvcm0sIHtcbiAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICBjb250ZXh0OiB7fSxcbiAgICAgICAgICBwbHVnZ2FibGU6IHRoaXMucGx1Z2dhYmxlLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgYm91bmRNZXRob2QgPSBvYmoud29ya2Vyc2VhcmNoZGF0YS5iaW5kKG9iaik7XG4gICAgICAgIGV4ZWNQcm9taXNlcy5wdXNoKHRoaXMuY2x1c3Rlci5leGVjdXRlKHt9LCBib3VuZE1ldGhvZCkpO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChleGVjUHJvbWlzZXMpO1xuXG4gICAgICAvLyBNZXJnZSByZXN1bHRzIGFuZCBtZXRhZGF0YSBwZXIga2V5d29yZFxuICAgICAgLy8gZm9yIChsZXQgcHJvbWlzZVJldHVybiBvZiBwcm9taXNlUmV0dXJucykge1xuICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0cywgcHJvbWlzZVJldHVybi5yZXN1bHRzKTtcbiAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKG1ldGFkYXRhLCBwcm9taXNlUmV0dXJuLm1ldGFkYXRhKTtcbiAgICAgIC8vICAgICBudW1fcmVxdWVzdHMgKz0gcHJvbWlzZVJldHVybi5udW1fcmVxdWVzdHM7XG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgLy8gbGV0IHRpbWVEZWx0YSA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XG4gICAgLy8gbGV0IG1zX3Blcl9yZXF1ZXN0ID0gdGltZURlbHRhL251bV9yZXF1ZXN0cztcblxuICAgIC8vIHRoaXMubG9nZ2VyLmluZm8oYFNjcmFwZXIgdG9vayAke3RpbWVEZWx0YX1tcyB0byBwZXJmb3JtICR7bnVtX3JlcXVlc3RzfSByZXF1ZXN0cy5gKTtcbiAgICAvLyB0aGlzLmxvZ2dlci5pbmZvKGBPbiBhdmVyYWdlIG1zL3JlcXVlc3Q6ICR7bXNfcGVyX3JlcXVlc3R9bXMvcmVxdWVzdGApO1xuXG4gICAgLy8gaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9yZXN1bHRzKSB7XG4gICAgLy8gICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9yZXN1bHRzKHJlc3VsdHMpO1xuICAgIC8vIH1cblxuICAgIC8vIG1ldGFkYXRhLmVsYXBzZWRfdGltZSA9IHRpbWVEZWx0YS50b1N0cmluZygpO1xuICAgIC8vIG1ldGFkYXRhLm1zX3Blcl9rZXl3b3JkID0gbXNfcGVyX3JlcXVlc3QudG9TdHJpbmcoKTtcbiAgICAvLyBtZXRhZGF0YS5udW1fcmVxdWVzdHMgPSBudW1fcmVxdWVzdHM7XG5cbiAgICAvLyBkZWJ1ZygnbWV0YWRhdGE9JU8nLCBtZXRhZGF0YSk7XG5cbiAgICAvLyBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX21ldGFkYXRhKSB7XG4gICAgLy8gICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9tZXRhZGF0YShtZXRhZGF0YSk7XG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKHRoaXMuY29uZmlnLm91dHB1dF9maWxlKSB7XG4gICAgLy8gICAgIHRoaXMubG9nZ2VyLmluZm8oYFdyaXRpbmcgcmVzdWx0cyB0byAke3RoaXMuY29uZmlnLm91dHB1dF9maWxlfWApO1xuICAgIC8vICAgICB3cml0ZV9yZXN1bHRzKHRoaXMuY29uZmlnLm91dHB1dF9maWxlLCBKU09OLnN0cmluZ2lmeShyZXN1bHRzLCBudWxsLCA0KSk7XG4gICAgLy8gfVxuXG4gICAgLy8gcmV0dXJuIHtcbiAgICAvLyAgICAgcmVzdWx0czogcmVzdWx0cyxcbiAgICAvLyAgICAgbWV0YWRhdGE6IG1ldGFkYXRhIHx8IHt9LFxuICAgIC8vIH07XG4gIH1cblxuICAvKlxuICAgKiBRdWl0IHRoZSBwdXBwZXRlZXIgY2x1c3Rlci9icm93c2VyLlxuICAgKi9cbiAgYXN5bmMgcXVpdCgpIHtcbiAgICBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuY2xvc2VfYnJvd3Nlcikge1xuICAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuY2xvc2VfYnJvd3NlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCB0aGlzLmNsdXN0ZXIuaWRsZSgpO1xuICAgICAgYXdhaXQgdGhpcy5jbHVzdGVyLmNsb3NlKCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTY3JhcGVNYW5hZ2VyOiBTY3JhcGVNYW5hZ2VyLFxufTtcbiIsImV4cG9ydCB7fTtcbmNvbnN0IGF4aW9zID0gcmVxdWlyZShcImF4aW9zXCIpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdSZW1vdGVTb3VyY2U6UmVtb3RlU291cmNlJyk7XG50eXBlIHNvc2V0dGluZyA9IHtcbiAgc290eXBlOiBzdHJpbmc7XG4gIHNvY2lhbHVzZXI6IHN0cmluZztcbiAgc29jaWFscGFzczogc3RyaW5nO1xuICAgICAgICAgIHByb3h5OiB7XG4gICAgICAgICAgICBwcm94eTogc3RyaW5nO1xuICAgICAgICAgICAgdXNlcjogc3RyaW5nO1xuICAgICAgICAgICAgcGFzczogc3RyaW5nO1xuICAgICAgICAgIH0sXG59XG5jbGFzcyBSZW1vdGVTb3VyY2Uge1xuICBSRU1PVEVBREQ6IHN0cmluZztcbiAgUkVNT1RFVVNFUk5BTUU6IHN0cmluZztcbiAgUkVNT1RFUEFTU1dPUkQ6IHN0cmluZztcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5yZWFkZW52KCk7XG4gICAgdGhpcy5SRU1PVEVBREQgPSBjb25maWcuUkVNT1RFQUREO1xuICAgIHRoaXMuUkVNT1RFVVNFUk5BTUUgPSBjb25maWcuUkVNT1RFVVNFUk5BTUU7XG4gICAgdGhpcy5SRU1PVEVQQVNTV09SRCA9IGNvbmZpZy5SRU1PVEVQQVNTV09SRDtcbiAgfVxuIFxuXG4gIHJlYWRlbnYoKSB7XG4gICAgLy9yZWFkIGNvbmZpZyBmcm9tIC5lbnYgZmlsZVxuICAgIGxldCBlbnZjb2ZpZyA9IHRoaXMucmVhZENvbmZpZygpO1xuICAgIGRlYnVnKGVudmNvZmlnKVxuICAgIC8vY2hlY2sga2V5IGV4aXN0IGluIG9iamVjdFxuICAgIGlmICghZW52Y29maWcuaGFzT3duUHJvcGVydHkoXCJSRU1PVEVBRERcIikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUkVNT1RFQUREIG5vdCBmb3VuZCBpbiAuZW52IGZpbGVgKTtcbiAgICB9XG4gICAgaWYgKCFlbnZjb2ZpZy5oYXNPd25Qcm9wZXJ0eShcIlJFTU9URVVTRVJOQU1FXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVTRVJOQU1FIG5vdCBmb3VuZCBpbiAuZW52IGZpbGVgKTtcbiAgICB9XG4gICAgaWYgKCFlbnZjb2ZpZy5oYXNPd25Qcm9wZXJ0eShcIlJFTU9URVBBU1NXT1JEXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBBU1NXT1JEIG5vdCBmb3VuZCBpbiAuZW52IGZpbGVgKTtcbiAgICB9XG4gICAgcmV0dXJuIGVudmNvZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlYWQgY29uZmlnIGZyb20gLmVudiBGaWxlXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IGNvbmZpZ1xuICAgKiAqL1xuICByZWFkQ29uZmlnKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlcXVpcmUoXCJkb3RlbnZcIikuY29uZmlnKCk7XG4gICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgdGhyb3cgcmVzdWx0LmVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LnBhcnNlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgcmVzcG9uc2UgZnJvbSByZW1vdGUgc2Vydml2ZVxuICAgKiBAcmV0dXJuIG9iamVjdFxuICAgKi9cbiAgYXN5bmMgZ2V0UmVtb3RlQ29uZmlnKGNhbXBhaWduSWQpOiBQcm9taXNlPHNvc2V0dGluZz4ge1xuICAgIC8vIGxldCBlbnZjb25maWcgPSBhd2FpdCByZWFkZW52KCk7XG5cbiAgICBsZXQgc29zZXR2YXIgPSBhd2FpdCBheGlvc1xuICAgICAgLmdldCh0aGlzLlJFTU9URUFERCArIFwiL2FwaS9nZXRzb2J5Q2FtLz9jYW1wYWlnbl9pZD1cIiArIGNhbXBhaWduSWQsIHtcbiAgICAgICAgYXV0aDoge1xuICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLlJFTU9URVVTRVJOQU1FLFxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLlJFTU9URVBBU1NXT1JELFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHBhcnNlSW50KHJlcy5zdGF0dXMpICE9IDIwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvZGUgbm90IGVxdWFsIDIwMFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlcy5kYXRhLnN0YXR1cykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvZGUgbm90IGVxdWFsIDIwMFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuc3RhdHVzKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhLnVzZXIpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEucGFzcylcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmRhdGEuZGF0YS5wcm94eSlcbiAgICAgICAgY29uc3Qgc29zZXR0aW5nID0ge1xuICAgICAgICAgIHNvdHlwZTogcmVzLmRhdGEuZGF0YS5zb3R5cGUsXG4gICAgICAgICAgc29jaWFsdXNlcjogcmVzLmRhdGEuZGF0YS51c2VyLFxuICAgICAgICAgIHNvY2lhbHBhc3M6IHJlcy5kYXRhLmRhdGEucGFzcyxcbiAgICAgICAgICBwcm94eToge1xuICAgICAgICAgICAgcHJveHk6IHJlcy5kYXRhLmRhdGEucHJveHkudXJsLFxuICAgICAgICAgICAgdXNlcjogcmVzLmRhdGEuZGF0YS5wcm94eS51c2VyLFxuICAgICAgICAgICAgcGFzczogcmVzLmRhdGEuZGF0YS5wcm94eS5wYXNzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBzb3NldHRpbmc7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHNvc2V0dmFyO1xuICB9XG4gIC8qKlxuICAgKiBnZXQgY2FtcGFpZ24gZnJvbSByZW1vdGUgc2Vydml2ZVxuICAgKi9cbiAgYXN5bmMgZ2V0Q2FtcGFpZ25saXN0KCkge1xuICAgIGNvbnN0IGNhbXBpZ25saXN0ID0gYXdhaXQgYXhpb3NcbiAgICAgIC5nZXQodGhpcy5SRU1PVEVBREQgKyBcIi9hcGkvbGlzdHNvdGFza1wiLCB7XG4gICAgICAgIGF1dGg6IHtcbiAgICAgICAgICB1c2VybmFtZTogdGhpcy5SRU1PVEVVU0VSTkFNRSxcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy5SRU1PVEVQQVNTV09SRCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChwYXJzZUludChyZXMuc3RhdHVzKSAhPSAyMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb2RlIG5vdCBlcXVhbCAyMDBcIik7XG4gICAgICAgIH0gXG4gICAgICAgIHJldHVybiByZXMuZGF0YS5kYXRhO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9KTtcbiAgICByZXR1cm4gY2FtcGlnbmxpc3Q7XG4gIH1cbiAgYXN5bmMgc2F2ZUxpbmtyZW1vdGUoe2RhdGF9KSB7XG4gICAgYXhpb3MucG9zdCh0aGlzLlJFTU9URUFERCArIFwiL2FwaS9zYXZlbGlua1wiLGRhdGEpXG4gICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgUmVtb3RlU291cmNlOiBSZW1vdGVTb3VyY2UsXG59O1xuIiwiY29uc3QgeyBCcm93c2VyIH0gPSByZXF1aXJlKCdwdXBwZXRlZXItY2x1c3Rlci9kaXN0L2NvbmN1cnJlbmN5L2J1aWx0SW5Db25jdXJyZW5jeScpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzZS1zY3JhcGVyOkN1c3RvbUNvbmN1cnJlbmN5Jyk7XG5jb25zdCB7IHRpbWVvdXRFeGVjdXRlIH0gPSByZXF1aXJlKCdwdXBwZXRlZXItY2x1c3Rlci9kaXN0L3V0aWwnKTtcblxuY29uc3QgQlJPV1NFUl9USU1FT1VUID0gNTAwMDtcblxuY2xhc3MgQ3VzdG9tQ29uY3VycmVuY3kgZXh0ZW5kcyBCcm93c2VyIHtcblxuICAgIGFzeW5jIGluaXQoKSB7fVxuICAgIGFzeW5jIGNsb3NlKCkge31cblxuICAgIGFzeW5jIHdvcmtlckluc3RhbmNlKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zLnBlckJyb3dzZXJPcHRpb25zLnNoaWZ0KCk7XG4gICAgICAgIGRlYnVnKCdMYXVuY2ggcHVwcGV0ZWVyIGluc3RhbmNlIHdpdGggb3B0aW9ucz0lbycsIG9wdGlvbnMpO1xuICAgICAgICBsZXQgY2hyb21lID0gYXdhaXQgdGhpcy5wdXBwZXRlZXIubGF1bmNoKG9wdGlvbnMpO1xuICAgICAgICBsZXQgcGFnZTtcbiAgICAgICAgbGV0IGNvbnRleHQ7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGpvYkluc3RhbmNlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGltZW91dEV4ZWN1dGUoQlJPV1NFUl9USU1FT1VULCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gYXdhaXQgY2hyb21lLmNyZWF0ZUluY29nbml0b0Jyb3dzZXJDb250ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2UgPSBhd2FpdCBjb250ZXh0Lm5ld1BhZ2UoKTtcbiAgICAgICAgICAgICAgICB9KSgpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBjbG9zZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGltZW91dEV4ZWN1dGUoQlJPV1NFUl9USU1FT1VULCBjb250ZXh0LmNsb3NlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjbG9zZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IGNocm9tZS5jbG9zZSgpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVwYWlyOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ1N0YXJ0aW5nIHJlcGFpcicpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdpbGwgcHJvYmFibHkgZmFpbCwgYnV0IGp1c3QgaW4gY2FzZSB0aGUgcmVwYWlyIHdhcyBub3QgbmVjZXNzYXJ5XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGNocm9tZS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgICAgICAgICAvLyBqdXN0IHJlbGF1bmNoIGFzIHRoZXJlIGlzIG9ubHkgb25lIHBhZ2UgcGVyIGJyb3dzZXJcbiAgICAgICAgICAgICAgICBjaHJvbWUgPSBhd2FpdCB0aGlzLnB1cHBldGVlci5sYXVuY2gob3B0aW9ucyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ3VzdG9tQ29uY3VycmVuY3k7IiwiY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCBjcnlwdG8gPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuY29uc3QgaHR0cHMgPSByZXF1aXJlKFwiaHR0cHNcIik7XG5jb25zdCBwcm9ncmVzcyA9IHJlcXVpcmUoXCJwcm9ncmVzcy1zdHJlYW1cIik7XG5cbmNsYXNzIFRhc2sge1xuXHRjb25zdHJ1Y3Rvcih1cmwpIHtcblx0XHR0aGlzLnVybCA9IHVybDtcblx0XHR0aGlzLmZpbmlzaGVkID0gZmFsc2U7XG5cdH1cbn1cblxuY2xhc3MgRG93bmxvYWRlciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMudHlwZSA9IFwiXCI7XG5cdFx0dGhpcy5pZCA9IFwiXCI7XG5cdFx0dGhpcy51cmwgPSBcIlwiO1xuXHRcdHRoaXMuYWlkID0gLTE7XG5cdFx0dGhpcy5waWQgPSAxO1xuXHRcdHRoaXMuY2lkID0gLTE7XG5cdFx0dGhpcy5uYW1lID0gXCJcIjtcblx0XHR0aGlzLmxpbmtzID0gW107XG5cdFx0dGhpcy50YXNrcyA9IFtdO1xuXHR9XG5cblx0Z2V0VmlkZW9VcmwodmlkZW9VcmwpIHtcblx0XHR0aGlzLnVybCA9IFwiXCI7XG5cdFx0Y29uc3QgbWFwcGluZyA9IHtcblx0XHRcdFwiQlZcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vdmlkZW8vXCIsXG5cdFx0XHRcImJ2XCI6IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL3ZpZGVvL1wiLFxuXHRcdFx0XCJhdlwiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS92aWRlby9cIixcblx0XHRcdFwiZXBcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vYmFuZ3VtaS9wbGF5L1wiLFxuXHRcdFx0XCJzc1wiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS9iYW5ndW1pL3BsYXkvXCJcblx0XHR9O1xuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG1hcHBpbmcpKSB7XG5cdFx0XHRpZiAodmlkZW9VcmwuaW5jbHVkZXMoa2V5KSkge1xuXHRcdFx0XHR0aGlzLnR5cGUgPSBrZXk7XG5cdFx0XHRcdHRoaXMuaWQgPSBrZXkgKyB2aWRlb1VybC5zcGxpdChrZXkpWzFdO1xuXHRcdFx0XHR0aGlzLnVybCA9IHZhbHVlICsgdGhpcy5pZDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YXN5bmMgZ2V0QWlkKCkge1xuXHRcdGNvbnN0IHsgdHlwZSwgdXJsIH0gPSB0aGlzO1xuXHRcdGlmICghdXJsKSByZXR1cm47XG5cdFx0cmV0dXJuIGZldGNoKHVybClcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcblx0XHRcdC50aGVuKHJlc3VsdCA9PiB7XG5cdFx0XHRcdGxldCBkYXRhID0gcmVzdWx0Lm1hdGNoKC9fX0lOSVRJQUxfU1RBVEVfXz0oLio/KTtcXChmdW5jdGlvblxcKFxcKS8pWzFdO1xuXHRcdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJJTklUSUFMIFNUQVRFXCIsIGRhdGEpO1xuXHRcdFx0XHRpZiAodHlwZSA9PT0gXCJCVlwiIHx8IHR5cGUgPT09IFwiYnZcIiB8fCB0eXBlID09PSBcImF2XCIpIHtcblx0XHRcdFx0XHR0aGlzLmFpZCA9IGRhdGEudmlkZW9EYXRhLmFpZDtcblx0XHRcdFx0XHR0aGlzLnBpZCA9IHBhcnNlSW50KHVybC5zcGxpdChcInA9XCIpWzFdLCAxMCkgfHwgMTtcblx0XHRcdFx0XHR0aGlzLmNpZCA9IGRhdGEudmlkZW9EYXRhLnBhZ2VzW3RoaXMucGlkIC0gMV0uY2lkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKHR5cGUgPT09IFwiZXBcIikge1xuXHRcdFx0XHRcdHRoaXMuYWlkID0gZGF0YS5lcEluZm8uYWlkO1xuXHRcdFx0XHRcdHRoaXMuY2lkID0gZGF0YS5lcEluZm8uY2lkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKHR5cGUgPT09IFwic3NcIikge1xuXHRcdFx0XHRcdHRoaXMuYWlkID0gZGF0YS5lcExpc3RbMF0uYWlkO1xuXHRcdFx0XHRcdHRoaXMuY2lkID0gZGF0YS5lcExpc3RbMF0uY2lkO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGVycm9yID0+IHNob3dFcnJvcihcIuiOt+WPluinhumikSBhaWQg5Ye66ZSZ77yBXCIpKTtcblx0fVxuXG5cdGFzeW5jIGdldEluZm8oKSB7XG5cdFx0Y29uc3QgeyBhaWQsIGNpZCB9ID0gdGhpcztcblx0XHRpZiAoIWNpZCkge1xuXHRcdFx0c2hvd0Vycm9yKFwi6I635Y+W6KeG6aKRIGNpZCDlh7rplJnvvIFcIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vIGdldERhbm1ha3UoKTsgLy/ojrflj5ZjaWTlkI7vvIzojrflj5bkuIvovb3pk77mjqXlkozlvLnluZXkv6Hmga9cblx0XHRyZXR1cm4gZmV0Y2goXCJodHRwczovL2FwaS5iaWxpYmlsaS5jb20veC93ZWItaW50ZXJmYWNlL3ZpZXc/YWlkPVwiICsgYWlkKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuXHRcdFx0LmNhdGNoKGVycm9yID0+IHNob3dFcnJvcihcIuiOt+WPluinhumikeS/oeaBr+WHuumUme+8gVwiKSk7XG5cdH1cblxuXHRhc3luYyBnZXREYXRhKGZhbGxiYWNrKSB7XG5cdFx0Y29uc3QgeyBjaWQsIHR5cGUgfSA9IHRoaXM7XG5cdFx0bGV0IHBsYXlVcmw7XG5cdFx0aWYgKGZhbGxiYWNrKSB7XG5cdFx0XHRjb25zdCBwYXJhbXMgPSBgY2lkPSR7Y2lkfSZtb2R1bGU9bW92aWUmcGxheWVyPTEmcXVhbGl0eT0xMTImdHM9MWA7XG5cdFx0XHRjb25zdCBzaWduID0gY3J5cHRvLmNyZWF0ZUhhc2goXCJtZDVcIikudXBkYXRlKHBhcmFtcyArIFwiOWIyODgxNDdlNTQ3NGRkMmFhNjcwODVmNzE2YzU2MGRcIikuZGlnZXN0KFwiaGV4XCIpO1xuXHRcdFx0cGxheVVybCA9IGBodHRwczovL2Jhbmd1bWkuYmlsaWJpbGkuY29tL3BsYXllci93ZWJfYXBpL3BsYXl1cmw/JHtwYXJhbXN9JnNpZ249JHtzaWdufWA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0eXBlID09PSBcIkJWXCIgfHwgdHlwZSA9PT0gXCJidlwiIHx8IHR5cGUgPT09IFwiYXZcIikge1xuXHRcdFx0XHRjb25zdCBwYXJhbXMgPSBgYXBwa2V5PWlWR1VUanN4dnBMZXVEQ2YmY2lkPSR7Y2lkfSZvdHlwZT1qc29uJnFuPTExMiZxdWFsaXR5PTExMiZ0eXBlPWA7XG5cdFx0XHRcdGNvbnN0IHNpZ24gPSBjcnlwdG8uY3JlYXRlSGFzaChcIm1kNVwiKS51cGRhdGUocGFyYW1zICsgXCJhSFJtaFdNTGtkZU11SUxxT1JuWVpvY3dNQnBNRU9kdFwiKS5kaWdlc3QoXCJoZXhcIik7XG5cdFx0XHRcdHBsYXlVcmwgPSBgaHR0cHM6Ly9pbnRlcmZhY2UuYmlsaWJpbGkuY29tL3YyL3BsYXl1cmw/JHtwYXJhbXN9JnNpZ249JHtzaWdufWA7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwbGF5VXJsID0gYGh0dHBzOi8vYXBpLmJpbGliaWxpLmNvbS9wZ2MvcGxheWVyL3dlYi9wbGF5dXJsP3FuPTgwJmNpZD0ke2NpZH1gO1xuXHRcdFx0XHRcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZldGNoKHBsYXlVcmwpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG5cdFx0XHQudGhlbihyZXN1bHQgPT4ge1xuXHRcdFx0XHRjb25zdCBkYXRhID0gZmFsbGJhY2sgPyB0aGlzLnBhcnNlRGF0YShyZXN1bHQpIDogSlNPTi5wYXJzZShyZXN1bHQpO1xuXHRcdFx0XHRjb25zdCB0YXJnZXQgPSBkYXRhLmR1cmwgfHwgZGF0YS5yZXN1bHQuZHVybDtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJQTEFZIFVSTFwiLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua3MgPSB0YXJnZXQubWFwKHBhcnQgPT4gcGFydC51cmwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2ssIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgfTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoZmFsbGJhY2spIHRocm93IEVycm9yKCk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSh0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdHNob3dFcnJvcihcIuiOt+WPliBQbGF5VXJsIOaIluS4i+i9vemTvuaOpeWHuumUme+8geeUseS6jkLnq5npmZDliLbvvIzlj6rog73kuIvovb3kvY7muIXmmbDluqbop4bpopHjgIJcIik7XG5cdFx0XHR9KTtcblx0fVxuXG5cdHBhcnNlRGF0YSh0YXJnZXQpIHtcblx0XHRjb25zdCBkYXRhID0gJCh0YXJnZXQpO1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXHRcdHJlc3VsdC5kdXJsID0gW107XG5cdFx0cmVzdWx0LnF1YWxpdHkgPSBkYXRhLmZpbmQoXCJxdWFsaXR5XCIpLnRleHQoKTtcblx0XHRkYXRhLmZpbmQoXCJkdXJsXCIpLmVhY2goKGksIG8pID0+IHtcblx0XHRcdGNvbnN0IHBhcnQgPSAkKG8pO1xuXHRcdFx0cmVzdWx0LmR1cmwucHVzaCh7XG5cdFx0XHRcdHVybDogcGFydC5maW5kKFwidXJsXCIpLnRleHQoKSxcblx0XHRcdFx0b3JkZXI6IHBhcnQuZmluZChcIm9yZGVyXCIpLnRleHQoKSxcblx0XHRcdFx0bGVuZ3RoOiBwYXJ0LmZpbmQoXCJsZW5ndGhcIikudGV4dCgpLFxuXHRcdFx0XHRzaXplOiBwYXJ0LmZpbmQoXCJzaXplXCIpLnRleHQoKVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGRvd25sb2FkQnlJbmRleChwYXJ0LCBmaWxlLCBjYWxsYmFjayA9ICgpID0+IHt9KSB7XG5cdFx0Y29uc3QgeyB1cmwgfSA9IHRoaXM7XG5cblx0XHRpZiAodGhpcy50YXNrcy5zb21lKGl0ZW0gPT4gaXRlbS51cmwgPT09IHRoaXMubGlua3NbcGFydF0pKSByZXR1cm4gXCJEVVBMSUNBVEVcIjtcblx0XHR0aGlzLnRhc2tzLnB1c2gobmV3IFRhc2sodGhpcy5saW5rc1twYXJ0XSkpO1xuXHRcdGxldCBzdGF0ZTtcblx0XHR0cnkge1xuXHRcdFx0c3RhdGUgPSBmcy5zdGF0U3luYyhmaWxlKTtcblx0XHR9XG5cdFx0Y2F0Y2ggKGVycm9yKSB7XG5cdFx0fVxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHR1cmw6IHRoaXMubGlua3NbcGFydF0sXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFwiUmFuZ2VcIjogYGJ5dGVzPSR7c3RhdGUgPyBzdGF0ZS5zaXplIDogMH0tYCwgLy/mlq3ngrnnu63kvKBcblx0XHRcdFx0XCJVc2VyLUFnZW50XCI6IFwiTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNykgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkwLjAuNDQzMC4yMTIgU2FmYXJpLzUzNy4zNlwiLFxuXHRcdFx0XHRcIlJlZmVyZXJcIjogdXJsXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRjb25zdCBzdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShmaWxlLCBzdGF0ZSA/IHsgZmxhZ3M6IFwiYVwiIH0gOiB7fSk7XG5cdFx0dGhpcy5kb3dubG9hZChvcHRpb25zLCBzdHJlYW0sIGNhbGxiYWNrKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGRvd25sb2FkKG9wdGlvbnMsIHN0cmVhbSwgY2FsbGJhY2spIHtcblx0XHQvLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9wcm9ncmVzcy1zdHJlYW1cblx0XHRjb25zdCBpbmRleCA9IHRoaXMudGFza3MuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS51cmwgPT09IG9wdGlvbnMudXJsKTtcblx0XHRjb25zdCBwcm9TdHJlYW0gPSBwcm9ncmVzcyh7XG5cdFx0XHR0aW1lOiAyNTAgLy/ljZXkvY1tc1xuXHRcdH0pLm9uKFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3MgPT4ge1xuXHRcdFx0Y29uc3QgeyBwZXJjZW50YWdlIH0gPSBwcm9ncmVzczsgLy/mmL7npLrov5vluqbmnaFcblx0XHRcdGlmIChwZXJjZW50YWdlID09PSAxMDApIHtcblx0XHRcdFx0dGhpcy50YXNrc1tpbmRleF0uZmluaXNoZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0Y2FsbGJhY2socHJvZ3Jlc3MsIGluZGV4KTtcblx0XHR9KTtcblxuXHRcdGxldCB7IHVybCB9ID0gb3B0aW9ucztcblx0XHRmdW5jdGlvbiBkb3dubG9hZExpbmsodXJsKSB7XG5cdFx0XHQodXJsLnN0YXJ0c1dpdGgoXCJodHRwc1wiKSA/IGh0dHBzIDogaHR0cCkuZ2V0KHVybCwgb3B0aW9ucywgcmVzID0+IHtcblx0XHRcdFx0aWYgKHJlcy5zdGF0dXNDb2RlID09PSAzMDIpIHtcblx0XHRcdFx0XHR1cmwgPSByZXMuaGVhZGVycy5sb2NhdGlvbjtcblx0XHRcdFx0XHRyZXR1cm4gZG93bmxvYWRMaW5rKHVybCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHJvU3RyZWFtLnNldExlbmd0aChyZXMuaGVhZGVyc1tcImNvbnRlbnQtbGVuZ3RoXCJdKTtcblx0XHRcdFx0Ly/lhYhwaXBl5YiwcHJvU3RyZWFt5YaNcGlwZeWIsOaWh+S7tueahOWGmeWFpea1geS4rVxuXHRcdFx0XHRyZXMucGlwZShwcm9TdHJlYW0pLnBpcGUoc3RyZWFtKS5vbihcImVycm9yXCIsIGVycm9yID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZG93bmxvYWRMaW5rKHVybCk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IFRhc2ssIERvd25sb2FkZXIgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBjaGVlcmlvID0gcmVxdWlyZShcImNoZWVyaW9cIik7XG5jb25zdCBTY3JhcGVyID0gcmVxdWlyZShcIi4vc29jaWFsX3NjcmFwZXJcIik7XG5jb25zdCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcbmNvbnN0IHsgRG93bmxvYWRlciB9ID0gcmVxdWlyZShcIi4vYmlsaWJpbGkvZG93bmxvYWRlci5qc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IHNhbml0aXplID0gcmVxdWlyZShcImZpbGVuYW1pZnlcIik7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKShcImJpbGliaWxpLXNjcmFwZXI6U2NyYXBlclwiKTtcbmNvbnN0IHsgYXV0b1Njcm9sbCwgZGVsYXkgfSA9IHJlcXVpcmUoXCIuL2xpYi9mdW5jdGlvbi5qc1wiKTtcbi8vIGltcG9ydCBmaWxlbmFtaWZ5IGZyb20gJ2ZpbGVuYW1pZnknO1xuLy8gY29uc3QgeyBsYXVuY2gsIGdldFN0cmVhbSB9ID0gcmVxdWlyZShcInB1cHBldGVlci1zdHJlYW1cIik7XG4vLyBjb25zdCBQdXBwZXRlZXJWaWRlb1JlY29yZGVyID0gcmVxdWlyZSgncHVwcGV0ZWVyLXZpZGVvLXJlY29yZGVyJyk7XG5jbGFzcyBCaWxpYmlsaVNjcmFwZXIgZXh0ZW5kcyBTY3JhcGVyIHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuc3RhcnRVcmwgPSBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbVwiO1xuICB9XG4gIGFzeW5jIGxvYWRfc3RhcnRfcGFnZSgpIHtcbiAgICBkZWJ1ZyhcImxvYWQgc3RhcnQgcGFnZVwiKVxuICAgIGlmICh0aGlzLmNvbmZpZy5iaWxpYmlsaV9zZXR0aW5ncykge1xuICAgICAgdGhpcy5zdGFydFVybCA9IGBodHRwczovL3d3dy4ke3RoaXMuY29uZmlnLmJpbGliaWxpX3NldHRpbmdzLmJpbGliaWxpX2RvbWFpbn1gO1xuICAgICAgaWYgKHRoaXMuY29uZmlnLmJpbGliaWxpX3NldHRpbmdzLmJpbGliaWxpX2RvbWFpbikge1xuICAgICAgICB0aGlzLnN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LiR7dGhpcy5jb25maWcuYmlsaWJpbGlfc2V0dGluZ3MuYmlsaWJpbGlfZG9tYWlufWA7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmNvbmZpZy5iaWxpYmlsaV9zZXR0aW5ncykge1xuICAgICAgICBpZiAoa2V5ICE9PSBcImJpbGliaWxpX2RvbWFpblwiKSB7XG4gICAgICAgICAgdGhpcy5zdGFydFVybCArPSBgJHtrZXl9PSR7dGhpcy5jb25maWcuYmlsaWJpbGlfc2V0dGluZ3Nba2V5XX0mYDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvL2xvZ2luIGludG8gYmlsaWJpbGlcbiAgYXN5bmMgbWFrZWxvZ2luYWN0aW9uKCkge1xuICAgIC8vIGxldCBzdGFydFVybCA9IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tXCI7XG5cbiAgICB0aGlzLmxvZ2dlci5pbmZvKFwiVXNpbmcgbG9naW5Vcmw6IFwiICsgdGhpcy5zdGFydFVybCk7XG4gICAgYXdhaXQgdGhpcy5wYWdlLnNldEJ5cGFzc0NTUCh0cnVlKTtcbiAgICB0aGlzLmxhc3RfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnBhZ2UuZ290byh0aGlzLnN0YXJ0VXJsKTtcblxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJsb2dpbiBzdWNjZXNzLCBjb29raWVzIGhhcyBiZWVuIHNhdmUgYXQgXCIgKyB0aGlzLmNvbmZpZy50bXBwYXRoXG4gICAgKTtcbiAgICAvL2NsaWNrIGxvZ2luIGJ0blxuICAgIGF3YWl0IHRoaXMucGFnZS5jbGljayhcIi5oZWFkZXItbG9naW4tZW50cnlcIik7XG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLmV2YWx1YXRlKF8gPT4ge1xuICAgIC8vIHZhciBpY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvXCIpO1xuICAgIC8vIGljb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIC8vIH0pO1xuICAgIC8vd2FpdCBsb2dpbiBib3ggc2hvd1xuICAgIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoXCIuYmlsaS1taW5pLWNvbnRlbnQtd3BcIiwge1xuICAgICAgdGltZW91dDogdGhpcy5TVEFOREFSRF9USU1FT1VULFxuICAgIH0pO1xuICAgIC8vY2xpY2sgbG9naW4gYnkgc21zXG4gICAgY29uc3QgW2J1dHRvbl0gPSBhd2FpdCB0aGlzLnBhZ2UuJHgoXCIvL2Rpdltjb250YWlucyguLCAnIOefreS/oeeZu+W9lSAnKV1cIik7XG4gICAgaWYgKGJ1dHRvbikge1xuICAgICAgYXdhaXQgYnV0dG9uLmNsaWNrKCk7XG4gICAgfVxuICAgIC8vYXdhaXQgZm9yIHVzZXIgdG8gdGFrZSBhY3Rpb25cbiAgICBhd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlbGVjdG9yKFwiLmhlYWRlci1lbnRyeS1taW5pXCIsIHsgdGltZW91dDogMCB9KTtcbiAgICAvL3VzZXIgaGFzIHN1Y2Nlc3MgbG9naW5cbiAgICAvL3NhdmUgY29va2llc1xuICAgIGNvbnN0IGNvb2tpZXMgPSBhd2FpdCB0aGlzLnBhZ2UuY29va2llcygpO1xuXG4gICAgYXdhaXQgZnMud3JpdGVGaWxlKFxuICAgICAgdGhpcy5jb25maWcudG1wcGF0aCArIFwiL2Nvb2tpZXMuanNvblwiLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoY29va2llcywgbnVsbCwgMiksXG4gICAgICAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICAgIGF3YWl0IHRoaXMucGFnZS5jbG9zZSgpO1xuICAgIC8vIGF3YWl0IHRoaXMuYnJvd3NlcnMuY2xvc2UoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdmlkZW8gbGlzdCBwYWdlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYWdlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXl3b3JkXG4gICAqIEByZXR1cm5zIGVsZW1lbnRcbiAgICovXG4gIGFzeW5jIGNsaWNrU2VhcmNoYnRuKHsgcGFnZSwga2V5d29yZCB9KSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgfVxuXG4gICAgdGhpcy5sb2dnZXIuaW5mbyhcIlVzaW5nIGxvZ2luVXJsOiBcIiArIHRoaXMuc3RhcnRVcmwpO1xuICAgIGF3YWl0IHRoaXMucGFnZS5zZXRCeXBhc3NDU1AodHJ1ZSk7XG4gICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8odGhpcy5zdGFydFVybCk7XG4gICAgYXdhaXQgcGFnZS50eXBlKFwiLm5hdi1zZWFyY2gtaW5wdXRcIiwga2V5d29yZCk7XG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLiRldmFsKFwiLm5hdi1zZWFyY2gtaW5wdXRcIiwgZnVuY3Rpb24gKGtleXdvcmQpIHtcbiAgICAvLyAgIHRoaXMudmFsdWUgPSBrZXl3b3JkO1xuICAgIC8vIH0pO1xuICAgIC8vIGF3YWl0IHBhZ2UuJGV2YWwoJy5uYXYtc2VhcmNoLWlucHV0JywgZWwgPT4gZWwudmFsdWUgPSBcIlwiKTtcbiAgICBjb25zdCBzZWFyY2hidG4gPSBhd2FpdCB0aGlzLnBhZ2UuJChcIi5uYXYtc2VhcmNoLWJ0blwiKTtcbiAgICBzZWFyY2hidG4uY2xpY2soKTtcbiAgICByZXR1cm4gc2VhcmNoYnRuO1xuICB9XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5d29yZFxuICAgKiBAcmV0dXJucyBhcnJheVxuICAgKi9cbiAgYXN5bmMgc2VhcmNoZGF0YSh7IHBhZ2UsIGtleXdvcmQgfSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0PVtdXG4gICAgaWYoQXJyYXkuaXNBcnJheShrZXl3b3JkKSl7XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2Yga2V5d29yZCkge1xuICAgICAgICBsZXQgbGlua3Jlcz1hd2FpdCB0aGlzLmdldFZpZGVvdXJscyh7IHBhZ2U6IHRoaXMucGFnZSwga2V5d29yZDogZWxlbWVudCB9KTtcbiAgICAgICAgZGVidWcobGlua3JlcylcbiAgICAgICAgZm9yKGNvbnN0IGxpbmsgb2YgbGlua3Jlcyl7IFxuICAgICAgICAgIHJlc3VsdC5wdXNoKGxpbmspXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgIH1lbHNlIGlmKHR5cGVvZiBrZXl3b3JkID09PSAnc3RyaW5nJyl7XG4gICAgICBsZXQgbGlua3Jlcz1hd2FpdCB0aGlzLmdldFZpZGVvdXJscyh7IHBhZ2U6IHRoaXMucGFnZSwga2V5d29yZDoga2V5d29yZCB9KTtcbiAgICAgIGZvcihjb25zdCBsaW5rIG9mIGxpbmtyZXMpe1xuICAgICAgICBcbiAgICAgICAgcmVzdWx0LnB1c2gobGlua3JlcylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICAgIC8vIHJldHVybiBhd2FpdCB0aGlzLmdldFZpZGVvdXJscyh7IHBhZ2U6IHRoaXMucGFnZSwga2V5d29yZDoga2V5d29yZCB9KTtcbiAgfVxuICAvL2dldCB2aWRlbyB1cmwgcmV0dXJuIGluIGFycmF5XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdCxzdHJpbmcsc3RyaW5nfVxuICAgKiBAcmV0dXJucyBhcnJheVxuICAgKi9cbiAgYXN5bmMgZ2V0VmlkZW91cmxzKHsgcGFnZSwga2V5d29yZCwgY29va2llc1BhdGggfSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgICBpZiAoY29va2llc1BhdGgpIHtcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhjb29raWVzUGF0aCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBjb29raWVzIGZpbGUgYXQgJHtjb29raWVzUGF0aH1gKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGNvb2tpZXMgPSBKU09OLnBhcnNlKGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGNvb2tpZXNQYXRoKSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhjb29raWVzKTtcbiAgICAgIGF3YWl0IHRoaXMucGFnZS5zZXRDb29raWUoLi4uY29va2llcyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VhcmNoYnRuID0gYXdhaXQgdGhpcy5jbGlja1NlYXJjaGJ0bih7XG4gICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICBrZXl3b3JkOiBrZXl3b3JkLFxuICAgIH0pO1xuICAgIGxldCBicm93c2VyID0gdGhpcy5wYWdlLmJyb3dzZXIoKTtcbiAgICBjb25zdCBuZXdQYWdlID0gYXdhaXQgYnJvd3Nlci53YWl0Rm9yVGFyZ2V0KCh0YXJnZXQpID0+XG4gICAgICB0YXJnZXQudXJsKCkuaW5jbHVkZXMoXCJzZWFyY2guYmlsaWJpbGkuY29tXCIpXG4gICAgKTtcbiAgICBjb25zdCBwYWdlcyA9IGF3YWl0IGJyb3dzZXIucGFnZXMoKTtcbiAgICBsZXQgc2VhcmNoUGFnZTtcbiAgICBmb3IgKGNvbnN0IHBhZ2Ugb2YgcGFnZXMpIHtcbiAgICAgIGNvbnN0IHBhZ2V1cmwgPSBhd2FpdCBwYWdlLnVybCgpOyAvLyBuZXcgcGFnZSBub3cgYXBwZWFyIVxuICAgICAgLy8gZGVidWcoYXdhaXQgcGFnZS50aXRsZSgpKVxuICAgICAgaWYgKHBhZ2V1cmwuaW5jbHVkZXMoXCJzZWFyY2guYmlsaWJpbGkuY29tXCIpKSB7XG4gICAgICAgIHNlYXJjaFBhZ2UgPSBwYWdlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFzZWFyY2hQYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZWFyY2ggcGFnZSBub3QgZm91bmRcIik7XG4gICAgfVxuICAgIC8vIHRoaXMucGFnZS53YWl0Rm9yKDIwMDApO1xuICAgIC8vIHRoaXMuYnJvd3Nlci5vbigndGFyZ2V0Y3JlYXRlZCcsIGZ1bmN0aW9uKCl7XG4gICAgLy8gICBjb25zb2xlLmxvZygnTmV3IFRhYiBDcmVhdGVkJyk7XG4gICAgLy8gfSk7XG4gICAgLy8gbGV0IGJyb3dzZXI9dGhpcy5wYWdlLmJyb3dzZXIoKVxuICAgIC8vIGNvbnNvbGUubG9nKFwiY3VycmVudCBwYWdlIGNvdW50IFwiLCAoYXdhaXQgYnJvd3Nlci5wYWdlcygpKS5sZW5ndGgpO1xuICAgIC8vIGNvbnN0IHRhYmxlcyA9IGF3YWl0IGJyb3dzZXIucGFnZXMoKVxuICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICBkZWJ1Zyhhd2FpdCB0YWJsZXNbaV0udGl0bGUoKSlcbiAgICAvLyB9XG5cbiAgICAvLyBjb25zdCBbdGFiT25lLCB0YWJUd29dID0gKGF3YWl0IGJyb3dzZXIucGFnZXMoKSk7XG4gICAgLy8gZGVidWcoYXdhaXQgdGFiT25lLnRpdGxlKCkpXG4gICAgLy8gZGVidWcoYXdhaXQgdGFiVHdvLnRpdGxlKCkpXG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JOYXZpZ2F0aW9uKClcbiAgICAvLyBhd2FpdCBkZWxheSg1MDAwKTtcbiAgICBhd2FpdCBhdXRvU2Nyb2xsKHNlYXJjaFBhZ2UpO1xuICAgIC8vIGF3YWl0IHBhZ2Uuc2NyZWVuc2hvdCh7XG4gICAgLy8gICBwYXRoOiAnL2hvbWUvcm9iZXJ0emVuZy9zY3JlZW5zaG90LmpwZydcbiAgICAvLyB9KTtcblxuICAgIGF3YWl0IHNlYXJjaFBhZ2Uud2FpdEZvclNlbGVjdG9yKFwiLnZ1aV9wYWdlbmF0aW9uXCIsIHsgdGltZW91dDogNTAwMCB9KTtcblxuICAgIGxldCBsaW5rcmVzID0gW107XG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLiQkKFwiYnV0dG9uLnZ1aV9idXR0b25cIiwgZWxlbWVudHM9PntcbiAgICAvLyAgIGNvbnNvbGUubG9nKGVsZW1lbnRzKVxuICAgIC8vIH0pXG4gICAgY29uc3QgbGlua1BhZ2UgPSBhd2FpdCBzZWFyY2hQYWdlLiQkKFwiYnV0dG9uLnZ1aV9idXR0b25cIik7XG4gICAgZGVidWcobGlua1BhZ2UpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlua1BhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIGF3YWl0IGF1dG9TY3JvbGwodGFiVHdvIClcbiAgICAgIC8vIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yTmF2aWdhdGlvbih7XG4gICAgICAvLyAgIHdhaXRVbnRpbDogJ25ldHdvcmtpZGxlMCcsXG4gICAgICAvLyB9KTtcbiAgICAgIC8vIGF3YWl0IGxpbmtQYWdlW2ldLmNsaWNrKClcbiAgICAgIGF3YWl0IHNlYXJjaFBhZ2UuZXZhbHVhdGUoKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5jbGljaygpO1xuICAgICAgfSwgbGlua1BhZ2VbaV0pO1xuICAgICAgY29uc3QgbGlua3MgPSBhd2FpdCB0aGlzLmdldFZpZGVvbGlzdGxpbmsoeyBwYWdlOiBzZWFyY2hQYWdlIH0pO1xuICAgICAgZGVidWcobGlua3MpO1xuICAgICAgbGlua3MubWFwKChsaW5rKSA9PiB7XG4gICAgICAgIGxpbmtyZXMucHVzaChsaW5rKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGF3YWl0IHRoaXMucGFnZS4kJGV2YWwoXCJidXR0b24udnVpX2J1dHRvblwiLCBhc3luYyBlbGVtZW50cz0+e1xuICAgIC8vICAgLy8gYXdhaXQgYXV0b1Njcm9sbCh0aGlzLnBhZ2UgKVxuICAgIC8vICAgZWxlbWVudHMubWFwKGFzeW5jIGVsZW1lbnQ9PntcbiAgICAvLyAgICAgYXdhaXQgYXV0b1Njcm9sbCh0aGlzLnBhZ2UgKVxuICAgIC8vICAgYXdhaXQgZWxlbWVudC5jbGljaygpXG4gICAgLy8gICBjb25zdCBsaW5rcz1hd2FpdCB0aGlzLmdldFZpZGVvbGlzdGxpbmsoeyBwYWdlOnRoaXMucGFnZSB9KTtcbiAgICAvLyAgIGRlYnVnKGxpbmtzKVxuICAgIC8vICAgbGlua3MubWFwKChsaW5rKT0+e1xuICAgIC8vICAgICBsaW5rcmVzLnB1c2gobGluaylcbiAgICAvLyAgIH0pXG4gICAgLy8gfSlcbiAgICAvLyB9KVxuICAgIGRlYnVnKGxpbmtyZXMpO1xuICAgIHJldHVybiBsaW5rcmVzO1xuICB9XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge3BhZ2V9IHBhZ2VcbiAgICogQHJldHVybnMgYXJyYXlcbiAgICovXG4gIGFzeW5jIGdldFZpZGVvbGlzdGxpbmsoeyBwYWdlIH0pIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG4gICAgLy8gY29uc3QgZWxIYW5kbGVBcnJheSA9IGF3YWl0IHBhZ2UuJCQoXG4gICAgLy8gICBcIi5iaWxpLXZpZGVvLWNhcmRfX2luZm8tLXJpZ2h0IGE6bnRoLWNoaWxkKDEpXCJcbiAgICAvLyApO1xuXG4gICAgLy8gbGV0IGxpbmttYXAgPSBbXTtcbiAgICBsZXQgbGlua21hcCA9IGF3YWl0IHBhZ2UuJCRldmFsKFxuICAgICAgXCIuYmlsaS12aWRlby1jYXJkX19pbmZvLS1yaWdodCA+YTpmaXJzdC1jaGlsZFwiLFxuICAgICAgKGFsaW5rcykgPT4ge1xuICAgICAgICByZXR1cm4gYWxpbmtzLm1hcCgoYWxpbmspID0+IHtcbiAgICAgICAgICB2YXIgbGlua2FyciA9IHt9O1xuICAgICAgICAgIGxpbmthcnIubGluayA9IGFsaW5rLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gICAgICAgICAgY29uc29sZS5sb2coYWxpbmspO1xuICAgICAgICAgIGh0aXRsZSA9IGFsaW5rLnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKTtcbiAgICAgICAgICBsaW5rYXJyLnRpdGxlID0gaHRpdGxlLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgICAgICAgIHJldHVybiBsaW5rYXJyO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApO1xuICAgIC8vIGRlYnVnKFwicXVlcnkgbGluayBmaW5pc2hcIik7XG4gICAgLy8gZGVidWcobGlua21hcCk7XG4gICAgLy8gZGVidWcoXCJzaG93IGxpbmsgZmluaXNoXCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKGxpbmttYXApXG5cbiAgICBhd2FpdCBsaW5rbWFwLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoIWVsZW1lbnQubGluay5pbmNsdWRlcyhcIi92aWRlby9cIikpIHtcbiAgICAgICAgLy8gZGVidWcoXCJlbGVtZW50IGhhcyB2aWRlbyBcIitlbGVtZW50KVxuICAgICAgICBsaW5rbWFwLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYXdhaXQgbGlua21hcC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGVsZW1lbnQubGluay5pbmNsdWRlcyhcIi9hcGkvXCIpKSB7XG4gICAgICAgIGRlYnVnKFwiZWxlbWVudCBoYXMgYXBpIFwiICsgZWxlbWVudCk7XG4gICAgICAgIGxpbmttYXAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvL2RlYnVnKFwiZmlsdGVyIGxpbmsgZmluaXNoXCIpO1xuICAgIGRlYnVnKGxpbmttYXApO1xuXG4gICAgcmV0dXJuIGxpbmttYXA7XG4gIH1cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYWdlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsaW5rXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2aWRlb3BhdGhcbiAgICovXG4gIGFzeW5jIGRvd25sb2FkU2lnbGVWaWRlbyh7IGxpbmssIHZpZGVvcGF0aCB9KSB7XG4gICAgLy8gaWYgKHBhZ2UpIHtcbiAgICAvLyAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgLy8gfVxuXG4gICAgLy8gY29uc29sZS5sb2cobGluaylcbiAgICAvLyBhd2FpdCB0aGlzLnBhZ2UuZ290byhsaW5rLHtcbiAgICAvLyAgIHdhaXRVbnRpbDogJ2RvbWNvbnRlbnRsb2FkZWQnLFxuICAgIC8vIH0pO1xuICAgIC8vIGNvbnNvbGUubG9nKHZpZGVvcGF0aClcbiAgICAvLyBjb25zdCBmaWxlID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0odmlkZW9wYXRoICsgXCIvdGVzdC53ZWJtXCIpO1xuICAgIC8vIGF3YWl0IHBhZ2UuZXZhbHVhdGUoYXN5bmMgKCkgPT4ge1xuICAgIC8vIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJweC1wbGF5ZXItdmlkZW8td3JhcCA+IHZpZGVvOm50aC1jaGlsZCgxKScpO1xuICAgIC8vIGNvbnNvbGUubG9nKGVsKTtcbiAgICAvLyBjb25zdCB7c3JjfSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ3NvdXJjZScpO1xuICAgIC8vIGNvbnNvbGUubG9nKHNyYyk7XG4gICAgLy8gfSk7XG4gICAgLy8gY29uc3QgaHRtbCA9IGF3YWl0IHBhZ2UuJGV2YWwoJyNiaWxpYmlsaS1wbGF5ZXInLCBlbCA9PiBlbC5vdXRlckhUTUwpO1xuICAgIC8vIGNvbnNvbGUubG9nKGh0bWwpXG4gICAgLy8gY29uc3Qgc3JjID0gYXdhaXQgcGFnZS4kZXZhbChcIiNiaWxpYmlsaS1wbGF5ZXIgdmlkZW9cIixlbCA9PiBlbC5nZXRBdHRyaWJ1dGUoXCJzcmNcIikpXG5cbiAgICBjb25zdCBkb3dubG9hZGVyID0gbmV3IERvd25sb2FkZXIoKTtcbiAgICBkb3dubG9hZGVyLmdldFZpZGVvVXJsKGxpbmspO1xuICAgIGlmICghZG93bmxvYWRlci51cmwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInZpZGVvIHVybCBpbnZhbGlkXCIpO1xuICAgIH1cbiAgICBhd2FpdCBkb3dubG9hZGVyLmdldEFpZCgpO1xuXG4gICAgbGV0IHZpZGVvcmVzID0gYXdhaXQgZG93bmxvYWRlci5nZXRJbmZvKCk7XG4gICAgZGVidWcoXCJWSURFTyBJTkZPXCIsIHZpZGVvcmVzKTtcbiAgICAvLyBjb25zdCBkb3dubG9hZFBhdGggPScvaG9tZS9yb2JlcnR6ZW5nL2Rvd25sb2FkdGVzdCc7XG4gICAgY29uc3QgZmlsZW5hbWUgPSB2aWRlb3Jlcy5kYXRhLnRpdGxlO1xuICAgIGNvbnN0IHsgZGF0YSwgZmFsbGJhY2sgfSA9IGF3YWl0IGRvd25sb2FkZXIuZ2V0RGF0YSgpO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gZGF0YS5kdXJsIHx8IGRhdGEucmVzdWx0LmR1cmw7XG4gICAgY29uc3QgcXVhbGl0eSA9IGRhdGEucXVhbGl0eSB8fCBkYXRhLnJlc3VsdC5xdWFsaXR5LFxuICAgICAgcXVhbGl0eUFycmF5ID0ge1xuICAgICAgICAxMTI6IFwiMTA4MFArXCIsXG4gICAgICAgIDgwOiBcIjEwODBQXCIsXG4gICAgICAgIDc0OiBcIjcyMFA2MFwiLFxuICAgICAgICA2NDogXCI3MjBQXCIsXG4gICAgICAgIDQ4OiBcIjcyMFBcIixcbiAgICAgICAgMzI6IFwiNDgwUFwiLFxuICAgICAgICAxNjogXCIzNjBQXCIsXG4gICAgICAgIDE1OiBcIjM2MFBcIixcbiAgICAgIH07XG4gICAgY29uc3QgdmlkZW9RdWFudGl0eSA9IHF1YWxpdHlBcnJheVtxdWFsaXR5XSB8fCBcInVua25vd25cIjtcbiAgICBjb25zb2xlLmxvZyhcInZpZGVvUXVhbnRpdHkgaXMgXCIgKyB2aWRlb1F1YW50aXR5KTtcbiAgICBpZiAoZmFsbGJhY2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImVycm9yIGhhcHBlbiB3aGVuIGdldCB2aWRlbyBkYXRhXCIpO1xuICAgIH1cbiAgICBkZWJ1ZyhcImVjaG8gdGFyZ2V0XCIpO1xuICAgIGRlYnVnKHRhcmdldCk7XG4gICAgdGFyZ2V0LmZvckVhY2goKGVsZW1lbnQsIHBhcnQpID0+IHtcbiAgICAgIGNvbnN0IGZpbGUgPSBwYXRoLmpvaW4odmlkZW9wYXRoLCBgJHtzYW5pdGl6ZShmaWxlbmFtZSl9LSR7cGFydH0uZmx2YCk7XG4gICAgICBkZWJ1ZyhcInBhcnQgaXMgJW9cIiwgcGFydCk7XG4gICAgICBkZWJ1ZyhcImZpbGUgbmFtZSAlb1wiLCBmaWxlKTtcbiAgICAgIGNvbnN0IHN0YXRlID0gZG93bmxvYWRlci5kb3dubG9hZEJ5SW5kZXgoXG4gICAgICAgIHBhcnQsXG4gICAgICAgIGZpbGUsXG4gICAgICAgIChwcm9ncmVzcywgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCB7IHNwZWVkLCBldGEsIHBlcmNlbnRhZ2UgfSA9IHByb2dyZXNzOyAvL+aYvuekuui/m+W6puadoVxuICAgICAgICAgIGNvbnNvbGUubG9nKFwic3BlZWQ6IFwiICsgTWF0aC5yb3VuZChzcGVlZCAvIDFlMykgKyBcIktCL3NcIik7XG4gICAgICAgICAgY29uc29sZS5sb2coYGV0YToke2V0YX1zYCk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvKipcbiAgICogZ2V0IHZpZGVvIGRldGFpbFxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGlua1xuICAgKi9cbiAgYXN5bmMgZ2V0VmlkZW9kZXRhaWwocGFnZSwgbGluaykge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLnBhZ2UuZ290byhsaW5rLCB7XG4gICAgICB3YWl0VW50aWw6IFwiZG9tY29udGVudGxvYWRlZFwiLFxuICAgIH0pO1xuXG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBCaWxpYmlsaVNjcmFwZXI6IEJpbGliaWxpU2NyYXBlcixcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNoZWVyaW8gPSByZXF1aXJlKCdjaGVlcmlvJyk7XG5jb25zdCBTY3JhcGVyID0gcmVxdWlyZSgnLi9zb2NpYWxfc2NyYXBlcicpO1xuXG5jbGFzcyBGYWNlYm9va1NjcmFwZXIgZXh0ZW5kcyBTY3JhcGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG4gICAgfVxuIFxuXG4gICAgYXN5bmMgbG9hZF9sb2dpbl9wYWdlKCkge1xuICAgICAgICBsZXQgc3RhcnRVcmwgPSAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tJztcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LiR7dGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MuZmFjZWJvb2tfZG9tYWlufWA7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MuZmFjZWJvb2tfZG9tYWluKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRVcmwgPSBgaHR0cHM6Ly93d3cuJHt0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncy5mYWNlYm9va19kb21haW59YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhcnRVcmwgPSBgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tYDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gJ2ZhY2Vib29rX2RvbWFpbicpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRVcmwgKz0gYCR7a2V5fT0ke3RoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzW2tleV19JmBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdVc2luZyBsb2dpblVybDogJyArIHN0YXJ0VXJsKTtcblxuICAgICAgICB0aGlzLmxhc3RfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnBhZ2UuZ290byhzdGFydFVybCk7XG5cbiAgICAgICAgLy9hd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicVwiXScsIHsgdGltZW91dDogdGhpcy5TVEFOREFSRF9USU1FT1VUIH0pO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvL3VzZXIgbG9naW4gYnkgaGFuZFxuICAgIGFzeW5jIHVzZXJsb2dpbmFjdGlvbigpe1xuXG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIEZhY2Vib29rU2NyYXBlcjogRmFjZWJvb2tTY3JhcGVyLFxufTtcbiIsIi8vc2Nyb2xsIGRvd24gdG8gdGhlIGJvdHRvbSBvZiB0aGUgcGFnZVxuYXN5bmMgZnVuY3Rpb24gYXV0b1Njcm9sbChwYWdlKXtcbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlKGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHZhciB0b3RhbEhlaWdodCA9IDA7XG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSAxMDA7XG4gICAgICAgICAgICB2YXIgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxCeSgwLCBkaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgdG90YWxIZWlnaHQgKz0gZGlzdGFuY2U7XG5cbiAgICAgICAgICAgICAgICBpZih0b3RhbEhlaWdodCA+PSBzY3JvbGxIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZGVsYXkodGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7IFxuICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIHRpbWUpXG4gICAgfSk7XG4gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdXRvU2Nyb2xsOmF1dG9TY3JvbGwsXG4gICAgZGVsYXk6ZGVsYXlcbn0iLCJjb25zdCBjaGVlcmlvID0gcmVxdWlyZSgnY2hlZXJpbycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRfaXBfZGF0YTogZ2V0X2lwX2RhdGEsXG4gICAgZ2V0X2h0dHBfaGVhZGVyczogZ2V0X2h0dHBfaGVhZGVycyxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldF9pcF9kYXRhKHBhZ2UpIHtcbiAgICBhd2FpdCBwYWdlLmdvdG8oJ2h0dHBzOi8vaXBpbmZvLmlvL2pzb24nLCB7XG4gICAgICB3YWl0TG9hZDogdHJ1ZSxcbiAgICAgIHdhaXROZXR3b3JrSWRsZTogdHJ1ZVxuICAgIH0pO1xuICAgIGxldCBqc29uID0gYXdhaXQgcGFnZS5jb250ZW50KHtcbiAgICAgICAgdGltZW91dDogMjAwMDBcbiAgICB9KTtcbiAgICBjb25zdCAkID0gY2hlZXJpby5sb2FkKGpzb24pO1xuICAgIGxldCBpcGluZm9fdGV4dCA9ICAkKCdwcmUnKS50ZXh0KCk7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoaXBpbmZvX3RleHQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRfaHR0cF9oZWFkZXJzKHBhZ2UpIHtcbiAgICBhd2FpdCBwYWdlLmdvdG8oJ2h0dHBzOi8vaHR0cGJpbi5vcmcvZ2V0Jywge1xuICAgICAgd2FpdExvYWQ6IHRydWUsXG4gICAgICB3YWl0TmV0d29ya0lkbGU6IHRydWVcbiAgICB9KTtcbiAgICBsZXQgaGVhZGVycyA9IGF3YWl0IHBhZ2UuY29udGVudCgpO1xuXG4gICAgY29uc3QgJCA9IGNoZWVyaW8ubG9hZChoZWFkZXJzKTtcbiAgICBsZXQgaGVhZGVyc190ZXh0ID0gICQoJ3ByZScpLnRleHQoKTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShoZWFkZXJzX3RleHQpO1xufSIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbWV0YSA9IHJlcXVpcmUoJy4vbWV0YWRhdGEuanMnKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc2Utc2NyYXBlcjpTY3JhcGVyJyk7XG4vKipcbiAqIHRoaXMgaXMgcGFyZW50IGNsYXNzIGZvciBzb2NpYWwgc2NyYXB5ZXIgbm9kZVxuICogICovIFxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBTb2NpYWxTY3JhcGVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgZGVidWcoJ2NvbnN0cnVjdG9yJyk7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNvbmZpZyA9IHt9LFxuICAgICAgICAgICAgY29udGV4dCA9IHt9LFxuICAgICAgICAgICAgcGx1Z2dhYmxlID0gbnVsbCxcbiAgICAgICAgICAgIHBhZ2UgPSBudWxsLFxuICAgICAgICAgICAgLy8gYnJvd3NlcnM9bnVsbFxuICAgICAgICB9ID0gb3B0aW9ucztcbiAgICAgICAgLy8gdGhpcy5icm93c2VyPWJyb3dzZXI7XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IG51bGw7IC8vIHRoZSBsYXN0IHJlc3BvbnNlIG9iamVjdFxuICAgICAgICB0aGlzLm1ldGFkYXRhID0ge1xuICAgICAgICAgICAgc2NyYXBpbmdfZGV0ZWN0ZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBsdWdnYWJsZSA9IHBsdWdnYWJsZTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gdGhpcy5jb25maWcubG9nZ2VyO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuXG4gICAgICAgIHRoaXMucHJveHkgPSBjb25maWcucHJveHk7XG4gICAgICAgIHRoaXMua2V5d29yZHMgPSBjb25maWcua2V5d29yZHM7XG5cbiAgICAgICAgdGhpcy5TVEFOREFSRF9USU1FT1VUID0gMTAwMDA7XG4gICAgICAgIHRoaXMuU09MVkVfQ0FQVENIQV9USU1FID0gNDUwMDA7XG5cbiAgICAgICAgdGhpcy5yZXN1bHRzID0ge307XG4gICAgICAgIHRoaXMucmVzdWx0X3JhbmsgPSAxO1xuICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSByZXF1ZXN0cyBkb25lXG4gICAgICAgIHRoaXMubnVtX3JlcXVlc3RzID0gMDtcbiAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUga2V5d29yZHMgc2VhcmNoZWRcbiAgICAgICAgdGhpcy5udW1fa2V5d29yZHMgPSAwO1xuXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IHRoaXMuY29uZmlnW2Ake3RoaXMuY29uZmlnLnNlYXJjaF9lbmdpbmV9X3NldHRpbmdzYF07XG4gICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IEpTT04ucGFyc2Uoc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnW2Ake3RoaXMuY29uZmlnLnNlYXJjaF9lbmdpbmV9X3NldHRpbmdzYF0gPSBzZXR0aW5ncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvL3N0YXJ0IHRvIGxvZ2luIHNvY2lhbCBtZWRpYSBwbGF0Zm9ybVxuICAgIGFzeW5jIHJ1bkxvZ2luKHsgcGFnZSwgZGF0YSwgd29ya2VyIH0pIHtcblxuICAgICAgICBkZWJ1Zygnd29ya2VyPSVvJywgd29ya2VyLCB0aGlzLmNvbmZpZy5rZXl3b3Jkcyk7XG5cbiAgICAgICAgaWYgKHBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0Vmlld3BvcnQoeyB3aWR0aDogMTI4MCwgaGVpZ2h0OiA4MDAgfSk7XG5cbiAgICAgXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZF9icm93c2VyX2VuZ2luZSgpO1xuICAgICAgICBhd2FpdCB0aGlzLm1ha2Vsb2dpbmFjdGlvbigpXG4gICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9uIHRoYXQgcnVucyBvbmx5IG9uY2UgaW4gdGhlIGJlZ2lubmluZyBvZiB0aGVcbiAgICAgKiBzY3JhcGluZyBwcm9jZWR1cmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gdHJ1ZSBpZiBldmVyeXRoaW5nIGlzIGNvcnJlY3QuXG4gICAgICovXG4gICAgYXN5bmMgbG9hZF9icm93c2VyX2VuZ2luZSgpIHtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuYXBwbHlfZXZhc2lvbl90ZWNobmlxdWVzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IGRldGVjdGlvbiBieSBldmFkaW5nIGNvbW1vbiBkZXRlY3Rpb24gdGVjaG5pcXVlc1xuICAgICAgICAgICAgYXdhaXQgZXZhZGVDaHJvbWVIZWFkbGVzc0RldGVjdGlvbih0aGlzLnBhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYmxvY2sgc29tZSBhc3NldHMgdG8gc3BlZWQgdXAgc2NyYXBpbmdcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmJsb2NrX2Fzc2V0cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNldFJlcXVlc3RJbnRlcmNlcHRpb24odHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLnBhZ2Uub24oJ3JlcXVlc3QnLCAocmVxKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSByZXEucmVzb3VyY2VUeXBlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2sgPSBbJ3N0eWxlc2hlZXQnLCAnZm9udCcsICdpbWFnZScsICdtZWRpYSddO1xuICAgICAgICAgICAgICAgIGlmIChibG9jay5pbmNsdWRlcyh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXEuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXEuY29udGludWUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy50ZXN0X2V2YXNpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIE5hdmlnYXRlIHRvIHRoZSBwYWdlIHRoYXQgd2lsbCBwZXJmb3JtIHRoZSB0ZXN0cy5cbiAgICAgICAgICAgIGNvbnN0IHRlc3RVcmwgPSAnaHR0cHM6Ly9ib3Quc2Fubnlzb2Z0LmNvbSc7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBhZ2UuZ290byh0ZXN0VXJsKTtcbiAgICAgICAgICAgIC8vIFNhdmUgYSBzY3JlZW5zaG90IG9mIHRoZSByZXN1bHRzLlxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNjcmVlbnNob3QoeyBwYXRoOiAnaGVhZGxlc3MtZXZhc2lvbi1yZXN1bHQucG5nJyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5sb2dfaHR0cF9oZWFkZXJzID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLm1ldGFkYXRhLmh0dHBfaGVhZGVycyA9IGF3YWl0IG1ldGEuZ2V0X2h0dHBfaGVhZGVycyh0aGlzLnBhZ2UpO1xuICAgICAgICAgICAgZGVidWcoJ3RoaXMubWV0YWRhdGEuaHR0cF9oZWFkZXJzPSVPJywgdGhpcy5tZXRhZGF0YS5odHRwX2hlYWRlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmxvZ19pcF9hZGRyZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsZXQgaXBpbmZvID0gYXdhaXQgbWV0YS5nZXRfaXBfZGF0YSh0aGlzLnBhZ2UpO1xuICAgICAgICAgICAgdGhpcy5tZXRhZGF0YS5pcGluZm8gPSBpcGluZm87XG4gICAgICAgICAgICBkZWJ1ZygndGhpcy5tZXRhZGF0YS5pcGluZm8nLCB0aGlzLm1ldGFkYXRhLmlwaW5mbyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayB0aGF0IG91ciBwcm94eSBpcyB3b3JraW5nIGJ5IGNvbmZpcm1pbmdcbiAgICAgICAgLy8gdGhhdCBpcGluZm8uaW8gc2VlcyB0aGUgcHJveHkgSVAgYWRkcmVzc1xuICAgICAgICBpZiAodGhpcy5wcm94eSAmJiB0aGlzLmNvbmZpZy5sb2dfaXBfYWRkcmVzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZGVidWcoYCR7dGhpcy5tZXRhZGF0YS5pcGluZm8uaXB9IHZzICR7dGhpcy5wcm94eX1gKTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIGlwIHJldHVybmVkIGJ5IGlwaW5mbyBpcyBub3QgYSBzdWJzdHJpbmcgb2Ygb3VyIHByb3h5c3RyaW5nLCBnZXQgdGhlIGhlY2sgb3V0dGEgaGVyZVxuICAgICAgICAgICAgaWYgKCF0aGlzLnByb3h5LmluY2x1ZGVzKHRoaXMubWV0YWRhdGEuaXBpbmZvLmlwKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUHJveHkgb3V0cHV0IGlwICR7dGhpcy5wcm94eX0gZG9lcyBub3QgbWF0Y2ggd2l0aCBwcm92aWRlZCBvbmVgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgVXNpbmcgdmFsaWQgUHJveHk6ICR7dGhpcy5wcm94eX1gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubG9hZF9zdGFydF9wYWdlKCk7XG4gICAgfVxuICAgIC8qKlxuICAqXG4gICogQHJldHVybnMgdHJ1ZSBpZiBzdGFydHBhZ2Ugd2FzIGxvYWRlZCBjb3JyZWN0bHkuXG4gICovXG4gICAgYXN5bmMgbG9hZF9sb2dpbl9wYWdlKCkge1xuXG4gICAgfVxuICAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgc3RhcnRwYWdlIHdhcyBsb2FkZWQgY29ycmVjdGx5LlxuICAgICAqL1xuICAgICBhc3luYyBsb2FkX3N0YXJ0X3BhZ2UoKSB7XG5cbiAgICAgfVxuICAgIC8qKlxuICAgICAqIG1ha2UgbG9naW4gYWN0aW9uXG4gICAgICovXG4gICAgYXN5bmMgbWFrZWxvZ2luYWN0aW9uKCl7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogdXNlciBsb2dpbiBieSB0aGVpciBoYW5kXG4gICAgICovXG4gICAgYXN5bmMgdXNlcmxvZ2luYWN0aW9uKCkge1xuXG4gICAgfVxuXG4gICAgYXN5bmMgc2VhcmNoZGF0YSgpIHtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiB1c2Ugd29ya2VyIHRvIHNlYXJjaCBkYXRhXG4gICAgICogQHBhcmFtIGFycmF5IGtleXdvcmQgXG4gICAgICovXG4gICAgYXN5bmMgd29ya2Vyc2VhcmNoZGF0YSh7cGFnZSx3b3JrZXJ9KSB7XG4gICAgICAgICBkZWJ1Zygnd29ya2VyPSVvJywgd29ya2VyLCB0aGlzLmNvbmZpZy5rZXl3b3Jkcyk7XG5cbiAgICAgICAgaWYgKHBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0Vmlld3BvcnQoeyB3aWR0aDogMTI4MCwgaGVpZ2h0OiA4MDAgfSk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9hZF9icm93c2VyX2VuZ2luZSgpXG4gICAgICAgIGNvbnN0IGxpbmtzPWF3YWl0IHRoaXMuc2VhcmNoZGF0YSh7a2V5d29yZDp0aGlzLmNvbmZpZy5rZXl3b3Jkc30pXG4gICAgICAgIGRlYnVnKGxpbmtzKVxuICAgIH1cblxufVxuLy8gVGhpcyBpcyB3aGVyZSB3ZSdsbCBwdXQgdGhlIGNvZGUgdG8gZ2V0IGFyb3VuZCB0aGUgdGVzdHMuXG5hc3luYyBmdW5jdGlvbiBldmFkZUNocm9tZUhlYWRsZXNzRGV0ZWN0aW9uKHBhZ2UpIHtcblxuICAgIC8vIFBhc3MgdGhlIFdlYmRyaXZlciBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3UHJvdG8gPSBuYXZpZ2F0b3IuX19wcm90b19fO1xuICAgICAgICBkZWxldGUgbmV3UHJvdG8ud2ViZHJpdmVyO1xuICAgICAgICBuYXZpZ2F0b3IuX19wcm90b19fID0gbmV3UHJvdG87XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBDaHJvbWUgVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIC8vIFdlIGNhbiBtb2NrIHRoaXMgaW4gYXMgbXVjaCBkZXB0aCBhcyB3ZSBuZWVkIGZvciB0aGUgdGVzdC5cbiAgICAgICAgY29uc3QgbW9ja09iaiA9IHtcbiAgICAgICAgICAgIGFwcDoge1xuICAgICAgICAgICAgICAgIGlzSW5zdGFsbGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3ZWJzdG9yZToge1xuICAgICAgICAgICAgICAgIG9uSW5zdGFsbFN0YWdlQ2hhbmdlZDoge30sXG4gICAgICAgICAgICAgICAgb25Eb3dubG9hZFByb2dyZXNzOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBydW50aW1lOiB7XG4gICAgICAgICAgICAgICAgUGxhdGZvcm1Pczoge1xuICAgICAgICAgICAgICAgICAgICBNQUM6ICdtYWMnLFxuICAgICAgICAgICAgICAgICAgICBXSU46ICd3aW4nLFxuICAgICAgICAgICAgICAgICAgICBBTkRST0lEOiAnYW5kcm9pZCcsXG4gICAgICAgICAgICAgICAgICAgIENST1M6ICdjcm9zJyxcbiAgICAgICAgICAgICAgICAgICAgTElOVVg6ICdsaW51eCcsXG4gICAgICAgICAgICAgICAgICAgIE9QRU5CU0Q6ICdvcGVuYnNkJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFBsYXRmb3JtQXJjaDoge1xuICAgICAgICAgICAgICAgICAgICBBUk06ICdhcm0nLFxuICAgICAgICAgICAgICAgICAgICBYODZfMzI6ICd4ODYtMzInLFxuICAgICAgICAgICAgICAgICAgICBYODZfNjQ6ICd4ODYtNjQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgUGxhdGZvcm1OYWNsQXJjaDoge1xuICAgICAgICAgICAgICAgICAgICBBUk06ICdhcm0nLFxuICAgICAgICAgICAgICAgICAgICBYODZfMzI6ICd4ODYtMzInLFxuICAgICAgICAgICAgICAgICAgICBYODZfNjQ6ICd4ODYtNjQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgUmVxdWVzdFVwZGF0ZUNoZWNrU3RhdHVzOiB7XG4gICAgICAgICAgICAgICAgICAgIFRIUk9UVExFRDogJ3Rocm90dGxlZCcsXG4gICAgICAgICAgICAgICAgICAgIE5PX1VQREFURTogJ25vX3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIFVQREFURV9BVkFJTEFCTEU6ICd1cGRhdGVfYXZhaWxhYmxlJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIE9uSW5zdGFsbGVkUmVhc29uOiB7XG4gICAgICAgICAgICAgICAgICAgIElOU1RBTEw6ICdpbnN0YWxsJyxcbiAgICAgICAgICAgICAgICAgICAgVVBEQVRFOiAndXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgQ0hST01FX1VQREFURTogJ2Nocm9tZV91cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBTSEFSRURfTU9EVUxFX1VQREFURTogJ3NoYXJlZF9tb2R1bGVfdXBkYXRlJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIE9uUmVzdGFydFJlcXVpcmVkUmVhc29uOiB7XG4gICAgICAgICAgICAgICAgICAgIEFQUF9VUERBVEU6ICdhcHBfdXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgT1NfVVBEQVRFOiAnb3NfdXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgUEVSSU9ESUM6ICdwZXJpb2RpYycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgd2luZG93Lm5hdmlnYXRvci5jaHJvbWUgPSBtb2NrT2JqO1xuICAgICAgICB3aW5kb3cuY2hyb21lID0gbW9ja09iajtcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdGhlIFBlcm1pc3Npb25zIFRlc3QuXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICBjb25zdCBvcmlnaW5hbFF1ZXJ5ID0gd2luZG93Lm5hdmlnYXRvci5wZXJtaXNzaW9ucy5xdWVyeTtcbiAgICAgICAgd2luZG93Lm5hdmlnYXRvci5wZXJtaXNzaW9ucy5fX3Byb3RvX18ucXVlcnkgPSBwYXJhbWV0ZXJzID0+XG4gICAgICAgICAgICBwYXJhbWV0ZXJzLm5hbWUgPT09ICdub3RpZmljYXRpb25zJ1xuICAgICAgICAgICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKHtzdGF0ZTogTm90aWZpY2F0aW9uLnBlcm1pc3Npb259KVxuICAgICAgICAgICAgICAgIDogb3JpZ2luYWxRdWVyeShwYXJhbWV0ZXJzKTtcblxuICAgICAgICAvLyBJbnNwaXJlZCBieTogaHR0cHM6Ly9naXRodWIuY29tL2lrYXJpZW5hdG9yL3BoYW50b21qc19oaWRlX2FuZF9zZWVrL2Jsb2IvbWFzdGVyLzUuc3Bvb2ZGdW5jdGlvbkJpbmQuanNcbiAgICAgICAgY29uc3Qgb2xkQ2FsbCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNhbGwoKSB7XG4gICAgICAgICAgICByZXR1cm4gb2xkQ2FsbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwgPSBjYWxsO1xuXG4gICAgICAgIGNvbnN0IG5hdGl2ZVRvU3RyaW5nRnVuY3Rpb25TdHJpbmcgPSBFcnJvci50b1N0cmluZygpLnJlcGxhY2UoL0Vycm9yL2csIFwidG9TdHJpbmdcIik7XG4gICAgICAgIGNvbnN0IG9sZFRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZ1bmN0aW9uVG9TdHJpbmcoKSB7XG4gICAgICAgICAgICBpZiAodGhpcyA9PT0gd2luZG93Lm5hdmlnYXRvci5wZXJtaXNzaW9ucy5xdWVyeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcImZ1bmN0aW9uIHF1ZXJ5KCkgeyBbbmF0aXZlIGNvZGVdIH1cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzID09PSBmdW5jdGlvblRvU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZVRvU3RyaW5nRnVuY3Rpb25TdHJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2xkQ2FsbC5jYWxsKG9sZFRvU3RyaW5nLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uVG9TdHJpbmc7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBQbHVnaW5zIExlbmd0aCBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgLy8gT3ZlcndyaXRlIHRoZSBgcGx1Z2luc2AgcHJvcGVydHkgdG8gdXNlIGEgY3VzdG9tIGdldHRlci5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5hdmlnYXRvciwgJ3BsdWdpbnMnLCB7XG4gICAgICAgICAgICAvLyBUaGlzIGp1c3QgbmVlZHMgdG8gaGF2ZSBgbGVuZ3RoID4gMGAgZm9yIHRoZSBjdXJyZW50IHRlc3QsXG4gICAgICAgICAgICAvLyBidXQgd2UgY291bGQgbW9jayB0aGUgcGx1Z2lucyB0b28gaWYgbmVjZXNzYXJ5LlxuICAgICAgICAgICAgZ2V0OiAoKSA9PiBbMSwgMiwgMywgNCwgNV1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBMYW5ndWFnZXMgVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIC8vIE92ZXJ3cml0ZSB0aGUgYHBsdWdpbnNgIHByb3BlcnR5IHRvIHVzZSBhIGN1c3RvbSBnZXR0ZXIuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXZpZ2F0b3IsICdsYW5ndWFnZXMnLCB7XG4gICAgICAgICAgICBnZXQ6ICgpID0+IFsnZW4tVVMnLCAnZW4nXVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdGhlIGlmcmFtZSBUZXN0XG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSFRNTElGcmFtZUVsZW1lbnQucHJvdG90eXBlLCAnY29udGVudFdpbmRvdycsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0b1N0cmluZyB0ZXN0LCB0aG91Z2ggaXQgYnJlYWtzIGNvbnNvbGUuZGVidWcoKSBmcm9tIHdvcmtpbmdcbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmRlYnVnID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjaGVlcmlvID0gcmVxdWlyZSgnY2hlZXJpbycpO1xuY29uc3QgU2NyYXBlciA9IHJlcXVpcmUoJy4vc29jaWFsX3NjcmFwZXInKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY2xhc3MgWW91dHViZVNjcmFwZXIgZXh0ZW5kcyBTY3JhcGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7ICAgIFxuICAgIH1cblxuXG4gICAgYXN5bmMgbG9hZF9sb2dpbl9wYWdlKCkge1xuICAgICAgICBcbiAgICAgICAgLy8gYXdhaXQgdGhpcy5wYWdlLnNldFJlcXVlc3RJbnRlcmNlcHRpb24odHJ1ZSk7XG4gICAgICAgIC8vd2hldGhlciB0byBkaXNhYmxlIGltYWdlIGxvYWRpbmdcbiAgICAgICAgICAgIC8vIHRoaXMucGFnZS5vbigncmVxdWVzdCcsIHJlcXVlc3QgPT4ge1xuICAgICAgICAgICAgLy8gICAgIGlmIChyZXF1ZXN0LnJlc291cmNlVHlwZSgpID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICByZXF1ZXN0LmNvbnRpbnVlKCk7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgIGxldCBzdGFydFVybCA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbSc7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnlvdXR1YmVfc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LiR7dGhpcy5jb25maWcueW91dHViZV9zZXR0aW5ncy55b3V0dWJlX2RvbWFpbn1gO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnlvdXR1YmVfc2V0dGluZ3MueW91dHViZV9kb21haW4pIHtcbiAgICAgICAgICAgICAgICBzdGFydFVybCA9IGBodHRwczovL3d3dy4ke3RoaXMuY29uZmlnLnlvdXR1YmVfc2V0dGluZ3MueW91dHViZV9kb21haW59YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhcnRVcmwgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb21gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAneW91dHViZV9kb21haW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VXJsICs9IGAke2tleX09JHt0aGlzLmNvbmZpZy55b3V0dWJlX3NldHRpbmdzW2tleV19JmBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdVc2luZyBsb2dpblVybDogJyArIHN0YXJ0VXJsKTtcbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNldEJ5cGFzc0NTUCh0cnVlKTtcbiAgICAgICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8oc3RhcnRVcmwpO1xuICAgICAgICBcbiAgICAgICAgLy9oaWRkZW4gaWNvblxuICAgICAgICBhd2FpdCB0aGlzLnBhZ2UuZXZhbHVhdGUoXyA9PiB7XG4gICAgICAgIHZhciBpY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvLWljb25cIik7XG4gICAgICAgIGljb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb25maWcudG1wcGF0aClcbiAgICAgICAgLy9hd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicVwiXScsIHsgdGltZW91dDogdGhpcy5TVEFOREFSRF9USU1FT1VUIH0pO1xuICAgICAgICAvL2F3YWl0IGZvciB1c2VyIHRvIHRha2UgYWN0aW9uXG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoJyNhdmF0YXItYnRuJyx7J3RpbWVvdXQnOjB9KTtcbiAgICAgICAgLy91c2VyIGhhcyBzdWNjZXNzIGxvZ2luXG4gICAgICAgIC8vc2F2ZSBjb29raWVzIFxuICAgICAgICBjb25zdCBjb29raWVzID0gYXdhaXQgdGhpcy5wYWdlLmNvb2tpZXMoKTtcbiAgICAgICAgXG4gICAgICAgIGF3YWl0IGZzLndyaXRlRmlsZSh0aGlzLmNvbmZpZy50bXBwYXRoKycvY29va2llcy5qc29uJywgSlNPTi5zdHJpbmdpZnkoY29va2llcywgbnVsbCwgMikpO1xuICAgICAgICBhd2FpdCBicm93c2VyLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgWW91dHViZVNjcmFwZXI6IFlvdXR1YmVTY3JhcGVyLFxufTtcbiIsImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUNvbnRleHQocmVxKSB7XG5cdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHR0aHJvdyBlO1xufVxud2VicGFja0VtcHR5Q29udGV4dC5rZXlzID0gKCkgPT4gKFtdKTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gXCIuL3NyYyBzeW5jIHJlY3Vyc2l2ZVwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlDb250ZXh0OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFyZ3BhcnNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoZWVyaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZGVidWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpbGVuYW1pZnlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJvZ3Jlc3Mtc3RyZWFtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItY2x1c3RlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItY2x1c3Rlci9kaXN0L2NvbmN1cnJlbmN5L2J1aWx0SW5Db25jdXJyZW5jeVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItY2x1c3Rlci9kaXN0L3V0aWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVzZXItYWdlbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3J1bi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==