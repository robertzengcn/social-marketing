'use strict';
const se_scraper = require('./index.js');
const { ArgumentParser } = require('argparse');
const { version } = require('./package.json');


const parser = new ArgumentParser({
    description: 'Social martketing'
});

parser.add_argument('-v', '--version', { action: 'version', version });
parser.add_argument('-a', '--action', { help: 'Tha action you want to the program to take' });

let parearg=parser.parse_args()


// those options need to be provided on startup
// and cannot give to se-scraper on scrape() calls
let browser_config = {
    // the user agent to scrape with
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
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
    custom_func: '',
    // use a proxy for all connections
    // example: 'socks5://78.94.172.42:1080'
    // example: 'http://118.174.233.10:48400'
    proxy: '',
    // a file with one proxy per line. Example:
    // socks5://78.94.172.42:1080
    // http://118.174.233.10:48400
    proxy_file: '',
    puppeteer_cluster_config: {
        timeout: 10 * 60 * 1000, // max timeout set to 10 minutes
        monitor: false,
        concurrency: 1, // one scraper per tab
        maxConcurrency: 1, // scrape with 1 tab
    }
};

function get(object, key, default_value) {
    var result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
}

function runCommand(parearg){
    let action=get(parearg,"action",false)
    if(!action){
        console.log("no parameter action been passed")
    }
    switch(action){
        case 'fblogin':
            
            break;
    }
}
runCommand(parearg);
// (async () => {
//    await 
// })();

