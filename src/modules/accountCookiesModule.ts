// import { Token } from "@/modules/token"
// import { USERSDBPATH } from '@/config/usersetting';
import { AccountCookiesdb, AccountCookiesEntity } from "@/model/accountCookiesdb"
import { BaseModule } from "@/modules/baseModule";
export class AccountCookiesModule extends BaseModule{
    // private dbpath: string
    private accountCookiesdb: AccountCookiesdb
    constructor() {
        // const tokenService = new Token()
        // const dbpath = tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        // this.dbpath = dbpath
        super()
        this.accountCookiesdb = new AccountCookiesdb(this.dbpath);
    }

    public getAccountCookies(
        accountid: number
    ): AccountCookiesEntity {
        return this.accountCookiesdb.getAccountCookies(accountid)
    }

    public saveAccountCookies(
        accountcookies: AccountCookiesEntity
    ):number {
        return Number(this.accountCookiesdb.saveAccountCookies(accountcookies))
    }
    //generate partition_path for cookies
    public genPartitionPath():string{
        return "persist:path/" + Date.now() + '-' + Math.random().toString(36).slice(2, 9)
    }

    public deleteCookies(accountid:number):void{
        this.accountCookiesdb.deleteAccountCookies(accountid)
    }

}