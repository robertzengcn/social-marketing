import {SearchDataParam} from "@/entityTypes/scrapeType"
import {SearchTaskdb} from "@/model/searchTaskdb"
import { Token } from "@/modules/token"
import {USERSDBPATH} from '@/config/usersetting';
import { SearhEnginer } from "@/config/searchSetting"
import { ToArray } from "@/modules/lib/function"
import {SearchKeyworddb} from "@/model/searchKeyworddb"
import {SearchDataRun} from "@/entityTypes/scrapeType"

export class searhModel{
    //save search task, call it when user start search keyword
    public async saveSearchtask(data:SearchDataParam){
        console.log("save search task")
        const tokenService=new Token()
        const dbpath=await tokenService.getValue(USERSDBPATH)
        if(!dbpath){
            throw new Error("user path not exist")
        }
        const searchtask=new SearchTaskdb(dbpath)
        const enginId=this.convertSEtoNum(data.engine)
        const taskId=searchtask.saveSearchTask(enginId)  
        const searshdb=new SearchKeyworddb(dbpath)
        data.keywords.forEach(async (keyword)=>{
            searshdb.saveSearchKeyword(keyword,Number(taskId))
        })
    }
    //convert search enginer name to number
    public convertSEtoNum(enginerName:string):number{
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
    public convertNumtoSE(enginerNum:number):string{
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
    public saveSearchResult(data:SearchDataRun){
        console.log("save search result")
        
    }
}