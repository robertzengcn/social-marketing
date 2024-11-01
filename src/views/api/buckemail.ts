"use strict";

import {windowSend} from '@/views/utils/apirequest'
import {EmailMarketingsubdata} from '@/entityTypes/emailmarketingType'
import {BUCKEMAILSEND} from '@/config/channellist'

export async function buckEmailsend(data: EmailMarketingsubdata) {
    
    windowSend(BUCKEMAILSEND, data) 
    
    // return resp 
}