import {EmailMarketingTemplateApi} from "@/api/emailMarketingTemplateApi";
import { CommonApiresp,ListData,CommonResponse,CommonIdrequest } from "@/entityTypes/commonType"
import { EmailTemplateRespdata,EmailTemplatedata,EmailFilterdata} from "@/entityTypes/emailmarketinType"
import {EmailMarketingFilterApi} from "@/api/emailMarketingFilterApi";
export class EmailMarketingController {
    emailMarketingTemplateApi: EmailMarketingTemplateApi;
    emailMarketingFilterApi:EmailMarketingFilterApi
    constructor() {
        this.emailMarketingTemplateApi = new EmailMarketingTemplateApi();
        this.emailMarketingFilterApi=new EmailMarketingFilterApi();
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
    //update email template
    public async updateEmailtemplate(param:EmailTemplatedata): Promise<CommonApiresp<number>>{
        
        if(param.TplId){
            return this.emailMarketingTemplateApi.updateTemplate(param.TplId.toString(),param);
        }else{
            return this.emailMarketingTemplateApi.createTemplate(param)
        }
    }
    //list email filter
    public async listEmailFilter(page: number, size: number, search?: string): Promise<CommonResponse<EmailFilterdata>> {
        return this.emailMarketingFilterApi.listEmailFilters(page, size, search);
    }
    // get email filter
    public async getEmailFilterDetail(id: number): Promise<CommonApiresp<EmailFilterdata>> {
        return this.emailMarketingFilterApi.getEmailFilterById(id.toString());
    }
    //update email filter
    public async updateEmailFilter(param:EmailFilterdata): Promise<CommonApiresp<CommonIdrequest<number>>>{
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
            return this.emailMarketingFilterApi.updateEmailFilter(param.id.toString(),param);
        }else{
            return this.emailMarketingFilterApi.createEmailFilter(param)
        }
    }

  
    
}