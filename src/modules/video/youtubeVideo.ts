import { Video } from '@/modules/video';
import {ExtraModuleController} from '@/controller/extramodule-controller'
import {CustomError} from '@/modules/customError'
export class youtubeVideo implements Video {
    private moduleName="youtube-dl"
    private extraModule:ExtraModuleController
    constructor() {
        this.extraModule=new ExtraModuleController()
    }
    /**
     * @throws {CustomError} if chek failed
     * @returns boolean
     */
    public checkRequirement():boolean{

        const dPackage=this.extraModule.getPackageByName(this.moduleName)
        if(!dPackage){
            throw new CustomError("download youtube video package not defined",20241212141914)
        }
        if(dPackage.requirePy){
            //check python installed or not
            const res=this.extraModule.checkPython()
            if(!res){
                throw new CustomError("download youtube video must install python",2024120511189)
            }
        }
        // const extraModule=new ExtraModuleController()
        const res=this.extraModule.checkModule(dPackage.packagename)

        if(!res){
            throw new CustomError("download youtube video must install youtube-dl plugin",2024120511189)
        }
        return true
    }
    public getPackagepath():string{
        return this.extraModule.getModulePath()
      }
  
}