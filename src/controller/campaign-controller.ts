import {Campaign,campaignResponse } from '@/modules/campaign'


export class CampaignController {
    public async getCampaignlist(data: string): Promise<campaignResponse|null> {
        const qdata=JSON.parse(data);
        const campaignModel=new Campaign();
        const result=await campaignModel.getCampaignlist(qdata).then(function (res) {
            //console.log(res);
            return res;
        })
        // .catch(function (error) {
        //     console.log(error)
        //         //debug(error);
        //         //throw new Error(error.message);
        //     return null
        // });
        return result;
    }
}