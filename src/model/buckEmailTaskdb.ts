
import { Database } from 'better-sqlite3';
import { Scraperdb } from "@/model/scraperdb";
import { getRecorddatetime, getStatusName } from "@/modules/lib/function";
import { TaskStatus } from "@/config/common"
export interface BuckemailEntity {
    id?: number;
    type: BuckEmailType;
    record_time?: string;
    log_file: string;
    error_file: string;
    status?: TaskStatus;
}

export enum BuckEmailType {
    EXTRACTEMAIL = 1,
}
export class BuckEmailTaskdb {
    db: Database;
    constructor(filepath: string) {
        const scraperModel = Scraperdb.getInstance(filepath);
        this.db = scraperModel.getdb();
    }
    create(task: BuckemailEntity): number {
        const stmt = this.db.prepare(`
            INSERT INTO buckemail (type, status,record_time,log_file,error_file)
            VALUES (@type,@status, @record_time,@log_file,@error_file)
        `);
        const info = stmt.run({
            type: task.type,
            status: task.status || TaskStatus.Processing,
            record_time: task.record_time || getRecorddatetime()
        });
        return info.lastInsertRowid as number;
    }

    read(id: number): BuckemailEntity | undefined {
        const stmt = this.db.prepare(`
            SELECT * FROM buckemail WHERE id = ?
        `);
        return stmt.get(id) as BuckemailEntity | undefined;
    }
    //update buck email task
    update(id: number, task: BuckemailEntity): void {
        const stmt = this.db.prepare(`
            UPDATE buckemail
            SET type = @type, record_time = @record_time,status = @status
            WHERE id = @id
        `);
        stmt.run({
            id: id,
            type: task.type,
            record_time: task.record_time || getRecorddatetime(),
            status: task.status
        });
    }

    delete(id: number): void {
        const stmt = this.db.prepare(`
            DELETE FROM buckemail WHERE id = ?
        `);
        stmt.run(id);
    }
    //get buck email status
    public getBuckEmailStatusName(taskStatus: TaskStatus): String {
        return getStatusName(taskStatus)
    }
    public updateTaskLogfile(id: number, runtimeLog: string, errorLog: string) {
        const stmt = this.db.prepare(`
            UPDATE buckemail
            SET log_file = @log_file, error_file = @error_file
            WHERE id = @id
        `);
        stmt.run({
            id: id,
            log_file: runtimeLog,
            error_file: errorLog
        });
    }
    //update task log status
    updateTaskStatus(id: number, status: TaskStatus) {
        const stmt = this.db.prepare(`
            UPDATE buckemail
            SET status = @status
            WHERE id = @id
        `);
        stmt.run({
            id: id,
            status: status
        });
    }
}