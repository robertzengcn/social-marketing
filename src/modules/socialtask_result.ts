import { TaskResultdb,TaskResultSearchres } from '@/model/taskResultdb'
import { Token } from "@/modules/token"
import {USERSDBPATH} from '@/config/usersetting';
export class SocialTaskResult {
    public async gettaskresultlist(taskrunId: number, page: number, size: number, callback: ((res: TaskResultSearchres) => void) | undefined | null): Promise<TaskResultSearchres> {

        const tokenService=new Token()
        const dbpath=await tokenService.getValue(USERSDBPATH)
        if(!dbpath){
            throw new Error("user path not exist")
        }
        const taskresultmodel = new TaskResultdb(dbpath)
        // const total = taskresultmodel.getTaskresultTotal(taskrunId)
        return taskresultmodel.getTaskresultlist(taskrunId, page, size, callback)
       
    }
}