import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import {VideoDownloadTaskdb} from "@/model/videoDownloadTaskdb"
export class VideoDownloadTaskModule {
    private dbpath: string
    private videoDownloadTaskdb:VideoDownloadTaskdb
    constructor() {
        const tokenService = new Token()
        const dbpath = tokenService.getValue(USERSDBPATH)
        if (!dbpath) {
            throw new Error("user path not exist")
        }
        this.dbpath = dbpath
        this.videoDownloadTaskdb=new VideoDownloadTaskdb(dbpath)
    }
}