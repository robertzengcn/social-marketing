import { ipcMain } from 'electron';
import {EXTRAMODULECHANNE_LIST} from "@/config/channellist";
import {ExtraModuleController} from "@/controller/extramodule-controller";
export function registerExtraModulesIpcHandlers() {
    ipcMain.handle(EXTRAMODULECHANNE_LIST, async (event, arg) => {
        const qdata = JSON.parse(arg);
        if (!qdata.hasOwnProperty("page")) {
            qdata.page = 0;
          }
          if (!qdata.hasOwnProperty("size")) {
            qdata.size = 100;
          }
        const extraModules=new ExtraModuleController
        // Handle IPC call
        const extra=extraModules.getExtraModuleList(qdata.page,qdata.size);
        return extra
    });
  
    // More handlers...
  }