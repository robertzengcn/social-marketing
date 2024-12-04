import { extramodules } from "@/config/extrapipmodule"
import { ExtraModule } from "@/entityTypes/extramodule-type"
import {checkFolderAndGetFiles,downloadFile } from "@/modules/lib/function"
import { ListData } from "@/entityTypes/commonType"
// import { uninstallPipPackage } from "@/modules/lib/function"
//import log from 'electron-log/node';
import { app } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
export class ExtraModuleController {
    private extraModulePth:string;
    constructor() {
        this.extraModulePth=path.join(app.getAppPath(),'extramodule');
        // const env=process.env.NODE_ENV || 'development';
        // if(env==='production'){
        //     this.extraModulePth=path.join(app.getAppPath(),'extramodule');
        // }else{    
        // this.extraModulePth=path.join(path.dirname(app.getPath('exe')),'extramodule');
        // }
        //const parentPath = path.dirname(this.extraModulePth);
        // log.transports.file.resolvePathFn = () => path.join(APP_DATA, 'logs/main.log');
    }
    public async getExtraModuleList(offerset: number, length: number): Promise<ListData<ExtraModule>> {
        const piplist = await this.getExtramoduleinfolder()
        //loop extra modules check if modules installed
        extramodules.forEach((module) => {
            module.installed = piplist.includes(module.packagename)
        })
        return {
            records: extramodules.slice(offerset, length)
            , num: extramodules.length
        }
    }
    //install extra module
    public installExtraModule(packagename: string, success?: () => void, strerr?: (message: Error) => void) {
        //valid package name
        const valid = extramodules.find((module) => module.packagename === packagename)
        if (!valid) {
            //throw new Error("package name not valid:" + packagename)
            if(strerr){
            strerr(new Error("package name not valid:" + packagename))
            }
            return
        }
        const saveName=path.join(this.extraModulePth,valid.packagename)
        console.log(this.extraModulePth)
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
        const valid = extramodules.find((module) => module.packagename === packagename)
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



}