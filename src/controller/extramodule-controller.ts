import { extramodules } from "@/config/extrapipmodule"
import { ExtraPipModule } from "@/entity-types/extramodule-type"
import { checkPipPackage } from "@/modules/lib/function"
import { ListData } from "@/entity-types/common-type"
import { installPipPackage, uninstallPipPackage } from "@/modules/lib/function"
import log from 'electron-log/node';
export class ExtraModuleController {
    constructor() {
        // log.transports.file.resolvePathFn = () => path.join(APP_DATA, 'logs/main.log');
    }
    public getExtraModuleList(offerset: number, length: number): ListData<ExtraPipModule> {
        const piplist = checkPipPackage()
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
    public installExtraModule(packagename: string, strout?: Function, strerr?: Function) {
        //valid package name
        const valid = extramodules.find((module) => module.packagename === packagename)
        if (!valid) {
            throw new Error("package name not valid:" + packagename)
        }
        const filePath = ""
        //install package
        installPipPackage(
            valid.packagename,
            valid.version,
            (error) => {
                throw new Error(error)
            },
            (message) => {
                const formattedMessage = `${new Date().toISOString()}: ${message}\n`;

                log.info(formattedMessage)
                if (strout) {
                    strout(message)
                }
            },
            (message) => {
                const formattedMessage = `${new Date().toISOString()}: ${message}\n`;
                log.error(formattedMessage)
                if (strerr) {
                    strerr(message)
                }
            },
        )
    }
    //remove modules
    public removeExtraModule(packagename: string, strout?: Function, strerr?: Function) {
        //valid package name
        const valid = extramodules.find((module) => module.packagename === packagename)
        if (!valid) {
            throw new Error("package name not valid:" + packagename)
        }
        //uninstall package
        uninstallPipPackage(valid.packagename, (error) => {
            log.error(error)
            throw new Error(error)
        },
            (message) => {
                const formattedMessage = `${new Date().toISOString()}: ${message}\n`;

                log.info(formattedMessage)
                if (strout) {
                    strout(message)
                }
            },
            (message) => {
                const formattedMessage = `${new Date().toISOString()}: ${message}\n`;
                log.error(formattedMessage)
                if (strerr) {
                    strerr(message)
                }
            },
        )

    }


}