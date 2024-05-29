'use strict';
import {SearchScrape} from "@/modules/SearchScraper"
import {ScrapeOptions } from "@/entityTypes/scrapeType"

class GoogleScraper extends SearchScrape {
    constructor(options: ScrapeOptions) {
        super(options);
    }
    // override
    async parse_async(html) {
        //parese html page
    }

}