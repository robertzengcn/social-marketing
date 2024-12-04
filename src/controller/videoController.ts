import { videoFactory } from "@/modules/video/videoFactory";
import { downloadVideoparam,videoDownloadTaskEntity,videoDownloadEntity,videoDownloadList,videoIdLink,videoDownloadParam } from "@/entityTypes/videoType";
import { VideoDownloadTaskdb } from "@/model/videoDownloadTaskdb";
import {VideoDownloaddb,DownloadStatus} from "@/model/videoDownloaddb"
import { Token } from "@/modules/token"
import {USERSDBPATH} from '@/config/usersetting';
import * as path from 'path';
import * as fs from 'fs';
import { utilityProcess, MessageChannelMain} from "electron";
import {USERLOGPATH,USEREMAIL} from '@/config/usersetting';
import {WriteLog,getApplogspath,getRandomValues} from "@/modules/lib/function"
import { v4 as uuidv4 } from 'uuid';
export class videoController {
    private videoTaskdb:VideoDownloadTaskdb 
    private videoDownloaddb:VideoDownloaddb
    constructor() {
        const tokenService=new Token()
        const dbpath=tokenService.getValue(USERSDBPATH)
        if(!dbpath){
            throw new Error("user db path not exist")
        }
        this.videoTaskdb=new VideoDownloadTaskdb(dbpath)
        this.videoDownloaddb=new VideoDownloaddb(dbpath)
    }
    public async downloadVideo(param:downloadVideoparam){
        const videoFactoryInstance=new videoFactory()
        //get random one from array of param.accountId
        // const randomItem = param.accountId[Math.floor(Math.random() * param.accountId.length)]
        const videoTool=await videoFactoryInstance.getVideotool(param.platform)
        console.log("video tool:"+videoTool)
        if(!videoTool){
            
            throw new Error("video tool not found")
        }
        videoTool.checkRequirement()
        
        //save log to download task table
        // const videoTaskdb=new VideoDownloadTaskdb(dbpath)
        const videoEntity:videoDownloadTaskEntity={
            platform:param.platform,
            url:JSON.stringify(param.link),
            savepath:param.savePath
        }
        const taskId=this.videoTaskdb.saveVideoDownloadTask(videoEntity)
        // console.log("task id:"+taskId)
        // const res=videoTool.checkRequirement()
        

        // const videoDownloaddb=new VideoDownloaddb(dbpath)
        // if(res){
        // let idlinks:videoIdLink[]=[]
        // for (const link of param.link) {
        //     const vdentity:videoDownloadEntity={ 
        //         url:link,
        //         savepath:param.savePath,
        //         task_id:Number(taskId),
        //         status:DownloadStatus.Start
        //     }
        //     const downId=this.videoDownloaddb.saveVideoDownload(vdentity)
        //     const idlinkitem:videoIdLink={
        //         id:Number(downId),
        //         link:link
        //     }
        //     idlinks.push(idlinkitem)
        // }

        const childPath = path.join(__dirname, 'taskCode.js')
        if (!fs.existsSync(childPath)) {
            throw new Error("child js path not exist for the path " + childPath);
        }
        const { port1, port2 } = new MessageChannelMain()
        const tokenService=new Token()
        
        const child = utilityProcess.fork(childPath, [],{stdio:"pipe"} )
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

        const paramData:videoDownloadParam={
            platform:param.platform,
            link:param.link
        }
        
        child.on("spawn", () => {
            console.log("child process satart, pid is"+child.pid)
            child.postMessage(JSON.stringify({action:"searchEmail",data:paramData}),[port1])
           
        })
        
        child.stdout?.on('data', (data) => {
            console.log(`Received data chunk ${data}`)
            WriteLog(runLogfile,data)
           // child.kill()
        })
            // videoTool.download(link,param.savePath,"",function(msg){
            //     console.log(msg)
            //     this.videoDownloaddb.saveVideoDownloadLog(msg,Number(downId))
            //     this.videoDownloaddb.updateVideoDownloadStatus(DownloadStatus.Error,Number(downId))
            // },function(msg){
            //     console.log("std out:"+msg)       
            // },function(msg){
            //     console.log("std err:"+msg)       
            // },function(){
            //     //update status to finish
            //     console.log("done") 
            //     this.videoDownloaddb.updateVideoDownloadStatus(DownloadStatus.Finish,Number(downId))
            // })
        
        // }else{
        //     throw new Error("requirement not met")
        // }

    }
    //get video download list
    public async videoDownloadlist(page:number,size:number):Promise<videoDownloadList>{
        // const tokenService=new Token()
        // const dbpath=await tokenService.getValue(USERSDBPATH)
        // if(!dbpath){
        //     throw new Error("user db path not exist")
        // }
        // const videoDownloaddb=new VideoDownloaddb(dbpath)
       const list=this.videoDownloaddb.getVideoDownloadList(page,size)
       const count=this.videoDownloaddb.countVideoDownloadList()
       return { records:list,total:count} as videoDownloadList
    }

}