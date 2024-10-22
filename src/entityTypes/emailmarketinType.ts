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
export type EmailServicListdata={
    id:number
    name: string
    from: string
    host: string
    create_time: string
}
