import { Database } from 'better-sqlite3';
import { Scraperdb } from "@/model/scraperdb";
import {videoDownloadTaskEntity} from "@/entityTypes/videoType"
import { getRecorddatetime } from "@/modules/lib/function";

export class VideoDownloadTaskdb {
    db: Database;
    private videoDownloadTaskTable = "video_download_task";
    constructor() {
        const scraperModel = Scraperdb.getInstance();
        this.db = scraperModel.getdb();
      }
    public saveVideoDownloadTask(videoDownloadTask:videoDownloadTaskEntity){
      const recordtime = getRecorddatetime(); 
      const stmt = this.db.prepare(`INSERT INTO ${this.videoDownloadTaskTable} (platform,url,savepath,record_time) VALUES (?,?,?,?)`);
        const info = stmt.run(
          videoDownloadTask.platform,
          videoDownloadTask.url,
          videoDownloadTask.savepath,
          recordtime
      );
      return info.lastInsertRowid;
    }
}