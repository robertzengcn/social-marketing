import { Video } from '@/modules/video';
import {ExtraModuleController} from '@/controller/extramodule-controller'
export class youtubeVideo implements Video {
    private moduleName="youtube-dl.exe"
    public checkRequirement():boolean{
        const extraModule=new ExtraModuleController()
        return extraModule.checkModule(this.moduleName)
    }
    public download(link:string,videopath:string,cookies:string,errorcall?: (errorMessage: string) => void,stdoutCall?:(stdout: string) => void,stderrCall?:(stderr: string) => void,finishCall?:()=> void):void{
        
    }
}