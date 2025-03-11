import {Proxy} from "@/entityTypes/proxyType"
import {TaskStatus,ItemSearchparam,CommonIdrequestIds} from "@/entityTypes/commonType"
// import {LanguageEnum} from "@/config/generate"
import {LanguageItem} from "@/entityTypes/commonType"
import { VideoDescriptionEntity } from "@/entity/VideoDescription.entity"
import {VideoDownloadTagEntity} from "@/entity/VideoDownloadTag.entity"
export type videoScraper={
    cookies: string,
    proxy?:Proxy
}
export type downloadVideoparam={
    taskName:string,
    accountId:Array<number>,
    platform:string,
    link:Array<string>,
    savePath:string,
    isplaylist:boolean,
    proxy: Array<number>,
    ProxyOverride:boolean,
    cookies_type:string,
    browserName?:string,
    videoQuality?:number,
    videoLanguage:LanguageItem,
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
export type VideoDownloadTaskEntity={
    id?:number,
    platform:string,
    taskName:string,
    // url:string,
    savepath:string,
    runtime_log?:string,
    error_log?:string,
    record_time?:string,
    status?:TaskStatus,
    // record_time:string,
}
export enum VideoCaptionStatus{
    No = 0,
    Start = 1,
    Finish = 2,
    Error=3
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
    caption_status?:VideoCaptionStatus,
    language_code:string,
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
    BrowserName?:string,
    videoQuality?:number,
    successlink?:Array<string>,
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
// export type VideoDescriptionEntity={
//     id?:number,
//     videoId:number,
//     title:string,  
//     description:string,
//     language:string,
//     // tags:Array<string>,
//     // categories:Array<string>,
// }
export type VideodownloadTaskMsg={
    msg:string,
}
export interface VideoDownloadQuery extends ItemSearchparam {
    taskId: number,
}

export interface VideoDownloadListDisplay extends VideoDownloadEntity {
    title?:string
    description?:string
   
}
//the param need for video download
export type DownloadVideoControlparam={
    taskName:string,
    accountId:Array<number>,
    platform:string,
    link:Array<string>,
    savePath:string,
    isplaylist:boolean,
    proxy: Array<number>,
    ProxyOverride:boolean,
    cookies_type:string,
    browserName?:string,
    videoQuality?:number,
    language_code:string,
}
export enum DownloadType {
    SINGLEVIDEO = 1,
    MULTIVIDEO = 2,
}
export enum CookiesType {
    USEBROWSER = 1,
    ACCOUNTCOOKIES=2
}
export interface VideoDownloadTaskDetailEntity {
    id?: number;
    task_id: number;
    download_type:DownloadType;
    cookies_type:CookiesType;
    browser_type:string;
    proxy_override:boolean;
    video_quality:number;
    language_code:string
}
export interface VideoDownloadTaskAccountEntity {
    id?: number;
    task_id: number;
    account_id: number;
}
export interface VideoDownloadTaskUrlEntity {
    id?: number;
    task_id: number;
    url: string;
}
export interface VideoDownloadTaskProxyEntity {
    id?: number;
    task_id: number;
    proxy_id: number;
}
export interface VideoCaptionGenerateParam{
    videos:Array<VideoCaptionItem>,
    toolName?:string,

}
export interface VideoCaptionItem{
    videoPath:string,
    savePath:string,
    isEnglish:boolean,
    videoId?:number,
}
export type extraFileEntity={
file: string, 
savePath: string,
execPath?:string,
model?:string,
errorCall?: (errorMsg: string) => void, stroutCall?:(message: string) => void,
successCall?: (outputfile:string) => void
}
export type VideoCaptionMsg={
    status:boolean,
    msg:string,
    file:string,
    savepath?:string,
    videoId?:number,
}
export type VideoCaptionEntity={
    id?:number,
    videoId:number,
    language_id:number,
    caption_path:string,
    record_time?:string,
}
export interface VideoCaptionDisplay extends VideoCaptionEntity{
    language?:LanguageItem
}
export interface VideoCaptionGenerateParamWithIds<Type> extends CommonIdrequestIds<Type>{
isEnglish:boolean
savePath:string
}
export type VideoCompotionEntity={
    detail:VideoDownloadEntity,
    description:VideoDescriptionEntity|null,
    caption:Array<VideoCaptionDisplay>|null
    translateInfo?:Array<VideoTranslateInfo>|null
}

export interface VideoInformationTransParam<Type> extends CommonIdrequestIds<Type>{
    // source_language:LanguageItem
    target_language:LanguageItem
    translate_tool:string
}
export interface VideoTranslateItem{
    videoId:number,
    title:string,
    description:string,
    tags?:Array<VideoDownloadTagEntity>,
    target_language:LanguageItem

}
export type VideoTranslateInfo={
    language:string,
    title:string,
    description:string,
}