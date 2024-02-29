// import { Database } from 'sqlite3';
const Database = require('better-sqlite3');
//const Database = require('better-sqlite3');
// import DatabaseConstructor,{Database}from 'better-sqlite3';
import * as fs from 'fs';
const debug = require("debug")("scraperdb");
const appRoot = require('app-root-path');
import * as path from 'path';

export class Scraperdb {
    private static instance: Scraperdb;
    dbname: string="scraper.db";
    db;
    pathdb=path.resolve(appRoot + "/tmp/db/")

    private constructor() {
        
        // debug(dbpath) 
        // this.dbname = "scraper.db";
        const dbname = this.pathdb + "/" + this.dbname
        // debug(this.dbname)
        this.db = new Database(dbname, { verbose: console.log});
        this.db.pragma('journal_mode = WAL');
    }


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
    getdb(){
        return this.db;
    }
    /**
     * create video table
     */
    createTables() {
        // const dbpath: string = path.resolve(appRoot + "/tmp/db/");

        if (!fs.existsSync(this.pathdb)) {
            fs.mkdirSync(this.pathdb, { recursive: true });
        }
        const videotablepath = path.resolve(appRoot + "/src/sql/scraperdb/");

        fs.readdir(videotablepath, (err, files) => {
            debug(files)
            files.forEach(file => {
                this.db.exec(fs.readFileSync(videotablepath +path.sep+ file, 'utf8').toString());
            });
        });
    }  
}

  
    


