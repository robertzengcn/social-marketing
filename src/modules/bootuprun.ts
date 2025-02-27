import {SystemSettingGroupModule} from "@/modules/SystemSettingGroupModule"
export function runafterbootup(){ 
    // console.log("run after bootup");
    const systemSettingGroupModule=new SystemSettingGroupModule()
    systemSettingGroupModule.tableInit()
}