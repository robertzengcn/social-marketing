import { BaseModule } from "@/modules/baseModule";
import { ExtraModulesdb } from "@/model/ExtraModulesdb";
import { ExtraModuleEntity } from "@/entityTypes/extramoduleType";

export class ExtraModulesModule extends BaseModule {
    private extraModulesdb: ExtraModulesdb
    constructor() {
        super()
        this.extraModulesdb = new ExtraModulesdb(this.dbpath)
    }
    create(extraModule: Omit<ExtraModuleEntity, 'id'>): number {
        return this.extraModulesdb.create(extraModule)
    }
    //get item from extra module
    read(id: number): ExtraModuleEntity | null {
        return this.extraModulesdb.read(id)
    }
    //update extra module   
    update(id: number, extraModule: ExtraModuleEntity) {
        return this.extraModulesdb.update(id, extraModule)
    }
    //delete extra module
    delete(id: number): void {
        return this.extraModulesdb.delete(id)
    }
    //get extra module by name
    getExtraModuleByName(name: string): ExtraModuleEntity | null {
        return this.extraModulesdb.getExtraModuleByName(name)
    }
    deletePackage(name: string): void {
        return this.extraModulesdb.deletePackage(name)
    }
}