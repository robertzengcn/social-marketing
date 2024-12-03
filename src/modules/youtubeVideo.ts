import { Video } from '@/modules/video';
export class youtubeVideo implements Video {
    public checkRequirement():boolean{
        return true
    }
    public download(link:string,videopath:string,errorcall?: (errorMessage: string) => void,stdoutCall?:(stdout: string) => void,stderrCall?:(stderr: string) => void,finishCall?:()=> void):void{
        
    }
}