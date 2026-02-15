/**
 * Unit tests for EmailOutreachStrategy
 * Tests email-specific outreach functionality including validation, sending, and email validation
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { EmailOutreachStrategy } from '@/strategy/EmailOutreachStrategy'
import { OutreachTarget, OutreachOptions, OutreachResult, OutreachErrorType } from '@/strategy/OutreachStrategy'

// Mock email service
const mockEmailService = {
    sendEmail: vi.fn(() => Promise.resolve({
                success: true,
                messageId: 'msg-123'
            }))
}

describe('EmailOutreachStrategy', () => {
    let strategy: EmailOutreachStrategy

    beforeEach(() => {
        strategy = new EmailOutreachStrategy({})

        vi.clearAllMocks()
    })

    describe('Target Validation', () => {
        test('should validate valid email address target', () => {
            const target: OutreachTarget = {
                type: 'email',
                address: 'test@example.com'
            }

            const result = strategy.validateTarget(target)

            expect(result).toBe(true)
        })

        test('should reject invalid email address target', () => {
            const target = {
                type: 'email',
                address: 'invalid-email'
            }

            const result = strategy.validateTarget(target)

            expect(result).toBe(false)
        })

        test('should reject non-email target', () => {
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

            expect(name).toBe('email')
        })
    })

    describe('Supported Targets', () => {
        test('should return email-address target type', () => {
            const targets = strategy.getSupportedTargets()

            expect(targets).toContain('email-address')
        })
    })
})
