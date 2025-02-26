import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import {BuckEmailTaskdb,BuckemailEntity,BuckEmailType} from "@/model/buckEmailTaskdb"
import {TaskStatus} from "@/entityTypes/commonType"
import { SortBy } from "@/entityTypes/commonType"

export class BuckEmailTaskModule {
    private dbpath: string
    private buckemailtaskdb: BuckEmailTaskdb
    constructor() {
    const tokenService = new Token()
    const dbpath = tokenService.getValue(USERSDBPATH)
    if (!dbpath) {
        throw new Error("user path not exist")
    }
    this.dbpath = dbpath
    this.buckemailtaskdb = new BuckEmailTaskdb(this.dbpath);
    }
    //create buck send email task
    createTask(task: BuckemailEntity): number {
      
        return this.buckemailtaskdb.create(task)
    }
    //get buck email task id 
    readTask(id: number):BuckemailEntity |undefined  {
        return this.buckemailtaskdb.read(id)
    }
    //update buck email task
    updateTask(id: number, updates: BuckemailEntity): void {
        
       this.buckemailtaskdb.update(id,updates);
    }

    deleteTask(id: string) {
        this.buckemailtaskdb.delete(Number(id));
    }
    //update task log path
    updateTasklog(id: number, log_file: string, error_file: string) {
        this.buckemailtaskdb.updateTaskLogfile(id, log_file, error_file)
    }
    //update task log status
    updateTaskStatus(id: number, status: TaskStatus) {
        this.buckemailtaskdb.updateTaskStatus(id, status)
    }
    //get buck eamil task for page query
    getTaskList(page: number, limit: number, sort?: SortBy): {records:BuckemailEntity[],total:number} {
        const records=this.buckemailtaskdb.listBuckEmailtask(page, limit, sort)
        const total=this.buckemailtaskdb.countBuckEmailTask()
        return {records,total}
    }
    public getBuckEmailTypeName(type: BuckEmailType): string {
        return this.buckemailtaskdb.getBuckEmailTypeName(type)
    }
   
}