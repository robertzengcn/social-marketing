import { BaseModule } from "@/modules/baseModule";
// import {SystemSettingGroupEntity} from "@/entity/SystemSettingGroup.entity"
// import {Repository} from "typeorm"
export class SystemSettingGroupModule extends BaseModule {
    // private repository:Repository<SystemSettingGroupEntity>
    constructor() {
        super()
    //    this.repository = this.sqliteDb.connection.getRepository(SystemSettingGroupEntity)
    }
    public listall(){
        // return this.repository.find()
    }
}