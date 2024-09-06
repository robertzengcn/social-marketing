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
  }
  export type EmailDatascraper={
    urls:Array<string>,
  }
 