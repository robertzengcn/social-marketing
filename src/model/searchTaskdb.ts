import { Database } from 'better-sqlite3';
import { getRecorddatetime } from "@/modules/lib/function";
import { Scraperdb } from "@/model/scraperdb";
import {SearhEnginer} from "@/config/searchSetting"

export class SearchTaskdb {
    db: Database;
    searchTaskTable = "search_task";
   
    constructor(filepath:string) {
      const scraperModel = Scraperdb.getInstance(filepath);
      this.db = scraperModel.getdb();
    }
    //save search task
    public saveSearchTask(enginerId:SearhEnginer): number | bigint {
  
      const recordtime = getRecorddatetime();
    
        const stmt = this.db.prepare(
          `INSERT INTO ` +
            this.searchTaskTable +
            ` (enginer_id,record_time) VALUES (?,?,?)`
        );
        const info = stmt.run(
          
          enginerId,
          recordtime
        );
        return info.lastInsertRowid;
    }
    
}
