import {ProxyEntity} from '@/entityTypes/proxyType'
export type EmailscFormdata = {
    extratype: string,
    urls?: Array<string>,
    searchTaskId?:number,
    concurrency: number,
    pagelength: number,
    notShowBrowser: boolean,
    proxys?: Array<ProxyEntity>,
    // maxConcurrent: number,
  }
  export type EmailClusterdata={
    url:string,
    proxy?:string,
    domain:string,
    maxPageLevel:number,
    visited?:Set<string>
    callback?: (arg: EmailResult) => void
  }
  export type EmailDatascraper={
    urls:Array<string>,
    callback?: (arg: EmailResult) => void
  }
  export type EmailSearchData={
    urls:Array<string>,
    proxys?: Array<ProxyEntity>,
    pageLevel:number,
    notShowBrowser:boolean
    concurrency:number,
    // callback?: (arg: EmailResult) => void
  }
  export type EmailResult={
    pageTitle:string,
    filteredLinks:Array<string>,
    emails:Array<string>
  }
 