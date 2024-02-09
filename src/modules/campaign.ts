// const url = require("url");
import url from "url"
//import request from "@/modules/lib/request"
// import {queryParams} from "@/modules/lib/function"
import { HttpClient } from "@/modules/lib/httpclient"
export type campaignRes = {
    data: Array<campaign>,
    num: number,
}
export type campaign = {
    CampaignId: number,
    CampaignName: string,
    CampaignDescription: string,
    Disable: number,
    Tags: string,
}

export type campaignResponse = {
    status: boolean,
    msg: string,
    data?: campaign,
}
export class Campaign {
    private _httpClient: HttpClient
    //construct
    constructor() {
        this._httpClient=new HttpClient()
    }
    /**
    * get campaign from remote servive
    */
    async getCampaignlist(queryParams): Promise<campaignResponse | null> {
        const params = new url.URLSearchParams(queryParams);
        const paramstring=params.toString();
        const finalurl='/api/campaign?'+paramstring;
        // console.log(finalurl)
        // const campignlistres = await request({
        //     url: finalurl,
        //     method: 'get',
        // }).catch(function (error) {
        //     throw new Error(error.message);
        //     // console.error(error);
        // })
        const campignlistres=await this._httpClient.get(finalurl)
        if (!campignlistres) {
            throw new Error("remote return empty");
        }
        // console.log("campaign list is following")
        // console.log(campignlistres.data)
        const resp: campaignResponse = {
            status: campignlistres.status,
            msg: campignlistres.msg,
            data: campignlistres.data,
        }
        return resp
    }
}