import { RemoteSource,campaignResponse } from '@/modules/remotesource'


export class campaignController {
    public async getCampaignlist(data: any): Promise<campaignResponse|null> {
        const qdata=JSON.parse(data);
        const remotesou=new RemoteSource();
        const result=await remotesou.getCampaignlist(qdata).then(function (res) {
            //console.log(res);
            return res;
        }).catch(function (error) {
            console.log(error)
                //debug(error);
                //throw new Error(error.message);
            return null
        });
        return result;
    }
}