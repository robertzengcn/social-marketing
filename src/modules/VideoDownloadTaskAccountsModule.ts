// import { Token } from "@/modules/token"
// import { USERSDBPATH } from '@/config/usersetting';
import { VideoDownloadTaskAccountsdb } from "@/model/VideoDownloadTaskAccountsdb"
import {VideoDownloadTaskAccountEntity} from "@/entityTypes/videoType"
// import { VideoDownloadTaskEntity } from "@/entityTypes/videoType"
// import {TaskStatus} from "@/entityTypes/commonType"
import { BaseModule } from "@/modules/baseModule";
export class VideoDownloadTaskAccountsModule extends BaseModule {
    // private dbpath: string
    private videoDownloadTaskAccountdb: VideoDownloadTaskAccountsdb
    constructor() {
        super()
        // const tokenService = new Token()
        // const dbpath = tokenService.getValue(USERSDBPATH)
        // if (!dbpath) {
        //     throw new Error("user path not exist")
        // }
        // this.dbpath = dbpath
        this.videoDownloadTaskAccountdb = new VideoDownloadTaskAccountsdb(this.dbpath)
    }

    create(vdte: VideoDownloadTaskAccountEntity): number {
   
          return this.videoDownloadTaskAccountdb.create(vdte);
       }
   
       read(id: number): VideoDownloadTaskAccountEntity {
          
            return this.videoDownloadTaskAccountdb.read(id);
       }
   
       update(id: number, taskAccount: VideoDownloadTaskAccountEntity): void {
        this.videoDownloadTaskAccountdb.update(id, taskAccount);
       }
   
       delete(id: number): void {
        //    const stmt = this.db.prepare(`
        //        DELETE FROM ${this.table} WHERE id = ?
        //    `);
        //    stmt.run(id);
        this.videoDownloadTaskAccountdb.delete(id);
       }
   
       //query account id by task id
       public getAccountByTaskId(taskId: number): Array<VideoDownloadTaskAccountEntity> {
        return this.videoDownloadTaskAccountdb.getAccountByTaskId(taskId);
       }
   

}