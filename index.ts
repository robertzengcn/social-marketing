const se_scraper = require("./src/node_socialmk");
var Scraper = require("./src/modules/social_scraper");

async function login(browser_config:object, scrape_config:object) {
  // scrape config overwrites the browser_config
  Object.assign(browser_config, scrape_config);

  var scraper = new se_scraper.ScrapeManager(browser_config);
  // var remoteConfig=await scraper.getRemoteConfig();
  await scraper.start();

  var results = await scraper.login(scrape_config);

  await scraper.quit();

  return results;
}
//get data urls
async function searchdata(browser_config, scrape_config) {
  // scrape config overwrites the browser_config
  Object.assign(browser_config, scrape_config);

  var scraper = new se_scraper.ScrapeManager(browser_config);
  // var remoteConfig=await scraper.getRemoteConfig();
  await scraper.start();
  var results = await scraper.searchdata(scrape_config);

  await scraper.quit();
}

module.exports = {
  searchdata: searchdata,
  login: login,
  // ytblogin:ytblogin,
  ScrapeManager: se_scraper.ScrapeManager,
  Scraper: Scraper,
};
