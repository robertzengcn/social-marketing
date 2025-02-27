import {SystemSettingGroupModel} from "@/model/SystemSettingGroup.model"
export function runafterbootup(dbpath:string){ 
    // console.log("run after bootup");
    new SystemSettingGroupModel(dbpath)
}