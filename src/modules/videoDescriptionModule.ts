import {VideoDescriptiondb} from "@/model/videoDescriptiondb";
import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import { VideoDescriptionEntity } from "@/entityTypes/videoType";

export class VideoDescriptionModule {
    private dbpath: string
    private videoDownloaddb:VideoDescriptiondb
    constructor() {
        const tokenService = new Token()
        const dbpath = tokenService.getValue(USERSDBPATH)
        if (!dbpath) {
            throw new Error("user path not exist")
        }
        this.dbpath = dbpath
        this.videoDownloaddb=new VideoDescriptiondb(dbpath)
    }
    saveVideoDescription(videoinfo: VideoDescriptionEntity):number {
        return this.videoDownloaddb.saveVideoDescription(videoinfo)
    }

}