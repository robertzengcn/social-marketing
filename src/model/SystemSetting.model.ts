import { BaseDb } from "@/model/Basedb";
import { Repository } from "typeorm"
import { SystemSettingEntity } from "@/entity/SystemSetting.entity"
import { SystemSettingGroupEntity } from "@/entity/SystemSettingGroup.entity"


export class SystemSettingModel extends BaseDb {
    private repository: Repository<SystemSettingEntity>
    constructor(filepath: string) {
        super(filepath)
        this.repository = this.sqliteDb.connection.getRepository(SystemSettingEntity)
    }
    public async tableInit() {
        
     }

    public async InsertDeepseekSetting(deepseekgroup:SystemSettingGroupEntity) {
        await this.InsertDeepseekUrl(deepseekgroup)
    }
    public async InsertDeepseekUrl(deepseekgroup:SystemSettingGroupEntity) {
        const deepseek_local_url_key='deepseek-local-url'
        const deepseek_local_url_value='http://localhost:11434'

        let deepseeksettingurl = await this.repository.findOne({
            where: { group: deepseekgroup,key:deepseek_local_url_key }
        })
        if (!deepseeksettingurl) {
            const systemSettingEntity = new SystemSettingEntity();
            systemSettingEntity.group = deepseekgroup;
            systemSettingEntity.key = deepseek_local_url_key;
            systemSettingEntity.value = deepseek_local_url_value;
            systemSettingEntity.description = 'deepseek-local-url-description';
            systemSettingEntity.type = 'input';
            deepseeksettingurl = await this.repository.save(systemSettingEntity)
        }
        return deepseeksettingurl
    }

}