/**
 * Unit tests for TaskExecutorService
 * Tests the main task dispatcher that routes and executes all task types
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { DatabaseTestHelper } from '../../helpers/database-helper'
import { TEST_ENTITIES } from '../../helpers/test-entities'
import { TaskExecutorService } from '@/modules/TaskExecutorService'
import { ScheduleTaskEntity, TaskType, ScheduleStatus } from '@/entity/ScheduleTask.entity'

// Mock the dependencies
vi.mock('@/modules/SearchTaskModule')
vi.mock('@/modules/EmailSearchTaskModule')
vi.mock('@/modules/buckEmailTaskModule')
vi.mock('@/modules/VideoDownloadTaskModule')
vi.mock('@/modules/searchModule')
vi.mock('@/modules/EmailMarketingTaskModule')
vi.mock('@/modules/EmailSearchTaskModule')

describe('TaskExecutorService', () => {
    let taskExecutor: TaskExecutorService
    let mockSearchTaskModule: any
    let mockEmailSearchTaskModule: any
    let mockBuckEmailTaskModule: any
    let mockVideoDownloadTaskModule: any
    let mockSearchModule: any

    beforeEach(async () => {
        // Clear all mocks
        vi.clearAllMocks()

        // Setup mock modules
        mockSearchTaskModule = {
            read: vi.fn((id: number) => {
                if (id === 1) return { id: 1, status: 'pending', keyword: 'test' }
                if (id === 2) return { id: 2, status: 'running', keyword: 'test2' }
                return null
            }),
            updateTaskStatus: vi.fn()
        }

        mockEmailSearchTaskModule = {
            getTaskDetail: vi.fn((id: number) => {
                if (id === 2) return { id: 2, target_urls: ['https://example.com'] }
                return null
            }),
            searchEmail: vi.fn(() => Promise.resolve())
        }

        mockBuckEmailTaskModule = {
            read: vi.fn((id: number) => {
                if (id === 3) return { id: 3, status: 'pending' }
                return null
            }),
            buckEmailsend: vi.fn(() => Promise.resolve())
        }

        mockVideoDownloadTaskModule = {
            getVideoDownloadTask: vi.fn((id: number) => {
                if (id === 4) return { id: 4, status: 'pending', url: 'https://youtube.com/watch?v=test' }
                return null
            }),
            processDownloadVideo: vi.fn(() => Promise.resolve())
        }

        mockSearchModule = {
            runSearchTask: vi.fn(() => Promise.resolve(1))
        }

        // Import modules after mocks are set up
        const SearchTaskModule = (await import('@/modules/SearchTaskModule')).SearchTaskModule
        const EmailSearchTaskModule = (await import('@/modules/EmailSearchTaskModule')).EmailSearchTaskModule
        const BuckEmailTaskModule = (await import('@/modules/buckEmailTaskModule')).BuckEmailTaskModule
        const VideoDownloadTaskModule = (await import('@/modules/VideoDownloadTaskModule')).VideoDownloadTaskModule
        const SearchModule = (await import('@/modules/searchModule')).SearchModule

        // Create task executor instance
        taskExecutor = new TaskExecutorService()
        taskExecutor['searchTaskModel'] = mockSearchTaskModule
        taskExecutor['emailSearchTaskModule'] = mockEmailSearchTaskModule
        taskExecutor['buckEmailTaskModel'] = mockBuckEmailTaskModule
        taskExecutor['videoDownloadTaskModel'] = mockVideoDownloadTaskModule
        taskExecutor['searchModel'] = mockSearchModule
    })

    afterEach(async () => {
        // Clean up any databases
        await DatabaseTestHelper.cleanupAllDatabases()
    })

    describe('Task Execution', () => {
        test('should execute search task', async () => {
            const schedule = createMockSchedule({
                id: 1,
                task_type: TaskType.SEARCH,
                task_id: 1
            })

            const result = await taskExecutor.executeScheduledTask(schedule)

            expect(result).toBe(1)
            expect(mockSearchTaskModule.read).toHaveBeenCalledWith(1)
            expect(mockSearchModule.runSearchTask).toHaveBeenCalledWith(1)
        })

        test('should execute email extraction task', async () => {
            const schedule = createMockSchedule({
                id: 2,
                task_type: TaskType.EMAIL_EXTRACT,
                task_id: 2
            })

            const result = await taskExecutor.executeScheduledTask(schedule)

            expect(result).toBe(2)
            expect(mockEmailSearchTaskModule.getTaskDetail).toHaveBeenCalledWith(2)
            expect(mockEmailSearchTaskModule.searchEmail).toHaveBeenCalled()
        })

        test('should execute email marketing task', async () => {
            const schedule = createMockSchedule({
                id: 3,
                task_type: TaskType.BUCK_EMAIL,
                task_id: 3
            })

            const result = await taskExecutor.executeScheduledTask(schedule)

            expect(result).toBe(3)
            expect(mockBuckEmailTaskModule.read).toHaveBeenCalledWith(3)
            expect(mockBuckEmailTaskModule.buckEmailsend).toHaveBeenCalled()
        })

        test('should execute video download task', async () => {
            const schedule = createMockSchedule({
                id: 4,
                task_type: TaskType.VIDEO_DOWNLOAD,
                task_id: 4
            })

            const result = await taskExecutor.executeScheduledTask(schedule)

            expect(result).toBe(4)
            expect(mockVideoDownloadTaskModule.getVideoDownloadTask).toHaveBeenCalledWith(4)
            expect(mockVideoDownloadTaskModule.processDownloadVideo).toHaveBeenCalled()
        })

        test('should throw error for unsupported task type', async () => {
            const schedule = createMockSchedule({
                id: 5,
                task_type: 'unsupported' as TaskType,
                task_id: 1
            })

            await expect(taskExecutor.executeScheduledTask(schedule)).rejects.toThrow('Unsupported task type')
        })
    })

    describe('Error Handling', () => {
        test('should handle task not found error', async () => {
            const schedule = createMockSchedule({
                id: 1,
                task_type: TaskType.SEARCH,
                task_id: 999
            })

            mockSearchTaskModule.read.mockResolvedValue(null)

            await expect(taskExecutor.executeScheduledTask(schedule)).rejects.toThrow('Search task 999 not found')
        })

        test('should update task status to failed on error', async () => {
            const schedule = createMockSchedule({
                id: 1,
                task_type: TaskType.SEARCH,
                task_id: 1
            })

            const error = new Error('Task execution failed')
            mockSearchTaskModule.read.mockResolvedValue({ id: 1, status: 'pending' })
            mockSearchModule.runSearchTask.mockRejectedValue(error)

            await expect(taskExecutor.executeScheduledTask(schedule)).rejects.toThrow()
            expect(mockSearchTaskModule.updateTaskStatus).toHaveBeenCalledWith(1, 'failed')
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
        trigger_type: 'cron' as any,
        cron_expression: '0 0 * * *',
        is_active: true,
        status: ScheduleStatus.ACTIVE,
        next_run_time: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        ...overrides
    }
}
