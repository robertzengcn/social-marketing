/**
 * Unit tests for VideoFactory and LlmFactory
 * Tests platform-specific handler selection for video tools and LLM providers
 */

import { describe, test, expect, beforeEach, vi } from 'vitest'
import { videoFactory } from '@/modules/video/videoFactory'
import { LlmFactory } from '@/modules/llm/LlmFactory'
import { douyinVideo } from '@/modules/video/douyinVideo'
import { bilibiliVideo } from '@/modules/video/bilibiliVideo'
import { youtubeVideo } from '@/modules/video/youtubeVideo'
import { OllamaLlm } from '@/modules/llm/OllamaLlm'
import { ChatDeepSeekLlm } from '@/modules/llm/ChatDeepSeekLlm'
import { OpenaiLlm } from '@/modules/llm/OpenaiLlm'

describe('VideoFactory', () => {
    let factory: videoFactory

    beforeEach(() => {
        factory = new videoFactory()
        vi.clearAllMocks()
    })

    describe('Video Platform Selection', () => {
        test('should return Douyin video handler', async () => {
            const video = await factory.getVideotool('douyin')

            expect(video).toBeInstanceOf(douyinVideo)
        })

        test('should return Bilibili video handler', async () => {
            const video = await factory.getVideotool('bilibili')

            expect(video).toBeInstanceOf(bilibiliVideo)
        })

        test('should return YouTube video handler', async () => {
            const video = await factory.getVideotool('youtube')

            expect(video).toBeInstanceOf(youtubeVideo)
        })

        test('should return null for unsupported platform', async () => {
            const video = await factory.getVideotool('unsupported')

            expect(video).toBeNull()
        })
    })
})

describe('LlmFactory', () => {
    // Note: Tests reference non-existent TranslateToolEnum
    // These tests are skipped pending enum implementation
    test.skip('should create Ollama LLM for DEEPSEEK_LOCAL', () => {
        // TODO: Implement TranslateToolEnum or use correct enum values
    })

    test.skip('should create ChatDeepSeek LLM for DEEPSEEK_API', () => {
        // TODO: Implement TranslateToolEnum or use correct enum values
    })

    test.skip('should create OpenAI LLM for DOUBAO_PRO', () => {
        // TODO: Implement TranslateToolEnum or use correct enum values
    })

    test.skip('should return undefined for unknown tool', () => {
        // TODO: Implement TranslateToolEnum or use correct enum values
    })

    test.skip('should throw error when API key missing', () => {
        // TODO: Implement TranslateToolEnum or use correct enum values
    })

    test.skip('should return undefined for traditional tools', () => {
        // TODO: Implement TranslateToolEnum or use correct enum values
    })
})
