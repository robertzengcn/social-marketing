import {windowInvoke} from '@/views/utils/apirequest'
import {EMAILSERVICEUPDATE,EMAILSERVICEDETAIL,EMAILSERVICELIST,EMAILSERVICEDELETE} from "@/config/channellist";
import {SearchResult} from '@/views/api/types'
import {ItemSearchparam,CommonIdrequest,CommonResponse} from "@/entityTypes/commonType"
import {EmailServiceEntitydata,EmailServiceListdata} from "@/entityTypes/emailmarketingType"
//get email service list
export async function getEmailServiceList(params: ItemSearchparam): Promise<SearchResult<EmailServiceListdata>> {
    const resp= await windowInvoke(EMAILSERVICELIST, params);
    console.log(resp)
    if(!resp){
       throw new Error("unknow error")
    }

    const resdata:SearchResult<EmailServiceListdata>={
            data:resp.records,
            total:resp.num,
    }
    return resdata;  
}
//get email service detail
export async function getEmailServiceDetail(id: number): Promise<EmailServiceEntitydata> {
    const params: CommonIdrequest<number> = { id:id };
    return windowInvoke(EMAILSERVICEDETAIL, params);
}

export async function createupdateEmailService(data: EmailServiceEntitydata): Promise<CommonIdrequest<number>> {
    return windowInvoke(EMAILSERVICEUPDATE, data);
}

export async function deleteEmailService(id: number): Promise<CommonIdrequest<number>> {
    const params: CommonIdrequest<number>  = { id:id };
    return windowInvoke(EMAILSERVICEDELETE, params);
}