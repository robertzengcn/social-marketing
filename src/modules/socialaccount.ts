"use strict";
import { HttpClient } from "@/modules/lib/httpclient";
import {
  SocialAccountResponse,
  SocialAccountDetailResponse,
  SocialAccountDetailData,
  SavesocialaccountResp,
} from "@/entityTypes/socialaccount-type";
// import url from "url"
// import {PageSearch} from "@/entityTypes/common-type"
import { URLSearchParams } from "url";
import { AccountCookiesdb } from "@/model/account_cookiesdb";
import { Token } from "@/modules/token"
import {USERSDBPATH} from '@/config/usersetting';

// import FormData from "form-data";
export class SocialAccount {
  private _httpClient: HttpClient;
  constructor() {
    this._httpClient = new HttpClient();
  }
  //get social account list from remote
  public async getSocialaccountlist(
    page: number,
    size: number,
    search: string
  ): Promise<SocialAccountResponse> {
    const searchParams: Record<string, any> = new URLSearchParams();
    searchParams.append("page", page);
    searchParams.append("size", size);

    if (search.length > 0) {
      searchParams.append("search", search);
    }
    // const params = new URLSearchParams({page: page, pagesize: "100"}).toString();
    const paramstring = searchParams.toString();
    // const finalurl='/api/campaign?'+paramstring;
    const finalurl = "/api/socialaccount/list?" + paramstring;

    const sociallistres = await this._httpClient.get(finalurl) as SocialAccountResponse;
    if (!sociallistres) {
      throw new Error("remote return empty");
    }

    // const resp: SocialAccountResponse = {
    //   status: sociallistres.status,
    //   msg: sociallistres.msg,
    //   data: sociallistres.data,
    // };

    if (sociallistres.data.records && sociallistres.data.records.length > 0) {
      const tokenService=new Token()
      const dbpath=await tokenService.getValue(USERSDBPATH)
      if(!dbpath){
          throw new Error("user path not exist")
      }
      const accDb = new AccountCookiesdb(dbpath)

      //loop social list data, add cookies
      for (const social of sociallistres.data.records) {
        social.cookies = false
        const cookisEntity = accDb.getAccountCookies(social.id)
        if (cookisEntity && cookisEntity.cookies) {
          const cEntity = JSON.parse(cookisEntity.cookies)
          if (cEntity && cEntity.length > 0) {
            social.cookies = true
          }
        }
      }
    }
    return sociallistres;
  }
  //get social account detail
  public async getAccountdetail(
    id: number
  ): Promise<SocialAccountDetailResponse> {
    const searchParams: Record<string, any> = new URLSearchParams();
    searchParams.append("id", id);
    const paramstring = searchParams.toString();
    const finalurl = "/api/socialaccount?" + paramstring;
    const socialdetailres = await this._httpClient.get(finalurl);
    if (!socialdetailres) {
      throw new Error("remote return empty");
    }

    return socialdetailres as SocialAccountDetailResponse;
  }
  //save social account
  public async saveSocialAccount(
    soc: SocialAccountDetailData
  ): Promise<SavesocialaccountResp> {
    // const FormData = require('form-data');
    let data = new FormData();
    if (soc.id) {
      data.append("id", soc.id.toString());
    }
    if (soc.social_type_id) {
      data.append("social_type_id", soc.social_type_id.toString());
    }
    data.append("user", soc.user);
    if (soc.pass) {
      data.append("pass", soc.pass);
    }
    data.append("status", soc.status.toString());
    data.append("name", soc.name);
    data.append("phone", soc.phone);
    data.append("email", soc.email);
    if (soc.proxy) {
      for (const proxy of soc.proxy) {
        if (proxy.id) {
          data.append("proxy[]", proxy.id.toString());
          console.log("proxy id is " + proxy.id.toString())
        }
      }
    }

    const resp = await this._httpClient.post("/api/socialaccount", data);
    return resp as SavesocialaccountResp;
  }

  //delete social account
  public async deleteAccount(id) {
    const searchParams: Record<string, any> = new URLSearchParams();
    searchParams.append("id", id);
    const paramstring = searchParams.toString();
    const finalurl = "/api/socialaccount?" + paramstring;
    const socialdetailres = await this._httpClient.delete(finalurl);
    if (!socialdetailres) {
      throw new Error("remote return empty");
    }
    return socialdetailres;

  }
}
