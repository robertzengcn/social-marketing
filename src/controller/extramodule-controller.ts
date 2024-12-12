// import { extramodules } from "@/config/WinExtraModuleConfig"
import {WinExtraModuleConfig} from "@/config/WinExtraModuleConfig"
import { MacExtraModuleConfig } from "@/config/MacExtraModuleConfig"
import { LinuxExtraModuleConfig } from "@/config/LinuxExtraModuleConfig"
import { ExtraModule } from "@/entityTypes/extramodule-type"
import {checkFolderAndGetFiles,downloadFile,getUserPlatform} from "@/modules/lib/function"
import { ListData } from "@/entityTypes/commonType"
import { execSync } from 'child_process';
// import { uninstallPipPackage } from "@/modules/lib/function"
//import log from 'electron-log/node';
import { app } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
export class ExtraModuleController {
    private extraModulePth:string;
    private extramodules:ExtraModule[]
    constructor() {
        this.extraModulePth=path.join(app.getAppPath(),'extramodule');
        this.extramodules=this.getExtraModulesConfig()
    }

    public getModulePath():string{
        return this.extraModulePth
    }
    public async getExtraModuleList(offerset: number, length: number): Promise<ListData<ExtraModule>> {
        const piplist = await this.getExtramoduleinfolder()
    //    const extramodules=this.getExtraModulesConfig()
    
        //loop extra modules check if modules installed
        this.extramodules.forEach((module) => {
            module.installed = piplist.includes(module.packagename)
        })
        return {
            records: this.extramodules.slice(offerset, length)
            , num: this.extramodules.length
        }
    }
    public getExtraModulesConfig(): ExtraModule[] {
        const platform=getUserPlatform()
        switch (platform) {
            case 'win32':
                return WinExtraModuleConfig
            case 'darwin':
                return MacExtraModuleConfig
            case  'linux':
                return LinuxExtraModuleConfig
            default:
                throw new Error("platform not support")       
        }
    }
    //install extra module
    public installExtraModule(packagename: string, success?: () => void, strerr?: (message: Error) => void) {
        //valid package name
        const valid = this.extramodules.find((module) => module.packagename === packagename)
        if (!valid) {
            //throw new Error("package name not valid:" + packagename)
            if(strerr){
            strerr(new Error("package name not valid:" + packagename))
            }
            return
        }
        const saveName=path.join(this.extraModulePth,valid.packagename)
        //console.log(this.extraModulePth)
        //create folder if not exist
        fs.access(this.extraModulePth,fs.constants.W_OK,(e)  =>{
            if (e) {
                console.log(e)
                fs.promises.mkdir(this.extraModulePth,{ recursive: true },).then(() => {
                    
                    downloadFile(valid.link,saveName,success,strerr)
                //    this.downloadSavefile(valid.link,success,strerr)
                }).catch((error) => {
                    console.log(error)
                    if(strerr){
                        strerr(error)
                    }
                })
            } else {
                //error not exist,access good
                downloadFile(valid.link,saveName,success,strerr)
            }
        })
    // )) 
       // {
            // fs.mkdirSync(this.extraModulePth, { recursive: true });
      //  }
        // const saveName=path.join(this.extraModulePth,valid.packagename)

        // downloadFile(valid.link,saveName,success,strerr)
        // const filePath = ""
        //install package
        // installPipPackage(
        //     valid.packagename,
        //     valid.version,
        //     (error) => {
        //         throw new Error(error.message)
        //     },
        //     (message) => {
        //         const formattedMessage = `${new Date().toISOString()}: ${message}\n`;
        
        //         log.info(formattedMessage)
        //         if (strout) {
        //             strout(message)
        //         }
        //     },
        //     (message) => {
        //         const formattedMessage = `${new Date().toISOString()}: ${message}\n`;
        //         log.error(formattedMessage)
        //         if (strerr) {
        //             strerr(message)
        //         }
        //     },
        // )
    }
    public downloadSavefile(filename:string,success:()=>void,strerr:(message:Error)=>void){
        const saveName=path.join(this.extraModulePth,filename)
        downloadFile(filename,saveName,success,strerr)

    }
    //remove modules
    public removeExtraModule(packagename: string, success?: () => void, strerr?: (message: string) => void) {
        //valid package name
        const valid = this.extramodules.find((module) => module.packagename === packagename)
        if (!valid) {
            throw new Error("package name not valid:" + packagename)
        }
        const modulePath = path.join(this.extraModulePth, valid.packagename);
        if (fs.existsSync(modulePath)) {
            fs.rm(modulePath, { recursive: true }, (error) => {
                if(error){
                    if (strerr) {
                        strerr(`Module path does not exist: ${modulePath}`);
                        }
                }else{
                    if (success) {
                        success();
                    }
                }
            })
        } 
        //uninstall package
        // uninstallPipPackage(valid.packagename, (error) => {
        //     log.error(error)
        //     throw new Error(error.message)
        // },
        //     (message) => {
        //         const formattedMessage = `${new Date().toISOString()}: ${message}\n`;

        //         log.info(formattedMessage)
        //         if (strout) {
        //             strout(message)
        //         }
        //     },
        //     (message) => {
        //         const formattedMessage = `${new Date().toISOString()}: ${message}\n`;
        //         log.error(formattedMessage)
        //         if (strerr) {
        //             strerr(message)
        //         }
        //     },
        // )

    }
    //check extramodule exist
    private async getExtramoduleinfolder(){
       
        const moduleList=await checkFolderAndGetFiles(this.extraModulePth)
        return moduleList

    }
    //check module exist in folder
    public checkModule(packageName:string):boolean{
        const modulePath = path.join(this.extraModulePth, packageName);
        return fs.existsSync(modulePath);
    }
    //get packagename by name
    public getPackageByName(name:string):ExtraModule|undefined{
        return this.extramodules.find((module)=>module.packagename===name)
    }

 //check whether python installed
 public checkPython():boolean{
    try {
        // Try to execute the 'python --version' command
        const output = execSync('python --version', { stdio: 'pipe' }).toString();
        console.log(`Python version: ${output.trim()}`);
        return true;
      } catch (error) {
        if(error instanceof Error){
        console.error('Python is not installed:', error.message);
        }
        return false;
      }
}

}