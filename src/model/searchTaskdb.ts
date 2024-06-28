import { Database } from 'better-sqlite3';
import { getRecorddatetime } from "@/modules/lib/function";
import { Scraperdb } from "@/model/scraperdb";
export class SearchTaskdb {
    db: Database;
    searchTaskTable = "search_task";
   
    constructor() {
      const scraperModel = Scraperdb.getInstance();
      this.db = scraperModel.getdb();
    }
    //save search task
    public saveSearchTask(id: number): number | bigint {
  
      const recordtime = getRecorddatetime();
    
        const stmt = this.db.prepare(
          `INSERT INTO ` +
            this.searchTaskTable +
            ` (id,record_time) VALUES (?,?)`
        );
        const info = stmt.run(
          id,
          recordtime
        );
        return info.lastInsertRowid;
    }
    
}
