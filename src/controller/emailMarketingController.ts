import {EmailMarketingTemplateApi} from "@/api/emailMarketingTemplateApi";
import { CommonApiresp,ListData } from "@/entityTypes/commonType"
import { EmailTemplateRespdata} from "@/entityTypes/emailmarketinType"
export class EmailMarketingController {
    emailMarketingTemplateApi: EmailMarketingTemplateApi;
    constructor() {
        this.emailMarketingTemplateApi = new EmailMarketingTemplateApi();
    }
    //list email template
    public async listEmailTemplate(page: number, size: number, search?: string): Promise<CommonApiresp<ListData<EmailTemplateRespdata>>> {
        return this.emailMarketingTemplateApi.listTemplate(page, size, search);
    }
    //get email template detail
    public async getEmailTemplateDetail(id: number): Promise<CommonApiresp<EmailTemplateRespdata>> {
        return this.emailMarketingTemplateApi.readTemplate(id.toString());
    }
    //remove email template
    public async removeEmailTemplate(id: number): Promise<CommonApiresp<number>> {
        return this.emailMarketingTemplateApi.deleteTemplate(id.toString());
    }

  
    
}