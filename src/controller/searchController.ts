// import { Usersearchdata } from '@/entityTypes/scrapeType';
import { SMstruct, SearchDataParam,SearchResEntity } from "@/entityTypes/scrapeType"
import { ScrapeManager } from "@/modules/scrapeManager"
import {SearhEnginer} from "@/config/searchSetting"
import { ToArray } from "@/modules/lib/function"
import { SearchResponse,Usersearchdata } from "@/entityTypes/searchControlType"
import {SearchTaskdb} from "@/model/searchTaskdb"
import {SearchKeyworddb} from "@/model/searchKeyworddb"
import {SearchResultdb} from "@/model/searchResultdb"
import { utilityProcess, MessageChannelMain} from "electron";
import * as path from 'path';
import * as fs from 'fs';
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

        // const smConfig: SMstruct = {
        //     headless: data.notShowBrowser,
        //     debug_level: 1,
        //     puppeteer_cluster_config: {
        //         timeout: 30 * 60 * 1000, // max timeout set to 10 minutes
        //         monitor: true,
        //         concurrency: data.concurrency, // one scraper per tab
        //         maxConcurrency: 1, // scrape with 1 tab
        //     },
        //     num_pages: 3,
        // }
        // const keywords = data.keywords
        // const scraper = new ScrapeManager(smConfig)
        // // await scraper.start()
        // const searchDataParam: SearchDataParam = {
        //     keywords: keywords,
        //     engine: SeachEnginArr[data.searchEnginer],
        // }

        // const result = await scraper.searchdata(searchDataParam)
        // if(!result){
        //     return {
        //         status:false,
        //         msg:"remote return empty",
        //         data:null
        //     }
        // }
        // const searchtask=new SearchTaskdb()
        // const taskId=searchtask.saveSearchTask(data.searchEnginer)
        // const keywordDb=new SearchKeyworddb()
        // const serachres=new SearchResultdb()
        // for(const key in result.results){
        //     //save search result
        //     const keywordId=keywordDb.saveSearchKeyword(key,Number(taskId))
        //     const st=result.results[key]
        // }

       //create child process

       const childPath = path.join(__dirname, 'utilityCode.js')
        if (!fs.existsSync(childPath)) {
            throw new Error("child js path not exist for the path " + childPath);
        }
        const { port1, port2 } = new MessageChannelMain()

        const child = utilityProcess.fork(path.join(__dirname, 'utilityCode.js'), [],{stdio:"pipe",execArgv:["puppeteer-cluster:*"]} )
        console.log(path.join(__dirname, 'utilityCode.js'))
        
        // child.postMessage({ message: 'hello' }, [port1])
        child.on("spawn", () => {
            console.log("child id is"+child.pid)
            child.postMessage({ message: 'hello' }, [port1])
        })
        child.stdout?.on('data', (data) => {
            console.log(`Received data chunk ${data}`)
            
        })
        child.stderr?.on('data', (data) => {
            console.log(`Received error chunk ${data}`)
          
        })
        child.on("exit", () => {
            console.log(`child process exited `)
        })
        port2.start()
        port2.on("message", (e) => {
            console.log("port receive:", e.data);
            port2.postMessage("I receive your messages:")
        })
        
        child.on("message", (e) => {
            console.log("接收到消息了：", e);
        })

    }

}