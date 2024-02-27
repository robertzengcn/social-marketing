import { Database } from 'sqlite3';
import { Scraperdb } from "@/model/scraperdb";
import {getRecorddatetime} from "@/modules/lib/function";
export class Taskrundb {
    db: Database;
    taskrunTable = "task_run"; 
    constructor() {
        const scraperModel = Scraperdb.getInstance();
        this.db = scraperModel.getdb();
    }

    public saveTaskrun(taskId:number,taskrunNum:string,logfilepath:string,callback:Function|undefined|null){
        const recordtime =getRecorddatetime();
        const sql =
        `INSERT INTO ` +
        this.taskrunTable +
        ` (task_id,taskrun_num,log_path,record_time) VALUES (?,?,?,?)`;  
        this.db.run(    
            sql,
            [taskId, taskrunNum,logfilepath,recordtime],
            function (err) {
              if (err) {
                throw new Error(
                  err.message + " taskid:" + taskId.toString() + " recordtime:" + recordtime
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
    //get task id by task run number
    public getTaskidbytaskrunNum(taskrunNum: string,callback:Function|undefined|null) {
      const sql = `SELECT id,task_id FROM ` + this.taskrunTable + ` WHERE taskrun_num = ?`;
      // let taskid: number = 0;
      this.db.get(sql, [taskrunNum], (err, row) => {
        if (err) {
          throw new Error(err.message);
        }
        if (row) {
          const taskid = (row as { id:number,task_id: number }).task_id;
          const id = (row as { id:number,task_id: number }).id;
          if(callback){
            callback(id,taskid)
          }
        }
      });
      //return taskid;
    }
    //check task id and task run number exist
    public checkTaskrunExist(taskid:number,taskrunNum:string,callback:Function|undefined|null){
      const sql = `SELECT task_id FROM ` + this.taskrunTable + ` WHERE task_id = ? AND taskrun_num = ?`;
      let exist: boolean = false;
      this.db.get(sql, [taskid,taskrunNum], (err, row) => {
        if (err) {
          throw new Error(err.message);
        }
        if (row) {
          exist = true;
        }
       
          if(callback){
            callback(exist)
          }
        
      });
      //return exist;
    }

}