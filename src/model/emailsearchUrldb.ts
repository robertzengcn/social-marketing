import { Database } from 'better-sqlite3';
import { Scraperdb } from "@/model/scraperdb";
// import { getRecorddatetime } from "@/modules/lib/function";
export interface EmailsearchUrlEntity {
    id?: number,
    taskId:number,
    url:string,
}
export class EmailsearchUrldb {
    db: Database;
    emailsearchurlTable = "emailsearch_url";
    constructor(filepath:string) {
        const scraperModel = Scraperdb.getInstance(filepath);
        this.db = scraperModel.getdb();
    }
    create(emailsearchUrl: EmailsearchUrlEntity): number {
        const stmt = this.db.prepare(`
            INSERT INTO ${this.emailsearchurlTable} (taskId, url)
            VALUES (@taskId, @url)
        `);
        const result = stmt.run(emailsearchUrl);
        return Number(result.lastInsertRowid);
    }

    read(id: number): EmailsearchUrlEntity | undefined|null {
        const stmt = this.db.prepare(`
            SELECT * FROM ${this.emailsearchurlTable}
            WHERE id = @id
        `);
        const result = stmt.get({ id }) as EmailsearchUrlEntity;
        if(result && result.id) {
        return result;
        }else{
            return null;
        }
    }

    update(emailsearchUrl: EmailsearchUrlEntity): boolean {
        const stmt = this.db.prepare(`
            UPDATE ${this.emailsearchurlTable}
            SET taskId = @taskId, url = @url
            WHERE id = @id
        `);
        const result = stmt.run(emailsearchUrl);
        return result.changes > 0;
    }

    delete(id: number): boolean {
        const stmt = this.db.prepare(`
            DELETE FROM ${this.emailsearchurlTable}
            WHERE id = @id
        `);
        const result = stmt.run({ id });
        return result.changes > 0;
    }

}