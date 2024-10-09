import { EmailMarketingController } from "@/controller/emailMarketingController";
import { ipcMain } from 'electron';
import { EMAILMARKETINGTEMPLIST, EMAILMARKETINGTEMPREMOVE,EMAILMARKETINGTEMPDETAIL,EMAILMARKETINGTEMPPREVIEW} from "@/config/channellist";
import { ItemSearchparam } from "@/entityTypes/commonType"
import { CommonResponse, CommonMessage,CommonIdrequest } from "@/entityTypes/commonType"
import { EmailTemplateRespdata,EmailTemplatePreviewdata } from "@/entityTypes/emailmarketinType"

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
      if (res.data) {
        const resp: CommonResponse<EmailTemplateRespdata> = {
          status: true,
          msg: "",
          data: {
            records: res.data.records,
            num: res.data.num
          }
        }
        return resp
      } else {
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
    } else {
      const resp: CommonResponse<EmailTemplateRespdata> = {
        status: false,
        msg: res.msg,
        data: null
      }
      return resp
    }
  });

  //remove email template
  ipcMain.handle(EMAILMARKETINGTEMPREMOVE, async (event, arg) => {
    const qdata = JSON.parse(arg) as CommonIdrequest;
    if (!qdata.id) {
      const resp: CommonMessage<number> = {
        status: false,
        msg: "Template id is required",
      }
      return resp
    }
    const res = await emailmarketCon.removeEmailTemplate(Number(qdata.id))
    if (res.status) {
      const resp: CommonMessage<number> = {
        status: true,
        msg: "",
        data: res.data
      }
      return resp
    } else {
      const resp: CommonMessage<number> = {
        status: false,
        msg: res.msg,

      }
      return resp
    }
  });
  //get email template by id
  ipcMain.handle(EMAILMARKETINGTEMPDETAIL, async (event, arg) => {
    const qdata = JSON.parse(arg) as CommonIdrequest;
    if (!qdata.id) {
      const resp: CommonMessage<EmailTemplateRespdata> = {
        status: false,
        msg: "template_id_require",
      }
      return resp
    }
    const res = await emailmarketCon.getEmailTemplateDetail(Number(qdata.id))
    if (res.status) {
      const resp: CommonMessage<EmailTemplateRespdata> = {
        status: true,
        msg: "",
        data: res.data
      }
      return resp
    } else {
      const resp: CommonMessage<EmailTemplateRespdata> = {
        status: false,
        msg: res.msg,
      }
      return resp
    }
  });
  //submit email preview data
  ipcMain.handle(EMAILMARKETINGTEMPPREVIEW, async (event, arg) => {
    const qdata = JSON.parse(arg) as EmailTemplatePreviewdata;
    
  })
}