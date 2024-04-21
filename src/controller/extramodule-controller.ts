import {extramodules} from "@/config/extrapipmodule"
import {ExtraPipModule} from "@/entity-types/extramodule-type"
import {checkPipPackage} from "@/modules/lib/function"
import {ListData} from "@/entity-types/common-type"
export class ExtraModuleController {
    public getExtraModuleList(offerset:number,length:number): ListData<ExtraPipModule> {
        const piplist=checkPipPackage()
        //loop extra modules check if modules installed
        extramodules.forEach((module)=>{
            module.installed=piplist.includes(module.name)
        })
        return {records:extramodules.slice(offerset,length)
            ,num:extramodules.length}
        }
    

}