import { VideoPublishModel } from "@/model/VideoPublish.model";
import { BaseModule } from "@/modules/baseModule";
import { VideoPublishRecordEntity } from "@/entity/VideoPublishRecord.entity";
import { PublishPlatform, PublishStatus } from "@/entityTypes/videoPublishType";

export class VideoPublishModule extends BaseModule {
    private videoPublishModel: VideoPublishModel;

    constructor() {
        super();
        this.videoPublishModel = new VideoPublishModel(this.dbpath);
    }

    public async savePublishRecord(publishRecord: VideoPublishRecordEntity): Promise<number> {
        return await this.videoPublishModel.savePublishRecord(publishRecord);
    }

    public async updatePublishStatus(status: PublishStatus, publishId: number): Promise<number> {
        return await this.videoPublishModel.updatePublishStatus(status, publishId);
    }

    public async updatePlatformVideoInfo(
        publishId: number,
        platformVideoId: string,
        platformVideoUrl: string
    ): Promise<number> {
        return await this.videoPublishModel.updatePlatformVideoInfo(
            publishId,
            platformVideoId,
            platformVideoUrl
        );
    }

    public async updateErrorMessage(publishId: number, errorMessage: string): Promise<number> {
        return await this.videoPublishModel.updateErrorMessage(publishId, errorMessage);
    }

    public async updatePlatformMetadata(publishId: number, metadata: Record<string, any>): Promise<number> {
        return await this.videoPublishModel.updatePlatformMetadata(publishId, metadata);
    }

    public async getPublishRecord(id: number): Promise<VideoPublishRecordEntity | null> {
        return await this.videoPublishModel.getPublishRecord(id);
    }

    public async getPublishRecordsByVideoId(videoDownloadId: number): Promise<VideoPublishRecordEntity[]> {
        return await this.videoPublishModel.getPublishRecordsByVideoId(videoDownloadId);
    }

    public async getPublishRecordsByStatus(status: PublishStatus): Promise<VideoPublishRecordEntity[]> {
        return await this.videoPublishModel.getPublishRecordsByStatus(status);
    }

    public async getPublishRecordsByPlatform(platform: PublishPlatform): Promise<VideoPublishRecordEntity[]> {
        return await this.videoPublishModel.getPublishRecordsByPlatform(platform);
    }

    public async deletePublishRecord(id: number): Promise<number> {
        return await this.videoPublishModel.deletePublishRecord(id);
    }
} 