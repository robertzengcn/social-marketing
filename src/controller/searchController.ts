// import { Usersearchdata } from '@/entityTypes/scrapeType';
//import { SMstruct, SearchDataParam,SearchResEntity } from "@/entityTypes/scrapeType"
// import { ScrapeManager } from "@/modules/scrapeManager"
import {SearhEnginer} from "@/config/searchSetting"
import { ToArray } from "@/modules/lib/function"
import { SearchResponse,Usersearchdata } from "@/entityTypes/searchControlType"
import {SearchTaskdb} from "@/model/searchTaskdb"
import {SearchKeyworddb} from "@/model/searchKeyworddb"
import {SearchResultdb} from "@/model/searchResultdb"
import { utilityProcess, MessageChannelMain} from "electron";
import * as path from 'path';
import * as fs from 'fs';
import { Token } from "@/modules/token"
import {USERSDBPATH} from '@/config/usersetting';

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


        const jsonData=JSON.stringify(data);
       const childPath = path.join(__dirname, 'utilityCode.js')
        if (!fs.existsSync(childPath)) {
            throw new Error("child js path not exist for the path " + childPath);
        }
        // const { port1, port2 } = new MessageChannelMain()
        const tokenService=new Token()
        const dbpath=await tokenService.getValue(USERSDBPATH)
        if(!dbpath){
            throw new Error("user path not exist")
        }
        console.log(jsonData)
        const child = utilityProcess.fork(path.join(__dirname, 'utilityCode.js'), ['searchscraper',jsonData],{stdio:"pipe",execArgv:["puppeteer-cluster:*"]} )
        console.log(path.join(__dirname, 'utilityCode.js'))
        
        // child.postMessage({ message: 'hello' }, [port1])
        child.on("spawn", () => {
            console.log("child process satart, pid is"+child.pid)
            
            setInterval(() => {
                child.postMessage({ message: 'hello from parent' })
                
              }, 1000); 
        })
        
        child.stdout?.on('data', (data) => {
            console.log(`Received data chunk ${data}`)
           // child.kill()
        })
        child.stderr?.on('data', (data) => {
            console.log(`Received error chunk ${data}`)
          
        })
        child.on("exit", () => {
            console.log(`child process exited `)
        })
        // port2.start()
        // port2.on("message", (e) => {
        //     console.log("port receive:", e.data);
        //     port2.postMessage("I receive your messages:")
        // })
        
        // child.on("message", (e) => {
        //     console.log("接收到消息了：", e);
        // })


    }

}