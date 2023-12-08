export type campaign={
    CampaignId:number,
    CampaignName: string,
    CampaignDescription: string,
    Disable: number,
    Tags:string,
}
export class campaignController {
    public async getCampaignlist(data: any): Promise<Array<campaign>|null> {
        const result = await window.api.invoke("campaign:list", data);
        return result;
    }
}