import { app } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import { spawn, exec } from 'child_process'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)
const stat = promisify(fs.stat)

export interface ScriptConfig {
  id: string
  name: string
  description: string
  type: 'pre-uninstall' | 'post-uninstall' | 'cleanup' | 'custom'
  platform: 'all' | 'win32' | 'darwin' | 'linux'
  script: string
  arguments?: string[]
  timeout: number
  runAsAdmin: boolean
  enabled: boolean
  priority: number
}

export interface ScriptResult {
  success: boolean
  output: string
  error?: string
  duration: number
  exitCode?: number
}

export interface ScriptManager {
  loadScripts: (scriptsDir: string) => Promise<void>
  executeScript: (scriptId: string, context: any) => Promise<ScriptResult>
  executeScripts: (type: string, context: any) => Promise<ScriptResult[]>
  addScript: (config: ScriptConfig) => Promise<void>
  removeScript: (scriptId: string) => Promise<void>
  getScript: (scriptId: string) => ScriptConfig | undefined
  getAllScripts: () => ScriptConfig[]
  validateScript: (config: ScriptConfig) => Promise<boolean>
}

export class UninstallerScriptManager implements ScriptManager {
  private scripts: Map<string, ScriptConfig> = new Map()
  private scriptsDir: string
  private configFile: string
  private logger: any

  constructor(logger: any, scriptsDir?: string) {
    this.logger = logger
    this.scriptsDir = scriptsDir || path.join(app.getPath('userData'), 'scripts')
    this.configFile = path.join(this.scriptsDir, 'scripts-config.json')
  }

  /**
   * Initialize the script manager
   */
  async initialize(): Promise<void> {
    try {
      await this.ensureScriptsDirectory()
      await this.loadScripts(this.scriptsDir)
      
      this.logger.info('Script manager initialized', {
        scriptsLoaded: this.scripts.size
      })
    } catch (error) {
      this.logger.error('Failed to initialize script manager', { error })
      throw error
    }
  }

  /**
   * Load scripts from a directory
   */
  async loadScripts(scriptsDir: string): Promise<void> {
    try {
      if (!fs.existsSync(scriptsDir)) {
        return
      }

      // Load script configurations
      const configPath = path.join(scriptsDir, 'scripts-config.json')
      if (fs.existsSync(configPath)) {
        const configContent = await readFile(configPath, 'utf8')
        const scriptConfigs: ScriptConfig[] = JSON.parse(configContent)
        
        for (const config of scriptConfigs) {
          if (await this.validateScript(config)) {
            this.scripts.set(config.id, config)
          }
        }
      }

      // Load individual script files
      const entries = await fs.promises.readdir(scriptsDir, { withFileTypes: true })
      const scriptFiles = entries
        .filter(entry => entry.isFile() && this.isScriptFile(entry.name))
        .map(entry => path.join(scriptsDir, entry.name))

      for (const scriptFile of scriptFiles) {
        try {
          const config = await this.loadScriptFromFile(scriptFile)
          if (config && await this.validateScript(config)) {
            this.scripts.set(config.id, config)
          }
        } catch (error) {
          this.logger.warn('Failed to load script file', { scriptFile, error })
        }
      }
    } catch (error) {
      this.logger.error('Failed to load scripts', { scriptsDir, error })
      throw error
    }
  }

  /**
   * Execute a specific script
   */
  async executeScript(scriptId: string, context: any): Promise<ScriptResult> {
    const script = this.scripts.get(scriptId)
    if (!script) {
      throw new Error(`Script ${scriptId} not found`)
    }

    if (!script.enabled) {
      return {
        success: true,
        output: 'Script disabled, skipping execution',
        duration: 0
      }
    }

    // Check platform compatibility
    if (script.platform !== 'all' && script.platform !== process.platform) {
      return {
        success: true,
        output: `Script not compatible with platform ${process.platform}`,
        duration: 0
      }
    }

    const startTime = Date.now()
    
    try {
      this.logger.info('Executing script', {
        scriptId,
        scriptName: script.name,
        type: script.type
      })

      let result: ScriptResult

      if (script.type === 'custom') {
        result = await this.executeCustomScript(script, context)
      } else {
        result = await this.executeSystemScript(script, context)
      }

      result.duration = Date.now() - startTime

      this.logger.info('Script execution completed', {
        scriptId,
        success: result.success,
        duration: result.duration
      })

      return result
    } catch (error) {
      const duration = Date.now() - startTime
      this.logger.error('Script execution failed', {
        scriptId,
        error,
        duration
      })

      return {
        success: false,
        output: '',
        error: error instanceof Error ? error.message : String(error),
        duration
      }
    }
  }

  /**
   * Execute all scripts of a specific type
   */
  async executeScripts(type: string, context: any): Promise<ScriptResult[]> {
    const scripts = Array.from(this.scripts.values())
      .filter(script => script.type === type && script.enabled)
      .sort((a, b) => b.priority - a.priority)

    const results: ScriptResult[] = []
    
    for (const script of scripts) {
      try {
        const result = await this.executeScript(script.id, context)
        results.push(result)
        
        // Stop execution if a critical script fails
        if (!result.success && script.priority >= 100) {
          break
        }
      } catch (error) {
        this.logger.error('Failed to execute script', { scriptId: script.id, error })
        results.push({
          success: false,
          output: '',
          error: error instanceof Error ? error.message : String(error),
          duration: 0
        })
      }
    }

    return results
  }

  /**
   * Add a new script
   */
  async addScript(config: ScriptConfig): Promise<void> {
    try {
      if (await this.validateScript(config)) {
        this.scripts.set(config.id, config)
        await this.saveScriptsConfig()
        
        this.logger.info('Script added successfully', {
          scriptId: config.id,
          scriptName: config.name
        })
      } else {
        throw new Error('Invalid script configuration')
      }
    } catch (error) {
      this.logger.error('Failed to add script', { config, error })
      throw error
    }
  }

  /**
   * Remove a script
   */
  async removeScript(scriptId: string): Promise<void> {
    try {
      if (this.scripts.has(scriptId)) {
        this.scripts.delete(scriptId)
        await this.saveScriptsConfig()
        
        this.logger.info('Script removed successfully', { scriptId })
      } else {
        throw new Error(`Script ${scriptId} not found`)
      }
    } catch (error) {
      this.logger.error('Failed to remove script', { scriptId, error })
      throw error
    }
  }

  /**
   * Get a script by ID
   */
  getScript(scriptId: string): ScriptConfig | undefined {
    return this.scripts.get(scriptId)
  }

  /**
   * Get all scripts
   */
  getAllScripts(): ScriptConfig[] {
    return Array.from(this.scripts.values())
  }

  /**
   * Validate a script configuration
   */
  async validateScript(config: ScriptConfig): Promise<boolean> {
    try {
      // Check required fields
      if (!config.id || !config.name || !config.script) {
        return false
      }

      // Check platform compatibility
      if (config.platform !== 'all' && !['win32', 'darwin', 'linux'].includes(config.platform)) {
        return false
      }

      // Check script type
      if (!['pre-uninstall', 'post-uninstall', 'cleanup', 'custom'].includes(config.type)) {
        return false
      }

      // Check timeout
      if (config.timeout <= 0 || config.timeout > 300000) { // Max 5 minutes
        return false
      }

      // Check priority
      if (config.priority < 0 || config.priority > 1000) {
        return false
      }

      return true
    } catch (error) {
      this.logger.error('Script validation failed', { config, error })
      return false
    }
  }

  private async executeSystemScript(script: ScriptConfig, context: any): Promise<ScriptResult> {
    return new Promise((resolve, reject) => {
      const startTime = Date.now()
      let output = ''
      let error = ''

      // Determine command based on platform
      let command: string
      let args: string[]

      if (process.platform === 'win32') {
        command = 'cmd'
        args = ['/c', script.script, ...(script.arguments || [])]
      } else {
        command = 'sh'
        args = ['-c', script.script, ...(script.arguments || [])]
      }

      const child = spawn(command, args, {
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true,
        timeout: script.timeout
      })

      child.stdout?.on('data', (data) => {
        output += data.toString()
      })

      child.stderr?.on('data', (data) => {
        error += data.toString()
      })

      child.on('close', (code) => {
        const duration = Date.now() - startTime
        resolve({
          success: code === 0,
          output: output.trim(),
          error: error.trim() || undefined,
          duration,
          exitCode: code || undefined
        })
      })

      child.on('error', (err) => {
        const duration = Date.now() - startTime
        reject(new Error(`Script execution error: ${err.message}`))
      })

      child.on('timeout', () => {
        child.kill()
        const duration = Date.now() - startTime
        reject(new Error(`Script execution timeout after ${script.timeout}ms`))
      })
    })
  }

  private async executeCustomScript(script: ScriptConfig, context: any): Promise<ScriptResult> {
    try {
      // For custom scripts, we evaluate the script content
      const scriptFunction = new Function('context', 'logger', script.script)
      const startTime = Date.now()
      
      await scriptFunction(context, this.logger)
      
      const duration = Date.now() - startTime
      
      return {
        success: true,
        output: 'Custom script executed successfully',
        duration
      }
    } catch (error) {
      const duration = Date.now() - Date.now()
      return {
        success: false,
        output: '',
        error: error instanceof Error ? error.message : String(error),
        duration
      }
    }
  }

  private async loadScriptFromFile(scriptFile: string): Promise<ScriptConfig | null> {
    try {
      const content = await readFile(scriptFile, 'utf8')
      const config: ScriptConfig = JSON.parse(content)
      
      // Set default values
      config.timeout = config.timeout || 30000
      config.enabled = config.enabled !== false
      config.priority = config.priority || 0
      config.runAsAdmin = config.runAsAdmin || false
      
      return config
    } catch (error) {
      this.logger.warn('Failed to load script from file', { scriptFile, error })
      return null
    }
  }

  private isScriptFile(filename: string): boolean {
    return filename.endsWith('.json') || filename.endsWith('.js') || filename.endsWith('.sh')
  }

  private async ensureScriptsDirectory(): Promise<void> {
    if (!fs.existsSync(this.scriptsDir)) {
      await mkdir(this.scriptsDir, { recursive: true })
    }
  }

  private async saveScriptsConfig(): Promise<void> {
    try {
      const configs = Array.from(this.scripts.values())
      await writeFile(this.configFile, JSON.stringify(configs, null, 2))
    } catch (error) {
      this.logger.error('Failed to save scripts config', { error })
    }
  }
} 