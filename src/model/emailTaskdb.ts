import { Database } from 'better-sqlite3';
import { Scraperdb } from "@/model/scraperdb";
import { getRecorddatetime } from "@/modules/lib/function";
export enum EmailTaskStatus {
    Processing = 1,
    Complete = 2,
    Error = 3
  }
export interface EmailTaskdbEntity {
    id?: number;
    status: EmailTaskStatus;
    record_time?: string;   
}

export class EmailTaskdb {
    db: Database;
    constructor(filepath:string) {
        const scraperModel = Scraperdb.getInstance(filepath);
        this.db = scraperModel.getdb();
    }
    createTask(task: EmailTaskdbEntity): number {
        const stmt = this.db.prepare(`
            INSERT INTO email_tasks (status, record_time)
            VALUES (?, ?)
        `);
        const info = stmt.run(task.status, task.record_time || getRecorddatetime());
        return info.lastInsertRowid as number;
    }

    getTaskById(id: number): EmailTaskdbEntity | null {
        const stmt = this.db.prepare(`
            SELECT * FROM email_tasks WHERE id = ?
        `);
        return stmt.get(id) as EmailTaskdbEntity | null;
    }

    updateTask(task: EmailTaskdbEntity): void {
        if (!task.id) {
            throw new Error("Task ID is required for update");
        }
        const stmt = this.db.prepare(`
            UPDATE email_tasks
            SET status = ?, record_time = ?
            WHERE id = ?
        `);
        stmt.run(task.status, task.record_time || getRecorddatetime(), task.id);
    }

    deleteTask(id: number): void {
        const stmt = this.db.prepare(`
            DELETE FROM email_tasks WHERE id = ?
        `);
        stmt.run(id);
    }
    updateTaskStatus(id: number, status: EmailTaskStatus): void {
        const stmt = this.db.prepare(`
            UPDATE email_tasks
            SET status = ?
            WHERE id = ?
        `);
        stmt.run(status, id);
    }
    getStatusName(status: EmailTaskStatus): string {
        switch (status) {
            case EmailTaskStatus.Processing:
                return "Processing";
            case EmailTaskStatus.Complete:
                return "Complete";
            case EmailTaskStatus.Error:
                return "Error";
            default:
                throw new Error("Invalid status");
        }
    }
}
