export { };
import axios from "axios";
import jwt_decode from "jwt-decode";
import {Token} from "./token"
// import { decode } from "punycode";
const debug = require('debug')('RemoteSource');
// const FormData = require('form-data');
type sosetting = {
  sotype: string;
  socialuser: string;
  socialpass: string;
  proxy: {
    proxy: string;
    user: string;
    pass: string;
  },
}
export type Linkdata = {
  id?:number,
  title: string,
  url: string,
  content?: string,
  lang: string,
  socialtask_id: number,
}
export type socialTask = {
  id: number,
  campaign_id: number,
  campaign_name: string,
  tag: string,
  type: string,
  keywords: Array<string>,
  extra_task_info: {
    TaskId: number
    ResulttaskId?: number
  }
}
type configType = {
  REMOTEADD: string,
  REMOTEUSERNAME: string,
  REMOTEPASSWORD: string,
}
type keywordItem = {
  keyword: string,
  tag: string,
  Created : string,
  UsedTime: number,
}
export type jwtUser={
  account_id: number,
  email: string,
  // token:string
  roles:Array<string>,
}
type jwtTokenUser={
  AccountId: number,
  Email: string,
  exp?: number,
  iat?: number,
  iss?: string,
  Roles:Array<string>,
}
export class RemoteSource {
  private tokenname:string="social-market-token";
  // private static instance: RemoteSource;
  REMOTEADD: string;
  // REMOTEUSERNAME: string;
  // REMOTEPASSWORD: string;
  // private _Token:string;
 
  constructor() {
    const config = this.readenv();
    this.REMOTEADD = config.REMOTEADD;
    // this.tokenname="social-market-token"
    // this.REMOTEUSERNAME = config.REMOTEUSERNAME;
    // this.REMOTEPASSWORD = config.REMOTEPASSWORD;
  }

  // public static getInstance(): RemoteSource {
  //   if (!RemoteSource.instance) {
  //     RemoteSource.instance = new RemoteSource();
  //   }
  //   return RemoteSource.instance;
  // }


  readenv(): configType {
    //read config from .env file
    const envcofig = this.readConfig();
    debug(envcofig)
    //check key exist in object
    if (!envcofig.hasOwnProperty("REMOTEADD")) {
      throw new Error(`REMOTEADD not found in .env file`);
    }
    if (!envcofig.hasOwnProperty("REMOTEUSERNAME")) {
      throw new Error(`USERNAME not found in .env file`);
    }
    if (!envcofig.hasOwnProperty("REMOTEPASSWORD")) {
      throw new Error(`PASSWORD not found in .env file`);
    }
    return envcofig as configType;
  }

  /**
   * read config from .env File
   *
   * @returns {object} config
   * */
  readConfig(): object {
    const result = require("dotenv").config();
    if (result.error) {
      throw result.error;
    }
    return result.parsed;
  }

  /**
   * get response from remote servive
   * @return object
   */
  async getRemoteConfig(campaignId): Promise<sosetting|void> {
    // let envconfig = await readenv();

    const sosetvar = await axios
      .get(this.REMOTEADD + "/api/getsobyCam/?campaign_id=" + campaignId, {
        // auth: {
          // username: this.REMOTEUSERNAME,
          // password: this.REMOTEPASSWORD,
        // },
      })
      .then(function (res) {
        if (res.status != 200) {
          throw new Error("code not equal 200");
        }
        if (!res.data.status) {
          throw new Error("code not equal 200");
        }
        // console.log(res.status)
        // console.log(res.data.data.user)
        // console.log(res.data.data.pass)
        // console.log(res.data.data.proxy)
        const sosetting = {
          sotype: res.data.data.sotype,
          socialuser: res.data.data.user,
          socialpass: res.data.data.pass,
          proxy: {
            proxy: res.data.data.proxy.url,
            user: res.data.data.proxy.user,
            pass: res.data.data.proxy.pass,
          },
        };
        return sosetting;
      })
      .catch(function (error) {
        console.error(error);
      });

    return sosetvar;
  }

  /**
   * get campaign from remote servive
   */
  async getCampaignlist(): Promise<Array<socialTask>> {
    const campignlist = await axios
      .get(this.REMOTEADD + "/api/listsotask", {
        // auth: {
        //   username: this.REMOTEUSERNAME,
        //   password: this.REMOTEPASSWORD,
        // },
      })
      .then(function (res) {
        if (res.status != 200) {
          throw new Error("code not equal 200");
        }
        if (!res.data.data) {
          throw new Error("data not exist");
        }
        return res.data.data as Array<socialTask>;

      })
      .catch(function (error) {
        throw new Error("code not equal 200");
        // console.error(error);
      });
    return campignlist;
  }
  /**
   * save link to remote servive
   */
  async saveLinkremote(link: Linkdata): Promise<number> {
    const FormData = require('form-data');
    debug(link)
    const data = new FormData();
    data.append('title', link.title);
    if (link.content) {
      data.append('content', link.content);
    }
    data.append('url', link.url);
    data.append('lang', link.lang);
    if (link.socialtask_id) {
      data.append('socialtask_id', link.socialtask_id);
    }
    // debug(this.REMOTEUSERNAME)
    // debug(this.REMOTEPASSWORD)
    const linkId = await axios.post(this.REMOTEADD + "/api/savesolink", data,
      {
        // auth: {
        //   username: this.REMOTEUSERNAME,
        //   password: this.REMOTEPASSWORD,
        // },
      })
      .then(function (res) {
        // debug(res);
        // console.log(res)
        return res.data.data as number;
      })
      .catch(function (error) {
        // console.log(error);
        throw new Error(error.message);
      });
    return linkId;
  }
  //get scrapy info list
  async Getscrapyinfolist(taskId: number, limit: number): Promise<Array<Linkdata| null>> {
    const linkdaarr =await axios.get(this.REMOTEADD +"/api/getscrapeinfolist?sotaskid="+taskId+"&limit="+limit,{
      // auth: {
      //   username: this.REMOTEUSERNAME,
      //   password: this.REMOTEPASSWORD,
      // },
    }).then(function (res) {
      debug(res);
      // console.log(res)
      return res.data.data as Array<Linkdata| null>;
    })
    .catch(function (error) {
      // console.log(error);
      throw new Error(error.message);
    });
    return linkdaarr;
  }
  /**
   * get task info
   * @param taskId 
   */
  async Gettaskinfo(taskId: number): Promise<null|socialTask>{
    const taskInfo =await axios.get(this.REMOTEADD +"/api/getsocialtaskinfo?task_id="+taskId,{
      // auth: {
      //   username: this.REMOTEUSERNAME,
      //   password: this.REMOTEPASSWORD,
      // },
    }).then(function (res) {
      // debug(res);
      // console.log(res)
      return res.data.data as socialTask;
    })
    .catch(function (error) {
      // console.log(error);
      throw new Error(error.message);
    });
    return taskInfo;
  }
 /**
  * get social task keywords
  * @param taskId 
  * @returns 
  */
  async Gettaskkeywords(taskId: number): Promise<Array<string>>{
    const taskInfo =await axios.get(this.REMOTEADD +"/api/taskkeyword?task_id="+taskId,{
      // auth: {
      //   username: this.REMOTEUSERNAME,
      //   password: this.REMOTEPASSWORD,
      // },
    }).then(function (res) {
      // debug(res);
      // console.log(res)
      const keywords:Array<string>=[];
      const Keyitemarr=res.data.data as Array<keywordItem>;
      for(const item in Keyitemarr){
        
        keywords.push(Keyitemarr[item].keyword)
      }
      return keywords;
    })
    .catch(function (error) {
      // console.log(error);
      throw new Error(error.message);
    });
    return taskInfo;
  }
  async Updateprocesstime(scropeId:number){
    const FormData = require('form-data');
    const data = new FormData();
    data.append('id', scropeId);
   
    await axios.post(this.REMOTEADD + "/api/updatescrapeprotime", data,
    {
      // auth: {
      //   username: this.REMOTEUSERNAME,
      //   password: this.REMOTEPASSWORD,
      // },
    })
    .then(function (res) {
      // debug(res);
      // console.log(res)
      // return res.data.data as number;
    })
    .catch(function (error) {
      // console.log(error);
      throw new Error(error.message);
    });
  }
  //login user
  async Login(username:string,password:string):Promise<jwtUser>{
    const FormData = require('form-data');
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    const thisobj=this
    const loginInfo =await axios.post(this.REMOTEADD +"/user/login",data).then(function (res) {
      if(res.status!=200){
        throw new Error(res.statusText);
      }
      if(res.data.status==false){
        throw new Error(res.data.msg);
      }
      //decode jwt token
      const decoded = thisobj.ValidateToken(res.data.data.Token);
      if(decoded.account_id>0){
        const tokenModel=new Token()
        tokenModel.setValue(thisobj.tokenname,res.data.data.Token)
      }
      return decoded;
      //return res.data.Token as {token:string};
    })
    .catch(function (error) {
      // console.log(error);
      throw new Error(error.message);
    });
    return loginInfo;
  }
  //get user info use token
  async GetUserInfo():Promise<jwtUser|null>{
    const tokenModel=new Token()
    console.log("token name:"+this.tokenname)
    
    const token=await tokenModel.getValue(this.tokenname);
    //const thisobj=this
    if(token==null||token.length<1){
      return null;
    }
    console.log(token)
    
    const loginInfo =await axios.get(this.REMOTEADD +"/api/user/info",{
      headers: {
        Authorization: "Bearer "+token,
      },
    }).then(function (res) {
      console.log(res);
      if(res.status!=200){
        
        throw new Error(res.statusText);
      }
      if(res.data.status==false){
        throw new Error(res.data.msg);
      }
      console.log(res.data.data)
      //decode jwt token
      //const decoded = thisobj.ValidateToken(token);
      return res.data.data;
      //return res.data.Token as {token:string};
    })
    .catch(function (error) {
      // console.log(error);
      throw new Error(error.message);
    });
    return loginInfo;
  }
  //validate jwt token 
  public ValidateToken(token:string):jwtUser{
    //console.log(token)
    const decoded = jwt_decode(token) as jwtTokenUser;
    const jwtuser:jwtUser={
      account_id:decoded.AccountId,
      email:decoded.Email,
      // token:token,
      roles:decoded.Roles?decoded.Roles:[],
    }
    return jwtuser;
  }
}

// module.exports = {
//   RemoteSource: RemoteSource,

// };
