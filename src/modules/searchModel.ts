import { SearchDataParam } from "@/entityTypes/scrapeType"
import { SearchTaskdb } from "@/model/searchTaskdb"
import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import { SearhEnginer } from "@/config/searchSetting"
import { ToArray } from "@/modules/lib/function"
import { SearchKeyworddb } from "@/model/searchKeyworddb"
import { SearchDataRun } from "@/entityTypes/scrapeType"
import { SearchResultdb } from "@/model/searchResultdb"
import { SearchResEntity } from "@/entityTypes/scrapeType"
export class searhModel {

    //save search task, call it when user start search keyword
    public async saveSearchtask(data: SearchDataParam) {
        console.log("save search task")
        const tokenService = new Token()
        const dbpath = await tokenService.getValue(USERSDBPATH)
        if (!dbpath) {
            throw new Error("user path not exist")
        }
        const searchtask = new SearchTaskdb(dbpath)
        const enginId = this.convertSEtoNum(data.engine)
        const taskId = searchtask.saveSearchTask(enginId)
        const searshdb = new SearchKeyworddb(dbpath)
        data.keywords.forEach(async (keyword) => {
            searshdb.saveSearchKeyword(keyword, Number(taskId))
        })
    }
    //convert search enginer name to number
    public convertSEtoNum(enginerName: string): number {
        const SeachEnginArr = ToArray(SearhEnginer)
        let enginer = 0
        SeachEnginArr.forEach(async (value, key) => {
            if (enginerName == value) {
                enginer = key
            }
        })
        return enginer
    }
    //convert search enginer number to name
    public convertNumtoSE(enginerNum: number): string {
        const SeachEnginArr = ToArray(SearhEnginer)
        let enginer = ""
        SeachEnginArr.forEach(async (value, key) => {
            if (enginerNum == key) {
                enginer = value
            }
        })
        return enginer
    }
    //save search result
    public async saveSearchResult(data: SearchDataRun) {
        const tokenService = new Token()
        const dbpath = await tokenService.getValue(USERSDBPATH)
        if (!dbpath) {
            throw new Error("user path not exist")
        }
        const serkeyModel = new SearchKeyworddb(dbpath)
        console.log("save search result")
        //loop map of SearchDataRun and save it to db
        // Ensure data.results is a Map
        const resultsMap = new Map(Object.entries(data.results));
        console.log(resultsMap);
        const serResultModel = new SearchResultdb(dbpath)
        for (const [key, value] of resultsMap) {
            console.log(key)
            //get keyword id
            const keywordId = serkeyModel.getKeywordId(key)
            console.log(value)
            const resval = new Map(Object.entries(value));
            for (const [rvkey, rvvalue] of resval) {
                console.log(rvkey)
                // console.log(rvvalue)
                console.log(rvvalue.value)
                rvvalue.value.forEach((item) => {
                    console.log(item)
                    if (item.link) {
                        const reEntity: SearchResEntity = {
                            keywordId: Number(keywordId),
                            link: item.link,
                            title: item.title,
                            snippet: item.snippet,
                            visible_link: item.visible_link,
                        }
                        serResultModel.saveResult(reEntity)
                    }

                })
                // for (const [itemkey,itemvalue] of rvvalue){
                //     console.log(itemkey)
                //     console.log(itemvalue)
                // }

                // serResultModel.saveResult()
            }
            // Save each key-value pair to the database
            console.log(`Saving result for key: ${key}, value: ${value}`);
            // Add your database save logic here
        }
    }
}