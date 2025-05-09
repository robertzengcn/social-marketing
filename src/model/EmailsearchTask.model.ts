import { BaseDb } from "@/model/Basedb";
import { Repository } from "typeorm";
import { EmailSearchTaskEntity } from "@/entity/EmailSearchTask.entity";
import { EmailsearchTaskEntity, EmailsearchTaskStatus } from "./emailsearchTaskdb";
import { EmailExtractionTypes } from "@/config/emailextraction";
import { SortBy } from "@/entityTypes/commonType";
import { getRecorddatetime } from "@/modules/lib/function";

export class EmailsearchTaskModel extends BaseDb {
    private repository: Repository<EmailSearchTaskEntity>;

    constructor(filepath: string) {
        super(filepath);
        this.repository = this.sqliteDb.connection.getRepository(EmailSearchTaskEntity);
    }

    async createTask(task: EmailsearchTaskEntity): Promise<number> {
        if (!task.record_time) {
            task.record_time = getRecorddatetime();
        }
        const entity = new EmailSearchTaskEntity();
        entity.error_log = task.error_log?task.error_log:"";
        entity.runtime_log = task.runtime_log?task.runtime_log:"";
        entity.record_time = task.record_time;
        entity.type_id = task.type_id;
        entity.status = task.status;

        const savedEntity = await this.repository.save(entity);
        return savedEntity.id;
    }

    async getTaskById(id: number): Promise<EmailsearchTaskEntity | undefined> {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity) return undefined;

        return {
            id: entity.id,
            error_log: entity.error_log,
            runtime_log: entity.runtime_log,
            record_time: entity.record_time,
            type_id: entity.type_id,
            status: entity.status
        };
    }

    async updateTask(task: EmailsearchTaskEntity): Promise<boolean> {
        if (!task.id) {
            throw new Error("Task ID is required for update");
        }

        const entity = await this.repository.findOne({ where: { id: task.id } });
        if (!entity) return false;

        entity.error_log = task.error_log?task.error_log:"";
        entity.runtime_log = task.runtime_log?task.runtime_log:"";
        entity.record_time = task.record_time?task.record_time:"";
        entity.status = task.status;

        const result = await this.repository.save(entity);
        return !!result;
    }

    async deleteTask(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? true : false;
    }

    async updateTaskStatus(id: number, status: EmailsearchTaskStatus): Promise<boolean> {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity) return false;

        entity.status = status;
        const result = await this.repository.save(entity);
        return !!result;
    }

    async updatetasklog(taskId: number, log: string): Promise<boolean> {
        const entity = await this.repository.findOne({ where: { id: taskId } });
        if (!entity) return false;

        entity.error_log = log;
        const result = await this.repository.save(entity);
        return !!result;
    }

    async updateruntimelog(taskId: number, log: string): Promise<boolean> {
        const entity = await this.repository.findOne({ where: { id: taskId } });
        if (!entity) return false;

        entity.runtime_log = log;
        const result = await this.repository.save(entity);
        return !!result;
    }

    async listSearchtask(page: number, size: number, sort?: SortBy): Promise<{ records: EmailsearchTaskEntity[], total: number }> {
        const queryBuilder = this.repository.createQueryBuilder("task");

        if (sort?.key && sort?.order) {
            const lowsersortkey = sort.key.toLowerCase();
            const lowsersortorder = sort.order.toLowerCase();
            const allowsortkey = ['id', 'record_time', 'status'];
            const allowsortorder = ['asc', 'desc'];

            if (!allowsortkey.includes(lowsersortkey)) {
                throw new Error("not allow sort key");
            }
            if (!allowsortorder.includes(lowsersortorder)) {
                throw new Error("not allow sort order");
            }

            queryBuilder.orderBy(`task.${lowsersortkey}`, lowsersortorder.toUpperCase() as 'ASC' | 'DESC');
        } else {
            queryBuilder.orderBy('task.id', 'DESC');
        }

        const [records, total] = await queryBuilder
            .skip(page)
            .take(size)
            .getManyAndCount();

        return {
            records: records.map(entity => ({
                id: entity.id,
                error_log: entity.error_log,
                runtime_log: entity.runtime_log,
                record_time: entity.record_time,
                type_id: entity.type_id,
                status: entity.status
            })),
            total
        };
    }

    async countSearchtask(): Promise<number> {
        return this.repository.count();
    }

    statusConvert(status: EmailsearchTaskStatus): string {
        switch (status) {
            case EmailsearchTaskStatus.Processing:
                return 'Processing';
            case EmailsearchTaskStatus.Complete:
                return 'Complete';
            case EmailsearchTaskStatus.Error:
                return 'Error';
            default:
                return 'Unknown';
        }
    }

    convertType(type: EmailExtractionTypes): string {
        switch (type) {
            case EmailExtractionTypes.ManualInputUrl:
                return 'ManualInputUrl';
            case EmailExtractionTypes.SearchResult:
                return 'SearchResult';
            default:
                return 'Unknown';
        }
    }
} 