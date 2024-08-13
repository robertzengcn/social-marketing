import { Usersearchdata,SearchDetailquery } from "@/entityTypes/searchControlType"
import { windowSend } from '@/views/utils/apirequest'
import { SEARCHSCRAPERAPI } from '@/config/channellist'
import { SearchtaskItem } from "@/entityTypes/searchControlType"
import { SearchResult, ItemSearchparam } from '@/views/api/types'
import { windowInvoke,windowReceive } from '@/views/utils/apirequest'
import {LISTSESARCHRESUT,TASKSEARCHRESULTLIST} from "@/config/channellist";
import {SearchResEntity,SearchResEntityDisplay} from "@/entityTypes/scrapeType"

//import {CommonDialogMsg} from "@/entityTypes/commonType";
// import { ipcMain} from 'electron'

export async function submitScraper(data: Usersearchdata) {
    
    windowSend(SEARCHSCRAPERAPI, data) 
    
    // return resp 
}

export async function listSearchresult(data: ItemSearchparam): Promise<SearchResult<SearchtaskItem>> {
    const resp = await windowInvoke(LISTSESARCHRESUT, data);
    console.log(resp)
    if (!resp) {
        throw new Error("unknow error")
    }
    const resdata: SearchResult<SearchtaskItem> = {
        data: resp.records,
        total: resp.num,
    }
    return resdata;
}
export function receiveSearchevent(channel:string,cb:(data:any)=>void){
   
    windowReceive(channel,cb)
}
export async function gettaskresult(taskId:number):Promise<SearchResult<SearchResEntityDisplay>> {
   console.log("get task result")
    const resp = await windowInvoke(TASKSEARCHRESULTLIST, {taskId:taskId});
    console.log(resp)
    if (!resp) {
        throw new Error("unknow error")
    }
    const resdata: SearchResult<SearchResEntityDisplay> = {
        data: resp.records,
        total: resp.num,
    }
    return resdata;
}


