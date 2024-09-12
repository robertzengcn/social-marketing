"use strict";
export {};
import {ProcessMessage} from "@/entityTypes/processMessage-type"
import {EmailSearch} from "@/childprocess/emailSearch"
//import {EmailSearchData} from "@/entityTypes/emailextraction-type"
import { EmailsControldata,EmailResult } from '@/entityTypes/emailextraction-type'

const emailSearchModel=new EmailSearch()

process.parentPort.on('message', async (e) => {
    // const [port] = e.ports
    // console.log("get parent message")
    // console.log(e)
    const pme=JSON.parse(e.data) as ProcessMessage<EmailsControldata>
    switch(pme.action){
        //check action
        case "searchEmail": {

            const userEmaildata=pme.data as EmailsControldata;

                if(!userEmaildata){
                    console.log("data is empty")
                    return
                }
              
           await emailSearchModel.searchEmail(userEmaildata,(res)=>{
                const message:ProcessMessage<EmailResult>={
                    action:"saveres",
                    data:res
                }
               
                process.parentPort.postMessage(JSON.stringify(message))
            })
        }
    }
})