import { Usersearchdata } from "@/entityTypes/searchControlType"
import { windowSend } from '@/views/utils/apirequest'
import { SEARCHSCRAPERAPI } from '@/config/channellist'
import { SearchtaskItem } from "@/entityTypes/searchControlType"
import { SearchResult, ItemSearchparam } from '@/views/api/types'
import { windowInvoke } from '@/views/utils/apirequest'
import {LISTSESARCHRESUT} from "@/config/channellist";
//import {CommonDialogMsg} from "@/entityTypes/commonType";
// import { ipcMain} from 'electron'

export async function submitScraper(data: Usersearchdata) {
    
    const resp = await windowInvoke(SEARCHSCRAPERAPI, data) 
    
    return resp 
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


