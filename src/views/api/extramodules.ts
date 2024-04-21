import {windowInvoke} from '@/views/utils/apirequest'
import {EXTRAMODULECHANNE_LIST} from "@/config/channellist";
import {ExtraPipModule} from "@/entity-types/extramodule-type"
import {ListData} from "@/entity-types/common-type"
import { SearchResult } from '@/views/api/types'
export async function getExtramodulelist(data: any):Promise<SearchResult<ExtraPipModule>>{
     
        const resp=await windowInvoke(EXTRAMODULECHANNE_LIST,data) as ListData<ExtraPipModule>;
        
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