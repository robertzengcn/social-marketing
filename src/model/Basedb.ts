import { Scraperdb } from "./scraperdb";
import { Database } from 'better-sqlite3';
export abstract class BaseDb {
    protected db: Database;
    protected connectionString: string;

     constructor(filepath:string) {
        const scraperModel = Scraperdb.getInstance(filepath);
        this.db = scraperModel.getdb();
    }

    

    protected log(message: string): void {
        console.log(`[BaseDb]: ${message}`);
    }
}

