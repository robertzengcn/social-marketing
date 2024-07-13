import { SearchResponse,Usersearchdata } from "@/entityTypes/searchControlType"
import { windowSend} from '@/views/utils/apirequest'
import {SEARCHSCRAPERAPI} from '@/config/channellist'
export async function submitScraper(data:Usersearchdata){
    windowSend(SEARCHSCRAPERAPI, data)
}