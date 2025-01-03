'use strict';
export { };
import { windowInvoke, windowSend, windowReceive } from '@/views/utils/apirequest'
import { OPENDIRECTORY, VIDEODOWNLOAD_MESSAGE, VIDEODOWNLOAD, VIDEODOWNLOAD_TASK_LIST,VIDEODOWNLOAD_LIST } from "@/config/channellist";
import { downloadVideoparam, videoDownloadTaskEntity,VideoDownloadQuery } from "@/entityTypes/videoType"
import { CommonDialogMsg,ItemSearchparam } from "@/entityTypes/commonType";
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
export async function getVideoTasklist(param: ItemSearchparam): Promise<SearchResult<videoDownloadTaskEntity>> {
    const resp = await windowInvoke(VIDEODOWNLOAD_TASK_LIST, param);
    const resdata: SearchResult<videoDownloadTaskEntity> = {
        data: resp.records,
        total: resp.num,
    }
    return resdata;
}
//get video list by task id
export async function getVideoTasklistbyTaskId(param: VideoDownloadQuery): Promise<videoDownloadTaskEntity[]> {
    const resp = await windowInvoke(VIDEODOWNLOAD_LIST, param);
    return resp
}
