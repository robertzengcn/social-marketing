import {Proxy} from "@/entityTypes/proxyType"
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
    proxy: Array<Proxy>
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
    runtimeLog?:string,
    errorLog?:string,
    // record_time:string,
}

export enum VideoDownloadStatus {
    Notstart = 0,
    Start = 1,
    Finish = 2,
    Error=3
  }
export type videoDownloadEntity={
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
    records?:Array<videoDownloadEntity>
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
    log?:string
}