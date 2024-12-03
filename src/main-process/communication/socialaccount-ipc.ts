import { ipcMain } from 'electron'
import {SOCIALPLATFORM_LIST, SOCIALACCOUNTlIST,SOCIALACCOUNTDETAIL } from "@/config/channellist"
import { SocialAccount } from '@/modules/socialaccount'
import { SocialPlatform } from "@/modules/social_platform"
// import { ItemSearchparam } from "@/entityTypes/commonType"
export function registerSocialAccountIpcHandlers() {
    const socialaccount = new SocialAccount()
    const socialPlatform = new SocialPlatform()
ipcMain.handle(SOCIALACCOUNTlIST, async (event, data) => {
    const qdata = JSON.parse(data);

    if (!("page" in qdata)) {
      qdata.page = 10;
    }
    if (!("size" in qdata)) {
      qdata.size = 10;
    }
    if (!("search" in qdata)) {
      qdata.search = "";
    }
   
    let platformId = 0
    if (qdata.where) {
      try {
        platformId = socialaccount.convertPlatform(qdata.where)
      } catch (e) {
        if (e instanceof Error) {
          return {
            status: false,
            msg: e.message,
          };
        }else{
            return {
                status: false,
                msg: "unkonw error in covert platform"
              };
        }
      }
     
    }
    const res = await socialaccount.getSocialaccountlist(qdata.page, qdata.size, qdata.search,platformId).catch(function (err) {
      console.log(err);
      if (err instanceof Error) {
        return {
          status: false,
          msg: err.message,
        };
      } else {
        return {
          status: false,
          msg: "unknow error",
        };
      }

    })
    // console.log(res)
    return res
  })
  ipcMain.handle(SOCIALACCOUNTDETAIL, async (event, data) => {
    const qdata = JSON.parse(data);
    if (!("id" in qdata)) {
      //throw new Error("id not found");
      return {
        status: false,
        msg: "id not found",
      };
    }
    //get detail from remote
    // const socialaccount = new SocialAccount()
    const res = await socialaccount.getAccountdetail(qdata.id).catch(function (err) {
      console.log(err);
      if (err instanceof Error) {
        return {
          status: false,
          msg: err.message,
        };
      } else {
        return {
          status: false,
          msg: "unknow error",
        };
      }

    })

    return res
  })
  //list social platform
  ipcMain.handle(SOCIALPLATFORM_LIST, async (event, data) => {
    const qdata = JSON.parse(data);

    if (!("page" in qdata)) {
      qdata.page = 10;
    }
    if (!("size" in qdata)) {
      qdata.size = 10;
    }

  
    const res = await socialPlatform.listsocialplatform(qdata.page, qdata.size).catch(function (err) {
      console.log(err);
      if (err instanceof Error) {
        return {
          status: false,
          msg: err.message,
        };
      } else {
        return {
          status: false,
          msg: "unknow error",
        };
      }

    })
    // console.log(res)
    return res
  })
  ipcMain.handle("socialaccount:save", async (event, data) => {
    //save social account
    const qdata = JSON.parse(data);
    // const socialaccount = new SocialAccount()
    const res = await socialaccount.saveSocialAccount(qdata).catch(function (err) {
      console.log(err);
      if (err instanceof Error) {
        return {
          status: false,
          msg: err.message,
        };
      } else {
        return {
          status: false,
          msg: "unknow error",
        };
      }
    })
    return res
  })
  //delete social account
  ipcMain.handle("socialaccount:delete", async (event, data) => {
    const qdata = JSON.parse(data);
    if (!("id" in qdata)) {
      //throw new Error("id not found");
      return {
        status: false,
        msg: "id not found",
      };
    }
    //get detail from remote
    
    const res = await socialaccount.deleteAccount(qdata.id).catch(function (err) {
      console.log(err);
      if (err instanceof Error) {
        return {
          status: false,
          msg: err.message,
        };
      } else {
        return {
          status: false,
          msg: "unknow error",
        };
      }

    })

    return res
  })
}