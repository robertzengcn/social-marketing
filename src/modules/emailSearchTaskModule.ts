import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import { EmailsearchTaskdb, EmailsearchTaskEntity, EmailsearchTaskStatus } from '@/model/emailsearchTaskdb'
import { EmailsearchUrldb, EmailsearchUrlEntity } from '@/model/emailsearchUrldb'
import {EmailSearchResult} from "@/entityTypes/emailextraction-type"
import {EmailsearchResultdb,EmailsearchResultEntity} from "@/model/emailsearchResultdb"
import {EmailsearchResultDetailEntity,EmailsearchResultDetaildb} from "@/model/emailsearchResultDetaildb"
export class EmailSearchTaskModule {
    private dbpath: string
    private emailsearchTaskdb: EmailsearchTaskdb
    private emailsearchUrldb: EmailsearchUrldb
    private emailsearchresultdb:EmailsearchResultdb
    private emailsearchResultDetaildb:EmailsearchResultDetaildb
    constructor() {
        const tokenService = new Token()
        const dbpath = tokenService.getValue(USERSDBPATH)
        if (!dbpath) {
            throw new Error("user path not exist")
        }
        this.dbpath = dbpath
        this.emailsearchTaskdb = new EmailsearchTaskdb(this.dbpath);
        this.emailsearchUrldb = new EmailsearchUrldb(this.dbpath)
        this.emailsearchresultdb=new EmailsearchResultdb(this.dbpath)
        this.emailsearchResultDetaildb=new EmailsearchResultDetaildb(this.dbpath)
    }
    //save search task, call it when user start search email
    public async saveSearchtask(urls: string[]): Promise<number> {
        console.log("save search task")
        const task: EmailsearchTaskEntity = {
            status: EmailsearchTaskStatus.Processing
        }
        const taskId = this.emailsearchTaskdb.createTask(task)
        console.log("task id is" + taskId)
        for (let i = 0; i < urls.length; i++) {
            // console.log("url is" + urls[i])
            const urltask: EmailsearchUrlEntity = {
                task_id: taskId,
                url: urls[i],
            }
            this.emailsearchUrldb.create(urltask)
        }
        // urls.forEach((url: string) => {
        //     const urltask: EmailsearchUrlEntity = {
        //         task_id: taskId,
        //         url: url,
        //     }
        //     this.emailsearchUrldb.create(urltask)
        // })
        return Number(taskId)
    }

    //update task runtime log and error log path
    public updateTaskLog(taskId: number, runtimeLog: string, errorLog: string) {
        if (runtimeLog) {
            this.emailsearchTaskdb.updateruntimelog(taskId, runtimeLog)
        }
        if (errorLog) {
            this.emailsearchTaskdb.updatetasklog(taskId, errorLog)
        }
    }
    //upate task status
    public updateTaskStatus(taskId: number, status: EmailsearchTaskStatus) {
        this.emailsearchTaskdb.updateTaskStatus(taskId, status)
    }
    //save search result
    public saveSearchResult(taskId: number, res: EmailSearchResult) {

       const data:EmailsearchResultEntity={
        task_id: taskId,
        url: res.url,
        title:res.title,
       
       }
        const resultId=this.emailsearchresultdb.create(data)
        if(!resultId){
            throw new Error("save search result failed")
        }
        //save email result detail
        res.email.forEach((email:string)=>{
            const emailData:EmailsearchResultDetailEntity={
                result_id:resultId,
                email:email
            }
            this.emailsearchResultDetaildb.create(emailData)
        })
    }

}