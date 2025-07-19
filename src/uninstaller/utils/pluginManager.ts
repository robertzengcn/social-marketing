import { app } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'
import type { 
  Plugin, 
  PluginManifest, 
  PluginContext, 
  UninstallHook, 
  PluginManager, 
  PluginRegistry, 
  PluginConfig 
} from '../types/plugin'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)
const stat = promisify(fs.stat)

export class UninstallerPluginManager implements PluginManager, PluginRegistry {
  public plugins: Map<string, Plugin> = new Map()
  public hooks: Map<string, UninstallHook[]> = new Map()
  private config: PluginConfig
  private context: PluginContext
  private pluginsDir: string
  private configFile: string

  constructor(
    logger: any,
    backupManager: any,
    config?: Partial<PluginConfig>
  ) {
    this.config = {
      enabled: true,
      autoLoad: true,
      pluginsDirectory: path.join(app.getPath('userData'), 'plugins'),
      maxPlugins: 10,
      allowExternalPlugins: false,
      pluginTimeout: 30000, // 30 seconds
      sandboxMode: true,
      ...config
    }

    this.pluginsDir = this.config.pluginsDirectory
    this.configFile = path.join(this.pluginsDir, 'plugin-config.json')

    this.context = {
      logger,
      backupManager,
      platform: process.platform,
      appVersion: app.getVersion(),
      userDataPath: app.getPath('userData'),
      tempPath: app.getPath('temp'),
      config: {}
    }
  }

  /**
   * Initialize the plugin manager
   */
  async initialize(): Promise<void> {
    try {
      // Ensure plugins directory exists
      await this.ensurePluginsDirectory()

      // Load plugin configuration
      await this.loadPluginConfig()

      // Load plugins if auto-load is enabled
      if (this.config.autoLoad) {
        await this.loadPlugins(this.pluginsDir)
      }

      this.context.logger.info('Plugin manager initialized', {
        pluginsLoaded: this.plugins.size,
        hooksRegistered: this.hooks.size
      })
    } catch (error) {
      this.context.logger.error('Failed to initialize plugin manager', { error })
      throw error
    }
  }

  /**
   * Load a plugin from a directory
   */
  async loadPlugin(pluginPath: string): Promise<Plugin> {
    try {
      // Validate plugin
      const isValid = await this.validatePlugin(pluginPath)
      if (!isValid) {
        throw new Error(`Invalid plugin: ${pluginPath}`)
      }

      // Read plugin manifest
      const manifestPath = path.join(pluginPath, 'plugin.json')
      const manifestContent = await readFile(manifestPath, 'utf8')
      const manifest: PluginManifest = JSON.parse(manifestContent)

      // Check if plugin is already loaded
      if (this.plugins.has(manifest.id)) {
        throw new Error(`Plugin ${manifest.id} is already loaded`)
      }

      // Check plugin limit
      if (this.plugins.size >= this.config.maxPlugins) {
        throw new Error(`Maximum number of plugins (${this.config.maxPlugins}) reached`)
      }

      // Load plugin module
      const pluginModulePath = path.join(pluginPath, manifest.main)
      const pluginModule = require(pluginModulePath)

      // Create plugin instance
      const plugin: Plugin = {
        manifest,
        hooks: [],
        initialize: pluginModule.initialize || (() => Promise.resolve()),
        cleanup: pluginModule.cleanup || (() => Promise.resolve()),
        getConfig: pluginModule.getConfig || (() => ({})),
        setConfig: pluginModule.setConfig || (() => {})
      }

      // Initialize plugin
      await this.initializePlugin(plugin)

      // Register plugin
      this.plugins.set(manifest.id, plugin)

      // Register hooks
      if (pluginModule.hooks) {
        for (const hook of pluginModule.hooks) {
          this.registerHook(hook.name, hook)
        }
      }

      this.context.logger.info('Plugin loaded successfully', {
        pluginId: manifest.id,
        pluginName: manifest.name,
        version: manifest.version
      })

      return plugin
    } catch (error) {
      this.context.logger.error('Failed to load plugin', { pluginPath, error })
      throw error
    }
  }

  /**
   * Unload a plugin
   */
  async unloadPlugin(pluginId: string): Promise<void> {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error(`Plugin ${pluginId} not found`)
      }

      // Unregister hooks
      for (const [hookName, hooks] of this.hooks.entries()) {
        this.hooks.set(hookName, hooks.filter(hook => 
          !plugin.hooks.includes(hook)
        ))
      }

      // Cleanup plugin
      await plugin.cleanup()

      // Remove plugin
      this.plugins.delete(pluginId)

      this.context.logger.info('Plugin unloaded successfully', { pluginId })
    } catch (error) {
      this.context.logger.error('Failed to unload plugin', { pluginId, error })
      throw error
    }
  }

  /**
   * Get a plugin by ID
   */
  getPlugin(pluginId: string): Plugin | undefined {
    return this.plugins.get(pluginId)
  }

  /**
   * Get all loaded plugins
   */
  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values())
  }

  /**
   * Execute a hook
   */
  async executeHook(hookName: string, context: PluginContext, options: any): Promise<void> {
    try {
      const hooks = this.getHooks(hookName)
      if (hooks.length === 0) {
        return
      }

      // Sort hooks by priority (higher priority first)
      const sortedHooks = hooks.sort((a, b) => b.priority - a.priority)

      this.context.logger.info('Executing hook', {
        hookName,
        hookCount: sortedHooks.length
      })

      // Execute hooks with timeout
      for (const hook of sortedHooks) {
        try {
          await Promise.race([
            hook.execute(context, options),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Hook timeout')), this.config.pluginTimeout)
            )
          ])

          this.context.logger.debug('Hook executed successfully', {
            hookName,
            pluginHook: hook.name
          })
        } catch (error) {
          this.context.logger.error('Hook execution failed', {
            hookName,
            pluginHook: hook.name,
            error
          })

          // Continue with other hooks unless it's a critical error
          if (hook.priority >= 100) {
            throw error
          }
        }
      }
    } catch (error) {
      this.context.logger.error('Failed to execute hook', { hookName, error })
      throw error
    }
  }

  /**
   * Validate a plugin
   */
  async validatePlugin(pluginPath: string): Promise<boolean> {
    try {
      // Check if plugin directory exists
      const stats = await stat(pluginPath)
      if (!stats.isDirectory()) {
        return false
      }

      // Check for manifest file
      const manifestPath = path.join(pluginPath, 'plugin.json')
      if (!fs.existsSync(manifestPath)) {
        return false
      }

      // Validate manifest
      const manifestContent = await readFile(manifestPath, 'utf8')
      const manifest: PluginManifest = JSON.parse(manifestContent)

      // Check required fields
      if (!manifest.id || !manifest.name || !manifest.version || !manifest.main) {
        return false
      }

      // Check main file exists
      const mainPath = path.join(pluginPath, manifest.main)
      if (!fs.existsSync(mainPath)) {
        return false
      }

      // Check permissions if sandbox mode is enabled
      if (this.config.sandboxMode && manifest.permissions) {
        const allowedPermissions = ['read', 'write', 'network']
        for (const permission of manifest.permissions) {
          if (!allowedPermissions.includes(permission)) {
            return false
          }
        }
      }

      return true
    } catch (error) {
      this.context.logger.error('Plugin validation failed', { pluginPath, error })
      return false
    }
  }

  /**
   * Load all plugins from a directory
   */
  async loadPlugins(pluginsDir: string): Promise<void> {
    try {
      if (!fs.existsSync(pluginsDir)) {
        return
      }

      const entries = await fs.promises.readdir(pluginsDir, { withFileTypes: true })
      const pluginDirs = entries
        .filter(entry => entry.isDirectory())
        .map(entry => path.join(pluginsDir, entry.name))

      for (const pluginDir of pluginDirs) {
        try {
          await this.loadPlugin(pluginDir)
        } catch (error) {
          this.context.logger.warn('Failed to load plugin', { pluginDir, error })
        }
      }
    } catch (error) {
      this.context.logger.error('Failed to load plugins', { pluginsDir, error })
      throw error
    }
  }

  /**
   * Register a hook
   */
  registerHook(hookName: string, hook: UninstallHook): void {
    if (!this.hooks.has(hookName)) {
      this.hooks.set(hookName, [])
    }
    this.hooks.get(hookName)!.push(hook)
  }

  /**
   * Unregister a hook
   */
  unregisterHook(hookName: string, pluginId: string): void {
    const hooks = this.hooks.get(hookName)
    if (hooks) {
      this.hooks.set(hookName, hooks.filter(hook => 
        !hook.name.includes(pluginId)
      ))
    }
  }

  /**
   * Get hooks for a specific hook name
   */
  getHooks(hookName: string): UninstallHook[] {
    return this.hooks.get(hookName) || []
  }

  /**
   * Get plugin configuration
   */
  getConfig(): PluginConfig {
    return { ...this.config }
  }

  /**
   * Update plugin configuration
   */
  async updateConfig(newConfig: Partial<PluginConfig>): Promise<void> {
    this.config = { ...this.config, ...newConfig }
    await this.savePluginConfig()
  }

  /**
   * Cleanup all plugins
   */
  async cleanup(): Promise<void> {
    try {
      const pluginIds = Array.from(this.plugins.keys())
      for (const pluginId of pluginIds) {
        try {
          await this.unloadPlugin(pluginId)
        } catch (error) {
          this.context.logger.error('Failed to cleanup plugin', { pluginId, error })
        }
      }

      this.context.logger.info('Plugin manager cleanup completed')
    } catch (error) {
      this.context.logger.error('Failed to cleanup plugin manager', { error })
      throw error
    }
  }

  private async initializePlugin(plugin: Plugin): Promise<void> {
    try {
      await plugin.initialize(this.context)
      
      // Set default configuration if not provided
      const config = plugin.getConfig()
      if (Object.keys(config).length === 0 && plugin.manifest.config) {
        plugin.setConfig(plugin.manifest.config)
      }
    } catch (error) {
      this.context.logger.error('Failed to initialize plugin', {
        pluginId: plugin.manifest.id,
        error
      })
      throw error
    }
  }

  private async ensurePluginsDirectory(): Promise<void> {
    if (!fs.existsSync(this.pluginsDir)) {
      await mkdir(this.pluginsDir, { recursive: true })
    }
  }

  private async loadPluginConfig(): Promise<void> {
    try {
      if (fs.existsSync(this.configFile)) {
        const configContent = await readFile(this.configFile, 'utf8')
        const savedConfig = JSON.parse(configContent)
        this.config = { ...this.config, ...savedConfig }
      }
    } catch (error) {
      this.context.logger.warn('Failed to load plugin config', { error })
    }
  }

  private async savePluginConfig(): Promise<void> {
    try {
      await writeFile(this.configFile, JSON.stringify(this.config, null, 2))
    } catch (error) {
      this.context.logger.error('Failed to save plugin config', { error })
    }
  }
} 