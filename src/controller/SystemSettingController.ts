// import {SystemSettingGroup} from '@/model/SystemSettingGroup.model'; 
import {SystemSettingGroupDisplay} from '@/entityTypes/systemsettingType';
import {SystemSettingDisplay} from '@/entityTypes/systemsettingType';
import {SystemSettingGroupModule} from "@/modules/SystemSettingGroupModule"
// import {SystemSetting,SystemSettingGroup,SystemSettingDetail} from '@/model/modelIndex';  
import {SystemSettingOptionModule} from "@/modules/SystemSettingOptionModule"
export class SystemSettingController {
    private systemSettingGroupModule:SystemSettingGroupModule
    private systemSettingOptionModule:SystemSettingOptionModule

    constructor() {
        this.systemSettingGroupModule = new SystemSettingGroupModule()
        this.systemSettingOptionModule = new SystemSettingOptionModule()
    }
    public async selectAllSystemSettings(): Promise<SystemSettingGroupDisplay[]> {
        const grouplist=await this.systemSettingGroupModule.listall()
        const result: SystemSettingGroupDisplay[] = [];
        if (grouplist) {
            for (const group of grouplist) {
                const systemSettingDisplayList: SystemSettingGroupDisplay = {
                    id: group.id,
                    name: group.name,
                    description: group.description,
                    items: []
                };
                
                if (group.settings) {
                    for (const setting of group.settings) {
                        const item: SystemSettingDisplay = {
                            id: setting.id,
                            key: setting.key,
                            value: setting.value,
                            description: setting.description,
                            type: (setting.type as "input" | "select" | "radio" | "checkbox"),
                            // options: setting.options || []
                        };
                        if(setting.type=='select'||setting.type=='radio'||setting.type=='checkbox'){
                            const optionList=await this.systemSettingOptionModule.findOptionBySetting(setting)
                            item.options=optionList.map(option => ({
                                id: option.id,
                                optionValue: option.value,
                                optionLabel: option.label || option.value
                            }))
                        }
                        systemSettingDisplayList.items.push(item);
                    }
                }
                
                result.push(systemSettingDisplayList);
            }
        }
        return result;
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