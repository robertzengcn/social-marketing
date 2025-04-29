import { SearchDataParam } from "@/entityTypes/scrapeType"
import { SearchTaskModel, SearchTaskStatus } from "@/model/SearchTask.model"
import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import { SearhEnginer } from "@/config/searchSetting"
// import { ToArray } from "@/modules/lib/function"
import { SearchKeywordModel } from "@/model/SearchKeyword.model"
import { SearchResultdb } from "@/model/searchResultdb"
import { SearchResEntity, SearchDataRun } from "@/entityTypes/scrapeType"
//import {SearchTaskdb} from "@/model/searchTaskdb"
import { SearchtaskEntityNum, SearchtaskItem } from "@/entityTypes/searchControlType"
import { getEnumKeyByValue, getEnumValueByNumber } from "@/modules/lib/function"
import * as path from 'path';
import * as fs from 'fs';
import {SortBy} from "@/entityTypes/commonType";
import { BaseModule } from "@/modules/baseModule";
export class searhModel extends BaseModule {
   // private dbpath: string
    private taskdbModel: SearchTaskModel
    private serResultModel: SearchResultdb
    private serKeywordModel: SearchKeywordModel
    constructor() {
        // const tokenService = new Token()
        // const dbpath = tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        // this.dbpath = dbpath
        super()
        this.taskdbModel = new SearchTaskModel(this.dbpath)
        this.serResultModel = new SearchResultdb(this.dbpath)
        this.serKeywordModel = new SearchKeywordModel(this.dbpath)
    }

    //save search task, call it when user start search keyword
    public async saveSearchtask(data: SearchDataParam): Promise<number> {
        console.log("save search task")
        // const tokenService = new Token()
        // const dbpath = await tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        //const searchtask = new SearchTaskdb(this.dbpath)
        const enginId = this.convertSEtoNum(data.engine)
        if (!enginId) {
            throw new Error("enginerId empty")
        }
        const taskId = await this.taskdbModel.saveSearchTask(enginId)
        //const searshdb = new SearchKeyworddb(this.dbpath)
        for (const keyword of data.keywords) {
            await this.serKeywordModel.saveSearchKeyword(keyword, Number(taskId))
        }
        return Number(taskId)
    }
    //convert search enginer name to number
    public convertSEtoNum(enginerName: string): number | undefined {
        // const SeachEnginArr = ToArray(SearhEnginer)
        // let enginer = 0
        // SeachEnginArr.forEach((value, key) => {
        //     if (enginerName == value) {
        //         enginer = key
        //     }
        // })
        const enginId = getEnumKeyByValue(SearhEnginer, enginerName)
        return enginId
    }
    //convert search enginer number to name
    public convertNumtoSE(enginerNum: number): string | undefined {
        // const SeachEnginArr = ToArray(SearhEnginer)
        // let enginer = ""
        // SeachEnginArr.forEach((value, key) => {
        //     if (enginerNum == key) {
        //         enginer = value
        //     }
        // })
        const enginerName = getEnumValueByNumber(SearhEnginer, enginerNum)
        return enginerName
    }
    //save search result
    public async saveSearchResult(data: SearchDataRun, taskId: number) {
        // const tokenService = new Token()
        // const dbpath = await tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        //const serkeydb = new SearchKeyworddb(this.dbpath)
        console.log("save search result")
        //loop map of SearchDataRun and save it to db
        // Ensure data.results is a Map
        const resultsMap = new Map(Object.entries(data.results));
        console.log(resultsMap);
        //const serResultModel = new SearchResultdb(this.dbpath)
        for (const [key, value] of resultsMap) {
            //console.log(key)
            //get keyword id by task and string
            const keywordId = await this.serKeywordModel.getKeywordId(key, taskId)
            console.log(value)
            const resval = new Map(Object.entries(value));
            const linkearr: Array<string> = []
            for (const [rvkey, rvvalue] of resval) {
                console.log(rvkey)
                // console.log(rvvalue)
                console.log(rvvalue.value)
                //defined an link array, for remove duplicate item
                if(rvvalue.value){
                rvvalue.value.forEach((item) => {
                    console.log(item)
                    if (item.link) {
                        //check link exist in array
                        if (!linkearr.includes(item.link)) {
                            const reEntity: SearchResEntity = {
                                keyword_id: Number(keywordId),
                                link: item.link,
                                title: item.title,
                                snippet: item.snippet,
                                visible_link: item.visible_link,
                            }
                            this.serResultModel.saveResult(reEntity)
                            linkearr.push(item.link)
                        }
                    }

                })
            }
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

    public async saveTaskerrorlog(taskId: number, errorLog: string) {
        // const tokenService = new Token()
        // const dbpath = await tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        //const taskdbModel=new SearchTaskdb(this.dbpath)
        this.taskdbModel.updateTaskLog(taskId, errorLog)
    }
    //return data for search list 
    public async listSearchtask(page:number,size:number, sortBy?:SortBy): Promise<SearchtaskEntityNum> {
        // const tokenService = new Token()
        // const dbpath = await tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        //const taskdbModel=new SearchTaskdb(this.dbpath)
        const tasklist = await this.taskdbModel.listTask(page,size,sortBy)
        // const searchKeydb=new SearchKeyworddb(this.dbpath)
        const taskdata: Array<SearchtaskItem> = []

        //convert task list to search item list

        for (const item of tasklist) {
            //console.log("item is follow")
            //console.log(item)
            const keywords = await this.serKeywordModel.getKeywordsByTask(item.id)
            const data: SearchtaskItem = {
                id: item.id,
                enginer_name: this.convertNumtoSE(Math.round(item.enginer_id)),
                status: this.taskdbModel.taskStatusToString(item.status),
                keywords: keywords,
                record_time: item.record_time
            }
            data.keywordline = data.keywords.join(',')

            taskdata.push(data)
        }
        //check number
        const number = await this.taskdbModel.getTaskTotal()
        const data: SearchtaskEntityNum = {
            total: number,
            records: taskdata
        }
        return data
    }
    //upate task status
    public async updateTaskStatus(taskId: number, status: SearchTaskStatus) {
        await this.taskdbModel.updateTaskStatus(taskId, status)
    }

    //get search result list by task id
    public async listSearchResult(taskId: number, page: number, size: number): Promise<Array<SearchResEntity>> {
        const keyarr = await this.getKeywrodsbyTask(taskId)
        return this.serResultModel.listSearchresult(keyarr, page, size)
    }

    public async countSearchResult(taskId: number): Promise<number> {
        const keyarr = await this.getKeywrodsbyTask(taskId)
        return this.serResultModel.countSearchResult(keyarr)
    }

    //get keywords id by task id
    public async getKeywrodsbyTask(taskId: number): Promise<Array<number>> {
        const keywordEnArr = await this.serKeywordModel.getKeywordsEntityByTask(taskId)
        return keywordEnArr.map(item => item.id)
    }
    //update task runtime log and error log path
    public async updateTaskLog(taskId: number, runtimeLog: string, errorLog: string) {
        if(runtimeLog){
        await this.taskdbModel.updateRuntimeLog(taskId, runtimeLog)
        }
        if(errorLog){
            await this.taskdbModel.updateTaskLog(taskId, errorLog)
        }
    }
    //get task log by task id
    public async getTaskErrorLog(taskId: number): Promise<string>  {
        const task = await this.taskdbModel.getTaskEntity(taskId)
        if(!task){
            throw new Error("task not exist")
        }
        try {
            console.log(task)
            const absolutePath = path.resolve(task.error_log);
            const content = fs.readFileSync(absolutePath, 'utf-8');
            return content;
        } catch (error) {
            console.error(`Error reading file at ${task.error_log}:`, error);
            throw error;
        }


    }
    //get search task entity by id
    public async getkeywrodsEntitybyId(keywordId: number) {
        return await this.serKeywordModel.getKeywordsEntityById(keywordId)
    }


}