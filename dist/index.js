/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
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
var node_socialmk_1 = __webpack_require__(/*! ./src/node_socialmk */ "./src/node_socialmk.ts");
var Scraper = __webpack_require__(/*! ./src/modules/social_scraper */ "./src/modules/social_scraper.ts");
function login(browser_config, scrape_config) {
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
//get data urls
function searchdata(browser_config, scrape_config) {
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
    ScrapeManager: node_socialmk_1.ScrapeManager,
    Scraper: Scraper,
};


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
            var searchbtn, browser, newPage, pages, searchPage, _i, pages_1, page, pageurl, linkres, linkPage, i, links;
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
                        return [4 /*yield*/, searchPage.waitForSelector(".vui_pagenation", { timeout: 5000 })];
                    case 9:
                        _a.sent();
                        linkres = [];
                        return [4 /*yield*/, searchPage.$$("button.vui_button")];
                    case 10:
                        linkPage = _a.sent();
                        debug(linkPage);
                        i = 0;
                        _a.label = 11;
                    case 11:
                        if (!(i < linkPage.length)) return [3 /*break*/, 15];
                        return [4 /*yield*/, searchPage.evaluate(function (element) {
                                element.click();
                            }, linkPage[i])];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, this.getVideolistlink({ page: searchPage })];
                    case 13:
                        links = _a.sent();
                        debug(links);
                        links.map(function (link) {
                            linkres.push(link);
                        });
                        _a.label = 14;
                    case 14:
                        i++;
                        return [3 /*break*/, 11];
                    case 15: return [2 /*return*/, linkres];
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
var meta = __webpack_require__(/*! ./metadata.js */ "./src/modules/metadata.js");
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
                        links === null || links === void 0 ? void 0 : links.map(function (linkItem) {
                            var linkobj = { title: linkItem.title, url: linkItem.link, lang: linkItem.lang, socialtask_id: linkItem.taskid };
                            debug(linkobj);
                            //    remoteSourmodel.saveLinkremote(linkobj)
                        });
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
                        return [4 /*yield*/, axios.post(this.REMOTEADD + "/api/savelink", data)
                                .then(function (res) {
                                debug(res);
                                return res.data;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDUkE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL2luZGV4LnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9iaWxpYmlsaV9zY3JhcGVyLnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9mYWNlYm9va19zY3JhcGVyLnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9zb2NpYWxfc2NyYXBlci50cyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL21vZHVsZXMveW91dHViZV9zY3JhcGVyLnRzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbm9kZV9zb2NpYWxtay50cyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL3JlbW90ZXNvdXJjZS50cyIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nLy4vc3JjL2NvbmN1cnJlbmN5LWltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9iaWxpYmlsaS9kb3dubG9hZGVyLmpzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvbW9kdWxlcy9saWIvZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy8uL3NyYy9tb2R1bGVzL21ldGFkYXRhLmpzIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvLi9zcmMvIHN5bmMiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImNoZWVyaW9cIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwiZGVidWdcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImZpbGVuYW1pZnlcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwiZm9ybS1kYXRhXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcImxvZGFzaFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInByb2dyZXNzLXN0cmVhbVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJwdXBwZXRlZXJcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXJcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC9jb25jdXJyZW5jeS9idWlsdEluQ29uY3VycmVuY3lcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL2V4dGVybmFsIGNvbW1vbmpzIFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC91dGlsXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBjb21tb25qcyBcInB1cHBldGVlci1leHRyYVwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJ1c2VyLWFnZW50c1wiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgY29tbW9uanMgXCJ3aW5zdG9uXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwib3NcIiIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NvY2lhbC1tYXJrZXRpbmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zb2NpYWwtbWFya2V0aW5nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc29jaWFsLW1hcmtldGluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVidWcgfSBmcm9tIFwiY29uc29sZVwiO1xuaW1wb3J0IHtTY3JhcGVNYW5hZ2VyfSBmcm9tIFwiLi9zcmMvbm9kZV9zb2NpYWxta1wiO1xudmFyIFNjcmFwZXIgPSByZXF1aXJlKFwiLi9zcmMvbW9kdWxlcy9zb2NpYWxfc2NyYXBlclwiKTtcblxuYXN5bmMgZnVuY3Rpb24gbG9naW4oYnJvd3Nlcl9jb25maWc6b2JqZWN0LCBzY3JhcGVfY29uZmlnOm9iamVjdCkge1xuICAvLyBzY3JhcGUgY29uZmlnIG92ZXJ3cml0ZXMgdGhlIGJyb3dzZXJfY29uZmlnXG4gIE9iamVjdC5hc3NpZ24oYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpO1xuXG4gIHZhciBzY3JhcGVyID0gbmV3IFNjcmFwZU1hbmFnZXIoYnJvd3Nlcl9jb25maWcpO1xuICAvLyB2YXIgcmVtb3RlQ29uZmlnPWF3YWl0IHNjcmFwZXIuZ2V0UmVtb3RlQ29uZmlnKCk7XG4gIGF3YWl0IHNjcmFwZXIuc3RhcnQoKTtcblxuICB2YXIgcmVzdWx0cyA9IGF3YWl0IHNjcmFwZXIubG9naW4oc2NyYXBlX2NvbmZpZyk7XG5cbiAgYXdhaXQgc2NyYXBlci5xdWl0KCk7XG5cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG4vL2dldCBkYXRhIHVybHNcbmFzeW5jIGZ1bmN0aW9uIHNlYXJjaGRhdGEoYnJvd3Nlcl9jb25maWcsIHNjcmFwZV9jb25maWcpIHtcbiAgLy8gc2NyYXBlIGNvbmZpZyBvdmVyd3JpdGVzIHRoZSBicm93c2VyX2NvbmZpZ1xuICBPYmplY3QuYXNzaWduKGJyb3dzZXJfY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcbiAgLy8gZGVidWcoYnJvd3Nlcl9jb25maWcpXG4gIHZhciBzY3JhcGVyID0gbmV3IFNjcmFwZU1hbmFnZXIoYnJvd3Nlcl9jb25maWcpO1xuICAvLyB2YXIgcmVtb3RlQ29uZmlnPWF3YWl0IHNjcmFwZXIuZ2V0UmVtb3RlQ29uZmlnKCk7XG4gIGF3YWl0IHNjcmFwZXIuc3RhcnQoKTtcbiAgdmFyIHJlc3VsdHMgPSBhd2FpdCBzY3JhcGVyLnNlYXJjaGRhdGEoc2NyYXBlX2NvbmZpZyk7XG5cbiAgYXdhaXQgc2NyYXBlci5xdWl0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZWFyY2hkYXRhOiBzZWFyY2hkYXRhLFxuICBsb2dpbjogbG9naW4sXG4gIC8vIHl0YmxvZ2luOnl0YmxvZ2luLFxuICBTY3JhcGVNYW5hZ2VyOiBTY3JhcGVNYW5hZ2VyLFxuICBTY3JhcGVyOiBTY3JhcGVyLFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBjaGVlcmlvID0gcmVxdWlyZShcImNoZWVyaW9cIik7XG5pbXBvcnQgeyBTb2NpYWxTY3JhcGVyIGFzIFNjcmFwZXIsIExpbmt1cmwsIFNjcmFwZU9wdGlvbnMsIFNlYXJjaG9iamVjdH0gZnJvbSBcIi4vc29jaWFsX3NjcmFwZXJcIjtcbmNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3QgeyBEb3dubG9hZGVyIH0gPSByZXF1aXJlKFwiLi9iaWxpYmlsaS9kb3dubG9hZGVyLmpzXCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3Qgc2FuaXRpemUgPSByZXF1aXJlKFwiZmlsZW5hbWlmeVwiKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZShcImRlYnVnXCIpKFwiYmlsaWJpbGktc2NyYXBlcjpTY3JhcGVyXCIpO1xuY29uc3QgeyBhdXRvU2Nyb2xsLCBkZWxheSB9ID0gcmVxdWlyZShcIi4vbGliL2Z1bmN0aW9uLmpzXCIpO1xuaW1wb3J0IHtFbGVtZW50SGFuZGxlLFBhZ2V9IGZyb20gJ3B1cHBldGVlcic7XG5cblxudHlwZSBjbGlja2J0bnNlcm9iaiA9IHtcbiAgcGFnZTogUGFnZSxcbiAga2V5d29yZDogc3RyaW5nXG59XG4vLyBpbXBvcnQgZmlsZW5hbWlmeSBmcm9tICdmaWxlbmFtaWZ5Jztcbi8vIGNvbnN0IHsgbGF1bmNoLCBnZXRTdHJlYW0gfSA9IHJlcXVpcmUoXCJwdXBwZXRlZXItc3RyZWFtXCIpO1xuLy8gY29uc3QgUHVwcGV0ZWVyVmlkZW9SZWNvcmRlciA9IHJlcXVpcmUoJ3B1cHBldGVlci12aWRlby1yZWNvcmRlcicpO1xuZXhwb3J0IGNsYXNzIEJpbGliaWxpU2NyYXBlciBleHRlbmRzIFNjcmFwZXIge1xuICBzdGFydFVybDogc3RyaW5nO1xuICBcbiAgY29uc3RydWN0b3IoYXJnczogU2NyYXBlT3B0aW9ucykge1xuICAgIHN1cGVyKGFyZ3MpO1xuICAgIHRoaXMuc3RhcnRVcmwgPSBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbVwiO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudGFza2lkKVxuICAgIC8vIGRlYnVnKHNlbGYudGFza2lkKVxuICB9XG4gIGFzeW5jIGxvYWRfc3RhcnRfcGFnZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBkZWJ1ZyhcImxvYWQgc3RhcnQgcGFnZVwiKVxuXG4gIH1cbiAgLy9sb2dpbiBpbnRvIGJpbGliaWxpXG4gIGFzeW5jIG1ha2Vsb2dpbmFjdGlvbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAvLyBsZXQgc3RhcnRVcmwgPSBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbVwiO1xuXG4gICAgdGhpcy5sb2dnZXIuaW5mbyhcIlVzaW5nIGxvZ2luVXJsOiBcIiArIHRoaXMuc3RhcnRVcmwpO1xuICAgIGF3YWl0IHRoaXMucGFnZS5zZXRCeXBhc3NDU1AodHJ1ZSk7XG4gICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8odGhpcy5zdGFydFVybCk7XG5cbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIFwibG9naW4gc3VjY2VzcywgY29va2llcyBoYXMgYmVlbiBzYXZlIGF0IFwiICsgdGhpcy5jb25maWcudG1wcGF0aFxuICAgICk7XG4gICAgLy9jbGljayBsb2dpbiBidG5cbiAgICBhd2FpdCB0aGlzLnBhZ2UuY2xpY2soXCIuaGVhZGVyLWxvZ2luLWVudHJ5XCIpO1xuICAgIC8vIGF3YWl0IHRoaXMucGFnZS5ldmFsdWF0ZShfID0+IHtcbiAgICAvLyB2YXIgaWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb1wiKTtcbiAgICAvLyBpY29uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAvLyB9KTtcbiAgICAvL3dhaXQgbG9naW4gYm94IHNob3dcbiAgICBhd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlbGVjdG9yKFwiLmJpbGktbWluaS1jb250ZW50LXdwXCIsIHtcbiAgICAgIHRpbWVvdXQ6IHRoaXMuU1RBTkRBUkRfVElNRU9VVCxcbiAgICB9KTtcbiAgICAvL2NsaWNrIGxvZ2luIGJ5IHNtc1xuICAgIGNvbnN0IFtidXR0b25dID0gYXdhaXQgdGhpcy5wYWdlLiR4KFwiLy9kaXZbY29udGFpbnMoLiwgJyDnn63kv6HnmbvlvZUgJyldXCIpO1xuICAgIGlmIChidXR0b24pIHtcbiAgICAgIGF3YWl0IChidXR0b24gYXMgRWxlbWVudEhhbmRsZTxFbGVtZW50PikuY2xpY2soKTtcbiAgICB9XG4gICAgLy9hd2FpdCBmb3IgdXNlciB0byB0YWtlIGFjdGlvblxuICAgIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoXCIuaGVhZGVyLWVudHJ5LW1pbmlcIiwgeyB0aW1lb3V0OiAwIH0pO1xuICAgIC8vdXNlciBoYXMgc3VjY2VzcyBsb2dpblxuICAgIC8vc2F2ZSBjb29raWVzXG4gICAgY29uc3QgY29va2llcyA9IGF3YWl0IHRoaXMucGFnZS5jb29raWVzKCk7XG5cbiAgICBhd2FpdCBmcy53cml0ZUZpbGUoXG4gICAgICB0aGlzLmNvbmZpZy50bXBwYXRoICsgXCIvY29va2llcy5qc29uXCIsXG4gICAgICBKU09OLnN0cmluZ2lmeShjb29raWVzLCBudWxsLCAyKSxcbiAgICAgIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5wYWdlLmNsb3NlKCk7XG4gICAgLy8gYXdhaXQgdGhpcy5icm93c2Vycy5jbG9zZSgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB2aWRlbyBsaXN0IHBhZ2VcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleXdvcmRcbiAgICogQHJldHVybnMgZWxlbWVudFxuICAgKi9cbiAgYXN5bmMgY2xpY2tTZWFyY2hidG4oc2Vhcm9iajogY2xpY2tidG5zZXJvYmopIHtcbiAgICBpZiAoc2Vhcm9iai5wYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBzZWFyb2JqLnBhZ2U7XG4gICAgfVxuXG4gICAgdGhpcy5sb2dnZXIuaW5mbyhcIlVzaW5nIGxvZ2luVXJsOiBcIiArIHRoaXMuc3RhcnRVcmwpO1xuICAgIGF3YWl0IHRoaXMucGFnZS5zZXRCeXBhc3NDU1AodHJ1ZSk7XG4gICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8odGhpcy5zdGFydFVybCk7XG4gICAgYXdhaXQgdGhpcy5wYWdlLnR5cGUoXCIubmF2LXNlYXJjaC1pbnB1dFwiLCBzZWFyb2JqLmtleXdvcmQpO1xuICAgIC8vIGF3YWl0IHRoaXMucGFnZS4kZXZhbChcIi5uYXYtc2VhcmNoLWlucHV0XCIsIGZ1bmN0aW9uIChrZXl3b3JkKSB7XG4gICAgLy8gICB0aGlzLnZhbHVlID0ga2V5d29yZDtcbiAgICAvLyB9KTtcbiAgICAvLyBhd2FpdCBwYWdlLiRldmFsKCcubmF2LXNlYXJjaC1pbnB1dCcsIGVsID0+IGVsLnZhbHVlID0gXCJcIik7XG4gICAgY29uc3Qgc2VhcmNoYnRuID0gYXdhaXQgdGhpcy5wYWdlLiQoXCIubmF2LXNlYXJjaC1idG5cIik7XG4gICAgaWYgKHNlYXJjaGJ0bikge1xuICAgICAgYXdhaXQgc2VhcmNoYnRuLmNsaWNrKCk7XG4gICAgfVxuICAgIHJldHVybiBzZWFyY2hidG47XG4gIH1cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYWdlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXl3b3JkXG4gICAqIEByZXR1cm5zIGFycmF5XG4gICAqL1xuICBhc3luYyBzZWFyY2hkYXRhKHNlYXJvYmo6IFNlYXJjaG9iamVjdCk6IFByb21pc2U8QXJyYXk8b2JqZWN0Pj4ge1xuICAgIGlmIChzZWFyb2JqLnBhZ2UpIHtcbiAgICAgIHRoaXMucGFnZSA9IHNlYXJvYmoucGFnZTtcbiAgICB9XG4gICAgbGV0IHJlc3VsdDogQXJyYXk8b2JqZWN0PiA9IFtdXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc2Vhcm9iai5rZXl3b3JkKSkge1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHNlYXJvYmoua2V5d29yZCkge1xuICAgICAgICBsZXQgc3Vic2Vhcm9iZzogU2VhcmNob2JqZWN0ID0geyBwYWdlOiB0aGlzLnBhZ2UsIGtleXdvcmQ6IGVsZW1lbnQgfVxuICAgICAgICBsZXQgbGlua3JlcyA9IGF3YWl0IHRoaXMuZ2V0VmlkZW91cmxzKHN1YnNlYXJvYmcpO1xuICAgICAgICBkZWJ1ZyhsaW5rcmVzKVxuICAgICAgICBmb3IgKGNvbnN0IGxpbmsgb2YgbGlua3Jlcykge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGxpbmspXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlYXJvYmoua2V5d29yZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBzZXJzZWFyb2JnOiBTZWFyY2hvYmplY3QgPSB7IHBhZ2U6IHRoaXMucGFnZSwga2V5d29yZDogc2Vhcm9iai5rZXl3b3JkIH1cbiAgICAgIGxldCBsaW5rcmVzID0gYXdhaXQgdGhpcy5nZXRWaWRlb3VybHMoc2Vyc2Vhcm9iZyk7XG4gICAgICBmb3IgKGNvbnN0IGxpbmsgb2YgbGlua3Jlcykge1xuXG4gICAgICAgIHJlc3VsdC5wdXNoKGxpbmtyZXMpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgICAvLyByZXR1cm4gYXdhaXQgdGhpcy5nZXRWaWRlb3VybHMoeyBwYWdlOiB0aGlzLnBhZ2UsIGtleXdvcmQ6IGtleXdvcmQgfSk7XG4gIH1cbiAgLy9nZXQgdmlkZW8gdXJsIHJldHVybiBpbiBhcnJheVxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3Qsc3RyaW5nLHN0cmluZ31cbiAgICogQHJldHVybnMgYXJyYXlcbiAgICovXG4gIGFzeW5jIGdldFZpZGVvdXJscyhzZXJvYmo6IFNlYXJjaG9iamVjdCk6IFByb21pc2U8QXJyYXk8TGlua3VybD4+IHtcbiAgICBpZiAoc2Vyb2JqLnBhZ2UpIHtcbiAgICAgIHRoaXMucGFnZSA9IHNlcm9iai5wYWdlO1xuICAgIH1cbiAgICBpZiAoc2Vyb2JqLmNvb2tpZXNQYXRoKSB7XG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoc2Vyb2JqLmNvb2tpZXNQYXRoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIGNvb2tpZXMgZmlsZSBhdCAke3Nlcm9iai5jb29raWVzUGF0aH1gKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGNvb2tpZXMgPSBKU09OLnBhcnNlKGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKHNlcm9iai5jb29raWVzUGF0aCkpO1xuICAgICAgLy8gY29uc29sZS5sb2coY29va2llcyk7XG4gICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0Q29va2llKC4uLmNvb2tpZXMpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc2Vyb2JqLmtleXdvcmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5oYW5kbGVTZWFyY2goeyBwYWdlOiB0aGlzLnBhZ2UsIGtleXdvcmQ6IHNlcm9iai5rZXl3b3JkIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBsaW5rcmVzOiBBcnJheTxMaW5rdXJsPiA9IFtdO1xuICAgICAgZm9yIChjb25zdCBrZXllbGVtZW50IG9mIHNlcm9iai5rZXl3b3JkKSB7XG4gICAgICAgIGNvbnN0IHJlcz1hd2FpdCB0aGlzLmhhbmRsZVNlYXJjaCh7IHBhZ2U6IHRoaXMucGFnZSwga2V5d29yZDoga2V5ZWxlbWVudCB9KVxuICAgICAgICBmb3IgKGNvbnN0IGxpbmsgb2YgcmVzKSB7XG4gICAgICAgICAgbGlua3Jlcy5wdXNoKGxpbmspXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBsaW5rcmVzXG4gICAgfVxuXG4gIH1cblxuICBhc3luYyBoYW5kbGVTZWFyY2goY3NvYmo6IGNsaWNrYnRuc2Vyb2JqKTogUHJvbWlzZTxBcnJheTxMaW5rdXJsPj4ge1xuICAgIGNvbnN0IHNlYXJjaGJ0biA9IGF3YWl0IHRoaXMuY2xpY2tTZWFyY2hidG4oe1xuICAgICAgcGFnZTogdGhpcy5wYWdlLFxuICAgICAga2V5d29yZDogY3NvYmoua2V5d29yZCxcbiAgICB9KTtcblxuICAgIGxldCBicm93c2VyID0gdGhpcy5wYWdlLmJyb3dzZXIoKTtcbiAgICBjb25zdCBuZXdQYWdlID0gYXdhaXQgYnJvd3Nlci53YWl0Rm9yVGFyZ2V0KCh0YXJnZXQpID0+XG4gICAgICB0YXJnZXQudXJsKCkuaW5jbHVkZXMoXCJzZWFyY2guYmlsaWJpbGkuY29tXCIpXG4gICAgKTtcbiAgICBjb25zdCBwYWdlcyA9IGF3YWl0IGJyb3dzZXIucGFnZXMoKTtcbiAgICBsZXQgc2VhcmNoUGFnZTtcbiAgICBmb3IgKGNvbnN0IHBhZ2Ugb2YgcGFnZXMpIHtcbiAgICAgIGNvbnN0IHBhZ2V1cmwgPSBhd2FpdCBwYWdlLnVybCgpOyAvLyBuZXcgcGFnZSBub3cgYXBwZWFyIVxuICAgICAgLy8gZGVidWcoYXdhaXQgcGFnZS50aXRsZSgpKVxuICAgICAgaWYgKHBhZ2V1cmwuaW5jbHVkZXMoXCJzZWFyY2guYmlsaWJpbGkuY29tXCIpKSB7XG4gICAgICAgIHNlYXJjaFBhZ2UgPSBwYWdlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFzZWFyY2hQYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZWFyY2ggcGFnZSBub3QgZm91bmRcIik7XG4gICAgfVxuXG4gICAgYXdhaXQgYXV0b1Njcm9sbChzZWFyY2hQYWdlKTtcblxuXG4gICAgYXdhaXQgc2VhcmNoUGFnZS53YWl0Rm9yU2VsZWN0b3IoXCIudnVpX3BhZ2VuYXRpb25cIiwgeyB0aW1lb3V0OiA1MDAwIH0pO1xuXG4gICAgbGV0IGxpbmtyZXM6IEFycmF5PExpbmt1cmw+ID0gW107XG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLiQkKFwiYnV0dG9uLnZ1aV9idXR0b25cIiwgZWxlbWVudHM9PntcbiAgICAvLyAgIGNvbnNvbGUubG9nKGVsZW1lbnRzKVxuICAgIC8vIH0pXG4gICAgY29uc3QgbGlua1BhZ2UgPSBhd2FpdCBzZWFyY2hQYWdlLiQkKFwiYnV0dG9uLnZ1aV9idXR0b25cIik7XG4gICAgZGVidWcobGlua1BhZ2UpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlua1BhZ2UubGVuZ3RoOyBpKyspIHtcblxuICAgICAgYXdhaXQgc2VhcmNoUGFnZS5ldmFsdWF0ZSgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgICB9LCBsaW5rUGFnZVtpXSk7XG4gICAgICBjb25zdCBsaW5rcyA9IGF3YWl0IHRoaXMuZ2V0VmlkZW9saXN0bGluayh7IHBhZ2U6IHNlYXJjaFBhZ2UgfSk7XG4gICAgICBkZWJ1ZyhsaW5rcyk7XG4gICAgICBsaW5rcy5tYXAoKGxpbmspID0+IHtcbiAgICAgICAgbGlua3Jlcy5wdXNoKGxpbmspO1xuICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gbGlua3JlcztcbiAgfVxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtwYWdlfSBwYWdlXG4gICAqIEByZXR1cm5zIGFycmF5XG4gICAqL1xuICBhc3luYyBnZXRWaWRlb2xpc3RsaW5rKHsgcGFnZSB9KTogUHJvbWlzZTxBcnJheTxMaW5rdXJsPj4ge1xuICAgIGlmIChwYWdlKSB7XG4gICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgICAvLyBjb25zdCBlbEhhbmRsZUFycmF5ID0gYXdhaXQgcGFnZS4kJChcbiAgICAvLyAgIFwiLmJpbGktdmlkZW8tY2FyZF9faW5mby0tcmlnaHQgYTpudGgtY2hpbGQoMSlcIlxuICAgIC8vICk7XG4gICAgXG4gICAgbGV0IGxpbmttYXA6IEFycmF5PExpbmt1cmw+ID0gW107XG4gICAgLy8gY29uc3QgdGhhdD10aGlzO1xuICAgIGRlYnVnKHRoaXMuY29uZmlnLnRhc2tpZClcbiAgICBsZXQgdGFza2lkcz0wO1xuICAgIGlmKHRoaXMuY29uZmlnLnRhc2tpZCl7XG4gICAgdGFza2lkcz10aGlzLmNvbmZpZy50YXNraWRcbiAgICB9XG4gICAgbGlua21hcCA9IGF3YWl0IHRoaXMucGFnZS4kJGV2YWwoXG4gICAgICBcIi5iaWxpLXZpZGVvLWNhcmRfX2luZm8tLXJpZ2h0ID5hOmZpcnN0LWNoaWxkXCIsXG4gICAgICAoYWxpbmtzLHRhc2tpZHMpID0+IHtcbiAgICAgICAgcmV0dXJuIGFsaW5rcy5tYXAoKGFsaW5rKSA9PiB7XG4gICAgICAgICAgbGV0IGxpbmtvYmc6IExpbmt1cmwgPSB7dGl0bGU6JycsbGluazonJyxsYW5nOid6aC1jbid9O1xuICAgICAgICAgIC8vIGlmKCF0aGF0LnRhc2tpZCl7XG4gICAgICAgICAgLy8gbGlua29iZy50YXNraWQ9dGhhdC50YXNraWQ7XG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIGlmKHRhc2tpZHMpe1xuICAgICAgICAgICAgbGlua29iZy50YXNraWQ9dGFza2lkc1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBoZXJmPWFsaW5rLmdldEF0dHJpYnV0ZShcImhyZWZcIilcbiAgICAgICAgICBpZihoZXJmKXtcbiAgICAgICAgICBsaW5rb2JnLmxpbmsgPSBoZXJmXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFsaW5rKTtcbiAgICAgICAgICBsZXQgaHRpdGxlID0gYWxpbmsucXVlcnlTZWxlY3RvcihcImgzXCIpO1xuICAgICAgICAgIGlmKGh0aXRsZSl7XG4gICAgICAgICAgICAgY29uc3QgaHRyZXM9IGh0aXRsZS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICAgICBpZihodHJlcyl7XG4gICAgICAgICAgICAgbGlua29iZy50aXRsZT1odHJlc1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGxpbmtvYmc7XG4gICAgICAgIH0pO1xuICAgICAgfSx0YXNraWRzXG4gICAgKTtcbiAgICAvLyBkZWJ1ZyhcInF1ZXJ5IGxpbmsgZmluaXNoXCIpO1xuICAgIC8vIGRlYnVnKGxpbmttYXApO1xuICAgIC8vIGRlYnVnKFwic2hvdyBsaW5rIGZpbmlzaFwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhsaW5rbWFwKVxuXG4gICAgYXdhaXQgbGlua21hcC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKCFlbGVtZW50LmxpbmsuaW5jbHVkZXMoXCIvdmlkZW8vXCIpKSB7XG4gICAgICAgIC8vIGRlYnVnKFwiZWxlbWVudCBoYXMgdmlkZW8gXCIrZWxlbWVudClcbiAgICAgICAgbGlua21hcC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGF3YWl0IGxpbmttYXAuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChlbGVtZW50LmxpbmsuaW5jbHVkZXMoXCIvYXBpL1wiKSkge1xuICAgICAgICBkZWJ1ZyhcImVsZW1lbnQgaGFzIGFwaSBcIiArIGVsZW1lbnQpO1xuICAgICAgICBsaW5rbWFwLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy9kZWJ1ZyhcImZpbHRlciBsaW5rIGZpbmlzaFwiKTtcbiAgICBkZWJ1ZyhsaW5rbWFwKTtcblxuICAgIHJldHVybiBsaW5rbWFwO1xuICB9XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFnZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGlua1xuICAgKiBAcGFyYW0ge3N0cmluZ30gdmlkZW9wYXRoXG4gICAqL1xuICBhc3luYyBkb3dubG9hZFNpZ2xlVmlkZW8oeyBsaW5rLCB2aWRlb3BhdGggfSkge1xuICAgIC8vIGlmIChwYWdlKSB7XG4gICAgLy8gICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgIC8vIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKGxpbmspXG4gICAgLy8gYXdhaXQgdGhpcy5wYWdlLmdvdG8obGluayx7XG4gICAgLy8gICB3YWl0VW50aWw6ICdkb21jb250ZW50bG9hZGVkJyxcbiAgICAvLyB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyh2aWRlb3BhdGgpXG4gICAgLy8gY29uc3QgZmlsZSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKHZpZGVvcGF0aCArIFwiL3Rlc3Qud2VibVwiKTtcbiAgICAvLyBhd2FpdCBwYWdlLmV2YWx1YXRlKGFzeW5jICgpID0+IHtcbiAgICAvLyBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5icHgtcGxheWVyLXZpZGVvLXdyYXAgPiB2aWRlbzpudGgtY2hpbGQoMSknKTtcbiAgICAvLyBjb25zb2xlLmxvZyhlbCk7XG4gICAgLy8gY29uc3Qge3NyY30gPSBlbC5xdWVyeVNlbGVjdG9yKCdzb3VyY2UnKTtcbiAgICAvLyBjb25zb2xlLmxvZyhzcmMpO1xuICAgIC8vIH0pO1xuICAgIC8vIGNvbnN0IGh0bWwgPSBhd2FpdCBwYWdlLiRldmFsKCcjYmlsaWJpbGktcGxheWVyJywgZWwgPT4gZWwub3V0ZXJIVE1MKTtcbiAgICAvLyBjb25zb2xlLmxvZyhodG1sKVxuICAgIC8vIGNvbnN0IHNyYyA9IGF3YWl0IHBhZ2UuJGV2YWwoXCIjYmlsaWJpbGktcGxheWVyIHZpZGVvXCIsZWwgPT4gZWwuZ2V0QXR0cmlidXRlKFwic3JjXCIpKVxuXG4gICAgY29uc3QgZG93bmxvYWRlciA9IG5ldyBEb3dubG9hZGVyKCk7XG4gICAgZG93bmxvYWRlci5nZXRWaWRlb1VybChsaW5rKTtcbiAgICBpZiAoIWRvd25sb2FkZXIudXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ2aWRlbyB1cmwgaW52YWxpZFwiKTtcbiAgICB9XG4gICAgYXdhaXQgZG93bmxvYWRlci5nZXRBaWQoKTtcblxuICAgIGxldCB2aWRlb3JlcyA9IGF3YWl0IGRvd25sb2FkZXIuZ2V0SW5mbygpO1xuICAgIGRlYnVnKFwiVklERU8gSU5GT1wiLCB2aWRlb3Jlcyk7XG4gICAgLy8gY29uc3QgZG93bmxvYWRQYXRoID0nL2hvbWUvcm9iZXJ0emVuZy9kb3dubG9hZHRlc3QnO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gdmlkZW9yZXMuZGF0YS50aXRsZTtcbiAgICBjb25zdCB7IGRhdGEsIGZhbGxiYWNrIH0gPSBhd2FpdCBkb3dubG9hZGVyLmdldERhdGEoKTtcblxuICAgIGNvbnN0IHRhcmdldCA9IGRhdGEuZHVybCB8fCBkYXRhLnJlc3VsdC5kdXJsO1xuICAgIGNvbnN0IHF1YWxpdHkgPSBkYXRhLnF1YWxpdHkgfHwgZGF0YS5yZXN1bHQucXVhbGl0eSxcbiAgICAgIHF1YWxpdHlBcnJheSA9IHtcbiAgICAgICAgMTEyOiBcIjEwODBQK1wiLFxuICAgICAgICA4MDogXCIxMDgwUFwiLFxuICAgICAgICA3NDogXCI3MjBQNjBcIixcbiAgICAgICAgNjQ6IFwiNzIwUFwiLFxuICAgICAgICA0ODogXCI3MjBQXCIsXG4gICAgICAgIDMyOiBcIjQ4MFBcIixcbiAgICAgICAgMTY6IFwiMzYwUFwiLFxuICAgICAgICAxNTogXCIzNjBQXCIsXG4gICAgICB9O1xuICAgIGNvbnN0IHZpZGVvUXVhbnRpdHkgPSBxdWFsaXR5QXJyYXlbcXVhbGl0eV0gfHwgXCJ1bmtub3duXCI7XG4gICAgY29uc29sZS5sb2coXCJ2aWRlb1F1YW50aXR5IGlzIFwiICsgdmlkZW9RdWFudGl0eSk7XG4gICAgaWYgKGZhbGxiYWNrKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJlcnJvciBoYXBwZW4gd2hlbiBnZXQgdmlkZW8gZGF0YVwiKTtcbiAgICB9XG4gICAgZGVidWcoXCJlY2hvIHRhcmdldFwiKTtcbiAgICBkZWJ1Zyh0YXJnZXQpO1xuICAgIHRhcmdldC5mb3JFYWNoKChlbGVtZW50LCBwYXJ0KSA9PiB7XG4gICAgICBjb25zdCBmaWxlID0gcGF0aC5qb2luKHZpZGVvcGF0aCwgYCR7c2FuaXRpemUoZmlsZW5hbWUpfS0ke3BhcnR9LmZsdmApO1xuICAgICAgZGVidWcoXCJwYXJ0IGlzICVvXCIsIHBhcnQpO1xuICAgICAgZGVidWcoXCJmaWxlIG5hbWUgJW9cIiwgZmlsZSk7XG4gICAgICBjb25zdCBzdGF0ZSA9IGRvd25sb2FkZXIuZG93bmxvYWRCeUluZGV4KFxuICAgICAgICBwYXJ0LFxuICAgICAgICBmaWxlLFxuICAgICAgICAocHJvZ3Jlc3MsIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBzcGVlZCwgZXRhLCBwZXJjZW50YWdlIH0gPSBwcm9ncmVzczsgLy/mmL7npLrov5vluqbmnaFcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInNwZWVkOiBcIiArIE1hdGgucm91bmQoc3BlZWQgLyAxZTMpICsgXCJLQi9zXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBldGE6JHtldGF9c2ApO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLyoqXG4gICAqIGdldCB2aWRlbyBkZXRhaWxcbiAgICogQHBhcmFtIHtvYmplY3R9IHBhZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxpbmtcbiAgICovXG4gIGFzeW5jIGdldFZpZGVvZGV0YWlsKHBhZ2UsIGxpbmspIHtcbiAgICBpZiAocGFnZSkge1xuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5wYWdlLmdvdG8obGluaywge1xuICAgICAgd2FpdFVudGlsOiBcImRvbWNvbnRlbnRsb2FkZWRcIixcbiAgICB9KTtcblxuICAgIC8vIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQmlsaWJpbGlTY3JhcGVyOiBCaWxpYmlsaVNjcmFwZXIsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaW1wb3J0IHtjaGVlcmlvfSBmcm9tICdjaGVlcmlvJztcbmltcG9ydCB7IFNvY2lhbFNjcmFwZXIgYXMgU2NyYXBlcixTY3JhcGVPcHRpb25zfSBmcm9tICcuL3NvY2lhbF9zY3JhcGVyJztcblxuZXhwb3J0IGNsYXNzIEZhY2Vib29rU2NyYXBlciBleHRlbmRzIFNjcmFwZXIge1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogU2NyYXBlT3B0aW9ucykge1xuICAgICAgICBzdXBlcihhcmdzKTtcbiAgICB9XG4gXG5cbiAgICBhc3luYyBsb2FkX2xvZ2luX3BhZ2UoKTpQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgbGV0IHN0YXJ0VXJsID0gJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbSc7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzKSB7XG4gICAgICAgIC8vICAgICBzdGFydFVybCA9IGBodHRwczovL3d3dy4ke3RoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzLmZhY2Vib29rX2RvbWFpbn1gO1xuICAgICAgICAvLyAgICAgaWYgKHRoaXMuY29uZmlnLmZhY2Vib29rX3NldHRpbmdzLmZhY2Vib29rX2RvbWFpbikge1xuICAgICAgICAvLyAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LiR7dGhpcy5jb25maWcuZmFjZWJvb2tfc2V0dGluZ3MuZmFjZWJvb2tfZG9tYWlufWA7XG4gICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgIHN0YXJ0VXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbWA7XG4gICAgICAgIC8vICAgICB9XG5cbiAgICAgICAgLy8gICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5ncykge1xuICAgICAgICAvLyAgICAgICAgIGlmIChrZXkgIT09ICdmYWNlYm9va19kb21haW4nKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHN0YXJ0VXJsICs9IGAke2tleX09JHt0aGlzLmNvbmZpZy5mYWNlYm9va19zZXR0aW5nc1trZXldfSZgXG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnVXNpbmcgbG9naW5Vcmw6ICcgKyBzdGFydFVybCk7XG5cbiAgICAgICAgdGhpcy5sYXN0X3Jlc3BvbnNlID0gYXdhaXQgdGhpcy5wYWdlLmdvdG8oc3RhcnRVcmwpO1xuXG4gICAgICAgIC8vYXdhaXQgdGhpcy5wYWdlLndhaXRGb3JTZWxlY3RvcignaW5wdXRbbmFtZT1cInFcIl0nLCB7IHRpbWVvdXQ6IHRoaXMuU1RBTkRBUkRfVElNRU9VVCB9KTtcblxuICAgICAgICAvLyByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy91c2VyIGxvZ2luIGJ5IGhhbmRcbiAgICBhc3luYyB1c2VybG9naW5hY3Rpb24oKXtcblxuICAgIH1cblxufVxuXG5cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbWV0YSA9IHJlcXVpcmUoJy4vbWV0YWRhdGEuanMnKTtcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc2Utc2NyYXBlcjpTY3JhcGVyJyk7XG5pbXBvcnQge1JlbW90ZVNvdXJjZSxMaW5rZGF0YX0gIGZyb20gXCIuLi9yZW1vdGVzb3VyY2VcIlxuaW1wb3J0IHtQYWdlfSBmcm9tICdwdXBwZXRlZXInO1xuXG4vLyBleHBvcnQgaW50ZXJmYWNlIFNjcmFwZU9wdGlvbnNQYWdlcyB7XG4vLyAgICAgc2V0Vmlld3BvcnQ6IEZ1bmN0aW9uLFxuLy8gICAgIHNldFJlcXVlc3RJbnRlcmNlcHRpb246IEZ1bmN0aW9uLFxuLy8gICAgIG9uOiBGdW5jdGlvbixcbi8vICAgICBnb3RvOiBGdW5jdGlvbixcbi8vICAgICBzY3JlZW5zaG90OiBGdW5jdGlvbixcbi8vICAgICBzZXRCeXBhc3NDU1A6IEZ1bmN0aW9uLFxuLy8gICAgIGNsaWNrOiBGdW5jdGlvbixcbi8vICAgICB3YWl0Rm9yU2VsZWN0b3I6IEZ1bmN0aW9uLFxuLy8gICAgICR4OiBGdW5jdGlvbixcbi8vICAgICBjb29raWVzOiBGdW5jdGlvbixcbi8vIH1cbi8vIGV4cG9ydCBjbGFzcyBTY3JhcGVPcHRpb25zUGFnZSBleHRlbmRzIFBhZ2V7XG5cbi8vIH1cbi8vIGV4cG9ydCBjbGFzcyBFbGVtZW50aGFuZHMgZXh0ZW5kcyBwdXBwZXRlZXIuRWxlbWVudEhhbmRsZXt9XG5leHBvcnQgaW50ZXJmYWNlIFNjcmFwZU9wdGlvbnMge1xuICAgIGNvbmZpZzoge1xuICAgICAgICBsb2dnZXI6IGxvZ1R5cGUsXG4gICAgICAgIHNlYXJjaF9lbmdpbmU6IHN0cmluZywga2V5d29yZHM6IEFycmF5PHN0cmluZz4sIHByb3h5OiBzdHJpbmcsIGFwcGx5X2V2YXNpb25fdGVjaG5pcXVlczogYm9vbGVhbiwgYmxvY2tfYXNzZXRzOiBib29sZWFuLCB0ZXN0X2V2YXNpb246IGJvb2xlYW4sIGxvZ19odHRwX2hlYWRlcnM6IGJvb2xlYW4sIGxvZ19pcF9hZGRyZXNzOiBib29sZWFuXG4gICAgfSxcbiAgICBjb250ZXh0Pzogb2JqZWN0LFxuICAgIHBsdWdnYWJsZT86IG9iamVjdCxcbiAgICBwYWdlOiBQYWdlLFxuICAgIHRhc2tpZD86bnVtYmVyLFxufVxuXG5pbnRlcmZhY2UgcnVuUGFyYW1ldGVyIHtcbiAgICBwYWdlPzogUGFnZSxcbiAgICBkYXRhPzogb2JqZWN0LFxuICAgIHdvcmtlcj86IG9iamVjdFxufVxuaW50ZXJmYWNlIGxvZ1R5cGUge1xuICAgIGluZm86IEZ1bmN0aW9uLFxuICAgIGVycm9yOiBGdW5jdGlvblxufVxuXG5pbnRlcmZhY2Ugd29zZWFyY2hPYmoge1xuICAgIHBhZ2U/OiBQYWdlLFxuICAgIHdvcmtlcjpvYmplY3Rcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMaW5rdXJse1xuICAgIHRpdGxlOnN0cmluZyxcbiAgICBsaW5rOnN0cmluZyxcbiAgICBsYW5nOnN0cmluZyxcbiAgICB0YXNraWQ/Om51bWJlclxufVxuZXhwb3J0IHR5cGUgU2VhcmNob2JqZWN0PXtcbiAgICBwYWdlPzpQYWdlLFxuICAgIGtleXdvcmQ6c3RyaW5nfEFycmF5PHN0cmluZz5cbiAgICBjb29raWVzUGF0aD86c3RyaW5nXG4gIH1cblxuXG5cbi8qKlxuICogdGhpcyBpcyBwYXJlbnQgY2xhc3MgZm9yIHNvY2lhbCBzY3JhcHllciBub2RlXG4gKiAgKi9cbmV4cG9ydCBjbGFzcyBTb2NpYWxTY3JhcGVyIHtcbiAgICBjb25maWc6IHtcbiAgICAgICAgbG9nZ2VyOiBsb2dUeXBlLFxuICAgICAgICBzZWFyY2hfZW5naW5lOiBzdHJpbmcsIGtleXdvcmRzOiBBcnJheTxzdHJpbmc+LCBwcm94eTogc3RyaW5nLCBhcHBseV9ldmFzaW9uX3RlY2huaXF1ZXM6IGJvb2xlYW4sIGJsb2NrX2Fzc2V0czogYm9vbGVhbiwgdGVzdF9ldmFzaW9uOiBib29sZWFuLCBsb2dfaHR0cF9oZWFkZXJzOiBib29sZWFuLCBsb2dfaXBfYWRkcmVzczogYm9vbGVhblxuICAgICAgICB0bXBwYXRoPzogc3RyaW5nLFxuICAgICAgICB0YXNraWQ/Om51bWJlclxuICAgICAgICAvLyBvYmo6cHVwcGV0ZWVyLlBhZ2VcbiAgICB9O1xuICAgIHBhZ2U6IFBhZ2U7XG4gICAgbGFzdF9yZXNwb25zZTogb2JqZWN0IHwgbnVsbDtcbiAgICBtZXRhZGF0YTogeyBodHRwX2hlYWRlcnM/OiBvYmplY3QsIGlwaW5mbz86IHsgaXA6IHN0cmluZyB9LCBzY3JhcGluZ19kZXRlY3RlZD86IGJvb2xlYW4gfTtcbiAgICBwbHVnZ2FibGU/OiBvYmplY3Q7XG4gICAgY29udGV4dD86IG9iamVjdDtcbiAgICBsb2dnZXI6IGxvZ1R5cGU7XG4gICAgcHJveHk6IHN0cmluZztcbiAgICBrZXl3b3JkczogQXJyYXk8c3RyaW5nPjtcbiAgICBTVEFOREFSRF9USU1FT1VUOiBudW1iZXI7XG4gICAgU09MVkVfQ0FQVENIQV9USU1FOiBudW1iZXI7XG4gICAgcmVzdWx0czogb2JqZWN0O1xuICAgIHJlc3VsdF9yYW5rOiBudW1iZXI7XG4gICAgbnVtX3JlcXVlc3RzOiBudW1iZXI7XG4gICAgbnVtX2tleXdvcmRzOiBudW1iZXI7XG4gICAgdGFza2lkPzpudW1iZXI7XG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogU2NyYXBlT3B0aW9ucykge1xuICAgICAgICBcbiAgICAgICAgZGVidWcoJ2NvbnN0cnVjdG9yJyk7XG4gICAgICAgIGRlYnVnKG9wdGlvbnMpO1xuICAgICAgICAvLyBjb25zdCB7XG4gICAgICAgIC8vICAgICAvLyBjb25maWcgPSB7fSxcbiAgICAgICAgLy8gICAgIGNvbnRleHQgPSB7fSxcbiAgICAgICAgLy8gICAgIC8vIHBsdWdnYWJsZSA9IG51bGwsXG4gICAgICAgIC8vICAgICBwYWdlID0gbnVsbCxcbiAgICAgICAgLy8gICAgIC8vIGJyb3dzZXJzPW51bGxcbiAgICAgICAgLy8gfSA9IG9wdGlvbnM7XG4gICAgICAgIC8vIHRoaXMuYnJvd3Nlcj1icm93c2VyO1xuICAgICAgICB0aGlzLnBhZ2UgPSBvcHRpb25zLnBhZ2U7XG4gICAgICAgIHRoaXMubGFzdF9yZXNwb25zZSA9IG51bGw7IC8vIHRoZSBsYXN0IHJlc3BvbnNlIG9iamVjdFxuICAgICAgICB0aGlzLm1ldGFkYXRhID0ge1xuICAgICAgICAgICAgc2NyYXBpbmdfZGV0ZWN0ZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBsdWdnYWJsZSA9IG9wdGlvbnMucGx1Z2dhYmxlO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IG9wdGlvbnMuY29uZmlnO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IHRoaXMuY29uZmlnLmxvZ2dlcjtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0O1xuXG4gICAgICAgIHRoaXMucHJveHkgPSBvcHRpb25zLmNvbmZpZy5wcm94eTtcbiAgICAgICAgdGhpcy5rZXl3b3JkcyA9IG9wdGlvbnMuY29uZmlnLmtleXdvcmRzO1xuICAgICAgICBpZihvcHRpb25zLnRhc2tpZCl7XG4gICAgICAgICAgICB0aGlzLnRhc2tpZD1vcHRpb25zLnRhc2tpZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLlNUQU5EQVJEX1RJTUVPVVQgPSAxMDAwMDtcbiAgICAgICAgdGhpcy5TT0xWRV9DQVBUQ0hBX1RJTUUgPSA0NTAwMDtcblxuICAgICAgICB0aGlzLnJlc3VsdHMgPSB7fTtcbiAgICAgICAgdGhpcy5yZXN1bHRfcmFuayA9IDE7XG4gICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgdGhlIHJlcXVlc3RzIGRvbmVcbiAgICAgICAgdGhpcy5udW1fcmVxdWVzdHMgPSAwO1xuICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSBrZXl3b3JkcyBzZWFyY2hlZFxuICAgICAgICB0aGlzLm51bV9rZXl3b3JkcyA9IDA7XG5cbiAgICAgICAgbGV0IHNldHRpbmdzID0gdGhpcy5jb25maWdbYCR7dGhpcy5jb25maWcuc2VhcmNoX2VuZ2luZX1fc2V0dGluZ3NgXTtcbiAgICAgICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNldHRpbmdzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzID0gSlNPTi5wYXJzZShzZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWdbYCR7dGhpcy5jb25maWcuc2VhcmNoX2VuZ2luZX1fc2V0dGluZ3NgXSA9IHNldHRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGxvZ2luIHNvY2lhbCBtZWRpYSBwbGF0Zm9ybVxuICAgICAqIEBwYXJhbSBydW5vYmogXG4gICAgICogXG4gICAgICovXG4gICAgYXN5bmMgcnVuTG9naW4ocnVub2JqOiBydW5QYXJhbWV0ZXIpIHtcblxuICAgICAgICBkZWJ1Zygnd29ya2VyPSVvJywgcnVub2JqLndvcmtlciwgdGhpcy5jb25maWcua2V5d29yZHMpO1xuXG4gICAgICAgIGlmIChydW5vYmoucGFnZSkge1xuICAgICAgICAgICAgdGhpcy5wYWdlID0gcnVub2JqLnBhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLnBhZ2U/LnNldFZpZXdwb3J0KHsgd2lkdGg6IDEyODAsIGhlaWdodDogODAwIH0pO1xuXG5cbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkX2Jyb3dzZXJfZW5naW5lKCk7XG4gICAgICAgIGF3YWl0IHRoaXMubWFrZWxvZ2luYWN0aW9uKClcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGlvbiB0aGF0IHJ1bnMgb25seSBvbmNlIGluIHRoZSBiZWdpbm5pbmcgb2YgdGhlXG4gICAgICogc2NyYXBpbmcgcHJvY2VkdXJlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IHRydWUgaWYgZXZlcnl0aGluZyBpcyBjb3JyZWN0LlxuICAgICAqL1xuICAgIGFzeW5jIGxvYWRfYnJvd3Nlcl9lbmdpbmUoKTogUHJvbWlzZTx2b2lkPiB7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFwcGx5X2V2YXNpb25fdGVjaG5pcXVlcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gcHJldmVudCBkZXRlY3Rpb24gYnkgZXZhZGluZyBjb21tb24gZGV0ZWN0aW9uIHRlY2huaXF1ZXNcbiAgICAgICAgICAgIGF3YWl0IGV2YWRlQ2hyb21lSGVhZGxlc3NEZXRlY3Rpb24odGhpcy5wYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJsb2NrIHNvbWUgYXNzZXRzIHRvIHNwZWVkIHVwIHNjcmFwaW5nXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5ibG9ja19hc3NldHMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGFnZS5zZXRSZXF1ZXN0SW50ZXJjZXB0aW9uKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5wYWdlLm9uKCdyZXF1ZXN0JywgKHJlcSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gcmVxLnJlc291cmNlVHlwZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrID0gWydzdHlsZXNoZWV0JywgJ2ZvbnQnLCAnaW1hZ2UnLCAnbWVkaWEnXTtcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2suaW5jbHVkZXModHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxLmNvbnRpbnVlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb25maWcudGVzdF9ldmFzaW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBOYXZpZ2F0ZSB0byB0aGUgcGFnZSB0aGF0IHdpbGwgcGVyZm9ybSB0aGUgdGVzdHMuXG4gICAgICAgICAgICBjb25zdCB0ZXN0VXJsID0gJ2h0dHBzOi8vYm90LnNhbm55c29mdC5jb20nO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wYWdlLmdvdG8odGVzdFVybCk7XG4gICAgICAgICAgICAvLyBTYXZlIGEgc2NyZWVuc2hvdCBvZiB0aGUgcmVzdWx0cy5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGFnZS5zY3JlZW5zaG90KHsgcGF0aDogJ2hlYWRsZXNzLWV2YXNpb24tcmVzdWx0LnBuZycgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb25maWcubG9nX2h0dHBfaGVhZGVycyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5tZXRhZGF0YS5odHRwX2hlYWRlcnMgPSBhd2FpdCBtZXRhLmdldF9odHRwX2hlYWRlcnModGhpcy5wYWdlKTtcbiAgICAgICAgICAgIGRlYnVnKCd0aGlzLm1ldGFkYXRhLmh0dHBfaGVhZGVycz0lTycsIHRoaXMubWV0YWRhdGEuaHR0cF9oZWFkZXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5sb2dfaXBfYWRkcmVzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbGV0IGlwaW5mbyA9IGF3YWl0IG1ldGEuZ2V0X2lwX2RhdGEodGhpcy5wYWdlKTtcbiAgICAgICAgICAgIHRoaXMubWV0YWRhdGEuaXBpbmZvID0gaXBpbmZvO1xuICAgICAgICAgICAgZGVidWcoJ3RoaXMubWV0YWRhdGEuaXBpbmZvJywgdGhpcy5tZXRhZGF0YS5pcGluZm8pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgdGhhdCBvdXIgcHJveHkgaXMgd29ya2luZyBieSBjb25maXJtaW5nXG4gICAgICAgIC8vIHRoYXQgaXBpbmZvLmlvIHNlZXMgdGhlIHByb3h5IElQIGFkZHJlc3NcbiAgICAgICAgaWYgKHRoaXMucHJveHkgJiYgdGhpcy5jb25maWcubG9nX2lwX2FkZHJlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGRlYnVnKGAke3RoaXMubWV0YWRhdGEuaXBpbmZvPy5pcH0gdnMgJHt0aGlzLnByb3h5fWApO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgaXAgcmV0dXJuZWQgYnkgaXBpbmZvIGlzIG5vdCBhIHN1YnN0cmluZyBvZiBvdXIgcHJveHlzdHJpbmcsIGdldCB0aGUgaGVjayBvdXR0YSBoZXJlXG4gICAgICAgICAgICBpZiAodGhpcy5tZXRhZGF0YS5pcGluZm8/LmlwICYmICghdGhpcy5wcm94eS5pbmNsdWRlcyh0aGlzLm1ldGFkYXRhLmlwaW5mbz8uaXApKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUHJveHkgb3V0cHV0IGlwICR7dGhpcy5wcm94eX0gZG9lcyBub3QgbWF0Y2ggd2l0aCBwcm92aWRlZCBvbmVgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgVXNpbmcgdmFsaWQgUHJveHk6ICR7dGhpcy5wcm94eX1gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubG9hZF9zdGFydF9wYWdlKCk7XG4gICAgfVxuICAgIC8qKlxuICAqXG4gICogQHJldHVybnMgdHJ1ZSBpZiBzdGFydHBhZ2Ugd2FzIGxvYWRlZCBjb3JyZWN0bHkuXG4gICovXG4gICAgYXN5bmMgbG9hZF9sb2dpbl9wYWdlKCkge1xuXG4gICAgfVxuICAgIC8qKlxuICAgICpcbiAgICAqIEByZXR1cm5zIHRydWUgaWYgc3RhcnRwYWdlIHdhcyBsb2FkZWQgY29ycmVjdGx5LlxuICAgICovXG4gICAgYXN5bmMgbG9hZF9zdGFydF9wYWdlKCkge1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIG1ha2UgbG9naW4gYWN0aW9uXG4gICAgICovXG4gICAgYXN5bmMgbWFrZWxvZ2luYWN0aW9uKCk6IFByb21pc2U8YW55fGJvb2xlYW4+IHtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiB1c2VyIGxvZ2luIGJ5IHRoZWlyIGhhbmRcbiAgICAgKi9cbiAgICBhc3luYyB1c2VybG9naW5hY3Rpb24oKSB7XG5cbiAgICB9XG5cbiAgICBhc3luYyBzZWFyY2hkYXRhKHNlYWNob2JqOiBTZWFyY2hvYmplY3QpOlByb21pc2U8YW55fEFycmF5PExpbmt1cmw+PntcblxuICAgIH0gXG5cbiAgICAvKipcbiAgICAgKiB1c2Ugd29ya2VyIHRvIHNlYXJjaCBkYXRhXG4gICAgICogQHBhcmFtIG9iamVjdCBrZXl3b3JkIFxuICAgICAqL1xuICAgIGFzeW5jIHdvcmtlcnNlYXJjaGRhdGEod29ya2Vyc2VhY2g6d29zZWFyY2hPYmopIHtcbiAgICBkZWJ1Zygnd29ya2VyPSVvJyx3b3JrZXJzZWFjaC53b3JrZXIsIHRoaXMuY29uZmlnLmtleXdvcmRzKTtcblxuICAgIGlmICh3b3JrZXJzZWFjaC5wYWdlKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IHdvcmtlcnNlYWNoLnBhZ2U7XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5wYWdlLnNldFZpZXdwb3J0KHsgd2lkdGg6IDEyODAsIGhlaWdodDogODAwIH0pO1xuICAgIGF3YWl0IHRoaXMubG9hZF9icm93c2VyX2VuZ2luZSgpXG4gICAgY29uc3QgbGlua3MgPSBhd2FpdCB0aGlzLnNlYXJjaGRhdGEoeyBrZXl3b3JkOiB0aGlzLmNvbmZpZy5rZXl3b3JkcyB9KVxuICAgIGNvbnN0IHJlbW90ZVNvdXJtb2RlbD1uZXcgUmVtb3RlU291cmNlKCk7XG4gICAgZGVidWcobGlua3MpXG4gICAgLy9oYW5kbGUgdGhlIGxpbmtzXG4gICAgbGlua3M/Lm1hcChsaW5rSXRlbT0+e1xuICAgICAgIGxldCBsaW5rb2JqIDogTGlua2RhdGE9e3RpdGxlOmxpbmtJdGVtLnRpdGxlLHVybDpsaW5rSXRlbS5saW5rLGxhbmc6bGlua0l0ZW0ubGFuZyxzb2NpYWx0YXNrX2lkOmxpbmtJdGVtLnRhc2tpZH1cbiAgICAgICAgZGVidWcobGlua29iailcbiAgICAvLyAgICByZW1vdGVTb3VybW9kZWwuc2F2ZUxpbmtyZW1vdGUobGlua29iailcbiAgICB9KVxuXG59XG5cbn1cbi8vIFRoaXMgaXMgd2hlcmUgd2UnbGwgcHV0IHRoZSBjb2RlIHRvIGdldCBhcm91bmQgdGhlIHRlc3RzLlxuYXN5bmMgZnVuY3Rpb24gZXZhZGVDaHJvbWVIZWFkbGVzc0RldGVjdGlvbihwYWdlKSB7XG5cbiAgICAvLyBQYXNzIHRoZSBXZWJkcml2ZXIgVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIC8vIGNvbnN0IG5ld1Byb3RvID0gbmF2aWdhdG9yLl9fcHJvdG9fXztcbiAgICAgICAgY29uc3QgbmV3UHJvdG8gPU9iamVjdC5nZXRQcm90b3R5cGVPZihuYXZpZ2F0b3IpO1xuICAgICAgICBkZWxldGUgbmV3UHJvdG8ud2ViZHJpdmVyO1xuICAgICAgICAvLyBuYXZpZ2F0b3IuX19wcm90b19fID0gbmV3UHJvdG87XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihuYXZpZ2F0b3IsbmV3UHJvdG8pO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0aGUgQ2hyb21lIFRlc3QuXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICAvLyBpbnRlcmZhY2UgbW9ja09ialR5cGUgZXh0ZW5kcyB0eXBlb2YgY2hyb21lIHtcbiAgICAgICAgLy8gICAgIGNocm9tZTogb2JqZWN0LFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIFdlIGNhbiBtb2NrIHRoaXMgaW4gYXMgbXVjaCBkZXB0aCBhcyB3ZSBuZWVkIGZvciB0aGUgdGVzdC5cbiAgICAgICAgY29uc3QgbW9ja09iaiA9IHtcbiAgICAgICAgICAgIGFwcDoge1xuICAgICAgICAgICAgICAgIGlzSW5zdGFsbGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3ZWJzdG9yZToge1xuICAgICAgICAgICAgICAgIG9uSW5zdGFsbFN0YWdlQ2hhbmdlZDoge30sXG4gICAgICAgICAgICAgICAgb25Eb3dubG9hZFByb2dyZXNzOiB7fSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBydW50aW1lOiB7XG4gICAgICAgICAgICAgICAgUGxhdGZvcm1Pczoge1xuICAgICAgICAgICAgICAgICAgICBNQUM6ICdtYWMnLFxuICAgICAgICAgICAgICAgICAgICBXSU46ICd3aW4nLFxuICAgICAgICAgICAgICAgICAgICBBTkRST0lEOiAnYW5kcm9pZCcsXG4gICAgICAgICAgICAgICAgICAgIENST1M6ICdjcm9zJyxcbiAgICAgICAgICAgICAgICAgICAgTElOVVg6ICdsaW51eCcsXG4gICAgICAgICAgICAgICAgICAgIE9QRU5CU0Q6ICdvcGVuYnNkJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFBsYXRmb3JtQXJjaDoge1xuICAgICAgICAgICAgICAgICAgICBBUk06ICdhcm0nLFxuICAgICAgICAgICAgICAgICAgICBYODZfMzI6ICd4ODYtMzInLFxuICAgICAgICAgICAgICAgICAgICBYODZfNjQ6ICd4ODYtNjQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgUGxhdGZvcm1OYWNsQXJjaDoge1xuICAgICAgICAgICAgICAgICAgICBBUk06ICdhcm0nLFxuICAgICAgICAgICAgICAgICAgICBYODZfMzI6ICd4ODYtMzInLFxuICAgICAgICAgICAgICAgICAgICBYODZfNjQ6ICd4ODYtNjQnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgUmVxdWVzdFVwZGF0ZUNoZWNrU3RhdHVzOiB7XG4gICAgICAgICAgICAgICAgICAgIFRIUk9UVExFRDogJ3Rocm90dGxlZCcsXG4gICAgICAgICAgICAgICAgICAgIE5PX1VQREFURTogJ25vX3VwZGF0ZScsXG4gICAgICAgICAgICAgICAgICAgIFVQREFURV9BVkFJTEFCTEU6ICd1cGRhdGVfYXZhaWxhYmxlJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIE9uSW5zdGFsbGVkUmVhc29uOiB7XG4gICAgICAgICAgICAgICAgICAgIElOU1RBTEw6ICdpbnN0YWxsJyxcbiAgICAgICAgICAgICAgICAgICAgVVBEQVRFOiAndXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgQ0hST01FX1VQREFURTogJ2Nocm9tZV91cGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICBTSEFSRURfTU9EVUxFX1VQREFURTogJ3NoYXJlZF9tb2R1bGVfdXBkYXRlJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIE9uUmVzdGFydFJlcXVpcmVkUmVhc29uOiB7XG4gICAgICAgICAgICAgICAgICAgIEFQUF9VUERBVEU6ICdhcHBfdXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgT1NfVVBEQVRFOiAnb3NfdXBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgUEVSSU9ESUM6ICdwZXJpb2RpYycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIC8vIGlmKHdpbmRvdy5uYXZpZ2F0b3IuY2hyb21lKXtcbiAgICAgICAgLy8gd2luZG93Lm5hdmlnYXRvci5jaHJvbWUgPSBtb2NrT2JqO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHdpbmRvdy5jaHJvbWUgPSBtb2NrT2JqO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0aGUgUGVybWlzc2lvbnMgVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsUXVlcnkgPSB3aW5kb3cubmF2aWdhdG9yLnBlcm1pc3Npb25zLnF1ZXJ5O1xuICAgICAgICAvLyB3aW5kb3cubmF2aWdhdG9yLnBlcm1pc3Npb25zLl9fcHJvdG9fXy5xdWVyeSA9IHBhcmFtZXRlcnMgPT5cbiAgICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKHdpbmRvdy5uYXZpZ2F0b3IucGVybWlzc2lvbnMpLnF1ZXJ5ID0gcGFyYW1ldGVycyA9PlxuICAgICAgICAgICAgXG4gICAgICAgIHBhcmFtZXRlcnMubmFtZSA9PT0gJ25vdGlmaWNhdGlvbnMnXG4gICAgICAgICAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoeyBzdGF0ZTogTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gfSlcbiAgICAgICAgICAgICAgICA6IG9yaWdpbmFsUXVlcnkocGFyYW1ldGVycyk7XG5cbiAgICAgICAgLy8gSW5zcGlyZWQgYnk6IGh0dHBzOi8vZ2l0aHViLmNvbS9pa2FyaWVuYXRvci9waGFudG9tanNfaGlkZV9hbmRfc2Vlay9ibG9iL21hc3Rlci81LnNwb29mRnVuY3Rpb25CaW5kLmpzXG4gICAgICAgIGNvbnN0IG9sZENhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcblxuICAgICAgICBmdW5jdGlvbiBjYWxsKCkge1xuICAgICAgICAgICAgcmV0dXJuIG9sZENhbGwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsID0gY2FsbDtcblxuICAgICAgICBjb25zdCBuYXRpdmVUb1N0cmluZ0Z1bmN0aW9uU3RyaW5nID0gRXJyb3IudG9TdHJpbmcoKS5yZXBsYWNlKC9FcnJvci9nLCBcInRvU3RyaW5nXCIpO1xuICAgICAgICBjb25zdCBvbGRUb1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuICAgICAgICBmdW5jdGlvbiBmdW5jdGlvblRvU3RyaW5nKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMgPT09IHdpbmRvdy5uYXZpZ2F0b3IucGVybWlzc2lvbnMucXVlcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJmdW5jdGlvbiBxdWVyeSgpIHsgW25hdGl2ZSBjb2RlXSB9XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcyA9PT0gZnVuY3Rpb25Ub1N0cmluZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuYXRpdmVUb1N0cmluZ0Z1bmN0aW9uU3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9sZENhbGwuY2FsbChvbGRUb1N0cmluZywgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvblRvU3RyaW5nO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0aGUgUGx1Z2lucyBMZW5ndGggVGVzdC5cbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlT25OZXdEb2N1bWVudCgoKSA9PiB7XG4gICAgICAgIC8vIE92ZXJ3cml0ZSB0aGUgYHBsdWdpbnNgIHByb3BlcnR5IHRvIHVzZSBhIGN1c3RvbSBnZXR0ZXIuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXZpZ2F0b3IsICdwbHVnaW5zJywge1xuICAgICAgICAgICAgLy8gVGhpcyBqdXN0IG5lZWRzIHRvIGhhdmUgYGxlbmd0aCA+IDBgIGZvciB0aGUgY3VycmVudCB0ZXN0LFxuICAgICAgICAgICAgLy8gYnV0IHdlIGNvdWxkIG1vY2sgdGhlIHBsdWdpbnMgdG9vIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgICAgIGdldDogKCkgPT4gWzEsIDIsIDMsIDQsIDVdXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gUGFzcyB0aGUgTGFuZ3VhZ2VzIFRlc3QuXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICAvLyBPdmVyd3JpdGUgdGhlIGBwbHVnaW5zYCBwcm9wZXJ0eSB0byB1c2UgYSBjdXN0b20gZ2V0dGVyLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmF2aWdhdG9yLCAnbGFuZ3VhZ2VzJywge1xuICAgICAgICAgICAgZ2V0OiAoKSA9PiBbJ2VuLVVTJywgJ2VuJ11cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBQYXNzIHRoZSBpZnJhbWUgVGVzdFxuICAgIGF3YWl0IHBhZ2UuZXZhbHVhdGVPbk5ld0RvY3VtZW50KCgpID0+IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUxJRnJhbWVFbGVtZW50LnByb3RvdHlwZSwgJ2NvbnRlbnRXaW5kb3cnLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFBhc3MgdG9TdHJpbmcgdGVzdCwgdGhvdWdoIGl0IGJyZWFrcyBjb25zb2xlLmRlYnVnKCkgZnJvbSB3b3JraW5nXG4gICAgYXdhaXQgcGFnZS5ldmFsdWF0ZU9uTmV3RG9jdW1lbnQoKCkgPT4ge1xuICAgICAgICB3aW5kb3cuY29uc29sZS5kZWJ1ZyA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLy8gY29uc3QgY2hlZXJpbyA9IHJlcXVpcmUoJ2NoZWVyaW8nKTtcbmltcG9ydCB7U29jaWFsU2NyYXBlciBhcyBTY3JhcGVyLFNjcmFwZU9wdGlvbnN9IGZyb20gJy4vc29jaWFsX3NjcmFwZXInO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jbGFzcyBZb3V0dWJlU2NyYXBlciBleHRlbmRzIFNjcmFwZXIge1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogU2NyYXBlT3B0aW9ucykge1xuICAgICAgICBzdXBlcihhcmdzKTsgICAgXG4gICAgfVxuXG5cbiAgICBhc3luYyBsb2FkX2xvZ2luX3BhZ2UoKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgc3RhcnRVcmwgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20nO1xuXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ1VzaW5nIGxvZ2luVXJsOiAnICsgc3RhcnRVcmwpO1xuICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0QnlwYXNzQ1NQKHRydWUpO1xuICAgICAgICB0aGlzLmxhc3RfcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnBhZ2UuZ290byhzdGFydFVybCk7XG4gICAgICAgIFxuICAgICAgICAvL2hpZGRlbiBpY29uXG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS5ldmFsdWF0ZSgoKSA9PiB7XG4gICAgICAgIHZhciBpY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvLWljb25cIik7XG4gICAgICAgIGlmKGljb24pe1xuICAgICAgICBpY29uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb25maWcudG1wcGF0aClcbiAgICAgICAgLy9hd2FpdCB0aGlzLnBhZ2Uud2FpdEZvclNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicVwiXScsIHsgdGltZW91dDogdGhpcy5TVEFOREFSRF9USU1FT1VUIH0pO1xuICAgICAgICAvL2F3YWl0IGZvciB1c2VyIHRvIHRha2UgYWN0aW9uXG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS53YWl0Rm9yU2VsZWN0b3IoJyNhdmF0YXItYnRuJyx7J3RpbWVvdXQnOjB9KTtcbiAgICAgICAgLy91c2VyIGhhcyBzdWNjZXNzIGxvZ2luXG4gICAgICAgIC8vc2F2ZSBjb29raWVzIFxuICAgICAgICBjb25zdCBjb29raWVzID0gYXdhaXQgdGhpcy5wYWdlLmNvb2tpZXMoKTtcbiAgICAgICAgXG4gICAgICAgIGF3YWl0IGZzLndyaXRlRmlsZSh0aGlzLmNvbmZpZy50bXBwYXRoKycvY29va2llcy5qc29uJywgSlNPTi5zdHJpbmdpZnkoY29va2llcywgbnVsbCwgMikpO1xuICAgICAgICAvLyBhd2FpdCBicm93c2VyLmNsb3NlKCk7XG4gICAgICAgIC8vIHJldHVybiB0cnVlO1xuICAgIH1cblxuXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgWW91dHViZVNjcmFwZXI6IFlvdXR1YmVTY3JhcGVyLFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gVXNlIFR5cGVTY3JpcHQgbW9kdWxlcyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNTc1ODU4NC9jYW5ub3QtcmVkZWNsYXJlLWJsb2NrLXNjb3BlZC12YXJpYWJsZVxuZXhwb3J0IHt9O1xuY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCBvcyA9IHJlcXVpcmUoXCJvc1wiKTtcbmNvbnN0IF8gPSByZXF1aXJlKFwibG9kYXNoXCIpO1xuY29uc3QgeyBjcmVhdGVMb2dnZXIsIGZvcm1hdCwgdHJhbnNwb3J0cyB9ID0gcmVxdWlyZShcIndpbnN0b25cIik7XG5jb25zdCB7IGNvbWJpbmUsIHRpbWVzdGFtcCwgcHJpbnRmIH0gPSBmb3JtYXQ7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKShcInNlLXNjcmFwZXI6U2NyYXBlTWFuYWdlclwiKTtcbmNvbnN0IHsgQ2x1c3RlciB9ID0gcmVxdWlyZShcInB1cHBldGVlci1jbHVzdGVyXCIpO1xuY29uc3QgdmFuaWxsYVB1cHBldGVlciA9IHJlcXVpcmUoXCJwdXBwZXRlZXJcIik7XG5jb25zdCB7IGFkZEV4dHJhIH0gPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhXCIpO1xuLy8gY29uc3QgU3RlYWx0aCA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmEtcGx1Z2luLXN0ZWFsdGhcIik7XG4vLyBjb25zdCBBZGJsb2NrZXJQbHVnaW4gPSByZXF1aXJlKFwicHVwcGV0ZWVyLWV4dHJhLXBsdWdpbi1hZGJsb2NrZXJcIik7XG5cbmNvbnN0IFVzZXJBZ2VudCA9IHJlcXVpcmUoXCJ1c2VyLWFnZW50c1wiKTtcbmNvbnN0IGZhY2Vib29rID0gcmVxdWlyZShcIi4vbW9kdWxlcy9mYWNlYm9va19zY3JhcGVyXCIpO1xuY29uc3QgeW91dHViZSA9IHJlcXVpcmUoXCIuL21vZHVsZXMveW91dHViZV9zY3JhcGVyXCIpO1xuY29uc3QgYmlsaWJpbGkgPSByZXF1aXJlKFwiLi9tb2R1bGVzL2JpbGliaWxpX3NjcmFwZXJcIik7XG4vLyBjb25zdCBiaW5nID0gcmVxdWlyZSgnLi9tb2R1bGVzL2JpbmcuanMnKTtcbi8vIGNvbnN0IHlhbmRleCA9IHJlcXVpcmUoJy4vbW9kdWxlcy95YW5kZXguanMnKTtcbi8vIGNvbnN0IGluZm9zcGFjZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy9pbmZvc3BhY2UuanMnKTtcbi8vIGNvbnN0IGR1Y2tkdWNrZ28gPSByZXF1aXJlKCcuL21vZHVsZXMvZHVja2R1Y2tnby5qcycpO1xuY29uc3QgQ3VzdG9tQ29uY3VycmVuY3lJbXBsID0gcmVxdWlyZShcIi4vY29uY3VycmVuY3ktaW1wbGVtZW50YXRpb25cIik7XG4vLyBjb25zdCBheGlvcyA9IHJlcXVpcmUoXCJheGlvc1wiKTtcbmNvbnN0IE1BWF9BTExPV0VEX0JST1dTRVJTID0gNjtcbi8vIGNvbnN0IHB1cHBldGVlciA9IHJlcXVpcmUoXCJwdXBwZXRlZXItZXh0cmFcIik7XG4vLyBjb25zdCBfU3RlYWx0aFBsdWdpbiA9IHJlcXVpcmUoJ3B1cHBldGVlci1leHRyYS1wbHVnaW4tc3RlYWx0aCcpO1xuLy8gY29uc3QgX0FkYmxvY2tlclBsdWdpbiA9IHJlcXVpcmUoJ3B1cHBldGVlci1leHRyYS1wbHVnaW4tYWRibG9ja2VyJyk7XG5cbmZ1bmN0aW9uIHdyaXRlX3Jlc3VsdHMoZm5hbWUsIGRhdGEpIHtcbiAgZnMud3JpdGVGaWxlU3luYyhmbmFtZSwgZGF0YSwgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHRocm93IGVycjtcbiAgICBjb25zb2xlLmxvZyhgUmVzdWx0cyB3cml0dGVuIHRvIGZpbGUgJHtmbmFtZX1gKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlYWRfa2V5d29yZHNfZnJvbV9maWxlKGZuYW1lKSB7XG4gIGxldCBrd3MgPSBmcy5yZWFkRmlsZVN5bmMoZm5hbWUpLnRvU3RyaW5nKCkuc3BsaXQob3MuRU9MKTtcbiAgLy8gY2xlYW4ga2V5d29yZHNcbiAga3dzID0ga3dzLmZpbHRlcigoa3cpID0+IHtcbiAgICByZXR1cm4ga3cudHJpbSgpLmxlbmd0aCA+IDA7XG4gIH0pO1xuICByZXR1cm4ga3dzO1xufVxuXG5cbmZ1bmN0aW9uIGdldFNjcmFwZXIoc2VhcmNoX2VuZ2luZTpzdHJpbmcsIGFyZ3M6YW55KSB7XG4gIGlmICh0eXBlb2Ygc2VhcmNoX2VuZ2luZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBuZXcge1xuICAgICAgZmFjZWJvb2s6IGZhY2Vib29rLkZhY2Vib29rU2NyYXBlcixcbiAgICAgIHlvdXR1YmU6IHlvdXR1YmUuWW91dHViZVNjcmFwZXIsXG4gICAgICBiaWxpYmlsaTogYmlsaWJpbGkuQmlsaWJpbGlTY3JhcGVyLFxuICAgIH1bc2VhcmNoX2VuZ2luZV0oYXJncyk7XG4gIH0gXG4gIC8vIGVsc2UgaWYgKHR5cGVvZiBzZWFyY2hfZW5naW5lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgLy8gICByZXR1cm4gbmV3IHNlYXJjaF9lbmdpbmUoYXJncyk7XG4gIC8vIH0gXG4gIGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBzb2NpYWwgcGxhdGZvcm0gbXVzdCBlaXRoZXIgYmUgYSBzdHJpbmcgb2YgY2xhc3MgKGZ1bmN0aW9uKWBcbiAgICApO1xuICB9XG59XG50eXBlIFNNY29uZmlnID17XG4gIGxvZ2dlcjp7aW5mbzpGdW5jdGlvbn07XG4gIGtleXdvcmRzOkFycmF5PHN0cmluZz47XG4gIHByb3hpZXM6QXJyYXk8c3RyaW5nPjtcbiAga2V5d29yZF9maWxlOnN0cmluZztcbiAgcHJveHlfZmlsZTpzdHJpbmc7XG4gIHVzZV9wcm94aWVzX29ubHk6Ym9vbGVhbjtcbiAgY3VzdG9tX2Z1bmM6c3RyaW5nO1xuICBjaHJvbWVfZmxhZ3M6QXJyYXk8c3RyaW5nPjtcbiAgcHVwcGV0ZWVyX2NsdXN0ZXJfY29uZmlnOntcbiAgICBtYXhDb25jdXJyZW5jeTpudW1iZXI7XG4gICAgbW9uaXRvcjpib29sZWFuO1xuICAgIHRpbWVvdXQ6bnVtYmVyO1xuICB9XG4gIHJhbmRvbV91c2VyX2FnZW50OmJvb2xlYW47XG4gIHVzZXJfYWdlbnQ6c3RyaW5nO1xuICBoZWFkbGVzczpib29sZWFuO1xuICBwbGF0Zm9ybTpzdHJpbmc7XG4gIHRhc2tpZD86bnVtYmVyO1xufVxuZXhwb3J0IGNsYXNzIFNjcmFwZU1hbmFnZXIge1xuICBjbHVzdGVyOntleGVjdXRlOkZ1bmN0aW9uO2lkbGU6RnVuY3Rpb247Y2xvc2U6RnVuY3Rpb259O1xuICBwbHVnZ2FibGU6e3N0YXJ0X2Jyb3dzZXI/OkZ1bmN0aW9uLGNsb3NlX2Jyb3dzZXI/OkZ1bmN0aW9uLGhhbmRsZV9yZXN1bHRzPzpGdW5jdGlvbixoYW5kbGVfbWV0YWRhdGE/OkZ1bmN0aW9ufTtcbiAgc2NyYXBlcjp7cnVuTG9naW46RnVuY3Rpb247d29ya2Vyc2VhcmNoZGF0YTpGdW5jdGlvbn07XG4gIGNvbnRleHQ6b2JqZWN0O1xuICBjb25maWc6U01jb25maWc7XG4gIGxvZ2dlcjp7aW5mbzpGdW5jdGlvbn07XG4gIGJyb3dzZXI6e25ld1BhZ2U6RnVuY3Rpb259O1xuICBwYWdlOm9iamVjdDtcbiAgbnVtQ2x1c3RlcnM6bnVtYmVyO1xuICB0bXBwYXRoOnN0cmluZztcbiAgcnVuTG9naW46RnVuY3Rpb247XG4gIGNvbnN0cnVjdG9yKGNvbmZpZywgY29udGV4dCA9IHt9KSB7XG4gICAgdGhpcy5jbHVzdGVyID0gbnVsbDtcbiAgICB0aGlzLnBsdWdnYWJsZSA9IG51bGw7XG4gICAgdGhpcy5zY3JhcGVyID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIFxuICAgIC8vIGF3YWl0IHRoaXMuZ2V0UmVtb3RlQ29uZmlnKGNhbXBhaWduSWQpXG5cbiAgICB0aGlzLmNvbmZpZyA9IF8uZGVmYXVsdHMoY29uZmlnLCB7XG4gICAgICAvLyByZW1vdGVfYWRkOmVuZGNvZmlnLlJFTU9URUFERCxcbiAgICAgIC8vIHJlbW90ZV91c2VybmFtZTplbmRjb2ZpZy5VU0VSTkFNRSxcbiAgICAgIC8vIHJlbW90ZV9wYXNzd29yZDplbmRjb2ZpZy5QQVNTV09SRCxcbiAgICAgIC8vIHRoZSB1c2VyIGFnZW50IHRvIHNjcmFwZSB3aXRoXG4gICAgICB1c2VyX2FnZW50OlxuICAgICAgICBcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMDcuMC4wLjAgU2FmYXJpLzUzNy4zNlwiLFxuICAgICAgLy8gaWYgcmFuZG9tX3VzZXJfYWdlbnQgaXMgc2V0IHRvIFRydWUsIGEgcmFuZG9tIHVzZXIgYWdlbnQgaXMgY2hvc2VuXG4gICAgICByYW5kb21fdXNlcl9hZ2VudDogZmFsc2UsXG4gICAgICAvLyB3aGV0aGVyIHRvIHNlbGVjdCBtYW51YWwgc2V0dGluZ3MgaW4gdmlzaWJsZSBtb2RlXG4gICAgICBzZXRfbWFudWFsX3NldHRpbmdzOiBmYWxzZSxcbiAgICAgIC8vIGxvZyBpcCBhZGRyZXNzIGRhdGFcbiAgICAgIGxvZ19pcF9hZGRyZXNzOiBmYWxzZSxcbiAgICAgIC8vIGxvZyBodHRwIGhlYWRlcnNcbiAgICAgIGxvZ19odHRwX2hlYWRlcnM6IGZhbHNlLFxuICAgICAgLy8gaG93IGxvbmcgdG8gc2xlZXAgYmV0d2VlbiByZXF1ZXN0cy4gYSByYW5kb20gc2xlZXAgaW50ZXJ2YWwgd2l0aGluIHRoZSByYW5nZSBbYSxiXVxuICAgICAgLy8gaXMgZHJhd24gYmVmb3JlIGV2ZXJ5IHJlcXVlc3QuIGVtcHR5IHN0cmluZyBmb3Igbm8gc2xlZXBpbmcuXG4gICAgICBzbGVlcF9yYW5nZTogbnVsbCxcblxuICAgICAgbG9nZ2VyOiBjcmVhdGVMb2dnZXIoe1xuICAgICAgICBsZXZlbDogXCJpbmZvXCIsXG4gICAgICAgIGZvcm1hdDogY29tYmluZShcbiAgICAgICAgICB0aW1lc3RhbXAoKSxcbiAgICAgICAgICBwcmludGYoKHsgbGV2ZWwsIG1lc3NhZ2UsIHRpbWVzdGFtcCB9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGltZXN0YW1wfSBbJHtsZXZlbH1dICR7bWVzc2FnZX1gO1xuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICAgIHRyYW5zcG9ydHM6IFtuZXcgdHJhbnNwb3J0cy5Db25zb2xlKCldLFxuICAgICAgfSksXG4gICAgICBwbGF0Zm9ybTogXCJmYWNlYm9va1wiLFxuICAgICAga2V5d29yZHM6IFtcIm5vZGVqcyByb2Nrc1wiXSxcbiAgICAgIC8vIHdoZXRoZXIgdG8gc3RhcnQgdGhlIGJyb3dzZXIgaW4gaGVhZGxlc3MgbW9kZVxuICAgICAgLy8gaGVhZGxlc3M6IHRydWUsXG4gICAgICAvLyBzcGVjaWZ5IGZsYWdzIHBhc3NlZCB0byBjaHJvbWUgaGVyZVxuICAgICAgLy8gQWJvdXQgb3VyIGRlZmF1bHRzIHZhbHVlcyBodHRwczovL3BldGVyLnNoL2V4cGVyaW1lbnRzL2Nocm9taXVtLWNvbW1hbmQtbGluZS1zd2l0Y2hlcy9cbiAgICAgIGNocm9tZV9mbGFnczogW1xuICAgICAgICBcIi0tZGlzYWJsZS1pbmZvYmFyc1wiLFxuICAgICAgICBcIi0td2luZG93LXBvc2l0aW9uPTAsMFwiLFxuICAgICAgICBcIi0taWdub3JlLWNlcnRpZmNhdGUtZXJyb3JzXCIsXG4gICAgICAgIFwiLS1pZ25vcmUtY2VydGlmY2F0ZS1lcnJvcnMtc3BraS1saXN0XCIsXG4gICAgICAgIFwiLS1uby1zYW5kYm94XCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLXNldHVpZC1zYW5kYm94XCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWRldi1zaG0tdXNhZ2VcIixcbiAgICAgICAgXCItLWRpc2FibGUtYWNjZWxlcmF0ZWQtMmQtY2FudmFzXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWdwdVwiLFxuICAgICAgICBcIi0td2luZG93LXNpemU9MTI4MCw3NjhcIixcbiAgICAgICAgXCItLXN0YXJ0LWZ1bGxzY3JlZW5cIixcbiAgICAgICAgXCItLWhpZGUtc2Nyb2xsYmFyc1wiLFxuICAgICAgICBcIi0tZGlzYWJsZS1ub3RpZmljYXRpb25zXCIsXG4gICAgICBdLFxuICAgICAgLy9maXggZ29vZ2xlIGFjY291bnQgY2FuIG5vdCBsb2dpblxuICAgICAgaWdub3JlRGVmYXVsdEFyZ3M6IFtcbiAgICAgICAgXCItLWVuYWJsZS1hdXRvbWF0aW9uXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWV4dGVuc2lvbnNcIixcbiAgICAgICAgXCItLWRpc2FibGUtZGVmYXVsdC1hcHBzXCIsXG4gICAgICAgIFwiLS1kaXNhYmxlLWNvbXBvbmVudC1leHRlbnNpb25zLXdpdGgtYmFja2dyb3VuZC1wYWdlc1wiLFxuICAgICAgXSxcbiAgICAgIC8vIHRoZSBudW1iZXIgb2YgcGFnZXMgdG8gc2NyYXBlIGZvciBlYWNoIGtleXdvcmRcbiAgICAgIG51bV9wYWdlczogMSxcbiAgICAgIC8vIHBhdGggdG8gb3V0cHV0IGZpbGUsIGRhdGEgd2lsbCBiZSBzdG9yZWQgaW4gSlNPTlxuICAgICAgb3V0cHV0X2ZpbGU6IFwiXCIsXG4gICAgICAvLyB3aGV0aGVyIHRvIGFsc28gcGFzc3RocnUgYWxsIHRoZSBodG1sIG91dHB1dCBvZiB0aGUgc2VycCBwYWdlc1xuICAgICAgaHRtbF9vdXRwdXQ6IGZhbHNlLFxuICAgICAgLy8gd2hldGhlciB0byBzdHJpcCBKUyBhbmQgQ1NTIGZyb20gdGhlIGh0bWxfb3V0cHV0XG4gICAgICAvLyBoYXMgb25seSBhbiBlZmZlY3QgaWYgYGh0bWxfb3V0cHV0YCBpcyB0cnVlXG4gICAgICBjbGVhbl9odG1sX291dHB1dDogdHJ1ZSxcbiAgICAgIC8vIHJlbW92ZSBhbGwgZGF0YSBpbWFnZXMgZnJvbSB0aGUgaHRtbFxuICAgICAgY2xlYW5fZGF0YV9pbWFnZXM6IHRydWUsXG4gICAgICAvLyB3aGV0aGVyIHRvIHJldHVybiBhIHNjcmVlbnNob3Qgb2Ygc2VycCBwYWdlcyBhcyBiNjQgZGF0YVxuICAgICAgc2NyZWVuX291dHB1dDogZmFsc2UsXG4gICAgICAvLyBTY3JhcGUgdXJsIGZyb20gbG9jYWwgZmlsZS4gTWFpbmx5IHVzZWQgZm9yIHRlc3RpbmcuXG4gICAgICBzY3JhcGVfZnJvbV9maWxlOiBcIlwiLFxuICAgICAgLy8gd2hldGhlciB0byBwcmV2ZW50IGltYWdlcywgY3NzLCBmb250cyBhbmQgbWVkaWEgZnJvbSBiZWluZyBsb2FkZWRcbiAgICAgIC8vIHdpbGwgc3BlZWQgdXAgc2NyYXBpbmcgYSBncmVhdCBkZWFsXG4gICAgICBibG9ja19hc3NldHM6IHRydWUsXG4gICAgICAvLyBwYXRoIHRvIGpzIG1vZHVsZSB0aGF0IGV4dGVuZHMgZnVuY3Rpb25hbGl0eVxuICAgICAgLy8gdGhpcyBtb2R1bGUgc2hvdWxkIGV4cG9ydCB0aGUgZnVuY3Rpb25zOlxuICAgICAgLy8gZ2V0X2Jyb3dzZXIsIGhhbmRsZV9tZXRhZGF0YSwgY2xvc2VfYnJvd3NlclxuICAgICAgLy9jdXN0b21fZnVuYzogcmVzb2x2ZSgnZXhhbXBsZXMvcGx1Z2dhYmxlLmpzJyksXG4gICAgICBjdXN0b21fZnVuYzogbnVsbCxcbiAgICAgIHRocm93X29uX2RldGVjdGlvbjogZmFsc2UsXG4gICAgICAvLyBMaXN0IG9mIHByb3hpZXMgdG8gdXNlIFsnc29ja3M1Oi8vNzguOTQuMTcyLjQyOjEwODAnLCAnaHR0cDovL2xvY2FsaG9zdDoxMDgwJ11cbiAgICAgIHByb3hpZXM6IG51bGwsXG4gICAgICAvLyBhIGZpbGUgd2l0aCBvbmUgcHJveHkgcGVyIGxpbmUuIEV4YW1wbGU6XG4gICAgICAvLyBzb2NrczU6Ly83OC45NC4xNzIuNDI6MTA4MFxuICAgICAgLy8gaHR0cDovLzExOC4xNzQuMjMzLjEwOjQ4NDAwXG4gICAgICBwcm94eV9maWxlOiBcIlwiLFxuICAgICAgLy8gd2hldGhlciB0byB1c2UgcHJveGllcyBvbmx5XG4gICAgICAvLyB3aGVuIHRoaXMgaXMgc2V0IHRvIHRydWUsIHNlLXNjcmFwZXIgd2lsbCBub3QgdXNlXG4gICAgICAvLyB5b3VyIGRlZmF1bHQgSVAgYWRkcmVzc1xuICAgICAgdXNlX3Byb3hpZXNfb25seTogZmFsc2UsXG4gICAgICAvLyBjaGVjayBpZiBoZWFkbGVzcyBjaHJvbWUgZXNjYXBlcyBjb21tb24gZGV0ZWN0aW9uIHRlY2huaXF1ZXNcbiAgICAgIC8vIHRoaXMgaXMgYSBxdWljayB0ZXN0IGFuZCBzaG91bGQgYmUgdXNlZCBmb3IgZGVidWdnaW5nXG4gICAgICB0ZXN0X2V2YXNpb246IGZhbHNlLFxuICAgICAgYXBwbHlfZXZhc2lvbl90ZWNobmlxdWVzOiB0cnVlLFxuICAgICAgLy8gc2V0dGluZ3MgZm9yIHB1cHBldGVlci1jbHVzdGVyXG4gICAgICBwdXBwZXRlZXJfY2x1c3Rlcl9jb25maWc6IHtcbiAgICAgICAgdGltZW91dDogMzAgKiA2MCAqIDEwMDAsIC8vIG1heCB0aW1lb3V0IHNldCB0byAzMCBtaW51dGVzXG4gICAgICAgIG1vbml0b3I6IGZhbHNlLFxuICAgICAgICBjb25jdXJyZW5jeTogQ2x1c3Rlci5DT05DVVJSRU5DWV9CUk9XU0VSLFxuICAgICAgICBtYXhDb25jdXJyZW5jeTogMSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgXG4gICAgdGhpcy5sb2dnZXIgPSB0aGlzLmNvbmZpZy5sb2dnZXI7XG5cbiAgICBpZiAoY29uZmlnLnNsZWVwX3JhbmdlKSB7XG4gICAgICAvLyBwYXJzZSBhbiBhcnJheVxuICAgICAgY29uZmlnLnNsZWVwX3JhbmdlID0gZXZhbChjb25maWcuc2xlZXBfcmFuZ2UpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGNvbmZpZy5zbGVlcF9yYW5nZS5sZW5ndGggIT09IDIgXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgXCJzbGVlcF9yYW5nZSBpcyBub3QgYSB2YWxpZCBhcnJheSBvZiB0d28gaW50ZWdlcnMuXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZzLmV4aXN0c1N5bmModGhpcy5jb25maWcua2V5d29yZF9maWxlKSkge1xuICAgICAgdGhpcy5jb25maWcua2V5d29yZHMgPSByZWFkX2tleXdvcmRzX2Zyb21fZmlsZSh0aGlzLmNvbmZpZy5rZXl3b3JkX2ZpbGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZy5wcm94aWVzICYmIHRoaXMuY29uZmlnLnByb3h5X2ZpbGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJFaXRoZXIgdXNlIGEgcHJveHlfZmlsZSBvciBzcGVjaWZ5IGEgcHJveHkgZm9yIGFsbCBjb25uZWN0aW9ucy4gRG8gbm90IHVzZSBib3RoIG9wdGlvbnMuXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLnByb3h5X2ZpbGUpIHtcbiAgICAgIHRoaXMuY29uZmlnLnByb3hpZXMgPSByZWFkX2tleXdvcmRzX2Zyb21fZmlsZSh0aGlzLmNvbmZpZy5wcm94eV9maWxlKTtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oYCR7dGhpcy5jb25maWcucHJveGllcy5sZW5ndGh9IHByb3hpZXMgcmVhZCBmcm9tIGZpbGUuYCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5wcm94aWVzICYmIHRoaXMuY29uZmlnLnVzZV9wcm94aWVzX29ubHkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJNdXN0IHByb3ZpZGUgYXQgbGVhc3Qgb25lIHByb3h5IGluIHByb3hpZXMgaWYgeW91IGVuYWJsZSB1c2VfcHJveGllc19vbmx5XCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZGVidWcoXCJ0aGlzLmNvbmZpZz0lT1wiLCB0aGlzLmNvbmZpZyk7XG4gIH1cblxuICAvKlxuICAgKiBMYXVuY2hlcyB0aGUgcHVwcGV0ZWVyIGNsdXN0ZXIgb3IgYnJvd3Nlci5cbiAgICpcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBicm93c2VyIHdhcyBzdWNjZXNzZnVsbHkgbGF1bmNoZWQuIE90aGVyd2lzZSB3aWxsIHJldHVybiBmYWxzZS5cbiAgICovXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5jdXN0b21fZnVuYykge1xuICAgICAgaWYgKGZzLmV4aXN0c1N5bmModGhpcy5jb25maWcuY3VzdG9tX2Z1bmMpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgUGx1Z2dhYmxlQ2xhc3MgPSByZXF1aXJlKHRoaXMuY29uZmlnLmN1c3RvbV9mdW5jKTtcbiAgICAgICAgICB0aGlzLnBsdWdnYWJsZSA9IG5ldyBQbHVnZ2FibGVDbGFzcyh7XG4gICAgICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgICAgICAgY29udGV4dDogdGhpcy5jb250ZXh0LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGV4Y2VwdGlvbik7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBGaWxlIFwiJHt0aGlzLmNvbmZpZy5jdXN0b21fZnVuY31cIiBkb2VzIG5vdCBleGlzdCFgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNocm9tZV9mbGFncyA9IF8uY2xvbmUodGhpcy5jb25maWcuY2hyb21lX2ZsYWdzKTtcblxuICAgIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5zdGFydF9icm93c2VyKSB7XG4gICAgICAvLyBsYXVuY2hfYXJncy5jb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgIHRoaXMuYnJvd3NlciA9IGF3YWl0IHRoaXMucGx1Z2dhYmxlLnN0YXJ0X2Jyb3dzZXIoe1xuICAgICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgfSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIjIyOVwiKVxuICAgICAgdGhpcy5wYWdlID0gYXdhaXQgdGhpcy5icm93c2VyLm5ld1BhZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgXG4gICAgICAvLyBpZiBubyBjdXN0b20gc3RhcnRfYnJvd3NlciBmdW5jdGlvbmFsaXR5IHdhcyBnaXZlblxuICAgICAgLy8gdXNlIHB1cHBldGVlci1jbHVzdGVyIGZvciBzY3JhcGluZ1xuXG4gICAgICBsZXQgcHJveGllcztcbiAgICAgIC8vIGlmIHdlIGhhdmUgYXQgbGVhc3Qgb25lIHByb3h5LCBhbHdheXMgdXNlIENPTkNVUlJFTkNZX0JST1dTRVJcbiAgICAgIC8vIGFuZCBzZXQgbWF4Q29uY3VycmVuY3kgdG8gdGhpcy5jb25maWcucHJveGllcy5sZW5ndGggKyAxXG4gICAgICAvLyBlbHNlIHVzZSB3aGF0ZXZlciB0aGlzLmNvbmZpZ3VyYXRpb24gd2FzIHBhc3NlZFxuICAgICAgaWYgKHRoaXMuY29uZmlnLnByb3hpZXMgJiYgdGhpcy5jb25maWcucHJveGllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGJlY2F1c2Ugd2UgdXNlIHJlYWwgYnJvd3NlcnMsIHdlIHJhbiBvdXQgb2YgbWVtb3J5IG9uIG5vcm1hbCBsYXB0b3BzXG4gICAgICAgIC8vIHdoZW4gdXNpbmcgbW9yZSB0aGFuIG1heWJlIDUgb3IgNiBicm93c2Vycy5cbiAgICAgICAgLy8gdGhlcmVmb3JlIGhhcmRjb2RlIGEgbGltaXQgaGVyZVxuICAgICAgICAvLyBUT0RPIG5vdCBzdXJlIHRoaXMgd2hhdCB3ZSB3YW50XG4gICAgICAgIHRoaXMubnVtQ2x1c3RlcnMgPSBNYXRoLm1pbihcbiAgICAgICAgICB0aGlzLmNvbmZpZy5wcm94aWVzLmxlbmd0aCArICh0aGlzLmNvbmZpZy51c2VfcHJveGllc19vbmx5ID8gMCA6IDEpLFxuICAgICAgICAgIE1BWF9BTExPV0VEX0JST1dTRVJTXG4gICAgICAgICk7XG4gICAgICAgIHByb3hpZXMgPSBfLmNsb25lKHRoaXMuY29uZmlnLnByb3hpZXMpO1xuXG4gICAgICAgIC8vIEluc2VydCBhIGZpcnN0IGNvbmZpZyB3aXRob3V0IHByb3h5IGlmIHVzZV9wcm94eV9vbmx5IGlzIGZhbHNlXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy51c2VfcHJveGllc19vbmx5ID09PSBmYWxzZSkge1xuICAgICAgICAgIHByb3hpZXMudW5zaGlmdChudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5udW1DbHVzdGVycyA9IHRoaXMuY29uZmlnLnB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZy5tYXhDb25jdXJyZW5jeTtcbiAgICAgICAgcHJveGllcyA9IF8udGltZXModGhpcy5udW1DbHVzdGVycywgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFVzaW5nICR7dGhpcy5udW1DbHVzdGVyc30gY2x1c3RlcnMuYCk7XG5cbiAgICAgIC8vIEdpdmUgdGhlIHBlciBicm93c2VyIG9wdGlvbnNcbiAgICAgIGNvbnN0IHBlckJyb3dzZXJPcHRpb25zID0gXy5tYXAocHJveGllcywgKHByb3h5KSA9PiB7XG4gICAgICAgIGNvbnN0IHVzZXJBZ2VudCA9IHRoaXMuY29uZmlnLnJhbmRvbV91c2VyX2FnZW50XG4gICAgICAgICAgPyBuZXcgVXNlckFnZW50KHsgZGV2aWNlQ2F0ZWdvcnk6IFwiZGVza3RvcFwiIH0pLnRvU3RyaW5nKClcbiAgICAgICAgICA6IHRoaXMuY29uZmlnLnVzZXJfYWdlbnQ7XG4gICAgICAgIGxldCBhcmdzID0gY2hyb21lX2ZsYWdzLmNvbmNhdChbYC0tdXNlci1hZ2VudD0ke3VzZXJBZ2VudH1gXSk7XG5cbiAgICAgICAgaWYgKHByb3h5KSB7XG4gICAgICAgICAgYXJncyA9IGFyZ3MuY29uY2F0KFtgLS1wcm94eS1zZXJ2ZXI9JHtwcm94eX1gXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhlYWRsZXNzOiB0aGlzLmNvbmZpZy5oZWFkbGVzcyxcbiAgICAgICAgICBpZ25vcmVIVFRQU0Vycm9yczogdHJ1ZSxcbiAgICAgICAgICBhcmdzLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGRlYnVnKFwicGVyQnJvd3Nlck9wdGlvbnM9JU9cIiwgcGVyQnJvd3Nlck9wdGlvbnMpO1xuXG4gICAgICAvLyBwdXBwZXRlZXIudXNlKF9TdGVhbHRoUGx1Z2luKCkpO1xuICAgICAgLy8gcHVwcGV0ZWVyLnVzZShfQWRibG9ja2VyUGx1Z2luKCkpO1xuXG4gICAgICBjb25zdCBwdXBwZXRlZXIgPSBhZGRFeHRyYSh2YW5pbGxhUHVwcGV0ZWVyKTtcblxuICAgICAgLy8gQWRkIHN0ZWFsdGggcGx1Z2luIGFuZCB1c2UgZGVmYXVsdHMgKGFsbCB0cmlja3MgdG8gaGlkZSBwdXBwZXRlZXIgdXNhZ2UpXG4gICAgICAvLyAgcHVwcGV0ZWVyLnVzZShTdGVhbHRoKCkpO1xuXG4gICAgICAvLyBBZGQgYWRibG9ja2VyIHBsdWdpbiB0byBibG9jayBhbGwgYWRzIGFuZCB0cmFja2VycyAoc2F2ZXMgYmFuZHdpZHRoKVxuICAgICAgLy8gcHVwcGV0ZWVyLnVzZShBZGJsb2NrZXJQbHVnaW4oeyBibG9ja1RyYWNrZXJzOiB0cnVlIH0pKTtcblxuICAgICAgdGhpcy5jbHVzdGVyID0gYXdhaXQgQ2x1c3Rlci5sYXVuY2goe1xuICAgICAgICBwdXBwZXRlZXIsXG4gICAgICAgIG1vbml0b3I6IHRoaXMuY29uZmlnLnB1cHBldGVlcl9jbHVzdGVyX2NvbmZpZy5tb25pdG9yLFxuICAgICAgICB0aW1lb3V0OiB0aGlzLmNvbmZpZy5wdXBwZXRlZXJfY2x1c3Rlcl9jb25maWcudGltZW91dCwgLy8gbWF4IHRpbWVvdXQgc2V0IHRvIDMwIG1pbnV0ZXNcbiAgICAgICAgY29uY3VycmVuY3k6IEN1c3RvbUNvbmN1cnJlbmN5SW1wbCxcbiAgICAgICAgbWF4Q29uY3VycmVuY3k6IHRoaXMubnVtQ2x1c3RlcnMsXG4gICAgICAgIHB1cHBldGVlck9wdGlvbnM6IHtcbiAgICAgICAgICAvLyBwdXBwZXRlZXI6cHVwcGV0ZWVyLFxuICAgICAgICAgIHBlckJyb3dzZXJPcHRpb25zOiBwZXJCcm93c2VyT3B0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIGxvZ2luIHRoZSBzb2NpbGEgbWVkaWEgcGxhdGZvcm1cbiAgICovXG4gIGFzeW5jIGxvZ2luKHNjcmFwZV9jb25maWcgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIHNjcmFwZV9jb25maWcpO1xuXG4gICAgLy8gdmFyIHJlc3VsdHMgPSB7fTtcbiAgICAvLyB2YXIgbnVtX3JlcXVlc3RzID0gMDtcbiAgICAvLyB2YXIgbWV0YWRhdGEgPSB7fTtcbiAgICAvLyB2YXIgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcblxuICAgIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5zdGFydF9icm93c2VyKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZy5wbGF0Zm9ybSlcbiAgICAgIHRoaXMuc2NyYXBlciA9IGdldFNjcmFwZXIodGhpcy5jb25maWcucGxhdGZvcm0sIHtcbiAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgICAgY29udGV4dDogdGhpcy5jb250ZXh0LFxuICAgICAgICBwbHVnZ2FibGU6IHRoaXMucGx1Z2dhYmxlLFxuICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICAgIHRtcHBhdGg6IHRoaXMudG1wcGF0aCxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLnNjcmFwZXIucnVuTG9naW4odGhpcy5wYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRWFjaCBicm93c2VyIHdpbGwgZ2V0IE4vKEsrMSkga2V5d29yZHMgYW5kIHdpbGwgaXNzdWUgTi8oSysxKSAqIE0gdG90YWwgcmVxdWVzdHMgdG8gdGhlIHNlYXJjaCBlbmdpbmUuXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3B1cHBldGVlci9pc3N1ZXMvNjc4XG4gICAgICAvLyBUaGUgcXVlc3Rpb24gaXM6IElzIGl0IHBvc3NpYmxlIHRvIHNldCBwcm94aWVzIHBlciBQYWdlPyBQZXIgQnJvd3Nlcj9cbiAgICAgIC8vIGFzIGZhciBhcyBJIGNhbiBzZWUsIHB1cHBldGVlciBjbHVzdGVyIHVzZXMgdGhlIHNhbWUgcHVwcGV0ZWVyT3B0aW9uc1xuICAgICAgLy8gZm9yIGV2ZXJ5IGJyb3dzZXIgaW5zdGFuY2UuIFdlIHdpbGwgdXNlIG91ciBjdXN0b20gcHVwcGV0ZWVyLWNsdXN0ZXIgdmVyc2lvbi5cbiAgICAgIC8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3Byb3h5LWNoYWluXG4gICAgICAvLyB0aGlzIGFuc3dlciBsb29rcyBuaWNlOiBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lL3B1cHBldGVlci9pc3N1ZXMvNjc4I2lzc3VlY29tbWVudC0zODkwOTYwNzdcbiAgICAgIGxldCBjaHVua3MgPSBbXTtcbiAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdGhpcy5udW1DbHVzdGVyczsgbisrKSB7XG4gICAgICAgIGNodW5rcy5wdXNoKFtdKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5jb25maWcua2V5d29yZHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgY2h1bmtzW2sgJSB0aGlzLm51bUNsdXN0ZXJzXS5wdXNoKHRoaXMuY29uZmlnLmtleXdvcmRzW2tdKTtcbiAgICAgIH1cblxuICAgICAgZGVidWcoXCJjaHVua3M9JW9cIiwgY2h1bmtzKTtcblxuICAgICAgbGV0IGV4ZWNQcm9taXNlcyA9IFtdO1xuICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBjaHVua3MubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gXy5jbG9uZSh0aGlzLmNvbmZpZyk7XG4gICAgICAgIGNvbmZpZy5rZXl3b3JkcyA9IGNodW5rc1tjXTtcblxuICAgICAgICB2YXIgb2JqID0gZ2V0U2NyYXBlcih0aGlzLmNvbmZpZy5wbGF0Zm9ybSwge1xuICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgICAgIHBsdWdnYWJsZTogdGhpcy5wbHVnZ2FibGUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBib3VuZE1ldGhvZCA9IG9iai5ydW5Mb2dpbi5iaW5kKG9iaik7XG4gICAgICAgIGV4ZWNQcm9taXNlcy5wdXNoKHRoaXMuY2x1c3Rlci5leGVjdXRlKHt9LCBib3VuZE1ldGhvZCkpO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChleGVjUHJvbWlzZXMpO1xuXG4gICAgICAvLyBNZXJnZSByZXN1bHRzIGFuZCBtZXRhZGF0YSBwZXIga2V5d29yZFxuICAgICAgLy8gZm9yIChsZXQgcHJvbWlzZVJldHVybiBvZiBwcm9taXNlUmV0dXJucykge1xuICAgICAgLy8gICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0cywgcHJvbWlzZVJldHVybi5yZXN1bHRzKTtcbiAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKG1ldGFkYXRhLCBwcm9taXNlUmV0dXJuLm1ldGFkYXRhKTtcbiAgICAgIC8vICAgICBudW1fcmVxdWVzdHMgKz0gcHJvbWlzZVJldHVybi5udW1fcmVxdWVzdHM7XG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgLy8gbGV0IHRpbWVEZWx0YSA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7XG4gICAgLy8gbGV0IG1zX3Blcl9yZXF1ZXN0ID0gdGltZURlbHRhL251bV9yZXF1ZXN0cztcblxuICAgIC8vIHRoaXMubG9nZ2VyLmluZm8oYFNjcmFwZXIgdG9vayAke3RpbWVEZWx0YX1tcyB0byBwZXJmb3JtICR7bnVtX3JlcXVlc3RzfSByZXF1ZXN0cy5gKTtcbiAgICAvLyB0aGlzLmxvZ2dlci5pbmZvKGBPbiBhdmVyYWdlIG1zL3JlcXVlc3Q6ICR7bXNfcGVyX3JlcXVlc3R9bXMvcmVxdWVzdGApO1xuXG4gICAgLy8gaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9yZXN1bHRzKSB7XG4gICAgLy8gICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9yZXN1bHRzKHJlc3VsdHMpO1xuICAgIC8vIH1cblxuICAgIC8vIG1ldGFkYXRhLmVsYXBzZWRfdGltZSA9IHRpbWVEZWx0YS50b1N0cmluZygpO1xuICAgIC8vIG1ldGFkYXRhLm1zX3Blcl9rZXl3b3JkID0gbXNfcGVyX3JlcXVlc3QudG9TdHJpbmcoKTtcbiAgICAvLyBtZXRhZGF0YS5udW1fcmVxdWVzdHMgPSBudW1fcmVxdWVzdHM7XG5cbiAgICAvLyBkZWJ1ZygnbWV0YWRhdGE9JU8nLCBtZXRhZGF0YSk7XG5cbiAgICAvLyBpZiAodGhpcy5wbHVnZ2FibGUgJiYgdGhpcy5wbHVnZ2FibGUuaGFuZGxlX21ldGFkYXRhKSB7XG4gICAgLy8gICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9tZXRhZGF0YShtZXRhZGF0YSk7XG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKHRoaXMuY29uZmlnLm91dHB1dF9maWxlKSB7XG4gICAgLy8gICAgIHRoaXMubG9nZ2VyLmluZm8oYFdyaXRpbmcgcmVzdWx0cyB0byAke3RoaXMuY29uZmlnLm91dHB1dF9maWxlfWApO1xuICAgIC8vICAgICB3cml0ZV9yZXN1bHRzKHRoaXMuY29uZmlnLm91dHB1dF9maWxlLCBKU09OLnN0cmluZ2lmeShyZXN1bHRzLCBudWxsLCA0KSk7XG4gICAgLy8gfVxuXG4gICAgLy8gcmV0dXJuIHtcbiAgICAvLyAgICAgcmVzdWx0czogcmVzdWx0cyxcbiAgICAvLyAgICAgbWV0YWRhdGE6IG1ldGFkYXRhIHx8IHt9LFxuICAgIC8vIH07XG4gIH1cblxuICAvKlxuICAgKiBnZXQgZGF0YSB1cmwgZnJvbSBwbGF0Zm9ybVxuICAgKi9cbiAgYXN5bmMgc2VhcmNoZGF0YShzY3JhcGVfY29uZmlnID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBzY3JhcGVfY29uZmlnKTtcblxuICAgIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5zdGFydF9icm93c2VyKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZy5wbGF0Zm9ybSlcbiAgICAgIHRoaXMuc2NyYXBlciA9IGdldFNjcmFwZXIodGhpcy5jb25maWcucGxhdGZvcm0sIHtcbiAgICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgICAgY29udGV4dDogdGhpcy5jb250ZXh0LFxuICAgICAgICBwbHVnZ2FibGU6IHRoaXMucGx1Z2dhYmxlLFxuICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICAgIHRtcHBhdGg6IHRoaXMudG1wcGF0aCxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLnNjcmFwZXIud29ya2Vyc2VhcmNoZGF0YSh0aGlzLnBhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBFYWNoIGJyb3dzZXIgd2lsbCBnZXQgTi8oSysxKSBrZXl3b3JkcyBhbmQgd2lsbCBpc3N1ZSBOLyhLKzEpICogTSB0b3RhbCByZXF1ZXN0cyB0byB0aGUgc2VhcmNoIGVuZ2luZS5cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvcHVwcGV0ZWVyL2lzc3Vlcy82NzhcbiAgICAgIC8vIFRoZSBxdWVzdGlvbiBpczogSXMgaXQgcG9zc2libGUgdG8gc2V0IHByb3hpZXMgcGVyIFBhZ2U/IFBlciBCcm93c2VyP1xuICAgICAgLy8gYXMgZmFyIGFzIEkgY2FuIHNlZSwgcHVwcGV0ZWVyIGNsdXN0ZXIgdXNlcyB0aGUgc2FtZSBwdXBwZXRlZXJPcHRpb25zXG4gICAgICAvLyBmb3IgZXZlcnkgYnJvd3NlciBpbnN0YW5jZS4gV2Ugd2lsbCB1c2Ugb3VyIGN1c3RvbSBwdXBwZXRlZXItY2x1c3RlciB2ZXJzaW9uLlxuICAgICAgLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvcHJveHktY2hhaW5cbiAgICAgIC8vIHRoaXMgYW5zd2VyIGxvb2tzIG5pY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWUvcHVwcGV0ZWVyL2lzc3Vlcy82NzgjaXNzdWVjb21tZW50LTM4OTA5NjA3N1xuICAgICAgbGV0IGNodW5rcyA9IFtdO1xuICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB0aGlzLm51bUNsdXN0ZXJzOyBuKyspIHtcbiAgICAgICAgY2h1bmtzLnB1c2goW10pO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmNvbmZpZy5rZXl3b3Jkcy5sZW5ndGg7IGsrKykge1xuICAgICAgICBjaHVua3NbayAlIHRoaXMubnVtQ2x1c3RlcnNdLnB1c2godGhpcy5jb25maWcua2V5d29yZHNba10pO1xuICAgICAgfVxuXG4gICAgICBkZWJ1ZyhcImNodW5rcz0lb1wiLCBjaHVua3MpO1xuXG4gICAgICBsZXQgZXhlY1Byb21pc2VzID0gW107XG4gICAgICBmb3IgKHZhciBjID0gMDsgYyA8IGNodW5rcy5sZW5ndGg7IGMrKykge1xuICAgICAgICBjb25zdCBjb25maWcgPSBfLmNsb25lKHRoaXMuY29uZmlnKTtcbiAgICAgICAgY29uZmlnLmtleXdvcmRzID0gY2h1bmtzW2NdO1xuXG4gICAgICAgIHZhciBvYmogPSBnZXRTY3JhcGVyKHRoaXMuY29uZmlnLnBsYXRmb3JtLCB7XG4gICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgY29udGV4dDoge30sXG4gICAgICAgICAgcGx1Z2dhYmxlOiB0aGlzLnBsdWdnYWJsZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGJvdW5kTWV0aG9kID0gb2JqLndvcmtlcnNlYXJjaGRhdGEuYmluZChvYmopO1xuICAgICAgICBleGVjUHJvbWlzZXMucHVzaCh0aGlzLmNsdXN0ZXIuZXhlY3V0ZSh7fSwgYm91bmRNZXRob2QpKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoZXhlY1Byb21pc2VzKTtcblxuICAgICAgLy8gTWVyZ2UgcmVzdWx0cyBhbmQgbWV0YWRhdGEgcGVyIGtleXdvcmRcbiAgICAgIC8vIGZvciAobGV0IHByb21pc2VSZXR1cm4gb2YgcHJvbWlzZVJldHVybnMpIHtcbiAgICAgIC8vICAgICBPYmplY3QuYXNzaWduKHJlc3VsdHMsIHByb21pc2VSZXR1cm4ucmVzdWx0cyk7XG4gICAgICAvLyAgICAgT2JqZWN0LmFzc2lnbihtZXRhZGF0YSwgcHJvbWlzZVJldHVybi5tZXRhZGF0YSk7XG4gICAgICAvLyAgICAgbnVtX3JlcXVlc3RzICs9IHByb21pc2VSZXR1cm4ubnVtX3JlcXVlc3RzO1xuICAgICAgLy8gfVxuICAgIH1cblxuICAgIC8vIGxldCB0aW1lRGVsdGEgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgIC8vIGxldCBtc19wZXJfcmVxdWVzdCA9IHRpbWVEZWx0YS9udW1fcmVxdWVzdHM7XG5cbiAgICAvLyB0aGlzLmxvZ2dlci5pbmZvKGBTY3JhcGVyIHRvb2sgJHt0aW1lRGVsdGF9bXMgdG8gcGVyZm9ybSAke251bV9yZXF1ZXN0c30gcmVxdWVzdHMuYCk7XG4gICAgLy8gdGhpcy5sb2dnZXIuaW5mbyhgT24gYXZlcmFnZSBtcy9yZXF1ZXN0OiAke21zX3Blcl9yZXF1ZXN0fW1zL3JlcXVlc3RgKTtcblxuICAgIC8vIGlmICh0aGlzLnBsdWdnYWJsZSAmJiB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfcmVzdWx0cykge1xuICAgIC8vICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfcmVzdWx0cyhyZXN1bHRzKTtcbiAgICAvLyB9XG5cbiAgICAvLyBtZXRhZGF0YS5lbGFwc2VkX3RpbWUgPSB0aW1lRGVsdGEudG9TdHJpbmcoKTtcbiAgICAvLyBtZXRhZGF0YS5tc19wZXJfa2V5d29yZCA9IG1zX3Blcl9yZXF1ZXN0LnRvU3RyaW5nKCk7XG4gICAgLy8gbWV0YWRhdGEubnVtX3JlcXVlc3RzID0gbnVtX3JlcXVlc3RzO1xuXG4gICAgLy8gZGVidWcoJ21ldGFkYXRhPSVPJywgbWV0YWRhdGEpO1xuXG4gICAgLy8gaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmhhbmRsZV9tZXRhZGF0YSkge1xuICAgIC8vICAgICBhd2FpdCB0aGlzLnBsdWdnYWJsZS5oYW5kbGVfbWV0YWRhdGEobWV0YWRhdGEpO1xuICAgIC8vIH1cblxuICAgIC8vIGlmICh0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZSkge1xuICAgIC8vICAgICB0aGlzLmxvZ2dlci5pbmZvKGBXcml0aW5nIHJlc3VsdHMgdG8gJHt0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZX1gKTtcbiAgICAvLyAgICAgd3JpdGVfcmVzdWx0cyh0aGlzLmNvbmZpZy5vdXRwdXRfZmlsZSwgSlNPTi5zdHJpbmdpZnkocmVzdWx0cywgbnVsbCwgNCkpO1xuICAgIC8vIH1cblxuICAgIC8vIHJldHVybiB7XG4gICAgLy8gICAgIHJlc3VsdHM6IHJlc3VsdHMsXG4gICAgLy8gICAgIG1ldGFkYXRhOiBtZXRhZGF0YSB8fCB7fSxcbiAgICAvLyB9O1xuICB9XG5cbiAgLypcbiAgICogUXVpdCB0aGUgcHVwcGV0ZWVyIGNsdXN0ZXIvYnJvd3Nlci5cbiAgICovXG4gIGFzeW5jIHF1aXQoKSB7XG4gICAgaWYgKHRoaXMucGx1Z2dhYmxlICYmIHRoaXMucGx1Z2dhYmxlLmNsb3NlX2Jyb3dzZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMucGx1Z2dhYmxlLmNsb3NlX2Jyb3dzZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5jbHVzdGVyLmlkbGUoKTtcbiAgICAgIGF3YWl0IHRoaXMuY2x1c3Rlci5jbG9zZSgpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgU2NyYXBlTWFuYWdlcjogU2NyYXBlTWFuYWdlcixcbn07XG4iLCJleHBvcnQgeyB9O1xuY29uc3QgYXhpb3MgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ1JlbW90ZVNvdXJjZTpSZW1vdGVTb3VyY2UnKTtcbmNvbnN0IEZvcm1EYXRhID0gcmVxdWlyZSgnZm9ybS1kYXRhJyk7XG50eXBlIHNvc2V0dGluZyA9IHtcbiAgc290eXBlOiBzdHJpbmc7XG4gIHNvY2lhbHVzZXI6IHN0cmluZztcbiAgc29jaWFscGFzczogc3RyaW5nO1xuICBwcm94eToge1xuICAgIHByb3h5OiBzdHJpbmc7XG4gICAgdXNlcjogc3RyaW5nO1xuICAgIHBhc3M6IHN0cmluZztcbiAgfSxcbn1cbmV4cG9ydCB0eXBlIExpbmtkYXRhID0ge1xuICB0aXRsZTogc3RyaW5nLFxuICB1cmw6IHN0cmluZyxcbiAgY29udGVudD86IHN0cmluZyxcbiAgbGFuZzogc3RyaW5nLFxuICBzb2NpYWx0YXNrX2lkOiBudW1iZXIsXG59XG50eXBlIHNvY2lhbFRhc2sgPSB7XG4gIGlkOiBudW1iZXIsXG4gIGNhbXBhaWduX2lkOiBudW1iZXIsXG4gIGNhbXBhaWduX25hbWU6IHN0cmluZyxcbiAgdGFnOiBzdHJpbmcsXG4gIHR5cGU6IHN0cmluZyxcbiAga2V5d29yZHM6IEFycmF5PHN0cmluZz4sXG59XG50eXBlIGNvbmZpZ1R5cGUgPSB7XG4gIFJFTU9URUFERDogc3RyaW5nLFxuICBSRU1PVEVVU0VSTkFNRTogc3RyaW5nLFxuICBSRU1PVEVQQVNTV09SRDogc3RyaW5nLFxufVxuZXhwb3J0IGNsYXNzIFJlbW90ZVNvdXJjZSB7XG4gIFJFTU9URUFERDogc3RyaW5nO1xuICBSRU1PVEVVU0VSTkFNRTogc3RyaW5nO1xuICBSRU1PVEVQQVNTV09SRDogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLnJlYWRlbnYoKTtcbiAgICB0aGlzLlJFTU9URUFERCA9IGNvbmZpZy5SRU1PVEVBREQ7XG4gICAgdGhpcy5SRU1PVEVVU0VSTkFNRSA9IGNvbmZpZy5SRU1PVEVVU0VSTkFNRTtcbiAgICB0aGlzLlJFTU9URVBBU1NXT1JEID0gY29uZmlnLlJFTU9URVBBU1NXT1JEO1xuICB9XG5cblxuICByZWFkZW52KCk6IGNvbmZpZ1R5cGUge1xuICAgIC8vcmVhZCBjb25maWcgZnJvbSAuZW52IGZpbGVcbiAgICBsZXQgZW52Y29maWcgPSB0aGlzLnJlYWRDb25maWcoKTtcbiAgICBkZWJ1ZyhlbnZjb2ZpZylcbiAgICAvL2NoZWNrIGtleSBleGlzdCBpbiBvYmplY3RcbiAgICBpZiAoIWVudmNvZmlnLmhhc093blByb3BlcnR5KFwiUkVNT1RFQUREXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJFTU9URUFERCBub3QgZm91bmQgaW4gLmVudiBmaWxlYCk7XG4gICAgfVxuICAgIGlmICghZW52Y29maWcuaGFzT3duUHJvcGVydHkoXCJSRU1PVEVVU0VSTkFNRVwiKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVU0VSTkFNRSBub3QgZm91bmQgaW4gLmVudiBmaWxlYCk7XG4gICAgfVxuICAgIGlmICghZW52Y29maWcuaGFzT3duUHJvcGVydHkoXCJSRU1PVEVQQVNTV09SRFwiKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQQVNTV09SRCBub3QgZm91bmQgaW4gLmVudiBmaWxlYCk7XG4gICAgfVxuICAgIHJldHVybiBlbnZjb2ZpZyBhcyBjb25maWdUeXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlYWQgY29uZmlnIGZyb20gLmVudiBGaWxlXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IGNvbmZpZ1xuICAgKiAqL1xuICByZWFkQ29uZmlnKCk6IG9iamVjdCB7XG4gICAgY29uc3QgcmVzdWx0ID0gcmVxdWlyZShcImRvdGVudlwiKS5jb25maWcoKTtcbiAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICB0aHJvdyByZXN1bHQuZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQucGFyc2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCByZXNwb25zZSBmcm9tIHJlbW90ZSBzZXJ2aXZlXG4gICAqIEByZXR1cm4gb2JqZWN0XG4gICAqL1xuICBhc3luYyBnZXRSZW1vdGVDb25maWcoY2FtcGFpZ25JZCk6IFByb21pc2U8c29zZXR0aW5nPiB7XG4gICAgLy8gbGV0IGVudmNvbmZpZyA9IGF3YWl0IHJlYWRlbnYoKTtcblxuICAgIGxldCBzb3NldHZhciA9IGF3YWl0IGF4aW9zXG4gICAgICAuZ2V0KHRoaXMuUkVNT1RFQUREICsgXCIvYXBpL2dldHNvYnlDYW0vP2NhbXBhaWduX2lkPVwiICsgY2FtcGFpZ25JZCwge1xuICAgICAgICBhdXRoOiB7XG4gICAgICAgICAgdXNlcm5hbWU6IHRoaXMuUkVNT1RFVVNFUk5BTUUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHRoaXMuUkVNT1RFUEFTU1dPUkQsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocGFyc2VJbnQocmVzLnN0YXR1cykgIT0gMjAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29kZSBub3QgZXF1YWwgMjAwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzLmRhdGEuc3RhdHVzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29kZSBub3QgZXF1YWwgMjAwXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy5zdGF0dXMpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEudXNlcilcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmRhdGEuZGF0YS5wYXNzKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhLnByb3h5KVxuICAgICAgICBjb25zdCBzb3NldHRpbmcgPSB7XG4gICAgICAgICAgc290eXBlOiByZXMuZGF0YS5kYXRhLnNvdHlwZSxcbiAgICAgICAgICBzb2NpYWx1c2VyOiByZXMuZGF0YS5kYXRhLnVzZXIsXG4gICAgICAgICAgc29jaWFscGFzczogcmVzLmRhdGEuZGF0YS5wYXNzLFxuICAgICAgICAgIHByb3h5OiB7XG4gICAgICAgICAgICBwcm94eTogcmVzLmRhdGEuZGF0YS5wcm94eS51cmwsXG4gICAgICAgICAgICB1c2VyOiByZXMuZGF0YS5kYXRhLnByb3h5LnVzZXIsXG4gICAgICAgICAgICBwYXNzOiByZXMuZGF0YS5kYXRhLnByb3h5LnBhc3MsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHNvc2V0dGluZztcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gc29zZXR2YXI7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IGNhbXBhaWduIGZyb20gcmVtb3RlIHNlcnZpdmVcbiAgICovXG4gIGFzeW5jIGdldENhbXBhaWdubGlzdCgpOiBQcm9taXNlPEFycmF5PHNvY2lhbFRhc2s+PiB7XG4gICAgY29uc3QgY2FtcGlnbmxpc3QgPSBhd2FpdCBheGlvc1xuICAgICAgLmdldCh0aGlzLlJFTU9URUFERCArIFwiL2FwaS9saXN0c290YXNrXCIsIHtcbiAgICAgICAgYXV0aDoge1xuICAgICAgICAgIHVzZXJuYW1lOiB0aGlzLlJFTU9URVVTRVJOQU1FLFxuICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLlJFTU9URVBBU1NXT1JELFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHBhcnNlSW50KHJlcy5zdGF0dXMpICE9IDIwMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvZGUgbm90IGVxdWFsIDIwMFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlcy5kYXRhLmRhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkYXRhIG5vdCBleGlzdFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLmRhdGEuZGF0YSBhcyBBcnJheTxzb2NpYWxUYXNrPjtcblxuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29kZSBub3QgZXF1YWwgMjAwXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIH0pO1xuICAgIHJldHVybiBjYW1waWdubGlzdDtcbiAgfVxuICAvKipcbiAgICogc2F2ZSBsaW5rIHRvIHJlbW90ZSBzZXJ2aXZlXG4gICAqL1xuICBhc3luYyBzYXZlTGlua3JlbW90ZShsaW5rOiBMaW5rZGF0YSk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgY29uc3QgRm9ybURhdGEgPSByZXF1aXJlKCdmb3JtLWRhdGEnKTtcbiAgICBkZWJ1ZyhsaW5rKVxuICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZGF0YS5hcHBlbmQoJ3RpdGxlJywgbGluay50aXRsZSk7XG4gICAgaWYobGluay5jb250ZW50KXtcbiAgICBkYXRhLmFwcGVuZCgnY29udGVudCcsIGxpbmsuY29udGVudCk7XG4gICAgfVxuICAgIGRhdGEuYXBwZW5kKCd1cmwnLCBsaW5rLnVybCk7XG4gICAgZGF0YS5hcHBlbmQoJ2xhbmcnLCBsaW5rLmxhbmcpO1xuICAgIGlmKGxpbmsuc29jaWFsdGFza19pZCl7XG4gICAgZGF0YS5hcHBlbmQoJ3NvY2lhbHRhc2tfaWQnLCBsaW5rLnNvY2lhbHRhc2tfaWQpO1xuICAgIH1cbiAgICBjb25zdCBsaW5rSWQ9YXdhaXQgYXhpb3MucG9zdCh0aGlzLlJFTU9URUFERCArIFwiL2FwaS9zYXZlbGlua1wiLCBkYXRhKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBkZWJ1ZyhyZXMpO1xuICAgICAgICByZXR1cm4gcmVzLmRhdGEgYXMgbnVtYmVyO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBsaW5rSWQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJlbW90ZVNvdXJjZTogUmVtb3RlU291cmNlLFxuXG59O1xuIiwiY29uc3QgeyBCcm93c2VyIH0gPSByZXF1aXJlKCdwdXBwZXRlZXItY2x1c3Rlci9kaXN0L2NvbmN1cnJlbmN5L2J1aWx0SW5Db25jdXJyZW5jeScpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzZS1zY3JhcGVyOkN1c3RvbUNvbmN1cnJlbmN5Jyk7XG5jb25zdCB7IHRpbWVvdXRFeGVjdXRlIH0gPSByZXF1aXJlKCdwdXBwZXRlZXItY2x1c3Rlci9kaXN0L3V0aWwnKTtcblxuY29uc3QgQlJPV1NFUl9USU1FT1VUID0gNTAwMDtcblxuY2xhc3MgQ3VzdG9tQ29uY3VycmVuY3kgZXh0ZW5kcyBCcm93c2VyIHtcblxuICAgIGFzeW5jIGluaXQoKSB7fVxuICAgIGFzeW5jIGNsb3NlKCkge31cblxuICAgIGFzeW5jIHdvcmtlckluc3RhbmNlKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zLnBlckJyb3dzZXJPcHRpb25zLnNoaWZ0KCk7XG4gICAgICAgIGRlYnVnKCdMYXVuY2ggcHVwcGV0ZWVyIGluc3RhbmNlIHdpdGggb3B0aW9ucz0lbycsIG9wdGlvbnMpO1xuICAgICAgICBsZXQgY2hyb21lID0gYXdhaXQgdGhpcy5wdXBwZXRlZXIubGF1bmNoKG9wdGlvbnMpO1xuICAgICAgICBsZXQgcGFnZTtcbiAgICAgICAgbGV0IGNvbnRleHQ7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGpvYkluc3RhbmNlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGltZW91dEV4ZWN1dGUoQlJPV1NFUl9USU1FT1VULCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gYXdhaXQgY2hyb21lLmNyZWF0ZUluY29nbml0b0Jyb3dzZXJDb250ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2UgPSBhd2FpdCBjb250ZXh0Lm5ld1BhZ2UoKTtcbiAgICAgICAgICAgICAgICB9KSgpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBjbG9zZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGltZW91dEV4ZWN1dGUoQlJPV1NFUl9USU1FT1VULCBjb250ZXh0LmNsb3NlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjbG9zZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IGNocm9tZS5jbG9zZSgpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVwYWlyOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ1N0YXJ0aW5nIHJlcGFpcicpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdpbGwgcHJvYmFibHkgZmFpbCwgYnV0IGp1c3QgaW4gY2FzZSB0aGUgcmVwYWlyIHdhcyBub3QgbmVjZXNzYXJ5XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGNocm9tZS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgICAgICAgICAvLyBqdXN0IHJlbGF1bmNoIGFzIHRoZXJlIGlzIG9ubHkgb25lIHBhZ2UgcGVyIGJyb3dzZXJcbiAgICAgICAgICAgICAgICBjaHJvbWUgPSBhd2FpdCB0aGlzLnB1cHBldGVlci5sYXVuY2gob3B0aW9ucyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ3VzdG9tQ29uY3VycmVuY3k7IiwiY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCBjcnlwdG8gPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xuY29uc3QgaHR0cHMgPSByZXF1aXJlKFwiaHR0cHNcIik7XG5jb25zdCBwcm9ncmVzcyA9IHJlcXVpcmUoXCJwcm9ncmVzcy1zdHJlYW1cIik7XG5cbmNsYXNzIFRhc2sge1xuXHRjb25zdHJ1Y3Rvcih1cmwpIHtcblx0XHR0aGlzLnVybCA9IHVybDtcblx0XHR0aGlzLmZpbmlzaGVkID0gZmFsc2U7XG5cdH1cbn1cblxuY2xhc3MgRG93bmxvYWRlciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMudHlwZSA9IFwiXCI7XG5cdFx0dGhpcy5pZCA9IFwiXCI7XG5cdFx0dGhpcy51cmwgPSBcIlwiO1xuXHRcdHRoaXMuYWlkID0gLTE7XG5cdFx0dGhpcy5waWQgPSAxO1xuXHRcdHRoaXMuY2lkID0gLTE7XG5cdFx0dGhpcy5uYW1lID0gXCJcIjtcblx0XHR0aGlzLmxpbmtzID0gW107XG5cdFx0dGhpcy50YXNrcyA9IFtdO1xuXHR9XG5cblx0Z2V0VmlkZW9VcmwodmlkZW9VcmwpIHtcblx0XHR0aGlzLnVybCA9IFwiXCI7XG5cdFx0Y29uc3QgbWFwcGluZyA9IHtcblx0XHRcdFwiQlZcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vdmlkZW8vXCIsXG5cdFx0XHRcImJ2XCI6IFwiaHR0cHM6Ly93d3cuYmlsaWJpbGkuY29tL3ZpZGVvL1wiLFxuXHRcdFx0XCJhdlwiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS92aWRlby9cIixcblx0XHRcdFwiZXBcIjogXCJodHRwczovL3d3dy5iaWxpYmlsaS5jb20vYmFuZ3VtaS9wbGF5L1wiLFxuXHRcdFx0XCJzc1wiOiBcImh0dHBzOi8vd3d3LmJpbGliaWxpLmNvbS9iYW5ndW1pL3BsYXkvXCJcblx0XHR9O1xuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG1hcHBpbmcpKSB7XG5cdFx0XHRpZiAodmlkZW9VcmwuaW5jbHVkZXMoa2V5KSkge1xuXHRcdFx0XHR0aGlzLnR5cGUgPSBrZXk7XG5cdFx0XHRcdHRoaXMuaWQgPSBrZXkgKyB2aWRlb1VybC5zcGxpdChrZXkpWzFdO1xuXHRcdFx0XHR0aGlzLnVybCA9IHZhbHVlICsgdGhpcy5pZDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YXN5bmMgZ2V0QWlkKCkge1xuXHRcdGNvbnN0IHsgdHlwZSwgdXJsIH0gPSB0aGlzO1xuXHRcdGlmICghdXJsKSByZXR1cm47XG5cdFx0cmV0dXJuIGZldGNoKHVybClcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcblx0XHRcdC50aGVuKHJlc3VsdCA9PiB7XG5cdFx0XHRcdGxldCBkYXRhID0gcmVzdWx0Lm1hdGNoKC9fX0lOSVRJQUxfU1RBVEVfXz0oLio/KTtcXChmdW5jdGlvblxcKFxcKS8pWzFdO1xuXHRcdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJJTklUSUFMIFNUQVRFXCIsIGRhdGEpO1xuXHRcdFx0XHRpZiAodHlwZSA9PT0gXCJCVlwiIHx8IHR5cGUgPT09IFwiYnZcIiB8fCB0eXBlID09PSBcImF2XCIpIHtcblx0XHRcdFx0XHR0aGlzLmFpZCA9IGRhdGEudmlkZW9EYXRhLmFpZDtcblx0XHRcdFx0XHR0aGlzLnBpZCA9IHBhcnNlSW50KHVybC5zcGxpdChcInA9XCIpWzFdLCAxMCkgfHwgMTtcblx0XHRcdFx0XHR0aGlzLmNpZCA9IGRhdGEudmlkZW9EYXRhLnBhZ2VzW3RoaXMucGlkIC0gMV0uY2lkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKHR5cGUgPT09IFwiZXBcIikge1xuXHRcdFx0XHRcdHRoaXMuYWlkID0gZGF0YS5lcEluZm8uYWlkO1xuXHRcdFx0XHRcdHRoaXMuY2lkID0gZGF0YS5lcEluZm8uY2lkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYgKHR5cGUgPT09IFwic3NcIikge1xuXHRcdFx0XHRcdHRoaXMuYWlkID0gZGF0YS5lcExpc3RbMF0uYWlkO1xuXHRcdFx0XHRcdHRoaXMuY2lkID0gZGF0YS5lcExpc3RbMF0uY2lkO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKGVycm9yID0+IHNob3dFcnJvcihcIuiOt+WPluinhumikSBhaWQg5Ye66ZSZ77yBXCIpKTtcblx0fVxuXG5cdGFzeW5jIGdldEluZm8oKSB7XG5cdFx0Y29uc3QgeyBhaWQsIGNpZCB9ID0gdGhpcztcblx0XHRpZiAoIWNpZCkge1xuXHRcdFx0c2hvd0Vycm9yKFwi6I635Y+W6KeG6aKRIGNpZCDlh7rplJnvvIFcIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vIGdldERhbm1ha3UoKTsgLy/ojrflj5ZjaWTlkI7vvIzojrflj5bkuIvovb3pk77mjqXlkozlvLnluZXkv6Hmga9cblx0XHRyZXR1cm4gZmV0Y2goXCJodHRwczovL2FwaS5iaWxpYmlsaS5jb20veC93ZWItaW50ZXJmYWNlL3ZpZXc/YWlkPVwiICsgYWlkKVxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuXHRcdFx0LmNhdGNoKGVycm9yID0+IHNob3dFcnJvcihcIuiOt+WPluinhumikeS/oeaBr+WHuumUme+8gVwiKSk7XG5cdH1cblxuXHRhc3luYyBnZXREYXRhKGZhbGxiYWNrKSB7XG5cdFx0Y29uc3QgeyBjaWQsIHR5cGUgfSA9IHRoaXM7XG5cdFx0bGV0IHBsYXlVcmw7XG5cdFx0aWYgKGZhbGxiYWNrKSB7XG5cdFx0XHRjb25zdCBwYXJhbXMgPSBgY2lkPSR7Y2lkfSZtb2R1bGU9bW92aWUmcGxheWVyPTEmcXVhbGl0eT0xMTImdHM9MWA7XG5cdFx0XHRjb25zdCBzaWduID0gY3J5cHRvLmNyZWF0ZUhhc2goXCJtZDVcIikudXBkYXRlKHBhcmFtcyArIFwiOWIyODgxNDdlNTQ3NGRkMmFhNjcwODVmNzE2YzU2MGRcIikuZGlnZXN0KFwiaGV4XCIpO1xuXHRcdFx0cGxheVVybCA9IGBodHRwczovL2Jhbmd1bWkuYmlsaWJpbGkuY29tL3BsYXllci93ZWJfYXBpL3BsYXl1cmw/JHtwYXJhbXN9JnNpZ249JHtzaWdufWA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0eXBlID09PSBcIkJWXCIgfHwgdHlwZSA9PT0gXCJidlwiIHx8IHR5cGUgPT09IFwiYXZcIikge1xuXHRcdFx0XHRjb25zdCBwYXJhbXMgPSBgYXBwa2V5PWlWR1VUanN4dnBMZXVEQ2YmY2lkPSR7Y2lkfSZvdHlwZT1qc29uJnFuPTExMiZxdWFsaXR5PTExMiZ0eXBlPWA7XG5cdFx0XHRcdGNvbnN0IHNpZ24gPSBjcnlwdG8uY3JlYXRlSGFzaChcIm1kNVwiKS51cGRhdGUocGFyYW1zICsgXCJhSFJtaFdNTGtkZU11SUxxT1JuWVpvY3dNQnBNRU9kdFwiKS5kaWdlc3QoXCJoZXhcIik7XG5cdFx0XHRcdHBsYXlVcmwgPSBgaHR0cHM6Ly9pbnRlcmZhY2UuYmlsaWJpbGkuY29tL3YyL3BsYXl1cmw/JHtwYXJhbXN9JnNpZ249JHtzaWdufWA7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwbGF5VXJsID0gYGh0dHBzOi8vYXBpLmJpbGliaWxpLmNvbS9wZ2MvcGxheWVyL3dlYi9wbGF5dXJsP3FuPTgwJmNpZD0ke2NpZH1gO1xuXHRcdFx0XHRcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZldGNoKHBsYXlVcmwpXG5cdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG5cdFx0XHQudGhlbihyZXN1bHQgPT4ge1xuXHRcdFx0XHRjb25zdCBkYXRhID0gZmFsbGJhY2sgPyB0aGlzLnBhcnNlRGF0YShyZXN1bHQpIDogSlNPTi5wYXJzZShyZXN1bHQpO1xuXHRcdFx0XHRjb25zdCB0YXJnZXQgPSBkYXRhLmR1cmwgfHwgZGF0YS5yZXN1bHQuZHVybDtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJQTEFZIFVSTFwiLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua3MgPSB0YXJnZXQubWFwKHBhcnQgPT4gcGFydC51cmwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2ssIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgfTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoZmFsbGJhY2spIHRocm93IEVycm9yKCk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSh0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdHNob3dFcnJvcihcIuiOt+WPliBQbGF5VXJsIOaIluS4i+i9vemTvuaOpeWHuumUme+8geeUseS6jkLnq5npmZDliLbvvIzlj6rog73kuIvovb3kvY7muIXmmbDluqbop4bpopHjgIJcIik7XG5cdFx0XHR9KTtcblx0fVxuXG5cdHBhcnNlRGF0YSh0YXJnZXQpIHtcblx0XHRjb25zdCBkYXRhID0gJCh0YXJnZXQpO1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXHRcdHJlc3VsdC5kdXJsID0gW107XG5cdFx0cmVzdWx0LnF1YWxpdHkgPSBkYXRhLmZpbmQoXCJxdWFsaXR5XCIpLnRleHQoKTtcblx0XHRkYXRhLmZpbmQoXCJkdXJsXCIpLmVhY2goKGksIG8pID0+IHtcblx0XHRcdGNvbnN0IHBhcnQgPSAkKG8pO1xuXHRcdFx0cmVzdWx0LmR1cmwucHVzaCh7XG5cdFx0XHRcdHVybDogcGFydC5maW5kKFwidXJsXCIpLnRleHQoKSxcblx0XHRcdFx0b3JkZXI6IHBhcnQuZmluZChcIm9yZGVyXCIpLnRleHQoKSxcblx0XHRcdFx0bGVuZ3RoOiBwYXJ0LmZpbmQoXCJsZW5ndGhcIikudGV4dCgpLFxuXHRcdFx0XHRzaXplOiBwYXJ0LmZpbmQoXCJzaXplXCIpLnRleHQoKVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGRvd25sb2FkQnlJbmRleChwYXJ0LCBmaWxlLCBjYWxsYmFjayA9ICgpID0+IHt9KSB7XG5cdFx0Y29uc3QgeyB1cmwgfSA9IHRoaXM7XG5cblx0XHRpZiAodGhpcy50YXNrcy5zb21lKGl0ZW0gPT4gaXRlbS51cmwgPT09IHRoaXMubGlua3NbcGFydF0pKSByZXR1cm4gXCJEVVBMSUNBVEVcIjtcblx0XHR0aGlzLnRhc2tzLnB1c2gobmV3IFRhc2sodGhpcy5saW5rc1twYXJ0XSkpO1xuXHRcdGxldCBzdGF0ZTtcblx0XHR0cnkge1xuXHRcdFx0c3RhdGUgPSBmcy5zdGF0U3luYyhmaWxlKTtcblx0XHR9XG5cdFx0Y2F0Y2ggKGVycm9yKSB7XG5cdFx0fVxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHR1cmw6IHRoaXMubGlua3NbcGFydF0sXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFwiUmFuZ2VcIjogYGJ5dGVzPSR7c3RhdGUgPyBzdGF0ZS5zaXplIDogMH0tYCwgLy/mlq3ngrnnu63kvKBcblx0XHRcdFx0XCJVc2VyLUFnZW50XCI6IFwiTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNykgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkwLjAuNDQzMC4yMTIgU2FmYXJpLzUzNy4zNlwiLFxuXHRcdFx0XHRcIlJlZmVyZXJcIjogdXJsXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRjb25zdCBzdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShmaWxlLCBzdGF0ZSA/IHsgZmxhZ3M6IFwiYVwiIH0gOiB7fSk7XG5cdFx0dGhpcy5kb3dubG9hZChvcHRpb25zLCBzdHJlYW0sIGNhbGxiYWNrKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblx0fVxuXG5cdGRvd25sb2FkKG9wdGlvbnMsIHN0cmVhbSwgY2FsbGJhY2spIHtcblx0XHQvLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9wcm9ncmVzcy1zdHJlYW1cblx0XHRjb25zdCBpbmRleCA9IHRoaXMudGFza3MuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS51cmwgPT09IG9wdGlvbnMudXJsKTtcblx0XHRjb25zdCBwcm9TdHJlYW0gPSBwcm9ncmVzcyh7XG5cdFx0XHR0aW1lOiAyNTAgLy/ljZXkvY1tc1xuXHRcdH0pLm9uKFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3MgPT4ge1xuXHRcdFx0Y29uc3QgeyBwZXJjZW50YWdlIH0gPSBwcm9ncmVzczsgLy/mmL7npLrov5vluqbmnaFcblx0XHRcdGlmIChwZXJjZW50YWdlID09PSAxMDApIHtcblx0XHRcdFx0dGhpcy50YXNrc1tpbmRleF0uZmluaXNoZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0Y2FsbGJhY2socHJvZ3Jlc3MsIGluZGV4KTtcblx0XHR9KTtcblxuXHRcdGxldCB7IHVybCB9ID0gb3B0aW9ucztcblx0XHRmdW5jdGlvbiBkb3dubG9hZExpbmsodXJsKSB7XG5cdFx0XHQodXJsLnN0YXJ0c1dpdGgoXCJodHRwc1wiKSA/IGh0dHBzIDogaHR0cCkuZ2V0KHVybCwgb3B0aW9ucywgcmVzID0+IHtcblx0XHRcdFx0aWYgKHJlcy5zdGF0dXNDb2RlID09PSAzMDIpIHtcblx0XHRcdFx0XHR1cmwgPSByZXMuaGVhZGVycy5sb2NhdGlvbjtcblx0XHRcdFx0XHRyZXR1cm4gZG93bmxvYWRMaW5rKHVybCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHJvU3RyZWFtLnNldExlbmd0aChyZXMuaGVhZGVyc1tcImNvbnRlbnQtbGVuZ3RoXCJdKTtcblx0XHRcdFx0Ly/lhYhwaXBl5YiwcHJvU3RyZWFt5YaNcGlwZeWIsOaWh+S7tueahOWGmeWFpea1geS4rVxuXHRcdFx0XHRyZXMucGlwZShwcm9TdHJlYW0pLnBpcGUoc3RyZWFtKS5vbihcImVycm9yXCIsIGVycm9yID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZG93bmxvYWRMaW5rKHVybCk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IFRhc2ssIERvd25sb2FkZXIgfTtcbiIsIi8vc2Nyb2xsIGRvd24gdG8gdGhlIGJvdHRvbSBvZiB0aGUgcGFnZVxuYXN5bmMgZnVuY3Rpb24gYXV0b1Njcm9sbChwYWdlKXtcbiAgICBhd2FpdCBwYWdlLmV2YWx1YXRlKGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHZhciB0b3RhbEhlaWdodCA9IDA7XG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSAxMDA7XG4gICAgICAgICAgICB2YXIgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxCeSgwLCBkaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgdG90YWxIZWlnaHQgKz0gZGlzdGFuY2U7XG5cbiAgICAgICAgICAgICAgICBpZih0b3RhbEhlaWdodCA+PSBzY3JvbGxIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZGVsYXkodGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7IFxuICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIHRpbWUpXG4gICAgfSk7XG4gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdXRvU2Nyb2xsOmF1dG9TY3JvbGwsXG4gICAgZGVsYXk6ZGVsYXlcbn0iLCJjb25zdCBjaGVlcmlvID0gcmVxdWlyZSgnY2hlZXJpbycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRfaXBfZGF0YTogZ2V0X2lwX2RhdGEsXG4gICAgZ2V0X2h0dHBfaGVhZGVyczogZ2V0X2h0dHBfaGVhZGVycyxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGdldF9pcF9kYXRhKHBhZ2UpIHtcbiAgICBhd2FpdCBwYWdlLmdvdG8oJ2h0dHBzOi8vaXBpbmZvLmlvL2pzb24nLCB7XG4gICAgICB3YWl0TG9hZDogdHJ1ZSxcbiAgICAgIHdhaXROZXR3b3JrSWRsZTogdHJ1ZVxuICAgIH0pO1xuICAgIGxldCBqc29uID0gYXdhaXQgcGFnZS5jb250ZW50KHtcbiAgICAgICAgdGltZW91dDogMjAwMDBcbiAgICB9KTtcbiAgICBjb25zdCAkID0gY2hlZXJpby5sb2FkKGpzb24pO1xuICAgIGxldCBpcGluZm9fdGV4dCA9ICAkKCdwcmUnKS50ZXh0KCk7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoaXBpbmZvX3RleHQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRfaHR0cF9oZWFkZXJzKHBhZ2UpIHtcbiAgICBhd2FpdCBwYWdlLmdvdG8oJ2h0dHBzOi8vaHR0cGJpbi5vcmcvZ2V0Jywge1xuICAgICAgd2FpdExvYWQ6IHRydWUsXG4gICAgICB3YWl0TmV0d29ya0lkbGU6IHRydWVcbiAgICB9KTtcbiAgICBsZXQgaGVhZGVycyA9IGF3YWl0IHBhZ2UuY29udGVudCgpO1xuXG4gICAgY29uc3QgJCA9IGNoZWVyaW8ubG9hZChoZWFkZXJzKTtcbiAgICBsZXQgaGVhZGVyc190ZXh0ID0gICQoJ3ByZScpLnRleHQoKTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShoZWFkZXJzX3RleHQpO1xufSIsImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUNvbnRleHQocmVxKSB7XG5cdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHR0aHJvdyBlO1xufVxud2VicGFja0VtcHR5Q29udGV4dC5rZXlzID0gKCkgPT4gKFtdKTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gXCIuL3NyYyBzeW5jIHJlY3Vyc2l2ZVwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlDb250ZXh0OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoZWVyaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZGVidWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpbGVuYW1pZnlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZm9ybS1kYXRhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByb2dyZXNzLXN0cmVhbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwdXBwZXRlZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyLWNsdXN0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC9jb25jdXJyZW5jeS9idWlsdEluQ29uY3VycmVuY3lcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyLWNsdXN0ZXIvZGlzdC91dGlsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci1leHRyYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1c2VyLWFnZW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyeXB0b1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm9zXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==