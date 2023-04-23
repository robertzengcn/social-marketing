"use strict";

const cheerio = require("cheerio");
const Scraper = require("./social_scraper");
const fs = require("fs");

class BilibiliScraper extends Scraper {
  constructor(...args) {
    super(...args);
    this.startUrl = "https://www.bilibili.com";
  }

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

    console.log(this.config.tmppath);
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
  //get video list page
  async getVideolist({keyword,cookiespath}) {
    let cookiesPath=cookiespath+'/cookies.json'
    if (!fs.existsSync(path)) {
        throw new Error(`Cannot find cookies file at ${cookiesPath}`);
    }
    //load cookies
    const cookies = JSON.parse(await fs.readFile(cookiesPath));
    await this.page.setCookie(...cookies);

    this.logger.info("Using loginUrl: " + this.startUrl);
    await this.page.setBypassCSP(true);
    this.last_response = await this.page.goto(this.startUrl);
    
  }
}

module.exports = {
  BilibiliScraper: BilibiliScraper,
};
