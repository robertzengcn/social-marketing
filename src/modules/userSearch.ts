import { Usersearchdata } from "@/entityTypes/searchControlType"
import { ScrapeManager } from "@/modules/scrapeManager"
import { SMstruct, SearchDataParam } from "@/entityTypes/scrapeType"
import { Cluster } from "puppeteer-cluster"
import { SearhEnginer } from "@/config/searchSetting"
import { ToArray } from "@/modules/lib/function"
import { i } from "vitest/dist/reporters-1evA5lom"
import { CustomError } from "@/modules/customError"
import {SearchDataRun} from "@/entityTypes/scrapeType"
export class UserSearch {
    public async searchData(data: Usersearchdata,callback?: (arg: SearchDataRun) => void):Promise<SearchDataRun> {
        //search data in search engineer
    //    console.log(data)
    //    console.log("show browser value is "+data.notShowBrowser)
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
        const SeachEnginArr = ToArray(SearhEnginer)
        let enginer = ""
        SeachEnginArr.forEach(async (value, key) => {
            if (data.searchEnginer == value) {
                enginer = value
            }
        })
        if(!enginer){
            throw new CustomError("search enginer is incorrect",20240801112434)
        }

        // await scraper.start()
        const searchDataParam: SearchDataParam = {
            keywords: keywords,
            engine: enginer,
        }
       const results = await scraper.searchdata(searchDataParam)
        //console.log(results)
        if(callback){
            callback(results)
        }
        return results
    }

}