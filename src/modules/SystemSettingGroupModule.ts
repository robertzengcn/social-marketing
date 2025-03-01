import { BaseModule } from "@/modules/baseModule";
import {SystemSettingGroupModel} from "@/model/SystemSettingGroup.model"
import {SystemSettingGroupEntity} from "@/entity/SystemSettingGroup.entity"

export class SystemSettingGroupModule extends BaseModule {
   
    private systemSettingGroupModel:SystemSettingGroupModel
    constructor() {
        super()
        this.systemSettingGroupModel = new SystemSettingGroupModel(this.dbpath)
    //    this.repository = this.sqliteDb.connection.getRepository(SystemSettingGroupEntity)
    }
    public tableInit(){
        this.systemSettingGroupModel.tableInit()
    }
    public async listall(): Promise<SystemSettingGroupEntity[]>{
        // return this.repository.find()
        return this.systemSettingGroupModel.listall()
    }
}