import {ipcMain } from 'electron'
import { userController, userResponse, userlogin } from '@/controller/user-controller'
export default function SyncMsg() {
  console.log("SyncMsg");
ipcMain.handle("user:Login", async (event, data) => {
 
    const userControll = new userController()
    const logindata:userlogin = {user:data.username,
      pass:data.password};
    const respon:userResponse = await userControll.login(logindata).then(function (res) {
      console.log(res);
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
      }else{
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
    const userControll = new userController()
    const checkres:userResponse=await userControll.checklogin().then(function (res) {
      console.log(res);
      if(res==null){
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
      }else{
        return {
          status: false,
          msg: "unknow error",
        } as userResponse;
      }
    });  
    return checkres; 
  }); 
 
}