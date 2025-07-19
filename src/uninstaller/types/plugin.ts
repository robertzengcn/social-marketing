export interface PluginManifest {
  id: string
  name: string
  version: string
  description: string
  author: string
  license: string
  main: string
  dependencies?: string[]
  permissions?: string[]
  hooks?: string[]
  config?: Record<string, any>
}

export interface PluginContext {
  logger: any
  backupManager: any
  platform: string
  appVersion: string
  userDataPath: string
  tempPath: string
  config: Record<string, any>
}

export interface UninstallHook {
  name: string
  description: string
  priority: number
  execute: (context: PluginContext, options: any) => Promise<void>
}

export interface Plugin {
  manifest: PluginManifest
  hooks: UninstallHook[]
  initialize: (context: PluginContext) => Promise<void>
  cleanup: () => Promise<void>
  getConfig: () => Record<string, any>
  setConfig: (config: Record<string, any>) => void
}

export interface PluginManager {
  loadPlugin: (pluginPath: string) => Promise<Plugin>
  unloadPlugin: (pluginId: string) => Promise<void>
  getPlugin: (pluginId: string) => Plugin | undefined
  getAllPlugins: () => Plugin[]
  executeHook: (hookName: string, context: PluginContext, options: any) => Promise<void>
  validatePlugin: (pluginPath: string) => Promise<boolean>
}

export interface PluginRegistry {
  plugins: Map<string, Plugin>
  hooks: Map<string, UninstallHook[]>
  loadPlugins: (pluginsDir: string) => Promise<void>
  registerHook: (hookName: string, hook: UninstallHook) => void
  unregisterHook: (hookName: string, pluginId: string) => void
  getHooks: (hookName: string) => UninstallHook[]
}

export interface PluginConfig {
  enabled: boolean
  autoLoad: boolean
  pluginsDirectory: string
  maxPlugins: number
  allowExternalPlugins: boolean
  pluginTimeout: number
  sandboxMode: boolean
} 