import { Database } from 'sqlite3';
import { Scraperdb } from "@/model/scraperdb";
import {getRecorddatetime} from "@/modules/lib/function";
export interface TaskResultEntity{
  taskrunId:number
  url:string
  title:string
  content:string
  lang:string
}
export class TaskResultdb {
    db: Database;
    taskresultTable = "task_result"; 
    constructor() {
        const scraperModel = Scraperdb.getInstance();
        this.db = scraperModel.getdb();
    }
    public saveTaskresult(taskresult:TaskResultEntity,callback:Function|undefined|null){
      if(!taskresult.taskrunId){
        throw new Error(
          `task run id empty`
        );
      }
      const recordtime =getRecorddatetime();
        const sql =
        `INSERT INTO ` +
        this.taskresultTable +
        ` (taskrun_id,url,title,content,lang,record_time) VALUES (?,?,?,?,?,?)`;  
        this.db.run(    
            sql,
            [taskresult.taskrunId, taskresult.url,taskresult.title,taskresult.content,taskresult.lang,recordtime],
            function (err) {
              if (err) {
                throw new Error(
                  err.message + " taskrunid:" + taskresult.taskrunId.toString() + " recordtime:" + recordtime
                );
              }
              if (this.lastID) {           
                if(callback){
                  callback(this.lastID)
                }
              }    
            }
          );
    }    
}