"use strict";
import { HttpClient } from "@/modules/lib/httpclient";
// import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import { EmailsTemplagedata, EmailTemplateRespdata } from "@/entityTypes/emailmarketinType"
import { CommonApiresp } from "@/entityTypes/commonType"
import {SortBy} from "@/entityTypes/commonType";
export class EmailMarketingTemplateApi {
    private _httpClient: HttpClient;

    constructor() {
        this._httpClient = new HttpClient();

    }

    async createTemplate(templateData: EmailsTemplagedata): Promise<CommonApiresp<number>> {
        const data = new FormData();
        if (templateData.TplTitle) {
            data.append("email_title", templateData.TplTitle);
        }
        if (templateData.TplContent) {
            data.append("email_content", templateData.TplContent);
        }

        return this._httpClient.post(`${USERSDBPATH}/emailtpl/create`, data);
    }

    async readTemplate(templateId: string): Promise<CommonApiresp<EmailTemplateRespdata>> {
        // const token = Token.getToken();
        return this._httpClient.get(`${USERSDBPATH}/emailtpl/${templateId}`);
    }

    async updateTemplate(templateId: string, templateData: EmailsTemplagedata): Promise<CommonApiresp<number>> {

        return this._httpClient.put(`${USERSDBPATH}/templates/${templateId}`, templateData);
    }

    async deleteTemplate(templateId: string): Promise<CommonApiresp<number>> {

        return this._httpClient.delete(`${USERSDBPATH}/templates/${templateId}`);
    }
    //list email tpl
    async listTemplate(page: number, size: number, search?: string,sortBy?:SortBy): Promise<CommonApiresp<Array<EmailTemplateRespdata>>> {
       let resutsort=''
        if(sortBy){
            sortBy.key=sortBy.key.toLowerCase()
            const allowsortby=['tpl_id','tpl_record']
            if(allowsortby.includes(sortBy.key)){
                resutsort=sortBy.key  
            if(sortBy.order){
                if(sortBy.order.toLowerCase()=='desc'){
                    resutsort='-'+resutsort
                }
            }
        }
        }
        return this._httpClient.get(`${USERSDBPATH}/emailtpl/list?page=${page}&size=${size}&search=${search}&orderby=${resutsort}`);
    }
}