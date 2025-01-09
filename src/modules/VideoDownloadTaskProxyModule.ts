import { VideoDownloadTaskProxydb } from "@/model/VideoDownloadTaskProxydb";
import { BaseModule } from "@/modules/baseModule";
// import { VideoDownloadTaskUrlEntity } from "@/entityTypes/videoType"
import {VideoDownloadTaskProxyEntity} from "@/entityTypes/videoType"
export class VideoDownloadTaskProxyModule extends BaseModule {
    private videoDownloadTaskProxydb: VideoDownloadTaskProxydb
    constructor() {
        super()
        this.videoDownloadTaskProxydb = new VideoDownloadTaskProxydb(this.dbpath)
    }
    create(vdte: VideoDownloadTaskProxyEntity): number {

        return this.videoDownloadTaskProxydb.create(vdte);
    }

    read(id: number): VideoDownloadTaskProxyEntity {
        return this.videoDownloadTaskProxydb.read(id);
    }

    update(id: number, vdte: VideoDownloadTaskProxyEntity): void {
        this.videoDownloadTaskProxydb.update(id, vdte);
    }

    delete(id: number): void {
        this.videoDownloadTaskProxydb.delete(id);
    }

    //query items id by task id
    public getItemsByTaskId(taskId: number): Array<VideoDownloadTaskProxyEntity> {
        return this.videoDownloadTaskProxydb.getItemsByTaskId(taskId);
    }
}