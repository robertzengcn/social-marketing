// import { Token } from "@/modules/token"
// import { USERSDBPATH } from '@/config/usersetting';
import { VideoDownloadTaskModel } from "@/model/VideoDownloadTask.model"
// import { VideoDownloadTaskEntity } from "@/entityTypes/videoType"
import {TaskStatus} from "@/entityTypes/commonType"
import { BaseModule } from "@/modules/baseModule";
import { VideoDownloadTaskEntity } from "@/entity/VideoDownloadTask.entity"
export class VideoDownloadTaskModule extends BaseModule{
    // private dbpath: string
    private videoDownloadTaskdb: VideoDownloadTaskModel
    constructor() {
        super()
        // const tokenService = new Token()
        // const dbpath = tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        // this.dbpath = dbpath
        this.videoDownloadTaskdb = new VideoDownloadTaskModel(this.dbpath)
    }

    public async saveVideoDownloadTask(videoDownloadTask: VideoDownloadTaskEntity) {
        return await this.videoDownloadTaskdb.saveVideoDownloadTask(videoDownloadTask)
    }

    public async updateTasklog(taskId: number, log: string) {
        return await this.videoDownloadTaskdb.updateTasklog(taskId, log)
    }
    //update error log
    public async updateTaskErrorlog(taskId: number, log: string) {
        return await this.videoDownloadTaskdb.updateTaskErrorlog(taskId, log);
    }

    public async getVideoDownloadTaskList(page:number,size:number):Promise<Array<VideoDownloadTaskEntity>>{
       return await this.videoDownloadTaskdb.getVideoDownloadTaskList(page,size)
      }
      //count video download task list
      public async countVideoDownloadTaskList():Promise<number>{
        return await this.videoDownloadTaskdb.countVideoDownloadTaskList()
      }
      //update video download task status
      public async updateVideoDownloadTaskStatus(taskId: number,status:TaskStatus):Promise<boolean>{
        return await this.videoDownloadTaskdb.updateVideoDownloadTaskStatus(taskId,status);
      }
      //get video download task info by id
      public async getVideoDownloadTask(taskId:number):Promise<VideoDownloadTaskEntity|null>{
        return await this.videoDownloadTaskdb.getVideoDownloadTask(taskId)
      }
}