import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import { BuckemailEntity, BuckEmailType } from "@/model/buckEmailTaskdb"
import { BuckEmailTaskModel } from "@/model/BuckEmailTask.model"
import {TaskStatus} from "@/entityTypes/commonType"
import { SortBy } from "@/entityTypes/commonType"
import { BaseModule } from "@/modules/baseModule";
export class BuckEmailTaskModule extends BaseModule{
    //private dbpath: string
    private buckemailtaskdb: BuckEmailTaskModel
    constructor() {
    // const tokenService = new Token()
    // const dbpath = tokenService.getValue(USERSDBPATH)
    // if (!dbpath) {
    //     throw new Error("user path not exist")
    // }
    super();
    // this.dbpath = dbpath
    this.buckemailtaskdb = new BuckEmailTaskModel(this.dbpath);
    }
    //create buck send email task
    async createTask(task: BuckemailEntity): Promise<number> {
      
        return this.buckemailtaskdb.create(task)
    }
    //get buck email task id 
    async readTask(id: number):Promise<BuckemailEntity |undefined>  {
        return await this.buckemailtaskdb.read(id)
    }
    //update buck email task
    async updateTask(id: number, updates: BuckemailEntity): Promise<void> {
        
       await this.buckemailtaskdb.update(id,updates);
    }

    async deleteTask(id: string): Promise<void> {
        await this.buckemailtaskdb.delete(Number(id));
    }
    //update task log path
    async updateTasklog(id: number, log_file: string, error_file: string): Promise<void> {
        await this.buckemailtaskdb.updateTaskLogfile(id, log_file, error_file)
    }
    //update task log status
    async updateTaskStatus(id: number, status: TaskStatus): Promise<void> {
        await this.buckemailtaskdb.updateTaskStatus(id, status)
    }
    //get buck eamil task for page query
    async getTaskList(page: number, limit: number, sort?: SortBy): Promise<{records:BuckemailEntity[],total:number}> {
        const records=await this.buckemailtaskdb.listBuckEmailtask(page, limit, sort)
        const total=await this.buckemailtaskdb.countBuckEmailTask()
        return {records,total}
    }
    public async getBuckEmailTypeName(type: BuckEmailType): Promise<string> {
        return await this.buckemailtaskdb.getBuckEmailTypeName(type)
    }
   
}