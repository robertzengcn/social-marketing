
import { Database } from 'better-sqlite3';
import { Scraperdb } from "@/model/scraperdb";
import { getRecorddatetime, getStatusName } from "@/modules/lib/function";
// import { TaskStatus } from "@/config/common"
export enum SendStatus {
    Success = 1,
    Failure = 0,
  }
export interface EmailMarketingSendLogEntity {
    id?: number;
    status:SendStatus;
    task_id: number;
    receiver: string;
    title: string;
    content: string;
    record_time?: string;
    log?:string;
}

export class EmailMarketingSendLogdb {
    db: Database;
    constructor(filepath: string) {
        const scraperModel = Scraperdb.getInstance(filepath);
        this.db = scraperModel.getdb();
    }
    create(task: EmailMarketingSendLogEntity): number {
        const stmt = this.db.prepare(`
            INSERT INTO email_marketing_send_log (status,task_id, receiver, title, content, record_time,log)
            VALUES (@status,@task_id, @receiver, @title, @content, @record_time,@log)
        `);
        const info = stmt.run({
            status:task.status,
            task_id: task.task_id,
            receiver: task.receiver,
            title: task.title,
            content: task.content,
            record_time: task.record_time || getRecorddatetime(),
            log:task.log||""
        });
        return info.lastInsertRowid as number;
    }
    read(id: number): EmailMarketingSendLogEntity | undefined {
        const stmt = this.db.prepare(`
            SELECT * FROM email_marketing_send_log WHERE id = ?
        `);
        return stmt.get(id) as EmailMarketingSendLogEntity | undefined;
    }
    update(id: number, task: EmailMarketingSendLogEntity): void {
        const stmt = this.db.prepare(`
            UPDATE email_marketing_send_log
            SET status=@status,task_id = @task_id, receiver = @receiver, title = @title, content = @content, record_time = @record_time,log=@log
            WHERE id = @id
        `);
        stmt.run({
            id: id,
            status:task.status,
            task_id: task.task_id,
            receiver: task.receiver,
            title: task.title,
            content: task.content,
            record_time: task.record_time || getRecorddatetime(),
            log:task.log||""
        });
    }
    delete(id: number): void {
        const stmt = this.db.prepare(`
            DELETE FROM email_marketing_send_log WHERE id = ?
        `);
        stmt.run(id);
    }
}