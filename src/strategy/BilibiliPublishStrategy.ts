import { BaseVideoPublishStrategy, PublishOptions } from './VideoPublishStrategy';
import { VideoDownloadEntity } from '@/entity/VideoDownload.entity';
import {VideoPublishResultType} from "@/entityTypes/videoPublishType"
import {PublishPlatform,PublishStatus} from "@/entityTypes/videoPublishType"
//import { Page } from 'puppeteer';
import { ElementHandle } from 'puppeteer';


export class BilibiliPublishStrategy extends BaseVideoPublishStrategy {
    private readonly BILIBILI_UPLOAD_URL = 'https://member.bilibili.com/platform/upload/video/frame';
    private readonly BILIBILI_LOGIN_CHECK_SELECTOR = '.upload-wrp'; // This selector should be present when logged in

    private async checkLoginStatus(): Promise<boolean> {
        try {
            // Wait for either the login button or the upload button to appear
            //await this.page.waitForSelector('.upload-wrp', { timeout: 5000 });
            
            // Check if login button exists (which means user is not logged in)
            const usericon = await this.page.$(this.BILIBILI_LOGIN_CHECK_SELECTOR);
            //return !loginButton;
            if(usericon){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    async publish(video: VideoDownloadEntity, options: PublishOptions): Promise<VideoPublishResultType> {
        const result:VideoPublishResultType={
            publishStatus:PublishStatus.PENDING,
            publishPlatform:PublishPlatform.BILIBILI,
            publishTime:new Date(),
            publishError:"",
            publishUrl:""
        }
        // const record = new VideoPublishRecordEntity();
        // record.video_download_id = video.id;
        // record.platform = PublishPlatform.YOUTUBE;
        // record.status = PublishStatus.PENDING;
        let url = "";
        try {
            if (!video.savepath) {
                throw new Error('Video savepath is required');
            }

            await this.initializePage(options);
            
            // Set cookies if provided
            if (options.cookies) {
                await this.setCookies(options.cookies);
            }
            
            // Navigate to Bilibili upload page
            await this.page.goto(this.BILIBILI_UPLOAD_URL);
            
            // Check login status
            const isLoggedIn = await this.checkLoginStatus();
            if (!isLoggedIn) {
                throw new Error('User is not logged in. Please provide valid cookies.');
            }
            
            // Upload the video
            await this.uploadVideo(video.savepath);
            
            // Fill in video details
            if (options.title) {
                await this.page.type('#textbox', options.title);
            }
            
            if (options.description) {
                await this.page.type('.ql-editor', options.description);
            }
            
            // Set privacy settings
            // if (options.privacy) {
            //     await this.page.click('#privacy-button');
            //     await this.page.click(`[aria-label="${options.privacy}"]`);
            // }
            
            // Click publish button
            await this.page.click('#done-button');
            
            // Wait for the video URL to be available
            // const videoUrl = await this.page.waitForSelector('.video-url', { timeout: 30000 });
            
            // if(videoUrl){
            //     const resurl = await videoUrl.evaluate(el => el.textContent);
            //     if(resurl){
            //         url = resurl;
            //     }
            // }
            // if (!url) {
            //     throw new Error('Video URL is empty');
            // }
            
            //record.platform_video_url = url;
            const videoId = this.extractVideoId(url);
            if (!videoId) {
                throw new Error('Could not extract video ID from URL');
            }
            //record.platform_video_id = videoId;
            //record.status = PublishStatus.PUBLISHED;
            
        } catch (error: unknown) {
            result.publishStatus = PublishStatus.FAILED;
            result.publishError = error instanceof Error ? error.message : 'Unknown error occurred';
        } finally {
            await this.cleanup();
        }
        
        return result;
        //return getRepository(VideoPublishRecordEntity).save(record);
    }
    async uploadVideo(videoPath: string): Promise<void> {
        // Wait for the upload wrapper to be available
        // Wait for the upload button to be visible
        await this.page.waitForSelector('.upload-wrp', { visible: true, timeout: 30000 });
        
        // Find the file input element
        const fileInput = await this.page.$('input[type="file"]');
        if (!fileInput) {
            // If no direct file input is found, try to find it within the upload wrapper
            const uploadWrapperFileInput = await this.page.$('.upload-wrp input[type="file"]') as ElementHandle<HTMLInputElement>;
            if (!uploadWrapperFileInput) {
                throw new Error('File input element not found');
            }
            // Set the file path to the input element
            await uploadWrapperFileInput.uploadFile(videoPath);
        } else {
            // Set the file path to the input element
            await fileInput.uploadFile(videoPath);
        }
        
        // Wait for the upload to start and complete
        await this.page.waitForSelector('.upload-progress', { timeout: 10000 })
            .catch(() => console.log('Upload progress indicator not found, continuing anyway'));
            
        // Wait for upload to complete (this selector may need to be adjusted based on Bilibili's UI)
        await this.page.waitForSelector('.upload-complete', { timeout: 300000 })
            .catch(() => console.log('Upload complete indicator not found, continuing anyway'));
        const uploadWrapper = await this.page.waitForSelector('.upload-wrp');
        if (!uploadWrapper) {
            throw new Error('Upload wrapper not found');
        }

        // Get the bounding box of the upload wrapper
        const box = await uploadWrapper.boundingBox();
        if (!box) {
            throw new Error('Could not get upload wrapper position');
        }

        // Calculate the center point of the upload wrapper
        const centerX = box.x + box.width / 2;
        const centerY = box.y + box.height / 2;

        // Create and dispatch the drag and drop events
        await this.page.evaluate(async (centerX, centerY, filePath) => {
            const uploadWrapper = document.querySelector('.upload-wrp');
            if (!uploadWrapper){
                throw new Error('Upload wrapper not found');
            }

            // Read the file data
            const response = await fetch(filePath);
            const blob = await response.blob();
            
            // Extract file name and extension from the path
            const fileName = filePath.split('/').pop() || 'video.mp4';
            const fileExtension = fileName.split('.').pop()?.toLowerCase() || 'mp4';
            
            // Determine the correct MIME type based on file extension
            let mimeType = 'video/mp4';
            if (fileExtension === 'webm') mimeType = 'video/webm';
            else if (fileExtension === 'mov') mimeType = 'video/quicktime';
            else if (fileExtension === 'avi') mimeType = 'video/x-msvideo';
            else if (fileExtension === 'mkv') mimeType = 'video/x-matroska';
            
            // Create the file object with the correct name and type
            const file = new File([blob], fileName, { type: mimeType });
            
            // Create the drag event
            const dragEvent = new DragEvent('dragenter', {
                bubbles: true,
                cancelable: true,
                dataTransfer: new DataTransfer()
            });
            dragEvent.dataTransfer?.items.add(file);
            
            // Create the drop event
            const dropEvent = new DragEvent('drop', {
                bubbles: true,
                cancelable: true,
                dataTransfer: new DataTransfer()
            });
            dropEvent.dataTransfer?.items.add(file);

            // Dispatch the events
            uploadWrapper.dispatchEvent(dragEvent);
            uploadWrapper.dispatchEvent(dropEvent);
        }, centerX, centerY, videoPath);

        // Wait for the upload to complete and success message to appear
        await this.page.waitForSelector('span.success', { timeout: 900000 });
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
            'scheduleDate',
            'cookies',
            'headless'
        ];
    }

    private extractVideoId(url: string): string | null {
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    }
} 