'use strict';

const cheerio = require('cheerio');
const Scraper = require('./social_scraper');
const fs = require('fs');

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
        const cookies = await page.cookies();
        
        await fs.writeFile(this.config.tmppath+'/cookies.json', JSON.stringify(cookies, null, 2));
        await browser.close();
        return true;
    }



}

module.exports = {
    YoutubeScraper: YoutubeScraper,
};
