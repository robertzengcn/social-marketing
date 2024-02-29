// import { Database } from 'sqlite3';
import { Scraperdb } from "@/model/scraperdb";
import {getRecorddatetime} from "@/modules/lib/function";
import {Database} from 'better-sqlite3';

export class Taskrundb {
    db: Database;
    taskrunTable = "task_run"; 
    constructor() {
      // this.db = new Database('foobar.db');
        const scraperModel = Scraperdb.getInstance();
        this.db = scraperModel.getdb();
    }

    public saveTaskrun(taskId:number,taskrunNum:string,logfilepath:string,callback:Function|undefined|null){
        const recordtime =getRecorddatetime();
        const stmt = this.db.prepare(
        `INSERT INTO ` +
        this.taskrunTable +
        ` (task_id,taskrun_num,log_path,record_time) VALUES (?,?,?,?)`);  
        const info = stmt.run(     
            taskId, taskrunNum,logfilepath,recordtime);
            
          
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
    public async getTaskrunlist(taskId:number,callback:Function|undefined|null){
      const sql = `SELECT id,task_id,taskrun_num,log_path, record_time FROM ` + this.taskrunTable + ` WHERE task_id = ?`;
      this.db.all(sql, [taskId], (err, rows) => {
        if (err) {
          throw new Error(err.message);
        }
        if(callback){
          return callback(rows)
        }
      });
    }

}