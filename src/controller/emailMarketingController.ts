//import {EmailMarketingTemplateApi} from "@/api/emailMarketingTemplateApi";
import {EmailTemplateModule} from "@/modules/EmailTemplateModule"
import { ListData } from "@/entityTypes/commonType"
import { EmailTemplatedata,EmailFilterdata,EmailServiceListdata,EmailServiceEntitydata,EmailSendParam} from "@/entityTypes/emailmarketingType"
//import {EmailMarketingFilterApi} from "@/api/emailMarketingFilterApi";
//import {EmailServiceApi} from "@/api/emailServiceApi";
import {EmailService} from "@/modules/lib/emailService"
import {EmailTemplateModuleInterface} from "@/modules/interface/EmailTemplateModuleInterface"
import {EmailTemplateEntity} from "@/entity/EmailTemplate.entity"
import {EmailFilterTaskRelationModule} from "@/modules/EmailFilterTaskRelationModule"
import { EmailFilterTaskRelationModuleInterface } from "@/modules/interface/EmailFilterTaskRelationModuleInterface"
import { EmailFilterModuleInterface } from "@/modules/interface/EmailFilterModuleInterface"
import { EmailFilterModule } from "@/modules/EmailFilterModule"
import { EmailFilterEntity } from "@/entity/EmailFilter.entity"
export class EmailMarketingController {
     emailTemplateModule: EmailTemplateModuleInterface;
     emailFilterTaskRelationModule: EmailFilterTaskRelationModuleInterface;
     emailFilterModule: EmailFilterModuleInterface;
     // emailMarketingFilterApi:EmailMarketingFilterApi
    // emailServiceApi:EmailServiceApi
    constructor() {
        this.emailTemplateModule=new EmailTemplateModule();
        this.emailFilterTaskRelationModule=new EmailFilterTaskRelationModule();
        this.emailFilterModule=new EmailFilterModule();
        //         this.emailMarketingTemplateApi = new EmailMarketingTemplateApi();
        //         this.emailMarketingFilterApi=new EmailMarketingFilterApi();
        // this.emailServiceApi=new EmailServiceApi();
    }
    //list email template
    public async listEmailTemplate(page: number, size: number, search?: string): Promise<ListData<EmailTemplateEntity>> {
        const listdata=await this.emailTemplateModule.listEmailTemplates(page, size, search);
        const count=await this.emailTemplateModule.countEmailTemplates();
        return {
            records:listdata,
            num:count
        }
    }
    //get email template detail
    public async getEmailTemplateDetail(id: number): Promise<EmailTemplateEntity | undefined> {
        return await this.emailTemplateModule.read(id);
    }
    //remove email template
    public async removeEmailTemplate(id: number): Promise<void> {
        return await this.emailTemplateModule.delete(id);
    }
    //update email template
    public async updateEmailtemplate(param:EmailTemplatedata): Promise<number>{
        
        if(param.TplId){
            const entity=new EmailTemplateEntity();
            entity.content=param.TplContent;
            entity.description=param.Description??null;
            entity.title=param.TplTitle;
            await this.emailTemplateModule.update(param.TplId,entity);
        return param.TplId;
        }else{
            const entity=new EmailTemplateEntity();
            entity.content=param.TplContent;
            entity.description=param.Description??null;
            entity.title=param.TplTitle;
            return await this.emailTemplateModule.create(entity);
        }
    }
    //list email filter
    public async listEmailFilter(page: number, size: number, search?: string): Promise<ListData<EmailFilterEntity>> {
        const listdata=await this.emailFilterModule.listEmailFilters(page, size, search);
        const count=await this.emailFilterModule.countEmailFilters();
        return {
            records:listdata,
            num:count
        }
    }
    // get email filter
    public async getEmailFilterDetail(id: number): Promise<EmailFilterEntity | undefined> {
        return await this.emailFilterModule.read(id);
    }
    //update email filter
    public async updateEmailFilter(param:EmailFilterdata): Promise<number>{
        if(param.filter_details){
            param.filter_details.forEach((item)=>{
                if((!item.id)&&(!item.content)){
                    //remove empty filter
                    const index=param.filter_details.indexOf(item)
                    param.filter_details.splice(index,1)
                }
            }) 
        }
        if(param.id){
            return await this.emailFilterModule.updateEmailFilter(param.id.toString(),param);
        }else{
            return await this.emailFilterModule.createEmailFilter(param)
        }
    }
    //delete email filter
    public async deleteEmailFilter(id: number): Promise<void> {
        return await this.emailFilterModule.delete(id);
    }
    //get email service list
    public async getEmailServiceList(page: number, size: number, search?: string): Promise<ListData<EmailServiceListdata>> {
        const listdata=await this.emailFilterModule.getEmailServiceList(page, size, search);
        const count=await this.emailFilterModule.countEmailService();
        return {
            records:listdata,
            num:count
        }
    }
    //get email service detail
    public async getEmailServiceDetail(id: number): Promise<EmailServiceEntitydata | undefined> {
        return await this.emailFilterModule.getEmailServiceById(id.toString());
    }
    //create or update email service
    public async createuEmailService(param:EmailServiceEntitydata): Promise<number>{
        return await this.emailFilterModule.createuEmailService(param);
    }
    //delete email service
    public async deleteEmailService(id: number): Promise<void> {
        return await this.emailFilterModule.delete(id);
    }

    //send email 
    public async sendEmail(param: EmailSendParam,errorCall?:(errorMessage: string)=>void,successCallback?:()=>void ): Promise<any> {
       
        const emailService=new EmailService(param.Setting)
        await emailService.sendEmail(param.EmailRequestData,function(errorString){
            if(errorCall){
            errorCall(errorString)
            }
        },function(){
            if(successCallback){
                successCallback()
            }
        })

    }

  
    
}