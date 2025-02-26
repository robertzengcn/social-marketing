import { BaseModule } from "@/modules/baseModule";
import {SystemSettingGroupModel} from "@/model/SystemSettingGroup.model"
// import {SystemSettingGroupEntity} from "@/entity/SystemSettingGroup.entity"
// import {Repository} from "typeorm"
export class SystemSettingGroupModule extends BaseModule {
    // private repository:Repository<SystemSettingGroupEntity>
    private systemSettingGroupModel:SystemSettingGroupModel
    constructor() {
        super()
        this.systemSettingGroupModel = new SystemSettingGroupModel(this.dbpath)
    //    this.repository = this.sqliteDb.connection.getRepository(SystemSettingGroupEntity)
    }
    public tableInit(){

    }
    public listall(){
        // return this.repository.find()
        this.systemSettingGroupModel.listall()
    }
}