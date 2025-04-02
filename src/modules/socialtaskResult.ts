import { TaskResultdb,TaskResultSearchres } from '@/model/taskResultdb'
import { Token } from "@/modules/token"
import {USERSDBPATH} from '@/config/usersetting';
import { BaseModule } from "@/modules/baseModule";
export class SocialTaskResult extends BaseModule{
    // private dbpath:string;
    constructor() {
        // const tokenService=new Token()
        // const dbpath=tokenService.getValue(USERSDBPATH)
        // if(!dbpath){
        //     throw new Error("user path not exist")
        // }
        super();
        // this.dbpath=dbpath;
    }
    public async gettaskresultlist(taskrunId: number, page: number, size: number, callback: ((res: TaskResultSearchres) => void) | undefined | null): Promise<TaskResultSearchres> {

        
        const taskresultmodel = new TaskResultdb(this.dbpath)
        // const total = taskresultmodel.getTaskresultTotal(taskrunId)
        return taskresultmodel.getTaskresultlist(taskrunId, page, size, callback)
       
    }
}