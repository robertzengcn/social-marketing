/**
 * Unit tests for DirectMessageOutreachStrategy
 * Tests direct messaging outreach functionality including validation and sending
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { DirectMessageOutreachStrategy } from '@/strategy/DirectMessageOutreachStrategy'
import { OutreachTarget } from '@/strategy/OutreachStrategy'

// Mock platform API
const mockPlatformAPI = {
    sendMessage: vi.fn(() => Promise.resolve({
                success: true,
                messageId: 'msg-456'
            }))
}

describe('DirectMessageOutreachStrategy', () => {
    let strategy: DirectMessageOutreachStrategy

    beforeEach(() => {
        strategy = new DirectMessageOutreachStrategy({})

        vi.clearAllMocks()
    })

    describe('Target Validation', () => {
        test('should validate direct message target', () => {
            const target: OutreachTarget = {
                type: 'direct-message',
                platform: 'twitter',
                handle: '@user'
            }

            const result = strategy.validateTarget(target)

            expect(result).toBe(true)
        })

        test('should reject non-direct-message target', () => {
            const target = {
                type: 'website-url',
                url: 'https://example.com'
            } as any

            const result = strategy.validateTarget(target)

            expect(result).toBe(false)
        })
    })

    describe('Strategy Name', () => {
        test('should return correct strategy name', () => {
            const name = strategy.getName()

            expect(name).toBe('direct-message')
        })
    })

    describe('Message Sending', () => {
        test('should send direct message successfully', async () => {
            const target: OutreachTarget = {
                type: 'direct-message',
                platform: 'twitter',
                handle: '@user'
            }
            const message = 'Test direct message'

            const result = await strategy.performSend(target, message)

            expect(result.success).toBe(true)
            expect(result.outputId).toBeDefined()
        })

        test('should handle send failure', async () => {
            const target: OutreachTarget = {
                type: 'direct-message',
                platform: 'twitter',
                handle: '@user'
            }
            const message = 'Test direct message'

            // Mock API failure
            mockPlatformAPI.sendMessage.mockRejectedValueOnce(new Error('API error'))

            const result = await strategy.performSend(target, message)

            expect(result.success).toBe(false)
            expect(result.errorType).toBeDefined()
        })
    })
})
