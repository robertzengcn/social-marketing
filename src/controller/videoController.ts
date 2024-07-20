import { videoFactory } from "@/modules/videoFactory";
import { downloadVideoparam,videoDownloadTaskEntity,videoDownloadEntity,videoDownloadList } from "@/entityTypes/videoType";
import { VideoDownloadTaskdb } from "@/model/videoDownloadTaskdb";
import {VideoDownloaddb,DownloadStatus} from "@/model/videoDownloaddb"
import { Token } from "@/modules/token"
import {USERSDBPATH} from '@/config/usersetting';

export class videoController {
    
    public async downloadVideo(param:downloadVideoparam){
        const videoFactoryInstance=new videoFactory()
        //get random one from array of param.accountId
        const randomItem = param.accountId[Math.floor(Math.random() * param.accountId.length)]
        const videoTool=await videoFactoryInstance.getVideotool(param.platform,randomItem)
        console.log("video tool:"+videoTool)
        if(!videoTool){
            
            throw new Error("video tool not found")
        }
        const tokenService=new Token()
        const dbpath=await tokenService.getValue(USERSDBPATH)
        if(!dbpath){
            throw new Error("user db path not exist")
        }
        //save log to download task table
        const videoTaskdb=new VideoDownloadTaskdb(dbpath)
        const videoEntity:videoDownloadTaskEntity={
            platform:param.platform,
            url:JSON.stringify(param.link),
            savepath:param.savePath
        }
        const taskId=videoTaskdb.saveVideoDownloadTask(videoEntity)
        console.log("task id:"+taskId)
        const res=videoTool.checkRequirement()
        

        const videoDownloaddb=new VideoDownloaddb(dbpath)
        if(res){
        for (const link of param.link) {
            const vdentity:videoDownloadEntity={ 
                url:link,
                savepath:param.savePath,
                task_id:Number(taskId),
                status:DownloadStatus.Start
            }
            const downId=videoDownloaddb.saveVideoDownload(vdentity)
            videoTool.download(link,param.savePath,function(msg){
                console.log(msg)
                videoDownloaddb.saveVideoDownloadLog(msg,Number(downId))
                videoDownloaddb.updateVideoDownloadStatus(DownloadStatus.Error,Number(downId))
            },function(msg){
                console.log("std out:"+msg)       
            },function(msg){
                console.log("std err:"+msg)       
            },function(){
                //update status to finish
                console.log("done") 
                videoDownloaddb.updateVideoDownloadStatus(DownloadStatus.Finish,Number(downId))
            })
        }
        }else{
            throw new Error("requirement not met")
        }

    }
    //get video download list
    public async videoDownloadlist(page:number,size:number):Promise<videoDownloadList>{
        const tokenService=new Token()
        const dbpath=await tokenService.getValue(USERSDBPATH)
        if(!dbpath){
            throw new Error("user db path not exist")
        }
        const videoDownloaddb=new VideoDownloaddb(dbpath)
       const list=videoDownloaddb.getVideoDownloadList(page,size)
       const count=videoDownloaddb.countVideoDownloadList()
       return { records:list,total:count} as videoDownloadList
    }

}