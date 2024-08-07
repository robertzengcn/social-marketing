import { Database } from 'better-sqlite3';
//import { getRecorddatetime } from "@/modules/lib/function";
import { Scraperdb } from "@/model/scraperdb";
export class SearchKeyworddb {
    db: Database;
    searchKeywordTable = "search_keyword";
   
    constructor(filepath:string) {
      const scraperModel = Scraperdb.getInstance(filepath);
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

    //get task id by keyword
    public getKeywordId(keyword: string): number | bigint {
      const stmt = this.db.prepare(
        `SELECT task_id FROM ` + this.searchKeywordTable + ` WHERE keyword=?`
      );
      const info = stmt.get(keyword) as {task_id:number};
      if(info){
      return info.task_id;
      }else{
        return 0
      }
    }
    //get keywords by task id
    public getkeywrodsbyTask(taskId:number):Array<string>{
      const stmt = this.db.prepare(
        `SELECT keyword FROM ` + this.searchKeywordTable + ` WHERE task_id=?`
      );
      const keywordArr=stmt.all(taskId) as Array<{keyword:string}>;
      const res:Array<string>=[]
      keywordArr.forEach((item)=>{
     //   console.log(item)
        res.push(item.keyword)
      })
      console.log(res)
      return res;
    }
}