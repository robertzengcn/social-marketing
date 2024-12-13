'use strict';
export { };
import { windowInvoke, windowSend, windowReceive } from '@/views/utils/apirequest'
import { OPENDIRECTORY, VIDEODOWNLOAD_MESSAGE, VIDEODOWNLOAD, VIDEODOWNLOAD_TASK_LIST } from "@/config/channellist";
import { downloadVideoparam, videoDownloadTaskEntity } from "@/entityTypes/videoType"
import { CommonDialogMsg } from "@/entityTypes/commonType";
import {SearchResult } from '@/views/api/types'
import {ItemSearchparam} from "@/entityTypes/commonType"


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
        total: resp.total,
    }
    return resdata;
}
