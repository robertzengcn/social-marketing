import {BuckemailController} from "@/controller/buckemailController"
import {BUCKEMAILSEND} from "@/config/channellist";
import { ipcMain } from 'electron';
import {EmailMarketingsubdata} from '@/entityTypes/emailmarketingType'
/**
 * buck send email ipc
 */
export function registerBuckEmailIpcHandlers() {
    const buckemailCon=new BuckemailController()
    ipcMain.on(BUCKEMAILSEND, async (event, data) => {
        const qdata = JSON.parse(data) as EmailMarketingsubdata;  
        switch(qdata.sourceType){
            
        }
    })
}