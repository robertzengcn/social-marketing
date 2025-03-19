
import { Buckemailstruct } from "@/entityTypes/emailmarketingType";
import { EmailMarketingTemplateApi } from "@/api/emailMarketingTemplateApi";
import { EmailTemplateRespdata, EmailFilterdata, EmailServiceEntitydata, Buckemailremotedata } from "@/entityTypes/emailmarketingType";
import { EmailMarketingFilterApi } from "@/api/emailMarketingFilterApi";
import { EmailServiceApi } from "@/api/emailServiceApi";
import * as path from 'path';
import * as fs from 'fs';
import { utilityProcess, MessageChannelMain } from "electron";
import { Token } from "@/modules/token"
import { USERLOGPATH, USEREMAIL } from '@/config/usersetting';
import { WriteLog, getApplogspath, getRandomValues } from "@/modules/lib/function"
import { v4 as uuidv4 } from 'uuid';
import { BuckEmailTaskModule } from "@/modules/buckEmailTaskModule"
import { BuckemailEntity} from "@/model/buckEmailTaskdb"
import { TaskStatus } from "@/entityTypes/commonType"
import { ProcessMessage } from "@/entityTypes/processMessage-type"
import { EmailSendResult } from "@/entityTypes/emailmarketingType"
import { EmailMarketingSendLogModule } from "@/modules/emailMarketingSendLogModule";
import { EmailMarketingSendLogEntity,SendStatus } from "@/model/emailMarketingSendLogdb"
import { SortBy } from "@/entityTypes/commonType"
import { BuckEmailListType,EmailMarketingSendLogListDisplay } from "@/entityTypes/buckemailType"
import {getStatusName} from "@/modules/lib/function"

export class BuckemailController {
    private emailtemAPI: EmailMarketingTemplateApi
    private emailfilterAPI: EmailMarketingFilterApi
    private emailserviceAPI: EmailServiceApi
    private buckEmailTaskMoudule: BuckEmailTaskModule
    private emailMarketingSendlogModule: EmailMarketingSendLogModule
    constructor() {
        this.emailtemAPI = new EmailMarketingTemplateApi()
        this.emailfilterAPI = new EmailMarketingFilterApi()
        this.buckEmailTaskMoudule = new BuckEmailTaskModule()
        this.emailserviceAPI = new EmailServiceApi()
        this.emailMarketingSendlogModule = new EmailMarketingSendLogModule()
    }

    //send email
    public async buckEmailsend(param: Buckemailstruct): Promise<number> {

        console.log(param)
        const data = await this.prepareData(param)
        console.log(data)
        const tokenService = new Token()
        // console.log(path.join(__dirname, 'utilityCode.js'))
        let logpath = tokenService.getValue(USERLOGPATH)
        if (!logpath) {
            const useremail = tokenService.getValue(USEREMAIL)
            //create log path
            logpath = getApplogspath(useremail)
        }
        // console.log(logpath)
        const uuid = uuidv4({ random: getRandomValues(new Uint8Array(16)) })
        const errorLogfile = path.join(logpath, 'emailsend_' + '_' + uuid + '.error.log')
        const runLogfile = path.join(logpath, 'emailsend_' + uuid + '.runtime.log')
        //create buck email task
        const entity: BuckemailEntity = {
            type: param.EmailBtype,
            status: TaskStatus.Processing,
            log_file: errorLogfile,
            error_file: runLogfile
        }
        //create task
        const taskId = await this.buckEmailTaskMoudule.createTask(entity)

        const childPath = path.join(__dirname, 'buckEmail.js')
        if (!fs.existsSync(childPath)) {
            throw new Error("child js path not exist for the path " + childPath);
        }
        const { port1, port2 } = new MessageChannelMain()


        const child = utilityProcess.fork(childPath, [], { stdio: "pipe" })



        child.on("spawn", () => {
            console.log("child process satart, pid is" + child.pid)
            child.postMessage(JSON.stringify({ action: "sendEmail", data: data }), [port1])

        })

        child.stdout?.on('data', (data) => {
            console.log(`Received data chunk ${data}`)
            WriteLog(runLogfile, data)
            // child.kill()
        })
        child.stderr?.on('data', (data) => {
            const ingoreStr = ["Debugger attached", "Waiting for the debugger to disconnect", "Most NODE_OPTIONs are not supported in packaged apps"]
            if (!ingoreStr.some((value) => data.includes(value))) {

                // seModel.saveTaskerrorlog(taskId,data)
                console.log(`Received error chunk ${data}`)
                WriteLog(errorLogfile, data)
                // this.emailSeachTaskModule.updateTaskStatus(taskId,EmailsearchTaskStatus.Error)
                //child.kill()
            }

        })
        child.on("exit", (code) => {
            if (code !== 0) {
                console.error(`Child process exited with code ${code}`);
                this.buckEmailTaskMoudule.updateTaskStatus(taskId, TaskStatus.Error)
            } else {
                console.log('Child process exited successfully');
                this.buckEmailTaskMoudule.updateTaskStatus(taskId, TaskStatus.Complete)
            }

        })
        child.on('message', (message) => {
            console.log("get message from child")
            console.log('Message from child:', JSON.parse(message));
            // const childdata=JSON.parse(message) as ProcessMessage<EmailResult>
            const childdata = JSON.parse(message) as ProcessMessage<EmailSendResult>
            switch (childdata.action) {
                case 'EmailSendSuccess': {
                    const emailMarketLog: EmailMarketingSendLogEntity = {
                        task_id: taskId,
                        status: SendStatus.Success,
                        receiver: message.data.receiver,
                        title: message.data.title,
                        content: message.data.content,
                    }
                    //update send log
                    this.emailMarketingSendlogModule.createItem(emailMarketLog)
                }
                    break;
                case 'EmailSendFailure': {
                    const emailMarketLog: EmailMarketingSendLogEntity = {
                        task_id: taskId,
                        status: SendStatus.Failure,
                        receiver: message.data.receiver,
                        title: message.data.title,
                        content: message.data.content,
                        log: message.data.info
                    }
                    //update send log
                    this.emailMarketingSendlogModule.createItem(emailMarketLog)
                }
                    break;
                case 'sendEmailEnd': {
                    this.buckEmailTaskMoudule.updateTaskStatus(taskId, TaskStatus.Complete)
                }
                    break;
            }
        });
        return taskId
    }
    //convert local number array to list
    public async prepareData(param: Buckemailstruct): Promise<Buckemailremotedata> {
        const emailtemplist: EmailTemplateRespdata[] = []
        const emailfilterlist: EmailFilterdata[] = []
        const emailservicelist: EmailServiceEntitydata[] = []
        //console.log(param)
        //loop email template to get template content
        // param.EmailTemplateslist.forEach(async (element) => {
            
        //     await this.emailtemAPI.readTemplate(element.toString()).then((res) => {
        //         console.log(res.data)
        //         if (res.data) {
        //             emailtemplist.push(res.data)
        //         }

        //     })
        // }
        // )
        for (let i = 0; i < param.EmailTemplateslist.length; i++) {
            const element = param.EmailTemplateslist[i];
            const res = await this.emailtemAPI.readTemplate(element.toString())
            if (res.data) {
                emailtemplist.push(res.data)
            }
        }
       
        //loop email filter list
        // param.EmailFilterlist.forEach(async (element) => {
        //     await this.emailfilterAPI.getEmailFilterById(element.toString()).then((res) => {
        //         if (res.data) {
        //             emailfilterlist.push(res.data)
        //         }
        //     })
        // })
        for (let i = 0; i < param.EmailFilterlist.length; i++) {
            const element = param.EmailFilterlist[i];
            const res = await this.emailfilterAPI.getEmailFilterById(element.toString())
            if (res.data) {
                emailfilterlist.push(res.data)
            }
        }
        //loop email service list
        // param.EmailServicelist.forEach(async(element) => {
        //     await this.emailserviceAPI.getEmailServiceById(element.toString()).then((res) => {
        //         if (res.data) {
        //             emailservicelist.push(res.data)
        //         }
        //     })
        // })
        for (let i = 0; i < param.EmailServicelist.length; i++) {
            const element = param.EmailServicelist[i];
            const res = await this.emailserviceAPI.getEmailServiceById(element.toString())
            if (res.data) {
                emailservicelist.push(res.data)
            }
        }
        //check if need to remove duplicate email receiver
        if (param.NotDuplicate == true) {
            //remove duplicate email
            const emailList = param.EmailList
            const newEmailList = emailList.filter((value, index, self) => self.indexOf(value) === index)
            param.EmailList = newEmailList
        }

        const data: Buckemailremotedata = {
            Receiverlist: param.EmailList,
            Emailtemplist: emailtemplist,
            Emailfilterlist: emailfilterlist,
            Emailservicelist: emailservicelist
        }
        return data
    }
    //get buck email task list
    public getBuckEmailTaskList(page: number, size: number, sort?: SortBy): {records:Array<BuckEmailListType>,total:number} {
        const Taskentity=this.buckEmailTaskMoudule.getTaskList(page, size, sort)
        const data: Array<BuckEmailListType> = []
        Taskentity.records.forEach((element) => {
            let status = "unkonw"
            if(element.status){
                status=getStatusName(element.status)
            }
            const btype=this.buckEmailTaskMoudule.getBuckEmailTypeName(element.type)
            let id=0
            if(element.id){
                id = element.id
            }
            const item: BuckEmailListType = {
                TaskId: id,
                Status: status,
                RecordTime: element.record_time,
                Type:btype
            }
            

            data.push(item)
        })
        const result = {
            records: data,
            total: Taskentity.total
        }
        return result
        
    }
    //get buck email send log by task id
    public getBuckEmailSendLog(taskid: number, page: number, size: number, where?: string, sort?: SortBy): {records:Array<EmailMarketingSendLogListDisplay>,total:number} {
        const res = this.emailMarketingSendlogModule.getSendlogList(taskid, page, size, where, sort)
        const data: Array<EmailMarketingSendLogListDisplay> = []
        res.records.forEach((element) => {
            let status = "unkonw"
            if(element.status){
                status=this.emailMarketingSendlogModule.getStatusName(element.status)
            }
            let elementID=0
            if(element.id){
                elementID=element.id
            }
            const item: EmailMarketingSendLogListDisplay = {
                id: elementID,
                status: status,
                receiver: element.receiver,
                title: element.title,
                record_time: element.record_time
            }
            data.push(item)
        })
        const result = {
            records: data,
            total: res.total
        }
        return result
    }

  

}