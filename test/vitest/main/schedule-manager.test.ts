/**
 * Unit tests for ScheduleManager
 * Tests the scheduling system backbone including initialization, cron job management, execution, and lifecycle
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { CronJob } from 'cron'
import { DatabaseTestHelper } from '../../helpers/database-helper'
import { TEST_ENTITIES } from '../../helpers/test-entities'
import { ScheduleManager } from '@/modules/ScheduleManager'
import { ScheduleTaskEntity, TaskType, ScheduleStatus, TriggerType, DependencyCondition } from '@/entity/ScheduleTask.entity'
import { ExecutionStatus } from '@/entity/ScheduleExecutionLog.entity'

// Mock the dependencies
vi.mock('@/modules/ScheduleTaskModule')
vi.mock('@/modules/ScheduleExecutionLogModule')
vi.mock('@/modules/ScheduleDependencyModule')
vi.mock('@/modules/TaskExecutorService')
vi.mock('@/model/SchedulerStatusModel')
vi.mock('@/modules/token')

describe('ScheduleManager', () => {
    let scheduleManager: ScheduleManager
    let mockScheduleTaskModule: any
    let mockExecutionLogModule: any
    let mockDependencyModule: any
    let mockTaskExecutor: any
    let mockSchedulerStatusModel: any
    let mockTokenService: any

    beforeEach(async () => {
        // Clear all mocks
        vi.clearAllMocks()

        // Setup mock token service
        mockTokenService = {
            getValue: vi.fn((key: string) => {
                if (key === 'user:dbpath') return '/tmp/test.db'
                return null
            })
        }

        // Setup mock modules
        mockScheduleTaskModule = {
            getActiveSchedules: vi.fn(() => Promise.resolve([])),
            createSchedule: vi.fn(),
            updateSchedule: vi.fn(),
            deleteSchedule: vi.fn(),
            getScheduleById: vi.fn(),
            pauseSchedule: vi.fn(),
            resumeSchedule: vi.fn(),
            enableSchedule: vi.fn(),
            disableSchedule: vi.fn(),
            incrementExecutionCount: vi.fn(),
            updateLastRunTime: vi.fn(),
            updateLastErrorMessage: vi.fn()
        }

        mockExecutionLogModule = {
            logExecution: vi.fn(() => Promise.resolve(1)),
            updateExecutionStatus: vi.fn(),
            createLog: vi.fn()
        }

        mockDependencyModule = {
            checkCircularDependency: vi.fn(() => Promise.resolve(false)),
            createDependency: vi.fn(),
            getDependenciesForParent: vi.fn(() => Promise.resolve([])),
            getDependenciesByParent: vi.fn(() => Promise.resolve([]))
        }

        mockTaskExecutor = {
            executeScheduledTask: vi.fn(() => Promise.resolve(100))
        }

        mockSchedulerStatusModel = {
            updateStatus: vi.fn(),
            getStatus: vi.fn(() => Promise.resolve({
                isRunning: false,
                activeSchedules: 0,
                totalSchedules: 0,
                lastCheckTime: new Date(),
                nextCheckTime: new Date()
            }))
        }

        // Import modules after mocks are set up
        const ScheduleTaskModule = (await import('@/modules/ScheduleTaskModule')).ScheduleTaskModule
        const ScheduleExecutionLogModule = (await import('@/modules/scheduleExecutionLogModule')).ScheduleExecutionLogModule
        const ScheduleDependencyModule = (await import('@/modules/scheduleDependencyModule')).ScheduleDependencyModule
        const TaskExecutorService = (await import('@/modules/TaskExecutorService')).TaskExecutorService
        const SchedulerStatusModel = (await import('@/model/schedulerStatus.model')).SchedulerStatusModel

        // Create schedule manager instance
        scheduleManager = new (ScheduleManager as any).constructor()
        scheduleManager['scheduleTaskModule'] = mockScheduleTaskModule
        scheduleManager['scheduleExecutionLogModule'] = mockExecutionLogModule
        scheduleManager['scheduleDependencyModule'] = mockDependencyModule
        scheduleManager['taskExecutorModule'] = mockTaskExecutor
        scheduleManager['schedulerStatusModel'] = mockSchedulerStatusModel
    })

    afterEach(async () => {
        // Clean up any databases
        await DatabaseTestHelper.cleanupAllDatabases()
    })

    describe('Initialization', () => {
        test('should initialize with no active schedules', async () => {
            mockScheduleTaskModule.getActiveSchedules.mockResolvedValue([])

            await scheduleManager.initializeSchedules()

            expect(mockScheduleTaskModule.getActiveSchedules).toHaveBeenCalled()
            expect(scheduleManager['isInitialized']).toBe(true)
        })

        test('should load and register active cron schedules', async () => {
            const mockSchedules = [
                createMockSchedule({ id: 1, is_active: true, trigger_type: TriggerType.CRON }),
                createMockSchedule({ id: 2, is_active: true, trigger_type: TriggerType.CRON })
            ]
            mockScheduleTaskModule.getActiveSchedules.mockResolvedValue(mockSchedules)

            await scheduleManager.initializeSchedules()

            // Should have called addSchedule for each active schedule
            expect(scheduleManager['cronJobs'].size).toBe(2)
        })

        test('should skip inactive schedules', async () => {
            const mockSchedules = [
                createMockSchedule({ id: 1, is_active: false, trigger_type: TriggerType.CRON }),
                createMockSchedule({ id: 2, is_active: true, trigger_type: TriggerType.MANUAL }) // Not cron
            ]
            mockScheduleTaskModule.getActiveSchedules.mockResolvedValue(mockSchedules)

            await scheduleManager.initializeSchedules()

            // Should not have added any schedules
            expect(scheduleManager['cronJobs'].size).toBe(0)
        })

        test('should not initialize twice', async () => {
            mockScheduleTaskModule.getActiveSchedules.mockResolvedValue([])

            await scheduleManager.initializeSchedules()
            await scheduleManager.initializeSchedules()

            // Should call getActiveSchedules only once
            expect(mockScheduleTaskModule.getActiveSchedules).toHaveBeenCalledTimes(1)
        })
    })

    describe('Cron Job Management', () => {
        test('should add a valid cron schedule', async () => {
            const schedule = createMockSchedule({
                id: 1,
                is_active: true,
                trigger_type: TriggerType.CRON,
                cron_expression: '0 0 * * *'
            })

            await scheduleManager.addSchedule(schedule)

            expect(scheduleManager['cronJobs'].has(1)).toBe(true)
        })

        test('should remove existing schedule before adding', async () => {
            const schedule = createMockSchedule({ id: 1, is_active: true, trigger_type: TriggerType.CRON })

            // Mock the removeSchedule method
            const removeSpy = vi.spyOn(scheduleManager, 'removeSchedule' as any).mockResolvedValue(undefined)

            await scheduleManager.addSchedule(schedule)

            expect(removeSpy).toHaveBeenCalledWith(1)
        })

        test('should skip inactive schedules', async () => {
            const schedule = createMockSchedule({ id: 1, is_active: false, trigger_type: TriggerType.CRON })

            await scheduleManager.addSchedule(schedule)

            expect(scheduleManager['cronJobs'].has(1)).toBe(false)
        })

        test('should validate cron expressions', () => {
            expect(scheduleManager.validateCronExpression('0 0 * * *')).toBe(true)
            expect(scheduleManager.validateCronExpression('invalid')).toBe(false)
            expect(scheduleManager.validateCronExpression('*/5 * * * *')).toBe(true)
            expect(scheduleManager.validateCronExpression('')).toBe(false)
        })

        test('should calculate next run time correctly', () => {
            const nextRun = scheduleManager.calculateNextRunTime('0 0 * * *')

            expect(nextRun).toBeInstanceOf(Date)
            expect(nextRun.getTime()).toBeGreaterThan(Date.now())

            // Should be approximately 24 hours from now
            const hoursFromNow = (nextRun.getTime() - Date.now()) / (1000 * 60 * 60)
            expect(hoursFromNow).toBeGreaterThan(23)
            expect(hoursFromNow).toBeLessThan(25)
        })
    })

    describe('Schedule Execution', () => {
        test('should execute a scheduled task successfully', async () => {
            const schedule = createMockSchedule({ id: 1, is_active: true, task_type: TaskType.SEARCH })
            mockScheduleTaskModule.getScheduleById.mockResolvedValue(schedule)
            mockTaskExecutor.executeScheduledTask.mockResolvedValue(100)
            mockExecutionLogModule.logExecution.mockResolvedValue(1)

            await scheduleManager.executeSchedule(1)

            expect(mockScheduleTaskModule.getScheduleById).toHaveBeenCalledWith(1)
            expect(mockTaskExecutor.executeScheduledTask).toHaveBeenCalledWith(schedule)
            expect(mockExecutionLogModule.logExecution).toHaveBeenCalled()
            expect(mockScheduleTaskModule.incrementExecutionCount).toHaveBeenCalledWith(1, true)
        })

        test('should handle execution failures gracefully', async () => {
            const schedule = createMockSchedule({ id: 1, is_active: true })
            const error = new Error('Task execution failed')
            mockScheduleTaskModule.getScheduleById.mockResolvedValue(schedule)
            mockTaskExecutor.executeScheduledTask.mockRejectedValue(error)
            mockExecutionLogModule.logExecution.mockResolvedValue(1)

            // Should not throw
            await expect(scheduleManager.executeSchedule(1)).rejects.toThrow()

            expect(mockExecutionLogModule.updateExecutionStatus).toHaveBeenCalled()
            expect(mockScheduleTaskModule.incrementExecutionCount).toHaveBeenCalledWith(1, false)
            expect(mockScheduleTaskModule.updateLastErrorMessage).toHaveBeenCalled()
        })

        test('should skip inactive schedule execution', async () => {
            const schedule = createMockSchedule({ id: 1, is_active: false })
            mockScheduleTaskModule.getScheduleById.mockResolvedValue(schedule)

            await scheduleManager.executeSchedule(1)

            expect(mockTaskExecutor.executeScheduledTask).not.toHaveBeenCalled()
        })

        test('should handle schedule not found', async () => {
            mockScheduleTaskModule.getScheduleById.mockResolvedValue(null)

            await expect(scheduleManager.executeSchedule(1)).rejects.toThrow('Schedule 1 not found')
        })
    })

    describe('Dependency Management', () => {
        test('should add valid dependency', async () => {
            mockDependencyModule.checkCircularDependency.mockResolvedValue(false)
            mockDependencyModule.createDependency.mockResolvedValue(undefined)

            await expect(scheduleManager.addDependency(1, 2, DependencyCondition.ON_SUCCESS)).resolves.not.toThrow()

            expect(mockDependencyModule.createDependency).toHaveBeenCalledWith(1, 2, DependencyCondition.ON_SUCCESS)
        })

        test('should detect circular dependencies', async () => {
            mockDependencyModule.checkCircularDependency.mockResolvedValue(true)

            await expect(scheduleManager.addDependency(1, 2, DependencyCondition.ON_SUCCESS)).rejects.toThrow('Circular dependency')
        })

        test('should execute dependent jobs based on parent status', async () => {
            const mockDependencies = [
                { child_id: 2, condition: DependencyCondition.ON_SUCCESS }
            ]
            mockDependencyModule.getDependenciesByParent.mockResolvedValue(mockDependencies)
            mockScheduleTaskModule.getScheduleById.mockImplementation((id: number) => {
                if (id === 2) return Promise.resolve(createMockSchedule({ id: 2, is_active: true }))
                return Promise.resolve(null)
            })

            await scheduleManager.executeDependentJobs(1, 100, ExecutionStatus.SUCCESS)

            // Should have loaded and executed child schedule
            expect(mockScheduleTaskModule.getScheduleById).toHaveBeenCalledWith(2)
        })
    })

    describe('Lifecycle Management', () => {
        test('should start scheduler', async () => {
            await scheduleManager.start()

            expect(scheduleManager['isRunning']).toBe(true)
        })

        test('should stop scheduler', async () => {
            await scheduleManager.start()
            const schedule = createMockSchedule({ id: 1 })
            scheduleManager['cronJobs'].set(1, { stop: vi.fn() } as any)

            await scheduleManager.stop()

            expect(scheduleManager['isRunning']).toBe(false)
            expect(scheduleManager['cronJobs'].size).toBe(0)
        })

        test('should pause and resume schedules', async () => {
            const schedule = createMockSchedule({ id: 1 })
            mockScheduleTaskModule.pauseSchedule.mockResolvedValue(undefined)
            mockScheduleTaskModule.resumeSchedule.mockResolvedValue(undefined)
            mockScheduleTaskModule.getScheduleById.mockResolvedValue(schedule)

            await scheduleManager.pauseSchedule(1)
            expect(mockScheduleTaskModule.pauseSchedule).toHaveBeenCalledWith(1)
            expect(scheduleManager['cronJobs'].has(1)).toBe(false)

            await scheduleManager.resumeSchedule(1)
            expect(mockScheduleTaskModule.resumeSchedule).toHaveBeenCalledWith(1)
            expect(scheduleManager['cronJobs'].has(1)).toBe(true)
        })

        test('should get scheduler status', async () => {
            const mockStatus = {
                isRunning: false,
                activeSchedules: 5,
                totalSchedules: 10,
                lastCheckTime: new Date(),
                nextCheckTime: new Date()
            }
            mockSchedulerStatusModel.getStatus.mockResolvedValue(mockStatus)

            const status = await scheduleManager.getSchedulerStatus()

            expect(status).toEqual(mockStatus)
        })
    })
})

// Helper function to create mock schedule entities
function createMockSchedule(overrides: any = {}): ScheduleTaskEntity {
    return {
        id: 1,
        name: 'Test Schedule',
        task_type: TaskType.SEARCH,
        task_id: 1,
        trigger_type: TriggerType.CRON,
        cron_expression: '0 0 * * *',
        is_active: true,
        status: ScheduleStatus.PENDING,
        next_run_time: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        ...overrides
    }
}
