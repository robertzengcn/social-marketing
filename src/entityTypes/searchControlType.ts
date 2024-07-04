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