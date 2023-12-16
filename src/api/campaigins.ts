import {ItemSearchparam,SearchResult} from './types'
import {windowInvoke} from '@/utils/apirequest'
export async function getCampaignlist(data: ItemSearchparam):Promise<SearchResult>{
     
        return await windowInvoke(data) as SearchResult;  
}