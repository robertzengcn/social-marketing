import { BuckemailController } from "@/controller/buckemailController"
import { BUCKEMAILSEND } from "@/config/channellist";
import { ipcMain } from 'electron';
import { EmailMarketingsubdata, EmailItem } from '@/entityTypes/emailmarketingType'
import { CommonDialogMsg } from "@/entityTypes/commonType";
import { BUCKEMAILSENDMESSAGE } from "@/config/channellist"
import { EmailSearchTaskModule } from "@/modules/emailSearchTaskModule"
import { Buckemailstruct } from "@/entityTypes/emailmarketingType"
import { BuckEmailType } from "@/model/buckEmailTaskdb"
/**
 * buck send email ipc
 */
export function registerBuckEmailIpcHandlers() {
    const buckemailCon = new BuckemailController()
    ipcMain.on(BUCKEMAILSEND, async (event, data) => {
        const qdata = JSON.parse(data) as EmailMarketingsubdata;
        switch (qdata.sourceType) {
            case 1: {
                if (!qdata.emailtaskentity) {
                    const comMsgs: CommonDialogMsg = {
                        status: false,
                        code: 20241108110518,
                        data: {
                            action: "error",
                            title: "buckemailsend.email_souce_empty",
                            content: "buckemailsend.check_email_souce"
                        }
                    }
                    event.sender.send(BUCKEMAILSENDMESSAGE, JSON.stringify(comMsgs))
                    return
                }
                //get email address in search result
                // const emailList:Array<EmailItem>=[]
                const emailsearModuel = new EmailSearchTaskModule()
                const emailList = emailsearModuel.getAllEmails(qdata.emailtaskentity.id)
                if(emailList.length==0){
                    const comMsgs: CommonDialogMsg = {
                        status: false,
                        code: 20241108151239,
                        data: {
                            action: "error",
                            title: "buckemailsend.email_list_empty",
                            content: "buckemailsend.email_list_task_empty"
                        }
                    }
                    event.sender.send(BUCKEMAILSENDMESSAGE, JSON.stringify(comMsgs))
                    return
                }
                const bucketEmailData: Buckemailstruct = {
                    EmailBtype: BuckEmailType.EXTRACTEMAIL,
                    EmailList: emailList,
                    EmailTemplateslist: qdata.EmailTemplateslist,
                    EmailFilterlist: qdata.EmailFilterlist,
                    EmailServicelist: qdata.EmailServicelist,
                    NotDuplicate: qdata.NotDuplicate
                }

                const taskid=await buckemailCon.buckEmailsend(bucketEmailData)
                const comMsgs: CommonDialogMsg = {
                    status: true,
                    code: 20241108151239,
                    data: {
                        action: "success",
                        title: "buckemailsend.start_send_email",
                        content: taskid.toString()
                    }
                }
                event.sender.send(BUCKEMAILSENDMESSAGE, JSON.stringify(comMsgs))    
            }
            break;
        }
    })
}