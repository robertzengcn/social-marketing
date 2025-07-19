import { app } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)
const appendFile = promisify(fs.appendFile)
const mkdir = promisify(fs.mkdir)

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  category: string
  message: string
  details?: any
  userId?: string
  sessionId: string
}

export interface LogConfig {
  level: LogLevel
  maxFileSize: number // in bytes
  maxFiles: number
  enableConsole: boolean
  enableFile: boolean
  logDirectory: string
  includeTimestamp: boolean
  includeSessionId: boolean
}

export interface UninstallReport {
  sessionId: string
  startTime: string
  endTime: string
  duration: number // in milliseconds
  status: 'success' | 'failed' | 'cancelled'
  itemsRemoved: number
  itemsFailed: number
  totalSize: number
  errors: string[]
  warnings: string[]
  userActions: string[]
  systemInfo: {
    platform: string
    version: string
    arch: string
    nodeVersion: string
    electronVersion: string
  }
}

export class UninstallerLogger {
  private config: LogConfig
  private logFile: string
  private reportFile: string
  private sessionId: string
  private logBuffer: LogEntry[] = []
  private report: Partial<UninstallReport> = {}
  private isInitialized = false

  constructor(config?: Partial<LogConfig>) {
    this.config = {
      level: LogLevel.INFO,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      enableConsole: true,
      enableFile: true,
      logDirectory: path.join(app.getPath('userData'), 'logs'),
      includeTimestamp: true,
      includeSessionId: true,
      ...config
    }

    this.sessionId = this.generateSessionId()
    this.logFile = path.join(this.config.logDirectory, 'uninstaller.log')
    this.reportFile = path.join(this.config.logDirectory, `uninstall-report-${this.sessionId}.json`)
  }

  /**
   * Initialize the logger
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Ensure log directory exists
      await this.ensureLogDirectory()

      // Initialize report
      this.report = {
        sessionId: this.sessionId,
        startTime: new Date().toISOString(),
        status: 'success',
        itemsRemoved: 0,
        itemsFailed: 0,
        totalSize: 0,
        errors: [],
        warnings: [],
        userActions: [],
        systemInfo: {
          platform: process.platform,
          version: app.getVersion(),
          arch: process.arch,
          nodeVersion: process.version,
          electronVersion: process.versions.electron
        }
      }

      // Log initialization
      this.info('Logger initialized', { sessionId: this.sessionId })
      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize logger:', error)
    }
  }

  /**
   * Log a debug message
   */
  debug(message: string, details?: any, category = 'general'): void {
    this.log(LogLevel.DEBUG, message, details, category)
  }

  /**
   * Log an info message
   */
  info(message: string, details?: any, category = 'general'): void {
    this.log(LogLevel.INFO, message, details, category)
  }

  /**
   * Log a warning message
   */
  warn(message: string, details?: any, category = 'general'): void {
    this.log(LogLevel.WARN, message, details, category)
    this.report.warnings?.push(`${new Date().toISOString()}: ${message}`)
  }

  /**
   * Log an error message
   */
  error(message: string, details?: any, category = 'general'): void {
    this.log(LogLevel.ERROR, message, details, category)
    this.report.errors?.push(`${new Date().toISOString()}: ${message}`)
  }

  /**
   * Log a fatal error message
   */
  fatal(message: string, details?: any, category = 'general'): void {
    this.log(LogLevel.FATAL, message, details, category)
    this.report.errors?.push(`${new Date().toISOString()}: FATAL - ${message}`)
    this.report.status = 'failed'
  }

  /**
   * Log user actions
   */
  logUserAction(action: string, details?: any): void {
    this.info(`User Action: ${action}`, details, 'user-action')
    this.report.userActions?.push(`${new Date().toISOString()}: ${action}`)
  }

  /**
   * Log item removal
   */
  logItemRemoved(itemPath: string, size: number): void {
    this.info(`Item removed: ${itemPath}`, { size }, 'removal')
    this.report.itemsRemoved = (this.report.itemsRemoved || 0) + 1
    this.report.totalSize = (this.report.totalSize || 0) + size
  }

  /**
   * Log item removal failure
   */
  logItemFailed(itemPath: string, error: string): void {
    this.error(`Failed to remove item: ${itemPath}`, { error }, 'removal')
    this.report.itemsFailed = (this.report.itemsFailed || 0) + 1
  }

  /**
   * Mark uninstall as cancelled
   */
  markCancelled(): void {
    this.info('Uninstall cancelled by user', {}, 'cancellation')
    this.report.status = 'cancelled'
  }

  /**
   * Complete the uninstall session
   */
  async completeSession(): Promise<void> {
    this.report.endTime = new Date().toISOString()
    this.report.duration = new Date(this.report.endTime!).getTime() - new Date(this.report.startTime!).getTime()

    this.info('Uninstall session completed', {
      duration: this.report.duration,
      status: this.report.status,
      itemsRemoved: this.report.itemsRemoved,
      itemsFailed: this.report.itemsFailed
    }, 'session')

    // Save report
    await this.saveReport()

    // Flush log buffer
    await this.flushBuffer()
  }

  /**
   * Get the current session ID
   */
  getSessionId(): string {
    return this.sessionId
  }

  /**
   * Get the current report
   */
  getReport(): Partial<UninstallReport> {
    return { ...this.report }
  }

  /**
   * Save the uninstall report
   */
  async saveReport(): Promise<void> {
    try {
      await writeFile(this.reportFile, JSON.stringify(this.report, null, 2))
      this.info('Uninstall report saved', { reportFile: this.reportFile }, 'report')
    } catch (error) {
      console.error('Failed to save uninstall report:', error)
    }
  }

  /**
   * Get all uninstall reports
   */
  async getReports(): Promise<UninstallReport[]> {
    try {
      const files = await fs.promises.readdir(this.config.logDirectory)
      const reportFiles = files.filter(file => file.startsWith('uninstall-report-') && file.endsWith('.json'))

      const reports: UninstallReport[] = []
      for (const file of reportFiles) {
        try {
          const content = await fs.promises.readFile(path.join(this.config.logDirectory, file), 'utf8')
          reports.push(JSON.parse(content))
        } catch (error) {
          console.warn(`Failed to read report file ${file}:`, error)
        }
      }

      return reports.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    } catch (error) {
      console.error('Failed to get reports:', error)
      return []
    }
  }

  /**
   * Clean up old log files
   */
  async cleanupOldLogs(): Promise<void> {
    try {
      const files = await fs.promises.readdir(this.config.logDirectory)
      const logFiles = files.filter(file => file.endsWith('.log')).map(file => ({
        name: file,
        path: path.join(this.config.logDirectory, file)
      }))

      // Sort by modification time
      const fileStats = await Promise.all(
        logFiles.map(async file => ({
          ...file,
          stats: await fs.promises.stat(file.path)
        }))
      )

      fileStats.sort((a, b) => b.stats.mtime.getTime() - a.stats.mtime.getTime())

      // Remove old files beyond maxFiles limit
      if (fileStats.length > this.config.maxFiles) {
        const filesToRemove = fileStats.slice(this.config.maxFiles)
        for (const file of filesToRemove) {
          await fs.promises.unlink(file.path)
          this.info(`Removed old log file: ${file.name}`, {}, 'cleanup')
        }
      }
    } catch (error) {
      console.error('Failed to cleanup old logs:', error)
    }
  }

  private async log(level: LogLevel, message: string, details?: any, category = 'general'): Promise<void> {
    if (level < this.config.level) return

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      details,
      sessionId: this.sessionId
    }

    // Add to buffer
    this.logBuffer.push(entry)

    // Log to console if enabled
    if (this.config.enableConsole) {
      this.logToConsole(entry)
    }

    // Flush buffer if it gets too large
    if (this.logBuffer.length >= 10) {
      await this.flushBuffer()
    }
  }

  private logToConsole(entry: LogEntry): void {
    const levelStr = LogLevel[entry.level]
    const timestamp = this.config.includeTimestamp ? `[${entry.timestamp}]` : ''
    const session = this.config.includeSessionId ? `[${entry.sessionId}]` : ''
    const category = `[${entry.category}]`
    
    const message = `${timestamp}${session} ${levelStr} ${category} ${entry.message}`
    
    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(message, entry.details)
        break
      case LogLevel.INFO:
        console.info(message, entry.details)
        break
      case LogLevel.WARN:
        console.warn(message, entry.details)
        break
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(message, entry.details)
        break
    }
  }

  private async flushBuffer(): Promise<void> {
    if (this.logBuffer.length === 0 || !this.config.enableFile) return

    try {
      const logEntries = this.logBuffer.map(entry => {
        const levelStr = LogLevel[entry.level]
        const timestamp = this.config.includeTimestamp ? `[${entry.timestamp}]` : ''
        const session = this.config.includeSessionId ? `[${entry.sessionId}]` : ''
        const category = `[${entry.category}]`
        
        let logLine = `${timestamp}${session} ${levelStr} ${category} ${entry.message}`
        
        if (entry.details) {
          logLine += ` ${JSON.stringify(entry.details)}`
        }
        
        return logLine
      }).join('\n') + '\n'

      await appendFile(this.logFile, logEntries)
      this.logBuffer = []
    } catch (error) {
      console.error('Failed to flush log buffer:', error)
    }
  }

  private async ensureLogDirectory(): Promise<void> {
    if (!fs.existsSync(this.config.logDirectory)) {
      await mkdir(this.config.logDirectory, { recursive: true })
    }
  }

  private generateSessionId(): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const random = Math.random().toString(36).substring(2, 8)
    return `${timestamp}-${random}`
  }
} 