import { BaseDb } from "@/model/Basedb";

import {VideoDownloadTaskDetailEntity} from "@/entityTypes/videoType"


export class VideoDownloadTaskDetaildb extends BaseDb{

    private table = "video_download_task_detail";
    constructor(filepath:string) {
        super(filepath)
        // const scraperModel = Scraperdb.getInstance(filepath);
        // this.db = scraperModel.getdb();
    }
    create(vdte: VideoDownloadTaskDetailEntity): number {

        const stmt = this.db.prepare("INSERT INTO "+this.table+" (task_id, download_type,cookies_type,browser_type) VALUES (?, ?,?,?)");
        const res = stmt.run(vdte.task_id, vdte.download_type,vdte.cookies_type,vdte.browser_type);
        return res.lastInsertRowid as number;
    }

    read(id: number): VideoDownloadTaskDetailEntity {
        // return await this.db.get<VideoDownloadTaskAccountEntity>("SELECT * FROM VideoDownloadTaskAccounts WHERE id = ?", id);
           const stmt = this.db.prepare(
              `SELECT * FROM ` + this.table + ` WHERE id = ?`);
            const res = stmt.get(id) as VideoDownloadTaskDetailEntity;
            return res;
    }

    update(id: number, vdte: VideoDownloadTaskDetailEntity): void {
        const stmt = this.db.prepare(`
            UPDATE ${this.table}
            SET task_id=@task_id,download_type = @download_type,cookies_type=@cookies_type,browser_type=@browser_type
            WHERE id = @id
        `);
        stmt.run({
            id: id,
            task_id: vdte.task_id,
            download_type: vdte.download_type,
            cookies_type:vdte.cookies_type,
            browser_type:vdte.browser_type
        })
    }

    delete(id: number): void {
        const stmt = this.db.prepare(`
            DELETE FROM ${this.table} WHERE id = ?
        `);
        stmt.run(id);
    }

    //query item id by task id
    public getByTaskId(taskId: number): VideoDownloadTaskDetailEntity {
        const stmt = this.db.prepare(
            `SELECT * FROM ` + this.table + ` WHERE task_id = ?`
        );
        const account = stmt.get(taskId) as VideoDownloadTaskDetailEntity;
        return account;
    }



}