import {VideoDescriptiondb} from "@/model/videoDescriptiondb";
//import { Token } from "@/modules/token"
//import { USERSDBPATH } from '@/config/usersetting';
import { VideoDescriptionEntity } from "@/entityTypes/videoType";
import { BaseModule } from "@/modules/baseModule";
//import { inherits } from "util";
export class VideoDescriptionModule extends BaseModule{
    //private dbpath: string
    private videoDownloaddb:VideoDescriptiondb
    constructor() {
        super()
        // const tokenService = new Token()
        // const dbpath = tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        //this.dbpath = dbpath
        this.videoDownloaddb=new VideoDescriptiondb(this.dbpath)
    }
    saveVideoDescription(videoinfo: VideoDescriptionEntity):number {
        return this.videoDownloaddb.saveVideoDescription(videoinfo)
    }

}