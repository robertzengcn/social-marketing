import { Usersearchdata } from "@/entityTypes/searchControlType"
import { windowSend } from '@/views/utils/apirequest'
import { SEARCHSCRAPERAPI } from '@/config/channellist'
import { SearchtaskdbEntity } from "@/entityTypes/searchControlType"
import { SearchResult, ItemSearchparam } from '@/views/api/types'
import { windowInvoke } from '@/views/utils/apirequest'
// import { ipcMain} from 'electron'

export async function submitScraper(data: Usersearchdata) {
    windowSend(SEARCHSCRAPERAPI, data)
}

export async function listSearchresult(data: ItemSearchparam): Promise<SearchResult<SearchtaskdbEntity>> {
    const resp = await windowInvoke('searchtask:list', data);
    console.log(resp)
    if (!resp) {
        throw new Error("unknow error")
    }
    const resdata: SearchResult<SearchtaskdbEntity> = {
        data: resp.records,
        total: resp.num,
    }
    return resdata;
}


