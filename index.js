const se_scraper = require('./src/node_socialmk.js');
var Scraper = require('./src/modules/social_scraper');

async function login(browser_config, scrape_config) {
    // scrape config overwrites the browser_config
    Object.assign(browser_config, scrape_config);
    
    var scraper = new se_scraper.ScrapeManager(browser_config);
  // var remoteConfig=await scraper.getRemoteConfig();
    await scraper.start();

    var results = await scraper.login(scrape_config);
    
    await scraper.quit();

    return results;
}
//youtube login
// async function ytblogin(browser_config, scrape_config) {
//     // scrape config overwrites the browser_config
//     Object.assign(browser_config, scrape_config);

//     var scraper = new se_scraper.ScrapeManager(browser_config);

//     await scraper.start();

//     var results = await scraper.ytblogin(scrape_config);

//     await scraper.quit();

//     return results;
// }

module.exports = {
    login: login,
    // ytblogin:ytblogin,
    ScrapeManager: se_scraper.ScrapeManager,
    Scraper: Scraper,
};
