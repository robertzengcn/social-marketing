import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import { EmailsearchTaskModel } from '@/model/EmailsearchTask.model'
import { EmailsearchUrlModel } from '@/model/EmailsearchUrl.model'
import { EmailResult, EmailResultDisplay } from "@/entityTypes/emailextraction-type"
import { EmailsearchResultModel } from "@/model/EmailsearchResult.model"
import { EmailsearchResultDetailModel } from "@/model/EmailsearchResultDetail.model"
import { EmailExtractionTypes } from "@/config/emailextraction"
import { SortBy } from "@/entityTypes/commonType"
import {EmailItem} from '@/entityTypes/emailmarketingType'
import { BaseModule } from "@/modules/baseModule";
import { EmailSearchResultEntity } from "@/entity/EmailSearchResult.entity";
import { EmailSearchResultDetailEntity } from "@/entity/EmailSearchResultDetail.entity";
import { EmailsearchTaskEntity, EmailsearchTaskStatus } from "@/model/emailsearchTaskdb";
import { EmailsearchUrlEntity } from "@/model/emailsearchUrldb";

export class EmailSearchTaskModule extends BaseModule{
    //private dbpath: string
    private emailsearchTaskdb: EmailsearchTaskModel
    private emailsearchUrldb: EmailsearchUrlModel
    private emailsearchresultdb: EmailsearchResultModel
    private emailsearchResultDetaildb: EmailsearchResultDetailModel
    constructor() {
        // const tokenService = new Token()
        // const dbpath = tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        super();
        // this.dbpath = dbpath
        this.emailsearchTaskdb = new EmailsearchTaskModel(this.dbpath);
        this.emailsearchUrldb = new EmailsearchUrlModel(this.dbpath)
        this.emailsearchresultdb = new EmailsearchResultModel(this.dbpath)
        this.emailsearchResultDetaildb = new EmailsearchResultDetailModel(this.dbpath)
    }
    //save search task, call it when user start search email
    public async saveSearchtask(typeId: EmailExtractionTypes, urls: string[]): Promise<number> {
        console.log("save search task")
        const task: EmailsearchTaskEntity = {
            status: EmailsearchTaskStatus.Processing,
            type_id: typeId
        }
        const taskId = await this.emailsearchTaskdb.createTask(task)
        //console.log("task id is" + taskId)
        for (let i = 0; i < urls.length; i++) {
            // console.log("url is" + urls[i])
            const urltask: EmailsearchUrlEntity = {
                task_id: taskId,
                url: urls[i],
            }
            await this.emailsearchUrldb.create(urltask)
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
    public async updateTaskLog(taskId: number, runtimeLog: string, errorLog: string) {
        if (runtimeLog) {
            await this.emailsearchTaskdb.updateruntimelog(taskId, runtimeLog)
        }
        if (errorLog) {
            await this.emailsearchTaskdb.updatetasklog(taskId, errorLog)
        }
    }
    //upate task status
    public async updateTaskStatus(taskId: number, status: EmailsearchTaskStatus) {
        await this.emailsearchTaskdb.updateTaskStatus(taskId, status)
    }
    //save search result
    public async saveSearchResult(taskId: number, res: EmailResult) {
        //convert url to domain
        const url = new URL(res.url);
        const domain = url.hostname;
        const data = new EmailSearchResultEntity()
        data.task_id = taskId
        data.url = domain
        data.title = res.pageTitle
        const resultId = await this.emailsearchresultdb.create(data)
        if (!resultId) {
            throw new Error("save search result failed")
        }
        //save email result detail
        for (const email of res.emails) {
            const emailData = new EmailSearchResultDetailEntity();
            emailData.result_id = resultId;
            emailData.email = email;
            await this.emailsearchResultDetaildb.create(emailData);
        }
    }
    //list email search task
    public async listSearchtask(page: number, size: number, sortby?: SortBy): Promise<{ records: EmailsearchTaskEntity[], total: number }> {
        return await this.emailsearchTaskdb.listSearchtask(page, size, sortby)
    }
    //convert task status to string
    public taskstatusConvert(status: EmailsearchTaskStatus): string {
        return this.emailsearchTaskdb.statusConvert(status)
    }
    public taskTypeconvert(typeId: EmailExtractionTypes): string {
        return this.emailsearchTaskdb.convertType(typeId)
    }
    //get task urls
    public async getTaskurls(taskId: number, page: number, size: number): Promise<string[]> {
        const res = await this.emailsearchUrldb.getUrls(taskId, page, size)
        const urls: string[] = []
        for (const value of res) {
            urls.push(value.url)
        }
        return urls
    }
    //get task result
    public async getTaskResult(taskId: number, page: number, size: number): Promise<EmailResultDisplay[]> {
        console.log("get task result,task id is" + taskId)
        const res = await this.emailsearchresultdb.getTaskResult(taskId, page, size)
        const result: EmailResultDisplay[] = []
        for (const value of res) {
            if (!value.id) {
                value.id = 0
            }
            const emails = await this.emailsearchResultDetaildb.getItemsByResultId(value.id)
            const emailsArr: string[] = []
            for (const email of emails) {
                emailsArr.push(email.email)
            }
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
        }

        return result
    }
    //get task detail count
    public async getTaskResultCount(taskId: number): Promise<number> {
        return await this.emailsearchresultdb.getTaskResultCount(taskId)
    }
    //get all email in email search task
    public async getAllEmails(taskId: number): Promise<EmailItem[]> {
        const res = await this.emailsearchresultdb.getTaskResultCount(taskId)
        const emails: EmailItem[] = []
        const loopNum = 100
        for (let i = 0; i < res; i = i + loopNum) {
            const result = await this.emailsearchresultdb.getTaskResult(taskId, i, loopNum)
            for (const value of result) {
                if(value.id){
                    const emailsArr = await this.emailsearchResultDetaildb.getItemsByResultId(value.id)
                    for (const email of emailsArr) {
                        const emailItem: EmailItem = {
                            title: value.title,
                            address: email.email,
                            source: value.url
                        }
                        emails.push(emailItem)
                    }
                }
            }
        }
        return emails
    }

}