"use strict";
export {};
import {ProcessMessage} from "@/entityTypes/processMessage-type"
import {Buckemailremotedata} from "@/entityTypes/emailmarketingType"
import {EmailSend} from "@/childprocess/emailSend"
process.parentPort.on('message', async (e) => {
    const [port] = e.ports
    const pme=JSON.parse(e.data) as ProcessMessage<Buckemailremotedata>
    switch(pme.action){
        case "sendEmail": {
            const emailsendModel=new EmailSend()
            if(!pme.data){
                console.error("data is null")
                return 
            }
            await emailsendModel.send(pme.data).then((res)=>{
                const message:ProcessMessage<null>={
                    action:"sendEmail",
                   
                }
                port.postMessage(JSON.stringify(message))
            })

        }
    }
})