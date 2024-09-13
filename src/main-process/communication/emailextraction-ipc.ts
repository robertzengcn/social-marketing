import { ipcMain } from 'electron';
import { EMAILEXTRACTIONAPI, EMAILEXTRACTIONMESSAGE,LISTEMAILSEARCHTASK } from "@/config/channellist";
import { EmailscFormdata } from '@/entityTypes/emailextraction-type'
import { CommonDialogMsg } from "@/entityTypes/commonType";
import { isValidUrl } from "@/views/utils/function"
import { searhModel } from "@/modules/searchModel"
import { EmailextractionController } from "@/controller/emailextractionController"
import { EmailsControldata } from '@/entityTypes/emailextraction-type'
import { EmailExtractionTypes } from '@/config/emailextraction'
import {ItemSearchparam} from "@/entityTypes/commonType"

export function registerEmailextractionIpcHandlers() {
    const searchModel = new searhModel();
    const emailCon = new EmailextractionController();
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
                        action: "",
                        title: "emailscrape.failed",
                        content: "emailscrape.url_empty"
                    }
                }
                event.sender.send(EMAILEXTRACTIONAPI, JSON.stringify(comMsgs))
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
                        action: "",
                        title: "emailscrape.failed",
                        content: "emailscrape.url_invalid"
                    }
                }
                event.sender.send(EMAILEXTRACTIONAPI, JSON.stringify(comMsgs))
                return
            }

        } else if (qdata.extratype === "SearchResult") {
            extraType = EmailExtractionTypes.SearchResult
            if (!qdata.searchTaskId) {
                const comMsgs: CommonDialogMsg = {
                    status: false,
                    code: 20240705103811,
                    data: {
                        action: "",
                        title: "emailscrape.failed",
                        content: "emailscrape.searchTaskId_empty"
                    }
                }
                event.sender.send(EMAILEXTRACTIONAPI, JSON.stringify(comMsgs))
                return
            }
            //get result url from search task
            const taskresultNum = searchModel.countSearchResult(qdata.searchTaskId)
            const step = 100
            for (let i = 0; i < taskresultNum; i = i + step) {
                const taskresult = searchModel.listSearchResult(qdata.searchTaskId, i, step)
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
                    action: "",
                    title: "emailscrape.failed",
                    content: "emailscrape.action_error"
                }
            }
            event.sender.send(EMAILEXTRACTIONAPI, JSON.stringify(comMsgs))
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
            event.sender.send(EMAILEXTRACTIONAPI, JSON.stringify(comMsgs))
            return
        }
        const datas: EmailsControldata = {
            validUrls: validUrls,
            concurrency: qdata.concurrency,
            pagelength: qdata.pagelength,
            notShowBrowser: qdata.notShowBrowser,
            proxys: qdata.proxys,
            type: extraType
        }
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
    })
}