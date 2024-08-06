import { Database } from 'better-sqlite3';
import { getRecorddatetime } from "@/modules/lib/function";
import { Scraperdb } from "@/model/scraperdb";
import {SearhEnginer} from "@/config/searchSetting"
import {SearchtaskdbEntity} from "@/entityTypes/searchControlType"
export enum TaskStatus{
  Processing=1,
  Stop=2
}
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
            ` (enginer_id,record_time) VALUES (?,?)`
        );
        const info = stmt.run(
          
          enginerId,
          recordtime
        );
        return info.lastInsertRowid;
    }
    //update task error log
    public updatetasklog(taskId:number,log:string){
      const stmt = this.db.prepare(
        `UPDATE ` +
          this.searchTaskTable +
          ` SET error_log=? WHERE id=?`
      );
      stmt.run(log,taskId)
    }
    //update task status
    public updatetaskstatus(taskId:number,status:TaskStatus){
      const stmt = this.db.prepare(
        `UPDATE ` +
          this.searchTaskTable +
          ` SET status=? WHERE id=?`
      );
      stmt.run(status,taskId)
    }
    //list task by condition
    public listTask():Array<SearchtaskdbEntity>{
      
      const stmt = this.db.prepare(
        `SELECT * FROM ` +
          this.searchTaskTable
      );
      return stmt.all() as Array<SearchtaskdbEntity>
    } 
    //get task total number
    public getTaskTotal():number{
      const stmt = this.db.prepare(
        `SELECT count(*) as total FROM ` +
          this.searchTaskTable
      );
      const result = stmt.get();
      const total = (result as { total: number }).total;
      return total
    }
    
}
