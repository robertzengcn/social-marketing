import {EmailscFormdata} from '@/entityTypes/emailextraction-type'
import { windowInvoke,windowReceive,windowSend } from '@/views/utils/apirequest'
import {EMAILEXTRACTIONAPI} from '@/config/channellist'

export async function submitScraper(data: EmailscFormdata) {
    
    windowSend(EMAILEXTRACTIONAPI, data) 
    
    // return resp 
}