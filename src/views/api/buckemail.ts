"use strict";

import {windowSend,windowReceive} from '@/views/utils/apirequest'
import {EmailMarketingsubdata} from '@/entityTypes/emailmarketingType'
import {BUCKEMAILSEND} from '@/config/channellist'

export async function buckEmailsend(data: EmailMarketingsubdata) {
    
    windowSend(BUCKEMAILSEND, data) 
    
    // return resp 
}
export function receiveBuckEmailevent(channel:string,cb:(data:any)=>void){
   
    windowReceive(channel,cb)
}