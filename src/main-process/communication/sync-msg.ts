import { ipcMain,dialog,BrowserWindow } from 'electron'
import { userController, userResponse, userlogin } from '@/controller/user-controller'
import { CampaignController } from '@/controller/campaign-controller'
// import { campaignResponse } from '@/modules/campaign'
import { SocialTaskController } from '@/controller/socialtask-controller'
import { SocialTaskResponse, SocialTaskInfoResponse, SocialTaskTypeResponse, TagResponse, SaveSocialTaskResponse } from '@/entityTypes/socialtask-type'
import { SocialTaskRun } from "@/modules/socialtaskrun"
import { SocialTaskResult } from '@/modules/socialtaskResult'
import { User } from '@/modules/user'
import { SocialAccount } from '@/modules/socialaccount'
import { SocialPlatform } from "@/modules/social_platform"
// import { ProxyApi } from '@/modules/proxy_api'
// import { ProxyController } from '@/controller/proxy-controller'
// import { ProxyParseItem } from '@/entityTypes/proxyType'
import {CommonResponse} from "@/entityTypes/commonType"
import {campaignEntity} from "@/entityTypes/campaign-type"
import {OPENDIRECTORY,SOCIALPLATFORM_LIST} from "@/config/channellist"
export default function SyncMsg(mainWindow:BrowserWindow) {
  console.log("SyncMsg");
  ipcMain.handle("user:Login", async (event, data) => {
    // console.log("handle user:Login")
    const userControll = new userController()
    const logindata: userlogin = {
      user: data.username,
      pass: data.password
    };
    const respon: userResponse = await userControll.login(logindata).then(function (res) {
      //console.log(res);
      return {
        status: true,
        msg: "login success",
        data: res
      } as userResponse;

    }).catch(function (err) {
      console.log(err);
      if (err instanceof Error) {
        return {
          status: false,
          msg: "login failure",
        } as userResponse;
      } else {
        return {
          status: false,
          msg: "unknow error",
        } as userResponse;
      }
    })
    return respon;
    // win.webContents.send("user:Login", respon);
  });

  //check if user login
  ipcMain.handle("user:checklogin", async (event, data) => {
    //console.log("handle user:checklogin")
    const userControll = new userController()
    const checkres: userResponse = await userControll.checklogin().then(function (res) {
      //console.log(res);
      if (res == null) {
        return {
          status: false,
          msg: "check failure",
        } as userResponse;
      }
      return {
        status: true,
        msg: "check success",
        data: res
      } as userResponse;
    }).catch(function (err) {
      console.log(err);
      if (err instanceof Error) {
        return {
          status: false,
          msg: "check failure",
        } as userResponse;
      } else {
        return {
          status: false,
          msg: "unknow error",
        } as userResponse;
      }
    });
    return checkres;
  });
  ipcMain.handle("campaign:list", async (event, data) => {
    //console.log("handle campaign:list")
    const camControl = new CampaignController()
    const res = await camControl.getCampaignlist(data).then(function (res) {
     return res
      // return {
      //   status: true,
      //   msg: "get campaign list success",
      //   data: res
      // };
    }).catch(function (err) {
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
    });
    console.log(res)
    return res as CommonResponse<campaignEntity>;
  });
  //get social task list
  ipcMain.handle("socialtask:list", async (event, data) => {
    const qdata = JSON.parse(data);
    if (!("id" in qdata)) {
      //throw new Error("id not found");
      return {
        status: false,
        msg: "id not found",
      };
    }
    const socialControl = new SocialTaskController()
    const res = await socialControl.getSocialTasklist(qdata.id, qdata.page, qdata.size).then(function (res) {
      // console.log(res);
      return res;
    }).catch(function (err) {
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
    });
    console.log(res)
    return res as SocialTaskResponse;
  });
  //get social task info
  ipcMain.handle("socialtask:info", async (event, data) => {
    const qdata = JSON.parse(data);
    if (!("id" in qdata)) {
      //throw new Error("id not found");
      return {
        status: false,
        msg: "id not found",
      };
    }
    const socialControl = new SocialTaskController()
    const res = await socialControl.getSocialTaskinfo(qdata.id).then(function (res) {
      // console.log(res);
      return res;
    }).catch(function (err) {
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
    });
    console.log(res)
    return res as SocialTaskInfoResponse;
  });

  //get social task type list
  ipcMain.handle("socialtasktype:list", async (event, data) => {

    const socialControl = new SocialTaskController()
    const res = await socialControl.getSocialTaskType().then(function (res) {
      // console.log(res);
      return res;
    }).catch(function (err) {
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
    });
    console.log(res)
    return res as SocialTaskTypeResponse;
  });
  //get tag list
  ipcMain.handle("tag:list", async (event, data) => {

    const socialControl = new SocialTaskController()
    const res = await socialControl.getTaglist().then(function (res) {
      // console.log(res);
      return res;
    }).catch(function (err) {
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
    });
    console.log(res)
    return res as TagResponse;
  });
  //save social task
  ipcMain.handle("socialtask:save", async (event, data) => {
    const qdata = JSON.parse(data);

    const socialControl = new SocialTaskController()
    const res = await socialControl.saveSocialTask(qdata).then(function (res) {
      // console.log(res);
      return res;
    }).catch(function (err) {
      // console.log(err);
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
    });
    console.log(res)
    return res as SaveSocialTaskResponse;
  });

  ipcMain.handle("socialtaskrun:list", async (event, data) => {
    const qdata = JSON.parse(data);
    if (!("id" in qdata)) {
      //throw new Error("id not found");
      return {
        status: false,
        msg: "id not found",
      };
    }
    if (!("page" in qdata)) {
      qdata.page = 10;
    }
    if (!("size" in qdata)) {
      qdata.size = 10;
    }
    const stkrunModel = new SocialTaskRun()
    // const res = await stkrunModel.getrunlist(qdata.id).then(function (res) {
    //   // console.log(res);
    const reslist = stkrunModel.getrunlist(qdata.id, qdata.page, qdata.size)
    console.log(reslist)
    return { status: true, msg: "", data: reslist };
    //   // return {status:true,msg:"",data:res};
    // }).catch(function (err) {
    //   console.log(err);
    //   if (err instanceof Error) {
    //     return {
    //       status: false,
    //       msg: err.message,
    //     };
    //   } else {
    //     return {
    //       status: false,
    //       msg: "unknow error",
    //     };
    //   }
    // });
    // console.log(res)
    // return res as SocialTaskResponse;
  });
  ipcMain.handle("socialtaskresult:list", async (event, data) => {
    const qdata = JSON.parse(data);
    if (!("id" in qdata)) {
      //throw new Error("id not found");
      return {
        status: false,
        msg: "id not found",
      };
    }
    if (!("page" in qdata)) {
      qdata.page = 10;
    }
    if (!("size" in qdata)) {
      qdata.size = 10;
    }
    const socialtaskres = new SocialTaskResult()
    const reslist = socialtaskres.gettaskresultlist(qdata.id, qdata.page, qdata.size, null)
    return { status: true, msg: "", data: reslist };
  })
  ipcMain.handle("user:Signout", async (event, data) => {
    const userModel = new User()

    const res = await userModel.Signout().then(function () {
      return {
        status: true,
        msg: "login out success",
      };
    }).catch(function (err) {
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
    return res;
  })

  ipcMain.handle("socialaccount:list", async (event, data) => {
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
    const socialaccount = new SocialAccount()
    const res = await socialaccount.getSocialaccountlist(qdata.page, qdata.size, qdata.search).catch(function (err) {
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
  ipcMain.handle("socialaccount:detail", async (event, data) => {
    const qdata = JSON.parse(data);
    if (!("id" in qdata)) {
      //throw new Error("id not found");
      return {
        status: false,
        msg: "id not found",
      };
    }
    //get detail from remote
    const socialaccount = new SocialAccount()
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

    const socialPlatform = new SocialPlatform()
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
    const socialaccount = new SocialAccount()
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
    const socialaccount = new SocialAccount()
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
 
  
  
  ipcMain.handle(OPENDIRECTORY, async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    })
    if (canceled) {
      return {status:false,msg:"canceled"}
    } else {
      return {status:true,data:filePaths[0]}
    }
  })
}