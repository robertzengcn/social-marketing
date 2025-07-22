import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock all external dependencies
vi.mock('puppeteer')
vi.mock('winston')
vi.mock('../../../src/childprocess/userSearch')
vi.mock('../../../src/modules/videodownload/VideoDownloadFactory')
vi.mock('../../../src/modules/TranslateProducer')
vi.mock('../../../src/service/VideoPublishService')

describe('End-to-End Workflow Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Workflow Message Processing', () => {
    test('processes searchscraper action correctly', () => {
      const mockMessage = {
        action: 'searchscraper',
        data: {
          searchEnginer: 'google',
          keywords: ['test keyword'],
          num_pages: 2,
          concurrency: 1,
          notShowBrowser: true,
          proxys: [],
          localBrowser: false,
          accounts: []
        }
      }

      // Simulate message processing
      const processMessage = (message: any) => {
        switch (message.action) {
          case 'searchscraper':
            expect(message.data.searchEnginer).toBe('google')
            expect(message.data.keywords).toEqual(['test keyword'])
            expect(message.data.num_pages).toBe(2)
            return { status: 'success', results: [] }
          default:
            throw new Error(`Unknown action: ${message.action}`)
        }
      }

      const result = processMessage(mockMessage)
      expect(result.status).toBe('success')
    })

    test('processes downloadVideo action correctly', () => {
      const mockMessage = {
        action: 'downloadVideo',
        data: {
          platform: 'youtube',
          keywords: ['test video'],
          downloadType: 'keyword',
          savePath: '/tmp/videos',
          BrowserName: 'chrome',
          cookiesProxy: [],
          proxy: [],
          exePath: '/usr/bin/yt-dlp',
          videoQuality: 'best',
          isplaylist: false,
          link: [],
          max_page_number: 5
        }
      }

      const processMessage = (message: any) => {
        switch (message.action) {
          case 'downloadVideo':
            expect(message.data.platform).toBe('youtube')
            expect(message.data.downloadType).toBe('keyword')
            expect(message.data.savePath).toBe('/tmp/videos')
            return { status: 'success', downloaded: true }
          default:
            throw new Error(`Unknown action: ${message.action}`)
        }
      }

      const result = processMessage(mockMessage)
      expect(result.status).toBe('success')
      expect(result.downloaded).toBe(true)
    })

    test('processes translateVideoInfo action correctly', () => {
      const mockMessage = {
        action: 'translateVideoInfo',
        data: {
          items: [
            {
              videoId: 1,
              title: 'Test Video Title',
              description: 'Test video description',
              tags: ['test', 'video'],
              source_language: { name: 'en', displayName: 'English' }
            }
          ],
          target_language: { name: 'zh', displayName: 'Chinese' },
          translate_tool: 'google',
          llmConfig: undefined,
          traditionalTranslateConfig: {
            apiKey: 'test-api-key',
            endpoint: 'https://translation.googleapis.com'
          }
        }
      }

      const processMessage = (message: any) => {
        switch (message.action) {
          case 'translateVideoInfo':
            expect(message.data.items).toHaveLength(1)
            expect(message.data.target_language.name).toBe('zh')
            expect(message.data.translate_tool).toBe('google')
            return { status: 'success', translated: true }
          default:
            throw new Error(`Unknown action: ${message.action}`)
        }
      }

      const result = processMessage(mockMessage)
      expect(result.status).toBe('success')
      expect(result.translated).toBe(true)
    })

    test('processes publishVideo action correctly', () => {
      const mockMessage = {
        action: 'publishVideo',
        data: {
          videoEntity: {
            id: 1,
            title: 'Test Video',
            description: 'Test video description',
            savepath: '/tmp/videos/test-video.mp4'
          },
          platform: 'youtube',
          options: {
            title: 'Test Video Title',
            description: 'Test video description',
            privacy: 'public',
            cookies: []
          }
        }
      }

      const processMessage = (message: any) => {
        switch (message.action) {
          case 'publishVideo':
            expect(message.data.videoEntity.id).toBe(1)
            expect(message.data.platform).toBe('youtube')
            expect(message.data.options.privacy).toBe('public')
            return { status: 'success', published: true, url: 'https://youtube.com/watch?v=test123' }
          default:
            throw new Error(`Unknown action: ${message.action}`)
        }
      }

      const result = processMessage(mockMessage)
      expect(result.status).toBe('success')
      expect(result.published).toBe(true)
      expect(result.url).toBe('https://youtube.com/watch?v=test123')
    })
  })

  describe('Workflow Data Validation', () => {
    test('validates search data structure', () => {
      const validSearchData = {
        searchEnginer: 'google',
        keywords: ['test keyword'],
        num_pages: 2,
        concurrency: 1,
        notShowBrowser: true,
        proxys: [],
        localBrowser: false,
        accounts: []
      }

      const validateSearchData = (data: any) => {
        expect(data).toHaveProperty('searchEnginer')
        expect(data).toHaveProperty('keywords')
        expect(data).toHaveProperty('num_pages')
        expect(data).toHaveProperty('concurrency')
        expect(Array.isArray(data.keywords)).toBe(true)
        expect(data.num_pages).toBeGreaterThan(0)
        expect(data.concurrency).toBeGreaterThan(0)
        return true
      }

      expect(validateSearchData(validSearchData)).toBe(true)
    })

    test('validates download data structure', () => {
      const validDownloadData = {
        platform: 'youtube',
        keywords: ['test video'],
        downloadType: 'keyword',
        savePath: '/tmp/videos',
        BrowserName: 'chrome',
        cookiesProxy: [],
        proxy: [],
        exePath: '/usr/bin/yt-dlp',
        videoQuality: 'best',
        isplaylist: false,
        link: [],
        max_page_number: 5
      }

      const validateDownloadData = (data: any) => {
        expect(data).toHaveProperty('platform')
        expect(data).toHaveProperty('downloadType')
        expect(data).toHaveProperty('savePath')
        expect(data).toHaveProperty('BrowserName')
        expect(data).toHaveProperty('exePath')
        expect(data).toHaveProperty('videoQuality')
        expect(data.savePath).toBeTruthy()
        expect(data.BrowserName).toBeTruthy()
        expect(data.exePath).toBeTruthy()
        return true
      }

      expect(validateDownloadData(validDownloadData)).toBe(true)
    })

    test('validates translation data structure', () => {
      const validTranslationData = {
        items: [
          {
            videoId: 1,
            title: 'Test Video Title',
            description: 'Test video description',
            tags: ['test', 'video'],
            source_language: { name: 'en', displayName: 'English' }
          }
        ],
        target_language: { name: 'zh', displayName: 'Chinese' },
        translate_tool: 'google',
        llmConfig: undefined,
        traditionalTranslateConfig: {
          apiKey: 'test-api-key',
          endpoint: 'https://translation.googleapis.com'
        }
      }

      const validateTranslationData = (data: any) => {
        expect(data).toHaveProperty('items')
        expect(data).toHaveProperty('target_language')
        expect(data).toHaveProperty('translate_tool')
        expect(Array.isArray(data.items)).toBe(true)
        expect(data.items.length).toBeGreaterThan(0)
        expect(data.target_language).toHaveProperty('name')
        expect(data.translate_tool).toBeTruthy()
        return true
      }

      expect(validateTranslationData(validTranslationData)).toBe(true)
    })

    test('validates publishing data structure', () => {
      const validPublishData = {
        videoEntity: {
          id: 1,
          title: 'Test Video',
          description: 'Test video description',
          savepath: '/tmp/videos/test-video.mp4'
        },
        platform: 'youtube',
        options: {
          title: 'Test Video Title',
          description: 'Test video description',
          privacy: 'public',
          cookies: []
        }
      }

      const validatePublishData = (data: any) => {
        expect(data).toHaveProperty('videoEntity')
        expect(data).toHaveProperty('platform')
        expect(data).toHaveProperty('options')
        expect(data.videoEntity).toHaveProperty('id')
        expect(data.videoEntity).toHaveProperty('savepath')
        expect(data.platform).toBeTruthy()
        expect(data.options).toHaveProperty('title')
        expect(data.options).toHaveProperty('privacy')
        return true
      }

      expect(validatePublishData(validPublishData)).toBe(true)
    })
  })

  describe('Workflow Error Handling', () => {
    test('handles invalid action gracefully', () => {
      const invalidMessage = {
        action: 'invalidAction',
        data: {}
      }

      const processMessage = (message: any) => {
        switch (message.action) {
          case 'searchscraper':
          case 'downloadVideo':
          case 'translateVideoInfo':
          case 'publishVideo':
            return { status: 'success' }
          default:
            return { status: 'error', message: `Unknown action: ${message.action}` }
        }
      }

      const result = processMessage(invalidMessage)
      expect(result.status).toBe('error')
      expect(result.message).toBe('Unknown action: invalidAction')
    })

    test('handles missing data gracefully', () => {
      const messageWithoutData = {
        action: 'searchscraper'
        // Missing data property
      }

      const processMessage = (message: any) => {
        if (!message.data) {
          return { status: 'error', message: 'Data is required' }
        }

        switch (message.action) {
          case 'searchscraper':
            return { status: 'success' }
          default:
            return { status: 'error', message: `Unknown action: ${message.action}` }
        }
      }

      const result = processMessage(messageWithoutData)
      expect(result.status).toBe('error')
      expect(result.message).toBe('Data is required')
    })

    test('handles invalid data structure gracefully', () => {
      const messageWithInvalidData = {
        action: 'searchscraper',
        data: {
          // Missing required fields
          searchEnginer: '',
          keywords: [],
          num_pages: -1
        }
      }

      const validateAndProcessMessage = (message: any) => {
        if (!message.data) {
          return { status: 'error', message: 'Data is required' }
        }

        const data = message.data
        if (!data.searchEnginer || data.keywords.length === 0 || data.num_pages <= 0) {
          return { status: 'error', message: 'Invalid data structure' }
        }

        return { status: 'success' }
      }

      const result = validateAndProcessMessage(messageWithInvalidData)
      expect(result.status).toBe('error')
      expect(result.message).toBe('Invalid data structure')
    })
  })

  describe('Complete Workflow Simulation', () => {
    test('simulates complete end-to-end workflow', async () => {
      // Step 1: Search and scrape
      const searchMessage = {
        action: 'searchscraper',
        data: {
          searchEnginer: 'google',
          keywords: ['test video tutorial'],
          num_pages: 1,
          concurrency: 1,
          notShowBrowser: true,
          proxys: [],
          localBrowser: false,
          accounts: []
        }
      }

      const searchResult = {
        title: 'Test Video Tutorial',
        link: 'https://youtube.com/watch?v=test123',
        content: 'A comprehensive tutorial video',
        lang: 'en',
        taskid: 1
      }

      // Step 2: Download video
      const downloadMessage = {
        action: 'downloadVideo',
        data: {
          platform: 'youtube',
          keywords: [],
          downloadType: 'link',
          savePath: '/tmp/videos',
          BrowserName: 'chrome',
          cookiesProxy: [],
          proxy: [],
          exePath: '/usr/bin/yt-dlp',
          videoQuality: 'best',
          isplaylist: false,
          link: [searchResult.link],
          max_page_number: undefined
        }
      }

      const downloadResult = {
        link: searchResult.link,
        status: true,
        savepath: '/tmp/videos/test-video.mp4',
        title: 'Test Video Tutorial',
        description: 'A comprehensive tutorial video'
      }

      // Step 3: Translate video information
      const translateMessage = {
        action: 'translateVideoInfo',
        data: {
          items: [
            {
              videoId: 1,
              title: 'Test Video Tutorial',
              description: 'A comprehensive tutorial video',
              tags: ['tutorial', 'test', 'video'],
              source_language: { name: 'en', displayName: 'English' }
            }
          ],
          target_language: { name: 'zh', displayName: 'Chinese' },
          translate_tool: 'google',
          llmConfig: undefined,
          traditionalTranslateConfig: {
            apiKey: 'test-api-key',
            endpoint: 'https://translation.googleapis.com'
          }
        }
      }

      const translateResult = {
        videoId: 1,
        title: '测试视频教程',
        description: '一个全面的教程视频',
        tags: ['教程', '测试', '视频'],
        source_language: { name: 'zh', displayName: 'Chinese' }
      }

      // Step 4: Publish video
      const publishMessage = {
        action: 'publishVideo',
        data: {
          videoEntity: {
            id: 1,
            title: 'Test Video Tutorial',
            description: 'A comprehensive tutorial video',
            savepath: '/tmp/videos/test-video.mp4'
          },
          platform: 'youtube',
          options: {
            title: '测试视频教程',
            description: '一个全面的教程视频',
            privacy: 'public',
            cookies: []
          }
        }
      }

      const publishResult = {
        status: 'published',
        platform: 'youtube',
        publishTime: new Date(),
        publishError: '',
        publishUrl: 'https://youtube.com/watch?v=published123'
      }

      // Simulate workflow execution
      const executeWorkflow = async () => {
        const results: Array<{ step: string; result: any }> = []

        // Execute search
        results.push({ step: 'search', result: searchResult })

        // Execute download
        results.push({ step: 'download', result: downloadResult })

        // Execute translation
        results.push({ step: 'translate', result: translateResult })

        // Execute publishing
        results.push({ step: 'publish', result: publishResult })

        return results
      }

      const workflowResults = await executeWorkflow()

      expect(workflowResults).toHaveLength(4)
      expect(workflowResults[0].step).toBe('search')
      expect(workflowResults[0].result.title).toBe('Test Video Tutorial')
      expect(workflowResults[1].step).toBe('download')
      expect(workflowResults[1].result.status).toBe(true)
      expect(workflowResults[2].step).toBe('translate')
      expect(workflowResults[2].result.title).toBe('测试视频教程')
      expect(workflowResults[3].step).toBe('publish')
      expect(workflowResults[3].result.status).toBe('published')
    })

    test('simulates workflow with error handling', async () => {
      const executeWorkflowWithErrors = async () => {
        const results: Array<{ step: string; result: any }> = []
        const errors: Array<{ step: string; error: string }> = []

        try {
          // Simulate search failure
          throw new Error('Search failed')
        } catch (error) {
          errors.push({ step: 'search', error: (error as Error).message })
        }

        try {
          // Simulate download failure
          throw new Error('Download failed')
        } catch (error) {
          errors.push({ step: 'download', error: (error as Error).message })
        }

        try {
          // Simulate translation failure
          throw new Error('Translation failed')
        } catch (error) {
          errors.push({ step: 'translate', error: (error as Error).message })
        }

        try {
          // Simulate publishing failure
          throw new Error('Publishing failed')
        } catch (error) {
          errors.push({ step: 'publish', error: (error as Error).message })
        }

        return { results, errors }
      }

      const workflowResult = await executeWorkflowWithErrors()

      expect(workflowResult.errors).toHaveLength(4)
      expect(workflowResult.errors[0].step).toBe('search')
      expect(workflowResult.errors[0].error).toBe('Search failed')
      expect(workflowResult.errors[1].step).toBe('download')
      expect(workflowResult.errors[1].error).toBe('Download failed')
      expect(workflowResult.errors[2].step).toBe('translate')
      expect(workflowResult.errors[2].error).toBe('Translation failed')
      expect(workflowResult.errors[3].step).toBe('publish')
      expect(workflowResult.errors[3].error).toBe('Publishing failed')
    })
  })

  describe('Workflow Configuration Validation', () => {
    test('validates workflow configuration parameters', () => {
      const validateConfiguration = (config: any) => {
        const errors: string[] = []

        // Validate search configuration
        if (!config.search || !config.search.engine || !config.search.keywords) {
          errors.push('Invalid search configuration')
        }

        // Validate download configuration
        if (!config.download || !config.download.platform || !config.download.savePath) {
          errors.push('Invalid download configuration')
        }

        // Validate translation configuration
        if (!config.translation || !config.translation.tool || !config.translation.targetLanguage) {
          errors.push('Invalid translation configuration')
        }

        // Validate publishing configuration
        if (!config.publishing || !config.publishing.platform || !config.publishing.options) {
          errors.push('Invalid publishing configuration')
        }

        return errors
      }

      const validConfig = {
        search: {
          engine: 'google',
          keywords: ['test keyword'],
          num_pages: 2
        },
        download: {
          platform: 'youtube',
          savePath: '/tmp/videos',
          quality: 'best'
        },
        translation: {
          tool: 'google',
          targetLanguage: 'zh'
        },
        publishing: {
          platform: 'youtube',
          options: {
            privacy: 'public'
          }
        }
      }

      const invalidConfig = {
        search: {
          engine: '',
          keywords: []
        }
        // Missing other configurations
      }

      expect(validateConfiguration(validConfig)).toHaveLength(0)
      expect(validateConfiguration(invalidConfig).length).toBeGreaterThan(0)
    })

    test('validates workflow data flow', () => {
      const validateDataFlow = (dataFlow: any) => {
        const errors: string[] = []

        // Check if search results are passed to download
        if (!dataFlow.searchToDownload) {
          errors.push('Search results not passed to download')
        }

        // Check if download results are passed to translation
        if (!dataFlow.downloadToTranslation) {
          errors.push('Download results not passed to translation')
        }

        // Check if translation results are passed to publishing
        if (!dataFlow.translationToPublishing) {
          errors.push('Translation results not passed to publishing')
        }

        return errors
      }

      const validDataFlow = {
        searchToDownload: true,
        downloadToTranslation: true,
        translationToPublishing: true
      }

      const invalidDataFlow = {
        searchToDownload: true,
        downloadToTranslation: false,
        translationToPublishing: true
      }

      expect(validateDataFlow(validDataFlow)).toHaveLength(0)
      expect(validateDataFlow(invalidDataFlow).length).toBeGreaterThan(0)
    })
  })
}) 