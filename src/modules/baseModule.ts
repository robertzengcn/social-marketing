import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
export abstract class BaseModule {
    protected dbpath: string
    constructor() {
        const tokenService = new Token()
        const dbpath = tokenService.getValue(USERSDBPATH)
        if (!dbpath) {
            throw new Error("user path not exist")
        }
        this.dbpath = dbpath
        }
}