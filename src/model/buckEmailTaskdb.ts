
import { Database } from 'better-sqlite3';
import { Scraperdb } from "@/model/scraperdb";
import { getRecorddatetime } from "@/modules/lib/function";
import {TaskStatus} from "@/config/common"
export interface BuckemailEntity {
    id?: number;
    type: BuckEmailType;
    record_time?: string;
    status?: TaskStatus;   
}

export enum BuckEmailType {
    EXTRACTEMAIL = 1,
  }
export class BuckEmailTaskdb {
    db: Database;
    constructor(filepath:string) {
        const scraperModel = Scraperdb.getInstance(filepath);
        this.db = scraperModel.getdb();
    }
    create(task: BuckemailEntity): number {
        const stmt = this.db.prepare(`
            INSERT INTO buckemail (type, status,record_time)
            VALUES (@type,@status, @record_time)
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

    update(task: BuckemailEntity): void {
        const stmt = this.db.prepare(`
            UPDATE buckemail
            SET type = @type, record_time = @record_time,status = @status
            WHERE id = @id
        `);
        stmt.run({
            id: task.id,
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
}