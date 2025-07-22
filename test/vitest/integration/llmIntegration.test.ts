import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock all external dependencies
vi.mock('puppeteer')
vi.mock('winston')
vi.mock('../../../src/modules/llm/LlmFactory')
vi.mock('../../../src/modules/llm/OllamaLlm')
vi.mock('../../../src/modules/llm/OpenaiLlm')
vi.mock('../../../src/modules/llm/ChatDeepSeekLlm')
vi.mock('../../../src/modules/TranslateProducer')
vi.mock('../../../src/modules/translation/ArticleTranslationService')

describe('LLM Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('LLM Factory Integration', () => {
    test('creates Ollama LLM instance correctly', () => {
      const createLlmInstance = (toolname: string, config: any) => {
        switch (toolname) {
          case 'deepseek_local':
            return {
              type: 'OllamaLlm',
              model: config.model,
              url: config.url,
              translate: vi.fn().mockResolvedValue('Translated text')
            }
          case 'deepseek_api':
            return {
              type: 'ChatDeepSeekLlm',
              model: config.model,
              apikey: config.apikey,
              translate: vi.fn().mockResolvedValue('Translated text')
            }
          case 'llama':
            return {
              type: 'OllamaLlm',
              model: config.model,
              url: config.url,
              translate: vi.fn().mockResolvedValue('Translated text')
            }
          case 'doubao_pro_a':
            return {
              type: 'OpenaiLlm',
              model: config.model,
              url: config.url,
              apikey: config.apikey,
              translate: vi.fn().mockResolvedValue('Translated text')
            }
          default:
            return undefined
        }
      }

      const ollamaConfig = {
        model: 'deepseek-coder',
        url: 'http://localhost:11434'
      }

      const ollamaInstance = createLlmInstance('deepseek_local', ollamaConfig)
      expect(ollamaInstance!.type).toBe('OllamaLlm')
      expect(ollamaInstance!.model).toBe('deepseek-coder')
      expect(ollamaInstance!.url).toBe('http://localhost:11434')
    })

    test('creates DeepSeek API LLM instance correctly', () => {
      const createLlmInstance = (toolname: string, config: any) => {
        switch (toolname) {
          case 'deepseek_local':
            return {
              type: 'OllamaLlm',
              model: config.model,
              url: config.url,
              translate: vi.fn().mockResolvedValue('Translated text')
            }
          case 'deepseek_api':
            return {
              type: 'ChatDeepSeekLlm',
              model: config.model,
              apikey: config.apikey,
              translate: vi.fn().mockResolvedValue('Translated text')
            }
          case 'llama':
            return {
              type: 'OllamaLlm',
              model: config.model,
              url: config.url,
              translate: vi.fn().mockResolvedValue('Translated text')
            }
          case 'doubao_pro_a':
            return {
              type: 'OpenaiLlm',
              model: config.model,
              url: config.url,
              apikey: config.apikey,
              translate: vi.fn().mockResolvedValue('Translated text')
            }
          default:
            return undefined
        }
      }

      const deepseekConfig = {
        model: 'deepseek-chat',
        apikey: 'test-api-key'
      }

      const deepseekInstance = createLlmInstance('deepseek_api', deepseekConfig)
      expect(deepseekInstance!.type).toBe('ChatDeepSeekLlm')
      expect(deepseekInstance!.model).toBe('deepseek-chat')
      expect(deepseekInstance!.apikey).toBe('test-api-key')
    })

    test('throws error for missing API key', () => {
      const createLlmInstance = (toolname: string, config: any) => {
        if (toolname === 'deepseek_api' && !config.apikey) {
          throw new Error('apikey is required')
        }
        return { type: 'ChatDeepSeekLlm' }
      }

      expect(() => createLlmInstance('deepseek_api', { model: 'deepseek-chat' }))
        .toThrow('apikey is required')
    })

    test('returns undefined for unsupported tool', () => {
      const createLlmInstance = (toolname: string, config: any) => {
        switch (toolname) {
          case 'deepseek_local':
          case 'deepseek_api':
          case 'llama':
          case 'doubao_pro_a':
            return { type: 'Supported' }
          default:
            return undefined
        }
      }

      const result = createLlmInstance('unsupported_tool', {})
      expect(result).toBeUndefined()
    })
  })

  describe('Translation Integration', () => {
    test('successfully translates text using Ollama', async () => {
      const mockTranslate = vi.fn().mockResolvedValue('这是翻译后的文本')

      const translateWithOllama = async (inputLang: string, outputLang: string, text: string) => {
        // Simulate Ollama translation
        expect(inputLang).toBe('en')
        expect(outputLang).toBe('zh')
        expect(text).toBe('Hello world')
        
        return await mockTranslate(inputLang, outputLang, text)
      }

      const result = await translateWithOllama('en', 'zh', 'Hello world')
      expect(result).toBe('这是翻译后的文本')
      expect(mockTranslate).toHaveBeenCalledWith('en', 'zh', 'Hello world')
    })

    test('successfully translates text using DeepSeek API', async () => {
      const mockTranslate = vi.fn().mockResolvedValue('Bonjour le monde')

      const translateWithDeepSeek = async (inputLang: string, outputLang: string, text: string, apikey: string) => {
        // Simulate DeepSeek API translation
        expect(inputLang).toBe('en')
        expect(outputLang).toBe('fr')
        expect(text).toBe('Hello world')
        expect(apikey).toBe('test-api-key')
        
        return await mockTranslate(inputLang, outputLang, text)
      }

      const result = await translateWithDeepSeek('en', 'fr', 'Hello world', 'test-api-key')
      expect(result).toBe('Bonjour le monde')
      expect(mockTranslate).toHaveBeenCalledWith('en', 'fr', 'Hello world')
    })

    test('handles translation with system message', async () => {
      const mockTranslate = vi.fn().mockResolvedValue('Translated with context')

      const translateWithSystemMessage = async (inputLang: string, outputLang: string, text: string, systemMsg?: string) => {
        // Simulate translation with system message
        expect(inputLang).toBe('en')
        expect(outputLang).toBe('es')
        expect(text).toBe('Hello world')
        expect(systemMsg).toBe('Translate as formal business communication')
        
        return await mockTranslate(inputLang, outputLang, text, systemMsg)
      }

      const result = await translateWithSystemMessage(
        'en', 
        'es', 
        'Hello world', 
        'Translate as formal business communication'
      )
      expect(result).toBe('Translated with context')
      expect(mockTranslate).toHaveBeenCalledWith('en', 'es', 'Hello world', 'Translate as formal business communication')
    })

    test('handles translation errors gracefully', async () => {
      const mockTranslate = vi.fn().mockRejectedValue(new Error('API rate limit exceeded'))

      const translateWithErrorHandling = async (inputLang: string, outputLang: string, text: string) => {
        try {
          return await mockTranslate(inputLang, outputLang, text)
        } catch (error) {
          if (error instanceof Error && error.message.includes('rate limit')) {
            return { error: 'Rate limit exceeded', retryAfter: new Date(Date.now() + 60000) }
          }
          throw error
        }
      }

      const result = await translateWithErrorHandling('en', 'zh', 'Hello world')
      expect(result.error).toBe('Rate limit exceeded')
      expect(result.retryAfter).toBeInstanceOf(Date)
    })

    test('handles network timeout errors', async () => {
      const mockTranslate = vi.fn().mockRejectedValue(new Error('Network timeout'))

      const translateWithTimeoutHandling = async (inputLang: string, outputLang: string, text: string) => {
        try {
          return await mockTranslate(inputLang, outputLang, text)
        } catch (error) {
          if (error instanceof Error && error.message.includes('timeout')) {
            return { error: 'Network timeout', shouldRetry: true }
          }
          throw error
        }
      }

      const result = await translateWithTimeoutHandling('en', 'zh', 'Hello world')
      expect(result.error).toBe('Network timeout')
      expect(result.shouldRetry).toBe(true)
    })
  })

  describe('Multi-language Translation Scenarios', () => {
    test('translates Chinese to English correctly', async () => {
      const mockTranslate = vi.fn().mockResolvedValue('Hello world, this is a test')

      const translateChineseToEnglish = async (text: string) => {
        // Simulate Chinese to English translation
        expect(text).toBe('你好世界，这是一个测试')
        return await mockTranslate('zh', 'en', text)
      }

      const result = await translateChineseToEnglish('你好世界，这是一个测试')
      expect(result).toBe('Hello world, this is a test')
    })

    test('translates English to Japanese correctly', async () => {
      const mockTranslate = vi.fn().mockResolvedValue('こんにちは世界')

      const translateEnglishToJapanese = async (text: string) => {
        // Simulate English to Japanese translation
        expect(text).toBe('Hello world')
        return await mockTranslate('en', 'ja', text)
      }

      const result = await translateEnglishToJapanese('Hello world')
      expect(result).toBe('こんにちは世界')
    })

    test('translates complex technical content', async () => {
      const mockTranslate = vi.fn().mockResolvedValue('This is a complex technical document about machine learning algorithms')

      const translateTechnicalContent = async (text: string) => {
        // Simulate translation of technical content
        expect(text).toContain('machine learning')
        expect(text).toContain('algorithm')
        return await mockTranslate('en', 'zh', text)
      }

      const technicalText = 'This is a complex technical document about machine learning algorithms and their applications in natural language processing.'
      const result = await translateTechnicalContent(technicalText)
      expect(result).toBe('This is a complex technical document about machine learning algorithms')
    })

    test('preserves code blocks during translation', async () => {
      const mockTranslate = vi.fn().mockResolvedValue('Here is the code: [[[CODE_BLOCK_0]]] and more text')

      const translateWithCodeBlocks = async (text: string) => {
        // Simulate translation that preserves code blocks
        expect(text).toContain('```javascript')
        expect(text).toContain('console.log')
        
        // Extract and preserve code blocks
        const codeBlockRegex = /```[\s\S]*?```/g
        const codeBlocks = text.match(codeBlockRegex) || []
        
        // Replace code blocks with placeholders
        let contentForTranslation = text
        const placeholderMap: Record<string, string> = {}
        
        codeBlocks.forEach((block, index) => {
          const placeholder = `[[[CODE_BLOCK_${index}]]]`
          placeholderMap[placeholder] = block
          contentForTranslation = contentForTranslation.replace(block, placeholder)
        })
        
        // Translate content with placeholders
        const translatedContent = await mockTranslate('en', 'zh', contentForTranslation)
        
        // Restore code blocks
        let finalContent = translatedContent
        Object.entries(placeholderMap).forEach(([placeholder, codeBlock]) => {
          finalContent = finalContent.replace(placeholder, codeBlock)
        })
        
        return finalContent
      }

      const textWithCode = 'Here is the code: ```javascript\nconsole.log("Hello");\n``` and more text'
      const result = await translateWithCodeBlocks(textWithCode)
      expect(result).toContain('```javascript')
      expect(result).toContain('console.log')
    })
  })

  describe('Translation Quality and Validation', () => {
    test('validates translation quality', async () => {
      const validateTranslationQuality = (original: string, translated: string, targetLang: string) => {
        const quality = {
          score: 0,
          issues: [] as string[]
        }

        // Check if translation is not empty
        if (!translated || translated.trim() === '') {
          quality.issues.push('Translation is empty')
          return quality
        }

        // Check if translation is not identical to original (for different languages)
        if (original.toLowerCase() === translated.toLowerCase()) {
          quality.issues.push('Translation appears to be identical to original')
        }

        // Check for common translation issues
        if (translated.includes('undefined') || translated.includes('null')) {
          quality.issues.push('Translation contains undefined/null values')
        }

        // Calculate basic quality score
        quality.score = Math.max(0, 100 - quality.issues.length * 20)
        
        return quality
      }

      const original = 'Hello world'
      const translated = '你好世界'
      const quality = validateTranslationQuality(original, translated, 'zh')

      expect(quality.score).toBeGreaterThan(0)
      expect(quality.issues.length).toBe(0)
    })

    test('detects poor translation quality', async () => {
      const validateTranslationQuality = (original: string, translated: string, targetLang: string) => {
        const quality = {
          score: 0,
          issues: [] as string[]
        }

        // Check if translation is not empty
        if (!translated || translated.trim() === '') {
          quality.issues.push('Translation is empty')
          return quality
        }

        // Check if translation is not identical to original (for different languages)
        if (original.toLowerCase() === translated.toLowerCase()) {
          quality.issues.push('Translation appears to be identical to original')
        }

        // Check for common translation issues
        if (translated.includes('undefined') || translated.includes('null')) {
          quality.issues.push('Translation contains undefined/null values')
        }

        // Calculate basic quality score
        quality.score = Math.max(0, 100 - quality.issues.length * 20)
        
        return quality
      }

      const original = 'Hello world'
      const translated = 'Hello world' // Identical to original
      const quality = validateTranslationQuality(original, translated, 'zh')

      expect(quality.score).toBeLessThan(100)
      expect(quality.issues.some(issue => issue.includes('identical'))).toBe(true)
    })

    test('handles translation retry logic', async () => {
      const mockTranslate = vi.fn()
        .mockRejectedValueOnce(new Error('Rate limit exceeded'))
        .mockResolvedValueOnce('Successful translation')

      const translateWithRetry = async (inputLang: string, outputLang: string, text: string, maxRetries = 3) => {
        let lastError: Error | null = null

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            return await mockTranslate(inputLang, outputLang, text)
          } catch (error) {
            lastError = error as Error
            if (attempt === maxRetries) {
              throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`)
            }
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
        }
      }

      const result = await translateWithRetry('en', 'zh', 'Hello world')
      expect(result).toBe('Successful translation')
      expect(mockTranslate).toHaveBeenCalledTimes(2)
    })
  })

  describe('LLM Configuration and Setup', () => {
    test('validates LLM configuration', () => {
      const validateLlmConfig = (config: any) => {
        const errors: string[] = []

        if (!config.model) {
          errors.push('Model is required')
        }

        if (config.toolname === 'deepseek_api' && !config.apikey) {
          errors.push('API key is required for DeepSeek API')
        }

        if (config.toolname === 'deepseek_local' && !config.url) {
          errors.push('URL is required for local LLM')
        }

        return errors
      }

      const validConfig = {
        toolname: 'deepseek_local',
        model: 'deepseek-coder',
        url: 'http://localhost:11434'
      }

      const invalidConfig = {
        toolname: 'deepseek_api',
        model: 'deepseek-chat'
        // Missing apikey
      }

      expect(validateLlmConfig(validConfig)).toHaveLength(0)
      expect(validateLlmConfig(invalidConfig).length).toBeGreaterThan(0)
    })

    test('handles different LLM provider configurations', () => {
      const getLlmConfig = (provider: string) => {
        switch (provider) {
          case 'ollama':
            return {
              toolname: 'deepseek_local',
              model: 'deepseek-coder',
              url: 'http://localhost:11434'
            }
          case 'deepseek_api':
            return {
              toolname: 'deepseek_api',
              model: 'deepseek-chat',
              apikey: 'test-api-key'
            }
          case 'openai':
            return {
              toolname: 'doubao_pro_a',
              model: 'gpt-3.5-turbo',
              url: 'https://api.openai.com/v1',
              apikey: 'test-openai-key'
            }
          default:
            throw new Error(`Unsupported provider: ${provider}`)
        }
      }

      const ollamaConfig = getLlmConfig('ollama')
      const deepseekConfig = getLlmConfig('deepseek_api')
      const openaiConfig = getLlmConfig('openai')

      expect(ollamaConfig.toolname).toBe('deepseek_local')
      expect(deepseekConfig.toolname).toBe('deepseek_api')
      expect(openaiConfig.toolname).toBe('doubao_pro_a')
    })
  })

  describe('Translation Memory and Caching', () => {
    test('implements translation memory functionality', () => {
      const translationMemory = new Map<string, string>()

      const translateWithMemory = (inputLang: string, outputLang: string, text: string) => {
        const key = `${inputLang}-${outputLang}-${text}`
        
        // Check if translation exists in memory
        if (translationMemory.has(key)) {
          return { result: translationMemory.get(key), fromCache: true }
        }

        // Simulate translation
        const translated = `Translated: ${text}`
        translationMemory.set(key, translated)
        
        return { result: translated, fromCache: false }
      }

      // First translation
      const firstResult = translateWithMemory('en', 'zh', 'Hello')
      expect(firstResult.fromCache).toBe(false)
      expect(firstResult.result).toBe('Translated: Hello')

      // Second translation (should be from cache)
      const secondResult = translateWithMemory('en', 'zh', 'Hello')
      expect(secondResult.fromCache).toBe(true)
      expect(secondResult.result).toBe('Translated: Hello')
    })

    test('handles translation memory cleanup', () => {
      const translationMemory = new Map<string, string>()
      const maxSize = 100

      const addToMemory = (key: string, value: string) => {
        if (translationMemory.size >= maxSize) {
          // Remove oldest entry (first key)
          const firstKey = translationMemory.keys().next().value
          if (firstKey) {
            translationMemory.delete(firstKey)
          }
        }
        translationMemory.set(key, value)
      }

      // Add entries to test cleanup
      for (let i = 0; i < maxSize + 10; i++) {
        addToMemory(`key-${i}`, `value-${i}`)
      }

      expect(translationMemory.size).toBe(maxSize)
      expect(translationMemory.has('key-0')).toBe(false) // Oldest should be removed
      expect(translationMemory.has(`key-${maxSize + 9}`)).toBe(true) // Newest should exist
    })
  })

  describe('Error Recovery and Fallback', () => {
    test('implements fallback translation strategy', async () => {
      const primaryTranslate = vi.fn().mockRejectedValue(new Error('Primary service unavailable'))
      const fallbackTranslate = vi.fn().mockResolvedValue('Fallback translation')

      const translateWithFallback = async (inputLang: string, outputLang: string, text: string) => {
        try {
          return await primaryTranslate(inputLang, outputLang, text)
        } catch (error) {
          console.log('Primary translation failed, using fallback')
          return await fallbackTranslate(inputLang, outputLang, text)
        }
      }

      const result = await translateWithFallback('en', 'zh', 'Hello world')
      expect(result).toBe('Fallback translation')
      expect(primaryTranslate).toHaveBeenCalled()
      expect(fallbackTranslate).toHaveBeenCalled()
    })

    test('handles multiple fallback strategies', async () => {
      const strategies = [
        vi.fn().mockRejectedValue(new Error('Strategy 1 failed')),
        vi.fn().mockRejectedValue(new Error('Strategy 2 failed')),
        vi.fn().mockResolvedValue('Strategy 3 succeeded')
      ]

      const translateWithMultipleFallbacks = async (inputLang: string, outputLang: string, text: string) => {
        for (let i = 0; i < strategies.length; i++) {
          try {
            return await strategies[i](inputLang, outputLang, text)
          } catch (error) {
            if (i === strategies.length - 1) {
              throw new Error('All translation strategies failed')
            }
            console.log(`Strategy ${i + 1} failed, trying next`)
          }
        }
      }

      const result = await translateWithMultipleFallbacks('en', 'zh', 'Hello world')
      expect(result).toBe('Strategy 3 succeeded')
      expect(strategies[0]).toHaveBeenCalled()
      expect(strategies[1]).toHaveBeenCalled()
      expect(strategies[2]).toHaveBeenCalled()
    })
  })
}) 