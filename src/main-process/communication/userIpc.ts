import { ipcMain } from 'electron';
import {QUERY_USER_INFO} from '@/config/channellist'
import { UserController } from '@/controller/UserController'
import {UserInfoType} from "@/entityTypes/userType"
import { CommonMessage } from "@/entityTypes/commonType"
export function registerUserIpcHandlers() {
        const userControll = new UserController()
    ipcMain.handle(QUERY_USER_INFO, async (event, data) => {
        const res=userControll.getUserInfo()
        const result: CommonMessage<UserInfoType> = {
                        status: true,
                        msg: "",
                        data: res
                    }
                    return result;
    })
}