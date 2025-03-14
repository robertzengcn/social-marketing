import "reflect-metadata";
import { DataSource } from "typeorm";
import { SystemSettingGroupEntity } from "@/entity/SystemSettingGroup.entity";
import {SystemSettingEntity} from "@/entity/SystemSetting.entity"
import {SystemSettingOptionEntity} from "@/entity/SystemSettingOption.entity"
import {AccountCookies} from "@/entity/AccountCookies.entity"
import {BuckemailTask} from "@/entity/BuckemailTask.entity"
import {VideoCaptionEntity} from "@/entity/VideoCaption.entity"
import {VideoDescriptionEntity} from "@/entity/VideoDescription.entity"
import {VideoDownloadEntity} from "@/entity/VideoDownload.entity"
import {VideoDownloadTaskEntity} from "@/entity/VideoDownloadTask.entity"
import {VideoDownloadTaskAccountsEntity} from "@/entity/VideoDownloadTaskAccounts.entity"
import {VideoDownloadTaskDetailEntity} from "@/entity/VideoDownloadTaskDetail.entity"
import {VideoDownloadTaskProxyEntity} from "@/entity/VideoDownloadTaskProxy.entity"
import {VideoDownloadTaskUrlsEntity} from "@/entity/VideoDownloadTaskUrls.entity"
import {VideoDownloadTagEntity} from "@/entity/VideoDownloadTag.entity"
import path from "node:path";
export class SqliteDb {
    public connection: DataSource;
    private static instance: SqliteDb;
    private constructor(filepath:string) {
        if(filepath.length>0){
        this.connection =new DataSource({
            type: "better-sqlite3",
            database:path.join(filepath,'scraper.db'),
            entities: [AccountCookies,BuckemailTask,SystemSettingGroupEntity,
                SystemSettingEntity,SystemSettingOptionEntity,VideoCaptionEntity,VideoDescriptionEntity,
                VideoDownloadEntity,VideoDownloadTaskEntity,VideoDownloadTaskAccountsEntity,
                VideoDownloadTaskDetailEntity,VideoDownloadTaskProxyEntity,VideoDownloadTaskUrlsEntity,VideoDownloadTagEntity
            ],
            synchronize: true, 
            migrations: [],
            subscribers: [],
            logging: true // use this for debugging
        })
    }

    }
    public static getInstance(filepath:string): SqliteDb {

        if (!SqliteDb.instance) {
            SqliteDb.instance = new SqliteDb(filepath);
            // await SqliteDb.instance.checkConnection();
        }
        return SqliteDb.instance;
    }

    protected async checkConnection() {
        try {
            if (!this.connection.isInitialized) {
                await this.connection.initialize();
            }
        } catch (error) {
            console.error('Database connection failed:', error);
            throw new Error('Failed to initialize database connection');
        }
    }

    


}
