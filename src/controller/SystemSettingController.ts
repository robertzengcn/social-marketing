// import {SystemSettingGroup} from '@/model/SystemSettingGroup.model'; 
import {SystemSettingGroupDisplay} from '@/entityTypes/systemsettingType';
import {SystemSettingDisplay} from '@/entityTypes/systemsettingType';
import {SystemSettingGroupModule} from "@/modules/SystemSettingGroupModule"
// import {SystemSetting,SystemSettingGroup,SystemSettingDetail} from '@/model/modelIndex';  

export class SystemSettingController {
    private systemSettingGroupModule:SystemSettingGroupModule
    constructor() {
        this.systemSettingGroupModule = new SystemSettingGroupModule()
    }
    public async selectAllSystemSettings(): Promise<SystemSettingGroupDisplay[]|void> {
        const grouplist=await this.systemSettingGroupModule.listall()
        //     const systemgrouplist = await SystemSettingGroup.findAll();
    //     const result: SystemSettingGroupDisplay[] = [];
    //     if (systemgrouplist) {
            
    //         for (const systemgroup of systemgrouplist) {
    //             // const systemsettinglist = await systemgroup.getSystemSettings();
    //             const systemsettinglist =await SystemSetting.findAll({
    //                 where: {
    //                     group_id: systemgroup.id
    //                 }
    //             })
    //             const systemsettingdisplaylist: SystemSettingGroupDisplay = {
    //                 id: systemgroup.id,
    //                 name: systemgroup.name,
    //                 description: systemgroup.description,
    //                 items: []
    //             };

    //             for (const systemsetting of systemsettinglist) {
    //                 let optionList:Array<SystemSettingDetail>=[]
    //                 if(systemsetting.type=='select'||systemsetting.type=='radio'||systemsetting.type=='checkbox'){
    //                 //find options
    //                 optionList=await SystemSettingDetail.findAll({
    //                     where: {
    //                         setting_id: systemsetting.id 
    //                     }
    //                 })
    //                 }
    //                 const item:SystemSettingDisplay={
    //                     id: systemsetting.id,
    //                     key: systemsetting.key,
    //                     value: systemsetting.value,
    //                     description: systemsetting.description,
    //                     type: systemsetting.type,
    //                     options:optionList
    //                 }
    //                 systemsettingdisplaylist.items.push(item);
    //             }
    //             result.push(systemsettingdisplaylist);
    //         }
           

    //     // return [];
    // }
    // return result;
}
}