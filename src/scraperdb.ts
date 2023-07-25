import { Database } from 'sqlite3';
import * as fs from 'fs';
const debug = require("debug")("scraperdb");
const appRoot = require('app-root-path');
import * as path from 'path';
// import { use } from 'chai';
// import * as e from 'express';

// const db = new sqlite3.Database('socialmarket.db');

// module.exports = {
//     db: db,
// };

export class Scraperdb {
    private static instance: Scraperdb;
    dbname: string;
    db: Database;
    pathdb: string;
    language: Array<{ id: number, name: string }> = [{ id: 1, name: "en-us" }, { id: 2, name: "zh-cn" }];
    videoTable: string = "video";
    videoDescriptionTable: string = "video_description";
    private constructor() {
        const dbpath: string = path.resolve(appRoot + "/tmp/db/");
        // debug(dbpath)
        if (!fs.existsSync(dbpath)) {
            fs.mkdirSync(dbpath, { recursive: true });
        }
        this.dbname = "scraper.db";
        this.pathdb = dbpath + "/" + this.dbname
        // debug(this.dbname)
        this.db = new Database(this.pathdb, (err) => {
            if (err) {
                // console.log("Getting error " + err);
                throw new Error("Getting error " + err);
            }
        });
    }
    // deconstructor() {
    //     this.db.close();
    // }

    public static getInstance(): Scraperdb {
        if (!Scraperdb.instance) {
            Scraperdb.instance = new Scraperdb();
        }
        return Scraperdb.instance;
    }
    init() {
        this.createTables();

    }
    /**
     * create video table
     */
    createTables() {
        const videotablepath = __dirname + "/sql/scraperdb/";

        fs.readdir(videotablepath, (err, files) => {
            debug(files)
            files.forEach(file => {
                this.db.exec(fs.readFileSync(videotablepath + file).toString());
            });
        });
    }
    pad2(n: number): string {
        if (n < 10) {
            return '0' + n.toString()
        } else {
            return n.toString()
        }
    }
    /**
     * save video
     * @param url string
     */
    saveVideo(url: string, localpath:string,title: string, description: string, language: string) {
        let languageid: number = 0;
        for (let i = 0; i < this.language.length; i++) {
            if (this.language[i].name == language) {
                languageid = this.language[i].id;
            }
        }
        var date = new Date();
        const recordtime = date.getFullYear().toString() +"-"+ this.pad2(date.getMonth() + 1)+"-"+ this.pad2(date.getDate())+" " + this.pad2(date.getHours()) +":"+ this.pad2(date.getMinutes())+":" + this.pad2(date.getSeconds());
        const sql = `INSERT INTO ` + this.videoTable + ` (url,localpath,record_time) VALUES (?,?,?)`;
        const component = this;
        this.db.run(sql, [url, localpath,recordtime], function (err) {
            if (err) {
                throw new Error(err.message+" url:"+url+" recordtime:"+recordtime);
            }
            if (this.lastID) {
                const sql = `INSERT INTO `+component.videoDescriptionTable+` (video_id,language_id,title,description) VALUES (?,?,?,?)`;
                component.db.run(sql, [this.lastID, languageid, title, description], function (err) {
                    if (err) {
                        throw new Error(err.message);
                    }
                });
            }
        });
        // this.db.close();
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

  
    


