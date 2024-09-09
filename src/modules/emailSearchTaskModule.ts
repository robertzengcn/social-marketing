import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import { EmailsearchTaskdb, EmailsearchTaskEntity, EmailsearchTaskStatus } from '@/model/emailsearchTaskdb'
import { EmailsearchUrldb, EmailsearchUrlEntity } from '@/model/emailsearchUrldb'
import {EmailSearchResult} from "@/entityTypes/emailextraction-type"
export class EmailSearchTaskModule {
    private dbpath: string
    private emailsearchTaskdb: EmailsearchTaskdb
    private emailsearchUrldb: EmailsearchUrldb
    constructor() {
        const tokenService = new Token()
        const dbpath = tokenService.getValue(USERSDBPATH)
        if (!dbpath) {
            throw new Error("user path not exist")
        }
        this.dbpath = dbpath
        this.emailsearchTaskdb = new EmailsearchTaskdb(this.dbpath);
        this.emailsearchUrldb = new EmailsearchUrldb(this.dbpath)
    }
    //save search task, call it when user start search email
    public async saveSearchtask(urls: string[]): Promise<number> {
        console.log("save search task")
        const task: EmailsearchTaskEntity = {
            status: EmailsearchTaskStatus.Processing
        }
        const taskId = this.emailsearchTaskdb.createTask(task)
        urls.forEach((url: string) => {
            const urltask: EmailsearchUrlEntity = {
                taskId: taskId,
                url: url,
            }
            this.emailsearchUrldb.create(urltask)
        })
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
    public saveSearchResult(taskId: number, result: EmailSearchResult) {
       
    }

}