import "reflect-metadata";
import { DataSource } from "typeorm";
import { SystemSettingGroupEntity } from "@/entity/SystemSettingGroup.entity";
export class SqliteDb {
    public connection: DataSource;
    private static instance: SqliteDb;
    private constructor(filepath:string) {
        this.connection =new DataSource({
            type: "better-sqlite3",
            database:filepath,
            entities: [SystemSettingGroupEntity],
            synchronize: true, 
            logging: true // use this for debugging
        })
    }
    public static getInstance(filepath:string): SqliteDb {
        if (!SqliteDb.instance) {
            SqliteDb.instance = new SqliteDb(filepath);
        }
        return SqliteDb.instance;
    }
    


}
