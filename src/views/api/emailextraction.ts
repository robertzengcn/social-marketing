import {EmailscFormdata,EmailResultDisplay,EmailsearchtaskResultquery} from '@/entityTypes/emailextraction-type'
import { windowInvoke,windowReceive,windowSend } from '@/views/utils/apirequest'
import {EMAILEXTRACTIONAPI} from '@/config/channellist'
import { SearchResult} from '@/views/api/types'
import {ItemSearchparam} from "@/entityTypes/commonType"
import {LISTEMAILSEARCHTASK,EMAILSEARCHTASKRESULT} from "@/config/channellist";
// import { CommonResponse } from "@/entityTypes/commonType"
import {EmailsearchTaskEntityDisplay} from '@/entityTypes/emailextraction-type'

export async function submitScraper(data: EmailscFormdata) {
    
    windowSend(EMAILEXTRACTIONAPI, data) 
    
    // return resp 
}
//list email search task
export async function listEmailSearchtasks(data: ItemSearchparam): Promise<SearchResult<EmailsearchTaskEntityDisplay>> {
    const resp = await windowInvoke(LISTEMAILSEARCHTASK, data);
    //console.log(resp)
    if (!resp) {
        throw new Error("unknow error")
    }
    const resdata: SearchResult<EmailsearchTaskEntityDisplay> = {
        data: resp.records,
        total: resp.num,
    }
    return resdata;
}
//get email search task detail
export async function getEmailtaskdetail(data: EmailsearchtaskResultquery){
    const resp = await windowInvoke(EMAILSEARCHTASKRESULT, data);
    if (!resp) {
        throw new Error("unknow error")
    }
    // EmailResultDisplay
    const resdata: SearchResult<EmailResultDisplay> = {
        data: resp.records,
        total: resp.num,
    }
    return resdata;

}