export type PageSearch={
    page:number,
    size:number
}
export interface CommonResponse <Type>{
    status: boolean
    msg: string
    data: ListData<Type>
}
export interface ListData <Type>{
    records: Array<Type>
    num: number
}