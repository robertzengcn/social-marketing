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
    notShowBrowser: boolean
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
    records: Array<SearchtaskdbEntity>
}