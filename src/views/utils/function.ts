import {EmailTemplatePreviewdata,EmailTemplatedata} from "@/entityTypes/emailmarketinType"
//split array into groups
export function SplitArrayIntoGroups<Type>(array: Type[], groupSize: number):Type[][] {
        const groups:Type[][] = [];
        for (let i = 0; i < array.length; i += groupSize) {
            // array.slice(i, i + groupSize)
            groups.push(array.slice(i, i + groupSize));
        }
        return groups;
}

const StringIsNumber = value => isNaN(Number(value)) === false;
export function ToArray(enumme) {
    return Object.keys(enumme)
        .filter(StringIsNumber)
        .map(key => enumme[key]);
  }
export  function CapitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}  
export function convertNumberToBoolean(num: number): boolean {
    return num !== 0;
  }
export function isValidUrl(url:string):boolean {
    try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
} 

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


