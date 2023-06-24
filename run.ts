"use strict";
export {};
const se_scraper = require("./index");
const { ArgumentParser } = require("argparse");
import {RemoteSource} from "./src/remotesource";
const { version } = require("./package.json");
const fs = require('fs');
const resolve = require('path').resolve;
const debug = require('debug')('runjs:runjs');
// const { data } = require("cheerio/lib/api/attributes.js");

const parser = new ArgumentParser({
  description: "Social martketing",
});

parser.add_argument("-v", "--version", { action: "version", version });
parser.add_argument("-a", "--action", {
  help: "Tha action you want to the program to take",
});
parser.add_argument("-c", "--campaign", {
  help: "Tha campaign id you want to program to take",
});

let parearg = parser.parse_args();

// those options need to be provided on startup
// and cannot give to se-scraper on scrape() calls
let browser_config = {
  // the user agent to scrape with
  user_agent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
  // if random_user_agent is set to True, a random user agent is chosen
  random_user_agent: false,
  // whether to start the browser in headless mode
  headless: false,
  // whether debug information should be printed
  // level 0: print nothing
  // level 1: print most important info
  // ...
  // level 4: print all shit nobody wants to know
  debug_level: 1,
  // specify flags passed to chrome here
  chrome_flags: [],
  // path to js module that extends functionality
  // this module should export the functions:
  // get_browser, handle_metadata, close_browser
  // must be an absolute path to the module
  //custom_func: resolve('examples/pluggable.js'),
  custom_func: "",
  // use a proxy for all connections
  // example: 'socks5://78.94.172.42:1080'
  // example: 'http://118.174.233.10:48400'
  proxy: "",
  // a file with one proxy per line. Example:
  // socks5://78.94.172.42:1080
  // http://118.174.233.10:48400
  proxy_file: "",
  use_cluster:false,
  puppeteer_cluster_config: {
    timeout: 10 * 60 * 1000, // max timeout set to 10 minutes
    monitor: false,
    concurrency: 1, // one scraper per tab
    maxConcurrency: 1, // scrape with 1 tab
  },
};

let scrape_config = {
  // which search engine to scrape
  // platform: "facebook",
  // an array of keywords to scrape
  keywords: ["cloud service test"],
  // the number of pages to scrape for each keyword
  num_pages: 1,

  // OPTIONAL PARAMS BELOW:
  // google_settings: {
  //     gl: 'us', // The gl parameter determines the Google country to use for the query.
  //     hl: 'fr', // The hl parameter determines the Google UI language to return results.
  //     start: 0, // Determines the results offset to use, defaults to 0.
  //     num: 100, // Determines the number of results to show, defaults to 10. Maximum is 100.
  // },
  // instead of keywords you can specify a keyword_file. this overwrites the keywords array
  keyword_file: "",
  // how long to sleep between requests. a random sleep interval within the range [a,b]
  // is drawn before every request. empty string for no sleeping.
  sleep_range: "",
  // path to output file, data will be stored in JSON
  output_file: "/tmp/test/test.json",
  // whether to prevent images, css, fonts from being loaded
  // will speed up scraping a great deal
  block_assets: false,
  // check if headless chrome escapes common detection techniques
  // this is a quick test and should be used for debugging
  test_evasion: false,
  apply_evasion_techniques: true,
  // log ip address data
  log_ip_address: false,
  // log http headers
  log_http_headers: false,
  platform: "facebook",
  user: "",
  pass: "",
  tmppath:"",
  taskid:0,
};

function get(object:Array<string>, key:string, default_value) {
  var result = object[key];
  return typeof result !== "undefined" ? result : default_value;
}

async function runCommand(parearg) {
  let action = get(parearg, "action", false);
  if (!action) {
    console.log("no parameter action been passed");
  }
 
  switch (action) {
    case "login":
      login();
      break;
    case "task":
      getcampaign();
      break; 
  }
}
//get campaign
async function getcampaign() {
  var remotesource =new RemoteSource();
  const campaignlist=await remotesource.getCampaignlist()
  debug(campaignlist)
  if(!campaignlist){
    throw new Error("campaignlist is undefined");
  }
  const arrLength = campaignlist?.length ?? 0;
  if(arrLength==0){
    console.log("not campaign need to run")
  }
  for (const campaign of campaignlist) {
    switch (campaign.type) {
      case "bilibilidownload":
        scrape_config.platform="bilibili"
        scrape_config.taskid=campaign.id
        scrape_config.keywords=campaign.keywords
        se_scraper.searchdata(browser_config, scrape_config);
        break;
    }
  }  
}
//login to facebook
async function login() {
  let campaignId = get(parearg, "campaign", false);
  var remotesource =new RemoteSource();
  let sosetting = await remotesource.getRemoteConfig(campaignId);
  debug(sosetting)
  if(sosetting== null){
    throw new Error("sosetting is undefined");
  }
  scrape_config.platform = sosetting.sotype;
  scrape_config.user = sosetting.socialuser;
  scrape_config.pass = sosetting.socialpass;
  console.log(sosetting);
  //create a tmp folder
  const tmppath = resolve("./tmp/" + scrape_config.platform + "/" + sosetting.socialuser);
  await createPath(tmppath);
  scrape_config.tmppath=tmppath

  await se_scraper.login(browser_config, scrape_config);
}

function createPath(path) {
  path.split("/").reduce((directories, directory) => {
    directories += `${directory}/`;

    if (!fs.existsSync(directories)) {
      fs.mkdirSync(directories);
    }

    return directories;
  }, "");
}

runCommand(parearg);
