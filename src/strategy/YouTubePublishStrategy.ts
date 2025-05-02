import { BaseVideoPublishStrategy, PublishOptions } from './VideoPublishStrategy';
import { VideoDownloadEntity } from '@/entity/VideoDownload.entity';
import { VideoPublishRecordEntity, PublishPlatform, PublishStatus } from '@/entity/VideoPublishRecord.entity';
import { getRepository } from 'typeorm';

export class YouTubePublishStrategy extends BaseVideoPublishStrategy {
    private readonly YOUTUBE_UPLOAD_URL = 'https://www.youtube.com/upload';

    async publish(video: VideoDownloadEntity, options: PublishOptions): Promise<VideoPublishRecordEntity> {
        const record = new VideoPublishRecordEntity();
        record.video_download_id = video.id;
        record.platform = PublishPlatform.YOUTUBE;
        record.status = PublishStatus.PENDING;

        try {
            if (!video.savepath) {
                throw new Error('Video savepath is required');
            }

            await this.initializePage();
            
            // Navigate to YouTube upload page
            await this.page.goto(this.YOUTUBE_UPLOAD_URL);
            
            // Wait for the file input to be available
            const fileInput = await this.page.waitForSelector('input[type="file"]');
            if (!fileInput) {
                throw new Error('File input not found');
            }
            // Upload the video file
            await fileInput.uploadFile(video.savepath);
            
            // Wait for the upload to complete
            await this.page.waitForSelector('.upload-status', { timeout: 300000 });
            
            // Fill in video details
            if (options.title) {
                await this.page.type('#textbox', options.title);
            }
            
            if (options.description) {
                await this.page.type('#description-textarea', options.description);
            }
            
            // Set privacy settings
            if (options.privacy) {
                await this.page.click('#privacy-button');
                await this.page.click(`[aria-label="${options.privacy}"]`);
            }
            
            // Click publish button
            await this.page.click('#done-button');
            
            // Wait for the video URL to be available
            const videoUrl = await this.page.waitForSelector('.video-url', { timeout: 30000 });
            const url = await videoUrl.evaluate(el => el.textContent);
            if (!url) {
                throw new Error('Video URL is empty');
            }
            
            record.platform_video_url = url;
            const videoId = this.extractVideoId(url);
            if (!videoId) {
                throw new Error('Could not extract video ID from URL');
            }
            record.platform_video_id = videoId;
            record.status = PublishStatus.PUBLISHED;
            
        } catch (error: unknown) {
            record.status = PublishStatus.FAILED;
            record.error_message = error instanceof Error ? error.message : 'Unknown error occurred';
        } finally {
            await this.cleanup();
        }

        return getRepository(VideoPublishRecordEntity).save(record);
    }

    async validateOptions(options: PublishOptions): Promise<boolean> {
        // YouTube specific validation
        if (options.title && options.title.length > 100) {
            throw new Error('Title must be less than 100 characters');
        }
        if (options.description && options.description.length > 5000) {
            throw new Error('Description must be less than 5000 characters');
        }
        return true;
    }

    getSupportedOptions(): string[] {
        return [
            'title',
            'description',
            'tags',
            'category',
            'privacy',
            'scheduleDate'
        ];
    }

    private extractVideoId(url: string): string | null {
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    }
} 