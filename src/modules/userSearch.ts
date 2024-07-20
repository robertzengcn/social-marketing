import { Usersearchdata } from "@/entityTypes/searchControlType"
import { ScrapeManager } from "@/modules/scrapeManager"
import { SMstruct, SearchDataParam } from "@/entityTypes/scrapeType"
import { Cluster } from "puppeteer-cluster"
import { SearhEnginer } from "@/config/searchSetting"
import { ToArray } from "@/modules/lib/function"
export class UserSearch {
    public async searchData(data: Usersearchdata) {
        //search data in search engineer
        const smConfig: SMstruct = {
            headless: data.notShowBrowser,
            debug_level: 1,
            puppeteer_cluster_config: {
                timeout: 30 * 60 * 1000, // max timeout set to 10 minutes
                monitor: true,
                concurrency: Cluster.CONCURRENCY_BROWSER,
                // concurrency:data.concurrency, // one scraper per tab
                maxConcurrency: data.concurrency, // scrape with 1 tab
            },
            num_pages: data.num_pages,
        }
        const keywords = data.keywords
         const scraper = new ScrapeManager(smConfig)
    //     const SeachEnginArr = ToArray(SearhEnginer)
    //     let enginer = ""
    //     SeachEnginArr.forEach(async (value, key) => {
    //         if (data.searchEnginer == key) {
    //             enginer = value
    //         }
    //     })
    //     // await scraper.start()
    //     const searchDataParam: SearchDataParam = {
    //         keywords: keywords,
    //         engine: enginer,
    //     }
    //    const results = await scraper.searchdata(searchDataParam)
    //     console.log(results)
    }

}