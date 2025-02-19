import {windowInvoke} from '@/views/utils/apirequest'
import {SYSTEM_SETTING_LIST} from "@/config/channellist";
import {SystemSettingDisplay,SystemSettingGroupDisplay,OptionSettingDisplay} from "@/entityTypes/systemsettingType";

export async function getSystemSettinglist():Promise<Array<SystemSettingGroupDisplay>>{
    const resp=await windowInvoke(SYSTEM_SETTING_LIST,{});
    console.log(resp)
    if(!resp){
       throw new Error("unknow error")
    }
    return resp; 

}