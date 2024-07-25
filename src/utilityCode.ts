"use strict";
export {};
import {Usersearchdata} from "@/entityTypes/searchControlType"
import {UserSearch} from "@/modules/userSearch"
import { argv } from 'node:process';

async function runCommand(parameter) {
    //const action=process.argv[2]
    console.log(parameter)
    const action=parameter[2]
    console.log(action)
    switch(action){
        case "searchscraper":{
            const data=parameter[3]
            if(!parameter){
                throw new Error("parameter is empty")
            }
            const userSearchdata:Usersearchdata=JSON.parse(data)
            console.log(userSearchdata)
            const userSer=new UserSearch()
            await userSer.searchData(userSearchdata)
            
            break;
        }
    }
}
//const input=process.argv
runCommand(argv);