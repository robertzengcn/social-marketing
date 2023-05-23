"use strict";

const cheerio = require("cheerio");
const Scraper = require("./social_scraper");
const fs = require("fs");
const { Downloader } = require("./bilibili/downloader.js");
const path = require("path");
const sanitize = require("filenamify");
const debug = require('debug')('bilibili-scraper:Scraper');
const { autoScroll,delay } = require("./lib/function.js");
// import filenamify from 'filenamify';
// const { launch, getStream } = require("puppeteer-stream");
// const PuppeteerVideoRecorder = require('puppeteer-video-recorder');
class BilibiliScraper extends Scraper {
  constructor(...args) {
    super(...args);
    this.startUrl = "https://www.bilibili.com";
  }
  //login into bilibili
  async load_login_page() {
    // let startUrl = "https://www.bilibili.com";

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
    // await this.page.setViewport({
    //     width: 1280,
    //     height: 768
    // });

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
    await page.type('.nav-search-input', keyword);
    // await this.page.$eval(".nav-search-input", function (keyword) {
    //   this.value = keyword;
    // });
    // await page.$eval('.nav-search-input', el => el.value = "");
    const searchbtn=await this.page.$(".nav-search-btn");
    searchbtn.click()
    return searchbtn;
  }
  //get video url return in array
  /**
   * 
   * @param {object,string,string} 
   * @returns 
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
    
    const searchbtn=await this.clickSearchbtn( {page:this.page, keyword:keyword});
    let browser=this.page.browser()
    const newPage = await browser.waitForTarget(target => target.url().includes("search.bilibili.com"));
    const pages = await browser.pages()
    let searchPage;
    for (const page of pages) {
      const pageurl=await page.url()   // new page now appear!
      // debug(await page.title())
      if(pageurl.includes("search.bilibili.com")){
        searchPage=page;
        break;
      }
    }
    if(!searchPage){
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
    await autoScroll(searchPage)
    // await page.screenshot({
    //   path: '/home/robertzeng/screenshot.jpg'
    // });


    await searchPage.waitForSelector('.vui_pagenation', { timeout: 5000 });
    
    let linkres=[];
    // await this.page.$$("button.vui_button", elements=>{
    //   console.log(elements)
    // })
    const linkPage=await searchPage.$$("button.vui_button")
    debug(linkPage)
    for(let i=0;i<linkPage.length;i++){
      // await autoScroll(tabTwo )
      // await this.page.waitForNavigation({
      //   waitUntil: 'networkidle0',
      // });
      // await linkPage[i].click()
      await searchPage.evaluate((element) => {
        element.click()
      }, linkPage[i])
      const links=await this.getVideolistlink({page:searchPage});
      debug(links)
      links.map((link)=>{
        linkres.push(link)
      })
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
    debug(linkres)
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
    let linkmap=await page.$$eval(".bili-video-card__info--right a:nth-child(1)",alinks => {
      return alinks.map(alink => alink.getAttribute("href"));
    })
    // console.log(linkmap)
    
    await linkmap.forEach((element, index) => {
      if(!element.includes("/video/")){
        // debug("element has video "+element)
        linkmap.splice(index, 1);
      }
    });
    await linkmap.forEach((element, index) => {
      if(element.includes("/api/")){
        debug("element has api "+element)
        linkmap.splice(index, 1);
      }
    });

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
    
    let videores  = await downloader.getInfo();
    debug("VIDEO INFO", videores);
    // const downloadPath ='/home/robertzeng/downloadtest';
    const filename =videores.data.title;
    const { data, fallback } =await downloader.getData();
    
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
				15: "360P"
			};
      const videoQuantity=qualityArray[quality] || "unknown";
      console.log("videoQuantity is "+videoQuantity);
      if(fallback){
        throw new Error("error happen when get video data");
      }
      debug("echo target")
      debug(target);
      target.forEach((element, part) => {
        
        const file = path.join(videopath, `${sanitize(filename)}-${part}.flv`);
        debug("part is %o",part);
        debug("file name %o",file);
        const state = downloader.downloadByIndex(part, file, (progress, index) => {
          const { speed, eta, percentage } = progress; //显示进度条
          console.log("speed: "+ Math.round(speed / 1e3) + "KB/s");
          console.log( `eta:${eta}s`);

        });
      });

    return true;
  }
}

module.exports = {
  BilibiliScraper: BilibiliScraper,
};
