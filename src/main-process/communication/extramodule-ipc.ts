import { ipcMain } from 'electron';
import { EXTRAMODULECHANNE_LIST, EXTRAMODULECHANNE_INSTALL, EXTRAMODULECHANNE_UNINSTALL, EXTRAMODULECHANNE_MESSAGE } from "@/config/channellist";
import { ExtraModuleController } from "@/controller/extramodule-controller";
import { CommonResponse } from "@/entityTypes/commonType"
import { ExtraPipModule } from "@/entityTypes/extramodule-type"
export function registerExtraModulesIpcHandlers() {
  console.log("extramodules list register")
  ipcMain.handle(EXTRAMODULECHANNE_LIST, async (event, arg) => {
    const qdata = JSON.parse(arg);
    if (!Object.prototype.hasOwnProperty.call(qdata, "page")) {
      qdata.page = 0;
    }
    if (!Object.prototype.hasOwnProperty.call(qdata, "size")) {
      qdata.size = 100;
    }
    const extraModules = new ExtraModuleController
    // Handle IPC call
    const extra = extraModules.getExtraModuleList(qdata.page, qdata.size);

    const res: CommonResponse<ExtraPipModule> = {
      status: true,
      msg: "",
      data: extra
    }
    return res
  });

  ipcMain.on(EXTRAMODULECHANNE_INSTALL, async (event, data) => {
    const qdata = JSON.parse(data);
    if (!("name" in qdata)) {
      throw new Error("name not found");
    }
    const extraCtrl = new ExtraModuleController()
    try {
      extraCtrl.installExtraModule(qdata.name, function (message) {
        event.sender.send(EXTRAMODULECHANNE_MESSAGE, JSON.stringify({
          status: true,
          msg: "success",
          data: {
            name: qdata.name,
            message: message
          }
        }))
      }, function (message) {
        if (message.length > 0) {
          event.sender.send(EXTRAMODULECHANNE_MESSAGE, JSON.stringify({
            status: false,
            msg: "failed"
          }))
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        event.sender.send(EXTRAMODULECHANNE_MESSAGE, JSON.stringify({
          status: false,
          msg: error.message
        }))
      }
    }
  });

  ipcMain.on(EXTRAMODULECHANNE_UNINSTALL, async (event, data) => {
    const qdata = JSON.parse(data);
    if (!("name" in qdata)) {
      throw new Error("name not found");
    }
    const extraCtrl = new ExtraModuleController()
    try {
      extraCtrl.removeExtraModule(qdata.name, function (message) {
        event.sender.send(EXTRAMODULECHANNE_MESSAGE, JSON.stringify({
          status: true,
          msg: "success",
          data: {
            name: qdata.name,
            message: message
          }
        }))
      }, function (message) {
        if (message.length > 0) {
          event.sender.send(EXTRAMODULECHANNE_MESSAGE, JSON.stringify({
            status: false,
            msg: "failed"
          }))
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        event.sender.send(EXTRAMODULECHANNE_MESSAGE, JSON.stringify({
          status: false,
          msg: error.message
        }))
      }
    }
  });
}