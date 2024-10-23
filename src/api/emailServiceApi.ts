"use strict";
import { HttpClient } from "@/modules/lib/httpclient";
// import { Token } from "@/modules/token"
// import { USERSDBPATH } from '@/config/usersetting';
import { EmailServiceEntitydata,EmailServiceListdata} from "@/entityTypes/emailmarketingType"
import { CommonApiresp,SortBy,CommonIdrequest,ListData } from "@/entityTypes/commonType"

export class EmailServiceApi {
    private _httpClient: HttpClient;

    constructor() {
        this._httpClient = new HttpClient();

    }
    //create and update email service
    async createuEmailService(param: EmailServiceEntitydata): Promise<CommonApiresp<CommonIdrequest<number>>> {
        const data = new FormData();
        if(param.id){
            data.append("id", param.id.toString());
        }
        if(param.from){
            data.append("from", param.from);
        }
        if(param.password){
            data.append("password", param.password);
        }
        if(param.host){
            data.append("host", param.host);
        }
        if(param.port){
            data.append("port", param.port);
        }
        if(param.name){
            data.append("name", param.name);
        }
        if(param.ssl){
            data.append("ssl", param.ssl.toString());
        }
        return this._httpClient.post('/api/emailservice/create', data);
    }
    //get email list service
    async getEmailServiceList(page: number, size: number, search?: string,sortBy?:SortBy): Promise<CommonApiresp<ListData<EmailServiceListdata>>> {
        let resutsort=''
        if(sortBy){
            sortBy.key=sortBy.key.toLowerCase()
            const allowsortby=['id','create_time']
            if(allowsortby.includes(sortBy.key)){
                resutsort=sortBy.key  
            if(sortBy.order){
                if(sortBy.order.toLowerCase()=='desc'){
                    resutsort='-'+resutsort
                }
            }
        }
        }
        return this._httpClient.get(`/api/emailservice/list?page=${page}&size=${size}&search=${search}&orderby=${resutsort}`);
    }
//get email service by id
    async getEmailServiceById(id: string): Promise<CommonApiresp<EmailServiceEntitydata>> {
        return this._httpClient.get(`/api/emailservice/${id}`);
    }

    
//delete email service
    async deleteEmailService(id: string): Promise<CommonApiresp<CommonIdrequest<number>>> {
        return this._httpClient.delete(`/api/emailservice/${id}`);
    }
}