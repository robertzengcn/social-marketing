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
    filter_details:Array<EmailFilterDetialdata>
}
export type EmailFilterDetialdata={
    id?:number
    content:string
}

