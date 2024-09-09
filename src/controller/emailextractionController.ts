import { EmailsControldata } from '@/entityTypes/emailextraction-type'
import {EmailSearchTaskModule} from "@/modules/emailSearchTaskModule"
import { utilityProcess, MessageChannelMain} from "electron";
import { Token } from "@/modules/token"
import * as path from 'path';
import * as fs from 'fs';
import {USERLOGPATH,USEREMAIL} from '@/config/usersetting';
import {WriteLog,getApplogspath,getRandomValues} from "@/modules/lib/function"
import { v4 as uuidv4 } from 'uuid';
import {EmailsearchTaskStatus} from '@/model/emailsearchTaskdb'
export class EmailextractionController {
       private emailSeachTaskModule:EmailSearchTaskModule
    constructor() {
       this.emailSeachTaskModule=new EmailSearchTaskModule()

    }
    public async searchEmail(data: EmailsControldata) {
        //save search email task
        const taskId=await this.emailSeachTaskModule.saveSearchtask(data.validUrls)
        const childPath = path.join(__dirname, 'emailSearchCode.ts')
        if (!fs.existsSync(childPath)) {
            throw new Error("child js path not exist for the path " + childPath);
        }

        const { port1, port2 } = new MessageChannelMain()
        const tokenService=new Token()
        
        const child = utilityProcess.fork(path.join(__dirname, 'utilityCode.js'), [],{stdio:"pipe",execArgv:["puppeteer-cluster:*"]} )
        // console.log(path.join(__dirname, 'utilityCode.js'))
        let logpath=tokenService.getValue(USERLOGPATH)
        if(!logpath){
            const useremail=tokenService.getValue(USEREMAIL)
            //create log path
            logpath=getApplogspath(useremail)
        }
        // console.log(logpath)
        const uuid=uuidv4({random: getRandomValues(new Uint8Array(16))})
        const errorLogfile=path.join(logpath,'emailsearch_'+taskId.toString()+'_'+uuid+'.error.log')
        const runLogfile=path.join(logpath,'emailsearch_'+taskId.toString()+'_'+uuid+'.runtime.log')

        child.on("spawn", () => {
            console.log("child process satart, pid is"+child.pid)
            child.postMessage(JSON.stringify({action:"searchscraper",data:data}),[port1])
            this.emailSeachTaskModule.updateTaskLog(taskId,runLogfile,errorLogfile)
        })
        
        child.stdout?.on('data', (data) => {
            console.log(`Received data chunk ${data}`)
            WriteLog(runLogfile,data)
           // child.kill()
        })
        child.stderr?.on('data', (data) => {
            const ingoreStr=["Debugger attached","Waiting for the debugger to disconnect","Most NODE_OPTIONs are not supported in packaged apps"]
            if(!ingoreStr.some((value)=>data.includes(value))){
                    
            // seModel.saveTaskerrorlog(taskId,data)
            console.log(`Received error chunk ${data}`)
            WriteLog(errorLogfile,data)
            this.emailSeachTaskModule.updateTaskStatus(taskId,EmailsearchTaskStatus.Error)
            //child.kill()
            }
            
        })
        child.on("exit", (code) => {
            if (code !== 0) {
                console.error(`Child process exited with code ${code}`);
                
            } else {
                console.log('Child process exited successfully');
            }
        })
        child.on('message', (message) => {
            console.log("get message from child")
            console.log('Message from child:', JSON.parse(message));
            const childdata=JSON.parse(message)
            if(childdata.action=="saveres"){
                //save result
                this.emailSeachTaskModule.saveSearchResult(taskId,childdata.data)
                this.emailSeachTaskModule.updateTaskStatus(taskId,EmailsearchTaskStatus.Complete)
                child.kill()
            }
        });
    }
}