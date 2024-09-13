import { Database } from 'better-sqlite3';
import { Scraperdb } from "@/model/scraperdb";
import { getRecorddatetime } from "@/modules/lib/function";
import {EmailExtractionTypes} from "@/config/emailextraction"
export interface EmailsearchTaskEntity {
    id?: number,
    error_log?:string,
    runtime_log?:string,
    record_time?:string,
    type_id: EmailExtractionTypes,
    status: EmailsearchTaskStatus,
}
export enum EmailsearchTaskStatus {
    Processing = 1,
    Complete = 2,
    Error = 3
  }
export class EmailsearchTaskdb {
    db: Database;
    emailsearchtaskTable = "emailsearch_task";
    constructor(filepath:string) {
        const scraperModel = Scraperdb.getInstance(filepath);
        this.db = scraperModel.getdb();
    }
    //create task
    createTask(task: EmailsearchTaskEntity): number {
        if(!task.record_time){
            task.record_time = getRecorddatetime();
        }
        const stmt = this.db.prepare(`
            INSERT INTO ${this.emailsearchtaskTable} (error_log, runtime_log, record_time,type_id, status)
        VALUES (?, ?, ?, ?, ?)
        `);
        const result = stmt.run(task.error_log, task.runtime_log, task.record_time, task.type_id,task.status);
        return Number(result.lastInsertRowid);
    }
    //get task by id
    getTaskById(id: number): EmailsearchTaskEntity | undefined {
        const stmt = this.db.prepare(`
            SELECT * FROM ${this.emailsearchtaskTable} WHERE id = ?
        `);
        const result = stmt.get(id) as EmailsearchTaskEntity;
        // if(result&&result.id){
        //     return result;
        // }
        return result&&result.id ? result : undefined;
    }
    //update task
    updateTask(task: EmailsearchTaskEntity): boolean {
        const stmt = this.db.prepare(`
            UPDATE ${this.emailsearchtaskTable}
            SET error_log = ?, runtime_log = ?, record_time = ?, status = ?
            WHERE id = ?
        `);
        const result = stmt.run(task.error_log, task.runtime_log, task.record_time, task.status, task.id);
        return result.changes > 0;
    }
    //delete task
    deleteTask(id: number): boolean {
        const stmt = this.db.prepare(`
            DELETE FROM ${this.emailsearchtaskTable} WHERE id = ?
        `);
        const result = stmt.run(id);
        return result.changes > 0;
    }
    //update task status
    updateTaskStatus(id: number, status: EmailsearchTaskStatus): boolean {
        const stmt = this.db.prepare(`
            UPDATE ${this.emailsearchtaskTable}
            SET status = ?
            WHERE id = ?
        `);
        const result = stmt.run(status, id);
        return result.changes > 0;
    }
     //update task error log path
  public updatetasklog(taskId: number, log: string) {
    const stmt = this.db.prepare(
      `UPDATE 
      ${this.emailsearchtaskTable} 
       SET error_log=? WHERE id=?`
    );
    stmt.run(log, taskId)
  }
  //update task runtime log path
  public updateruntimelog(taskId: number, log: string) {
    const stmt = this.db.prepare(
      `UPDATE 
      ${this.emailsearchtaskTable}
       SET runtime_log=? WHERE id=?`
    );
    stmt.run(log, taskId)
  }
}