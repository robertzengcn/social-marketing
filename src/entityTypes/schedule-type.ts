import { SortBy } from "@/entityTypes/commonType";
import { TaskType, ScheduleStatus, TriggerType, DependencyCondition } from "@/entity/ScheduleTask.entity";
import { ExecutionStatus } from "@/entity/ScheduleExecutionLog.entity";

// Request types
export interface ScheduleCreateRequest {
    name: string;
    description?: string;
    task_type: TaskType;
    task_id: number;
    cron_expression: string;
    is_active?: boolean;
    trigger_type?: TriggerType;
    parent_schedule_id?: number;
    dependency_condition?: DependencyCondition;
    delay_minutes?: number;
}

export interface ScheduleUpdateRequest {
    name?: string;
    description?: string;
    task_type?: TaskType;
    task_id?: number;
    cron_expression?: string;
    is_active?: boolean;
    trigger_type?: TriggerType;
    parent_schedule_id?: number;
    dependency_condition?: DependencyCondition;
    delay_minutes?: number;
    status?: ScheduleStatus;
}

export interface DependencyCreateRequest {
    parent_schedule_id: number;
    child_schedule_id: number;
    dependency_condition: DependencyCondition;
    delay_minutes?: number;
    notes?: string;
}

// Response types
export interface ScheduleListResponse {
    schedules: any[];
    total: number;
    page: number;
    size: number;
}

export interface ScheduleDetailResponse {
    schedule: any;
    execution_history?: any[];
    dependencies?: any[];
}

export interface ExecutionHistoryResponse {
    executions: any[];
    total: number;
    page: number;
    size: number;
}

export interface DependencyGraphResponse {
    nodes: any[];
    edges: any[];
}

export interface DependencyValidationResponse {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}

// Enum types
export { TaskType, ScheduleStatus, TriggerType, DependencyCondition } from "@/entity/ScheduleTask.entity";
export { ExecutionStatus } from "@/entity/ScheduleExecutionLog.entity";

// Additional enums
export enum SchedulerStatus {
    RUNNING = 'running',
    STOPPED = 'stopped',
    PAUSED = 'paused',
    ERROR = 'error'
} 