import { EmailsearchTaskEntityDisplay } from '@/entityTypes/emailextraction-type'
export type EmailsTemplagedata = {
    TplTitle:string
    TplContent:string
    Status?:number
}
export type EmailTemplateRespdata={
    Index?:number
    TplId?:number
    TplTitle:string
    TplContent:string
    TplRecord?:string
    Status?:number
}
export type EmailTemplatePreviewdata={
    TplTitle:string
    TplContent:string
    Sender:string
    Receiver:string
}
export type EmailTemplatedata={
    TplId?:number
    TplTitle:string
    TplContent:string
}
export type EmailFilterdata={
    id?:number
    name:string
    description:string
    filter_details:Array<EmailFilterDetialdata>
}
export type EmailFilterDetialdata={
    id?:number
    content:string
}
export type EmailServiceEntitydata={
    id?: number
    from: string
    password: string
    host: string
    port: string
    name: string
    ssl: number
}
export type EmailServiceListdata={
    id:number
    name: string
    from: string
    host: string
    create_time: string
}
export type  EmailMarketingsubdata={
    sourceType:string
    emailtaskentity?:EmailsearchTaskEntityDisplay
    EmailTemplateslist:Array<EmailTemplateRespdata>
    EmailFilterlist:Array<EmailFilterdata>
    EmailServicelist:Array<EmailServiceListdata>
}
export type EmailItem={
    address:string
    source:string
}
export type Buckemailstruct={
    EmailList:Array<EmailItem>
    EmailTemplateslist:Array<number>
    EmailFilterlist:Array<number>
    EmailServicelist:Array<number>
}
export type Buckemailremotedata={
    Emailtemplist: Array<EmailTemplateRespdata>
    Emailfilterlist: Array<EmailFilterdata>
    Emailservicelist: Array<EmailServiceEntitydata>
}
