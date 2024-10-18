import { EmailMarketingController } from "@/controller/emailMarketingController";
import { ipcMain } from 'electron';
import { EMAILMARKETINGTEMPLIST, EMAILMARKETINGTEMPREMOVE,EMAILMARKETINGTEMPDETAIL,
  EMAILMARKETINGTEMPUPDATE,EMAILMARKETINGFILTERLIST,EMAILMARKETFILTERDETAIL} from "@/config/channellist";
import { ItemSearchparam } from "@/entityTypes/commonType"
import { CommonResponse, CommonMessage,CommonIdrequest } from "@/entityTypes/commonType"
import { EmailTemplateRespdata,EmailTemplatedata,EmailFilterdata } from "@/entityTypes/emailmarketinType"

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
        return resp
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
    const qdata = JSON.parse(arg) as CommonIdrequest<string>;
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
    const qdata = JSON.parse(arg) as CommonIdrequest<string>;
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
  //update email template data
  ipcMain.handle(EMAILMARKETINGTEMPUPDATE, async (event, arg) => {
    const qdata = JSON.parse(arg) as EmailTemplatedata;
    const res=await emailmarketCon.updateEmailtemplate(qdata)
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
  })
  ipcMain.handle(EMAILMARKETINGFILTERLIST, async (event, arg) => {
    const qdata = JSON.parse(arg) as ItemSearchparam;
    if (!Object.prototype.hasOwnProperty.call(qdata, "page")) {
      qdata.page = 0;
    }
    if (!Object.prototype.hasOwnProperty.call(qdata, "size")) {
      qdata.size = 100;
    }
    const res = await emailmarketCon.listEmailFilter(qdata.page, qdata.size, qdata.search)

    if (res.status) {
      if (res.data) {
        const resp: CommonResponse<EmailFilterdata> = {
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
        const resp: CommonResponse<EmailFilterdata> = {
          status: true,
          msg: "",
          data: {
            records: [],
            num: 0
          }
        }
        return resp

      }
    } else {
      const resp: CommonResponse<EmailFilterdata> = {
        status: false,
        msg: res.msg,
        data: null
      }
      return resp
    }

  })
  ipcMain.handle(EMAILMARKETFILTERDETAIL, async (event, arg) => {
    const qdata = JSON.parse(arg) as CommonIdrequest<string>;
    if (!qdata.id) {
      const resp: CommonMessage<EmailFilterdata> = {
        status: false,
        msg: "id_require",
      }
      return resp
    }
    const resp=await emailmarketCon.getEmailFilterDetail(Number(qdata.id))
    if (resp.status) {
      const resdata: CommonMessage<EmailFilterdata> = {
        status: true,
        msg: "",
        data: resp.data
      }
      return resdata
    }else{
      const resdata: CommonMessage<EmailFilterdata> = {
        status: false,
        msg: resp.msg,
      }
      return resdata
    }

  })
}