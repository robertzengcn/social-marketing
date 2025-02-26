'use strict';
import { expect, test } from 'vitest'
import puppeteer from 'puppeteer';

test('start-puppeteer', async function () {
    (async () => {
        // Launch the browser and open a new blank page
        const browser = await puppeteer.launch({
             headless: false,
             args: ['--no-sandbox', '--single-process','--incognito'],
            devtools: true });
            
        const page = await browser.newPage();
        await page.evaluate(() => {
            debugger;
          });    
        // Navigate the page to a URL
        await page.goto('https://www.baidu.com');
      
        // Set screen size
        await page.setViewport({width: 1080, height: 1024});
        await browser.close();
    })();
});


