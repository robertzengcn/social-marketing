import {windowInvoke} from '@/views/utils/apirequest'
import {EMAILMARKETINGTEMPLIST} from "@/config/channellist";
import {SearchResult} from '@/views/api/types'
import {EmailTemplateRespdata} from "@/entityTypes/emailmarketinType"


export async function getEmailtemplatelist(data: any):Promise<SearchResult<EmailTemplateRespdata>>{
     
    const resp=await windowInvoke(EMAILMARKETINGTEMPLIST,data);
    
   
    if(!resp){
       throw new Error("unknow error")
    }

    const resdata:SearchResult<EmailTemplateRespdata>={
            data:resp.records,
            total:resp.num,
    }
    return resdata;  
}