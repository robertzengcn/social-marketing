'use strict';
export { };
import { windowInvoke, windowSend, windowReceive } from '@/views/utils/apirequest'
import { OPENDIRECTORY, VIDEODOWNLOAD_MESSAGE, VIDEODOWNLOAD, VIDEODOWNLOAD_TASK_LIST,VIDEODOWNLOAD_LIST,VIDEODOWNLOADTASK_RETRY,VIDEODOWNLOADITEM_RETRY,VIDEODOWNLOAD_ITEM_MESSAGE,VIDEODOWNLOADITEM_EXPLORER,VIDEODOWNLOADITEM_DELETE,VIDEODOWN_TASK_ERROR_LOG_QUERY,VIDEO_CAPTION_GENERATE,VIDEO_CAPTION_GENERATE_MESSAGE,
VIDEOTASKDOWNLOAD_RETRY_MESSAGE,VIDEODOWNLOAD_LOG_QUERY   
 } from "@/config/channellist";
import { downloadVideoparam, VideoDownloadTaskEntity,VideoDownloadQuery,VideoDownloadListDisplay,VideoCaptionGenerateParamWithIds } from "@/entityTypes/videoType"
import { CommonDialogMsg,ItemSearchparam,CommonIdrequestType } from "@/entityTypes/commonType";
import {SearchResult } from '@/views/api/types'




export async function opendialog(): Promise<any> {
    return await windowInvoke(OPENDIRECTORY);
}
export function receiveVideoDownloadMessage(cb: (data: CommonDialogMsg) => void) {
    windowReceive(VIDEODOWNLOAD_MESSAGE, cb)
}

export function downloadVideo(data: downloadVideoparam) {
    windowSend(VIDEODOWNLOAD, data)
}
//get video list
export async function getVideoTasklist(param: ItemSearchparam): Promise<SearchResult<VideoDownloadTaskEntity>> {
    const resp = await windowInvoke(VIDEODOWNLOAD_TASK_LIST, param);
    const resdata: SearchResult<VideoDownloadTaskEntity> = {
        data: resp.records,
        total: resp.num,
    }
    return resdata;
}
//get video list by task id
export async function getVideolistbyTaskId(param: VideoDownloadQuery): Promise<SearchResult<VideoDownloadListDisplay>> {
    const resp = await windowInvoke(VIDEODOWNLOAD_LIST, param);
    return {data: resp.records,total: resp.num};
}
export async function retryVideoTask(taskId: number) {
    windowSend(VIDEODOWNLOADTASK_RETRY, {taskId:taskId})
}
export async function retryVideoDownloadId(id:number){
    windowSend(VIDEODOWNLOADITEM_RETRY, {id:id})
}
export function receiveVideoItemDownloadMessage(cb: (data: CommonDialogMsg) => void) {
    windowReceive(VIDEODOWNLOAD_ITEM_MESSAGE, cb)
}

export function openFileexplor(id:number) {
    windowSend(VIDEODOWNLOADITEM_EXPLORER, {id:id})
}
export function deleteVideoDownItem(id:number){
    windowSend(VIDEODOWNLOADITEM_DELETE, {id:id})
}
export async function queryVideoTaskErrorlog(id:number):Promise<string>{
    const querydata:CommonIdrequestType<number>={id:id,type:"errorlog"}
   const res= await windowInvoke(VIDEODOWN_TASK_ERROR_LOG_QUERY, querydata)
   return res as string
}
export async function generateCaption(data:VideoCaptionGenerateParamWithIds<number>){
    
    windowSend(VIDEO_CAPTION_GENERATE, data)
}
export function receiveVideoCaptionGenerateMessage(cb: (data: CommonDialogMsg) => void) {
    windowReceive(VIDEO_CAPTION_GENERATE_MESSAGE, cb)
}
export function receiveVideoTaskDownloadRetryMessage(cb: (data: CommonDialogMsg) => void) {
    windowReceive(VIDEOTASKDOWNLOAD_RETRY_MESSAGE, cb)
}
// export async function queryVideodownloadlog(taskId:number){
//     windowSend(VIDEODOWN_TASK_ERROR_LOG_QUERY, {id:taskId})
// }
export async function queryVideoItemdownloadlog(id:number):Promise<string>{
    const querydata:CommonIdrequestType<number>={id:id,type:"errorlog"}
    console.log(querydata)
    const res= await windowInvoke(VIDEODOWNLOAD_LOG_QUERY, querydata)
    return res as string
}