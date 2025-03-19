// import { Token } from "@/modules/token"
// import { USERSDBPATH } from '@/config/usersetting';
import { VideoDownloadTaskDetaildb} from "@/model/VideoDownloadTaskDetaildb"
import { VideoDownloadTaskDetailEntity} from "@/entityTypes/videoType"
// import { VideoDownloadTaskEntity } from "@/entityTypes/videoType"
// import {TaskStatus} from "@/entityTypes/commonType"
import { BaseModule } from "@/modules/baseModule";
export class VideoDownloadTaskDetailModule extends BaseModule {
    // private dbpath: string
    private videoDownloadTaskdb: VideoDownloadTaskDetaildb
    constructor() {
        super()
        // const tokenService = new Token()
        // const dbpath = tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        // this.dbpath = dbpath
        this.videoDownloadTaskdb = new VideoDownloadTaskDetaildb(this.dbpath)
    }

    create(vdte: VideoDownloadTaskDetailEntity): number {
        return this.videoDownloadTaskdb.create(vdte);
    }

    read(id: number): VideoDownloadTaskDetailEntity {
        return this.videoDownloadTaskdb.read(id);
    }

    update(id: number, vdte: VideoDownloadTaskDetailEntity): void {
        return this.videoDownloadTaskdb.update(id, vdte);
    }

    delete(id: number): void {
        return this.videoDownloadTaskdb.delete(id);
    }

    //query item id by task id
    public getByTaskId(taskId: number): VideoDownloadTaskDetailEntity {
        return this.videoDownloadTaskdb.getByTaskId(taskId);
    }

}