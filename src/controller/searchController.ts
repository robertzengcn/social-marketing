// import { Usersearchdata } from '@/entityTypes/scrapeType';
//import { SMstruct, SearchDataParam,SearchResEntity } from "@/entityTypes/scrapeType"
// import { ScrapeManager } from "@/modules/scrapeManager"
// import {SearhEnginer} from "@/config/searchSetting"
// import { ToArray } from "@/modules/lib/function"
import {Usersearchdata,SearchtaskEntityNum } from "@/entityTypes/searchControlType"
// import {SearchTaskdb} from "@/model/searchTaskdb"
// import {SearchKeyworddb} from "@/model/searchKeyworddb"
// import {SearchResultdb} from "@/model/searchResultdb"
import { utilityProcess, MessageChannelMain} from "electron";
import * as path from 'path';
import * as fs from 'fs';
import {searhModel} from "@/modules/searchModel"
import { Token } from "@/modules/token"
// import {USERSDBPATH} from '@/config/usersetting';
import {SearchDataParam,SearchResEntityDisplay,SearchResEntityRecord} from "@/entityTypes/scrapeType"
// import {SEARCHEVENT} from "@/config/channellist"
import { SearchTaskStatus } from "@/model/searchTaskdb"
// import { SearchKeyworddb } from "@/model/searchKeyworddb";
import { CustomError } from "@/modules/customError";
import {USERLOGPATH,USEREMAIL} from '@/config/usersetting';
import {WriteLog,getApplogspath,getRandomValues} from "@/modules/lib/function"
import { v4 as uuidv4 } from 'uuid';
import {SortBy} from "@/entityTypes/commonType";


export class SearchController {
    private searhModel:searhModel;
    constructor() {
        this.searhModel=new searhModel()
    }
    
    public async searchData(data: Usersearchdata) {
        //search data

        // const SeachEnginArr = ToArray(SearhEnginer)

        // const iterator = SeachEnginArr.values();
        // console.log(iterator)
        // console.log("search enginer is"+data.searchEnginer)
        // //check data.searchEngin exist in iterator
        // let correct = false
        // for (const key of iterator) {
        //     console.log("key is "+key)
        //     //console.log("value is"+iterator[key])
        //     if (data.searchEnginer == key) {
        //         correct = true
        //         break
        //     }
        // }
        // if (!correct) {
        //     console.log("searchEnginer not exist")
        //     throw new Error("searchEnginer not exist")
        //     // return {
        //     //     status: false,
        //     //     msg: "searchEnginer not exist",
        //     //     data: null
        //     // }
        // }
        //console.log(data)
        // const seModel=new searhModel()
        // const enginName=this.searhModel.convertNumtoSE(data.searchEnginer)
        // if(!enginName){
        //     throw new CustomError("enginer name error",20240809160454)
        // }
        const dp:SearchDataParam={
            engine:data.searchEnginer,
            keywords:data.keywords
        }
        // console.log(dp)
        const taskId=await this.searhModel.saveSearchtask(dp)
        // const jsonData=JSON.stringify(data);
        //console.log(jsonData)
       const childPath = path.join(__dirname, 'utilityCode.js')
        if (!fs.existsSync(childPath)) {
            throw new Error("child js path not exist for the path " + childPath);
        }
        const { port1, port2 } = new MessageChannelMain()
        const tokenService=new Token()
        
        const child = utilityProcess.fork(childPath, [],{stdio:"pipe",execArgv:["puppeteer-cluster:*"]} )
        // console.log(path.join(__dirname, 'utilityCode.js'))
        let logpath=tokenService.getValue(USERLOGPATH)
        if(!logpath){
            const useremail=tokenService.getValue(USEREMAIL)
            //create log path
            logpath=getApplogspath(useremail)
        }
        // console.log(logpath)
        const uuid=uuidv4({random: getRandomValues(new Uint8Array(16))})
        const errorLogfile=path.join(logpath,'search_'+taskId.toString()+'_'+uuid+'.error.log')
        const runLogfile=path.join(logpath,'search_'+taskId.toString()+'_'+uuid+'.runtime.log')
       // console.log(errorLogfile)
        // console.log(data)
        // child.postMessage({ message: 'hello' }, [port1])
        child.on("spawn", () => {
            console.log("child process satart, pid is"+child.pid)
            child.postMessage(JSON.stringify({action:"searchscraper",data:data}),[port1])
            this.searhModel.updateTaskLog(taskId,runLogfile,errorLogfile)
        })
        
        child.stdout?.on('data', (data) => {
            console.log(`Received data chunk ${data}`)
            WriteLog(runLogfile,data)
           // child.kill()
        })
        child.stderr?.on('data', (data) => {
            const ingoreStr=["Debugger attached","Waiting for the debugger to disconnect","Most NODE_OPTIONs are not supported in packaged apps"]
            if(!ingoreStr.some((value)=>data.includes(value))){
                    
            // seModel.saveTaskerrorlog(taskId,data)
            console.log(`Received error chunk ${data}`)
            WriteLog(errorLogfile,data)
            this.searhModel.updateTaskStatus(taskId,SearchTaskStatus.Error)
            //child.kill()
            }
            
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
                this.searhModel.saveSearchResult(childdata.data,taskId)
                this.searhModel.updateTaskStatus(taskId,SearchTaskStatus.Complete)
                child.kill()
            }
        });
    }
    //return search result
    public listSearchresult(page:number,size:number,sortBy?:SortBy):SearchtaskEntityNum{
        // const seModel=new searhModel()
        // await seModel.init();
        const res=this.searhModel.listSearchtask(page,size, sortBy)
        return res;
    }   
    //list task search result
    public listtaskSearchResult(taskId:number,page:number,size:number):SearchResEntityRecord{
        // const seModel=new searhModel()
        const res=this.searhModel.listSearchResult(taskId,page,size)

        const datas: Array<SearchResEntityDisplay> = []
        //const SearchKeyDb=new SearchKeyworddb(this.dbpath)

        res.forEach((item) => {
            console.log(item)
            console.log(item.keyword_id)
            const keyEntity = this.searhModel.getkeywrodsEntitybyId(item.keyword_id)
            console.log(keyEntity)
            const data: SearchResEntityDisplay = {
                id: item.id,
                keyword_id: item.keyword_id,
                title: item.title,
                link: item.link,
                snippet: item.snippet,
                record_time: item.record_time,
                visible_link: item.visible_link,
                keyword: keyEntity.keyword
            }
            datas.push(data)
        })
        //return datas

        const total=this.searhModel.countSearchResult(taskId)
        const data:SearchResEntityRecord={
            total:total,
            record:datas
        }
        return data
    }
    public getTaskErrorlog(taskId:number):string{
        // const seModel=new searhModel()
        const log=this.searhModel.getTaskErrorLog(taskId)
        return log
    }


}