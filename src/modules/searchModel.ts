import { SearchDataParam } from "@/entityTypes/scrapeType"
import { SearchTaskdb,SearchTaskStatus } from "@/model/searchTaskdb"
import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import { SearhEnginer } from "@/config/searchSetting"
import { ToArray } from "@/modules/lib/function"
import { SearchKeyworddb } from "@/model/searchKeyworddb"
import { SearchDataRun } from "@/entityTypes/scrapeType"
import { SearchResultdb } from "@/model/searchResultdb"
import { SearchResEntity } from "@/entityTypes/scrapeType"
//import {SearchTaskdb} from "@/model/searchTaskdb"
import {SearchtaskEntityNum,SearchtaskItem} from "@/entityTypes/searchControlType"
import {getEnumKeyByValue,getEnumValueByNumber} from "@/modules/lib/function"

export class searhModel {
    private dbpath: string
    private taskdbModel:SearchTaskdb
    constructor(){
        const tokenService = new Token()
        const dbpath = tokenService.getValue(USERSDBPATH)
        if (!dbpath) {
            throw new Error("user path not exist")
        }
        this.dbpath=dbpath
        this.taskdbModel=new SearchTaskdb(this.dbpath)
    }

    //save search task, call it when user start search keyword
    public async saveSearchtask(data: SearchDataParam):Promise<number> {
        console.log("save search task")
        // const tokenService = new Token()
        // const dbpath = await tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        //const searchtask = new SearchTaskdb(this.dbpath)
        const enginId = this.convertSEtoNum(data.engine)
        if(!enginId){
            throw new Error("enginerId empty")
        }
        const taskId = this.taskdbModel.saveSearchTask(enginId)
        const searshdb = new SearchKeyworddb(this.dbpath)
        data.keywords.forEach(async (keyword) => {
            searshdb.saveSearchKeyword(keyword, Number(taskId))
        })
        return Number(taskId)
    }
    //convert search enginer name to number
    public convertSEtoNum(enginerName: string): number|undefined {
        // const SeachEnginArr = ToArray(SearhEnginer)
        // let enginer = 0
        // SeachEnginArr.forEach((value, key) => {
        //     if (enginerName == value) {
        //         enginer = key
        //     }
        // })
        const enginId=getEnumKeyByValue(SearhEnginer,enginerName)
        return enginId
    }
    //convert search enginer number to name
    public convertNumtoSE(enginerNum: number): string|undefined {
        // const SeachEnginArr = ToArray(SearhEnginer)
        // let enginer = ""
        // SeachEnginArr.forEach((value, key) => {
        //     if (enginerNum == key) {
        //         enginer = value
        //     }
        // })
        const enginerName=getEnumValueByNumber(SearhEnginer,enginerNum)
        return enginerName
    }
    //save search result
    public async saveSearchResult(data: SearchDataRun) {
        // const tokenService = new Token()
        // const dbpath = await tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        const serkeyModel = new SearchKeyworddb(this.dbpath)
        console.log("save search result")
        //loop map of SearchDataRun and save it to db
        // Ensure data.results is a Map
        const resultsMap = new Map(Object.entries(data.results));
        console.log(resultsMap);
        const serResultModel = new SearchResultdb(this.dbpath)
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

    public async saveTaskerrorlog(taskId:number, errorLog:string){
        // const tokenService = new Token()
        // const dbpath = await tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        //const taskdbModel=new SearchTaskdb(this.dbpath)
        this.taskdbModel.updatetasklog(taskId,errorLog)
    }
    //return data for search list 
    public listSearchtask():SearchtaskEntityNum{
        // const tokenService = new Token()
        // const dbpath = await tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        //const taskdbModel=new SearchTaskdb(this.dbpath)
        const tasklist=this.taskdbModel.listTask()
        const searchKeydb=new SearchKeyworddb(this.dbpath)
        const taskdata:Array<SearchtaskItem>=[]
        //convert task list to search item list
        tasklist.forEach((item)=>{
            const data:SearchtaskItem={
                id:item.id,
                enginer_name:this.convertNumtoSE(item.enginer_id),
                status:this.taskdbModel.taskStatusToString(item.status),
                keywords:searchKeydb.getkeywrodsbyTask(item.id),
                record_time:item.record_time
            }
            data.keywordline=data.keywords.join(',')
            
            taskdata.push(data) 
        });
        //check number
        const number=this.taskdbModel.getTaskTotal()
        const data:SearchtaskEntityNum={
            total:number,
            records:taskdata
        }
        return data
    }
    //upate task status
    public updateTaskStatus(taskId:number,status:SearchTaskStatus){
        this.taskdbModel.updatetaskstatus(taskId,status)
    }
    
}