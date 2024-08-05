// import { Usersearchdata } from '@/entityTypes/scrapeType';
//import { SMstruct, SearchDataParam,SearchResEntity } from "@/entityTypes/scrapeType"
// import { ScrapeManager } from "@/modules/scrapeManager"
import {SearhEnginer} from "@/config/searchSetting"
import { ToArray } from "@/modules/lib/function"
import { SearchResponse,Usersearchdata } from "@/entityTypes/searchControlType"
// import {SearchTaskdb} from "@/model/searchTaskdb"
// import {SearchKeyworddb} from "@/model/searchKeyworddb"
// import {SearchResultdb} from "@/model/searchResultdb"
import { utilityProcess, MessageChannelMain} from "electron";
import * as path from 'path';
import * as fs from 'fs';
import {searhModel} from "@/modules/searchModel"
// import { Token } from "@/modules/token"
// import {USERSDBPATH} from '@/config/usersetting';
import {SearchDataParam} from "@/entityTypes/scrapeType"

export class SearchController {

    public async searchData(data: Usersearchdata) {
        //search data

        const SeachEnginArr = ToArray(SearhEnginer)

        const iterator = SeachEnginArr.values();
        console.log(iterator)
        console.log("search enginer is"+data.searchEnginer)
        //check data.searchEngin exist in iterator
        let correct = false
        for (const key of iterator) {
            console.log("key is "+key)
            console.log("value is"+iterator[key])
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
        const seModel=new searhModel()
        const enginName=seModel.convertNumtoSE(data.searchEnginer)
        const dp:SearchDataParam={
            engine:enginName,
            keywords:data.keywords
        }
        const taskId=await seModel.saveSearchtask(dp)
        // const jsonData=JSON.stringify(data);
        //console.log(jsonData)
       const childPath = path.join(__dirname, 'utilityCode.js')
        if (!fs.existsSync(childPath)) {
            throw new Error("child js path not exist for the path " + childPath);
        }
        const { port1, port2 } = new MessageChannelMain()
        // const tokenService=new Token()
        // const dbpath=await tokenService.getValue(USERSDBPATH)
        // if(!dbpath){
        //     throw new Error("user path not exist")
        // }
       // console.log(jsonData)
        const child = utilityProcess.fork(path.join(__dirname, 'utilityCode.js'), [],{stdio:"pipe",execArgv:["puppeteer-cluster:*"]} )
        console.log(path.join(__dirname, 'utilityCode.js'))
        
        // child.postMessage({ message: 'hello' }, [port1])
        child.on("spawn", () => {
            console.log("child process satart, pid is"+child.pid)
            child.postMessage(JSON.stringify({action:"searchscraper",data:data}),[port1])
            // setInterval(() => {
            //     child.postMessage({ message: 'hello from parent' })
            //     child.postMessage({ data: jsonData })
                
            //   }, 1000); 
        })
        
        child.stdout?.on('data', (data) => {
            console.log(`Received data chunk ${data}`)
           // child.kill()
        })
        child.stderr?.on('data', (data) => {
            seModel.saveTaskerrorlog(taskId,data)
            console.log(`Received error chunk ${data}`)
          
        })
        child.on("exit", (code) => {
            if (code !== 0) {
                console.error(`Child process exited with code ${code}`);
                
            } else {
                console.log('Child process exited successfully');
            }
        })
        child.on('message', (message) => {
            console.log("get message from child")
            console.log('Message from child:', JSON.parse(message));
            const childdata=JSON.parse(message)
            if(childdata.action=="saveres"){
                //save result
                seModel.saveSearchResult(childdata.data)
            }
        });
    


    }

    public async listSearchresult():Promise<null>{
        const seModel=new searhModel()
        
    }

}