import { Database } from 'better-sqlite3';
import { Scraperdb } from "@/model/scraperdb";
import { getRecorddatetime } from "@/modules/lib/function";

export interface EmailsearchResultEntity {
    id?: number,
    task_id: number,
    url: string,
    title?: string,
    // email: string,
    record_time?: string
}
export class EmailsearchResultdb {
    db: Database;
    emailsearchtaskTable = "emailsearch_result";
    constructor(filepath:string) {
        const scraperModel = Scraperdb.getInstance(filepath);
        this.db = scraperModel.getdb();
    }
    create(emailsearchResult: EmailsearchResultEntity): number {
        if(!emailsearchResult.record_time){
            emailsearchResult.record_time = getRecorddatetime();
        }
        const stmt = this.db.prepare(`
            INSERT INTO ${this.emailsearchtaskTable} (task_id, url, title, record_time)
            VALUES (@task_id, @url, @title, @record_time)
        `);
        const result = stmt.run(emailsearchResult);
        return Number(result.lastInsertRowid);
    }

    read(id: number): EmailsearchResultEntity | undefined {
        const stmt = this.db.prepare(`
            SELECT * FROM ${this.emailsearchtaskTable} WHERE id = ?
        `);
        const result = stmt.get(id) as EmailsearchResultEntity;
        return result;
    }

    update(id: number, emailsearchResult: EmailsearchResultEntity): boolean {
        const stmt = this.db.prepare(`
            UPDATE ${this.emailsearchtaskTable}
            SET task_id = @task_id, url = @url, title = @title, record_time = @record_time
            WHERE id = ?
        `);
        const result = stmt.run({ ...emailsearchResult, id });
        return result.changes > 0;
    }

    delete(id: number): boolean {
        const stmt = this.db.prepare(`
            DELETE FROM ${this.emailsearchtaskTable} WHERE id = ?
        `);
        const result = stmt.run(id);
        return result.changes > 0;
    }
}