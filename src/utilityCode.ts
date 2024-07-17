"use strict";
export {};
import {Usersearchdata} from "@/entityTypes/searchControlType"
import {UserSearch} from "@/modules/userSearch"


async function runCommand(parameter) {
    //const action=process.argv[2]
    const action=parameter[2]
    switch(action){
        case "searchscraper":{
            const data=parameter[3]
            if(!parameter){
                throw new Error("parameter is empty")
            }
            const userSearchdata:Usersearchdata=JSON.parse(parameter)
            console.log(userSearchdata)
            const userSer=new UserSearch()
            await userSer.searchData(userSearchdata)
            
            break;
        }
    }
}
runCommand(process.argv);