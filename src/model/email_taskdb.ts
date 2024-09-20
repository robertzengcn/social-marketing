import { Database } from 'better-sqlite3';
import { Scraperdb } from "@/model/scraperdb";
import { getRecorddatetime } from "@/modules/lib/function";
export interface EmailTaskdbEntity {
    id?: number;
    account_id: number;
    cookies: string;
    partition_path: string;
    record_time?: string;   
}