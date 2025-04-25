import { ipcMain } from 'electron';
import {QUERY_USER_INFO,OPENLOGINPAGE} from '@/config/channellist'
import { UserController } from '@/controller/UserController'
import {UserInfoType} from "@/entityTypes/userType"
import { CommonMessage } from "@/entityTypes/commonType"
export function registerUserIpcHandlers() {
        
    ipcMain.handle(QUERY_USER_INFO, async (event, data) => {
        const userControll = new UserController()
        const res=userControll.getUserInfo()
        const result: CommonMessage<UserInfoType> = {
                        status: true,
                        msg: "",
                        data: res
                    }
                    return result;
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
}