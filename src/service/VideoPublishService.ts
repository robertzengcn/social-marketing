import { Browser } from 'puppeteer';
import { PublishPlatform } from '@/entity/VideoPublishRecord.entity';
import { VideoPublishStrategyFactory } from '@/strategy/VideoPublishStrategyFactory';
import { VideoDownloadEntity } from '@/entity/VideoDownload.entity';
import { PublishOptions } from '@/strategy/VideoPublishStrategy';
import { VideoPublishRecordEntity } from '@/entity/VideoPublishRecord.entity';

export class VideoPublishService {
    private browser: Browser;
    private strategyFactory: VideoPublishStrategyFactory;

    constructor(browser: Browser) {
        this.browser = browser;
        this.strategyFactory = VideoPublishStrategyFactory.getInstance();
    }

    async publishVideo(
        video: VideoDownloadEntity,
        platform: PublishPlatform,
        options: PublishOptions
    ): Promise<VideoPublishRecordEntity> {
        try {
            const strategy = this.strategyFactory.getStrategy(platform, this.browser);
            
            // Validate options before publishing
            await strategy.validateOptions(options);
            
            // Publish the video
            return await strategy.publish(video, options);
        } catch (error) {
            // Create a failed record
            const record = new VideoPublishRecordEntity();
            record.video_download_id = video.id;
            record.platform = platform;
            record.status = 2; // FAILED
            record.error_message = error.message;
            return record;
        }
    }

    async publishToMultiplePlatforms(
        video: VideoDownloadEntity,
        platforms: PublishPlatform[],
        options: PublishOptions
    ): Promise<VideoPublishRecordEntity[]> {
        const results: VideoPublishRecordEntity[] = [];
        
        for (const platform of platforms) {
            const result = await this.publishVideo(video, platform, options);
            results.push(result);
        }
        
        return results;
    }
} 