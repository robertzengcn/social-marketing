import { BaseDb } from "@/model/Basedb";
import { Repository } from "typeorm"
import { SystemSettingGroupEntity } from "@/entity/SystemSettingGroup.entity"
import {SystemSettingModel} from "@/model/SystemSetting.model"

export const deepseeklocalgroup = 'Deepseek-local'
export class SystemSettingGroupModel extends BaseDb {
    private repository: Repository<SystemSettingGroupEntity>
    private systemSettingModel:SystemSettingModel
    constructor(filepath: string) {
        super(filepath)
        this.repository = this.sqliteDb.connection.getRepository(SystemSettingGroupEntity)
        this.systemSettingModel = new SystemSettingModel(filepath)
    }
    public async tableInit() {
       const deepseekgroup=await this.insertDeepseekgroup()
       await this.systemSettingModel.InsertDeepseekSetting(deepseekgroup) 
    }
    public async insertDeepseekgroup():Promise<SystemSettingGroupEntity>{
        let deepseekgroup = await this.repository.findOne({
            where:{name: deepseeklocalgroup},
            relations: {settings:true}
         })
         if (!deepseekgroup) {
             const systemSettingGroupEntity = new SystemSettingGroupEntity();
             systemSettingGroupEntity.name = deepseeklocalgroup;
             systemSettingGroupEntity.description = 'deepseek-local-group-description';
             
 
             deepseekgroup=await this.repository.save(systemSettingGroupEntity)
         }
         return deepseekgroup
    }

    public async listall(): Promise<SystemSettingGroupEntity[]> {
        return this.repository.find({
            order: {
                id: 'ASC'  // or 'DESC' for descending
            },
           
        })
    }



}