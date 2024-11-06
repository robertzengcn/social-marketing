import {EmailTemplatePreviewdata,EmailTemplatedata} from "@/entityTypes/emailmarketingType"

export function convertVariableInTemplate(data:EmailTemplatePreviewdata): EmailTemplatedata {
    //replace variable in template
    let content = data.TplContent;
    content = content.replace(/{\$sender}/g, data.Sender);
    content = content.replace(/{\$receiver}/g, data.Receiver);
    //replace time variable
    const date = new Date();
    //const time = date.toLocaleTimeString();
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    content = content.replace(/{\$time}/g, formattedDate);
  
    let title=data.TplTitle
    title = title.replace(/{\$sender}/g, data.Sender);
    title = title.replace(/{\$receiver}/g, data.Receiver);
    title=title.replace(/{\$time}/g, formattedDate);
  
    const resdata: EmailTemplatedata = {
      TplTitle: title,
      TplContent: content
    }
    return resdata;
  
  } 