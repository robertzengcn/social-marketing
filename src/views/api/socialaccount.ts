import {ItemSearchparam,SearchResult} from './types'
import {windowInvoke} from '@/views/utils/apirequest'

export async function getSocialAccountlist(data: ItemSearchparam):Promise<SearchResult>{
    const resp=await windowInvoke('socialaccount:list',data);
        console.log(resp)
        if(!resp){
           throw new Error("unknow error")
        }
        // if(!resp.status){
        //   throw new Error(resp.msg)
        // }

        const resdata:SearchResult={
                data:resp.records,
                total:resp.total,
        }
        return resdata;
}