export type PageSearch={
    page:number,
    size:number
}
export interface CommonResponse <Type>{
    status: boolean
    msg: string
    data: ListData<Type>|null
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
        title:string,
        content:string
    }
}
export type CommonActionMsg={
    status:boolean,
    code:number,
    data:{
        action:string,       
    }
}