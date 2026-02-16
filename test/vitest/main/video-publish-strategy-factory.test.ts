/**
 * Unit tests for VideoPublishStrategyFactory
 * Tests video publishing strategy selection, browser management, and cleanup
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { VideoPublishStrategyFactory } from '@/strategy/VideoPublishStrategyFactory'
import { YouTubePublishStrategy } from '@/strategy/YouTubePublishStrategy'
import { BilibiliPublishStrategy } from '@/strategy/BilibiliPublishStrategy'
import { BaiduVideoPublishStrategy } from '@/strategy/BaiduVideoPublishStrategy'
import { PublishPlatform } from '@/entityTypes/videoPublishType'
import { mockBrowser, mockPage } from '../../helpers/mock-factory'

describe('VideoPublishStrategyFactory', () => {
    let factory: VideoPublishStrategyFactory

    beforeEach(() => {
        factory = VideoPublishStrategyFactory.getInstance()
        vi.clearAllMocks()
    })

    afterEach(async () => {
        await factory.cleanup()
    })

    describe('Strategy Creation', () => {
        test('should create YouTube publish strategy', async () => {
            const strategy = await factory.createStrategy(PublishPlatform.YOUTUBE, { headless: true })

            expect(strategy).toBeInstanceOf(YouTubePublishStrategy)
            expect(strategy).not.toBeFalsy()
        })

        test('should create Bilibili publish strategy', async () => {
            const strategy = await factory.createStrategy(PublishPlatform.BILIBILI, { headless: true })

            expect(strategy).toBeInstanceOf(BilibiliPublishStrategy)
            expect(strategy).not.toBeFalsy()
        })

        test('should create Baidu publish strategy', async () => {
            const strategy = await factory.createStrategy(PublishPlatform.BAIDU, { headless: true })

            expect(strategy).toBeInstanceOf(BaiduVideoPublishStrategy)
            expect(strategy).not.toBeFalsy()
        })

        test('should throw error for unsupported platform', async () => {
            await expect(factory.createStrategy('unsupported' as any, {})).rejects.toThrow('Unsupported platform')
        })
    })

    describe('Browser Management', () => {
        test('should cache browser instances', async () => {
            const options1 = { headless: true }
            const options2 = { headless: true }

            const browser1 = await factory['getBrowser'](options1)
            const browser2 = await factory['getBrowser'](options2)

            // Same instance from cache
            expect(browser1).toBe(browser2)
        })

        test('should cleanup all browsers', async () => {
            await factory.createStrategy(PublishPlatform.YOUTUBE, { headless: false })
            await factory.cleanup()

            expect(factory['browserCache'].size).toBe(0)
        })
    })
})
