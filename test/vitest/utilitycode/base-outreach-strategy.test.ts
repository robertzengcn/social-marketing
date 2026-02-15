/**
 * Unit tests for BaseOutreachStrategy
 * Tests base strategy functionality: validation, sending, initialization, cleanup
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { BaseOutreachStrategy } from '@/strategy/BaseOutreachStrategy'
import { OutreachTarget, OutreachOptions, OutreachResult, OutreachErrorType } from '@/strategy/OutreachStrategy'
import { mockBrowser, mockPage } from '@/test/helpers/mock-factory'

describe('BaseOutreachStrategy', () => {
    class TestStrategy extends BaseOutreachStrategy {
        constructor(options?: OutreachOptions) {
            super(options)
        }

        getName(): OutreachMethod {
            return 'test' as any
        }

        validateTarget(target: OutreachTarget): boolean {
            return target.type === 'test-target'
        }

        async performSend(target: OutreachTarget, message: string): Promise<OutreachResult> {
            return Promise.resolve({
                success: true,
                outputId: 123,
                metadata: { duration: 100 }
            })
        }

        async initialize(): Promise<void> {
            // Mock implementation
        }

        async cleanup(): Promise<void> {
            // Mock implementation
        }
    }

    let strategy: TestStrategy

    beforeEach(() => {
        strategy = new TestStrategy({})

        // Mock browser/page if needed
        vi.clearAllMocks()
    })

    test('should validate correct target type', () => {
        const target: OutreachTarget = {
                type: 'email',
                address: 'test@example.com'
            }

        const result = strategy.validateTarget(target)

        expect(result).toBe(true)
    })

    test('should reject invalid target type', () => {
        const target = { type: 'invalid' } as any

        const result = strategy.validateTarget(target)

        expect(result).toBe(false)
    })

    test('should return strategy name from getName', () => {
        const name = strategy.getName()

        expect(name).toBe('test')
    })

    test('should send message successfully', async () => {
        const target: OutreachTarget = {
                type: 'email',
                address: 'test@example.com'
            }
        const message = 'Test message'

        vi.spyOn(strategy, 'performSend', 'mock').mockResolvedValueOnce({
            success: true,
            outputId: 123
        })

        const result = await strategy.send(target, message)

        expect(result.success).toBe(true)
        expect(result.outputId).toBe(123)
        expect(strategy['performSend']).toHaveBeenCalled()
    })

    test('should handle send failure', async () => {
        const target: OutreachTarget = {
                type: 'email',
                address: 'test@example.com'
            }
        const message = 'Test message'

        const error = new Error('Send failed')
        vi.spyOn(strategy, 'performSend', 'mock').mockRejectedValueOnce(error)

        const result = await strategy.send(target, message)

        expect(result.success).toBe(false)
        expect(result.errorType).toBe(OutreachErrorType.UNKNOWN)
        expect(result.errorMessage).toBe('Send failed')
    })

    test('should initialize resources', async () => {
        const initSpy = vi.spyOn(strategy, 'initialize')

        await strategy.initialize()

        expect(initSpy).toHaveBeenCalled()
    })

    test('should cleanup resources', async () => {
        strategy.browser = mockBrowser()
        strategy.page = mockPage()

        const cleanupSpy = vi.spyOn(strategy, 'cleanup')

        await strategy.cleanup()

        expect(cleanupSpy).toHaveBeenCalled()
        expect(strategy.browser).toBeNull()
        expect(strategy.page).toBeUndefined()
    })
})
