import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import {VideoDownloaddb} from "@/model/videoDownloaddb"
import {VideoDownloadEntity} from "@/entityTypes/videoType"

export class VideoDownloadModule {
    private dbpath: string
    private videoDownloaddb:VideoDownloaddb
    constructor() {
        const tokenService = new Token()
        const dbpath = tokenService.getValue(USERSDBPATH)
        if (!dbpath) {
            throw new Error("user path not exist")
        }
        this.dbpath = dbpath
        this.videoDownloaddb=new VideoDownloaddb(dbpath)
    }

    public saveVideoDownload(videoDownload:VideoDownloadEntity):number{
        return this.videoDownloaddb.saveVideoDownload(videoDownload)
      } 
      //save log for video download
      public saveVideoDownloadLog(log:string,downloadId:number):number{
       return this.videoDownloaddb.saveVideoDownloadLog(log,downloadId)
      } 

      //update download status
      public updateVideoDownloadStatus(status:number,downloadId:number):number{
       return this.videoDownloaddb.updateVideoDownloadStatus(status,downloadId)
      }
      //get video download list
      public getVideoDownloadList(taskId:number,page:number,size:number):Array<VideoDownloadEntity>{
        return this.videoDownloaddb.getVideoDownloadList(taskId,page,size)
      }
      //count video download list
      public countVideoDownloadList(taskId:number):number{
        return this.videoDownloaddb.countVideoDownloadList(taskId)
      }

    
}