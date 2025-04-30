import { Browser, Page } from 'puppeteer';
import { VideoPublishRecordEntity } from '@/entity/VideoPublishRecord.entity';
import { VideoDownloadEntity } from '@/entity/VideoDownload.entity';

export interface PublishOptions {
    title?: string;
    description?: string;
    tags?: string[];
    category?: string;
    privacy?: 'public' | 'private' | 'unlisted';
    scheduleDate?: Date;
    [key: string]: any; // Allow platform-specific options
}

export interface VideoPublishStrategy {
    publish(video: VideoDownloadEntity, options: PublishOptions): Promise<VideoPublishRecordEntity>;
    validateOptions(options: PublishOptions): Promise<boolean>;
    getSupportedOptions(): string[];
}

export abstract class BaseVideoPublishStrategy implements VideoPublishStrategy {
    protected browser: Browser;
    protected page: Page;

    constructor(browser: Browser) {
        this.browser = browser;
    }

    protected async initializePage(): Promise<void> {
        this.page = await this.browser.newPage();
        await this.page.setViewport({ width: 1280, height: 800 });
    }

    protected async cleanup(): Promise<void> {
        if (this.page) {
            await this.page.close();
        }
    }

    abstract publish(video: VideoDownloadEntity, options: PublishOptions): Promise<VideoPublishRecordEntity>;
    abstract validateOptions(options: PublishOptions): Promise<boolean>;
    abstract getSupportedOptions(): string[];
} 