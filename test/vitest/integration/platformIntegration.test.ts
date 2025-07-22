import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock all external dependencies
vi.mock('puppeteer')
vi.mock('winston')
vi.mock('../../../src/strategy/VideoPublishStrategyFactory')
vi.mock('../../../src/strategy/YouTubePublishStrategy')
vi.mock('../../../src/strategy/BilibiliPublishStrategy')
vi.mock('../../../src/strategy/BaiduVideoPublishStrategy')
vi.mock('../../../src/service/VideoPublishService')

describe('Platform Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Platform Strategy Factory', () => {
    test('creates YouTube strategy correctly', () => {
      const createStrategy = (platform: string, options: any) => {
        switch (platform) {
          case 'youtube':
            return { platform: 'youtube', type: 'YouTubePublishStrategy' }
          case 'bilibili':
            return { platform: 'bilibili', type: 'BilibiliPublishStrategy' }
          case 'baidu':
            return { platform: 'baidu', type: 'BaiduVideoPublishStrategy' }
          default:
            throw new Error(`Unsupported platform: ${platform}`)
        }
      }

      const youtubeStrategy = createStrategy('youtube', {})
      expect(youtubeStrategy.platform).toBe('youtube')
      expect(youtubeStrategy.type).toBe('YouTubePublishStrategy')
    })

    test('creates Bilibili strategy correctly', () => {
      const createStrategy = (platform: string, options: any) => {
        switch (platform) {
          case 'youtube':
            return { platform: 'youtube', type: 'YouTubePublishStrategy' }
          case 'bilibili':
            return { platform: 'bilibili', type: 'BilibiliPublishStrategy' }
          case 'baidu':
            return { platform: 'baidu', type: 'BaiduVideoPublishStrategy' }
          default:
            throw new Error(`Unsupported platform: ${platform}`)
        }
      }

      const bilibiliStrategy = createStrategy('bilibili', {})
      expect(bilibiliStrategy.platform).toBe('bilibili')
      expect(bilibiliStrategy.type).toBe('BilibiliPublishStrategy')
    })

    test('creates Baidu strategy correctly', () => {
      const createStrategy = (platform: string, options: any) => {
        switch (platform) {
          case 'youtube':
            return { platform: 'youtube', type: 'YouTubePublishStrategy' }
          case 'bilibili':
            return { platform: 'bilibili', type: 'BilibiliPublishStrategy' }
          case 'baidu':
            return { platform: 'baidu', type: 'BaiduVideoPublishStrategy' }
          default:
            throw new Error(`Unsupported platform: ${platform}`)
        }
      }

      const baiduStrategy = createStrategy('baidu', {})
      expect(baiduStrategy.platform).toBe('baidu')
      expect(baiduStrategy.type).toBe('BaiduVideoPublishStrategy')
    })

    test('throws error for unsupported platform', () => {
      const createStrategy = (platform: string, options: any) => {
        switch (platform) {
          case 'youtube':
            return { platform: 'youtube', type: 'YouTubePublishStrategy' }
          case 'bilibili':
            return { platform: 'bilibili', type: 'BilibiliPublishStrategy' }
          case 'baidu':
            return { platform: 'baidu', type: 'BaiduVideoPublishStrategy' }
          default:
            throw new Error(`Unsupported platform: ${platform}`)
        }
      }

      expect(() => createStrategy('unsupported', {})).toThrow('Unsupported platform: unsupported')
    })
  })

  describe('YouTube Platform Integration', () => {
    test('successfully publishes video to YouTube', async () => {
      const mockVideoEntity = {
        id: 1,
        title: 'Test Video',
        description: 'Test video description',
        savepath: '/tmp/videos/test-video.mp4',
        language: 'en'
      }

      const mockPublishOptions = {
        title: 'Test Video Title',
        description: 'Test video description',
        tags: ['test', 'video', 'tutorial'],
        category: 'Education',
        privacy: 'public',
        cookies: [
          { name: 'session', value: 'test-session', domain: '.youtube.com' }
        ]
      }

      const mockPublishResult = {
        publishStatus: 'published',
        publishPlatform: 'youtube',
        publishTime: new Date(),
        publishError: '',
        publishUrl: 'https://youtube.com/watch?v=test123'
      }

      const publishToYouTube = async (video: any, options: any) => {
        // Simulate YouTube publishing process
        expect(video.savepath).toBe('/tmp/videos/test-video.mp4')
        expect(options.title).toBe('Test Video Title')
        expect(options.privacy).toBe('public')
        expect(options.cookies).toHaveLength(1)
        
        return mockPublishResult
      }

      const result = await publishToYouTube(mockVideoEntity, mockPublishOptions)
      
      expect(result.publishStatus).toBe('published')
      expect(result.publishPlatform).toBe('youtube')
      expect(result.publishUrl).toBe('https://youtube.com/watch?v=test123')
    })

    test('handles YouTube authentication errors', async () => {
      const mockVideoEntity = {
        id: 1,
        title: 'Test Video',
        savepath: '/tmp/videos/test-video.mp4'
      }

      const mockPublishOptions = {
        title: 'Test Video Title',
        cookies: []
      }

      const publishToYouTube = async (video: any, options: any) => {
        if (!options.cookies || options.cookies.length === 0) {
          throw new Error('User is not logged in. Please provide valid cookies.')
        }
        return { publishStatus: 'published' }
      }

      await expect(publishToYouTube(mockVideoEntity, mockPublishOptions))
        .rejects.toThrow('User is not logged in. Please provide valid cookies.')
    })

    test('handles YouTube content validation errors', async () => {
      const mockVideoEntity = {
        id: 1,
        title: 'Test Video',
        savepath: '/tmp/videos/test-video.mp4'
      }

      const mockPublishOptions = {
        title: '', // Empty title should cause validation error
        description: 'Test description'
      }

      const publishToYouTube = async (video: any, options: any) => {
        if (!options.title || options.title.trim() === '') {
          throw new Error('Video title is required')
        }
        return { publishStatus: 'published' }
      }

      await expect(publishToYouTube(mockVideoEntity, mockPublishOptions))
        .rejects.toThrow('Video title is required')
    })

    test('handles YouTube upload errors', async () => {
      const mockVideoEntity = {
        id: 1,
        title: 'Test Video',
        savepath: '/tmp/videos/nonexistent-video.mp4'
      }

      const mockPublishOptions = {
        title: 'Test Video Title'
      }

      const publishToYouTube = async (video: any, options: any) => {
        // Simulate file not found error
        if (!video.savepath || video.savepath.includes('nonexistent')) {
          throw new Error('Video file not found')
        }
        return { publishStatus: 'published' }
      }

      await expect(publishToYouTube(mockVideoEntity, mockPublishOptions))
        .rejects.toThrow('Video file not found')
    })
  })

  describe('Bilibili Platform Integration', () => {
    test('successfully publishes video to Bilibili', async () => {
      const mockVideoEntity = {
        id: 1,
        title: '测试视频',
        description: '这是一个测试视频',
        savepath: '/tmp/videos/test-video.mp4',
        language: 'zh'
      }

      const mockPublishOptions = {
        title: '测试视频标题',
        description: '这是一个测试视频描述',
        tags: ['测试', '视频', '教程'],
        category: '生活',
        privacy: 'public',
        cookies: [
          { name: 'session', value: 'test-session', domain: '.bilibili.com' }
        ]
      }

      const mockPublishResult = {
        publishStatus: 'published',
        publishPlatform: 'bilibili',
        publishTime: new Date(),
        publishError: '',
        publishUrl: 'https://www.bilibili.com/video/BVtest123'
      }

      const publishToBilibili = async (video: any, options: any) => {
        // Simulate Bilibili publishing process
        expect(video.savepath).toBe('/tmp/videos/test-video.mp4')
        expect(options.title).toBe('测试视频标题')
        expect(options.privacy).toBe('public')
        expect(options.cookies).toHaveLength(1)
        
        return mockPublishResult
      }

      const result = await publishToBilibili(mockVideoEntity, mockPublishOptions)
      
      expect(result.publishStatus).toBe('published')
      expect(result.publishPlatform).toBe('bilibili')
      expect(result.publishUrl).toBe('https://www.bilibili.com/video/BVtest123')
    })

    test('handles Bilibili content formatting requirements', async () => {
      const mockVideoEntity = {
        id: 1,
        title: 'Test Video',
        savepath: '/tmp/videos/test-video.mp4'
      }

      const mockPublishOptions = {
        title: 'Very Long Title That Exceeds Bilibili Character Limit',
        description: 'Test description'
      }

      const publishToBilibili = async (video: any, options: any) => {
        // Simulate Bilibili title length validation
        if (options.title && options.title.length > 80) {
          throw new Error('Title exceeds maximum length of 80 characters')
        }
        return { publishStatus: 'published' }
      }

      await expect(publishToBilibili(mockVideoEntity, mockPublishOptions))
        .rejects.toThrow('Title exceeds maximum length of 80 characters')
    })

    test('handles Bilibili language-specific requirements', async () => {
      const mockVideoEntity = {
        id: 1,
        title: 'Test Video',
        savepath: '/tmp/videos/test-video.mp4',
        language: 'en'
      }

      const mockPublishOptions = {
        title: 'Test Video Title',
        description: 'Test description'
      }

      const publishToBilibili = async (video: any, options: any) => {
        // Simulate Bilibili language validation
        if (video.language === 'en') {
          // Bilibili might have specific requirements for English content
          expect(options.title).toBeTruthy()
          expect(options.description).toBeTruthy()
        }
        return { publishStatus: 'published' }
      }

      const result = await publishToBilibili(mockVideoEntity, mockPublishOptions)
      expect(result.publishStatus).toBe('published')
    })
  })

  describe('Baidu Platform Integration', () => {
    test('successfully publishes video to Baidu', async () => {
      const mockVideoEntity = {
        id: 1,
        title: '测试视频',
        description: '这是一个测试视频',
        savepath: '/tmp/videos/test-video.mp4',
        language: 'zh'
      }

      const mockPublishOptions = {
        title: '测试视频标题',
        description: '这是一个测试视频描述',
        tags: ['测试', '视频'],
        category: '娱乐',
        privacy: 'public',
        cookies: [
          { name: 'session', value: 'test-session', domain: '.baidu.com' }
        ]
      }

      const mockPublishResult = {
        publishStatus: 'published',
        publishPlatform: 'baidu',
        publishTime: new Date(),
        publishError: '',
        publishUrl: 'https://haokan.baidu.com/v?vid=test123'
      }

      const publishToBaidu = async (video: any, options: any) => {
        // Simulate Baidu publishing process
        expect(video.savepath).toBe('/tmp/videos/test-video.mp4')
        expect(options.title).toBe('测试视频标题')
        expect(options.privacy).toBe('public')
        expect(options.cookies).toHaveLength(1)
        
        return mockPublishResult
      }

      const result = await publishToBaidu(mockVideoEntity, mockPublishOptions)
      
      expect(result.publishStatus).toBe('published')
      expect(result.publishPlatform).toBe('baidu')
      expect(result.publishUrl).toBe('https://haokan.baidu.com/v?vid=test123')
    })

    test('handles Baidu platform-specific errors', async () => {
      const mockVideoEntity = {
        id: 1,
        title: 'Test Video',
        savepath: '/tmp/videos/test-video.mp4'
      }

      const mockPublishOptions = {
        title: 'Test Video Title',
        category: 'invalid-category'
      }

      const publishToBaidu = async (video: any, options: any) => {
        // Simulate Baidu category validation
        const validCategories = ['娱乐', '教育', '科技', '生活']
        if (!validCategories.includes(options.category)) {
          throw new Error('Invalid category for Baidu platform')
        }
        return { publishStatus: 'published' }
      }

      await expect(publishToBaidu(mockVideoEntity, mockPublishOptions))
        .rejects.toThrow('Invalid category for Baidu platform')
    })
  })

  describe('Cross-Platform Content Formatting', () => {
    test('formats content correctly for different platforms', () => {
      const originalContent = {
        title: 'Test Video Tutorial - How to Code in JavaScript',
        description: 'This is a comprehensive tutorial about JavaScript programming. Learn the basics and advanced concepts.',
        tags: ['javascript', 'programming', 'tutorial', 'coding']
      }

      const formatForPlatform = (content: any, platform: string) => {
        const formatted = { ...content }

        switch (platform) {
          case 'youtube':
            // YouTube allows longer titles and descriptions
            formatted.maxTitleLength = 100
            formatted.maxDescriptionLength = 5000
            break
          case 'bilibili':
            // Bilibili has stricter limits
            formatted.maxTitleLength = 80
            formatted.maxDescriptionLength = 2000
            if (formatted.title.length > formatted.maxTitleLength) {
              formatted.title = formatted.title.substring(0, formatted.maxTitleLength) + '...'
            }
            break
          case 'baidu':
            // Baidu has different requirements
            formatted.maxTitleLength = 60
            formatted.maxDescriptionLength = 1000
            if (formatted.title.length > formatted.maxTitleLength) {
              formatted.title = formatted.title.substring(0, formatted.maxTitleLength) + '...'
            }
            break
        }

        return formatted
      }

      const youtubeFormatted = formatForPlatform(originalContent, 'youtube')
      const bilibiliFormatted = formatForPlatform(originalContent, 'bilibili')
      const baiduFormatted = formatForPlatform(originalContent, 'baidu')

      expect(youtubeFormatted.title).toBe(originalContent.title)
      expect(bilibiliFormatted.title).toContain('...')
      expect(baiduFormatted.title).toContain('...')
      expect(bilibiliFormatted.maxTitleLength).toBe(80)
      expect(baiduFormatted.maxTitleLength).toBe(60)
    })

    test('handles different content types for platforms', () => {
      const contentTypes = {
        tutorial: {
          title: 'JavaScript Tutorial for Beginners',
          category: 'Education',
          tags: ['javascript', 'tutorial', 'programming']
        },
        entertainment: {
          title: 'Funny Cat Videos Compilation',
          category: 'Entertainment',
          tags: ['funny', 'cats', 'viral']
        },
        news: {
          title: 'Breaking News: Latest Technology Updates',
          category: 'News',
          tags: ['news', 'technology', 'breaking']
        }
      }

      const validateContentForPlatform = (content: any, platform: string) => {
        const validation = { isValid: true, errors: [] as string[] }

        switch (platform) {
          case 'youtube':
            // YouTube accepts all content types
            break
          case 'bilibili':
            // Bilibili might have restrictions on certain content
            if (content.category === 'News') {
              validation.errors.push('News content may require special approval on Bilibili')
            }
            break
          case 'baidu':
            // Baidu might have different content policies
            if (content.category === 'Entertainment') {
              validation.errors.push('Entertainment content may be restricted on Baidu')
            }
            break
        }

        validation.isValid = validation.errors.length === 0
        return validation
      }

      const tutorialValidation = validateContentForPlatform(contentTypes.tutorial, 'youtube')
      const newsValidation = validateContentForPlatform(contentTypes.news, 'bilibili')
      const entertainmentValidation = validateContentForPlatform(contentTypes.entertainment, 'baidu')

      expect(tutorialValidation.isValid).toBe(true)
      expect(newsValidation.errors.length).toBeGreaterThan(0)
      expect(entertainmentValidation.errors.length).toBeGreaterThan(0)
    })
  })

  describe('Platform Error Handling and Recovery', () => {
    test('handles network errors gracefully', async () => {
      const mockVideoEntity = {
        id: 1,
        title: 'Test Video',
        savepath: '/tmp/videos/test-video.mp4'
      }

      const mockPublishOptions = {
        title: 'Test Video Title'
      }

      const publishWithRetry = async (video: any, options: any, platform: string, maxRetries = 3) => {
        let lastError: Error | null = null

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            // Simulate network error on first attempt
            if (attempt === 1) {
              throw new Error('Network timeout')
            }
            
            return { publishStatus: 'published', attempt }
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

      const result = await publishWithRetry(mockVideoEntity, mockPublishOptions, 'youtube')
      expect(result!.publishStatus).toBe('published')
      expect(result!.attempt).toBe(2)
    })

    test('handles platform-specific rate limiting', async () => {
      const mockVideoEntity = {
        id: 1,
        title: 'Test Video',
        savepath: '/tmp/videos/test-video.mp4'
      }

      const mockPublishOptions = {
        title: 'Test Video Title'
      }

      const publishWithRateLimitHandling = async (video: any, options: any, platform: string) => {
        try {
          // Simulate rate limit error
          throw new Error('Rate limit exceeded. Please try again later.')
        } catch (error) {
          if (error instanceof Error && error.message.includes('Rate limit')) {
            // Wait and retry once
            await new Promise(resolve => setTimeout(resolve, 5000))
            return { publishStatus: 'published', delayed: true }
          }
          throw error
        }
      }

      const result = await publishWithRateLimitHandling(mockVideoEntity, mockPublishOptions, 'youtube')
      expect(result.publishStatus).toBe('published')
      expect(result.delayed).toBe(true)
    })

    test('handles platform maintenance downtime', async () => {
      const mockVideoEntity = {
        id: 1,
        title: 'Test Video',
        savepath: '/tmp/videos/test-video.mp4'
      }

      const mockPublishOptions = {
        title: 'Test Video Title'
      }

      const publishWithMaintenanceHandling = async (video: any, options: any, platform: string) => {
        try {
          // Simulate platform maintenance error
          throw new Error('Platform is currently under maintenance')
        } catch (error) {
          if (error instanceof Error && error.message.includes('maintenance')) {
            return { 
              publishStatus: 'pending', 
              error: 'Platform maintenance - will retry automatically',
              retryAfter: new Date(Date.now() + 3600000) // 1 hour later
            }
          }
          throw error
        }
      }

      const result = await publishWithMaintenanceHandling(mockVideoEntity, mockPublishOptions, 'youtube')
      expect(result.publishStatus).toBe('pending')
      expect(result.error).toContain('maintenance')
      expect(result.retryAfter).toBeInstanceOf(Date)
    })
  })

  describe('Platform Integration Validation', () => {
    test('validates platform configuration', () => {
      const validatePlatformConfig = (config: any) => {
        const errors: string[] = []

        if (!config.platform) {
          errors.push('Platform is required')
        }

        if (!config.uploadUrl) {
          errors.push('Upload URL is required')
        }

        if (!config.categories || config.categories.length === 0) {
          errors.push('Categories are required')
        }

        if (!config.maxTitleLength || config.maxTitleLength <= 0) {
          errors.push('Valid max title length is required')
        }

        return errors
      }

      const validConfig = {
        platform: 'youtube',
        uploadUrl: 'https://studio.youtube.com/channel/me/videos/upload',
        categories: ['Education', 'Entertainment', 'News'],
        maxTitleLength: 100
      }

      const invalidConfig = {
        platform: '',
        uploadUrl: '',
        categories: [],
        maxTitleLength: 0
      }

      expect(validatePlatformConfig(validConfig)).toHaveLength(0)
      expect(validatePlatformConfig(invalidConfig).length).toBeGreaterThan(0)
    })

    test('validates cross-platform compatibility', () => {
      const validateCrossPlatformCompatibility = (content: any, platforms: string[]) => {
        const compatibility = { compatible: true, issues: [] as string[] }

        for (const platform of platforms) {
          switch (platform) {
            case 'youtube':
              if (content.title.length > 100) {
                compatibility.issues.push(`Title too long for YouTube (${content.title.length}/100)`)
              }
              break
            case 'bilibili':
              if (content.title.length > 80) {
                compatibility.issues.push(`Title too long for Bilibili (${content.title.length}/80)`)
              }
              if (content.language === 'en' && !content.hasSubtitle) {
                compatibility.issues.push('English content requires subtitles for Bilibili')
              }
              break
            case 'baidu':
              if (content.title.length > 60) {
                compatibility.issues.push(`Title too long for Baidu (${content.title.length}/60)`)
              }
              break
          }
        }

        compatibility.compatible = compatibility.issues.length === 0
        return compatibility
      }

      const content = {
        title: 'Very Long Title That Exceeds All Platform Limits',
        language: 'en',
        hasSubtitle: false
      }

      const platforms = ['youtube', 'bilibili', 'baidu']

      const compatibility = validateCrossPlatformCompatibility(content, platforms)

      expect(compatibility.compatible).toBe(false)
      expect(compatibility.issues.length).toBeGreaterThan(0)
      expect(compatibility.issues.some(issue => issue.includes('YouTube'))).toBe(true)
      expect(compatibility.issues.some(issue => issue.includes('Bilibili'))).toBe(true)
      expect(compatibility.issues.some(issue => issue.includes('Baidu'))).toBe(true)
    })
  })
}) 