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
    TplTitle:string
    TplContent:string
}

