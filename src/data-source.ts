import "reflect-metadata"
import { DataSource } from "typeorm"
import { VideoPublishRecordEntity } from "./entity/VideoPublishRecord.entity"
import { VideoDownloadEntity } from "./entity/VideoDownload.entity"
import path from "path"

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: path.join(process.cwd(), 'scraper.db'),
    entities: [VideoPublishRecordEntity, VideoDownloadEntity],
    synchronize: true,
    logging: process.env.NODE_ENV !== 'production',
    migrations: [],
    subscribers: [],
}) 