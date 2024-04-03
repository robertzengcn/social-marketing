import {ItemSearchparam,SearchResult} from './types'
import {windowInvoke,windowSend} from '@/views/utils/apirequest'
import {SocialAccountDetailData,SoASuccessEntity,SoADeleteResp,SocialLoginParam} from "@/entity-types/socialaccount-type"
export async function getSocialAccountlist(data: ItemSearchparam):Promise<SearchResult>{
    const resp=await windowInvoke('socialaccount:list',data);
        
        if(!resp){
           throw new Error("unknow error")
        }

        const resdata:SearchResult={
                data:resp.records,
                total:resp.total,
        }
        return resdata;
}
//get social account detail
export async function getSocialaccountinfo(id: number):Promise<SocialAccountDetailData>{
        const resp=await windowInvoke('socialaccount:detail',{id:id});
        console.log(resp)
        if(!resp){
           throw new Error("unknow error")
        }
   
        return resp;
}
//save social account
export async function saveSocialAccount(soc:SocialAccountDetailData):Promise<SoASuccessEntity>{
        const resp=await windowInvoke('socialaccount:save',soc);
        return resp;
}
//delete social account
export async function deleteSocialAccount(id:number):Promise<SoADeleteResp>{
        const resp=await windowInvoke('socialaccount:delete',{id:id});
        return resp;
}
export function socialaccountLogin(data:SocialLoginParam){
        windowSend('socialaccount:login',data);    
}