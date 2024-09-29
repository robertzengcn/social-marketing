import {windowInvoke} from '@/views/utils/apirequest'
import {EMAILMARKETINGTEMPLIST,EMAILMARKETINGTEMPDETAIL} from "@/config/channellist";
import {SearchResult} from '@/views/api/types'
import {EmailTemplateRespdata} from "@/entityTypes/emailmarketinType"
import {ItemSearchparam} from "@/entityTypes/commonType"

export async function getEmailtemplatelist(data: ItemSearchparam):Promise<SearchResult<EmailTemplateRespdata>>{
     
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
//get email template by id
export async function getEmailtemplatebyid(id:string):Promise<EmailTemplateRespdata>{
    const resp=await windowInvoke(EMAILMARKETINGTEMPDETAIL,{id:id});
    if(!resp){
        throw new Error("unknow error")
    }
    return resp;
}
//update template
export async function updateEmailtemplate(data:EmailTemplateRespdata):Promise<number>{
    const resp=await windowInvoke(EMAILMARKETINGTEMPDETAIL,data);
    if(!resp){
        throw new Error("unknow error")
    }
    return resp;
}