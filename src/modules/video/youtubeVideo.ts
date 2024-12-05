import { Video } from '@/modules/video';
import {ExtraModuleController} from '@/controller/extramodule-controller'
import {CustomError} from '@/modules/customError'
export class youtubeVideo implements Video {
    private moduleName="youtube-dl.exe"
    public checkRequirement():boolean{
        const extraModule=new ExtraModuleController()
        const res=extraModule.checkModule(this.moduleName)
        if(!res){
            throw new CustomError("download youtube video must install youtube-dl plugin",2024120511189)
        }
        return true
    }
    public download(link:string,videopath:string,cookies:string,errorcall?: (errorMessage: string) => void,stdoutCall?:(stdout: string) => void,stderrCall?:(stderr: string) => void,finishCall?:()=> void):void{
        
    }
}