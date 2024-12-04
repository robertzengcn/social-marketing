import {Proxy} from "@/entityTypes/proxyType"
export type videoScraper={
    cookies: string,
    proxy?:Proxy
}
export type downloadVideoparam={
    accountId:Array<number>,
    platform:string,
    link:Array<string>,
    savePath:string
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
    url:string,
    savepath:string,
    // record_time:string,
}
export type videoDownloadEntity={
    id?:number,
    url:string,
    savepath:string,
    record_time?:string,
    task_id:number,
    strout?:string,
    error_log?:string,
    status:number,
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
export type videoDownloadParam={
    platform:string,
    link:Array<string>,
    cookies?:Array<string>
}