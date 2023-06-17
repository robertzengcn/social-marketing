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
var Scraper = __webpack_require__(/*! ./src/modules/social_scraper */ "./src/modules/social_scraper.ts");
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
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var remotesource, campaignlist, arrLength, _i, campaignlist_1, campaign;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    remotesource = new RemoteSource();
                    return [4 /*yield*/, remotesource.getCampaignlist()];
                case 1:
                    campaignlist = _b.sent();
                    debug(campaignlist);
                    if (!campaignlist) {
                        throw new Error("campaignlist is undefined");
                    }
                    arrLength = (_a = campaignlist === null || campaignlist === void 0 ? void 0 : campaignlist.length) !== null && _a !== void 0 ? _a : 0;
                    if (arrLength == 0) {
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

/***/ "./src/modules/social_scraper.ts":
/*!***************************************!*\
  !*** ./src/modules/social_scraper.ts ***!
  \***************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

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
var meta = __webpack_require__(/*! ./metadata.js */ "./src/modules/metadata.js");
var debug = __webpack_require__(/*! debug */ "debug")('se-scraper:Scraper');
/**
 * this is parent class for social scrapyer node
 *  */
module.exports = /** @class */ (function () {
    function SocialScraper(options) {
        debug('constructor');
        // const {
        //     // config = {},
        //     context = {},
        //     // pluggable = null,
        //     page = null,
        //     // browsers=null
        // } = options;
        // this.browser=browser;
        this.page = options.page;
        this.last_response = null; // the last response object
        this.metadata = {
            scraping_detected: false,
        };
        this.pluggable = options.pluggable;
        this.config = options.config;
        this.logger = this.config.logger;
        this.context = options.context;
        this.proxy = options.config.proxy;
        this.keywords = options.config.keywords;
        this.STANDARD_TIMEOUT = 10000;
        this.SOLVE_CAPTCHA_TIME = 45000;
        this.results = {};
        this.result_rank = 1;
        // keep track of the requests done
        this.num_requests = 0;
        // keep track of the keywords searched
        this.num_keywords = 0;
        var settings = this.config["".concat(this.config.search_engine, "_settings")];
        if (settings) {
            if (typeof settings === 'string') {
                settings = JSON.parse(settings);
                this.config["".concat(this.config.search_engine, "_settings")] = settings;
            }
        }
    }
    /**
     * login social media platform
     * @param runobj
     *
     */
    SocialScraper.prototype.runLogin = function (runobj) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        debug('worker=%o', runobj.worker, this.config.keywords);
                        if (runobj.page) {
                            this.page = runobj.page;
                        }
                        return [4 /*yield*/, ((_a = this.page) === null || _a === void 0 ? void 0 : _a.setViewport({ width: 1280, height: 800 }))];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.load_browser_engine()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.makeloginaction()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Action that runs only once in the beginning of the
     * scraping procedure.
     *
     * @returns {Promise<void>} true if everything is correct.
     */
    SocialScraper.prototype.load_browser_engine = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var testUrl, _d, ipinfo;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!(this.config.apply_evasion_techniques === true)) return [3 /*break*/, 2];
                        // prevent detection by evading common detection techniques
                        return [4 /*yield*/, evadeChromeHeadlessDetection(this.page)];
                    case 1:
                        // prevent detection by evading common detection techniques
                        _e.sent();
                        _e.label = 2;
                    case 2:
                        if (!(this.config.block_assets === true)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.page.setRequestInterception(true)];
                    case 3:
                        _e.sent();
                        this.page.on('request', function (req) {
                            var type = req.resourceType();
                            var block = ['stylesheet', 'font', 'image', 'media'];
                            if (block.includes(type)) {
                                req.abort();
                            }
                            else {
                                req.continue();
                            }
                        });
                        _e.label = 4;
                    case 4:
                        if (!(this.config.test_evasion === true)) return [3 /*break*/, 7];
                        testUrl = 'https://bot.sannysoft.com';
                        return [4 /*yield*/, this.page.goto(testUrl)];
                    case 5:
                        _e.sent();
                        // Save a screenshot of the results.
                        return [4 /*yield*/, this.page.screenshot({ path: 'headless-evasion-result.png' })];
                    case 6:
                        // Save a screenshot of the results.
                        _e.sent();
                        _e.label = 7;
                    case 7:
                        if (!(this.config.log_http_headers === true)) return [3 /*break*/, 9];
                        _d = this.metadata;
                        return [4 /*yield*/, meta.get_http_headers(this.page)];
                    case 8:
                        _d.http_headers = _e.sent();
                        debug('this.metadata.http_headers=%O', this.metadata.http_headers);
                        _e.label = 9;
                    case 9:
                        if (!(this.config.log_ip_address === true)) return [3 /*break*/, 11];
                        return [4 /*yield*/, meta.get_ip_data(this.page)];
                    case 10:
                        ipinfo = _e.sent();
                        this.metadata.ipinfo = ipinfo;
                        debug('this.metadata.ipinfo', this.metadata.ipinfo);
                        _e.label = 11;
                    case 11:
                        // check that our proxy is working by confirming
                        // that ipinfo.io sees the proxy IP address
                        if (this.proxy && this.config.log_ip_address === true) {
                            debug("".concat((_a = this.metadata.ipinfo) === null || _a === void 0 ? void 0 : _a.ip, " vs ").concat(this.proxy));
                            // if the ip returned by ipinfo is not a substring of our proxystring, get the heck outta here
                            if (((_b = this.metadata.ipinfo) === null || _b === void 0 ? void 0 : _b.ip) && (!this.proxy.includes((_c = this.metadata.ipinfo) === null || _c === void 0 ? void 0 : _c.ip))) {
                                throw new Error("Proxy output ip ".concat(this.proxy, " does not match with provided one"));
                            }
                            else {
                                this.logger.info("Using valid Proxy: ".concat(this.proxy));
                            }
                        }
                        return [4 /*yield*/, this.load_start_page()];
                    case 12: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    /**
  *
  * @returns true if startpage was loaded correctly.
  */
    SocialScraper.prototype.load_login_page = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
    *
    * @returns true if startpage was loaded correctly.
    */
    SocialScraper.prototype.load_start_page = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * make login action
     */
    SocialScraper.prototype.makeloginaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * user login by their hand
     */
    SocialScraper.prototype.userloginaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    SocialScraper.prototype.searchdata = function (seachobj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * use worker to search data
     * @param object keyword
     */
    SocialScraper.prototype.workersearchdata = function (workerseach) {
        return __awaiter(this, void 0, void 0, function () {
            var links;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debug('worker=%o', workerseach.worker, this.config.keywords);
                        if (workerseach.page) {
                            this.page = workerseach.page;
                        }
                        return [4 /*yield*/, this.page.setViewport({ width: 1280, height: 800 })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.load_browser_engine()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.searchdata({ keyword: this.config.keywords })];
                    case 3:
                        links = _a.sent();
                        debug(links);
                        return [2 /*return*/];
                }
            });
        });
    };
    return SocialScraper;
}());
// This is where we'll put the code to get around the tests.
function evadeChromeHeadlessDetection(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Pass the Webdriver Test.
                return [4 /*yield*/, page.evaluateOnNewDocument(function () {
                        // const newProto = navigator.__proto__;
                        var newProto = Object.getPrototypeOf(navigator);
                        delete newProto.webdriver;
                        // navigator.__proto__ = newProto;
                        Object.setPrototypeOf(navigator, newProto);
                    })];
                case 1:
                    // Pass the Webdriver Test.
                    _a.sent();
                    // Pass the Chrome Test.
                    return [4 /*yield*/, page.evaluateOnNewDocument(function () {
                            // interface mockObjType extends typeof chrome {
                            //     chrome: object,
                            // }
                            // We can mock this in as much depth as we need for the test.
                            var mockObj = {
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
                            // if(window.navigator.chrome){
                            // window.navigator.chrome = mockObj;
                            // }
                            // window.chrome = mockObj;
                        })];
                case 2:
                    // Pass the Chrome Test.
                    _a.sent();
                    // Pass the Permissions Test.
                    return [4 /*yield*/, page.evaluateOnNewDocument(function () {
                            var originalQuery = window.navigator.permissions.query;
                            // window.navigator.permissions.__proto__.query = parameters =>
                            Object.getPrototypeOf(window.navigator.permissions).query = function (parameters) {
                                return parameters.name === 'notifications'
                                    ? Promise.resolve({ state: Notification.permission })
                                    : originalQuery(parameters);
                            };
                            // Inspired by: https://github.com/ikarienator/phantomjs_hide_and_seek/blob/master/5.spoofFunctionBind.js
                            var oldCall = Function.prototype.call;
                            function call() {
                                return oldCall.apply(this, arguments);
                            }
                            Function.prototype.call = call;
                            var nativeToStringFunctionString = Error.toString().replace(/Error/g, "toString");
                            var oldToString = Function.prototype.toString;
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
                        })];
                case 3:
                    // Pass the Permissions Test.
                    _a.sent();
                    // Pass the Plugins Length Test.
                    return [4 /*yield*/, page.evaluateOnNewDocument(function () {
                            // Overwrite the `plugins` property to use a custom getter.
                            Object.defineProperty(navigator, 'plugins', {
                                // This just needs to have `length > 0` for the current test,
                                // but we could mock the plugins too if necessary.
                                get: function () { return [1, 2, 3, 4, 5]; }
                            });
                        })];
                case 4:
                    // Pass the Plugins Length Test.
                    _a.sent();
                    // Pass the Languages Test.
                    return [4 /*yield*/, page.evaluateOnNewDocument(function () {
                            // Overwrite the `plugins` property to use a custom getter.
                            Object.defineProperty(navigator, 'languages', {
                                get: function () { return ['en-US', 'en']; }
                            });
                        })];
                case 5:
                    // Pass the Languages Test.
                    _a.sent();
                    // Pass the iframe Test
                    return [4 /*yield*/, page.evaluateOnNewDocument(function () {
                            Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {
                                get: function () {
                                    return window;
                                }
                            });
                        })];
                case 6:
                    // Pass the iframe Test
                    _a.sent();
                    // Pass toString test, though it breaks console.debug() from working
                    return [4 /*yield*/, page.evaluateOnNewDocument(function () {
                            window.console.debug = function () {
                                return null;
                            };
                        })];
                case 7:
                    // Pass toString test, though it breaks console.debug() from working
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}


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
                            if (!res.data.data) {
                                throw new Error("data not exist");
                            }
                            return res.data.data;
                        })
                            .catch(function (error) {
                            throw new Error("code not equal 200");
                            // console.error(error);
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
const Scraper = __webpack_require__(/*! ./social_scraper */ "./src/modules/social_scraper.ts");
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
const Scraper = __webpack_require__(/*! ./social_scraper */ "./src/modules/social_scraper.ts");

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

/***/ "./src/modules/youtube_scraper.js":
/*!****************************************!*\
  !*** ./src/modules/youtube_scraper.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cheerio = __webpack_require__(/*! cheerio */ "cheerio");
const Scraper = __webpack_require__(/*! ./social_scraper */ "./src/modules/social_scraper.ts");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxHQUFHLGtDQUFrQztBQUM1RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLCtEQUErRCxnQ0FBZ0M7QUFDL0Y7QUFDQSx1REFBdUQsWUFBWTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDUkE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3J1bi50cyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvc29jaWFsX3NjcmFwZXIudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9ub2RlX3NvY2lhbG1rLnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvcmVtb3Rlc291cmNlLnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvY29uY3VycmVuY3ktaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL2JpbGliaWxpL2Rvd25sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL2JpbGliaWxpX3NjcmFwZXIuanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL2ZhY2Vib29rX3NjcmFwZXIuanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL2xpYi9mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvbWV0YWRhdGEuanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL3lvdXR1YmVfc2NyYXBlci5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjLyBzeW5jIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJhcmdwYXJzZVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJheGlvc1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJjaGVlcmlvXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImRlYnVnXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJmaWxlbmFtaWZ5XCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImxvZGFzaFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInByb2dyZXNzLXN0cmVhbVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwdXBwZXRlZXJcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXJcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC9jb25jdXJyZW5jeS9idWlsdEluQ29uY3VycmVuY3lcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC91dGlsXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInB1cHBldGVlci1leHRyYVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJ1c2VyLWFnZW50c1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJ3aW5zdG9uXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwib3NcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2Vfc2NyYXBlciA9IHJlcXVpcmUoXCIuL3NyYy9ub2RlX3NvY2lhbG1rXCIpO1xudmFyIFNjcmFwZXIgPSByZXF1aXJlKFwiLi9zcmMvbW9kdWxlcy9zb2NpYWxfc2NyYXBlclwiKTtcblxuYXN5bmMgZnVuY3Rpb24gbG9naW4oYnJvd3Nlcl9jb25maWc6b2JqZWN0LCBzY3JhcGVfY29uZmlnOm9iamVjdCkge1xuICAvLyBzY3JhcGUgY29uZmlnIG92ZXJ3cml0ZXMgdGhlIGJyb3dzZXJfY29uZmlnXG4gIE9iamVjdC5hc3NpZ24oYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpO1xuXG4gIHZhciBzY3JhcGVyID0gbmV3IHNlX3NjcmFwZXIuU2NyYXBlTWFuYWdlcihicm93c2VyX2NvbmZpZyk7XG4gIC8vIHZhciByZW1vdGVDb25maWc9YXdhaXQgc2NyYXBlci5nZXRSZW1vdGVDb25maWcoKTtcbiAgYXdhaXQgc2NyYXBlci5zdGFydCgpO1xuXG4gIHZhciByZXN1bHRzID0gYXdhaXQgc2NyYXBlci5sb2dpbihzY3JhcGVfY29uZmlnKTtcblxuICBhd2FpdCBzY3JhcGVyLnF1aXQoKTtcblxuICByZXR1cm4gcmVzdWx0cztcbn1cbi8vZ2V0IGRhdGEgdXJsc1xuYXN5bmMgZnVuY3Rpb24gc2VhcmNoZGF0YShicm93c2VyX2NvbmZpZywgc2NyYXBlX2NvbmZpZykge1xuICAvLyBzY3JhcGUgY29uZmlnIG92ZXJ3cml0ZXMgdGhlIGJyb3dzZXJfY29uZmlnXG4gIE9iamVjdC5hc3NpZ24oYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpO1xuXG4gIHZhciBzY3JhcGVyID0gbmV3IHNlX3NjcmFwZXIuU2NyYXBlTWFuYWdlcihicm93c2VyX2NvbmZpZyk7XG4gIC8vIHZhciByZW1vdGVDb25maWc9YXdhaXQgc2NyYXBlci5nZXRSZW1vdGVDb25maWcoKTtcbiAgYXdhaXQgc2NyYXBlci5zdGFydCgpO1xuICB2YXIgcmVzdWx0cyA9IGF3YWl0IHNjcmFwZXIuc2VhcmNoZGF0YShzY3JhcGVfY29uZmlnKTtcblxuICBhd2FpdCBzY3JhcGVyLnF1aXQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlYXJjaGRhdGE6IHNlYXJjaGRhdGEsXG4gIGxvZ2luOiBsb2dpbixcbiAgLy8geXRibG9naW46eXRibG9naW4sXG4gIFNjcmFwZU1hbmFnZXI6IHNlX3NjcmFwZXIuU2NyYXBlTWFuYWdlcixcbiAgU2NyYXBlcjogU2NyYXBlcixcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydCB7fTtcbmNvbnN0IHNlX3NjcmFwZXIgPSByZXF1aXJlKFwiLi9pbmRleFwiKTtcbmNvbnN0IHsgQXJndW1lbnRQYXJzZXIgfSA9IHJlcXVpcmUoXCJhcmdwYXJzZVwiKTtcbmNvbnN0IHtSZW1vdGVTb3VyY2V9ID0gcmVxdWlyZShcIi4vc3JjL3JlbW90ZXNvdXJjZVwiKTtcbmNvbnN0IHsgdmVyc2lvbiB9ID0gcmVxdWlyZShcIi4vcGFja2FnZS5qc29uXCIpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcmVzb2x2ZSA9IHJlcXVpcmUoJ3BhdGgnKS5yZXNvbHZlO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdydW5qczpydW5qcycpO1xuLy8gY29uc3QgeyBkYXRhIH0gPSByZXF1aXJlKFwiY2hlZXJpby9saWIvYXBpL2F0dHJpYnV0ZXMuanNcIik7XG5cbmNvbnN0IHBhcnNlciA9IG5ldyBBcmd1bWVudFBhcnNlcih7XG4gIGRlc2NyaXB0aW9uOiBcIlNvY2lhbCBtYXJ0a2V0aW5nXCIsXG59KTtcblxucGFyc2VyLmFkZF9hcmd1bWVudChcIi12XCIsIFwiLS12ZXJzaW9uXCIsIHsgYWN0aW9uOiBcInZlcnNpb25cIiwgdmVyc2lvbiB9KTtcbnBhcnNlci5hZGRfYXJndW1lbnQoXCItYVwiLCBcIi0tYWN0aW9uXCIsIHtcbiAgaGVscDogXCJUaGEgYWN0aW9uIHlvdSB3YW50IHRvIHRoZSBwcm9ncmFtIHRvIHRha2VcIixcbn0pO1xucGFyc2VyLmFkZF9hcmd1bWVudChcIi1jXCIsIFwiLS1jYW1wYWlnblwiLCB7XG4gIGhlbHA6IFwiVGhhIGNhbXBhaWduIGlkIHlvdSB3YW50IHRvIHByb2dyYW0gdG8gdGFrZVwiLFxufSk7XG5cbmxldCBwYXJlYXJnID0gcGFyc2VyLnBhcnNlX2FyZ3MoKTtcblxuLy8gdGhvc2Ugb3B0aW9ucyBuZWVkIHRvIGJlIHByb3ZpZGVkIG9uIHN0YXJ0dXBcbi8vIGFuZCBjYW5ub3QgZ2l2ZSB0byBzZS1zY3JhcGVyIG9uIHNjcmFwZSgpIGNhbGxzXG5sZXQgYnJvd3Nlcl9jb25maWcgPSB7XG4gIC8vIHRoZSB1c2VyIGFnZW50IHRvIHNjcmFwZSB3aXRoXG4gIHVzZXJfYWdlbnQ6XG4gICAgXCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTA3LjAuMC4wIFNhZmFyaS81MzcuMzZcIixcbiAgLy8gaWYgcmFuZG9tX3VzZXJfYWdlbnQgaXMgc2V0IHRvIFRydWUsIGEgcmFuZG9tIHVzZXIgYWdlbnQgaXMgY2hvc2VuXG4gIHJhbmRvbV91c2VyX2FnZW50OiBmYWxzZSxcbiAgLy8gd2hldGhlciB0byBzdGFydCB0aGUgYnJvd3NlciBpbiBoZWFkbGVzcyBtb2RlXG4gIGhlYWRsZXNzOiBmYWxzZSxcbiAgLy8gd2hldGhlciBkZWJ1ZyBpbmZvcm1hdGlvbiBzaG91bGQgYmUgcHJpbnRlZFxuICAvLyBsZXZlbCAwOiBwcmludCBub3RoaW5nXG4gIC8vIGxldmVsIDE6IHByaW50IG1vc3QgaW1wb3J0YW50IGluZm9cbiAgLy8gLi4uXG4gIC8vIGxldmVsIDQ6IHByaW50IGFsbCBzaGl0IG5vYm9keSB3YW50cyB0byBrbm93XG4gIGRlYnVnX2xldmVsOiAxLFxuICAvLyBzcGVjaWZ5IGZsYWdzIHBhc3NlZCB0byBjaHJvbWUgaGVyZVxuICBjaHJvbWVfZmxhZ3M6IFtdLFxuICAvLyBwYXRoIHRvIGpzIG1vZHVsZSB0aGF0IGV4dGVuZHMgZnVuY3Rpb25hbGl0eVxuICAvLyB0aGlzIG1vZHVsZSBzaG91bGQgZXhwb3J0IHRoZSBmdW5jdGlvbnM6XG4gIC8vIGdldF9icm93c2VyLCBoYW5kbGVfbWV0YWRhdGEsIGNsb3NlX2Jyb3dzZXJcbiAgLy8gbXVzdCBiZSBhbiBhYnNvbHV0ZSBwYXRoIHRvIHRoZSBtb2R1bGVcbiAgLy9jdXN0b21fZnVuYzogcmVzb2x2ZSgnZXhhbXBsZXMvcGx1Z2dhYmxlLmpzJyksXG4gIGN1c3RvbV9mdW5jOiBcIlwiLFxuICAvLyB1c2UgYSBwcm94eSBmb3IgYWxsIGNvbm5lY3Rpb25zXG4gIC8vIGV4YW1wbGU6ICdzb2NrczU6Ly83OC45NC4xNzIuNDI6MTA4MCdcbiAgLy8gZXhhbXBsZTogJ2h0dHA6Ly8xMTguMTc0LjIzMy4xMDo0ODQwMCdcbiAgcHJveHk6IFwiXCIsXG4gIC8vIGEgZmlsZSB3aXRoIG9uZSBwcm94eSBwZXIgbGluZS4gRXhhbXBsZTpcbiAgLy8gc29ja3M1Oi8vNzguOTQuMTcyLjQyOjEwODBcbiAgLy8gaHR0cDovLzExOC4xNzQuMjMzLjEwOjQ4NDAwXG4gIHByb3h5X2ZpbGU6IFwiXCIsXG4gIHVzZV9jbHVzdGVyOmZhbHNlLFxuICBwdXBwZXRlZXJfY2x1c3Rlcl9jb25maWc6IHtcbiAgICB0aW1lb3V0OiAxMCAqIDYwICogMTAwMCwgLy8gbWF4IHRpbWVvdXQgc2V0IHRvIDEwIG1pbnV0ZXNcbiAgICBtb25pdG9yOiBmYWxzZSxcbiAgICBjb25jdXJyZW5jeTogMSwgLy8gb25lIHNjcmFwZXIgcGVyIHRhYlxuICAgIG1heENvbmN1cnJlbmN5OiAxLCAvLyBzY3JhcGUgd2l0aCAxIHRhYlxuICB9LFxufTtcblxubGV0IHNjcmFwZV9jb25maWcgPSB7XG4gIC8vIHdoaWNoIHNlYXJjaCBlbmdpbmUgdG8gc2NyYXBlXG4gIC8vIHBsYXRmb3JtOiBcImZhY2Vib29rXCIsXG4gIC8vIGFuIGFycmF5IG9mIGtleXdvcmRzIHRvIHNjcmFwZVxuICBrZXl3b3JkczogW1wiY2xvdWQgc2VydmljZSB0ZXN0XCJdLFxuICAvLyB0aGUgbnVtYmVyIG9mIHBhZ2VzIHRvIHNjcmFwZSBmb3IgZWFjaCBrZXl3b3JkXG4gIG51bV9wYWdlczogMSxcblxuICAvLyBPUFRJT05BTCBQQVJBTVMgQkVMT1c6XG4gIC8vIGdvb2dsZV9zZXR0aW5nczoge1xuICAvLyAgICAgZ2w6ICd1cycsIC8vIFRoZSBnbCBwYXJhbWV0ZXIgZGV0ZXJtaW5lcyB0aGUgR29vZ2xlIGNvdW50cnkgdG8gdXNlIGZvciB0aGUgcXVlcnkuXG4gIC8vICAgICBobDogJ2ZyJywgLy8gVGhlIGhsIHBhcmFtZXRlciBkZXRlcm1pbmVzIHRoZSBHb29nbGUgVUkgbGFuZ3VhZ2UgdG8gcmV0dXJuIHJlc3VsdHMuXG4gIC8vICAgICBzdGFydDogMCwgLy8gRGV0ZXJtaW5lcyB0aGUgcmVzdWx0cyBvZmZzZXQgdG8gdXNlLCBkZWZhdWx0cyB0byAwLlxuICAvLyAgICAgbnVtOiAxMDAsIC8vIERldGVybWluZXMgdGhlIG51bWJlciBvZiByZXN1bHRzIHRvIHNob3csIGRlZmF1bHRzIHRvIDEwLiBNYXhpbXVtIGlzIDEwMC5cbiAgLy8gfSxcbiAgLy8gaW5zdGVhZCBvZiBrZXl3b3JkcyB5b3UgY2FuIHNwZWNpZnkgYSBrZXl3b3JkX2ZpbGUuIHRoaXMgb3ZlcndyaXRlcyB0aGUga2V5d29yZHMgYXJyYXlcbiAga2V5d29yZF9maWxlOiBcIlwiLFxuICAvLyBob3cgbG9uZyB0byBzbGVlcCBiZXR3ZWVuIHJlcXVlc3RzLiBhIHJhbmRvbSBzbGVlcCBpbnRlcnZhbCB3aXRoaW4gdGhlIHJhbmdlIFthLGJdXG4gIC8vIGlzIGRyYXduIGJlZm9yZSBldmVyeSByZXF1ZXN0LiBlbXB0eSBzdHJpbmcgZm9yIG5vIHNsZWVwaW5nLlxuICBzbGVlcF9yYW5nZTogXCJcIixcbiAgLy8gcGF0aCB0byBvdXRwdXQgZmlsZSwgZGF0YSB3aWxsIGJlIHN0b3JlZCBpbiBKU09OXG4gIG91dHB1dF9maWxlOiBcIi90bXAvdGVzdC90ZXN0Lmpzb25cIixcbiAgLy8gd2hldGhlciB0byBwcmV2ZW50IGltYWdlcywgY3NzLCBmb250cyBmcm9tIGJlaW5nIGxvYWRlZFxuICAvLyB3aWxsIHNwZWVkIHVwIHNjcmFwaW5nIGEgZ3JlYXQgZGVhbFxuICBibG9ja19hc3NldHM6IGZhbHNlLFxuICAvLyBjaGVjayBpZiBoZWFkbGVzcyBjaHJvbWUgZXNjYXBlcyBjb21tb24gZGV0ZWN0aW9uIHRlY2huaXF1ZXNcbiAgLy8gdGhpcyBpcyBhIHF1aWNrIHRlc3QgYW5kIHNob3VsZCBiZSB1c2VkIGZvciBkZWJ1Z2dpbmdcbiAgdGVzdF9ldmFzaW9uOiBmYWxzZSxcbiAgYXBwbHlfZXZhc2lvbl90ZWNobmlxdWVzOiB0cnVlLFxuICAvLyBsb2cgaXAgYWRkcmVzcyBkYXRhXG4gIGxvZ19pcF9hZGRyZXNzOiBmYWxzZSxcbiAgLy8gbG9nIGh0dHAgaGVhZGVyc1xuICBsb2dfaHR0cF9oZWFkZXJzOiBmYWxzZSxcbiAgcGxhdGZvcm06IFwiZmFjZWJvb2tcIixcbiAgdXNlcjogXCJcIixcbiAgcGFzczogXCJcIixcbiAgdG1wcGF0aDpcIlwiLFxufTtcblxuZnVuY3Rpb24gZ2V0KG9iamVjdDpBcnJheTxzdHJpbmc+LCBrZXk6c3RyaW5nLCBkZWZhdWx0X3ZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSBvYmplY3Rba2V5XTtcbiAgcmV0dXJuIHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIgPyByZXN1bHQgOiBkZWZhdWx0X3ZhbHVlO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5Db21tYW5kKHBhcmVhcmcpIHtcbiAgbGV0IGFjdGlvbiA9IGdldChwYXJlYXJnLCBcImFjdGlvblwiLCBmYWxzZSk7XG4gIGlmICghYWN0aW9uKSB7XG4gICAgY29uc29sZS5sb2coXCJubyBwYXJhbWV0ZXIgYWN0aW9uIGJlZW4gcGFzc2VkXCIpO1xuICB9XG4gXG4gIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgY2FzZSBcImxvZ2luXCI6XG4gICAgICBsb2dpbigpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInRhc2tcIjpcbiAgICAgIGdldGNhbXBhaWduKCk7XG4gICAgICBicmVhazsgXG4gIH1cbn1cbi8vZ2V0IGNhbXBhaWduXG5hc3luYyBmdW5jdGlvbiBnZXRjYW1wYWlnbigpIHtcbiAgdmFyIHJlbW90ZXNvdXJjZSA9bmV3IFJlbW90ZVNvdXJjZSgpO1xuICBjb25zdCBjYW1wYWlnbmxpc3Q9YXdhaXQgcmVtb3Rlc291cmNlLmdldENhbXBhaWdubGlzdCgpXG4gIGRlYnVnKGNhbXBhaWdubGlzdClcbiAgaWYoIWNhbXBhaWdubGlzdCl7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiY2FtcGFpZ25saXN0IGlzIHVuZGVmaW5lZFwiKTtcbiAgfVxuICBjb25zdCBhcnJMZW5ndGggPSBjYW1wYWlnbmxpc3Q/Lmxlbmd0aCA/PyAwO1xuICBpZihhcnJMZW5ndGg9PTApe1xuICAgIGNvbnNvbGUubG9nKFwibm90IGNhbXBhaWduIG5lZWQgdG8gcnVuXCIpXG4gIH1cbiAgZm9yIChjb25zdCBjYW1wYWlnbiBvZiBjYW1wYWlnbmxpc3QpIHtcbiAgICBzd2l0Y2ggKGNhbXBhaWduLnR5cGUpIHtcbiAgICAgIGNhc2UgXCJiaWxpYmlsaWRvd25sb2FkXCI6XG4gICAgICAgIHNjcmFwZV9jb25maWcucGxhdGZvcm09XCJiaWxpYmlsaVwiXG4gICAgICAgIHNjcmFwZV9jb25maWcua2V5d29yZHM9Y2FtcGFpZ24ua2V5d29yZHNcbiAgICAgICAgc2Vfc2NyYXBlci5zZWFyY2hkYXRhKGJyb3dzZXJfY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9ICBcbn1cbi8vbG9naW4gdG8gZmFjZWJvb2tcbmFzeW5jIGZ1bmN0aW9uIGxvZ2luKCkge1xuICBsZXQgY2FtcGFpZ25JZCA9IGdldChwYXJlYXJnLCBcImNhbXBhaWduXCIsIGZhbHNlKTtcbiAgdmFyIHJlbW90ZXNvdXJjZSA9bmV3IFJlbW90ZVNvdXJjZSgpO1xuICBsZXQgc29zZXR0aW5nID0gYXdhaXQgcmVtb3Rlc291cmNlLmdldFJlbW90ZUNvbmZpZyhjYW1wYWlnbklkKTtcbiAgZGVidWcoc29zZXR0aW5nKVxuICBpZihzb3NldHRpbmc9PSBudWxsKXtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJzb3NldHRpbmcgaXMgdW5kZWZpbmVkXCIpO1xuICB9XG4gIHNjcmFwZV9jb25maWcucGxhdGZvcm0gPSBzb3NldHRpbmcuc290eXBlO1xuICBzY3JhcGVfY29uZmlnLnVzZXIgPSBzb3NldHRpbmcuc29jaWFsdXNlcjtcbiAgc2NyYXBlX2NvbmZpZy5wYXNzID0gc29zZXR0aW5nLnNvY2lhbHBhc3M7XG4gIGNvbnNvbGUubG9nKHNvc2V0dGluZyk7XG4gIC8vY3JlYXRlIGEgdG1wIGZvbGRlclxuICBjb25zdCB0bXBwYXRoID0gcmVzb2x2ZShcIi4vdG1wL1wiICsgc2NyYXBlX2NvbmZpZy5wbGF0Zm9ybSArIFwiL1wiICsgc29zZXR0aW5nLnNvY2lhbHVzZXIpO1xuICBhd2FpdCBjcmVhdGVQYXRoKHRtcHBhdGgpO1xuICBzY3JhcGVfY29uZmlnLnRtcHBhdGg9dG1wcGF0aFxuXG4gIGF3YWl0IHNlX3NjcmFwZXIubG9naW4oYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQYXRoKHBhdGgpIHtcbiAgcGF0aC5zcGxpdChcIi9cIikucmVkdWNlKChkaXJlY3RvcmllcywgZGlyZWN0b3J5KSA9PiB7XG4gICAgZGlyZWN0b3JpZXMgKz0gYCR7ZGlyZWN0b3J5fS9gO1xuXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcmVjdG9yaWVzKSkge1xuICAgICAgZnMubWtkaXJTeW5jKGRpcmVjdG9yaWVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3JpZXM7XG4gIH0sIFwiXCIpO1xufVxuXG5ydW5Db21tYW5kKHBhcmVhcmcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBtZXRhID0gcmVxdWlyZSgnLi9tZXRhZGF0YS5qcycpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzZS1zY3JhcGVyOlNjcmFwZXInKTtcbmludGVyZmFjZSBTY3JhcGVPcHRpb25zUGFnZSB7XG4gICAgc2V0Vmlld3BvcnQ6IEZ1bmN0aW9uLFxuICAgIHNldFJlcXVlc3RJbnRlcmNlcHRpb246IEZ1bmN0aW9uLFxuICAgIG9uOiBGdW5jdGlvbixcbiAgICBnb3RvOiBGdW5jdGlvbixcbiAgICBzY3JlZW5zaG90OiBGdW5jdGlvbixcbn1cbmludGVyZmFjZSBTY3JhcGVPcHRpb25zIHtcbiAgICBjb25maWc6IHtcbiAgICAgICAgbG9nZ2VyOiBsb2dUeXBlLFxuICAgICAgICBzZWFyY2hfZW5naW5lOiBzdHJpbmcsIGtleXdvcmRzOiBBcnJheTxzdHJpbmc+LCBwcm94eTogc3RyaW5nLCBhcHBseV9ldmFzaW9uX3RlY2huaXF1ZXM6IGJvb2xlYW4sIGJsb2NrX2Fzc2V0czogYm9vbGVhbiwgdGVzdF9ldmFzaW9uOiBib29sZWFuLCBsb2dfaHR0cF9oZWFkZXJzOiBib29sZWFuLCBsb2dfaXBfYWRkcmVzczogYm9vbGVhblxuICAgIH0sXG4gICAgY29udGV4dD86IG9iamVjdCxcbiAgICBwbHVnZ2FibGU/OiBvYmplY3QsXG4gICAgcGFnZTogU2NyYXBlT3B0aW9uc1BhZ2UsXG59XG5cbmludGVyZmFjZSBydW5QYXJhbWV0ZXIge1xuICAgIHBhZ2U/OiBTY3JhcGVPcHRpb25zUGFnZSxcbiAgICBkYXRhPzogb2JqZWN0LFxuICAgIHdvcmtlcj86IG9iamVjdFxufVxuaW50ZXJmYWNlIGxvZ1R5cGUge1xuICAgIGluZm86IEZ1bmN0aW9uLFxuICAgIGVycm9yOiBGdW5jdGlvblxufVxuXG5pbnRlcmZhY2Ugd29zZWFyY2hPYmoge1xuICAgIHBhZ2U/OiBTY3JhcGVPcHRpb25zUGFnZSxcbiAgICB3b3JrZXI6b2JqZWN0XG59XG4vKipcbiAqIHRoaXMgaXMgcGFyZW50IGNsYXNzIGZvciBzb2NpYWwgc2NyYXB5ZXIgbm9kZVxuICogICovXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFNvY2lhbFNjcmFwZXIge1xuICAgIGNvbmZpZzoge1xuICAgICAgICBsb2dnZXI6IGxvZ1R5cGUsXG4gICAgICAgIHNlYXJjaF9lbmdpbmU6IHN0cmluZywga2V5d29yZHM6IEFycmF5PHN0cmluZz4sIHByb3h5OiBzdHJpbmcsIGFwcGx5X2V2YXNpb25fdGVjaG5pcXVlczogYm9vbGVhbiwgYmxvY2tfYXNzZXRzOiBib29sZWFuLCB0ZXN0X2V2YXNpb246IGJvb2xlYW4sIGxvZ19odHRwX2hlYWRlcnM6IGJvb2xlYW4sIGxvZ19pcF9hZGRyZXNzOiBib29sZWFuXG4gICAgfTtcbiAgICBwYWdlOiBTY3JhcGVPcHRpb25zUGFnZTtcbiAgICBsYXN0X3Jlc3BvbnNlOiBvYmplY3QgfCBudWxsO1xuICAgIG1ldGFkYXRhOiB7IGh0dHBfaGVhZGVycz86IG9iamVjdCwgaXBpbmZvPzogeyBpcDogc3RyaW5nIH0sIHNjcmFwaW5nX2RldGVjdGVkPzogYm9vbGVhbiB9O1xuICAgIHBsdWdnYWJsZT86IG9iamVjdDtcbiAgICBjb250ZXh0Pzogb2JqZWN0O1xuICAgIGxvZ2dlcjogbG9nVHlwZTtcbiAgICBwcm94eTogc3RyaW5nO1xuICAgIGtleXdvcmRzOiBBcnJheTxzdHJpbmc+O1xuICAgIFNUQU5EQVJEX1RJTUVPVVQ6IG51bWJlcjtcbiAgICBTT0xWRV9DQVBUQ0hBX1RJTUU6IG51bWJlcjtcbiAgICByZXN1bHRzOiBvYmplY3Q7XG4gICAgcmVzdWx0X3Jhbms6IG51bWJlcjtcbiAgICBudW1fcmVxdWVzdHM6IG51bWJlcjtcbiAgICBudW1fa2V5d29yZHM6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBTY3JhcGVPcHRpb25zKSB7XG4gICAgICAgIGRlYnVnKCdjb25zdHJ1Y3RvcicpO1xuICAgICAgICAvLyBjb25zdCB7XG4gICAgICAgIC8vICAgICAvLyBjb25maWcgPSB7fSxcbiAgICAgICAgLy8gICAgIGNvbnRleHQgPSB7fSxcbiAgICAgICAgLy8gICAgIC8vIHBsdWdnYWJsZSA9IG51bGwsXG4gICAgICAgIC8vICAgICBwYWdlID0gbnVsbCxcbiAgICAgICAgLy8gICAgIC8vIGJyb3dzZXJzPW51bGxcbiAgICAgICAgLy8gfSA9IG9wdGlvbnM7XG4gICAgICAgIC8vIHRoaXMuYnJvd3Nlcj1icm93c2VyO1xuICAgICAgICB0aGlzLnBhZ2UgPSBvcHRpb25zLnBhZ2U7XG4gICAgICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IG51bGw7IC8vIHRoZSBsYXN0IHJlc3BvbnNlIG9iamVjdFxuICAgICAgICB0aGlzLm1ldGFkYXRhID0ge1xuICAgICAgICAgICAgc2NyYXBpbmdfZGV0ZWN0ZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBsdWdnYWJsZSA9IG9wdGlvbnMucGx1Z2dhYmxlO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG9wdGlvbnMuY29uZmlnO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IHRoaXMuY29uZmlnLmxvZ2dlcjtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0O1xuXG4gICAgICAgIHRoaXMucHJveHkgPSBvcHRpb25zLmNvbmZpZy5wcm94eTtcbiAgICAgICAgdGhpcy5rZXl3b3JkcyA9IG9wdGlvbnMuY29uZmlnLmtleXdvcmRzO1xuXG4gICAgICAgIHRoaXMuU1RBTkRBUkRfVElNRU9VVCA9IDEwMDAwO1xuICAgICAgICB0aGlzLlNPTFZFX0NBUFRDSEFfVElNRSA9IDQ1MDAwO1xuXG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHt9O1xuICAgICAgICB0aGlzLnJlc3VsdF9yYW5rID0gMTtcbiAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUgcmVxdWVzdHMgZG9uZVxuICAgICAgICB0aGlzLm51bV9yZXF1ZXN0cyA9IDA7XG4gICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgdGhlIGtleXdvcmRzIHNlYXJjaGVkXG4gICAgICAgIHRoaXMubnVtX2tleXdvcmRzID0gMDtcblxuICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLmNvbmZpZ1tgJHt0aGlzLmNvbmZpZy5zZWFyY2hfZW5naW5lfV9zZXR0aW5nc2BdO1xuICAgICAgICBpZiAoc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSBKU09OLnBhcnNlKHNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ1tgJHt0aGlzLmNvbmZpZy5zZWFyY2hfZW5naW5lfV9zZXR0aW5nc2BdID0gc2V0dGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogbG9naW4gc29jaWFsIG1lZGlhIHBsYXRmb3JtXG4gICAgICogQHBhcmFtIHJ1bm9iaiBcbiAgICAgKiBcbiAgICAgKi9cbiAgICBhc3luYyBydW5Mb2dpbihydW5vYmo6IHJ1blBhcmFtZXRlcikge1xuXG4gICAgICAgIGRlYnVnKCd3b3JrZXI9JW8nLCBydW5vYmoud29ya2VyLCB0aGlzLmNvbmZpZy5rZXl3b3Jkcyk7XG5cbiAgICAgICAgaWYgKHJ1bm9iai5wYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBydW5vYmoucGFnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMucGFnZT8uc2V0Vmlld3BvcnQoeyB3aWR0aDogMTI4MCwgaGVpZ2h0OiA4MDAgfSk7XG5cblxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRfYnJvd3Nlcl9lbmdpbmUoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5tYWtlbG9naW5hY3Rpb24oKVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9uIHRoYXQgcnVucyBvbmx5IG9uY2UgaW4gdGhlIGJlZ2lubmluZyBvZiB0aGVcbiAgICAgKiBzY3JhcGluZyBwcm9jZWR1cmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gdHJ1ZSBpZiBldmVyeXRoaW5nIGlzIGNvcnJlY3QuXG4gICAgICovXG4gICAgYXN5bmMgbG9hZF9icm93c2VyX2VuZ2luZSgpOiBQcm9taXNlPHZvaWQ+IHtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuYXBwbHlfZXZhc2lvbl90ZWNobmlxdWVzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IGRldGVjdGlvbiBieSBldmFkaW5nIGNvbW1vbiBkZXRlY3Rpb24gdGVjaG5pcXVlc1xuICAgICAgICAgICAgYXdhaXQgZXZhZGVDaHJvbWVIZWFkbGVzc0RldGVjdGlvbih0aGlzLnBhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYmxvY2sgc29tZSBhc3NldHMgdG8gc3BlZWQgdXAgc2NyYXBpbmdcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmJsb2NrX2Fzc2V0cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNldFJlcXVlc3RJbnRlcmNlcHRpb24odHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLnBhZ2Uub24oJ3JlcXVlc3QnLCAocmVxKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSByZXEucmVzb3VyY2VUeXBlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2sgPSBbJ3N0eWxlc2hlZXQnLCAnZm9udCcsICdpbWFnZScsICdtZWRpYSddO1xuICAgICAgICAgICAgICAgIGlmIChibG9jay5pbmNsdWRlcyh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXEuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXEuY29udGludWUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy50ZXN0X2V2YXNpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIE5hdmlnYXRlIHRvIHRoZSBwYWdlIHRoYXQgd2lsbCBwZXJmb3JtIHRoZSB0ZXN0cy5cbiAgICAgICAgICAgIGNvbnN0IHRlc3RVcmwgPSAnaHR0cHM6Ly9ib3Quc2Fubnlzb2Z0LmNvbSc7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBhZ2UuZ290byh0ZXN0VXJsKTtcbiAgICAgICAgICAgIC8vIFNhdmUgYSBzY3JlZW5zaG90IG9mIHRoZSByZXN1bHRzLlxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNjcmVlbnNob3QoeyBwYXRoOiAnaGVhZGxlc3MtZXZhc2lvbi1yZXN1bHQucG5nJyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5sb2dfaHR0cF9oZWFkZXJzID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLm1ldGFkYXRhLmh0dHBfaGVhZGVycyA9IGF3YWl0IG1ldGEuZ2V0X2h0dHBfaGVhZGVycyh0aGlzLnBhZ2UpO1xuICAgICAgICAgICAgZGVidWcoJ3RoaXMubWV0YWRhdGEuaHR0cF9oZWFkZXJzPSVPJywgdGhpcy5tZXRhZGF0YS5odHRwX2hlYWRlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmxvZ19pcF9hZGRyZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsZXQgaXBpbmZvID0gYXdhaXQgbWV0YS5nZXRfaXBfZGF0YSh0aGlzLnBhZ2UpO1xuICAgICAgICAgICAgdGhpcy5tZXRhZGF0YS5pcGluZm8gPSBpcGluZm87XG4gICAgICAgICAgICBkZWJ1ZygndGhpcy5tZXRhZGF0YS5pcGluZm8nLCB0aGlzLm1ldGFkYXRhLmlwaW5mbyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayB0aGF0IG91ciBwcm94eSBpcyB3b3JraW5nIGJ5IGNvbmZpcm1pbmdcbiAgICAgICAgLy8gdGhhdCBpcGluZm8uaW8gc2VlcyB0aGUgcHJveHkgSVAgYWRkcmVzc1xuICAgICAgICBpZiAodGhpcy5wcm94eSAmJiB0aGlzLmNvbmZpZy5sb2dfaXBfYWRkcmVzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZGVidWcoYCR7dGhpcy5tZXRhZGF0YS5pcGluZm8/LmlwfSB2cyAke3RoaXMucHJveHl9YCk7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBpcCByZXR1cm5lZCBieSBpcGluZm8gaXMgbm90IGEgc3Vic3RyaW5nIG9mIG91ciBwcm94eXN0cmluZywgZ2V0IHRoZSBoZWNrIG91dHRhIGhlcmVcbiAgICAgICAgICAgIGlmICh0aGlzLm1ldGFkYXRhLmlwaW5mbz8uaXAgJiYgKCF0aGlzLnByb3h5LmluY2x1ZGVzKHRoaXMubWV0YWRhdGEuaXBpbmZvPy5pcCkpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm94eSBvdXRwdXQgaXAgJHt0aGlzLnByb3h5fSBkb2VzIG5vdCBtYXRjaCB3aXRoIHByb3ZpZGVkIG9uZWApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBVc2luZyB2YWxpZCBQcm94eTogJHt0aGlzLnByb3h5fWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5sb2FkX3N0YXJ0X3BhZ2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICpcbiAgKiBAcmV0dXJucyB0cnVlIGlmIHN0YXJ0cGFnZSB3YXMgbG9hZGVkIGNvcnJlY3RseS5cbiAgKi9cbiAgICBhc3luYyBsb2FkX2xvZ2luX3BhZ2UoKSB7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgKlxuICAgICogQHJldHVybnMgdHJ1ZSBpZiBzdGFydHBhZ2Ugd2FzIGxvYWRlZCBjb3JyZWN0bHkuXG4gICAgKi9cbiAgICBhc3luYyBsb2FkX3N0YXJ0X3BhZ2UoKSB7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogbWFrZSBsb2dpbiBhY3Rpb25cbiAgICAgKi9cbiAgICBhc3luYyBtYWtlbG9naW5hY3Rpb24oKSB7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogdXNlciBsb2dpbiBieSB0aGVpciBoYW5kXG4gICAgICovXG4gICAgYXN5bmMgdXNlcmxvZ2luYWN0aW9uKCkge1xuXG4gICAgfVxuXG4gICAgYXN5bmMgc2VhcmNoZGF0YShzZWFjaG9iajogeyBrZXl3b3JkOiBBcnJheTxzdHJpbmc+IH0pIHtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogdXNlIHdvcmtlciB0byBzZWFyY2ggZGF0YVxuICAgICAqIEBwYXJhbSBvYmplY3Qga2V5d29yZCBcbiAgICAgKi9cbiAgICBhc3luYyB3b3JrZXJzZWFyY2hkYXRhKHdvcmtlcnNlYWNoOndvc2VhcmNoT2JqKSB7XG4gICAgZGVidWcoJ3dvcmtlcj0lbycsd29ya2Vyc2VhY2gud29ya2VyLCB0aGlzLmNvbmZpZy5rZXl3b3Jkcyk7XG5cbiAgICBpZiAod29ya2Vyc2VhY2gucGFnZSkge1xuICAgICAgICB0aGlzLnBhZ2UgPSB3b3JrZXJzZWFjaC5wYWdlO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMucGFnZS5zZXRWaWV3cG9ydCh7IHdpZHRoOiAxMjgwLCBoZWlnaHQ6IDgwMCB9KTtcbiAgICBhd2FpdCB0aGlzLmxvYWRfYnJvd3Nlcl9lbmdpbmUoKVxuICAgIGNvbnN0IGxpbmtzID0gYXdhaXQgdGhpcy5zZWFyY2hkYXRhKHsga2V5d29yZDogdGhpcy5jb25maWcua2V5d29yZHMgfSlcbiAgICBkZWJ1ZyhsaW5rcylcbiAgICAvL2hhbmRsZSB0aGUgbGlua3Ncbn1cblxufVxuLy8gVGhpcyBpcyB3aGVyZSB3ZSdsbCBwdXQgdGhlIGNvZGUgdG8gZ2V0IGFyb3VuZCB0aGUgdGVzdHMuXG5hc3luYyBmdW5jdGlvbiBldmFkZUNocm9tZUhlYWRsZXNzRGV0ZWN0aW9uKHBhZ2UpIHtcblxuICAgIC8vIFBhc3MgdGhlIFdlYmRyaXZlciBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgLy8gY29uc3QgbmV3UHJvdG8gPSBuYXZpZ2F0b3IuX19wcm90b19fO1xuICAgICAgICBjb25zdCBuZXdQcm90byA9T2JqZWN0LmdldFByb3RvdHlwZU9mKG5hdmlnYXRvcik7XG4gICAgICAgIGRlbGV0ZSBuZXdQcm90by53ZWJkcml2ZXI7XG4gICAgICAgIC8vIG5hdmlnYXRvci5fX3Byb3RvX18gPSBuZXdQcm90bztcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG5hdmlnYXRvcixuZXdQcm90byk7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBDaHJvbWUgVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIC8vIGludGVyZmFjZSBtb2NrT2JqVHlwZSBleHRlbmRzIHR5cGVvZiBjaHJvbWUge1xuICAgICAgICAvLyAgICAgY2hyb21lOiBvYmplY3QsXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gV2UgY2FuIG1vY2sgdGhpcyBpbiBhcyBtdWNoIGRlcHRoIGFzIHdlIG5lZWQgZm9yIHRoZSB0ZXN0LlxuICAgICAgICBjb25zdCBtb2NrT2JqID0ge1xuICAgICAgICAgICAgYXBwOiB7XG4gICAgICAgICAgICAgICAgaXNJbnN0YWxsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdlYnN0b3JlOiB7XG4gICAgICAgICAgICAgICAgb25JbnN0YWxsU3RhZ2VDaGFuZ2VkOiB7fSxcbiAgICAgICAgICAgICAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bnRpbWU6IHtcbiAgICAgICAgICAgICAgICBQbGF0Zm9ybU9zOiB7XG4gICAgICAgICAgICAgICAgICAgIE1BQzogJ21hYycsXG4gICAgICAgICAgICAgICAgICAgIFdJTjogJ3dpbicsXG4gICAgICAgICAgICAgICAgICAgIEFORFJPSUQ6ICdhbmRyb2lkJyxcbiAgICAgICAgICAgICAgICAgICAgQ1JPUzogJ2Nyb3MnLFxuICAgICAgICAgICAgICAgICAgICBMSU5VWDogJ2xpbnV4JyxcbiAgICAgICAgICAgICAgICAgICAgT1BFTkJTRDogJ29wZW5ic2QnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgUGxhdGZvcm1BcmNoOiB7XG4gICAgICAgICAgICAgICAgICAgIEFSTTogJ2FybScsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl8zMjogJ3g4Ni0zMicsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl82NDogJ3g4Ni02NCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBQbGF0Zm9ybU5hY2xBcmNoOiB7XG4gICAgICAgICAgICAgICAgICAgIEFSTTogJ2FybScsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl8zMjogJ3g4Ni0zMicsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl82NDogJ3g4Ni02NCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBSZXF1ZXN0VXBkYXRlQ2hlY2tTdGF0dXM6IHtcbiAgICAgICAgICAgICAgICAgICAgVEhST1RUTEVEOiAndGhyb3R0bGVkJyxcbiAgICAgICAgICAgICAgICAgICAgTk9fVVBEQVRFOiAnbm9fdXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgVVBEQVRFX0FWQUlMQUJMRTogJ3VwZGF0ZV9hdmFpbGFibGUnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgT25JbnN0YWxsZWRSZWFzb246IHtcbiAgICAgICAgICAgICAgICAgICAgSU5TVEFMTDogJ2luc3RhbGwnLFxuICAgICAgICAgICAgICAgICAgICBVUERBVEU6ICd1cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBDSFJPTUVfVVBEQVRFOiAnY2hyb21lX3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIFNIQVJFRF9NT0RVTEVfVVBEQVRFOiAnc2hhcmVkX21vZHVsZV91cGRhdGUnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgT25SZXN0YXJ0UmVxdWlyZWRSZWFzb246IHtcbiAgICAgICAgICAgICAgICAgICAgQVBQX1VQREFURTogJ2FwcF91cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBPU19VUERBVEU6ICdvc191cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBQRVJJT0RJQzogJ3BlcmlvZGljJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgLy8gaWYod2luZG93Lm5hdmlnYXRvci5jaHJvbWUpe1xuICAgICAgICAvLyB3aW5kb3cubmF2aWdhdG9yLmNocm9tZSA9IG1vY2tPYmo7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gd2luZG93LmNocm9tZSA9IG1vY2tPYmo7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBQZXJtaXNzaW9ucyBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxRdWVyeSA9IHdpbmRvdy5uYXZpZ2F0b3IucGVybWlzc2lvbnMucXVlcnk7XG4gICAgICAgIC8vIHdpbmRvdy5uYXZpZ2F0b3IucGVybWlzc2lvbnMuX19wcm90b19fLnF1ZXJ5ID0gcGFyYW1ldGVycyA9PlxuICAgICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2luZG93Lm5hdmlnYXRvci5wZXJtaXNzaW9ucykucXVlcnkgPSBwYXJhbWV0ZXJzID0+XG4gICAgICAgICAgICBcbiAgICAgICAgcGFyYW1ldGVycy5uYW1lID09PSAnbm90aWZpY2F0aW9ucydcbiAgICAgICAgICAgICAgICA/IFByb21pc2UucmVzb2x2ZSh7IHN0YXRlOiBOb3RpZmljYXRpb24ucGVybWlzc2lvbiB9KVxuICAgICAgICAgICAgICAgIDogb3JpZ2luYWxRdWVyeShwYXJhbWV0ZXJzKTtcblxuICAgICAgICAvLyBJbnNwaXJlZCBieTogaHR0cHM6Ly9naXRodWIuY29tL2lrYXJpZW5hdG9yL3BoYW50b21qc19oaWRlX2FuZF9zZWVrL2Jsb2IvbWFzdGVyLzUuc3Bvb2ZGdW5jdGlvbkJpbmQuanNcbiAgICAgICAgY29uc3Qgb2xkQ2FsbCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNhbGwoKSB7XG4gICAgICAgICAgICByZXR1cm4gb2xkQ2FsbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwgPSBjYWxsO1xuXG4gICAgICAgIGNvbnN0IG5hdGl2ZVRvU3RyaW5nRnVuY3Rpb25TdHJpbmcgPSBFcnJvci50b1N0cmluZygpLnJlcGxhY2UoL0Vycm9yL2csIFwidG9TdHJpbmdcIik7XG4gICAgICAgIGNvbnN0IG9sZFRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZ1bmN0aW9uVG9TdHJpbmcoKSB7XG4gICAgICAgICAgICBpZiAodGhpcyA9PT0gd2luZG93Lm5hdmlnYXRvci5wZXJtaXNzaW9ucy5xdWVyeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcImZ1bmN0aW9uIHF1ZXJ5KCkgeyBbbmF0aXZlIGNvZGVdIH1cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzID09PSBmdW5jdGlvblRvU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZVRvU3RyaW5nRnVuY3Rpb25TdHJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2xkQ2FsbC5jYWxsKG9sZFRvU3RyaW5nLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uVG9TdHJpbmc7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBQbHVnaW5zIExlbmd0aCBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgLy8gT3ZlcndyaXRlIHRoZSBgcGx1Z2luc2AgcHJvcGVydHkgdG8gdXNlIGEgY3VzdG9tIGdldHRlci5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5hdmlnYXRvciwgJ3BsdWdpbnMnLCB7XG4gICAgICAgICAgICAvLyBUaGlzIGp1c3QgbmVlZHMgdG8gaGF2ZSBgbGVuZ3RoID4gMGAgZm9yIHRoZSBjdXJyZW50IHRlc3QsXG4gICAgICAgICAgICAvLyBidXQgd2UgY291bGQgbW9jayB0aGUgcGx1Z2lucyB0b28gaWYgbmVjZXNzYXJ5LlxuICAgICAgICAgICAgZ2V0OiAoKSA9PiBbMSwgMiwgMywgNCwgNV1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBMYW5ndWFnZXMgVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIC8vIE92ZXJ3cml0ZSB0aGUgYHBsdWdpbnNgIHByb3BlcnR5IHRvIHVzZSBhIGN1c3RvbSBnZXR0ZXIuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXZpZ2F0b3IsICdsYW5ndWFnZXMnLCB7XG4gICAgICAgICAgICBnZXQ6ICgpID0+IFsnZW4tVVMnLCAnZW4nXVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdGhlIGlmcmFtZSBUZXN0XG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSFRNTElGcmFtZUVsZW1lbnQucHJvdG90eXBlLCAnY29udGVudFdpbmRvdycsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0b1N0cmluZyB0ZXN0LCB0aG91Z2ggaXQgYnJlYWtzIGNvbnNvbGUuZGVidWcoKSBmcm9tIHdvcmtpbmdcbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmRlYnVnID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgfSk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBVc2UgVHlwZVNjcmlwdCBtb2R1bGVzIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM1NzU4NTg0L2Nhbm5vdC1yZWRlY2xhcmUtYmxvY2stc2NvcGVkLXZhcmlhYmxlXG5leHBvcnQge307XG5jb25zdCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcbmNvbnN0IG9zID0gcmVxdWlyZShcIm9zXCIpO1xuY29uc3QgXyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5jb25zdCB7IGNyZWF0ZUxvZ2dlciwgZm9ybWF0LCB0cmFuc3BvcnRzIH0gPSByZXF1aXJlKFwid2luc3RvblwiKTtcbmNvbnN0IHsgY29tYmluZSwgdGltZXN0YW1wLCBwcmludGYgfSA9IGZvcm1hdDtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZShcImRlYnVnXCIpKFwic2Utc2NyYXBlcjpTY3JhcGVNYW5hZ2VyXCIpO1xuY29uc3QgeyBDbHVzdGVyIH0gPSByZXF1aXJlKFwicHVwcGV0ZWVyLWNsdXN0ZXJcIik7XG5jb25zdCB2YW5pbGxhUHVwcGV0ZWVyID0gcmVxdWlyZShcInB1cHBldGVlclwiKTtcbmNvbnN0IHsgYWRkRXh0cmEgfSA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmFcIik7XG4vLyBjb25zdCBTdGVhbHRoID0gcmVxdWlyZShcInB1cHBldGVlci1leHRyYS1wbHVnaW4tc3RlYWx0aFwiKTtcbi8vIGNvbnN0IEFkYmxvY2tlclBsdWdpbiA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmEtcGx1Z2luLWFkYmxvY2tlclwiKTtcblxuY29uc3QgVXNlckFnZW50ID0gcmVxdWlyZShcInVzZXItYWdlbnRzXCIpO1xuY29uc3QgZmFjZWJvb2sgPSByZXF1aXJlKFwiLi9tb2R1bGVzL2ZhY2Vib29rX3NjcmFwZXIuanNcIik7XG5jb25zdCB5b3V0dWJlID0gcmVxdWlyZShcIi4vbW9kdWxlcy95b3V0dWJlX3NjcmFwZXIuanNcIik7XG5jb25zdCBiaWxpYmlsaSA9IHJlcXVpcmUoXCIuL21vZHVsZXMvYmlsaWJpbGlfc2NyYXBlci5qc1wiKTtcbi8vIGNvbnN0IGJpbmcgPSByZXF1aXJlKCcuL21vZHVsZXMvYmluZy5qcycpO1xuLy8gY29uc3QgeWFuZGV4ID0gcmVxdWlyZSgnLi9tb2R1bGVzL3lhbmRleC5qcycpO1xuLy8gY29uc3QgaW5mb3NwYWNlID0gcmVxdWlyZSgnLi9tb2R1bGVzL2luZm9zcGFjZS5qcycpO1xuLy8gY29uc3QgZHVja2R1Y2tnbyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9kdWNrZHVja2dvLmpzJyk7XG5jb25zdCBDdXN0b21Db25jdXJyZW5jeUltcGwgPSByZXF1aXJlKFwiLi9jb25jdXJyZW5jeS1pbXBsZW1lbnRhdGlvblwiKTtcbi8vIGNvbnN0IGF4aW9zID0gcmVxdWlyZShcImF4aW9zXCIpO1xuY29uc3QgTUFYX0FMTE9XRURfQlJPV1NFUlMgPSA2O1xuLy8gY29uc3QgcHVwcGV0ZWVyID0gcmVxdWlyZShcInB1cHBldGVlci1leHRyYVwiKTtcbi8vIGNvbnN0IF9TdGVhbHRoUGx1Z2luID0gcmVxdWlyZSgncHVwcGV0ZWVyLWV4dHJhLXBsdWdpbi1zdGVhbHRoJyk7XG4vLyBjb25zdCBfQWRibG9ja2VyUGx1Z2luID0gcmVxdWlyZSgncHVwcGV0ZWVyLWV4dHJhLXBsdWdpbi1hZGJsb2NrZXInKTtcblxuZnVuY3Rpb24gd3JpdGVfcmVzdWx0cyhmbmFtZSwgZGF0YSkge1xuICBmcy53cml0ZUZpbGVTeW5jKGZuYW1lLCBkYXRhLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikgdGhyb3cgZXJyO1xuICAgIGNvbnNvbGUubG9nKGBSZXN1bHRzIHdyaXR0ZW4gdG8gZmlsZSAke2ZuYW1lfWApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVhZF9rZXl3b3Jkc19mcm9tX2ZpbGUoZm5hbWUpIHtcbiAgbGV0IGt3cyA9IGZzLnJlYWRGaWxlU3luYyhmbmFtZSkudG9TdHJpbmcoKS5zcGxpdChvcy5FT0wpO1xuICAvLyBjbGVhbiBrZXl3b3Jkc1xuICBrd3MgPSBrd3MuZmlsdGVyKChrdykgPT4ge1xuICAgIHJldHVybiBrdy50cmltKCkubGVuZ3RoID4gMDtcbiAgfSk7XG4gIHJldHVybiBrd3M7XG59XG5cblxuZnVuY3Rpb24gZ2V0U2NyYXBlcihzZWFyY2hfZW5naW5lOnN0cmluZywgYXJnczphbnkpIHtcbiAgaWYgKHR5cGVvZiBzZWFyY2hfZW5naW5lID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIG5ldyB7XG4gICAgICBmYWNlYm9vazogZmFjZWJvb2suRmFjZWJvb2tTY3JhcGVyLFxuICAgICAgeW91dHViZTogeW91dHViZS5Zb3V0dWJlU2NyYXBlcixcbiAgICAgIGJpbGliaWxpOiBiaWxpYmlsaS5CaWxpYmlsaVNjcmFwZXIsXG4gICAgfVtzZWFyY2hfZW5naW5lXShhcmdzKTtcbiAgfSBcbiAgLy8gZWxzZSBpZiAodHlwZW9mIHNlYXJjaF9lbmdpbmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAvLyAgIHJldHVybiBuZXcgc2VhcmNoX2VuZ2luZShhcmdzKTtcbiAgLy8gfSBcbiAgZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYHNvY2lhbCBwbGF0Zm9ybSBtdXN0IGVpdGhlciBiZSBhIHN0cmluZyBvZiBjbGFzcyAoZnVuY3Rpb24pYFxuICAgICk7XG4gIH1cbn1cbnR5cGUgU01jb25maWcgPXtcbiAgbG9nZ2VyOntpbmZvOkZ1bmN0aW9ufTtcbiAga2V5d29yZHM6QXJyYXk8c3RyaW5nPjtcbiAgcHJveGllczpBcnJheTxzdHJpbmc+O1xuICBrZXl3b3JkX2ZpbGU6c3RyaW5nO1xuICBwcm94eV9maWxlOnN0cmluZztcbiAgdXNlX3Byb3hpZXNfb25seTpib29sZWFuO1xuICBjdXN0b21fZnVuYzpzdHJpbmc7XG4gIGNocm9tZV9mbGFnczpBcnJheTxzdHJpbmc+O1xuICBwdXBwZXRlZXJfY2x1c3Rlcl9jb25maWc6e1xuICAgIG1heENvbmN1cnJlbmN5Om51bWJlcjtcbiAgICBtb25pdG9yOmJvb2xlYW47XG4gICAgdGltZW91dDpudW1iZXI7XG4gIH1cbiAgcmFuZG9tX3VzZXJfYWdlbnQ6Ym9vbGVhbjtcbiAgdXNlcl9hZ2VudDpzdHJpbmc7XG4gIGhlYWRsZXNzOmJvb2xlYW47XG4gIHBsYXRmb3JtOnN0cmluZztcbn1cbmNsYXNzIFNjcmFwZU1hbmFnZXIge1xuICBjbHVzdGVyOntleGVjdXRlOkZ1bmN0aW9uO2lkbGU6RnVuY3Rpb247Y2xvc2U6RnVuY3Rpb259O1xuICBwbHVnZ2FibGU6e3N0YXJ0X2Jyb3dzZXI/OkZ1bmN0aW9uLGNsb3NlX2Jyb3dzZXI/OkZ1bmN0aW9uLGhhbmRsZV9yZXN1bHRzPzpGdW5jdGlvbixoYW5kbGVfbWV0YWRhdGE/OkZ1bmN0aW9ufTtcbiAgc2NyYXBlcjp7cnVuTG9naW46RnVuY3Rpb247d29ya2Vyc2VhcmNoZGF0YTpGdW5jdGlvbn07XG4gIGNvbnRleHQ6b2JqZWN0O1xuICBjb25maWc6U01jb25maWc7XG4gIGxvZ2dlcjp7aW5mbzpGdW5jdGlvbn07XG4gIGJyb3dzZXI6e25ld1BhZ2U6RnVuY3Rpb259O1xuICBwYWdlOm9iamVjdDtcbiAgbnVtQ2x1c3RlcnM6bnVtYmVyO1xuICB0bXBwYXRoOnN0cmluZztcbiAgcnVuTG9naW46RnVuY3Rpb247XG4gIGNvbnN0cnVjdG9yKGNvbmZpZywgY29udGV4dCA9IHt9KSB7XG4gICAgdGhpcy5jbHVzdGVyID0gbnVsbDtcbiAgICB0aGlzLnBsdWdnYWJsZSA9IG51bGw7XG4gICAgdGhpcy5zY3JhcGVyID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIFxuICAgIC8vIGF3YWl0IHRoaXMuZ2V0UmVtb3RlQ29uZmlnKGNhbXBhaWduSWQpXG5cbiAgICB0aGlzLmNvbmZpZyA9IF8uZGVmYXVsdHMoY29uZmlnLCB7XG4gICAgICAvLyByZW1vdGVfYWRkOmVuZGNvZmlnLlJFTU9URUFERCxcbiAgICAgIC8vIHJlbW90ZV91c2VybmFtZTplbmRjb2ZpZy5VU0VSTkFNRSxcbiAgICAgIC8vIHJlbW90ZV9wYXNzd29yZDplbmRjb2ZpZy5QQVNTV09SRCxcbiAgICAgIC8vIHRoZSB1c2VyIGFnZW50IHRvIHNjcmFwZSB3aXRoXG4gICAgICB1c2VyX2FnZW50OlxuICAgICAgICBcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMDcuMC4wLjAgU2FmYXJpLzUzNy4zNlwiLFxuICAgICAgLy8gaWYgcmFuZG9tX3VzZXJfYWdlbnQgaXMgc2V0IHRvIFRydWUsIGEgcmFuZG9tIHVzZXIgYWdlbnQgaXMgY2hvc2VuXG4gICAgICByYW5kb21fdXNlcl9hZ2VudDogZmFsc2UsXG4gICAgICAvLyB3aGV0aGVyIHRvIHNlbGVjdCBtYW51YWwgc2V0dGluZ3MgaW4gdmlzaWJsZSBtb2RlXG4gICAgICBzZXRfbWFudWFsX3NldHRpbmdzOiBmYWxzZSxcbiAgICAgIC8vIGxvZyBpcCBhZGRyZXNzIGRhdGFcbiAgICAgIGxvZ19pcF9hZGRyZXNzOiBmYWxzZSxcbiAgICAgIC8vIGxvZyBodHRwIGhlYWRlcnNcbiAgICAgIGxvZ19odHRwX2hlYWRlcnM6IGZhbHNlLFxuICAgICAgLy8gaG93IGxvbmcgdG8gc2xlZXAgYmV0d2VlbiByZXF1ZXN0cy4gYSByYW5kb20gc2xlZXAgaW50ZXJ2YWwgd2l0aGluIHRoZSByYW5nZSBbYSxiXVxuICAgICAgLy8gaXMgZHJhd24gYmVmb3JlIGV2ZXJ5IHJlcXVlc3QuIGVtcHR5IHN0cmluZyBmb3Igbm8gc2xlZXBpbmcuXG4gICAgICBzbGVlcF9yYW5nZTogbnVsbCxcblxuICAgICAgbG9nZ2VyOiBjcmVhdGVMb2dnZXIoe1xuICAgICAgICBsZXZlbDogXCJpbmZvXCIsXG4gICAgICAgIGZvcm1hdDogY29tYmluZShcbiAgICAgICAgICB0aW1lc3RhbXAoKSxcbiAgICAgICAgICBwcmludGYoKHsgbGV2ZWwsIG1lc3NhZ2UsIHRpbWVzdGFtcCB9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGltZXN0YW1wfSBbJHtsZXZlbH1dICR7bWVzc2FnZX1gO1xuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIHRyYW5zcG9ydHM6IFtuZXcgdHJhbnNwb3J0cy5Db25zb2xlKCldLFxuICAgICAgfSksXG4gICAgICBwbGF0Zm9ybTogXCJmYWNlYm9va1wiLFxuICAgICAga2V5d29yZHM6IFtcIm5vZGVqcyByb2Nrc1wiXSxcbiAgICAgIC8vIHdoZXRoZXIgdG8gc3RhcnQgdGhlIGJyb3dzZXIgaW4gaGVhZGxlc3MgbW9kZVxuICAgICAgaGVhZGxlc3M6IHRydWUsXG4gICAgICAvLyBzcGVjaWZ5IGZsYWdzIHBhc3NlZCB0byBjaHJvbWUgaGVyZVxuICAgICAgLy8gQWJvdXQgb3VyIGRlZmF1bHRzIHZhbHVlcyBodHRwczovL3BldGVyLnNoL2V4cGVyaW1lbnRzL2Nocm9taXVtLWNvbW1hbmQtbGluZS1zd2l0Y2hlcy9cbiAgICAgIGNocm9tZV9mbGFnczogW1xuICAgICAgICBcIi0tZGlzYWJsZS1pbmZvYmFyc1wiLFxuICAgICAgICBcIi0td2luZG93LXBvc2l0aW9uPTAsMFwiLFxuICAgICAgICBcIi0taWdub3JlLWNlcnRpZmNhdGUtZXJyb3JzXCIsXG4gICAgICAgIFwiLS1pZ25vcmUtY2VydGlmY2F0ZS1lcnJvcnMtc3BraS1saXN0XCIsXG4gICAgICAgIFwiLS1uby1zYW5kYm94XCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLXNldHVpZC1zYW5kYm94XCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWRldi1zaG0tdXNhZ2VcIixcbiAgICAgICAgXCItLWRpc2FibGUtYWNjZWxlcmF0ZWQtMmQtY2FudmFzXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWdwdVwiLFxuICAgICAgICBcIi0td2luZG93LXNpemU9MTI4MCw3NjhcIixcbiAgICAgICAgXCItLXN0YXJ0LWZ1bGxzY3JlZW5cIixcbiAgICAgICAgXCItLWhpZGUtc2Nyb2xsYmFyc1wiLFxuICAgICAgICBcIi0tZGlzYWJsZS1ub3RpZmljYXRpb25zXCIsXG4gICAgICBdLFxuICAgICAgLy9maXggZ29vZ2xlIGFjY291bnQgY2FuIG5vdCBsb2dpblxuICAgICAgaWdub3JlRGVmYXVsdEFyZ3M6IFtcbiAgICAgICAgXCItLWVuYWJsZS1hdXRvbWF0aW9uXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWV4dGVuc2lvbnNcIixcbiAgICAgICAgXCItLWRpc2FibGUtZGVmYXVsdC1hcHBzXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWNvbXBvbmVudC1leHRlbnNpb25zLXdpdGgtYmFja2dyb3VuZC1wYWdlc1wiLFxuICAgICAgXSxcbiAgICAgIC8vIHRoZSBudW1iZXIgb2YgcGFnZXMgdG8gc2NyYXBlIGZvciBlYWNoIGtleXdvcmRcbiAgICAgIG51bV9wYWdlczogMSxcbiAgICAgIC8vIHBhdGggdG8gb3V0cHV0IGZpbGUsIGRhdGEgd2lsbCBiZSBzdG9yZWQgaW4gSlNPTlxuICAgICAgb3V0cHV0X2ZpbGU6IFwiXCIsXG4gICAgICAvLyB3aGV0aGVyIHRvIGFsc28gcGFzc3RocnUgYWxsIHRoZSBodG1sIG91dHB1dCBvZiB0aGUgc2VycCBwYWdlc1xuICAgICAgaHRtbF9vdXRwdXQ6IGZhbHNlLFxuICAgICAgLy8gd2hldGhlciB0byBzdHJpcCBKUyBhbmQgQ1NTIGZyb20gdGhlIGh0bWxfb3V0cHV0XG4gICAgICAvLyBoYXMgb25seSBhbiBlZmZlY3QgaWYgYGh0bWxfb3V0cHV0YCBpcyB0cnVlXG4gICAgICBjbGVhbl9odG1sX291dHB1dDogdHJ1ZSxcbiAgICAgIC8vIHJlbW92ZSBhbGwgZGF0YSBpbWFnZXMgZnJvbSB0aGUgaHRtbFxuICAgICAgY2xlYW5fZGF0YV9pbWFnZXM6IHRydWUsXG4gICAgICAvLyB3aGV0aGVyIHRvIHJldHVybiBhIHNjcmVlbnNob3Qgb2Ygc2VycCBwYWdlcyBhcyBiNjQgZGF0YVxuICAgICAgc2NyZWVuX291dHB1dDogZmFsc2UsXG4gICAgICAvLyBTY3JhcGUgdXJsIGZyb20gbG9jYWwgZmlsZS4gTWFpbmx5IHVzZWQgZm9yIHRlc3RpbmcuXG4gICAgICBzY3JhcGVfZnJvbV9maWxlOiBcIlwiLFxuICAgICAgLy8gd2hldGhlciB0byBwcmV2ZW50IGltYWdlcywgY3NzLCBmb250cyBhbmQgbWVkaWEgZnJvbSBiZWluZyBsb2FkZWRcbiAgICAgIC8vIHdpbGwgc3BlZWQgdXAgc2NyYXBpbmcgYSBncmVhdCBkZWFsXG4gICAgICBibG9ja19hc3NldHM6IHRydWUsXG4gICAgICAvLyBwYXRoIHRvIGpzIG1vZHVsZSB0aGF0IGV4dGVuZHMgZnVuY3Rpb25hbGl0eVxuICAgICAgLy8gdGhpcyBtb2R1bGUgc2hvdWxkIGV4cG9ydCB0aGUgZnVuY3Rpb25zOlxuICAgICAgLy8gZ2V0X2Jyb3dzZXIsIGhhbmRsZV9tZXRhZGF0YSwgY2xvc2VfYnJvd3NlclxuICAgICAgLy9jdXN0b21fZnVuYzogcmVzb2x2ZSgnZXhhbXBsZXMvcGx1Z2dhYmxlLmpzJyksXG4gICAgICBjdXN0b21fZnVuYzogbnVsbCxcbiAgICAgIHRocm93X29uX2RldGVjdGlvbjogZmFsc2UsXG4gICAgICAvLyBMaXN0IG9mIHByb3hpZXMgdG8gdXNlIFsnc29ja3M1Oi8vNzguOTQuMTcyLjQyOjEwODAnLCAnaHR0cDovL2xvY2FsaG9zdDoxMDgwJ11cbiAgICAgIHByb3hpZXM6IG51bGwsXG4gICAgICAvLyBhIGZpbGUgd2l0aCBvbmUgcHJveHkgcGVyIGxpbmUuIEV4YW1wbGU6XG4gICAgICAvLyBzb2NrczU6Ly83OC45NC4xNzIuNDI6MTA4MFxuICAgICAgLy8gaHR0cDovLzExOC4xNzQuMjMzLjEwOjQ4NDAwXG4gICAgICBwcm94eV9maWxlOiBcIlwiLFxuICAgICAgLy8gd2hldGhlciB0byB1c2UgcHJveGllcyBvbmx5XG4gICAgICAvLyB3aGVuIHRoaXMgaXMgc2V0IHRvIHRydWUsIHNlLXNjcmFwZXIgd2lsbCBub3QgdXNlXG4gICAgICAvLyB5b3VyIGRlZmF1bHQgSVAgYWRkcmVzc1xuICAgICAgdXNlX3Byb3hpZXNfb25seTogZmFsc2UsXG4gICAgICAvLyBjaGVjayBpZiBoZWFkbGVzcyBjaHJvbWUgZXNjYXBlcyBjb21tb24gZGV0ZWN0aW9uIHRlY2huaXF1ZXNcbiAgICAgIC8vIHRoaXMgaXMgYSBxdWljayB0ZXN0IGFuZCBzaG91bGQgYmUgdXNlZCBmb3IgZGVidWdnaW5nXG4gICAgICB0ZXN0X2V2YXNpb246IGZhbHNlLFxuICAgICAgYXBwbHlfZXZhc2lvbl90ZWNobmlxdWVzOiB0cnVlLFxuICAgICAgLy8gc2V0dGluZ3MgZm9yIHB1cHBldGVlci1jbHVzdGVyXG4gICAgICBwdXBwZXRlZXJfY2x1c3Rlcl9jb25maWc6IHtcbiAgICAgICAgdGltZW91dDogMzAgKiA2MCAqIDEwMDAsIC8vIG1heCB0aW1lb3V0IHNldCB0byAzMCBtaW51dGVzXG4gICAgICAgIG1vbml0b3I6IGZhbHNlLFxuICAgICAgICBjb25jdXJyZW5jeTogQ2x1c3Rlci5DT05DVVJSRU5DWV9CUk9XU0VSLFxuICAgICAgICBtYXhDb25jdXJyZW5jeTogMSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgXG4gICAgdGhpcy5sb2dnZXIgPSB0aGlzLmNvbmZpZy5sb2dnZXI7XG5cbiAgICBpZiAoY29uZmlnLnNsZWVwX3JhbmdlKSB7XG4gICAgICAvLyBwYXJzZSBhbiBhcnJheVxuICAgICAgY29uZmlnLnNsZWVwX3JhbmdlID0gZXZhbChjb25maWcuc2xlZXBfcmFuZ2UpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGNvbmZpZy5zbGVlcF9yYW5nZS5sZW5ndGggIT09IDIgXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgXCJzbGVlcF9yYW5nZSBpcyBub3QgYSB2YWxpZCBhcnJheSBvZiB0d28gaW50ZWdlcnMuXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZzLmV4aXN0c1N5bmModGhpcy5jb25maWcua2V5d29yZF9maWxlKSkge1xuICAgICAgdGhpcy5jb25maWcua2V5d29yZHMgPSByZWFkX2tleXdvcmRzX2Zyb21fZmlsZSh0aGlzLmNvbmZpZy5rZXl3b3JkX2ZpbGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5wcm94aWVzICYmIHRoaXMuY29uZmlnLnByb3h5X2ZpbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJFaXRoZXIgdXNlIGEgcHJveHlfZmlsZSBvciBzcGVjaWZ5IGEgcHJveHkgZm9yIGFsbCBjb25uZWN0aW9ucy4gRG8gbm90IHVzZSBib3RoIG9wdGlvbnMuXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLnByb3h5X2ZpbGUpIHtcbiAgICAgIHRoaXMuY29uZmlnLnByb3hpZXMgPSByZWFkX2tleXdvcmRzX2Zyb21fZmlsZSh0aGlzLmNvbmZpZy5wcm94eV9maWxlKTtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oYCR7dGhpcy5jb25maWcucHJveGllcy5sZW5ndGh9IHByb3hpZXMgcmVhZCBmcm9tIGZpbGUuYCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5wcm94aWVzICYmIHRoaXMuY29uZmlnLnVzZV9wcm94aWVzX29ubHkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJNdXN0IHByb3ZpZGUgYXQgbGVhc3Qgb25lIHByb3h5IGluIHByb3hpZXMgaWYgeW91IGVuYWJsZSB1c2VfcHJveGllc19vbmx5XCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZGVidWcoXCJ0aGlzLmNvbmZpZz0lT1wiLCB0aGlzLmNvbmZpZyk7XG4gIH1cblxuICAvKlxuICAgKiBMYXVuY2hlcyB0aGUgcHVwcGV0ZWVyIGNsdXN0ZXIgb3IgYnJvd3Nlci5cbiAgICpcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBicm93c2VyIHdhcyBzdWNjZXNzZnVsbHkgbGF1bmNoZWQuIE90aGVyd2lzZSB3aWxsIHJldHVybiBmYWxzZS5cbiAgICovXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5jdXN0b21fZnVuYykge1xuICAgICAgaWYgKGZzLmV4aXN0c1N5bmModGhpcy5jb25maWcuY3VzdG9tX2Z1bmMpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgUGx1Z2dhYmxlQ2xhc3MgPSByZXF1aXJlKHRoaXMuY29uZmlnLmN1c3RvbV9mdW5jKTtcbiAgICAgICAgICB0aGlzLnBsdWdnYWJsZSA9IG5ldyBQbHVnZ2FibGVDbGFzcyh7XG4gICAgICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgICAgICAgY29udGV4dDogdGhpcy5jb250ZXh0LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGV4Y2VwdGlvbik7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBGaWxlIFwiJHt0aGlzLmNvbmZpZy5jdXN0b21fZnVuY31cIiBkb2VzIG5vdCBleGlzdCFgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNocm9tZV9mbGFncyA9IF8uY2xvbmUodGhpcy5jb25maWcuY2hyb21lX2ZsYWdzKTtcblxuICAgIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5zdGFydF9icm93c2VyKSB7XG4gICAgICAvLyBsYXVuY2hfYXJncy5jb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgIHRoaXMuYnJvd3NlciA9IGF3YWl0IHRoaXMucGx1Z2dhYmxlLnN0YXJ0X2Jyb3dzZXIoe1xuICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgfSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIjIyOVwiKVxuICAgICAgdGhpcy5wYWdlID0gYXdhaXQgdGhpcy5icm93c2VyLm5ld1BhZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgXG4gICAgICAvLyBpZiBubyBjdXN0b20gc3RhcnRfYnJvd3NlciBmdW5jdGlvbmFsaXR5IHdhcyBnaXZlblxuICAgICAgLy8gdXNlIHB1cHBldGVlci1jbHVzdGVyIGZvciBzY3JhcGluZ1xuXG4gICAgICBsZXQgcHJveGllcztcbiAgICAgIC8vIGlmIHdlIGhhdmUgYXQgbGVhc3Qgb25lIHByb3h5LCBhbHdheXMgdXNlIENPTkNVUlJFTkNZX0JST1dTRVJcbiAgICAgIC8vIGFuZCBzZXQgbWF4Q29uY3VycmVuY3kgdG8gdGhpcy5jb25maWcucHJveGllcy5sZW5ndGggKyAxXG4gICAgICAvLyBlbHNlIHVzZSB3aGF0ZXZlciB0aGlzLmNvbmZpZ3VyYXRpb24gd2FzIHBhc3NlZFxuICAgICAgaWYgKHRoaXMuY29uZmlnLnByb3hpZXMgJiYgdGhpcy5jb25maWcucHJveGllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGJlY2F1c2Ugd2UgdXNlIHJlYWwgYnJvd3NlcnMsIHdlIHJhbiBvdXQgb2YgbWVtb3J5IG9uIG5vcm1hbCBsYXB0b3BzXG4gICAgICAgIC8vIHdoZW4gdXNpbmcgbW9yZSB0aGFuIG1heWJlIDUgb3IgNiBicm93c2Vycy5cbiAgICAgICAgLy8gdGhlcmVmb3JlIGhhcmRjb2RlIGEgbGltaXQgaGVyZVxuICAgICAgICAvLyBUT0RPIG5vdCBzdXJlIHRoaXMgd2hhdCB3ZSB3YW50XG4gICAgICAgIHRoaXMubnVtQ2x1c3RlcnMgPSBNYXRoLm1pbihcbiAgICAgICAgICB0aGlzLmNvbmZpZy5wcm94aWVzLmxlbmd0aCArICh0aGlzLmNvbmZpZy51c2VfcHJveGllc19vbmx5ID8gMCA6IDEpLFxuICAgICAgICAgIE1BWF9BTExPV0VEX0JST1dTRVJTXG4gICAgICAgICk7XG4gICAgICAgIHByb3hpZXMgPSBfLmNsb25lKHRoaXMuY29uZmlnLnByb3hpZXMpO1xuXG4gICAgICAgIC8vIEluc2VydCBhIGZpcnN0IGNvbmZpZyB3aXRob3V0IHByb3h5IGlmIHVzZV9wcm94eV9vbmx5IGlzIGZhbHNlXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy51c2VfcHJveGllc19vbmx5ID09PSBmYWxzZSkge1xuICAgICAgICAgIHByb3hpZXMudW5zaGlmdChudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5udW1DbHVzdGVycyA9IHRoaXMuY29uZmlnLnB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZy5tYXhDb25jdXJyZW5jeTtcbiAgICAgICAgcHJveGllcyA9IF8udGltZXModGhpcy5udW1DbHVzdGVycywgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFVzaW5nICR7dGhpcy5udW1DbHVzdGVyc30gY2x1c3RlcnMuYCk7XG5cbiAgICAgIC8vIEdpdmUgdGhlIHBlciBicm93c2VyIG9wdGlvbnNcbiAgICAgIGNvbnN0IHBlckJyb3dzZXJPcHRpb25zID0gXy5tYXAocHJveGllcywgKHByb3h5KSA9PiB7XG4gICAgICAgIGNvbnN0IHVzZXJBZ2VudCA9IHRoaXMuY29uZmlnLnJhbmRvbV91c2VyX2FnZW50XG4gICAgICAgICAgPyBuZXcgVXNlckFnZW50KHsgZGV2aWNlQ2F0ZWdvcnk6IFwiZGVza3RvcFwiIH0pLnRvU3RyaW5nKClcbiAgICAgICAgICA6IHRoaXMuY29uZmlnLnVzZXJfYWdlbnQ7XG4gICAgICAgIGxldCBhcmdzID0gY2hyb21lX2ZsYWdzLmNvbmNhdChbYC0tdXNlci1hZ2VudD0ke3VzZXJBZ2VudH1gXSk7XG5cbiAgICAgICAgaWYgKHByb3h5KSB7XG4gICAgICAgICAgYXJncyA9IGFyZ3MuY29uY2F0KFtgLS1wcm94eS1zZXJ2ZXI9JHtwcm94eX1gXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhlYWRsZXNzOiB0aGlzLmNvbmZpZy5oZWFkbGVzcyxcbiAgICAgICAgICBpZ25vcmVIVFRQU0Vycm9yczogdHJ1ZSxcbiAgICAgICAgICBhcmdzLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGRlYnVnKFwicGVyQnJvd3Nlck9wdGlvbnM9JU9cIiwgcGVyQnJvd3Nlck9wdGlvbnMpO1xuXG4gICAgICAvLyBwdXBwZXRlZXIudXNlKF9TdGVhbHRoUGx1Z2luKCkpO1xuICAgICAgLy8gcHVwcGV0ZWVyLnVzZShfQWRibG9ja2VyUGx1Z2luKCkpO1xuXG4gICAgICBjb25zdCBwdXBwZXRlZXIgPSBhZGRFeHRyYSh2YW5pbGxhUHVwcGV0ZWVyKTtcblxuICAgICAgLy8gQWRkIHN0ZWFsdGggcGx1Z2luIGFuZCB1c2UgZGVmYXVsdHMgKGFsbCB0cmlja3MgdG8gaGlkZSBwdXBwZXRlZXIgdXNhZ2UpXG4gICAgICAvLyAgcHVwcGV0ZWVyLnVzZShTdGVhbHRoKCkpO1xuXG4gICAgICAvLyBBZGQgYWRibG9ja2VyIHBsdWdpbiB0byBibG9jayBhbGwgYWRzIGFuZCB0cmFja2VycyAoc2F2ZXMgYmFuZHdpZHRoKVxuICAgICAgLy8gcHVwcGV0ZWVyLnVzZShBZGJsb2NrZXJQbHVnaW4oeyBibG9ja1RyYWNrZXJzOiB0cnVlIH0pKTtcblxuICAgICAgdGhpcy5jbHVzdGVyID0gYXdhaXQgQ2x1c3Rlci5sYXVuY2goe1xuICAgICAgICBwdXBwZXRlZXIsXG4gICAgICAgIG1vbml0b3I6IHRoaXMuY29uZmlnLnB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZy5tb25pdG9yLFxuICAgICAgICB0aW1lb3V0OiB0aGlzLmNvbmZpZy5wdXBwZXRlZXJfY2x1c3Rlcl9jb25maWcudGltZW91dCwgLy8gbWF4IHRpbWVvdXQgc2V0IHRvIDMwIG1pbnV0ZXNcbiAgICAgICAgY29uY3VycmVuY3k6IEN1c3RvbUNvbmN1cnJlbmN5SW1wbCxcbiAgICAgICAgbWF4Q29uY3VycmVuY3k6IHRoaXMubnVtQ2x1c3RlcnMsXG4gICAgICAgIHB1cHBldGVlck9wdGlvbnM6IHtcbiAgICAgICAgICAvLyBwdXBwZXRlZXI6cHVwcGV0ZWVyLFxuICAgICAgICAgIHBlckJyb3dzZXJPcHRpb25zOiBwZXJCcm93c2VyT3B0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIGxvZ2luIHRoZSBzb2NpbGEgbWVkaWEgcGxhdGZvcm1cbiAgICovXG4gIGFzeW5jIGxvZ2luKHNjcmFwZV9jb25maWcgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIHNjcmFwZV9jb25maWcpO1xuXG4gICAgLy8gdmFyIHJlc3VsdHMgPSB7fTtcbiAgICAvLyB2YXIgbnVtX3JlcXVlc3RzID0gMDtcbiAgICAvLyB2YXIgbWV0YWRhdGEgPSB7fTtcbiAgICAvLyB2YXIgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcblxuICAgIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5zdGFydF9icm93c2VyKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZy5wbGF0Zm9ybSlcbiAgICAgIHRoaXMuc2NyYXBlciA9IGdldFNjcmFwZXIodGhpcy5jb25maWcucGxhdGZvcm0sIHtcbiAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgICAgY29udGV4dDogdGhpcy5jb250ZXh0LFxuICAgICAgICBwbHVnZ2FibGU6IHRoaXMucGx1Z2dhYmxlLFxuICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICAgIHRtcHBhdGg6IHRoaXMudG1wcGF0aCxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLnNjcmFwZXIucnVuTG9naW4odGhpcy5wYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRWFjaCBicm93c2VyIHdpbGwgZ2V0IE4vKEsrMSkga2V5d29yZHMgYW5kIHdpbGwgaXNzdWUgTi8oSysxKSAqIE0gdG90YWwgcmVxdWVzdHMgdG8gdGhlIHNlYXJjaCBlbmdpbmUuXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3B1cHBldGVlci9pc3N1ZXMvNjc4XG4gICAgICAvLyBUaGUgcXVlc3Rpb24gaXM6IElzIGl0IHBvc3NpYmxlIHRvIHNldCBwcm94aWVzIHBlciBQYWdlPyBQZXIgQnJvd3Nlcj9cbiAgICAgIC8vIGFzIGZhciBhcyBJIGNhbiBzZWUsIHB1cHBldGVlciBjbHVzdGVyIHVzZXMgdGhlIHNhbWUgcHVwcGV0ZWVyT3B0aW9uc1xuICAgICAgLy8gZm9yIGV2ZXJ5IGJyb3dzZXIgaW5zdGFuY2UuIFdlIHdpbGwgdXNlIG91ciBjdXN0b20gcHVwcGV0ZWVyLWNsdXN0ZXIgdmVyc2lvbi5cbiAgICAgIC8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3Byb3h5LWNoYWluXG4gICAgICAvLyB0aGlzIGFuc3dlciBsb29rcyBuaWNlOiBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3B1cHBldGVlci9pc3N1ZXMvNjc4I2lzc3VlY29tbWVudC0zODkwOTYwNzdcbiAgICAgIGxldCBjaHVua3MgPSBbXTtcbiAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdGhpcy5udW1DbHVzdGVyczsgbisrKSB7XG4gICAgICAgIGNodW5rcy5wdXNoKFtdKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5jb25maWcua2V5d29yZHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgY2h1bmtzW2sgJSB0aGlzLm51bUNsdXN0ZXJzXS5wdXNoKHRoaXMuY29uZmlnLmtleXdvcmRzW2tdKTtcbiAgICAgIH1cblxuICAgICAgZGVidWcoXCJjaHVua3M9JW9cIiwgY2h1bmtzKTtcblxuICAgICAgbGV0IGV4ZWNQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBjaHVua3MubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gXy5jbG9uZSh0aGlzLmNvbmZpZyk7XG4gICAgICAgIGNvbmZpZy5rZXl3b3JkcyA9IGNodW5rc1tjXTtcblxuICAgICAgICB2YXIgb2JqID0gZ2V0U2NyYXBlcih0aGlzLmNvbmZpZy5wbGF0Zm9ybSwge1xuICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgICAgIHBsdWdnYWJsZTogdGhpcy5wbHVnZ2FibGUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBib3VuZE1ldGhvZCA9IG9iai5ydW5Mb2dpbi5iaW5kKG9iaik7XG4gICAgICAgIGV4ZWNQcm9taXNlcy5wdXNoKHRoaXMuY2x1c3Rlci5leGVjdXRlKHt9LCBib3VuZE1ldGhvZCkpO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChleGVjUHJvbWlzZXMpO1xuXG4gICAgICAvLyBNZXJnZSByZXN1bHRzIGFuZCBtZXRhZGF0YSBwZXIga2V5d29yZFxuICAgICAgLy8gZm9yIChsZXQgcHJvbWlzZVJldHVybiBvZiBwcm9taXNlUmV0dXJucykge1xuICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0cywgcHJvbWlzZVJldHVybi5yZXN1bHRzKTtcbiAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKG1ldGFkYXRhLCBwcm9taXNlUmV0dXJuLm1ldGFkYXRhKTtcbiAgICAgIC8vICAgICBudW1fcmVxdWVzdHMgKz0gcHJvbWlzZVJldHVybi5udW1fcmVxdWVzdHM7XG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgLy8gbGV0IHRpbWVEZWx0YSA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XG4gICAgLy8gbGV0IG1zX3Blcl9yZXF1ZXN0ID0gdGltZURlbHRhL251bV9yZXF1ZXN0cztcblxuICAgIC8vIHRoaXMubG9nZ2VyLmluZm8oYFNjcmFwZXIgdG9vayAke3RpbWVEZWx0YX1tcyB0byBwZXJmb3JtICR7bnVtX3JlcXVlc3RzfSByZXF1ZXN0cy5gKTtcbiAgICAvLyB0aGlzLmxvZ2dlci5pbmZvKGBPbiBhdmVyYWdlIG1zL3JlcXVlc3Q6ICR7bXNfcGVyX3JlcXVlc3R9bXMvcmVxdWVzdGApO1xuXG4gICAgLy8gaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9yZXN1bHRzKSB7XG4gICAgLy8gICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9yZXN1bHRzKHJlc3VsdHMpO1xuICAgIC8vIH1cblxuICAgIC8vIG1ldGFkYXRhLmVsYXBzZWRfdGltZSA9IHRpbWVEZWx0YS50b1N0cmluZygpO1xuICAgIC8vIG1ldGFkYXRhLm1zX3Blcl9rZXl3b3JkID0gbXNfcGVyX3JlcXVlc3QudG9TdHJpbmcoKTtcbiAgICAvLyBtZXRhZGF0YS5udW1fcmVxdWVzdHMgPSBudW1fcmVxdWVzdHM7XG5cbiAgICAvLyBkZWJ1ZygnbWV0YWRhdGE9JU8nLCBtZXRhZGF0YSk7XG5cbiAgICAvLyBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX21ldGFkYXRhKSB7XG4gICAgLy8gICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9tZXRhZGF0YShtZXRhZGF0YSk7XG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKHRoaXMuY29uZmlnLm91dHB1dF9maWxlKSB7XG4gICAgLy8gICAgIHRoaXMubG9nZ2VyLmluZm8oYFdyaXRpbmcgcmVzdWx0cyB0byAke3RoaXMuY29uZmlnLm91dHB1dF9maWxlfWApO1xuICAgIC8vICAgICB3cml0ZV9yZXN1bHRzKHRoaXMuY29uZmlnLm91dHB1dF9maWxlLCBKU09OLnN0cmluZ2lmeShyZXN1bHRzLCBudWxsLCA0KSk7XG4gICAgLy8gfVxuXG4gICAgLy8gcmV0dXJuIHtcbiAgICAvLyAgICAgcmVzdWx0czogcmVzdWx0cyxcbiAgICAvLyAgICAgbWV0YWRhdGE6IG1ldGFkYXRhIHx8IHt9LFxuICAgIC8vIH07XG4gIH1cblxuICAvKlxuICAgKiBnZXQgZGF0YSB1cmwgZnJvbSBwbGF0Zm9ybVxuICAgKi9cbiAgYXN5bmMgc2VhcmNoZGF0YShzY3JhcGVfY29uZmlnID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcblxuICAgIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5zdGFydF9icm93c2VyKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZy5wbGF0Zm9ybSlcbiAgICAgIHRoaXMuc2NyYXBlciA9IGdldFNjcmFwZXIodGhpcy5jb25maWcucGxhdGZvcm0sIHtcbiAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgICAgY29udGV4dDogdGhpcy5jb250ZXh0LFxuICAgICAgICBwbHVnZ2FibGU6IHRoaXMucGx1Z2dhYmxlLFxuICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICAgIHRtcHBhdGg6IHRoaXMudG1wcGF0aCxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLnNjcmFwZXIud29ya2Vyc2VhcmNoZGF0YSh0aGlzLnBhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBFYWNoIGJyb3dzZXIgd2lsbCBnZXQgTi8oSysxKSBrZXl3b3JkcyBhbmQgd2lsbCBpc3N1ZSBOLyhLKzEpICogTSB0b3RhbCByZXF1ZXN0cyB0byB0aGUgc2VhcmNoIGVuZ2luZS5cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvcHVwcGV0ZWVyL2lzc3Vlcy82NzhcbiAgICAgIC8vIFRoZSBxdWVzdGlvbiBpczogSXMgaXQgcG9zc2libGUgdG8gc2V0IHByb3hpZXMgcGVyIFBhZ2U/IFBlciBCcm93c2VyP1xuICAgICAgLy8gYXMgZmFyIGFzIEkgY2FuIHNlZSwgcHVwcGV0ZWVyIGNsdXN0ZXIgdXNlcyB0aGUgc2FtZSBwdXBwZXRlZXJPcHRpb25zXG4gICAgICAvLyBmb3IgZXZlcnkgYnJvd3NlciBpbnN0YW5jZS4gV2Ugd2lsbCB1c2Ugb3VyIGN1c3RvbSBwdXBwZXRlZXItY2x1c3RlciB2ZXJzaW9uLlxuICAgICAgLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvcHJveHktY2hhaW5cbiAgICAgIC8vIHRoaXMgYW5zd2VyIGxvb2tzIG5pY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvcHVwcGV0ZWVyL2lzc3Vlcy82NzgjaXNzdWVjb21tZW50LTM4OTA5NjA3N1xuICAgICAgbGV0IGNodW5rcyA9IFtdO1xuICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB0aGlzLm51bUNsdXN0ZXJzOyBuKyspIHtcbiAgICAgICAgY2h1bmtzLnB1c2goW10pO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmNvbmZpZy5rZXl3b3Jkcy5sZW5ndGg7IGsrKykge1xuICAgICAgICBjaHVua3NbayAlIHRoaXMubnVtQ2x1c3RlcnNdLnB1c2godGhpcy5jb25maWcua2V5d29yZHNba10pO1xuICAgICAgfVxuXG4gICAgICBkZWJ1ZyhcImNodW5rcz0lb1wiLCBjaHVua3MpO1xuXG4gICAgICBsZXQgZXhlY1Byb21pc2VzID0gW107XG4gICAgICBmb3IgKHZhciBjID0gMDsgYyA8IGNodW5rcy5sZW5ndGg7IGMrKykge1xuICAgICAgICBjb25zdCBjb25maWcgPSBfLmNsb25lKHRoaXMuY29uZmlnKTtcbiAgICAgICAgY29uZmlnLmtleXdvcmRzID0gY2h1bmtzW2NdO1xuXG4gICAgICAgIHZhciBvYmogPSBnZXRTY3JhcGVyKHRoaXMuY29uZmlnLnBsYXRmb3JtLCB7XG4gICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgY29udGV4dDoge30sXG4gICAgICAgICAgcGx1Z2dhYmxlOiB0aGlzLnBsdWdnYWJsZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGJvdW5kTWV0aG9kID0gb2JqLndvcmtlcnNlYXJjaGRhdGEuYmluZChvYmopO1xuICAgICAgICBleGVjUHJvbWlzZXMucHVzaCh0aGlzLmNsdXN0ZXIuZXhlY3V0ZSh7fSwgYm91bmRNZXRob2QpKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoZXhlY1Byb21pc2VzKTtcblxuICAgICAgLy8gTWVyZ2UgcmVzdWx0cyBhbmQgbWV0YWRhdGEgcGVyIGtleXdvcmRcbiAgICAgIC8vIGZvciAobGV0IHByb21pc2VSZXR1cm4gb2YgcHJvbWlzZVJldHVybnMpIHtcbiAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKHJlc3VsdHMsIHByb21pc2VSZXR1cm4ucmVzdWx0cyk7XG4gICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihtZXRhZGF0YSwgcHJvbWlzZVJldHVybi5tZXRhZGF0YSk7XG4gICAgICAvLyAgICAgbnVtX3JlcXVlc3RzICs9IHByb21pc2VSZXR1cm4ubnVtX3JlcXVlc3RzO1xuICAgICAgLy8gfVxuICAgIH1cblxuICAgIC8vIGxldCB0aW1lRGVsdGEgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgIC8vIGxldCBtc19wZXJfcmVxdWVzdCA9IHRpbWVEZWx0YS9udW1fcmVxdWVzdHM7XG5cbiAgICAvLyB0aGlzLmxvZ2dlci5pbmZvKGBTY3JhcGVyIHRvb2sgJHt0aW1lRGVsdGF9bXMgdG8gcGVyZm9ybSAke251bV9yZXF1ZXN0c30gcmVxdWVzdHMuYCk7XG4gICAgLy8gdGhpcy5sb2dnZXIuaW5mbyhgT24gYXZlcmFnZSBtcy9yZXF1ZXN0OiAke21zX3Blcl9yZXF1ZXN0fW1zL3JlcXVlc3RgKTtcblxuICAgIC8vIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfcmVzdWx0cykge1xuICAgIC8vICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfcmVzdWx0cyhyZXN1bHRzKTtcbiAgICAvLyB9XG5cbiAgICAvLyBtZXRhZGF0YS5lbGFwc2VkX3RpbWUgPSB0aW1lRGVsdGEudG9TdHJpbmcoKTtcbiAgICAvLyBtZXRhZGF0YS5tc19wZXJfa2V5d29yZCA9IG1zX3Blcl9yZXF1ZXN0LnRvU3RyaW5nKCk7XG4gICAgLy8gbWV0YWRhdGEubnVtX3JlcXVlc3RzID0gbnVtX3JlcXVlc3RzO1xuXG4gICAgLy8gZGVidWcoJ21ldGFkYXRhPSVPJywgbWV0YWRhdGEpO1xuXG4gICAgLy8gaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9tZXRhZGF0YSkge1xuICAgIC8vICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfbWV0YWRhdGEobWV0YWRhdGEpO1xuICAgIC8vIH1cblxuICAgIC8vIGlmICh0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZSkge1xuICAgIC8vICAgICB0aGlzLmxvZ2dlci5pbmZvKGBXcml0aW5nIHJlc3VsdHMgdG8gJHt0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZX1gKTtcbiAgICAvLyAgICAgd3JpdGVfcmVzdWx0cyh0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZSwgSlNPTi5zdHJpbmdpZnkocmVzdWx0cywgbnVsbCwgNCkpO1xuICAgIC8vIH1cblxuICAgIC8vIHJldHVybiB7XG4gICAgLy8gICAgIHJlc3VsdHM6IHJlc3VsdHMsXG4gICAgLy8gICAgIG1ldGFkYXRhOiBtZXRhZGF0YSB8fCB7fSxcbiAgICAvLyB9O1xuICB9XG5cbiAgLypcbiAgICogUXVpdCB0aGUgcHVwcGV0ZWVyIGNsdXN0ZXIvYnJvd3Nlci5cbiAgICovXG4gIGFzeW5jIHF1aXQoKSB7XG4gICAgaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmNsb3NlX2Jyb3dzZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmNsb3NlX2Jyb3dzZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5jbHVzdGVyLmlkbGUoKTtcbiAgICAgIGF3YWl0IHRoaXMuY2x1c3Rlci5jbG9zZSgpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgU2NyYXBlTWFuYWdlcjogU2NyYXBlTWFuYWdlcixcbn07XG4iLCJleHBvcnQgeyB9O1xuY29uc3QgYXhpb3MgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ1JlbW90ZVNvdXJjZTpSZW1vdGVTb3VyY2UnKTtcbnR5cGUgc29zZXR0aW5nID0ge1xuICBzb3R5cGU6IHN0cmluZztcbiAgc29jaWFsdXNlcjogc3RyaW5nO1xuICBzb2NpYWxwYXNzOiBzdHJpbmc7XG4gIHByb3h5OiB7XG4gICAgcHJveHk6IHN0cmluZztcbiAgICB1c2VyOiBzdHJpbmc7XG4gICAgcGFzczogc3RyaW5nO1xuICB9LFxufVxudHlwZSBzb2NpYWxUYXNrID0ge1xuICBpZDogc3RyaW5nLFxuICBjYW1wYWlnbl9pZDogc3RyaW5nLFxuICBjYW1wYWlnbl9uYW1lOiBzdHJpbmcsXG4gIHRhZzogc3RyaW5nLFxuICB0eXBlOiBzdHJpbmcsXG4gIGtleXdvcmRzOiBBcnJheTxzdHJpbmc+LFxufVxudHlwZSBjb25maWdUeXBlPXtcbiAgUkVNT1RFQUREOiBzdHJpbmcsXG4gIFJFTU9URVVTRVJOQU1FOiBzdHJpbmcsXG4gIFJFTU9URVBBU1NXT1JEOnN0cmluZyxcbn1cbmNsYXNzIFJlbW90ZVNvdXJjZSB7XG4gIFJFTU9URUFERDogc3RyaW5nO1xuICBSRU1PVEVVU0VSTkFNRTogc3RyaW5nO1xuICBSRU1PVEVQQVNTV09SRDogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLnJlYWRlbnYoKTtcbiAgICB0aGlzLlJFTU9URUFERCA9IGNvbmZpZy5SRU1PVEVBREQ7XG4gICAgdGhpcy5SRU1PVEVVU0VSTkFNRSA9IGNvbmZpZy5SRU1PVEVVU0VSTkFNRTtcbiAgICB0aGlzLlJFTU9URVBBU1NXT1JEID0gY29uZmlnLlJFTU9URVBBU1NXT1JEO1xuICB9XG5cblxuICByZWFkZW52KCk6Y29uZmlnVHlwZSB7XG4gICAgLy9yZWFkIGNvbmZpZyBmcm9tIC5lbnYgZmlsZVxuICAgIGxldCBlbnZjb2ZpZyA9IHRoaXMucmVhZENvbmZpZygpO1xuICAgIGRlYnVnKGVudmNvZmlnKVxuICAgIC8vY2hlY2sga2V5IGV4aXN0IGluIG9iamVjdFxuICAgIGlmICghZW52Y29maWcuaGFzT3duUHJvcGVydHkoXCJSRU1PVEVBRERcIikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUkVNT1RFQUREIG5vdCBmb3VuZCBpbiAuZW52IGZpbGVgKTtcbiAgICB9XG4gICAgaWYgKCFlbnZjb2ZpZy5oYXNPd25Qcm9wZXJ0eShcIlJFTU9URVVTRVJOQU1FXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVTRVJOQU1FIG5vdCBmb3VuZCBpbiAuZW52IGZpbGVgKTtcbiAgICB9XG4gICAgaWYgKCFlbnZjb2ZpZy5oYXNPd25Qcm9wZXJ0eShcIlJFTU9URVBBU1NXT1JEXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBBU1NXT1JEIG5vdCBmb3VuZCBpbiAuZW52IGZpbGVgKTtcbiAgICB9XG4gICAgcmV0dXJuIGVudmNvZmlnIGFzIGNvbmZpZ1R5cGU7XG4gIH1cblxuICAvKipcbiAgICogcmVhZCBjb25maWcgZnJvbSAuZW52IEZpbGVcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gY29uZmlnXG4gICAqICovXG4gIHJlYWRDb25maWcoKTogb2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQgPSByZXF1aXJlKFwiZG90ZW52XCIpLmNvbmZpZygpO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgIHRocm93IHJlc3VsdC5lcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5wYXJzZWQ7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHJlc3BvbnNlIGZyb20gcmVtb3RlIHNlcnZpdmVcbiAgICogQHJldHVybiBvYmplY3RcbiAgICovXG4gIGFzeW5jIGdldFJlbW90ZUNvbmZpZyhjYW1wYWlnbklkKTogUHJvbWlzZTxzb3NldHRpbmc+IHtcbiAgICAvLyBsZXQgZW52Y29uZmlnID0gYXdhaXQgcmVhZGVudigpO1xuXG4gICAgbGV0IHNvc2V0dmFyID0gYXdhaXQgYXhpb3NcbiAgICAgIC5nZXQodGhpcy5SRU1PVEVBREQgKyBcIi9hcGkvZ2V0c29ieUNhbS8/Y2FtcGFpZ25faWQ9XCIgKyBjYW1wYWlnbklkLCB7XG4gICAgICAgIGF1dGg6IHtcbiAgICAgICAgICB1c2VybmFtZTogdGhpcy5SRU1PVEVVU0VSTkFNRSxcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy5SRU1PVEVQQVNTV09SRCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChwYXJzZUludChyZXMuc3RhdHVzKSAhPSAyMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb2RlIG5vdCBlcXVhbCAyMDBcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXMuZGF0YS5zdGF0dXMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb2RlIG5vdCBlcXVhbCAyMDBcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLnN0YXR1cylcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmRhdGEuZGF0YS51c2VyKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhLnBhc3MpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEucHJveHkpXG4gICAgICAgIGNvbnN0IHNvc2V0dGluZyA9IHtcbiAgICAgICAgICBzb3R5cGU6IHJlcy5kYXRhLmRhdGEuc290eXBlLFxuICAgICAgICAgIHNvY2lhbHVzZXI6IHJlcy5kYXRhLmRhdGEudXNlcixcbiAgICAgICAgICBzb2NpYWxwYXNzOiByZXMuZGF0YS5kYXRhLnBhc3MsXG4gICAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAgIHByb3h5OiByZXMuZGF0YS5kYXRhLnByb3h5LnVybCxcbiAgICAgICAgICAgIHVzZXI6IHJlcy5kYXRhLmRhdGEucHJveHkudXNlcixcbiAgICAgICAgICAgIHBhc3M6IHJlcy5kYXRhLmRhdGEucHJveHkucGFzcyxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc29zZXR0aW5nO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBzb3NldHZhcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgY2FtcGFpZ24gZnJvbSByZW1vdGUgc2Vydml2ZVxuICAgKi9cbiAgYXN5bmMgZ2V0Q2FtcGFpZ25saXN0KCk6IFByb21pc2U8QXJyYXk8c29jaWFsVGFzaz4+IHtcbiAgICBjb25zdCBjYW1waWdubGlzdCA9IGF3YWl0IGF4aW9zXG4gICAgICAuZ2V0KHRoaXMuUkVNT1RFQUREICsgXCIvYXBpL2xpc3Rzb3Rhc2tcIiwge1xuICAgICAgICBhdXRoOiB7XG4gICAgICAgICAgdXNlcm5hbWU6IHRoaXMuUkVNT1RFVVNFUk5BTUUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMuUkVNT1RFUEFTU1dPUkQsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocGFyc2VJbnQocmVzLnN0YXR1cykgIT0gMjAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29kZSBub3QgZXF1YWwgMjAwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzLmRhdGEuZGF0YSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRhdGEgbm90IGV4aXN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXMuZGF0YS5kYXRhIGFzIEFycmF5PHNvY2lhbFRhc2s+O1xuICAgICAgICBcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvZGUgbm90IGVxdWFsIDIwMFwiKTtcbiAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9KTtcbiAgICByZXR1cm4gY2FtcGlnbmxpc3Q7XG4gIH1cbiAgYXN5bmMgc2F2ZUxpbmtyZW1vdGUoeyBkYXRhIH0pIHtcbiAgICBheGlvcy5wb3N0KHRoaXMuUkVNT1RFQUREICsgXCIvYXBpL3NhdmVsaW5rXCIsIGRhdGEpXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJlbW90ZVNvdXJjZTogUmVtb3RlU291cmNlLFxufTtcbiIsImNvbnN0IHsgQnJvd3NlciB9ID0gcmVxdWlyZSgncHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC9jb25jdXJyZW5jeS9idWlsdEluQ29uY3VycmVuY3knKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc2Utc2NyYXBlcjpDdXN0b21Db25jdXJyZW5jeScpO1xuY29uc3QgeyB0aW1lb3V0RXhlY3V0ZSB9ID0gcmVxdWlyZSgncHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC91dGlsJyk7XG5cbmNvbnN0IEJST1dTRVJfVElNRU9VVCA9IDUwMDA7XG5cbmNsYXNzIEN1c3RvbUNvbmN1cnJlbmN5IGV4dGVuZHMgQnJvd3NlciB7XG5cbiAgICBhc3luYyBpbml0KCkge31cbiAgICBhc3luYyBjbG9zZSgpIHt9XG5cbiAgICBhc3luYyB3b3JrZXJJbnN0YW5jZSgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucy5wZXJCcm93c2VyT3B0aW9ucy5zaGlmdCgpO1xuICAgICAgICBkZWJ1ZygnTGF1bmNoIHB1cHBldGVlciBpbnN0YW5jZSB3aXRoIG9wdGlvbnM9JW8nLCBvcHRpb25zKTtcbiAgICAgICAgbGV0IGNocm9tZSA9IGF3YWl0IHRoaXMucHVwcGV0ZWVyLmxhdW5jaChvcHRpb25zKTtcbiAgICAgICAgbGV0IHBhZ2U7XG4gICAgICAgIGxldCBjb250ZXh0O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBqb2JJbnN0YW5jZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRpbWVvdXRFeGVjdXRlKEJST1dTRVJfVElNRU9VVCwgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IGF3YWl0IGNocm9tZS5jcmVhdGVJbmNvZ25pdG9Ccm93c2VyQ29udGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBwYWdlID0gYXdhaXQgY29udGV4dC5uZXdQYWdlKCk7XG4gICAgICAgICAgICAgICAgfSkoKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgY2xvc2U6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRpbWVvdXRFeGVjdXRlKEJST1dTRVJfVElNRU9VVCwgY29udGV4dC5jbG9zZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2xvc2U6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBjaHJvbWUuY2xvc2UoKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlcGFpcjogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdTdGFydGluZyByZXBhaXInKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIHByb2JhYmx5IGZhaWwsIGJ1dCBqdXN0IGluIGNhc2UgdGhlIHJlcGFpciB3YXMgbm90IG5lY2Vzc2FyeVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBjaHJvbWUuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgICAgICAgICAgLy8ganVzdCByZWxhdW5jaCBhcyB0aGVyZSBpcyBvbmx5IG9uZSBwYWdlIHBlciBicm93c2VyXG4gICAgICAgICAgICAgICAgY2hyb21lID0gYXdhaXQgdGhpcy5wdXBwZXRlZXIubGF1bmNoKG9wdGlvbnMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEN1c3RvbUNvbmN1cnJlbmN5OyIsImNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3QgY3J5cHRvID0gcmVxdWlyZShcImNyeXB0b1wiKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbmNvbnN0IGh0dHBzID0gcmVxdWlyZShcImh0dHBzXCIpO1xuY29uc3QgcHJvZ3Jlc3MgPSByZXF1aXJlKFwicHJvZ3Jlc3Mtc3RyZWFtXCIpO1xuXG5jbGFzcyBUYXNrIHtcblx0Y29uc3RydWN0b3IodXJsKSB7XG5cdFx0dGhpcy51cmwgPSB1cmw7XG5cdFx0dGhpcy5maW5pc2hlZCA9IGZhbHNlO1xuXHR9XG59XG5cbmNsYXNzIERvd25sb2FkZXIge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnR5cGUgPSBcIlwiO1xuXHRcdHRoaXMuaWQgPSBcIlwiO1xuXHRcdHRoaXMudXJsID0gXCJcIjtcblx0XHR0aGlzLmFpZCA9IC0xO1xuXHRcdHRoaXMucGlkID0gMTtcblx0XHR0aGlzLmNpZCA9IC0xO1xuXHRcdHRoaXMubmFtZSA9IFwiXCI7XG5cdFx0dGhpcy5saW5rcyA9IFtdO1xuXHRcdHRoaXMudGFza3MgPSBbXTtcblx0fVxuXG5cdGdldFZpZGVvVXJsKHZpZGVvVXJsKSB7XG5cdFx0dGhpcy51cmwgPSBcIlwiO1xuXHRcdGNvbnN0IG1hcHBpbmcgPSB7XG5cdFx0XHRcIkJWXCI6IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL3ZpZGVvL1wiLFxuXHRcdFx0XCJidlwiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS92aWRlby9cIixcblx0XHRcdFwiYXZcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vdmlkZW8vXCIsXG5cdFx0XHRcImVwXCI6IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL2Jhbmd1bWkvcGxheS9cIixcblx0XHRcdFwic3NcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vYmFuZ3VtaS9wbGF5L1wiXG5cdFx0fTtcblx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhtYXBwaW5nKSkge1xuXHRcdFx0aWYgKHZpZGVvVXJsLmluY2x1ZGVzKGtleSkpIHtcblx0XHRcdFx0dGhpcy50eXBlID0ga2V5O1xuXHRcdFx0XHR0aGlzLmlkID0ga2V5ICsgdmlkZW9Vcmwuc3BsaXQoa2V5KVsxXTtcblx0XHRcdFx0dGhpcy51cmwgPSB2YWx1ZSArIHRoaXMuaWQ7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFzeW5jIGdldEFpZCgpIHtcblx0XHRjb25zdCB7IHR5cGUsIHVybCB9ID0gdGhpcztcblx0XHRpZiAoIXVybCkgcmV0dXJuO1xuXHRcdHJldHVybiBmZXRjaCh1cmwpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG5cdFx0XHQudGhlbihyZXN1bHQgPT4ge1xuXHRcdFx0XHRsZXQgZGF0YSA9IHJlc3VsdC5tYXRjaCgvX19JTklUSUFMX1NUQVRFX189KC4qPyk7XFwoZnVuY3Rpb25cXChcXCkvKVsxXTtcblx0XHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiSU5JVElBTCBTVEFURVwiLCBkYXRhKTtcblx0XHRcdFx0aWYgKHR5cGUgPT09IFwiQlZcIiB8fCB0eXBlID09PSBcImJ2XCIgfHwgdHlwZSA9PT0gXCJhdlwiKSB7XG5cdFx0XHRcdFx0dGhpcy5haWQgPSBkYXRhLnZpZGVvRGF0YS5haWQ7XG5cdFx0XHRcdFx0dGhpcy5waWQgPSBwYXJzZUludCh1cmwuc3BsaXQoXCJwPVwiKVsxXSwgMTApIHx8IDE7XG5cdFx0XHRcdFx0dGhpcy5jaWQgPSBkYXRhLnZpZGVvRGF0YS5wYWdlc1t0aGlzLnBpZCAtIDFdLmNpZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICh0eXBlID09PSBcImVwXCIpIHtcblx0XHRcdFx0XHR0aGlzLmFpZCA9IGRhdGEuZXBJbmZvLmFpZDtcblx0XHRcdFx0XHR0aGlzLmNpZCA9IGRhdGEuZXBJbmZvLmNpZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICh0eXBlID09PSBcInNzXCIpIHtcblx0XHRcdFx0XHR0aGlzLmFpZCA9IGRhdGEuZXBMaXN0WzBdLmFpZDtcblx0XHRcdFx0XHR0aGlzLmNpZCA9IGRhdGEuZXBMaXN0WzBdLmNpZDtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChlcnJvciA9PiBzaG93RXJyb3IoXCLojrflj5bop4bpopEgYWlkIOWHuumUme+8gVwiKSk7XG5cdH1cblxuXHRhc3luYyBnZXRJbmZvKCkge1xuXHRcdGNvbnN0IHsgYWlkLCBjaWQgfSA9IHRoaXM7XG5cdFx0aWYgKCFjaWQpIHtcblx0XHRcdHNob3dFcnJvcihcIuiOt+WPluinhumikSBjaWQg5Ye66ZSZ77yBXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQvLyBnZXREYW5tYWt1KCk7IC8v6I635Y+WY2lk5ZCO77yM6I635Y+W5LiL6L296ZO+5o6l5ZKM5by55bmV5L+h5oGvXG5cdFx0cmV0dXJuIGZldGNoKFwiaHR0cHM6Ly9hcGkuYmlsaWJpbGkuY29tL3gvd2ViLWludGVyZmFjZS92aWV3P2FpZD1cIiArIGFpZClcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XHRcdC5jYXRjaChlcnJvciA9PiBzaG93RXJyb3IoXCLojrflj5bop4bpopHkv6Hmga/lh7rplJnvvIFcIikpO1xuXHR9XG5cblx0YXN5bmMgZ2V0RGF0YShmYWxsYmFjaykge1xuXHRcdGNvbnN0IHsgY2lkLCB0eXBlIH0gPSB0aGlzO1xuXHRcdGxldCBwbGF5VXJsO1xuXHRcdGlmIChmYWxsYmFjaykge1xuXHRcdFx0Y29uc3QgcGFyYW1zID0gYGNpZD0ke2NpZH0mbW9kdWxlPW1vdmllJnBsYXllcj0xJnF1YWxpdHk9MTEyJnRzPTFgO1xuXHRcdFx0Y29uc3Qgc2lnbiA9IGNyeXB0by5jcmVhdGVIYXNoKFwibWQ1XCIpLnVwZGF0ZShwYXJhbXMgKyBcIjliMjg4MTQ3ZTU0NzRkZDJhYTY3MDg1ZjcxNmM1NjBkXCIpLmRpZ2VzdChcImhleFwiKTtcblx0XHRcdHBsYXlVcmwgPSBgaHR0cHM6Ly9iYW5ndW1pLmJpbGliaWxpLmNvbS9wbGF5ZXIvd2ViX2FwaS9wbGF5dXJsPyR7cGFyYW1zfSZzaWduPSR7c2lnbn1gO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAodHlwZSA9PT0gXCJCVlwiIHx8IHR5cGUgPT09IFwiYnZcIiB8fCB0eXBlID09PSBcImF2XCIpIHtcblx0XHRcdFx0Y29uc3QgcGFyYW1zID0gYGFwcGtleT1pVkdVVGpzeHZwTGV1RENmJmNpZD0ke2NpZH0mb3R5cGU9anNvbiZxbj0xMTImcXVhbGl0eT0xMTImdHlwZT1gO1xuXHRcdFx0XHRjb25zdCBzaWduID0gY3J5cHRvLmNyZWF0ZUhhc2goXCJtZDVcIikudXBkYXRlKHBhcmFtcyArIFwiYUhSbWhXTUxrZGVNdUlMcU9Sbllab2N3TUJwTUVPZHRcIikuZGlnZXN0KFwiaGV4XCIpO1xuXHRcdFx0XHRwbGF5VXJsID0gYGh0dHBzOi8vaW50ZXJmYWNlLmJpbGliaWxpLmNvbS92Mi9wbGF5dXJsPyR7cGFyYW1zfSZzaWduPSR7c2lnbn1gO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cGxheVVybCA9IGBodHRwczovL2FwaS5iaWxpYmlsaS5jb20vcGdjL3BsYXllci93ZWIvcGxheXVybD9xbj04MCZjaWQ9JHtjaWR9YDtcblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmZXRjaChwbGF5VXJsKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxuXHRcdFx0LnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdFx0Y29uc3QgZGF0YSA9IGZhbGxiYWNrID8gdGhpcy5wYXJzZURhdGEocmVzdWx0KSA6IEpTT04ucGFyc2UocmVzdWx0KTtcblx0XHRcdFx0Y29uc3QgdGFyZ2V0ID0gZGF0YS5kdXJsIHx8IGRhdGEucmVzdWx0LmR1cmw7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiUExBWSBVUkxcIiwgZGF0YSk7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmtzID0gdGFyZ2V0Lm1hcChwYXJ0ID0+IHBhcnQudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhbGxiYWNrLCBkYXRhXG4gICAgICAgICAgICAgICAgICAgIH07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGZhbGxiYWNrKSB0aHJvdyBFcnJvcigpO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldERhdGEodHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRzaG93RXJyb3IoXCLojrflj5YgUGxheVVybCDmiJbkuIvovb3pk77mjqXlh7rplJnvvIHnlLHkuo5C56uZ6ZmQ5Yi277yM5Y+q6IO95LiL6L295L2O5riF5pmw5bqm6KeG6aKR44CCXCIpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRwYXJzZURhdGEodGFyZ2V0KSB7XG5cdFx0Y29uc3QgZGF0YSA9ICQodGFyZ2V0KTtcblx0XHRjb25zdCByZXN1bHQgPSB7fTtcblx0XHRyZXN1bHQuZHVybCA9IFtdO1xuXHRcdHJlc3VsdC5xdWFsaXR5ID0gZGF0YS5maW5kKFwicXVhbGl0eVwiKS50ZXh0KCk7XG5cdFx0ZGF0YS5maW5kKFwiZHVybFwiKS5lYWNoKChpLCBvKSA9PiB7XG5cdFx0XHRjb25zdCBwYXJ0ID0gJChvKTtcblx0XHRcdHJlc3VsdC5kdXJsLnB1c2goe1xuXHRcdFx0XHR1cmw6IHBhcnQuZmluZChcInVybFwiKS50ZXh0KCksXG5cdFx0XHRcdG9yZGVyOiBwYXJ0LmZpbmQoXCJvcmRlclwiKS50ZXh0KCksXG5cdFx0XHRcdGxlbmd0aDogcGFydC5maW5kKFwibGVuZ3RoXCIpLnRleHQoKSxcblx0XHRcdFx0c2l6ZTogcGFydC5maW5kKFwic2l6ZVwiKS50ZXh0KClcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRkb3dubG9hZEJ5SW5kZXgocGFydCwgZmlsZSwgY2FsbGJhY2sgPSAoKSA9PiB7fSkge1xuXHRcdGNvbnN0IHsgdXJsIH0gPSB0aGlzO1xuXG5cdFx0aWYgKHRoaXMudGFza3Muc29tZShpdGVtID0+IGl0ZW0udXJsID09PSB0aGlzLmxpbmtzW3BhcnRdKSkgcmV0dXJuIFwiRFVQTElDQVRFXCI7XG5cdFx0dGhpcy50YXNrcy5wdXNoKG5ldyBUYXNrKHRoaXMubGlua3NbcGFydF0pKTtcblx0XHRsZXQgc3RhdGU7XG5cdFx0dHJ5IHtcblx0XHRcdHN0YXRlID0gZnMuc3RhdFN5bmMoZmlsZSk7XG5cdFx0fVxuXHRcdGNhdGNoIChlcnJvcikge1xuXHRcdH1cblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0dXJsOiB0aGlzLmxpbmtzW3BhcnRdLFxuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcIlJhbmdlXCI6IGBieXRlcz0ke3N0YXRlID8gc3RhdGUuc2l6ZSA6IDB9LWAsIC8v5pat54K557ut5LygXG5cdFx0XHRcdFwiVXNlci1BZ2VudFwiOiBcIk1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85MC4wLjQ0MzAuMjEyIFNhZmFyaS81MzcuMzZcIixcblx0XHRcdFx0XCJSZWZlcmVyXCI6IHVybFxuXHRcdFx0fVxuXHRcdH07XG5cdFx0Y29uc3Qgc3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZmlsZSwgc3RhdGUgPyB7IGZsYWdzOiBcImFcIiB9IDoge30pO1xuXHRcdHRoaXMuZG93bmxvYWQob3B0aW9ucywgc3RyZWFtLCBjYWxsYmFjayk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRkb3dubG9hZChvcHRpb25zLCBzdHJlYW0sIGNhbGxiYWNrKSB7XG5cdFx0Ly8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvcHJvZ3Jlc3Mtc3RyZWFtXG5cdFx0Y29uc3QgaW5kZXggPSB0aGlzLnRhc2tzLmZpbmRJbmRleChpdGVtID0+IGl0ZW0udXJsID09PSBvcHRpb25zLnVybCk7XG5cdFx0Y29uc3QgcHJvU3RyZWFtID0gcHJvZ3Jlc3Moe1xuXHRcdFx0dGltZTogMjUwIC8v5Y2V5L2NbXNcblx0XHR9KS5vbihcInByb2dyZXNzXCIsIHByb2dyZXNzID0+IHtcblx0XHRcdGNvbnN0IHsgcGVyY2VudGFnZSB9ID0gcHJvZ3Jlc3M7IC8v5pi+56S66L+b5bqm5p2hXG5cdFx0XHRpZiAocGVyY2VudGFnZSA9PT0gMTAwKSB7XG5cdFx0XHRcdHRoaXMudGFza3NbaW5kZXhdLmZpbmlzaGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGNhbGxiYWNrKHByb2dyZXNzLCBpbmRleCk7XG5cdFx0fSk7XG5cblx0XHRsZXQgeyB1cmwgfSA9IG9wdGlvbnM7XG5cdFx0ZnVuY3Rpb24gZG93bmxvYWRMaW5rKHVybCkge1xuXHRcdFx0KHVybC5zdGFydHNXaXRoKFwiaHR0cHNcIikgPyBodHRwcyA6IGh0dHApLmdldCh1cmwsIG9wdGlvbnMsIHJlcyA9PiB7XG5cdFx0XHRcdGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMzAyKSB7XG5cdFx0XHRcdFx0dXJsID0gcmVzLmhlYWRlcnMubG9jYXRpb247XG5cdFx0XHRcdFx0cmV0dXJuIGRvd25sb2FkTGluayh1cmwpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHByb1N0cmVhbS5zZXRMZW5ndGgocmVzLmhlYWRlcnNbXCJjb250ZW50LWxlbmd0aFwiXSk7XG5cdFx0XHRcdC8v5YWIcGlwZeWIsHByb1N0cmVhbeWGjXBpcGXliLDmlofku7bnmoTlhpnlhaXmtYHkuK1cblx0XHRcdFx0cmVzLnBpcGUocHJvU3RyZWFtKS5waXBlKHN0cmVhbSkub24oXCJlcnJvclwiLCBlcnJvciA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGRvd25sb2FkTGluayh1cmwpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBUYXNrLCBEb3dubG9hZGVyIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgY2hlZXJpbyA9IHJlcXVpcmUoXCJjaGVlcmlvXCIpO1xuY29uc3QgU2NyYXBlciA9IHJlcXVpcmUoXCIuL3NvY2lhbF9zY3JhcGVyXCIpO1xuY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCB7IERvd25sb2FkZXIgfSA9IHJlcXVpcmUoXCIuL2JpbGliaWxpL2Rvd25sb2FkZXIuanNcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCBzYW5pdGl6ZSA9IHJlcXVpcmUoXCJmaWxlbmFtaWZ5XCIpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKFwiZGVidWdcIikoXCJiaWxpYmlsaS1zY3JhcGVyOlNjcmFwZXJcIik7XG5jb25zdCB7IGF1dG9TY3JvbGwsIGRlbGF5IH0gPSByZXF1aXJlKFwiLi9saWIvZnVuY3Rpb24uanNcIik7XG4vLyBpbXBvcnQgZmlsZW5hbWlmeSBmcm9tICdmaWxlbmFtaWZ5Jztcbi8vIGNvbnN0IHsgbGF1bmNoLCBnZXRTdHJlYW0gfSA9IHJlcXVpcmUoXCJwdXBwZXRlZXItc3RyZWFtXCIpO1xuLy8gY29uc3QgUHVwcGV0ZWVyVmlkZW9SZWNvcmRlciA9IHJlcXVpcmUoJ3B1cHBldGVlci12aWRlby1yZWNvcmRlcicpO1xuY2xhc3MgQmlsaWJpbGlTY3JhcGVyIGV4dGVuZHMgU2NyYXBlciB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLnN0YXJ0VXJsID0gXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb21cIjtcbiAgfVxuICBhc3luYyBsb2FkX3N0YXJ0X3BhZ2UoKSB7XG4gICAgZGVidWcoXCJsb2FkIHN0YXJ0IHBhZ2VcIilcbiAgICBpZiAodGhpcy5jb25maWcuYmlsaWJpbGlfc2V0dGluZ3MpIHtcbiAgICAgIHRoaXMuc3RhcnRVcmwgPSBgaHR0cHM6Ly93d3cuJHt0aGlzLmNvbmZpZy5iaWxpYmlsaV9zZXR0aW5ncy5iaWxpYmlsaV9kb21haW59YDtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5iaWxpYmlsaV9zZXR0aW5ncy5iaWxpYmlsaV9kb21haW4pIHtcbiAgICAgICAgdGhpcy5zdGFydFVybCA9IGBodHRwczovL3d3dy4ke3RoaXMuY29uZmlnLmJpbGliaWxpX3NldHRpbmdzLmJpbGliaWxpX2RvbWFpbn1gO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jb25maWcuYmlsaWJpbGlfc2V0dGluZ3MpIHtcbiAgICAgICAgaWYgKGtleSAhPT0gXCJiaWxpYmlsaV9kb21haW5cIikge1xuICAgICAgICAgIHRoaXMuc3RhcnRVcmwgKz0gYCR7a2V5fT0ke3RoaXMuY29uZmlnLmJpbGliaWxpX3NldHRpbmdzW2tleV19JmA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy9sb2dpbiBpbnRvIGJpbGliaWxpXG4gIGFzeW5jIG1ha2Vsb2dpbmFjdGlvbigpIHtcbiAgICAvLyBsZXQgc3RhcnRVcmwgPSBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbVwiO1xuXG4gICAgdGhpcy5sb2dnZXIuaW5mbyhcIlVzaW5nIGxvZ2luVXJsOiBcIiArIHRoaXMuc3RhcnRVcmwpO1xuICAgIGF3YWl0IHRoaXMucGFnZS5zZXRCeXBhc3NDU1AodHJ1ZSk7XG4gICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8odGhpcy5zdGFydFVybCk7XG5cbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIFwibG9naW4gc3VjY2VzcywgY29va2llcyBoYXMgYmVlbiBzYXZlIGF0IFwiICsgdGhpcy5jb25maWcudG1wcGF0aFxuICAgICk7XG4gICAgLy9jbGljayBsb2dpbiBidG5cbiAgICBhd2FpdCB0aGlzLnBhZ2UuY2xpY2soXCIuaGVhZGVyLWxvZ2luLWVudHJ5XCIpO1xuICAgIC8vIGF3YWl0IHRoaXMucGFnZS5ldmFsdWF0ZShfID0+IHtcbiAgICAvLyB2YXIgaWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb1wiKTtcbiAgICAvLyBpY29uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAvLyB9KTtcbiAgICAvL3dhaXQgbG9naW4gYm94IHNob3dcbiAgICBhd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlbGVjdG9yKFwiLmJpbGktbWluaS1jb250ZW50LXdwXCIsIHtcbiAgICAgIHRpbWVvdXQ6IHRoaXMuU1RBTkRBUkRfVElNRU9VVCxcbiAgICB9KTtcbiAgICAvL2NsaWNrIGxvZ2luIGJ5IHNtc1xuICAgIGNvbnN0IFtidXR0b25dID0gYXdhaXQgdGhpcy5wYWdlLiR4KFwiLy9kaXZbY29udGFpbnMoLiwgJyDnn63kv6HnmbvlvZUgJyldXCIpO1xuICAgIGlmIChidXR0b24pIHtcbiAgICAgIGF3YWl0IGJ1dHRvbi5jbGljaygpO1xuICAgIH1cbiAgICAvL2F3YWl0IGZvciB1c2VyIHRvIHRha2UgYWN0aW9uXG4gICAgYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcihcIi5oZWFkZXItZW50cnktbWluaVwiLCB7IHRpbWVvdXQ6IDAgfSk7XG4gICAgLy91c2VyIGhhcyBzdWNjZXNzIGxvZ2luXG4gICAgLy9zYXZlIGNvb2tpZXNcbiAgICBjb25zdCBjb29raWVzID0gYXdhaXQgdGhpcy5wYWdlLmNvb2tpZXMoKTtcblxuICAgIGF3YWl0IGZzLndyaXRlRmlsZShcbiAgICAgIHRoaXMuY29uZmlnLnRtcHBhdGggKyBcIi9jb29raWVzLmpzb25cIixcbiAgICAgIEpTT04uc3RyaW5naWZ5KGNvb2tpZXMsIG51bGwsIDIpLFxuICAgICAgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLnBhZ2UuY2xvc2UoKTtcbiAgICAvLyBhd2FpdCB0aGlzLmJyb3dzZXJzLmNsb3NlKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHZpZGVvIGxpc3QgcGFnZVxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5d29yZFxuICAgKiBAcmV0dXJucyBlbGVtZW50XG4gICAqL1xuICBhc3luYyBjbGlja1NlYXJjaGJ0bih7IHBhZ2UsIGtleXdvcmQgfSkge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmluZm8oXCJVc2luZyBsb2dpblVybDogXCIgKyB0aGlzLnN0YXJ0VXJsKTtcbiAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0QnlwYXNzQ1NQKHRydWUpO1xuICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IGF3YWl0IHRoaXMucGFnZS5nb3RvKHRoaXMuc3RhcnRVcmwpO1xuICAgIGF3YWl0IHBhZ2UudHlwZShcIi5uYXYtc2VhcmNoLWlucHV0XCIsIGtleXdvcmQpO1xuICAgIC8vIGF3YWl0IHRoaXMucGFnZS4kZXZhbChcIi5uYXYtc2VhcmNoLWlucHV0XCIsIGZ1bmN0aW9uIChrZXl3b3JkKSB7XG4gICAgLy8gICB0aGlzLnZhbHVlID0ga2V5d29yZDtcbiAgICAvLyB9KTtcbiAgICAvLyBhd2FpdCBwYWdlLiRldmFsKCcubmF2LXNlYXJjaC1pbnB1dCcsIGVsID0+IGVsLnZhbHVlID0gXCJcIik7XG4gICAgY29uc3Qgc2VhcmNoYnRuID0gYXdhaXQgdGhpcy5wYWdlLiQoXCIubmF2LXNlYXJjaC1idG5cIik7XG4gICAgc2VhcmNoYnRuLmNsaWNrKCk7XG4gICAgcmV0dXJuIHNlYXJjaGJ0bjtcbiAgfVxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleXdvcmRcbiAgICogQHJldHVybnMgYXJyYXlcbiAgICovXG4gIGFzeW5jIHNlYXJjaGRhdGEoeyBwYWdlLCBrZXl3b3JkIH0pIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG4gICAgbGV0IHJlc3VsdD1bXVxuICAgIGlmKEFycmF5LmlzQXJyYXkoa2V5d29yZCkpe1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGtleXdvcmQpIHtcbiAgICAgICAgbGV0IGxpbmtyZXM9YXdhaXQgdGhpcy5nZXRWaWRlb3VybHMoeyBwYWdlOiB0aGlzLnBhZ2UsIGtleXdvcmQ6IGVsZW1lbnQgfSk7XG4gICAgICAgIGRlYnVnKGxpbmtyZXMpXG4gICAgICAgIGZvcihjb25zdCBsaW5rIG9mIGxpbmtyZXMpeyBcbiAgICAgICAgICByZXN1bHQucHVzaChsaW5rKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBcbiAgICB9ZWxzZSBpZih0eXBlb2Yga2V5d29yZCA9PT0gJ3N0cmluZycpe1xuICAgICAgbGV0IGxpbmtyZXM9YXdhaXQgdGhpcy5nZXRWaWRlb3VybHMoeyBwYWdlOiB0aGlzLnBhZ2UsIGtleXdvcmQ6IGtleXdvcmQgfSk7XG4gICAgICBmb3IoY29uc3QgbGluayBvZiBsaW5rcmVzKXtcbiAgICAgICAgXG4gICAgICAgIHJlc3VsdC5wdXNoKGxpbmtyZXMpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgICAvLyByZXR1cm4gYXdhaXQgdGhpcy5nZXRWaWRlb3VybHMoeyBwYWdlOiB0aGlzLnBhZ2UsIGtleXdvcmQ6IGtleXdvcmQgfSk7XG4gIH1cbiAgLy9nZXQgdmlkZW8gdXJsIHJldHVybiBpbiBhcnJheVxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3Qsc3RyaW5nLHN0cmluZ31cbiAgICogQHJldHVybnMgYXJyYXlcbiAgICovXG4gIGFzeW5jIGdldFZpZGVvdXJscyh7IHBhZ2UsIGtleXdvcmQsIGNvb2tpZXNQYXRoIH0pIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG4gICAgaWYgKGNvb2tpZXNQYXRoKSB7XG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoY29va2llc1BhdGgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgY29va2llcyBmaWxlIGF0ICR7Y29va2llc1BhdGh9YCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBjb29raWVzID0gSlNPTi5wYXJzZShhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShjb29raWVzUGF0aCkpO1xuICAgICAgLy8gY29uc29sZS5sb2coY29va2llcyk7XG4gICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0Q29va2llKC4uLmNvb2tpZXMpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlYXJjaGJ0biA9IGF3YWl0IHRoaXMuY2xpY2tTZWFyY2hidG4oe1xuICAgICAgcGFnZTogdGhpcy5wYWdlLFxuICAgICAga2V5d29yZDoga2V5d29yZCxcbiAgICB9KTtcbiAgICBsZXQgYnJvd3NlciA9IHRoaXMucGFnZS5icm93c2VyKCk7XG4gICAgY29uc3QgbmV3UGFnZSA9IGF3YWl0IGJyb3dzZXIud2FpdEZvclRhcmdldCgodGFyZ2V0KSA9PlxuICAgICAgdGFyZ2V0LnVybCgpLmluY2x1ZGVzKFwic2VhcmNoLmJpbGliaWxpLmNvbVwiKVxuICAgICk7XG4gICAgY29uc3QgcGFnZXMgPSBhd2FpdCBicm93c2VyLnBhZ2VzKCk7XG4gICAgbGV0IHNlYXJjaFBhZ2U7XG4gICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgICBjb25zdCBwYWdldXJsID0gYXdhaXQgcGFnZS51cmwoKTsgLy8gbmV3IHBhZ2Ugbm93IGFwcGVhciFcbiAgICAgIC8vIGRlYnVnKGF3YWl0IHBhZ2UudGl0bGUoKSlcbiAgICAgIGlmIChwYWdldXJsLmluY2x1ZGVzKFwic2VhcmNoLmJpbGliaWxpLmNvbVwiKSkge1xuICAgICAgICBzZWFyY2hQYWdlID0gcGFnZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghc2VhcmNoUGFnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2VhcmNoIHBhZ2Ugbm90IGZvdW5kXCIpO1xuICAgIH1cbiAgICAvLyB0aGlzLnBhZ2Uud2FpdEZvcigyMDAwKTtcbiAgICAvLyB0aGlzLmJyb3dzZXIub24oJ3RhcmdldGNyZWF0ZWQnLCBmdW5jdGlvbigpe1xuICAgIC8vICAgY29uc29sZS5sb2coJ05ldyBUYWIgQ3JlYXRlZCcpO1xuICAgIC8vIH0pO1xuICAgIC8vIGxldCBicm93c2VyPXRoaXMucGFnZS5icm93c2VyKClcbiAgICAvLyBjb25zb2xlLmxvZyhcImN1cnJlbnQgcGFnZSBjb3VudCBcIiwgKGF3YWl0IGJyb3dzZXIucGFnZXMoKSkubGVuZ3RoKTtcbiAgICAvLyBjb25zdCB0YWJsZXMgPSBhd2FpdCBicm93c2VyLnBhZ2VzKClcbiAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgIC8vICAgZGVidWcoYXdhaXQgdGFibGVzW2ldLnRpdGxlKCkpXG4gICAgLy8gfVxuXG4gICAgLy8gY29uc3QgW3RhYk9uZSwgdGFiVHdvXSA9IChhd2FpdCBicm93c2VyLnBhZ2VzKCkpO1xuICAgIC8vIGRlYnVnKGF3YWl0IHRhYk9uZS50aXRsZSgpKVxuICAgIC8vIGRlYnVnKGF3YWl0IHRhYlR3by50aXRsZSgpKVxuICAgIC8vIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yTmF2aWdhdGlvbigpXG4gICAgLy8gYXdhaXQgZGVsYXkoNTAwMCk7XG4gICAgYXdhaXQgYXV0b1Njcm9sbChzZWFyY2hQYWdlKTtcbiAgICAvLyBhd2FpdCBwYWdlLnNjcmVlbnNob3Qoe1xuICAgIC8vICAgcGF0aDogJy9ob21lL3JvYmVydHplbmcvc2NyZWVuc2hvdC5qcGcnXG4gICAgLy8gfSk7XG5cbiAgICBhd2FpdCBzZWFyY2hQYWdlLndhaXRGb3JTZWxlY3RvcihcIi52dWlfcGFnZW5hdGlvblwiLCB7IHRpbWVvdXQ6IDUwMDAgfSk7XG5cbiAgICBsZXQgbGlua3JlcyA9IFtdO1xuICAgIC8vIGF3YWl0IHRoaXMucGFnZS4kJChcImJ1dHRvbi52dWlfYnV0dG9uXCIsIGVsZW1lbnRzPT57XG4gICAgLy8gICBjb25zb2xlLmxvZyhlbGVtZW50cylcbiAgICAvLyB9KVxuICAgIGNvbnN0IGxpbmtQYWdlID0gYXdhaXQgc2VhcmNoUGFnZS4kJChcImJ1dHRvbi52dWlfYnV0dG9uXCIpO1xuICAgIGRlYnVnKGxpbmtQYWdlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtQYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBhd2FpdCBhdXRvU2Nyb2xsKHRhYlR3byApXG4gICAgICAvLyBhd2FpdCB0aGlzLnBhZ2Uud2FpdEZvck5hdmlnYXRpb24oe1xuICAgICAgLy8gICB3YWl0VW50aWw6ICduZXR3b3JraWRsZTAnLFxuICAgICAgLy8gfSk7XG4gICAgICAvLyBhd2FpdCBsaW5rUGFnZVtpXS5jbGljaygpXG4gICAgICBhd2FpdCBzZWFyY2hQYWdlLmV2YWx1YXRlKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xpY2soKTtcbiAgICAgIH0sIGxpbmtQYWdlW2ldKTtcbiAgICAgIGNvbnN0IGxpbmtzID0gYXdhaXQgdGhpcy5nZXRWaWRlb2xpc3RsaW5rKHsgcGFnZTogc2VhcmNoUGFnZSB9KTtcbiAgICAgIGRlYnVnKGxpbmtzKTtcbiAgICAgIGxpbmtzLm1hcCgobGluaykgPT4ge1xuICAgICAgICBsaW5rcmVzLnB1c2gobGluayk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhd2FpdCB0aGlzLnBhZ2UuJCRldmFsKFwiYnV0dG9uLnZ1aV9idXR0b25cIiwgYXN5bmMgZWxlbWVudHM9PntcbiAgICAvLyAgIC8vIGF3YWl0IGF1dG9TY3JvbGwodGhpcy5wYWdlIClcbiAgICAvLyAgIGVsZW1lbnRzLm1hcChhc3luYyBlbGVtZW50PT57XG4gICAgLy8gICAgIGF3YWl0IGF1dG9TY3JvbGwodGhpcy5wYWdlIClcbiAgICAvLyAgIGF3YWl0IGVsZW1lbnQuY2xpY2soKVxuICAgIC8vICAgY29uc3QgbGlua3M9YXdhaXQgdGhpcy5nZXRWaWRlb2xpc3RsaW5rKHsgcGFnZTp0aGlzLnBhZ2UgfSk7XG4gICAgLy8gICBkZWJ1ZyhsaW5rcylcbiAgICAvLyAgIGxpbmtzLm1hcCgobGluayk9PntcbiAgICAvLyAgICAgbGlua3Jlcy5wdXNoKGxpbmspXG4gICAgLy8gICB9KVxuICAgIC8vIH0pXG4gICAgLy8gfSlcbiAgICBkZWJ1ZyhsaW5rcmVzKTtcbiAgICByZXR1cm4gbGlua3JlcztcbiAgfVxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtwYWdlfSBwYWdlXG4gICAqIEByZXR1cm5zIGFycmF5XG4gICAqL1xuICBhc3luYyBnZXRWaWRlb2xpc3RsaW5rKHsgcGFnZSB9KSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgfVxuICAgIC8vIGNvbnN0IGVsSGFuZGxlQXJyYXkgPSBhd2FpdCBwYWdlLiQkKFxuICAgIC8vICAgXCIuYmlsaS12aWRlby1jYXJkX19pbmZvLS1yaWdodCBhOm50aC1jaGlsZCgxKVwiXG4gICAgLy8gKTtcblxuICAgIC8vIGxldCBsaW5rbWFwID0gW107XG4gICAgbGV0IGxpbmttYXAgPSBhd2FpdCBwYWdlLiQkZXZhbChcbiAgICAgIFwiLmJpbGktdmlkZW8tY2FyZF9faW5mby0tcmlnaHQgPmE6Zmlyc3QtY2hpbGRcIixcbiAgICAgIChhbGlua3MpID0+IHtcbiAgICAgICAgcmV0dXJuIGFsaW5rcy5tYXAoKGFsaW5rKSA9PiB7XG4gICAgICAgICAgdmFyIGxpbmthcnIgPSB7fTtcbiAgICAgICAgICBsaW5rYXJyLmxpbmsgPSBhbGluay5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGFsaW5rKTtcbiAgICAgICAgICBodGl0bGUgPSBhbGluay5xdWVyeVNlbGVjdG9yKFwiaDNcIik7XG4gICAgICAgICAgbGlua2Fyci50aXRsZSA9IGh0aXRsZS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICByZXR1cm4gbGlua2FycjtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcbiAgICAvLyBkZWJ1ZyhcInF1ZXJ5IGxpbmsgZmluaXNoXCIpO1xuICAgIC8vIGRlYnVnKGxpbmttYXApO1xuICAgIC8vIGRlYnVnKFwic2hvdyBsaW5rIGZpbmlzaFwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhsaW5rbWFwKVxuXG4gICAgYXdhaXQgbGlua21hcC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKCFlbGVtZW50LmxpbmsuaW5jbHVkZXMoXCIvdmlkZW8vXCIpKSB7XG4gICAgICAgIC8vIGRlYnVnKFwiZWxlbWVudCBoYXMgdmlkZW8gXCIrZWxlbWVudClcbiAgICAgICAgbGlua21hcC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGF3YWl0IGxpbmttYXAuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChlbGVtZW50LmxpbmsuaW5jbHVkZXMoXCIvYXBpL1wiKSkge1xuICAgICAgICBkZWJ1ZyhcImVsZW1lbnQgaGFzIGFwaSBcIiArIGVsZW1lbnQpO1xuICAgICAgICBsaW5rbWFwLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy9kZWJ1ZyhcImZpbHRlciBsaW5rIGZpbmlzaFwiKTtcbiAgICBkZWJ1ZyhsaW5rbWFwKTtcblxuICAgIHJldHVybiBsaW5rbWFwO1xuICB9XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGlua1xuICAgKiBAcGFyYW0ge3N0cmluZ30gdmlkZW9wYXRoXG4gICAqL1xuICBhc3luYyBkb3dubG9hZFNpZ2xlVmlkZW8oeyBsaW5rLCB2aWRlb3BhdGggfSkge1xuICAgIC8vIGlmIChwYWdlKSB7XG4gICAgLy8gICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIC8vIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKGxpbmspXG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLmdvdG8obGluayx7XG4gICAgLy8gICB3YWl0VW50aWw6ICdkb21jb250ZW50bG9hZGVkJyxcbiAgICAvLyB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyh2aWRlb3BhdGgpXG4gICAgLy8gY29uc3QgZmlsZSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKHZpZGVvcGF0aCArIFwiL3Rlc3Qud2VibVwiKTtcbiAgICAvLyBhd2FpdCBwYWdlLmV2YWx1YXRlKGFzeW5jICgpID0+IHtcbiAgICAvLyBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5icHgtcGxheWVyLXZpZGVvLXdyYXAgPiB2aWRlbzpudGgtY2hpbGQoMSknKTtcbiAgICAvLyBjb25zb2xlLmxvZyhlbCk7XG4gICAgLy8gY29uc3Qge3NyY30gPSBlbC5xdWVyeVNlbGVjdG9yKCdzb3VyY2UnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhzcmMpO1xuICAgIC8vIH0pO1xuICAgIC8vIGNvbnN0IGh0bWwgPSBhd2FpdCBwYWdlLiRldmFsKCcjYmlsaWJpbGktcGxheWVyJywgZWwgPT4gZWwub3V0ZXJIVE1MKTtcbiAgICAvLyBjb25zb2xlLmxvZyhodG1sKVxuICAgIC8vIGNvbnN0IHNyYyA9IGF3YWl0IHBhZ2UuJGV2YWwoXCIjYmlsaWJpbGktcGxheWVyIHZpZGVvXCIsZWwgPT4gZWwuZ2V0QXR0cmlidXRlKFwic3JjXCIpKVxuXG4gICAgY29uc3QgZG93bmxvYWRlciA9IG5ldyBEb3dubG9hZGVyKCk7XG4gICAgZG93bmxvYWRlci5nZXRWaWRlb1VybChsaW5rKTtcbiAgICBpZiAoIWRvd25sb2FkZXIudXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ2aWRlbyB1cmwgaW52YWxpZFwiKTtcbiAgICB9XG4gICAgYXdhaXQgZG93bmxvYWRlci5nZXRBaWQoKTtcblxuICAgIGxldCB2aWRlb3JlcyA9IGF3YWl0IGRvd25sb2FkZXIuZ2V0SW5mbygpO1xuICAgIGRlYnVnKFwiVklERU8gSU5GT1wiLCB2aWRlb3Jlcyk7XG4gICAgLy8gY29uc3QgZG93bmxvYWRQYXRoID0nL2hvbWUvcm9iZXJ0emVuZy9kb3dubG9hZHRlc3QnO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gdmlkZW9yZXMuZGF0YS50aXRsZTtcbiAgICBjb25zdCB7IGRhdGEsIGZhbGxiYWNrIH0gPSBhd2FpdCBkb3dubG9hZGVyLmdldERhdGEoKTtcblxuICAgIGNvbnN0IHRhcmdldCA9IGRhdGEuZHVybCB8fCBkYXRhLnJlc3VsdC5kdXJsO1xuICAgIGNvbnN0IHF1YWxpdHkgPSBkYXRhLnF1YWxpdHkgfHwgZGF0YS5yZXN1bHQucXVhbGl0eSxcbiAgICAgIHF1YWxpdHlBcnJheSA9IHtcbiAgICAgICAgMTEyOiBcIjEwODBQK1wiLFxuICAgICAgICA4MDogXCIxMDgwUFwiLFxuICAgICAgICA3NDogXCI3MjBQNjBcIixcbiAgICAgICAgNjQ6IFwiNzIwUFwiLFxuICAgICAgICA0ODogXCI3MjBQXCIsXG4gICAgICAgIDMyOiBcIjQ4MFBcIixcbiAgICAgICAgMTY6IFwiMzYwUFwiLFxuICAgICAgICAxNTogXCIzNjBQXCIsXG4gICAgICB9O1xuICAgIGNvbnN0IHZpZGVvUXVhbnRpdHkgPSBxdWFsaXR5QXJyYXlbcXVhbGl0eV0gfHwgXCJ1bmtub3duXCI7XG4gICAgY29uc29sZS5sb2coXCJ2aWRlb1F1YW50aXR5IGlzIFwiICsgdmlkZW9RdWFudGl0eSk7XG4gICAgaWYgKGZhbGxiYWNrKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJlcnJvciBoYXBwZW4gd2hlbiBnZXQgdmlkZW8gZGF0YVwiKTtcbiAgICB9XG4gICAgZGVidWcoXCJlY2hvIHRhcmdldFwiKTtcbiAgICBkZWJ1Zyh0YXJnZXQpO1xuICAgIHRhcmdldC5mb3JFYWNoKChlbGVtZW50LCBwYXJ0KSA9PiB7XG4gICAgICBjb25zdCBmaWxlID0gcGF0aC5qb2luKHZpZGVvcGF0aCwgYCR7c2FuaXRpemUoZmlsZW5hbWUpfS0ke3BhcnR9LmZsdmApO1xuICAgICAgZGVidWcoXCJwYXJ0IGlzICVvXCIsIHBhcnQpO1xuICAgICAgZGVidWcoXCJmaWxlIG5hbWUgJW9cIiwgZmlsZSk7XG4gICAgICBjb25zdCBzdGF0ZSA9IGRvd25sb2FkZXIuZG93bmxvYWRCeUluZGV4KFxuICAgICAgICBwYXJ0LFxuICAgICAgICBmaWxlLFxuICAgICAgICAocHJvZ3Jlc3MsIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBzcGVlZCwgZXRhLCBwZXJjZW50YWdlIH0gPSBwcm9ncmVzczsgLy/mmL7npLrov5vluqbmnaFcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInNwZWVkOiBcIiArIE1hdGgucm91bmQoc3BlZWQgLyAxZTMpICsgXCJLQi9zXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBldGE6JHtldGF9c2ApO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLyoqXG4gICAqIGdldCB2aWRlbyBkZXRhaWxcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxpbmtcbiAgICovXG4gIGFzeW5jIGdldFZpZGVvZGV0YWlsKHBhZ2UsIGxpbmspIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5wYWdlLmdvdG8obGluaywge1xuICAgICAgd2FpdFVudGlsOiBcImRvbWNvbnRlbnRsb2FkZWRcIixcbiAgICB9KTtcblxuICAgIC8vIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQmlsaWJpbGlTY3JhcGVyOiBCaWxpYmlsaVNjcmFwZXIsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjaGVlcmlvID0gcmVxdWlyZSgnY2hlZXJpbycpO1xuY29uc3QgU2NyYXBlciA9IHJlcXVpcmUoJy4vc29jaWFsX3NjcmFwZXInKTtcblxuY2xhc3MgRmFjZWJvb2tTY3JhcGVyIGV4dGVuZHMgU2NyYXBlciB7XG5cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIH1cbiBcblxuICAgIGFzeW5jIGxvYWRfbG9naW5fcGFnZSgpIHtcbiAgICAgICAgbGV0IHN0YXJ0VXJsID0gJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbSc7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzKSB7XG4gICAgICAgICAgICBzdGFydFVybCA9IGBodHRwczovL3d3dy4ke3RoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzLmZhY2Vib29rX2RvbWFpbn1gO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzLmZhY2Vib29rX2RvbWFpbikge1xuICAgICAgICAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LiR7dGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MuZmFjZWJvb2tfZG9tYWlufWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgIT09ICdmYWNlYm9va19kb21haW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VXJsICs9IGAke2tleX09JHt0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5nc1trZXldfSZgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnVXNpbmcgbG9naW5Vcmw6ICcgKyBzdGFydFVybCk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8oc3RhcnRVcmwpO1xuXG4gICAgICAgIC8vYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcignaW5wdXRbbmFtZT1cInFcIl0nLCB7IHRpbWVvdXQ6IHRoaXMuU1RBTkRBUkRfVElNRU9VVCB9KTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy91c2VyIGxvZ2luIGJ5IGhhbmRcbiAgICBhc3luYyB1c2VybG9naW5hY3Rpb24oKXtcblxuICAgIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBGYWNlYm9va1NjcmFwZXI6IEZhY2Vib29rU2NyYXBlcixcbn07XG4iLCIvL3Njcm9sbCBkb3duIHRvIHRoZSBib3R0b20gb2YgdGhlIHBhZ2VcbmFzeW5jIGZ1bmN0aW9uIGF1dG9TY3JvbGwocGFnZSl7XG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZShhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB2YXIgdG90YWxIZWlnaHQgPSAwO1xuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gMTAwO1xuICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsQnkoMCwgZGlzdGFuY2UpO1xuICAgICAgICAgICAgICAgIHRvdGFsSGVpZ2h0ICs9IGRpc3RhbmNlO1xuXG4gICAgICAgICAgICAgICAgaWYodG90YWxIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGRlbGF5KHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkgeyBcbiAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCB0aW1lKVxuICAgIH0pO1xuIH1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXV0b1Njcm9sbDphdXRvU2Nyb2xsLFxuICAgIGRlbGF5OmRlbGF5XG59IiwiY29uc3QgY2hlZXJpbyA9IHJlcXVpcmUoJ2NoZWVyaW8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0X2lwX2RhdGE6IGdldF9pcF9kYXRhLFxuICAgIGdldF9odHRwX2hlYWRlcnM6IGdldF9odHRwX2hlYWRlcnMsXG59O1xuXG5hc3luYyBmdW5jdGlvbiBnZXRfaXBfZGF0YShwYWdlKSB7XG4gICAgYXdhaXQgcGFnZS5nb3RvKCdodHRwczovL2lwaW5mby5pby9qc29uJywge1xuICAgICAgd2FpdExvYWQ6IHRydWUsXG4gICAgICB3YWl0TmV0d29ya0lkbGU6IHRydWVcbiAgICB9KTtcbiAgICBsZXQganNvbiA9IGF3YWl0IHBhZ2UuY29udGVudCh7XG4gICAgICAgIHRpbWVvdXQ6IDIwMDAwXG4gICAgfSk7XG4gICAgY29uc3QgJCA9IGNoZWVyaW8ubG9hZChqc29uKTtcbiAgICBsZXQgaXBpbmZvX3RleHQgPSAgJCgncHJlJykudGV4dCgpO1xuICAgIHJldHVybiBKU09OLnBhcnNlKGlwaW5mb190ZXh0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0X2h0dHBfaGVhZGVycyhwYWdlKSB7XG4gICAgYXdhaXQgcGFnZS5nb3RvKCdodHRwczovL2h0dHBiaW4ub3JnL2dldCcsIHtcbiAgICAgIHdhaXRMb2FkOiB0cnVlLFxuICAgICAgd2FpdE5ldHdvcmtJZGxlOiB0cnVlXG4gICAgfSk7XG4gICAgbGV0IGhlYWRlcnMgPSBhd2FpdCBwYWdlLmNvbnRlbnQoKTtcblxuICAgIGNvbnN0ICQgPSBjaGVlcmlvLmxvYWQoaGVhZGVycyk7XG4gICAgbGV0IGhlYWRlcnNfdGV4dCA9ICAkKCdwcmUnKS50ZXh0KCk7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoaGVhZGVyc190ZXh0KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNoZWVyaW8gPSByZXF1aXJlKCdjaGVlcmlvJyk7XG5jb25zdCBTY3JhcGVyID0gcmVxdWlyZSgnLi9zb2NpYWxfc2NyYXBlcicpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jbGFzcyBZb3V0dWJlU2NyYXBlciBleHRlbmRzIFNjcmFwZXIge1xuXG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTsgICAgXG4gICAgfVxuXG5cbiAgICBhc3luYyBsb2FkX2xvZ2luX3BhZ2UoKSB7XG4gICAgICAgIFxuICAgICAgICAvLyBhd2FpdCB0aGlzLnBhZ2Uuc2V0UmVxdWVzdEludGVyY2VwdGlvbih0cnVlKTtcbiAgICAgICAgLy93aGV0aGVyIHRvIGRpc2FibGUgaW1hZ2UgbG9hZGluZ1xuICAgICAgICAgICAgLy8gdGhpcy5wYWdlLm9uKCdyZXF1ZXN0JywgcmVxdWVzdCA9PiB7XG4gICAgICAgICAgICAvLyAgICAgaWYgKHJlcXVlc3QucmVzb3VyY2VUeXBlKCkgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJlcXVlc3QuY29udGludWUoKTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgbGV0IHN0YXJ0VXJsID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tJztcblxuICAgICAgICBpZiAodGhpcy5jb25maWcueW91dHViZV9zZXR0aW5ncykge1xuICAgICAgICAgICAgc3RhcnRVcmwgPSBgaHR0cHM6Ly93d3cuJHt0aGlzLmNvbmZpZy55b3V0dWJlX3NldHRpbmdzLnlvdXR1YmVfZG9tYWlufWA7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcueW91dHViZV9zZXR0aW5ncy55b3V0dWJlX2RvbWFpbikge1xuICAgICAgICAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LiR7dGhpcy5jb25maWcueW91dHViZV9zZXR0aW5ncy55b3V0dWJlX2RvbWFpbn1gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFydFVybCA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgIT09ICd5b3V0dWJlX2RvbWFpbicpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRVcmwgKz0gYCR7a2V5fT0ke3RoaXMuY29uZmlnLnlvdXR1YmVfc2V0dGluZ3Nba2V5XX0mYFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ1VzaW5nIGxvZ2luVXJsOiAnICsgc3RhcnRVcmwpO1xuICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0QnlwYXNzQ1NQKHRydWUpO1xuICAgICAgICB0aGlzLmxhc3RfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnBhZ2UuZ290byhzdGFydFVybCk7XG4gICAgICAgIFxuICAgICAgICAvL2hpZGRlbiBpY29uXG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS5ldmFsdWF0ZShfID0+IHtcbiAgICAgICAgdmFyIGljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ28taWNvblwiKTtcbiAgICAgICAgaWNvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZy50bXBwYXRoKVxuICAgICAgICAvL2F3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoJ2lucHV0W25hbWU9XCJxXCJdJywgeyB0aW1lb3V0OiB0aGlzLlNUQU5EQVJEX1RJTUVPVVQgfSk7XG4gICAgICAgIC8vYXdhaXQgZm9yIHVzZXIgdG8gdGFrZSBhY3Rpb25cbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcignI2F2YXRhci1idG4nLHsndGltZW91dCc6MH0pO1xuICAgICAgICAvL3VzZXIgaGFzIHN1Y2Nlc3MgbG9naW5cbiAgICAgICAgLy9zYXZlIGNvb2tpZXMgXG4gICAgICAgIGNvbnN0IGNvb2tpZXMgPSBhd2FpdCB0aGlzLnBhZ2UuY29va2llcygpO1xuICAgICAgICBcbiAgICAgICAgYXdhaXQgZnMud3JpdGVGaWxlKHRoaXMuY29uZmlnLnRtcHBhdGgrJy9jb29raWVzLmpzb24nLCBKU09OLnN0cmluZ2lmeShjb29raWVzLCBudWxsLCAyKSk7XG4gICAgICAgIGF3YWl0IGJyb3dzZXIuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG5cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBZb3V0dWJlU2NyYXBlcjogWW91dHViZVNjcmFwZXIsXG59O1xuIiwiZnVuY3Rpb24gd2VicGFja0VtcHR5Q29udGV4dChyZXEpIHtcblx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdHRocm93IGU7XG59XG53ZWJwYWNrRW1wdHlDb250ZXh0LmtleXMgPSAoKSA9PiAoW10pO1xud2VicGFja0VtcHR5Q29udGV4dC5yZXNvbHZlID0gd2VicGFja0VtcHR5Q29udGV4dDtcbndlYnBhY2tFbXB0eUNvbnRleHQuaWQgPSBcIi4vc3JjIHN5bmMgcmVjdXJzaXZlXCI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXJncGFyc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hlZXJpb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlsZW5hbWlmeVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9ncmVzcy1zdHJlYW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyL2Rpc3QvY29uY3VycmVuY3kvYnVpbHRJbkNvbmN1cnJlbmN5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyL2Rpc3QvdXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXNlci1hZ2VudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vcnVuLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9