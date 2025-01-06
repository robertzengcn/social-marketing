import { VideoDownloadTaskUrldb } from "@/model/VideoDownloadTaskUrldb";
import { BaseModule } from "@/modules/baseModule";
import { VideoDownloadTaskUrlEntity } from "@/entityTypes/videoType"
export class VideoDownloadTaskModule extends BaseModule {
    private videoDownloadTaskUrldb: VideoDownloadTaskUrldb
    constructor() {
        super()
        this.videoDownloadTaskUrldb = new VideoDownloadTaskUrldb(this.dbpath)
    }
    create(vdte: VideoDownloadTaskUrlEntity): number {

        return this.videoDownloadTaskUrldb.create(vdte);
    }

    read(id: number): VideoDownloadTaskUrlEntity {
        return this.videoDownloadTaskUrldb.read(id);
    }

    update(id: number, vdte: VideoDownloadTaskUrlEntity): void {
        this.videoDownloadTaskUrldb.update(id, vdte);
    }

    delete(id: number): void {
        this.videoDownloadTaskUrldb.delete(id);
    }

    //query items id by task id
    public getItemsByTaskId(taskId: number): Array<VideoDownloadTaskUrlEntity> {
        return this.videoDownloadTaskUrldb.getItemsByTaskId(taskId);
    }
}