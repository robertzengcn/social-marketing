'use strict';
// const express = require('express');
const puppeteer = require('puppeteer');
const { createLogger, transports } = require('winston');
// const http = require('http');
// const https = require('https');
const assert = require('assert');
const path = require('path');
const resolve = require('path').resolve;
// const keyCert = require('key-cert');
// const Promise = require('bluebird');
// const Proxy = require('http-mitm-proxy');

const debug = require('debug')('social_market:test');
const { BilibiliScraper } = require('../../src/modules/bilibili_scraper.js');
const { dirname } = require('path');
const fs = require("fs");

// const httpPort = 3012;
// const httpsPort = httpPort + 1;
// const proxyPort = httpPort + 2;

// const fakeSearchEngine = express();
// fakeSearchEngine.get('/search', (req, res, next) => {
//     debug('q=%s', req.query.q);
//     const pageNumber = Math.round((req.query.first || 0) /10) + 1;
//     res.sendFile(path.join(__dirname, '../mocks/bing/' + req.query.q + '_page' + pageNumber + '.html'));
// });
// fakeSearchEngine.use(express.static('test/mocks/bing', {extensions: ['html']}));

describe('Module Bilibili', function(){
    this.timeout(0);
    let browser;
    let page;
    // let httpServer, httpsServer, proxy;
    before(async function(){
        
        // debug('Fake http search engine servers started');
    });

    after(async function(){
        // proxy.close();
        // httpsServer.close();
        // httpServer.close();
       
    });

    
    beforeEach(async function(){
        debug('Start a new browser');
        browser = await puppeteer.launch({
            // timeout: 120000,
            //dumpio: true,
           //executablePath:'/usr/bin/google-chrome-stable',
            // headless: false,
            //slowMo: 250,
            ignoreHTTPSErrors: true,
            args: [
                '--disable-dev-shm-usage',
                "--window-size=1920,1080",
                "--window-position=1921,0",
                "--autoplay-policy=no-user-gesture-required",
            ],
            ignoreDefaultArgs: ["--mute-audio"],
            // args: [ '--proxy-server=http://localhost:' + proxyPort ]
        });
        debug('Open a fresh page');
        page = await browser.newPage();
        await page.setViewport({
        width: 1280,
        height: 768
    });
        // await page.setViewport({ width: 1280, height: 800 });
        const appDir = dirname(require.main.filename);
       
        let cookiesPath=resolve(appDir+"../../../../tmp/bilibili/liming/cookies.json");
        if (!fs.existsSync(cookiesPath)) {
            throw new Error(`Cannot find cookies file at ${cookiesPath}`);
          }
      
          let cookies = JSON.parse(await fs.promises.readFile(cookiesPath));
          // console.log(cookies);
          await page.setCookie(...cookies);
    });

    afterEach(async function(){
       await browser.close();
    });

    const testLogger = createLogger({
        transports: [
            new transports.Console({
                level: 'error'
            })
        ]
    });
    const bilibiScraper = new BilibiliScraper({
        config: {
            // search_engine_name: 'bing',
            throw_on_detection: true,
            // keywords: ['test keyword'],
            logger: testLogger,
            scrape_from_file: '',
        }
    });
    // bilibiScraper.STANDARD_TIMEOUT = 600000;
    it('search video by keyword', function(){
      
        const appDir = dirname(require.main.filename);
        let keyword="test";
        // let cookiespath=resolve(appDir+"../../../../tmp/bilibili/liming/cookies.json");
        
        return bilibiScraper.clickSearchbtn({page,keyword}).then((results)=>{
            assert.equal(results, true, 'result must be true');
        });
  
    });
    it('get video play link',async function(){
    
        // const appDir = dirname(require.main.filename);
        let keyword="测试";
        // let cookiespath=resolve(appDir+"../../../../tmp/bilibili/liming/cookies.json");
        // bilibiScraper.STANDARD_TIMEOUT = 500;
        await bilibiScraper.clickSearchbtn({page,keyword})
        return bilibiScraper.getVideolistlink({page}).then((results)=>{
            assert.equal(Array.isArray(results), true, 'result must be array');
        });
    });

    it('download single video',async function(){
        let link="https://www.bilibili.com/video/BV14V4y1d7y4/";
        // const appDir = dirname(require.main.filename);
        const videopath=resolve("./tmp/bilibili/liming");
        console.log(videopath)
        return bilibiScraper.downloadSigleVideo({link,videopath}).then((results)=>{
            assert.equal(results, true, 'result must be true');
        });
    });
    it('video-url-list',async function(){
        const keyword="test"
        return bilibiScraper.getVideourls({page,keyword}).then((results)=>{
            assert.equal(Array.isArray(results), true, 'result must be true');
        });
    })

});