// import { extramodules } from "@/config/WinExtraModuleConfig"
import { WinExtraModuleConfig } from "@/config/WinExtraModuleConfig"
import { MacExtraModuleConfig } from "@/config/MacExtraModuleConfig"
import { LinuxExtraModuleConfig } from "@/config/LinuxExtraModuleConfig"
import { ExtraModule } from "@/entityTypes/extramodule-type"
import { checkFolderAndGetFiles, downloadFile, getUserPlatform } from "@/modules/lib/function"
import { ListData } from "@/entityTypes/commonType"
import { execSync, exec } from 'child_process';

import { uninstallPipPackage, removeFile } from "@/modules/lib/function"
//import log from 'electron-log/node';
import { app } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { s } from "vitest/dist/reporters-1evA5lom"
export class ExtraModuleController {
    private extraModulePth: string;
    private extramodules: ExtraModule[]
    constructor() {
        this.extraModulePth = path.join(app.getAppPath(), 'extramodule');
        this.extramodules = this.getExtraModulesConfig()
    }

    public getModulePath(): string {
        return this.extraModulePth
    }
    public async getExtraModuleList(offerset: number, length: number): Promise<ListData<ExtraModule>> {
        const extraModuelfold = await this.getExtramoduleinfolder()
        //    const extramodules=this.getExtraModulesConfig()

        //loop extra modules check if modules installed
        this.extramodules.forEach(async (module) => {
            module.installed = extraModuelfold.includes(module.packagename)
            if (module.ispip) {//check pip package installed
                const mores = await this.isPipModuleInstalled(module.packagename)
                if (mores) {
                    module.installed = true
                }
            }
        })


        return {
            records: this.extramodules.slice(offerset, length)
            , num: this.extramodules.length
        }
    }
    public getExtraModulesConfig(): ExtraModule[] {
        const platform = getUserPlatform()
        switch (platform) {
            case 'win32':
                return WinExtraModuleConfig
            case 'darwin':
                return MacExtraModuleConfig
            case 'linux':
                return LinuxExtraModuleConfig
            default:
                throw new Error("platform not support")
        }
    }
    //get platform packagename by name

    //install extra module
    public async installExtraModule(packagename: string, success?: () => void, strerr?: (message: Error) => void) {
        //valid package name
        const valid = this.extramodules.find((module) => module.packagename === packagename)
        if (!valid) {
            //throw new Error("package name not valid:" + packagename)
            if (strerr) {
                strerr(new Error("package name not valid:" + packagename))
            }
            return
        }
        if (valid.ispip) {//install pip package
            await this.installPipPackage(valid.packagename).then(() => {
                if (success) {
                    success()
                }
            }).catch((error) => {
                if (strerr) {
                    strerr(error)
                }
            })

        } else {

            await this.downloadInstallPackage(valid.packagename, valid.link, success, strerr)
        }



    }
    public async downloadInstallPackage(packagename: string, installLink: string, success?: () => void, strerr?: (message: Error) => void) {
        const saveName = path.join(this.extraModulePth, packagename)
        //console.log(this.extraModulePth)
        //create folder if not exist
        fs.access(this.extraModulePth, fs.constants.W_OK, (e) => {
            if (e) {
                // console.log(e)
                fs.promises.mkdir(this.extraModulePth, { recursive: true },).then(async () => {
                    // console.log(valid.link)
                    await downloadFile(installLink, saveName, () => {
                        fs.chmodSync(saveName, '755');

                        if (success) {
                            success()
                        }
                    }, strerr)


                    //add exec permission to file if file download success

                    // fs.promises.chmod(saveName,0o755).then(()=>{     
                    //    this.downloadSavefile(valid.link,success,strerr)
                }).catch((error) => {
                    console.log(error)
                    if (strerr) {
                        strerr(error)
                    }
                })
            } else {
                //error not exist,access good
                downloadFile(installLink, saveName, () => {
                    fs.chmodSync(saveName, '755');

                    if (success) {
                        success()
                    }
                }, strerr)
                // fs.chmodSync(saveName, '755');
                // if(success){
                //     success()
                // }
            }
        })
    }
    public downloadSavefile(filename: string, success: () => void, strerr: (message: Error) => void) {
        const saveName = path.join(this.extraModulePth, filename)
        downloadFile(filename, saveName, success, strerr)

    }
    //remove modules
    public removeExtraModule(packagename: string, success?: () => void, strerr?: (message: string) => void, strout?: (message: string) => void) {
        //valid package name
        const valid = this.extramodules.find((module) => module.packagename === packagename)
        if (!valid) {
            throw new Error("package name not valid:" + packagename)
        }
        if (valid.ispip) {//uninstall pip package
            //uninstall package
            uninstallPipPackage(valid.packagename, (error) => {

                throw new Error(error.message)
            },
                (message) => {
                    const formattedMessage = `${new Date().toISOString()}: ${message}\n`;


                    if (strout) {
                        strout(message)
                    }
                },
                (message) => {
                    const formattedMessage = `${new Date().toISOString()}: ${message}\n`;
                    // log.error(formattedMessage)
                    if (strerr) {
                        strerr(message)
                    }
                },
            )
        } else {
            const modulePath = path.join(this.extraModulePth, valid.packagename);
            removeFile(modulePath, () => {
                if (success) {
                    success()
                }
            }, (message) => {
                if (strerr) {
                    strerr(message)
                }
            })
        }
    }


    //check extramodule exist
    private async getExtramoduleinfolder() {

        const moduleList = await checkFolderAndGetFiles(this.extraModulePth)
        return moduleList

    }
    //check module exist in folder
    public checkModule(packageName: string): boolean {
        const modulePath = path.join(this.extraModulePth, packageName);
        return fs.existsSync(modulePath);
    }
    //get packagename by name
    public getPackageByName(name: string): ExtraModule | undefined {

        return this.extramodules.find((module) => module.name === name)
    }

    //check whether python installed
    public checkPython(): boolean {
        try {
            // Try to execute the 'python --version' command
            const output = execSync('python --version', { stdio: 'pipe' }).toString();
            console.log(`Python version: ${output.trim()}`);
            return true;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Python is not installed:', error.message);
            }
            return false;
        }
    }
    //check whether pip modules installed
    public async isPipModuleInstalled(moduleName: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            exec(`pip show ${moduleName}`, (error, stdout, stderr) => {
                if(stderr){
                    if(stderr.includes("not found:")){
                    resolve(false);
                }
            }
                if (error) {
                    // Module is not installed
                    resolve(false);
                } else {
                    // Module is installed
                    resolve(true);
                }
            });
        });
    }
    public async installPipPackage(packageName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            exec(`pip install ${packageName}`, (error, stdout, stderr) => {
              
                if (error) {
                    reject(new Error(`Error installing package: ${stderr}`));
                } else {
                    resolve();
                }
            });
        });
    }


}