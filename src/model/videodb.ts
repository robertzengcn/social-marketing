import { Scraperdb } from "./scraperdb";
import { Database } from "sqlite3";
import { VideoInfo } from "../modules/social_scraper";

export class Videodb {
  db: Database;
  videoTable = "video";
  videoDescriptionTable = "video_description";
  language: Array<{ id: number; name: string }> = [
    { id: 1, name: "en-us" },
    { id: 2, name: "zh-cn" },
  ];
  constructor() {
    const scraperModel = Scraperdb.getInstance();
    this.db = scraperModel.getdb();
  }
  pad2(n: number): string {
    if (n < 10) {
      return "0" + n.toString();
    } else {
      return n.toString();
    }
  }

  /**
   * save video
   * @param url string
   */
  saveVideo(videoinfo: VideoInfo,callback:Function|undefined|null) {
    // saveVideo(url: string, localpath:string,title: string, description: string, language: string) {
    let languageid = 0;
    for (let i = 0; i < this.language.length; i++) {
      if (this.language[i].name == videoinfo.language) {
        languageid = this.language[i].id;
      }
    }
    const date = new Date();
    const recordtime =
      date.getFullYear().toString() +
      "-" +
      this.pad2(date.getMonth() + 1) +
      "-" +
      this.pad2(date.getDate()) +
      " " +
      this.pad2(date.getHours()) +
      ":" +
      this.pad2(date.getMinutes()) +
      ":" +
      this.pad2(date.getSeconds());
    const sql =
      `INSERT INTO ` +
      this.videoTable +
      ` (url,localpath,record_time) VALUES (?,?,?)`;
    const component = this;
    this.db.run(
      sql,
      [videoinfo.url, videoinfo.localpath, recordtime],
      function (err) {
        if (err) {
          throw new Error(
            err.message + " url:" + videoinfo.url + " recordtime:" + recordtime
          );
        }
        if (this.lastID) {
          const sql =
            `INSERT INTO ` +
            component.videoDescriptionTable +
            ` (video_id,language_id,title,description) VALUES (?,?,?,?)`;
          component.db.run(
            sql,
            [this.lastID, languageid, videoinfo.title, videoinfo.description],
            function (err) {
              if (err) {
                throw new Error(err.message);
              }
            }
          );
          if(callback){
            callback(this.lastID)
          }
        }    
      }
    );
    
    // this.db.close();
  }
  /**
   * update the video path which watermark has been remove
   */
  updateVideofilter(videoId: number, filterpath: string) {
    const sql =
      `UPDATE ` + this.videoTable + ` SET filterwatermark = ? WHERE id = ?`;
    this.db.run(sql, [filterpath, videoId], function (err) {
      if (err) {
        throw new Error(err.message);
      }
    });
  }
  truncatedb() {
    const sql = `DELETE FROM ` + this.videoTable;
    this.db.run(sql, [], function (err) {
      if (err) {
        throw new Error(err.message);
      }
    });
    const videoscsql = `DELETE FROM ` + this.videoDescriptionTable;
    this.db.run(videoscsql, [], function (err) {
      if (err) {
        throw new Error(err.message);
      }
    });

    // this.db.close();
  }
}
