import { ipcMain } from 'electron'
import { userController, userResponse, userlogin } from '@/controller/user-controller'
import { CampaignController } from '@/controller/campaign-controller'
import { campaignResponse } from '@/modules/campaign'
import { SocialTaskController } from '@/controller/socialtask-controller'
import { SocialTaskResponse,SocialTaskInfoResponse,SocialTaskTypeResponse,TagResponse,SaveSocialTaskResponse } from '@/entity-types/socialtask-type'

export default function SyncMsg() {
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
      console.log(res);
      return {
        status: true,
        msg: "get campaign list success",
        data: res
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
    });
    console.log(res)
    return res as campaignResponse;
  });
  //get social task list
  ipcMain.handle("socialtask:list", async (event, data) => {
     const qdata=JSON.parse(data);
        if(!qdata.hasOwnProperty("id")){
            //throw new Error("id not found");
            return {
                status: false,
                msg: "id not found",
            };
        }
    const socialControl = new SocialTaskController()
    const res = await socialControl.getSocialTasklist(qdata.id,qdata.page,qdata.size).then(function (res) {
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
    if (!qdata.hasOwnProperty("id")) {
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
}