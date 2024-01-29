'use strict';
export {};
export type ItemSearchparam={
    page:number
    size:number
    sortby:string
    search:string
}
export type SearchResult={
    data:any
    total:number
}
export type IUserData ={
    id: number
    name: string
    email: string
    role: Array<string>
    token: string
}
export type Iresponse ={
    status: boolean
    msg: string
    data?: any
}