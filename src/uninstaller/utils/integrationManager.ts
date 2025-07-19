import { app } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)

export interface IntegrationConfig {
  id: string
  name: string
  type: 'antivirus' | 'firewall' | 'backup' | 'monitoring' | 'custom'
  provider: string
  version: string
  enabled: boolean
  config: Record<string, any>
  apiKey?: string
  endpoint?: string
  timeout: number
  retryAttempts: number
}

export interface IntegrationResult {
  success: boolean
  message: string
  data?: any
  error?: string
  duration: number
}

export interface IntegrationProvider {
  id: string
  name: string
  type: string
  description: string
  capabilities: string[]
  initialize: (config: IntegrationConfig) => Promise<void>
  cleanup: () => Promise<void>
  execute: (action: string, params: any) => Promise<IntegrationResult>
  validate: (config: IntegrationConfig) => Promise<boolean>
}

export interface IntegrationManager {
  registerProvider: (provider: IntegrationProvider) => void
  addIntegration: (config: IntegrationConfig) => Promise<void>
  removeIntegration: (integrationId: string) => Promise<void>
  executeIntegration: (integrationId: string, action: string, params: any) => Promise<IntegrationResult>
  getIntegration: (integrationId: string) => IntegrationConfig | undefined
  getAllIntegrations: () => IntegrationConfig[]
  getProviders: () => IntegrationProvider[]
  validateIntegration: (config: IntegrationConfig) => Promise<boolean>
}

export class UninstallerIntegrationManager implements IntegrationManager {
  private integrations: Map<string, IntegrationConfig> = new Map()
  private providers: Map<string, IntegrationProvider> = new Map()
  private instances: Map<string, IntegrationProvider> = new Map()
  private configFile: string
  private logger: any

  constructor(logger: any, configDir?: string) {
    this.logger = logger
    const configPath = configDir || path.join(app.getPath('userData'), 'integrations')
    this.configFile = path.join(configPath, 'integrations-config.json')
  }

  /**
   * Initialize the integration manager
   */
  async initialize(): Promise<void> {
    try {
      await this.ensureConfigDirectory()
      await this.loadIntegrations()
      await this.initializeIntegrations()
      
      this.logger.info('Integration manager initialized', {
        integrationsLoaded: this.integrations.size,
        providersRegistered: this.providers.size
      })
    } catch (error) {
      this.logger.error('Failed to initialize integration manager', { error })
      throw error
    }
  }

  /**
   * Register a new integration provider
   */
  registerProvider(provider: IntegrationProvider): void {
    try {
      this.providers.set(provider.id, provider)
      this.logger.info('Integration provider registered', {
        providerId: provider.id,
        providerName: provider.name,
        type: provider.type
      })
    } catch (error) {
      this.logger.error('Failed to register integration provider', { provider, error })
      throw error
    }
  }

  /**
   * Add a new integration
   */
  async addIntegration(config: IntegrationConfig): Promise<void> {
    try {
      if (await this.validateIntegration(config)) {
        this.integrations.set(config.id, config)
        await this.saveIntegrationsConfig()
        
        // Initialize the integration instance
        await this.initializeIntegration(config)
        
        this.logger.info('Integration added successfully', {
          integrationId: config.id,
          integrationName: config.name,
          provider: config.provider
        })
      } else {
        throw new Error('Invalid integration configuration')
      }
    } catch (error) {
      this.logger.error('Failed to add integration', { config, error })
      throw error
    }
  }

  /**
   * Remove an integration
   */
  async removeIntegration(integrationId: string): Promise<void> {
    try {
      const integration = this.integrations.get(integrationId)
      if (!integration) {
        throw new Error(`Integration ${integrationId} not found`)
      }

      // Cleanup integration instance
      const instance = this.instances.get(integrationId)
      if (instance) {
        await instance.cleanup()
        this.instances.delete(integrationId)
      }

      // Remove integration
      this.integrations.delete(integrationId)
      await this.saveIntegrationsConfig()
      
      this.logger.info('Integration removed successfully', { integrationId })
    } catch (error) {
      this.logger.error('Failed to remove integration', { integrationId, error })
      throw error
    }
  }

  /**
   * Execute an integration action
   */
  async executeIntegration(integrationId: string, action: string, params: any): Promise<IntegrationResult> {
    try {
      const integration = this.integrations.get(integrationId)
      if (!integration) {
        throw new Error(`Integration ${integrationId} not found`)
      }

      if (!integration.enabled) {
        return {
          success: true,
          message: 'Integration disabled, skipping execution',
          duration: 0
        }
      }

      const instance = this.instances.get(integrationId)
      if (!instance) {
        throw new Error(`Integration instance ${integrationId} not initialized`)
      }

      const startTime = Date.now()
      
      this.logger.info('Executing integration', {
        integrationId,
        action,
        provider: integration.provider
      })

      const result = await instance.execute(action, params)
      result.duration = Date.now() - startTime

      this.logger.info('Integration execution completed', {
        integrationId,
        action,
        success: result.success,
        duration: result.duration
      })

      return result
    } catch (error) {
      this.logger.error('Integration execution failed', {
        integrationId,
        action,
        error
      })

      return {
        success: false,
        message: 'Integration execution failed',
        error: error instanceof Error ? error.message : String(error),
        duration: 0
      }
    }
  }

  /**
   * Get an integration by ID
   */
  getIntegration(integrationId: string): IntegrationConfig | undefined {
    return this.integrations.get(integrationId)
  }

  /**
   * Get all integrations
   */
  getAllIntegrations(): IntegrationConfig[] {
    return Array.from(this.integrations.values())
  }

  /**
   * Get all registered providers
   */
  getProviders(): IntegrationProvider[] {
    return Array.from(this.providers.values())
  }

  /**
   * Validate an integration configuration
   */
  async validateIntegration(config: IntegrationConfig): Promise<boolean> {
    try {
      // Check required fields
      if (!config.id || !config.name || !config.provider) {
        return false
      }

      // Check if provider exists
      const provider = this.providers.get(config.provider)
      if (!provider) {
        return false
      }

      // Validate with provider
      return await provider.validate(config)
    } catch (error) {
      this.logger.error('Integration validation failed', { config, error })
      return false
    }
  }

  /**
   * Execute integrations by type
   */
  async executeIntegrationsByType(type: string, action: string, params: any): Promise<IntegrationResult[]> {
    const integrations = Array.from(this.integrations.values())
      .filter(integration => integration.type === type && integration.enabled)

    const results: IntegrationResult[] = []
    
    for (const integration of integrations) {
      try {
        const result = await this.executeIntegration(integration.id, action, params)
        results.push(result)
      } catch (error) {
        this.logger.error('Failed to execute integration', { integrationId: integration.id, error })
        results.push({
          success: false,
          message: 'Integration execution failed',
          error: error instanceof Error ? error.message : String(error),
          duration: 0
        })
      }
    }

    return results
  }

  /**
   * Get integration statistics
   */
  getIntegrationStats(): {
    total: number
    enabled: number
    byType: Record<string, number>
    byProvider: Record<string, number>
  } {
    const integrations = Array.from(this.integrations.values())
    const enabled = integrations.filter(i => i.enabled).length
    
    const byType: Record<string, number> = {}
    const byProvider: Record<string, number> = {}
    
    for (const integration of integrations) {
      byType[integration.type] = (byType[integration.type] || 0) + 1
      byProvider[integration.provider] = (byProvider[integration.provider] || 0) + 1
    }

    return {
      total: integrations.length,
      enabled,
      byType,
      byProvider
    }
  }

  /**
   * Cleanup all integrations
   */
  async cleanup(): Promise<void> {
    try {
      const integrationIds = Array.from(this.integrations.keys())
      for (const integrationId of integrationIds) {
        try {
          await this.removeIntegration(integrationId)
        } catch (error) {
          this.logger.error('Failed to cleanup integration', { integrationId, error })
        }
      }

      this.logger.info('Integration manager cleanup completed')
    } catch (error) {
      this.logger.error('Failed to cleanup integration manager', { error })
      throw error
    }
  }

  private async loadIntegrations(): Promise<void> {
    try {
      if (fs.existsSync(this.configFile)) {
        const configContent = await readFile(this.configFile, 'utf8')
        const integrationConfigs: IntegrationConfig[] = JSON.parse(configContent)
        
        for (const config of integrationConfigs) {
          if (await this.validateIntegration(config)) {
            this.integrations.set(config.id, config)
          }
        }
      }
    } catch (error) {
      this.logger.error('Failed to load integrations', { error })
      throw error
    }
  }

  private async initializeIntegrations(): Promise<void> {
    try {
      for (const integration of this.integrations.values()) {
        if (integration.enabled) {
          await this.initializeIntegration(integration)
        }
      }
    } catch (error) {
      this.logger.error('Failed to initialize integrations', { error })
      throw error
    }
  }

  private async initializeIntegration(integration: IntegrationConfig): Promise<void> {
    try {
      const provider = this.providers.get(integration.provider)
      if (!provider) {
        throw new Error(`Provider ${integration.provider} not found`)
      }

      // Create a new instance of the provider
      const instance = { ...provider }
      await instance.initialize(integration)
      
      this.instances.set(integration.id, instance)
      
      this.logger.info('Integration initialized', {
        integrationId: integration.id,
        provider: integration.provider
      })
    } catch (error) {
      this.logger.error('Failed to initialize integration', {
        integrationId: integration.id,
        error
      })
      throw error
    }
  }

  private async ensureConfigDirectory(): Promise<void> {
    const configDir = path.dirname(this.configFile)
    if (!fs.existsSync(configDir)) {
      await mkdir(configDir, { recursive: true })
    }
  }

  private async saveIntegrationsConfig(): Promise<void> {
    try {
      const configs = Array.from(this.integrations.values())
      await writeFile(this.configFile, JSON.stringify(configs, null, 2))
    } catch (error) {
      this.logger.error('Failed to save integrations config', { error })
    }
  }
} 