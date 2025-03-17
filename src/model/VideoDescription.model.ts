import { BaseDb } from "@/model/Basedb";
import { Repository,Not } from "typeorm"
import { VideoDescriptionEntity } from "@/entity/VideoDescription.entity"
export class VideoDescriptionModel extends BaseDb {
    private repository: Repository<VideoDescriptionEntity>
    constructor(filepath: string) {
        super(filepath)

        this.repository = this.sqliteDb.connection.getRepository(VideoDescriptionEntity)
    }
    /**
      * save video
      * 
      */
    async saveVideoDescription(videoinfo: VideoDescriptionEntity): Promise<number> {
        await this.repository.save(videoinfo)
        return videoinfo.video_id;

    }

    async truncatedb() {
        return await this.repository.clear();
    }
    async getVideoDescription(videoId: number,language:string): Promise<VideoDescriptionEntity | null> {
        return this.repository.findOne({ where: { video_id: videoId,language:language } });
    }
    // delete video description
    async deleteVideoDescription(videoId: number): Promise<number> {
        const result = await this.repository.delete({ video_id: videoId });
        return result.affected || 0;
        // const stmt = this.db.prepare(
        //     `DELETE FROM ` + this.videoDescriptionTable + ` WHERE video_id = ?`);
        // const res = stmt.run(videoId);
        // return res.changes;
    }
    //get video descript list with provide language unequal to the language
    async getVideoDescriptionOtherLanguage(videoId: number,language:string): Promise<Array<VideoDescriptionEntity> | null> {
        return this.repository.find({ where: { video_id: videoId,language:Not(language) } });
    }



}