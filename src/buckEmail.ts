"use strict";
export {};
import {ProcessMessage} from "@/entityTypes/processMessage-type"
import {Buckemailremotedata} from "@/entityTypes/emailmarketingType"
process.parentPort.on('message', async (e) => {
    const [port] = e.ports
    const pme=JSON.parse(e.data) as ProcessMessage<Buckemailremotedata>
    switch(pme.action){
        case "sendEmail": {

        }
    }
})