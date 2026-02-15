/**
 * Unit tests for OutreachStrategyFactory
 * Tests strategy factory pattern, auto-selection, and registration
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { OutreachStrategyFactory } from '@/strategy/OutreachStrategyFactory'
import { BaseOutreachStrategy } from '@/strategy/BaseOutreachStrategy'
import { EmailOutreachStrategy } from '@/strategy/EmailOutreachStrategy'
import { CommentOutreachStrategy } from '@/strategy/CommentOutreachStrategy'
import { DirectMessageOutreachStrategy } from '@/strategy/DirectMessageOutreachStrategy'
import { OutreachMethod, OutreachTarget, OutreachOptions } from '@/strategy/OutreachStrategy'

// Mock strategies for testing
class MockOutreachStrategy extends BaseOutreachStrategy {
    constructor() {
        super()
        this.validateTarget = vi.fn(() => true)
        this.generateMessage = vi.fn(() => Promise.resolve('Mock message'))
        this.executeOutreach = vi.fn(() => Promise.resolve({ success: true, outputId: 123 }))
    }
}

describe('OutreachStrategyFactory', () => {
    let factory: OutreachStrategyFactory

    beforeEach(() => {
        // Reset factory before each test
        factory = new OutreachStrategyFactory()
    })

    afterEach(() => {
        // Clean up after each test
        vi.clearAllMocks()
    })

    describe('Strategy Creation', () => {
        test('should create email strategy', () => {
            const strategy = OutreachStrategyFactory.createStrategy('email')

            expect(strategy).toBeInstanceOf(EmailOutreachStrategy)
            expect(strategy).not.toBeFalsy()
        })

        test('should create comment strategy', () => {
            const strategy = OutreachStrategyFactory.createStrategy('comment')

            expect(strategy).toBeInstanceOf(CommentOutreachStrategy)
            expect(strategy).not.toBeFalsy()
        })

        test('should create direct-message strategy', () => {
            const strategy = OutreachStrategyFactory.createStrategy('direct-message')

            expect(strategy).toBeInstanceOf(DirectMessageOutreachStrategy)
            expect(strategy).not.toBeFalsy()
        })

        test('should throw error for unknown method', () => {
            expect(() => {
                OutreachStrategyFactory.createStrategy('unknown' as any)
            }).toThrow('Unknown outreach method')
        })
    })

    describe('Strategy Auto-Selection', () => {
        test('should auto-select email strategy for email target', () => {
            const target: OutreachTarget = {
                type: 'email',
                address: 'test@example.com'
            }
            const strategy = OutreachStrategyFactory.selectStrategyForTarget(target)

            expect(strategy).toBeInstanceOf(EmailOutreachStrategy)
        })

        test('should auto-select comment strategy for website URL', () => {
            const target: OutreachTarget = {
                type: 'website-url',
                url: 'https://example.com'
            }
            const strategy = OutreachStrategyFactory.selectStrategyForTarget(target)

            expect(strategy).toBeInstanceOf(CommentOutreachStrategy)
        })

        test('should auto-select comment strategy for blog post', () => {
            const target: OutreachTarget = {
                type: 'blog-post',
                url: 'https://example.com/blog/post'
            }
            const strategy = OutreachStrategyFactory.selectStrategyForTarget(target)

            expect(strategy).toBeInstanceOf(CommentOutreachStrategy)
        })

        test('should throw error for unsupported target', () => {
            const target = { type: 'unsupported' } as any

            expect(() => {
                OutreachStrategyFactory.selectStrategyForTarget(target)
            }).toThrow('No suitable strategy found')
        })
    })

    describe('Strategy Registration', () => {
        test('should register custom strategy', () => {
            class CustomStrategy extends BaseOutreachStrategy {
                validateTarget = vi.fn(() => true)
                generateMessage = vi.fn(() => Promise.resolve('Custom message'))
                executeOutreach = vi.fn(() => Promise.resolve({ success: true, outputId: 456 }))
            }

            OutreachStrategyFactory.registerStrategy('custom' as any, CustomStrategy)
            const strategy = OutreachStrategyFactory.createStrategy('custom')

            expect(strategy).toBeInstanceOf(CustomStrategy)
        })

        test('should list all available methods', () => {
            const methods = OutreachStrategyFactory.getAvailableMethods()

            expect(methods).toContain('email')
            expect(methods).toContain('comment')
            expect(methods).toContain('direct-message')
            expect(methods).toHaveLength(3)
        })
    })
})
