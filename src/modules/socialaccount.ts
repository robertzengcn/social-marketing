'use strict';
import { HttpClient } from "@/modules/lib/httpclient"
import { SocialAccountResponse } from "@/entity-types/socialaccount-type"
import url from "url"
// import {PageSearch} from "@/entity-types/common-type"
import { URLSearchParams } from "url"
export class SocialAccount {
    private _httpClient: HttpClient
    constructor() {
        this._httpClient = new HttpClient()
    }
    //get social account list from remote
    public async getSocialaccountlist(page: number, size: number, search: string): Promise<SocialAccountResponse> {
        const searchParams: Record<string, any> = new URLSearchParams();
        searchParams.append("page", page);
        searchParams.append("size", size);
        if (search.length>0) {
            searchParams.append("search", search);
        }
        // const params = new URLSearchParams({page: page, pagesize: "100"}).toString();
        const paramstring = searchParams.toString();
        // const finalurl='/api/campaign?'+paramstring;
        const finalurl = '/api/socialaccount/list?' + paramstring;

        const sociallistres = await this._httpClient.get(finalurl)
        if (!sociallistres) {
            throw new Error("remote return empty");
        }
        // console.log("campaign list is following")
        // console.log(campignlistres.data)
        const resp: SocialAccountResponse = {
            status: sociallistres.status,
            msg: sociallistres.msg,
            data: sociallistres.data,
        }
        return resp
    }
}