'use strict';

const cheerio = require('cheerio');
const Scraper = require('./social_scraper');

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
                startUrl = `https://www.google.com`;
            }

            for (var key in this.config.google_settings) {
                if (key !== 'google_domain') {
                    startUrl += `${key}=${this.config.google_settings[key]}&`
                }
            }
        }

        this.logger.info('Using loginUrl: ' + startUrl);

        this.last_response = await this.page.goto(startUrl);

        await this.page.waitForSelector('input[name="q"]', { timeout: this.STANDARD_TIMEOUT });

        return true;
    }

}

module.exports = {
    FacebookScraper: FacebookScraper,
};
