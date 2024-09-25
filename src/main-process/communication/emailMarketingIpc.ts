import {EmailMarketingController} from "@/controller/emailMarketingController";
import { ipcMain } from 'electron';
import {EMAILMARKETINGTEMPLIST} from "@/config/channellist";
import {ItemSearchparam} from "@/entityTypes/commonType"

export function registerEmailMarketingIpcHandlers() {
    const emailmarketCon=new EmailMarketingController()
    ipcMain.handle(EMAILMARKETINGTEMPLIST, async (event, arg) => {
        const qdata = JSON.parse(arg) as ItemSearchparam;
        if (!Object.prototype.hasOwnProperty.call(qdata, "page")) {
            qdata.page = 0;
          }
          if (!Object.prototype.hasOwnProperty.call(qdata, "size")) {
            qdata.size = 100;
          }
        emailmarketCon.listEmailTemplate(qdata.page,qdata.size,qdata.search)
    });

}