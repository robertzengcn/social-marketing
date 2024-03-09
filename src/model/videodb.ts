import { Scraperdb } from "./scraperdb";
import { Database } from 'better-sqlite3';
import { VideoInfo } from "@/modules/social_scraper";
import { getRecorddatetime } from "@/modules/lib/function";

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

  /**
   * save video
   * @param url string
   */
  saveVideo(videoinfo: VideoInfo, callback: Function | undefined | null) {
    // saveVideo(url: string, localpath:string,title: string, description: string, language: string) {
    let languageid = 0;
    for (let i = 0; i < this.language.length; i++) {
      if (this.language[i].name == videoinfo.language) {
        languageid = this.language[i].id;
      }
    }
    // const date = new Date();
    const recordtime = getRecorddatetime();
    // const recordtime =
    //   date.getFullYear().toString() +
    //   "-" +
    //   this.pad2(date.getMonth() + 1) +
    //   "-" +
    //   this.pad2(date.getDate()) +
    //   " " +
    //   this.pad2(date.getHours()) +
    //   ":" +
    //   this.pad2(date.getMinutes()) +
    //   ":" +
    //   this.pad2(date.getSeconds());
    const stmt =
      this.db.prepare(`INSERT INTO ` +
        this.videoTable +
        ` (url,localpath,record_time) VALUES (?,?,?)`);

    const component = this;
    const res = stmt.run(videoinfo.url, videoinfo.localpath, recordtime)


    if (res.changes) {
      const videodesc =
        this.db.prepare(`INSERT INTO ` +
          component.videoDescriptionTable +
          ` (video_id,language_id,title,description) VALUES (?,?,?,?)`);
      videodesc.run(
        res.lastInsertRowid, languageid, videoinfo.title, videoinfo.description)

      // if (callback) {
      //   callback(this.lastID)
      // }
    }
  }
  // );

  // this.db.close();
  // }
  /**
   * update the video path which watermark has been remove
   */
  updateVideofilter(videoId: number, filterpath: string) {
    const stmt = this.db.prepare(
      `UPDATE ` + this.videoTable + ` SET filterwatermark = ? WHERE id = ?`);
    stmt.run(filterpath, videoId)
    // if (err) {
    //   throw new Error(err.message);
    // }
    // });
  }
  truncatedb() {
    const sql = `DELETE FROM ` + this.videoTable;
    this.db.exec(sql)

    const videoscsql = `DELETE FROM ` + this.videoDescriptionTable;
    this.db.exec(videoscsql)
  }
}
