import { videoCaptionImpl } from '@/modules/interface/VideoCaptionImpl';
export class Whisper implements videoCaptionImpl{
    //extract caption from video
    extractCaption(file: string, savePath: string,  execPath?:string,errorCall?: (errorMsg: string) => void, stroutCall?:(message: string) => void, successCall?: () => void)
    {
        
    }
}