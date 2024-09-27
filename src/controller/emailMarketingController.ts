import {EmailMarketingTemplateApi} from "@/api/emailMarketingTemplateApi";
import { CommonApiresp,ListData } from "@/entityTypes/commonType"
import { EmailTemplateRespdata } from "@/entityTypes/emailmarketinType"
export class EmailMarketingController {
    emailMarketingTemplateApi: EmailMarketingTemplateApi;
    constructor() {
        this.emailMarketingTemplateApi = new EmailMarketingTemplateApi();
    }
    //list email template
    public listEmailTemplate(page: number, size: number, search?: string): Promise<CommonApiresp<ListData<EmailTemplateRespdata>>> {
        return this.emailMarketingTemplateApi.listTemplate(page, size, search);
    }
    
}