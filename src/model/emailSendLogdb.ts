import { Database } from 'better-sqlite3';
import { Scraperdb } from "@/model/scraperdb";
// import { getRecorddatetime } from "@/modules/lib/function";
export interface EmailSendLogEntity {
    Id:number,
    TaskId:number,
    Receiver:String,
    Status:String,
Title:String,
content:String,
recordTime:String
}