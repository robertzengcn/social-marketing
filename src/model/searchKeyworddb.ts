import { Database } from 'better-sqlite3';
//import { getRecorddatetime } from "@/modules/lib/function";
import { Scraperdb } from "@/model/scraperdb";
export class SearchKeyworddb {
    db: Database;
    searchKeywordTable = "search_keyword";
   
    constructor() {
      const scraperModel = Scraperdb.getInstance();
      this.db = scraperModel.getdb();
    }
    
    //save search task
    public saveSearchKeyword(keyword: string,taskId:number): number | bigint {
  
    //   const recordtime = getRecorddatetime();
    
        const stmt = this.db.prepare(
          `INSERT INTO ` +
            this.searchKeywordTable +
            ` (keyword,task_id) VALUES (?,?)`
        );
        const info = stmt.run(
          keyword,
          taskId
        );
        return info.lastInsertRowid;
    }
}