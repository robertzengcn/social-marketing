import { SearchDataParam } from "@/entityTypes/scrapeType"
import { SearchTaskModel, SearchTaskStatus } from "@/model/SearchTask.model"
import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import { SearhEnginer } from "@/config/searchSetting"
// import { ToArray } from "@/modules/lib/function"
import { SearchKeywordModel } from "@/model/SearchKeyword.model"
import { SearchResultModel } from "@/model/SearchResult.model"
import { SearchResEntity, SearchDataRun } from "@/entityTypes/scrapeType"
//import {SearchTaskdb} from "@/model/searchTaskdb"
import { SearchtaskEntityNum, SearchtaskItem } from "@/entityTypes/searchControlType"
import { getEnumKeyByValue, getEnumValueByNumber } from "@/modules/lib/function"
import * as path from 'path';
import * as fs from 'fs';
import {SortBy} from "@/entityTypes/commonType";
import { BaseModule } from "@/modules/baseModule";
import { SearchTaskProxyModel } from "@/model/SearchTaskProxy.model";
import { SearchTaskProxyEntity } from "@/entity/SearchTaskProxy.entity";
import { SearchTaskEntity } from "@/entity/SearchTask.entity";
export class searhModel extends BaseModule {
   // private dbpath: string
    private taskdbModel: SearchTaskModel
    private serResultModel: SearchResultModel
    private serKeywordModel: SearchKeywordModel
    private searchTaskProxyModel: SearchTaskProxyModel
    constructor() {
        // const tokenService = new Token()
        // const dbpath = tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        // this.dbpath = dbpath
        super()
        this.taskdbModel = new SearchTaskModel(this.dbpath)
        this.serResultModel = new SearchResultModel(this.dbpath)
        this.serKeywordModel = new SearchKeywordModel(this.dbpath)
        this.searchTaskProxyModel = new SearchTaskProxyModel(this.dbpath)
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
        const taskId = await this.taskdbModel.saveSearchTask(enginId,data.num_pages,data.concurrency,data.notShowBrowser)
        //const searshdb = new SearchKeyworddb(this.dbpath)
        for (const keyword of data.keywords) {
            await this.serKeywordModel.saveSearchKeyword(keyword, Number(taskId))
        }
        if(data.proxys){
            for (const proxy of data.proxys) {
                const proxyEntity=new SearchTaskProxyEntity()
                proxyEntity.task_id=Number(taskId)
              
                proxyEntity.host=proxy.host
                proxyEntity.port=proxy.port
                proxyEntity.user=proxy.user?proxy.user:''
                proxyEntity.pass=proxy.pass?proxy.pass:''
            
                await this.searchTaskProxyModel.create(proxyEntity)
            }
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
        console.log("save search result")
        const resultsMap = new Map(Object.entries(data.results));
        console.log(resultsMap);
        
        for (const [key, value] of resultsMap) {
            const keywordId = await this.serKeywordModel.getKeywordId(key, taskId)
            console.log(value)
            const resval = new Map(Object.entries(value));
            const linkearr: Array<string> = []
            for (const [rvkey, rvvalue] of resval) {
                console.log(rvkey)
                console.log(rvvalue.value)
                if(rvvalue.value){
                    for (const item of rvvalue.value) {
                        console.log(item)
                        if (item.link) {
                            if (!linkearr.includes(item.link)) {
                                const reEntity: SearchResEntity = {
                                    keyword_id: Number(keywordId),
                                    link: item.link,
                                    title: item.title,
                                    snippet: item.snippet,
                                    visible_link: item.visible_link,
                                }
                                await this.serResultModel.saveResult(reEntity)
                                linkearr.push(item.link)
                            }
                        }
                    }
                }
            }
            console.log(`Saving result for key: ${key}, value: ${value}`);
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
        return await this.serResultModel.listSearchresult(keyarr, page, size)
    }

    public async countSearchResult(taskId: number): Promise<number> {
        const keyarr = await this.getKeywrodsbyTask(taskId)
        return await this.serResultModel.countSearchResult(keyarr)
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
    //get task entity by id
    public async getTaskEntityById(taskId: number): Promise< SearchDataParam | null> {
        const taskEntity=  await this.taskdbModel.getTaskEntity(taskId)
        if(!taskEntity){
            return null
        }
        const keywords=await this.serKeywordModel.getKeywordsEntityByTask(taskId)
        const proxys=await this.searchTaskProxyModel.getItemsByTaskId(taskId)
        const data:SearchDataParam={
            engine:taskEntity.enginer_id,
            keywords:keywords.map(item=>item.keyword),
            num_pages:taskEntity.num_pages,
            concurrency:taskEntity.concurrency,
            notShowBrowser:taskEntity.notShowBrowser?true:false,
            proxys:proxys.map(item=>{
                return {
                    host:item.host,
                    port:item.port,
                    user:item.user,
                    pass:item.pass
                }
            }),
            error_log:taskEntity.error_log,
            run_log:taskEntity.runtime_log
        }
        return data
    }


}