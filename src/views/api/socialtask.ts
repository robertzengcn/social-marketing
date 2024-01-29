import {windowInvoke,windowSend} from '@/views/utils/apirequest'
import {SocialTaskEntity,TagEntity} from '@/entity-types/socialtask-type'

export type TaskQuery={
    id:number
    page:number
    size:number
    sortby:string
    search:string
}
export type SocialTasktype={
    id:number,
    name:string,
}
export type SocialListresp={
    data:Array<SocialTaskEntity>,
    total:number,
}

export type TaskinfoQuery={
    id:number
}
export type Socialtaskresp={
    id:number
}

export async function getSocialtasklist(data: TaskQuery):Promise<SocialListresp>{
    const resp=await windowInvoke('socialtask:list',data);
    console.log(resp)
    if(!resp){
       throw new Error("unknow error")
    }
    // if(!resp.status){
    //   throw new Error(resp.msg)
    // }

    const resdata:SocialListresp={
            data:resp.Records,
            total:resp.Total,
    }
    return resdata; 
}
//get social task info
export async function getSocialtaskinfo(data: TaskinfoQuery):Promise<SocialTaskEntity>{
    const resp=await windowInvoke('socialtask:info',data);
    console.log(resp)
    if(!resp){
       throw new Error("unknow error")
    }
    
    return resp as SocialTaskEntity; 
}

//get social type list
export async function getSocialtasktype():Promise<Array<SocialTasktype>|null>{
    const resp=await windowInvoke('socialtasktype:list');   
    console.log(resp)
    if(!resp){
       throw new Error("unknow error")
    }
    
    return resp as Array<SocialTasktype>; 
}

// get tag list
export async function getTaglist():Promise<Array<TagEntity>|null>{
    const resp=await windowInvoke('tag:list');   
    console.log(resp)
    if(!resp){
       throw new Error("unknow error")
    }
    
    return resp as Array<TagEntity>; 
}
//save social task
export async function saveSocialTask(data: SocialTaskEntity): Promise<Socialtaskresp> {
    const resp=await windowInvoke('socialtask:save',data);   
    console.log(resp)
    if(!resp){
       throw new Error("unknow error")
    }
    
    return resp as Socialtaskresp; 
}
export function startSocialTask(taskId:number){
    windowSend('socialtask:start',{id:taskId})
}