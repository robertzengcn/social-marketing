import { ipcMain } from 'electron';
import { EMAILEXTRACTIONAPI, EMAILEXTRACTIONMESSAGE,LISTEMAILSEARCHTASK,EMAILSEARCHTASKRESULT } from "@/config/channellist";
import { EmailscFormdata } from '@/entityTypes/emailextraction-type'
import { CommonDialogMsg } from "@/entityTypes/commonType";
import { isValidUrl } from "@/views/utils/function"
import { searhModel } from "@/modules/searchModel"
import { EmailextractionController } from "@/controller/emailextractionController"
import { EmailsControldata,EmailResultDisplay,EmailsearchTaskEntityDisplay,EmailsearchtaskResultquery} from '@/entityTypes/emailextraction-type'
import { EmailExtractionTypes } from '@/config/emailextraction'
import {ItemSearchparam} from "@/entityTypes/commonType"
import { CommonResponse } from "@/entityTypes/commonType"

export function registerEmailextractionIpcHandlers() {
    // const searchModel = new searhModel();
    // const emailCon = new EmailextractionController();
    ipcMain.on(EMAILEXTRACTIONAPI, async (event, arg) => {
        let extraType: EmailExtractionTypes = EmailExtractionTypes.ManualInputUrl;
        //receive user submit form
        const qdata = JSON.parse(arg) as EmailscFormdata;
        if (!Object.prototype.hasOwnProperty.call(qdata, "extratype")) {
            qdata.extratype = "ManualInputUrl";
        }
        const validUrls: string[] = []
        if (qdata.extratype === "ManualInputUrl") {
            if (!qdata.urls || qdata.urls.length === 0) {
                const comMsgs: CommonDialogMsg = {
                    status: false,
                    code: 20240705103811,
                    data: {
                        action: "error",
                        title: "emailscrape.failed",
                        content: "emailscrape.url_empty"
                    }
                }
                event.sender.send(EMAILEXTRACTIONMESSAGE, JSON.stringify(comMsgs))
                return
            }
            //valid item in urls
            qdata.urls.forEach((item) => {
                //check url is valid
                isValidUrl(item) ? validUrls.push(item) : null
            })
            if (validUrls.length === 0) {
                const comMsgs: CommonDialogMsg = {
                    status: false,
                    code: 20240705103811,
                    data: {
                        action: "error",
                        title: "emailscrape.failed",
                        content: "emailscrape.url_invalid"
                    }
                }
                event.sender.send(EMAILEXTRACTIONMESSAGE, JSON.stringify(comMsgs))
                return
            }

        } else if (qdata.extratype === "SearchResult") {
            extraType = EmailExtractionTypes.SearchResult
            if (!qdata.searchTaskId) {
                const comMsgs: CommonDialogMsg = {
                    status: false,
                    code: 20240705103811,
                    data: {
                        action: "error",
                        title: "emailscrape.failed",
                        content: "emailscrape.searchTaskId_empty"
                    }
                }
                event.sender.send(EMAILEXTRACTIONMESSAGE, JSON.stringify(comMsgs))
                return
            }
            const searchModel = new searhModel();

            //get result url from search task
            const taskresultNum = await searchModel.countSearchResult(qdata.searchTaskId)
            const step = 100
            for (let i = 0; i < taskresultNum; i = i + step) {
                const taskresult = await searchModel.listSearchResult(qdata.searchTaskId, i, step)
                if (taskresult.length > 0) {
                    taskresult.map((item) => {
                        validUrls.push(item.link)
                    })
                }
            }
        } else {//error action
            const comMsgs: CommonDialogMsg = {
                status: false,
                code: 20240705103811,
                data: {
                    action: "error",
                    title: "emailscrape.failed",
                    content: "emailscrape.action_error"
                }
            }
            event.sender.send(EMAILEXTRACTIONMESSAGE, JSON.stringify(comMsgs))
            return

        }
        if (validUrls.length === 0) {
            const comMsgs: CommonDialogMsg = {
                status: false,
                code: 20240705103811,
                data: {
                    action: "",
                    title: "emailscrape.failed",
                    content: "emailscrape.url_empty"
                }
            }
            event.sender.send(EMAILEXTRACTIONMESSAGE, JSON.stringify(comMsgs))
            return
        }
        const datas: EmailsControldata = {
            validUrls: validUrls,
            concurrency: qdata.concurrency,
            pagelength: qdata.pagelength,
            notShowBrowser: qdata.notShowBrowser,
            proxys: qdata.proxys,
            type: extraType,
            processTimeout:Number(qdata.processTimeout)
        }
            
    const emailCon = new EmailextractionController();
        emailCon.searchEmail(datas);
        const comMsgs: CommonDialogMsg = {
            status: true,
            code: 0,
            data: {
                action: "emailsearch_task _start",
                title: "",
                content: ""
            }
        }
        event.sender.send(EMAILEXTRACTIONMESSAGE, JSON.stringify(comMsgs))

    });

    ipcMain.handle(LISTEMAILSEARCHTASK, async (event, data) => {
        const qdata = JSON.parse(data) as ItemSearchparam;  
        if (!Object.prototype.hasOwnProperty.call(qdata, "page")) {
            qdata.page = 0;
          }
          if (!Object.prototype.hasOwnProperty.call(qdata, "size")) {
            qdata.size = 100;
          }
             
   const emailCon = new EmailextractionController();
          const res=await emailCon.listEmailSearchtasks(qdata.page,qdata.size,qdata.sortby)

          const resp: CommonResponse<EmailsearchTaskEntityDisplay> = {
            status: true,
            msg: "",
            data: {
                records: res.records,
                num: res.total
            }
        }
        return resp
    })
    ipcMain.handle(EMAILSEARCHTASKRESULT, async (event, arg) => {
        const qdata = JSON.parse(arg) as EmailsearchtaskResultquery;
        if (!Object.prototype.hasOwnProperty.call(qdata, "taskId")) {
            const comMsgs: CommonResponse<EmailResultDisplay> = {
                status: false,
                msg:"emailextraction.task_id_empty"
                
            }
            
            return
          }
        if (!Object.prototype.hasOwnProperty.call(qdata, "page")) {
            qdata.page = 0;
          }
          if (!Object.prototype.hasOwnProperty.call(qdata, "size")) {
            qdata.size = 100;
          }
          if(!qdata.taskId){
            const comMsgs: CommonResponse<EmailResultDisplay> = {
                status: false,
                msg:"emailextraction.task_id_empty"
                
            }
            return comMsgs
          }
        console.log("task id is" + qdata.taskId)  
        //EmailsearchTaskquery
           
   const emailCon = new EmailextractionController();
        const res=await emailCon.Emailtaskresult(qdata.taskId,qdata.page,qdata.size)
        //count number
        const count=await emailCon.EmailtaskresultCount(qdata.taskId)
        const resp: CommonResponse<EmailResultDisplay> = {
            status: true,
            msg: "",
            data: {
                records: res,
                num: count
            }
        }
        return resp
    });

}