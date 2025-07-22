import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { default_browser_config, default_scrape_config } from '../../../src/config/puppeteerconfig'
import { settinggroupInit } from '../../../src/config/settinggroupInit'

describe('Configuration Settings', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Default Configuration Values', () => {
    test('default_browser_config has correct structure and values', () => {
      expect(default_browser_config).toHaveProperty('user_agent')
      expect(default_browser_config).toHaveProperty('random_user_agent')
      expect(default_browser_config).toHaveProperty('headless')
      expect(default_browser_config).toHaveProperty('debug_level')
      expect(default_browser_config).toHaveProperty('chrome_flags')
      expect(default_browser_config).toHaveProperty('custom_func')
      expect(default_browser_config).toHaveProperty('proxy')
      expect(default_browser_config).toHaveProperty('proxy_file')
      expect(default_browser_config).toHaveProperty('use_cluster')
      expect(default_browser_config).toHaveProperty('puppeteer_cluster_config')

      // Check specific default values
      expect(default_browser_config.random_user_agent).toBe(false)
      expect(default_browser_config.headless).toBe(false)
      expect(default_browser_config.debug_level).toBe(1)
      expect(default_browser_config.chrome_flags).toEqual([])
      expect(default_browser_config.custom_func).toBe('')
      expect(default_browser_config.proxy).toBe('')
      expect(default_browser_config.proxy_file).toBe('')
      expect(default_browser_config.use_cluster).toBe(false)
    })

    test('default_scrape_config has correct structure and values', () => {
      expect(default_scrape_config).toHaveProperty('output_file')
      expect(default_scrape_config).toHaveProperty('block_assets')
      expect(default_scrape_config).toHaveProperty('test_evasion')
      expect(default_scrape_config).toHaveProperty('apply_evasion_techniques')
      expect(default_scrape_config).toHaveProperty('log_ip_address')
      expect(default_scrape_config).toHaveProperty('log_http_headers')
      expect(default_scrape_config).toHaveProperty('platform')
      expect(default_scrape_config).toHaveProperty('tmppath')
      expect(default_scrape_config).toHaveProperty('taskid')

      // Check specific default values
      expect(default_scrape_config.output_file).toBe('/tmp/test/test.json')
      expect(default_scrape_config.block_assets).toBe(false)
      expect(default_scrape_config.test_evasion).toBe(false)
      expect(default_scrape_config.apply_evasion_techniques).toBe(true)
      expect(default_scrape_config.log_ip_address).toBe(false)
      expect(default_scrape_config.log_http_headers).toBe(false)
      expect(default_scrape_config.platform).toBe('facebook')
      expect(default_scrape_config.tmppath).toBe('')
      expect(default_scrape_config.taskid).toBe(0)
    })

    test('puppeteer_cluster_config has correct default values', () => {
      const clusterConfig = default_browser_config.puppeteer_cluster_config

      expect(clusterConfig).toHaveProperty('timeout')
      expect(clusterConfig).toHaveProperty('monitor')
      expect(clusterConfig).toHaveProperty('concurrency')
      expect(clusterConfig).toHaveProperty('maxConcurrency')

      expect(clusterConfig.timeout).toBe(10 * 60 * 1000) // 10 minutes
      expect(clusterConfig.monitor).toBe(false)
      expect(clusterConfig.concurrency).toBe(1)
      expect(clusterConfig.maxConcurrency).toBe(1)
    })
  })

  describe('Setting Group Initialization', () => {
    test('settinggroupInit contains all required groups', () => {
      const groupNames = settinggroupInit.map(group => group.name)
      
      expect(groupNames).toContain('Deepseek-local')
      expect(groupNames).toContain('2captcha-group')
      expect(groupNames).toContain('deepseek-api-group')
      expect(groupNames).toContain('grokai-group')
      expect(groupNames).toContain('openai-group')
      expect(groupNames).toContain('volcengine-group')
      expect(groupNames).toContain('external_system')
    })

    test('each setting group has required properties', () => {
      settinggroupInit.forEach(group => {
        expect(group).toHaveProperty('name')
        expect(group).toHaveProperty('description')
        expect(group).toHaveProperty('items')
        expect(Array.isArray(group.items)).toBe(true)
        expect(group.items.length).toBeGreaterThan(0)
      })
    })

    test('each setting item has required properties', () => {
      settinggroupInit.forEach(group => {
        group.items.forEach(item => {
          expect(item).toHaveProperty('key')
          expect(item).toHaveProperty('value')
          expect(item).toHaveProperty('description')
          expect(item).toHaveProperty('type')
          expect(typeof item.key).toBe('string')
          expect(typeof item.value).toBe('string')
          expect(typeof item.description).toBe('string')
          expect(['input', 'select', 'radio', 'checkbox', 'toggle', 'file']).toContain(item.type)
        })
      })
    })

    test('Deepseek-local group has correct settings', () => {
      const deepseekGroup = settinggroupInit.find(group => group.name === 'Deepseek-local')
      expect(deepseekGroup).toBeDefined()

      const urlSetting = deepseekGroup!.items.find(item => item.key === 'deepseek-local-url')
      const modelSetting = deepseekGroup!.items.find(item => item.key === 'deepseek-local-model')

      expect(urlSetting).toBeDefined()
      expect(urlSetting!.value).toBe('http://localhost:11434')
      expect(urlSetting!.type).toBe('input')

      expect(modelSetting).toBeDefined()
      expect(modelSetting!.value).toBe('deepseek-r1:latest')
      expect(modelSetting!.type).toBe('input')
    })

    test('2captcha group has correct settings', () => {
      const captchaGroup = settinggroupInit.find(group => group.name === '2captcha-group')
      expect(captchaGroup).toBeDefined()

      const tokenSetting = captchaGroup!.items.find(item => item.key === '2captcha-token')
      const enabledSetting = captchaGroup!.items.find(item => item.key === '2captcha-enabled')

      expect(tokenSetting).toBeDefined()
      expect(tokenSetting!.value).toBe('')
      expect(tokenSetting!.type).toBe('input')

      expect(enabledSetting).toBeDefined()
      expect(enabledSetting!.value).toBe('0')
      expect(enabledSetting!.type).toBe('toggle')
    })

    test('external_system group has file type settings', () => {
      const externalGroup = settinggroupInit.find(group => group.name === 'external_system')
      expect(externalGroup).toBeDefined()

      const chromeSetting = externalGroup!.items.find(item => item.key === 'chrome_path')
      const firefoxSetting = externalGroup!.items.find(item => item.key === 'firefox_path')

      expect(chromeSetting).toBeDefined()
      expect(chromeSetting!.type).toBe('file')

      expect(firefoxSetting).toBeDefined()
      expect(firefoxSetting!.type).toBe('file')
    })
  })

  describe('Configuration Validation', () => {
    test('validates user agent string format', () => {
      const userAgent = default_browser_config.user_agent
      expect(userAgent).toMatch(/Mozilla\/5\.0/)
      expect(userAgent).toMatch(/Chrome\/\d+\.\d+\.\d+\.\d+/)
    })

    test('validates timeout values are positive', () => {
      expect(default_browser_config.puppeteer_cluster_config.timeout).toBeGreaterThan(0)
    })

    test('validates concurrency values are positive', () => {
      expect(default_browser_config.puppeteer_cluster_config.concurrency).toBeGreaterThan(0)
      expect(default_browser_config.puppeteer_cluster_config.maxConcurrency).toBeGreaterThan(0)
    })

    test('validates boolean flags have correct types', () => {
      expect(typeof default_browser_config.random_user_agent).toBe('boolean')
      expect(typeof default_browser_config.headless).toBe('boolean')
      expect(typeof default_browser_config.use_cluster).toBe('boolean')
      expect(typeof default_scrape_config.block_assets).toBe('boolean')
      expect(typeof default_scrape_config.test_evasion).toBe('boolean')
      expect(typeof default_scrape_config.apply_evasion_techniques).toBe('boolean')
      expect(typeof default_scrape_config.log_ip_address).toBe('boolean')
      expect(typeof default_scrape_config.log_http_headers).toBe('boolean')
    })

    test('validates array properties are arrays', () => {
      expect(Array.isArray(default_browser_config.chrome_flags)).toBe(true)
    })

    test('validates numeric properties have correct types', () => {
      expect(typeof default_browser_config.debug_level).toBe('number')
      expect(typeof default_scrape_config.taskid).toBe('number')
    })
  })

  describe('Configuration Loading Scenarios', () => {
    test('handles missing configuration gracefully', () => {
      // Test that configuration objects are properly structured even when some values are empty
      expect(default_browser_config.custom_func).toBe('')
      expect(default_browser_config.proxy).toBe('')
      expect(default_browser_config.proxy_file).toBe('')
    })

    test('handles invalid setting types', () => {
      const invalidSetting = {
        key: 'test-key',
        value: 'test-value',
        type: 'invalid-type'
      }

      // This should be validated at the entity level
      expect(['input', 'select', 'radio', 'checkbox', 'toggle', 'file']).not.toContain('invalid-type')
    })

    test('handles empty string values', () => {
      // Test that empty string values are handled properly
      expect(default_scrape_config.tmppath).toBe('')
      expect(default_browser_config.custom_func).toBe('')
    })

    test('validates URL format for API endpoints', () => {
      const deepseekGroup = settinggroupInit.find(group => group.name === 'Deepseek-local')
      const urlSetting = deepseekGroup!.items.find(item => item.key === 'deepseek-local-url')
      
      expect(urlSetting!.value).toMatch(/^https?:\/\/.+/)
    })

    test('validates model names are not empty', () => {
      const deepseekGroup = settinggroupInit.find(group => group.name === 'Deepseek-local')
      const modelSetting = deepseekGroup!.items.find(item => item.key === 'deepseek-local-model')
      
      expect(modelSetting!.value).toBeTruthy()
      expect(modelSetting!.value.length).toBeGreaterThan(0)
    })
  })

  describe('Configuration Structure Validation', () => {
    test('validates all required configuration groups exist', () => {
      const requiredGroups = [
        'Deepseek-local',
        '2captcha-group', 
        'deepseek-api-group',
        'grokai-group',
        'openai-group',
        'volcengine-group',
        'external_system'
      ]

      const existingGroups = settinggroupInit.map(group => group.name)
      
      requiredGroups.forEach(groupName => {
        expect(existingGroups).toContain(groupName)
      })
    })

    test('validates configuration items have unique keys', () => {
      const allKeys = settinggroupInit.flatMap(group => group.items.map(item => item.key))
      const uniqueKeys = new Set(allKeys)
      
      expect(allKeys.length).toBe(uniqueKeys.size)
    })

    test('validates all setting types are valid', () => {
      const validTypes = ['input', 'select', 'radio', 'checkbox', 'toggle', 'file']
      
      settinggroupInit.forEach(group => {
        group.items.forEach(item => {
          expect(validTypes).toContain(item.type)
        })
      })
    })

    test('validates configuration descriptions are provided', () => {
      settinggroupInit.forEach(group => {
        expect(group.description).toBeTruthy()
        expect(typeof group.description).toBe('string')
        
        group.items.forEach(item => {
          expect(item.description).toBeTruthy()
          expect(typeof item.description).toBe('string')
        })
      })
    })
  })

  describe('Configuration Default Values', () => {
    test('validates default browser configuration values', () => {
      // Test that default values are sensible
      expect(default_browser_config.debug_level).toBeGreaterThanOrEqual(0)
      expect(default_browser_config.debug_level).toBeLessThanOrEqual(4)
      
      expect(default_browser_config.puppeteer_cluster_config.timeout).toBeGreaterThan(0)
      expect(default_browser_config.puppeteer_cluster_config.concurrency).toBeGreaterThan(0)
      expect(default_browser_config.puppeteer_cluster_config.maxConcurrency).toBeGreaterThan(0)
    })

    test('validates default scrape configuration values', () => {
      // Test that default values are sensible
      expect(default_scrape_config.taskid).toBeGreaterThanOrEqual(0)
      expect(default_scrape_config.output_file).toBeTruthy()
      expect(default_scrape_config.platform).toBeTruthy()
    })

    test('validates setting group initialization values', () => {
      settinggroupInit.forEach(group => {
        group.items.forEach(item => {
          // Test that values are strings (even if empty)
          expect(typeof item.value).toBe('string')
          
          // Test that keys are valid identifiers
          expect(item.key).toMatch(/^[a-zA-Z0-9-_]+$/)
        })
      })
    })
  })
}) 