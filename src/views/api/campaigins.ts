import {ItemSearchparam,SearchResult} from './types'
import {windowInvoke} from '@/views/utils/apirequest'
export async function getCampaignlist(data: ItemSearchparam):Promise<SearchResult>{
     
        const resp=await windowInvoke('campaign:list',data);
        // console.log(resp)
        if(!resp){
           throw new Error("unknow error")
        }
        if(!resp.status){
          throw new Error(resp.msg)
        }

        const resdata:SearchResult={
                data:resp.data.records,
                total:resp.data.num,
        }
        return resdata;  
}