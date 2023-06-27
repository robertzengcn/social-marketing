/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
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
exports.Searchdata = exports.Login = void 0;
var node_socialmk_1 = __webpack_require__(/*! ./src/node_socialmk */ "./src/node_socialmk.ts");
// var Scraper = require("./src/modules/social_scraper");
function Login(browser_config, scrape_config) {
    return __awaiter(this, void 0, void 0, function () {
        var scraper, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // scrape config overwrites the browser_config
                    Object.assign(browser_config, scrape_config);
                    scraper = new node_socialmk_1.ScrapeManager(browser_config);
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
exports.Login = Login;
//get data urls
function Searchdata(browser_config, scrape_config) {
    return __awaiter(this, void 0, void 0, function () {
        var scraper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // scrape config overwrites the browser_config
                    Object.assign(browser_config, scrape_config);
                    scraper = new node_socialmk_1.ScrapeManager(browser_config);
                    // var remoteConfig=await scraper.getRemoteConfig();
                    return [4 /*yield*/, scraper.start()];
                case 1:
                    // var remoteConfig=await scraper.getRemoteConfig();
                    _a.sent();
                    return [4 /*yield*/, scraper.searchdata(scrape_config)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, scraper.quit()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.Searchdata = Searchdata;
// module.exports = {
//   searchdata: Searchdata,
//   login: Login,
//   // ytblogin:ytblogin,
//   ScrapeManager: ScrapeManager,
//   // Scraper: Scraper,
// };


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
// const se_scraper = require("./index");
var index_1 = __webpack_require__(/*! ./index */ "./index.ts");
var ArgumentParser = (__webpack_require__(/*! argparse */ "argparse").ArgumentParser);
var remotesource_1 = __webpack_require__(/*! ./src/remotesource */ "./src/remotesource.ts");
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
    taskid: 0,
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
        var remotesource, campaignlist, arrLength, _i, campaignlist_1, campaign, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    remotesource = new remotesource_1.RemoteSource();
                    return [4 /*yield*/, remotesource.getCampaignlist()];
                case 1:
                    campaignlist = _c.sent();
                    debug(campaignlist);
                    if (!campaignlist) {
                        throw new Error("campaignlist is undefined");
                    }
                    arrLength = (_a = campaignlist === null || campaignlist === void 0 ? void 0 : campaignlist.length) !== null && _a !== void 0 ? _a : 0;
                    if (arrLength == 0) {
                        console.log("not campaign need to run");
                    }
                    _i = 0, campaignlist_1 = campaignlist;
                    _c.label = 2;
                case 2:
                    if (!(_i < campaignlist_1.length)) return [3 /*break*/, 7];
                    campaign = campaignlist_1[_i];
                    _b = campaign.type;
                    switch (_b) {
                        case "bilibiliscrape": return [3 /*break*/, 3];
                        case 'bilibilidownload': return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 6];
                case 3:
                    scrape_config.platform = "bilibili";
                    scrape_config.taskid = campaign.id;
                    scrape_config.keywords = campaign.keywords;
                    return [4 /*yield*/, (0, index_1.Searchdata)(browser_config, scrape_config)];
                case 4:
                    _c.sent();
                    return [3 /*break*/, 6];
                case 5:
                    scrape_config.platform = "bilibili";
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/];
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
                    remotesource = new remotesource_1.RemoteSource();
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
                    return [4 /*yield*/, (0, index_1.Login)(browser_config, scrape_config)];
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

/***/ "./src/modules/bilibili_scraper.ts":
/*!*****************************************!*\
  !*** ./src/modules/bilibili_scraper.ts ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.BilibiliScraper = void 0;
var cheerio = __webpack_require__(/*! cheerio */ "cheerio");
var social_scraper_1 = __webpack_require__(/*! ./social_scraper */ "./src/modules/social_scraper.ts");
var fs = __webpack_require__(/*! fs */ "fs");
var Downloader = (__webpack_require__(/*! ./bilibili/downloader.js */ "./src/modules/bilibili/downloader.js").Downloader);
var path = __webpack_require__(/*! path */ "path");
var sanitize = __webpack_require__(/*! filenamify */ "filenamify");
var debug = __webpack_require__(/*! debug */ "debug")("bilibili-scraper:Scraper");
var _a = __webpack_require__(/*! ./lib/function.js */ "./src/modules/lib/function.js"), autoScroll = _a.autoScroll, delay = _a.delay;
// import filenamify from 'filenamify';
// const { launch, getStream } = require("puppeteer-stream");
// const PuppeteerVideoRecorder = require('puppeteer-video-recorder');
var BilibiliScraper = /** @class */ (function (_super) {
    __extends(BilibiliScraper, _super);
    function BilibiliScraper(args) {
        var _this = _super.call(this, args) || this;
        _this.startUrl = "https://www.bilibili.com";
        return _this;
        // console.log(this.taskid)
        // debug(self.taskid)
    }
    BilibiliScraper.prototype.load_start_page = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                debug("load start page");
                return [2 /*return*/];
            });
        });
    };
    //login into bilibili
    BilibiliScraper.prototype.makeloginaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, button, cookies;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // let startUrl = "https://www.bilibili.com";
                        this.logger.info("Using loginUrl: " + this.startUrl);
                        return [4 /*yield*/, this.page.setBypassCSP(true)];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.page.goto(this.startUrl)];
                    case 2:
                        _a.last_response = _b.sent();
                        console.log("login success, cookies has been save at " + this.config.tmppath);
                        //click login btn
                        return [4 /*yield*/, this.page.click(".header-login-entry")];
                    case 3:
                        //click login btn
                        _b.sent();
                        // await this.page.evaluate(_ => {
                        // var icon = document.getElementById("logo");
                        // icon.style.display = "none";
                        // });
                        //wait login box show
                        return [4 /*yield*/, this.page.waitForSelector(".bili-mini-content-wp", {
                                timeout: this.STANDARD_TIMEOUT,
                            })];
                    case 4:
                        // await this.page.evaluate(_ => {
                        // var icon = document.getElementById("logo");
                        // icon.style.display = "none";
                        // });
                        //wait login box show
                        _b.sent();
                        return [4 /*yield*/, this.page.$x("//div[contains(., ' 短信登录 ')]")];
                    case 5:
                        button = (_b.sent())[0];
                        if (!button) return [3 /*break*/, 7];
                        return [4 /*yield*/, button.click()];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: 
                    //await for user to take action
                    return [4 /*yield*/, this.page.waitForSelector(".header-entry-mini", { timeout: 0 })];
                    case 8:
                        //await for user to take action
                        _b.sent();
                        return [4 /*yield*/, this.page.cookies()];
                    case 9:
                        cookies = _b.sent();
                        return [4 /*yield*/, fs.writeFile(this.config.tmppath + "/cookies.json", JSON.stringify(cookies, null, 2), function (err) {
                                if (err) {
                                    console.error(err);
                                }
                            })];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, this.page.close()];
                    case 11:
                        _b.sent();
                        // await this.browsers.close();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * get video list page
     * @param {object} page
     * @param {string} keyword
     * @returns element
     */
    BilibiliScraper.prototype.clickSearchbtn = function (searobj) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, searchbtn;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (searobj.page) {
                            this.page = searobj.page;
                        }
                        this.logger.info("Using loginUrl: " + this.startUrl);
                        return [4 /*yield*/, this.page.setBypassCSP(true)];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.page.goto(this.startUrl)];
                    case 2:
                        _a.last_response = _b.sent();
                        return [4 /*yield*/, this.page.type(".nav-search-input", searobj.keyword)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.page.$(".nav-search-btn")];
                    case 4:
                        searchbtn = _b.sent();
                        if (!searchbtn) return [3 /*break*/, 6];
                        return [4 /*yield*/, searchbtn.click()];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/, searchbtn];
                }
            });
        });
    };
    /**
     *
     * @param {object} page
     * @param {string} keyword
     * @returns array
     */
    BilibiliScraper.prototype.searchdata = function (searobj) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, _a, element, subsearobg, linkres, _b, linkres_1, link, sersearobg, linkres, _c, linkres_2, link;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (searobj.page) {
                            this.page = searobj.page;
                        }
                        result = [];
                        if (!Array.isArray(searobj.keyword)) return [3 /*break*/, 5];
                        _i = 0, _a = searobj.keyword;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        element = _a[_i];
                        subsearobg = { page: this.page, keyword: element };
                        return [4 /*yield*/, this.getVideourls(subsearobg)];
                    case 2:
                        linkres = _d.sent();
                        debug(linkres);
                        for (_b = 0, linkres_1 = linkres; _b < linkres_1.length; _b++) {
                            link = linkres_1[_b];
                            result.push(link);
                        }
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        if (!(typeof searobj.keyword === 'string')) return [3 /*break*/, 7];
                        sersearobg = { page: this.page, keyword: searobj.keyword };
                        return [4 /*yield*/, this.getVideourls(sersearobg)];
                    case 6:
                        linkres = _d.sent();
                        for (_c = 0, linkres_2 = linkres; _c < linkres_2.length; _c++) {
                            link = linkres_2[_c];
                            result.push(linkres);
                        }
                        _d.label = 7;
                    case 7: return [2 /*return*/, result
                        // return await this.getVideourls({ page: this.page, keyword: keyword });
                    ];
                }
            });
        });
    };
    //get video url return in array
    /**
     *
     * @param {object,string,string}
     * @returns array
     */
    BilibiliScraper.prototype.getVideourls = function (serobj) {
        return __awaiter(this, void 0, void 0, function () {
            var cookies, _a, _b, linkres, _i, _c, keyelement, res, _d, res_1, link;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (serobj.page) {
                            this.page = serobj.page;
                        }
                        if (!serobj.cookiesPath) return [3 /*break*/, 3];
                        if (!fs.existsSync(serobj.cookiesPath)) {
                            throw new Error("Cannot find cookies file at ".concat(serobj.cookiesPath));
                        }
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs.promises.readFile(serobj.cookiesPath)];
                    case 1:
                        cookies = _b.apply(_a, [_f.sent()]);
                        // console.log(cookies);
                        return [4 /*yield*/, (_e = this.page).setCookie.apply(_e, cookies)];
                    case 2:
                        // console.log(cookies);
                        _f.sent();
                        _f.label = 3;
                    case 3:
                        if (!(typeof serobj.keyword === 'string')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.handleSearch({ page: this.page, keyword: serobj.keyword })];
                    case 4: return [2 /*return*/, _f.sent()];
                    case 5:
                        linkres = [];
                        _i = 0, _c = serobj.keyword;
                        _f.label = 6;
                    case 6:
                        if (!(_i < _c.length)) return [3 /*break*/, 9];
                        keyelement = _c[_i];
                        return [4 /*yield*/, this.handleSearch({ page: this.page, keyword: keyelement })];
                    case 7:
                        res = _f.sent();
                        for (_d = 0, res_1 = res; _d < res_1.length; _d++) {
                            link = res_1[_d];
                            linkres.push(link);
                        }
                        _f.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9: return [2 /*return*/, linkres];
                }
            });
        });
    };
    BilibiliScraper.prototype.handleSearch = function (csobj) {
        return __awaiter(this, void 0, void 0, function () {
            var searchbtn, browser, newPage, pages, searchPage, _i, pages_1, page, pageurl, e_1, linkres, linkPage, i, links;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clickSearchbtn({
                            page: this.page,
                            keyword: csobj.keyword,
                        })];
                    case 1:
                        searchbtn = _a.sent();
                        browser = this.page.browser();
                        return [4 /*yield*/, browser.waitForTarget(function (target) {
                                return target.url().includes("search.bilibili.com");
                            })];
                    case 2:
                        newPage = _a.sent();
                        return [4 /*yield*/, browser.pages()];
                    case 3:
                        pages = _a.sent();
                        _i = 0, pages_1 = pages;
                        _a.label = 4;
                    case 4:
                        if (!(_i < pages_1.length)) return [3 /*break*/, 7];
                        page = pages_1[_i];
                        return [4 /*yield*/, page.url()];
                    case 5:
                        pageurl = _a.sent();
                        // debug(await page.title())
                        if (pageurl.includes("search.bilibili.com")) {
                            searchPage = page;
                            return [3 /*break*/, 7];
                        }
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        if (!searchPage) {
                            throw new Error("search page not found");
                        }
                        return [4 /*yield*/, autoScroll(searchPage)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, searchPage.waitForSelector(".vui_pagenation", { timeout: 5000 })];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_1 = _a.sent();
                        if (e_1 instanceof puppeteer.errors.TimeoutError) {
                            // Do something if this is a timeout in find page
                            debug("not find .vui_pagenation item, the page may not have result");
                            //return empty promise array
                            return [2 /*return*/, new Promise(function (resolve) { resolve(null); })];
                        }
                        return [3 /*break*/, 12];
                    case 12:
                        linkres = [];
                        return [4 /*yield*/, searchPage.$$("button.vui_button")];
                    case 13:
                        linkPage = _a.sent();
                        debug(linkPage);
                        i = 0;
                        _a.label = 14;
                    case 14:
                        if (!(i < linkPage.length)) return [3 /*break*/, 18];
                        return [4 /*yield*/, searchPage.evaluate(function (element) {
                                element.click();
                            }, linkPage[i])];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, this.getVideolistlink({ page: searchPage })];
                    case 16:
                        links = _a.sent();
                        debug(links);
                        links.map(function (link) {
                            linkres.push(link);
                        });
                        _a.label = 17;
                    case 17:
                        i++;
                        return [3 /*break*/, 14];
                    case 18: return [2 /*return*/, linkres];
                }
            });
        });
    };
    /**
     *
     * @param {page} page
     * @returns array
     */
    BilibiliScraper.prototype.getVideolistlink = function (_a) {
        var page = _a.page;
        return __awaiter(this, void 0, void 0, function () {
            var linkmap, taskids;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (page) {
                            this.page = page;
                        }
                        linkmap = [];
                        // const that=this;
                        debug(this.config.taskid);
                        taskids = 0;
                        if (this.config.taskid) {
                            taskids = this.config.taskid;
                        }
                        return [4 /*yield*/, this.page.$$eval(".bili-video-card__info--right >a:first-child", function (alinks, taskids) {
                                return alinks.map(function (alink) {
                                    var linkobg = { title: '', link: '', lang: 'zh-cn' };
                                    // if(!that.taskid){
                                    // linkobg.taskid=that.taskid;
                                    // }
                                    if (taskids) {
                                        linkobg.taskid = taskids;
                                    }
                                    var herf = alink.getAttribute("href");
                                    if (herf) {
                                        linkobg.link = herf;
                                    }
                                    // console.log(alink);
                                    var htitle = alink.querySelector("h3");
                                    if (htitle) {
                                        var htres = htitle.getAttribute("title");
                                        if (htres) {
                                            linkobg.title = htres;
                                        }
                                    }
                                    return linkobg;
                                });
                            }, taskids)];
                    case 1:
                        linkmap = _b.sent();
                        // debug("query link finish");
                        // debug(linkmap);
                        // debug("show link finish");
                        // console.log(linkmap)
                        return [4 /*yield*/, linkmap.forEach(function (element, index) {
                                if (!element.link.includes("/video/")) {
                                    // debug("element has video "+element)
                                    linkmap.splice(index, 1);
                                }
                            })];
                    case 2:
                        // debug("query link finish");
                        // debug(linkmap);
                        // debug("show link finish");
                        // console.log(linkmap)
                        _b.sent();
                        return [4 /*yield*/, linkmap.forEach(function (element, index) {
                                if (element.link.includes("/api/")) {
                                    debug("element has api " + element);
                                    linkmap.splice(index, 1);
                                }
                            })];
                    case 3:
                        _b.sent();
                        //debug("filter link finish");
                        debug(linkmap);
                        return [2 /*return*/, linkmap];
                }
            });
        });
    };
    /**
     *
     * @param {object} page
     * @param {string} link
     * @param {string} videopath
     */
    BilibiliScraper.prototype.downloadSigleVideo = function (_a) {
        var link = _a.link, videopath = _a.videopath;
        return __awaiter(this, void 0, void 0, function () {
            var downloader, videores, filename, _b, data, fallback, target, quality, qualityArray, videoQuantity;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        downloader = new Downloader();
                        downloader.getVideoUrl(link);
                        if (!downloader.url) {
                            throw new Error("video url invalid");
                        }
                        return [4 /*yield*/, downloader.getAid()];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, downloader.getInfo()];
                    case 2:
                        videores = _c.sent();
                        debug("VIDEO INFO", videores);
                        filename = videores.data.title;
                        return [4 /*yield*/, downloader.getData()];
                    case 3:
                        _b = _c.sent(), data = _b.data, fallback = _b.fallback;
                        target = data.durl || data.result.durl;
                        quality = data.quality || data.result.quality, qualityArray = {
                            112: "1080P+",
                            80: "1080P",
                            74: "720P60",
                            64: "720P",
                            48: "720P",
                            32: "480P",
                            16: "360P",
                            15: "360P",
                        };
                        videoQuantity = qualityArray[quality] || "unknown";
                        console.log("videoQuantity is " + videoQuantity);
                        if (fallback) {
                            throw new Error("error happen when get video data");
                        }
                        debug("echo target");
                        debug(target);
                        target.forEach(function (element, part) {
                            var file = path.join(videopath, "".concat(sanitize(filename), "-").concat(part, ".flv"));
                            debug("part is %o", part);
                            debug("file name %o", file);
                            var state = downloader.downloadByIndex(part, file, function (progress, index) {
                                var speed = progress.speed, eta = progress.eta, percentage = progress.percentage; //显示进度条
                                console.log("speed: " + Math.round(speed / 1e3) + "KB/s");
                                console.log("eta:".concat(eta, "s"));
                            });
                        });
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * get video detail
     * @param {object} page
     * @param {string} link
     */
    BilibiliScraper.prototype.getVideodetail = function (page, link) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (page) {
                            this.page = page;
                        }
                        return [4 /*yield*/, this.page.goto(link, {
                                waitUntil: "domcontentloaded",
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BilibiliScraper;
}(social_scraper_1.SocialScraper));
exports.BilibiliScraper = BilibiliScraper;
module.exports = {
    BilibiliScraper: BilibiliScraper,
};


/***/ }),

/***/ "./src/modules/facebook_scraper.ts":
/*!*****************************************!*\
  !*** ./src/modules/facebook_scraper.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.FacebookScraper = void 0;
// import {cheerio} from 'cheerio';
var social_scraper_1 = __webpack_require__(/*! ./social_scraper */ "./src/modules/social_scraper.ts");
var FacebookScraper = /** @class */ (function (_super) {
    __extends(FacebookScraper, _super);
    function FacebookScraper(args) {
        return _super.call(this, args) || this;
    }
    FacebookScraper.prototype.load_login_page = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startUrl, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        startUrl = 'https://www.facebook.com';
                        // if (this.config.facebook_settings) {
                        //     startUrl = `https://www.${this.config.facebook_settings.facebook_domain}`;
                        //     if (this.config.facebook_settings.facebook_domain) {
                        //         startUrl = `https://www.${this.config.facebook_settings.facebook_domain}`;
                        //     } else {
                        //         startUrl = `https://www.facebook.com`;
                        //     }
                        //     for (var key in this.config.facebook_settings) {
                        //         if (key !== 'facebook_domain') {
                        //             startUrl += `${key}=${this.config.facebook_settings[key]}&`
                        //         }
                        //     }
                        // }
                        this.logger.info('Using loginUrl: ' + startUrl);
                        _a = this;
                        return [4 /*yield*/, this.page.goto(startUrl)];
                    case 1:
                        _a.last_response = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //user login by hand
    FacebookScraper.prototype.userloginaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return FacebookScraper;
}(social_scraper_1.SocialScraper));
exports.FacebookScraper = FacebookScraper;


/***/ }),

/***/ "./src/modules/metadata.ts":
/*!*********************************!*\
  !*** ./src/modules/metadata.ts ***!
  \*********************************/
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
var cheerio = __webpack_require__(/*! cheerio */ "cheerio");
module.exports = {
    get_ip_data: get_ip_data,
    get_http_headers: get_http_headers,
};
function get_ip_data(page) {
    return __awaiter(this, void 0, void 0, function () {
        var json, $, ipinfo_text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.goto('https://ipinfo.io/json', {
                        waitLoad: true,
                        waitNetworkIdle: true
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.content({
                            timeout: 20000
                        })];
                case 2:
                    json = _a.sent();
                    $ = cheerio.load(json);
                    ipinfo_text = $('pre').text();
                    return [2 /*return*/, JSON.parse(ipinfo_text)];
            }
        });
    });
}
function get_http_headers(page) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, $, headers_text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.goto('https://httpbin.org/get', {
                        waitLoad: true,
                        waitNetworkIdle: true
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.content()];
                case 2:
                    headers = _a.sent();
                    $ = cheerio.load(headers);
                    headers_text = $('pre').text();
                    return [2 /*return*/, JSON.parse(headers_text)];
            }
        });
    });
}


/***/ }),

/***/ "./src/modules/social_scraper.ts":
/*!***************************************!*\
  !*** ./src/modules/social_scraper.ts ***!
  \***************************************/
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
exports.SocialScraper = void 0;
var meta = __webpack_require__(/*! ./metadata.ts */ "./src/modules/metadata.ts");
var debug = __webpack_require__(/*! debug */ "debug")('se-scraper:Scraper');
var remotesource_1 = __webpack_require__(/*! ../remotesource */ "./src/remotesource.ts");
/**
 * this is parent class for social scrapyer node
 *  */
var SocialScraper = /** @class */ (function () {
    function SocialScraper(options) {
        debug('constructor');
        debug(options);
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
        if (options.taskid) {
            this.taskid = options.taskid;
        }
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
            var links, remoteSourmodel;
            var _this = this;
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
                        remoteSourmodel = new remotesource_1.RemoteSource();
                        debug(links);
                        //handle the links
                        links === null || links === void 0 ? void 0 : links.map(function (linkItem) { return __awaiter(_this, void 0, void 0, function () {
                            var linkobj;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        linkobj = { title: linkItem.title, url: linkItem.link, lang: linkItem.lang, socialtask_id: linkItem.taskid };
                                        debug(linkobj);
                                        return [4 /*yield*/, remoteSourmodel.saveLinkremote(linkobj)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    return SocialScraper;
}());
exports.SocialScraper = SocialScraper;
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

/***/ "./src/modules/youtube_scraper.ts":
/*!****************************************!*\
  !*** ./src/modules/youtube_scraper.ts ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// const cheerio = require('cheerio');
var social_scraper_1 = __webpack_require__(/*! ./social_scraper */ "./src/modules/social_scraper.ts");
var fs = __webpack_require__(/*! fs */ "fs");
var YoutubeScraper = /** @class */ (function (_super) {
    __extends(YoutubeScraper, _super);
    function YoutubeScraper(args) {
        return _super.call(this, args) || this;
    }
    YoutubeScraper.prototype.load_login_page = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startUrl, _a, cookies;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        startUrl = 'https://www.youtube.com';
                        this.logger.info('Using loginUrl: ' + startUrl);
                        return [4 /*yield*/, this.page.setBypassCSP(true)];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.page.goto(startUrl)];
                    case 2:
                        _a.last_response = _b.sent();
                        //hidden icon
                        return [4 /*yield*/, this.page.evaluate(function () {
                                var icon = document.getElementById("logo-icon");
                                if (icon) {
                                    icon.style.display = "none";
                                }
                            })];
                    case 3:
                        //hidden icon
                        _b.sent();
                        console.log(this.config.tmppath);
                        //await this.page.waitForSelector('input[name="q"]', { timeout: this.STANDARD_TIMEOUT });
                        //await for user to take action
                        return [4 /*yield*/, this.page.waitForSelector('#avatar-btn', { 'timeout': 0 })];
                    case 4:
                        //await this.page.waitForSelector('input[name="q"]', { timeout: this.STANDARD_TIMEOUT });
                        //await for user to take action
                        _b.sent();
                        return [4 /*yield*/, this.page.cookies()];
                    case 5:
                        cookies = _b.sent();
                        return [4 /*yield*/, fs.writeFile(this.config.tmppath + '/cookies.json', JSON.stringify(cookies, null, 2))];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return YoutubeScraper;
}(social_scraper_1.SocialScraper));
module.exports = {
    YoutubeScraper: YoutubeScraper,
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
exports.ScrapeManager = void 0;
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
var facebook = __webpack_require__(/*! ./modules/facebook_scraper */ "./src/modules/facebook_scraper.ts");
var youtube = __webpack_require__(/*! ./modules/youtube_scraper */ "./src/modules/youtube_scraper.ts");
var bilibili = __webpack_require__(/*! ./modules/bilibili_scraper */ "./src/modules/bilibili_scraper.ts");
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
            // headless: true,
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
exports.ScrapeManager = ScrapeManager;
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
exports.RemoteSource = void 0;
var axios = __webpack_require__(/*! axios */ "axios");
var debug = __webpack_require__(/*! debug */ "debug")('RemoteSource:RemoteSource');
var FormData = __webpack_require__(/*! form-data */ "form-data");
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
    /**
     * save link to remote servive
     */
    RemoteSource.prototype.saveLinkremote = function (link) {
        return __awaiter(this, void 0, void 0, function () {
            var FormData, data, linkId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FormData = __webpack_require__(/*! form-data */ "form-data");
                        debug(link);
                        data = new FormData();
                        data.append('title', link.title);
                        if (link.content) {
                            data.append('content', link.content);
                        }
                        data.append('url', link.url);
                        data.append('lang', link.lang);
                        if (link.socialtask_id) {
                            data.append('socialtask_id', link.socialtask_id);
                        }
                        return [4 /*yield*/, axios.post(this.REMOTEADD + "/api/savesolink", data, {
                                auth: {
                                    username: this.REMOTEUSERNAME,
                                    password: this.REMOTEPASSWORD,
                                },
                            })
                                .then(function (res) {
                                // debug(res);
                                // console.log(res)
                                return res.data.data;
                            })
                                .catch(function (error) {
                                // console.log(error);
                                throw new Error(error.message);
                            })];
                    case 1:
                        linkId = _a.sent();
                        return [2 /*return*/, linkId];
                }
            });
        });
    };
    return RemoteSource;
}());
exports.RemoteSource = RemoteSource;
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

/***/ "form-data":
/*!****************************!*\
  !*** external "form-data" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("form-data");

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
module.exports = JSON.parse('{"name":"social-marketing","version":"1.0.0","description":"A module using puppeteer to do social marketing","main":"index.js","scripts":{"build":"tsc --build","clean":"tsc --build --clean","test":"env TS_NODE_COMPILER_OPTIONS=\'{\\"module\\": \\"commonjs\\" }\' mocha -r ts-node/register \'test/**/*.ts\'","login":"ts-node run.ts -a login -c","task":"ts-node run.ts -a task","testdownload":"mocha test test/modules --grep download download single video","testgetlinks":"mocha test test/modules --grep get video play link","testgetalllinks":"mocha test test/modules --grep video-url-list","testsavelinkremote":"env TS_NODE_COMPILER_OPTIONS=\'{\\"module\\": \\"commonjs\\" }\' mocha -r ts-node/register \'test/modules/remotesource.test.ts\'"},"keywords":["scraping","search-engines","google","bing","web-scraping"],"author":"Robert Zeng","repository":{"type":"git","url":"https://github.com/robertzengcn/social-marketing.git"},"license":"ISC","dependencies":{"argparse":"^2.0.1","axios":"^1.3.6","cheerio":"^1.0.0-rc.3","clean-webpack-plugin":"^4.0.0","copy-webpack-plugin":"^11.0.0","cron":"^2.3.0","debug":"^4.3.4","dotenv":"^16.0.3","expect.js":"^0.3.1","filenamify":"^4.3.0","got":"^9.6.0","jshint":"^2.13.6","lodash":"^4.17.21","progress-stream":"^2.0.0","puppeteer":"^18.1.0","puppeteer-cluster":"^0.23.0","puppeteer-extra":"^3.3.6","puppeteer-extra-plugin-adblocker":"^2.13.6","puppeteer-extra-plugin-stealth":"^2.11.2","puppeteer-stream":"^3.0.3","puppeteer-video-recorder":"^1.0.5","request":"^2.88.2","sqlite3":"^5.1.6","user-agents":"^1.0.1354","webpack-livereload-plugin":"^3.0.2","webpack-manifest-plugin":"^5.0.0","webpack-merge":"^5.9.0","winston":"^3.2.1"},"engines":{"npm":">=9.3.1","node":">=18.14.0"},"devDependencies":{"@types/chai":"^4.3.5","@types/mocha":"^10.0.1","@types/node":"^20.3.1","@types/sinon":"^10.0.15","bluebird":"^3.7.2","chai":"^4.3.7","chai-string":"^1.5.0","eslint":"^8.38.0","express":"^4.17.1","http-mitm-proxy":"^0.8.2","key-cert":"^1.0.1","mocha":"^6.2.3","prettier":"2.8.4","sinon":"^15.2.0","ts-loader":"^9.4.3","ts-node":"^10.9.1","tslib":"^2.5.3","typescript":"^5.1.3","ua-parser-js":"^0.7.21","webpack":"^5.86.0","webpack-cli":"^5.1.4","webpack-dev-server":"^4.15.1","webpack-node-externals":"^3.0.0"}}');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ydW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtGQUFrRDtBQUNsRCx5REFBeUQ7QUFFekQsU0FBc0IsS0FBSyxDQUFDLGNBQXFCLEVBQUUsYUFBb0I7Ozs7OztvQkFDckUsOENBQThDO29CQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztvQkFFekMsT0FBTyxHQUFHLElBQUksNkJBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDaEQsb0RBQW9EO29CQUNwRCxxQkFBTSxPQUFPLENBQUMsS0FBSyxFQUFFOztvQkFEckIsb0RBQW9EO29CQUNwRCxTQUFxQixDQUFDO29CQUVSLHFCQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDOztvQkFBNUMsT0FBTyxHQUFHLFNBQWtDO29CQUVoRCxxQkFBTSxPQUFPLENBQUMsSUFBSSxFQUFFOztvQkFBcEIsU0FBb0IsQ0FBQztvQkFFckIsc0JBQU8sT0FBTyxFQUFDOzs7O0NBQ2hCO0FBYkQsc0JBYUM7QUFDRCxlQUFlO0FBQ2YsU0FBc0IsVUFBVSxDQUFDLGNBQWMsRUFBRSxhQUFhOzs7Ozs7b0JBQzVELDhDQUE4QztvQkFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7b0JBRXpDLE9BQU8sR0FBRyxJQUFJLDZCQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ2hELG9EQUFvRDtvQkFDcEQscUJBQU0sT0FBTyxDQUFDLEtBQUssRUFBRTs7b0JBRHJCLG9EQUFvRDtvQkFDcEQsU0FBcUIsQ0FBQztvQkFDdEIscUJBQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7O29CQUF2QyxTQUF1QyxDQUFDO29CQUV4QyxxQkFBTSxPQUFPLENBQUMsSUFBSSxFQUFFOztvQkFBcEIsU0FBb0IsQ0FBQzs7Ozs7Q0FDdEI7QUFWRCxnQ0FVQztBQUVELHFCQUFxQjtBQUNyQiw0QkFBNEI7QUFDNUIsa0JBQWtCO0FBQ2xCLDBCQUEwQjtBQUMxQixrQ0FBa0M7QUFDbEMseUJBQXlCO0FBQ3pCLEtBQUs7Ozs7Ozs7Ozs7OztBQ3JDUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFYix5Q0FBeUM7QUFDekMsK0RBQXlDO0FBQ2pDLGtCQUFjLEdBQUssZ0VBQUwsQ0FBeUI7QUFDL0MsNEZBQWdEO0FBQ3hDLFdBQU8sR0FBSyxxRUFBTCxDQUErQjtBQUM5QyxJQUFNLEVBQUUsR0FBRyxtQkFBTyxDQUFDLGNBQUksQ0FBQyxDQUFDO0FBQ3pCLElBQU0sT0FBTyxHQUFHLGlEQUF1QixDQUFDO0FBQ3hDLElBQU0sS0FBSyxHQUFHLG1CQUFPLENBQUMsb0JBQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzlDLDZEQUE2RDtBQUU3RCxJQUFNLE1BQU0sR0FBRyxJQUFJLGNBQWMsQ0FBQztJQUNoQyxXQUFXLEVBQUUsbUJBQW1CO0NBQ2pDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxXQUFFLENBQUMsQ0FBQztBQUN2RSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7SUFDcEMsSUFBSSxFQUFFLDRDQUE0QztDQUNuRCxDQUFDLENBQUM7QUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7SUFDdEMsSUFBSSxFQUFFLDZDQUE2QztDQUNwRCxDQUFDLENBQUM7QUFFSCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7QUFFbEMsK0NBQStDO0FBQy9DLGtEQUFrRDtBQUNsRCxJQUFJLGNBQWMsR0FBRztJQUNuQixnQ0FBZ0M7SUFDaEMsVUFBVSxFQUNSLGlIQUFpSDtJQUNuSCxxRUFBcUU7SUFDckUsaUJBQWlCLEVBQUUsS0FBSztJQUN4QixnREFBZ0Q7SUFDaEQsUUFBUSxFQUFFLEtBQUs7SUFDZiw4Q0FBOEM7SUFDOUMseUJBQXlCO0lBQ3pCLHFDQUFxQztJQUNyQyxNQUFNO0lBQ04sK0NBQStDO0lBQy9DLFdBQVcsRUFBRSxDQUFDO0lBQ2Qsc0NBQXNDO0lBQ3RDLFlBQVksRUFBRSxFQUFFO0lBQ2hCLCtDQUErQztJQUMvQywyQ0FBMkM7SUFDM0MsOENBQThDO0lBQzlDLHlDQUF5QztJQUN6QyxnREFBZ0Q7SUFDaEQsV0FBVyxFQUFFLEVBQUU7SUFDZixrQ0FBa0M7SUFDbEMsd0NBQXdDO0lBQ3hDLHlDQUF5QztJQUN6QyxLQUFLLEVBQUUsRUFBRTtJQUNULDJDQUEyQztJQUMzQyw2QkFBNkI7SUFDN0IsOEJBQThCO0lBQzlCLFVBQVUsRUFBRSxFQUFFO0lBQ2QsV0FBVyxFQUFDLEtBQUs7SUFDakIsd0JBQXdCLEVBQUU7UUFDeEIsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSTtRQUN2QixPQUFPLEVBQUUsS0FBSztRQUNkLFdBQVcsRUFBRSxDQUFDO1FBQ2QsY0FBYyxFQUFFLENBQUMsRUFBRSxvQkFBb0I7S0FDeEM7Q0FDRixDQUFDO0FBRUYsSUFBSSxhQUFhLEdBQUc7SUFDbEIsZ0NBQWdDO0lBQ2hDLHdCQUF3QjtJQUN4QixpQ0FBaUM7SUFDakMsUUFBUSxFQUFFLENBQUMsb0JBQW9CLENBQUM7SUFDaEMsaURBQWlEO0lBQ2pELFNBQVMsRUFBRSxDQUFDO0lBRVoseUJBQXlCO0lBQ3pCLHFCQUFxQjtJQUNyQix3RkFBd0Y7SUFDeEYseUZBQXlGO0lBQ3pGLHdFQUF3RTtJQUN4RSw2RkFBNkY7SUFDN0YsS0FBSztJQUNMLHlGQUF5RjtJQUN6RixZQUFZLEVBQUUsRUFBRTtJQUNoQixxRkFBcUY7SUFDckYsK0RBQStEO0lBQy9ELFdBQVcsRUFBRSxFQUFFO0lBQ2YsbURBQW1EO0lBQ25ELFdBQVcsRUFBRSxxQkFBcUI7SUFDbEMsMERBQTBEO0lBQzFELHNDQUFzQztJQUN0QyxZQUFZLEVBQUUsS0FBSztJQUNuQiwrREFBK0Q7SUFDL0Qsd0RBQXdEO0lBQ3hELFlBQVksRUFBRSxLQUFLO0lBQ25CLHdCQUF3QixFQUFFLElBQUk7SUFDOUIsc0JBQXNCO0lBQ3RCLGNBQWMsRUFBRSxLQUFLO0lBQ3JCLG1CQUFtQjtJQUNuQixnQkFBZ0IsRUFBRSxLQUFLO0lBQ3ZCLFFBQVEsRUFBRSxVQUFVO0lBQ3BCLElBQUksRUFBRSxFQUFFO0lBQ1IsSUFBSSxFQUFFLEVBQUU7SUFDUixPQUFPLEVBQUMsRUFBRTtJQUNWLE1BQU0sRUFBQyxDQUFDO0NBQ1QsQ0FBQztBQUVGLFNBQVMsR0FBRyxDQUFDLE1BQW9CLEVBQUUsR0FBVSxFQUFFLGFBQWE7SUFDMUQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztBQUNoRSxDQUFDO0FBRUQsU0FBZSxVQUFVLENBQUMsT0FBTzs7OztZQUMzQixNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7YUFDaEQ7WUFFRCxRQUFRLE1BQU0sRUFBRTtnQkFDZCxLQUFLLE9BQU87b0JBQ1YsS0FBSyxFQUFFLENBQUM7b0JBQ1IsTUFBTTtnQkFDUixLQUFLLE1BQU07b0JBQ1QsV0FBVyxFQUFFLENBQUM7b0JBQ2QsTUFBTTthQUNUOzs7O0NBQ0Y7QUFDRCxjQUFjO0FBQ2QsU0FBZSxXQUFXOzs7Ozs7O29CQUNwQixZQUFZLEdBQUUsSUFBSSwyQkFBWSxFQUFFLENBQUM7b0JBQ2xCLHFCQUFNLFlBQVksQ0FBQyxlQUFlLEVBQUU7O29CQUFqRCxZQUFZLEdBQUMsU0FBb0M7b0JBQ3ZELEtBQUssQ0FBQyxZQUFZLENBQUM7b0JBQ25CLElBQUcsQ0FBQyxZQUFZLEVBQUM7d0JBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO3FCQUM5QztvQkFDSyxTQUFTLEdBQUcsa0JBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxNQUFNLG1DQUFJLENBQUMsQ0FBQztvQkFDNUMsSUFBRyxTQUFTLElBQUUsQ0FBQyxFQUFDO3dCQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7cUJBQ3hDOzBCQUNrQyxFQUFaLDZCQUFZOzs7eUJBQVosMkJBQVk7b0JBQXhCLFFBQVE7b0JBQ1QsYUFBUSxDQUFDLElBQUk7OzZCQUNkLGdCQUFnQixDQUFDLENBQWpCLHdCQUFnQjs2QkFNaEIsa0JBQWtCLENBQUMsQ0FBbkIsd0JBQWtCOzs7O29CQUxyQixhQUFhLENBQUMsUUFBUSxHQUFDLFVBQVU7b0JBQ2pDLGFBQWEsQ0FBQyxNQUFNLEdBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ2hDLGFBQWEsQ0FBQyxRQUFRLEdBQUMsUUFBUSxDQUFDLFFBQVE7b0JBQ3hDLHFCQUFNLHNCQUFVLEVBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQzs7b0JBQS9DLFNBQStDLENBQUM7b0JBQ2hELHdCQUFNOztvQkFFTixhQUFhLENBQUMsUUFBUSxHQUFDLFVBQVU7b0JBRWpDLHdCQUFNOztvQkFYVyxJQUFZOzs7Ozs7Q0FjcEM7QUFDRCxtQkFBbUI7QUFDbkIsU0FBZSxLQUFLOzs7Ozs7b0JBQ2QsVUFBVSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUM3QyxZQUFZLEdBQUUsSUFBSSwyQkFBWSxFQUFFLENBQUM7b0JBQ3JCLHFCQUFNLFlBQVksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDOztvQkFBMUQsU0FBUyxHQUFHLFNBQThDO29CQUM5RCxLQUFLLENBQUMsU0FBUyxDQUFDO29CQUNoQixJQUFHLFNBQVMsSUFBRyxJQUFJLEVBQUM7d0JBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztxQkFDM0M7b0JBQ0QsYUFBYSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO29CQUMxQyxhQUFhLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUM7b0JBQzFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQztvQkFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFakIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN4RixxQkFBTSxVQUFVLENBQUMsT0FBTyxDQUFDOztvQkFBekIsU0FBeUIsQ0FBQztvQkFDMUIsYUFBYSxDQUFDLE9BQU8sR0FBQyxPQUFPO29CQUU3QixxQkFBTSxpQkFBSyxFQUFDLGNBQWMsRUFBRSxhQUFhLENBQUM7O29CQUExQyxTQUEwQyxDQUFDOzs7OztDQUM1QztBQUVELFNBQVMsVUFBVSxDQUFDLElBQUk7SUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxXQUFXLEVBQUUsU0FBUztRQUM1QyxXQUFXLElBQUksVUFBRyxTQUFTLE1BQUcsQ0FBQztRQUUvQixJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMvQixFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzNCO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1QsQ0FBQztBQUVELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDM0xQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFYixJQUFNLE9BQU8sR0FBRyxtQkFBTyxDQUFDLHdCQUFTLENBQUMsQ0FBQztBQUNuQyxzR0FBaUc7QUFDakcsSUFBTSxFQUFFLEdBQUcsbUJBQU8sQ0FBQyxjQUFJLENBQUMsQ0FBQztBQUNqQixjQUFVLEdBQUssd0dBQUwsQ0FBeUM7QUFDM0QsSUFBTSxJQUFJLEdBQUcsbUJBQU8sQ0FBQyxrQkFBTSxDQUFDLENBQUM7QUFDN0IsSUFBTSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyw4QkFBWSxDQUFDLENBQUM7QUFDdkMsSUFBTSxLQUFLLEdBQUcsbUJBQU8sQ0FBQyxvQkFBTyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUNyRCxTQUF3QixtQkFBTyxDQUFDLHdEQUFtQixDQUFDLEVBQWxELFVBQVUsa0JBQUUsS0FBSyxXQUFpQyxDQUFDO0FBUTNELHVDQUF1QztBQUN2Qyw2REFBNkQ7QUFDN0Qsc0VBQXNFO0FBQ3RFO0lBQXFDLG1DQUFPO0lBRzFDLHlCQUFZLElBQW1CO1FBQS9CLFlBQ0Usa0JBQU0sSUFBSSxDQUFDLFNBSVo7UUFIQyxLQUFJLENBQUMsUUFBUSxHQUFHLDBCQUEwQixDQUFDOztRQUMzQywyQkFBMkI7UUFDM0IscUJBQXFCO0lBQ3ZCLENBQUM7SUFDSyx5Q0FBZSxHQUFyQjs7O2dCQUNFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQzs7OztLQUV6QjtJQUNELHFCQUFxQjtJQUNmLHlDQUFlLEdBQXJCOzs7Ozs7d0JBQ0UsNkNBQTZDO3dCQUU3QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3JELHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQzs7d0JBQWxDLFNBQWtDLENBQUM7d0JBQ25DLFNBQUk7d0JBQWlCLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7O3dCQUF4RCxHQUFLLGFBQWEsR0FBRyxTQUFtQyxDQUFDO3dCQUV6RCxPQUFPLENBQUMsR0FBRyxDQUNULDBDQUEwQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUNqRSxDQUFDO3dCQUNGLGlCQUFpQjt3QkFDakIscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUM7O3dCQUQ1QyxpQkFBaUI7d0JBQ2pCLFNBQTRDLENBQUM7d0JBQzdDLGtDQUFrQzt3QkFDbEMsOENBQThDO3dCQUM5QywrQkFBK0I7d0JBQy9CLE1BQU07d0JBQ04scUJBQXFCO3dCQUNyQixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsRUFBRTtnQ0FDdkQsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7NkJBQy9CLENBQUM7O3dCQVBGLGtDQUFrQzt3QkFDbEMsOENBQThDO3dCQUM5QywrQkFBK0I7d0JBQy9CLE1BQU07d0JBQ04scUJBQXFCO3dCQUNyQixTQUVFLENBQUM7d0JBRWMscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsOEJBQThCLENBQUM7O3dCQUE1RCxNQUFNLEdBQUksVUFBa0QsSUFBdEQ7NkJBQ1QsTUFBTSxFQUFOLHdCQUFNO3dCQUNSLHFCQUFPLE1BQWlDLENBQUMsS0FBSyxFQUFFOzt3QkFBaEQsU0FBZ0QsQ0FBQzs7O29CQUVuRCwrQkFBK0I7b0JBQy9CLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOzt3QkFEckUsK0JBQStCO3dCQUMvQixTQUFxRSxDQUFDO3dCQUd0RCxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTs7d0JBQW5DLE9BQU8sR0FBRyxTQUF5Qjt3QkFFekMscUJBQU0sRUFBRSxDQUFDLFNBQVMsQ0FDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsZUFBZSxFQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQ2hDLFVBQUMsR0FBRztnQ0FDRixJQUFJLEdBQUcsRUFBRTtvQ0FDUCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lDQUNwQjs0QkFDSCxDQUFDLENBQ0Y7O3dCQVJELFNBUUMsQ0FBQzt3QkFDRixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTs7d0JBQXZCLFNBQXVCLENBQUM7d0JBQ3hCLCtCQUErQjt3QkFDL0Isc0JBQU8sSUFBSSxFQUFDOzs7O0tBQ2I7SUFFRDs7Ozs7T0FLRztJQUNHLHdDQUFjLEdBQXBCLFVBQXFCLE9BQXVCOzs7Ozs7d0JBQzFDLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTs0QkFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO3lCQUMxQjt3QkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3JELHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQzs7d0JBQWxDLFNBQWtDLENBQUM7d0JBQ25DLFNBQUk7d0JBQWlCLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7O3dCQUF4RCxHQUFLLGFBQWEsR0FBRyxTQUFtQyxDQUFDO3dCQUN6RCxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDOzt3QkFBMUQsU0FBMEQsQ0FBQzt3QkFLekMscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7O3dCQUFoRCxTQUFTLEdBQUcsU0FBb0M7NkJBQ2xELFNBQVMsRUFBVCx3QkFBUzt3QkFDWCxxQkFBTSxTQUFTLENBQUMsS0FBSyxFQUFFOzt3QkFBdkIsU0FBdUIsQ0FBQzs7NEJBRTFCLHNCQUFPLFNBQVMsRUFBQzs7OztLQUNsQjtJQUNEOzs7OztPQUtHO0lBQ0csb0NBQVUsR0FBaEIsVUFBaUIsT0FBcUI7Ozs7Ozt3QkFDcEMsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFOzRCQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7eUJBQzFCO3dCQUNHLE1BQU0sR0FBa0IsRUFBRTs2QkFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQTlCLHdCQUE4Qjs4QkFDSyxFQUFmLFlBQU8sQ0FBQyxPQUFPOzs7NkJBQWYsZUFBZTt3QkFBMUIsT0FBTzt3QkFDWixVQUFVLEdBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTt3QkFDdEQscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7O3dCQUE3QyxPQUFPLEdBQUcsU0FBbUM7d0JBQ2pELEtBQUssQ0FBQyxPQUFPLENBQUM7d0JBQ2QsV0FBMEIsRUFBUCxtQkFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTyxFQUFFOzRCQUFqQixJQUFJOzRCQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNsQjs7O3dCQU5tQixJQUFlOzs7OzZCQVM1QixRQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssUUFBUSxHQUFuQyx3QkFBbUM7d0JBQ3hDLFVBQVUsR0FBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRTt3QkFDOUQscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7O3dCQUE3QyxPQUFPLEdBQUcsU0FBbUM7d0JBQ2pELFdBQTBCLEVBQVAsbUJBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU8sRUFBRTs0QkFBakIsSUFBSTs0QkFFYixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDckI7OzRCQUVILHNCQUFPLE1BQU07d0JBQ2IseUVBQXlFO3NCQUQ1RDs7OztLQUVkO0lBQ0QsK0JBQStCO0lBQy9COzs7O09BSUc7SUFDRyxzQ0FBWSxHQUFsQixVQUFtQixNQUFvQjs7Ozs7Ozt3QkFDckMsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFOzRCQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzt5QkFDekI7NkJBQ0csTUFBTSxDQUFDLFdBQVcsRUFBbEIsd0JBQWtCO3dCQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUU7NEJBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQStCLE1BQU0sQ0FBQyxXQUFXLENBQUUsQ0FBQyxDQUFDO3lCQUN0RTt3QkFFYSxlQUFJLEVBQUMsS0FBSzt3QkFBQyxxQkFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDOzt3QkFBbkUsT0FBTyxHQUFHLGNBQVcsU0FBOEMsRUFBQzt3QkFDeEUsd0JBQXdCO3dCQUN4QixxQkFBTSxVQUFJLENBQUMsSUFBSSxFQUFDLFNBQVMsV0FBSSxPQUFPLEdBQUM7O3dCQURyQyx3QkFBd0I7d0JBQ3hCLFNBQXFDLENBQUM7Ozs2QkFHcEMsUUFBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFFBQVEsR0FBbEMsd0JBQWtDO3dCQUM3QixxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFBNUUsc0JBQU8sU0FBcUU7O3dCQUV4RSxPQUFPLEdBQW1CLEVBQUUsQ0FBQzs4QkFDTSxFQUFkLFdBQU0sQ0FBQyxPQUFPOzs7NkJBQWQsZUFBYzt3QkFBNUIsVUFBVTt3QkFDVCxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDOzt3QkFBckUsR0FBRyxHQUFDLFNBQWlFO3dCQUMzRSxXQUFzQixFQUFILFdBQUcsRUFBSCxpQkFBRyxFQUFILElBQUcsRUFBRTs0QkFBYixJQUFJOzRCQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNuQjs7O3dCQUpzQixJQUFjOzs0QkFNdkMsc0JBQU8sT0FBTzs7OztLQUdqQjtJQUVLLHNDQUFZLEdBQWxCLFVBQW1CLEtBQXFCOzs7Ozs0QkFDcEIscUJBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQzs0QkFDMUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJOzRCQUNmLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTzt5QkFDdkIsQ0FBQzs7d0JBSEksU0FBUyxHQUFHLFNBR2hCO3dCQUVFLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNsQixxQkFBTSxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQUMsTUFBTTtnQ0FDakQsYUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQzs0QkFBNUMsQ0FBNEMsQ0FDN0M7O3dCQUZLLE9BQU8sR0FBRyxTQUVmO3dCQUNhLHFCQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUU7O3dCQUE3QixLQUFLLEdBQUcsU0FBcUI7OEJBRVgsRUFBTCxlQUFLOzs7NkJBQUwsb0JBQUs7d0JBQWIsSUFBSTt3QkFDRyxxQkFBTSxJQUFJLENBQUMsR0FBRyxFQUFFOzt3QkFBMUIsT0FBTyxHQUFHLFNBQWdCO3dCQUNoQyw0QkFBNEI7d0JBQzVCLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFOzRCQUMzQyxVQUFVLEdBQUcsSUFBSSxDQUFDOzRCQUNsQix3QkFBTTt5QkFDUDs7O3dCQU5nQixJQUFLOzs7d0JBUXhCLElBQUksQ0FBQyxVQUFVLEVBQUU7NEJBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO3lCQUMxQzt3QkFFRCxxQkFBTSxVQUFVLENBQUMsVUFBVSxDQUFDOzt3QkFBNUIsU0FBNEIsQ0FBQzs7Ozt3QkFHN0IscUJBQU0sVUFBVSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7d0JBQXRFLFNBQXNFLENBQUM7Ozs7d0JBRXZFLElBQUksR0FBQyxZQUFZLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFOzRCQUM5QyxpREFBaUQ7NEJBQ2pELEtBQUssQ0FBQyw2REFBNkQsQ0FBQzs0QkFDcEUsNEJBQTRCOzRCQUM1QixzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sSUFBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQzt5QkFDckQ7Ozt3QkFFRyxPQUFPLEdBQW1CLEVBQUUsQ0FBQzt3QkFJaEIscUJBQU0sVUFBVSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzs7d0JBQW5ELFFBQVEsR0FBRyxTQUF3Qzt3QkFDekQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNQLENBQUMsR0FBRyxDQUFDOzs7NkJBQUUsRUFBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNO3dCQUVqQyxxQkFBTSxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQUMsT0FBTztnQ0FDaEMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDOzRCQUNsQixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOzt3QkFGZixTQUVlLENBQUM7d0JBQ0YscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDOzt3QkFBekQsS0FBSyxHQUFHLFNBQWlEO3dCQUMvRCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7NEJBQ2IsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDckIsQ0FBQyxDQUFDLENBQUM7Ozt3QkFUZ0MsQ0FBQyxFQUFFOzs2QkFheEMsc0JBQU8sT0FBTyxFQUFDOzs7O0tBQ2hCO0lBQ0Q7Ozs7T0FJRztJQUNHLDBDQUFnQixHQUF0QixVQUF1QixFQUFRO1lBQU4sSUFBSTs7Ozs7O3dCQUMzQixJQUFJLElBQUksRUFBRTs0QkFDUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzt5QkFDbEI7d0JBS0csT0FBTyxHQUFtQixFQUFFLENBQUM7d0JBQ2pDLG1CQUFtQjt3QkFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO3dCQUNyQixPQUFPLEdBQUMsQ0FBQyxDQUFDO3dCQUNkLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUM7NEJBQ3RCLE9BQU8sR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07eUJBQ3pCO3dCQUNTLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUM5Qiw4Q0FBOEMsRUFDOUMsVUFBQyxNQUFNLEVBQUMsT0FBTztnQ0FDYixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLO29DQUN0QixJQUFJLE9BQU8sR0FBWSxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLENBQUM7b0NBQ3ZELG9CQUFvQjtvQ0FDcEIsOEJBQThCO29DQUM5QixJQUFJO29DQUNKLElBQUcsT0FBTyxFQUFDO3dDQUNULE9BQU8sQ0FBQyxNQUFNLEdBQUMsT0FBTztxQ0FDdkI7b0NBQ0QsSUFBTSxJQUFJLEdBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7b0NBQ3JDLElBQUcsSUFBSSxFQUFDO3dDQUNSLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSTtxQ0FDbEI7b0NBQ0Qsc0JBQXNCO29DQUN0QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO29DQUN2QyxJQUFHLE1BQU0sRUFBQzt3Q0FDUCxJQUFNLEtBQUssR0FBRSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dDQUMxQyxJQUFHLEtBQUssRUFBQzs0Q0FDVCxPQUFPLENBQUMsS0FBSyxHQUFDLEtBQUs7eUNBQ2xCO3FDQUNIO29DQUNELE9BQU8sT0FBTyxDQUFDO2dDQUNqQixDQUFDLENBQUMsQ0FBQzs0QkFDTCxDQUFDLEVBQUMsT0FBTyxDQUNWOzt3QkExQkQsT0FBTyxHQUFHLFNBMEJULENBQUM7d0JBQ0YsOEJBQThCO3dCQUM5QixrQkFBa0I7d0JBQ2xCLDZCQUE2Qjt3QkFDN0IsdUJBQXVCO3dCQUV2QixxQkFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLEtBQUs7Z0NBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtvQ0FDckMsc0NBQXNDO29DQUN0QyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztpQ0FDMUI7NEJBQ0gsQ0FBQyxDQUFDOzt3QkFWRiw4QkFBOEI7d0JBQzlCLGtCQUFrQjt3QkFDbEIsNkJBQTZCO3dCQUM3Qix1QkFBdUI7d0JBRXZCLFNBS0UsQ0FBQzt3QkFDSCxxQkFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLEtBQUs7Z0NBQ25DLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7b0NBQ2xDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsQ0FBQztvQ0FDcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUNBQzFCOzRCQUNILENBQUMsQ0FBQzs7d0JBTEYsU0FLRSxDQUFDO3dCQUNILDhCQUE4Qjt3QkFDOUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUVmLHNCQUFPLE9BQU8sRUFBQzs7OztLQUNoQjtJQUNEOzs7OztPQUtHO0lBQ0csNENBQWtCLEdBQXhCLFVBQXlCLEVBQW1CO1lBQWpCLElBQUksWUFBRSxTQUFTOzs7Ozs7d0JBcUJsQyxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQzt3QkFDcEMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7NEJBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQzt5QkFDdEM7d0JBQ0QscUJBQU0sVUFBVSxDQUFDLE1BQU0sRUFBRTs7d0JBQXpCLFNBQXlCLENBQUM7d0JBRVgscUJBQU0sVUFBVSxDQUFDLE9BQU8sRUFBRTs7d0JBQXJDLFFBQVEsR0FBRyxTQUEwQjt3QkFDekMsS0FBSyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQzt3QkFFeEIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUNWLHFCQUFNLFVBQVUsQ0FBQyxPQUFPLEVBQUU7O3dCQUEvQyxLQUFxQixTQUEwQixFQUE3QyxJQUFJLFlBQUUsUUFBUTt3QkFFaEIsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ3ZDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUNqRCxZQUFZLEdBQUc7NEJBQ2IsR0FBRyxFQUFFLFFBQVE7NEJBQ2IsRUFBRSxFQUFFLE9BQU87NEJBQ1gsRUFBRSxFQUFFLFFBQVE7NEJBQ1osRUFBRSxFQUFFLE1BQU07NEJBQ1YsRUFBRSxFQUFFLE1BQU07NEJBQ1YsRUFBRSxFQUFFLE1BQU07NEJBQ1YsRUFBRSxFQUFFLE1BQU07NEJBQ1YsRUFBRSxFQUFFLE1BQU07eUJBQ1gsQ0FBQzt3QkFDRSxhQUFhLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFNBQVMsQ0FBQzt3QkFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxhQUFhLENBQUMsQ0FBQzt3QkFDakQsSUFBSSxRQUFRLEVBQUU7NEJBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO3lCQUNyRDt3QkFDRCxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ3JCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDZCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLElBQUk7NEJBQzNCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFJLElBQUksU0FBTSxDQUFDLENBQUM7NEJBQ3ZFLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBQzFCLEtBQUssQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBQzVCLElBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQ3RDLElBQUksRUFDSixJQUFJLEVBQ0osVUFBQyxRQUFRLEVBQUUsS0FBSztnQ0FDTixTQUFLLEdBQXNCLFFBQVEsTUFBOUIsRUFBRSxHQUFHLEdBQWlCLFFBQVEsSUFBekIsRUFBRSxVQUFVLEdBQUssUUFBUSxXQUFiLENBQWMsQ0FBQyxPQUFPO2dDQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztnQ0FDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFPLEdBQUcsTUFBRyxDQUFDLENBQUM7NEJBQzdCLENBQUMsQ0FDRixDQUFDO3dCQUNKLENBQUMsQ0FBQyxDQUFDO3dCQUVILHNCQUFPLElBQUksRUFBQzs7OztLQUNiO0lBQ0Q7Ozs7T0FJRztJQUNHLHdDQUFjLEdBQXBCLFVBQXFCLElBQUksRUFBRSxJQUFJOzs7Ozt3QkFDN0IsSUFBSSxJQUFJLEVBQUU7NEJBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7eUJBQ2xCO3dCQUNELHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQ0FDekIsU0FBUyxFQUFFLGtCQUFrQjs2QkFDOUIsQ0FBQzs7d0JBRkYsU0FFRSxDQUFDOzs7OztLQUdKO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLENBaFhvQyw4QkFBTyxHQWdYM0M7QUFoWFksMENBQWU7QUFrWDVCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZixlQUFlLEVBQUUsZUFBZTtDQUNqQyxDQUFDOzs7Ozs7Ozs7Ozs7QUN4WVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNiLG1DQUFtQztBQUNuQyxzR0FBeUU7QUFFekU7SUFBcUMsbUNBQU87SUFFeEMseUJBQVksSUFBbUI7ZUFDM0Isa0JBQU0sSUFBSSxDQUFDO0lBQ2YsQ0FBQztJQUdLLHlDQUFlLEdBQXJCOzs7Ozs7d0JBQ1EsUUFBUSxHQUFHLDBCQUEwQixDQUFDO3dCQUUxQyx1Q0FBdUM7d0JBQ3ZDLGlGQUFpRjt3QkFDakYsMkRBQTJEO3dCQUMzRCxxRkFBcUY7d0JBQ3JGLGVBQWU7d0JBQ2YsaURBQWlEO3dCQUNqRCxRQUFRO3dCQUVSLHVEQUF1RDt3QkFDdkQsMkNBQTJDO3dCQUMzQywwRUFBMEU7d0JBQzFFLFlBQVk7d0JBQ1osUUFBUTt3QkFDUixJQUFJO3dCQUVKLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxDQUFDO3dCQUVoRCxTQUFJO3dCQUFpQixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7O3dCQUFuRCxHQUFLLGFBQWEsR0FBRyxTQUE4QixDQUFDOzs7OztLQUt2RDtJQUNELG9CQUFvQjtJQUNkLHlDQUFlLEdBQXJCOzs7Ozs7S0FFQztJQUVMLHNCQUFDO0FBQUQsQ0FBQyxDQXRDb0MsOEJBQU8sR0FzQzNDO0FBdENZLDBDQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0o1QixJQUFNLE9BQU8sR0FBRyxtQkFBTyxDQUFDLHdCQUFTLENBQUMsQ0FBQztBQUVuQyxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2IsV0FBVyxFQUFFLFdBQVc7SUFDeEIsZ0JBQWdCLEVBQUUsZ0JBQWdCO0NBQ3JDLENBQUM7QUFFRixTQUFlLFdBQVcsQ0FBQyxJQUFJOzs7Ozt3QkFDM0IscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRTt3QkFDeEMsUUFBUSxFQUFFLElBQUk7d0JBQ2QsZUFBZSxFQUFFLElBQUk7cUJBQ3RCLENBQUM7O29CQUhGLFNBR0UsQ0FBQztvQkFDUSxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUMxQixPQUFPLEVBQUUsS0FBSzt5QkFDakIsQ0FBQzs7b0JBRkUsSUFBSSxHQUFHLFNBRVQ7b0JBQ0ksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pCLFdBQVcsR0FBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ25DLHNCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUM7Ozs7Q0FDbEM7QUFFRCxTQUFlLGdCQUFnQixDQUFDLElBQUk7Ozs7O3dCQUNoQyxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFO3dCQUN6QyxRQUFRLEVBQUUsSUFBSTt3QkFDZCxlQUFlLEVBQUUsSUFBSTtxQkFDdEIsQ0FBQzs7b0JBSEYsU0FHRSxDQUFDO29CQUNXLHFCQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7O29CQUE5QixPQUFPLEdBQUcsU0FBb0I7b0JBRTVCLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM1QixZQUFZLEdBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNwQyxzQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFDOzs7O0NBQ25DOzs7Ozs7Ozs7Ozs7QUM5Qlk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUViLElBQU0sSUFBSSxHQUFHLG1CQUFPLENBQUMsZ0RBQWUsQ0FBQyxDQUFDO0FBQ3RDLElBQU0sS0FBSyxHQUFHLG1CQUFPLENBQUMsb0JBQU8sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDckQseUZBQXNEO0FBMkR0RDs7TUFFTTtBQUNOO0lBOEJJLHVCQUFZLE9BQXNCO1FBRTlCLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixVQUFVO1FBQ1Ysc0JBQXNCO1FBQ3RCLG9CQUFvQjtRQUNwQiwyQkFBMkI7UUFDM0IsbUJBQW1CO1FBQ25CLHVCQUF1QjtRQUN2QixlQUFlO1FBQ2Ysd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxDQUFDLDJCQUEyQjtRQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osaUJBQWlCLEVBQUUsS0FBSztTQUMzQixDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUUvQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDeEMsSUFBRyxPQUFPLENBQUMsTUFBTSxFQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBRWhDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFFdEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxjQUFXLENBQUMsQ0FBQztRQUNwRSxJQUFJLFFBQVEsRUFBRTtZQUNWLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUM5QixRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxjQUFXLENBQUMsR0FBRyxRQUFRLENBQUM7YUFDbkU7U0FDSjtJQUNMLENBQUM7SUFDRDs7OztPQUlHO0lBQ0csZ0NBQVEsR0FBZCxVQUFlLE1BQW9COzs7Ozs7d0JBRS9CLEtBQUssQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUV4RCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7NEJBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO3lCQUMzQjt3QkFFRCxxQkFBTSxXQUFJLENBQUMsSUFBSSwwQ0FBRSxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQzs7d0JBQTFELFNBQTBELENBQUM7d0JBRzNELHFCQUFNLElBQUksQ0FBQyxtQkFBbUIsRUFBRTs7d0JBQWhDLFNBQWdDLENBQUM7d0JBQ2pDLHFCQUFNLElBQUksQ0FBQyxlQUFlLEVBQUU7O3dCQUE1QixTQUE0Qjs7Ozs7S0FFL0I7SUFFRDs7Ozs7T0FLRztJQUNHLDJDQUFtQixHQUF6Qjs7Ozs7Ozs2QkFFUSxLQUFJLENBQUMsTUFBTSxDQUFDLHdCQUF3QixLQUFLLElBQUksR0FBN0Msd0JBQTZDO3dCQUM3QywyREFBMkQ7d0JBQzNELHFCQUFNLDRCQUE0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O3dCQUQ3QywyREFBMkQ7d0JBQzNELFNBQTZDLENBQUM7Ozs2QkFJOUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEtBQUssSUFBSSxHQUFqQyx3QkFBaUM7d0JBQ2pDLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDOzt3QkFBNUMsU0FBNEMsQ0FBQzt3QkFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQUMsR0FBRzs0QkFDeEIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUM5QixJQUFNLEtBQUssR0FBRyxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDOzRCQUN2RCxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0NBQ3RCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs2QkFDZjtpQ0FBTTtnQ0FDSCxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7NkJBQ2xCO3dCQUNMLENBQUMsQ0FBQyxDQUFDOzs7NkJBR0gsS0FBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEtBQUssSUFBSSxHQUFqQyx3QkFBaUM7d0JBRTNCLE9BQU8sR0FBRywyQkFBMkIsQ0FBQzt3QkFDNUMscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzt3QkFBN0IsU0FBNkIsQ0FBQzt3QkFDOUIsb0NBQW9DO3dCQUNwQyxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSw2QkFBNkIsRUFBRSxDQUFDOzt3QkFEbkUsb0NBQW9DO3dCQUNwQyxTQUFtRSxDQUFDOzs7NkJBR3BFLEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxHQUFyQyx3QkFBcUM7d0JBQ3JDLFNBQUksQ0FBQyxRQUFRO3dCQUFnQixxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7d0JBQW5FLEdBQWMsWUFBWSxHQUFHLFNBQXNDLENBQUM7d0JBQ3BFLEtBQUssQ0FBQywrQkFBK0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7NkJBR25FLEtBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxLQUFLLElBQUksR0FBbkMseUJBQW1DO3dCQUN0QixxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O3dCQUExQyxNQUFNLEdBQUcsU0FBaUM7d0JBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzt3QkFDOUIsS0FBSyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Ozt3QkFHeEQsZ0RBQWdEO3dCQUNoRCwyQ0FBMkM7d0JBQzNDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsS0FBSyxJQUFJLEVBQUU7NEJBQ25ELEtBQUssQ0FBQyxVQUFHLFVBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSwwQ0FBRSxFQUFFLGlCQUFPLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUFDOzRCQUV0RCw4RkFBOEY7NEJBQzlGLElBQUksV0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLDBDQUFFLEVBQUUsS0FBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLDBDQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0NBQzlFLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQW1CLElBQUksQ0FBQyxLQUFLLHNDQUFtQyxDQUFDLENBQUM7NkJBQ3JGO2lDQUFNO2dDQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUFzQixJQUFJLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQzs2QkFDeEQ7eUJBRUo7d0JBRU0scUJBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRTs2QkFBbkMsc0JBQU8sU0FBNEIsRUFBQzs7OztLQUN2QztJQUNEOzs7SUFHQTtJQUNNLHVDQUFlLEdBQXJCOzs7Ozs7S0FFQztJQUNEOzs7TUFHRTtJQUNJLHVDQUFlLEdBQXJCOzs7Ozs7S0FFQztJQUNEOztPQUVHO0lBQ0csdUNBQWUsR0FBckI7Ozs7OztLQUVDO0lBQ0Q7O09BRUc7SUFDRyx1Q0FBZSxHQUFyQjs7Ozs7O0tBRUM7SUFFSyxrQ0FBVSxHQUFoQixVQUFpQixRQUFzQjs7Ozs7O0tBRXRDO0lBRUQ7OztPQUdHO0lBQ0csd0NBQWdCLEdBQXRCLFVBQXVCLFdBQXVCOzs7Ozs7O3dCQUM5QyxLQUFLLENBQUMsV0FBVyxFQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFFNUQsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFOzRCQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7eUJBQ2hDO3dCQUVELHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7O3dCQUF6RCxTQUF5RCxDQUFDO3dCQUMxRCxxQkFBTSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7O3dCQUFoQyxTQUFnQzt3QkFDbEIscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDOzt3QkFBaEUsS0FBSyxHQUFHLFNBQXdEO3dCQUNoRSxlQUFlLEdBQUMsSUFBSSwyQkFBWSxFQUFFLENBQUM7d0JBQ3pDLEtBQUssQ0FBQyxLQUFLLENBQUM7d0JBQ1osa0JBQWtCO3dCQUNqQixLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsR0FBRyxDQUFDLFVBQU0sUUFBUTs7Ozs7d0NBQ25CLE9BQU8sR0FBWSxFQUFDLEtBQUssRUFBQyxRQUFRLENBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxRQUFRLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxRQUFRLENBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxRQUFRLENBQUMsTUFBTSxFQUFDO3dDQUMvRyxLQUFLLENBQUMsT0FBTyxDQUFDO3dDQUNkLHFCQUFNLGVBQWUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDOzt3Q0FBN0MsU0FBNkM7Ozs7NkJBQ2hELENBQUM7Ozs7O0tBRUw7SUFFRCxvQkFBQztBQUFELENBQUM7QUF0Tlksc0NBQWE7QUF1TjFCLDREQUE0RDtBQUM1RCxTQUFlLDRCQUE0QixDQUFDLElBQUk7Ozs7O2dCQUU1QywyQkFBMkI7Z0JBQzNCLHFCQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQzt3QkFDN0Isd0NBQXdDO3dCQUN4QyxJQUFNLFFBQVEsR0FBRSxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNqRCxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUM7d0JBQzFCLGtDQUFrQzt3QkFDbEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzlDLENBQUMsQ0FBQzs7b0JBUEYsMkJBQTJCO29CQUMzQixTQU1FLENBQUM7b0JBRUgsd0JBQXdCO29CQUN4QixxQkFBTSxJQUFJLENBQUMscUJBQXFCLENBQUM7NEJBQzdCLGdEQUFnRDs0QkFDaEQsc0JBQXNCOzRCQUN0QixJQUFJOzRCQUNKLDZEQUE2RDs0QkFDN0QsSUFBTSxPQUFPLEdBQUc7Z0NBQ1osR0FBRyxFQUFFO29DQUNELFdBQVcsRUFBRSxLQUFLO2lDQUNyQjtnQ0FDRCxRQUFRLEVBQUU7b0NBQ04scUJBQXFCLEVBQUUsRUFBRTtvQ0FDekIsa0JBQWtCLEVBQUUsRUFBRTtpQ0FDekI7Z0NBQ0QsT0FBTyxFQUFFO29DQUNMLFVBQVUsRUFBRTt3Q0FDUixHQUFHLEVBQUUsS0FBSzt3Q0FDVixHQUFHLEVBQUUsS0FBSzt3Q0FDVixPQUFPLEVBQUUsU0FBUzt3Q0FDbEIsSUFBSSxFQUFFLE1BQU07d0NBQ1osS0FBSyxFQUFFLE9BQU87d0NBQ2QsT0FBTyxFQUFFLFNBQVM7cUNBQ3JCO29DQUNELFlBQVksRUFBRTt3Q0FDVixHQUFHLEVBQUUsS0FBSzt3Q0FDVixNQUFNLEVBQUUsUUFBUTt3Q0FDaEIsTUFBTSxFQUFFLFFBQVE7cUNBQ25CO29DQUNELGdCQUFnQixFQUFFO3dDQUNkLEdBQUcsRUFBRSxLQUFLO3dDQUNWLE1BQU0sRUFBRSxRQUFRO3dDQUNoQixNQUFNLEVBQUUsUUFBUTtxQ0FDbkI7b0NBQ0Qsd0JBQXdCLEVBQUU7d0NBQ3RCLFNBQVMsRUFBRSxXQUFXO3dDQUN0QixTQUFTLEVBQUUsV0FBVzt3Q0FDdEIsZ0JBQWdCLEVBQUUsa0JBQWtCO3FDQUN2QztvQ0FDRCxpQkFBaUIsRUFBRTt3Q0FDZixPQUFPLEVBQUUsU0FBUzt3Q0FDbEIsTUFBTSxFQUFFLFFBQVE7d0NBQ2hCLGFBQWEsRUFBRSxlQUFlO3dDQUM5QixvQkFBb0IsRUFBRSxzQkFBc0I7cUNBQy9DO29DQUNELHVCQUF1QixFQUFFO3dDQUNyQixVQUFVLEVBQUUsWUFBWTt3Q0FDeEIsU0FBUyxFQUFFLFdBQVc7d0NBQ3RCLFFBQVEsRUFBRSxVQUFVO3FDQUN2QjtpQ0FDSjs2QkFDSixDQUFDOzRCQUNGLCtCQUErQjs0QkFDL0IscUNBQXFDOzRCQUNyQyxJQUFJOzRCQUNKLDJCQUEyQjt3QkFDL0IsQ0FBQyxDQUFDOztvQkF2REYsd0JBQXdCO29CQUN4QixTQXNERSxDQUFDO29CQUVILDZCQUE2QjtvQkFDN0IscUJBQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDOzRCQUM3QixJQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7NEJBQ3pELCtEQUErRDs0QkFDL0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssR0FBRyxvQkFBVTtnQ0FFdEUsaUJBQVUsQ0FBQyxJQUFJLEtBQUssZUFBZTtvQ0FDM0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO29DQUNyRCxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQzs0QkFGbkMsQ0FFbUMsQ0FBQzs0QkFFcEMseUdBQXlHOzRCQUN6RyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzs0QkFFeEMsU0FBUyxJQUFJO2dDQUNULE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7NEJBQzFDLENBQUM7NEJBRUQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOzRCQUUvQixJQUFNLDRCQUE0QixHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzRCQUNwRixJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzs0QkFFaEQsU0FBUyxnQkFBZ0I7Z0NBQ3JCLElBQUksSUFBSSxLQUFLLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtvQ0FDN0MsT0FBTyxvQ0FBb0MsQ0FBQztpQ0FDL0M7Z0NBQ0QsSUFBSSxJQUFJLEtBQUssZ0JBQWdCLEVBQUU7b0NBQzNCLE9BQU8sNEJBQTRCLENBQUM7aUNBQ3ZDO2dDQUNELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBQzNDLENBQUM7NEJBRUQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7d0JBQ25ELENBQUMsQ0FBQzs7b0JBakNGLDZCQUE2QjtvQkFDN0IsU0FnQ0UsQ0FBQztvQkFFSCxnQ0FBZ0M7b0JBQ2hDLHFCQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQzs0QkFDN0IsMkRBQTJEOzRCQUMzRCxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUU7Z0NBQ3hDLDZEQUE2RDtnQ0FDN0Qsa0RBQWtEO2dDQUNsRCxHQUFHLEVBQUUsY0FBTSxRQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBZixDQUFlOzZCQUM3QixDQUFDLENBQUM7d0JBQ1AsQ0FBQyxDQUFDOztvQkFSRixnQ0FBZ0M7b0JBQ2hDLFNBT0UsQ0FBQztvQkFFSCwyQkFBMkI7b0JBQzNCLHFCQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQzs0QkFDN0IsMkRBQTJEOzRCQUMzRCxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUU7Z0NBQzFDLEdBQUcsRUFBRSxjQUFNLFFBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFmLENBQWU7NkJBQzdCLENBQUMsQ0FBQzt3QkFDUCxDQUFDLENBQUM7O29CQU5GLDJCQUEyQjtvQkFDM0IsU0FLRSxDQUFDO29CQUVILHVCQUF1QjtvQkFDdkIscUJBQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDOzRCQUM3QixNQUFNLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxlQUFlLEVBQUU7Z0NBQ2hFLEdBQUcsRUFBRTtvQ0FDRCxPQUFPLE1BQU0sQ0FBQztnQ0FDbEIsQ0FBQzs2QkFDSixDQUFDLENBQUM7d0JBQ1AsQ0FBQyxDQUFDOztvQkFQRix1QkFBdUI7b0JBQ3ZCLFNBTUUsQ0FBQztvQkFFSCxvRUFBb0U7b0JBQ3BFLHFCQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQzs0QkFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUc7Z0NBQ25CLE9BQU8sSUFBSSxDQUFDOzRCQUNoQixDQUFDLENBQUM7d0JBQ04sQ0FBQyxDQUFDOztvQkFMRixvRUFBb0U7b0JBQ3BFLFNBSUUsQ0FBQzs7Ozs7Q0FDTjs7Ozs7Ozs7Ozs7O0FDbGFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUViLHNDQUFzQztBQUN0QyxzR0FBd0U7QUFDeEUsSUFBTSxFQUFFLEdBQUcsbUJBQU8sQ0FBQyxjQUFJLENBQUMsQ0FBQztBQUV6QjtJQUE2QixrQ0FBTztJQUVoQyx3QkFBWSxJQUFtQjtlQUMzQixrQkFBTSxJQUFJLENBQUM7SUFDZixDQUFDO0lBR0ssd0NBQWUsR0FBckI7Ozs7Ozt3QkFFUSxRQUFRLEdBQUcseUJBQXlCLENBQUM7d0JBRXpDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxDQUFDO3dCQUNoRCxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7O3dCQUFsQyxTQUFrQyxDQUFDO3dCQUNuQyxTQUFJO3dCQUFpQixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7O3dCQUFuRCxHQUFLLGFBQWEsR0FBRyxTQUE4QixDQUFDO3dCQUVwRCxhQUFhO3dCQUNiLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dDQUN6QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dDQUNoRCxJQUFHLElBQUksRUFBQztvQ0FDUixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7aUNBQzNCOzRCQUNELENBQUMsQ0FBQzs7d0JBTkYsYUFBYTt3QkFDYixTQUtFLENBQUM7d0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzt3QkFDaEMseUZBQXlGO3dCQUN6RiwrQkFBK0I7d0JBQy9CLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsQ0FBQzs7d0JBRjVELHlGQUF5Rjt3QkFDekYsK0JBQStCO3dCQUMvQixTQUE0RCxDQUFDO3dCQUc3QyxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTs7d0JBQW5DLE9BQU8sR0FBRyxTQUF5Qjt3QkFFekMscUJBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDOzt3QkFBekYsU0FBeUYsQ0FBQzs7Ozs7S0FHN0Y7SUFJTCxxQkFBQztBQUFELENBQUMsQ0FyQzRCLDhCQUFPLEdBcUNuQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDYixjQUFjLEVBQUUsY0FBYztDQUNqQyxDQUFDOzs7Ozs7Ozs7Ozs7QUMvQ1c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdiLElBQU0sRUFBRSxHQUFHLG1CQUFPLENBQUMsY0FBSSxDQUFDLENBQUM7QUFDekIsSUFBTSxFQUFFLEdBQUcsbUJBQU8sQ0FBQyxjQUFJLENBQUMsQ0FBQztBQUN6QixJQUFNLENBQUMsR0FBRyxtQkFBTyxDQUFDLHNCQUFRLENBQUMsQ0FBQztBQUN0QixTQUF1QyxtQkFBTyxDQUFDLHdCQUFTLENBQUMsRUFBdkQsWUFBWSxvQkFBRSxNQUFNLGNBQUUsVUFBVSxnQkFBdUIsQ0FBQztBQUN4RCxXQUFPLEdBQXdCLE1BQU0sUUFBOUIsRUFBRSxTQUFTLEdBQWEsTUFBTSxVQUFuQixFQUFFLE1BQU0sR0FBSyxNQUFNLE9BQVgsQ0FBWTtBQUM5QyxJQUFNLEtBQUssR0FBRyxtQkFBTyxDQUFDLG9CQUFPLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ25ELFdBQU8sR0FBSywyRUFBTCxDQUFrQztBQUNqRCxJQUFNLGdCQUFnQixHQUFHLG1CQUFPLENBQUMsNEJBQVcsQ0FBQyxDQUFDO0FBQ3RDLFlBQVEsR0FBSyx3RUFBTCxDQUFnQztBQUNoRCw2REFBNkQ7QUFDN0QsdUVBQXVFO0FBRXZFLElBQU0sU0FBUyxHQUFHLG1CQUFPLENBQUMsZ0NBQWEsQ0FBQyxDQUFDO0FBQ3pDLElBQU0sUUFBUSxHQUFHLG1CQUFPLENBQUMscUVBQTRCLENBQUMsQ0FBQztBQUN2RCxJQUFNLE9BQU8sR0FBRyxtQkFBTyxDQUFDLG1FQUEyQixDQUFDLENBQUM7QUFDckQsSUFBTSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyxxRUFBNEIsQ0FBQyxDQUFDO0FBQ3ZELDZDQUE2QztBQUM3QyxpREFBaUQ7QUFDakQsdURBQXVEO0FBQ3ZELHlEQUF5RDtBQUN6RCxJQUFNLHFCQUFxQixHQUFHLG1CQUFPLENBQUMseUVBQThCLENBQUMsQ0FBQztBQUN0RSxrQ0FBa0M7QUFDbEMsSUFBTSxvQkFBb0IsR0FBRyxDQUFDLENBQUM7QUFDL0IsZ0RBQWdEO0FBQ2hELG9FQUFvRTtBQUNwRSx3RUFBd0U7QUFFeEUsU0FBUyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUk7SUFDaEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQUMsR0FBRztRQUNoQyxJQUFJLEdBQUc7WUFBRSxNQUFNLEdBQUcsQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUEyQixLQUFLLENBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsdUJBQXVCLENBQUMsS0FBSztJQUNwQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUQsaUJBQWlCO0lBQ2pCLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQUMsRUFBRTtRQUNsQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBR0QsU0FBUyxVQUFVLENBQUMsYUFBb0IsRUFBRSxJQUFRO0lBQ2hELElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFO1FBQ3JDLE9BQU8sSUFBSTtZQUNULFFBQVEsRUFBRSxRQUFRLENBQUMsZUFBZTtZQUNsQyxPQUFPLEVBQUUsT0FBTyxDQUFDLGNBQWM7WUFDL0IsUUFBUSxFQUFFLFFBQVEsQ0FBQyxlQUFlO1NBQ25DLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEI7SUFDRCxrREFBa0Q7SUFDbEQsb0NBQW9DO0lBQ3BDLEtBQUs7U0FDQTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQ2IsNkRBQTZELENBQzlELENBQUM7S0FDSDtBQUNILENBQUM7QUFxQkQ7SUFZRSx1QkFBWSxNQUFNLEVBQUUsT0FBWTtRQUFaLHNDQUFZO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBRXZCLHlDQUF5QztRQUV6QyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQy9CLGlDQUFpQztZQUNqQyxxQ0FBcUM7WUFDckMscUNBQXFDO1lBQ3JDLGdDQUFnQztZQUNoQyxVQUFVLEVBQ1IsaUhBQWlIO1lBQ25ILHFFQUFxRTtZQUNyRSxpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLG9EQUFvRDtZQUNwRCxtQkFBbUIsRUFBRSxLQUFLO1lBQzFCLHNCQUFzQjtZQUN0QixjQUFjLEVBQUUsS0FBSztZQUNyQixtQkFBbUI7WUFDbkIsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixxRkFBcUY7WUFDckYsK0RBQStEO1lBQy9ELFdBQVcsRUFBRSxJQUFJO1lBRWpCLE1BQU0sRUFBRSxZQUFZLENBQUM7Z0JBQ25CLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxPQUFPLENBQ2IsU0FBUyxFQUFFLEVBQ1gsTUFBTSxDQUFDLFVBQUMsRUFBNkI7d0JBQTNCLEtBQUssYUFBRSxPQUFPLGVBQUUsU0FBUztvQkFDakMsT0FBTyxVQUFHLFNBQVMsZUFBSyxLQUFLLGVBQUssT0FBTyxDQUFFLENBQUM7Z0JBQzlDLENBQUMsQ0FBQyxDQUNIO2dCQUNELFVBQVUsRUFBRSxDQUFDLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3ZDLENBQUM7WUFDRixRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDMUIsZ0RBQWdEO1lBQ2hELGtCQUFrQjtZQUNsQixzQ0FBc0M7WUFDdEMseUZBQXlGO1lBQ3pGLFlBQVksRUFBRTtnQkFDWixvQkFBb0I7Z0JBQ3BCLHVCQUF1QjtnQkFDdkIsNEJBQTRCO2dCQUM1QixzQ0FBc0M7Z0JBQ3RDLGNBQWM7Z0JBQ2QsMEJBQTBCO2dCQUMxQix5QkFBeUI7Z0JBQ3pCLGlDQUFpQztnQkFDakMsZUFBZTtnQkFDZix3QkFBd0I7Z0JBQ3hCLG9CQUFvQjtnQkFDcEIsbUJBQW1CO2dCQUNuQix5QkFBeUI7YUFDMUI7WUFDRCxrQ0FBa0M7WUFDbEMsaUJBQWlCLEVBQUU7Z0JBQ2pCLHFCQUFxQjtnQkFDckIsc0JBQXNCO2dCQUN0Qix3QkFBd0I7Z0JBQ3hCLHNEQUFzRDthQUN2RDtZQUNELGlEQUFpRDtZQUNqRCxTQUFTLEVBQUUsQ0FBQztZQUNaLG1EQUFtRDtZQUNuRCxXQUFXLEVBQUUsRUFBRTtZQUNmLGlFQUFpRTtZQUNqRSxXQUFXLEVBQUUsS0FBSztZQUNsQixtREFBbUQ7WUFDbkQsOENBQThDO1lBQzlDLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsdUNBQXVDO1lBQ3ZDLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsMkRBQTJEO1lBQzNELGFBQWEsRUFBRSxLQUFLO1lBQ3BCLHVEQUF1RDtZQUN2RCxnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLG9FQUFvRTtZQUNwRSxzQ0FBc0M7WUFDdEMsWUFBWSxFQUFFLElBQUk7WUFDbEIsK0NBQStDO1lBQy9DLDJDQUEyQztZQUMzQyw4Q0FBOEM7WUFDOUMsZ0RBQWdEO1lBQ2hELFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsaUZBQWlGO1lBQ2pGLE9BQU8sRUFBRSxJQUFJO1lBQ2IsMkNBQTJDO1lBQzNDLDZCQUE2QjtZQUM3Qiw4QkFBOEI7WUFDOUIsVUFBVSxFQUFFLEVBQUU7WUFDZCw4QkFBOEI7WUFDOUIsb0RBQW9EO1lBQ3BELDBCQUEwQjtZQUMxQixnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLCtEQUErRDtZQUMvRCx3REFBd0Q7WUFDeEQsWUFBWSxFQUFFLEtBQUs7WUFDbkIsd0JBQXdCLEVBQUUsSUFBSTtZQUM5QixpQ0FBaUM7WUFDakMsd0JBQXdCLEVBQUU7Z0JBQ3hCLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7Z0JBQ3ZCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFdBQVcsRUFBRSxPQUFPLENBQUMsbUJBQW1CO2dCQUN4QyxjQUFjLEVBQUUsQ0FBQzthQUNsQjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFakMsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQ3RCLGlCQUFpQjtZQUNqQixNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFOUMsSUFDRSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQy9CO2dCQUNBLE1BQU0sbURBQW1ELENBQUM7YUFDM0Q7U0FDRjtRQUVELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDMUU7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQ2pELE1BQU0sSUFBSSxLQUFLLENBQ2IsMEZBQTBGLENBQzNGLENBQUM7U0FDSDtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sNkJBQTBCLENBQUMsQ0FBQztTQUMzRTtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFO1lBQ3hELE1BQU0sSUFBSSxLQUFLLENBQ2IsMkVBQTJFLENBQzVFLENBQUM7U0FDSDtRQUVELEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDRyw2QkFBSyxHQUFYOzs7Ozs7O3dCQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7NEJBQzNCLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dDQUMxQyxJQUFJO29DQUNJLGNBQWMsR0FBRyw0Q0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29DQUN4RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksY0FBYyxDQUFDO3dDQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07d0NBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztxQ0FDdEIsQ0FBQyxDQUFDO2lDQUNKO2dDQUFDLE9BQU8sU0FBUyxFQUFFO29DQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29DQUN6QixzQkFBTyxLQUFLLEVBQUM7aUNBQ2Q7NkJBQ0Y7aUNBQU07Z0NBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBUyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsdUJBQW1CLENBQUMsQ0FBQztnQ0FDbkUsc0JBQU8sS0FBSyxFQUFDOzZCQUNkO3lCQUNGO3dCQUVLLFlBQVksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7NkJBRW5ELEtBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQTlDLHdCQUE4Qzt3QkFDaEQsb0NBQW9DO3dCQUNwQyxTQUFJO3dCQUFXLHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO2dDQUNoRCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07NkJBQ3BCLENBQUM7O3dCQUhGLG9DQUFvQzt3QkFDcEMsR0FBSyxPQUFPLEdBQUcsU0FFYixDQUFDO3dCQUNILHFCQUFxQjt3QkFDckIsU0FBSTt3QkFBUSxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTs7d0JBRHhDLHFCQUFxQjt3QkFDckIsR0FBSyxJQUFJLEdBQUcsU0FBNEIsQ0FBQzs7O3dCQU1yQyxPQUFPLFVBQUM7d0JBQ1osZ0VBQWdFO3dCQUNoRSwyREFBMkQ7d0JBQzNELGtEQUFrRDt3QkFDbEQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzRCQUN6RCx1RUFBdUU7NEJBQ3ZFLDhDQUE4Qzs0QkFDOUMsa0NBQWtDOzRCQUNsQyxrQ0FBa0M7NEJBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDbkUsb0JBQW9CLENBQ3JCLENBQUM7NEJBQ0YsT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFFdkMsaUVBQWlFOzRCQUNqRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEtBQUssS0FBSyxFQUFFO2dDQUMxQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUN2Qjt5QkFDRjs2QkFBTTs0QkFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsY0FBYyxDQUFDOzRCQUN2RSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUMzQzt3QkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBUyxJQUFJLENBQUMsV0FBVyxlQUFZLENBQUMsQ0FBQzt3QkFHbEQsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFLOzRCQUM3QyxJQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQjtnQ0FDN0MsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFO2dDQUN6RCxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7NEJBQzNCLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyx1QkFBZ0IsU0FBUyxDQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUU5RCxJQUFJLEtBQUssRUFBRTtnQ0FDVCxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLHlCQUFrQixLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUM7NkJBQ2pEOzRCQUVELE9BQU87Z0NBQ0wsUUFBUSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTtnQ0FDOUIsaUJBQWlCLEVBQUUsSUFBSTtnQ0FDdkIsSUFBSTs2QkFDTCxDQUFDO3dCQUNKLENBQUMsQ0FBQyxDQUFDO3dCQUVILEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO3dCQUszQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7d0JBRTdDLDJFQUEyRTt3QkFDM0UsNkJBQTZCO3dCQUU3Qix1RUFBdUU7d0JBQ3ZFLDJEQUEyRDt3QkFFM0QsU0FBSTt3QkFBVyxxQkFBTSxPQUFPLENBQUMsTUFBTSxDQUFDO2dDQUNsQyxTQUFTO2dDQUNULE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE9BQU87Z0NBQ3JELE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE9BQU87Z0NBQ3JELFdBQVcsRUFBRSxxQkFBcUI7Z0NBQ2xDLGNBQWMsRUFBRSxJQUFJLENBQUMsV0FBVztnQ0FDaEMsZ0JBQWdCLEVBQUU7b0NBQ2hCLHVCQUF1QjtvQ0FDdkIsaUJBQWlCLEVBQUUsaUJBQWlCO2lDQUNyQzs2QkFDRixDQUFDOzt3QkFoQkYsMkVBQTJFO3dCQUMzRSw2QkFBNkI7d0JBRTdCLHVFQUF1RTt3QkFDdkUsMkRBQTJEO3dCQUUzRCxHQUFLLE9BQU8sR0FBRyxTQVViLENBQUM7Ozs7OztLQUVOO0lBRUQ7O09BRUc7SUFDRyw2QkFBSyxHQUFYLFVBQVksYUFBa0I7UUFBbEIsa0RBQWtCOzs7Ozs7d0JBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQzs2QkFPdEMsS0FBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBOUMsd0JBQThDO3dCQUNoRCxvQ0FBb0M7d0JBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFOzRCQUM5QyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07NEJBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzs0QkFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTOzRCQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7NEJBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO3lCQUN0QixDQUFDLENBQUM7d0JBRUgscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7d0JBQXRDLFNBQXNDLENBQUM7Ozt3QkFTbkMsTUFBTSxHQUFHLEVBQUUsQ0FBQzt3QkFDaEIsS0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3lCQUNqQjt3QkFDRCxLQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDcEQsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzVEO3dCQUVELEtBQUssQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBRXZCLFlBQVksR0FBRyxFQUFFLENBQUM7d0JBQ3RCLEtBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDaEMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNwQyxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFeEIsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQ0FDekMsTUFBTSxFQUFFLE1BQU07Z0NBQ2QsT0FBTyxFQUFFLEVBQUU7Z0NBQ1gsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTOzZCQUMxQixDQUFDLENBQUM7NEJBRUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUN6QyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO3lCQUMxRDt3QkFFRCxxQkFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQzs7d0JBQS9CLFNBQStCLENBQUM7Ozs7OztLQXVDbkM7SUFFRDs7T0FFRztJQUNHLGtDQUFVLEdBQWhCLFVBQWlCLGFBQWtCO1FBQWxCLGtEQUFrQjs7Ozs7O3dCQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7NkJBRXRDLEtBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQTlDLHdCQUE4Qzt3QkFDaEQsb0NBQW9DO3dCQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTs0QkFDOUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNOzRCQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87NEJBQ3JCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUzs0QkFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJOzRCQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzt5QkFDdEIsQ0FBQyxDQUFDO3dCQUVILHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7d0JBQTlDLFNBQThDLENBQUM7Ozt3QkFTM0MsTUFBTSxHQUFHLEVBQUUsQ0FBQzt3QkFDaEIsS0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3lCQUNqQjt3QkFDRCxLQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDcEQsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzVEO3dCQUVELEtBQUssQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBRXZCLFlBQVksR0FBRyxFQUFFLENBQUM7d0JBQ3RCLEtBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDaEMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNwQyxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFeEIsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQ0FDekMsTUFBTSxFQUFFLE1BQU07Z0NBQ2QsT0FBTyxFQUFFLEVBQUU7Z0NBQ1gsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTOzZCQUMxQixDQUFDLENBQUM7NEJBRUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2pELFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7eUJBQzFEO3dCQUVELHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDOzt3QkFBL0IsU0FBK0IsQ0FBQzs7Ozs7O0tBdUNuQztJQUVEOztPQUVHO0lBQ0csNEJBQUksR0FBVjs7Ozs7NkJBQ00sS0FBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBOUMsd0JBQThDO3dCQUNoRCxxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRTs7d0JBQXBDLFNBQW9DLENBQUM7OzRCQUVyQyxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTs7d0JBQXpCLFNBQXlCLENBQUM7d0JBQzFCLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFOzt3QkFBMUIsU0FBMEIsQ0FBQzs7Ozs7O0tBRTlCO0lBQ0gsb0JBQUM7QUFBRCxDQUFDO0FBcGRZLHNDQUFhO0FBc2QxQixNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2YsYUFBYSxFQUFFLGFBQWE7Q0FDN0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM2lCRixJQUFNLEtBQUssR0FBRyxtQkFBTyxDQUFDLG9CQUFPLENBQUMsQ0FBQztBQUMvQixJQUFNLEtBQUssR0FBRyxtQkFBTyxDQUFDLG9CQUFPLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQzVELElBQU0sUUFBUSxHQUFHLG1CQUFPLENBQUMsNEJBQVcsQ0FBQyxDQUFDO0FBK0J0QztJQUlFO1FBQ0UsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDNUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQzlDLENBQUM7SUFHRCw4QkFBTyxHQUFQO1FBQ0UsNEJBQTRCO1FBQzVCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ2YsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztTQUNyRDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7U0FDcEQ7UUFDRCxPQUFPLFFBQXNCLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7O1NBSUs7SUFDTCxpQ0FBVSxHQUFWO1FBQ0UsSUFBTSxNQUFNLEdBQUcsb0RBQXdCLEVBQUUsQ0FBQztRQUMxQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDaEIsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7SUFDRyxzQ0FBZSxHQUFyQixVQUFzQixVQUFVOzs7Ozs0QkFHZixxQkFBTSxLQUFLOzZCQUN2QixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRywrQkFBK0IsR0FBRyxVQUFVLEVBQUU7NEJBQ2xFLElBQUksRUFBRTtnQ0FDSixRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0NBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYzs2QkFDOUI7eUJBQ0YsQ0FBQzs2QkFDRCxJQUFJLENBQUMsVUFBVSxHQUFHOzRCQUNqQixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFO2dDQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7NkJBQ3ZDOzRCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQ0FDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOzZCQUN2Qzs0QkFDRCwwQkFBMEI7NEJBQzFCLGtDQUFrQzs0QkFDbEMsa0NBQWtDOzRCQUNsQyxtQ0FBbUM7NEJBQ25DLElBQU0sU0FBUyxHQUFHO2dDQUNoQixNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtnQ0FDNUIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7Z0NBQzlCLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO2dDQUM5QixLQUFLLEVBQUU7b0NBQ0wsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO29DQUM5QixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7b0NBQzlCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtpQ0FDL0I7NkJBQ0YsQ0FBQzs0QkFDRixPQUFPLFNBQVMsQ0FBQzt3QkFDbkIsQ0FBQyxDQUFDOzZCQUNELEtBQUssQ0FBQyxVQUFVLEtBQUs7NEJBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZCLENBQUMsQ0FBQzs7d0JBaENBLFFBQVEsR0FBRyxTQWdDWDt3QkFFSixzQkFBTyxRQUFRLEVBQUM7Ozs7S0FDakI7SUFFRDs7T0FFRztJQUNHLHNDQUFlLEdBQXJCOzs7Ozs0QkFDc0IscUJBQU0sS0FBSzs2QkFDNUIsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLEVBQUU7NEJBQ3ZDLElBQUksRUFBRTtnQ0FDSixRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0NBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYzs2QkFDOUI7eUJBQ0YsQ0FBQzs2QkFDRCxJQUFJLENBQUMsVUFBVSxHQUFHOzRCQUNqQixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFO2dDQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7NkJBQ3ZDOzRCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQ0FDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOzZCQUNuQzs0QkFDRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBeUIsQ0FBQzt3QkFFNUMsQ0FBQyxDQUFDOzZCQUNELEtBQUssQ0FBQyxVQUFVLEtBQUs7NEJBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs0QkFDdEMsd0JBQXdCO3dCQUMxQixDQUFDLENBQUM7O3dCQXBCRSxXQUFXLEdBQUcsU0FvQmhCO3dCQUNKLHNCQUFPLFdBQVcsRUFBQzs7OztLQUNwQjtJQUNEOztPQUVHO0lBQ0cscUNBQWMsR0FBcEIsVUFBcUIsSUFBYzs7Ozs7O3dCQUMzQixRQUFRLEdBQUcsbUJBQU8sQ0FBQyw0QkFBVyxDQUFDLENBQUM7d0JBQ3RDLEtBQUssQ0FBQyxJQUFJLENBQUM7d0JBQ1AsSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7d0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDakMsSUFBRyxJQUFJLENBQUMsT0FBTyxFQUFDOzRCQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQ3BDO3dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMvQixJQUFHLElBQUksQ0FBQyxhQUFhLEVBQUM7NEJBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzt5QkFDaEQ7d0JBQ1kscUJBQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixFQUFFLElBQUksRUFDdEU7Z0NBQ0UsSUFBSSxFQUFFO29DQUNKLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYztvQ0FDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjO2lDQUM5Qjs2QkFDRixDQUFDO2lDQUNDLElBQUksQ0FBQyxVQUFVLEdBQUc7Z0NBQ2pCLGNBQWM7Z0NBQ2QsbUJBQW1CO2dDQUNuQixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBYyxDQUFDOzRCQUNqQyxDQUFDLENBQUM7aUNBQ0QsS0FBSyxDQUFDLFVBQVUsS0FBSztnQ0FDcEIsc0JBQXNCO2dDQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDakMsQ0FBQyxDQUFDOzt3QkFmRSxNQUFNLEdBQUMsU0FlVDt3QkFDRixzQkFBTyxNQUFNLEVBQUM7Ozs7S0FDakI7SUFDSCxtQkFBQztBQUFELENBQUM7QUFuSlksb0NBQVk7QUFxSnpCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZixZQUFZLEVBQUUsWUFBWTtDQUUzQixDQUFDOzs7Ozs7Ozs7OztBQzFMRixRQUFRLFVBQVUsRUFBRSxtQkFBTyxDQUFDLG9IQUF1RDtBQUNuRixjQUFjLG1CQUFPLENBQUMsb0JBQU87QUFDN0IsUUFBUSxpQkFBaUIsRUFBRSxtQkFBTyxDQUFDLGdFQUE2Qjs7QUFFaEU7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3REQSxXQUFXLG1CQUFPLENBQUMsY0FBSTtBQUN2QixlQUFlLG1CQUFPLENBQUMsc0JBQVE7QUFDL0IsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGNBQWMsbUJBQU8sQ0FBQyxvQkFBTztBQUM3QixpQkFBaUIsbUJBQU8sQ0FBQyx3Q0FBaUI7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxZQUFZO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsVUFBVSxXQUFXO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxZQUFZO0FBQ3RCO0FBQ0E7QUFDQSx5QkFBeUIsSUFBSTtBQUM3QjtBQUNBLG9FQUFvRSxPQUFPLFFBQVEsS0FBSztBQUN4RixJQUFJO0FBQ0o7QUFDQSxrREFBa0QsSUFBSTtBQUN0RDtBQUNBLDJEQUEyRCxPQUFPLFFBQVEsS0FBSztBQUMvRSxLQUFLO0FBQ0wsMkVBQTJFLElBQUk7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7O0FBRUEsZ0RBQWdEO0FBQ2hELFVBQVUsTUFBTTs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix1QkFBdUI7QUFDN0MsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxhQUFhLElBQUk7QUFDdkU7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILFdBQVcsYUFBYSxZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxRQUFRLE1BQU07QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1COzs7Ozs7Ozs7OztBQ2xNbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDUkE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3J1bi50cyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvYmlsaWJpbGlfc2NyYXBlci50cyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvZmFjZWJvb2tfc2NyYXBlci50cyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvbWV0YWRhdGEudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL3NvY2lhbF9zY3JhcGVyLnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy95b3V0dWJlX3NjcmFwZXIudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9ub2RlX3NvY2lhbG1rLnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvcmVtb3Rlc291cmNlLnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvY29uY3VycmVuY3ktaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL2JpbGliaWxpL2Rvd25sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL2xpYi9mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjLyBzeW5jIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJhcmdwYXJzZVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJheGlvc1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJjaGVlcmlvXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImRlYnVnXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJmaWxlbmFtaWZ5XCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImZvcm0tZGF0YVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJmc1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicGF0aFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwcm9ncmVzcy1zdHJlYW1cIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInB1cHBldGVlci1jbHVzdGVyXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInB1cHBldGVlci1jbHVzdGVyL2Rpc3QvY29uY3VycmVuY3kvYnVpbHRJbkNvbmN1cnJlbmN5XCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInB1cHBldGVlci1jbHVzdGVyL2Rpc3QvdXRpbFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwdXBwZXRlZXItZXh0cmFcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwidXNlci1hZ2VudHNcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwid2luc3RvblwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImNyeXB0b1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwc1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm9zXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlYnVnIH0gZnJvbSBcImNvbnNvbGVcIjtcbmltcG9ydCB7U2NyYXBlTWFuYWdlcn0gZnJvbSBcIi4vc3JjL25vZGVfc29jaWFsbWtcIjtcbi8vIHZhciBTY3JhcGVyID0gcmVxdWlyZShcIi4vc3JjL21vZHVsZXMvc29jaWFsX3NjcmFwZXJcIik7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBMb2dpbihicm93c2VyX2NvbmZpZzpvYmplY3QsIHNjcmFwZV9jb25maWc6b2JqZWN0KSB7XG4gIC8vIHNjcmFwZSBjb25maWcgb3ZlcndyaXRlcyB0aGUgYnJvd3Nlcl9jb25maWdcbiAgT2JqZWN0LmFzc2lnbihicm93c2VyX2NvbmZpZywgc2NyYXBlX2NvbmZpZyk7XG5cbiAgdmFyIHNjcmFwZXIgPSBuZXcgU2NyYXBlTWFuYWdlcihicm93c2VyX2NvbmZpZyk7XG4gIC8vIHZhciByZW1vdGVDb25maWc9YXdhaXQgc2NyYXBlci5nZXRSZW1vdGVDb25maWcoKTtcbiAgYXdhaXQgc2NyYXBlci5zdGFydCgpO1xuXG4gIHZhciByZXN1bHRzID0gYXdhaXQgc2NyYXBlci5sb2dpbihzY3JhcGVfY29uZmlnKTtcblxuICBhd2FpdCBzY3JhcGVyLnF1aXQoKTtcblxuICByZXR1cm4gcmVzdWx0cztcbn1cbi8vZ2V0IGRhdGEgdXJsc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFNlYXJjaGRhdGEoYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpIHtcbiAgLy8gc2NyYXBlIGNvbmZpZyBvdmVyd3JpdGVzIHRoZSBicm93c2VyX2NvbmZpZ1xuICBPYmplY3QuYXNzaWduKGJyb3dzZXJfY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcbiAgLy8gZGVidWcoYnJvd3Nlcl9jb25maWcpXG4gIHZhciBzY3JhcGVyID0gbmV3IFNjcmFwZU1hbmFnZXIoYnJvd3Nlcl9jb25maWcpO1xuICAvLyB2YXIgcmVtb3RlQ29uZmlnPWF3YWl0IHNjcmFwZXIuZ2V0UmVtb3RlQ29uZmlnKCk7XG4gIGF3YWl0IHNjcmFwZXIuc3RhcnQoKTtcbiAgYXdhaXQgc2NyYXBlci5zZWFyY2hkYXRhKHNjcmFwZV9jb25maWcpO1xuXG4gIGF3YWl0IHNjcmFwZXIucXVpdCgpO1xufVxuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IHtcbi8vICAgc2VhcmNoZGF0YTogU2VhcmNoZGF0YSxcbi8vICAgbG9naW46IExvZ2luLFxuLy8gICAvLyB5dGJsb2dpbjp5dGJsb2dpbixcbi8vICAgU2NyYXBlTWFuYWdlcjogU2NyYXBlTWFuYWdlcixcbi8vICAgLy8gU2NyYXBlcjogU2NyYXBlcixcbi8vIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydCB7fTtcbi8vIGNvbnN0IHNlX3NjcmFwZXIgPSByZXF1aXJlKFwiLi9pbmRleFwiKTtcbmltcG9ydCB7TG9naW4sU2VhcmNoZGF0YX0gZnJvbSBcIi4vaW5kZXhcIjtcbmNvbnN0IHsgQXJndW1lbnRQYXJzZXIgfSA9IHJlcXVpcmUoXCJhcmdwYXJzZVwiKTtcbmltcG9ydCB7UmVtb3RlU291cmNlfSBmcm9tIFwiLi9zcmMvcmVtb3Rlc291cmNlXCI7XG5jb25zdCB7IHZlcnNpb24gfSA9IHJlcXVpcmUoXCIuL3BhY2thZ2UuanNvblwiKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHJlc29sdmUgPSByZXF1aXJlKCdwYXRoJykucmVzb2x2ZTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgncnVuanM6cnVuanMnKTtcbi8vIGNvbnN0IHsgZGF0YSB9ID0gcmVxdWlyZShcImNoZWVyaW8vbGliL2FwaS9hdHRyaWJ1dGVzLmpzXCIpO1xuXG5jb25zdCBwYXJzZXIgPSBuZXcgQXJndW1lbnRQYXJzZXIoe1xuICBkZXNjcmlwdGlvbjogXCJTb2NpYWwgbWFydGtldGluZ1wiLFxufSk7XG5cbnBhcnNlci5hZGRfYXJndW1lbnQoXCItdlwiLCBcIi0tdmVyc2lvblwiLCB7IGFjdGlvbjogXCJ2ZXJzaW9uXCIsIHZlcnNpb24gfSk7XG5wYXJzZXIuYWRkX2FyZ3VtZW50KFwiLWFcIiwgXCItLWFjdGlvblwiLCB7XG4gIGhlbHA6IFwiVGhhIGFjdGlvbiB5b3Ugd2FudCB0byB0aGUgcHJvZ3JhbSB0byB0YWtlXCIsXG59KTtcbnBhcnNlci5hZGRfYXJndW1lbnQoXCItY1wiLCBcIi0tY2FtcGFpZ25cIiwge1xuICBoZWxwOiBcIlRoYSBjYW1wYWlnbiBpZCB5b3Ugd2FudCB0byBwcm9ncmFtIHRvIHRha2VcIixcbn0pO1xuXG5sZXQgcGFyZWFyZyA9IHBhcnNlci5wYXJzZV9hcmdzKCk7XG5cbi8vIHRob3NlIG9wdGlvbnMgbmVlZCB0byBiZSBwcm92aWRlZCBvbiBzdGFydHVwXG4vLyBhbmQgY2Fubm90IGdpdmUgdG8gc2Utc2NyYXBlciBvbiBzY3JhcGUoKSBjYWxsc1xubGV0IGJyb3dzZXJfY29uZmlnID0ge1xuICAvLyB0aGUgdXNlciBhZ2VudCB0byBzY3JhcGUgd2l0aFxuICB1c2VyX2FnZW50OlxuICAgIFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwNy4wLjAuMCBTYWZhcmkvNTM3LjM2XCIsXG4gIC8vIGlmIHJhbmRvbV91c2VyX2FnZW50IGlzIHNldCB0byBUcnVlLCBhIHJhbmRvbSB1c2VyIGFnZW50IGlzIGNob3NlblxuICByYW5kb21fdXNlcl9hZ2VudDogZmFsc2UsXG4gIC8vIHdoZXRoZXIgdG8gc3RhcnQgdGhlIGJyb3dzZXIgaW4gaGVhZGxlc3MgbW9kZVxuICBoZWFkbGVzczogZmFsc2UsXG4gIC8vIHdoZXRoZXIgZGVidWcgaW5mb3JtYXRpb24gc2hvdWxkIGJlIHByaW50ZWRcbiAgLy8gbGV2ZWwgMDogcHJpbnQgbm90aGluZ1xuICAvLyBsZXZlbCAxOiBwcmludCBtb3N0IGltcG9ydGFudCBpbmZvXG4gIC8vIC4uLlxuICAvLyBsZXZlbCA0OiBwcmludCBhbGwgc2hpdCBub2JvZHkgd2FudHMgdG8ga25vd1xuICBkZWJ1Z19sZXZlbDogMSxcbiAgLy8gc3BlY2lmeSBmbGFncyBwYXNzZWQgdG8gY2hyb21lIGhlcmVcbiAgY2hyb21lX2ZsYWdzOiBbXSxcbiAgLy8gcGF0aCB0byBqcyBtb2R1bGUgdGhhdCBleHRlbmRzIGZ1bmN0aW9uYWxpdHlcbiAgLy8gdGhpcyBtb2R1bGUgc2hvdWxkIGV4cG9ydCB0aGUgZnVuY3Rpb25zOlxuICAvLyBnZXRfYnJvd3NlciwgaGFuZGxlX21ldGFkYXRhLCBjbG9zZV9icm93c2VyXG4gIC8vIG11c3QgYmUgYW4gYWJzb2x1dGUgcGF0aCB0byB0aGUgbW9kdWxlXG4gIC8vY3VzdG9tX2Z1bmM6IHJlc29sdmUoJ2V4YW1wbGVzL3BsdWdnYWJsZS5qcycpLFxuICBjdXN0b21fZnVuYzogXCJcIixcbiAgLy8gdXNlIGEgcHJveHkgZm9yIGFsbCBjb25uZWN0aW9uc1xuICAvLyBleGFtcGxlOiAnc29ja3M1Oi8vNzguOTQuMTcyLjQyOjEwODAnXG4gIC8vIGV4YW1wbGU6ICdodHRwOi8vMTE4LjE3NC4yMzMuMTA6NDg0MDAnXG4gIHByb3h5OiBcIlwiLFxuICAvLyBhIGZpbGUgd2l0aCBvbmUgcHJveHkgcGVyIGxpbmUuIEV4YW1wbGU6XG4gIC8vIHNvY2tzNTovLzc4Ljk0LjE3Mi40MjoxMDgwXG4gIC8vIGh0dHA6Ly8xMTguMTc0LjIzMy4xMDo0ODQwMFxuICBwcm94eV9maWxlOiBcIlwiLFxuICB1c2VfY2x1c3RlcjpmYWxzZSxcbiAgcHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnOiB7XG4gICAgdGltZW91dDogMTAgKiA2MCAqIDEwMDAsIC8vIG1heCB0aW1lb3V0IHNldCB0byAxMCBtaW51dGVzXG4gICAgbW9uaXRvcjogZmFsc2UsXG4gICAgY29uY3VycmVuY3k6IDEsIC8vIG9uZSBzY3JhcGVyIHBlciB0YWJcbiAgICBtYXhDb25jdXJyZW5jeTogMSwgLy8gc2NyYXBlIHdpdGggMSB0YWJcbiAgfSxcbn07XG5cbmxldCBzY3JhcGVfY29uZmlnID0ge1xuICAvLyB3aGljaCBzZWFyY2ggZW5naW5lIHRvIHNjcmFwZVxuICAvLyBwbGF0Zm9ybTogXCJmYWNlYm9va1wiLFxuICAvLyBhbiBhcnJheSBvZiBrZXl3b3JkcyB0byBzY3JhcGVcbiAga2V5d29yZHM6IFtcImNsb3VkIHNlcnZpY2UgdGVzdFwiXSxcbiAgLy8gdGhlIG51bWJlciBvZiBwYWdlcyB0byBzY3JhcGUgZm9yIGVhY2gga2V5d29yZFxuICBudW1fcGFnZXM6IDEsXG5cbiAgLy8gT1BUSU9OQUwgUEFSQU1TIEJFTE9XOlxuICAvLyBnb29nbGVfc2V0dGluZ3M6IHtcbiAgLy8gICAgIGdsOiAndXMnLCAvLyBUaGUgZ2wgcGFyYW1ldGVyIGRldGVybWluZXMgdGhlIEdvb2dsZSBjb3VudHJ5IHRvIHVzZSBmb3IgdGhlIHF1ZXJ5LlxuICAvLyAgICAgaGw6ICdmcicsIC8vIFRoZSBobCBwYXJhbWV0ZXIgZGV0ZXJtaW5lcyB0aGUgR29vZ2xlIFVJIGxhbmd1YWdlIHRvIHJldHVybiByZXN1bHRzLlxuICAvLyAgICAgc3RhcnQ6IDAsIC8vIERldGVybWluZXMgdGhlIHJlc3VsdHMgb2Zmc2V0IHRvIHVzZSwgZGVmYXVsdHMgdG8gMC5cbiAgLy8gICAgIG51bTogMTAwLCAvLyBEZXRlcm1pbmVzIHRoZSBudW1iZXIgb2YgcmVzdWx0cyB0byBzaG93LCBkZWZhdWx0cyB0byAxMC4gTWF4aW11bSBpcyAxMDAuXG4gIC8vIH0sXG4gIC8vIGluc3RlYWQgb2Yga2V5d29yZHMgeW91IGNhbiBzcGVjaWZ5IGEga2V5d29yZF9maWxlLiB0aGlzIG92ZXJ3cml0ZXMgdGhlIGtleXdvcmRzIGFycmF5XG4gIGtleXdvcmRfZmlsZTogXCJcIixcbiAgLy8gaG93IGxvbmcgdG8gc2xlZXAgYmV0d2VlbiByZXF1ZXN0cy4gYSByYW5kb20gc2xlZXAgaW50ZXJ2YWwgd2l0aGluIHRoZSByYW5nZSBbYSxiXVxuICAvLyBpcyBkcmF3biBiZWZvcmUgZXZlcnkgcmVxdWVzdC4gZW1wdHkgc3RyaW5nIGZvciBubyBzbGVlcGluZy5cbiAgc2xlZXBfcmFuZ2U6IFwiXCIsXG4gIC8vIHBhdGggdG8gb3V0cHV0IGZpbGUsIGRhdGEgd2lsbCBiZSBzdG9yZWQgaW4gSlNPTlxuICBvdXRwdXRfZmlsZTogXCIvdG1wL3Rlc3QvdGVzdC5qc29uXCIsXG4gIC8vIHdoZXRoZXIgdG8gcHJldmVudCBpbWFnZXMsIGNzcywgZm9udHMgZnJvbSBiZWluZyBsb2FkZWRcbiAgLy8gd2lsbCBzcGVlZCB1cCBzY3JhcGluZyBhIGdyZWF0IGRlYWxcbiAgYmxvY2tfYXNzZXRzOiBmYWxzZSxcbiAgLy8gY2hlY2sgaWYgaGVhZGxlc3MgY2hyb21lIGVzY2FwZXMgY29tbW9uIGRldGVjdGlvbiB0ZWNobmlxdWVzXG4gIC8vIHRoaXMgaXMgYSBxdWljayB0ZXN0IGFuZCBzaG91bGQgYmUgdXNlZCBmb3IgZGVidWdnaW5nXG4gIHRlc3RfZXZhc2lvbjogZmFsc2UsXG4gIGFwcGx5X2V2YXNpb25fdGVjaG5pcXVlczogdHJ1ZSxcbiAgLy8gbG9nIGlwIGFkZHJlc3MgZGF0YVxuICBsb2dfaXBfYWRkcmVzczogZmFsc2UsXG4gIC8vIGxvZyBodHRwIGhlYWRlcnNcbiAgbG9nX2h0dHBfaGVhZGVyczogZmFsc2UsXG4gIHBsYXRmb3JtOiBcImZhY2Vib29rXCIsXG4gIHVzZXI6IFwiXCIsXG4gIHBhc3M6IFwiXCIsXG4gIHRtcHBhdGg6XCJcIixcbiAgdGFza2lkOjAsXG59O1xuXG5mdW5jdGlvbiBnZXQob2JqZWN0OkFycmF5PHN0cmluZz4sIGtleTpzdHJpbmcsIGRlZmF1bHRfdmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IG9iamVjdFtrZXldO1xuICByZXR1cm4gdHlwZW9mIHJlc3VsdCAhPT0gXCJ1bmRlZmluZWRcIiA/IHJlc3VsdCA6IGRlZmF1bHRfdmFsdWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bkNvbW1hbmQocGFyZWFyZykge1xuICBsZXQgYWN0aW9uID0gZ2V0KHBhcmVhcmcsIFwiYWN0aW9uXCIsIGZhbHNlKTtcbiAgaWYgKCFhY3Rpb24pIHtcbiAgICBjb25zb2xlLmxvZyhcIm5vIHBhcmFtZXRlciBhY3Rpb24gYmVlbiBwYXNzZWRcIik7XG4gIH1cbiBcbiAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICBjYXNlIFwibG9naW5cIjpcbiAgICAgIGxvZ2luKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwidGFza1wiOlxuICAgICAgZ2V0Y2FtcGFpZ24oKTtcbiAgICAgIGJyZWFrOyBcbiAgfVxufVxuLy9nZXQgY2FtcGFpZ25cbmFzeW5jIGZ1bmN0aW9uIGdldGNhbXBhaWduKCkge1xuICB2YXIgcmVtb3Rlc291cmNlID1uZXcgUmVtb3RlU291cmNlKCk7XG4gIGNvbnN0IGNhbXBhaWdubGlzdD1hd2FpdCByZW1vdGVzb3VyY2UuZ2V0Q2FtcGFpZ25saXN0KClcbiAgZGVidWcoY2FtcGFpZ25saXN0KVxuICBpZighY2FtcGFpZ25saXN0KXtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW1wYWlnbmxpc3QgaXMgdW5kZWZpbmVkXCIpO1xuICB9XG4gIGNvbnN0IGFyckxlbmd0aCA9IGNhbXBhaWdubGlzdD8ubGVuZ3RoID8/IDA7XG4gIGlmKGFyckxlbmd0aD09MCl7XG4gICAgY29uc29sZS5sb2coXCJub3QgY2FtcGFpZ24gbmVlZCB0byBydW5cIilcbiAgfVxuICBmb3IgKGNvbnN0IGNhbXBhaWduIG9mIGNhbXBhaWdubGlzdCkge1xuICAgIHN3aXRjaCAoY2FtcGFpZ24udHlwZSkge1xuICAgICAgY2FzZSBcImJpbGliaWxpc2NyYXBlXCI6XG4gICAgICAgIHNjcmFwZV9jb25maWcucGxhdGZvcm09XCJiaWxpYmlsaVwiXG4gICAgICAgIHNjcmFwZV9jb25maWcudGFza2lkPWNhbXBhaWduLmlkXG4gICAgICAgIHNjcmFwZV9jb25maWcua2V5d29yZHM9Y2FtcGFpZ24ua2V5d29yZHNcbiAgICAgICAgYXdhaXQgU2VhcmNoZGF0YShicm93c2VyX2NvbmZpZywgc2NyYXBlX2NvbmZpZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYmlsaWJpbGlkb3dubG9hZCc6XG4gICAgICAgIHNjcmFwZV9jb25maWcucGxhdGZvcm09XCJiaWxpYmlsaVwiXG5cbiAgICAgICAgYnJlYWs7ICBcbiAgICB9XG4gIH0gIFxufVxuLy9sb2dpbiB0byBmYWNlYm9va1xuYXN5bmMgZnVuY3Rpb24gbG9naW4oKSB7XG4gIGxldCBjYW1wYWlnbklkID0gZ2V0KHBhcmVhcmcsIFwiY2FtcGFpZ25cIiwgZmFsc2UpO1xuICB2YXIgcmVtb3Rlc291cmNlID1uZXcgUmVtb3RlU291cmNlKCk7XG4gIGxldCBzb3NldHRpbmcgPSBhd2FpdCByZW1vdGVzb3VyY2UuZ2V0UmVtb3RlQ29uZmlnKGNhbXBhaWduSWQpO1xuICBkZWJ1Zyhzb3NldHRpbmcpXG4gIGlmKHNvc2V0dGluZz09IG51bGwpe1xuICAgIHRocm93IG5ldyBFcnJvcihcInNvc2V0dGluZyBpcyB1bmRlZmluZWRcIik7XG4gIH1cbiAgc2NyYXBlX2NvbmZpZy5wbGF0Zm9ybSA9IHNvc2V0dGluZy5zb3R5cGU7XG4gIHNjcmFwZV9jb25maWcudXNlciA9IHNvc2V0dGluZy5zb2NpYWx1c2VyO1xuICBzY3JhcGVfY29uZmlnLnBhc3MgPSBzb3NldHRpbmcuc29jaWFscGFzcztcbiAgY29uc29sZS5sb2coc29zZXR0aW5nKTtcbiAgLy9jcmVhdGUgYSB0bXAgZm9sZGVyXG4gIGNvbnN0IHRtcHBhdGggPSByZXNvbHZlKFwiLi90bXAvXCIgKyBzY3JhcGVfY29uZmlnLnBsYXRmb3JtICsgXCIvXCIgKyBzb3NldHRpbmcuc29jaWFsdXNlcik7XG4gIGF3YWl0IGNyZWF0ZVBhdGgodG1wcGF0aCk7XG4gIHNjcmFwZV9jb25maWcudG1wcGF0aD10bXBwYXRoXG5cbiAgYXdhaXQgTG9naW4oYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQYXRoKHBhdGgpIHtcbiAgcGF0aC5zcGxpdChcIi9cIikucmVkdWNlKChkaXJlY3RvcmllcywgZGlyZWN0b3J5KSA9PiB7XG4gICAgZGlyZWN0b3JpZXMgKz0gYCR7ZGlyZWN0b3J5fS9gO1xuXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcmVjdG9yaWVzKSkge1xuICAgICAgZnMubWtkaXJTeW5jKGRpcmVjdG9yaWVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3JpZXM7XG4gIH0sIFwiXCIpO1xufVxuXG5ydW5Db21tYW5kKHBhcmVhcmcpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGNoZWVyaW8gPSByZXF1aXJlKFwiY2hlZXJpb1wiKTtcbmltcG9ydCB7IFNvY2lhbFNjcmFwZXIgYXMgU2NyYXBlciwgTGlua3VybCwgU2NyYXBlT3B0aW9ucywgU2VhcmNob2JqZWN0fSBmcm9tIFwiLi9zb2NpYWxfc2NyYXBlclwiO1xuY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCB7IERvd25sb2FkZXIgfSA9IHJlcXVpcmUoXCIuL2JpbGliaWxpL2Rvd25sb2FkZXIuanNcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCBzYW5pdGl6ZSA9IHJlcXVpcmUoXCJmaWxlbmFtaWZ5XCIpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKFwiZGVidWdcIikoXCJiaWxpYmlsaS1zY3JhcGVyOlNjcmFwZXJcIik7XG5jb25zdCB7IGF1dG9TY3JvbGwsIGRlbGF5IH0gPSByZXF1aXJlKFwiLi9saWIvZnVuY3Rpb24uanNcIik7XG5pbXBvcnQge0VsZW1lbnRIYW5kbGUsUGFnZX0gZnJvbSAncHVwcGV0ZWVyJztcblxuXG50eXBlIGNsaWNrYnRuc2Vyb2JqID0ge1xuICBwYWdlOiBQYWdlLFxuICBrZXl3b3JkOiBzdHJpbmdcbn1cbi8vIGltcG9ydCBmaWxlbmFtaWZ5IGZyb20gJ2ZpbGVuYW1pZnknO1xuLy8gY29uc3QgeyBsYXVuY2gsIGdldFN0cmVhbSB9ID0gcmVxdWlyZShcInB1cHBldGVlci1zdHJlYW1cIik7XG4vLyBjb25zdCBQdXBwZXRlZXJWaWRlb1JlY29yZGVyID0gcmVxdWlyZSgncHVwcGV0ZWVyLXZpZGVvLXJlY29yZGVyJyk7XG5leHBvcnQgY2xhc3MgQmlsaWJpbGlTY3JhcGVyIGV4dGVuZHMgU2NyYXBlciB7XG4gIHN0YXJ0VXJsOiBzdHJpbmc7XG4gIFxuICBjb25zdHJ1Y3RvcihhcmdzOiBTY3JhcGVPcHRpb25zKSB7XG4gICAgc3VwZXIoYXJncyk7XG4gICAgdGhpcy5zdGFydFVybCA9IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tXCI7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy50YXNraWQpXG4gICAgLy8gZGVidWcoc2VsZi50YXNraWQpXG4gIH1cbiAgYXN5bmMgbG9hZF9zdGFydF9wYWdlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGRlYnVnKFwibG9hZCBzdGFydCBwYWdlXCIpXG5cbiAgfVxuICAvL2xvZ2luIGludG8gYmlsaWJpbGlcbiAgYXN5bmMgbWFrZWxvZ2luYWN0aW9uKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIC8vIGxldCBzdGFydFVybCA9IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tXCI7XG5cbiAgICB0aGlzLmxvZ2dlci5pbmZvKFwiVXNpbmcgbG9naW5Vcmw6IFwiICsgdGhpcy5zdGFydFVybCk7XG4gICAgYXdhaXQgdGhpcy5wYWdlLnNldEJ5cGFzc0NTUCh0cnVlKTtcbiAgICB0aGlzLmxhc3RfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnBhZ2UuZ290byh0aGlzLnN0YXJ0VXJsKTtcblxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJsb2dpbiBzdWNjZXNzLCBjb29raWVzIGhhcyBiZWVuIHNhdmUgYXQgXCIgKyB0aGlzLmNvbmZpZy50bXBwYXRoXG4gICAgKTtcbiAgICAvL2NsaWNrIGxvZ2luIGJ0blxuICAgIGF3YWl0IHRoaXMucGFnZS5jbGljayhcIi5oZWFkZXItbG9naW4tZW50cnlcIik7XG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLmV2YWx1YXRlKF8gPT4ge1xuICAgIC8vIHZhciBpY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvXCIpO1xuICAgIC8vIGljb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIC8vIH0pO1xuICAgIC8vd2FpdCBsb2dpbiBib3ggc2hvd1xuICAgIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoXCIuYmlsaS1taW5pLWNvbnRlbnQtd3BcIiwge1xuICAgICAgdGltZW91dDogdGhpcy5TVEFOREFSRF9USU1FT1VULFxuICAgIH0pO1xuICAgIC8vY2xpY2sgbG9naW4gYnkgc21zXG4gICAgY29uc3QgW2J1dHRvbl0gPSBhd2FpdCB0aGlzLnBhZ2UuJHgoXCIvL2Rpdltjb250YWlucyguLCAnIOefreS/oeeZu+W9lSAnKV1cIik7XG4gICAgaWYgKGJ1dHRvbikge1xuICAgICAgYXdhaXQgKGJ1dHRvbiBhcyBFbGVtZW50SGFuZGxlPEVsZW1lbnQ+KS5jbGljaygpO1xuICAgIH1cbiAgICAvL2F3YWl0IGZvciB1c2VyIHRvIHRha2UgYWN0aW9uXG4gICAgYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcihcIi5oZWFkZXItZW50cnktbWluaVwiLCB7IHRpbWVvdXQ6IDAgfSk7XG4gICAgLy91c2VyIGhhcyBzdWNjZXNzIGxvZ2luXG4gICAgLy9zYXZlIGNvb2tpZXNcbiAgICBjb25zdCBjb29raWVzID0gYXdhaXQgdGhpcy5wYWdlLmNvb2tpZXMoKTtcblxuICAgIGF3YWl0IGZzLndyaXRlRmlsZShcbiAgICAgIHRoaXMuY29uZmlnLnRtcHBhdGggKyBcIi9jb29raWVzLmpzb25cIixcbiAgICAgIEpTT04uc3RyaW5naWZ5KGNvb2tpZXMsIG51bGwsIDIpLFxuICAgICAgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLnBhZ2UuY2xvc2UoKTtcbiAgICAvLyBhd2FpdCB0aGlzLmJyb3dzZXJzLmNsb3NlKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHZpZGVvIGxpc3QgcGFnZVxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5d29yZFxuICAgKiBAcmV0dXJucyBlbGVtZW50XG4gICAqL1xuICBhc3luYyBjbGlja1NlYXJjaGJ0bihzZWFyb2JqOiBjbGlja2J0bnNlcm9iaik6UHJvbWlzZTxFbGVtZW50SGFuZGxlPEVsZW1lbnQ+PiB7XG4gICAgaWYgKHNlYXJvYmoucGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gc2Vhcm9iai5wYWdlO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmluZm8oXCJVc2luZyBsb2dpblVybDogXCIgKyB0aGlzLnN0YXJ0VXJsKTtcbiAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0QnlwYXNzQ1NQKHRydWUpO1xuICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IGF3YWl0IHRoaXMucGFnZS5nb3RvKHRoaXMuc3RhcnRVcmwpO1xuICAgIGF3YWl0IHRoaXMucGFnZS50eXBlKFwiLm5hdi1zZWFyY2gtaW5wdXRcIiwgc2Vhcm9iai5rZXl3b3JkKTtcbiAgICAvLyBhd2FpdCB0aGlzLnBhZ2UuJGV2YWwoXCIubmF2LXNlYXJjaC1pbnB1dFwiLCBmdW5jdGlvbiAoa2V5d29yZCkge1xuICAgIC8vICAgdGhpcy52YWx1ZSA9IGtleXdvcmQ7XG4gICAgLy8gfSk7XG4gICAgLy8gYXdhaXQgcGFnZS4kZXZhbCgnLm5hdi1zZWFyY2gtaW5wdXQnLCBlbCA9PiBlbC52YWx1ZSA9IFwiXCIpO1xuICAgIGNvbnN0IHNlYXJjaGJ0biA9IGF3YWl0IHRoaXMucGFnZS4kKFwiLm5hdi1zZWFyY2gtYnRuXCIpO1xuICAgIGlmIChzZWFyY2hidG4pIHtcbiAgICAgIGF3YWl0IHNlYXJjaGJ0bi5jbGljaygpO1xuICAgIH1cbiAgICByZXR1cm4gc2VhcmNoYnRuO1xuICB9XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5d29yZFxuICAgKiBAcmV0dXJucyBhcnJheVxuICAgKi9cbiAgYXN5bmMgc2VhcmNoZGF0YShzZWFyb2JqOiBTZWFyY2hvYmplY3QpOiBQcm9taXNlPEFycmF5PG9iamVjdD4+IHtcbiAgICBpZiAoc2Vhcm9iai5wYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBzZWFyb2JqLnBhZ2U7XG4gICAgfVxuICAgIGxldCByZXN1bHQ6IEFycmF5PG9iamVjdD4gPSBbXVxuICAgIGlmIChBcnJheS5pc0FycmF5KHNlYXJvYmoua2V5d29yZCkpIHtcbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBzZWFyb2JqLmtleXdvcmQpIHtcbiAgICAgICAgbGV0IHN1YnNlYXJvYmc6IFNlYXJjaG9iamVjdCA9IHsgcGFnZTogdGhpcy5wYWdlLCBrZXl3b3JkOiBlbGVtZW50IH1cbiAgICAgICAgbGV0IGxpbmtyZXMgPSBhd2FpdCB0aGlzLmdldFZpZGVvdXJscyhzdWJzZWFyb2JnKTtcbiAgICAgICAgZGVidWcobGlua3JlcylcbiAgICAgICAgZm9yIChjb25zdCBsaW5rIG9mIGxpbmtyZXMpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChsaW5rKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWFyb2JqLmtleXdvcmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgc2Vyc2Vhcm9iZzogU2VhcmNob2JqZWN0ID0geyBwYWdlOiB0aGlzLnBhZ2UsIGtleXdvcmQ6IHNlYXJvYmoua2V5d29yZCB9XG4gICAgICBsZXQgbGlua3JlcyA9IGF3YWl0IHRoaXMuZ2V0VmlkZW91cmxzKHNlcnNlYXJvYmcpO1xuICAgICAgZm9yIChjb25zdCBsaW5rIG9mIGxpbmtyZXMpIHtcblxuICAgICAgICByZXN1bHQucHVzaChsaW5rcmVzKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gICAgLy8gcmV0dXJuIGF3YWl0IHRoaXMuZ2V0VmlkZW91cmxzKHsgcGFnZTogdGhpcy5wYWdlLCBrZXl3b3JkOiBrZXl3b3JkIH0pO1xuICB9XG4gIC8vZ2V0IHZpZGVvIHVybCByZXR1cm4gaW4gYXJyYXlcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0LHN0cmluZyxzdHJpbmd9XG4gICAqIEByZXR1cm5zIGFycmF5XG4gICAqL1xuICBhc3luYyBnZXRWaWRlb3VybHMoc2Vyb2JqOiBTZWFyY2hvYmplY3QpOiBQcm9taXNlPEFycmF5PExpbmt1cmw+PiB7XG4gICAgaWYgKHNlcm9iai5wYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBzZXJvYmoucGFnZTtcbiAgICB9XG4gICAgaWYgKHNlcm9iai5jb29raWVzUGF0aCkge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHNlcm9iai5jb29raWVzUGF0aCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBjb29raWVzIGZpbGUgYXQgJHtzZXJvYmouY29va2llc1BhdGh9YCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBjb29raWVzID0gSlNPTi5wYXJzZShhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShzZXJvYmouY29va2llc1BhdGgpKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGNvb2tpZXMpO1xuICAgICAgYXdhaXQgdGhpcy5wYWdlLnNldENvb2tpZSguLi5jb29raWVzKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNlcm9iai5rZXl3b3JkID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaGFuZGxlU2VhcmNoKHsgcGFnZTogdGhpcy5wYWdlLCBrZXl3b3JkOiBzZXJvYmoua2V5d29yZCB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbGlua3JlczogQXJyYXk8TGlua3VybD4gPSBbXTtcbiAgICAgIGZvciAoY29uc3Qga2V5ZWxlbWVudCBvZiBzZXJvYmoua2V5d29yZCkge1xuICAgICAgICBjb25zdCByZXM9YXdhaXQgdGhpcy5oYW5kbGVTZWFyY2goeyBwYWdlOiB0aGlzLnBhZ2UsIGtleXdvcmQ6IGtleWVsZW1lbnQgfSlcbiAgICAgICAgZm9yIChjb25zdCBsaW5rIG9mIHJlcykge1xuICAgICAgICAgIGxpbmtyZXMucHVzaChsaW5rKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlua3Jlc1xuICAgIH1cblxuICB9XG5cbiAgYXN5bmMgaGFuZGxlU2VhcmNoKGNzb2JqOiBjbGlja2J0bnNlcm9iaik6IFByb21pc2U8QXJyYXk8TGlua3VybD4+IHtcbiAgICBjb25zdCBzZWFyY2hidG4gPSBhd2FpdCB0aGlzLmNsaWNrU2VhcmNoYnRuKHtcbiAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgIGtleXdvcmQ6IGNzb2JqLmtleXdvcmQsXG4gICAgfSk7XG5cbiAgICBsZXQgYnJvd3NlciA9IHRoaXMucGFnZS5icm93c2VyKCk7XG4gICAgY29uc3QgbmV3UGFnZSA9IGF3YWl0IGJyb3dzZXIud2FpdEZvclRhcmdldCgodGFyZ2V0KSA9PlxuICAgICAgdGFyZ2V0LnVybCgpLmluY2x1ZGVzKFwic2VhcmNoLmJpbGliaWxpLmNvbVwiKVxuICAgICk7XG4gICAgY29uc3QgcGFnZXMgPSBhd2FpdCBicm93c2VyLnBhZ2VzKCk7XG4gICAgbGV0IHNlYXJjaFBhZ2U7XG4gICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgICBjb25zdCBwYWdldXJsID0gYXdhaXQgcGFnZS51cmwoKTsgLy8gbmV3IHBhZ2Ugbm93IGFwcGVhciFcbiAgICAgIC8vIGRlYnVnKGF3YWl0IHBhZ2UudGl0bGUoKSlcbiAgICAgIGlmIChwYWdldXJsLmluY2x1ZGVzKFwic2VhcmNoLmJpbGliaWxpLmNvbVwiKSkge1xuICAgICAgICBzZWFyY2hQYWdlID0gcGFnZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghc2VhcmNoUGFnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2VhcmNoIHBhZ2Ugbm90IGZvdW5kXCIpO1xuICAgIH1cblxuICAgIGF3YWl0IGF1dG9TY3JvbGwoc2VhcmNoUGFnZSk7XG5cbiAgICB0cnkge1xuICAgIGF3YWl0IHNlYXJjaFBhZ2Uud2FpdEZvclNlbGVjdG9yKFwiLnZ1aV9wYWdlbmF0aW9uXCIsIHsgdGltZW91dDogNTAwMCB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBwdXBwZXRlZXIuZXJyb3JzLlRpbWVvdXRFcnJvcikge1xuICAgICAgLy8gRG8gc29tZXRoaW5nIGlmIHRoaXMgaXMgYSB0aW1lb3V0IGluIGZpbmQgcGFnZVxuICAgICAgZGVidWcoXCJub3QgZmluZCAudnVpX3BhZ2VuYXRpb24gaXRlbSwgdGhlIHBhZ2UgbWF5IG5vdCBoYXZlIHJlc3VsdFwiKVxuICAgICAgLy9yZXR1cm4gZW1wdHkgcHJvbWlzZSBhcnJheVxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7IHJlc29sdmUobnVsbCk7IH0pO1xuICAgIH0gXG4gIH0gXG4gICAgbGV0IGxpbmtyZXM6IEFycmF5PExpbmt1cmw+ID0gW107XG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLiQkKFwiYnV0dG9uLnZ1aV9idXR0b25cIiwgZWxlbWVudHM9PntcbiAgICAvLyAgIGNvbnNvbGUubG9nKGVsZW1lbnRzKVxuICAgIC8vIH0pXG4gICAgY29uc3QgbGlua1BhZ2UgPSBhd2FpdCBzZWFyY2hQYWdlLiQkKFwiYnV0dG9uLnZ1aV9idXR0b25cIik7XG4gICAgZGVidWcobGlua1BhZ2UpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlua1BhZ2UubGVuZ3RoOyBpKyspIHtcblxuICAgICAgYXdhaXQgc2VhcmNoUGFnZS5ldmFsdWF0ZSgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgICB9LCBsaW5rUGFnZVtpXSk7XG4gICAgICBjb25zdCBsaW5rcyA9IGF3YWl0IHRoaXMuZ2V0VmlkZW9saXN0bGluayh7IHBhZ2U6IHNlYXJjaFBhZ2UgfSk7XG4gICAgICBkZWJ1ZyhsaW5rcyk7XG4gICAgICBsaW5rcy5tYXAoKGxpbmspID0+IHtcbiAgICAgICAgbGlua3Jlcy5wdXNoKGxpbmspO1xuICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gbGlua3JlcztcbiAgfVxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtwYWdlfSBwYWdlXG4gICAqIEByZXR1cm5zIGFycmF5XG4gICAqL1xuICBhc3luYyBnZXRWaWRlb2xpc3RsaW5rKHsgcGFnZSB9KTogUHJvbWlzZTxBcnJheTxMaW5rdXJsPj4ge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgICAvLyBjb25zdCBlbEhhbmRsZUFycmF5ID0gYXdhaXQgcGFnZS4kJChcbiAgICAvLyAgIFwiLmJpbGktdmlkZW8tY2FyZF9faW5mby0tcmlnaHQgYTpudGgtY2hpbGQoMSlcIlxuICAgIC8vICk7XG4gICAgXG4gICAgbGV0IGxpbmttYXA6IEFycmF5PExpbmt1cmw+ID0gW107XG4gICAgLy8gY29uc3QgdGhhdD10aGlzO1xuICAgIGRlYnVnKHRoaXMuY29uZmlnLnRhc2tpZClcbiAgICBsZXQgdGFza2lkcz0wO1xuICAgIGlmKHRoaXMuY29uZmlnLnRhc2tpZCl7XG4gICAgdGFza2lkcz10aGlzLmNvbmZpZy50YXNraWRcbiAgICB9XG4gICAgbGlua21hcCA9IGF3YWl0IHRoaXMucGFnZS4kJGV2YWwoXG4gICAgICBcIi5iaWxpLXZpZGVvLWNhcmRfX2luZm8tLXJpZ2h0ID5hOmZpcnN0LWNoaWxkXCIsXG4gICAgICAoYWxpbmtzLHRhc2tpZHMpID0+IHtcbiAgICAgICAgcmV0dXJuIGFsaW5rcy5tYXAoKGFsaW5rKSA9PiB7XG4gICAgICAgICAgbGV0IGxpbmtvYmc6IExpbmt1cmwgPSB7dGl0bGU6JycsbGluazonJyxsYW5nOid6aC1jbid9O1xuICAgICAgICAgIC8vIGlmKCF0aGF0LnRhc2tpZCl7XG4gICAgICAgICAgLy8gbGlua29iZy50YXNraWQ9dGhhdC50YXNraWQ7XG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIGlmKHRhc2tpZHMpe1xuICAgICAgICAgICAgbGlua29iZy50YXNraWQ9dGFza2lkc1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBoZXJmPWFsaW5rLmdldEF0dHJpYnV0ZShcImhyZWZcIilcbiAgICAgICAgICBpZihoZXJmKXtcbiAgICAgICAgICBsaW5rb2JnLmxpbmsgPSBoZXJmXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFsaW5rKTtcbiAgICAgICAgICBsZXQgaHRpdGxlID0gYWxpbmsucXVlcnlTZWxlY3RvcihcImgzXCIpO1xuICAgICAgICAgIGlmKGh0aXRsZSl7XG4gICAgICAgICAgICAgY29uc3QgaHRyZXM9IGh0aXRsZS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICAgICBpZihodHJlcyl7XG4gICAgICAgICAgICAgbGlua29iZy50aXRsZT1odHJlc1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGxpbmtvYmc7XG4gICAgICAgIH0pO1xuICAgICAgfSx0YXNraWRzXG4gICAgKTtcbiAgICAvLyBkZWJ1ZyhcInF1ZXJ5IGxpbmsgZmluaXNoXCIpO1xuICAgIC8vIGRlYnVnKGxpbmttYXApO1xuICAgIC8vIGRlYnVnKFwic2hvdyBsaW5rIGZpbmlzaFwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhsaW5rbWFwKVxuXG4gICAgYXdhaXQgbGlua21hcC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKCFlbGVtZW50LmxpbmsuaW5jbHVkZXMoXCIvdmlkZW8vXCIpKSB7XG4gICAgICAgIC8vIGRlYnVnKFwiZWxlbWVudCBoYXMgdmlkZW8gXCIrZWxlbWVudClcbiAgICAgICAgbGlua21hcC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGF3YWl0IGxpbmttYXAuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChlbGVtZW50LmxpbmsuaW5jbHVkZXMoXCIvYXBpL1wiKSkge1xuICAgICAgICBkZWJ1ZyhcImVsZW1lbnQgaGFzIGFwaSBcIiArIGVsZW1lbnQpO1xuICAgICAgICBsaW5rbWFwLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy9kZWJ1ZyhcImZpbHRlciBsaW5rIGZpbmlzaFwiKTtcbiAgICBkZWJ1ZyhsaW5rbWFwKTtcblxuICAgIHJldHVybiBsaW5rbWFwO1xuICB9XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGlua1xuICAgKiBAcGFyYW0ge3N0cmluZ30gdmlkZW9wYXRoXG4gICAqL1xuICBhc3luYyBkb3dubG9hZFNpZ2xlVmlkZW8oeyBsaW5rLCB2aWRlb3BhdGggfSkge1xuICAgIC8vIGlmIChwYWdlKSB7XG4gICAgLy8gICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIC8vIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKGxpbmspXG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLmdvdG8obGluayx7XG4gICAgLy8gICB3YWl0VW50aWw6ICdkb21jb250ZW50bG9hZGVkJyxcbiAgICAvLyB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyh2aWRlb3BhdGgpXG4gICAgLy8gY29uc3QgZmlsZSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKHZpZGVvcGF0aCArIFwiL3Rlc3Qud2VibVwiKTtcbiAgICAvLyBhd2FpdCBwYWdlLmV2YWx1YXRlKGFzeW5jICgpID0+IHtcbiAgICAvLyBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5icHgtcGxheWVyLXZpZGVvLXdyYXAgPiB2aWRlbzpudGgtY2hpbGQoMSknKTtcbiAgICAvLyBjb25zb2xlLmxvZyhlbCk7XG4gICAgLy8gY29uc3Qge3NyY30gPSBlbC5xdWVyeVNlbGVjdG9yKCdzb3VyY2UnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhzcmMpO1xuICAgIC8vIH0pO1xuICAgIC8vIGNvbnN0IGh0bWwgPSBhd2FpdCBwYWdlLiRldmFsKCcjYmlsaWJpbGktcGxheWVyJywgZWwgPT4gZWwub3V0ZXJIVE1MKTtcbiAgICAvLyBjb25zb2xlLmxvZyhodG1sKVxuICAgIC8vIGNvbnN0IHNyYyA9IGF3YWl0IHBhZ2UuJGV2YWwoXCIjYmlsaWJpbGktcGxheWVyIHZpZGVvXCIsZWwgPT4gZWwuZ2V0QXR0cmlidXRlKFwic3JjXCIpKVxuXG4gICAgY29uc3QgZG93bmxvYWRlciA9IG5ldyBEb3dubG9hZGVyKCk7XG4gICAgZG93bmxvYWRlci5nZXRWaWRlb1VybChsaW5rKTtcbiAgICBpZiAoIWRvd25sb2FkZXIudXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ2aWRlbyB1cmwgaW52YWxpZFwiKTtcbiAgICB9XG4gICAgYXdhaXQgZG93bmxvYWRlci5nZXRBaWQoKTtcblxuICAgIGxldCB2aWRlb3JlcyA9IGF3YWl0IGRvd25sb2FkZXIuZ2V0SW5mbygpO1xuICAgIGRlYnVnKFwiVklERU8gSU5GT1wiLCB2aWRlb3Jlcyk7XG4gICAgLy8gY29uc3QgZG93bmxvYWRQYXRoID0nL2hvbWUvcm9iZXJ0emVuZy9kb3dubG9hZHRlc3QnO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gdmlkZW9yZXMuZGF0YS50aXRsZTtcbiAgICBjb25zdCB7IGRhdGEsIGZhbGxiYWNrIH0gPSBhd2FpdCBkb3dubG9hZGVyLmdldERhdGEoKTtcblxuICAgIGNvbnN0IHRhcmdldCA9IGRhdGEuZHVybCB8fCBkYXRhLnJlc3VsdC5kdXJsO1xuICAgIGNvbnN0IHF1YWxpdHkgPSBkYXRhLnF1YWxpdHkgfHwgZGF0YS5yZXN1bHQucXVhbGl0eSxcbiAgICAgIHF1YWxpdHlBcnJheSA9IHtcbiAgICAgICAgMTEyOiBcIjEwODBQK1wiLFxuICAgICAgICA4MDogXCIxMDgwUFwiLFxuICAgICAgICA3NDogXCI3MjBQNjBcIixcbiAgICAgICAgNjQ6IFwiNzIwUFwiLFxuICAgICAgICA0ODogXCI3MjBQXCIsXG4gICAgICAgIDMyOiBcIjQ4MFBcIixcbiAgICAgICAgMTY6IFwiMzYwUFwiLFxuICAgICAgICAxNTogXCIzNjBQXCIsXG4gICAgICB9O1xuICAgIGNvbnN0IHZpZGVvUXVhbnRpdHkgPSBxdWFsaXR5QXJyYXlbcXVhbGl0eV0gfHwgXCJ1bmtub3duXCI7XG4gICAgY29uc29sZS5sb2coXCJ2aWRlb1F1YW50aXR5IGlzIFwiICsgdmlkZW9RdWFudGl0eSk7XG4gICAgaWYgKGZhbGxiYWNrKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJlcnJvciBoYXBwZW4gd2hlbiBnZXQgdmlkZW8gZGF0YVwiKTtcbiAgICB9XG4gICAgZGVidWcoXCJlY2hvIHRhcmdldFwiKTtcbiAgICBkZWJ1Zyh0YXJnZXQpO1xuICAgIHRhcmdldC5mb3JFYWNoKChlbGVtZW50LCBwYXJ0KSA9PiB7XG4gICAgICBjb25zdCBmaWxlID0gcGF0aC5qb2luKHZpZGVvcGF0aCwgYCR7c2FuaXRpemUoZmlsZW5hbWUpfS0ke3BhcnR9LmZsdmApO1xuICAgICAgZGVidWcoXCJwYXJ0IGlzICVvXCIsIHBhcnQpO1xuICAgICAgZGVidWcoXCJmaWxlIG5hbWUgJW9cIiwgZmlsZSk7XG4gICAgICBjb25zdCBzdGF0ZSA9IGRvd25sb2FkZXIuZG93bmxvYWRCeUluZGV4KFxuICAgICAgICBwYXJ0LFxuICAgICAgICBmaWxlLFxuICAgICAgICAocHJvZ3Jlc3MsIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBzcGVlZCwgZXRhLCBwZXJjZW50YWdlIH0gPSBwcm9ncmVzczsgLy/mmL7npLrov5vluqbmnaFcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInNwZWVkOiBcIiArIE1hdGgucm91bmQoc3BlZWQgLyAxZTMpICsgXCJLQi9zXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBldGE6JHtldGF9c2ApO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLyoqXG4gICAqIGdldCB2aWRlbyBkZXRhaWxcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxpbmtcbiAgICovXG4gIGFzeW5jIGdldFZpZGVvZGV0YWlsKHBhZ2UsIGxpbmspIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5wYWdlLmdvdG8obGluaywge1xuICAgICAgd2FpdFVudGlsOiBcImRvbWNvbnRlbnRsb2FkZWRcIixcbiAgICB9KTtcblxuICAgIC8vIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQmlsaWJpbGlTY3JhcGVyOiBCaWxpYmlsaVNjcmFwZXIsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaW1wb3J0IHtjaGVlcmlvfSBmcm9tICdjaGVlcmlvJztcbmltcG9ydCB7IFNvY2lhbFNjcmFwZXIgYXMgU2NyYXBlcixTY3JhcGVPcHRpb25zfSBmcm9tICcuL3NvY2lhbF9zY3JhcGVyJztcblxuZXhwb3J0IGNsYXNzIEZhY2Vib29rU2NyYXBlciBleHRlbmRzIFNjcmFwZXIge1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogU2NyYXBlT3B0aW9ucykge1xuICAgICAgICBzdXBlcihhcmdzKTtcbiAgICB9XG4gXG5cbiAgICBhc3luYyBsb2FkX2xvZ2luX3BhZ2UoKTpQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgbGV0IHN0YXJ0VXJsID0gJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbSc7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzKSB7XG4gICAgICAgIC8vICAgICBzdGFydFVybCA9IGBodHRwczovL3d3dy4ke3RoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzLmZhY2Vib29rX2RvbWFpbn1gO1xuICAgICAgICAvLyAgICAgaWYgKHRoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzLmZhY2Vib29rX2RvbWFpbikge1xuICAgICAgICAvLyAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LiR7dGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MuZmFjZWJvb2tfZG9tYWlufWA7XG4gICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbWA7XG4gICAgICAgIC8vICAgICB9XG5cbiAgICAgICAgLy8gICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncykge1xuICAgICAgICAvLyAgICAgICAgIGlmIChrZXkgIT09ICdmYWNlYm9va19kb21haW4nKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHN0YXJ0VXJsICs9IGAke2tleX09JHt0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5nc1trZXldfSZgXG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnVXNpbmcgbG9naW5Vcmw6ICcgKyBzdGFydFVybCk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8oc3RhcnRVcmwpO1xuXG4gICAgICAgIC8vYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcignaW5wdXRbbmFtZT1cInFcIl0nLCB7IHRpbWVvdXQ6IHRoaXMuU1RBTkRBUkRfVElNRU9VVCB9KTtcblxuICAgICAgICAvLyByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy91c2VyIGxvZ2luIGJ5IGhhbmRcbiAgICBhc3luYyB1c2VybG9naW5hY3Rpb24oKXtcblxuICAgIH1cblxufVxuXG5cbiIsImNvbnN0IGNoZWVyaW8gPSByZXF1aXJlKCdjaGVlcmlvJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldF9pcF9kYXRhOiBnZXRfaXBfZGF0YSxcbiAgICBnZXRfaHR0cF9oZWFkZXJzOiBnZXRfaHR0cF9oZWFkZXJzLFxufTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0X2lwX2RhdGEocGFnZSkge1xuICAgIGF3YWl0IHBhZ2UuZ290bygnaHR0cHM6Ly9pcGluZm8uaW8vanNvbicsIHtcbiAgICAgIHdhaXRMb2FkOiB0cnVlLFxuICAgICAgd2FpdE5ldHdvcmtJZGxlOiB0cnVlXG4gICAgfSk7XG4gICAgbGV0IGpzb24gPSBhd2FpdCBwYWdlLmNvbnRlbnQoe1xuICAgICAgICB0aW1lb3V0OiAyMDAwMFxuICAgIH0pO1xuICAgIGNvbnN0ICQgPSBjaGVlcmlvLmxvYWQoanNvbik7XG4gICAgbGV0IGlwaW5mb190ZXh0ID0gICQoJ3ByZScpLnRleHQoKTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShpcGluZm9fdGV4dCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldF9odHRwX2hlYWRlcnMocGFnZSkge1xuICAgIGF3YWl0IHBhZ2UuZ290bygnaHR0cHM6Ly9odHRwYmluLm9yZy9nZXQnLCB7XG4gICAgICB3YWl0TG9hZDogdHJ1ZSxcbiAgICAgIHdhaXROZXR3b3JrSWRsZTogdHJ1ZVxuICAgIH0pO1xuICAgIGxldCBoZWFkZXJzID0gYXdhaXQgcGFnZS5jb250ZW50KCk7XG5cbiAgICBjb25zdCAkID0gY2hlZXJpby5sb2FkKGhlYWRlcnMpO1xuICAgIGxldCBoZWFkZXJzX3RleHQgPSAgJCgncHJlJykudGV4dCgpO1xuICAgIHJldHVybiBKU09OLnBhcnNlKGhlYWRlcnNfdGV4dCk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBtZXRhID0gcmVxdWlyZSgnLi9tZXRhZGF0YS50cycpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzZS1zY3JhcGVyOlNjcmFwZXInKTtcbmltcG9ydCB7UmVtb3RlU291cmNlLExpbmtkYXRhfSAgZnJvbSBcIi4uL3JlbW90ZXNvdXJjZVwiXG5pbXBvcnQge1BhZ2V9IGZyb20gJ3B1cHBldGVlcic7XG5cbi8vIGV4cG9ydCBpbnRlcmZhY2UgU2NyYXBlT3B0aW9uc1BhZ2VzIHtcbi8vICAgICBzZXRWaWV3cG9ydDogRnVuY3Rpb24sXG4vLyAgICAgc2V0UmVxdWVzdEludGVyY2VwdGlvbjogRnVuY3Rpb24sXG4vLyAgICAgb246IEZ1bmN0aW9uLFxuLy8gICAgIGdvdG86IEZ1bmN0aW9uLFxuLy8gICAgIHNjcmVlbnNob3Q6IEZ1bmN0aW9uLFxuLy8gICAgIHNldEJ5cGFzc0NTUDogRnVuY3Rpb24sXG4vLyAgICAgY2xpY2s6IEZ1bmN0aW9uLFxuLy8gICAgIHdhaXRGb3JTZWxlY3RvcjogRnVuY3Rpb24sXG4vLyAgICAgJHg6IEZ1bmN0aW9uLFxuLy8gICAgIGNvb2tpZXM6IEZ1bmN0aW9uLFxuLy8gfVxuLy8gZXhwb3J0IGNsYXNzIFNjcmFwZU9wdGlvbnNQYWdlIGV4dGVuZHMgUGFnZXtcblxuLy8gfVxuLy8gZXhwb3J0IGNsYXNzIEVsZW1lbnRoYW5kcyBleHRlbmRzIHB1cHBldGVlci5FbGVtZW50SGFuZGxle31cbmV4cG9ydCBpbnRlcmZhY2UgU2NyYXBlT3B0aW9ucyB7XG4gICAgY29uZmlnOiB7XG4gICAgICAgIGxvZ2dlcjogbG9nVHlwZSxcbiAgICAgICAgc2VhcmNoX2VuZ2luZT86IHN0cmluZywga2V5d29yZHM6IEFycmF5PHN0cmluZz4sIHByb3h5OiBzdHJpbmcsIGFwcGx5X2V2YXNpb25fdGVjaG5pcXVlczogYm9vbGVhbiwgYmxvY2tfYXNzZXRzOiBib29sZWFuLCB0ZXN0X2V2YXNpb246IGJvb2xlYW4sIGxvZ19odHRwX2hlYWRlcnM6IGJvb2xlYW4sIGxvZ19pcF9hZGRyZXNzOiBib29sZWFuXG4gICAgfSxcbiAgICBjb250ZXh0Pzogb2JqZWN0LFxuICAgIHBsdWdnYWJsZT86IG9iamVjdCxcbiAgICBwYWdlOiBQYWdlLFxuICAgIHRhc2tpZD86bnVtYmVyLFxufVxuXG5pbnRlcmZhY2UgcnVuUGFyYW1ldGVyIHtcbiAgICBwYWdlPzogUGFnZSxcbiAgICBkYXRhPzogb2JqZWN0LFxuICAgIHdvcmtlcj86IG9iamVjdFxufVxuaW50ZXJmYWNlIGxvZ1R5cGUge1xuICAgIGluZm86IEZ1bmN0aW9uLFxuICAgIGVycm9yOiBGdW5jdGlvblxufVxuXG5pbnRlcmZhY2Ugd29zZWFyY2hPYmoge1xuICAgIHBhZ2U/OiBQYWdlLFxuICAgIHdvcmtlcjpvYmplY3Rcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMaW5rdXJse1xuICAgIHRpdGxlOnN0cmluZyxcbiAgICBsaW5rOnN0cmluZyxcbiAgICBsYW5nOnN0cmluZyxcbiAgICB0YXNraWQ/Om51bWJlclxufVxuZXhwb3J0IHR5cGUgU2VhcmNob2JqZWN0PXtcbiAgICBwYWdlPzpQYWdlLFxuICAgIGtleXdvcmQ6c3RyaW5nfEFycmF5PHN0cmluZz5cbiAgICBjb29raWVzUGF0aD86c3RyaW5nXG4gIH1cblxuXG5cbi8qKlxuICogdGhpcyBpcyBwYXJlbnQgY2xhc3MgZm9yIHNvY2lhbCBzY3JhcHllciBub2RlXG4gKiAgKi9cbmV4cG9ydCBjbGFzcyBTb2NpYWxTY3JhcGVyIHtcbiAgICBjb25maWc6IHtcbiAgICAgICAgbG9nZ2VyOiBsb2dUeXBlLFxuICAgICAgICBzZWFyY2hfZW5naW5lPzogc3RyaW5nLCBcbiAgICAgICAga2V5d29yZHM6IEFycmF5PHN0cmluZz4sIFxuICAgICAgICBwcm94eTogc3RyaW5nLCBcbiAgICAgICAgYXBwbHlfZXZhc2lvbl90ZWNobmlxdWVzOiBib29sZWFuLCBcbiAgICAgICAgYmxvY2tfYXNzZXRzOiBib29sZWFuLCBcbiAgICAgICAgdGVzdF9ldmFzaW9uOiBib29sZWFuLCBcbiAgICAgICAgbG9nX2h0dHBfaGVhZGVyczogYm9vbGVhbiwgXG4gICAgICAgIGxvZ19pcF9hZGRyZXNzOiBib29sZWFuXG4gICAgICAgIHRtcHBhdGg/OiBzdHJpbmcsXG4gICAgICAgIHRhc2tpZD86bnVtYmVyXG4gICAgICAgIC8vIG9iajpwdXBwZXRlZXIuUGFnZVxuICAgIH07XG4gICAgcGFnZTogUGFnZTtcbiAgICBsYXN0X3Jlc3BvbnNlOiBvYmplY3QgfCBudWxsO1xuICAgIG1ldGFkYXRhOiB7IGh0dHBfaGVhZGVycz86IG9iamVjdCwgaXBpbmZvPzogeyBpcDogc3RyaW5nIH0sIHNjcmFwaW5nX2RldGVjdGVkPzogYm9vbGVhbiB9O1xuICAgIHBsdWdnYWJsZT86IG9iamVjdDtcbiAgICBjb250ZXh0Pzogb2JqZWN0O1xuICAgIGxvZ2dlcjogbG9nVHlwZTtcbiAgICBwcm94eTogc3RyaW5nO1xuICAgIGtleXdvcmRzOiBBcnJheTxzdHJpbmc+O1xuICAgIFNUQU5EQVJEX1RJTUVPVVQ6IG51bWJlcjtcbiAgICBTT0xWRV9DQVBUQ0hBX1RJTUU6IG51bWJlcjtcbiAgICByZXN1bHRzOiBvYmplY3Q7XG4gICAgcmVzdWx0X3Jhbms6IG51bWJlcjtcbiAgICBudW1fcmVxdWVzdHM6IG51bWJlcjtcbiAgICBudW1fa2V5d29yZHM6IG51bWJlcjtcbiAgICB0YXNraWQ/Om51bWJlcjtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBTY3JhcGVPcHRpb25zKSB7XG4gICAgICAgIFxuICAgICAgICBkZWJ1ZygnY29uc3RydWN0b3InKTtcbiAgICAgICAgZGVidWcob3B0aW9ucyk7XG4gICAgICAgIC8vIGNvbnN0IHtcbiAgICAgICAgLy8gICAgIC8vIGNvbmZpZyA9IHt9LFxuICAgICAgICAvLyAgICAgY29udGV4dCA9IHt9LFxuICAgICAgICAvLyAgICAgLy8gcGx1Z2dhYmxlID0gbnVsbCxcbiAgICAgICAgLy8gICAgIHBhZ2UgPSBudWxsLFxuICAgICAgICAvLyAgICAgLy8gYnJvd3NlcnM9bnVsbFxuICAgICAgICAvLyB9ID0gb3B0aW9ucztcbiAgICAgICAgLy8gdGhpcy5icm93c2VyPWJyb3dzZXI7XG4gICAgICAgIHRoaXMucGFnZSA9IG9wdGlvbnMucGFnZTtcbiAgICAgICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gbnVsbDsgLy8gdGhlIGxhc3QgcmVzcG9uc2Ugb2JqZWN0XG4gICAgICAgIHRoaXMubWV0YWRhdGEgPSB7XG4gICAgICAgICAgICBzY3JhcGluZ19kZXRlY3RlZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGx1Z2dhYmxlID0gb3B0aW9ucy5wbHVnZ2FibGU7XG4gICAgICAgIHRoaXMuY29uZmlnID0gb3B0aW9ucy5jb25maWc7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gdGhpcy5jb25maWcubG9nZ2VyO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBvcHRpb25zLmNvbnRleHQ7XG5cbiAgICAgICAgdGhpcy5wcm94eSA9IG9wdGlvbnMuY29uZmlnLnByb3h5O1xuICAgICAgICB0aGlzLmtleXdvcmRzID0gb3B0aW9ucy5jb25maWcua2V5d29yZHM7XG4gICAgICAgIGlmKG9wdGlvbnMudGFza2lkKXtcbiAgICAgICAgICAgIHRoaXMudGFza2lkPW9wdGlvbnMudGFza2lkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuU1RBTkRBUkRfVElNRU9VVCA9IDEwMDAwO1xuICAgICAgICB0aGlzLlNPTFZFX0NBUFRDSEFfVElNRSA9IDQ1MDAwO1xuXG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHt9O1xuICAgICAgICB0aGlzLnJlc3VsdF9yYW5rID0gMTtcbiAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUgcmVxdWVzdHMgZG9uZVxuICAgICAgICB0aGlzLm51bV9yZXF1ZXN0cyA9IDA7XG4gICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgdGhlIGtleXdvcmRzIHNlYXJjaGVkXG4gICAgICAgIHRoaXMubnVtX2tleXdvcmRzID0gMDtcblxuICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLmNvbmZpZ1tgJHt0aGlzLmNvbmZpZy5zZWFyY2hfZW5naW5lfV9zZXR0aW5nc2BdO1xuICAgICAgICBpZiAoc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSBKU09OLnBhcnNlKHNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ1tgJHt0aGlzLmNvbmZpZy5zZWFyY2hfZW5naW5lfV9zZXR0aW5nc2BdID0gc2V0dGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogbG9naW4gc29jaWFsIG1lZGlhIHBsYXRmb3JtXG4gICAgICogQHBhcmFtIHJ1bm9iaiBcbiAgICAgKiBcbiAgICAgKi9cbiAgICBhc3luYyBydW5Mb2dpbihydW5vYmo6IHJ1blBhcmFtZXRlcikge1xuXG4gICAgICAgIGRlYnVnKCd3b3JrZXI9JW8nLCBydW5vYmoud29ya2VyLCB0aGlzLmNvbmZpZy5rZXl3b3Jkcyk7XG5cbiAgICAgICAgaWYgKHJ1bm9iai5wYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBydW5vYmoucGFnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMucGFnZT8uc2V0Vmlld3BvcnQoeyB3aWR0aDogMTI4MCwgaGVpZ2h0OiA4MDAgfSk7XG5cblxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRfYnJvd3Nlcl9lbmdpbmUoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5tYWtlbG9naW5hY3Rpb24oKVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9uIHRoYXQgcnVucyBvbmx5IG9uY2UgaW4gdGhlIGJlZ2lubmluZyBvZiB0aGVcbiAgICAgKiBzY3JhcGluZyBwcm9jZWR1cmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gdHJ1ZSBpZiBldmVyeXRoaW5nIGlzIGNvcnJlY3QuXG4gICAgICovXG4gICAgYXN5bmMgbG9hZF9icm93c2VyX2VuZ2luZSgpOiBQcm9taXNlPHZvaWQ+IHtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuYXBwbHlfZXZhc2lvbl90ZWNobmlxdWVzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IGRldGVjdGlvbiBieSBldmFkaW5nIGNvbW1vbiBkZXRlY3Rpb24gdGVjaG5pcXVlc1xuICAgICAgICAgICAgYXdhaXQgZXZhZGVDaHJvbWVIZWFkbGVzc0RldGVjdGlvbih0aGlzLnBhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYmxvY2sgc29tZSBhc3NldHMgdG8gc3BlZWQgdXAgc2NyYXBpbmdcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmJsb2NrX2Fzc2V0cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNldFJlcXVlc3RJbnRlcmNlcHRpb24odHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLnBhZ2Uub24oJ3JlcXVlc3QnLCAocmVxKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSByZXEucmVzb3VyY2VUeXBlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2sgPSBbJ3N0eWxlc2hlZXQnLCAnZm9udCcsICdpbWFnZScsICdtZWRpYSddO1xuICAgICAgICAgICAgICAgIGlmIChibG9jay5pbmNsdWRlcyh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXEuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXEuY29udGludWUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy50ZXN0X2V2YXNpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIE5hdmlnYXRlIHRvIHRoZSBwYWdlIHRoYXQgd2lsbCBwZXJmb3JtIHRoZSB0ZXN0cy5cbiAgICAgICAgICAgIGNvbnN0IHRlc3RVcmwgPSAnaHR0cHM6Ly9ib3Quc2Fubnlzb2Z0LmNvbSc7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBhZ2UuZ290byh0ZXN0VXJsKTtcbiAgICAgICAgICAgIC8vIFNhdmUgYSBzY3JlZW5zaG90IG9mIHRoZSByZXN1bHRzLlxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNjcmVlbnNob3QoeyBwYXRoOiAnaGVhZGxlc3MtZXZhc2lvbi1yZXN1bHQucG5nJyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5sb2dfaHR0cF9oZWFkZXJzID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLm1ldGFkYXRhLmh0dHBfaGVhZGVycyA9IGF3YWl0IG1ldGEuZ2V0X2h0dHBfaGVhZGVycyh0aGlzLnBhZ2UpO1xuICAgICAgICAgICAgZGVidWcoJ3RoaXMubWV0YWRhdGEuaHR0cF9oZWFkZXJzPSVPJywgdGhpcy5tZXRhZGF0YS5odHRwX2hlYWRlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmxvZ19pcF9hZGRyZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsZXQgaXBpbmZvID0gYXdhaXQgbWV0YS5nZXRfaXBfZGF0YSh0aGlzLnBhZ2UpO1xuICAgICAgICAgICAgdGhpcy5tZXRhZGF0YS5pcGluZm8gPSBpcGluZm87XG4gICAgICAgICAgICBkZWJ1ZygndGhpcy5tZXRhZGF0YS5pcGluZm8nLCB0aGlzLm1ldGFkYXRhLmlwaW5mbyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayB0aGF0IG91ciBwcm94eSBpcyB3b3JraW5nIGJ5IGNvbmZpcm1pbmdcbiAgICAgICAgLy8gdGhhdCBpcGluZm8uaW8gc2VlcyB0aGUgcHJveHkgSVAgYWRkcmVzc1xuICAgICAgICBpZiAodGhpcy5wcm94eSAmJiB0aGlzLmNvbmZpZy5sb2dfaXBfYWRkcmVzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZGVidWcoYCR7dGhpcy5tZXRhZGF0YS5pcGluZm8/LmlwfSB2cyAke3RoaXMucHJveHl9YCk7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBpcCByZXR1cm5lZCBieSBpcGluZm8gaXMgbm90IGEgc3Vic3RyaW5nIG9mIG91ciBwcm94eXN0cmluZywgZ2V0IHRoZSBoZWNrIG91dHRhIGhlcmVcbiAgICAgICAgICAgIGlmICh0aGlzLm1ldGFkYXRhLmlwaW5mbz8uaXAgJiYgKCF0aGlzLnByb3h5LmluY2x1ZGVzKHRoaXMubWV0YWRhdGEuaXBpbmZvPy5pcCkpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm94eSBvdXRwdXQgaXAgJHt0aGlzLnByb3h5fSBkb2VzIG5vdCBtYXRjaCB3aXRoIHByb3ZpZGVkIG9uZWApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGBVc2luZyB2YWxpZCBQcm94eTogJHt0aGlzLnByb3h5fWApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5sb2FkX3N0YXJ0X3BhZ2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICpcbiAgKiBAcmV0dXJucyB0cnVlIGlmIHN0YXJ0cGFnZSB3YXMgbG9hZGVkIGNvcnJlY3RseS5cbiAgKi9cbiAgICBhc3luYyBsb2FkX2xvZ2luX3BhZ2UoKSB7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgKlxuICAgICogQHJldHVybnMgdHJ1ZSBpZiBzdGFydHBhZ2Ugd2FzIGxvYWRlZCBjb3JyZWN0bHkuXG4gICAgKi9cbiAgICBhc3luYyBsb2FkX3N0YXJ0X3BhZ2UoKSB7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogbWFrZSBsb2dpbiBhY3Rpb25cbiAgICAgKi9cbiAgICBhc3luYyBtYWtlbG9naW5hY3Rpb24oKTogUHJvbWlzZTxhbnl8Ym9vbGVhbj4ge1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIHVzZXIgbG9naW4gYnkgdGhlaXIgaGFuZFxuICAgICAqL1xuICAgIGFzeW5jIHVzZXJsb2dpbmFjdGlvbigpIHtcblxuICAgIH1cblxuICAgIGFzeW5jIHNlYXJjaGRhdGEoc2VhY2hvYmo6IFNlYXJjaG9iamVjdCk6UHJvbWlzZTxhbnl8QXJyYXk8TGlua3VybD4+e1xuXG4gICAgfSBcblxuICAgIC8qKlxuICAgICAqIHVzZSB3b3JrZXIgdG8gc2VhcmNoIGRhdGFcbiAgICAgKiBAcGFyYW0gb2JqZWN0IGtleXdvcmQgXG4gICAgICovXG4gICAgYXN5bmMgd29ya2Vyc2VhcmNoZGF0YSh3b3JrZXJzZWFjaDp3b3NlYXJjaE9iaikge1xuICAgIGRlYnVnKCd3b3JrZXI9JW8nLHdvcmtlcnNlYWNoLndvcmtlciwgdGhpcy5jb25maWcua2V5d29yZHMpO1xuXG4gICAgaWYgKHdvcmtlcnNlYWNoLnBhZ2UpIHtcbiAgICAgICAgdGhpcy5wYWdlID0gd29ya2Vyc2VhY2gucGFnZTtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0Vmlld3BvcnQoeyB3aWR0aDogMTI4MCwgaGVpZ2h0OiA4MDAgfSk7XG4gICAgYXdhaXQgdGhpcy5sb2FkX2Jyb3dzZXJfZW5naW5lKClcbiAgICBjb25zdCBsaW5rcyA9IGF3YWl0IHRoaXMuc2VhcmNoZGF0YSh7IGtleXdvcmQ6IHRoaXMuY29uZmlnLmtleXdvcmRzIH0pXG4gICAgY29uc3QgcmVtb3RlU291cm1vZGVsPW5ldyBSZW1vdGVTb3VyY2UoKTtcbiAgICBkZWJ1ZyhsaW5rcylcbiAgICAvL2hhbmRsZSB0aGUgbGlua3NcbiAgICAgbGlua3M/Lm1hcChhc3luYyBsaW5rSXRlbT0+e1xuICAgICAgIGxldCBsaW5rb2JqIDogTGlua2RhdGE9e3RpdGxlOmxpbmtJdGVtLnRpdGxlLHVybDpsaW5rSXRlbS5saW5rLGxhbmc6bGlua0l0ZW0ubGFuZyxzb2NpYWx0YXNrX2lkOmxpbmtJdGVtLnRhc2tpZH1cbiAgICAgICAgZGVidWcobGlua29iailcbiAgICAgICAgYXdhaXQgcmVtb3RlU291cm1vZGVsLnNhdmVMaW5rcmVtb3RlKGxpbmtvYmopXG4gICAgfSlcblxufVxuXG59XG4vLyBUaGlzIGlzIHdoZXJlIHdlJ2xsIHB1dCB0aGUgY29kZSB0byBnZXQgYXJvdW5kIHRoZSB0ZXN0cy5cbmFzeW5jIGZ1bmN0aW9uIGV2YWRlQ2hyb21lSGVhZGxlc3NEZXRlY3Rpb24ocGFnZSkge1xuXG4gICAgLy8gUGFzcyB0aGUgV2ViZHJpdmVyIFRlc3QuXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICAvLyBjb25zdCBuZXdQcm90byA9IG5hdmlnYXRvci5fX3Byb3RvX187XG4gICAgICAgIGNvbnN0IG5ld1Byb3RvID1PYmplY3QuZ2V0UHJvdG90eXBlT2YobmF2aWdhdG9yKTtcbiAgICAgICAgZGVsZXRlIG5ld1Byb3RvLndlYmRyaXZlcjtcbiAgICAgICAgLy8gbmF2aWdhdG9yLl9fcHJvdG9fXyA9IG5ld1Byb3RvO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YobmF2aWdhdG9yLG5ld1Byb3RvKTtcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdGhlIENocm9tZSBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgLy8gaW50ZXJmYWNlIG1vY2tPYmpUeXBlIGV4dGVuZHMgdHlwZW9mIGNocm9tZSB7XG4gICAgICAgIC8vICAgICBjaHJvbWU6IG9iamVjdCxcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBXZSBjYW4gbW9jayB0aGlzIGluIGFzIG11Y2ggZGVwdGggYXMgd2UgbmVlZCBmb3IgdGhlIHRlc3QuXG4gICAgICAgIGNvbnN0IG1vY2tPYmogPSB7XG4gICAgICAgICAgICBhcHA6IHtcbiAgICAgICAgICAgICAgICBpc0luc3RhbGxlZDogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2Vic3RvcmU6IHtcbiAgICAgICAgICAgICAgICBvbkluc3RhbGxTdGFnZUNoYW5nZWQ6IHt9LFxuICAgICAgICAgICAgICAgIG9uRG93bmxvYWRQcm9ncmVzczoge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcnVudGltZToge1xuICAgICAgICAgICAgICAgIFBsYXRmb3JtT3M6IHtcbiAgICAgICAgICAgICAgICAgICAgTUFDOiAnbWFjJyxcbiAgICAgICAgICAgICAgICAgICAgV0lOOiAnd2luJyxcbiAgICAgICAgICAgICAgICAgICAgQU5EUk9JRDogJ2FuZHJvaWQnLFxuICAgICAgICAgICAgICAgICAgICBDUk9TOiAnY3JvcycsXG4gICAgICAgICAgICAgICAgICAgIExJTlVYOiAnbGludXgnLFxuICAgICAgICAgICAgICAgICAgICBPUEVOQlNEOiAnb3BlbmJzZCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBQbGF0Zm9ybUFyY2g6IHtcbiAgICAgICAgICAgICAgICAgICAgQVJNOiAnYXJtJyxcbiAgICAgICAgICAgICAgICAgICAgWDg2XzMyOiAneDg2LTMyJyxcbiAgICAgICAgICAgICAgICAgICAgWDg2XzY0OiAneDg2LTY0JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFBsYXRmb3JtTmFjbEFyY2g6IHtcbiAgICAgICAgICAgICAgICAgICAgQVJNOiAnYXJtJyxcbiAgICAgICAgICAgICAgICAgICAgWDg2XzMyOiAneDg2LTMyJyxcbiAgICAgICAgICAgICAgICAgICAgWDg2XzY0OiAneDg2LTY0JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFJlcXVlc3RVcGRhdGVDaGVja1N0YXR1czoge1xuICAgICAgICAgICAgICAgICAgICBUSFJPVFRMRUQ6ICd0aHJvdHRsZWQnLFxuICAgICAgICAgICAgICAgICAgICBOT19VUERBVEU6ICdub191cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBVUERBVEVfQVZBSUxBQkxFOiAndXBkYXRlX2F2YWlsYWJsZScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBPbkluc3RhbGxlZFJlYXNvbjoge1xuICAgICAgICAgICAgICAgICAgICBJTlNUQUxMOiAnaW5zdGFsbCcsXG4gICAgICAgICAgICAgICAgICAgIFVQREFURTogJ3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIENIUk9NRV9VUERBVEU6ICdjaHJvbWVfdXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgU0hBUkVEX01PRFVMRV9VUERBVEU6ICdzaGFyZWRfbW9kdWxlX3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBPblJlc3RhcnRSZXF1aXJlZFJlYXNvbjoge1xuICAgICAgICAgICAgICAgICAgICBBUFBfVVBEQVRFOiAnYXBwX3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIE9TX1VQREFURTogJ29zX3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIFBFUklPRElDOiAncGVyaW9kaWMnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICAvLyBpZih3aW5kb3cubmF2aWdhdG9yLmNocm9tZSl7XG4gICAgICAgIC8vIHdpbmRvdy5uYXZpZ2F0b3IuY2hyb21lID0gbW9ja09iajtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB3aW5kb3cuY2hyb21lID0gbW9ja09iajtcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdGhlIFBlcm1pc3Npb25zIFRlc3QuXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICBjb25zdCBvcmlnaW5hbFF1ZXJ5ID0gd2luZG93Lm5hdmlnYXRvci5wZXJtaXNzaW9ucy5xdWVyeTtcbiAgICAgICAgLy8gd2luZG93Lm5hdmlnYXRvci5wZXJtaXNzaW9ucy5fX3Byb3RvX18ucXVlcnkgPSBwYXJhbWV0ZXJzID0+XG4gICAgICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZih3aW5kb3cubmF2aWdhdG9yLnBlcm1pc3Npb25zKS5xdWVyeSA9IHBhcmFtZXRlcnMgPT5cbiAgICAgICAgICAgIFxuICAgICAgICBwYXJhbWV0ZXJzLm5hbWUgPT09ICdub3RpZmljYXRpb25zJ1xuICAgICAgICAgICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKHsgc3RhdGU6IE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uIH0pXG4gICAgICAgICAgICAgICAgOiBvcmlnaW5hbFF1ZXJ5KHBhcmFtZXRlcnMpO1xuXG4gICAgICAgIC8vIEluc3BpcmVkIGJ5OiBodHRwczovL2dpdGh1Yi5jb20vaWthcmllbmF0b3IvcGhhbnRvbWpzX2hpZGVfYW5kX3NlZWsvYmxvYi9tYXN0ZXIvNS5zcG9vZkZ1bmN0aW9uQmluZC5qc1xuICAgICAgICBjb25zdCBvbGRDYWxsID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGw7XG5cbiAgICAgICAgZnVuY3Rpb24gY2FsbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBvbGRDYWxsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbCA9IGNhbGw7XG5cbiAgICAgICAgY29uc3QgbmF0aXZlVG9TdHJpbmdGdW5jdGlvblN0cmluZyA9IEVycm9yLnRvU3RyaW5nKCkucmVwbGFjZSgvRXJyb3IvZywgXCJ0b1N0cmluZ1wiKTtcbiAgICAgICAgY29uc3Qgb2xkVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbiAgICAgICAgZnVuY3Rpb24gZnVuY3Rpb25Ub1N0cmluZygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzID09PSB3aW5kb3cubmF2aWdhdG9yLnBlcm1pc3Npb25zLnF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZnVuY3Rpb24gcXVlcnkoKSB7IFtuYXRpdmUgY29kZV0gfVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMgPT09IGZ1bmN0aW9uVG9TdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmF0aXZlVG9TdHJpbmdGdW5jdGlvblN0cmluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvbGRDYWxsLmNhbGwob2xkVG9TdHJpbmcsIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb25Ub1N0cmluZztcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdGhlIFBsdWdpbnMgTGVuZ3RoIFRlc3QuXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICAvLyBPdmVyd3JpdGUgdGhlIGBwbHVnaW5zYCBwcm9wZXJ0eSB0byB1c2UgYSBjdXN0b20gZ2V0dGVyLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmF2aWdhdG9yLCAncGx1Z2lucycsIHtcbiAgICAgICAgICAgIC8vIFRoaXMganVzdCBuZWVkcyB0byBoYXZlIGBsZW5ndGggPiAwYCBmb3IgdGhlIGN1cnJlbnQgdGVzdCxcbiAgICAgICAgICAgIC8vIGJ1dCB3ZSBjb3VsZCBtb2NrIHRoZSBwbHVnaW5zIHRvbyBpZiBuZWNlc3NhcnkuXG4gICAgICAgICAgICBnZXQ6ICgpID0+IFsxLCAyLCAzLCA0LCA1XVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdGhlIExhbmd1YWdlcyBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgLy8gT3ZlcndyaXRlIHRoZSBgcGx1Z2luc2AgcHJvcGVydHkgdG8gdXNlIGEgY3VzdG9tIGdldHRlci5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5hdmlnYXRvciwgJ2xhbmd1YWdlcycsIHtcbiAgICAgICAgICAgIGdldDogKCkgPT4gWydlbi1VUycsICdlbiddXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0aGUgaWZyYW1lIFRlc3RcbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MSUZyYW1lRWxlbWVudC5wcm90b3R5cGUsICdjb250ZW50V2luZG93Jywge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRvU3RyaW5nIHRlc3QsIHRob3VnaCBpdCBicmVha3MgY29uc29sZS5kZWJ1ZygpIGZyb20gd29ya2luZ1xuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgd2luZG93LmNvbnNvbGUuZGVidWcgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8vIGNvbnN0IGNoZWVyaW8gPSByZXF1aXJlKCdjaGVlcmlvJyk7XG5pbXBvcnQge1NvY2lhbFNjcmFwZXIgYXMgU2NyYXBlcixTY3JhcGVPcHRpb25zfSBmcm9tICcuL3NvY2lhbF9zY3JhcGVyJztcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY2xhc3MgWW91dHViZVNjcmFwZXIgZXh0ZW5kcyBTY3JhcGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IFNjcmFwZU9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoYXJncyk7ICAgIFxuICAgIH1cblxuXG4gICAgYXN5bmMgbG9hZF9sb2dpbl9wYWdlKCkge1xuICAgICAgICBcbiAgICAgICAgbGV0IHN0YXJ0VXJsID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tJztcblxuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdVc2luZyBsb2dpblVybDogJyArIHN0YXJ0VXJsKTtcbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNldEJ5cGFzc0NTUCh0cnVlKTtcbiAgICAgICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8oc3RhcnRVcmwpO1xuICAgICAgICBcbiAgICAgICAgLy9oaWRkZW4gaWNvblxuICAgICAgICBhd2FpdCB0aGlzLnBhZ2UuZXZhbHVhdGUoKCkgPT4ge1xuICAgICAgICB2YXIgaWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nby1pY29uXCIpO1xuICAgICAgICBpZihpY29uKXtcbiAgICAgICAgaWNvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29uZmlnLnRtcHBhdGgpXG4gICAgICAgIC8vYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcignaW5wdXRbbmFtZT1cInFcIl0nLCB7IHRpbWVvdXQ6IHRoaXMuU1RBTkRBUkRfVElNRU9VVCB9KTtcbiAgICAgICAgLy9hd2FpdCBmb3IgdXNlciB0byB0YWtlIGFjdGlvblxuICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlbGVjdG9yKCcjYXZhdGFyLWJ0bicseyd0aW1lb3V0JzowfSk7XG4gICAgICAgIC8vdXNlciBoYXMgc3VjY2VzcyBsb2dpblxuICAgICAgICAvL3NhdmUgY29va2llcyBcbiAgICAgICAgY29uc3QgY29va2llcyA9IGF3YWl0IHRoaXMucGFnZS5jb29raWVzKCk7XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBmcy53cml0ZUZpbGUodGhpcy5jb25maWcudG1wcGF0aCsnL2Nvb2tpZXMuanNvbicsIEpTT04uc3RyaW5naWZ5KGNvb2tpZXMsIG51bGwsIDIpKTtcbiAgICAgICAgLy8gYXdhaXQgYnJvd3Nlci5jbG9zZSgpO1xuICAgICAgICAvLyByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFlvdXR1YmVTY3JhcGVyOiBZb3V0dWJlU2NyYXBlcixcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIFVzZSBUeXBlU2NyaXB0IG1vZHVsZXMgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU3NTg1ODQvY2Fubm90LXJlZGVjbGFyZS1ibG9jay1zY29wZWQtdmFyaWFibGVcbmV4cG9ydCB7fTtcbmNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3Qgb3MgPSByZXF1aXJlKFwib3NcIik7XG5jb25zdCBfID0gcmVxdWlyZShcImxvZGFzaFwiKTtcbmNvbnN0IHsgY3JlYXRlTG9nZ2VyLCBmb3JtYXQsIHRyYW5zcG9ydHMgfSA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpO1xuY29uc3QgeyBjb21iaW5lLCB0aW1lc3RhbXAsIHByaW50ZiB9ID0gZm9ybWF0O1xuY29uc3QgZGVidWcgPSByZXF1aXJlKFwiZGVidWdcIikoXCJzZS1zY3JhcGVyOlNjcmFwZU1hbmFnZXJcIik7XG5jb25zdCB7IENsdXN0ZXIgfSA9IHJlcXVpcmUoXCJwdXBwZXRlZXItY2x1c3RlclwiKTtcbmNvbnN0IHZhbmlsbGFQdXBwZXRlZXIgPSByZXF1aXJlKFwicHVwcGV0ZWVyXCIpO1xuY29uc3QgeyBhZGRFeHRyYSB9ID0gcmVxdWlyZShcInB1cHBldGVlci1leHRyYVwiKTtcbi8vIGNvbnN0IFN0ZWFsdGggPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhLXBsdWdpbi1zdGVhbHRoXCIpO1xuLy8gY29uc3QgQWRibG9ja2VyUGx1Z2luID0gcmVxdWlyZShcInB1cHBldGVlci1leHRyYS1wbHVnaW4tYWRibG9ja2VyXCIpO1xuXG5jb25zdCBVc2VyQWdlbnQgPSByZXF1aXJlKFwidXNlci1hZ2VudHNcIik7XG5jb25zdCBmYWNlYm9vayA9IHJlcXVpcmUoXCIuL21vZHVsZXMvZmFjZWJvb2tfc2NyYXBlclwiKTtcbmNvbnN0IHlvdXR1YmUgPSByZXF1aXJlKFwiLi9tb2R1bGVzL3lvdXR1YmVfc2NyYXBlclwiKTtcbmNvbnN0IGJpbGliaWxpID0gcmVxdWlyZShcIi4vbW9kdWxlcy9iaWxpYmlsaV9zY3JhcGVyXCIpO1xuLy8gY29uc3QgYmluZyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9iaW5nLmpzJyk7XG4vLyBjb25zdCB5YW5kZXggPSByZXF1aXJlKCcuL21vZHVsZXMveWFuZGV4LmpzJyk7XG4vLyBjb25zdCBpbmZvc3BhY2UgPSByZXF1aXJlKCcuL21vZHVsZXMvaW5mb3NwYWNlLmpzJyk7XG4vLyBjb25zdCBkdWNrZHVja2dvID0gcmVxdWlyZSgnLi9tb2R1bGVzL2R1Y2tkdWNrZ28uanMnKTtcbmNvbnN0IEN1c3RvbUNvbmN1cnJlbmN5SW1wbCA9IHJlcXVpcmUoXCIuL2NvbmN1cnJlbmN5LWltcGxlbWVudGF0aW9uXCIpO1xuLy8gY29uc3QgYXhpb3MgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5jb25zdCBNQVhfQUxMT1dFRF9CUk9XU0VSUyA9IDY7XG4vLyBjb25zdCBwdXBwZXRlZXIgPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhXCIpO1xuLy8gY29uc3QgX1N0ZWFsdGhQbHVnaW4gPSByZXF1aXJlKCdwdXBwZXRlZXItZXh0cmEtcGx1Z2luLXN0ZWFsdGgnKTtcbi8vIGNvbnN0IF9BZGJsb2NrZXJQbHVnaW4gPSByZXF1aXJlKCdwdXBwZXRlZXItZXh0cmEtcGx1Z2luLWFkYmxvY2tlcicpO1xuXG5mdW5jdGlvbiB3cml0ZV9yZXN1bHRzKGZuYW1lLCBkYXRhKSB7XG4gIGZzLndyaXRlRmlsZVN5bmMoZm5hbWUsIGRhdGEsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gICAgY29uc29sZS5sb2coYFJlc3VsdHMgd3JpdHRlbiB0byBmaWxlICR7Zm5hbWV9YCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWFkX2tleXdvcmRzX2Zyb21fZmlsZShmbmFtZSkge1xuICBsZXQga3dzID0gZnMucmVhZEZpbGVTeW5jKGZuYW1lKS50b1N0cmluZygpLnNwbGl0KG9zLkVPTCk7XG4gIC8vIGNsZWFuIGtleXdvcmRzXG4gIGt3cyA9IGt3cy5maWx0ZXIoKGt3KSA9PiB7XG4gICAgcmV0dXJuIGt3LnRyaW0oKS5sZW5ndGggPiAwO1xuICB9KTtcbiAgcmV0dXJuIGt3cztcbn1cblxuXG5mdW5jdGlvbiBnZXRTY3JhcGVyKHNlYXJjaF9lbmdpbmU6c3RyaW5nLCBhcmdzOmFueSkge1xuICBpZiAodHlwZW9mIHNlYXJjaF9lbmdpbmUgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gbmV3IHtcbiAgICAgIGZhY2Vib29rOiBmYWNlYm9vay5GYWNlYm9va1NjcmFwZXIsXG4gICAgICB5b3V0dWJlOiB5b3V0dWJlLllvdXR1YmVTY3JhcGVyLFxuICAgICAgYmlsaWJpbGk6IGJpbGliaWxpLkJpbGliaWxpU2NyYXBlcixcbiAgICB9W3NlYXJjaF9lbmdpbmVdKGFyZ3MpO1xuICB9IFxuICAvLyBlbHNlIGlmICh0eXBlb2Ygc2VhcmNoX2VuZ2luZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gIC8vICAgcmV0dXJuIG5ldyBzZWFyY2hfZW5naW5lKGFyZ3MpO1xuICAvLyB9IFxuICBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgc29jaWFsIHBsYXRmb3JtIG11c3QgZWl0aGVyIGJlIGEgc3RyaW5nIG9mIGNsYXNzIChmdW5jdGlvbilgXG4gICAgKTtcbiAgfVxufVxudHlwZSBTTWNvbmZpZyA9e1xuICBsb2dnZXI6e2luZm86RnVuY3Rpb259O1xuICBrZXl3b3JkczpBcnJheTxzdHJpbmc+O1xuICBwcm94aWVzOkFycmF5PHN0cmluZz47XG4gIGtleXdvcmRfZmlsZTpzdHJpbmc7XG4gIHByb3h5X2ZpbGU6c3RyaW5nO1xuICB1c2VfcHJveGllc19vbmx5OmJvb2xlYW47XG4gIGN1c3RvbV9mdW5jOnN0cmluZztcbiAgY2hyb21lX2ZsYWdzOkFycmF5PHN0cmluZz47XG4gIHB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZzp7XG4gICAgbWF4Q29uY3VycmVuY3k6bnVtYmVyO1xuICAgIG1vbml0b3I6Ym9vbGVhbjtcbiAgICB0aW1lb3V0Om51bWJlcjtcbiAgfVxuICByYW5kb21fdXNlcl9hZ2VudDpib29sZWFuO1xuICB1c2VyX2FnZW50OnN0cmluZztcbiAgaGVhZGxlc3M6Ym9vbGVhbjtcbiAgcGxhdGZvcm06c3RyaW5nO1xuICB0YXNraWQ/Om51bWJlcjtcbn1cbmV4cG9ydCBjbGFzcyBTY3JhcGVNYW5hZ2VyIHtcbiAgY2x1c3Rlcjp7ZXhlY3V0ZTpGdW5jdGlvbjtpZGxlOkZ1bmN0aW9uO2Nsb3NlOkZ1bmN0aW9ufTtcbiAgcGx1Z2dhYmxlOntzdGFydF9icm93c2VyPzpGdW5jdGlvbixjbG9zZV9icm93c2VyPzpGdW5jdGlvbixoYW5kbGVfcmVzdWx0cz86RnVuY3Rpb24saGFuZGxlX21ldGFkYXRhPzpGdW5jdGlvbn07XG4gIHNjcmFwZXI6e3J1bkxvZ2luOkZ1bmN0aW9uO3dvcmtlcnNlYXJjaGRhdGE6RnVuY3Rpb259O1xuICBjb250ZXh0Om9iamVjdDtcbiAgY29uZmlnOlNNY29uZmlnO1xuICBsb2dnZXI6e2luZm86RnVuY3Rpb259O1xuICBicm93c2VyOntuZXdQYWdlOkZ1bmN0aW9ufTtcbiAgcGFnZTpvYmplY3Q7XG4gIG51bUNsdXN0ZXJzOm51bWJlcjtcbiAgdG1wcGF0aDpzdHJpbmc7XG4gIHJ1bkxvZ2luOkZ1bmN0aW9uO1xuICBjb25zdHJ1Y3Rvcihjb25maWcsIGNvbnRleHQgPSB7fSkge1xuICAgIHRoaXMuY2x1c3RlciA9IG51bGw7XG4gICAgdGhpcy5wbHVnZ2FibGUgPSBudWxsO1xuICAgIHRoaXMuc2NyYXBlciA9IG51bGw7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICBcbiAgICAvLyBhd2FpdCB0aGlzLmdldFJlbW90ZUNvbmZpZyhjYW1wYWlnbklkKVxuXG4gICAgdGhpcy5jb25maWcgPSBfLmRlZmF1bHRzKGNvbmZpZywge1xuICAgICAgLy8gcmVtb3RlX2FkZDplbmRjb2ZpZy5SRU1PVEVBREQsXG4gICAgICAvLyByZW1vdGVfdXNlcm5hbWU6ZW5kY29maWcuVVNFUk5BTUUsXG4gICAgICAvLyByZW1vdGVfcGFzc3dvcmQ6ZW5kY29maWcuUEFTU1dPUkQsXG4gICAgICAvLyB0aGUgdXNlciBhZ2VudCB0byBzY3JhcGUgd2l0aFxuICAgICAgdXNlcl9hZ2VudDpcbiAgICAgICAgXCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTA3LjAuMC4wIFNhZmFyaS81MzcuMzZcIixcbiAgICAgIC8vIGlmIHJhbmRvbV91c2VyX2FnZW50IGlzIHNldCB0byBUcnVlLCBhIHJhbmRvbSB1c2VyIGFnZW50IGlzIGNob3NlblxuICAgICAgcmFuZG9tX3VzZXJfYWdlbnQ6IGZhbHNlLFxuICAgICAgLy8gd2hldGhlciB0byBzZWxlY3QgbWFudWFsIHNldHRpbmdzIGluIHZpc2libGUgbW9kZVxuICAgICAgc2V0X21hbnVhbF9zZXR0aW5nczogZmFsc2UsXG4gICAgICAvLyBsb2cgaXAgYWRkcmVzcyBkYXRhXG4gICAgICBsb2dfaXBfYWRkcmVzczogZmFsc2UsXG4gICAgICAvLyBsb2cgaHR0cCBoZWFkZXJzXG4gICAgICBsb2dfaHR0cF9oZWFkZXJzOiBmYWxzZSxcbiAgICAgIC8vIGhvdyBsb25nIHRvIHNsZWVwIGJldHdlZW4gcmVxdWVzdHMuIGEgcmFuZG9tIHNsZWVwIGludGVydmFsIHdpdGhpbiB0aGUgcmFuZ2UgW2EsYl1cbiAgICAgIC8vIGlzIGRyYXduIGJlZm9yZSBldmVyeSByZXF1ZXN0LiBlbXB0eSBzdHJpbmcgZm9yIG5vIHNsZWVwaW5nLlxuICAgICAgc2xlZXBfcmFuZ2U6IG51bGwsXG5cbiAgICAgIGxvZ2dlcjogY3JlYXRlTG9nZ2VyKHtcbiAgICAgICAgbGV2ZWw6IFwiaW5mb1wiLFxuICAgICAgICBmb3JtYXQ6IGNvbWJpbmUoXG4gICAgICAgICAgdGltZXN0YW1wKCksXG4gICAgICAgICAgcHJpbnRmKCh7IGxldmVsLCBtZXNzYWdlLCB0aW1lc3RhbXAgfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGAke3RpbWVzdGFtcH0gWyR7bGV2ZWx9XSAke21lc3NhZ2V9YDtcbiAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgICB0cmFuc3BvcnRzOiBbbmV3IHRyYW5zcG9ydHMuQ29uc29sZSgpXSxcbiAgICAgIH0pLFxuICAgICAgcGxhdGZvcm06IFwiZmFjZWJvb2tcIixcbiAgICAgIGtleXdvcmRzOiBbXCJub2RlanMgcm9ja3NcIl0sXG4gICAgICAvLyB3aGV0aGVyIHRvIHN0YXJ0IHRoZSBicm93c2VyIGluIGhlYWRsZXNzIG1vZGVcbiAgICAgIC8vIGhlYWRsZXNzOiB0cnVlLFxuICAgICAgLy8gc3BlY2lmeSBmbGFncyBwYXNzZWQgdG8gY2hyb21lIGhlcmVcbiAgICAgIC8vIEFib3V0IG91ciBkZWZhdWx0cyB2YWx1ZXMgaHR0cHM6Ly9wZXRlci5zaC9leHBlcmltZW50cy9jaHJvbWl1bS1jb21tYW5kLWxpbmUtc3dpdGNoZXMvXG4gICAgICBjaHJvbWVfZmxhZ3M6IFtcbiAgICAgICAgXCItLWRpc2FibGUtaW5mb2JhcnNcIixcbiAgICAgICAgXCItLXdpbmRvdy1wb3NpdGlvbj0wLDBcIixcbiAgICAgICAgXCItLWlnbm9yZS1jZXJ0aWZjYXRlLWVycm9yc1wiLFxuICAgICAgICBcIi0taWdub3JlLWNlcnRpZmNhdGUtZXJyb3JzLXNwa2ktbGlzdFwiLFxuICAgICAgICBcIi0tbm8tc2FuZGJveFwiLFxuICAgICAgICBcIi0tZGlzYWJsZS1zZXR1aWQtc2FuZGJveFwiLFxuICAgICAgICBcIi0tZGlzYWJsZS1kZXYtc2htLXVzYWdlXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWFjY2VsZXJhdGVkLTJkLWNhbnZhc1wiLFxuICAgICAgICBcIi0tZGlzYWJsZS1ncHVcIixcbiAgICAgICAgXCItLXdpbmRvdy1zaXplPTEyODAsNzY4XCIsXG4gICAgICAgIFwiLS1zdGFydC1mdWxsc2NyZWVuXCIsXG4gICAgICAgIFwiLS1oaWRlLXNjcm9sbGJhcnNcIixcbiAgICAgICAgXCItLWRpc2FibGUtbm90aWZpY2F0aW9uc1wiLFxuICAgICAgXSxcbiAgICAgIC8vZml4IGdvb2dsZSBhY2NvdW50IGNhbiBub3QgbG9naW5cbiAgICAgIGlnbm9yZURlZmF1bHRBcmdzOiBbXG4gICAgICAgIFwiLS1lbmFibGUtYXV0b21hdGlvblwiLFxuICAgICAgICBcIi0tZGlzYWJsZS1leHRlbnNpb25zXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWRlZmF1bHQtYXBwc1wiLFxuICAgICAgICBcIi0tZGlzYWJsZS1jb21wb25lbnQtZXh0ZW5zaW9ucy13aXRoLWJhY2tncm91bmQtcGFnZXNcIixcbiAgICAgIF0sXG4gICAgICAvLyB0aGUgbnVtYmVyIG9mIHBhZ2VzIHRvIHNjcmFwZSBmb3IgZWFjaCBrZXl3b3JkXG4gICAgICBudW1fcGFnZXM6IDEsXG4gICAgICAvLyBwYXRoIHRvIG91dHB1dCBmaWxlLCBkYXRhIHdpbGwgYmUgc3RvcmVkIGluIEpTT05cbiAgICAgIG91dHB1dF9maWxlOiBcIlwiLFxuICAgICAgLy8gd2hldGhlciB0byBhbHNvIHBhc3N0aHJ1IGFsbCB0aGUgaHRtbCBvdXRwdXQgb2YgdGhlIHNlcnAgcGFnZXNcbiAgICAgIGh0bWxfb3V0cHV0OiBmYWxzZSxcbiAgICAgIC8vIHdoZXRoZXIgdG8gc3RyaXAgSlMgYW5kIENTUyBmcm9tIHRoZSBodG1sX291dHB1dFxuICAgICAgLy8gaGFzIG9ubHkgYW4gZWZmZWN0IGlmIGBodG1sX291dHB1dGAgaXMgdHJ1ZVxuICAgICAgY2xlYW5faHRtbF9vdXRwdXQ6IHRydWUsXG4gICAgICAvLyByZW1vdmUgYWxsIGRhdGEgaW1hZ2VzIGZyb20gdGhlIGh0bWxcbiAgICAgIGNsZWFuX2RhdGFfaW1hZ2VzOiB0cnVlLFxuICAgICAgLy8gd2hldGhlciB0byByZXR1cm4gYSBzY3JlZW5zaG90IG9mIHNlcnAgcGFnZXMgYXMgYjY0IGRhdGFcbiAgICAgIHNjcmVlbl9vdXRwdXQ6IGZhbHNlLFxuICAgICAgLy8gU2NyYXBlIHVybCBmcm9tIGxvY2FsIGZpbGUuIE1haW5seSB1c2VkIGZvciB0ZXN0aW5nLlxuICAgICAgc2NyYXBlX2Zyb21fZmlsZTogXCJcIixcbiAgICAgIC8vIHdoZXRoZXIgdG8gcHJldmVudCBpbWFnZXMsIGNzcywgZm9udHMgYW5kIG1lZGlhIGZyb20gYmVpbmcgbG9hZGVkXG4gICAgICAvLyB3aWxsIHNwZWVkIHVwIHNjcmFwaW5nIGEgZ3JlYXQgZGVhbFxuICAgICAgYmxvY2tfYXNzZXRzOiB0cnVlLFxuICAgICAgLy8gcGF0aCB0byBqcyBtb2R1bGUgdGhhdCBleHRlbmRzIGZ1bmN0aW9uYWxpdHlcbiAgICAgIC8vIHRoaXMgbW9kdWxlIHNob3VsZCBleHBvcnQgdGhlIGZ1bmN0aW9uczpcbiAgICAgIC8vIGdldF9icm93c2VyLCBoYW5kbGVfbWV0YWRhdGEsIGNsb3NlX2Jyb3dzZXJcbiAgICAgIC8vY3VzdG9tX2Z1bmM6IHJlc29sdmUoJ2V4YW1wbGVzL3BsdWdnYWJsZS5qcycpLFxuICAgICAgY3VzdG9tX2Z1bmM6IG51bGwsXG4gICAgICB0aHJvd19vbl9kZXRlY3Rpb246IGZhbHNlLFxuICAgICAgLy8gTGlzdCBvZiBwcm94aWVzIHRvIHVzZSBbJ3NvY2tzNTovLzc4Ljk0LjE3Mi40MjoxMDgwJywgJ2h0dHA6Ly9sb2NhbGhvc3Q6MTA4MCddXG4gICAgICBwcm94aWVzOiBudWxsLFxuICAgICAgLy8gYSBmaWxlIHdpdGggb25lIHByb3h5IHBlciBsaW5lLiBFeGFtcGxlOlxuICAgICAgLy8gc29ja3M1Oi8vNzguOTQuMTcyLjQyOjEwODBcbiAgICAgIC8vIGh0dHA6Ly8xMTguMTc0LjIzMy4xMDo0ODQwMFxuICAgICAgcHJveHlfZmlsZTogXCJcIixcbiAgICAgIC8vIHdoZXRoZXIgdG8gdXNlIHByb3hpZXMgb25seVxuICAgICAgLy8gd2hlbiB0aGlzIGlzIHNldCB0byB0cnVlLCBzZS1zY3JhcGVyIHdpbGwgbm90IHVzZVxuICAgICAgLy8geW91ciBkZWZhdWx0IElQIGFkZHJlc3NcbiAgICAgIHVzZV9wcm94aWVzX29ubHk6IGZhbHNlLFxuICAgICAgLy8gY2hlY2sgaWYgaGVhZGxlc3MgY2hyb21lIGVzY2FwZXMgY29tbW9uIGRldGVjdGlvbiB0ZWNobmlxdWVzXG4gICAgICAvLyB0aGlzIGlzIGEgcXVpY2sgdGVzdCBhbmQgc2hvdWxkIGJlIHVzZWQgZm9yIGRlYnVnZ2luZ1xuICAgICAgdGVzdF9ldmFzaW9uOiBmYWxzZSxcbiAgICAgIGFwcGx5X2V2YXNpb25fdGVjaG5pcXVlczogdHJ1ZSxcbiAgICAgIC8vIHNldHRpbmdzIGZvciBwdXBwZXRlZXItY2x1c3RlclxuICAgICAgcHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnOiB7XG4gICAgICAgIHRpbWVvdXQ6IDMwICogNjAgKiAxMDAwLCAvLyBtYXggdGltZW91dCBzZXQgdG8gMzAgbWludXRlc1xuICAgICAgICBtb25pdG9yOiBmYWxzZSxcbiAgICAgICAgY29uY3VycmVuY3k6IENsdXN0ZXIuQ09OQ1VSUkVOQ1lfQlJPV1NFUixcbiAgICAgICAgbWF4Q29uY3VycmVuY3k6IDEsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIFxuICAgIHRoaXMubG9nZ2VyID0gdGhpcy5jb25maWcubG9nZ2VyO1xuXG4gICAgaWYgKGNvbmZpZy5zbGVlcF9yYW5nZSkge1xuICAgICAgLy8gcGFyc2UgYW4gYXJyYXlcbiAgICAgIGNvbmZpZy5zbGVlcF9yYW5nZSA9IGV2YWwoY29uZmlnLnNsZWVwX3JhbmdlKTtcblxuICAgICAgaWYgKFxuICAgICAgICBjb25maWcuc2xlZXBfcmFuZ2UubGVuZ3RoICE9PSAyIFxuICAgICAgKSB7XG4gICAgICAgIHRocm93IFwic2xlZXBfcmFuZ2UgaXMgbm90IGEgdmFsaWQgYXJyYXkgb2YgdHdvIGludGVnZXJzLlwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmcy5leGlzdHNTeW5jKHRoaXMuY29uZmlnLmtleXdvcmRfZmlsZSkpIHtcbiAgICAgIHRoaXMuY29uZmlnLmtleXdvcmRzID0gcmVhZF9rZXl3b3Jkc19mcm9tX2ZpbGUodGhpcy5jb25maWcua2V5d29yZF9maWxlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcucHJveGllcyAmJiB0aGlzLmNvbmZpZy5wcm94eV9maWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiRWl0aGVyIHVzZSBhIHByb3h5X2ZpbGUgb3Igc3BlY2lmeSBhIHByb3h5IGZvciBhbGwgY29ubmVjdGlvbnMuIERvIG5vdCB1c2UgYm90aCBvcHRpb25zLlwiXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5wcm94eV9maWxlKSB7XG4gICAgICB0aGlzLmNvbmZpZy5wcm94aWVzID0gcmVhZF9rZXl3b3Jkc19mcm9tX2ZpbGUodGhpcy5jb25maWcucHJveHlfZmlsZSk7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKGAke3RoaXMuY29uZmlnLnByb3hpZXMubGVuZ3RofSBwcm94aWVzIHJlYWQgZnJvbSBmaWxlLmApO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jb25maWcucHJveGllcyAmJiB0aGlzLmNvbmZpZy51c2VfcHJveGllc19vbmx5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiTXVzdCBwcm92aWRlIGF0IGxlYXN0IG9uZSBwcm94eSBpbiBwcm94aWVzIGlmIHlvdSBlbmFibGUgdXNlX3Byb3hpZXNfb25seVwiXG4gICAgICApO1xuICAgIH1cblxuICAgIGRlYnVnKFwidGhpcy5jb25maWc9JU9cIiwgdGhpcy5jb25maWcpO1xuICB9XG5cbiAgLypcbiAgICogTGF1bmNoZXMgdGhlIHB1cHBldGVlciBjbHVzdGVyIG9yIGJyb3dzZXIuXG4gICAqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgYnJvd3NlciB3YXMgc3VjY2Vzc2Z1bGx5IGxhdW5jaGVkLiBPdGhlcndpc2Ugd2lsbCByZXR1cm4gZmFsc2UuXG4gICAqL1xuICBhc3luYyBzdGFydCgpIHtcbiAgICBpZiAodGhpcy5jb25maWcuY3VzdG9tX2Z1bmMpIHtcbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKHRoaXMuY29uZmlnLmN1c3RvbV9mdW5jKSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IFBsdWdnYWJsZUNsYXNzID0gcmVxdWlyZSh0aGlzLmNvbmZpZy5jdXN0b21fZnVuYyk7XG4gICAgICAgICAgdGhpcy5wbHVnZ2FibGUgPSBuZXcgUGx1Z2dhYmxlQ2xhc3Moe1xuICAgICAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihleGNlcHRpb24pO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRmlsZSBcIiR7dGhpcy5jb25maWcuY3VzdG9tX2Z1bmN9XCIgZG9lcyBub3QgZXhpc3QhYCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaHJvbWVfZmxhZ3MgPSBfLmNsb25lKHRoaXMuY29uZmlnLmNocm9tZV9mbGFncyk7XG5cbiAgICBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuc3RhcnRfYnJvd3Nlcikge1xuICAgICAgLy8gbGF1bmNoX2FyZ3MuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICB0aGlzLmJyb3dzZXIgPSBhd2FpdCB0aGlzLnBsdWdnYWJsZS5zdGFydF9icm93c2VyKHtcbiAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIH0pO1xuICAgICAgLy8gY29uc29sZS5sb2coXCIyMjlcIilcbiAgICAgIHRoaXMucGFnZSA9IGF3YWl0IHRoaXMuYnJvd3Nlci5uZXdQYWdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFxuICAgICAgLy8gaWYgbm8gY3VzdG9tIHN0YXJ0X2Jyb3dzZXIgZnVuY3Rpb25hbGl0eSB3YXMgZ2l2ZW5cbiAgICAgIC8vIHVzZSBwdXBwZXRlZXItY2x1c3RlciBmb3Igc2NyYXBpbmdcblxuICAgICAgbGV0IHByb3hpZXM7XG4gICAgICAvLyBpZiB3ZSBoYXZlIGF0IGxlYXN0IG9uZSBwcm94eSwgYWx3YXlzIHVzZSBDT05DVVJSRU5DWV9CUk9XU0VSXG4gICAgICAvLyBhbmQgc2V0IG1heENvbmN1cnJlbmN5IHRvIHRoaXMuY29uZmlnLnByb3hpZXMubGVuZ3RoICsgMVxuICAgICAgLy8gZWxzZSB1c2Ugd2hhdGV2ZXIgdGhpcy5jb25maWd1cmF0aW9uIHdhcyBwYXNzZWRcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5wcm94aWVzICYmIHRoaXMuY29uZmlnLnByb3hpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBiZWNhdXNlIHdlIHVzZSByZWFsIGJyb3dzZXJzLCB3ZSByYW4gb3V0IG9mIG1lbW9yeSBvbiBub3JtYWwgbGFwdG9wc1xuICAgICAgICAvLyB3aGVuIHVzaW5nIG1vcmUgdGhhbiBtYXliZSA1IG9yIDYgYnJvd3NlcnMuXG4gICAgICAgIC8vIHRoZXJlZm9yZSBoYXJkY29kZSBhIGxpbWl0IGhlcmVcbiAgICAgICAgLy8gVE9ETyBub3Qgc3VyZSB0aGlzIHdoYXQgd2Ugd2FudFxuICAgICAgICB0aGlzLm51bUNsdXN0ZXJzID0gTWF0aC5taW4oXG4gICAgICAgICAgdGhpcy5jb25maWcucHJveGllcy5sZW5ndGggKyAodGhpcy5jb25maWcudXNlX3Byb3hpZXNfb25seSA/IDAgOiAxKSxcbiAgICAgICAgICBNQVhfQUxMT1dFRF9CUk9XU0VSU1xuICAgICAgICApO1xuICAgICAgICBwcm94aWVzID0gXy5jbG9uZSh0aGlzLmNvbmZpZy5wcm94aWVzKTtcblxuICAgICAgICAvLyBJbnNlcnQgYSBmaXJzdCBjb25maWcgd2l0aG91dCBwcm94eSBpZiB1c2VfcHJveHlfb25seSBpcyBmYWxzZVxuICAgICAgICBpZiAodGhpcy5jb25maWcudXNlX3Byb3hpZXNfb25seSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBwcm94aWVzLnVuc2hpZnQobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubnVtQ2x1c3RlcnMgPSB0aGlzLmNvbmZpZy5wdXBwZXRlZXJfY2x1c3Rlcl9jb25maWcubWF4Q29uY3VycmVuY3k7XG4gICAgICAgIHByb3hpZXMgPSBfLnRpbWVzKHRoaXMubnVtQ2x1c3RlcnMsIG51bGwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKGBVc2luZyAke3RoaXMubnVtQ2x1c3RlcnN9IGNsdXN0ZXJzLmApO1xuXG4gICAgICAvLyBHaXZlIHRoZSBwZXIgYnJvd3NlciBvcHRpb25zXG4gICAgICBjb25zdCBwZXJCcm93c2VyT3B0aW9ucyA9IF8ubWFwKHByb3hpZXMsIChwcm94eSkgPT4ge1xuICAgICAgICBjb25zdCB1c2VyQWdlbnQgPSB0aGlzLmNvbmZpZy5yYW5kb21fdXNlcl9hZ2VudFxuICAgICAgICAgID8gbmV3IFVzZXJBZ2VudCh7IGRldmljZUNhdGVnb3J5OiBcImRlc2t0b3BcIiB9KS50b1N0cmluZygpXG4gICAgICAgICAgOiB0aGlzLmNvbmZpZy51c2VyX2FnZW50O1xuICAgICAgICBsZXQgYXJncyA9IGNocm9tZV9mbGFncy5jb25jYXQoW2AtLXVzZXItYWdlbnQ9JHt1c2VyQWdlbnR9YF0pO1xuXG4gICAgICAgIGlmIChwcm94eSkge1xuICAgICAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdChbYC0tcHJveHktc2VydmVyPSR7cHJveHl9YF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoZWFkbGVzczogdGhpcy5jb25maWcuaGVhZGxlc3MsXG4gICAgICAgICAgaWdub3JlSFRUUFNFcnJvcnM6IHRydWUsXG4gICAgICAgICAgYXJncyxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICBkZWJ1ZyhcInBlckJyb3dzZXJPcHRpb25zPSVPXCIsIHBlckJyb3dzZXJPcHRpb25zKTtcblxuICAgICAgLy8gcHVwcGV0ZWVyLnVzZShfU3RlYWx0aFBsdWdpbigpKTtcbiAgICAgIC8vIHB1cHBldGVlci51c2UoX0FkYmxvY2tlclBsdWdpbigpKTtcblxuICAgICAgY29uc3QgcHVwcGV0ZWVyID0gYWRkRXh0cmEodmFuaWxsYVB1cHBldGVlcik7XG5cbiAgICAgIC8vIEFkZCBzdGVhbHRoIHBsdWdpbiBhbmQgdXNlIGRlZmF1bHRzIChhbGwgdHJpY2tzIHRvIGhpZGUgcHVwcGV0ZWVyIHVzYWdlKVxuICAgICAgLy8gIHB1cHBldGVlci51c2UoU3RlYWx0aCgpKTtcblxuICAgICAgLy8gQWRkIGFkYmxvY2tlciBwbHVnaW4gdG8gYmxvY2sgYWxsIGFkcyBhbmQgdHJhY2tlcnMgKHNhdmVzIGJhbmR3aWR0aClcbiAgICAgIC8vIHB1cHBldGVlci51c2UoQWRibG9ja2VyUGx1Z2luKHsgYmxvY2tUcmFja2VyczogdHJ1ZSB9KSk7XG5cbiAgICAgIHRoaXMuY2x1c3RlciA9IGF3YWl0IENsdXN0ZXIubGF1bmNoKHtcbiAgICAgICAgcHVwcGV0ZWVyLFxuICAgICAgICBtb25pdG9yOiB0aGlzLmNvbmZpZy5wdXBwZXRlZXJfY2x1c3Rlcl9jb25maWcubW9uaXRvcixcbiAgICAgICAgdGltZW91dDogdGhpcy5jb25maWcucHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnLnRpbWVvdXQsIC8vIG1heCB0aW1lb3V0IHNldCB0byAzMCBtaW51dGVzXG4gICAgICAgIGNvbmN1cnJlbmN5OiBDdXN0b21Db25jdXJyZW5jeUltcGwsXG4gICAgICAgIG1heENvbmN1cnJlbmN5OiB0aGlzLm51bUNsdXN0ZXJzLFxuICAgICAgICBwdXBwZXRlZXJPcHRpb25zOiB7XG4gICAgICAgICAgLy8gcHVwcGV0ZWVyOnB1cHBldGVlcixcbiAgICAgICAgICBwZXJCcm93c2VyT3B0aW9uczogcGVyQnJvd3Nlck9wdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBsb2dpbiB0aGUgc29jaWxhIG1lZGlhIHBsYXRmb3JtXG4gICAqL1xuICBhc3luYyBsb2dpbihzY3JhcGVfY29uZmlnID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcblxuICAgIC8vIHZhciByZXN1bHRzID0ge307XG4gICAgLy8gdmFyIG51bV9yZXF1ZXN0cyA9IDA7XG4gICAgLy8gdmFyIG1ldGFkYXRhID0ge307XG4gICAgLy8gdmFyIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG5cbiAgICBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuc3RhcnRfYnJvd3Nlcikge1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5jb25maWcucGxhdGZvcm0pXG4gICAgICB0aGlzLnNjcmFwZXIgPSBnZXRTY3JhcGVyKHRoaXMuY29uZmlnLnBsYXRmb3JtLCB7XG4gICAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcbiAgICAgICAgcGx1Z2dhYmxlOiB0aGlzLnBsdWdnYWJsZSxcbiAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxuICAgICAgICB0bXBwYXRoOiB0aGlzLnRtcHBhdGgsXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgdGhpcy5zY3JhcGVyLnJ1bkxvZ2luKHRoaXMucGFnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEVhY2ggYnJvd3NlciB3aWxsIGdldCBOLyhLKzEpIGtleXdvcmRzIGFuZCB3aWxsIGlzc3VlIE4vKEsrMSkgKiBNIHRvdGFsIHJlcXVlc3RzIHRvIHRoZSBzZWFyY2ggZW5naW5lLlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9wdXBwZXRlZXIvaXNzdWVzLzY3OFxuICAgICAgLy8gVGhlIHF1ZXN0aW9uIGlzOiBJcyBpdCBwb3NzaWJsZSB0byBzZXQgcHJveGllcyBwZXIgUGFnZT8gUGVyIEJyb3dzZXI/XG4gICAgICAvLyBhcyBmYXIgYXMgSSBjYW4gc2VlLCBwdXBwZXRlZXIgY2x1c3RlciB1c2VzIHRoZSBzYW1lIHB1cHBldGVlck9wdGlvbnNcbiAgICAgIC8vIGZvciBldmVyeSBicm93c2VyIGluc3RhbmNlLiBXZSB3aWxsIHVzZSBvdXIgY3VzdG9tIHB1cHBldGVlci1jbHVzdGVyIHZlcnNpb24uXG4gICAgICAvLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9wcm94eS1jaGFpblxuICAgICAgLy8gdGhpcyBhbnN3ZXIgbG9va3MgbmljZTogaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9wdXBwZXRlZXIvaXNzdWVzLzY3OCNpc3N1ZWNvbW1lbnQtMzg5MDk2MDc3XG4gICAgICBsZXQgY2h1bmtzID0gW107XG4gICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHRoaXMubnVtQ2x1c3RlcnM7IG4rKykge1xuICAgICAgICBjaHVua3MucHVzaChbXSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuY29uZmlnLmtleXdvcmRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGNodW5rc1trICUgdGhpcy5udW1DbHVzdGVyc10ucHVzaCh0aGlzLmNvbmZpZy5rZXl3b3Jkc1trXSk7XG4gICAgICB9XG5cbiAgICAgIGRlYnVnKFwiY2h1bmtzPSVvXCIsIGNodW5rcyk7XG5cbiAgICAgIGxldCBleGVjUHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgY2h1bmtzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IF8uY2xvbmUodGhpcy5jb25maWcpO1xuICAgICAgICBjb25maWcua2V5d29yZHMgPSBjaHVua3NbY107XG5cbiAgICAgICAgdmFyIG9iaiA9IGdldFNjcmFwZXIodGhpcy5jb25maWcucGxhdGZvcm0sIHtcbiAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICBjb250ZXh0OiB7fSxcbiAgICAgICAgICBwbHVnZ2FibGU6IHRoaXMucGx1Z2dhYmxlLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgYm91bmRNZXRob2QgPSBvYmoucnVuTG9naW4uYmluZChvYmopO1xuICAgICAgICBleGVjUHJvbWlzZXMucHVzaCh0aGlzLmNsdXN0ZXIuZXhlY3V0ZSh7fSwgYm91bmRNZXRob2QpKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoZXhlY1Byb21pc2VzKTtcblxuICAgICAgLy8gTWVyZ2UgcmVzdWx0cyBhbmQgbWV0YWRhdGEgcGVyIGtleXdvcmRcbiAgICAgIC8vIGZvciAobGV0IHByb21pc2VSZXR1cm4gb2YgcHJvbWlzZVJldHVybnMpIHtcbiAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKHJlc3VsdHMsIHByb21pc2VSZXR1cm4ucmVzdWx0cyk7XG4gICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihtZXRhZGF0YSwgcHJvbWlzZVJldHVybi5tZXRhZGF0YSk7XG4gICAgICAvLyAgICAgbnVtX3JlcXVlc3RzICs9IHByb21pc2VSZXR1cm4ubnVtX3JlcXVlc3RzO1xuICAgICAgLy8gfVxuICAgIH1cblxuICAgIC8vIGxldCB0aW1lRGVsdGEgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgIC8vIGxldCBtc19wZXJfcmVxdWVzdCA9IHRpbWVEZWx0YS9udW1fcmVxdWVzdHM7XG5cbiAgICAvLyB0aGlzLmxvZ2dlci5pbmZvKGBTY3JhcGVyIHRvb2sgJHt0aW1lRGVsdGF9bXMgdG8gcGVyZm9ybSAke251bV9yZXF1ZXN0c30gcmVxdWVzdHMuYCk7XG4gICAgLy8gdGhpcy5sb2dnZXIuaW5mbyhgT24gYXZlcmFnZSBtcy9yZXF1ZXN0OiAke21zX3Blcl9yZXF1ZXN0fW1zL3JlcXVlc3RgKTtcblxuICAgIC8vIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfcmVzdWx0cykge1xuICAgIC8vICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfcmVzdWx0cyhyZXN1bHRzKTtcbiAgICAvLyB9XG5cbiAgICAvLyBtZXRhZGF0YS5lbGFwc2VkX3RpbWUgPSB0aW1lRGVsdGEudG9TdHJpbmcoKTtcbiAgICAvLyBtZXRhZGF0YS5tc19wZXJfa2V5d29yZCA9IG1zX3Blcl9yZXF1ZXN0LnRvU3RyaW5nKCk7XG4gICAgLy8gbWV0YWRhdGEubnVtX3JlcXVlc3RzID0gbnVtX3JlcXVlc3RzO1xuXG4gICAgLy8gZGVidWcoJ21ldGFkYXRhPSVPJywgbWV0YWRhdGEpO1xuXG4gICAgLy8gaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9tZXRhZGF0YSkge1xuICAgIC8vICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfbWV0YWRhdGEobWV0YWRhdGEpO1xuICAgIC8vIH1cblxuICAgIC8vIGlmICh0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZSkge1xuICAgIC8vICAgICB0aGlzLmxvZ2dlci5pbmZvKGBXcml0aW5nIHJlc3VsdHMgdG8gJHt0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZX1gKTtcbiAgICAvLyAgICAgd3JpdGVfcmVzdWx0cyh0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZSwgSlNPTi5zdHJpbmdpZnkocmVzdWx0cywgbnVsbCwgNCkpO1xuICAgIC8vIH1cblxuICAgIC8vIHJldHVybiB7XG4gICAgLy8gICAgIHJlc3VsdHM6IHJlc3VsdHMsXG4gICAgLy8gICAgIG1ldGFkYXRhOiBtZXRhZGF0YSB8fCB7fSxcbiAgICAvLyB9O1xuICB9XG5cbiAgLypcbiAgICogZ2V0IGRhdGEgdXJsIGZyb20gcGxhdGZvcm1cbiAgICovXG4gIGFzeW5jIHNlYXJjaGRhdGEoc2NyYXBlX2NvbmZpZyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgc2NyYXBlX2NvbmZpZyk7XG5cbiAgICBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuc3RhcnRfYnJvd3Nlcikge1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5jb25maWcucGxhdGZvcm0pXG4gICAgICB0aGlzLnNjcmFwZXIgPSBnZXRTY3JhcGVyKHRoaXMuY29uZmlnLnBsYXRmb3JtLCB7XG4gICAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcbiAgICAgICAgcGx1Z2dhYmxlOiB0aGlzLnBsdWdnYWJsZSxcbiAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxuICAgICAgICB0bXBwYXRoOiB0aGlzLnRtcHBhdGgsXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgdGhpcy5zY3JhcGVyLndvcmtlcnNlYXJjaGRhdGEodGhpcy5wYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRWFjaCBicm93c2VyIHdpbGwgZ2V0IE4vKEsrMSkga2V5d29yZHMgYW5kIHdpbGwgaXNzdWUgTi8oSysxKSAqIE0gdG90YWwgcmVxdWVzdHMgdG8gdGhlIHNlYXJjaCBlbmdpbmUuXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3B1cHBldGVlci9pc3N1ZXMvNjc4XG4gICAgICAvLyBUaGUgcXVlc3Rpb24gaXM6IElzIGl0IHBvc3NpYmxlIHRvIHNldCBwcm94aWVzIHBlciBQYWdlPyBQZXIgQnJvd3Nlcj9cbiAgICAgIC8vIGFzIGZhciBhcyBJIGNhbiBzZWUsIHB1cHBldGVlciBjbHVzdGVyIHVzZXMgdGhlIHNhbWUgcHVwcGV0ZWVyT3B0aW9uc1xuICAgICAgLy8gZm9yIGV2ZXJ5IGJyb3dzZXIgaW5zdGFuY2UuIFdlIHdpbGwgdXNlIG91ciBjdXN0b20gcHVwcGV0ZWVyLWNsdXN0ZXIgdmVyc2lvbi5cbiAgICAgIC8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3Byb3h5LWNoYWluXG4gICAgICAvLyB0aGlzIGFuc3dlciBsb29rcyBuaWNlOiBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3B1cHBldGVlci9pc3N1ZXMvNjc4I2lzc3VlY29tbWVudC0zODkwOTYwNzdcbiAgICAgIGxldCBjaHVua3MgPSBbXTtcbiAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdGhpcy5udW1DbHVzdGVyczsgbisrKSB7XG4gICAgICAgIGNodW5rcy5wdXNoKFtdKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5jb25maWcua2V5d29yZHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgY2h1bmtzW2sgJSB0aGlzLm51bUNsdXN0ZXJzXS5wdXNoKHRoaXMuY29uZmlnLmtleXdvcmRzW2tdKTtcbiAgICAgIH1cblxuICAgICAgZGVidWcoXCJjaHVua3M9JW9cIiwgY2h1bmtzKTtcblxuICAgICAgbGV0IGV4ZWNQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBjaHVua3MubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gXy5jbG9uZSh0aGlzLmNvbmZpZyk7XG4gICAgICAgIGNvbmZpZy5rZXl3b3JkcyA9IGNodW5rc1tjXTtcblxuICAgICAgICB2YXIgb2JqID0gZ2V0U2NyYXBlcih0aGlzLmNvbmZpZy5wbGF0Zm9ybSwge1xuICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgICAgIHBsdWdnYWJsZTogdGhpcy5wbHVnZ2FibGUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBib3VuZE1ldGhvZCA9IG9iai53b3JrZXJzZWFyY2hkYXRhLmJpbmQob2JqKTtcbiAgICAgICAgZXhlY1Byb21pc2VzLnB1c2godGhpcy5jbHVzdGVyLmV4ZWN1dGUoe30sIGJvdW5kTWV0aG9kKSk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGV4ZWNQcm9taXNlcyk7XG5cbiAgICAgIC8vIE1lcmdlIHJlc3VsdHMgYW5kIG1ldGFkYXRhIHBlciBrZXl3b3JkXG4gICAgICAvLyBmb3IgKGxldCBwcm9taXNlUmV0dXJuIG9mIHByb21pc2VSZXR1cm5zKSB7XG4gICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHRzLCBwcm9taXNlUmV0dXJuLnJlc3VsdHMpO1xuICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24obWV0YWRhdGEsIHByb21pc2VSZXR1cm4ubWV0YWRhdGEpO1xuICAgICAgLy8gICAgIG51bV9yZXF1ZXN0cyArPSBwcm9taXNlUmV0dXJuLm51bV9yZXF1ZXN0cztcbiAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvLyBsZXQgdGltZURlbHRhID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAvLyBsZXQgbXNfcGVyX3JlcXVlc3QgPSB0aW1lRGVsdGEvbnVtX3JlcXVlc3RzO1xuXG4gICAgLy8gdGhpcy5sb2dnZXIuaW5mbyhgU2NyYXBlciB0b29rICR7dGltZURlbHRhfW1zIHRvIHBlcmZvcm0gJHtudW1fcmVxdWVzdHN9IHJlcXVlc3RzLmApO1xuICAgIC8vIHRoaXMubG9nZ2VyLmluZm8oYE9uIGF2ZXJhZ2UgbXMvcmVxdWVzdDogJHttc19wZXJfcmVxdWVzdH1tcy9yZXF1ZXN0YCk7XG5cbiAgICAvLyBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX3Jlc3VsdHMpIHtcbiAgICAvLyAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX3Jlc3VsdHMocmVzdWx0cyk7XG4gICAgLy8gfVxuXG4gICAgLy8gbWV0YWRhdGEuZWxhcHNlZF90aW1lID0gdGltZURlbHRhLnRvU3RyaW5nKCk7XG4gICAgLy8gbWV0YWRhdGEubXNfcGVyX2tleXdvcmQgPSBtc19wZXJfcmVxdWVzdC50b1N0cmluZygpO1xuICAgIC8vIG1ldGFkYXRhLm51bV9yZXF1ZXN0cyA9IG51bV9yZXF1ZXN0cztcblxuICAgIC8vIGRlYnVnKCdtZXRhZGF0YT0lTycsIG1ldGFkYXRhKTtcblxuICAgIC8vIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfbWV0YWRhdGEpIHtcbiAgICAvLyAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX21ldGFkYXRhKG1ldGFkYXRhKTtcbiAgICAvLyB9XG5cbiAgICAvLyBpZiAodGhpcy5jb25maWcub3V0cHV0X2ZpbGUpIHtcbiAgICAvLyAgICAgdGhpcy5sb2dnZXIuaW5mbyhgV3JpdGluZyByZXN1bHRzIHRvICR7dGhpcy5jb25maWcub3V0cHV0X2ZpbGV9YCk7XG4gICAgLy8gICAgIHdyaXRlX3Jlc3VsdHModGhpcy5jb25maWcub3V0cHV0X2ZpbGUsIEpTT04uc3RyaW5naWZ5KHJlc3VsdHMsIG51bGwsIDQpKTtcbiAgICAvLyB9XG5cbiAgICAvLyByZXR1cm4ge1xuICAgIC8vICAgICByZXN1bHRzOiByZXN1bHRzLFxuICAgIC8vICAgICBtZXRhZGF0YTogbWV0YWRhdGEgfHwge30sXG4gICAgLy8gfTtcbiAgfVxuXG4gIC8qXG4gICAqIFF1aXQgdGhlIHB1cHBldGVlciBjbHVzdGVyL2Jyb3dzZXIuXG4gICAqL1xuICBhc3luYyBxdWl0KCkge1xuICAgIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5jbG9zZV9icm93c2VyKSB7XG4gICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5jbG9zZV9icm93c2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHRoaXMuY2x1c3Rlci5pZGxlKCk7XG4gICAgICBhd2FpdCB0aGlzLmNsdXN0ZXIuY2xvc2UoKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNjcmFwZU1hbmFnZXI6IFNjcmFwZU1hbmFnZXIsXG59O1xuIiwiZXhwb3J0IHsgfTtcbmNvbnN0IGF4aW9zID0gcmVxdWlyZShcImF4aW9zXCIpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdSZW1vdGVTb3VyY2U6UmVtb3RlU291cmNlJyk7XG5jb25zdCBGb3JtRGF0YSA9IHJlcXVpcmUoJ2Zvcm0tZGF0YScpO1xudHlwZSBzb3NldHRpbmcgPSB7XG4gIHNvdHlwZTogc3RyaW5nO1xuICBzb2NpYWx1c2VyOiBzdHJpbmc7XG4gIHNvY2lhbHBhc3M6IHN0cmluZztcbiAgcHJveHk6IHtcbiAgICBwcm94eTogc3RyaW5nO1xuICAgIHVzZXI6IHN0cmluZztcbiAgICBwYXNzOiBzdHJpbmc7XG4gIH0sXG59XG5leHBvcnQgdHlwZSBMaW5rZGF0YSA9IHtcbiAgdGl0bGU6IHN0cmluZyxcbiAgdXJsOiBzdHJpbmcsXG4gIGNvbnRlbnQ/OiBzdHJpbmcsXG4gIGxhbmc6IHN0cmluZyxcbiAgc29jaWFsdGFza19pZDogbnVtYmVyLFxufVxudHlwZSBzb2NpYWxUYXNrID0ge1xuICBpZDogbnVtYmVyLFxuICBjYW1wYWlnbl9pZDogbnVtYmVyLFxuICBjYW1wYWlnbl9uYW1lOiBzdHJpbmcsXG4gIHRhZzogc3RyaW5nLFxuICB0eXBlOiBzdHJpbmcsXG4gIGtleXdvcmRzOiBBcnJheTxzdHJpbmc+LFxufVxudHlwZSBjb25maWdUeXBlID0ge1xuICBSRU1PVEVBREQ6IHN0cmluZyxcbiAgUkVNT1RFVVNFUk5BTUU6IHN0cmluZyxcbiAgUkVNT1RFUEFTU1dPUkQ6IHN0cmluZyxcbn1cbmV4cG9ydCBjbGFzcyBSZW1vdGVTb3VyY2Uge1xuICBSRU1PVEVBREQ6IHN0cmluZztcbiAgUkVNT1RFVVNFUk5BTUU6IHN0cmluZztcbiAgUkVNT1RFUEFTU1dPUkQ6IHN0cmluZztcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5yZWFkZW52KCk7XG4gICAgdGhpcy5SRU1PVEVBREQgPSBjb25maWcuUkVNT1RFQUREO1xuICAgIHRoaXMuUkVNT1RFVVNFUk5BTUUgPSBjb25maWcuUkVNT1RFVVNFUk5BTUU7XG4gICAgdGhpcy5SRU1PVEVQQVNTV09SRCA9IGNvbmZpZy5SRU1PVEVQQVNTV09SRDtcbiAgfVxuXG5cbiAgcmVhZGVudigpOiBjb25maWdUeXBlIHtcbiAgICAvL3JlYWQgY29uZmlnIGZyb20gLmVudiBmaWxlXG4gICAgbGV0IGVudmNvZmlnID0gdGhpcy5yZWFkQ29uZmlnKCk7XG4gICAgZGVidWcoZW52Y29maWcpXG4gICAgLy9jaGVjayBrZXkgZXhpc3QgaW4gb2JqZWN0XG4gICAgaWYgKCFlbnZjb2ZpZy5oYXNPd25Qcm9wZXJ0eShcIlJFTU9URUFERFwiKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBSRU1PVEVBREQgbm90IGZvdW5kIGluIC5lbnYgZmlsZWApO1xuICAgIH1cbiAgICBpZiAoIWVudmNvZmlnLmhhc093blByb3BlcnR5KFwiUkVNT1RFVVNFUk5BTUVcIikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVVNFUk5BTUUgbm90IGZvdW5kIGluIC5lbnYgZmlsZWApO1xuICAgIH1cbiAgICBpZiAoIWVudmNvZmlnLmhhc093blByb3BlcnR5KFwiUkVNT1RFUEFTU1dPUkRcIikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUEFTU1dPUkQgbm90IGZvdW5kIGluIC5lbnYgZmlsZWApO1xuICAgIH1cbiAgICByZXR1cm4gZW52Y29maWcgYXMgY29uZmlnVHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZWFkIGNvbmZpZyBmcm9tIC5lbnYgRmlsZVxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBjb25maWdcbiAgICogKi9cbiAgcmVhZENvbmZpZygpOiBvYmplY3Qge1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlcXVpcmUoXCJkb3RlbnZcIikuY29uZmlnKCk7XG4gICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgdGhyb3cgcmVzdWx0LmVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LnBhcnNlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgcmVzcG9uc2UgZnJvbSByZW1vdGUgc2Vydml2ZVxuICAgKiBAcmV0dXJuIG9iamVjdFxuICAgKi9cbiAgYXN5bmMgZ2V0UmVtb3RlQ29uZmlnKGNhbXBhaWduSWQpOiBQcm9taXNlPHNvc2V0dGluZz4ge1xuICAgIC8vIGxldCBlbnZjb25maWcgPSBhd2FpdCByZWFkZW52KCk7XG5cbiAgICBsZXQgc29zZXR2YXIgPSBhd2FpdCBheGlvc1xuICAgICAgLmdldCh0aGlzLlJFTU9URUFERCArIFwiL2FwaS9nZXRzb2J5Q2FtLz9jYW1wYWlnbl9pZD1cIiArIGNhbXBhaWduSWQsIHtcbiAgICAgICAgYXV0aDoge1xuICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLlJFTU9URVVTRVJOQU1FLFxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLlJFTU9URVBBU1NXT1JELFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHBhcnNlSW50KHJlcy5zdGF0dXMpICE9IDIwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvZGUgbm90IGVxdWFsIDIwMFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlcy5kYXRhLnN0YXR1cykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvZGUgbm90IGVxdWFsIDIwMFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuc3RhdHVzKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhLnVzZXIpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEucGFzcylcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmRhdGEuZGF0YS5wcm94eSlcbiAgICAgICAgY29uc3Qgc29zZXR0aW5nID0ge1xuICAgICAgICAgIHNvdHlwZTogcmVzLmRhdGEuZGF0YS5zb3R5cGUsXG4gICAgICAgICAgc29jaWFsdXNlcjogcmVzLmRhdGEuZGF0YS51c2VyLFxuICAgICAgICAgIHNvY2lhbHBhc3M6IHJlcy5kYXRhLmRhdGEucGFzcyxcbiAgICAgICAgICBwcm94eToge1xuICAgICAgICAgICAgcHJveHk6IHJlcy5kYXRhLmRhdGEucHJveHkudXJsLFxuICAgICAgICAgICAgdXNlcjogcmVzLmRhdGEuZGF0YS5wcm94eS51c2VyLFxuICAgICAgICAgICAgcGFzczogcmVzLmRhdGEuZGF0YS5wcm94eS5wYXNzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBzb3NldHRpbmc7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHNvc2V0dmFyO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBjYW1wYWlnbiBmcm9tIHJlbW90ZSBzZXJ2aXZlXG4gICAqL1xuICBhc3luYyBnZXRDYW1wYWlnbmxpc3QoKTogUHJvbWlzZTxBcnJheTxzb2NpYWxUYXNrPj4ge1xuICAgIGNvbnN0IGNhbXBpZ25saXN0ID0gYXdhaXQgYXhpb3NcbiAgICAgIC5nZXQodGhpcy5SRU1PVEVBREQgKyBcIi9hcGkvbGlzdHNvdGFza1wiLCB7XG4gICAgICAgIGF1dGg6IHtcbiAgICAgICAgICB1c2VybmFtZTogdGhpcy5SRU1PVEVVU0VSTkFNRSxcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy5SRU1PVEVQQVNTV09SRCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChwYXJzZUludChyZXMuc3RhdHVzKSAhPSAyMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb2RlIG5vdCBlcXVhbCAyMDBcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXMuZGF0YS5kYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YSBub3QgZXhpc3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhLmRhdGEgYXMgQXJyYXk8c29jaWFsVGFzaz47XG5cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvZGUgbm90IGVxdWFsIDIwMFwiKTtcbiAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9KTtcbiAgICByZXR1cm4gY2FtcGlnbmxpc3Q7XG4gIH1cbiAgLyoqXG4gICAqIHNhdmUgbGluayB0byByZW1vdGUgc2Vydml2ZVxuICAgKi9cbiAgYXN5bmMgc2F2ZUxpbmtyZW1vdGUobGluazogTGlua2RhdGEpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIGNvbnN0IEZvcm1EYXRhID0gcmVxdWlyZSgnZm9ybS1kYXRhJyk7XG4gICAgZGVidWcobGluaylcbiAgICBsZXQgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGRhdGEuYXBwZW5kKCd0aXRsZScsIGxpbmsudGl0bGUpO1xuICAgIGlmKGxpbmsuY29udGVudCl7XG4gICAgZGF0YS5hcHBlbmQoJ2NvbnRlbnQnLCBsaW5rLmNvbnRlbnQpO1xuICAgIH1cbiAgICBkYXRhLmFwcGVuZCgndXJsJywgbGluay51cmwpO1xuICAgIGRhdGEuYXBwZW5kKCdsYW5nJywgbGluay5sYW5nKTtcbiAgICBpZihsaW5rLnNvY2lhbHRhc2tfaWQpe1xuICAgIGRhdGEuYXBwZW5kKCdzb2NpYWx0YXNrX2lkJywgbGluay5zb2NpYWx0YXNrX2lkKTtcbiAgICB9XG4gICAgY29uc3QgbGlua0lkPWF3YWl0IGF4aW9zLnBvc3QodGhpcy5SRU1PVEVBREQgKyBcIi9hcGkvc2F2ZXNvbGlua1wiLCBkYXRhLFxuICAgIHtcbiAgICAgIGF1dGg6IHtcbiAgICAgICAgdXNlcm5hbWU6IHRoaXMuUkVNT1RFVVNFUk5BTUUsXG4gICAgICAgIHBhc3N3b3JkOiB0aGlzLlJFTU9URVBBU1NXT1JELFxuICAgICAgfSxcbiAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAvLyBkZWJ1ZyhyZXMpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIHJldHVybiByZXMuZGF0YS5kYXRhIGFzIG51bWJlcjtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbGlua0lkO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBSZW1vdGVTb3VyY2U6IFJlbW90ZVNvdXJjZSxcblxufTtcbiIsImNvbnN0IHsgQnJvd3NlciB9ID0gcmVxdWlyZSgncHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC9jb25jdXJyZW5jeS9idWlsdEluQ29uY3VycmVuY3knKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc2Utc2NyYXBlcjpDdXN0b21Db25jdXJyZW5jeScpO1xuY29uc3QgeyB0aW1lb3V0RXhlY3V0ZSB9ID0gcmVxdWlyZSgncHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC91dGlsJyk7XG5cbmNvbnN0IEJST1dTRVJfVElNRU9VVCA9IDUwMDA7XG5cbmNsYXNzIEN1c3RvbUNvbmN1cnJlbmN5IGV4dGVuZHMgQnJvd3NlciB7XG5cbiAgICBhc3luYyBpbml0KCkge31cbiAgICBhc3luYyBjbG9zZSgpIHt9XG5cbiAgICBhc3luYyB3b3JrZXJJbnN0YW5jZSgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucy5wZXJCcm93c2VyT3B0aW9ucy5zaGlmdCgpO1xuICAgICAgICBkZWJ1ZygnTGF1bmNoIHB1cHBldGVlciBpbnN0YW5jZSB3aXRoIG9wdGlvbnM9JW8nLCBvcHRpb25zKTtcbiAgICAgICAgbGV0IGNocm9tZSA9IGF3YWl0IHRoaXMucHVwcGV0ZWVyLmxhdW5jaChvcHRpb25zKTtcbiAgICAgICAgbGV0IHBhZ2U7XG4gICAgICAgIGxldCBjb250ZXh0O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBqb2JJbnN0YW5jZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRpbWVvdXRFeGVjdXRlKEJST1dTRVJfVElNRU9VVCwgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IGF3YWl0IGNocm9tZS5jcmVhdGVJbmNvZ25pdG9Ccm93c2VyQ29udGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBwYWdlID0gYXdhaXQgY29udGV4dC5uZXdQYWdlKCk7XG4gICAgICAgICAgICAgICAgfSkoKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgY2xvc2U6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRpbWVvdXRFeGVjdXRlKEJST1dTRVJfVElNRU9VVCwgY29udGV4dC5jbG9zZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2xvc2U6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBjaHJvbWUuY2xvc2UoKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlcGFpcjogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdTdGFydGluZyByZXBhaXInKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIHByb2JhYmx5IGZhaWwsIGJ1dCBqdXN0IGluIGNhc2UgdGhlIHJlcGFpciB3YXMgbm90IG5lY2Vzc2FyeVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBjaHJvbWUuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgICAgICAgICAgLy8ganVzdCByZWxhdW5jaCBhcyB0aGVyZSBpcyBvbmx5IG9uZSBwYWdlIHBlciBicm93c2VyXG4gICAgICAgICAgICAgICAgY2hyb21lID0gYXdhaXQgdGhpcy5wdXBwZXRlZXIubGF1bmNoKG9wdGlvbnMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEN1c3RvbUNvbmN1cnJlbmN5OyIsImNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3QgY3J5cHRvID0gcmVxdWlyZShcImNyeXB0b1wiKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbmNvbnN0IGh0dHBzID0gcmVxdWlyZShcImh0dHBzXCIpO1xuY29uc3QgcHJvZ3Jlc3MgPSByZXF1aXJlKFwicHJvZ3Jlc3Mtc3RyZWFtXCIpO1xuXG5jbGFzcyBUYXNrIHtcblx0Y29uc3RydWN0b3IodXJsKSB7XG5cdFx0dGhpcy51cmwgPSB1cmw7XG5cdFx0dGhpcy5maW5pc2hlZCA9IGZhbHNlO1xuXHR9XG59XG5cbmNsYXNzIERvd25sb2FkZXIge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnR5cGUgPSBcIlwiO1xuXHRcdHRoaXMuaWQgPSBcIlwiO1xuXHRcdHRoaXMudXJsID0gXCJcIjtcblx0XHR0aGlzLmFpZCA9IC0xO1xuXHRcdHRoaXMucGlkID0gMTtcblx0XHR0aGlzLmNpZCA9IC0xO1xuXHRcdHRoaXMubmFtZSA9IFwiXCI7XG5cdFx0dGhpcy5saW5rcyA9IFtdO1xuXHRcdHRoaXMudGFza3MgPSBbXTtcblx0fVxuXG5cdGdldFZpZGVvVXJsKHZpZGVvVXJsKSB7XG5cdFx0dGhpcy51cmwgPSBcIlwiO1xuXHRcdGNvbnN0IG1hcHBpbmcgPSB7XG5cdFx0XHRcIkJWXCI6IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL3ZpZGVvL1wiLFxuXHRcdFx0XCJidlwiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS92aWRlby9cIixcblx0XHRcdFwiYXZcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vdmlkZW8vXCIsXG5cdFx0XHRcImVwXCI6IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL2Jhbmd1bWkvcGxheS9cIixcblx0XHRcdFwic3NcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vYmFuZ3VtaS9wbGF5L1wiXG5cdFx0fTtcblx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhtYXBwaW5nKSkge1xuXHRcdFx0aWYgKHZpZGVvVXJsLmluY2x1ZGVzKGtleSkpIHtcblx0XHRcdFx0dGhpcy50eXBlID0ga2V5O1xuXHRcdFx0XHR0aGlzLmlkID0ga2V5ICsgdmlkZW9Vcmwuc3BsaXQoa2V5KVsxXTtcblx0XHRcdFx0dGhpcy51cmwgPSB2YWx1ZSArIHRoaXMuaWQ7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFzeW5jIGdldEFpZCgpIHtcblx0XHRjb25zdCB7IHR5cGUsIHVybCB9ID0gdGhpcztcblx0XHRpZiAoIXVybCkgcmV0dXJuO1xuXHRcdHJldHVybiBmZXRjaCh1cmwpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG5cdFx0XHQudGhlbihyZXN1bHQgPT4ge1xuXHRcdFx0XHRsZXQgZGF0YSA9IHJlc3VsdC5tYXRjaCgvX19JTklUSUFMX1NUQVRFX189KC4qPyk7XFwoZnVuY3Rpb25cXChcXCkvKVsxXTtcblx0XHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiSU5JVElBTCBTVEFURVwiLCBkYXRhKTtcblx0XHRcdFx0aWYgKHR5cGUgPT09IFwiQlZcIiB8fCB0eXBlID09PSBcImJ2XCIgfHwgdHlwZSA9PT0gXCJhdlwiKSB7XG5cdFx0XHRcdFx0dGhpcy5haWQgPSBkYXRhLnZpZGVvRGF0YS5haWQ7XG5cdFx0XHRcdFx0dGhpcy5waWQgPSBwYXJzZUludCh1cmwuc3BsaXQoXCJwPVwiKVsxXSwgMTApIHx8IDE7XG5cdFx0XHRcdFx0dGhpcy5jaWQgPSBkYXRhLnZpZGVvRGF0YS5wYWdlc1t0aGlzLnBpZCAtIDFdLmNpZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICh0eXBlID09PSBcImVwXCIpIHtcblx0XHRcdFx0XHR0aGlzLmFpZCA9IGRhdGEuZXBJbmZvLmFpZDtcblx0XHRcdFx0XHR0aGlzLmNpZCA9IGRhdGEuZXBJbmZvLmNpZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICh0eXBlID09PSBcInNzXCIpIHtcblx0XHRcdFx0XHR0aGlzLmFpZCA9IGRhdGEuZXBMaXN0WzBdLmFpZDtcblx0XHRcdFx0XHR0aGlzLmNpZCA9IGRhdGEuZXBMaXN0WzBdLmNpZDtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChlcnJvciA9PiBzaG93RXJyb3IoXCLojrflj5bop4bpopEgYWlkIOWHuumUme+8gVwiKSk7XG5cdH1cblxuXHRhc3luYyBnZXRJbmZvKCkge1xuXHRcdGNvbnN0IHsgYWlkLCBjaWQgfSA9IHRoaXM7XG5cdFx0aWYgKCFjaWQpIHtcblx0XHRcdHNob3dFcnJvcihcIuiOt+WPluinhumikSBjaWQg5Ye66ZSZ77yBXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQvLyBnZXREYW5tYWt1KCk7IC8v6I635Y+WY2lk5ZCO77yM6I635Y+W5LiL6L296ZO+5o6l5ZKM5by55bmV5L+h5oGvXG5cdFx0cmV0dXJuIGZldGNoKFwiaHR0cHM6Ly9hcGkuYmlsaWJpbGkuY29tL3gvd2ViLWludGVyZmFjZS92aWV3P2FpZD1cIiArIGFpZClcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XHRcdC5jYXRjaChlcnJvciA9PiBzaG93RXJyb3IoXCLojrflj5bop4bpopHkv6Hmga/lh7rplJnvvIFcIikpO1xuXHR9XG5cblx0YXN5bmMgZ2V0RGF0YShmYWxsYmFjaykge1xuXHRcdGNvbnN0IHsgY2lkLCB0eXBlIH0gPSB0aGlzO1xuXHRcdGxldCBwbGF5VXJsO1xuXHRcdGlmIChmYWxsYmFjaykge1xuXHRcdFx0Y29uc3QgcGFyYW1zID0gYGNpZD0ke2NpZH0mbW9kdWxlPW1vdmllJnBsYXllcj0xJnF1YWxpdHk9MTEyJnRzPTFgO1xuXHRcdFx0Y29uc3Qgc2lnbiA9IGNyeXB0by5jcmVhdGVIYXNoKFwibWQ1XCIpLnVwZGF0ZShwYXJhbXMgKyBcIjliMjg4MTQ3ZTU0NzRkZDJhYTY3MDg1ZjcxNmM1NjBkXCIpLmRpZ2VzdChcImhleFwiKTtcblx0XHRcdHBsYXlVcmwgPSBgaHR0cHM6Ly9iYW5ndW1pLmJpbGliaWxpLmNvbS9wbGF5ZXIvd2ViX2FwaS9wbGF5dXJsPyR7cGFyYW1zfSZzaWduPSR7c2lnbn1gO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAodHlwZSA9PT0gXCJCVlwiIHx8IHR5cGUgPT09IFwiYnZcIiB8fCB0eXBlID09PSBcImF2XCIpIHtcblx0XHRcdFx0Y29uc3QgcGFyYW1zID0gYGFwcGtleT1pVkdVVGpzeHZwTGV1RENmJmNpZD0ke2NpZH0mb3R5cGU9anNvbiZxbj0xMTImcXVhbGl0eT0xMTImdHlwZT1gO1xuXHRcdFx0XHRjb25zdCBzaWduID0gY3J5cHRvLmNyZWF0ZUhhc2goXCJtZDVcIikudXBkYXRlKHBhcmFtcyArIFwiYUhSbWhXTUxrZGVNdUlMcU9Sbllab2N3TUJwTUVPZHRcIikuZGlnZXN0KFwiaGV4XCIpO1xuXHRcdFx0XHRwbGF5VXJsID0gYGh0dHBzOi8vaW50ZXJmYWNlLmJpbGliaWxpLmNvbS92Mi9wbGF5dXJsPyR7cGFyYW1zfSZzaWduPSR7c2lnbn1gO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cGxheVVybCA9IGBodHRwczovL2FwaS5iaWxpYmlsaS5jb20vcGdjL3BsYXllci93ZWIvcGxheXVybD9xbj04MCZjaWQ9JHtjaWR9YDtcblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmZXRjaChwbGF5VXJsKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxuXHRcdFx0LnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdFx0Y29uc3QgZGF0YSA9IGZhbGxiYWNrID8gdGhpcy5wYXJzZURhdGEocmVzdWx0KSA6IEpTT04ucGFyc2UocmVzdWx0KTtcblx0XHRcdFx0Y29uc3QgdGFyZ2V0ID0gZGF0YS5kdXJsIHx8IGRhdGEucmVzdWx0LmR1cmw7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiUExBWSBVUkxcIiwgZGF0YSk7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmtzID0gdGFyZ2V0Lm1hcChwYXJ0ID0+IHBhcnQudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhbGxiYWNrLCBkYXRhXG4gICAgICAgICAgICAgICAgICAgIH07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGZhbGxiYWNrKSB0aHJvdyBFcnJvcigpO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldERhdGEodHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRzaG93RXJyb3IoXCLojrflj5YgUGxheVVybCDmiJbkuIvovb3pk77mjqXlh7rplJnvvIHnlLHkuo5C56uZ6ZmQ5Yi277yM5Y+q6IO95LiL6L295L2O5riF5pmw5bqm6KeG6aKR44CCXCIpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRwYXJzZURhdGEodGFyZ2V0KSB7XG5cdFx0Y29uc3QgZGF0YSA9ICQodGFyZ2V0KTtcblx0XHRjb25zdCByZXN1bHQgPSB7fTtcblx0XHRyZXN1bHQuZHVybCA9IFtdO1xuXHRcdHJlc3VsdC5xdWFsaXR5ID0gZGF0YS5maW5kKFwicXVhbGl0eVwiKS50ZXh0KCk7XG5cdFx0ZGF0YS5maW5kKFwiZHVybFwiKS5lYWNoKChpLCBvKSA9PiB7XG5cdFx0XHRjb25zdCBwYXJ0ID0gJChvKTtcblx0XHRcdHJlc3VsdC5kdXJsLnB1c2goe1xuXHRcdFx0XHR1cmw6IHBhcnQuZmluZChcInVybFwiKS50ZXh0KCksXG5cdFx0XHRcdG9yZGVyOiBwYXJ0LmZpbmQoXCJvcmRlclwiKS50ZXh0KCksXG5cdFx0XHRcdGxlbmd0aDogcGFydC5maW5kKFwibGVuZ3RoXCIpLnRleHQoKSxcblx0XHRcdFx0c2l6ZTogcGFydC5maW5kKFwic2l6ZVwiKS50ZXh0KClcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRkb3dubG9hZEJ5SW5kZXgocGFydCwgZmlsZSwgY2FsbGJhY2sgPSAoKSA9PiB7fSkge1xuXHRcdGNvbnN0IHsgdXJsIH0gPSB0aGlzO1xuXG5cdFx0aWYgKHRoaXMudGFza3Muc29tZShpdGVtID0+IGl0ZW0udXJsID09PSB0aGlzLmxpbmtzW3BhcnRdKSkgcmV0dXJuIFwiRFVQTElDQVRFXCI7XG5cdFx0dGhpcy50YXNrcy5wdXNoKG5ldyBUYXNrKHRoaXMubGlua3NbcGFydF0pKTtcblx0XHRsZXQgc3RhdGU7XG5cdFx0dHJ5IHtcblx0XHRcdHN0YXRlID0gZnMuc3RhdFN5bmMoZmlsZSk7XG5cdFx0fVxuXHRcdGNhdGNoIChlcnJvcikge1xuXHRcdH1cblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0dXJsOiB0aGlzLmxpbmtzW3BhcnRdLFxuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcIlJhbmdlXCI6IGBieXRlcz0ke3N0YXRlID8gc3RhdGUuc2l6ZSA6IDB9LWAsIC8v5pat54K557ut5LygXG5cdFx0XHRcdFwiVXNlci1BZ2VudFwiOiBcIk1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85MC4wLjQ0MzAuMjEyIFNhZmFyaS81MzcuMzZcIixcblx0XHRcdFx0XCJSZWZlcmVyXCI6IHVybFxuXHRcdFx0fVxuXHRcdH07XG5cdFx0Y29uc3Qgc3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZmlsZSwgc3RhdGUgPyB7IGZsYWdzOiBcImFcIiB9IDoge30pO1xuXHRcdHRoaXMuZG93bmxvYWQob3B0aW9ucywgc3RyZWFtLCBjYWxsYmFjayk7XG5cblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRkb3dubG9hZChvcHRpb25zLCBzdHJlYW0sIGNhbGxiYWNrKSB7XG5cdFx0Ly8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvcHJvZ3Jlc3Mtc3RyZWFtXG5cdFx0Y29uc3QgaW5kZXggPSB0aGlzLnRhc2tzLmZpbmRJbmRleChpdGVtID0+IGl0ZW0udXJsID09PSBvcHRpb25zLnVybCk7XG5cdFx0Y29uc3QgcHJvU3RyZWFtID0gcHJvZ3Jlc3Moe1xuXHRcdFx0dGltZTogMjUwIC8v5Y2V5L2NbXNcblx0XHR9KS5vbihcInByb2dyZXNzXCIsIHByb2dyZXNzID0+IHtcblx0XHRcdGNvbnN0IHsgcGVyY2VudGFnZSB9ID0gcHJvZ3Jlc3M7IC8v5pi+56S66L+b5bqm5p2hXG5cdFx0XHRpZiAocGVyY2VudGFnZSA9PT0gMTAwKSB7XG5cdFx0XHRcdHRoaXMudGFza3NbaW5kZXhdLmZpbmlzaGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGNhbGxiYWNrKHByb2dyZXNzLCBpbmRleCk7XG5cdFx0fSk7XG5cblx0XHRsZXQgeyB1cmwgfSA9IG9wdGlvbnM7XG5cdFx0ZnVuY3Rpb24gZG93bmxvYWRMaW5rKHVybCkge1xuXHRcdFx0KHVybC5zdGFydHNXaXRoKFwiaHR0cHNcIikgPyBodHRwcyA6IGh0dHApLmdldCh1cmwsIG9wdGlvbnMsIHJlcyA9PiB7XG5cdFx0XHRcdGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMzAyKSB7XG5cdFx0XHRcdFx0dXJsID0gcmVzLmhlYWRlcnMubG9jYXRpb247XG5cdFx0XHRcdFx0cmV0dXJuIGRvd25sb2FkTGluayh1cmwpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHByb1N0cmVhbS5zZXRMZW5ndGgocmVzLmhlYWRlcnNbXCJjb250ZW50LWxlbmd0aFwiXSk7XG5cdFx0XHRcdC8v5YWIcGlwZeWIsHByb1N0cmVhbeWGjXBpcGXliLDmlofku7bnmoTlhpnlhaXmtYHkuK1cblx0XHRcdFx0cmVzLnBpcGUocHJvU3RyZWFtKS5waXBlKHN0cmVhbSkub24oXCJlcnJvclwiLCBlcnJvciA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGRvd25sb2FkTGluayh1cmwpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBUYXNrLCBEb3dubG9hZGVyIH07XG4iLCIvL3Njcm9sbCBkb3duIHRvIHRoZSBib3R0b20gb2YgdGhlIHBhZ2VcbmFzeW5jIGZ1bmN0aW9uIGF1dG9TY3JvbGwocGFnZSl7XG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZShhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB2YXIgdG90YWxIZWlnaHQgPSAwO1xuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gMTAwO1xuICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsQnkoMCwgZGlzdGFuY2UpO1xuICAgICAgICAgICAgICAgIHRvdGFsSGVpZ2h0ICs9IGRpc3RhbmNlO1xuXG4gICAgICAgICAgICAgICAgaWYodG90YWxIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGRlbGF5KHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkgeyBcbiAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCB0aW1lKVxuICAgIH0pO1xuIH1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXV0b1Njcm9sbDphdXRvU2Nyb2xsLFxuICAgIGRlbGF5OmRlbGF5XG59IiwiZnVuY3Rpb24gd2VicGFja0VtcHR5Q29udGV4dChyZXEpIHtcblx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdHRocm93IGU7XG59XG53ZWJwYWNrRW1wdHlDb250ZXh0LmtleXMgPSAoKSA9PiAoW10pO1xud2VicGFja0VtcHR5Q29udGV4dC5yZXNvbHZlID0gd2VicGFja0VtcHR5Q29udGV4dDtcbndlYnBhY2tFbXB0eUNvbnRleHQuaWQgPSBcIi4vc3JjIHN5bmMgcmVjdXJzaXZlXCI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXJncGFyc2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hlZXJpb1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlsZW5hbWlmeVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmb3JtLWRhdGFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJvZ3Jlc3Mtc3RyZWFtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItY2x1c3RlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItY2x1c3Rlci9kaXN0L2NvbmN1cnJlbmN5L2J1aWx0SW5Db25jdXJyZW5jeVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItY2x1c3Rlci9kaXN0L3V0aWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVzZXItYWdlbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3J1bi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==