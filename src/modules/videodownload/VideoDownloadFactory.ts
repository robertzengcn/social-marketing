import {YoutubeDownload} from "@/modules/videodownload/youtubeDownload"
import {videoDownloadImpl} from "@/modules/interface/videoDownloadImpl"


export class VideoDownloadFactory {
    static getDownloader(platform: string):videoDownloadImpl {
        switch (platform) {
            case 'youtube':
                return new YoutubeDownload();
            // Add more cases for other platforms as needed
            default:
                throw new Error('Unsupported platform');
        }
    }
}

