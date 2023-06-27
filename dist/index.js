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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1COzs7Ozs7Ozs7OztBQ2xNbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDUkE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL2luZGV4LnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9iaWxpYmlsaV9zY3JhcGVyLnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9mYWNlYm9va19zY3JhcGVyLnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9tZXRhZGF0YS50cyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvc29jaWFsX3NjcmFwZXIudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL3lvdXR1YmVfc2NyYXBlci50cyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL25vZGVfc29jaWFsbWsudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9yZW1vdGVzb3VyY2UudHMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9jb25jdXJyZW5jeS1pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvYmlsaWJpbGkvZG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMvbGliL2Z1bmN0aW9uLmpzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvIHN5bmMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImNoZWVyaW9cIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwiZGVidWdcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImZpbGVuYW1pZnlcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwiZm9ybS1kYXRhXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImxvZGFzaFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInByb2dyZXNzLXN0cmVhbVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwdXBwZXRlZXJcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXJcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC9jb25jdXJyZW5jeS9idWlsdEluQ29uY3VycmVuY3lcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC91dGlsXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInB1cHBldGVlci1leHRyYVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJ1c2VyLWFnZW50c1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJ3aW5zdG9uXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwib3NcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVidWcgfSBmcm9tIFwiY29uc29sZVwiO1xuaW1wb3J0IHtTY3JhcGVNYW5hZ2VyfSBmcm9tIFwiLi9zcmMvbm9kZV9zb2NpYWxta1wiO1xuLy8gdmFyIFNjcmFwZXIgPSByZXF1aXJlKFwiLi9zcmMvbW9kdWxlcy9zb2NpYWxfc2NyYXBlclwiKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIExvZ2luKGJyb3dzZXJfY29uZmlnOm9iamVjdCwgc2NyYXBlX2NvbmZpZzpvYmplY3QpIHtcbiAgLy8gc2NyYXBlIGNvbmZpZyBvdmVyd3JpdGVzIHRoZSBicm93c2VyX2NvbmZpZ1xuICBPYmplY3QuYXNzaWduKGJyb3dzZXJfY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcblxuICB2YXIgc2NyYXBlciA9IG5ldyBTY3JhcGVNYW5hZ2VyKGJyb3dzZXJfY29uZmlnKTtcbiAgLy8gdmFyIHJlbW90ZUNvbmZpZz1hd2FpdCBzY3JhcGVyLmdldFJlbW90ZUNvbmZpZygpO1xuICBhd2FpdCBzY3JhcGVyLnN0YXJ0KCk7XG5cbiAgdmFyIHJlc3VsdHMgPSBhd2FpdCBzY3JhcGVyLmxvZ2luKHNjcmFwZV9jb25maWcpO1xuXG4gIGF3YWl0IHNjcmFwZXIucXVpdCgpO1xuXG4gIHJldHVybiByZXN1bHRzO1xufVxuLy9nZXQgZGF0YSB1cmxzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gU2VhcmNoZGF0YShicm93c2VyX2NvbmZpZywgc2NyYXBlX2NvbmZpZykge1xuICAvLyBzY3JhcGUgY29uZmlnIG92ZXJ3cml0ZXMgdGhlIGJyb3dzZXJfY29uZmlnXG4gIE9iamVjdC5hc3NpZ24oYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpO1xuICAvLyBkZWJ1Zyhicm93c2VyX2NvbmZpZylcbiAgdmFyIHNjcmFwZXIgPSBuZXcgU2NyYXBlTWFuYWdlcihicm93c2VyX2NvbmZpZyk7XG4gIC8vIHZhciByZW1vdGVDb25maWc9YXdhaXQgc2NyYXBlci5nZXRSZW1vdGVDb25maWcoKTtcbiAgYXdhaXQgc2NyYXBlci5zdGFydCgpO1xuICBhd2FpdCBzY3JhcGVyLnNlYXJjaGRhdGEoc2NyYXBlX2NvbmZpZyk7XG5cbiAgYXdhaXQgc2NyYXBlci5xdWl0KCk7XG59XG5cbi8vIG1vZHVsZS5leHBvcnRzID0ge1xuLy8gICBzZWFyY2hkYXRhOiBTZWFyY2hkYXRhLFxuLy8gICBsb2dpbjogTG9naW4sXG4vLyAgIC8vIHl0YmxvZ2luOnl0YmxvZ2luLFxuLy8gICBTY3JhcGVNYW5hZ2VyOiBTY3JhcGVNYW5hZ2VyLFxuLy8gICAvLyBTY3JhcGVyOiBTY3JhcGVyLFxuLy8gfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBjaGVlcmlvID0gcmVxdWlyZShcImNoZWVyaW9cIik7XG5pbXBvcnQgeyBTb2NpYWxTY3JhcGVyIGFzIFNjcmFwZXIsIExpbmt1cmwsIFNjcmFwZU9wdGlvbnMsIFNlYXJjaG9iamVjdH0gZnJvbSBcIi4vc29jaWFsX3NjcmFwZXJcIjtcbmNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3QgeyBEb3dubG9hZGVyIH0gPSByZXF1aXJlKFwiLi9iaWxpYmlsaS9kb3dubG9hZGVyLmpzXCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3Qgc2FuaXRpemUgPSByZXF1aXJlKFwiZmlsZW5hbWlmeVwiKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZShcImRlYnVnXCIpKFwiYmlsaWJpbGktc2NyYXBlcjpTY3JhcGVyXCIpO1xuY29uc3QgeyBhdXRvU2Nyb2xsLCBkZWxheSB9ID0gcmVxdWlyZShcIi4vbGliL2Z1bmN0aW9uLmpzXCIpO1xuaW1wb3J0IHtFbGVtZW50SGFuZGxlLFBhZ2V9IGZyb20gJ3B1cHBldGVlcic7XG5cblxudHlwZSBjbGlja2J0bnNlcm9iaiA9IHtcbiAgcGFnZTogUGFnZSxcbiAga2V5d29yZDogc3RyaW5nXG59XG4vLyBpbXBvcnQgZmlsZW5hbWlmeSBmcm9tICdmaWxlbmFtaWZ5Jztcbi8vIGNvbnN0IHsgbGF1bmNoLCBnZXRTdHJlYW0gfSA9IHJlcXVpcmUoXCJwdXBwZXRlZXItc3RyZWFtXCIpO1xuLy8gY29uc3QgUHVwcGV0ZWVyVmlkZW9SZWNvcmRlciA9IHJlcXVpcmUoJ3B1cHBldGVlci12aWRlby1yZWNvcmRlcicpO1xuZXhwb3J0IGNsYXNzIEJpbGliaWxpU2NyYXBlciBleHRlbmRzIFNjcmFwZXIge1xuICBzdGFydFVybDogc3RyaW5nO1xuICBcbiAgY29uc3RydWN0b3IoYXJnczogU2NyYXBlT3B0aW9ucykge1xuICAgIHN1cGVyKGFyZ3MpO1xuICAgIHRoaXMuc3RhcnRVcmwgPSBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbVwiO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudGFza2lkKVxuICAgIC8vIGRlYnVnKHNlbGYudGFza2lkKVxuICB9XG4gIGFzeW5jIGxvYWRfc3RhcnRfcGFnZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBkZWJ1ZyhcImxvYWQgc3RhcnQgcGFnZVwiKVxuXG4gIH1cbiAgLy9sb2dpbiBpbnRvIGJpbGliaWxpXG4gIGFzeW5jIG1ha2Vsb2dpbmFjdGlvbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAvLyBsZXQgc3RhcnRVcmwgPSBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbVwiO1xuXG4gICAgdGhpcy5sb2dnZXIuaW5mbyhcIlVzaW5nIGxvZ2luVXJsOiBcIiArIHRoaXMuc3RhcnRVcmwpO1xuICAgIGF3YWl0IHRoaXMucGFnZS5zZXRCeXBhc3NDU1AodHJ1ZSk7XG4gICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8odGhpcy5zdGFydFVybCk7XG5cbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIFwibG9naW4gc3VjY2VzcywgY29va2llcyBoYXMgYmVlbiBzYXZlIGF0IFwiICsgdGhpcy5jb25maWcudG1wcGF0aFxuICAgICk7XG4gICAgLy9jbGljayBsb2dpbiBidG5cbiAgICBhd2FpdCB0aGlzLnBhZ2UuY2xpY2soXCIuaGVhZGVyLWxvZ2luLWVudHJ5XCIpO1xuICAgIC8vIGF3YWl0IHRoaXMucGFnZS5ldmFsdWF0ZShfID0+IHtcbiAgICAvLyB2YXIgaWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb1wiKTtcbiAgICAvLyBpY29uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAvLyB9KTtcbiAgICAvL3dhaXQgbG9naW4gYm94IHNob3dcbiAgICBhd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlbGVjdG9yKFwiLmJpbGktbWluaS1jb250ZW50LXdwXCIsIHtcbiAgICAgIHRpbWVvdXQ6IHRoaXMuU1RBTkRBUkRfVElNRU9VVCxcbiAgICB9KTtcbiAgICAvL2NsaWNrIGxvZ2luIGJ5IHNtc1xuICAgIGNvbnN0IFtidXR0b25dID0gYXdhaXQgdGhpcy5wYWdlLiR4KFwiLy9kaXZbY29udGFpbnMoLiwgJyDnn63kv6HnmbvlvZUgJyldXCIpO1xuICAgIGlmIChidXR0b24pIHtcbiAgICAgIGF3YWl0IChidXR0b24gYXMgRWxlbWVudEhhbmRsZTxFbGVtZW50PikuY2xpY2soKTtcbiAgICB9XG4gICAgLy9hd2FpdCBmb3IgdXNlciB0byB0YWtlIGFjdGlvblxuICAgIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoXCIuaGVhZGVyLWVudHJ5LW1pbmlcIiwgeyB0aW1lb3V0OiAwIH0pO1xuICAgIC8vdXNlciBoYXMgc3VjY2VzcyBsb2dpblxuICAgIC8vc2F2ZSBjb29raWVzXG4gICAgY29uc3QgY29va2llcyA9IGF3YWl0IHRoaXMucGFnZS5jb29raWVzKCk7XG5cbiAgICBhd2FpdCBmcy53cml0ZUZpbGUoXG4gICAgICB0aGlzLmNvbmZpZy50bXBwYXRoICsgXCIvY29va2llcy5qc29uXCIsXG4gICAgICBKU09OLnN0cmluZ2lmeShjb29raWVzLCBudWxsLCAyKSxcbiAgICAgIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5wYWdlLmNsb3NlKCk7XG4gICAgLy8gYXdhaXQgdGhpcy5icm93c2Vycy5jbG9zZSgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB2aWRlbyBsaXN0IHBhZ2VcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleXdvcmRcbiAgICogQHJldHVybnMgZWxlbWVudFxuICAgKi9cbiAgYXN5bmMgY2xpY2tTZWFyY2hidG4oc2Vhcm9iajogY2xpY2tidG5zZXJvYmopOlByb21pc2U8RWxlbWVudEhhbmRsZTxFbGVtZW50Pj4ge1xuICAgIGlmIChzZWFyb2JqLnBhZ2UpIHtcbiAgICAgIHRoaXMucGFnZSA9IHNlYXJvYmoucGFnZTtcbiAgICB9XG5cbiAgICB0aGlzLmxvZ2dlci5pbmZvKFwiVXNpbmcgbG9naW5Vcmw6IFwiICsgdGhpcy5zdGFydFVybCk7XG4gICAgYXdhaXQgdGhpcy5wYWdlLnNldEJ5cGFzc0NTUCh0cnVlKTtcbiAgICB0aGlzLmxhc3RfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnBhZ2UuZ290byh0aGlzLnN0YXJ0VXJsKTtcbiAgICBhd2FpdCB0aGlzLnBhZ2UudHlwZShcIi5uYXYtc2VhcmNoLWlucHV0XCIsIHNlYXJvYmoua2V5d29yZCk7XG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLiRldmFsKFwiLm5hdi1zZWFyY2gtaW5wdXRcIiwgZnVuY3Rpb24gKGtleXdvcmQpIHtcbiAgICAvLyAgIHRoaXMudmFsdWUgPSBrZXl3b3JkO1xuICAgIC8vIH0pO1xuICAgIC8vIGF3YWl0IHBhZ2UuJGV2YWwoJy5uYXYtc2VhcmNoLWlucHV0JywgZWwgPT4gZWwudmFsdWUgPSBcIlwiKTtcbiAgICBjb25zdCBzZWFyY2hidG4gPSBhd2FpdCB0aGlzLnBhZ2UuJChcIi5uYXYtc2VhcmNoLWJ0blwiKTtcbiAgICBpZiAoc2VhcmNoYnRuKSB7XG4gICAgICBhd2FpdCBzZWFyY2hidG4uY2xpY2soKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlYXJjaGJ0bjtcbiAgfVxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleXdvcmRcbiAgICogQHJldHVybnMgYXJyYXlcbiAgICovXG4gIGFzeW5jIHNlYXJjaGRhdGEoc2Vhcm9iajogU2VhcmNob2JqZWN0KTogUHJvbWlzZTxBcnJheTxvYmplY3Q+PiB7XG4gICAgaWYgKHNlYXJvYmoucGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gc2Vhcm9iai5wYWdlO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0OiBBcnJheTxvYmplY3Q+ID0gW11cbiAgICBpZiAoQXJyYXkuaXNBcnJheShzZWFyb2JqLmtleXdvcmQpKSB7XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2Ygc2Vhcm9iai5rZXl3b3JkKSB7XG4gICAgICAgIGxldCBzdWJzZWFyb2JnOiBTZWFyY2hvYmplY3QgPSB7IHBhZ2U6IHRoaXMucGFnZSwga2V5d29yZDogZWxlbWVudCB9XG4gICAgICAgIGxldCBsaW5rcmVzID0gYXdhaXQgdGhpcy5nZXRWaWRlb3VybHMoc3Vic2Vhcm9iZyk7XG4gICAgICAgIGRlYnVnKGxpbmtyZXMpXG4gICAgICAgIGZvciAoY29uc3QgbGluayBvZiBsaW5rcmVzKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2gobGluaylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc2Vhcm9iai5rZXl3b3JkID09PSAnc3RyaW5nJykge1xuICAgICAgbGV0IHNlcnNlYXJvYmc6IFNlYXJjaG9iamVjdCA9IHsgcGFnZTogdGhpcy5wYWdlLCBrZXl3b3JkOiBzZWFyb2JqLmtleXdvcmQgfVxuICAgICAgbGV0IGxpbmtyZXMgPSBhd2FpdCB0aGlzLmdldFZpZGVvdXJscyhzZXJzZWFyb2JnKTtcbiAgICAgIGZvciAoY29uc3QgbGluayBvZiBsaW5rcmVzKSB7XG5cbiAgICAgICAgcmVzdWx0LnB1c2gobGlua3JlcylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICAgIC8vIHJldHVybiBhd2FpdCB0aGlzLmdldFZpZGVvdXJscyh7IHBhZ2U6IHRoaXMucGFnZSwga2V5d29yZDoga2V5d29yZCB9KTtcbiAgfVxuICAvL2dldCB2aWRlbyB1cmwgcmV0dXJuIGluIGFycmF5XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdCxzdHJpbmcsc3RyaW5nfVxuICAgKiBAcmV0dXJucyBhcnJheVxuICAgKi9cbiAgYXN5bmMgZ2V0VmlkZW91cmxzKHNlcm9iajogU2VhcmNob2JqZWN0KTogUHJvbWlzZTxBcnJheTxMaW5rdXJsPj4ge1xuICAgIGlmIChzZXJvYmoucGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gc2Vyb2JqLnBhZ2U7XG4gICAgfVxuICAgIGlmIChzZXJvYmouY29va2llc1BhdGgpIHtcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhzZXJvYmouY29va2llc1BhdGgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgY29va2llcyBmaWxlIGF0ICR7c2Vyb2JqLmNvb2tpZXNQYXRofWApO1xuICAgICAgfVxuXG4gICAgICBsZXQgY29va2llcyA9IEpTT04ucGFyc2UoYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc2Vyb2JqLmNvb2tpZXNQYXRoKSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhjb29raWVzKTtcbiAgICAgIGF3YWl0IHRoaXMucGFnZS5zZXRDb29raWUoLi4uY29va2llcyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzZXJvYmoua2V5d29yZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmhhbmRsZVNlYXJjaCh7IHBhZ2U6IHRoaXMucGFnZSwga2V5d29yZDogc2Vyb2JqLmtleXdvcmQgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGxpbmtyZXM6IEFycmF5PExpbmt1cmw+ID0gW107XG4gICAgICBmb3IgKGNvbnN0IGtleWVsZW1lbnQgb2Ygc2Vyb2JqLmtleXdvcmQpIHtcbiAgICAgICAgY29uc3QgcmVzPWF3YWl0IHRoaXMuaGFuZGxlU2VhcmNoKHsgcGFnZTogdGhpcy5wYWdlLCBrZXl3b3JkOiBrZXllbGVtZW50IH0pXG4gICAgICAgIGZvciAoY29uc3QgbGluayBvZiByZXMpIHtcbiAgICAgICAgICBsaW5rcmVzLnB1c2gobGluaylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGxpbmtyZXNcbiAgICB9XG5cbiAgfVxuXG4gIGFzeW5jIGhhbmRsZVNlYXJjaChjc29iajogY2xpY2tidG5zZXJvYmopOiBQcm9taXNlPEFycmF5PExpbmt1cmw+PiB7XG4gICAgY29uc3Qgc2VhcmNoYnRuID0gYXdhaXQgdGhpcy5jbGlja1NlYXJjaGJ0bih7XG4gICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICBrZXl3b3JkOiBjc29iai5rZXl3b3JkLFxuICAgIH0pO1xuXG4gICAgbGV0IGJyb3dzZXIgPSB0aGlzLnBhZ2UuYnJvd3NlcigpO1xuICAgIGNvbnN0IG5ld1BhZ2UgPSBhd2FpdCBicm93c2VyLndhaXRGb3JUYXJnZXQoKHRhcmdldCkgPT5cbiAgICAgIHRhcmdldC51cmwoKS5pbmNsdWRlcyhcInNlYXJjaC5iaWxpYmlsaS5jb21cIilcbiAgICApO1xuICAgIGNvbnN0IHBhZ2VzID0gYXdhaXQgYnJvd3Nlci5wYWdlcygpO1xuICAgIGxldCBzZWFyY2hQYWdlO1xuICAgIGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuICAgICAgY29uc3QgcGFnZXVybCA9IGF3YWl0IHBhZ2UudXJsKCk7IC8vIG5ldyBwYWdlIG5vdyBhcHBlYXIhXG4gICAgICAvLyBkZWJ1Zyhhd2FpdCBwYWdlLnRpdGxlKCkpXG4gICAgICBpZiAocGFnZXVybC5pbmNsdWRlcyhcInNlYXJjaC5iaWxpYmlsaS5jb21cIikpIHtcbiAgICAgICAgc2VhcmNoUGFnZSA9IHBhZ2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXNlYXJjaFBhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInNlYXJjaCBwYWdlIG5vdCBmb3VuZFwiKTtcbiAgICB9XG5cbiAgICBhd2FpdCBhdXRvU2Nyb2xsKHNlYXJjaFBhZ2UpO1xuXG4gICAgdHJ5IHtcbiAgICBhd2FpdCBzZWFyY2hQYWdlLndhaXRGb3JTZWxlY3RvcihcIi52dWlfcGFnZW5hdGlvblwiLCB7IHRpbWVvdXQ6IDUwMDAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgcHVwcGV0ZWVyLmVycm9ycy5UaW1lb3V0RXJyb3IpIHtcbiAgICAgIC8vIERvIHNvbWV0aGluZyBpZiB0aGlzIGlzIGEgdGltZW91dCBpbiBmaW5kIHBhZ2VcbiAgICAgIGRlYnVnKFwibm90IGZpbmQgLnZ1aV9wYWdlbmF0aW9uIGl0ZW0sIHRoZSBwYWdlIG1heSBub3QgaGF2ZSByZXN1bHRcIilcbiAgICAgIC8vcmV0dXJuIGVtcHR5IHByb21pc2UgYXJyYXlcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4geyByZXNvbHZlKG51bGwpOyB9KTtcbiAgICB9IFxuICB9IFxuICAgIGxldCBsaW5rcmVzOiBBcnJheTxMaW5rdXJsPiA9IFtdO1xuICAgIC8vIGF3YWl0IHRoaXMucGFnZS4kJChcImJ1dHRvbi52dWlfYnV0dG9uXCIsIGVsZW1lbnRzPT57XG4gICAgLy8gICBjb25zb2xlLmxvZyhlbGVtZW50cylcbiAgICAvLyB9KVxuICAgIGNvbnN0IGxpbmtQYWdlID0gYXdhaXQgc2VhcmNoUGFnZS4kJChcImJ1dHRvbi52dWlfYnV0dG9uXCIpO1xuICAgIGRlYnVnKGxpbmtQYWdlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtQYWdlLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIGF3YWl0IHNlYXJjaFBhZ2UuZXZhbHVhdGUoKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5jbGljaygpO1xuICAgICAgfSwgbGlua1BhZ2VbaV0pO1xuICAgICAgY29uc3QgbGlua3MgPSBhd2FpdCB0aGlzLmdldFZpZGVvbGlzdGxpbmsoeyBwYWdlOiBzZWFyY2hQYWdlIH0pO1xuICAgICAgZGVidWcobGlua3MpO1xuICAgICAgbGlua3MubWFwKChsaW5rKSA9PiB7XG4gICAgICAgIGxpbmtyZXMucHVzaChsaW5rKTtcbiAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIGxpbmtyZXM7XG4gIH1cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7cGFnZX0gcGFnZVxuICAgKiBAcmV0dXJucyBhcnJheVxuICAgKi9cbiAgYXN5bmMgZ2V0VmlkZW9saXN0bGluayh7IHBhZ2UgfSk6IFByb21pc2U8QXJyYXk8TGlua3VybD4+IHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG4gICAgLy8gY29uc3QgZWxIYW5kbGVBcnJheSA9IGF3YWl0IHBhZ2UuJCQoXG4gICAgLy8gICBcIi5iaWxpLXZpZGVvLWNhcmRfX2luZm8tLXJpZ2h0IGE6bnRoLWNoaWxkKDEpXCJcbiAgICAvLyApO1xuICAgIFxuICAgIGxldCBsaW5rbWFwOiBBcnJheTxMaW5rdXJsPiA9IFtdO1xuICAgIC8vIGNvbnN0IHRoYXQ9dGhpcztcbiAgICBkZWJ1Zyh0aGlzLmNvbmZpZy50YXNraWQpXG4gICAgbGV0IHRhc2tpZHM9MDtcbiAgICBpZih0aGlzLmNvbmZpZy50YXNraWQpe1xuICAgIHRhc2tpZHM9dGhpcy5jb25maWcudGFza2lkXG4gICAgfVxuICAgIGxpbmttYXAgPSBhd2FpdCB0aGlzLnBhZ2UuJCRldmFsKFxuICAgICAgXCIuYmlsaS12aWRlby1jYXJkX19pbmZvLS1yaWdodCA+YTpmaXJzdC1jaGlsZFwiLFxuICAgICAgKGFsaW5rcyx0YXNraWRzKSA9PiB7XG4gICAgICAgIHJldHVybiBhbGlua3MubWFwKChhbGluaykgPT4ge1xuICAgICAgICAgIGxldCBsaW5rb2JnOiBMaW5rdXJsID0ge3RpdGxlOicnLGxpbms6JycsbGFuZzonemgtY24nfTtcbiAgICAgICAgICAvLyBpZighdGhhdC50YXNraWQpe1xuICAgICAgICAgIC8vIGxpbmtvYmcudGFza2lkPXRoYXQudGFza2lkO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgICBpZih0YXNraWRzKXtcbiAgICAgICAgICAgIGxpbmtvYmcudGFza2lkPXRhc2tpZHNcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgaGVyZj1hbGluay5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpXG4gICAgICAgICAgaWYoaGVyZil7XG4gICAgICAgICAgbGlua29iZy5saW5rID0gaGVyZlxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhbGluayk7XG4gICAgICAgICAgbGV0IGh0aXRsZSA9IGFsaW5rLnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKTtcbiAgICAgICAgICBpZihodGl0bGUpe1xuICAgICAgICAgICAgIGNvbnN0IGh0cmVzPSBodGl0bGUuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICAgaWYoaHRyZXMpe1xuICAgICAgICAgICAgIGxpbmtvYmcudGl0bGU9aHRyZXNcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBsaW5rb2JnO1xuICAgICAgICB9KTtcbiAgICAgIH0sdGFza2lkc1xuICAgICk7XG4gICAgLy8gZGVidWcoXCJxdWVyeSBsaW5rIGZpbmlzaFwiKTtcbiAgICAvLyBkZWJ1ZyhsaW5rbWFwKTtcbiAgICAvLyBkZWJ1ZyhcInNob3cgbGluayBmaW5pc2hcIik7XG4gICAgLy8gY29uc29sZS5sb2cobGlua21hcClcblxuICAgIGF3YWl0IGxpbmttYXAuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGlmICghZWxlbWVudC5saW5rLmluY2x1ZGVzKFwiL3ZpZGVvL1wiKSkge1xuICAgICAgICAvLyBkZWJ1ZyhcImVsZW1lbnQgaGFzIHZpZGVvIFwiK2VsZW1lbnQpXG4gICAgICAgIGxpbmttYXAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBhd2FpdCBsaW5rbWFwLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoZWxlbWVudC5saW5rLmluY2x1ZGVzKFwiL2FwaS9cIikpIHtcbiAgICAgICAgZGVidWcoXCJlbGVtZW50IGhhcyBhcGkgXCIgKyBlbGVtZW50KTtcbiAgICAgICAgbGlua21hcC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vZGVidWcoXCJmaWx0ZXIgbGluayBmaW5pc2hcIik7XG4gICAgZGVidWcobGlua21hcCk7XG5cbiAgICByZXR1cm4gbGlua21hcDtcbiAgfVxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxpbmtcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZpZGVvcGF0aFxuICAgKi9cbiAgYXN5bmMgZG93bmxvYWRTaWdsZVZpZGVvKHsgbGluaywgdmlkZW9wYXRoIH0pIHtcbiAgICAvLyBpZiAocGFnZSkge1xuICAgIC8vICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICAvLyB9XG5cbiAgICAvLyBjb25zb2xlLmxvZyhsaW5rKVxuICAgIC8vIGF3YWl0IHRoaXMucGFnZS5nb3RvKGxpbmsse1xuICAgIC8vICAgd2FpdFVudGlsOiAnZG9tY29udGVudGxvYWRlZCcsXG4gICAgLy8gfSk7XG4gICAgLy8gY29uc29sZS5sb2codmlkZW9wYXRoKVxuICAgIC8vIGNvbnN0IGZpbGUgPSBmcy5jcmVhdGVXcml0ZVN0cmVhbSh2aWRlb3BhdGggKyBcIi90ZXN0LndlYm1cIik7XG4gICAgLy8gYXdhaXQgcGFnZS5ldmFsdWF0ZShhc3luYyAoKSA9PiB7XG4gICAgLy8gY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnB4LXBsYXllci12aWRlby13cmFwID4gdmlkZW86bnRoLWNoaWxkKDEpJyk7XG4gICAgLy8gY29uc29sZS5sb2coZWwpO1xuICAgIC8vIGNvbnN0IHtzcmN9ID0gZWwucXVlcnlTZWxlY3Rvcignc291cmNlJyk7XG4gICAgLy8gY29uc29sZS5sb2coc3JjKTtcbiAgICAvLyB9KTtcbiAgICAvLyBjb25zdCBodG1sID0gYXdhaXQgcGFnZS4kZXZhbCgnI2JpbGliaWxpLXBsYXllcicsIGVsID0+IGVsLm91dGVySFRNTCk7XG4gICAgLy8gY29uc29sZS5sb2coaHRtbClcbiAgICAvLyBjb25zdCBzcmMgPSBhd2FpdCBwYWdlLiRldmFsKFwiI2JpbGliaWxpLXBsYXllciB2aWRlb1wiLGVsID0+IGVsLmdldEF0dHJpYnV0ZShcInNyY1wiKSlcblxuICAgIGNvbnN0IGRvd25sb2FkZXIgPSBuZXcgRG93bmxvYWRlcigpO1xuICAgIGRvd25sb2FkZXIuZ2V0VmlkZW9VcmwobGluayk7XG4gICAgaWYgKCFkb3dubG9hZGVyLnVybCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidmlkZW8gdXJsIGludmFsaWRcIik7XG4gICAgfVxuICAgIGF3YWl0IGRvd25sb2FkZXIuZ2V0QWlkKCk7XG5cbiAgICBsZXQgdmlkZW9yZXMgPSBhd2FpdCBkb3dubG9hZGVyLmdldEluZm8oKTtcbiAgICBkZWJ1ZyhcIlZJREVPIElORk9cIiwgdmlkZW9yZXMpO1xuICAgIC8vIGNvbnN0IGRvd25sb2FkUGF0aCA9Jy9ob21lL3JvYmVydHplbmcvZG93bmxvYWR0ZXN0JztcbiAgICBjb25zdCBmaWxlbmFtZSA9IHZpZGVvcmVzLmRhdGEudGl0bGU7XG4gICAgY29uc3QgeyBkYXRhLCBmYWxsYmFjayB9ID0gYXdhaXQgZG93bmxvYWRlci5nZXREYXRhKCk7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBkYXRhLmR1cmwgfHwgZGF0YS5yZXN1bHQuZHVybDtcbiAgICBjb25zdCBxdWFsaXR5ID0gZGF0YS5xdWFsaXR5IHx8IGRhdGEucmVzdWx0LnF1YWxpdHksXG4gICAgICBxdWFsaXR5QXJyYXkgPSB7XG4gICAgICAgIDExMjogXCIxMDgwUCtcIixcbiAgICAgICAgODA6IFwiMTA4MFBcIixcbiAgICAgICAgNzQ6IFwiNzIwUDYwXCIsXG4gICAgICAgIDY0OiBcIjcyMFBcIixcbiAgICAgICAgNDg6IFwiNzIwUFwiLFxuICAgICAgICAzMjogXCI0ODBQXCIsXG4gICAgICAgIDE2OiBcIjM2MFBcIixcbiAgICAgICAgMTU6IFwiMzYwUFwiLFxuICAgICAgfTtcbiAgICBjb25zdCB2aWRlb1F1YW50aXR5ID0gcXVhbGl0eUFycmF5W3F1YWxpdHldIHx8IFwidW5rbm93blwiO1xuICAgIGNvbnNvbGUubG9nKFwidmlkZW9RdWFudGl0eSBpcyBcIiArIHZpZGVvUXVhbnRpdHkpO1xuICAgIGlmIChmYWxsYmFjaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZXJyb3IgaGFwcGVuIHdoZW4gZ2V0IHZpZGVvIGRhdGFcIik7XG4gICAgfVxuICAgIGRlYnVnKFwiZWNobyB0YXJnZXRcIik7XG4gICAgZGVidWcodGFyZ2V0KTtcbiAgICB0YXJnZXQuZm9yRWFjaCgoZWxlbWVudCwgcGFydCkgPT4ge1xuICAgICAgY29uc3QgZmlsZSA9IHBhdGguam9pbih2aWRlb3BhdGgsIGAke3Nhbml0aXplKGZpbGVuYW1lKX0tJHtwYXJ0fS5mbHZgKTtcbiAgICAgIGRlYnVnKFwicGFydCBpcyAlb1wiLCBwYXJ0KTtcbiAgICAgIGRlYnVnKFwiZmlsZSBuYW1lICVvXCIsIGZpbGUpO1xuICAgICAgY29uc3Qgc3RhdGUgPSBkb3dubG9hZGVyLmRvd25sb2FkQnlJbmRleChcbiAgICAgICAgcGFydCxcbiAgICAgICAgZmlsZSxcbiAgICAgICAgKHByb2dyZXNzLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgc3BlZWQsIGV0YSwgcGVyY2VudGFnZSB9ID0gcHJvZ3Jlc3M7IC8v5pi+56S66L+b5bqm5p2hXG4gICAgICAgICAgY29uc29sZS5sb2coXCJzcGVlZDogXCIgKyBNYXRoLnJvdW5kKHNwZWVkIC8gMWUzKSArIFwiS0Ivc1wiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgZXRhOiR7ZXRhfXNgKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIC8qKlxuICAgKiBnZXQgdmlkZW8gZGV0YWlsXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYWdlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsaW5rXG4gICAqL1xuICBhc3luYyBnZXRWaWRlb2RldGFpbChwYWdlLCBsaW5rKSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgfVxuICAgIGF3YWl0IHRoaXMucGFnZS5nb3RvKGxpbmssIHtcbiAgICAgIHdhaXRVbnRpbDogXCJkb21jb250ZW50bG9hZGVkXCIsXG4gICAgfSk7XG5cbiAgICAvLyBhd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEJpbGliaWxpU2NyYXBlcjogQmlsaWJpbGlTY3JhcGVyLFxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGltcG9ydCB7Y2hlZXJpb30gZnJvbSAnY2hlZXJpbyc7XG5pbXBvcnQgeyBTb2NpYWxTY3JhcGVyIGFzIFNjcmFwZXIsU2NyYXBlT3B0aW9uc30gZnJvbSAnLi9zb2NpYWxfc2NyYXBlcic7XG5cbmV4cG9ydCBjbGFzcyBGYWNlYm9va1NjcmFwZXIgZXh0ZW5kcyBTY3JhcGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IFNjcmFwZU9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoYXJncyk7XG4gICAgfVxuIFxuXG4gICAgYXN5bmMgbG9hZF9sb2dpbl9wYWdlKCk6UHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGxldCBzdGFydFVybCA9ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20nO1xuXG4gICAgICAgIC8vIGlmICh0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncykge1xuICAgICAgICAvLyAgICAgc3RhcnRVcmwgPSBgaHR0cHM6Ly93d3cuJHt0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncy5mYWNlYm9va19kb21haW59YDtcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncy5mYWNlYm9va19kb21haW4pIHtcbiAgICAgICAgLy8gICAgICAgICBzdGFydFVybCA9IGBodHRwczovL3d3dy4ke3RoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzLmZhY2Vib29rX2RvbWFpbn1gO1xuICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICBzdGFydFVybCA9IGBodHRwczovL3d3dy5mYWNlYm9vay5jb21gO1xuICAgICAgICAvLyAgICAgfVxuXG4gICAgICAgIC8vICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MpIHtcbiAgICAgICAgLy8gICAgICAgICBpZiAoa2V5ICE9PSAnZmFjZWJvb2tfZG9tYWluJykge1xuICAgICAgICAvLyAgICAgICAgICAgICBzdGFydFVybCArPSBgJHtrZXl9PSR7dGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3Nba2V5XX0mYFxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ1VzaW5nIGxvZ2luVXJsOiAnICsgc3RhcnRVcmwpO1xuXG4gICAgICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IGF3YWl0IHRoaXMucGFnZS5nb3RvKHN0YXJ0VXJsKTtcblxuICAgICAgICAvL2F3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoJ2lucHV0W25hbWU9XCJxXCJdJywgeyB0aW1lb3V0OiB0aGlzLlNUQU5EQVJEX1RJTUVPVVQgfSk7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vdXNlciBsb2dpbiBieSBoYW5kXG4gICAgYXN5bmMgdXNlcmxvZ2luYWN0aW9uKCl7XG5cbiAgICB9XG5cbn1cblxuXG4iLCJjb25zdCBjaGVlcmlvID0gcmVxdWlyZSgnY2hlZXJpbycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRfaXBfZGF0YTogZ2V0X2lwX2RhdGEsXG4gICAgZ2V0X2h0dHBfaGVhZGVyczogZ2V0X2h0dHBfaGVhZGVycyxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldF9pcF9kYXRhKHBhZ2UpIHtcbiAgICBhd2FpdCBwYWdlLmdvdG8oJ2h0dHBzOi8vaXBpbmZvLmlvL2pzb24nLCB7XG4gICAgICB3YWl0TG9hZDogdHJ1ZSxcbiAgICAgIHdhaXROZXR3b3JrSWRsZTogdHJ1ZVxuICAgIH0pO1xuICAgIGxldCBqc29uID0gYXdhaXQgcGFnZS5jb250ZW50KHtcbiAgICAgICAgdGltZW91dDogMjAwMDBcbiAgICB9KTtcbiAgICBjb25zdCAkID0gY2hlZXJpby5sb2FkKGpzb24pO1xuICAgIGxldCBpcGluZm9fdGV4dCA9ICAkKCdwcmUnKS50ZXh0KCk7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoaXBpbmZvX3RleHQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRfaHR0cF9oZWFkZXJzKHBhZ2UpIHtcbiAgICBhd2FpdCBwYWdlLmdvdG8oJ2h0dHBzOi8vaHR0cGJpbi5vcmcvZ2V0Jywge1xuICAgICAgd2FpdExvYWQ6IHRydWUsXG4gICAgICB3YWl0TmV0d29ya0lkbGU6IHRydWVcbiAgICB9KTtcbiAgICBsZXQgaGVhZGVycyA9IGF3YWl0IHBhZ2UuY29udGVudCgpO1xuXG4gICAgY29uc3QgJCA9IGNoZWVyaW8ubG9hZChoZWFkZXJzKTtcbiAgICBsZXQgaGVhZGVyc190ZXh0ID0gICQoJ3ByZScpLnRleHQoKTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShoZWFkZXJzX3RleHQpO1xufSIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbWV0YSA9IHJlcXVpcmUoJy4vbWV0YWRhdGEudHMnKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc2Utc2NyYXBlcjpTY3JhcGVyJyk7XG5pbXBvcnQge1JlbW90ZVNvdXJjZSxMaW5rZGF0YX0gIGZyb20gXCIuLi9yZW1vdGVzb3VyY2VcIlxuaW1wb3J0IHtQYWdlfSBmcm9tICdwdXBwZXRlZXInO1xuXG4vLyBleHBvcnQgaW50ZXJmYWNlIFNjcmFwZU9wdGlvbnNQYWdlcyB7XG4vLyAgICAgc2V0Vmlld3BvcnQ6IEZ1bmN0aW9uLFxuLy8gICAgIHNldFJlcXVlc3RJbnRlcmNlcHRpb246IEZ1bmN0aW9uLFxuLy8gICAgIG9uOiBGdW5jdGlvbixcbi8vICAgICBnb3RvOiBGdW5jdGlvbixcbi8vICAgICBzY3JlZW5zaG90OiBGdW5jdGlvbixcbi8vICAgICBzZXRCeXBhc3NDU1A6IEZ1bmN0aW9uLFxuLy8gICAgIGNsaWNrOiBGdW5jdGlvbixcbi8vICAgICB3YWl0Rm9yU2VsZWN0b3I6IEZ1bmN0aW9uLFxuLy8gICAgICR4OiBGdW5jdGlvbixcbi8vICAgICBjb29raWVzOiBGdW5jdGlvbixcbi8vIH1cbi8vIGV4cG9ydCBjbGFzcyBTY3JhcGVPcHRpb25zUGFnZSBleHRlbmRzIFBhZ2V7XG5cbi8vIH1cbi8vIGV4cG9ydCBjbGFzcyBFbGVtZW50aGFuZHMgZXh0ZW5kcyBwdXBwZXRlZXIuRWxlbWVudEhhbmRsZXt9XG5leHBvcnQgaW50ZXJmYWNlIFNjcmFwZU9wdGlvbnMge1xuICAgIGNvbmZpZzoge1xuICAgICAgICBsb2dnZXI6IGxvZ1R5cGUsXG4gICAgICAgIHNlYXJjaF9lbmdpbmU/OiBzdHJpbmcsIGtleXdvcmRzOiBBcnJheTxzdHJpbmc+LCBwcm94eTogc3RyaW5nLCBhcHBseV9ldmFzaW9uX3RlY2huaXF1ZXM6IGJvb2xlYW4sIGJsb2NrX2Fzc2V0czogYm9vbGVhbiwgdGVzdF9ldmFzaW9uOiBib29sZWFuLCBsb2dfaHR0cF9oZWFkZXJzOiBib29sZWFuLCBsb2dfaXBfYWRkcmVzczogYm9vbGVhblxuICAgIH0sXG4gICAgY29udGV4dD86IG9iamVjdCxcbiAgICBwbHVnZ2FibGU/OiBvYmplY3QsXG4gICAgcGFnZTogUGFnZSxcbiAgICB0YXNraWQ/Om51bWJlcixcbn1cblxuaW50ZXJmYWNlIHJ1blBhcmFtZXRlciB7XG4gICAgcGFnZT86IFBhZ2UsXG4gICAgZGF0YT86IG9iamVjdCxcbiAgICB3b3JrZXI/OiBvYmplY3Rcbn1cbmludGVyZmFjZSBsb2dUeXBlIHtcbiAgICBpbmZvOiBGdW5jdGlvbixcbiAgICBlcnJvcjogRnVuY3Rpb25cbn1cblxuaW50ZXJmYWNlIHdvc2VhcmNoT2JqIHtcbiAgICBwYWdlPzogUGFnZSxcbiAgICB3b3JrZXI6b2JqZWN0XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlua3VybHtcbiAgICB0aXRsZTpzdHJpbmcsXG4gICAgbGluazpzdHJpbmcsXG4gICAgbGFuZzpzdHJpbmcsXG4gICAgdGFza2lkPzpudW1iZXJcbn1cbmV4cG9ydCB0eXBlIFNlYXJjaG9iamVjdD17XG4gICAgcGFnZT86UGFnZSxcbiAgICBrZXl3b3JkOnN0cmluZ3xBcnJheTxzdHJpbmc+XG4gICAgY29va2llc1BhdGg/OnN0cmluZ1xuICB9XG5cblxuXG4vKipcbiAqIHRoaXMgaXMgcGFyZW50IGNsYXNzIGZvciBzb2NpYWwgc2NyYXB5ZXIgbm9kZVxuICogICovXG5leHBvcnQgY2xhc3MgU29jaWFsU2NyYXBlciB7XG4gICAgY29uZmlnOiB7XG4gICAgICAgIGxvZ2dlcjogbG9nVHlwZSxcbiAgICAgICAgc2VhcmNoX2VuZ2luZT86IHN0cmluZywgXG4gICAgICAgIGtleXdvcmRzOiBBcnJheTxzdHJpbmc+LCBcbiAgICAgICAgcHJveHk6IHN0cmluZywgXG4gICAgICAgIGFwcGx5X2V2YXNpb25fdGVjaG5pcXVlczogYm9vbGVhbiwgXG4gICAgICAgIGJsb2NrX2Fzc2V0czogYm9vbGVhbiwgXG4gICAgICAgIHRlc3RfZXZhc2lvbjogYm9vbGVhbiwgXG4gICAgICAgIGxvZ19odHRwX2hlYWRlcnM6IGJvb2xlYW4sIFxuICAgICAgICBsb2dfaXBfYWRkcmVzczogYm9vbGVhblxuICAgICAgICB0bXBwYXRoPzogc3RyaW5nLFxuICAgICAgICB0YXNraWQ/Om51bWJlclxuICAgICAgICAvLyBvYmo6cHVwcGV0ZWVyLlBhZ2VcbiAgICB9O1xuICAgIHBhZ2U6IFBhZ2U7XG4gICAgbGFzdF9yZXNwb25zZTogb2JqZWN0IHwgbnVsbDtcbiAgICBtZXRhZGF0YTogeyBodHRwX2hlYWRlcnM/OiBvYmplY3QsIGlwaW5mbz86IHsgaXA6IHN0cmluZyB9LCBzY3JhcGluZ19kZXRlY3RlZD86IGJvb2xlYW4gfTtcbiAgICBwbHVnZ2FibGU/OiBvYmplY3Q7XG4gICAgY29udGV4dD86IG9iamVjdDtcbiAgICBsb2dnZXI6IGxvZ1R5cGU7XG4gICAgcHJveHk6IHN0cmluZztcbiAgICBrZXl3b3JkczogQXJyYXk8c3RyaW5nPjtcbiAgICBTVEFOREFSRF9USU1FT1VUOiBudW1iZXI7XG4gICAgU09MVkVfQ0FQVENIQV9USU1FOiBudW1iZXI7XG4gICAgcmVzdWx0czogb2JqZWN0O1xuICAgIHJlc3VsdF9yYW5rOiBudW1iZXI7XG4gICAgbnVtX3JlcXVlc3RzOiBudW1iZXI7XG4gICAgbnVtX2tleXdvcmRzOiBudW1iZXI7XG4gICAgdGFza2lkPzpudW1iZXI7XG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogU2NyYXBlT3B0aW9ucykge1xuICAgICAgICBcbiAgICAgICAgZGVidWcoJ2NvbnN0cnVjdG9yJyk7XG4gICAgICAgIGRlYnVnKG9wdGlvbnMpO1xuICAgICAgICAvLyBjb25zdCB7XG4gICAgICAgIC8vICAgICAvLyBjb25maWcgPSB7fSxcbiAgICAgICAgLy8gICAgIGNvbnRleHQgPSB7fSxcbiAgICAgICAgLy8gICAgIC8vIHBsdWdnYWJsZSA9IG51bGwsXG4gICAgICAgIC8vICAgICBwYWdlID0gbnVsbCxcbiAgICAgICAgLy8gICAgIC8vIGJyb3dzZXJzPW51bGxcbiAgICAgICAgLy8gfSA9IG9wdGlvbnM7XG4gICAgICAgIC8vIHRoaXMuYnJvd3Nlcj1icm93c2VyO1xuICAgICAgICB0aGlzLnBhZ2UgPSBvcHRpb25zLnBhZ2U7XG4gICAgICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IG51bGw7IC8vIHRoZSBsYXN0IHJlc3BvbnNlIG9iamVjdFxuICAgICAgICB0aGlzLm1ldGFkYXRhID0ge1xuICAgICAgICAgICAgc2NyYXBpbmdfZGV0ZWN0ZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBsdWdnYWJsZSA9IG9wdGlvbnMucGx1Z2dhYmxlO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG9wdGlvbnMuY29uZmlnO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IHRoaXMuY29uZmlnLmxvZ2dlcjtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0O1xuXG4gICAgICAgIHRoaXMucHJveHkgPSBvcHRpb25zLmNvbmZpZy5wcm94eTtcbiAgICAgICAgdGhpcy5rZXl3b3JkcyA9IG9wdGlvbnMuY29uZmlnLmtleXdvcmRzO1xuICAgICAgICBpZihvcHRpb25zLnRhc2tpZCl7XG4gICAgICAgICAgICB0aGlzLnRhc2tpZD1vcHRpb25zLnRhc2tpZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLlNUQU5EQVJEX1RJTUVPVVQgPSAxMDAwMDtcbiAgICAgICAgdGhpcy5TT0xWRV9DQVBUQ0hBX1RJTUUgPSA0NTAwMDtcblxuICAgICAgICB0aGlzLnJlc3VsdHMgPSB7fTtcbiAgICAgICAgdGhpcy5yZXN1bHRfcmFuayA9IDE7XG4gICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgdGhlIHJlcXVlc3RzIGRvbmVcbiAgICAgICAgdGhpcy5udW1fcmVxdWVzdHMgPSAwO1xuICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSBrZXl3b3JkcyBzZWFyY2hlZFxuICAgICAgICB0aGlzLm51bV9rZXl3b3JkcyA9IDA7XG5cbiAgICAgICAgbGV0IHNldHRpbmdzID0gdGhpcy5jb25maWdbYCR7dGhpcy5jb25maWcuc2VhcmNoX2VuZ2luZX1fc2V0dGluZ3NgXTtcbiAgICAgICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNldHRpbmdzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzID0gSlNPTi5wYXJzZShzZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWdbYCR7dGhpcy5jb25maWcuc2VhcmNoX2VuZ2luZX1fc2V0dGluZ3NgXSA9IHNldHRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGxvZ2luIHNvY2lhbCBtZWRpYSBwbGF0Zm9ybVxuICAgICAqIEBwYXJhbSBydW5vYmogXG4gICAgICogXG4gICAgICovXG4gICAgYXN5bmMgcnVuTG9naW4ocnVub2JqOiBydW5QYXJhbWV0ZXIpIHtcblxuICAgICAgICBkZWJ1Zygnd29ya2VyPSVvJywgcnVub2JqLndvcmtlciwgdGhpcy5jb25maWcua2V5d29yZHMpO1xuXG4gICAgICAgIGlmIChydW5vYmoucGFnZSkge1xuICAgICAgICAgICAgdGhpcy5wYWdlID0gcnVub2JqLnBhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLnBhZ2U/LnNldFZpZXdwb3J0KHsgd2lkdGg6IDEyODAsIGhlaWdodDogODAwIH0pO1xuXG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkX2Jyb3dzZXJfZW5naW5lKCk7XG4gICAgICAgIGF3YWl0IHRoaXMubWFrZWxvZ2luYWN0aW9uKClcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGlvbiB0aGF0IHJ1bnMgb25seSBvbmNlIGluIHRoZSBiZWdpbm5pbmcgb2YgdGhlXG4gICAgICogc2NyYXBpbmcgcHJvY2VkdXJlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IHRydWUgaWYgZXZlcnl0aGluZyBpcyBjb3JyZWN0LlxuICAgICAqL1xuICAgIGFzeW5jIGxvYWRfYnJvd3Nlcl9lbmdpbmUoKTogUHJvbWlzZTx2b2lkPiB7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFwcGx5X2V2YXNpb25fdGVjaG5pcXVlcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gcHJldmVudCBkZXRlY3Rpb24gYnkgZXZhZGluZyBjb21tb24gZGV0ZWN0aW9uIHRlY2huaXF1ZXNcbiAgICAgICAgICAgIGF3YWl0IGV2YWRlQ2hyb21lSGVhZGxlc3NEZXRlY3Rpb24odGhpcy5wYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJsb2NrIHNvbWUgYXNzZXRzIHRvIHNwZWVkIHVwIHNjcmFwaW5nXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5ibG9ja19hc3NldHMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGFnZS5zZXRSZXF1ZXN0SW50ZXJjZXB0aW9uKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5wYWdlLm9uKCdyZXF1ZXN0JywgKHJlcSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gcmVxLnJlc291cmNlVHlwZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrID0gWydzdHlsZXNoZWV0JywgJ2ZvbnQnLCAnaW1hZ2UnLCAnbWVkaWEnXTtcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2suaW5jbHVkZXModHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxLmNvbnRpbnVlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb25maWcudGVzdF9ldmFzaW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBOYXZpZ2F0ZSB0byB0aGUgcGFnZSB0aGF0IHdpbGwgcGVyZm9ybSB0aGUgdGVzdHMuXG4gICAgICAgICAgICBjb25zdCB0ZXN0VXJsID0gJ2h0dHBzOi8vYm90LnNhbm55c29mdC5jb20nO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYWdlLmdvdG8odGVzdFVybCk7XG4gICAgICAgICAgICAvLyBTYXZlIGEgc2NyZWVuc2hvdCBvZiB0aGUgcmVzdWx0cy5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGFnZS5zY3JlZW5zaG90KHsgcGF0aDogJ2hlYWRsZXNzLWV2YXNpb24tcmVzdWx0LnBuZycgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb25maWcubG9nX2h0dHBfaGVhZGVycyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5tZXRhZGF0YS5odHRwX2hlYWRlcnMgPSBhd2FpdCBtZXRhLmdldF9odHRwX2hlYWRlcnModGhpcy5wYWdlKTtcbiAgICAgICAgICAgIGRlYnVnKCd0aGlzLm1ldGFkYXRhLmh0dHBfaGVhZGVycz0lTycsIHRoaXMubWV0YWRhdGEuaHR0cF9oZWFkZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5sb2dfaXBfYWRkcmVzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbGV0IGlwaW5mbyA9IGF3YWl0IG1ldGEuZ2V0X2lwX2RhdGEodGhpcy5wYWdlKTtcbiAgICAgICAgICAgIHRoaXMubWV0YWRhdGEuaXBpbmZvID0gaXBpbmZvO1xuICAgICAgICAgICAgZGVidWcoJ3RoaXMubWV0YWRhdGEuaXBpbmZvJywgdGhpcy5tZXRhZGF0YS5pcGluZm8pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgdGhhdCBvdXIgcHJveHkgaXMgd29ya2luZyBieSBjb25maXJtaW5nXG4gICAgICAgIC8vIHRoYXQgaXBpbmZvLmlvIHNlZXMgdGhlIHByb3h5IElQIGFkZHJlc3NcbiAgICAgICAgaWYgKHRoaXMucHJveHkgJiYgdGhpcy5jb25maWcubG9nX2lwX2FkZHJlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGRlYnVnKGAke3RoaXMubWV0YWRhdGEuaXBpbmZvPy5pcH0gdnMgJHt0aGlzLnByb3h5fWApO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgaXAgcmV0dXJuZWQgYnkgaXBpbmZvIGlzIG5vdCBhIHN1YnN0cmluZyBvZiBvdXIgcHJveHlzdHJpbmcsIGdldCB0aGUgaGVjayBvdXR0YSBoZXJlXG4gICAgICAgICAgICBpZiAodGhpcy5tZXRhZGF0YS5pcGluZm8/LmlwICYmICghdGhpcy5wcm94eS5pbmNsdWRlcyh0aGlzLm1ldGFkYXRhLmlwaW5mbz8uaXApKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUHJveHkgb3V0cHV0IGlwICR7dGhpcy5wcm94eX0gZG9lcyBub3QgbWF0Y2ggd2l0aCBwcm92aWRlZCBvbmVgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgVXNpbmcgdmFsaWQgUHJveHk6ICR7dGhpcy5wcm94eX1gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubG9hZF9zdGFydF9wYWdlKCk7XG4gICAgfVxuICAgIC8qKlxuICAqXG4gICogQHJldHVybnMgdHJ1ZSBpZiBzdGFydHBhZ2Ugd2FzIGxvYWRlZCBjb3JyZWN0bHkuXG4gICovXG4gICAgYXN5bmMgbG9hZF9sb2dpbl9wYWdlKCkge1xuXG4gICAgfVxuICAgIC8qKlxuICAgICpcbiAgICAqIEByZXR1cm5zIHRydWUgaWYgc3RhcnRwYWdlIHdhcyBsb2FkZWQgY29ycmVjdGx5LlxuICAgICovXG4gICAgYXN5bmMgbG9hZF9zdGFydF9wYWdlKCkge1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIG1ha2UgbG9naW4gYWN0aW9uXG4gICAgICovXG4gICAgYXN5bmMgbWFrZWxvZ2luYWN0aW9uKCk6IFByb21pc2U8YW55fGJvb2xlYW4+IHtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiB1c2VyIGxvZ2luIGJ5IHRoZWlyIGhhbmRcbiAgICAgKi9cbiAgICBhc3luYyB1c2VybG9naW5hY3Rpb24oKSB7XG5cbiAgICB9XG5cbiAgICBhc3luYyBzZWFyY2hkYXRhKHNlYWNob2JqOiBTZWFyY2hvYmplY3QpOlByb21pc2U8YW55fEFycmF5PExpbmt1cmw+PntcblxuICAgIH0gXG5cbiAgICAvKipcbiAgICAgKiB1c2Ugd29ya2VyIHRvIHNlYXJjaCBkYXRhXG4gICAgICogQHBhcmFtIG9iamVjdCBrZXl3b3JkIFxuICAgICAqL1xuICAgIGFzeW5jIHdvcmtlcnNlYXJjaGRhdGEod29ya2Vyc2VhY2g6d29zZWFyY2hPYmopIHtcbiAgICBkZWJ1Zygnd29ya2VyPSVvJyx3b3JrZXJzZWFjaC53b3JrZXIsIHRoaXMuY29uZmlnLmtleXdvcmRzKTtcblxuICAgIGlmICh3b3JrZXJzZWFjaC5wYWdlKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IHdvcmtlcnNlYWNoLnBhZ2U7XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5wYWdlLnNldFZpZXdwb3J0KHsgd2lkdGg6IDEyODAsIGhlaWdodDogODAwIH0pO1xuICAgIGF3YWl0IHRoaXMubG9hZF9icm93c2VyX2VuZ2luZSgpXG4gICAgY29uc3QgbGlua3MgPSBhd2FpdCB0aGlzLnNlYXJjaGRhdGEoeyBrZXl3b3JkOiB0aGlzLmNvbmZpZy5rZXl3b3JkcyB9KVxuICAgIGNvbnN0IHJlbW90ZVNvdXJtb2RlbD1uZXcgUmVtb3RlU291cmNlKCk7XG4gICAgZGVidWcobGlua3MpXG4gICAgLy9oYW5kbGUgdGhlIGxpbmtzXG4gICAgIGxpbmtzPy5tYXAoYXN5bmMgbGlua0l0ZW09PntcbiAgICAgICBsZXQgbGlua29iaiA6IExpbmtkYXRhPXt0aXRsZTpsaW5rSXRlbS50aXRsZSx1cmw6bGlua0l0ZW0ubGluayxsYW5nOmxpbmtJdGVtLmxhbmcsc29jaWFsdGFza19pZDpsaW5rSXRlbS50YXNraWR9XG4gICAgICAgIGRlYnVnKGxpbmtvYmopXG4gICAgICAgIGF3YWl0IHJlbW90ZVNvdXJtb2RlbC5zYXZlTGlua3JlbW90ZShsaW5rb2JqKVxuICAgIH0pXG5cbn1cblxufVxuLy8gVGhpcyBpcyB3aGVyZSB3ZSdsbCBwdXQgdGhlIGNvZGUgdG8gZ2V0IGFyb3VuZCB0aGUgdGVzdHMuXG5hc3luYyBmdW5jdGlvbiBldmFkZUNocm9tZUhlYWRsZXNzRGV0ZWN0aW9uKHBhZ2UpIHtcblxuICAgIC8vIFBhc3MgdGhlIFdlYmRyaXZlciBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgLy8gY29uc3QgbmV3UHJvdG8gPSBuYXZpZ2F0b3IuX19wcm90b19fO1xuICAgICAgICBjb25zdCBuZXdQcm90byA9T2JqZWN0LmdldFByb3RvdHlwZU9mKG5hdmlnYXRvcik7XG4gICAgICAgIGRlbGV0ZSBuZXdQcm90by53ZWJkcml2ZXI7XG4gICAgICAgIC8vIG5hdmlnYXRvci5fX3Byb3RvX18gPSBuZXdQcm90bztcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG5hdmlnYXRvcixuZXdQcm90byk7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBDaHJvbWUgVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIC8vIGludGVyZmFjZSBtb2NrT2JqVHlwZSBleHRlbmRzIHR5cGVvZiBjaHJvbWUge1xuICAgICAgICAvLyAgICAgY2hyb21lOiBvYmplY3QsXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gV2UgY2FuIG1vY2sgdGhpcyBpbiBhcyBtdWNoIGRlcHRoIGFzIHdlIG5lZWQgZm9yIHRoZSB0ZXN0LlxuICAgICAgICBjb25zdCBtb2NrT2JqID0ge1xuICAgICAgICAgICAgYXBwOiB7XG4gICAgICAgICAgICAgICAgaXNJbnN0YWxsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdlYnN0b3JlOiB7XG4gICAgICAgICAgICAgICAgb25JbnN0YWxsU3RhZ2VDaGFuZ2VkOiB7fSxcbiAgICAgICAgICAgICAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bnRpbWU6IHtcbiAgICAgICAgICAgICAgICBQbGF0Zm9ybU9zOiB7XG4gICAgICAgICAgICAgICAgICAgIE1BQzogJ21hYycsXG4gICAgICAgICAgICAgICAgICAgIFdJTjogJ3dpbicsXG4gICAgICAgICAgICAgICAgICAgIEFORFJPSUQ6ICdhbmRyb2lkJyxcbiAgICAgICAgICAgICAgICAgICAgQ1JPUzogJ2Nyb3MnLFxuICAgICAgICAgICAgICAgICAgICBMSU5VWDogJ2xpbnV4JyxcbiAgICAgICAgICAgICAgICAgICAgT1BFTkJTRDogJ29wZW5ic2QnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgUGxhdGZvcm1BcmNoOiB7XG4gICAgICAgICAgICAgICAgICAgIEFSTTogJ2FybScsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl8zMjogJ3g4Ni0zMicsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl82NDogJ3g4Ni02NCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBQbGF0Zm9ybU5hY2xBcmNoOiB7XG4gICAgICAgICAgICAgICAgICAgIEFSTTogJ2FybScsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl8zMjogJ3g4Ni0zMicsXG4gICAgICAgICAgICAgICAgICAgIFg4Nl82NDogJ3g4Ni02NCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBSZXF1ZXN0VXBkYXRlQ2hlY2tTdGF0dXM6IHtcbiAgICAgICAgICAgICAgICAgICAgVEhST1RUTEVEOiAndGhyb3R0bGVkJyxcbiAgICAgICAgICAgICAgICAgICAgTk9fVVBEQVRFOiAnbm9fdXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgVVBEQVRFX0FWQUlMQUJMRTogJ3VwZGF0ZV9hdmFpbGFibGUnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgT25JbnN0YWxsZWRSZWFzb246IHtcbiAgICAgICAgICAgICAgICAgICAgSU5TVEFMTDogJ2luc3RhbGwnLFxuICAgICAgICAgICAgICAgICAgICBVUERBVEU6ICd1cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBDSFJPTUVfVVBEQVRFOiAnY2hyb21lX3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIFNIQVJFRF9NT0RVTEVfVVBEQVRFOiAnc2hhcmVkX21vZHVsZV91cGRhdGUnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgT25SZXN0YXJ0UmVxdWlyZWRSZWFzb246IHtcbiAgICAgICAgICAgICAgICAgICAgQVBQX1VQREFURTogJ2FwcF91cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBPU19VUERBVEU6ICdvc191cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBQRVJJT0RJQzogJ3BlcmlvZGljJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgLy8gaWYod2luZG93Lm5hdmlnYXRvci5jaHJvbWUpe1xuICAgICAgICAvLyB3aW5kb3cubmF2aWdhdG9yLmNocm9tZSA9IG1vY2tPYmo7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gd2luZG93LmNocm9tZSA9IG1vY2tPYmo7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBQZXJtaXNzaW9ucyBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxRdWVyeSA9IHdpbmRvdy5uYXZpZ2F0b3IucGVybWlzc2lvbnMucXVlcnk7XG4gICAgICAgIC8vIHdpbmRvdy5uYXZpZ2F0b3IucGVybWlzc2lvbnMuX19wcm90b19fLnF1ZXJ5ID0gcGFyYW1ldGVycyA9PlxuICAgICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2luZG93Lm5hdmlnYXRvci5wZXJtaXNzaW9ucykucXVlcnkgPSBwYXJhbWV0ZXJzID0+XG4gICAgICAgICAgICBcbiAgICAgICAgcGFyYW1ldGVycy5uYW1lID09PSAnbm90aWZpY2F0aW9ucydcbiAgICAgICAgICAgICAgICA/IFByb21pc2UucmVzb2x2ZSh7IHN0YXRlOiBOb3RpZmljYXRpb24ucGVybWlzc2lvbiB9KVxuICAgICAgICAgICAgICAgIDogb3JpZ2luYWxRdWVyeShwYXJhbWV0ZXJzKTtcblxuICAgICAgICAvLyBJbnNwaXJlZCBieTogaHR0cHM6Ly9naXRodWIuY29tL2lrYXJpZW5hdG9yL3BoYW50b21qc19oaWRlX2FuZF9zZWVrL2Jsb2IvbWFzdGVyLzUuc3Bvb2ZGdW5jdGlvbkJpbmQuanNcbiAgICAgICAgY29uc3Qgb2xkQ2FsbCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNhbGwoKSB7XG4gICAgICAgICAgICByZXR1cm4gb2xkQ2FsbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwgPSBjYWxsO1xuXG4gICAgICAgIGNvbnN0IG5hdGl2ZVRvU3RyaW5nRnVuY3Rpb25TdHJpbmcgPSBFcnJvci50b1N0cmluZygpLnJlcGxhY2UoL0Vycm9yL2csIFwidG9TdHJpbmdcIik7XG4gICAgICAgIGNvbnN0IG9sZFRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZ1bmN0aW9uVG9TdHJpbmcoKSB7XG4gICAgICAgICAgICBpZiAodGhpcyA9PT0gd2luZG93Lm5hdmlnYXRvci5wZXJtaXNzaW9ucy5xdWVyeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcImZ1bmN0aW9uIHF1ZXJ5KCkgeyBbbmF0aXZlIGNvZGVdIH1cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzID09PSBmdW5jdGlvblRvU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZVRvU3RyaW5nRnVuY3Rpb25TdHJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2xkQ2FsbC5jYWxsKG9sZFRvU3RyaW5nLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uVG9TdHJpbmc7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBQbHVnaW5zIExlbmd0aCBUZXN0LlxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgLy8gT3ZlcndyaXRlIHRoZSBgcGx1Z2luc2AgcHJvcGVydHkgdG8gdXNlIGEgY3VzdG9tIGdldHRlci5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5hdmlnYXRvciwgJ3BsdWdpbnMnLCB7XG4gICAgICAgICAgICAvLyBUaGlzIGp1c3QgbmVlZHMgdG8gaGF2ZSBgbGVuZ3RoID4gMGAgZm9yIHRoZSBjdXJyZW50IHRlc3QsXG4gICAgICAgICAgICAvLyBidXQgd2UgY291bGQgbW9jayB0aGUgcGx1Z2lucyB0b28gaWYgbmVjZXNzYXJ5LlxuICAgICAgICAgICAgZ2V0OiAoKSA9PiBbMSwgMiwgMywgNCwgNV1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBMYW5ndWFnZXMgVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIC8vIE92ZXJ3cml0ZSB0aGUgYHBsdWdpbnNgIHByb3BlcnR5IHRvIHVzZSBhIGN1c3RvbSBnZXR0ZXIuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXZpZ2F0b3IsICdsYW5ndWFnZXMnLCB7XG4gICAgICAgICAgICBnZXQ6ICgpID0+IFsnZW4tVVMnLCAnZW4nXVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdGhlIGlmcmFtZSBUZXN0XG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSFRNTElGcmFtZUVsZW1lbnQucHJvdG90eXBlLCAnY29udGVudFdpbmRvdycsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0b1N0cmluZyB0ZXN0LCB0aG91Z2ggaXQgYnJlYWtzIGNvbnNvbGUuZGVidWcoKSBmcm9tIHdvcmtpbmdcbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmRlYnVnID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBjb25zdCBjaGVlcmlvID0gcmVxdWlyZSgnY2hlZXJpbycpO1xuaW1wb3J0IHtTb2NpYWxTY3JhcGVyIGFzIFNjcmFwZXIsU2NyYXBlT3B0aW9uc30gZnJvbSAnLi9zb2NpYWxfc2NyYXBlcic7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmNsYXNzIFlvdXR1YmVTY3JhcGVyIGV4dGVuZHMgU2NyYXBlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBTY3JhcGVPcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKGFyZ3MpOyAgICBcbiAgICB9XG5cblxuICAgIGFzeW5jIGxvYWRfbG9naW5fcGFnZSgpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBzdGFydFVybCA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbSc7XG5cbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnVXNpbmcgbG9naW5Vcmw6ICcgKyBzdGFydFVybCk7XG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS5zZXRCeXBhc3NDU1AodHJ1ZSk7XG4gICAgICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IGF3YWl0IHRoaXMucGFnZS5nb3RvKHN0YXJ0VXJsKTtcbiAgICAgICAgXG4gICAgICAgIC8vaGlkZGVuIGljb25cbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLmV2YWx1YXRlKCgpID0+IHtcbiAgICAgICAgdmFyIGljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ28taWNvblwiKTtcbiAgICAgICAgaWYoaWNvbil7XG4gICAgICAgIGljb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZy50bXBwYXRoKVxuICAgICAgICAvL2F3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoJ2lucHV0W25hbWU9XCJxXCJdJywgeyB0aW1lb3V0OiB0aGlzLlNUQU5EQVJEX1RJTUVPVVQgfSk7XG4gICAgICAgIC8vYXdhaXQgZm9yIHVzZXIgdG8gdGFrZSBhY3Rpb25cbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcignI2F2YXRhci1idG4nLHsndGltZW91dCc6MH0pO1xuICAgICAgICAvL3VzZXIgaGFzIHN1Y2Nlc3MgbG9naW5cbiAgICAgICAgLy9zYXZlIGNvb2tpZXMgXG4gICAgICAgIGNvbnN0IGNvb2tpZXMgPSBhd2FpdCB0aGlzLnBhZ2UuY29va2llcygpO1xuICAgICAgICBcbiAgICAgICAgYXdhaXQgZnMud3JpdGVGaWxlKHRoaXMuY29uZmlnLnRtcHBhdGgrJy9jb29raWVzLmpzb24nLCBKU09OLnN0cmluZ2lmeShjb29raWVzLCBudWxsLCAyKSk7XG4gICAgICAgIC8vIGF3YWl0IGJyb3dzZXIuY2xvc2UoKTtcbiAgICAgICAgLy8gcmV0dXJuIHRydWU7XG4gICAgfVxuXG5cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBZb3V0dWJlU2NyYXBlcjogWW91dHViZVNjcmFwZXIsXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBVc2UgVHlwZVNjcmlwdCBtb2R1bGVzIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM1NzU4NTg0L2Nhbm5vdC1yZWRlY2xhcmUtYmxvY2stc2NvcGVkLXZhcmlhYmxlXG5leHBvcnQge307XG5jb25zdCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcbmNvbnN0IG9zID0gcmVxdWlyZShcIm9zXCIpO1xuY29uc3QgXyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5jb25zdCB7IGNyZWF0ZUxvZ2dlciwgZm9ybWF0LCB0cmFuc3BvcnRzIH0gPSByZXF1aXJlKFwid2luc3RvblwiKTtcbmNvbnN0IHsgY29tYmluZSwgdGltZXN0YW1wLCBwcmludGYgfSA9IGZvcm1hdDtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZShcImRlYnVnXCIpKFwic2Utc2NyYXBlcjpTY3JhcGVNYW5hZ2VyXCIpO1xuY29uc3QgeyBDbHVzdGVyIH0gPSByZXF1aXJlKFwicHVwcGV0ZWVyLWNsdXN0ZXJcIik7XG5jb25zdCB2YW5pbGxhUHVwcGV0ZWVyID0gcmVxdWlyZShcInB1cHBldGVlclwiKTtcbmNvbnN0IHsgYWRkRXh0cmEgfSA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmFcIik7XG4vLyBjb25zdCBTdGVhbHRoID0gcmVxdWlyZShcInB1cHBldGVlci1leHRyYS1wbHVnaW4tc3RlYWx0aFwiKTtcbi8vIGNvbnN0IEFkYmxvY2tlclBsdWdpbiA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmEtcGx1Z2luLWFkYmxvY2tlclwiKTtcblxuY29uc3QgVXNlckFnZW50ID0gcmVxdWlyZShcInVzZXItYWdlbnRzXCIpO1xuY29uc3QgZmFjZWJvb2sgPSByZXF1aXJlKFwiLi9tb2R1bGVzL2ZhY2Vib29rX3NjcmFwZXJcIik7XG5jb25zdCB5b3V0dWJlID0gcmVxdWlyZShcIi4vbW9kdWxlcy95b3V0dWJlX3NjcmFwZXJcIik7XG5jb25zdCBiaWxpYmlsaSA9IHJlcXVpcmUoXCIuL21vZHVsZXMvYmlsaWJpbGlfc2NyYXBlclwiKTtcbi8vIGNvbnN0IGJpbmcgPSByZXF1aXJlKCcuL21vZHVsZXMvYmluZy5qcycpO1xuLy8gY29uc3QgeWFuZGV4ID0gcmVxdWlyZSgnLi9tb2R1bGVzL3lhbmRleC5qcycpO1xuLy8gY29uc3QgaW5mb3NwYWNlID0gcmVxdWlyZSgnLi9tb2R1bGVzL2luZm9zcGFjZS5qcycpO1xuLy8gY29uc3QgZHVja2R1Y2tnbyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9kdWNrZHVja2dvLmpzJyk7XG5jb25zdCBDdXN0b21Db25jdXJyZW5jeUltcGwgPSByZXF1aXJlKFwiLi9jb25jdXJyZW5jeS1pbXBsZW1lbnRhdGlvblwiKTtcbi8vIGNvbnN0IGF4aW9zID0gcmVxdWlyZShcImF4aW9zXCIpO1xuY29uc3QgTUFYX0FMTE9XRURfQlJPV1NFUlMgPSA2O1xuLy8gY29uc3QgcHVwcGV0ZWVyID0gcmVxdWlyZShcInB1cHBldGVlci1leHRyYVwiKTtcbi8vIGNvbnN0IF9TdGVhbHRoUGx1Z2luID0gcmVxdWlyZSgncHVwcGV0ZWVyLWV4dHJhLXBsdWdpbi1zdGVhbHRoJyk7XG4vLyBjb25zdCBfQWRibG9ja2VyUGx1Z2luID0gcmVxdWlyZSgncHVwcGV0ZWVyLWV4dHJhLXBsdWdpbi1hZGJsb2NrZXInKTtcblxuZnVuY3Rpb24gd3JpdGVfcmVzdWx0cyhmbmFtZSwgZGF0YSkge1xuICBmcy53cml0ZUZpbGVTeW5jKGZuYW1lLCBkYXRhLCAoZXJyKSA9PiB7XG4gICAgaWYgKGVycikgdGhyb3cgZXJyO1xuICAgIGNvbnNvbGUubG9nKGBSZXN1bHRzIHdyaXR0ZW4gdG8gZmlsZSAke2ZuYW1lfWApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVhZF9rZXl3b3Jkc19mcm9tX2ZpbGUoZm5hbWUpIHtcbiAgbGV0IGt3cyA9IGZzLnJlYWRGaWxlU3luYyhmbmFtZSkudG9TdHJpbmcoKS5zcGxpdChvcy5FT0wpO1xuICAvLyBjbGVhbiBrZXl3b3Jkc1xuICBrd3MgPSBrd3MuZmlsdGVyKChrdykgPT4ge1xuICAgIHJldHVybiBrdy50cmltKCkubGVuZ3RoID4gMDtcbiAgfSk7XG4gIHJldHVybiBrd3M7XG59XG5cblxuZnVuY3Rpb24gZ2V0U2NyYXBlcihzZWFyY2hfZW5naW5lOnN0cmluZywgYXJnczphbnkpIHtcbiAgaWYgKHR5cGVvZiBzZWFyY2hfZW5naW5lID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIG5ldyB7XG4gICAgICBmYWNlYm9vazogZmFjZWJvb2suRmFjZWJvb2tTY3JhcGVyLFxuICAgICAgeW91dHViZTogeW91dHViZS5Zb3V0dWJlU2NyYXBlcixcbiAgICAgIGJpbGliaWxpOiBiaWxpYmlsaS5CaWxpYmlsaVNjcmFwZXIsXG4gICAgfVtzZWFyY2hfZW5naW5lXShhcmdzKTtcbiAgfSBcbiAgLy8gZWxzZSBpZiAodHlwZW9mIHNlYXJjaF9lbmdpbmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAvLyAgIHJldHVybiBuZXcgc2VhcmNoX2VuZ2luZShhcmdzKTtcbiAgLy8gfSBcbiAgZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYHNvY2lhbCBwbGF0Zm9ybSBtdXN0IGVpdGhlciBiZSBhIHN0cmluZyBvZiBjbGFzcyAoZnVuY3Rpb24pYFxuICAgICk7XG4gIH1cbn1cbnR5cGUgU01jb25maWcgPXtcbiAgbG9nZ2VyOntpbmZvOkZ1bmN0aW9ufTtcbiAga2V5d29yZHM6QXJyYXk8c3RyaW5nPjtcbiAgcHJveGllczpBcnJheTxzdHJpbmc+O1xuICBrZXl3b3JkX2ZpbGU6c3RyaW5nO1xuICBwcm94eV9maWxlOnN0cmluZztcbiAgdXNlX3Byb3hpZXNfb25seTpib29sZWFuO1xuICBjdXN0b21fZnVuYzpzdHJpbmc7XG4gIGNocm9tZV9mbGFnczpBcnJheTxzdHJpbmc+O1xuICBwdXBwZXRlZXJfY2x1c3Rlcl9jb25maWc6e1xuICAgIG1heENvbmN1cnJlbmN5Om51bWJlcjtcbiAgICBtb25pdG9yOmJvb2xlYW47XG4gICAgdGltZW91dDpudW1iZXI7XG4gIH1cbiAgcmFuZG9tX3VzZXJfYWdlbnQ6Ym9vbGVhbjtcbiAgdXNlcl9hZ2VudDpzdHJpbmc7XG4gIGhlYWRsZXNzOmJvb2xlYW47XG4gIHBsYXRmb3JtOnN0cmluZztcbiAgdGFza2lkPzpudW1iZXI7XG59XG5leHBvcnQgY2xhc3MgU2NyYXBlTWFuYWdlciB7XG4gIGNsdXN0ZXI6e2V4ZWN1dGU6RnVuY3Rpb247aWRsZTpGdW5jdGlvbjtjbG9zZTpGdW5jdGlvbn07XG4gIHBsdWdnYWJsZTp7c3RhcnRfYnJvd3Nlcj86RnVuY3Rpb24sY2xvc2VfYnJvd3Nlcj86RnVuY3Rpb24saGFuZGxlX3Jlc3VsdHM/OkZ1bmN0aW9uLGhhbmRsZV9tZXRhZGF0YT86RnVuY3Rpb259O1xuICBzY3JhcGVyOntydW5Mb2dpbjpGdW5jdGlvbjt3b3JrZXJzZWFyY2hkYXRhOkZ1bmN0aW9ufTtcbiAgY29udGV4dDpvYmplY3Q7XG4gIGNvbmZpZzpTTWNvbmZpZztcbiAgbG9nZ2VyOntpbmZvOkZ1bmN0aW9ufTtcbiAgYnJvd3Nlcjp7bmV3UGFnZTpGdW5jdGlvbn07XG4gIHBhZ2U6b2JqZWN0O1xuICBudW1DbHVzdGVyczpudW1iZXI7XG4gIHRtcHBhdGg6c3RyaW5nO1xuICBydW5Mb2dpbjpGdW5jdGlvbjtcbiAgY29uc3RydWN0b3IoY29uZmlnLCBjb250ZXh0ID0ge30pIHtcbiAgICB0aGlzLmNsdXN0ZXIgPSBudWxsO1xuICAgIHRoaXMucGx1Z2dhYmxlID0gbnVsbDtcbiAgICB0aGlzLnNjcmFwZXIgPSBudWxsO1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgXG4gICAgLy8gYXdhaXQgdGhpcy5nZXRSZW1vdGVDb25maWcoY2FtcGFpZ25JZClcblxuICAgIHRoaXMuY29uZmlnID0gXy5kZWZhdWx0cyhjb25maWcsIHtcbiAgICAgIC8vIHJlbW90ZV9hZGQ6ZW5kY29maWcuUkVNT1RFQURELFxuICAgICAgLy8gcmVtb3RlX3VzZXJuYW1lOmVuZGNvZmlnLlVTRVJOQU1FLFxuICAgICAgLy8gcmVtb3RlX3Bhc3N3b3JkOmVuZGNvZmlnLlBBU1NXT1JELFxuICAgICAgLy8gdGhlIHVzZXIgYWdlbnQgdG8gc2NyYXBlIHdpdGhcbiAgICAgIHVzZXJfYWdlbnQ6XG4gICAgICAgIFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwNy4wLjAuMCBTYWZhcmkvNTM3LjM2XCIsXG4gICAgICAvLyBpZiByYW5kb21fdXNlcl9hZ2VudCBpcyBzZXQgdG8gVHJ1ZSwgYSByYW5kb20gdXNlciBhZ2VudCBpcyBjaG9zZW5cbiAgICAgIHJhbmRvbV91c2VyX2FnZW50OiBmYWxzZSxcbiAgICAgIC8vIHdoZXRoZXIgdG8gc2VsZWN0IG1hbnVhbCBzZXR0aW5ncyBpbiB2aXNpYmxlIG1vZGVcbiAgICAgIHNldF9tYW51YWxfc2V0dGluZ3M6IGZhbHNlLFxuICAgICAgLy8gbG9nIGlwIGFkZHJlc3MgZGF0YVxuICAgICAgbG9nX2lwX2FkZHJlc3M6IGZhbHNlLFxuICAgICAgLy8gbG9nIGh0dHAgaGVhZGVyc1xuICAgICAgbG9nX2h0dHBfaGVhZGVyczogZmFsc2UsXG4gICAgICAvLyBob3cgbG9uZyB0byBzbGVlcCBiZXR3ZWVuIHJlcXVlc3RzLiBhIHJhbmRvbSBzbGVlcCBpbnRlcnZhbCB3aXRoaW4gdGhlIHJhbmdlIFthLGJdXG4gICAgICAvLyBpcyBkcmF3biBiZWZvcmUgZXZlcnkgcmVxdWVzdC4gZW1wdHkgc3RyaW5nIGZvciBubyBzbGVlcGluZy5cbiAgICAgIHNsZWVwX3JhbmdlOiBudWxsLFxuXG4gICAgICBsb2dnZXI6IGNyZWF0ZUxvZ2dlcih7XG4gICAgICAgIGxldmVsOiBcImluZm9cIixcbiAgICAgICAgZm9ybWF0OiBjb21iaW5lKFxuICAgICAgICAgIHRpbWVzdGFtcCgpLFxuICAgICAgICAgIHByaW50ZigoeyBsZXZlbCwgbWVzc2FnZSwgdGltZXN0YW1wIH0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgJHt0aW1lc3RhbXB9IFske2xldmVsfV0gJHttZXNzYWdlfWA7XG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgICAgdHJhbnNwb3J0czogW25ldyB0cmFuc3BvcnRzLkNvbnNvbGUoKV0sXG4gICAgICB9KSxcbiAgICAgIHBsYXRmb3JtOiBcImZhY2Vib29rXCIsXG4gICAgICBrZXl3b3JkczogW1wibm9kZWpzIHJvY2tzXCJdLFxuICAgICAgLy8gd2hldGhlciB0byBzdGFydCB0aGUgYnJvd3NlciBpbiBoZWFkbGVzcyBtb2RlXG4gICAgICAvLyBoZWFkbGVzczogdHJ1ZSxcbiAgICAgIC8vIHNwZWNpZnkgZmxhZ3MgcGFzc2VkIHRvIGNocm9tZSBoZXJlXG4gICAgICAvLyBBYm91dCBvdXIgZGVmYXVsdHMgdmFsdWVzIGh0dHBzOi8vcGV0ZXIuc2gvZXhwZXJpbWVudHMvY2hyb21pdW0tY29tbWFuZC1saW5lLXN3aXRjaGVzL1xuICAgICAgY2hyb21lX2ZsYWdzOiBbXG4gICAgICAgIFwiLS1kaXNhYmxlLWluZm9iYXJzXCIsXG4gICAgICAgIFwiLS13aW5kb3ctcG9zaXRpb249MCwwXCIsXG4gICAgICAgIFwiLS1pZ25vcmUtY2VydGlmY2F0ZS1lcnJvcnNcIixcbiAgICAgICAgXCItLWlnbm9yZS1jZXJ0aWZjYXRlLWVycm9ycy1zcGtpLWxpc3RcIixcbiAgICAgICAgXCItLW5vLXNhbmRib3hcIixcbiAgICAgICAgXCItLWRpc2FibGUtc2V0dWlkLXNhbmRib3hcIixcbiAgICAgICAgXCItLWRpc2FibGUtZGV2LXNobS11c2FnZVwiLFxuICAgICAgICBcIi0tZGlzYWJsZS1hY2NlbGVyYXRlZC0yZC1jYW52YXNcIixcbiAgICAgICAgXCItLWRpc2FibGUtZ3B1XCIsXG4gICAgICAgIFwiLS13aW5kb3ctc2l6ZT0xMjgwLDc2OFwiLFxuICAgICAgICBcIi0tc3RhcnQtZnVsbHNjcmVlblwiLFxuICAgICAgICBcIi0taGlkZS1zY3JvbGxiYXJzXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLW5vdGlmaWNhdGlvbnNcIixcbiAgICAgIF0sXG4gICAgICAvL2ZpeCBnb29nbGUgYWNjb3VudCBjYW4gbm90IGxvZ2luXG4gICAgICBpZ25vcmVEZWZhdWx0QXJnczogW1xuICAgICAgICBcIi0tZW5hYmxlLWF1dG9tYXRpb25cIixcbiAgICAgICAgXCItLWRpc2FibGUtZXh0ZW5zaW9uc1wiLFxuICAgICAgICBcIi0tZGlzYWJsZS1kZWZhdWx0LWFwcHNcIixcbiAgICAgICAgXCItLWRpc2FibGUtY29tcG9uZW50LWV4dGVuc2lvbnMtd2l0aC1iYWNrZ3JvdW5kLXBhZ2VzXCIsXG4gICAgICBdLFxuICAgICAgLy8gdGhlIG51bWJlciBvZiBwYWdlcyB0byBzY3JhcGUgZm9yIGVhY2gga2V5d29yZFxuICAgICAgbnVtX3BhZ2VzOiAxLFxuICAgICAgLy8gcGF0aCB0byBvdXRwdXQgZmlsZSwgZGF0YSB3aWxsIGJlIHN0b3JlZCBpbiBKU09OXG4gICAgICBvdXRwdXRfZmlsZTogXCJcIixcbiAgICAgIC8vIHdoZXRoZXIgdG8gYWxzbyBwYXNzdGhydSBhbGwgdGhlIGh0bWwgb3V0cHV0IG9mIHRoZSBzZXJwIHBhZ2VzXG4gICAgICBodG1sX291dHB1dDogZmFsc2UsXG4gICAgICAvLyB3aGV0aGVyIHRvIHN0cmlwIEpTIGFuZCBDU1MgZnJvbSB0aGUgaHRtbF9vdXRwdXRcbiAgICAgIC8vIGhhcyBvbmx5IGFuIGVmZmVjdCBpZiBgaHRtbF9vdXRwdXRgIGlzIHRydWVcbiAgICAgIGNsZWFuX2h0bWxfb3V0cHV0OiB0cnVlLFxuICAgICAgLy8gcmVtb3ZlIGFsbCBkYXRhIGltYWdlcyBmcm9tIHRoZSBodG1sXG4gICAgICBjbGVhbl9kYXRhX2ltYWdlczogdHJ1ZSxcbiAgICAgIC8vIHdoZXRoZXIgdG8gcmV0dXJuIGEgc2NyZWVuc2hvdCBvZiBzZXJwIHBhZ2VzIGFzIGI2NCBkYXRhXG4gICAgICBzY3JlZW5fb3V0cHV0OiBmYWxzZSxcbiAgICAgIC8vIFNjcmFwZSB1cmwgZnJvbSBsb2NhbCBmaWxlLiBNYWlubHkgdXNlZCBmb3IgdGVzdGluZy5cbiAgICAgIHNjcmFwZV9mcm9tX2ZpbGU6IFwiXCIsXG4gICAgICAvLyB3aGV0aGVyIHRvIHByZXZlbnQgaW1hZ2VzLCBjc3MsIGZvbnRzIGFuZCBtZWRpYSBmcm9tIGJlaW5nIGxvYWRlZFxuICAgICAgLy8gd2lsbCBzcGVlZCB1cCBzY3JhcGluZyBhIGdyZWF0IGRlYWxcbiAgICAgIGJsb2NrX2Fzc2V0czogdHJ1ZSxcbiAgICAgIC8vIHBhdGggdG8ganMgbW9kdWxlIHRoYXQgZXh0ZW5kcyBmdW5jdGlvbmFsaXR5XG4gICAgICAvLyB0aGlzIG1vZHVsZSBzaG91bGQgZXhwb3J0IHRoZSBmdW5jdGlvbnM6XG4gICAgICAvLyBnZXRfYnJvd3NlciwgaGFuZGxlX21ldGFkYXRhLCBjbG9zZV9icm93c2VyXG4gICAgICAvL2N1c3RvbV9mdW5jOiByZXNvbHZlKCdleGFtcGxlcy9wbHVnZ2FibGUuanMnKSxcbiAgICAgIGN1c3RvbV9mdW5jOiBudWxsLFxuICAgICAgdGhyb3dfb25fZGV0ZWN0aW9uOiBmYWxzZSxcbiAgICAgIC8vIExpc3Qgb2YgcHJveGllcyB0byB1c2UgWydzb2NrczU6Ly83OC45NC4xNzIuNDI6MTA4MCcsICdodHRwOi8vbG9jYWxob3N0OjEwODAnXVxuICAgICAgcHJveGllczogbnVsbCxcbiAgICAgIC8vIGEgZmlsZSB3aXRoIG9uZSBwcm94eSBwZXIgbGluZS4gRXhhbXBsZTpcbiAgICAgIC8vIHNvY2tzNTovLzc4Ljk0LjE3Mi40MjoxMDgwXG4gICAgICAvLyBodHRwOi8vMTE4LjE3NC4yMzMuMTA6NDg0MDBcbiAgICAgIHByb3h5X2ZpbGU6IFwiXCIsXG4gICAgICAvLyB3aGV0aGVyIHRvIHVzZSBwcm94aWVzIG9ubHlcbiAgICAgIC8vIHdoZW4gdGhpcyBpcyBzZXQgdG8gdHJ1ZSwgc2Utc2NyYXBlciB3aWxsIG5vdCB1c2VcbiAgICAgIC8vIHlvdXIgZGVmYXVsdCBJUCBhZGRyZXNzXG4gICAgICB1c2VfcHJveGllc19vbmx5OiBmYWxzZSxcbiAgICAgIC8vIGNoZWNrIGlmIGhlYWRsZXNzIGNocm9tZSBlc2NhcGVzIGNvbW1vbiBkZXRlY3Rpb24gdGVjaG5pcXVlc1xuICAgICAgLy8gdGhpcyBpcyBhIHF1aWNrIHRlc3QgYW5kIHNob3VsZCBiZSB1c2VkIGZvciBkZWJ1Z2dpbmdcbiAgICAgIHRlc3RfZXZhc2lvbjogZmFsc2UsXG4gICAgICBhcHBseV9ldmFzaW9uX3RlY2huaXF1ZXM6IHRydWUsXG4gICAgICAvLyBzZXR0aW5ncyBmb3IgcHVwcGV0ZWVyLWNsdXN0ZXJcbiAgICAgIHB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZzoge1xuICAgICAgICB0aW1lb3V0OiAzMCAqIDYwICogMTAwMCwgLy8gbWF4IHRpbWVvdXQgc2V0IHRvIDMwIG1pbnV0ZXNcbiAgICAgICAgbW9uaXRvcjogZmFsc2UsXG4gICAgICAgIGNvbmN1cnJlbmN5OiBDbHVzdGVyLkNPTkNVUlJFTkNZX0JST1dTRVIsXG4gICAgICAgIG1heENvbmN1cnJlbmN5OiAxLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBcbiAgICB0aGlzLmxvZ2dlciA9IHRoaXMuY29uZmlnLmxvZ2dlcjtcblxuICAgIGlmIChjb25maWcuc2xlZXBfcmFuZ2UpIHtcbiAgICAgIC8vIHBhcnNlIGFuIGFycmF5XG4gICAgICBjb25maWcuc2xlZXBfcmFuZ2UgPSBldmFsKGNvbmZpZy5zbGVlcF9yYW5nZSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgY29uZmlnLnNsZWVwX3JhbmdlLmxlbmd0aCAhPT0gMiBcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBcInNsZWVwX3JhbmdlIGlzIG5vdCBhIHZhbGlkIGFycmF5IG9mIHR3byBpbnRlZ2Vycy5cIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZnMuZXhpc3RzU3luYyh0aGlzLmNvbmZpZy5rZXl3b3JkX2ZpbGUpKSB7XG4gICAgICB0aGlzLmNvbmZpZy5rZXl3b3JkcyA9IHJlYWRfa2V5d29yZHNfZnJvbV9maWxlKHRoaXMuY29uZmlnLmtleXdvcmRfZmlsZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLnByb3hpZXMgJiYgdGhpcy5jb25maWcucHJveHlfZmlsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkVpdGhlciB1c2UgYSBwcm94eV9maWxlIG9yIHNwZWNpZnkgYSBwcm94eSBmb3IgYWxsIGNvbm5lY3Rpb25zLiBEbyBub3QgdXNlIGJvdGggb3B0aW9ucy5cIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcucHJveHlfZmlsZSkge1xuICAgICAgdGhpcy5jb25maWcucHJveGllcyA9IHJlYWRfa2V5d29yZHNfZnJvbV9maWxlKHRoaXMuY29uZmlnLnByb3h5X2ZpbGUpO1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgJHt0aGlzLmNvbmZpZy5wcm94aWVzLmxlbmd0aH0gcHJveGllcyByZWFkIGZyb20gZmlsZS5gKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY29uZmlnLnByb3hpZXMgJiYgdGhpcy5jb25maWcudXNlX3Byb3hpZXNfb25seSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIk11c3QgcHJvdmlkZSBhdCBsZWFzdCBvbmUgcHJveHkgaW4gcHJveGllcyBpZiB5b3UgZW5hYmxlIHVzZV9wcm94aWVzX29ubHlcIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBkZWJ1ZyhcInRoaXMuY29uZmlnPSVPXCIsIHRoaXMuY29uZmlnKTtcbiAgfVxuXG4gIC8qXG4gICAqIExhdW5jaGVzIHRoZSBwdXBwZXRlZXIgY2x1c3RlciBvciBicm93c2VyLlxuICAgKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGJyb3dzZXIgd2FzIHN1Y2Nlc3NmdWxseSBsYXVuY2hlZC4gT3RoZXJ3aXNlIHdpbGwgcmV0dXJuIGZhbHNlLlxuICAgKi9cbiAgYXN5bmMgc3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmN1c3RvbV9mdW5jKSB7XG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyh0aGlzLmNvbmZpZy5jdXN0b21fZnVuYykpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBQbHVnZ2FibGVDbGFzcyA9IHJlcXVpcmUodGhpcy5jb25maWcuY3VzdG9tX2Z1bmMpO1xuICAgICAgICAgIHRoaXMucGx1Z2dhYmxlID0gbmV3IFBsdWdnYWJsZUNsYXNzKHtcbiAgICAgICAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXhjZXB0aW9uKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEZpbGUgXCIke3RoaXMuY29uZmlnLmN1c3RvbV9mdW5jfVwiIGRvZXMgbm90IGV4aXN0IWApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2hyb21lX2ZsYWdzID0gXy5jbG9uZSh0aGlzLmNvbmZpZy5jaHJvbWVfZmxhZ3MpO1xuXG4gICAgaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLnN0YXJ0X2Jyb3dzZXIpIHtcbiAgICAgIC8vIGxhdW5jaF9hcmdzLmNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgdGhpcy5icm93c2VyID0gYXdhaXQgdGhpcy5wbHVnZ2FibGUuc3RhcnRfYnJvd3Nlcih7XG4gICAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICB9KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiMjI5XCIpXG4gICAgICB0aGlzLnBhZ2UgPSBhd2FpdCB0aGlzLmJyb3dzZXIubmV3UGFnZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBcbiAgICAgIC8vIGlmIG5vIGN1c3RvbSBzdGFydF9icm93c2VyIGZ1bmN0aW9uYWxpdHkgd2FzIGdpdmVuXG4gICAgICAvLyB1c2UgcHVwcGV0ZWVyLWNsdXN0ZXIgZm9yIHNjcmFwaW5nXG5cbiAgICAgIGxldCBwcm94aWVzO1xuICAgICAgLy8gaWYgd2UgaGF2ZSBhdCBsZWFzdCBvbmUgcHJveHksIGFsd2F5cyB1c2UgQ09OQ1VSUkVOQ1lfQlJPV1NFUlxuICAgICAgLy8gYW5kIHNldCBtYXhDb25jdXJyZW5jeSB0byB0aGlzLmNvbmZpZy5wcm94aWVzLmxlbmd0aCArIDFcbiAgICAgIC8vIGVsc2UgdXNlIHdoYXRldmVyIHRoaXMuY29uZmlndXJhdGlvbiB3YXMgcGFzc2VkXG4gICAgICBpZiAodGhpcy5jb25maWcucHJveGllcyAmJiB0aGlzLmNvbmZpZy5wcm94aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gYmVjYXVzZSB3ZSB1c2UgcmVhbCBicm93c2Vycywgd2UgcmFuIG91dCBvZiBtZW1vcnkgb24gbm9ybWFsIGxhcHRvcHNcbiAgICAgICAgLy8gd2hlbiB1c2luZyBtb3JlIHRoYW4gbWF5YmUgNSBvciA2IGJyb3dzZXJzLlxuICAgICAgICAvLyB0aGVyZWZvcmUgaGFyZGNvZGUgYSBsaW1pdCBoZXJlXG4gICAgICAgIC8vIFRPRE8gbm90IHN1cmUgdGhpcyB3aGF0IHdlIHdhbnRcbiAgICAgICAgdGhpcy5udW1DbHVzdGVycyA9IE1hdGgubWluKFxuICAgICAgICAgIHRoaXMuY29uZmlnLnByb3hpZXMubGVuZ3RoICsgKHRoaXMuY29uZmlnLnVzZV9wcm94aWVzX29ubHkgPyAwIDogMSksXG4gICAgICAgICAgTUFYX0FMTE9XRURfQlJPV1NFUlNcbiAgICAgICAgKTtcbiAgICAgICAgcHJveGllcyA9IF8uY2xvbmUodGhpcy5jb25maWcucHJveGllcyk7XG5cbiAgICAgICAgLy8gSW5zZXJ0IGEgZmlyc3QgY29uZmlnIHdpdGhvdXQgcHJveHkgaWYgdXNlX3Byb3h5X29ubHkgaXMgZmFsc2VcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnVzZV9wcm94aWVzX29ubHkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcHJveGllcy51bnNoaWZ0KG51bGwpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm51bUNsdXN0ZXJzID0gdGhpcy5jb25maWcucHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnLm1heENvbmN1cnJlbmN5O1xuICAgICAgICBwcm94aWVzID0gXy50aW1lcyh0aGlzLm51bUNsdXN0ZXJzLCBudWxsKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgVXNpbmcgJHt0aGlzLm51bUNsdXN0ZXJzfSBjbHVzdGVycy5gKTtcblxuICAgICAgLy8gR2l2ZSB0aGUgcGVyIGJyb3dzZXIgb3B0aW9uc1xuICAgICAgY29uc3QgcGVyQnJvd3Nlck9wdGlvbnMgPSBfLm1hcChwcm94aWVzLCAocHJveHkpID0+IHtcbiAgICAgICAgY29uc3QgdXNlckFnZW50ID0gdGhpcy5jb25maWcucmFuZG9tX3VzZXJfYWdlbnRcbiAgICAgICAgICA/IG5ldyBVc2VyQWdlbnQoeyBkZXZpY2VDYXRlZ29yeTogXCJkZXNrdG9wXCIgfSkudG9TdHJpbmcoKVxuICAgICAgICAgIDogdGhpcy5jb25maWcudXNlcl9hZ2VudDtcbiAgICAgICAgbGV0IGFyZ3MgPSBjaHJvbWVfZmxhZ3MuY29uY2F0KFtgLS11c2VyLWFnZW50PSR7dXNlckFnZW50fWBdKTtcblxuICAgICAgICBpZiAocHJveHkpIHtcbiAgICAgICAgICBhcmdzID0gYXJncy5jb25jYXQoW2AtLXByb3h5LXNlcnZlcj0ke3Byb3h5fWBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaGVhZGxlc3M6IHRoaXMuY29uZmlnLmhlYWRsZXNzLFxuICAgICAgICAgIGlnbm9yZUhUVFBTRXJyb3JzOiB0cnVlLFxuICAgICAgICAgIGFyZ3MsXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgZGVidWcoXCJwZXJCcm93c2VyT3B0aW9ucz0lT1wiLCBwZXJCcm93c2VyT3B0aW9ucyk7XG5cbiAgICAgIC8vIHB1cHBldGVlci51c2UoX1N0ZWFsdGhQbHVnaW4oKSk7XG4gICAgICAvLyBwdXBwZXRlZXIudXNlKF9BZGJsb2NrZXJQbHVnaW4oKSk7XG5cbiAgICAgIGNvbnN0IHB1cHBldGVlciA9IGFkZEV4dHJhKHZhbmlsbGFQdXBwZXRlZXIpO1xuXG4gICAgICAvLyBBZGQgc3RlYWx0aCBwbHVnaW4gYW5kIHVzZSBkZWZhdWx0cyAoYWxsIHRyaWNrcyB0byBoaWRlIHB1cHBldGVlciB1c2FnZSlcbiAgICAgIC8vICBwdXBwZXRlZXIudXNlKFN0ZWFsdGgoKSk7XG5cbiAgICAgIC8vIEFkZCBhZGJsb2NrZXIgcGx1Z2luIHRvIGJsb2NrIGFsbCBhZHMgYW5kIHRyYWNrZXJzIChzYXZlcyBiYW5kd2lkdGgpXG4gICAgICAvLyBwdXBwZXRlZXIudXNlKEFkYmxvY2tlclBsdWdpbih7IGJsb2NrVHJhY2tlcnM6IHRydWUgfSkpO1xuXG4gICAgICB0aGlzLmNsdXN0ZXIgPSBhd2FpdCBDbHVzdGVyLmxhdW5jaCh7XG4gICAgICAgIHB1cHBldGVlcixcbiAgICAgICAgbW9uaXRvcjogdGhpcy5jb25maWcucHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnLm1vbml0b3IsXG4gICAgICAgIHRpbWVvdXQ6IHRoaXMuY29uZmlnLnB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZy50aW1lb3V0LCAvLyBtYXggdGltZW91dCBzZXQgdG8gMzAgbWludXRlc1xuICAgICAgICBjb25jdXJyZW5jeTogQ3VzdG9tQ29uY3VycmVuY3lJbXBsLFxuICAgICAgICBtYXhDb25jdXJyZW5jeTogdGhpcy5udW1DbHVzdGVycyxcbiAgICAgICAgcHVwcGV0ZWVyT3B0aW9uczoge1xuICAgICAgICAgIC8vIHB1cHBldGVlcjpwdXBwZXRlZXIsXG4gICAgICAgICAgcGVyQnJvd3Nlck9wdGlvbnM6IHBlckJyb3dzZXJPcHRpb25zLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogbG9naW4gdGhlIHNvY2lsYSBtZWRpYSBwbGF0Zm9ybVxuICAgKi9cbiAgYXN5bmMgbG9naW4oc2NyYXBlX2NvbmZpZyA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgc2NyYXBlX2NvbmZpZyk7XG5cbiAgICAvLyB2YXIgcmVzdWx0cyA9IHt9O1xuICAgIC8vIHZhciBudW1fcmVxdWVzdHMgPSAwO1xuICAgIC8vIHZhciBtZXRhZGF0YSA9IHt9O1xuICAgIC8vIHZhciBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLnN0YXJ0X2Jyb3dzZXIpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29uZmlnLnBsYXRmb3JtKVxuICAgICAgdGhpcy5zY3JhcGVyID0gZ2V0U2NyYXBlcih0aGlzLmNvbmZpZy5wbGF0Zm9ybSwge1xuICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXG4gICAgICAgIHBsdWdnYWJsZTogdGhpcy5wbHVnZ2FibGUsXG4gICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgICAgdG1wcGF0aDogdGhpcy50bXBwYXRoLFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMuc2NyYXBlci5ydW5Mb2dpbih0aGlzLnBhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBFYWNoIGJyb3dzZXIgd2lsbCBnZXQgTi8oSysxKSBrZXl3b3JkcyBhbmQgd2lsbCBpc3N1ZSBOLyhLKzEpICogTSB0b3RhbCByZXF1ZXN0cyB0byB0aGUgc2VhcmNoIGVuZ2luZS5cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvcHVwcGV0ZWVyL2lzc3Vlcy82NzhcbiAgICAgIC8vIFRoZSBxdWVzdGlvbiBpczogSXMgaXQgcG9zc2libGUgdG8gc2V0IHByb3hpZXMgcGVyIFBhZ2U/IFBlciBCcm93c2VyP1xuICAgICAgLy8gYXMgZmFyIGFzIEkgY2FuIHNlZSwgcHVwcGV0ZWVyIGNsdXN0ZXIgdXNlcyB0aGUgc2FtZSBwdXBwZXRlZXJPcHRpb25zXG4gICAgICAvLyBmb3IgZXZlcnkgYnJvd3NlciBpbnN0YW5jZS4gV2Ugd2lsbCB1c2Ugb3VyIGN1c3RvbSBwdXBwZXRlZXItY2x1c3RlciB2ZXJzaW9uLlxuICAgICAgLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvcHJveHktY2hhaW5cbiAgICAgIC8vIHRoaXMgYW5zd2VyIGxvb2tzIG5pY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvcHVwcGV0ZWVyL2lzc3Vlcy82NzgjaXNzdWVjb21tZW50LTM4OTA5NjA3N1xuICAgICAgbGV0IGNodW5rcyA9IFtdO1xuICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB0aGlzLm51bUNsdXN0ZXJzOyBuKyspIHtcbiAgICAgICAgY2h1bmtzLnB1c2goW10pO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmNvbmZpZy5rZXl3b3Jkcy5sZW5ndGg7IGsrKykge1xuICAgICAgICBjaHVua3NbayAlIHRoaXMubnVtQ2x1c3RlcnNdLnB1c2godGhpcy5jb25maWcua2V5d29yZHNba10pO1xuICAgICAgfVxuXG4gICAgICBkZWJ1ZyhcImNodW5rcz0lb1wiLCBjaHVua3MpO1xuXG4gICAgICBsZXQgZXhlY1Byb21pc2VzID0gW107XG4gICAgICBmb3IgKHZhciBjID0gMDsgYyA8IGNodW5rcy5sZW5ndGg7IGMrKykge1xuICAgICAgICBjb25zdCBjb25maWcgPSBfLmNsb25lKHRoaXMuY29uZmlnKTtcbiAgICAgICAgY29uZmlnLmtleXdvcmRzID0gY2h1bmtzW2NdO1xuXG4gICAgICAgIHZhciBvYmogPSBnZXRTY3JhcGVyKHRoaXMuY29uZmlnLnBsYXRmb3JtLCB7XG4gICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgY29udGV4dDoge30sXG4gICAgICAgICAgcGx1Z2dhYmxlOiB0aGlzLnBsdWdnYWJsZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGJvdW5kTWV0aG9kID0gb2JqLnJ1bkxvZ2luLmJpbmQob2JqKTtcbiAgICAgICAgZXhlY1Byb21pc2VzLnB1c2godGhpcy5jbHVzdGVyLmV4ZWN1dGUoe30sIGJvdW5kTWV0aG9kKSk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGV4ZWNQcm9taXNlcyk7XG5cbiAgICAgIC8vIE1lcmdlIHJlc3VsdHMgYW5kIG1ldGFkYXRhIHBlciBrZXl3b3JkXG4gICAgICAvLyBmb3IgKGxldCBwcm9taXNlUmV0dXJuIG9mIHByb21pc2VSZXR1cm5zKSB7XG4gICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHRzLCBwcm9taXNlUmV0dXJuLnJlc3VsdHMpO1xuICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24obWV0YWRhdGEsIHByb21pc2VSZXR1cm4ubWV0YWRhdGEpO1xuICAgICAgLy8gICAgIG51bV9yZXF1ZXN0cyArPSBwcm9taXNlUmV0dXJuLm51bV9yZXF1ZXN0cztcbiAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvLyBsZXQgdGltZURlbHRhID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAvLyBsZXQgbXNfcGVyX3JlcXVlc3QgPSB0aW1lRGVsdGEvbnVtX3JlcXVlc3RzO1xuXG4gICAgLy8gdGhpcy5sb2dnZXIuaW5mbyhgU2NyYXBlciB0b29rICR7dGltZURlbHRhfW1zIHRvIHBlcmZvcm0gJHtudW1fcmVxdWVzdHN9IHJlcXVlc3RzLmApO1xuICAgIC8vIHRoaXMubG9nZ2VyLmluZm8oYE9uIGF2ZXJhZ2UgbXMvcmVxdWVzdDogJHttc19wZXJfcmVxdWVzdH1tcy9yZXF1ZXN0YCk7XG5cbiAgICAvLyBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX3Jlc3VsdHMpIHtcbiAgICAvLyAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX3Jlc3VsdHMocmVzdWx0cyk7XG4gICAgLy8gfVxuXG4gICAgLy8gbWV0YWRhdGEuZWxhcHNlZF90aW1lID0gdGltZURlbHRhLnRvU3RyaW5nKCk7XG4gICAgLy8gbWV0YWRhdGEubXNfcGVyX2tleXdvcmQgPSBtc19wZXJfcmVxdWVzdC50b1N0cmluZygpO1xuICAgIC8vIG1ldGFkYXRhLm51bV9yZXF1ZXN0cyA9IG51bV9yZXF1ZXN0cztcblxuICAgIC8vIGRlYnVnKCdtZXRhZGF0YT0lTycsIG1ldGFkYXRhKTtcblxuICAgIC8vIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfbWV0YWRhdGEpIHtcbiAgICAvLyAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX21ldGFkYXRhKG1ldGFkYXRhKTtcbiAgICAvLyB9XG5cbiAgICAvLyBpZiAodGhpcy5jb25maWcub3V0cHV0X2ZpbGUpIHtcbiAgICAvLyAgICAgdGhpcy5sb2dnZXIuaW5mbyhgV3JpdGluZyByZXN1bHRzIHRvICR7dGhpcy5jb25maWcub3V0cHV0X2ZpbGV9YCk7XG4gICAgLy8gICAgIHdyaXRlX3Jlc3VsdHModGhpcy5jb25maWcub3V0cHV0X2ZpbGUsIEpTT04uc3RyaW5naWZ5KHJlc3VsdHMsIG51bGwsIDQpKTtcbiAgICAvLyB9XG5cbiAgICAvLyByZXR1cm4ge1xuICAgIC8vICAgICByZXN1bHRzOiByZXN1bHRzLFxuICAgIC8vICAgICBtZXRhZGF0YTogbWV0YWRhdGEgfHwge30sXG4gICAgLy8gfTtcbiAgfVxuXG4gIC8qXG4gICAqIGdldCBkYXRhIHVybCBmcm9tIHBsYXRmb3JtXG4gICAqL1xuICBhc3luYyBzZWFyY2hkYXRhKHNjcmFwZV9jb25maWcgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIHNjcmFwZV9jb25maWcpO1xuXG4gICAgaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLnN0YXJ0X2Jyb3dzZXIpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29uZmlnLnBsYXRmb3JtKVxuICAgICAgdGhpcy5zY3JhcGVyID0gZ2V0U2NyYXBlcih0aGlzLmNvbmZpZy5wbGF0Zm9ybSwge1xuICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXG4gICAgICAgIHBsdWdnYWJsZTogdGhpcy5wbHVnZ2FibGUsXG4gICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgICAgdG1wcGF0aDogdGhpcy50bXBwYXRoLFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMuc2NyYXBlci53b3JrZXJzZWFyY2hkYXRhKHRoaXMucGFnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEVhY2ggYnJvd3NlciB3aWxsIGdldCBOLyhLKzEpIGtleXdvcmRzIGFuZCB3aWxsIGlzc3VlIE4vKEsrMSkgKiBNIHRvdGFsIHJlcXVlc3RzIHRvIHRoZSBzZWFyY2ggZW5naW5lLlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9wdXBwZXRlZXIvaXNzdWVzLzY3OFxuICAgICAgLy8gVGhlIHF1ZXN0aW9uIGlzOiBJcyBpdCBwb3NzaWJsZSB0byBzZXQgcHJveGllcyBwZXIgUGFnZT8gUGVyIEJyb3dzZXI/XG4gICAgICAvLyBhcyBmYXIgYXMgSSBjYW4gc2VlLCBwdXBwZXRlZXIgY2x1c3RlciB1c2VzIHRoZSBzYW1lIHB1cHBldGVlck9wdGlvbnNcbiAgICAgIC8vIGZvciBldmVyeSBicm93c2VyIGluc3RhbmNlLiBXZSB3aWxsIHVzZSBvdXIgY3VzdG9tIHB1cHBldGVlci1jbHVzdGVyIHZlcnNpb24uXG4gICAgICAvLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9wcm94eS1jaGFpblxuICAgICAgLy8gdGhpcyBhbnN3ZXIgbG9va3MgbmljZTogaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZS9wdXBwZXRlZXIvaXNzdWVzLzY3OCNpc3N1ZWNvbW1lbnQtMzg5MDk2MDc3XG4gICAgICBsZXQgY2h1bmtzID0gW107XG4gICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHRoaXMubnVtQ2x1c3RlcnM7IG4rKykge1xuICAgICAgICBjaHVua3MucHVzaChbXSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMuY29uZmlnLmtleXdvcmRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGNodW5rc1trICUgdGhpcy5udW1DbHVzdGVyc10ucHVzaCh0aGlzLmNvbmZpZy5rZXl3b3Jkc1trXSk7XG4gICAgICB9XG5cbiAgICAgIGRlYnVnKFwiY2h1bmtzPSVvXCIsIGNodW5rcyk7XG5cbiAgICAgIGxldCBleGVjUHJvbWlzZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgY2h1bmtzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IF8uY2xvbmUodGhpcy5jb25maWcpO1xuICAgICAgICBjb25maWcua2V5d29yZHMgPSBjaHVua3NbY107XG5cbiAgICAgICAgdmFyIG9iaiA9IGdldFNjcmFwZXIodGhpcy5jb25maWcucGxhdGZvcm0sIHtcbiAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgICBjb250ZXh0OiB7fSxcbiAgICAgICAgICBwbHVnZ2FibGU6IHRoaXMucGx1Z2dhYmxlLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgYm91bmRNZXRob2QgPSBvYmoud29ya2Vyc2VhcmNoZGF0YS5iaW5kKG9iaik7XG4gICAgICAgIGV4ZWNQcm9taXNlcy5wdXNoKHRoaXMuY2x1c3Rlci5leGVjdXRlKHt9LCBib3VuZE1ldGhvZCkpO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChleGVjUHJvbWlzZXMpO1xuXG4gICAgICAvLyBNZXJnZSByZXN1bHRzIGFuZCBtZXRhZGF0YSBwZXIga2V5d29yZFxuICAgICAgLy8gZm9yIChsZXQgcHJvbWlzZVJldHVybiBvZiBwcm9taXNlUmV0dXJucykge1xuICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0cywgcHJvbWlzZVJldHVybi5yZXN1bHRzKTtcbiAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKG1ldGFkYXRhLCBwcm9taXNlUmV0dXJuLm1ldGFkYXRhKTtcbiAgICAgIC8vICAgICBudW1fcmVxdWVzdHMgKz0gcHJvbWlzZVJldHVybi5udW1fcmVxdWVzdHM7XG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgLy8gbGV0IHRpbWVEZWx0YSA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XG4gICAgLy8gbGV0IG1zX3Blcl9yZXF1ZXN0ID0gdGltZURlbHRhL251bV9yZXF1ZXN0cztcblxuICAgIC8vIHRoaXMubG9nZ2VyLmluZm8oYFNjcmFwZXIgdG9vayAke3RpbWVEZWx0YX1tcyB0byBwZXJmb3JtICR7bnVtX3JlcXVlc3RzfSByZXF1ZXN0cy5gKTtcbiAgICAvLyB0aGlzLmxvZ2dlci5pbmZvKGBPbiBhdmVyYWdlIG1zL3JlcXVlc3Q6ICR7bXNfcGVyX3JlcXVlc3R9bXMvcmVxdWVzdGApO1xuXG4gICAgLy8gaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9yZXN1bHRzKSB7XG4gICAgLy8gICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9yZXN1bHRzKHJlc3VsdHMpO1xuICAgIC8vIH1cblxuICAgIC8vIG1ldGFkYXRhLmVsYXBzZWRfdGltZSA9IHRpbWVEZWx0YS50b1N0cmluZygpO1xuICAgIC8vIG1ldGFkYXRhLm1zX3Blcl9rZXl3b3JkID0gbXNfcGVyX3JlcXVlc3QudG9TdHJpbmcoKTtcbiAgICAvLyBtZXRhZGF0YS5udW1fcmVxdWVzdHMgPSBudW1fcmVxdWVzdHM7XG5cbiAgICAvLyBkZWJ1ZygnbWV0YWRhdGE9JU8nLCBtZXRhZGF0YSk7XG5cbiAgICAvLyBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX21ldGFkYXRhKSB7XG4gICAgLy8gICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9tZXRhZGF0YShtZXRhZGF0YSk7XG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKHRoaXMuY29uZmlnLm91dHB1dF9maWxlKSB7XG4gICAgLy8gICAgIHRoaXMubG9nZ2VyLmluZm8oYFdyaXRpbmcgcmVzdWx0cyB0byAke3RoaXMuY29uZmlnLm91dHB1dF9maWxlfWApO1xuICAgIC8vICAgICB3cml0ZV9yZXN1bHRzKHRoaXMuY29uZmlnLm91dHB1dF9maWxlLCBKU09OLnN0cmluZ2lmeShyZXN1bHRzLCBudWxsLCA0KSk7XG4gICAgLy8gfVxuXG4gICAgLy8gcmV0dXJuIHtcbiAgICAvLyAgICAgcmVzdWx0czogcmVzdWx0cyxcbiAgICAvLyAgICAgbWV0YWRhdGE6IG1ldGFkYXRhIHx8IHt9LFxuICAgIC8vIH07XG4gIH1cblxuICAvKlxuICAgKiBRdWl0IHRoZSBwdXBwZXRlZXIgY2x1c3Rlci9icm93c2VyLlxuICAgKi9cbiAgYXN5bmMgcXVpdCgpIHtcbiAgICBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuY2xvc2VfYnJvd3Nlcikge1xuICAgICAgYXdhaXQgdGhpcy5wbHVnZ2FibGUuY2xvc2VfYnJvd3NlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCB0aGlzLmNsdXN0ZXIuaWRsZSgpO1xuICAgICAgYXdhaXQgdGhpcy5jbHVzdGVyLmNsb3NlKCk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTY3JhcGVNYW5hZ2VyOiBTY3JhcGVNYW5hZ2VyLFxufTtcbiIsImV4cG9ydCB7IH07XG5jb25zdCBheGlvcyA9IHJlcXVpcmUoXCJheGlvc1wiKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnUmVtb3RlU291cmNlOlJlbW90ZVNvdXJjZScpO1xuY29uc3QgRm9ybURhdGEgPSByZXF1aXJlKCdmb3JtLWRhdGEnKTtcbnR5cGUgc29zZXR0aW5nID0ge1xuICBzb3R5cGU6IHN0cmluZztcbiAgc29jaWFsdXNlcjogc3RyaW5nO1xuICBzb2NpYWxwYXNzOiBzdHJpbmc7XG4gIHByb3h5OiB7XG4gICAgcHJveHk6IHN0cmluZztcbiAgICB1c2VyOiBzdHJpbmc7XG4gICAgcGFzczogc3RyaW5nO1xuICB9LFxufVxuZXhwb3J0IHR5cGUgTGlua2RhdGEgPSB7XG4gIHRpdGxlOiBzdHJpbmcsXG4gIHVybDogc3RyaW5nLFxuICBjb250ZW50Pzogc3RyaW5nLFxuICBsYW5nOiBzdHJpbmcsXG4gIHNvY2lhbHRhc2tfaWQ6IG51bWJlcixcbn1cbnR5cGUgc29jaWFsVGFzayA9IHtcbiAgaWQ6IG51bWJlcixcbiAgY2FtcGFpZ25faWQ6IG51bWJlcixcbiAgY2FtcGFpZ25fbmFtZTogc3RyaW5nLFxuICB0YWc6IHN0cmluZyxcbiAgdHlwZTogc3RyaW5nLFxuICBrZXl3b3JkczogQXJyYXk8c3RyaW5nPixcbn1cbnR5cGUgY29uZmlnVHlwZSA9IHtcbiAgUkVNT1RFQUREOiBzdHJpbmcsXG4gIFJFTU9URVVTRVJOQU1FOiBzdHJpbmcsXG4gIFJFTU9URVBBU1NXT1JEOiBzdHJpbmcsXG59XG5leHBvcnQgY2xhc3MgUmVtb3RlU291cmNlIHtcbiAgUkVNT1RFQUREOiBzdHJpbmc7XG4gIFJFTU9URVVTRVJOQU1FOiBzdHJpbmc7XG4gIFJFTU9URVBBU1NXT1JEOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMucmVhZGVudigpO1xuICAgIHRoaXMuUkVNT1RFQUREID0gY29uZmlnLlJFTU9URUFERDtcbiAgICB0aGlzLlJFTU9URVVTRVJOQU1FID0gY29uZmlnLlJFTU9URVVTRVJOQU1FO1xuICAgIHRoaXMuUkVNT1RFUEFTU1dPUkQgPSBjb25maWcuUkVNT1RFUEFTU1dPUkQ7XG4gIH1cblxuXG4gIHJlYWRlbnYoKTogY29uZmlnVHlwZSB7XG4gICAgLy9yZWFkIGNvbmZpZyBmcm9tIC5lbnYgZmlsZVxuICAgIGxldCBlbnZjb2ZpZyA9IHRoaXMucmVhZENvbmZpZygpO1xuICAgIGRlYnVnKGVudmNvZmlnKVxuICAgIC8vY2hlY2sga2V5IGV4aXN0IGluIG9iamVjdFxuICAgIGlmICghZW52Y29maWcuaGFzT3duUHJvcGVydHkoXCJSRU1PVEVBRERcIikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUkVNT1RFQUREIG5vdCBmb3VuZCBpbiAuZW52IGZpbGVgKTtcbiAgICB9XG4gICAgaWYgKCFlbnZjb2ZpZy5oYXNPd25Qcm9wZXJ0eShcIlJFTU9URVVTRVJOQU1FXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVTRVJOQU1FIG5vdCBmb3VuZCBpbiAuZW52IGZpbGVgKTtcbiAgICB9XG4gICAgaWYgKCFlbnZjb2ZpZy5oYXNPd25Qcm9wZXJ0eShcIlJFTU9URVBBU1NXT1JEXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBBU1NXT1JEIG5vdCBmb3VuZCBpbiAuZW52IGZpbGVgKTtcbiAgICB9XG4gICAgcmV0dXJuIGVudmNvZmlnIGFzIGNvbmZpZ1R5cGU7XG4gIH1cblxuICAvKipcbiAgICogcmVhZCBjb25maWcgZnJvbSAuZW52IEZpbGVcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gY29uZmlnXG4gICAqICovXG4gIHJlYWRDb25maWcoKTogb2JqZWN0IHtcbiAgICBjb25zdCByZXN1bHQgPSByZXF1aXJlKFwiZG90ZW52XCIpLmNvbmZpZygpO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgIHRocm93IHJlc3VsdC5lcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5wYXJzZWQ7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHJlc3BvbnNlIGZyb20gcmVtb3RlIHNlcnZpdmVcbiAgICogQHJldHVybiBvYmplY3RcbiAgICovXG4gIGFzeW5jIGdldFJlbW90ZUNvbmZpZyhjYW1wYWlnbklkKTogUHJvbWlzZTxzb3NldHRpbmc+IHtcbiAgICAvLyBsZXQgZW52Y29uZmlnID0gYXdhaXQgcmVhZGVudigpO1xuXG4gICAgbGV0IHNvc2V0dmFyID0gYXdhaXQgYXhpb3NcbiAgICAgIC5nZXQodGhpcy5SRU1PVEVBREQgKyBcIi9hcGkvZ2V0c29ieUNhbS8/Y2FtcGFpZ25faWQ9XCIgKyBjYW1wYWlnbklkLCB7XG4gICAgICAgIGF1dGg6IHtcbiAgICAgICAgICB1c2VybmFtZTogdGhpcy5SRU1PVEVVU0VSTkFNRSxcbiAgICAgICAgICBwYXNzd29yZDogdGhpcy5SRU1PVEVQQVNTV09SRCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChwYXJzZUludChyZXMuc3RhdHVzKSAhPSAyMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb2RlIG5vdCBlcXVhbCAyMDBcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXMuZGF0YS5zdGF0dXMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb2RlIG5vdCBlcXVhbCAyMDBcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLnN0YXR1cylcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmRhdGEuZGF0YS51c2VyKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhLnBhc3MpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEucHJveHkpXG4gICAgICAgIGNvbnN0IHNvc2V0dGluZyA9IHtcbiAgICAgICAgICBzb3R5cGU6IHJlcy5kYXRhLmRhdGEuc290eXBlLFxuICAgICAgICAgIHNvY2lhbHVzZXI6IHJlcy5kYXRhLmRhdGEudXNlcixcbiAgICAgICAgICBzb2NpYWxwYXNzOiByZXMuZGF0YS5kYXRhLnBhc3MsXG4gICAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAgIHByb3h5OiByZXMuZGF0YS5kYXRhLnByb3h5LnVybCxcbiAgICAgICAgICAgIHVzZXI6IHJlcy5kYXRhLmRhdGEucHJveHkudXNlcixcbiAgICAgICAgICAgIHBhc3M6IHJlcy5kYXRhLmRhdGEucHJveHkucGFzcyxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc29zZXR0aW5nO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBzb3NldHZhcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgY2FtcGFpZ24gZnJvbSByZW1vdGUgc2Vydml2ZVxuICAgKi9cbiAgYXN5bmMgZ2V0Q2FtcGFpZ25saXN0KCk6IFByb21pc2U8QXJyYXk8c29jaWFsVGFzaz4+IHtcbiAgICBjb25zdCBjYW1waWdubGlzdCA9IGF3YWl0IGF4aW9zXG4gICAgICAuZ2V0KHRoaXMuUkVNT1RFQUREICsgXCIvYXBpL2xpc3Rzb3Rhc2tcIiwge1xuICAgICAgICBhdXRoOiB7XG4gICAgICAgICAgdXNlcm5hbWU6IHRoaXMuUkVNT1RFVVNFUk5BTUUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMuUkVNT1RFUEFTU1dPUkQsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocGFyc2VJbnQocmVzLnN0YXR1cykgIT0gMjAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29kZSBub3QgZXF1YWwgMjAwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzLmRhdGEuZGF0YSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRhdGEgbm90IGV4aXN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXMuZGF0YS5kYXRhIGFzIEFycmF5PHNvY2lhbFRhc2s+O1xuXG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb2RlIG5vdCBlcXVhbCAyMDBcIik7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIGNhbXBpZ25saXN0O1xuICB9XG4gIC8qKlxuICAgKiBzYXZlIGxpbmsgdG8gcmVtb3RlIHNlcnZpdmVcbiAgICovXG4gIGFzeW5jIHNhdmVMaW5rcmVtb3RlKGxpbms6IExpbmtkYXRhKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCBGb3JtRGF0YSA9IHJlcXVpcmUoJ2Zvcm0tZGF0YScpO1xuICAgIGRlYnVnKGxpbmspXG4gICAgbGV0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBkYXRhLmFwcGVuZCgndGl0bGUnLCBsaW5rLnRpdGxlKTtcbiAgICBpZihsaW5rLmNvbnRlbnQpe1xuICAgIGRhdGEuYXBwZW5kKCdjb250ZW50JywgbGluay5jb250ZW50KTtcbiAgICB9XG4gICAgZGF0YS5hcHBlbmQoJ3VybCcsIGxpbmsudXJsKTtcbiAgICBkYXRhLmFwcGVuZCgnbGFuZycsIGxpbmsubGFuZyk7XG4gICAgaWYobGluay5zb2NpYWx0YXNrX2lkKXtcbiAgICBkYXRhLmFwcGVuZCgnc29jaWFsdGFza19pZCcsIGxpbmsuc29jaWFsdGFza19pZCk7XG4gICAgfVxuICAgIGNvbnN0IGxpbmtJZD1hd2FpdCBheGlvcy5wb3N0KHRoaXMuUkVNT1RFQUREICsgXCIvYXBpL3NhdmVzb2xpbmtcIiwgZGF0YSxcbiAgICB7XG4gICAgICBhdXRoOiB7XG4gICAgICAgIHVzZXJuYW1lOiB0aGlzLlJFTU9URVVTRVJOQU1FLFxuICAgICAgICBwYXNzd29yZDogdGhpcy5SRU1PVEVQQVNTV09SRCxcbiAgICAgIH0sXG4gICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgLy8gZGVidWcocmVzKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzKVxuICAgICAgICByZXR1cm4gcmVzLmRhdGEuZGF0YSBhcyBudW1iZXI7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGxpbmtJZDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgUmVtb3RlU291cmNlOiBSZW1vdGVTb3VyY2UsXG5cbn07XG4iLCJjb25zdCB7IEJyb3dzZXIgfSA9IHJlcXVpcmUoJ3B1cHBldGVlci1jbHVzdGVyL2Rpc3QvY29uY3VycmVuY3kvYnVpbHRJbkNvbmN1cnJlbmN5Jyk7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NlLXNjcmFwZXI6Q3VzdG9tQ29uY3VycmVuY3knKTtcbmNvbnN0IHsgdGltZW91dEV4ZWN1dGUgfSA9IHJlcXVpcmUoJ3B1cHBldGVlci1jbHVzdGVyL2Rpc3QvdXRpbCcpO1xuXG5jb25zdCBCUk9XU0VSX1RJTUVPVVQgPSA1MDAwO1xuXG5jbGFzcyBDdXN0b21Db25jdXJyZW5jeSBleHRlbmRzIEJyb3dzZXIge1xuXG4gICAgYXN5bmMgaW5pdCgpIHt9XG4gICAgYXN5bmMgY2xvc2UoKSB7fVxuXG4gICAgYXN5bmMgd29ya2VySW5zdGFuY2UoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMucGVyQnJvd3Nlck9wdGlvbnMuc2hpZnQoKTtcbiAgICAgICAgZGVidWcoJ0xhdW5jaCBwdXBwZXRlZXIgaW5zdGFuY2Ugd2l0aCBvcHRpb25zPSVvJywgb3B0aW9ucyk7XG4gICAgICAgIGxldCBjaHJvbWUgPSBhd2FpdCB0aGlzLnB1cHBldGVlci5sYXVuY2gob3B0aW9ucyk7XG4gICAgICAgIGxldCBwYWdlO1xuICAgICAgICBsZXQgY29udGV4dDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgam9iSW5zdGFuY2U6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aW1lb3V0RXhlY3V0ZShCUk9XU0VSX1RJTUVPVVQsIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBhd2FpdCBjaHJvbWUuY3JlYXRlSW5jb2duaXRvQnJvd3NlckNvbnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgcGFnZSA9IGF3YWl0IGNvbnRleHQubmV3UGFnZSgpO1xuICAgICAgICAgICAgICAgIH0pKCkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aW1lb3V0RXhlY3V0ZShCUk9XU0VSX1RJTUVPVVQsIGNvbnRleHQuY2xvc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNsb3NlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgY2hyb21lLmNsb3NlKCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZXBhaXI6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBkZWJ1ZygnU3RhcnRpbmcgcmVwYWlyJyk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2lsbCBwcm9iYWJseSBmYWlsLCBidXQganVzdCBpbiBjYXNlIHRoZSByZXBhaXIgd2FzIG5vdCBuZWNlc3NhcnlcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY2hyb21lLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICAgICAgICAgIC8vIGp1c3QgcmVsYXVuY2ggYXMgdGhlcmUgaXMgb25seSBvbmUgcGFnZSBwZXIgYnJvd3NlclxuICAgICAgICAgICAgICAgIGNocm9tZSA9IGF3YWl0IHRoaXMucHVwcGV0ZWVyLmxhdW5jaChvcHRpb25zKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDdXN0b21Db25jdXJyZW5jeTsiLCJjb25zdCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcbmNvbnN0IGNyeXB0byA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5jb25zdCBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG5jb25zdCBodHRwcyA9IHJlcXVpcmUoXCJodHRwc1wiKTtcbmNvbnN0IHByb2dyZXNzID0gcmVxdWlyZShcInByb2dyZXNzLXN0cmVhbVwiKTtcblxuY2xhc3MgVGFzayB7XG5cdGNvbnN0cnVjdG9yKHVybCkge1xuXHRcdHRoaXMudXJsID0gdXJsO1xuXHRcdHRoaXMuZmluaXNoZWQgPSBmYWxzZTtcblx0fVxufVxuXG5jbGFzcyBEb3dubG9hZGVyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy50eXBlID0gXCJcIjtcblx0XHR0aGlzLmlkID0gXCJcIjtcblx0XHR0aGlzLnVybCA9IFwiXCI7XG5cdFx0dGhpcy5haWQgPSAtMTtcblx0XHR0aGlzLnBpZCA9IDE7XG5cdFx0dGhpcy5jaWQgPSAtMTtcblx0XHR0aGlzLm5hbWUgPSBcIlwiO1xuXHRcdHRoaXMubGlua3MgPSBbXTtcblx0XHR0aGlzLnRhc2tzID0gW107XG5cdH1cblxuXHRnZXRWaWRlb1VybCh2aWRlb1VybCkge1xuXHRcdHRoaXMudXJsID0gXCJcIjtcblx0XHRjb25zdCBtYXBwaW5nID0ge1xuXHRcdFx0XCJCVlwiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS92aWRlby9cIixcblx0XHRcdFwiYnZcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vdmlkZW8vXCIsXG5cdFx0XHRcImF2XCI6IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL3ZpZGVvL1wiLFxuXHRcdFx0XCJlcFwiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS9iYW5ndW1pL3BsYXkvXCIsXG5cdFx0XHRcInNzXCI6IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL2Jhbmd1bWkvcGxheS9cIlxuXHRcdH07XG5cdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMobWFwcGluZykpIHtcblx0XHRcdGlmICh2aWRlb1VybC5pbmNsdWRlcyhrZXkpKSB7XG5cdFx0XHRcdHRoaXMudHlwZSA9IGtleTtcblx0XHRcdFx0dGhpcy5pZCA9IGtleSArIHZpZGVvVXJsLnNwbGl0KGtleSlbMV07XG5cdFx0XHRcdHRoaXMudXJsID0gdmFsdWUgKyB0aGlzLmlkO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhc3luYyBnZXRBaWQoKSB7XG5cdFx0Y29uc3QgeyB0eXBlLCB1cmwgfSA9IHRoaXM7XG5cdFx0aWYgKCF1cmwpIHJldHVybjtcblx0XHRyZXR1cm4gZmV0Y2godXJsKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxuXHRcdFx0LnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdFx0bGV0IGRhdGEgPSByZXN1bHQubWF0Y2goL19fSU5JVElBTF9TVEFURV9fPSguKj8pO1xcKGZ1bmN0aW9uXFwoXFwpLylbMV07XG5cdFx0XHRcdGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIklOSVRJQUwgU1RBVEVcIiwgZGF0YSk7XG5cdFx0XHRcdGlmICh0eXBlID09PSBcIkJWXCIgfHwgdHlwZSA9PT0gXCJidlwiIHx8IHR5cGUgPT09IFwiYXZcIikge1xuXHRcdFx0XHRcdHRoaXMuYWlkID0gZGF0YS52aWRlb0RhdGEuYWlkO1xuXHRcdFx0XHRcdHRoaXMucGlkID0gcGFyc2VJbnQodXJsLnNwbGl0KFwicD1cIilbMV0sIDEwKSB8fCAxO1xuXHRcdFx0XHRcdHRoaXMuY2lkID0gZGF0YS52aWRlb0RhdGEucGFnZXNbdGhpcy5waWQgLSAxXS5jaWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAodHlwZSA9PT0gXCJlcFwiKSB7XG5cdFx0XHRcdFx0dGhpcy5haWQgPSBkYXRhLmVwSW5mby5haWQ7XG5cdFx0XHRcdFx0dGhpcy5jaWQgPSBkYXRhLmVwSW5mby5jaWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAodHlwZSA9PT0gXCJzc1wiKSB7XG5cdFx0XHRcdFx0dGhpcy5haWQgPSBkYXRhLmVwTGlzdFswXS5haWQ7XG5cdFx0XHRcdFx0dGhpcy5jaWQgPSBkYXRhLmVwTGlzdFswXS5jaWQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZXJyb3IgPT4gc2hvd0Vycm9yKFwi6I635Y+W6KeG6aKRIGFpZCDlh7rplJnvvIFcIikpO1xuXHR9XG5cblx0YXN5bmMgZ2V0SW5mbygpIHtcblx0XHRjb25zdCB7IGFpZCwgY2lkIH0gPSB0aGlzO1xuXHRcdGlmICghY2lkKSB7XG5cdFx0XHRzaG93RXJyb3IoXCLojrflj5bop4bpopEgY2lkIOWHuumUme+8gVwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Ly8gZ2V0RGFubWFrdSgpOyAvL+iOt+WPlmNpZOWQju+8jOiOt+WPluS4i+i9vemTvuaOpeWSjOW8ueW5leS/oeaBr1xuXHRcdHJldHVybiBmZXRjaChcImh0dHBzOi8vYXBpLmJpbGliaWxpLmNvbS94L3dlYi1pbnRlcmZhY2Uvdmlldz9haWQ9XCIgKyBhaWQpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG5cdFx0XHQuY2F0Y2goZXJyb3IgPT4gc2hvd0Vycm9yKFwi6I635Y+W6KeG6aKR5L+h5oGv5Ye66ZSZ77yBXCIpKTtcblx0fVxuXG5cdGFzeW5jIGdldERhdGEoZmFsbGJhY2spIHtcblx0XHRjb25zdCB7IGNpZCwgdHlwZSB9ID0gdGhpcztcblx0XHRsZXQgcGxheVVybDtcblx0XHRpZiAoZmFsbGJhY2spIHtcblx0XHRcdGNvbnN0IHBhcmFtcyA9IGBjaWQ9JHtjaWR9Jm1vZHVsZT1tb3ZpZSZwbGF5ZXI9MSZxdWFsaXR5PTExMiZ0cz0xYDtcblx0XHRcdGNvbnN0IHNpZ24gPSBjcnlwdG8uY3JlYXRlSGFzaChcIm1kNVwiKS51cGRhdGUocGFyYW1zICsgXCI5YjI4ODE0N2U1NDc0ZGQyYWE2NzA4NWY3MTZjNTYwZFwiKS5kaWdlc3QoXCJoZXhcIik7XG5cdFx0XHRwbGF5VXJsID0gYGh0dHBzOi8vYmFuZ3VtaS5iaWxpYmlsaS5jb20vcGxheWVyL3dlYl9hcGkvcGxheXVybD8ke3BhcmFtc30mc2lnbj0ke3NpZ259YDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHR5cGUgPT09IFwiQlZcIiB8fCB0eXBlID09PSBcImJ2XCIgfHwgdHlwZSA9PT0gXCJhdlwiKSB7XG5cdFx0XHRcdGNvbnN0IHBhcmFtcyA9IGBhcHBrZXk9aVZHVVRqc3h2cExldURDZiZjaWQ9JHtjaWR9Jm90eXBlPWpzb24mcW49MTEyJnF1YWxpdHk9MTEyJnR5cGU9YDtcblx0XHRcdFx0Y29uc3Qgc2lnbiA9IGNyeXB0by5jcmVhdGVIYXNoKFwibWQ1XCIpLnVwZGF0ZShwYXJhbXMgKyBcImFIUm1oV01Ma2RlTXVJTHFPUm5ZWm9jd01CcE1FT2R0XCIpLmRpZ2VzdChcImhleFwiKTtcblx0XHRcdFx0cGxheVVybCA9IGBodHRwczovL2ludGVyZmFjZS5iaWxpYmlsaS5jb20vdjIvcGxheXVybD8ke3BhcmFtc30mc2lnbj0ke3NpZ259YDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHBsYXlVcmwgPSBgaHR0cHM6Ly9hcGkuYmlsaWJpbGkuY29tL3BnYy9wbGF5ZXIvd2ViL3BsYXl1cmw/cW49ODAmY2lkPSR7Y2lkfWA7XG5cdFx0XHRcdFxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmV0Y2gocGxheVVybClcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcblx0XHRcdC50aGVuKHJlc3VsdCA9PiB7XG5cdFx0XHRcdGNvbnN0IGRhdGEgPSBmYWxsYmFjayA/IHRoaXMucGFyc2VEYXRhKHJlc3VsdCkgOiBKU09OLnBhcnNlKHJlc3VsdCk7XG5cdFx0XHRcdGNvbnN0IHRhcmdldCA9IGRhdGEuZHVybCB8fCBkYXRhLnJlc3VsdC5kdXJsO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlBMQVkgVVJMXCIsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rcyA9IHRhcmdldC5tYXAocGFydCA9PiBwYXJ0LnVybCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjaywgZGF0YVxuICAgICAgICAgICAgICAgICAgICB9O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmIChmYWxsYmFjaykgdGhyb3cgRXJyb3IoKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0c2hvd0Vycm9yKFwi6I635Y+WIFBsYXlVcmwg5oiW5LiL6L296ZO+5o6l5Ye66ZSZ77yB55Sx5LqOQuermemZkOWItu+8jOWPquiDveS4i+i9veS9jua4heaZsOW6puinhumikeOAglwiKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0cGFyc2VEYXRhKHRhcmdldCkge1xuXHRcdGNvbnN0IGRhdGEgPSAkKHRhcmdldCk7XG5cdFx0Y29uc3QgcmVzdWx0ID0ge307XG5cdFx0cmVzdWx0LmR1cmwgPSBbXTtcblx0XHRyZXN1bHQucXVhbGl0eSA9IGRhdGEuZmluZChcInF1YWxpdHlcIikudGV4dCgpO1xuXHRcdGRhdGEuZmluZChcImR1cmxcIikuZWFjaCgoaSwgbykgPT4ge1xuXHRcdFx0Y29uc3QgcGFydCA9ICQobyk7XG5cdFx0XHRyZXN1bHQuZHVybC5wdXNoKHtcblx0XHRcdFx0dXJsOiBwYXJ0LmZpbmQoXCJ1cmxcIikudGV4dCgpLFxuXHRcdFx0XHRvcmRlcjogcGFydC5maW5kKFwib3JkZXJcIikudGV4dCgpLFxuXHRcdFx0XHRsZW5ndGg6IHBhcnQuZmluZChcImxlbmd0aFwiKS50ZXh0KCksXG5cdFx0XHRcdHNpemU6IHBhcnQuZmluZChcInNpemVcIikudGV4dCgpXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZG93bmxvYWRCeUluZGV4KHBhcnQsIGZpbGUsIGNhbGxiYWNrID0gKCkgPT4ge30pIHtcblx0XHRjb25zdCB7IHVybCB9ID0gdGhpcztcblxuXHRcdGlmICh0aGlzLnRhc2tzLnNvbWUoaXRlbSA9PiBpdGVtLnVybCA9PT0gdGhpcy5saW5rc1twYXJ0XSkpIHJldHVybiBcIkRVUExJQ0FURVwiO1xuXHRcdHRoaXMudGFza3MucHVzaChuZXcgVGFzayh0aGlzLmxpbmtzW3BhcnRdKSk7XG5cdFx0bGV0IHN0YXRlO1xuXHRcdHRyeSB7XG5cdFx0XHRzdGF0ZSA9IGZzLnN0YXRTeW5jKGZpbGUpO1xuXHRcdH1cblx0XHRjYXRjaCAoZXJyb3IpIHtcblx0XHR9XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdHVybDogdGhpcy5saW5rc1twYXJ0XSxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XCJSYW5nZVwiOiBgYnl0ZXM9JHtzdGF0ZSA/IHN0YXRlLnNpemUgOiAwfS1gLCAvL+aWreeCuee7reS8oFxuXHRcdFx0XHRcIlVzZXItQWdlbnRcIjogXCJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xNV83KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTAuMC40NDMwLjIxMiBTYWZhcmkvNTM3LjM2XCIsXG5cdFx0XHRcdFwiUmVmZXJlclwiOiB1cmxcblx0XHRcdH1cblx0XHR9O1xuXHRcdGNvbnN0IHN0cmVhbSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGZpbGUsIHN0YXRlID8geyBmbGFnczogXCJhXCIgfSA6IHt9KTtcblx0XHR0aGlzLmRvd25sb2FkKG9wdGlvbnMsIHN0cmVhbSwgY2FsbGJhY2spO1xuXG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0ZG93bmxvYWQob3B0aW9ucywgc3RyZWFtLCBjYWxsYmFjaykge1xuXHRcdC8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3Byb2dyZXNzLXN0cmVhbVxuXHRcdGNvbnN0IGluZGV4ID0gdGhpcy50YXNrcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLnVybCA9PT0gb3B0aW9ucy51cmwpO1xuXHRcdGNvbnN0IHByb1N0cmVhbSA9IHByb2dyZXNzKHtcblx0XHRcdHRpbWU6IDI1MCAvL+WNleS9jW1zXG5cdFx0fSkub24oXCJwcm9ncmVzc1wiLCBwcm9ncmVzcyA9PiB7XG5cdFx0XHRjb25zdCB7IHBlcmNlbnRhZ2UgfSA9IHByb2dyZXNzOyAvL+aYvuekuui/m+W6puadoVxuXHRcdFx0aWYgKHBlcmNlbnRhZ2UgPT09IDEwMCkge1xuXHRcdFx0XHR0aGlzLnRhc2tzW2luZGV4XS5maW5pc2hlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRjYWxsYmFjayhwcm9ncmVzcywgaW5kZXgpO1xuXHRcdH0pO1xuXG5cdFx0bGV0IHsgdXJsIH0gPSBvcHRpb25zO1xuXHRcdGZ1bmN0aW9uIGRvd25sb2FkTGluayh1cmwpIHtcblx0XHRcdCh1cmwuc3RhcnRzV2l0aChcImh0dHBzXCIpID8gaHR0cHMgOiBodHRwKS5nZXQodXJsLCBvcHRpb25zLCByZXMgPT4ge1xuXHRcdFx0XHRpZiAocmVzLnN0YXR1c0NvZGUgPT09IDMwMikge1xuXHRcdFx0XHRcdHVybCA9IHJlcy5oZWFkZXJzLmxvY2F0aW9uO1xuXHRcdFx0XHRcdHJldHVybiBkb3dubG9hZExpbmsodXJsKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRwcm9TdHJlYW0uc2V0TGVuZ3RoKHJlcy5oZWFkZXJzW1wiY29udGVudC1sZW5ndGhcIl0pO1xuXHRcdFx0XHQvL+WFiHBpcGXliLBwcm9TdHJlYW3lho1waXBl5Yiw5paH5Lu255qE5YaZ5YWl5rWB5LitXG5cdFx0XHRcdHJlcy5waXBlKHByb1N0cmVhbSkucGlwZShzdHJlYW0pLm9uKFwiZXJyb3JcIiwgZXJyb3IgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRkb3dubG9hZExpbmsodXJsKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgVGFzaywgRG93bmxvYWRlciB9O1xuIiwiLy9zY3JvbGwgZG93biB0byB0aGUgYm90dG9tIG9mIHRoZSBwYWdlXG5hc3luYyBmdW5jdGlvbiBhdXRvU2Nyb2xsKHBhZ2Upe1xuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGUoYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIHRvdGFsSGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IDEwMDtcbiAgICAgICAgICAgIHZhciB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIGRpc3RhbmNlKTtcbiAgICAgICAgICAgICAgICB0b3RhbEhlaWdodCArPSBkaXN0YW5jZTtcblxuICAgICAgICAgICAgICAgIGlmKHRvdGFsSGVpZ2h0ID49IHNjcm9sbEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBkZWxheSh0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHsgXG4gICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSlcbiAgICB9KTtcbiB9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF1dG9TY3JvbGw6YXV0b1Njcm9sbCxcbiAgICBkZWxheTpkZWxheVxufSIsImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUNvbnRleHQocmVxKSB7XG5cdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHR0aHJvdyBlO1xufVxud2VicGFja0VtcHR5Q29udGV4dC5rZXlzID0gKCkgPT4gKFtdKTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gXCIuL3NyYyBzeW5jIHJlY3Vyc2l2ZVwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlDb250ZXh0OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoZWVyaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZGVidWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpbGVuYW1pZnlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZm9ybS1kYXRhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByb2dyZXNzLXN0cmVhbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyLWNsdXN0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC9jb25jdXJyZW5jeS9idWlsdEluQ29uY3VycmVuY3lcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC91dGlsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1leHRyYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1c2VyLWFnZW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyeXB0b1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm9zXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==