'use strict';
export { };
import { windowInvoke, windowSend, windowReceive } from '@/views/utils/apirequest'
import { OPENDIRECTORY, VIDEODOWNLOAD_MESSAGE, VIDEODOWNLOAD, VIDEODOWNLOAD_LIST } from "@/config/channellist";
import { downloadVideoparam, videoDownloadEntity } from "@/entityTypes/videoType"
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
export async function getVideolist(param: ItemSearchparam): Promise<SearchResult<videoDownloadEntity>> {
    const resp = await windowInvoke(VIDEODOWNLOAD_LIST, param);
    const resdata: SearchResult<videoDownloadEntity> = {
        data: resp.records,
        total: resp.total,
    }
    return resdata;
}
