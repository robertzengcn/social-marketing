import { Token } from "@/modules/token"
import { USERSDBPATH } from '@/config/usersetting';
import { BuckemailEntity, BuckEmailType } from "@/model/buckEmailTaskdb"
import { BuckEmailTaskModel } from "@/model/BuckEmailTask.model"
import {TaskStatus} from "@/entityTypes/commonType"
import { SortBy } from "@/entityTypes/commonType"
import { BaseModule } from "@/modules/baseModule";
import { BuckemailTaskEntity } from "@/entity/BuckemailTask.entity";

export class BuckEmailTaskModule extends BaseModule{
    //private dbpath: string
    private buckEmailTaskModel: BuckEmailTaskModel
    constructor() {
    // const tokenService = new Token()
    // const dbpath = tokenService.getValue(USERSDBPATH)
    // if (!dbpath) {
    //     throw new Error("user path not exist")
    // }
    super();
    // this.dbpath = dbpath
    this.buckEmailTaskModel = new BuckEmailTaskModel(this.dbpath);
    }
    /**
     * Create a new buck email task
     * @param task The buck email task entity
     * @returns The ID of the created task
     */
    async create(task: BuckemailEntity): Promise<number> {
        return await this.buckEmailTaskModel.create(task);
    }
    /**
     * Get a buck email task by ID
     * @param id The task ID
     * @returns The buck email task entity
     */
    async read(id: number): Promise<BuckemailEntity | undefined> {
        return await this.buckEmailTaskModel.read(id);
    }
    /**
     * Update a buck email task
     * @param id The task ID
     * @param task The buck email task entity to update
     */
    async update(id: number, task: BuckemailEntity): Promise<void> {
        return await this.buckEmailTaskModel.update(id, task);
    }
    /**
     * Delete a buck email task
     * @param id The task ID
     */
    async delete(id: number): Promise<void> {
        return await this.buckEmailTaskModel.delete(id);
    }
    /**
     * Update task log files
     * @param id The task ID
     * @param runtimeLog The runtime log content
     * @param errorLog The error log content
     */
    async updateTaskLogfile(id: number, runtimeLog: string, errorLog: string): Promise<void> {
        return await this.buckEmailTaskModel.updateTaskLogfile(id, runtimeLog, errorLog);
    }
    /**
     * Update task status
     * @param id The task ID
     * @param status The new status
     */
    async updateTaskStatus(id: number, status: TaskStatus): Promise<void> {
        return await this.buckEmailTaskModel.updateTaskStatus(id, status);
    }
    /**
     * List buck email tasks with pagination and sorting
     * @param page Page number (offset)
     * @param size Page size (limit)
     * @param sort Sort parameters (optional)
     * @returns Array of buck email task entities
     */
    async listBuckEmailTasks(page: number, size: number, sort?: SortBy): Promise<BuckemailEntity[]> {
        return await this.buckEmailTaskModel.listBuckEmailtask(page, size, sort);
    }
    /**
     * Get total number of buck email tasks
     * @returns Total count of tasks
     */
    async countBuckEmailTasks(): Promise<number> {
        return await this.buckEmailTaskModel.countBuckEmailTask();
    }
    /**
     * Get buck email status name from status enum
     * @param taskStatus The task status enum value
     * @returns String representation of the status
     */
    getBuckEmailStatusName(taskStatus: TaskStatus): string {
        return this.buckEmailTaskModel.getBuckEmailStatusName(taskStatus);
    }
    /**
     * Get buck email type name from type enum
     * @param type The buck email type enum value
     * @returns String representation of the type
     */
    getBuckEmailTypeName(type: BuckEmailType): string {
        return this.buckEmailTaskModel.getBuckEmailTypeName(type);
    }
}