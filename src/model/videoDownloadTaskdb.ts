import { Database } from 'better-sqlite3';
import { Scraperdb } from "@/model/scraperdb";
import {VideoDownloadTaskEntity} from "@/entityTypes/videoType"
import { getRecorddatetime } from "@/modules/lib/function";
import {TaskStatus} from "@/entityTypes/commonType";
export class VideoDownloadTaskdb {
    db: Database;
    private videoDownloadTaskTable = "video_download_task";
    constructor(filepath:string) {
        const scraperModel = Scraperdb.getInstance(filepath);
        this.db = scraperModel.getdb();
      }
    public saveVideoDownloadTask(videoDownloadTask:VideoDownloadTaskEntity):number{
      const recordtime = getRecorddatetime(); 
      const stmt = this.db.prepare(`INSERT INTO ${this.videoDownloadTaskTable} (task_name,platform,savepath,record_time,runtime_log,error_log,status) VALUES (?,?,?,?,?,?,?)`);
        const info = stmt.run(
          videoDownloadTask.taskName,
          videoDownloadTask.platform,
          // videoDownloadTask.url,
          videoDownloadTask.savepath,
          recordtime,
          videoDownloadTask.runtime_log?videoDownloadTask.runtime_log:null,
          videoDownloadTask.error_log?videoDownloadTask.error_log:null,
          videoDownloadTask.status?videoDownloadTask.status:0
      );
      return Number(info.lastInsertRowid);
    }

    //update run log
    public updateTasklog(taskId: number, log: string) {
      const stmt = this.db.prepare(
        `UPDATE ` +
        this.videoDownloadTaskTable +
        ` SET runtime_log=? WHERE id=?`
      );
      stmt.run(log, taskId)
    }
     //update error log
     public updateTaskErrorlog(taskId: number, log: string) {
      const stmt = this.db.prepare(
        `UPDATE ` +
        this.videoDownloadTaskTable +
        ` SET error_log=? WHERE id=?`
      );
      stmt.run(log, taskId)
    }
      //get video download task list
      public getVideoDownloadTaskList(page:number,size:number):Array<VideoDownloadTaskEntity>{
        const stmt = this.db.prepare(`SELECT id,task_name as taskName,platform,savepath,record_time,status FROM ${this.videoDownloadTaskTable} ORDER BY id desc LIMIT ?,? `);
        const rows = stmt.all(page,size) as Array<VideoDownloadTaskEntity>;
        return rows;
      }
      //count video download task list
      public countVideoDownloadTaskList():number{
        const stmt = this.db.prepare(`SELECT count(*) as total FROM ${this.videoDownloadTaskTable}`);
        const row = stmt.get() as { total: number };
        return row.total;
      }
      //update video download task status
      public updateVideoDownloadTaskStatus(taskId: number,status:TaskStatus):boolean{
        const stmt = this.db.prepare(
          `UPDATE ` +
          this.videoDownloadTaskTable +
          ` SET status=? WHERE id=?`
        );
        const result=stmt.run(status, taskId)
       return result.changes > 0;
      }
      //get video download task info by id
      public getVideoDownloadTask(taskId:number):VideoDownloadTaskEntity{
        const stmt = this.db.prepare(`SELECT id,task_name as taskName,platform,savepath,record_time,status,error_log,runtime_log FROM ${this.videoDownloadTaskTable} WHERE id=?`);
        const row = stmt.get(taskId) as VideoDownloadTaskEntity;
        return row;
      }
}