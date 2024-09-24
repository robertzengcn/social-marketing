"use strict";
import { HttpClient } from "@/modules/lib/httpclient";
import { Token } from "@/modules/token"
import {USERSDBPATH} from '@/config/usersetting';

export class EmailMarketingTemplateApi {
  private _httpClient: HttpClient;

  constructor() {
    this._httpClient = new HttpClient();

}

async createTemplate(templateData: any): Promise<any> {
    
    return this._httpClient.post(`${USERSDBPATH}/templates`, templateData);
}

async readTemplate(templateId: string): Promise<any> {
    // const token = Token.getToken();
    return this._httpClient.get(`${USERSDBPATH}/templates/${templateId}`);
}

async updateTemplate(templateId: string, templateData: any): Promise<any> {
    
    return this._httpClient.put(`${USERSDBPATH}/templates/${templateId}`, templateData);
}

async deleteTemplate(templateId: string): Promise<any> {

    return this._httpClient.delete(`${USERSDBPATH}/templates/${templateId}`);
}
}