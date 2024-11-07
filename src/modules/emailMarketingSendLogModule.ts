import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import {EmailMarketingSendLogEntity,EmailMarketingSendLogdb} from "@/model/emailMarketingSendLogdb"

export class EmailMarketingSendLogModule {
    private dbpath: string
    private emailMarketingSendLogdb: EmailMarketingSendLogdb
    constructor() {
    const tokenService = new Token()
    const dbpath = tokenService.getValue(USERSDBPATH)
    if (!dbpath) {
        throw new Error("user path not exist")
    }
    this.dbpath = dbpath
    this.emailMarketingSendLogdb = new EmailMarketingSendLogdb(this.dbpath);
    }
    //create buck send email log item
    createItem(task: EmailMarketingSendLogEntity): number {
        return this.emailMarketingSendLogdb.create(task)
    }
    //get email send log by id
    readItem(id: number):EmailMarketingSendLogEntity |undefined  {
        return this.emailMarketingSendLogdb.read(id)
    }
    //update email send log
    updateTask(id: number, updates: EmailMarketingSendLogEntity): void {
        this.emailMarketingSendLogdb.update(id,updates);
    }
    //delete email send log by id
    deleteTask(id: string) {
        this.emailMarketingSendLogdb.delete(Number(id));
    }
  

}