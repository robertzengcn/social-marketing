import { EmailMarketingController } from "@/controller/emailMarketingController";
import { ipcMain } from 'electron';
import {
  EMAILMARKETINGTEMPLIST, EMAILMARKETINGTEMPREMOVE, EMAILMARKETINGTEMPDETAIL,
  EMAILMARKETINGTEMPUPDATE, EMAILMARKETINGFILTERLIST, EMAILMARKETFILTERDETAIL, EMAILMARKETFILTERUPDATE,
  EMAILSERVICELIST, EMAILSERVICEDETAIL, EMAILSERVICEUPDATE, EMAILSERVICEDELETE, EMAILFILTERDELETE, SENDTESTEMAIL, RECEIVESENDTESTEMAILMESSAGE
} from "@/config/channellist";
import { ItemSearchparam } from "@/entityTypes/commonType"
import { CommonResponse, CommonMessage, CommonIdrequest, CommonDialogMsg } from "@/entityTypes/commonType"
import { EmailTemplateRespdata, EmailTemplatedata, EmailFilterdata, EmailServiceListdata, EmailServiceEntitydata, EmailSendParam } from "@/entityTypes/emailmarketingType"

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
      const resp: CommonMessage<CommonIdrequest<number>> = {
        status: true,
        msg: "",
        data: res.data
      }
      return resp
    } else {
      const resp: CommonMessage<CommonIdrequest<number>> = {
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
    const res = await emailmarketCon.updateEmailtemplate(qdata)
    if (res.status) {
      const resp: CommonMessage<CommonIdrequest<number>> = {
        status: true,
        msg: "",
        data: res.data
      }
      return resp
    } else {
      const resp: CommonMessage<CommonIdrequest<number>> = {
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
    // console.log(res)
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
    const resp = await emailmarketCon.getEmailFilterDetail(Number(qdata.id))
    if (resp.status) {
      const resdata: CommonMessage<EmailFilterdata> = {
        status: true,
        msg: "",
        data: resp.data
      }
      return resdata
    } else {
      const resdata: CommonMessage<EmailFilterdata> = {
        status: false,
        msg: resp.msg,
      }
      return resdata
    }

  })
  //update email filter
  ipcMain.handle(EMAILMARKETFILTERUPDATE, async (event, arg) => {
    const qdata = JSON.parse(arg) as EmailFilterdata;
    const res = await emailmarketCon.updateEmailFilter(qdata)
    console.log(res)
    if (res.status) {
      const resp: CommonMessage<CommonIdrequest<number>> = {
        status: true,
        msg: "",
        data: res.data
      }
      return resp
    } else {
      const resp: CommonMessage<CommonIdrequest<number>> = {
        status: false,
        msg: res.msg,

      }
      return resp
    }
  })
  //delete email filter
  ipcMain.handle(EMAILFILTERDELETE, async (event, arg) => {
    const qdata = JSON.parse(arg) as CommonIdrequest<string>;
    if (!qdata.id) {
      const resp: CommonMessage<number> = {
        status: false,
        msg: "Template id is required",
      }
      return resp
    }
    const res = await emailmarketCon.deleteEmailFilter(Number(qdata.id))
    if (res.status) {
      const resp: CommonMessage<CommonIdrequest<number>> = {
        status: true,
        msg: "",
        data: res.data
      }
      return resp
    } else {
      const resp: CommonMessage<CommonIdrequest<number>> = {
        status: false,
        msg: res.msg,

      }
      return resp
    }
  });

  //email service
  //get email service list
  ipcMain.handle(EMAILSERVICELIST, async (event, arg) => {
    const qdata = JSON.parse(arg) as ItemSearchparam;
    if (!Object.prototype.hasOwnProperty.call(qdata, "page")) {
      qdata.page = 0;
    }
    if (!Object.prototype.hasOwnProperty.call(qdata, "size")) {
      qdata.size = 100;
    }
    const res = await emailmarketCon.getEmailServiceList(qdata.page, qdata.size, qdata.search)
    console.log(res)
    if (res.status) {
      if (res.data) {
        const resp: CommonResponse<EmailServiceListdata> = {
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
        const resp: CommonResponse<EmailServiceListdata> = {
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
      const resp: CommonResponse<EmailServiceListdata> = {
        status: false,
        msg: res.msg,
        data: null
      }
      return resp
    }
  });
  //email service detail
  ipcMain.handle(EMAILSERVICEDETAIL, async (event, arg) => {
    const qdata = JSON.parse(arg) as CommonIdrequest<string>;
    if (!qdata.id) {
      const resp: CommonMessage<EmailServiceEntitydata> = {
        status: false,
        msg: "template_id_require",
      }
      return resp
    }
    const res = await emailmarketCon.getEmailServiceDetail(Number(qdata.id))
    if (res.status) {
      const resp: CommonMessage<EmailServiceEntitydata> = {
        status: true,
        msg: "",
        data: res.data
      }
      return resp
    } else {
      const resp: CommonMessage<EmailServiceEntitydata> = {
        status: false,
        msg: res.msg,
      }
      return resp
    }
  });
  //create or update email service
  ipcMain.handle(EMAILSERVICEUPDATE, async (event, arg) => {
    const qdata = JSON.parse(arg) as EmailServiceEntitydata;
    const res = await emailmarketCon.createuEmailService(qdata)
    console.log(res)
    if (res.status) {
      const resp: CommonMessage<CommonIdrequest<number>> = {
        status: true,
        msg: "",
        data: res.data
      }
      return resp
    } else {
      const resp: CommonMessage<CommonIdrequest<number>> = {
        status: false,
        msg: res.msg,

      }
      return resp
    }
  })

  //delete email service
  ipcMain.handle(EMAILSERVICEDELETE, async (event, arg) => {
    const qdata = JSON.parse(arg) as CommonIdrequest<string>;
    if (!qdata.id) {
      const resp: CommonMessage<number> = {
        status: false,
        msg: "Template id is required",
      }
      return resp
    }
    const res = await emailmarketCon.deleteEmailService(Number(qdata.id))
    if (res.status) {
      const resp: CommonMessage<CommonIdrequest<number>> = {
        status: true,
        msg: "",
        data: res.data
      }
      return resp
    } else {
      const resp: CommonMessage<CommonIdrequest<number>> = {
        status: false,
        msg: res.msg,

      }
      return resp
    }
  });

  //SEND test email

  ipcMain.on(SENDTESTEMAIL, async (event, arg) => {
    const qdata = JSON.parse(arg) as EmailSendParam;


    // try {
    await emailmarketCon.sendEmail(qdata, (errorMessage: string) => {
      console.log(errorMessage)
      const resp: CommonDialogMsg = {
        status: false,
        code: 202411141455379,
        data: {
          action: "error",
          title: "emailservice.send_test_email_error",
          content: errorMessage
        }
      }
      event.sender.send(RECEIVESENDTESTEMAILMESSAGE, JSON.stringify(resp))
      return
    }, () => {
      // console.log("email send success")
      const resp: CommonDialogMsg = {
        status: true,
        code: 0,
        data: {
          action: "success",
          title: "emailservice.send_test_email_success",
          content: ""
        }
      }
      event.sender.send(RECEIVESENDTESTEMAILMESSAGE, JSON.stringify(resp))
      return resp
    }).catch((error) => {
      console.log(error)
      let errorMessage: string;

      if (error instanceof Error) {
        // If error is an instance of Error, access its message property
        errorMessage = error.message;
      } else {
        // Otherwise, convert error to a string
        errorMessage = String(error);
      }

      const resp: CommonDialogMsg = {
        status: false,
        code: 202411141458415,
        data: {
          action: "error",
          title: "send_test_email_error",
          content: errorMessage
        }
      }
      event.sender.send(RECEIVESENDTESTEMAILMESSAGE, JSON.stringify(resp))
      return resp
    })


  })

}