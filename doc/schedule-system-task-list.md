# Schedule System Implementation Task List

## Overview
This document outlines the complete implementation plan for adding a scheduling system to the social marketing application. The system will allow users to schedule various types of tasks (search, email marketing, video download, etc.) to run automatically at specified intervals using cron expressions, with support for job dependencies where one job can trigger another job to run after completion.

## Phase 1: Database Schema and Entity Design ✅

### 1.1 Create Schedule Entity ✅
- **Status**: ✅ Completed
- **File**: `src/entity/ScheduleTask.entity.ts`
- **Description**: Created ScheduleTaskEntity with the following fields:
  - `id` (Primary Key)
  - `name` (Task name)
  - `description` (Task description)
  - `task_type` (TaskType enum as string)
  - `task_id` (Foreign key to existing task tables)
  - `cron_expression` (Cron expression for scheduling)
  - `is_active` (Boolean flag)
  - `last_run_time` (Last execution time)
  - `next_run_time` (Next scheduled execution time)
  - `status` (ScheduleStatus enum as string)
  - `execution_count` (Number of successful executions)
  - `failure_count` (Number of failed executions)
  - `last_error_message` (Last error message)
  - `last_modified` (Last modification time)
  - `trigger_type` (TriggerType enum as string: 'cron', 'dependency', 'manual')
  - `parent_schedule_id` (Foreign key to parent schedule, nullable)
  - `dependency_condition` (DependencyCondition enum as string: 'on_success', 'on_completion', 'on_failure')
  - `delay_minutes` (Delay in minutes after parent job completes, default: 0)
  - Inherits from AuditableEntity (created_at, updated_at)

### 1.2 Create Schedule Execution Log Entity
- **Status**: ⏳ Pending
- **File**: `src/entity/ScheduleExecutionLog.entity.ts`
- **Description**: Entity to track execution history with fields:
  - `id` (Primary Key)
  - `schedule_id` (Foreign key to ScheduleTaskEntity)
  - `parent_execution_id` (Foreign key to parent execution log, nullable)
  - `execution_time` (When execution started)
  - `status` (ExecutionStatus enum)
  - `result_message` (Execution result/error)
  - `execution_duration` (Execution time in milliseconds)
  - `task_output_id` (Reference to task output)
  - `triggered_by` (TriggerType: 'cron', 'dependency', 'manual')
  - `created_time` (Log creation time)

### 1.3 Create Schedule Dependency Entity
- **Status**: ⏳ Pending
- **File**: `src/entity/ScheduleDependency.entity.ts`
- **Description**: Entity to manage job dependencies with fields:
  - `id` (Primary Key)
  - `parent_schedule_id` (Foreign key to parent ScheduleTaskEntity)
  - `child_schedule_id` (Foreign key to child ScheduleTaskEntity)
  - `dependency_condition` (DependencyCondition enum as string)
  - `delay_minutes` (Delay in minutes after parent completes, default: 0)
  - `is_active` (Boolean flag)
  - `created_time` (Creation time)
  - `updated_time` (Last update time)

### 1.4 Create Database Migration Scripts
- **Status**: ⏳ Pending
- **File**: `src/sql/scraperdb/schedule_task.sql`
- **Description**: SQL script to create schedule_task table with dependency fields
- **File**: `src/sql/scraperdb/schedule_execution_log.sql`
- **Description**: SQL script to create schedule_execution_log table
- **File**: `src/sql/scraperdb/schedule_dependency.sql`
- **Description**: SQL script to create schedule_dependency table

## Phase 2: Model Layer Implementation

### 2.1 Create ScheduleTaskModel ✅
- **Status**: ✅ Completed
- **File**: `src/model/ScheduleTask.model.ts`
- **Description**: Model class extending BaseDb with methods:
  - `createSchedule(scheduleData: ScheduleCreateRequest): Promise<number>`
  - `updateSchedule(id: number, scheduleData: ScheduleUpdateRequest): Promise<void>`
  - `deleteSchedule(id: number): Promise<void>`
  - `getScheduleById(id: number): Promise<ScheduleTaskEntity | null>`
  - `listSchedules(page: number, size: number, sort?: SortBy): Promise<ScheduleTaskEntity[]>`
  - `getActiveSchedules(): Promise<ScheduleTaskEntity[]>`
  - `updateNextRunTime(id: number, nextRunTime: Date): Promise<void>`
  - `updateLastRunTime(id: number, lastRunTime: Date): Promise<void>`
  - `getSchedulesReadyToExecute(): Promise<ScheduleTaskEntity[]>`
  - `getChildSchedules(parentId: number): Promise<ScheduleTaskEntity[]>`
  - `getParentSchedule(childId: number): Promise<ScheduleTaskEntity | null>`
  - `getDependencyChain(scheduleId: number): Promise<ScheduleTaskEntity[]>`
  - `checkCircularDependencies(scheduleId: number): Promise<boolean>`

### 2.2 Create ScheduleExecutionLogModel ✅
- **Status**: ✅ Completed
- **File**: `src/model/ScheduleExecutionLog.model.ts`
- **Description**: Model class for execution logging with methods:
  - `logExecution(scheduleId: number, status: ExecutionStatus, message: string, duration: number, parentExecutionId?: number): Promise<number>`
  - `getExecutionHistory(scheduleId: number, page: number, size: number): Promise<ScheduleExecutionLogEntity[]>`
  - `getRecentExecutions(limit: number): Promise<ScheduleExecutionLogEntity[]>`
  - `getFailedExecutions(scheduleId: number, limit: number): Promise<ScheduleExecutionLogEntity[]>`
  - `getChildExecutions(parentExecutionId: number): Promise<ScheduleExecutionLogEntity[]>`
  - `getExecutionChain(executionId: number): Promise<ScheduleExecutionLogEntity[]>`

### 2.3 Create ScheduleDependencyModel ✅
- **Status**: ✅ Completed
- **File**: `src/model/ScheduleDependency.model.ts`
- **Description**: Model class for dependency management with methods:
  - `createDependency(parentId: number, childId: number, condition: DependencyCondition, delayMinutes?: number, notes?: string): Promise<number>`
  - `updateDependency(id: number, condition: DependencyCondition, delayMinutes: number, notes?: string): Promise<void>`
  - `deleteDependency(id: number): Promise<void>`
  - `deleteDependencyByParentChild(parentId: number, childId: number): Promise<void>`
  - `getDependenciesByParent(parentId: number): Promise<ScheduleDependencyEntity[]>`
  - `getDependenciesByChild(childId: number): Promise<ScheduleDependencyEntity[]>`
  - `getDependencyById(id: number): Promise<ScheduleDependencyEntity | null>`
  - `getDependencyByParentChild(parentId: number, childId: number): Promise<ScheduleDependencyEntity | null>`
  - `checkCircularDependency(parentId: number, childId: number): Promise<boolean>`
  - `getDependencyChain(startId: number): Promise<ScheduleDependencyEntity[]>`
  - `getDependentSchedules(scheduleId: number): Promise<number[]>`
  - `getParentSchedules(scheduleId: number): Promise<number[]>`
  - `enableDependency(id: number): Promise<void>`
  - `disableDependency(id: number): Promise<void>`
  - `getDependenciesByCondition(condition: DependencyCondition): Promise<ScheduleDependencyEntity[]>`
  - `getAllActiveDependencies(): Promise<ScheduleDependencyEntity[]>`
  - `getDependencyStatistics(): Promise<{total: number, active: number, inactive: number, byCondition: Record<string, number>}>`
  - `validateDependencies(scheduleId: number): Promise<{isValid: boolean, circularDependencies: number[], orphanedDependencies: number[], errors: string[]}>`
  - `cleanupInactiveDependencies(): Promise<number>`

## Phase 3: Service Layer Implementation

### 3.1 Create ScheduleManager ✅
- **Status**: ✅ Completed
- **File**: `src/modules/ScheduleManager.ts`
- **Description**: Core scheduling service with methods:
  - `initializeSchedules(): Promise<void>` - Initialize and load all active schedules
  - `addSchedule(schedule: ScheduleTaskEntity): Promise<void>` - Add new schedule to scheduler
  - `removeSchedule(scheduleId: number): Promise<void>` - Remove schedule from scheduler
  - `updateSchedule(schedule: ScheduleTaskEntity): Promise<void>` - Update existing schedule
  - `executeSchedule(scheduleId: number): Promise<void>` - Execute schedule immediately
  - `validateCronExpression(expression: string): boolean` - Validate cron expressions
  - `calculateNextRunTime(cronExpression: string): Date` - Calculate next execution time
  - `pauseSchedule(scheduleId: number): Promise<void>` - Pause a schedule
  - `resumeSchedule(scheduleId: number): Promise<void>` - Resume a schedule
  - `addDependency(parentId: number, childId: number, condition: DependencyCondition, delayMinutes?: number): Promise<void>` - Add job dependency
  - `removeDependency(parentId: number, childId: number): Promise<void>` - Remove job dependency
  - `executeDependentJobs(parentExecutionId: number, parentStatus: ExecutionStatus): Promise<void>` - Execute dependent jobs
  - `validateDependencyChain(scheduleId: number): Promise<boolean>` - Validate dependency chain
  - `getSchedulerStatus(): SchedulerStatus` - Get current scheduler status
  - `start(): Promise<void>` - Start the scheduler
  - `stop(): Promise<void>` - Stop the scheduler
  - `handleAppShutdown(): Promise<void>` - Handle application shutdown
  - `processDependencyQueue(): Promise<void>` - Process dependency-based schedules

### 3.2 Create TaskExecutorService ✅
- **Status**: ✅ Completed
- **File**: `src/modules/TaskExecutorService.ts`
- **Description**: Service to execute different types of tasks:
  - `executeScheduledTask(schedule: ScheduleTaskEntity, parentExecutionId?: number): Promise<number>` - Execute scheduled task based on type
  - `executeSearchTask(taskId: number): Promise<number>` - Execute search task
  - `executeEmailMarketingTask(taskId: number): Promise<number>` - Execute email marketing task
  - `executeBuckEmailTask(taskId: number): Promise<number>` - Execute bulk email task
  - `executeVideoDownloadTask(taskId: number): Promise<number>` - Execute video download task
  <!-- - `executeSocialTask(taskId: number): Promise<number>` - Execute social task -->
  - `getTaskStatus(taskId: number, taskType: TaskType): Promise<TaskStatus>` - Get task status
  - `cancelTask(taskId: number, taskType: TaskType): Promise<void>` - Cancel running task
  - `executeDependencyChain(scheduleId: number, parentExecutionId?: number): Promise<void>` - Execute dependency chain
  - `getTaskExecutionStatistics(taskType?: TaskType): Promise<{total: number, running: number, completed: number, failed: number, cancelled: number, averageExecutionTime: number}>` - Get execution statistics
  - `validateTaskConfiguration(taskId: number, taskType: TaskType): Promise<{isValid: boolean, errors: string[], warnings: string[]}>` - Validate task configuration

### 3.3 Create BackgroundScheduler
- **Status**: ⏳ Pending
- **File**: `src/modules/BackgroundScheduler.ts`
- **Description**: Background service that runs continuously:
  - `initialize(): Promise<void>`
  - `start(): Promise<void>`
  - `stop(): Promise<void>`
  - `reloadSchedules(): Promise<void>`
  - `getSchedulerStatus(): SchedulerStatus`
  - `handleAppShutdown(): Promise<void>`
  - `processDependencyQueue(): Promise<void>`
  - `handleJobCompletion(executionId: number, status: ExecutionStatus): Promise<void>`

## Phase 4: Controller Layer Implementation

### 4.1 Create ScheduleController
- **Status**: ⏳ Pending
- **File**: `src/controller/ScheduleController.ts`
- **Description**: Controller for handling schedule-related requests:
  - `createSchedule(scheduleData: ScheduleCreateRequest): Promise<number>`
  - `updateSchedule(id: number, scheduleData: ScheduleUpdateRequest): Promise<void>`
  - `deleteSchedule(id: number): Promise<void>`
  - `enableSchedule(id: number): Promise<void>`
  - `disableSchedule(id: number): Promise<void>`
  - `runScheduleNow(id: number): Promise<void>`
  - `getScheduleList(page: number, size: number, sort?: SortBy): Promise<ScheduleListResponse>`
  - `getExecutionHistory(scheduleId: number, page: number, size: number): Promise<ExecutionHistoryResponse>`
  - `getScheduleById(id: number): Promise<ScheduleDetailResponse>`
  - `addDependency(parentId: number, childId: number, dependencyData: DependencyCreateRequest): Promise<number>`
  - `removeDependency(parentId: number, childId: number): Promise<void>`
  - `getDependencyGraph(scheduleId: number): Promise<DependencyGraphResponse>`
  - `validateDependencies(scheduleId: number): Promise<DependencyValidationResponse>`

## Phase 5: Type Definitions

### 5.1 Create Schedule Types
- **Status**: ⏳ Pending
- **File**: `src/entityTypes/schedule-type.ts`
- **Description**: TypeScript type definitions:
  - `ScheduleCreateRequest`
  - `ScheduleUpdateRequest`
  - `ScheduleListResponse`
  - `ScheduleDetailResponse`
  - `ExecutionHistoryResponse`
  - `DependencyCreateRequest`
  - `DependencyGraphResponse`
  - `DependencyValidationResponse`
  - `ExecutionStatus` enum
  - `SchedulerStatus` enum
  - `TriggerType` enum ('cron', 'dependency', 'manual')
  - `DependencyCondition` enum ('on_success', 'on_completion', 'on_failure')

## Phase 6: Frontend Implementation

### 6.1 Create Schedule Management Pages
- **Status**: ⏳ Pending
- **File**: `src/views/pages/schedule/`
- **Description**: Vue.js pages for schedule management:
  - `list.vue` - Schedule list with pagination
  - `create.vue` - Create new schedule form
  - `edit.vue` - Edit existing schedule form
  - `detail.vue` - Schedule details and execution history
  - `dependencies.vue` - Dependency management page

### 6.2 Create Schedule Components
- **Status**: ⏳ Pending
- **File**: `src/views/pages/schedule/widgets/`
- **Description**: Reusable Vue components:
  - `ScheduleTable.vue` - Data table for schedules
  - `ScheduleForm.vue` - Form component for create/edit
  - `CronExpressionBuilder.vue` - Visual cron expression builder
  - `ExecutionHistoryTable.vue` - Execution history display
  - `ScheduleStatusBadge.vue` - Status indicator component
  - `DependencyGraph.vue` - Visual dependency graph
  - `DependencyForm.vue` - Form for adding dependencies
  - `TriggerTypeSelector.vue` - Selector for trigger types

### 6.3 Add Schedule API Integration
- **Status**: ⏳ Pending
- **File**: `src/views/api/schedule.ts`
- **Description**: API client for schedule operations:
  - `createSchedule()`
  - `updateSchedule()`
  - `deleteSchedule()`
  - `getScheduleList()`
  - `getScheduleById()`
  - `