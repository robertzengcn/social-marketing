"use strict";
const se_scraper = require("./index.js");
const { ArgumentParser } = require("argparse");
const axios = require("axios");
const { version } = require("./package.json");
const fs = require('fs');
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
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
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
};

function get(object, key, default_value) {
  var result = object[key];
  return typeof result !== "undefined" ? result : default_value;
}

async function runCommand(parearg) {
  let action = get(parearg, "action", false);
  if (!action) {
    console.log("no parameter action been passed");
  }
  let campaignId = get(parearg, "campaign", false);

  let sosetting = await getRemoteConfig(campaignId);
  console.log(sosetting)
  if(sosetting== null){
    throw new Error("sosetting is undefined");
  }
  scrape_config.platform = sosetting.sotype;
  scrape_config.user = sosetting.socialuser;
  scrape_config.pass = sosetting.socialpass;
  console.log(sosetting);
  //create a tmp folder
  const tmppath = "./tmp/" + scrape_config.platform + "/" + sosetting.socialuser;
  await createPath(tmppath);

  switch (action) {
    case "login":
      login();
      break;
  }
}
//login to facebook
async function login() {
  await se_scraper.login(browser_config, scrape_config);
}

async function readenv() {
  //read config from .env file
  let envcofig = readConfig();
  //check key exist in object
  if (!envcofig.hasOwnProperty("REMOTEADD")) {
    throw new Error(`REMOTEADD not found in .env file`);
  }
  if (!envcofig.hasOwnProperty("REMOTEUSERNAME")) {
    throw new Error(`USERNAME not found in .env file`);
  }
  if (!envcofig.hasOwnProperty("REMOTEPASSWORD")) {
    throw new Error(`PASSWORD not found in .env file`);
  }
  return envcofig;
}
/**
 * read config from .env File
 *
 * @returns {object} config
 * */
function readConfig() {
  const result = require("dotenv").config();
  if (result.error) {
    throw result.error;
  }
  return result.parsed;
}

/**
 * get response from remote servive
 * @return object
 */
async function getRemoteConfig(campaignId) {
  let envconfig = await readenv();

  let sosetvar=await axios
    .get(envconfig.REMOTEADD + "/api/getsobyCam/?campaign_id=" + campaignId, {
      auth: {
        username: envconfig.REMOTEUSERNAME,
        password: envconfig.REMOTEPASSWORD,
      },
    })
    .then(function (res) {
      if (parseInt(res.status)!=200) {
        throw new Error("code not equal 200");
      }
      if (!res.data.status) {
        throw new Error("code not equal 200");
      }
      // console.log(res.status)
      // console.log(res.data.data.user)
      // console.log(res.data.data.pass)
      // console.log(res.data.data.proxy)
      const sosetting = {
        sotype: res.data.data.sotype,
        socialuser: res.data.data.user,
        socialpass: res.data.data.pass,
        proxy: {
          proxy: res.data.data.proxy.url,
          user: res.data.data.proxy.user,
          pass: res.data.data.proxy.pass,
        },
      };
      return sosetting;
    })
    .catch(function (error) {
      console.error(error);
    });
    
    return sosetvar;
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
//login to youtube
// async function youtubelogin() {
//     await se_scraper.ytblogin(browser_config, scrape_config);
//   }
runCommand(parearg);
