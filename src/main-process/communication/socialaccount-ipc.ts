import { ipcMain } from 'electron'
import {SOCIALPLATFORM_LIST, SOCIALACCOUNTlIST,SOCIALACCOUNTDETAIL,SOCIAL_ACCOUNT_LOGIN,SOCIALACCOUNTSAVE,SOCIAL_ACCOUNT_LOGIN_MESSSAGE } from "@/config/channellist"
import { SocialAccount } from '@/modules/socialaccount'
import { SocialPlatform } from "@/modules/social_platform"
import { SocialAccountController } from '@/controller/socialaccount-controller'
import { CommonDialogMsg } from "@/entityTypes/commonType";

//import {} from "@/config/channellist"
// import { ItemSearchparam } from "@/entityTypes/commonType"
export function registerSocialAccountIpcHandlers() {
    const socialaccount = new SocialAccount()
    const socialPlatform = new SocialPlatform()
    const sac = new SocialAccountController()
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
  //login social account
  ipcMain.on(SOCIAL_ACCOUNT_LOGIN, async (event, data) => {
    const qdata = JSON.parse(data);
    if (!("id" in qdata)) {
        throw new Error("id not found");
    }
    //const sac = new SocialAccountController()
    try {
        // event.sender.send('socialaccount:login:msg', JSON.stringify({ msg: "test", status: false }))
        await sac.loginSocialaccount(qdata.id,()=>{
          const comMsgs: CommonDialogMsg = {
            status: false,
            code: 20240705103811,
            data: {
                action: "uploadfileMsg",
                title: "socialaccount.uploadfileMsg_title",
                content: "socialaccount.uploadfileMsg_content"
            }
        }
        event.sender.send(SOCIAL_ACCOUNT_LOGIN_MESSSAGE, JSON.stringify(comMsgs))
        })
        
    } catch (error) {
        if (error instanceof Error) {
            //console.log(error.message)
            const comMsgs: CommonDialogMsg = {
              status: false,
              code: 202412141226150,
              data: {
                  action: "error",
                  title: "",
                  content: error.message
              }
          }
            event.sender.send(SOCIAL_ACCOUNT_LOGIN_MESSSAGE, JSON.stringify(comMsgs))
        }
    }
})
  ipcMain.handle(SOCIALACCOUNTSAVE, async (event, data) => {
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