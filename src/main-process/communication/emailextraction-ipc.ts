import { ipcMain } from 'electron';
import {EMAILEXTRACTIONAPI} from "@/config/channellist";
import {EmailscFormdata} from '@/entityTypes/emailextraction-type'

export function registerEmailextractionIpcHandlers() {
    ipcMain.on(EMAILEXTRACTIONAPI, async (event, arg) => {
        //receive user submit form
        const qdata = JSON.parse(arg) as EmailscFormdata;
        if (!Object.prototype.hasOwnProperty.call(qdata, "extratype")) {
            qdata.extratype = "ManualInputUrl";
        }
        const validUrls:string[]=[]
        if(qdata.extratype==="ManualInputUrl"){
            
        }


    });

}