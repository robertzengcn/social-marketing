import { BaseDb } from "@/model/Basedb";
import { Repository } from "typeorm";
import { VideoCaptionEntity } from "@/entity/VideoCaption.entity";
import { VideoCaptionEntity as VideoCaptionType } from "@/entityTypes/videoType";

export class VideoCaptionModel extends BaseDb {
    private repository: Repository<VideoCaptionEntity>;

    constructor(filepath: string) {
        super(filepath);
        this.repository = this.sqliteDb.connection.getRepository(VideoCaptionEntity);
    }

    /**
     * Create or update video caption
     */
    async create(videoCaption: VideoCaptionType): Promise<number> {
        const existingCaption = await this.getCaptionByVidLid(videoCaption.videoId, videoCaption.language_id);
        
        if (existingCaption && existingCaption.id) {
            await this.update(existingCaption.id, videoCaption);
            return existingCaption.id;
        } else {
            const newCaption = new VideoCaptionEntity();
            newCaption.video_id = videoCaption.videoId;
            newCaption.language_id = videoCaption.language_id;
            newCaption.caption_path = videoCaption.caption_path;
            newCaption.record_time = new Date().toISOString();
            
            const savedCaption = await this.repository.save(newCaption);
            return savedCaption.id;
        }
    }

    /**
     * Read video caption by id
     */
    async read(id: number): Promise<VideoCaptionType | null> {
        return this.repository.findOne({ where: { id } }) as unknown as Promise<VideoCaptionType | null>;
    }

    /**
     * Update video caption
     */
    async update(id: number, videoCaption: VideoCaptionType): Promise<void> {
        await this.repository.update(id, {
            video_id: videoCaption.videoId,
            language_id: videoCaption.language_id,
            caption_path: videoCaption.caption_path,
            record_time: new Date().toISOString()
        });
    }

    /**
     * Delete video caption by video id
     */
    async delete(videoId: number): Promise<void> {
        await this.repository.delete({ video_id: videoId });
    }

    /**
     * Get caption by video id and language id
     */
    async getCaptionByVidLid(videoId: number, languageId: number): Promise<VideoCaptionType | null> {
        return this.repository.findOne({
            where: { video_id: videoId, language_id: languageId }
        }) as unknown as Promise<VideoCaptionType | null>;
    }

    /**
     * Get all captions by video id
     */
    async getCaptionByVid(videoId: number): Promise<VideoCaptionType[]> {
        return this.repository.find({
            where: { video_id: videoId }
        }) as unknown as Promise<VideoCaptionType[]>;
    }

    /**
     * Truncate the database table
     */
    async truncatedb(): Promise<void> {
        await this.repository.clear();
    }
} 