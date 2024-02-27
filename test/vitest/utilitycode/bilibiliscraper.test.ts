'use strict';
import { expect, test } from 'vitest'
import {default_browser_config,default_scrape_config} from "@/config/puppeteerconfig"
import {Searchdata} from "@/modules/scrapeindex";
test('bibili-scraper', async function () {
    let browser_config=default_browser_config
    let scrape_config=default_scrape_config
    scrape_config.platform="bilibili"
    scrape_config.taskid=69
    scrape_config.taskrunid=36
    scrape_config.keywords=["test"]
    await Searchdata(browser_config, scrape_config);
},500000)