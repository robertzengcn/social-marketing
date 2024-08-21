import { SearchResult } from "@/views/api/types"
export type Proxy={
    id?:number,
    // url?:string,
    host?:string,
    port?:string,
    username?:string,
    password?:string,
    protocol?:string,
    country_code?:string
}
export type ProxyEntity={
    id?:number,
    host:string,
    port:string,
    user?:string,
    pass?:string,
    protocol?:string,
    country_code?:string
}
export type ProxyListEntity={
    id?:number,
    host?:string,
    port?:string,
    username?:string,
    password?:string,
    protocol?:string,
    country_code?:string
    addtime:string,
}
export type ProxylistResp={
    status:boolean,
    msg?:string,
    data?:ProxyListEntity[]
}
export type SaveProxyResp={
    status:boolean,
    code:number,
    msg:string,
    data:
    {id:number}
}
export type ProxyParseItem={
    host:string,
    port:string,
    user?:string,
    pass?:string,
    protocol?:string,
    status?:number,
}
export type ProxyCheckres={
    status:boolean,
    msg:string,
    data:boolean
}
export type ImportProxyResp={
    status:boolean,
    code:number,
    msg:string,
    data:boolean
}
export interface SearchProxyResp extends SearchResult<ProxyListEntity>{
    data:ProxyListEntity[]
    total:number
}
export type GetProxyCountResp={
    status:boolean,
    code:number,
    msg:string,
    data:
    {total:number}
}