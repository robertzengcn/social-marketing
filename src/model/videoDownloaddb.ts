import { Database } from 'better-sqlite3';
import { Scraperdb } from "@/model/scraperdb";
import {videoDownloadEntity} from "@/entityTypes/videoType"
import { getRecorddatetime } from "@/modules/lib/function";

export enum DownloadStatus {
  Notstart = 0,
  Start = 1,
  Finish = 2,
  Error=3
}

export class VideoDownloaddb {
    db: Database;
    videoDownloadTable = "video_download";
    constructor() {
        const scraperModel = Scraperdb.getInstance();
        this.db = scraperModel.getdb();
      }
      public saveVideoDownload(videoDownloadTask:videoDownloadEntity){
        const recordtime = getRecorddatetime(); 
        const stmt = this.db.prepare(`INSERT INTO ${this.videoDownloadTable} (url,savepath,record_time,status) VALUES (?,?,?,?)`);
          const info = stmt.run(
            videoDownloadTask.url,
            videoDownloadTask.savepath,
            recordtime,
            videoDownloadTask.status
        );
        return info.lastInsertRowid;
      } 
      //save log for video download
      public saveVideoDownloadLog(log:string,downloadId:number){
       //update log by downloadId
        const stmt = this.db.prepare(`UPDATE ${this.videoDownloadTable} SET log = ? WHERE id = ?`);
        const info = stmt.run(log,downloadId);
        return info.changes;
      } 

      //update download status
      public updateVideoDownloadStatus(status:number,downloadId:number){
        //update status by downloadId
        const stmt = this.db.prepare(`UPDATE ${this.videoDownloadTable} SET status = ? WHERE id = ?`);
        const info = stmt.run(status,downloadId);
        return info.changes;
      }
      //get video download list
      public getVideoDownloadList(page:number,size:number):Array<videoDownloadEntity>{
        const stmt = this.db.prepare(`SELECT * FROM ${this.videoDownloadTable} ORDER BY id desc LIMIT ?,? `);
        const rows = stmt.all(page,size) as Array<videoDownloadEntity>;
        return rows;
      }
      //count video download list
      public countVideoDownloadList():number{
        const stmt = this.db.prepare(`SELECT count(*) as total FROM ${this.videoDownloadTable}`);
        const row = stmt.get() as { total: number };
        return row.total;
      }
}