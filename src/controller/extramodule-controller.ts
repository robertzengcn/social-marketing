import { extramodules } from "@/config/extrapipmodule"
import { ExtraModule } from "@/entityTypes/extramodule-type"
import {checkFolderAndGetFiles,downloadFile } from "@/modules/lib/function"
import { ListData } from "@/entityTypes/commonType"
// import { uninstallPipPackage } from "@/modules/lib/function"
import log from 'electron-log/node';
import { app } from 'electron';
import * as path from 'path';
export class ExtraModuleController {
    private extraModulePth:string;
    constructor() {
        this.extraModulePth=path.join(app.getPath('exe'),'extramodule')
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
    public installExtraModule(packagename: string, strout?: (message: string) => void, strerr?: (message: string) => void) {
        //valid package name
        const valid = extramodules.find((module) => module.packagename === packagename)
        if (!valid) {
            throw new Error("package name not valid:" + packagename)
        }
        const saveName=path.join(this.extraModulePth,valid.packagename)
        downloadFile(valid.link,saveName)
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
    //remove modules
    public removeExtraModule(packagename: string, strout?: (message: string) => void, strerr?: (message: string) => void) {
        //valid package name
        const valid = extramodules.find((module) => module.packagename === packagename)
        if (!valid) {
            throw new Error("package name not valid:" + packagename)
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



}