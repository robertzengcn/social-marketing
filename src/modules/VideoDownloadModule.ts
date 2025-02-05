// import { Token } from "@/modules/token"
// import { USERSDBPATH } from '@/config/usersetting';
import {VideoDownloaddb} from "@/model/videoDownloaddb"
import {VideoDownloadEntity,VideoDownloadStatus,VideoCaptionStatus} from "@/entityTypes/videoType"
import { BaseModule } from "@/modules/baseModule";
import { WriteLog,getLogPath } from "@/modules/lib/function";
import * as fs from 'fs';
import { readLogFile } from "@/modules/lib/function"

export class VideoDownloadModule extends BaseModule{
    // private dbpath: string
    private videoDownloaddb:VideoDownloaddb
    constructor() {
      super()
        // const tokenService = new Token()
        // const dbpath = tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        // this.dbpath = dbpath
        this.videoDownloaddb=new VideoDownloaddb(this.dbpath)
    }

      public saveVideoDownload(videoDownload:VideoDownloadEntity):number{
        return this.videoDownloaddb.saveVideoDownload(videoDownload)
      } 
      public updateVideoDownload(videoId:number,videoDownload:Omit<VideoDownloadEntity,"error_log">):number{
        return this.videoDownloaddb.updateVideoDownloadItem(videoId,videoDownload)
      } 
      //save log for video download
      public saveVideoDownloadLog(log:string,downloadId:number){
        //get error log file path
        const res=this.videoDownloaddb.getVideoDownloaditem(downloadId)
        if(!res){
          throw new Error("video download item not exist")
        }
        if(res.error_log){
        //save log file
        WriteLog(res.error_log,log)
        }else{
          //generate log file path
          const logpath=getLogPath('videodownload',downloadId.toString())
          WriteLog(logpath,log)
          this.videoDownloaddb.updateVideoErrorLogPath(downloadId,logpath)

        }
       //return this.videoDownloaddb.saveVideoDownloadLog(log,downloadId)
      } 

      //update download status
      public updateVideoDownloadStatus(status:VideoDownloadStatus,downloadId:number):number{
       return this.videoDownloaddb.updateVideoDownloadStatus(status,downloadId)
      }
      //get video download list
      public getVideoDownloadList(taskId:number,page:number,size:number,status?:VideoDownloadStatus):Array<VideoDownloadEntity>{
        return this.videoDownloaddb.getVideoDownloadList(taskId,page,size,status)
      }
      //count video download list
      public countVideoDownloadList(taskId:number,status?:VideoDownloadStatus):number{
        return this.videoDownloaddb.countVideoDownloadList(taskId,status)
      }
      //get all video download info list by task id
      public getAllvideoDownloadlist(taskId:number,status?:VideoDownloadStatus):Array<VideoDownloadEntity>{
        //count video number by task id
        const count=this.countVideoDownloadList(taskId)
        const res:Array<VideoDownloadEntity>=[]
        for(let i=0;i<count;i=i+100){
          const list=this.getVideoDownloadList(taskId,i,100,status)
          res.push(...list)
        }
        return res
      }
      //get video download item info by id
      public getVideoDownloaditem(id:number):VideoDownloadEntity{
        return this.videoDownloaddb.getVideoDownloaditem(id)
      }
      public deleteVideoDownloadItem(id:number):number{
        return this.videoDownloaddb.deleteVideoDownloadItem(id)
      }
      updateVideoCaptionStatus(id: number,status: VideoCaptionStatus ): number {
        return this.videoDownloaddb.updateVideoCaptionStatus( id,status);
    }
    //get video item log
    public async getVideoErrorLog(id:number): Promise<string> {
        const videodownEntity=this.getVideoDownloaditem(id)
        if(!videodownEntity){
          throw new Error("video download item not exist")
        }
        let content=""
        if(!videodownEntity.error_log){
          return content
        }
        if (fs.existsSync(videodownEntity.error_log)) {
                       content = await readLogFile(videodownEntity.error_log)
        } else {
            throw new Error("video error file log not found")
        }
        return content
    }
    


    
}