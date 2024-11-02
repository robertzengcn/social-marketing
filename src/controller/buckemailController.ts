
import { Buckemailstruct } from "@/entityTypes/emailmarketingType";
import { EmailMarketingTemplateApi } from "@/api/emailMarketingTemplateApi";
import { EmailTemplateRespdata,EmailFilterdata,EmailServiceEntitydata,Buckemailremotedata } from "@/entityTypes/emailmarketingType";
import { EmailMarketingFilterApi } from "@/api/emailMarketingFilterApi";
import { EmailServiceApi } from "@/api/emailServiceApi";
import * as path from 'path';
import * as fs from 'fs';
import { utilityProcess, MessageChannelMain} from "electron";
import { Token } from "@/modules/token"
import {USERLOGPATH,USEREMAIL} from '@/config/usersetting';
import {WriteLog,getApplogspath,getRandomValues} from "@/modules/lib/function"
import { v4 as uuidv4 } from 'uuid';
export class BuckemailController {
    private emailtemAPI: EmailMarketingTemplateApi
    private emailfilterAPI:EmailMarketingFilterApi
    private emailserviceAPI:EmailServiceApi
    constructor() {
        this.emailtemAPI = new EmailMarketingTemplateApi()
        this.emailfilterAPI=new EmailMarketingFilterApi()
    }
    
    //send email
    public async buckEmailsend(param: Buckemailstruct): Promise<any> {
        const emailtemplist: EmailTemplateRespdata[] = []
        const emailfilterlist: EmailFilterdata[] = []
        const emailservicelist: EmailServiceEntitydata[] = []
        //loop email template to get template content
        param.EmailTemplateslist.forEach((element) => {
            this.emailtemAPI.readTemplate(element.toString()).then((res) => {
                if (res.data) {
                    emailtemplist.push(res.data)
                }

            })
        }
        )
        //loop email filter list
        param.EmailFilterlist.forEach((element) => {
            this.emailfilterAPI.getEmailFilterById(element.toString()).then((res) => {
                if (res.data) {
                    emailfilterlist.push(res.data)
                }
            })
        })
        //loop email service list
        param.EmailServicelist.forEach((element) => {
            this.emailserviceAPI.getEmailServiceById(element.toString()).then((res) => {
                if (res.data) {
                    emailservicelist.push(res.data)
                }
            })
        })

        const childPath = path.join(__dirname, 'utilityCode.js')
        if (!fs.existsSync(childPath)) {
            throw new Error("child js path not exist for the path " + childPath);
        }
        const { port1, port2 } = new MessageChannelMain()
        const tokenService=new Token()
        
        const child = utilityProcess.fork(childPath, [],{stdio:"pipe"} )
        // console.log(path.join(__dirname, 'utilityCode.js'))
        let logpath=tokenService.getValue(USERLOGPATH)
        if(!logpath){
            const useremail=tokenService.getValue(USEREMAIL)
            //create log path
            logpath=getApplogspath(useremail)
        }
        // console.log(logpath)
        const uuid=uuidv4({random: getRandomValues(new Uint8Array(16))})
        // const errorLogfile=path.join(logpath,'search_'+taskId.toString()+'_'+uuid+'.error.log')
        // const runLogfile=path.join(logpath,'search_'+taskId.toString()+'_'+uuid+'.runtime.log')

    }

    public prepareData(){

    }
}