//import {PublishPlatform,PublishStatus} from "@/entity/VideoPublishRecord.entity"
//import {PublishStatus}

export enum PublishPlatform {
    YOUTUBE = 'youtube',
    BILIBILI = 'bilibili',
    BAIDU = 'baidu'
}

export enum PublishStatus {
    PENDING = 'pending',
    PUBLISHED = 'published',
    FAILED = 'failed'
}

export interface VideoPublishResultType {
    publishStatus: PublishStatus;
    publishPlatform: PublishPlatform;
    publishTime: Date;
    publishError: string;
    publishUrl: string;
}

export interface VideoPublishRequest {
    videoId: number;
    platform: PublishPlatform;
    category: string;
    title?: string;
    description?: string;
    tags?: string[];
    privacy?: 'public' | 'private' | 'unlisted';
    scheduleDate?: Date;
}