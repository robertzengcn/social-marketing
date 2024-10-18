import {windowInvoke} from '@/views/utils/apirequest'
import {SearchResult} from '@/views/api/types'
import {EMAILMARKETINGFILTERLIST,EMAILMARKETFILTERDETAIL} from "@/config/channellist";
import {ItemSearchparam,CommonIdrequest} from "@/entityTypes/commonType"
import {EmailFilterdata} from "@/entityTypes/emailmarketinType"

export async function getEmailfilterlist(data: ItemSearchparam):Promise<SearchResult<EmailFilterdata>>{
     
    const resp=await windowInvoke(EMAILMARKETINGFILTERLIST,data);
    
   console.log(resp)
    if(!resp){
       throw new Error("unknow error")
    }

    const resdata:SearchResult<EmailFilterdata>={
            data:resp.records,
            total:resp.num,
    }
    return resdata;  
}
export async function getEmailfilterbyid(data: CommonIdrequest<number>):Promise<EmailFilterdata>{
    const resp=await windowInvoke(EMAILMARKETFILTERDETAIL,data);
    if(!resp){
       throw new Error("unknow error")
    }
    return resp;  
} 