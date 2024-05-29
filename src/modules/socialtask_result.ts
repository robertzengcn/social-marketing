import { TaskResultdb,TaskResultSearchres } from '@/model/taskResultdb'
export class SocialTaskResult {
    public gettaskresultlist(taskrunId: number, page: number, size: number, callback: Function | undefined | null): TaskResultSearchres {
        const taskresultmodel = new TaskResultdb()
        // const total = taskresultmodel.getTaskresultTotal(taskrunId)
        return taskresultmodel.getTaskresultlist(taskrunId, page, size, callback)
       
    }
}