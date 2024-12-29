import {Proxy} from "@/entityTypes/proxyType"
import {TaskStatus} from "@/entityTypes/commonType"
export type videoScraper={
    cookies: string,
    proxy?:Proxy
}
export type downloadVideoparam={
    accountId:Array<number>,
    platform:string,
    link:Array<string>,
    savePath:string,
    isplaylist:boolean,
    proxy: Array<Proxy>,
    ProxyOverride:boolean,
    cookies_type:string,
    browserName?:string,
}
export type videoDownloadMsg={
    status:boolean,
    code?:number,
    msg:string
}

export type douyinAppYaml={
douyin:douyinEntity,
}
export type douyinEntity={
    cookie?:string,
    naming:string,
    timeout: number,
}
export type videoDownloadTaskEntity={
    platform:string,
    // url:string,
    savepath:string,
    runtime_log?:string,
    error_log?:string,
    record_time?:string,
    status?:TaskStatus,
    // record_time:string,
}

export enum VideoDownloadStatus {
    Notstart = 0,
    Start = 1,
    Finish = 2,
    Error=3
  }
export type VideoDownloadEntity={
    id?:number,
    url:string,
    savepath:string,
    record_time?:string,
    task_id:number,
    // strout?:string,
    error_log?:string,
    status:VideoDownloadStatus,
}
export type videoDownloadList={
    total: number,
    records?:Array<VideoDownloadEntity>
}

export type videoDownloadListResp={
    status: boolean,
    msg: string,
    data: videoDownloadList
}
export type videoIdLink={
    id:number,
    link:string
}
export type processVideoDownloadParam={
    exePath:string,
    savePath:string,
    platform:string,
    link:Array<string>,
    cookiesProxy?:Array<CookiesProxy>,
    isplaylist:boolean,
    proxy?:Array<Proxy>,
    BrowserName?:string
}
export type VideoDownloadParam={
    platform:string,
    link:Array<string>,
    cookies?:Array<string>
}
export type CookiesProxy={
    cookies:string,
    proxy?:Proxy[]
}
export type VideodownloadMsg={
    link:string,
    status:boolean,
    savepath?:string,
    log?:string,
    title?:string,
    description?:string,
    tags?:Array<string>,
    categories?:Array<string>,
}
export type YoutubedlStrout={
    id:string,
    title:string,
    description:string,
    tags:Array<string>,
    categories:Array<string>,
}
export type VideodoanloadSuccessCall={
 savepath:string,
 link:string,
 title:string,
 description:string,
 tags:Array<string>,
categories:Array<string>,
}
export type VideoDescriptionEntity={
    id?:number,
    videoId:number,
    title:string,  
    description:string,
    language:string,
    // tags:Array<string>,
    // categories:Array<string>,
}