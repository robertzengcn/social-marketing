import { EmailMarketingController } from "@/controller/emailMarketingController";
import { ipcMain } from 'electron';
import { EMAILMARKETINGTEMPLIST } from "@/config/channellist";
import { ItemSearchparam } from "@/entityTypes/commonType"
import { CommonResponse } from "@/entityTypes/commonType"
import { EmailTemplateRespdata } from "@/entityTypes/emailmarketinType"

export function registerEmailMarketingIpcHandlers() {
  const emailmarketCon = new EmailMarketingController()
  ipcMain.handle(EMAILMARKETINGTEMPLIST, async (event, arg) => {
    const qdata = JSON.parse(arg) as ItemSearchparam;
    if (!Object.prototype.hasOwnProperty.call(qdata, "page")) {
      qdata.page = 0;
    }
    if (!Object.prototype.hasOwnProperty.call(qdata, "size")) {
      qdata.size = 100;
    }
    const res = await emailmarketCon.listEmailTemplate(qdata.page, qdata.size, qdata.search)
    if (res.status) {
      if(res.data){
      const resp: CommonResponse<EmailTemplateRespdata> = {
        status: true,
        msg: "",
        data: {
          records: res.data.records,
          num: res.data.num
        }
      }
      return resp
    }else{
      //data empty
      const resp: CommonResponse<EmailTemplateRespdata> = {
        status: true,
        msg: "",
        data: {
          records: [],
          num: 0
        }
      }

    }
  }else{
    const resp: CommonResponse<EmailTemplateRespdata> = {
      status: false,
      msg: res.msg,
      data: null
    }
    return resp
  }
  });

}