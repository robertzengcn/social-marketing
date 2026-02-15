/**
 * Unit tests for CommentOutreachStrategy
 * Tests comment-based outreach functionality including validation and sending
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { CommentOutreachStrategy } from '@/strategy/CommentOutreachStrategy'
import { OutreachTarget } from '@/strategy/OutreachStrategy'
import { mockPage, mockBrowser } from '../../helpers/mock-factory'

describe('CommentOutreachStrategy', () => {
    let strategy: CommentOutreachStrategy

    beforeEach(() => {
        strategy = new CommentOutreachStrategy({})

        // Mock browser/page
        vi.clearAllMocks()
    })

    describe('Target Validation', () => {
        test('should validate website URL target', () => {
            const target: OutreachTarget = {
                type: 'website-url',
                url: 'https://example.com/post'
            }

            const result = strategy.validateTarget(target)

            expect(result).toBe(true)
        })

        test('should validate blog post target', () => {
            const target: OutreachTarget = {
                type: 'blog-post',
                url: 'https://example.com/blog/post'
            }

            const result = strategy.validateTarget(target)

            expect(result).toBe(true)
        })

        test('should reject non-website target', () => {
            const target = {
                type: 'email',
                address: 'test@example.com'
            } as any

            const result = strategy.validateTarget(target)

            expect(result).toBe(false)
        })
    })

    describe('Strategy Name', () => {
        test('should return correct strategy name', () => {
            const name = strategy.getName()

            expect(name).toBe('comment')
        })
    })

    describe('Comment Posting', () => {
        test('should post comment successfully', async () => {
            const target: OutreachTarget = {
                type: 'website-url',
                url: 'https://example.com/post'
            }
            const message = 'Test comment'

            // Mock successful browser/page operations
            const mockPage = mockPage()
            mockPage.goto.mockResolvedValue(undefined)
            mockPage.evaluate.mockResolvedValue(undefined)
            mockPage.click.mockResolvedValue(undefined)

            strategy.browser = mockBrowser()
            strategy.browser.newPage = vi.fn(() => mockPage)

            const result = await strategy.performSend(target, message)

            expect(result.success).toBe(true)
            expect(result.outputId).toBeDefined()
        })

        test('should handle posting failure', async () => {
            const target: OutreachTarget = {
                type: 'website-url',
                url: 'https://example.com/post'
            }
            const message = 'Test comment'

            // Mock browser error
            const mockPage = mockPage()
            mockPage.goto.mockRejectedValue(new Error('Navigation failed'))

            strategy.browser = mockBrowser()
            strategy.browser.newPage = vi.fn(() => mockPage)

            const result = await strategy.performSend(target, message)

            expect(result.success).toBe(false)
            expect(result.errorType).toBeDefined()
        })
    })
})
