import { computed} from 'vue'
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
    msg?:string,
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
export type SortBy={
    key:string
    order:string
}
export type ItemSearchparam={
    page:number
    size:number
    where?:string
    sortby?:SortBy
    search?:string
}
export interface CommonApiresp <Type>{
    status: boolean
    code:number
    msg: string 
    data?: Type
}
export interface CommonIdrequest<Type>{
    id:Type
}
export interface CommonIdrequestType<Type> extends CommonIdrequest<Type>{
    type:string
}
export type Header = {
    title: string | ReturnType<typeof computed>;
    align?: string;
    sortable: boolean;
    key: string;
    width?: string;
    value?:any;
};
export type VslotHeader = {
    step: number;
    title:string| ReturnType<typeof computed>;
    rules?:	any;
     valid: boolean
}
export enum TaskStatus {
    Notstart = 0,
    Processing = 1,
    Complete = 2,
    Error = 3
  }
  export interface CommonIdrequestIds<Type> {
   ids:Array<Type>,
}
export type LanguageItem={
    id:number,
    name:string
    code:string
}

