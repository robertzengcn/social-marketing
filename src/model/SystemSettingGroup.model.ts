import { BaseDb } from "@/model/Basedb";
import {Repository} from "typeorm"
import {SystemSettingGroupEntity} from "@/entity/SystemSettingGroup.entity"
export class SystemSettingGroupModel extends BaseDb {
    // private repository:Repository<SystemSettingGroupEntity>
    constructor(filepath: string) {
        super(filepath)
        // this.repository = this.sqliteDb.connection.getRepository(SystemSettingGroupEntity)
      }
    public tableInit(){
       
    }
    public listall(){
        // return this.repository.find()
    }



}