'use strict';

// const cheerio = require('cheerio');
import {SocialScraper as Scraper,ScrapeOptions} from './social_scraper';
const fs = require('fs');

class YoutubeScraper extends Scraper {

    constructor(args: ScrapeOptions) {
        super(args);    
    }


    async load_login_page() {
        
        let startUrl = 'https://www.youtube.com';

        this.logger.info('Using loginUrl: ' + startUrl);
        await this.page.setBypassCSP(true);
        this.last_response = await this.page.goto(startUrl);
        
        //hidden icon
        await this.page.evaluate(() => {
        var icon = document.getElementById("logo-icon");
        if(icon){
        icon.style.display = "none";
        }
        });
        console.log(this.config.tmppath)
        //await this.page.waitForSelector('input[name="q"]', { timeout: this.STANDARD_TIMEOUT });
        //await for user to take action
        await this.page.waitForSelector('#avatar-btn',{'timeout':0});
        //user has success login
        //save cookies 
        const cookies = await this.page.cookies();
        
        await fs.writeFile(this.config.tmppath+'/cookies.json', JSON.stringify(cookies, null, 2));
        // await browser.close();
        // return true;
    }



}

module.exports = {
    YoutubeScraper: YoutubeScraper,
};
