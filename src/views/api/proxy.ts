import {windowInvoke} from '@/views/utils/apirequest'
import {ItemSearchparam,SearchResult} from "./types"
import {ProxyEntity,ProxyParseItem,ProxyListEntity} from "@/entity-types/proxy-type"

export async function getProxyList(data: ItemSearchparam): Promise<SearchResult<ProxyListEntity>> {
    const resp=await windowInvoke('proxy:list',data);
        
    if(!resp){
       throw new Error("unknow error")
    }
    const sr:SearchResult<ProxyListEntity>={
        data:resp.records,
        total:resp.total,
    }
    return sr
    // return resp as Array<Proxy>;
}
export async function deleteProxy(data: number): Promise<any> {
    const resp=await windowInvoke('proxy:delete',{id:data});
        
    // if(!resp){ 
    //    throw new Error("unknow error")
    // }

    return resp;
}
//get proxy detail
export async function getProxy(data: number): Promise<ProxyEntity> {
    const resp=await windowInvoke('proxy:detail',{id:data});
    if(!resp){ 
       throw new Error("unknow error")
    }

    return resp;
}
//save proxy
export async function saveProxy(data: ProxyEntity): Promise<any> {
    const resp=await windowInvoke('proxy:save',data);
    if(!resp){ 
       throw new Error("unknow error")
    }
    console.log(resp)
    return resp;
}
//check proxy valid
export async function checkProxy(data: ProxyEntity): Promise<any> {
    const resp=await windowInvoke('proxy:check',data);
    if(!resp){ 
       throw new Error("unknow error")
    }

    return resp;
}
export async function importProxydata(data: Array<ProxyParseItem>): Promise<boolean> {
    const resp=await windowInvoke('proxy:import',data);
    // if(!resp){ 
    //    throw new Error("unknow error")
    // }

    return resp;
}
