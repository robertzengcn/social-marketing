import { Usersearchdata } from '@/entityTypes/scrapeType';
import { SMstruct, SearchDataParam } from "@/entityTypes/scrapeType"
import { ScrapeManager } from "@/modules/scrapeManager"
import { SearhEnginer } from "@/model/searchTaskdb"
import { ToArray } from "@/modules/lib/function"
import { SearchResponse } from "@/entityTypes/searchControlType"
import {SearchTaskdb} from "@/model/searchTaskdb"
import {SearchKeyworddb} from "@/model/searchKeyworddb"
import {SearchResultdb} from "@/model/searchResultdb"
export class SearchController {

    public async searchData(data: Usersearchdata) {
        //search data

        const SeachEnginArr = ToArray(SearhEnginer)

        const iterator = SeachEnginArr.keys();
        //check data.searchEngin exist in iterator
        let correct = false
        for (const key of iterator) {
            if (data.searchEnginer == key) {
                correct = true
                break
            }
        }
        if (!correct) {
            return {
                status: false,
                msg: "searchEnginer not exist",
                data: null
            }
        }

        const smConfig: SMstruct = {
            headless: data.notShowBrowser,
            debug_level: 1,
            puppeteer_cluster_config: {
                timeout: 30 * 60 * 1000, // max timeout set to 10 minutes
                monitor: true,
                concurrency: data.concurrency, // one scraper per tab
                maxConcurrency: 1, // scrape with 1 tab
            },
            num_pages: 3,
        }
        const keywords = data.keywords
        const scraper = new ScrapeManager(smConfig)
        // await scraper.start()
        const searchDataParam: SearchDataParam = {
            keywords: keywords,
            engine: SeachEnginArr[data.searchEnginer],
        }

        const result = await scraper.searchdata(searchDataParam)
        if(!result){
            return {
                status:false,
                msg:"remote return empty",
                data:null
            }
        }
        const searchtask=new SearchTaskdb()
        const taskId=searchtask.saveSearchTask(data.searchEnginer)
        const keywordDb=new SearchKeyworddb()
        const serachres=new SearchResultdb()
        for(const key in result.results){
            //save search result
            const keywordId=keywordDb.saveSearchKeyword(key,Number(taskId))
            serachres.saveResult(result.results[key],Number(keywordId))
        }

    }

}