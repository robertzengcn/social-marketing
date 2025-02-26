import { getSystemSettinglist } from '@/views/api/systemsetting';
import { ipcMain } from 'electron';
import { SYSTEM_SETTING_LIST } from "@/config/channellist";
import { SystemSettingController } from "@/controller/SystemSettingController"
import { CommonMessage } from "@/entityTypes/commonType";
import { SystemSettingGroupDisplay } from '@/entityTypes/systemsettingType';

export function registerSystemSettingIpcHandlers() {
    const systemSettingCtrl = new SystemSettingController()
    ipcMain.handle(SYSTEM_SETTING_LIST, async (event, data) => {
        try {
            const res = await systemSettingCtrl.selectAllSystemSettings();
            const result: CommonMessage<Array<SystemSettingGroupDisplay>> = {
                status: true,
                msg: "",
                data: []
            }
        } catch (error) {
            if (error instanceof Error) {
            const result: CommonMessage<Array<SystemSettingGroupDisplay>> = {
                status: false,
                msg:error.message,
                data: []
            }
            return result;
        }
        }
    })

}