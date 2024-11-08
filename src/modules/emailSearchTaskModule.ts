import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import { EmailsearchTaskdb, EmailsearchTaskEntity, EmailsearchTaskStatus } from '@/model/emailsearchTaskdb'
import { EmailsearchUrldb, EmailsearchUrlEntity } from '@/model/emailsearchUrldb'
import { EmailResult, EmailResultDisplay } from "@/entityTypes/emailextraction-type"
import { EmailsearchResultdb, EmailsearchResultEntity } from "@/model/emailsearchResultdb"
import { EmailsearchResultDetailEntity, EmailsearchResultDetaildb } from "@/model/emailsearchResultDetaildb"
import { EmailExtractionTypes } from "@/config/emailextraction"
import { SortBy } from "@/entityTypes/commonType"
import {EmailItem} from '@/entityTypes/emailmarketingType'
export class EmailSearchTaskModule {
    private dbpath: string
    private emailsearchTaskdb: EmailsearchTaskdb
    private emailsearchUrldb: EmailsearchUrldb
    private emailsearchresultdb: EmailsearchResultdb
    private emailsearchResultDetaildb: EmailsearchResultDetaildb
    constructor() {
        const tokenService = new Token()
        const dbpath = tokenService.getValue(USERSDBPATH)
        if (!dbpath) {
            throw new Error("user path not exist")
        }
        this.dbpath = dbpath
        this.emailsearchTaskdb = new EmailsearchTaskdb(this.dbpath);
        this.emailsearchUrldb = new EmailsearchUrldb(this.dbpath)
        this.emailsearchresultdb = new EmailsearchResultdb(this.dbpath)
        this.emailsearchResultDetaildb = new EmailsearchResultDetaildb(this.dbpath)
    }
    //save search task, call it when user start search email
    public async saveSearchtask(typeId: EmailExtractionTypes, urls: string[]): Promise<number> {
        console.log("save search task")
        const task: EmailsearchTaskEntity = {
            status: EmailsearchTaskStatus.Processing,
            type_id: typeId
        }
        const taskId = this.emailsearchTaskdb.createTask(task)
        //console.log("task id is" + taskId)
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
    public saveSearchResult(taskId: number, res: EmailResult) {
        //convert url to domain
        const url = new URL(res.url);
        const domain = url.hostname;
        const data: EmailsearchResultEntity = {
            task_id: taskId,
            url: domain,
            title: res.pageTitle,
        }
        const resultId = this.emailsearchresultdb.create(data)
        if (!resultId) {
            throw new Error("save search result failed")
        }
        //save email result detail
        res.emails.forEach((email: string) => {
            const emailData: EmailsearchResultDetailEntity = {
                result_id: resultId,
                email: email
            }
            this.emailsearchResultDetaildb.create(emailData)
        })
    }
    //list email search task
    public listSearchtask(page: number, size: number, sortby?: SortBy): { records: EmailsearchTaskEntity[], total: number } {
        const res = this.emailsearchTaskdb.listSearchtask(page, size, sortby)
        return res
    }
    //convert task status to string
    public taskstatusConvert(status: EmailsearchTaskStatus): string {
        return this.emailsearchTaskdb.statusConvert(status)
    }
    public taskTypeconvert(typeId: EmailExtractionTypes): string {
        return this.emailsearchTaskdb.convertType(typeId)
    }
    //get task urls
    public getTaskurls(taskId: number, page: number, size: number): string[] {
        const res = this.emailsearchUrldb.getUrls(taskId, page, size)
        const urls: string[] = []
        res.forEach((value) => {
            urls.push(value.url)
        })
        return urls
    }
    //get task result
    public getTaskResult(taskId: number, page: number, size: number): EmailResultDisplay[] {
        console.log("get task result,task id is" + taskId)
        const res = this.emailsearchresultdb.getTaskResult(taskId, page, size)
        const result: EmailResultDisplay[] = []
        res.forEach((value) => {
            if (!value.id) {
                value.id = 0
            }
            const emails = this.emailsearchResultDetaildb.getItemsByResultId(value.id)
            const emailsArr: string[] = []
            emails.forEach((email) => {
                emailsArr.push(email.email)
            })
            if (!value.title) {
                value.title = ""
            }
            if (!value.record_time) {
                value.record_time = ""
            }

            const item: EmailResultDisplay = {
                id: value.id,
                url: value.url,
                pageTitle: value.title,
                emails: emailsArr,
                recordTime: value.record_time
            }
            result.push(item)
        })

        return result
    }
    //get task detail count
    public getTaskResultCount(taskId: number): number {
        return this.emailsearchresultdb.getTaskResultCount(taskId)
    }
    //get all email in email search task
    public getAllEmails(taskId: number): EmailItem[] {
        const res = this.emailsearchresultdb.getTaskResultCount(taskId)
        const emails: EmailItem[] = []
        for (let i = 0; i < res; i=i+10) {
            const result = this.emailsearchresultdb.getTaskResult(taskId, i, 10)
            result.forEach((value) => {
                if(value.id){
                const emailsArr = this.emailsearchResultDetaildb.getItemsByResultId(value.id)
                emailsArr.forEach((email) => {
                    const emailItem: EmailItem = {
                        title: value.title,
                        address: email.email,
                        source: value.url
                    }
                    emails.push(emailItem)
                })
                }
            })
        }
        return emails
    }

}