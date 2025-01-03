import {windowInvoke,windowSend,windowReceive} from '@/views/utils/apirequest'
import {EXTRAMODULECHANNE_LIST,EXTRAMODULECHANNE_INSTALL,EXTRAMODULECHANNE_UNINSTALL,EXTRAMODULECHANNE_MESSAGE} from "@/config/channellist";
import {ExtraModule} from "@/entityTypes/extramodule-type"
import {ListData} from "@/entityTypes/commonType"
import { SearchResult } from '@/views/api/types'
export async function getExtramodulelist(data: any):Promise<SearchResult<ExtraModule>>{
     
        const resp=await windowInvoke(EXTRAMODULECHANNE_LIST,data) as ListData<ExtraModule>;
        
        // console.log(resp)
        if(!resp){
           throw new Error("unknow error")
        }

        const resdata:any={
                data:resp.records,
                total:resp.num,
        }
        return resdata;  
}
export function installExtramodule(packagename:string){
        windowSend(EXTRAMODULECHANNE_INSTALL,{name:packagename})
}
export function receiveInExtramoduleLog(cb:(data:any)=>void){
        windowReceive(EXTRAMODULECHANNE_MESSAGE,cb)
}
export function removeExtramodule(packagename:string){
        windowSend(EXTRAMODULECHANNE_UNINSTALL,{name:packagename})
}