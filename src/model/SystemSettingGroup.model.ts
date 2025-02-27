import { BaseDb } from "@/model/Basedb";
import { Repository } from "typeorm"
import { SystemSettingGroupEntity } from "@/entity/SystemSettingGroup.entity"
export const deepseeklocalgroup = 'Deepseek-local'
export class SystemSettingGroupModel extends BaseDb {
    private repository: Repository<SystemSettingGroupEntity>
    constructor(filepath: string) {
        super(filepath)
        this.repository = this.sqliteDb.connection.getRepository(SystemSettingGroupEntity)
    }
    public async tableInit() {
        const deepseekgroup = await this.repository.findOneBy({
            name: deepseeklocalgroup
        })
        if (!deepseekgroup) {
            const systemSettingGroupEntity = new SystemSettingGroupEntity();
            systemSettingGroupEntity.name = deepseeklocalgroup;
            systemSettingGroupEntity.description = 'deepseek-local-group-description';
            await this.repository.save(systemSettingGroupEntity)
        }
    }

    public listall() {
        return this.repository.find()
    }



}