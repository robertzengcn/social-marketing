import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import { VideoDownloadTaskdb } from "@/model/videoDownloadTaskdb"
import { videoDownloadTaskEntity } from "@/entityTypes/videoType"
import {TaskStatus} from "@/entityTypes/commonType"
export class VideoDownloadTaskModule {
    private dbpath: string
    private videoDownloadTaskdb: VideoDownloadTaskdb
    constructor() {
        const tokenService = new Token()
        const dbpath = tokenService.getValue(USERSDBPATH)
        if (!dbpath) {
            throw new Error("user path not exist")
        }
        this.dbpath = dbpath
        this.videoDownloadTaskdb = new VideoDownloadTaskdb(dbpath)
    }

    public saveVideoDownloadTask(videoDownloadTask: videoDownloadTaskEntity) {
        return this.videoDownloadTaskdb.saveVideoDownloadTask(videoDownloadTask)
    }

    public updateTasklog(taskId: number, log: string) {
        return this.videoDownloadTaskdb.updateTasklog(taskId, log)
    }
    //update error log
    public updateTaskErrorlog(taskId: number, log: string) {
        return this.videoDownloadTaskdb.updateTaskErrorlog(taskId, log);
    }

    public getVideoDownloadTaskList(page:number,size:number):Array<videoDownloadTaskEntity>{
       return this.videoDownloadTaskdb.getVideoDownloadTaskList(page,size)
      }
      //count video download task list
      public countVideoDownloadTaskList():number{
        return this.videoDownloadTaskdb.countVideoDownloadTaskList()
      }
      //update video download task status
      public updateVideoDownloadTaskStatus(taskId: number,status:TaskStatus):boolean{
        return this.videoDownloadTaskdb.updateVideoDownloadTaskStatus(taskId,status);
      }
}