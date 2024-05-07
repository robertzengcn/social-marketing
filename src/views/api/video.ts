'use strict';
export {};
import {windowInvoke,windowSend,windowReceive} from '@/views/utils/apirequest'
import {OPENDIRECTORY} from "@/config/channellist";

export async function opendialog():Promise<any>{
    return await windowInvoke(OPENDIRECTORY);
}
