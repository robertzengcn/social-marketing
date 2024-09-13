import {EmailscFormdata,SearchTaskItemdisplay} from '@/entityTypes/emailextraction-type'
import { windowInvoke,windowReceive,windowSend } from '@/views/utils/apirequest'
import {EMAILEXTRACTIONAPI} from '@/config/channellist'
import { SearchResult} from '@/views/api/types'
import {ItemSearchparam} from "@/entityTypes/commonType"
import {LISTEMAILSEARCHTASK} from "@/config/channellist";

export async function submitScraper(data: EmailscFormdata) {
    
    windowSend(EMAILEXTRACTIONAPI, data) 
    
    // return resp 
}
//list email search task
export async function listEmailSearchtasks(data: ItemSearchparam): Promise<SearchResult<SearchTaskItemdisplay>> {
    const resp = await windowInvoke(LISTEMAILSEARCHTASK, data);
    //console.log(resp)
    if (!resp) {
        throw new Error("unknow error")
    }
    const resdata: SearchResult<SearchTaskItemdisplay> = {
        data: resp.records,
        total: resp.num,
    }
    return resdata;
}