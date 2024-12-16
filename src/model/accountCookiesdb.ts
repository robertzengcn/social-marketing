import { Database } from 'better-sqlite3';
import { Scraperdb } from "@/model/scraperdb";
import { getRecorddatetime } from "@/modules/lib/function";
export interface AccountCookiesEntity {
    id?: number;
    account_id: number;
    cookies: string;
    partition_path: string;
    record_time?: string;   
}
export class AccountCookiesdb {
    db: Database;
    constructor(filepath:string) {
        const scraperModel = Scraperdb.getInstance(filepath);
        this.db = scraperModel.getdb();
    }
    //save account cookies
    public saveAccountCookies(
        accountcookies: AccountCookiesEntity
    ):number|bigint {
        if (!accountcookies.account_id) {
            throw new Error(`account id empty`);
        }
        const recordtime = getRecorddatetime();
        const ac=this.getAccountCookies(accountcookies.account_id)
        if(ac&&ac.id){
            const stmt = this.db.prepare(
                `UPDATE ` +
                "account_cookies" +
                ` SET cookies = ?,partition_path = ?,record_time= ? WHERE id = ?`
            );
            const info = stmt.run(
                accountcookies.cookies,
                accountcookies.partition_path,
                recordtime,
                ac.id
            );
            return ac.id;
        }else{
       
        const stmt = this.db.prepare(
            `INSERT INTO ` +
            "account_cookies" +
            ` (account_id,cookies,partition_path,record_time) VALUES (?,?,?,?)`
        );
        const info = stmt.run(
            accountcookies.account_id,
            accountcookies.cookies,
            accountcookies.partition_path,
            recordtime
        );
       
        return info.lastInsertRowid;
        }
    }
    //get social account cookies from db
    public getAccountCookies(
        accountid: number
    ): AccountCookiesEntity {
        const stmt = this.db.prepare(
            `SELECT * FROM ` + "account_cookies" + ` WHERE account_id = ?`
        );
        const accountcookies = stmt.get(accountid) as AccountCookiesEntity;
        return accountcookies;
    }
    

}