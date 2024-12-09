"use strict";
export {};
import {ProcessMessage} from "@/entityTypes/processMessage-type"
import {EmailSearch} from "@/childprocess/emailSearch"
//import {EmailSearchData} from "@/entityTypes/emailextraction-type"
import { EmailsControldata,EmailResult } from '@/entityTypes/emailextraction-type'
import {processVideoDownloadParam } from "@/entityTypes/videoType";


process.parentPort.on('message', async (e) => {
    // const [port] = e.ports
    // console.log("get parent message")
    // console.log(e)
    const pme=JSON.parse(e.data) as ProcessMessage<any>
    switch(pme.action){
        //check action
        case "searchEmail": {
            
            const userEmaildata=pme.data as EmailsControldata;

                if(!userEmaildata){
                    console.error("data is empty")
                    return
                }
           const emailSearchModel=new EmailSearch()   
           await emailSearchModel.searchEmail(userEmaildata,(res)=>{
                const message:ProcessMessage<EmailResult>={
                    action:"saveres",
                    data:res
                }
               
                process.parentPort.postMessage(JSON.stringify(message))
            })
            break;
        }
        case 'downloadVideo':{
            // const pme=JSON.parse(e.data) as ProcessMessage<processVideoDownloadParam> 
            const param=pme.data as processVideoDownloadParam
            if(!param.platform){
                console.error("platform is empty")
                return
            }
            switch(param.platform){
                case 'youtube':{
                    
                }
            }

        }
    }
})