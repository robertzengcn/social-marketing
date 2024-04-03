import {windowInvoke} from '@/views/utils/apirequest'
import {ItemSearchparam} from "./types"
import {SocialPlatformEntity} from "@/entity-types/social_platform-type"
export async function getSocialPlatformlist(data: ItemSearchparam):Promise<Array<SocialPlatformEntity>>{
    const resp=await windowInvoke('socialplatform:list',data);
        
        if(!resp){
           throw new Error("unknow error")
        }

        return resp as Array<SocialPlatformEntity>;
}