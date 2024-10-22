import {windowInvoke} from '@/views/utils/apirequest'
import {EMAILSERVICEUPDATE,EMAILSERVICEDETAIL,EMAILSERVICELIST,EMAILSERVICEDELETE} from "@/config/channellist";
import {SearchResult} from '@/views/api/types'
import {ItemSearchparam,CommonIdrequest} from "@/entityTypes/commonType"
import {EmailServiceEntitydata,EmailServicListdata} from "@/entityTypes/emailmarketinType"

export async function getEmailServiceList(params: ItemSearchparam): Promise<SearchResult<EmailServicListdata>> {
    return windowInvoke(EMAILSERVICELIST, params);
}

export async function getEmailServiceDetail(id: string): Promise<EmailServiceEntitydata> {
    const params: CommonIdrequest = { id };
    return windowInvoke(EMAILSERVICEDETAIL, params);
}

export async function updateEmailService(data: EmailServiceEntitydata): Promise<void> {
    return windowInvoke(EMAILSERVICEUPDATE, data);
}

export async function deleteEmailService(id: string): Promise<void> {
    const params: CommonIdrequest = { id };
    return windowInvoke(EMAILSERVICEDELETE, params);
}