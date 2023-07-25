/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/app-root-path/browser-shim.js":
/*!****************************************************!*\
  !*** ./node_modules/app-root-path/browser-shim.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.path = (__webpack_require__(/*! path */ "path").dirname)(__webpack_require__.c[__webpack_require__.s].filename);

exports.resolve = function(pathToModule) {
	return exports.path + pathToModule;
};

exports.require = function(pathToModule) {
	var r =  true
		? require
		: 0;
	return r(exports.resolve(pathToModule));
};

exports.toString = function() {
	return exports.path;
};

exports.setPath = function(explicitlySetPath) {
	exports.path = explicitlySetPath;
};

/***/ }),

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
exports.Downloadvideo = exports.Searchdata = exports.Login = void 0;
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
function Downloadvideo(browser_config, scrape_config) {
    return __awaiter(this, void 0, void 0, function () {
        var scraper;
        return __generator(this, function (_a) {
            Object.assign(browser_config, scrape_config);
            scraper = new node_socialmk_1.ScrapeManager(browser_config);
            return [2 /*return*/];
        });
    });
}
exports.Downloadvideo = Downloadvideo;
// module.exports = {
//   searchdata: Searchdata,
//   login: Login,
//   // ytblogin:ytblogin,
//   ScrapeManager: ScrapeManager,
//   // Scraper: Scraper,
// };


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
var puppeteer_1 = __webpack_require__(/*! puppeteer */ "puppeteer");
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
                        if (e_1 instanceof puppeteer_1.errors.TimeoutError) {
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
    BilibiliScraper.prototype.downloadSigleVideo = function (link, videopath) {
        return __awaiter(this, void 0, void 0, function () {
            var downloader, videores, filename, _a, data, fallback, target, quality, qualityArray, videoQuantity;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        downloader = new Downloader();
                        downloader.getVideoUrl(link);
                        if (!downloader.url) {
                            throw new Error("video url invalid");
                        }
                        return [4 /*yield*/, downloader.getAid()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, downloader.getInfo()];
                    case 2:
                        videores = _b.sent();
                        debug("VIDEO INFO", videores);
                        filename = videores.data.title;
                        return [4 /*yield*/, downloader.getData()];
                    case 3:
                        _a = _b.sent(), data = _a.data, fallback = _a.fallback;
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
var appRoot = __webpack_require__(/*! app-root-path */ "./node_modules/app-root-path/browser-shim.js");
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
                        remoteSourmodel = remotesource_1.RemoteSource.getInstance();
                        debug(links);
                        //handle the links
                        links === null || links === void 0 ? void 0 : links.map(function (linkItem) { return __awaiter(_this, void 0, void 0, function () {
                            var linkobj, error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        linkobj = { title: linkItem.title, url: linkItem.link, lang: linkItem.lang, socialtask_id: linkItem.taskid };
                                        debug(linkobj);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, remoteSourmodel.saveLinkremote(linkobj)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_1 = _a.sent();
                                        console.error(error_1);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * download video
     */
    SocialScraper.prototype.downloadvideo = function (list) {
        return __awaiter(this, void 0, void 0, function () {
            var videosavepath, linkitem;
            return __generator(this, function (_a) {
                videosavepath = resolve(appRoot + "/tmp/" + scrape_config.platform + "/" + sosetting.socialuser);
                for (linkitem in list) {
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * download single video
     * @param string link
     * @param string videopath
     */
    SocialScraper.prototype.downloadSigleVideo = function (link, videopath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
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
    RemoteSource.getInstance = function () {
        if (!RemoteSource.instance) {
            RemoteSource.instance = new RemoteSource();
        }
        return RemoteSource.instance;
    };
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
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxtQkFBbUI7Ozs7Ozs7Ozs7O0FDbE1uQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9ub2RlX21vZHVsZXMvYXBwLXJvb3QtcGF0aC9icm93c2VyLXNoaW0uanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL2luZGV4LnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9iaWxpYmlsaV9zY3JhcGVyLnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9mYWNlYm9va19zY3JhcGVyLnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9tZXRhZGF0YS50cyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvc29jaWFsX3NjcmFwZXIudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL3lvdXR1YmVfc2NyYXBlci50cyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL25vZGVfc29jaWFsbWsudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9yZW1vdGVzb3VyY2UudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9jb25jdXJyZW5jeS1pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvYmlsaWJpbGkvZG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvbGliL2Z1bmN0aW9uLmpzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvIHN5bmMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImNoZWVyaW9cIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwiZGVidWdcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImZpbGVuYW1pZnlcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwiZm9ybS1kYXRhXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImxvZGFzaFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInByb2dyZXNzLXN0cmVhbVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwdXBwZXRlZXJcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXJcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC9jb25jdXJyZW5jeS9idWlsdEluQ29uY3VycmVuY3lcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC91dGlsXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInB1cHBldGVlci1leHRyYVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJ1c2VyLWFnZW50c1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJ3aW5zdG9uXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwib3NcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLnBhdGggPSByZXF1aXJlKCdwYXRoJykuZGlybmFtZShyZXF1aXJlLm1haW4uZmlsZW5hbWUpO1xuXG5leHBvcnRzLnJlc29sdmUgPSBmdW5jdGlvbihwYXRoVG9Nb2R1bGUpIHtcblx0cmV0dXJuIGV4cG9ydHMucGF0aCArIHBhdGhUb01vZHVsZTtcbn07XG5cbmV4cG9ydHMucmVxdWlyZSA9IGZ1bmN0aW9uKHBhdGhUb01vZHVsZSkge1xuXHR2YXIgciA9ICdmdW5jdGlvbicgPT09IHR5cGVvZiBfX3dlYnBhY2tfcmVxdWlyZV9fXG5cdFx0PyBfX25vbl93ZWJwYWNrX3JlcXVpcmVfX1xuXHRcdDogcmVxdWlyZTtcblx0cmV0dXJuIHIoZXhwb3J0cy5yZXNvbHZlKHBhdGhUb01vZHVsZSkpO1xufTtcblxuZXhwb3J0cy50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gZXhwb3J0cy5wYXRoO1xufTtcblxuZXhwb3J0cy5zZXRQYXRoID0gZnVuY3Rpb24oZXhwbGljaXRseVNldFBhdGgpIHtcblx0ZXhwb3J0cy5wYXRoID0gZXhwbGljaXRseVNldFBhdGg7XG59OyIsImltcG9ydCB7IGRlYnVnIH0gZnJvbSBcImNvbnNvbGVcIjtcbmltcG9ydCB7U2NyYXBlTWFuYWdlcn0gZnJvbSBcIi4vc3JjL25vZGVfc29jaWFsbWtcIjtcbi8vIHZhciBTY3JhcGVyID0gcmVxdWlyZShcIi4vc3JjL21vZHVsZXMvc29jaWFsX3NjcmFwZXJcIik7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBMb2dpbihicm93c2VyX2NvbmZpZzpvYmplY3QsIHNjcmFwZV9jb25maWc6b2JqZWN0KSB7XG4gIC8vIHNjcmFwZSBjb25maWcgb3ZlcndyaXRlcyB0aGUgYnJvd3Nlcl9jb25maWdcbiAgT2JqZWN0LmFzc2lnbihicm93c2VyX2NvbmZpZywgc2NyYXBlX2NvbmZpZyk7XG5cbiAgdmFyIHNjcmFwZXIgPSBuZXcgU2NyYXBlTWFuYWdlcihicm93c2VyX2NvbmZpZyk7XG4gIC8vIHZhciByZW1vdGVDb25maWc9YXdhaXQgc2NyYXBlci5nZXRSZW1vdGVDb25maWcoKTtcbiAgYXdhaXQgc2NyYXBlci5zdGFydCgpO1xuXG4gIHZhciByZXN1bHRzID0gYXdhaXQgc2NyYXBlci5sb2dpbihzY3JhcGVfY29uZmlnKTtcblxuICBhd2FpdCBzY3JhcGVyLnF1aXQoKTtcblxuICByZXR1cm4gcmVzdWx0cztcbn1cbi8vZ2V0IGRhdGEgdXJsc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFNlYXJjaGRhdGEoYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpIHtcbiAgLy8gc2NyYXBlIGNvbmZpZyBvdmVyd3JpdGVzIHRoZSBicm93c2VyX2NvbmZpZ1xuICBPYmplY3QuYXNzaWduKGJyb3dzZXJfY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcbiAgLy8gZGVidWcoYnJvd3Nlcl9jb25maWcpXG4gIHZhciBzY3JhcGVyID0gbmV3IFNjcmFwZU1hbmFnZXIoYnJvd3Nlcl9jb25maWcpO1xuICAvLyB2YXIgcmVtb3RlQ29uZmlnPWF3YWl0IHNjcmFwZXIuZ2V0UmVtb3RlQ29uZmlnKCk7XG4gIGF3YWl0IHNjcmFwZXIuc3RhcnQoKTtcbiAgYXdhaXQgc2NyYXBlci5zZWFyY2hkYXRhKHNjcmFwZV9jb25maWcpO1xuXG4gIGF3YWl0IHNjcmFwZXIucXVpdCgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gRG93bmxvYWR2aWRlbyhicm93c2VyX2NvbmZpZywgc2NyYXBlX2NvbmZpZykge1xuICBPYmplY3QuYXNzaWduKGJyb3dzZXJfY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcbiAgdmFyIHNjcmFwZXIgPSBuZXcgU2NyYXBlTWFuYWdlcihicm93c2VyX2NvbmZpZyk7XG4gIFxufVxuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IHtcbi8vICAgc2VhcmNoZGF0YTogU2VhcmNoZGF0YSxcbi8vICAgbG9naW46IExvZ2luLFxuLy8gICAvLyB5dGJsb2dpbjp5dGJsb2dpbixcbi8vICAgU2NyYXBlTWFuYWdlcjogU2NyYXBlTWFuYWdlcixcbi8vICAgLy8gU2NyYXBlcjogU2NyYXBlcixcbi8vIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgY2hlZXJpbyA9IHJlcXVpcmUoXCJjaGVlcmlvXCIpO1xuaW1wb3J0IHsgU29jaWFsU2NyYXBlciBhcyBTY3JhcGVyLCBMaW5rdXJsLCBTY3JhcGVPcHRpb25zLCBTZWFyY2hvYmplY3R9IGZyb20gXCIuL3NvY2lhbF9zY3JhcGVyXCI7XG5jb25zdCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcbmNvbnN0IHsgRG93bmxvYWRlciB9ID0gcmVxdWlyZShcIi4vYmlsaWJpbGkvZG93bmxvYWRlci5qc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IHNhbml0aXplID0gcmVxdWlyZShcImZpbGVuYW1pZnlcIik7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKShcImJpbGliaWxpLXNjcmFwZXI6U2NyYXBlclwiKTtcbmNvbnN0IHsgYXV0b1Njcm9sbCwgZGVsYXkgfSA9IHJlcXVpcmUoXCIuL2xpYi9mdW5jdGlvbi5qc1wiKTtcbmltcG9ydCB7RWxlbWVudEhhbmRsZSxQYWdlLGVycm9ycyBhcyBQdXBwZXRlZXJlcnJvcn0gZnJvbSAncHVwcGV0ZWVyJztcblxuXG50eXBlIGNsaWNrYnRuc2Vyb2JqID0ge1xuICBwYWdlOiBQYWdlLFxuICBrZXl3b3JkOiBzdHJpbmdcbn1cbi8vIGltcG9ydCBmaWxlbmFtaWZ5IGZyb20gJ2ZpbGVuYW1pZnknO1xuLy8gY29uc3QgeyBsYXVuY2gsIGdldFN0cmVhbSB9ID0gcmVxdWlyZShcInB1cHBldGVlci1zdHJlYW1cIik7XG4vLyBjb25zdCBQdXBwZXRlZXJWaWRlb1JlY29yZGVyID0gcmVxdWlyZSgncHVwcGV0ZWVyLXZpZGVvLXJlY29yZGVyJyk7XG5leHBvcnQgY2xhc3MgQmlsaWJpbGlTY3JhcGVyIGV4dGVuZHMgU2NyYXBlciB7XG4gIHN0YXJ0VXJsOiBzdHJpbmc7XG4gIFxuICBjb25zdHJ1Y3RvcihhcmdzOiBTY3JhcGVPcHRpb25zKSB7XG4gICAgc3VwZXIoYXJncyk7XG4gICAgdGhpcy5zdGFydFVybCA9IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tXCI7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy50YXNraWQpXG4gICAgLy8gZGVidWcoc2VsZi50YXNraWQpXG4gIH1cbiAgYXN5bmMgbG9hZF9zdGFydF9wYWdlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGRlYnVnKFwibG9hZCBzdGFydCBwYWdlXCIpXG5cbiAgfVxuICAvL2xvZ2luIGludG8gYmlsaWJpbGlcbiAgYXN5bmMgbWFrZWxvZ2luYWN0aW9uKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIC8vIGxldCBzdGFydFVybCA9IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tXCI7XG5cbiAgICB0aGlzLmxvZ2dlci5pbmZvKFwiVXNpbmcgbG9naW5Vcmw6IFwiICsgdGhpcy5zdGFydFVybCk7XG4gICAgYXdhaXQgdGhpcy5wYWdlLnNldEJ5cGFzc0NTUCh0cnVlKTtcbiAgICB0aGlzLmxhc3RfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnBhZ2UuZ290byh0aGlzLnN0YXJ0VXJsKTtcblxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJsb2dpbiBzdWNjZXNzLCBjb29raWVzIGhhcyBiZWVuIHNhdmUgYXQgXCIgKyB0aGlzLmNvbmZpZy50bXBwYXRoXG4gICAgKTtcbiAgICAvL2NsaWNrIGxvZ2luIGJ0blxuICAgIGF3YWl0IHRoaXMucGFnZS5jbGljayhcIi5oZWFkZXItbG9naW4tZW50cnlcIik7XG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLmV2YWx1YXRlKF8gPT4ge1xuICAgIC8vIHZhciBpY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvXCIpO1xuICAgIC8vIGljb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIC8vIH0pO1xuICAgIC8vd2FpdCBsb2dpbiBib3ggc2hvd1xuICAgIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoXCIuYmlsaS1taW5pLWNvbnRlbnQtd3BcIiwge1xuICAgICAgdGltZW91dDogdGhpcy5TVEFOREFSRF9USU1FT1VULFxuICAgIH0pO1xuICAgIC8vY2xpY2sgbG9naW4gYnkgc21zXG4gICAgY29uc3QgW2J1dHRvbl0gPSBhd2FpdCB0aGlzLnBhZ2UuJHgoXCIvL2Rpdltjb250YWlucyguLCAnIOefreS/oeeZu+W9lSAnKV1cIik7XG4gICAgaWYgKGJ1dHRvbikge1xuICAgICAgYXdhaXQgKGJ1dHRvbiBhcyBFbGVtZW50SGFuZGxlPEVsZW1lbnQ+KS5jbGljaygpO1xuICAgIH1cbiAgICAvL2F3YWl0IGZvciB1c2VyIHRvIHRha2UgYWN0aW9uXG4gICAgYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcihcIi5oZWFkZXItZW50cnktbWluaVwiLCB7IHRpbWVvdXQ6IDAgfSk7XG4gICAgLy91c2VyIGhhcyBzdWNjZXNzIGxvZ2luXG4gICAgLy9zYXZlIGNvb2tpZXNcbiAgICBjb25zdCBjb29raWVzID0gYXdhaXQgdGhpcy5wYWdlLmNvb2tpZXMoKTtcblxuICAgIGF3YWl0IGZzLndyaXRlRmlsZShcbiAgICAgIHRoaXMuY29uZmlnLnRtcHBhdGggKyBcIi9jb29raWVzLmpzb25cIixcbiAgICAgIEpTT04uc3RyaW5naWZ5KGNvb2tpZXMsIG51bGwsIDIpLFxuICAgICAgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICBhd2FpdCB0aGlzLnBhZ2UuY2xvc2UoKTtcbiAgICAvLyBhd2FpdCB0aGlzLmJyb3dzZXJzLmNsb3NlKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHZpZGVvIGxpc3QgcGFnZVxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5d29yZFxuICAgKiBAcmV0dXJucyBlbGVtZW50XG4gICAqL1xuICBhc3luYyBjbGlja1NlYXJjaGJ0bihzZWFyb2JqOiBjbGlja2J0bnNlcm9iaik6UHJvbWlzZTxFbGVtZW50SGFuZGxlPEVsZW1lbnQ+PiB7XG4gICAgaWYgKHNlYXJvYmoucGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gc2Vhcm9iai5wYWdlO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmluZm8oXCJVc2luZyBsb2dpblVybDogXCIgKyB0aGlzLnN0YXJ0VXJsKTtcbiAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0QnlwYXNzQ1NQKHRydWUpO1xuICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IGF3YWl0IHRoaXMucGFnZS5nb3RvKHRoaXMuc3RhcnRVcmwpO1xuICAgIGF3YWl0IHRoaXMucGFnZS50eXBlKFwiLm5hdi1zZWFyY2gtaW5wdXRcIiwgc2Vhcm9iai5rZXl3b3JkKTtcbiAgICAvLyBhd2FpdCB0aGlzLnBhZ2UuJGV2YWwoXCIubmF2LXNlYXJjaC1pbnB1dFwiLCBmdW5jdGlvbiAoa2V5d29yZCkge1xuICAgIC8vICAgdGhpcy52YWx1ZSA9IGtleXdvcmQ7XG4gICAgLy8gfSk7XG4gICAgLy8gYXdhaXQgcGFnZS4kZXZhbCgnLm5hdi1zZWFyY2gtaW5wdXQnLCBlbCA9PiBlbC52YWx1ZSA9IFwiXCIpO1xuICAgIGNvbnN0IHNlYXJjaGJ0biA9IGF3YWl0IHRoaXMucGFnZS4kKFwiLm5hdi1zZWFyY2gtYnRuXCIpO1xuICAgIGlmIChzZWFyY2hidG4pIHtcbiAgICAgIGF3YWl0IHNlYXJjaGJ0bi5jbGljaygpO1xuICAgIH1cbiAgICByZXR1cm4gc2VhcmNoYnRuO1xuICB9XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5d29yZFxuICAgKiBAcmV0dXJucyBhcnJheVxuICAgKi9cbiAgYXN5bmMgc2VhcmNoZGF0YShzZWFyb2JqOiBTZWFyY2hvYmplY3QpOiBQcm9taXNlPEFycmF5PG9iamVjdD4+IHtcbiAgICBpZiAoc2Vhcm9iai5wYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBzZWFyb2JqLnBhZ2U7XG4gICAgfVxuICAgIGxldCByZXN1bHQ6IEFycmF5PG9iamVjdD4gPSBbXVxuICAgIGlmIChBcnJheS5pc0FycmF5KHNlYXJvYmoua2V5d29yZCkpIHtcbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBzZWFyb2JqLmtleXdvcmQpIHtcbiAgICAgICAgbGV0IHN1YnNlYXJvYmc6IFNlYXJjaG9iamVjdCA9IHsgcGFnZTogdGhpcy5wYWdlLCBrZXl3b3JkOiBlbGVtZW50IH1cbiAgICAgICAgbGV0IGxpbmtyZXMgPSBhd2FpdCB0aGlzLmdldFZpZGVvdXJscyhzdWJzZWFyb2JnKTtcbiAgICAgICAgZGVidWcobGlua3JlcylcbiAgICAgICAgZm9yIChjb25zdCBsaW5rIG9mIGxpbmtyZXMpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChsaW5rKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWFyb2JqLmtleXdvcmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgc2Vyc2Vhcm9iZzogU2VhcmNob2JqZWN0ID0geyBwYWdlOiB0aGlzLnBhZ2UsIGtleXdvcmQ6IHNlYXJvYmoua2V5d29yZCB9XG4gICAgICBsZXQgbGlua3JlcyA9IGF3YWl0IHRoaXMuZ2V0VmlkZW91cmxzKHNlcnNlYXJvYmcpO1xuICAgICAgZm9yIChjb25zdCBsaW5rIG9mIGxpbmtyZXMpIHtcblxuICAgICAgICByZXN1bHQucHVzaChsaW5rcmVzKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gICAgLy8gcmV0dXJuIGF3YWl0IHRoaXMuZ2V0VmlkZW91cmxzKHsgcGFnZTogdGhpcy5wYWdlLCBrZXl3b3JkOiBrZXl3b3JkIH0pO1xuICB9XG4gIC8vZ2V0IHZpZGVvIHVybCByZXR1cm4gaW4gYXJyYXlcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0LHN0cmluZyxzdHJpbmd9XG4gICAqIEByZXR1cm5zIGFycmF5XG4gICAqL1xuICBhc3luYyBnZXRWaWRlb3VybHMoc2Vyb2JqOiBTZWFyY2hvYmplY3QpOiBQcm9taXNlPEFycmF5PExpbmt1cmw+PiB7XG4gICAgaWYgKHNlcm9iai5wYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBzZXJvYmoucGFnZTtcbiAgICB9XG4gICAgaWYgKHNlcm9iai5jb29raWVzUGF0aCkge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHNlcm9iai5jb29raWVzUGF0aCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBjb29raWVzIGZpbGUgYXQgJHtzZXJvYmouY29va2llc1BhdGh9YCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBjb29raWVzID0gSlNPTi5wYXJzZShhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShzZXJvYmouY29va2llc1BhdGgpKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGNvb2tpZXMpO1xuICAgICAgYXdhaXQgdGhpcy5wYWdlLnNldENvb2tpZSguLi5jb29raWVzKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNlcm9iai5rZXl3b3JkID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaGFuZGxlU2VhcmNoKHsgcGFnZTogdGhpcy5wYWdlLCBrZXl3b3JkOiBzZXJvYmoua2V5d29yZCB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbGlua3JlczogQXJyYXk8TGlua3VybD4gPSBbXTtcbiAgICAgIGZvciAoY29uc3Qga2V5ZWxlbWVudCBvZiBzZXJvYmoua2V5d29yZCkge1xuICAgICAgICBjb25zdCByZXM9YXdhaXQgdGhpcy5oYW5kbGVTZWFyY2goeyBwYWdlOiB0aGlzLnBhZ2UsIGtleXdvcmQ6IGtleWVsZW1lbnQgfSlcbiAgICAgICAgZm9yIChjb25zdCBsaW5rIG9mIHJlcykge1xuICAgICAgICAgIGxpbmtyZXMucHVzaChsaW5rKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlua3Jlc1xuICAgIH1cblxuICB9XG5cbiAgYXN5bmMgaGFuZGxlU2VhcmNoKGNzb2JqOiBjbGlja2J0bnNlcm9iaik6IFByb21pc2U8QXJyYXk8TGlua3VybD4+IHtcbiAgICBjb25zdCBzZWFyY2hidG4gPSBhd2FpdCB0aGlzLmNsaWNrU2VhcmNoYnRuKHtcbiAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgIGtleXdvcmQ6IGNzb2JqLmtleXdvcmQsXG4gICAgfSk7XG5cbiAgICBsZXQgYnJvd3NlciA9IHRoaXMucGFnZS5icm93c2VyKCk7XG4gICAgY29uc3QgbmV3UGFnZSA9IGF3YWl0IGJyb3dzZXIud2FpdEZvclRhcmdldCgodGFyZ2V0KSA9PlxuICAgICAgdGFyZ2V0LnVybCgpLmluY2x1ZGVzKFwic2VhcmNoLmJpbGliaWxpLmNvbVwiKVxuICAgICk7XG4gICAgY29uc3QgcGFnZXMgPSBhd2FpdCBicm93c2VyLnBhZ2VzKCk7XG4gICAgbGV0IHNlYXJjaFBhZ2U7XG4gICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XG4gICAgICBjb25zdCBwYWdldXJsID0gYXdhaXQgcGFnZS51cmwoKTsgLy8gbmV3IHBhZ2Ugbm93IGFwcGVhciFcbiAgICAgIC8vIGRlYnVnKGF3YWl0IHBhZ2UudGl0bGUoKSlcbiAgICAgIGlmIChwYWdldXJsLmluY2x1ZGVzKFwic2VhcmNoLmJpbGliaWxpLmNvbVwiKSkge1xuICAgICAgICBzZWFyY2hQYWdlID0gcGFnZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghc2VhcmNoUGFnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2VhcmNoIHBhZ2Ugbm90IGZvdW5kXCIpO1xuICAgIH1cblxuICAgIGF3YWl0IGF1dG9TY3JvbGwoc2VhcmNoUGFnZSk7XG5cbiAgICB0cnkge1xuICAgIGF3YWl0IHNlYXJjaFBhZ2Uud2FpdEZvclNlbGVjdG9yKFwiLnZ1aV9wYWdlbmF0aW9uXCIsIHsgdGltZW91dDogNTAwMCB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBQdXBwZXRlZXJlcnJvci5UaW1lb3V0RXJyb3IpIHtcbiAgICAgIC8vIERvIHNvbWV0aGluZyBpZiB0aGlzIGlzIGEgdGltZW91dCBpbiBmaW5kIHBhZ2VcbiAgICAgIGRlYnVnKFwibm90IGZpbmQgLnZ1aV9wYWdlbmF0aW9uIGl0ZW0sIHRoZSBwYWdlIG1heSBub3QgaGF2ZSByZXN1bHRcIilcbiAgICAgIC8vcmV0dXJuIGVtcHR5IHByb21pc2UgYXJyYXlcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4geyByZXNvbHZlKG51bGwpOyB9KTtcbiAgICB9IFxuICB9IFxuICAgIGxldCBsaW5rcmVzOiBBcnJheTxMaW5rdXJsPiA9IFtdO1xuICAgIC8vIGF3YWl0IHRoaXMucGFnZS4kJChcImJ1dHRvbi52dWlfYnV0dG9uXCIsIGVsZW1lbnRzPT57XG4gICAgLy8gICBjb25zb2xlLmxvZyhlbGVtZW50cylcbiAgICAvLyB9KVxuICAgIGNvbnN0IGxpbmtQYWdlID0gYXdhaXQgc2VhcmNoUGFnZS4kJChcImJ1dHRvbi52dWlfYnV0dG9uXCIpO1xuICAgIGRlYnVnKGxpbmtQYWdlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtQYWdlLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIGF3YWl0IHNlYXJjaFBhZ2UuZXZhbHVhdGUoKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5jbGljaygpO1xuICAgICAgfSwgbGlua1BhZ2VbaV0pO1xuICAgICAgY29uc3QgbGlua3MgPSBhd2FpdCB0aGlzLmdldFZpZGVvbGlzdGxpbmsoeyBwYWdlOiBzZWFyY2hQYWdlIH0pO1xuICAgICAgZGVidWcobGlua3MpO1xuICAgICAgbGlua3MubWFwKChsaW5rKSA9PiB7XG4gICAgICAgIGxpbmtyZXMucHVzaChsaW5rKTtcbiAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIGxpbmtyZXM7XG4gIH1cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7cGFnZX0gcGFnZVxuICAgKiBAcmV0dXJucyBhcnJheVxuICAgKi9cbiAgYXN5bmMgZ2V0VmlkZW9saXN0bGluayh7IHBhZ2UgfSk6IFByb21pc2U8QXJyYXk8TGlua3VybD4+IHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG4gICAgLy8gY29uc3QgZWxIYW5kbGVBcnJheSA9IGF3YWl0IHBhZ2UuJCQoXG4gICAgLy8gICBcIi5iaWxpLXZpZGVvLWNhcmRfX2luZm8tLXJpZ2h0IGE6bnRoLWNoaWxkKDEpXCJcbiAgICAvLyApO1xuICAgIFxuICAgIGxldCBsaW5rbWFwOiBBcnJheTxMaW5rdXJsPiA9IFtdO1xuICAgIC8vIGNvbnN0IHRoYXQ9dGhpcztcbiAgICBkZWJ1Zyh0aGlzLmNvbmZpZy50YXNraWQpXG4gICAgbGV0IHRhc2tpZHM9MDtcbiAgICBpZih0aGlzLmNvbmZpZy50YXNraWQpe1xuICAgIHRhc2tpZHM9dGhpcy5jb25maWcudGFza2lkXG4gICAgfVxuICAgIGxpbmttYXAgPSBhd2FpdCB0aGlzLnBhZ2UuJCRldmFsKFxuICAgICAgXCIuYmlsaS12aWRlby1jYXJkX19pbmZvLS1yaWdodCA+YTpmaXJzdC1jaGlsZFwiLFxuICAgICAgKGFsaW5rcyx0YXNraWRzKSA9PiB7XG4gICAgICAgIHJldHVybiBhbGlua3MubWFwKChhbGluaykgPT4ge1xuICAgICAgICAgIGxldCBsaW5rb2JnOiBMaW5rdXJsID0ge3RpdGxlOicnLGxpbms6JycsbGFuZzonemgtY24nfTtcbiAgICAgICAgICAvLyBpZighdGhhdC50YXNraWQpe1xuICAgICAgICAgIC8vIGxpbmtvYmcudGFza2lkPXRoYXQudGFza2lkO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgICBpZih0YXNraWRzKXtcbiAgICAgICAgICAgIGxpbmtvYmcudGFza2lkPXRhc2tpZHNcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgaGVyZj1hbGluay5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpXG4gICAgICAgICAgaWYoaGVyZil7XG4gICAgICAgICAgbGlua29iZy5saW5rID0gaGVyZlxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhbGluayk7XG4gICAgICAgICAgbGV0IGh0aXRsZSA9IGFsaW5rLnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKTtcbiAgICAgICAgICBpZihodGl0bGUpe1xuICAgICAgICAgICAgIGNvbnN0IGh0cmVzPSBodGl0bGUuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICAgaWYoaHRyZXMpe1xuICAgICAgICAgICAgIGxpbmtvYmcudGl0bGU9aHRyZXNcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBsaW5rb2JnO1xuICAgICAgICB9KTtcbiAgICAgIH0sdGFza2lkc1xuICAgICk7XG4gICAgLy8gZGVidWcoXCJxdWVyeSBsaW5rIGZpbmlzaFwiKTtcbiAgICAvLyBkZWJ1ZyhsaW5rbWFwKTtcbiAgICAvLyBkZWJ1ZyhcInNob3cgbGluayBmaW5pc2hcIik7XG4gICAgLy8gY29uc29sZS5sb2cobGlua21hcClcblxuICAgIGF3YWl0IGxpbmttYXAuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGlmICghZWxlbWVudC5saW5rLmluY2x1ZGVzKFwiL3ZpZGVvL1wiKSkge1xuICAgICAgICAvLyBkZWJ1ZyhcImVsZW1lbnQgaGFzIHZpZGVvIFwiK2VsZW1lbnQpXG4gICAgICAgIGxpbmttYXAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBhd2FpdCBsaW5rbWFwLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoZWxlbWVudC5saW5rLmluY2x1ZGVzKFwiL2FwaS9cIikpIHtcbiAgICAgICAgZGVidWcoXCJlbGVtZW50IGhhcyBhcGkgXCIgKyBlbGVtZW50KTtcbiAgICAgICAgbGlua21hcC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vZGVidWcoXCJmaWx0ZXIgbGluayBmaW5pc2hcIik7XG4gICAgZGVidWcobGlua21hcCk7XG5cbiAgICByZXR1cm4gbGlua21hcDtcbiAgfVxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxpbmtcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZpZGVvcGF0aFxuICAgKi9cbiAgYXN5bmMgZG93bmxvYWRTaWdsZVZpZGVvKCBsaW5rOnN0cmluZywgdmlkZW9wYXRoOnN0cmluZyApOlByb21pc2U8Ym9vbGVhbj4ge1xuICAgIC8vIGlmIChwYWdlKSB7XG4gICAgLy8gICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIC8vIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKGxpbmspXG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLmdvdG8obGluayx7XG4gICAgLy8gICB3YWl0VW50aWw6ICdkb21jb250ZW50bG9hZGVkJyxcbiAgICAvLyB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyh2aWRlb3BhdGgpXG4gICAgLy8gY29uc3QgZmlsZSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKHZpZGVvcGF0aCArIFwiL3Rlc3Qud2VibVwiKTtcbiAgICAvLyBhd2FpdCBwYWdlLmV2YWx1YXRlKGFzeW5jICgpID0+IHtcbiAgICAvLyBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5icHgtcGxheWVyLXZpZGVvLXdyYXAgPiB2aWRlbzpudGgtY2hpbGQoMSknKTtcbiAgICAvLyBjb25zb2xlLmxvZyhlbCk7XG4gICAgLy8gY29uc3Qge3NyY30gPSBlbC5xdWVyeVNlbGVjdG9yKCdzb3VyY2UnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhzcmMpO1xuICAgIC8vIH0pO1xuICAgIC8vIGNvbnN0IGh0bWwgPSBhd2FpdCBwYWdlLiRldmFsKCcjYmlsaWJpbGktcGxheWVyJywgZWwgPT4gZWwub3V0ZXJIVE1MKTtcbiAgICAvLyBjb25zb2xlLmxvZyhodG1sKVxuICAgIC8vIGNvbnN0IHNyYyA9IGF3YWl0IHBhZ2UuJGV2YWwoXCIjYmlsaWJpbGktcGxheWVyIHZpZGVvXCIsZWwgPT4gZWwuZ2V0QXR0cmlidXRlKFwic3JjXCIpKVxuXG4gICAgY29uc3QgZG93bmxvYWRlciA9IG5ldyBEb3dubG9hZGVyKCk7XG4gICAgZG93bmxvYWRlci5nZXRWaWRlb1VybChsaW5rKTtcbiAgICBpZiAoIWRvd25sb2FkZXIudXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ2aWRlbyB1cmwgaW52YWxpZFwiKTtcbiAgICB9XG4gICAgYXdhaXQgZG93bmxvYWRlci5nZXRBaWQoKTtcblxuICAgIGxldCB2aWRlb3JlcyA9IGF3YWl0IGRvd25sb2FkZXIuZ2V0SW5mbygpO1xuICAgIGRlYnVnKFwiVklERU8gSU5GT1wiLCB2aWRlb3Jlcyk7XG4gICAgLy8gY29uc3QgZG93bmxvYWRQYXRoID0nL2hvbWUvcm9iZXJ0emVuZy9kb3dubG9hZHRlc3QnO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gdmlkZW9yZXMuZGF0YS50aXRsZTtcbiAgICBjb25zdCB7IGRhdGEsIGZhbGxiYWNrIH0gPSBhd2FpdCBkb3dubG9hZGVyLmdldERhdGEoKTtcblxuICAgIGNvbnN0IHRhcmdldCA9IGRhdGEuZHVybCB8fCBkYXRhLnJlc3VsdC5kdXJsO1xuICAgIGNvbnN0IHF1YWxpdHkgPSBkYXRhLnF1YWxpdHkgfHwgZGF0YS5yZXN1bHQucXVhbGl0eSxcbiAgICAgIHF1YWxpdHlBcnJheSA9IHtcbiAgICAgICAgMTEyOiBcIjEwODBQK1wiLFxuICAgICAgICA4MDogXCIxMDgwUFwiLFxuICAgICAgICA3NDogXCI3MjBQNjBcIixcbiAgICAgICAgNjQ6IFwiNzIwUFwiLFxuICAgICAgICA0ODogXCI3MjBQXCIsXG4gICAgICAgIDMyOiBcIjQ4MFBcIixcbiAgICAgICAgMTY6IFwiMzYwUFwiLFxuICAgICAgICAxNTogXCIzNjBQXCIsXG4gICAgICB9O1xuICAgIGNvbnN0IHZpZGVvUXVhbnRpdHkgPSBxdWFsaXR5QXJyYXlbcXVhbGl0eV0gfHwgXCJ1bmtub3duXCI7XG4gICAgY29uc29sZS5sb2coXCJ2aWRlb1F1YW50aXR5IGlzIFwiICsgdmlkZW9RdWFudGl0eSk7XG4gICAgaWYgKGZhbGxiYWNrKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJlcnJvciBoYXBwZW4gd2hlbiBnZXQgdmlkZW8gZGF0YVwiKTtcbiAgICB9XG4gICAgZGVidWcoXCJlY2hvIHRhcmdldFwiKTtcbiAgICBkZWJ1Zyh0YXJnZXQpO1xuICAgIHRhcmdldC5mb3JFYWNoKChlbGVtZW50LCBwYXJ0KSA9PiB7XG4gICAgICBjb25zdCBmaWxlID0gcGF0aC5qb2luKHZpZGVvcGF0aCwgYCR7c2FuaXRpemUoZmlsZW5hbWUpfS0ke3BhcnR9LmZsdmApO1xuICAgICAgZGVidWcoXCJwYXJ0IGlzICVvXCIsIHBhcnQpO1xuICAgICAgZGVidWcoXCJmaWxlIG5hbWUgJW9cIiwgZmlsZSk7XG4gICAgICBjb25zdCBzdGF0ZSA9IGRvd25sb2FkZXIuZG93bmxvYWRCeUluZGV4KFxuICAgICAgICBwYXJ0LFxuICAgICAgICBmaWxlLFxuICAgICAgICAocHJvZ3Jlc3MsIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBzcGVlZCwgZXRhLCBwZXJjZW50YWdlIH0gPSBwcm9ncmVzczsgLy/mmL7npLrov5vluqbmnaFcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInNwZWVkOiBcIiArIE1hdGgucm91bmQoc3BlZWQgLyAxZTMpICsgXCJLQi9zXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBldGE6JHtldGF9c2ApO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLyoqXG4gICAqIGdldCB2aWRlbyBkZXRhaWxcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxpbmtcbiAgICovXG4gIGFzeW5jIGdldFZpZGVvZGV0YWlsKHBhZ2UsIGxpbmspIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5wYWdlLmdvdG8obGluaywge1xuICAgICAgd2FpdFVudGlsOiBcImRvbWNvbnRlbnRsb2FkZWRcIixcbiAgICB9KTtcblxuICAgIC8vIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQmlsaWJpbGlTY3JhcGVyOiBCaWxpYmlsaVNjcmFwZXIsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaW1wb3J0IHtjaGVlcmlvfSBmcm9tICdjaGVlcmlvJztcbmltcG9ydCB7IFNvY2lhbFNjcmFwZXIgYXMgU2NyYXBlcixTY3JhcGVPcHRpb25zfSBmcm9tICcuL3NvY2lhbF9zY3JhcGVyJztcblxuZXhwb3J0IGNsYXNzIEZhY2Vib29rU2NyYXBlciBleHRlbmRzIFNjcmFwZXIge1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogU2NyYXBlT3B0aW9ucykge1xuICAgICAgICBzdXBlcihhcmdzKTtcbiAgICB9XG4gXG5cbiAgICBhc3luYyBsb2FkX2xvZ2luX3BhZ2UoKTpQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgbGV0IHN0YXJ0VXJsID0gJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbSc7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzKSB7XG4gICAgICAgIC8vICAgICBzdGFydFVybCA9IGBodHRwczovL3d3dy4ke3RoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzLmZhY2Vib29rX2RvbWFpbn1gO1xuICAgICAgICAvLyAgICAgaWYgKHRoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzLmZhY2Vib29rX2RvbWFpbikge1xuICAgICAgICAvLyAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LiR7dGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MuZmFjZWJvb2tfZG9tYWlufWA7XG4gICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbWA7XG4gICAgICAgIC8vICAgICB9XG5cbiAgICAgICAgLy8gICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncykge1xuICAgICAgICAvLyAgICAgICAgIGlmIChrZXkgIT09ICdmYWNlYm9va19kb21haW4nKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHN0YXJ0VXJsICs9IGAke2tleX09JHt0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5nc1trZXldfSZgXG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnVXNpbmcgbG9naW5Vcmw6ICcgKyBzdGFydFVybCk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8oc3RhcnRVcmwpO1xuXG4gICAgICAgIC8vYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcignaW5wdXRbbmFtZT1cInFcIl0nLCB7IHRpbWVvdXQ6IHRoaXMuU1RBTkRBUkRfVElNRU9VVCB9KTtcblxuICAgICAgICAvLyByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy91c2VyIGxvZ2luIGJ5IGhhbmRcbiAgICBhc3luYyB1c2VybG9naW5hY3Rpb24oKXtcblxuICAgIH1cblxufVxuXG5cbiIsImNvbnN0IGNoZWVyaW8gPSByZXF1aXJlKCdjaGVlcmlvJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldF9pcF9kYXRhOiBnZXRfaXBfZGF0YSxcbiAgICBnZXRfaHR0cF9oZWFkZXJzOiBnZXRfaHR0cF9oZWFkZXJzLFxufTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0X2lwX2RhdGEocGFnZSkge1xuICAgIGF3YWl0IHBhZ2UuZ290bygnaHR0cHM6Ly9pcGluZm8uaW8vanNvbicsIHtcbiAgICAgIHdhaXRMb2FkOiB0cnVlLFxuICAgICAgd2FpdE5ldHdvcmtJZGxlOiB0cnVlXG4gICAgfSk7XG4gICAgbGV0IGpzb24gPSBhd2FpdCBwYWdlLmNvbnRlbnQoe1xuICAgICAgICB0aW1lb3V0OiAyMDAwMFxuICAgIH0pO1xuICAgIGNvbnN0ICQgPSBjaGVlcmlvLmxvYWQoanNvbik7XG4gICAgbGV0IGlwaW5mb190ZXh0ID0gICQoJ3ByZScpLnRleHQoKTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShpcGluZm9fdGV4dCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldF9odHRwX2hlYWRlcnMocGFnZSkge1xuICAgIGF3YWl0IHBhZ2UuZ290bygnaHR0cHM6Ly9odHRwYmluLm9yZy9nZXQnLCB7XG4gICAgICB3YWl0TG9hZDogdHJ1ZSxcbiAgICAgIHdhaXROZXR3b3JrSWRsZTogdHJ1ZVxuICAgIH0pO1xuICAgIGxldCBoZWFkZXJzID0gYXdhaXQgcGFnZS5jb250ZW50KCk7XG5cbiAgICBjb25zdCAkID0gY2hlZXJpby5sb2FkKGhlYWRlcnMpO1xuICAgIGxldCBoZWFkZXJzX3RleHQgPSAgJCgncHJlJykudGV4dCgpO1xuICAgIHJldHVybiBKU09OLnBhcnNlKGhlYWRlcnNfdGV4dCk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBtZXRhID0gcmVxdWlyZSgnLi9tZXRhZGF0YS50cycpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzZS1zY3JhcGVyOlNjcmFwZXInKTtcbmltcG9ydCB7IFJlbW90ZVNvdXJjZSwgTGlua2RhdGEgfSBmcm9tIFwiLi4vcmVtb3Rlc291cmNlXCJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICdwdXBwZXRlZXInO1xuY29uc3QgYXBwUm9vdCA9IHJlcXVpcmUoJ2FwcC1yb290LXBhdGgnKTtcblxuLy8gZXhwb3J0IGludGVyZmFjZSBTY3JhcGVPcHRpb25zUGFnZXMge1xuLy8gICAgIHNldFZpZXdwb3J0OiBGdW5jdGlvbixcbi8vICAgICBzZXRSZXF1ZXN0SW50ZXJjZXB0aW9uOiBGdW5jdGlvbixcbi8vICAgICBvbjogRnVuY3Rpb24sXG4vLyAgICAgZ290bzogRnVuY3Rpb24sXG4vLyAgICAgc2NyZWVuc2hvdDogRnVuY3Rpb24sXG4vLyAgICAgc2V0QnlwYXNzQ1NQOiBGdW5jdGlvbixcbi8vICAgICBjbGljazogRnVuY3Rpb24sXG4vLyAgICAgd2FpdEZvclNlbGVjdG9yOiBGdW5jdGlvbixcbi8vICAgICAkeDogRnVuY3Rpb24sXG4vLyAgICAgY29va2llczogRnVuY3Rpb24sXG4vLyB9XG4vLyBleHBvcnQgY2xhc3MgU2NyYXBlT3B0aW9uc1BhZ2UgZXh0ZW5kcyBQYWdle1xuXG4vLyB9XG4vLyBleHBvcnQgY2xhc3MgRWxlbWVudGhhbmRzIGV4dGVuZHMgcHVwcGV0ZWVyLkVsZW1lbnRIYW5kbGV7fVxuZXhwb3J0IGludGVyZmFjZSBTY3JhcGVPcHRpb25zIHtcbiAgICBjb25maWc6IHtcbiAgICAgICAgbG9nZ2VyOiBsb2dUeXBlLFxuICAgICAgICBzZWFyY2hfZW5naW5lPzogc3RyaW5nLCBrZXl3b3JkczogQXJyYXk8c3RyaW5nPiwgcHJveHk6IHN0cmluZywgYXBwbHlfZXZhc2lvbl90ZWNobmlxdWVzOiBib29sZWFuLCBibG9ja19hc3NldHM6IGJvb2xlYW4sIHRlc3RfZXZhc2lvbjogYm9vbGVhbiwgbG9nX2h0dHBfaGVhZGVyczogYm9vbGVhbiwgbG9nX2lwX2FkZHJlc3M6IGJvb2xlYW5cbiAgICB9LFxuICAgIGNvbnRleHQ/OiBvYmplY3QsXG4gICAgcGx1Z2dhYmxlPzogb2JqZWN0LFxuICAgIHBhZ2U6IFBhZ2UsXG4gICAgdGFza2lkPzogbnVtYmVyLFxuICAgIHBsYXRmb3JtOnN0cmluZ1xufVxuXG5pbnRlcmZhY2UgcnVuUGFyYW1ldGVyIHtcbiAgICBwYWdlPzogUGFnZSxcbiAgICBkYXRhPzogb2JqZWN0LFxuICAgIHdvcmtlcj86IG9iamVjdFxufVxuaW50ZXJmYWNlIGxvZ1R5cGUge1xuICAgIGluZm86IEZ1bmN0aW9uLFxuICAgIGVycm9yOiBGdW5jdGlvblxufVxuXG5pbnRlcmZhY2Ugd29zZWFyY2hPYmoge1xuICAgIHBhZ2U/OiBQYWdlLFxuICAgIHdvcmtlcjogb2JqZWN0XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlua3VybCB7XG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBsaW5rOiBzdHJpbmcsXG4gICAgbGFuZzogc3RyaW5nLFxuICAgIHRhc2tpZD86IG51bWJlclxufVxuZXhwb3J0IHR5cGUgU2VhcmNob2JqZWN0ID0ge1xuICAgIHBhZ2U/OiBQYWdlLFxuICAgIGtleXdvcmQ6IHN0cmluZyB8IEFycmF5PHN0cmluZz5cbiAgICBjb29raWVzUGF0aD86IHN0cmluZ1xufVxuXG5cblxuLyoqXG4gKiB0aGlzIGlzIHBhcmVudCBjbGFzcyBmb3Igc29jaWFsIHNjcmFweWVyIG5vZGVcbiAqICAqL1xuZXhwb3J0IGNsYXNzIFNvY2lhbFNjcmFwZXIge1xuICAgIGNvbmZpZzoge1xuICAgICAgICBsb2dnZXI6IGxvZ1R5cGUsXG4gICAgICAgIHNlYXJjaF9lbmdpbmU/OiBzdHJpbmcsXG4gICAgICAgIGtleXdvcmRzOiBBcnJheTxzdHJpbmc+LFxuICAgICAgICBwcm94eTogc3RyaW5nLFxuICAgICAgICBhcHBseV9ldmFzaW9uX3RlY2huaXF1ZXM6IGJvb2xlYW4sXG4gICAgICAgIGJsb2NrX2Fzc2V0czogYm9vbGVhbixcbiAgICAgICAgdGVzdF9ldmFzaW9uOiBib29sZWFuLFxuICAgICAgICBsb2dfaHR0cF9oZWFkZXJzOiBib29sZWFuLFxuICAgICAgICBsb2dfaXBfYWRkcmVzczogYm9vbGVhblxuICAgICAgICB0bXBwYXRoPzogc3RyaW5nLFxuICAgICAgICB0YXNraWQ/OiBudW1iZXJcbiAgICAgICAgLy8gb2JqOnB1cHBldGVlci5QYWdlXG4gICAgfTtcbiAgICBwYWdlOiBQYWdlO1xuICAgIGxhc3RfcmVzcG9uc2U6IG9iamVjdCB8IG51bGw7XG4gICAgbWV0YWRhdGE6IHsgaHR0cF9oZWFkZXJzPzogb2JqZWN0LCBpcGluZm8/OiB7IGlwOiBzdHJpbmcgfSwgc2NyYXBpbmdfZGV0ZWN0ZWQ/OiBib29sZWFuIH07XG4gICAgcGx1Z2dhYmxlPzogb2JqZWN0O1xuICAgIGNvbnRleHQ/OiBvYmplY3Q7XG4gICAgbG9nZ2VyOiBsb2dUeXBlO1xuICAgIHByb3h5OiBzdHJpbmc7XG4gICAga2V5d29yZHM6IEFycmF5PHN0cmluZz47XG4gICAgU1RBTkRBUkRfVElNRU9VVDogbnVtYmVyO1xuICAgIFNPTFZFX0NBUFRDSEFfVElNRTogbnVtYmVyO1xuICAgIHJlc3VsdHM6IG9iamVjdDtcbiAgICByZXN1bHRfcmFuazogbnVtYmVyO1xuICAgIG51bV9yZXF1ZXN0czogbnVtYmVyO1xuICAgIG51bV9rZXl3b3JkczogbnVtYmVyO1xuICAgIHRhc2tpZD86IG51bWJlcjtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBTY3JhcGVPcHRpb25zKSB7XG5cbiAgICAgICAgZGVidWcoJ2NvbnN0cnVjdG9yJyk7XG4gICAgICAgIGRlYnVnKG9wdGlvbnMpO1xuICAgICAgICAvLyBjb25zdCB7XG4gICAgICAgIC8vICAgICAvLyBjb25maWcgPSB7fSxcbiAgICAgICAgLy8gICAgIGNvbnRleHQgPSB7fSxcbiAgICAgICAgLy8gICAgIC8vIHBsdWdnYWJsZSA9IG51bGwsXG4gICAgICAgIC8vICAgICBwYWdlID0gbnVsbCxcbiAgICAgICAgLy8gICAgIC8vIGJyb3dzZXJzPW51bGxcbiAgICAgICAgLy8gfSA9IG9wdGlvbnM7XG4gICAgICAgIC8vIHRoaXMuYnJvd3Nlcj1icm93c2VyO1xuICAgICAgICB0aGlzLnBhZ2UgPSBvcHRpb25zLnBhZ2U7XG4gICAgICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IG51bGw7IC8vIHRoZSBsYXN0IHJlc3BvbnNlIG9iamVjdFxuICAgICAgICB0aGlzLm1ldGFkYXRhID0ge1xuICAgICAgICAgICAgc2NyYXBpbmdfZGV0ZWN0ZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBsdWdnYWJsZSA9IG9wdGlvbnMucGx1Z2dhYmxlO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG9wdGlvbnMuY29uZmlnO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IHRoaXMuY29uZmlnLmxvZ2dlcjtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0O1xuXG4gICAgICAgIHRoaXMucHJveHkgPSBvcHRpb25zLmNvbmZpZy5wcm94eTtcbiAgICAgICAgdGhpcy5rZXl3b3JkcyA9IG9wdGlvbnMuY29uZmlnLmtleXdvcmRzO1xuICAgICAgICBpZiAob3B0aW9ucy50YXNraWQpIHtcbiAgICAgICAgICAgIHRoaXMudGFza2lkID0gb3B0aW9ucy50YXNraWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5TVEFOREFSRF9USU1FT1VUID0gMTAwMDA7XG4gICAgICAgIHRoaXMuU09MVkVfQ0FQVENIQV9USU1FID0gNDUwMDA7XG5cbiAgICAgICAgdGhpcy5yZXN1bHRzID0ge307XG4gICAgICAgIHRoaXMucmVzdWx0X3JhbmsgPSAxO1xuICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSByZXF1ZXN0cyBkb25lXG4gICAgICAgIHRoaXMubnVtX3JlcXVlc3RzID0gMDtcbiAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUga2V5d29yZHMgc2VhcmNoZWRcbiAgICAgICAgdGhpcy5udW1fa2V5d29yZHMgPSAwO1xuXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IHRoaXMuY29uZmlnW2Ake3RoaXMuY29uZmlnLnNlYXJjaF9lbmdpbmV9X3NldHRpbmdzYF07XG4gICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IEpTT04ucGFyc2Uoc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnW2Ake3RoaXMuY29uZmlnLnNlYXJjaF9lbmdpbmV9X3NldHRpbmdzYF0gPSBzZXR0aW5ncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBsb2dpbiBzb2NpYWwgbWVkaWEgcGxhdGZvcm1cbiAgICAgKiBAcGFyYW0gcnVub2JqIFxuICAgICAqIFxuICAgICAqL1xuICAgIGFzeW5jIHJ1bkxvZ2luKHJ1bm9iajogcnVuUGFyYW1ldGVyKSB7XG5cbiAgICAgICAgZGVidWcoJ3dvcmtlcj0lbycsIHJ1bm9iai53b3JrZXIsIHRoaXMuY29uZmlnLmtleXdvcmRzKTtcblxuICAgICAgICBpZiAocnVub2JqLnBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IHJ1bm9iai5wYWdlO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlPy5zZXRWaWV3cG9ydCh7IHdpZHRoOiAxMjgwLCBoZWlnaHQ6IDgwMCB9KTtcblxuXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZF9icm93c2VyX2VuZ2luZSgpO1xuICAgICAgICBhd2FpdCB0aGlzLm1ha2Vsb2dpbmFjdGlvbigpXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY3Rpb24gdGhhdCBydW5zIG9ubHkgb25jZSBpbiB0aGUgYmVnaW5uaW5nIG9mIHRoZVxuICAgICAqIHNjcmFwaW5nIHByb2NlZHVyZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSB0cnVlIGlmIGV2ZXJ5dGhpbmcgaXMgY29ycmVjdC5cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkX2Jyb3dzZXJfZW5naW5lKCk6IFByb21pc2U8dm9pZD4ge1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hcHBseV9ldmFzaW9uX3RlY2huaXF1ZXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgZGV0ZWN0aW9uIGJ5IGV2YWRpbmcgY29tbW9uIGRldGVjdGlvbiB0ZWNobmlxdWVzXG4gICAgICAgICAgICBhd2FpdCBldmFkZUNocm9tZUhlYWRsZXNzRGV0ZWN0aW9uKHRoaXMucGFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBibG9jayBzb21lIGFzc2V0cyB0byBzcGVlZCB1cCBzY3JhcGluZ1xuICAgICAgICBpZiAodGhpcy5jb25maWcuYmxvY2tfYXNzZXRzID09PSB0cnVlKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0UmVxdWVzdEludGVyY2VwdGlvbih0cnVlKTtcbiAgICAgICAgICAgIHRoaXMucGFnZS5vbigncmVxdWVzdCcsIChyZXEpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IHJlcS5yZXNvdXJjZVR5cGUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9jayA9IFsnc3R5bGVzaGVldCcsICdmb250JywgJ2ltYWdlJywgJ21lZGlhJ107XG4gICAgICAgICAgICAgICAgaWYgKGJsb2NrLmluY2x1ZGVzKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5jb250aW51ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnRlc3RfZXZhc2lvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gTmF2aWdhdGUgdG8gdGhlIHBhZ2UgdGhhdCB3aWxsIHBlcmZvcm0gdGhlIHRlc3RzLlxuICAgICAgICAgICAgY29uc3QgdGVzdFVybCA9ICdodHRwczovL2JvdC5zYW5ueXNvZnQuY29tJztcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGFnZS5nb3RvKHRlc3RVcmwpO1xuICAgICAgICAgICAgLy8gU2F2ZSBhIHNjcmVlbnNob3Qgb2YgdGhlIHJlc3VsdHMuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2NyZWVuc2hvdCh7IHBhdGg6ICdoZWFkbGVzcy1ldmFzaW9uLXJlc3VsdC5wbmcnIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmxvZ19odHRwX2hlYWRlcnMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMubWV0YWRhdGEuaHR0cF9oZWFkZXJzID0gYXdhaXQgbWV0YS5nZXRfaHR0cF9oZWFkZXJzKHRoaXMucGFnZSk7XG4gICAgICAgICAgICBkZWJ1ZygndGhpcy5tZXRhZGF0YS5odHRwX2hlYWRlcnM9JU8nLCB0aGlzLm1ldGFkYXRhLmh0dHBfaGVhZGVycyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb25maWcubG9nX2lwX2FkZHJlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxldCBpcGluZm8gPSBhd2FpdCBtZXRhLmdldF9pcF9kYXRhKHRoaXMucGFnZSk7XG4gICAgICAgICAgICB0aGlzLm1ldGFkYXRhLmlwaW5mbyA9IGlwaW5mbztcbiAgICAgICAgICAgIGRlYnVnKCd0aGlzLm1ldGFkYXRhLmlwaW5mbycsIHRoaXMubWV0YWRhdGEuaXBpbmZvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIHRoYXQgb3VyIHByb3h5IGlzIHdvcmtpbmcgYnkgY29uZmlybWluZ1xuICAgICAgICAvLyB0aGF0IGlwaW5mby5pbyBzZWVzIHRoZSBwcm94eSBJUCBhZGRyZXNzXG4gICAgICAgIGlmICh0aGlzLnByb3h5ICYmIHRoaXMuY29uZmlnLmxvZ19pcF9hZGRyZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgICBkZWJ1ZyhgJHt0aGlzLm1ldGFkYXRhLmlwaW5mbz8uaXB9IHZzICR7dGhpcy5wcm94eX1gKTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIGlwIHJldHVybmVkIGJ5IGlwaW5mbyBpcyBub3QgYSBzdWJzdHJpbmcgb2Ygb3VyIHByb3h5c3RyaW5nLCBnZXQgdGhlIGhlY2sgb3V0dGEgaGVyZVxuICAgICAgICAgICAgaWYgKHRoaXMubWV0YWRhdGEuaXBpbmZvPy5pcCAmJiAoIXRoaXMucHJveHkuaW5jbHVkZXModGhpcy5tZXRhZGF0YS5pcGluZm8/LmlwKSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFByb3h5IG91dHB1dCBpcCAke3RoaXMucHJveHl9IGRvZXMgbm90IG1hdGNoIHdpdGggcHJvdmlkZWQgb25lYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFVzaW5nIHZhbGlkIFByb3h5OiAke3RoaXMucHJveHl9YCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmxvYWRfc3RhcnRfcGFnZSgpO1xuICAgIH1cbiAgICAvKipcbiAgKlxuICAqIEByZXR1cm5zIHRydWUgaWYgc3RhcnRwYWdlIHdhcyBsb2FkZWQgY29ycmVjdGx5LlxuICAqL1xuICAgIGFzeW5jIGxvYWRfbG9naW5fcGFnZSgpIHtcblxuICAgIH1cbiAgICAvKipcbiAgICAqXG4gICAgKiBAcmV0dXJucyB0cnVlIGlmIHN0YXJ0cGFnZSB3YXMgbG9hZGVkIGNvcnJlY3RseS5cbiAgICAqL1xuICAgIGFzeW5jIGxvYWRfc3RhcnRfcGFnZSgpIHtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiBtYWtlIGxvZ2luIGFjdGlvblxuICAgICAqL1xuICAgIGFzeW5jIG1ha2Vsb2dpbmFjdGlvbigpOiBQcm9taXNlPGFueSB8IGJvb2xlYW4+IHtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiB1c2VyIGxvZ2luIGJ5IHRoZWlyIGhhbmRcbiAgICAgKi9cbiAgICBhc3luYyB1c2VybG9naW5hY3Rpb24oKSB7XG5cbiAgICB9XG5cbiAgICBhc3luYyBzZWFyY2hkYXRhKHNlYWNob2JqOiBTZWFyY2hvYmplY3QpOiBQcm9taXNlPGFueSB8IEFycmF5PExpbmt1cmw+PiB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1c2Ugd29ya2VyIHRvIHNlYXJjaCBkYXRhXG4gICAgICogQHBhcmFtIG9iamVjdCBrZXl3b3JkIFxuICAgICAqL1xuICAgIGFzeW5jIHdvcmtlcnNlYXJjaGRhdGEod29ya2Vyc2VhY2g6IHdvc2VhcmNoT2JqKSB7XG4gICAgICAgIGRlYnVnKCd3b3JrZXI9JW8nLCB3b3JrZXJzZWFjaC53b3JrZXIsIHRoaXMuY29uZmlnLmtleXdvcmRzKTtcblxuICAgICAgICBpZiAod29ya2Vyc2VhY2gucGFnZSkge1xuICAgICAgICAgICAgdGhpcy5wYWdlID0gd29ya2Vyc2VhY2gucGFnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS5zZXRWaWV3cG9ydCh7IHdpZHRoOiAxMjgwLCBoZWlnaHQ6IDgwMCB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkX2Jyb3dzZXJfZW5naW5lKClcbiAgICAgICAgY29uc3QgbGlua3MgPSBhd2FpdCB0aGlzLnNlYXJjaGRhdGEoeyBrZXl3b3JkOiB0aGlzLmNvbmZpZy5rZXl3b3JkcyB9KVxuICAgICAgICBjb25zdCByZW1vdGVTb3VybW9kZWwgPSBSZW1vdGVTb3VyY2UuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgZGVidWcobGlua3MpXG4gICAgICAgIC8vaGFuZGxlIHRoZSBsaW5rc1xuICAgICAgICBsaW5rcz8ubWFwKGFzeW5jIGxpbmtJdGVtID0+IHtcbiAgICAgICAgICAgIGxldCBsaW5rb2JqOiBMaW5rZGF0YSA9IHsgdGl0bGU6IGxpbmtJdGVtLnRpdGxlLCB1cmw6IGxpbmtJdGVtLmxpbmssIGxhbmc6IGxpbmtJdGVtLmxhbmcsIHNvY2lhbHRhc2tfaWQ6IGxpbmtJdGVtLnRhc2tpZCB9XG4gICAgICAgICAgICBkZWJ1ZyhsaW5rb2JqKVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCByZW1vdGVTb3VybW9kZWwuc2F2ZUxpbmtyZW1vdGUobGlua29iailcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogZG93bmxvYWQgdmlkZW9cbiAgICAgKi9cbiAgICBhc3luYyBkb3dubG9hZHZpZGVvKGxpc3Q6QXJyYXk8c3RyaW5nPik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCB2aWRlb3NhdmVwYXRoOnN0cmluZz1yZXNvbHZlKGFwcFJvb3QrXCIvdG1wL1wiICsgc2NyYXBlX2NvbmZpZy5wbGF0Zm9ybSArIFwiL1wiICsgc29zZXR0aW5nLnNvY2lhbHVzZXIpO1xuICAgICAgICBmb3IgKGNvbnN0IGxpbmtpdGVtIGluIGxpc3Qpe1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogZG93bmxvYWQgc2luZ2xlIHZpZGVvXG4gICAgICogQHBhcmFtIHN0cmluZyBsaW5rIFxuICAgICAqIEBwYXJhbSBzdHJpbmcgdmlkZW9wYXRoIFxuICAgICAqL1xuICAgIGFzeW5jIGRvd25sb2FkU2lnbGVWaWRlbyggbGluazpzdHJpbmcsIHZpZGVvcGF0aDpzdHJpbmcgKTpQcm9taXNlPGJvb2xlYW58dm9pZD4ge1xuXG4gICAgfVxuXG5cbn1cbi8vIFRoaXMgaXMgd2hlcmUgd2UnbGwgcHV0IHRoZSBjb2RlIHRvIGdldCBhcm91bmQgdGhlIHRlc3RzLlxuYXN5bmMgZnVuY3Rpb24gZXZhZGVDaHJvbWVIZWFkbGVzc0RldGVjdGlvbihwYWdlKSB7XG5cbiAgICAvLyBQYXNzIHRoZSBXZWJkcml2ZXIgVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIC8vIGNvbnN0IG5ld1Byb3RvID0gbmF2aWdhdG9yLl9fcHJvdG9fXztcbiAgICAgICAgY29uc3QgbmV3UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmF2aWdhdG9yKTtcbiAgICAgICAgZGVsZXRlIG5ld1Byb3RvLndlYmRyaXZlcjtcbiAgICAgICAgLy8gbmF2aWdhdG9yLl9fcHJvdG9fXyA9IG5ld1Byb3RvO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YobmF2aWdhdG9yLCBuZXdQcm90byk7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBDaHJvbWUgVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIC8vIGludGVyZmFjZSBtb2NrT2JqVHlwZSBleHRlbmRzIHR5cGVvZiBjaHJvbWUge1xuICAgICAgICAvLyAgICAgY2hyb21lOiBvYmplY3QsXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gV2UgY2FuIG1vY2sgdGhpcyBpbiBhcyBtdWNoIGRlcHRoIGFzIHdlIG5lZWQgZm9yIHRoZSB0ZXN0LlxuICAgICAgICBjb25zdCBtb2NrT2JqID0ge1xuICAgICAgICAgICAgYXBwOiB7XG4gICAgICAgICAgICAgICAgaXNJbnN0YWxsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdlYnN0b3JlOiB7XG4gICAgICAgICAgICAgICAgb25JbnN0YWxsU3RhZ2VDaGFuZ2VkOiB7fSxcbiAgICAgICAgICAgICAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bnRpbWU6IHtcbiAgICAgICAgICAgICAgICBQbGF0Zm9ybU9zOiB7XG4gICAgICAgICAgICAgICAgICAgIE1BQzogJ21hYycsXG4gICAgICAgICAgICAgICAgICAgIFdJTjogJ3dpbicsXG4gICAgICAgICAgICAgICAgICAgIEFORFJPSUQ6ICdhbmRyb2lkJyxcbiAgICAgICAgICAgICAgICAgICAgQ1JPUzogJ2Nyb3MnLFxuICAgICAgICAgICAgICAgICAgICBMSU5VWDogJ2xpbnV4JyxcbiAgICAgICAgICAgICAgICAgICAgT1BFTkJTRDogJ29wZW5ic2QnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgUGxhdGZvcm1BcmNoOiB7XG4gICAgICAgICAgICAgICAgICAgIEFSTTogJ2FybScsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl8zMjogJ3g4Ni0zMicsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl82NDogJ3g4Ni02NCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBQbGF0Zm9ybU5hY2xBcmNoOiB7XG4gICAgICAgICAgICAgICAgICAgIEFSTTogJ2FybScsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl8zMjogJ3g4Ni0zMicsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl82NDogJ3g4Ni02NCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBSZXF1ZXN0VXBkYXRlQ2hlY2tTdGF0dXM6IHtcbiAgICAgICAgICAgICAgICAgICAgVEhST1RUTEVEOiAndGhyb3R0bGVkJyxcbiAgICAgICAgICAgICAgICAgICAgTk9fVVBEQVRFOiAnbm9fdXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgVVBEQVRFX0FWQUlMQUJMRTogJ3VwZGF0ZV9hdmFpbGFibGUnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgT25JbnN0YWxsZWRSZWFzb246IHtcbiAgICAgICAgICAgICAgICAgICAgSU5TVEFMTDogJ2luc3RhbGwnLFxuICAgICAgICAgICAgICAgICAgICBVUERBVEU6ICd1cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBDSFJPTUVfVVBEQVRFOiAnY2hyb21lX3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIFNIQVJFRF9NT0RVTEVfVVBEQVRFOiAnc2hhcmVkX21vZHVsZV91cGRhdGUnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgT25SZXN0YXJ0UmVxdWlyZWRSZWFzb246IHtcbiAgICAgICAgICAgICAgICAgICAgQVBQX1VQREFURTogJ2FwcF91cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBPU19VUERBVEU6ICdvc191cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBQRVJJT0RJQzogJ3BlcmlvZGljJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgLy8gaWYod2luZG93Lm5hdmlnYXRvci5jaHJvbWUpe1xuICAgICAgICAvLyB3aW5kb3cubmF2aWdhdG9yLmNocm9tZSA9IG1vY2tPYmo7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gd2luZG93LmNocm9tZSA9IG1vY2tPYmo7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBQZXJtaXNzaW9ucyBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxRdWVyeSA9IHdpbmRvdy5uYXZpZ2F0b3IucGVybWlzc2lvbnMucXVlcnk7XG4gICAgICAgIC8vIHdpbmRvdy5uYXZpZ2F0b3IucGVybWlzc2lvbnMuX19wcm90b19fLnF1ZXJ5ID0gcGFyYW1ldGVycyA9PlxuICAgICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2luZG93Lm5hdmlnYXRvci5wZXJtaXNzaW9ucykucXVlcnkgPSBwYXJhbWV0ZXJzID0+XG5cbiAgICAgICAgICAgIHBhcmFtZXRlcnMubmFtZSA9PT0gJ25vdGlmaWNhdGlvbnMnXG4gICAgICAgICAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoeyBzdGF0ZTogTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gfSlcbiAgICAgICAgICAgICAgICA6IG9yaWdpbmFsUXVlcnkocGFyYW1ldGVycyk7XG5cbiAgICAgICAgLy8gSW5zcGlyZWQgYnk6IGh0dHBzOi8vZ2l0aHViLmNvbS9pa2FyaWVuYXRvci9waGFudG9tanNfaGlkZV9hbmRfc2Vlay9ibG9iL21hc3Rlci81LnNwb29mRnVuY3Rpb25CaW5kLmpzXG4gICAgICAgIGNvbnN0IG9sZENhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcblxuICAgICAgICBmdW5jdGlvbiBjYWxsKCkge1xuICAgICAgICAgICAgcmV0dXJuIG9sZENhbGwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsID0gY2FsbDtcblxuICAgICAgICBjb25zdCBuYXRpdmVUb1N0cmluZ0Z1bmN0aW9uU3RyaW5nID0gRXJyb3IudG9TdHJpbmcoKS5yZXBsYWNlKC9FcnJvci9nLCBcInRvU3RyaW5nXCIpO1xuICAgICAgICBjb25zdCBvbGRUb1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuICAgICAgICBmdW5jdGlvbiBmdW5jdGlvblRvU3RyaW5nKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMgPT09IHdpbmRvdy5uYXZpZ2F0b3IucGVybWlzc2lvbnMucXVlcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJmdW5jdGlvbiBxdWVyeSgpIHsgW25hdGl2ZSBjb2RlXSB9XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcyA9PT0gZnVuY3Rpb25Ub1N0cmluZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuYXRpdmVUb1N0cmluZ0Z1bmN0aW9uU3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9sZENhbGwuY2FsbChvbGRUb1N0cmluZywgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvblRvU3RyaW5nO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0aGUgUGx1Z2lucyBMZW5ndGggVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIC8vIE92ZXJ3cml0ZSB0aGUgYHBsdWdpbnNgIHByb3BlcnR5IHRvIHVzZSBhIGN1c3RvbSBnZXR0ZXIuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXZpZ2F0b3IsICdwbHVnaW5zJywge1xuICAgICAgICAgICAgLy8gVGhpcyBqdXN0IG5lZWRzIHRvIGhhdmUgYGxlbmd0aCA+IDBgIGZvciB0aGUgY3VycmVudCB0ZXN0LFxuICAgICAgICAgICAgLy8gYnV0IHdlIGNvdWxkIG1vY2sgdGhlIHBsdWdpbnMgdG9vIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgICAgIGdldDogKCkgPT4gWzEsIDIsIDMsIDQsIDVdXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0aGUgTGFuZ3VhZ2VzIFRlc3QuXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICAvLyBPdmVyd3JpdGUgdGhlIGBwbHVnaW5zYCBwcm9wZXJ0eSB0byB1c2UgYSBjdXN0b20gZ2V0dGVyLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmF2aWdhdG9yLCAnbGFuZ3VhZ2VzJywge1xuICAgICAgICAgICAgZ2V0OiAoKSA9PiBbJ2VuLVVTJywgJ2VuJ11cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBpZnJhbWUgVGVzdFxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUxJRnJhbWVFbGVtZW50LnByb3RvdHlwZSwgJ2NvbnRlbnRXaW5kb3cnLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdG9TdHJpbmcgdGVzdCwgdGhvdWdoIGl0IGJyZWFrcyBjb25zb2xlLmRlYnVnKCkgZnJvbSB3b3JraW5nXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICB3aW5kb3cuY29uc29sZS5kZWJ1ZyA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLy8gY29uc3QgY2hlZXJpbyA9IHJlcXVpcmUoJ2NoZWVyaW8nKTtcbmltcG9ydCB7U29jaWFsU2NyYXBlciBhcyBTY3JhcGVyLFNjcmFwZU9wdGlvbnN9IGZyb20gJy4vc29jaWFsX3NjcmFwZXInO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jbGFzcyBZb3V0dWJlU2NyYXBlciBleHRlbmRzIFNjcmFwZXIge1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogU2NyYXBlT3B0aW9ucykge1xuICAgICAgICBzdXBlcihhcmdzKTsgICAgXG4gICAgfVxuXG5cbiAgICBhc3luYyBsb2FkX2xvZ2luX3BhZ2UoKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgc3RhcnRVcmwgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20nO1xuXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ1VzaW5nIGxvZ2luVXJsOiAnICsgc3RhcnRVcmwpO1xuICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0QnlwYXNzQ1NQKHRydWUpO1xuICAgICAgICB0aGlzLmxhc3RfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnBhZ2UuZ290byhzdGFydFVybCk7XG4gICAgICAgIFxuICAgICAgICAvL2hpZGRlbiBpY29uXG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS5ldmFsdWF0ZSgoKSA9PiB7XG4gICAgICAgIHZhciBpY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvLWljb25cIik7XG4gICAgICAgIGlmKGljb24pe1xuICAgICAgICBpY29uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb25maWcudG1wcGF0aClcbiAgICAgICAgLy9hd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicVwiXScsIHsgdGltZW91dDogdGhpcy5TVEFOREFSRF9USU1FT1VUIH0pO1xuICAgICAgICAvL2F3YWl0IGZvciB1c2VyIHRvIHRha2UgYWN0aW9uXG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoJyNhdmF0YXItYnRuJyx7J3RpbWVvdXQnOjB9KTtcbiAgICAgICAgLy91c2VyIGhhcyBzdWNjZXNzIGxvZ2luXG4gICAgICAgIC8vc2F2ZSBjb29raWVzIFxuICAgICAgICBjb25zdCBjb29raWVzID0gYXdhaXQgdGhpcy5wYWdlLmNvb2tpZXMoKTtcbiAgICAgICAgXG4gICAgICAgIGF3YWl0IGZzLndyaXRlRmlsZSh0aGlzLmNvbmZpZy50bXBwYXRoKycvY29va2llcy5qc29uJywgSlNPTi5zdHJpbmdpZnkoY29va2llcywgbnVsbCwgMikpO1xuICAgICAgICAvLyBhd2FpdCBicm93c2VyLmNsb3NlKCk7XG4gICAgICAgIC8vIHJldHVybiB0cnVlO1xuICAgIH1cblxuXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgWW91dHViZVNjcmFwZXI6IFlvdXR1YmVTY3JhcGVyLFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gVXNlIFR5cGVTY3JpcHQgbW9kdWxlcyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNTc1ODU4NC9jYW5ub3QtcmVkZWNsYXJlLWJsb2NrLXNjb3BlZC12YXJpYWJsZVxuZXhwb3J0IHt9O1xuY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCBvcyA9IHJlcXVpcmUoXCJvc1wiKTtcbmNvbnN0IF8gPSByZXF1aXJlKFwibG9kYXNoXCIpO1xuY29uc3QgeyBjcmVhdGVMb2dnZXIsIGZvcm1hdCwgdHJhbnNwb3J0cyB9ID0gcmVxdWlyZShcIndpbnN0b25cIik7XG5jb25zdCB7IGNvbWJpbmUsIHRpbWVzdGFtcCwgcHJpbnRmIH0gPSBmb3JtYXQ7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKShcInNlLXNjcmFwZXI6U2NyYXBlTWFuYWdlclwiKTtcbmNvbnN0IHsgQ2x1c3RlciB9ID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyXCIpO1xuY29uc3QgdmFuaWxsYVB1cHBldGVlciA9IHJlcXVpcmUoXCJwdXBwZXRlZXJcIik7XG5jb25zdCB7IGFkZEV4dHJhIH0gPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhXCIpO1xuLy8gY29uc3QgU3RlYWx0aCA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmEtcGx1Z2luLXN0ZWFsdGhcIik7XG4vLyBjb25zdCBBZGJsb2NrZXJQbHVnaW4gPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhLXBsdWdpbi1hZGJsb2NrZXJcIik7XG5cbmNvbnN0IFVzZXJBZ2VudCA9IHJlcXVpcmUoXCJ1c2VyLWFnZW50c1wiKTtcbmNvbnN0IGZhY2Vib29rID0gcmVxdWlyZShcIi4vbW9kdWxlcy9mYWNlYm9va19zY3JhcGVyXCIpO1xuY29uc3QgeW91dHViZSA9IHJlcXVpcmUoXCIuL21vZHVsZXMveW91dHViZV9zY3JhcGVyXCIpO1xuY29uc3QgYmlsaWJpbGkgPSByZXF1aXJlKFwiLi9tb2R1bGVzL2JpbGliaWxpX3NjcmFwZXJcIik7XG4vLyBjb25zdCBiaW5nID0gcmVxdWlyZSgnLi9tb2R1bGVzL2JpbmcuanMnKTtcbi8vIGNvbnN0IHlhbmRleCA9IHJlcXVpcmUoJy4vbW9kdWxlcy95YW5kZXguanMnKTtcbi8vIGNvbnN0IGluZm9zcGFjZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy9pbmZvc3BhY2UuanMnKTtcbi8vIGNvbnN0IGR1Y2tkdWNrZ28gPSByZXF1aXJlKCcuL21vZHVsZXMvZHVja2R1Y2tnby5qcycpO1xuY29uc3QgQ3VzdG9tQ29uY3VycmVuY3lJbXBsID0gcmVxdWlyZShcIi4vY29uY3VycmVuY3ktaW1wbGVtZW50YXRpb25cIik7XG4vLyBjb25zdCBheGlvcyA9IHJlcXVpcmUoXCJheGlvc1wiKTtcbmNvbnN0IE1BWF9BTExPV0VEX0JST1dTRVJTID0gNjtcbi8vIGNvbnN0IHB1cHBldGVlciA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmFcIik7XG4vLyBjb25zdCBfU3RlYWx0aFBsdWdpbiA9IHJlcXVpcmUoJ3B1cHBldGVlci1leHRyYS1wbHVnaW4tc3RlYWx0aCcpO1xuLy8gY29uc3QgX0FkYmxvY2tlclBsdWdpbiA9IHJlcXVpcmUoJ3B1cHBldGVlci1leHRyYS1wbHVnaW4tYWRibG9ja2VyJyk7XG5cbmZ1bmN0aW9uIHdyaXRlX3Jlc3VsdHMoZm5hbWUsIGRhdGEpIHtcbiAgZnMud3JpdGVGaWxlU3luYyhmbmFtZSwgZGF0YSwgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHRocm93IGVycjtcbiAgICBjb25zb2xlLmxvZyhgUmVzdWx0cyB3cml0dGVuIHRvIGZpbGUgJHtmbmFtZX1gKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlYWRfa2V5d29yZHNfZnJvbV9maWxlKGZuYW1lKSB7XG4gIGxldCBrd3MgPSBmcy5yZWFkRmlsZVN5bmMoZm5hbWUpLnRvU3RyaW5nKCkuc3BsaXQob3MuRU9MKTtcbiAgLy8gY2xlYW4ga2V5d29yZHNcbiAga3dzID0ga3dzLmZpbHRlcigoa3cpID0+IHtcbiAgICByZXR1cm4ga3cudHJpbSgpLmxlbmd0aCA+IDA7XG4gIH0pO1xuICByZXR1cm4ga3dzO1xufVxuXG5cbmZ1bmN0aW9uIGdldFNjcmFwZXIoc2VhcmNoX2VuZ2luZTpzdHJpbmcsIGFyZ3M6YW55KSB7XG4gIGlmICh0eXBlb2Ygc2VhcmNoX2VuZ2luZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBuZXcge1xuICAgICAgZmFjZWJvb2s6IGZhY2Vib29rLkZhY2Vib29rU2NyYXBlcixcbiAgICAgIHlvdXR1YmU6IHlvdXR1YmUuWW91dHViZVNjcmFwZXIsXG4gICAgICBiaWxpYmlsaTogYmlsaWJpbGkuQmlsaWJpbGlTY3JhcGVyLFxuICAgIH1bc2VhcmNoX2VuZ2luZV0oYXJncyk7XG4gIH0gXG4gIC8vIGVsc2UgaWYgKHR5cGVvZiBzZWFyY2hfZW5naW5lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgLy8gICByZXR1cm4gbmV3IHNlYXJjaF9lbmdpbmUoYXJncyk7XG4gIC8vIH0gXG4gIGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBzb2NpYWwgcGxhdGZvcm0gbXVzdCBlaXRoZXIgYmUgYSBzdHJpbmcgb2YgY2xhc3MgKGZ1bmN0aW9uKWBcbiAgICApO1xuICB9XG59XG50eXBlIFNNY29uZmlnID17XG4gIGxvZ2dlcjp7aW5mbzpGdW5jdGlvbn07XG4gIGtleXdvcmRzOkFycmF5PHN0cmluZz47XG4gIHByb3hpZXM6QXJyYXk8c3RyaW5nPjtcbiAga2V5d29yZF9maWxlOnN0cmluZztcbiAgcHJveHlfZmlsZTpzdHJpbmc7XG4gIHVzZV9wcm94aWVzX29ubHk6Ym9vbGVhbjtcbiAgY3VzdG9tX2Z1bmM6c3RyaW5nO1xuICBjaHJvbWVfZmxhZ3M6QXJyYXk8c3RyaW5nPjtcbiAgcHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnOntcbiAgICBtYXhDb25jdXJyZW5jeTpudW1iZXI7XG4gICAgbW9uaXRvcjpib29sZWFuO1xuICAgIHRpbWVvdXQ6bnVtYmVyO1xuICB9XG4gIHJhbmRvbV91c2VyX2FnZW50OmJvb2xlYW47XG4gIHVzZXJfYWdlbnQ6c3RyaW5nO1xuICBoZWFkbGVzczpib29sZWFuO1xuICBwbGF0Zm9ybTpzdHJpbmc7XG4gIHRhc2tpZD86bnVtYmVyO1xufVxuZXhwb3J0IGNsYXNzIFNjcmFwZU1hbmFnZXIge1xuICBjbHVzdGVyOntleGVjdXRlOkZ1bmN0aW9uO2lkbGU6RnVuY3Rpb247Y2xvc2U6RnVuY3Rpb259O1xuICBwbHVnZ2FibGU6e3N0YXJ0X2Jyb3dzZXI/OkZ1bmN0aW9uLGNsb3NlX2Jyb3dzZXI/OkZ1bmN0aW9uLGhhbmRsZV9yZXN1bHRzPzpGdW5jdGlvbixoYW5kbGVfbWV0YWRhdGE/OkZ1bmN0aW9ufTtcbiAgc2NyYXBlcjp7cnVuTG9naW46RnVuY3Rpb247d29ya2Vyc2VhcmNoZGF0YTpGdW5jdGlvbn07XG4gIGNvbnRleHQ6b2JqZWN0O1xuICBjb25maWc6U01jb25maWc7XG4gIGxvZ2dlcjp7aW5mbzpGdW5jdGlvbn07XG4gIGJyb3dzZXI6e25ld1BhZ2U6RnVuY3Rpb259O1xuICBwYWdlOm9iamVjdDtcbiAgbnVtQ2x1c3RlcnM6bnVtYmVyO1xuICB0bXBwYXRoOnN0cmluZztcbiAgcnVuTG9naW46RnVuY3Rpb247XG4gIGNvbnN0cnVjdG9yKGNvbmZpZywgY29udGV4dCA9IHt9KSB7XG4gICAgdGhpcy5jbHVzdGVyID0gbnVsbDtcbiAgICB0aGlzLnBsdWdnYWJsZSA9IG51bGw7XG4gICAgdGhpcy5zY3JhcGVyID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIFxuICAgIC8vIGF3YWl0IHRoaXMuZ2V0UmVtb3RlQ29uZmlnKGNhbXBhaWduSWQpXG5cbiAgICB0aGlzLmNvbmZpZyA9IF8uZGVmYXVsdHMoY29uZmlnLCB7XG4gICAgICAvLyByZW1vdGVfYWRkOmVuZGNvZmlnLlJFTU9URUFERCxcbiAgICAgIC8vIHJlbW90ZV91c2VybmFtZTplbmRjb2ZpZy5VU0VSTkFNRSxcbiAgICAgIC8vIHJlbW90ZV9wYXNzd29yZDplbmRjb2ZpZy5QQVNTV09SRCxcbiAgICAgIC8vIHRoZSB1c2VyIGFnZW50IHRvIHNjcmFwZSB3aXRoXG4gICAgICB1c2VyX2FnZW50OlxuICAgICAgICBcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMDcuMC4wLjAgU2FmYXJpLzUzNy4zNlwiLFxuICAgICAgLy8gaWYgcmFuZG9tX3VzZXJfYWdlbnQgaXMgc2V0IHRvIFRydWUsIGEgcmFuZG9tIHVzZXIgYWdlbnQgaXMgY2hvc2VuXG4gICAgICByYW5kb21fdXNlcl9hZ2VudDogZmFsc2UsXG4gICAgICAvLyB3aGV0aGVyIHRvIHNlbGVjdCBtYW51YWwgc2V0dGluZ3MgaW4gdmlzaWJsZSBtb2RlXG4gICAgICBzZXRfbWFudWFsX3NldHRpbmdzOiBmYWxzZSxcbiAgICAgIC8vIGxvZyBpcCBhZGRyZXNzIGRhdGFcbiAgICAgIGxvZ19pcF9hZGRyZXNzOiBmYWxzZSxcbiAgICAgIC8vIGxvZyBodHRwIGhlYWRlcnNcbiAgICAgIGxvZ19odHRwX2hlYWRlcnM6IGZhbHNlLFxuICAgICAgLy8gaG93IGxvbmcgdG8gc2xlZXAgYmV0d2VlbiByZXF1ZXN0cy4gYSByYW5kb20gc2xlZXAgaW50ZXJ2YWwgd2l0aGluIHRoZSByYW5nZSBbYSxiXVxuICAgICAgLy8gaXMgZHJhd24gYmVmb3JlIGV2ZXJ5IHJlcXVlc3QuIGVtcHR5IHN0cmluZyBmb3Igbm8gc2xlZXBpbmcuXG4gICAgICBzbGVlcF9yYW5nZTogbnVsbCxcblxuICAgICAgbG9nZ2VyOiBjcmVhdGVMb2dnZXIoe1xuICAgICAgICBsZXZlbDogXCJpbmZvXCIsXG4gICAgICAgIGZvcm1hdDogY29tYmluZShcbiAgICAgICAgICB0aW1lc3RhbXAoKSxcbiAgICAgICAgICBwcmludGYoKHsgbGV2ZWwsIG1lc3NhZ2UsIHRpbWVzdGFtcCB9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGltZXN0YW1wfSBbJHtsZXZlbH1dICR7bWVzc2FnZX1gO1xuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIHRyYW5zcG9ydHM6IFtuZXcgdHJhbnNwb3J0cy5Db25zb2xlKCldLFxuICAgICAgfSksXG4gICAgICBwbGF0Zm9ybTogXCJmYWNlYm9va1wiLFxuICAgICAga2V5d29yZHM6IFtcIm5vZGVqcyByb2Nrc1wiXSxcbiAgICAgIC8vIHdoZXRoZXIgdG8gc3RhcnQgdGhlIGJyb3dzZXIgaW4gaGVhZGxlc3MgbW9kZVxuICAgICAgLy8gaGVhZGxlc3M6IHRydWUsXG4gICAgICAvLyBzcGVjaWZ5IGZsYWdzIHBhc3NlZCB0byBjaHJvbWUgaGVyZVxuICAgICAgLy8gQWJvdXQgb3VyIGRlZmF1bHRzIHZhbHVlcyBodHRwczovL3BldGVyLnNoL2V4cGVyaW1lbnRzL2Nocm9taXVtLWNvbW1hbmQtbGluZS1zd2l0Y2hlcy9cbiAgICAgIGNocm9tZV9mbGFnczogW1xuICAgICAgICBcIi0tZGlzYWJsZS1pbmZvYmFyc1wiLFxuICAgICAgICBcIi0td2luZG93LXBvc2l0aW9uPTAsMFwiLFxuICAgICAgICBcIi0taWdub3JlLWNlcnRpZmNhdGUtZXJyb3JzXCIsXG4gICAgICAgIFwiLS1pZ25vcmUtY2VydGlmY2F0ZS1lcnJvcnMtc3BraS1saXN0XCIsXG4gICAgICAgIFwiLS1uby1zYW5kYm94XCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLXNldHVpZC1zYW5kYm94XCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWRldi1zaG0tdXNhZ2VcIixcbiAgICAgICAgXCItLWRpc2FibGUtYWNjZWxlcmF0ZWQtMmQtY2FudmFzXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWdwdVwiLFxuICAgICAgICBcIi0td2luZG93LXNpemU9MTI4MCw3NjhcIixcbiAgICAgICAgXCItLXN0YXJ0LWZ1bGxzY3JlZW5cIixcbiAgICAgICAgXCItLWhpZGUtc2Nyb2xsYmFyc1wiLFxuICAgICAgICBcIi0tZGlzYWJsZS1ub3RpZmljYXRpb25zXCIsXG4gICAgICBdLFxuICAgICAgLy9maXggZ29vZ2xlIGFjY291bnQgY2FuIG5vdCBsb2dpblxuICAgICAgaWdub3JlRGVmYXVsdEFyZ3M6IFtcbiAgICAgICAgXCItLWVuYWJsZS1hdXRvbWF0aW9uXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWV4dGVuc2lvbnNcIixcbiAgICAgICAgXCItLWRpc2FibGUtZGVmYXVsdC1hcHBzXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWNvbXBvbmVudC1leHRlbnNpb25zLXdpdGgtYmFja2dyb3VuZC1wYWdlc1wiLFxuICAgICAgXSxcbiAgICAgIC8vIHRoZSBudW1iZXIgb2YgcGFnZXMgdG8gc2NyYXBlIGZvciBlYWNoIGtleXdvcmRcbiAgICAgIG51bV9wYWdlczogMSxcbiAgICAgIC8vIHBhdGggdG8gb3V0cHV0IGZpbGUsIGRhdGEgd2lsbCBiZSBzdG9yZWQgaW4gSlNPTlxuICAgICAgb3V0cHV0X2ZpbGU6IFwiXCIsXG4gICAgICAvLyB3aGV0aGVyIHRvIGFsc28gcGFzc3RocnUgYWxsIHRoZSBodG1sIG91dHB1dCBvZiB0aGUgc2VycCBwYWdlc1xuICAgICAgaHRtbF9vdXRwdXQ6IGZhbHNlLFxuICAgICAgLy8gd2hldGhlciB0byBzdHJpcCBKUyBhbmQgQ1NTIGZyb20gdGhlIGh0bWxfb3V0cHV0XG4gICAgICAvLyBoYXMgb25seSBhbiBlZmZlY3QgaWYgYGh0bWxfb3V0cHV0YCBpcyB0cnVlXG4gICAgICBjbGVhbl9odG1sX291dHB1dDogdHJ1ZSxcbiAgICAgIC8vIHJlbW92ZSBhbGwgZGF0YSBpbWFnZXMgZnJvbSB0aGUgaHRtbFxuICAgICAgY2xlYW5fZGF0YV9pbWFnZXM6IHRydWUsXG4gICAgICAvLyB3aGV0aGVyIHRvIHJldHVybiBhIHNjcmVlbnNob3Qgb2Ygc2VycCBwYWdlcyBhcyBiNjQgZGF0YVxuICAgICAgc2NyZWVuX291dHB1dDogZmFsc2UsXG4gICAgICAvLyBTY3JhcGUgdXJsIGZyb20gbG9jYWwgZmlsZS4gTWFpbmx5IHVzZWQgZm9yIHRlc3RpbmcuXG4gICAgICBzY3JhcGVfZnJvbV9maWxlOiBcIlwiLFxuICAgICAgLy8gd2hldGhlciB0byBwcmV2ZW50IGltYWdlcywgY3NzLCBmb250cyBhbmQgbWVkaWEgZnJvbSBiZWluZyBsb2FkZWRcbiAgICAgIC8vIHdpbGwgc3BlZWQgdXAgc2NyYXBpbmcgYSBncmVhdCBkZWFsXG4gICAgICBibG9ja19hc3NldHM6IHRydWUsXG4gICAgICAvLyBwYXRoIHRvIGpzIG1vZHVsZSB0aGF0IGV4dGVuZHMgZnVuY3Rpb25hbGl0eVxuICAgICAgLy8gdGhpcyBtb2R1bGUgc2hvdWxkIGV4cG9ydCB0aGUgZnVuY3Rpb25zOlxuICAgICAgLy8gZ2V0X2Jyb3dzZXIsIGhhbmRsZV9tZXRhZGF0YSwgY2xvc2VfYnJvd3NlclxuICAgICAgLy9jdXN0b21fZnVuYzogcmVzb2x2ZSgnZXhhbXBsZXMvcGx1Z2dhYmxlLmpzJyksXG4gICAgICBjdXN0b21fZnVuYzogbnVsbCxcbiAgICAgIHRocm93X29uX2RldGVjdGlvbjogZmFsc2UsXG4gICAgICAvLyBMaXN0IG9mIHByb3hpZXMgdG8gdXNlIFsnc29ja3M1Oi8vNzguOTQuMTcyLjQyOjEwODAnLCAnaHR0cDovL2xvY2FsaG9zdDoxMDgwJ11cbiAgICAgIHByb3hpZXM6IG51bGwsXG4gICAgICAvLyBhIGZpbGUgd2l0aCBvbmUgcHJveHkgcGVyIGxpbmUuIEV4YW1wbGU6XG4gICAgICAvLyBzb2NrczU6Ly83OC45NC4xNzIuNDI6MTA4MFxuICAgICAgLy8gaHR0cDovLzExOC4xNzQuMjMzLjEwOjQ4NDAwXG4gICAgICBwcm94eV9maWxlOiBcIlwiLFxuICAgICAgLy8gd2hldGhlciB0byB1c2UgcHJveGllcyBvbmx5XG4gICAgICAvLyB3aGVuIHRoaXMgaXMgc2V0IHRvIHRydWUsIHNlLXNjcmFwZXIgd2lsbCBub3QgdXNlXG4gICAgICAvLyB5b3VyIGRlZmF1bHQgSVAgYWRkcmVzc1xuICAgICAgdXNlX3Byb3hpZXNfb25seTogZmFsc2UsXG4gICAgICAvLyBjaGVjayBpZiBoZWFkbGVzcyBjaHJvbWUgZXNjYXBlcyBjb21tb24gZGV0ZWN0aW9uIHRlY2huaXF1ZXNcbiAgICAgIC8vIHRoaXMgaXMgYSBxdWljayB0ZXN0IGFuZCBzaG91bGQgYmUgdXNlZCBmb3IgZGVidWdnaW5nXG4gICAgICB0ZXN0X2V2YXNpb246IGZhbHNlLFxuICAgICAgYXBwbHlfZXZhc2lvbl90ZWNobmlxdWVzOiB0cnVlLFxuICAgICAgLy8gc2V0dGluZ3MgZm9yIHB1cHBldGVlci1jbHVzdGVyXG4gICAgICBwdXBwZXRlZXJfY2x1c3Rlcl9jb25maWc6IHtcbiAgICAgICAgdGltZW91dDogMzAgKiA2MCAqIDEwMDAsIC8vIG1heCB0aW1lb3V0IHNldCB0byAzMCBtaW51dGVzXG4gICAgICAgIG1vbml0b3I6IGZhbHNlLFxuICAgICAgICBjb25jdXJyZW5jeTogQ2x1c3Rlci5DT05DVVJSRU5DWV9CUk9XU0VSLFxuICAgICAgICBtYXhDb25jdXJyZW5jeTogMSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgXG4gICAgdGhpcy5sb2dnZXIgPSB0aGlzLmNvbmZpZy5sb2dnZXI7XG5cbiAgICBpZiAoY29uZmlnLnNsZWVwX3JhbmdlKSB7XG4gICAgICAvLyBwYXJzZSBhbiBhcnJheVxuICAgICAgY29uZmlnLnNsZWVwX3JhbmdlID0gZXZhbChjb25maWcuc2xlZXBfcmFuZ2UpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGNvbmZpZy5zbGVlcF9yYW5nZS5sZW5ndGggIT09IDIgXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgXCJzbGVlcF9yYW5nZSBpcyBub3QgYSB2YWxpZCBhcnJheSBvZiB0d28gaW50ZWdlcnMuXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZzLmV4aXN0c1N5bmModGhpcy5jb25maWcua2V5d29yZF9maWxlKSkge1xuICAgICAgdGhpcy5jb25maWcua2V5d29yZHMgPSByZWFkX2tleXdvcmRzX2Zyb21fZmlsZSh0aGlzLmNvbmZpZy5rZXl3b3JkX2ZpbGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5wcm94aWVzICYmIHRoaXMuY29uZmlnLnByb3h5X2ZpbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJFaXRoZXIgdXNlIGEgcHJveHlfZmlsZSBvciBzcGVjaWZ5IGEgcHJveHkgZm9yIGFsbCBjb25uZWN0aW9ucy4gRG8gbm90IHVzZSBib3RoIG9wdGlvbnMuXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLnByb3h5X2ZpbGUpIHtcbiAgICAgIHRoaXMuY29uZmlnLnByb3hpZXMgPSByZWFkX2tleXdvcmRzX2Zyb21fZmlsZSh0aGlzLmNvbmZpZy5wcm94eV9maWxlKTtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oYCR7dGhpcy5jb25maWcucHJveGllcy5sZW5ndGh9IHByb3hpZXMgcmVhZCBmcm9tIGZpbGUuYCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5wcm94aWVzICYmIHRoaXMuY29uZmlnLnVzZV9wcm94aWVzX29ubHkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJNdXN0IHByb3ZpZGUgYXQgbGVhc3Qgb25lIHByb3h5IGluIHByb3hpZXMgaWYgeW91IGVuYWJsZSB1c2VfcHJveGllc19vbmx5XCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZGVidWcoXCJ0aGlzLmNvbmZpZz0lT1wiLCB0aGlzLmNvbmZpZyk7XG4gIH1cblxuICAvKlxuICAgKiBMYXVuY2hlcyB0aGUgcHVwcGV0ZWVyIGNsdXN0ZXIgb3IgYnJvd3Nlci5cbiAgICpcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBicm93c2VyIHdhcyBzdWNjZXNzZnVsbHkgbGF1bmNoZWQuIE90aGVyd2lzZSB3aWxsIHJldHVybiBmYWxzZS5cbiAgICovXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5jdXN0b21fZnVuYykge1xuICAgICAgaWYgKGZzLmV4aXN0c1N5bmModGhpcy5jb25maWcuY3VzdG9tX2Z1bmMpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgUGx1Z2dhYmxlQ2xhc3MgPSByZXF1aXJlKHRoaXMuY29uZmlnLmN1c3RvbV9mdW5jKTtcbiAgICAgICAgICB0aGlzLnBsdWdnYWJsZSA9IG5ldyBQbHVnZ2FibGVDbGFzcyh7XG4gICAgICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgICAgICAgY29udGV4dDogdGhpcy5jb250ZXh0LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGV4Y2VwdGlvbik7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBGaWxlIFwiJHt0aGlzLmNvbmZpZy5jdXN0b21fZnVuY31cIiBkb2VzIG5vdCBleGlzdCFgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNocm9tZV9mbGFncyA9IF8uY2xvbmUodGhpcy5jb25maWcuY2hyb21lX2ZsYWdzKTtcblxuICAgIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5zdGFydF9icm93c2VyKSB7XG4gICAgICAvLyBsYXVuY2hfYXJncy5jb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgIHRoaXMuYnJvd3NlciA9IGF3YWl0IHRoaXMucGx1Z2dhYmxlLnN0YXJ0X2Jyb3dzZXIoe1xuICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgfSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIjIyOVwiKVxuICAgICAgdGhpcy5wYWdlID0gYXdhaXQgdGhpcy5icm93c2VyLm5ld1BhZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgXG4gICAgICAvLyBpZiBubyBjdXN0b20gc3RhcnRfYnJvd3NlciBmdW5jdGlvbmFsaXR5IHdhcyBnaXZlblxuICAgICAgLy8gdXNlIHB1cHBldGVlci1jbHVzdGVyIGZvciBzY3JhcGluZ1xuXG4gICAgICBsZXQgcHJveGllcztcbiAgICAgIC8vIGlmIHdlIGhhdmUgYXQgbGVhc3Qgb25lIHByb3h5LCBhbHdheXMgdXNlIENPTkNVUlJFTkNZX0JST1dTRVJcbiAgICAgIC8vIGFuZCBzZXQgbWF4Q29uY3VycmVuY3kgdG8gdGhpcy5jb25maWcucHJveGllcy5sZW5ndGggKyAxXG4gICAgICAvLyBlbHNlIHVzZSB3aGF0ZXZlciB0aGlzLmNvbmZpZ3VyYXRpb24gd2FzIHBhc3NlZFxuICAgICAgaWYgKHRoaXMuY29uZmlnLnByb3hpZXMgJiYgdGhpcy5jb25maWcucHJveGllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGJlY2F1c2Ugd2UgdXNlIHJlYWwgYnJvd3NlcnMsIHdlIHJhbiBvdXQgb2YgbWVtb3J5IG9uIG5vcm1hbCBsYXB0b3BzXG4gICAgICAgIC8vIHdoZW4gdXNpbmcgbW9yZSB0aGFuIG1heWJlIDUgb3IgNiBicm93c2Vycy5cbiAgICAgICAgLy8gdGhlcmVmb3JlIGhhcmRjb2RlIGEgbGltaXQgaGVyZVxuICAgICAgICAvLyBUT0RPIG5vdCBzdXJlIHRoaXMgd2hhdCB3ZSB3YW50XG4gICAgICAgIHRoaXMubnVtQ2x1c3RlcnMgPSBNYXRoLm1pbihcbiAgICAgICAgICB0aGlzLmNvbmZpZy5wcm94aWVzLmxlbmd0aCArICh0aGlzLmNvbmZpZy51c2VfcHJveGllc19vbmx5ID8gMCA6IDEpLFxuICAgICAgICAgIE1BWF9BTExPV0VEX0JST1dTRVJTXG4gICAgICAgICk7XG4gICAgICAgIHByb3hpZXMgPSBfLmNsb25lKHRoaXMuY29uZmlnLnByb3hpZXMpO1xuXG4gICAgICAgIC8vIEluc2VydCBhIGZpcnN0IGNvbmZpZyB3aXRob3V0IHByb3h5IGlmIHVzZV9wcm94eV9vbmx5IGlzIGZhbHNlXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy51c2VfcHJveGllc19vbmx5ID09PSBmYWxzZSkge1xuICAgICAgICAgIHByb3hpZXMudW5zaGlmdChudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5udW1DbHVzdGVycyA9IHRoaXMuY29uZmlnLnB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZy5tYXhDb25jdXJyZW5jeTtcbiAgICAgICAgcHJveGllcyA9IF8udGltZXModGhpcy5udW1DbHVzdGVycywgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFVzaW5nICR7dGhpcy5udW1DbHVzdGVyc30gY2x1c3RlcnMuYCk7XG5cbiAgICAgIC8vIEdpdmUgdGhlIHBlciBicm93c2VyIG9wdGlvbnNcbiAgICAgIGNvbnN0IHBlckJyb3dzZXJPcHRpb25zID0gXy5tYXAocHJveGllcywgKHByb3h5KSA9PiB7XG4gICAgICAgIGNvbnN0IHVzZXJBZ2VudCA9IHRoaXMuY29uZmlnLnJhbmRvbV91c2VyX2FnZW50XG4gICAgICAgICAgPyBuZXcgVXNlckFnZW50KHsgZGV2aWNlQ2F0ZWdvcnk6IFwiZGVza3RvcFwiIH0pLnRvU3RyaW5nKClcbiAgICAgICAgICA6IHRoaXMuY29uZmlnLnVzZXJfYWdlbnQ7XG4gICAgICAgIGxldCBhcmdzID0gY2hyb21lX2ZsYWdzLmNvbmNhdChbYC0tdXNlci1hZ2VudD0ke3VzZXJBZ2VudH1gXSk7XG5cbiAgICAgICAgaWYgKHByb3h5KSB7XG4gICAgICAgICAgYXJncyA9IGFyZ3MuY29uY2F0KFtgLS1wcm94eS1zZXJ2ZXI9JHtwcm94eX1gXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhlYWRsZXNzOiB0aGlzLmNvbmZpZy5oZWFkbGVzcyxcbiAgICAgICAgICBpZ25vcmVIVFRQU0Vycm9yczogdHJ1ZSxcbiAgICAgICAgICBhcmdzLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGRlYnVnKFwicGVyQnJvd3Nlck9wdGlvbnM9JU9cIiwgcGVyQnJvd3Nlck9wdGlvbnMpO1xuXG4gICAgICAvLyBwdXBwZXRlZXIudXNlKF9TdGVhbHRoUGx1Z2luKCkpO1xuICAgICAgLy8gcHVwcGV0ZWVyLnVzZShfQWRibG9ja2VyUGx1Z2luKCkpO1xuXG4gICAgICBjb25zdCBwdXBwZXRlZXIgPSBhZGRFeHRyYSh2YW5pbGxhUHVwcGV0ZWVyKTtcblxuICAgICAgLy8gQWRkIHN0ZWFsdGggcGx1Z2luIGFuZCB1c2UgZGVmYXVsdHMgKGFsbCB0cmlja3MgdG8gaGlkZSBwdXBwZXRlZXIgdXNhZ2UpXG4gICAgICAvLyAgcHVwcGV0ZWVyLnVzZShTdGVhbHRoKCkpO1xuXG4gICAgICAvLyBBZGQgYWRibG9ja2VyIHBsdWdpbiB0byBibG9jayBhbGwgYWRzIGFuZCB0cmFja2VycyAoc2F2ZXMgYmFuZHdpZHRoKVxuICAgICAgLy8gcHVwcGV0ZWVyLnVzZShBZGJsb2NrZXJQbHVnaW4oeyBibG9ja1RyYWNrZXJzOiB0cnVlIH0pKTtcblxuICAgICAgdGhpcy5jbHVzdGVyID0gYXdhaXQgQ2x1c3Rlci5sYXVuY2goe1xuICAgICAgICBwdXBwZXRlZXIsXG4gICAgICAgIG1vbml0b3I6IHRoaXMuY29uZmlnLnB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZy5tb25pdG9yLFxuICAgICAgICB0aW1lb3V0OiB0aGlzLmNvbmZpZy5wdXBwZXRlZXJfY2x1c3Rlcl9jb25maWcudGltZW91dCwgLy8gbWF4IHRpbWVvdXQgc2V0IHRvIDMwIG1pbnV0ZXNcbiAgICAgICAgY29uY3VycmVuY3k6IEN1c3RvbUNvbmN1cnJlbmN5SW1wbCxcbiAgICAgICAgbWF4Q29uY3VycmVuY3k6IHRoaXMubnVtQ2x1c3RlcnMsXG4gICAgICAgIHB1cHBldGVlck9wdGlvbnM6IHtcbiAgICAgICAgICAvLyBwdXBwZXRlZXI6cHVwcGV0ZWVyLFxuICAgICAgICAgIHBlckJyb3dzZXJPcHRpb25zOiBwZXJCcm93c2VyT3B0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIGxvZ2luIHRoZSBzb2NpbGEgbWVkaWEgcGxhdGZvcm1cbiAgICovXG4gIGFzeW5jIGxvZ2luKHNjcmFwZV9jb25maWcgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIHNjcmFwZV9jb25maWcpO1xuXG4gICAgLy8gdmFyIHJlc3VsdHMgPSB7fTtcbiAgICAvLyB2YXIgbnVtX3JlcXVlc3RzID0gMDtcbiAgICAvLyB2YXIgbWV0YWRhdGEgPSB7fTtcbiAgICAvLyB2YXIgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcblxuICAgIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5zdGFydF9icm93c2VyKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZy5wbGF0Zm9ybSlcbiAgICAgIHRoaXMuc2NyYXBlciA9IGdldFNjcmFwZXIodGhpcy5jb25maWcucGxhdGZvcm0sIHtcbiAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgICAgY29udGV4dDogdGhpcy5jb250ZXh0LFxuICAgICAgICBwbHVnZ2FibGU6IHRoaXMucGx1Z2dhYmxlLFxuICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICAgIHRtcHBhdGg6IHRoaXMudG1wcGF0aCxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLnNjcmFwZXIucnVuTG9naW4odGhpcy5wYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRWFjaCBicm93c2VyIHdpbGwgZ2V0IE4vKEsrMSkga2V5d29yZHMgYW5kIHdpbGwgaXNzdWUgTi8oSysxKSAqIE0gdG90YWwgcmVxdWVzdHMgdG8gdGhlIHNlYXJjaCBlbmdpbmUuXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3B1cHBldGVlci9pc3N1ZXMvNjc4XG4gICAgICAvLyBUaGUgcXVlc3Rpb24gaXM6IElzIGl0IHBvc3NpYmxlIHRvIHNldCBwcm94aWVzIHBlciBQYWdlPyBQZXIgQnJvd3Nlcj9cbiAgICAgIC8vIGFzIGZhciBhcyBJIGNhbiBzZWUsIHB1cHBldGVlciBjbHVzdGVyIHVzZXMgdGhlIHNhbWUgcHVwcGV0ZWVyT3B0aW9uc1xuICAgICAgLy8gZm9yIGV2ZXJ5IGJyb3dzZXIgaW5zdGFuY2UuIFdlIHdpbGwgdXNlIG91ciBjdXN0b20gcHVwcGV0ZWVyLWNsdXN0ZXIgdmVyc2lvbi5cbiAgICAgIC8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3Byb3h5LWNoYWluXG4gICAgICAvLyB0aGlzIGFuc3dlciBsb29rcyBuaWNlOiBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3B1cHBldGVlci9pc3N1ZXMvNjc4I2lzc3VlY29tbWVudC0zODkwOTYwNzdcbiAgICAgIGxldCBjaHVua3MgPSBbXTtcbiAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdGhpcy5udW1DbHVzdGVyczsgbisrKSB7XG4gICAgICAgIGNodW5rcy5wdXNoKFtdKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5jb25maWcua2V5d29yZHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgY2h1bmtzW2sgJSB0aGlzLm51bUNsdXN0ZXJzXS5wdXNoKHRoaXMuY29uZmlnLmtleXdvcmRzW2tdKTtcbiAgICAgIH1cblxuICAgICAgZGVidWcoXCJjaHVua3M9JW9cIiwgY2h1bmtzKTtcblxuICAgICAgbGV0IGV4ZWNQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBjaHVua3MubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gXy5jbG9uZSh0aGlzLmNvbmZpZyk7XG4gICAgICAgIGNvbmZpZy5rZXl3b3JkcyA9IGNodW5rc1tjXTtcblxuICAgICAgICB2YXIgb2JqID0gZ2V0U2NyYXBlcih0aGlzLmNvbmZpZy5wbGF0Zm9ybSwge1xuICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgICAgIHBsdWdnYWJsZTogdGhpcy5wbHVnZ2FibGUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBib3VuZE1ldGhvZCA9IG9iai5ydW5Mb2dpbi5iaW5kKG9iaik7XG4gICAgICAgIGV4ZWNQcm9taXNlcy5wdXNoKHRoaXMuY2x1c3Rlci5leGVjdXRlKHt9LCBib3VuZE1ldGhvZCkpO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChleGVjUHJvbWlzZXMpO1xuXG4gICAgICAvLyBNZXJnZSByZXN1bHRzIGFuZCBtZXRhZGF0YSBwZXIga2V5d29yZFxuICAgICAgLy8gZm9yIChsZXQgcHJvbWlzZVJldHVybiBvZiBwcm9taXNlUmV0dXJucykge1xuICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0cywgcHJvbWlzZVJldHVybi5yZXN1bHRzKTtcbiAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKG1ldGFkYXRhLCBwcm9taXNlUmV0dXJuLm1ldGFkYXRhKTtcbiAgICAgIC8vICAgICBudW1fcmVxdWVzdHMgKz0gcHJvbWlzZVJldHVybi5udW1fcmVxdWVzdHM7XG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgLy8gbGV0IHRpbWVEZWx0YSA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XG4gICAgLy8gbGV0IG1zX3Blcl9yZXF1ZXN0ID0gdGltZURlbHRhL251bV9yZXF1ZXN0cztcblxuICAgIC8vIHRoaXMubG9nZ2VyLmluZm8oYFNjcmFwZXIgdG9vayAke3RpbWVEZWx0YX1tcyB0byBwZXJmb3JtICR7bnVtX3JlcXVlc3RzfSByZXF1ZXN0cy5gKTtcbiAgICAvLyB0aGlzLmxvZ2dlci5pbmZvKGBPbiBhdmVyYWdlIG1zL3JlcXVlc3Q6ICR7bXNfcGVyX3JlcXVlc3R9bXMvcmVxdWVzdGApO1xuXG4gICAgLy8gaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9yZXN1bHRzKSB7XG4gICAgLy8gICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9yZXN1bHRzKHJlc3VsdHMpO1xuICAgIC8vIH1cblxuICAgIC8vIG1ldGFkYXRhLmVsYXBzZWRfdGltZSA9IHRpbWVEZWx0YS50b1N0cmluZygpO1xuICAgIC8vIG1ldGFkYXRhLm1zX3Blcl9rZXl3b3JkID0gbXNfcGVyX3JlcXVlc3QudG9TdHJpbmcoKTtcbiAgICAvLyBtZXRhZGF0YS5udW1fcmVxdWVzdHMgPSBudW1fcmVxdWVzdHM7XG5cbiAgICAvLyBkZWJ1ZygnbWV0YWRhdGE9JU8nLCBtZXRhZGF0YSk7XG5cbiAgICAvLyBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX21ldGFkYXRhKSB7XG4gICAgLy8gICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9tZXRhZGF0YShtZXRhZGF0YSk7XG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKHRoaXMuY29uZmlnLm91dHB1dF9maWxlKSB7XG4gICAgLy8gICAgIHRoaXMubG9nZ2VyLmluZm8oYFdyaXRpbmcgcmVzdWx0cyB0byAke3RoaXMuY29uZmlnLm91dHB1dF9maWxlfWApO1xuICAgIC8vICAgICB3cml0ZV9yZXN1bHRzKHRoaXMuY29uZmlnLm91dHB1dF9maWxlLCBKU09OLnN0cmluZ2lmeShyZXN1bHRzLCBudWxsLCA0KSk7XG4gICAgLy8gfVxuXG4gICAgLy8gcmV0dXJuIHtcbiAgICAvLyAgICAgcmVzdWx0czogcmVzdWx0cyxcbiAgICAvLyAgICAgbWV0YWRhdGE6IG1ldGFkYXRhIHx8IHt9LFxuICAgIC8vIH07XG4gIH1cblxuICAvKlxuICAgKiBnZXQgZGF0YSB1cmwgZnJvbSBwbGF0Zm9ybVxuICAgKi9cbiAgYXN5bmMgc2VhcmNoZGF0YShzY3JhcGVfY29uZmlnID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcblxuICAgIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5zdGFydF9icm93c2VyKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZy5wbGF0Zm9ybSlcbiAgICAgIHRoaXMuc2NyYXBlciA9IGdldFNjcmFwZXIodGhpcy5jb25maWcucGxhdGZvcm0sIHtcbiAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgICAgY29udGV4dDogdGhpcy5jb250ZXh0LFxuICAgICAgICBwbHVnZ2FibGU6IHRoaXMucGx1Z2dhYmxlLFxuICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICAgIHRtcHBhdGg6IHRoaXMudG1wcGF0aCxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLnNjcmFwZXIud29ya2Vyc2VhcmNoZGF0YSh0aGlzLnBhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBFYWNoIGJyb3dzZXIgd2lsbCBnZXQgTi8oSysxKSBrZXl3b3JkcyBhbmQgd2lsbCBpc3N1ZSBOLyhLKzEpICogTSB0b3RhbCByZXF1ZXN0cyB0byB0aGUgc2VhcmNoIGVuZ2luZS5cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvcHVwcGV0ZWVyL2lzc3Vlcy82NzhcbiAgICAgIC8vIFRoZSBxdWVzdGlvbiBpczogSXMgaXQgcG9zc2libGUgdG8gc2V0IHByb3hpZXMgcGVyIFBhZ2U/IFBlciBCcm93c2VyP1xuICAgICAgLy8gYXMgZmFyIGFzIEkgY2FuIHNlZSwgcHVwcGV0ZWVyIGNsdXN0ZXIgdXNlcyB0aGUgc2FtZSBwdXBwZXRlZXJPcHRpb25zXG4gICAgICAvLyBmb3IgZXZlcnkgYnJvd3NlciBpbnN0YW5jZS4gV2Ugd2lsbCB1c2Ugb3VyIGN1c3RvbSBwdXBwZXRlZXItY2x1c3RlciB2ZXJzaW9uLlxuICAgICAgLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvcHJveHktY2hhaW5cbiAgICAgIC8vIHRoaXMgYW5zd2VyIGxvb2tzIG5pY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvcHVwcGV0ZWVyL2lzc3Vlcy82NzgjaXNzdWVjb21tZW50LTM4OTA5NjA3N1xuICAgICAgbGV0IGNodW5rcyA9IFtdO1xuICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB0aGlzLm51bUNsdXN0ZXJzOyBuKyspIHtcbiAgICAgICAgY2h1bmtzLnB1c2goW10pO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmNvbmZpZy5rZXl3b3Jkcy5sZW5ndGg7IGsrKykge1xuICAgICAgICBjaHVua3NbayAlIHRoaXMubnVtQ2x1c3RlcnNdLnB1c2godGhpcy5jb25maWcua2V5d29yZHNba10pO1xuICAgICAgfVxuXG4gICAgICBkZWJ1ZyhcImNodW5rcz0lb1wiLCBjaHVua3MpO1xuXG4gICAgICBsZXQgZXhlY1Byb21pc2VzID0gW107XG4gICAgICBmb3IgKHZhciBjID0gMDsgYyA8IGNodW5rcy5sZW5ndGg7IGMrKykge1xuICAgICAgICBjb25zdCBjb25maWcgPSBfLmNsb25lKHRoaXMuY29uZmlnKTtcbiAgICAgICAgY29uZmlnLmtleXdvcmRzID0gY2h1bmtzW2NdO1xuXG4gICAgICAgIHZhciBvYmogPSBnZXRTY3JhcGVyKHRoaXMuY29uZmlnLnBsYXRmb3JtLCB7XG4gICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgY29udGV4dDoge30sXG4gICAgICAgICAgcGx1Z2dhYmxlOiB0aGlzLnBsdWdnYWJsZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGJvdW5kTWV0aG9kID0gb2JqLndvcmtlcnNlYXJjaGRhdGEuYmluZChvYmopO1xuICAgICAgICBleGVjUHJvbWlzZXMucHVzaCh0aGlzLmNsdXN0ZXIuZXhlY3V0ZSh7fSwgYm91bmRNZXRob2QpKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoZXhlY1Byb21pc2VzKTtcblxuICAgICAgLy8gTWVyZ2UgcmVzdWx0cyBhbmQgbWV0YWRhdGEgcGVyIGtleXdvcmRcbiAgICAgIC8vIGZvciAobGV0IHByb21pc2VSZXR1cm4gb2YgcHJvbWlzZVJldHVybnMpIHtcbiAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKHJlc3VsdHMsIHByb21pc2VSZXR1cm4ucmVzdWx0cyk7XG4gICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihtZXRhZGF0YSwgcHJvbWlzZVJldHVybi5tZXRhZGF0YSk7XG4gICAgICAvLyAgICAgbnVtX3JlcXVlc3RzICs9IHByb21pc2VSZXR1cm4ubnVtX3JlcXVlc3RzO1xuICAgICAgLy8gfVxuICAgIH1cblxuICAgIC8vIGxldCB0aW1lRGVsdGEgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgIC8vIGxldCBtc19wZXJfcmVxdWVzdCA9IHRpbWVEZWx0YS9udW1fcmVxdWVzdHM7XG5cbiAgICAvLyB0aGlzLmxvZ2dlci5pbmZvKGBTY3JhcGVyIHRvb2sgJHt0aW1lRGVsdGF9bXMgdG8gcGVyZm9ybSAke251bV9yZXF1ZXN0c30gcmVxdWVzdHMuYCk7XG4gICAgLy8gdGhpcy5sb2dnZXIuaW5mbyhgT24gYXZlcmFnZSBtcy9yZXF1ZXN0OiAke21zX3Blcl9yZXF1ZXN0fW1zL3JlcXVlc3RgKTtcblxuICAgIC8vIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfcmVzdWx0cykge1xuICAgIC8vICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfcmVzdWx0cyhyZXN1bHRzKTtcbiAgICAvLyB9XG5cbiAgICAvLyBtZXRhZGF0YS5lbGFwc2VkX3RpbWUgPSB0aW1lRGVsdGEudG9TdHJpbmcoKTtcbiAgICAvLyBtZXRhZGF0YS5tc19wZXJfa2V5d29yZCA9IG1zX3Blcl9yZXF1ZXN0LnRvU3RyaW5nKCk7XG4gICAgLy8gbWV0YWRhdGEubnVtX3JlcXVlc3RzID0gbnVtX3JlcXVlc3RzO1xuXG4gICAgLy8gZGVidWcoJ21ldGFkYXRhPSVPJywgbWV0YWRhdGEpO1xuXG4gICAgLy8gaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9tZXRhZGF0YSkge1xuICAgIC8vICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfbWV0YWRhdGEobWV0YWRhdGEpO1xuICAgIC8vIH1cblxuICAgIC8vIGlmICh0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZSkge1xuICAgIC8vICAgICB0aGlzLmxvZ2dlci5pbmZvKGBXcml0aW5nIHJlc3VsdHMgdG8gJHt0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZX1gKTtcbiAgICAvLyAgICAgd3JpdGVfcmVzdWx0cyh0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZSwgSlNPTi5zdHJpbmdpZnkocmVzdWx0cywgbnVsbCwgNCkpO1xuICAgIC8vIH1cblxuICAgIC8vIHJldHVybiB7XG4gICAgLy8gICAgIHJlc3VsdHM6IHJlc3VsdHMsXG4gICAgLy8gICAgIG1ldGFkYXRhOiBtZXRhZGF0YSB8fCB7fSxcbiAgICAvLyB9O1xuICB9XG5cbiAgLypcbiAgICogUXVpdCB0aGUgcHVwcGV0ZWVyIGNsdXN0ZXIvYnJvd3Nlci5cbiAgICovXG4gIGFzeW5jIHF1aXQoKSB7XG4gICAgaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmNsb3NlX2Jyb3dzZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmNsb3NlX2Jyb3dzZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5jbHVzdGVyLmlkbGUoKTtcbiAgICAgIGF3YWl0IHRoaXMuY2x1c3Rlci5jbG9zZSgpO1xuICAgIH1cbiAgfVxuICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNjcmFwZU1hbmFnZXI6IFNjcmFwZU1hbmFnZXIsXG59O1xuIiwiZXhwb3J0IHsgfTtcbmNvbnN0IGF4aW9zID0gcmVxdWlyZShcImF4aW9zXCIpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdSZW1vdGVTb3VyY2U6UmVtb3RlU291cmNlJyk7XG5jb25zdCBGb3JtRGF0YSA9IHJlcXVpcmUoJ2Zvcm0tZGF0YScpO1xudHlwZSBzb3NldHRpbmcgPSB7XG4gIHNvdHlwZTogc3RyaW5nO1xuICBzb2NpYWx1c2VyOiBzdHJpbmc7XG4gIHNvY2lhbHBhc3M6IHN0cmluZztcbiAgcHJveHk6IHtcbiAgICBwcm94eTogc3RyaW5nO1xuICAgIHVzZXI6IHN0cmluZztcbiAgICBwYXNzOiBzdHJpbmc7XG4gIH0sXG59XG5leHBvcnQgdHlwZSBMaW5rZGF0YSA9IHtcbiAgdGl0bGU6IHN0cmluZyxcbiAgdXJsOiBzdHJpbmcsXG4gIGNvbnRlbnQ/OiBzdHJpbmcsXG4gIGxhbmc6IHN0cmluZyxcbiAgc29jaWFsdGFza19pZDogbnVtYmVyLFxufVxudHlwZSBzb2NpYWxUYXNrID0ge1xuICBpZDogbnVtYmVyLFxuICBjYW1wYWlnbl9pZDogbnVtYmVyLFxuICBjYW1wYWlnbl9uYW1lOiBzdHJpbmcsXG4gIHRhZzogc3RyaW5nLFxuICB0eXBlOiBzdHJpbmcsXG4gIGtleXdvcmRzOiBBcnJheTxzdHJpbmc+LFxufVxudHlwZSBjb25maWdUeXBlID0ge1xuICBSRU1PVEVBREQ6IHN0cmluZyxcbiAgUkVNT1RFVVNFUk5BTUU6IHN0cmluZyxcbiAgUkVNT1RFUEFTU1dPUkQ6IHN0cmluZyxcbn1cbmV4cG9ydCBjbGFzcyBSZW1vdGVTb3VyY2Uge1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUmVtb3RlU291cmNlO1xuICBSRU1PVEVBREQ6IHN0cmluZztcbiAgUkVNT1RFVVNFUk5BTUU6IHN0cmluZztcbiAgUkVNT1RFUEFTU1dPUkQ6IHN0cmluZztcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLnJlYWRlbnYoKTtcbiAgICB0aGlzLlJFTU9URUFERCA9IGNvbmZpZy5SRU1PVEVBREQ7XG4gICAgdGhpcy5SRU1PVEVVU0VSTkFNRSA9IGNvbmZpZy5SRU1PVEVVU0VSTkFNRTtcbiAgICB0aGlzLlJFTU9URVBBU1NXT1JEID0gY29uZmlnLlJFTU9URVBBU1NXT1JEO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBSZW1vdGVTb3VyY2Uge1xuICAgIGlmICghUmVtb3RlU291cmNlLmluc3RhbmNlKSB7XG4gICAgICBSZW1vdGVTb3VyY2UuaW5zdGFuY2UgPSBuZXcgUmVtb3RlU291cmNlKCk7XG4gICAgfVxuICAgIHJldHVybiBSZW1vdGVTb3VyY2UuaW5zdGFuY2U7XG4gIH1cblxuXG4gIHJlYWRlbnYoKTogY29uZmlnVHlwZSB7XG4gICAgLy9yZWFkIGNvbmZpZyBmcm9tIC5lbnYgZmlsZVxuICAgIGxldCBlbnZjb2ZpZyA9IHRoaXMucmVhZENvbmZpZygpO1xuICAgIGRlYnVnKGVudmNvZmlnKVxuICAgIC8vY2hlY2sga2V5IGV4aXN0IGluIG9iamVjdFxuICAgIGlmICghZW52Y29maWcuaGFzT3duUHJvcGVydHkoXCJSRU1PVEVBRERcIikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUkVNT1RFQUREIG5vdCBmb3VuZCBpbiAuZW52IGZpbGVgKTtcbiAgICB9XG4gICAgaWYgKCFlbnZjb2ZpZy5oYXNPd25Qcm9wZXJ0eShcIlJFTU9URVVTRVJOQU1FXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVTRVJOQU1FIG5vdCBmb3VuZCBpbiAuZW52IGZpbGVgKTtcbiAgICB9XG4gICAgaWYgKCFlbnZjb2ZpZy5oYXNPd25Qcm9wZXJ0eShcIlJFTU9URVBBU1NXT1JEXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBBU1NXT1JEIG5vdCBmb3VuZCBpbiAuZW52IGZpbGVgKTtcbiAgICB9XG4gICAgcmV0dXJuIGVudmNvZmlnIGFzIGNvbmZpZ1R5cGU7XG4gIH1cblxuICAvKipcbiAgICogcmVhZCBjb25maWcgZnJvbSAuZW52IEZpbGVcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gY29uZmlnXG4gICAqICovXG4gIHJlYWRDb25maWcoKTogb2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQgPSByZXF1aXJlKFwiZG90ZW52XCIpLmNvbmZpZygpO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgIHRocm93IHJlc3VsdC5lcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5wYXJzZWQ7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHJlc3BvbnNlIGZyb20gcmVtb3RlIHNlcnZpdmVcbiAgICogQHJldHVybiBvYmplY3RcbiAgICovXG4gIGFzeW5jIGdldFJlbW90ZUNvbmZpZyhjYW1wYWlnbklkKTogUHJvbWlzZTxzb3NldHRpbmc+IHtcbiAgICAvLyBsZXQgZW52Y29uZmlnID0gYXdhaXQgcmVhZGVudigpO1xuXG4gICAgbGV0IHNvc2V0dmFyID0gYXdhaXQgYXhpb3NcbiAgICAgIC5nZXQodGhpcy5SRU1PVEVBREQgKyBcIi9hcGkvZ2V0c29ieUNhbS8/Y2FtcGFpZ25faWQ9XCIgKyBjYW1wYWlnbklkLCB7XG4gICAgICAgIGF1dGg6IHtcbiAgICAgICAgICB1c2VybmFtZTogdGhpcy5SRU1PVEVVU0VSTkFNRSxcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy5SRU1PVEVQQVNTV09SRCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChwYXJzZUludChyZXMuc3RhdHVzKSAhPSAyMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb2RlIG5vdCBlcXVhbCAyMDBcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXMuZGF0YS5zdGF0dXMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb2RlIG5vdCBlcXVhbCAyMDBcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLnN0YXR1cylcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmRhdGEuZGF0YS51c2VyKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhLnBhc3MpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEucHJveHkpXG4gICAgICAgIGNvbnN0IHNvc2V0dGluZyA9IHtcbiAgICAgICAgICBzb3R5cGU6IHJlcy5kYXRhLmRhdGEuc290eXBlLFxuICAgICAgICAgIHNvY2lhbHVzZXI6IHJlcy5kYXRhLmRhdGEudXNlcixcbiAgICAgICAgICBzb2NpYWxwYXNzOiByZXMuZGF0YS5kYXRhLnBhc3MsXG4gICAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAgIHByb3h5OiByZXMuZGF0YS5kYXRhLnByb3h5LnVybCxcbiAgICAgICAgICAgIHVzZXI6IHJlcy5kYXRhLmRhdGEucHJveHkudXNlcixcbiAgICAgICAgICAgIHBhc3M6IHJlcy5kYXRhLmRhdGEucHJveHkucGFzcyxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc29zZXR0aW5nO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBzb3NldHZhcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgY2FtcGFpZ24gZnJvbSByZW1vdGUgc2Vydml2ZVxuICAgKi9cbiAgYXN5bmMgZ2V0Q2FtcGFpZ25saXN0KCk6IFByb21pc2U8QXJyYXk8c29jaWFsVGFzaz4+IHtcbiAgICBjb25zdCBjYW1waWdubGlzdCA9IGF3YWl0IGF4aW9zXG4gICAgICAuZ2V0KHRoaXMuUkVNT1RFQUREICsgXCIvYXBpL2xpc3Rzb3Rhc2tcIiwge1xuICAgICAgICBhdXRoOiB7XG4gICAgICAgICAgdXNlcm5hbWU6IHRoaXMuUkVNT1RFVVNFUk5BTUUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMuUkVNT1RFUEFTU1dPUkQsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocGFyc2VJbnQocmVzLnN0YXR1cykgIT0gMjAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29kZSBub3QgZXF1YWwgMjAwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzLmRhdGEuZGF0YSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRhdGEgbm90IGV4aXN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXMuZGF0YS5kYXRhIGFzIEFycmF5PHNvY2lhbFRhc2s+O1xuXG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb2RlIG5vdCBlcXVhbCAyMDBcIik7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIGNhbXBpZ25saXN0O1xuICB9XG4gIC8qKlxuICAgKiBzYXZlIGxpbmsgdG8gcmVtb3RlIHNlcnZpdmVcbiAgICovXG4gIGFzeW5jIHNhdmVMaW5rcmVtb3RlKGxpbms6IExpbmtkYXRhKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCBGb3JtRGF0YSA9IHJlcXVpcmUoJ2Zvcm0tZGF0YScpO1xuICAgIGRlYnVnKGxpbmspXG4gICAgbGV0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBkYXRhLmFwcGVuZCgndGl0bGUnLCBsaW5rLnRpdGxlKTtcbiAgICBpZihsaW5rLmNvbnRlbnQpe1xuICAgIGRhdGEuYXBwZW5kKCdjb250ZW50JywgbGluay5jb250ZW50KTtcbiAgICB9XG4gICAgZGF0YS5hcHBlbmQoJ3VybCcsIGxpbmsudXJsKTtcbiAgICBkYXRhLmFwcGVuZCgnbGFuZycsIGxpbmsubGFuZyk7XG4gICAgaWYobGluay5zb2NpYWx0YXNrX2lkKXtcbiAgICBkYXRhLmFwcGVuZCgnc29jaWFsdGFza19pZCcsIGxpbmsuc29jaWFsdGFza19pZCk7XG4gICAgfVxuICAgIC8vIGRlYnVnKHRoaXMuUkVNT1RFVVNFUk5BTUUpXG4gICAgLy8gZGVidWcodGhpcy5SRU1PVEVQQVNTV09SRClcbiAgICBjb25zdCBsaW5rSWQ9YXdhaXQgYXhpb3MucG9zdCh0aGlzLlJFTU9URUFERCArIFwiL2FwaS9zYXZlc29saW5rXCIsIGRhdGEsXG4gICAge1xuICAgICAgYXV0aDoge1xuICAgICAgICB1c2VybmFtZTogdGhpcy5SRU1PVEVVU0VSTkFNRSxcbiAgICAgICAgcGFzc3dvcmQ6IHRoaXMuUkVNT1RFUEFTU1dPUkQsXG4gICAgICB9LFxuICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIC8vIGRlYnVnKHJlcyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgcmV0dXJuIHJlcy5kYXRhLmRhdGEgYXMgbnVtYmVyO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBsaW5rSWQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJlbW90ZVNvdXJjZTogUmVtb3RlU291cmNlLFxuXG59O1xuIiwiY29uc3QgeyBCcm93c2VyIH0gPSByZXF1aXJlKCdwdXBwZXRlZXItY2x1c3Rlci9kaXN0L2NvbmN1cnJlbmN5L2J1aWx0SW5Db25jdXJyZW5jeScpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzZS1zY3JhcGVyOkN1c3RvbUNvbmN1cnJlbmN5Jyk7XG5jb25zdCB7IHRpbWVvdXRFeGVjdXRlIH0gPSByZXF1aXJlKCdwdXBwZXRlZXItY2x1c3Rlci9kaXN0L3V0aWwnKTtcblxuY29uc3QgQlJPV1NFUl9USU1FT1VUID0gNTAwMDtcblxuY2xhc3MgQ3VzdG9tQ29uY3VycmVuY3kgZXh0ZW5kcyBCcm93c2VyIHtcblxuICAgIGFzeW5jIGluaXQoKSB7fVxuICAgIGFzeW5jIGNsb3NlKCkge31cblxuICAgIGFzeW5jIHdvcmtlckluc3RhbmNlKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zLnBlckJyb3dzZXJPcHRpb25zLnNoaWZ0KCk7XG4gICAgICAgIGRlYnVnKCdMYXVuY2ggcHVwcGV0ZWVyIGluc3RhbmNlIHdpdGggb3B0aW9ucz0lbycsIG9wdGlvbnMpO1xuICAgICAgICBsZXQgY2hyb21lID0gYXdhaXQgdGhpcy5wdXBwZXRlZXIubGF1bmNoKG9wdGlvbnMpO1xuICAgICAgICBsZXQgcGFnZTtcbiAgICAgICAgbGV0IGNvbnRleHQ7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGpvYkluc3RhbmNlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGltZW91dEV4ZWN1dGUoQlJPV1NFUl9USU1FT1VULCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gYXdhaXQgY2hyb21lLmNyZWF0ZUluY29nbml0b0Jyb3dzZXJDb250ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2UgPSBhd2FpdCBjb250ZXh0Lm5ld1BhZ2UoKTtcbiAgICAgICAgICAgICAgICB9KSgpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBjbG9zZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGltZW91dEV4ZWN1dGUoQlJPV1NFUl9USU1FT1VULCBjb250ZXh0LmNsb3NlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjbG9zZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IGNocm9tZS5jbG9zZSgpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVwYWlyOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ1N0YXJ0aW5nIHJlcGFpcicpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdpbGwgcHJvYmFibHkgZmFpbCwgYnV0IGp1c3QgaW4gY2FzZSB0aGUgcmVwYWlyIHdhcyBub3QgbmVjZXNzYXJ5XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGNocm9tZS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgICAgICAgICAvLyBqdXN0IHJlbGF1bmNoIGFzIHRoZXJlIGlzIG9ubHkgb25lIHBhZ2UgcGVyIGJyb3dzZXJcbiAgICAgICAgICAgICAgICBjaHJvbWUgPSBhd2FpdCB0aGlzLnB1cHBldGVlci5sYXVuY2gob3B0aW9ucyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ3VzdG9tQ29uY3VycmVuY3k7IiwiY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCBjcnlwdG8gPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuY29uc3QgaHR0cHMgPSByZXF1aXJlKFwiaHR0cHNcIik7XG5jb25zdCBwcm9ncmVzcyA9IHJlcXVpcmUoXCJwcm9ncmVzcy1zdHJlYW1cIik7XG5cbmNsYXNzIFRhc2sge1xuXHRjb25zdHJ1Y3Rvcih1cmwpIHtcblx0XHR0aGlzLnVybCA9IHVybDtcblx0XHR0aGlzLmZpbmlzaGVkID0gZmFsc2U7XG5cdH1cbn1cblxuY2xhc3MgRG93bmxvYWRlciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMudHlwZSA9IFwiXCI7XG5cdFx0dGhpcy5pZCA9IFwiXCI7XG5cdFx0dGhpcy51cmwgPSBcIlwiO1xuXHRcdHRoaXMuYWlkID0gLTE7XG5cdFx0dGhpcy5waWQgPSAxO1xuXHRcdHRoaXMuY2lkID0gLTE7XG5cdFx0dGhpcy5uYW1lID0gXCJcIjtcblx0XHR0aGlzLmxpbmtzID0gW107XG5cdFx0dGhpcy50YXNrcyA9IFtdO1xuXHR9XG5cblx0Z2V0VmlkZW9VcmwodmlkZW9VcmwpIHtcblx0XHR0aGlzLnVybCA9IFwiXCI7XG5cdFx0Y29uc3QgbWFwcGluZyA9IHtcblx0XHRcdFwiQlZcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vdmlkZW8vXCIsXG5cdFx0XHRcImJ2XCI6IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL3ZpZGVvL1wiLFxuXHRcdFx0XCJhdlwiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS92aWRlby9cIixcblx0XHRcdFwiZXBcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vYmFuZ3VtaS9wbGF5L1wiLFxuXHRcdFx0XCJzc1wiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS9iYW5ndW1pL3BsYXkvXCJcblx0XHR9O1xuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG1hcHBpbmcpKSB7XG5cdFx0XHRpZiAodmlkZW9VcmwuaW5jbHVkZXMoa2V5KSkge1xuXHRcdFx0XHR0aGlzLnR5cGUgPSBrZXk7XG5cdFx0XHRcdHRoaXMuaWQgPSBrZXkgKyB2aWRlb1VybC5zcGxpdChrZXkpWzFdO1xuXHRcdFx0XHR0aGlzLnVybCA9IHZhbHVlICsgdGhpcy5pZDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YXN5bmMgZ2V0QWlkKCkge1xuXHRcdGNvbnN0IHsgdHlwZSwgdXJsIH0gPSB0aGlzO1xuXHRcdGlmICghdXJsKSByZXR1cm47XG5cdFx0cmV0dXJuIGZldGNoKHVybClcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcblx0XHRcdC50aGVuKHJlc3VsdCA9PiB7XG5cdFx0XHRcdGxldCBkYXRhID0gcmVzdWx0Lm1hdGNoKC9fX0lOSVRJQUxfU1RBVEVfXz0oLio/KTtcXChmdW5jdGlvblxcKFxcKS8pWzFdO1xuXHRcdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJJTklUSUFMIFNUQVRFXCIsIGRhdGEpO1xuXHRcdFx0XHRpZiAodHlwZSA9PT0gXCJCVlwiIHx8IHR5cGUgPT09IFwiYnZcIiB8fCB0eXBlID09PSBcImF2XCIpIHtcblx0XHRcdFx0XHR0aGlzLmFpZCA9IGRhdGEudmlkZW9EYXRhLmFpZDtcblx0XHRcdFx0XHR0aGlzLnBpZCA9IHBhcnNlSW50KHVybC5zcGxpdChcInA9XCIpWzFdLCAxMCkgfHwgMTtcblx0XHRcdFx0XHR0aGlzLmNpZCA9IGRhdGEudmlkZW9EYXRhLnBhZ2VzW3RoaXMucGlkIC0gMV0uY2lkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKHR5cGUgPT09IFwiZXBcIikge1xuXHRcdFx0XHRcdHRoaXMuYWlkID0gZGF0YS5lcEluZm8uYWlkO1xuXHRcdFx0XHRcdHRoaXMuY2lkID0gZGF0YS5lcEluZm8uY2lkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKHR5cGUgPT09IFwic3NcIikge1xuXHRcdFx0XHRcdHRoaXMuYWlkID0gZGF0YS5lcExpc3RbMF0uYWlkO1xuXHRcdFx0XHRcdHRoaXMuY2lkID0gZGF0YS5lcExpc3RbMF0uY2lkO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGVycm9yID0+IHNob3dFcnJvcihcIuiOt+WPluinhumikSBhaWQg5Ye66ZSZ77yBXCIpKTtcblx0fVxuXG5cdGFzeW5jIGdldEluZm8oKSB7XG5cdFx0Y29uc3QgeyBhaWQsIGNpZCB9ID0gdGhpcztcblx0XHRpZiAoIWNpZCkge1xuXHRcdFx0c2hvd0Vycm9yKFwi6I635Y+W6KeG6aKRIGNpZCDlh7rplJnvvIFcIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vIGdldERhbm1ha3UoKTsgLy/ojrflj5ZjaWTlkI7vvIzojrflj5bkuIvovb3pk77mjqXlkozlvLnluZXkv6Hmga9cblx0XHRyZXR1cm4gZmV0Y2goXCJodHRwczovL2FwaS5iaWxpYmlsaS5jb20veC93ZWItaW50ZXJmYWNlL3ZpZXc/YWlkPVwiICsgYWlkKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuXHRcdFx0LmNhdGNoKGVycm9yID0+IHNob3dFcnJvcihcIuiOt+WPluinhumikeS/oeaBr+WHuumUme+8gVwiKSk7XG5cdH1cblxuXHRhc3luYyBnZXREYXRhKGZhbGxiYWNrKSB7XG5cdFx0Y29uc3QgeyBjaWQsIHR5cGUgfSA9IHRoaXM7XG5cdFx0bGV0IHBsYXlVcmw7XG5cdFx0aWYgKGZhbGxiYWNrKSB7XG5cdFx0XHRjb25zdCBwYXJhbXMgPSBgY2lkPSR7Y2lkfSZtb2R1bGU9bW92aWUmcGxheWVyPTEmcXVhbGl0eT0xMTImdHM9MWA7XG5cdFx0XHRjb25zdCBzaWduID0gY3J5cHRvLmNyZWF0ZUhhc2goXCJtZDVcIikudXBkYXRlKHBhcmFtcyArIFwiOWIyODgxNDdlNTQ3NGRkMmFhNjcwODVmNzE2YzU2MGRcIikuZGlnZXN0KFwiaGV4XCIpO1xuXHRcdFx0cGxheVVybCA9IGBodHRwczovL2Jhbmd1bWkuYmlsaWJpbGkuY29tL3BsYXllci93ZWJfYXBpL3BsYXl1cmw/JHtwYXJhbXN9JnNpZ249JHtzaWdufWA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0eXBlID09PSBcIkJWXCIgfHwgdHlwZSA9PT0gXCJidlwiIHx8IHR5cGUgPT09IFwiYXZcIikge1xuXHRcdFx0XHRjb25zdCBwYXJhbXMgPSBgYXBwa2V5PWlWR1VUanN4dnBMZXVEQ2YmY2lkPSR7Y2lkfSZvdHlwZT1qc29uJnFuPTExMiZxdWFsaXR5PTExMiZ0eXBlPWA7XG5cdFx0XHRcdGNvbnN0IHNpZ24gPSBjcnlwdG8uY3JlYXRlSGFzaChcIm1kNVwiKS51cGRhdGUocGFyYW1zICsgXCJhSFJtaFdNTGtkZU11SUxxT1JuWVpvY3dNQnBNRU9kdFwiKS5kaWdlc3QoXCJoZXhcIik7XG5cdFx0XHRcdHBsYXlVcmwgPSBgaHR0cHM6Ly9pbnRlcmZhY2UuYmlsaWJpbGkuY29tL3YyL3BsYXl1cmw/JHtwYXJhbXN9JnNpZ249JHtzaWdufWA7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwbGF5VXJsID0gYGh0dHBzOi8vYXBpLmJpbGliaWxpLmNvbS9wZ2MvcGxheWVyL3dlYi9wbGF5dXJsP3FuPTgwJmNpZD0ke2NpZH1gO1xuXHRcdFx0XHRcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZldGNoKHBsYXlVcmwpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG5cdFx0XHQudGhlbihyZXN1bHQgPT4ge1xuXHRcdFx0XHRjb25zdCBkYXRhID0gZmFsbGJhY2sgPyB0aGlzLnBhcnNlRGF0YShyZXN1bHQpIDogSlNPTi5wYXJzZShyZXN1bHQpO1xuXHRcdFx0XHRjb25zdCB0YXJnZXQgPSBkYXRhLmR1cmwgfHwgZGF0YS5yZXN1bHQuZHVybDtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJQTEFZIFVSTFwiLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua3MgPSB0YXJnZXQubWFwKHBhcnQgPT4gcGFydC51cmwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2ssIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgfTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoZmFsbGJhY2spIHRocm93IEVycm9yKCk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSh0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdHNob3dFcnJvcihcIuiOt+WPliBQbGF5VXJsIOaIluS4i+i9vemTvuaOpeWHuumUme+8geeUseS6jkLnq5npmZDliLbvvIzlj6rog73kuIvovb3kvY7muIXmmbDluqbop4bpopHjgIJcIik7XG5cdFx0XHR9KTtcblx0fVxuXG5cdHBhcnNlRGF0YSh0YXJnZXQpIHtcblx0XHRjb25zdCBkYXRhID0gJCh0YXJnZXQpO1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXHRcdHJlc3VsdC5kdXJsID0gW107XG5cdFx0cmVzdWx0LnF1YWxpdHkgPSBkYXRhLmZpbmQoXCJxdWFsaXR5XCIpLnRleHQoKTtcblx0XHRkYXRhLmZpbmQoXCJkdXJsXCIpLmVhY2goKGksIG8pID0+IHtcblx0XHRcdGNvbnN0IHBhcnQgPSAkKG8pO1xuXHRcdFx0cmVzdWx0LmR1cmwucHVzaCh7XG5cdFx0XHRcdHVybDogcGFydC5maW5kKFwidXJsXCIpLnRleHQoKSxcblx0XHRcdFx0b3JkZXI6IHBhcnQuZmluZChcIm9yZGVyXCIpLnRleHQoKSxcblx0XHRcdFx0bGVuZ3RoOiBwYXJ0LmZpbmQoXCJsZW5ndGhcIikudGV4dCgpLFxuXHRcdFx0XHRzaXplOiBwYXJ0LmZpbmQoXCJzaXplXCIpLnRleHQoKVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGRvd25sb2FkQnlJbmRleChwYXJ0LCBmaWxlLCBjYWxsYmFjayA9ICgpID0+IHt9KSB7XG5cdFx0Y29uc3QgeyB1cmwgfSA9IHRoaXM7XG5cblx0XHRpZiAodGhpcy50YXNrcy5zb21lKGl0ZW0gPT4gaXRlbS51cmwgPT09IHRoaXMubGlua3NbcGFydF0pKSByZXR1cm4gXCJEVVBMSUNBVEVcIjtcblx0XHR0aGlzLnRhc2tzLnB1c2gobmV3IFRhc2sodGhpcy5saW5rc1twYXJ0XSkpO1xuXHRcdGxldCBzdGF0ZTtcblx0XHR0cnkge1xuXHRcdFx0c3RhdGUgPSBmcy5zdGF0U3luYyhmaWxlKTtcblx0XHR9XG5cdFx0Y2F0Y2ggKGVycm9yKSB7XG5cdFx0fVxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHR1cmw6IHRoaXMubGlua3NbcGFydF0sXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFwiUmFuZ2VcIjogYGJ5dGVzPSR7c3RhdGUgPyBzdGF0ZS5zaXplIDogMH0tYCwgLy/mlq3ngrnnu63kvKBcblx0XHRcdFx0XCJVc2VyLUFnZW50XCI6IFwiTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNykgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkwLjAuNDQzMC4yMTIgU2FmYXJpLzUzNy4zNlwiLFxuXHRcdFx0XHRcIlJlZmVyZXJcIjogdXJsXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRjb25zdCBzdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShmaWxlLCBzdGF0ZSA/IHsgZmxhZ3M6IFwiYVwiIH0gOiB7fSk7XG5cdFx0dGhpcy5kb3dubG9hZChvcHRpb25zLCBzdHJlYW0sIGNhbGxiYWNrKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGRvd25sb2FkKG9wdGlvbnMsIHN0cmVhbSwgY2FsbGJhY2spIHtcblx0XHQvLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9wcm9ncmVzcy1zdHJlYW1cblx0XHRjb25zdCBpbmRleCA9IHRoaXMudGFza3MuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS51cmwgPT09IG9wdGlvbnMudXJsKTtcblx0XHRjb25zdCBwcm9TdHJlYW0gPSBwcm9ncmVzcyh7XG5cdFx0XHR0aW1lOiAyNTAgLy/ljZXkvY1tc1xuXHRcdH0pLm9uKFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3MgPT4ge1xuXHRcdFx0Y29uc3QgeyBwZXJjZW50YWdlIH0gPSBwcm9ncmVzczsgLy/mmL7npLrov5vluqbmnaFcblx0XHRcdGlmIChwZXJjZW50YWdlID09PSAxMDApIHtcblx0XHRcdFx0dGhpcy50YXNrc1tpbmRleF0uZmluaXNoZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0Y2FsbGJhY2socHJvZ3Jlc3MsIGluZGV4KTtcblx0XHR9KTtcblxuXHRcdGxldCB7IHVybCB9ID0gb3B0aW9ucztcblx0XHRmdW5jdGlvbiBkb3dubG9hZExpbmsodXJsKSB7XG5cdFx0XHQodXJsLnN0YXJ0c1dpdGgoXCJodHRwc1wiKSA/IGh0dHBzIDogaHR0cCkuZ2V0KHVybCwgb3B0aW9ucywgcmVzID0+IHtcblx0XHRcdFx0aWYgKHJlcy5zdGF0dXNDb2RlID09PSAzMDIpIHtcblx0XHRcdFx0XHR1cmwgPSByZXMuaGVhZGVycy5sb2NhdGlvbjtcblx0XHRcdFx0XHRyZXR1cm4gZG93bmxvYWRMaW5rKHVybCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHJvU3RyZWFtLnNldExlbmd0aChyZXMuaGVhZGVyc1tcImNvbnRlbnQtbGVuZ3RoXCJdKTtcblx0XHRcdFx0Ly/lhYhwaXBl5YiwcHJvU3RyZWFt5YaNcGlwZeWIsOaWh+S7tueahOWGmeWFpea1geS4rVxuXHRcdFx0XHRyZXMucGlwZShwcm9TdHJlYW0pLnBpcGUoc3RyZWFtKS5vbihcImVycm9yXCIsIGVycm9yID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZG93bmxvYWRMaW5rKHVybCk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IFRhc2ssIERvd25sb2FkZXIgfTtcbiIsIi8vc2Nyb2xsIGRvd24gdG8gdGhlIGJvdHRvbSBvZiB0aGUgcGFnZVxuYXN5bmMgZnVuY3Rpb24gYXV0b1Njcm9sbChwYWdlKXtcbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlKGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHZhciB0b3RhbEhlaWdodCA9IDA7XG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSAxMDA7XG4gICAgICAgICAgICB2YXIgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxCeSgwLCBkaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgdG90YWxIZWlnaHQgKz0gZGlzdGFuY2U7XG5cbiAgICAgICAgICAgICAgICBpZih0b3RhbEhlaWdodCA+PSBzY3JvbGxIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZGVsYXkodGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7IFxuICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIHRpbWUpXG4gICAgfSk7XG4gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdXRvU2Nyb2xsOmF1dG9TY3JvbGwsXG4gICAgZGVsYXk6ZGVsYXlcbn0iLCJmdW5jdGlvbiB3ZWJwYWNrRW1wdHlDb250ZXh0KHJlcSkge1xuXHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0dGhyb3cgZTtcbn1cbndlYnBhY2tFbXB0eUNvbnRleHQua2V5cyA9ICgpID0+IChbXSk7XG53ZWJwYWNrRW1wdHlDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xud2VicGFja0VtcHR5Q29udGV4dC5pZCA9IFwiLi9zcmMgc3luYyByZWN1cnNpdmVcIjtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0VtcHR5Q29udGV4dDsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGVlcmlvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRlYnVnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmaWxlbmFtaWZ5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZvcm0tZGF0YVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9ncmVzcy1zdHJlYW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyL2Rpc3QvY29uY3VycmVuY3kvYnVpbHRJbkNvbmN1cnJlbmN5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyL2Rpc3QvdXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXNlci1hZ2VudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbl9fd2VicGFja19yZXF1aXJlX18uYyA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXztcblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIiIsIi8vIG1vZHVsZSBjYWNoZSBhcmUgdXNlZCBzbyBlbnRyeSBpbmxpbmluZyBpcyBkaXNhYmxlZFxuLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9