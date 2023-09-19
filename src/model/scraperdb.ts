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
    //get database
    getdb(): Database {
        return this.db;
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
   
  

    
    

}

  
    


