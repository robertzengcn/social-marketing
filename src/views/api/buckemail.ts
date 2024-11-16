"use strict";

import {windowSend,windowReceive,windowInvoke} from '@/views/utils/apirequest'
import {EmailMarketingsubdata} from '@/entityTypes/emailmarketingType'
import {BUCKEMAILSEND,BUCKEMAILTASKLIST} from '@/config/channellist'
import {SearchResult} from '@/views/api/types'
import {ItemSearchparam,CommonIdrequest} from "@/entityTypes/commonType"
import {BuckEmailType} from "@/entityTypes/buckemailType"

export async function buckEmailsend(data: EmailMarketingsubdata) {
    
    windowSend(BUCKEMAILSEND, data) 
    
    // return resp 
}
export function receiveBuckEmailevent(channel:string,cb:(data:any)=>void){
   
    windowReceive(channel,cb)
}

//get email service list
export async function getBuckEmailSendtaskList(params: ItemSearchparam): Promise<SearchResult<BuckEmailType>> {
    const resp= await windowInvoke(BUCKEMAILTASKLIST, params);
    
    if(!resp){
       throw new Error("unknow error")
    }

    const resdata:SearchResult<BuckEmailType>={
            data:resp.records,
            total:resp.num,
    }
    return resdata;  
}