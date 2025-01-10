//import { Database } from 'better-sqlite3';
//import { Scraperdb } from "@/model/scraperdb";
import {VideoDownloadEntity,VideoDownloadStatus} from "@/entityTypes/videoType"
import { getRecorddatetime } from "@/modules/lib/function";
import { BaseDb } from "@/model/Basedb";


export class VideoDownloaddb extends BaseDb{
    // db: Database;
    videoDownloadTable = "video_download";
    constructor(filepath:string) {
      super(filepath)
        // const scraperModel = Scraperdb.getInstance(filepath);
        // this.db = scraperModel.getdb();
    }
      public saveVideoDownload(videoDownload:VideoDownloadEntity):number{
        const recordtime = getRecorddatetime(); 
        const stmt = this.db.prepare(`INSERT INTO ${this.videoDownloadTable} (url,savepath,record_time,task_id,error_log,status) VALUES (?,?,?,?,?,?)`);
          const info = stmt.run(
            videoDownload.url,
            videoDownload.savepath,
            recordtime,
            videoDownload.task_id,
            videoDownload.error_log,
            videoDownload.status
        );
        return Number(info.lastInsertRowid);
      } 
      //save log for video download
      public saveVideoDownloadLog(log:string,downloadId:number){
       //update log by downloadId
        const stmt = this.db.prepare(`UPDATE ${this.videoDownloadTable} SET error_log = ? WHERE id = ?`);
        const info = stmt.run(log,downloadId);
        return info.changes;
      } 

      //update download status
      public updateVideoDownloadStatus(status:number,downloadId:number):number{
        //update status by downloadId
        const stmt = this.db.prepare(`UPDATE ${this.videoDownloadTable} SET status = ? WHERE id = ?`);
        const info = stmt.run(status,downloadId);
        return info.changes;
      }
      //get video download list
      public getVideoDownloadList(taskId:number,page:number,size:number,status?:VideoDownloadStatus):Array<VideoDownloadEntity>{
        let query=`SELECT * FROM ${this.videoDownloadTable} WHERE task_id=@taskId`
        if(status){
          query+=` AND status=@status`
        }
        query+=` ORDER BY id desc LIMIT @page,@size`
        const stmt = this.db.prepare(query);
        //const rows = stmt.all(taskId,page,size) as Array<VideoDownloadEntity>;
        const rows=stmt.all({taskId:taskId,page:page,size:size,status:status}) as Array<VideoDownloadEntity>;
        return rows;
      }
      //count video download list
      public countVideoDownloadList(taskId:number,status?:VideoDownloadStatus):number{
        let query=`SELECT count(*) as total FROM ${this.videoDownloadTable} WHERE task_id=@taskId`
        if(status){
          query+=` AND status=@status`
        }
        const stmt = this.db.prepare(query);
        const row=stmt.get({taskId:taskId,status:status}) as { total: number };
        //const row = stmt.get(taskId) as { total: number };
        return row.total;
      }

   
}