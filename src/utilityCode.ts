"use strict";
export {};
import {Usersearchdata} from "@/entityTypes/searchControlType"
import {UserSearch} from "@/modules/userSearch"
import { resolveCname } from "node:dns";
import {ProcessMessage} from "@/entityTypes/processMessage-type"
// import { argv } from 'node:process';
// import {SearchDataRun} from "@/entityTypes/scrapeType"

// async function runCommand(parameter) {
//     //const action=process.argv[2]
//     console.log(parameter)
//     const action=parameter[2]
//     console.log(action)
//     switch(action){
//         case "searchscraper":{
//             // const data=parameter[3]
//             // if(!parameter){
//             //     throw new Error("parameter is empty")
//             // }
//             // const userSearchdata:Usersearchdata=JSON.parse(data)

//             // console.log(userSearchdata)
//             // const userSearchdata:Usersearchdata={
//             //     searchEnginer: 1,
//             //     keywords: ['test'],
//             //     num_pages: 1,
//             //     concurrency: 1,
//             //     notShowBrowser: false
//             // }
//             // const userSer=new UserSearch()
//             // await userSer.searchData(userSearchdata)
            
            
//             break;
//         }
//     }
// }
//const input=process.argv
// runCommand(argv);
const userSer=new UserSearch()

process.parentPort.on('message', async (e) => {
    const [port] = e.ports
    console.log("get parent message")
    console.log(e)
    const pme=JSON.parse(e.data) as ProcessMessage
    switch(pme.action){
       
            // Surround the case block with braces
            case "searchscraper": {
                const userSearchdata=pme.data as Usersearchdata;
                if(!userSearchdata){
                    console.log("data is empty")
                    return
                }
                const res=await userSer.searchData(userSearchdata)
                    console.log(res)
                    const message:ProcessMessage={
                        action:"searchres",
                        data:res
                    }
                    console.log(port)
                    process.parentPort.postMessage(JSON.stringify(message))
                //});
                break;
            }

    }
  })
setInterval(() => {
    //do  nothing
}, 1 << 30);