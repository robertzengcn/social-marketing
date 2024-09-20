import { Database } from 'better-sqlite3';
import { Scraperdb } from "@/model/scraperdb";


export enum EmailTaskType {
    Filter = 1,
    Template = 2,
    Setting = 3
  }
export interface EmailTaskDetaildbEntity {
    id?: number;
    task_id: number;
    type: EmailTaskType;
    value: number;   
}
export class EmailTaskDetaildb {
    db: Database;
    constructor(filepath:string) {
        const scraperModel = Scraperdb.getInstance(filepath);
        this.db = scraperModel.getdb();
    }
    create(emailTaskDetail: EmailTaskDetaildbEntity): number {
        const stmt = this.db.prepare(`
            INSERT INTO email_task_details (task_id, type, value)
            VALUES (?, ?, ?)
        `);
        const info = stmt.run(emailTaskDetail.task_id, emailTaskDetail.type, emailTaskDetail.value);
        return info.lastInsertRowid as number;
    }

    read(id: number): EmailTaskDetaildbEntity | null {
        const stmt = this.db.prepare(`
            SELECT * FROM email_task_details WHERE id = ?
        `);
        return stmt.get(id) as EmailTaskDetaildbEntity | null;
    }

    update(emailTaskDetail: EmailTaskDetaildbEntity): number {
        const stmt = this.db.prepare(`
            UPDATE email_task_details
            SET task_id = ?, type = ?, value = ?
            WHERE id = ?
        `);
        const info = stmt.run(emailTaskDetail.task_id, emailTaskDetail.type, emailTaskDetail.value, emailTaskDetail.id);
        return info.changes;
    }

    delete(id: number): number {
        const stmt = this.db.prepare(`
            DELETE FROM email_task_details WHERE id = ?
        `);
        const info = stmt.run(id);
        return info.changes;
    }
}