import { ipcMain } from 'electron';
import { QUERY_USER_INFO, OPENLOGINPAGE, GET_LOGIN_URL,USER_CHECK_LOGIN, USER_LOGIN } from '@/config/channellist'
import { UserController, userResponse, userlogin } from '@/controller/UserController'
import { UserInfoType } from "@/entityTypes/userType"
import { CommonMessage } from "@/entityTypes/commonType"
export function registerUserIpcHandlers() {

    ipcMain.handle(QUERY_USER_INFO, async (event, data) => {
        const userControll = new UserController()
        const res = userControll.getUserInfo()
        const result: CommonMessage<UserInfoType> = {
            status: true,
            msg: "",
            data: res
        }
        return result;
    })

    //check if user login
    ipcMain.handle(USER_CHECK_LOGIN, async (event, data) => {
        //console.log("handle user:checklogin")
        const userControll = new UserController()
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

    ipcMain.handle(GET_LOGIN_URL, async (event, data) => {
        try {
            const userControll = new UserController()
            const loginUrl = userControll.getLoginPageUrl()
            const result: CommonMessage<string> = {
                status: true,
                msg: "Login URL retrieved successfully",
                data: loginUrl
            }
            return result;
        } catch (error) {
            console.error("Error getting login URL:", error)
            const result: CommonMessage<string> = {
                status: false,
                msg: error instanceof Error ? error.message : "Failed to get login URL",
                data: ""
            }
            return result;
        }
    })

    ipcMain.on(OPENLOGINPAGE, async (event, data) => {

        // open login page from browser
        try {
            const userControll = new UserController()
            await userControll.openLoginPage()
            return {
                status: true,
                msg: "Login page opened successfully",
                data: null
            } as CommonMessage<null>
        } catch (error) {
            console.error("Error opening login page:", error)
            return {
                status: false,
                msg: error instanceof Error ? error.message : "Failed to open login page",
                data: null
            } as CommonMessage<null>
        }
    })

    ipcMain.handle(USER_LOGIN, async (event, data) => {
        // console.log("handle user:Login")
        const userControll = new UserController()
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
          // console.error(err);
          console.error("Error trace:", err);
          if (err instanceof Error) {
            return {
              status: false,
              msg: err.message,
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
}