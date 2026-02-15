/**
 * Unit tests for VideoFactory and LlmFactory
 * Tests platform-specific handler selection for video tools and LLM providers
 */

import { describe, test, expect, beforeEach, vi } from 'vitest'
import { VideoFactory } from '@/modules/video/videoFactory'
import { LlmFactory } from '@/modules/llm/LlmFactory'
import { TranslateToolEnum } from '@/entityTypes/commonType'
import { douyinVideo } from '@/modules/video/douyinVideo'
import { bilibiliVideo } from '@/modules/video/bilibiliVideo'
import { youtubeVideo } from '@/modules/video/youtubeVideo'
import { OllamaLlm } from '@/modules/llm/OllamaLlm'
import { ChatDeepSeekLlm } from '@/modules/llm/ChatDeepSeekLlm'
import { OpenaiLlm } from '@/modules/llm/OpenaiLlm'

describe('VideoFactory', () => {
    let factory: VideoFactory

    beforeEach(() => {
        factory = new VideoFactory()
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
    let factory: LlmFactory

    beforeEach(() => {
        factory = new LlmFactory()
        vi.clearAllMocks()
    })

    describe('LLM Service Selection', () => {
        test('should create Ollama LLM for DEEPSEEK_LOCAL', () => {
            const llm = factory.getLlmTool(TranslateToolEnum.DEEPSEEK_LOCAL, {
                model: 'deepseek',
                url: 'http://localhost:11434'
            })

            expect(llm).toBeInstanceOf(OllamaLlm)
        })

        test('should create ChatDeepSeek LLM for DEEPSEEK_API', () => {
            const llm = factory.getLlmTool(TranslateToolEnum.DEEPSEEK_API, {
                model: 'deepseek-chat',
                apikey: 'test-key'
            })

            expect(llm).toBeInstanceOf(ChatDeepSeekLlm)
        })

        test('should create OpenAI LLM for DOUBAO_PRO', () => {
            const llm = factory.getLlmTool(TranslateToolEnum.DOUBAO_PRO_A, {
                model: 'gpt-4',
                url: 'https://api.openai.com',
                apikey: 'test-key'
            })

            expect(llm).toBeInstanceOf(OpenaiLlm)
        })

        test('should return undefined for unknown tool', () => {
            const llm = factory.getLlmTool('unknown' as any, {})

            expect(llm).toBeUndefined()
        })

        test('should throw error when API key missing', () => {
            expect(() => {
                factory.getLlmTool(TranslateToolEnum.DEEPSEEK_API, {
                    model: 'deepseek'
                })
            }).toThrow()
        })
    })

    describe('Traditional Translate', () => {
        test('should return undefined for traditional tools', () => {
            const tool = factory.getTraditionalTool('google', {})

            expect(tool).toBeUndefined()
        })
    })
})
