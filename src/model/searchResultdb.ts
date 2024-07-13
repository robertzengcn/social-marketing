import { Database } from 'better-sqlite3';
import { getRecorddatetime } from "@/modules/lib/function";
import { Scraperdb } from "@/model/scraperdb";
import {SearchResEntity} from "@/entityTypes/scrapeType"
export class SearchResultdb {
    db: Database;
    searchResultTable = "search_result";
    constructor(filepath:string) {
        const scraperModel = Scraperdb.getInstance(filepath);
        this.db = scraperModel.getdb();
    }
    //save search task
    public saveResult(data:SearchResEntity): number | bigint {
        const recordtime = getRecorddatetime();
        const stmt = this.db.prepare(
            `INSERT INTO ` +
            this.searchResultTable +
            `(keyword_id,link,title,snippet,visible_link,record_time) VALUES (?,?,?,?,?,?)`
        );
        const info = stmt.run(
            data.keywordId,
            data.link,
            data.title,
            data.snippet,
            data.visible_link,
            recordtime
        );
        return info.lastInsertRowid;
    }

}