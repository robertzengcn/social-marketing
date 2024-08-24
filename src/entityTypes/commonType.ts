export type PageSearch={
    page:number,
    size:number
}
export interface CommonResponse <Type>{
    status: boolean
    msg: string
    data?: ListData<Type>|null
}
export interface ListData <Type>{
    records: Array<Type>
    num: number
}
//message used in layout dialog
export type CommonDialogMsg={
    status:boolean,
    code:number,
    data?:{
        action?:string,  
        title:string,
        content:string
    }
}
export interface CommonMessage <Type>{
    status: boolean
    msg: string
    data?: Type
}
export interface NumProcessdata{
    // total:number,
    // num:number,
    process:number
}
