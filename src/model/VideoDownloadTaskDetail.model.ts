import { BaseDb } from "@/model/Basedb";
import { Repository } from "typeorm"
import {VideoDownloadTaskDetailEntity} from "@/entity/VideoDownloadTaskDetail.entity"
export class VideoDownloadTaskDetailModel extends BaseDb {
    private repository: Repository<VideoDownloadTaskDetailEntity>
    constructor(filepath: string) {
        super(filepath)
      
        this.repository = this.sqliteDb.connection.getRepository(VideoDownloadTaskDetailEntity)
    }
    //add data to video_download_task_detail
    public async create(vdte: VideoDownloadTaskDetailEntity): Promise<number> {
        let proxy_override=0
        if(vdte.proxy_override){
            proxy_override=1
        }
        const res=await this.repository.save(vdte)
        return res.id
    }

}