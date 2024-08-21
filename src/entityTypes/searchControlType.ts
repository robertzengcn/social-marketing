import {ProxyEntity} from './proxyType'
export type SearchResponse={
    status:boolean,
    msg:string,
    data:any
}
export type Usersearchdata = {
    searchEnginer: number,
    keywords: Array<string>,
    num_pages: number,
    concurrency: number,
    notShowBrowser: boolean,
    proxys?: Array<ProxyEntity>,
    // maxConcurrent: number,
  }
  export interface UsersearchdataParam  extends Usersearchdata{
    proxyIds?:Array<number>,
  }  
export type SearchDataParam={
    searchEnginer: number,
    keywords: Array<string>,
   
}
export type SearchtaskdbEntity = {
    id: number,
    enginer_id: number,
    error_log: string,
    record_time?: string,
    status: number
}
export type SearchtaskEntityNum = {
    total: number,
    records: Array<SearchtaskItem>
}
export type SearchtaskItem = {
    id: number,
    enginer_name: string|undefined,
    error_log?: string,
    record_time?: string,
    keywords:Array<string>,
    keywordline?:string,
    status: string,

}
export type SearchDetailquery = {
taskId: number
}

export type SearchResultFetchparam = {
    page: number,
    itemsPerPage: number,
    sortBy: string,
    search: string
    taskId:number
}