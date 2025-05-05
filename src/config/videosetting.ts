'use strict';
export {};
//import {LanguageItem} from '@/entityTypes/commonType'
import {LanguageCode} from '@/entityTypes/commonType'
import {Vpformconfig} from '@/entityTypes/videoType'
import {PublishPlatform} from '@/entityTypes/videoPublishType'

export enum VideoPublishCategory {
    SOCIAL_MEDIA = 'social_media',
    VIDEO_PLATFORM = 'video_platform',
    SEARCH_ENGINE = 'search_engine'
}

export const VideoDownloadlist=[
    'youtube'
]
export const VideodownlodType=[
    'singleplay','playlist','keyword'
]
export const CookiesSelectType=[
    'browser cookies','account cookies'
]
export const BrowerList=[
    'brave', 'chrome', 'chromium', 'edge', 'firefox','opera', 'safari', 'vivaldi', 'whale'
]
export const VideoPublishPlatformConfig:Vpformconfig[]=[
    {
        name:PublishPlatform.YOUTUBE,
        language:LanguageCode.EN,
        category: VideoPublishCategory.VIDEO_PLATFORM
    },
    {
        name:PublishPlatform.BILIBILI,
        language:LanguageCode.ZH,
        category: VideoPublishCategory.VIDEO_PLATFORM
    },
    {
        name:PublishPlatform.BAIDU,
        language:LanguageCode.ZH,
        category: VideoPublishCategory.SEARCH_ENGINE
    }
]

