import { app } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import * as archiver from 'archiver'
import extract from 'extract-zip'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)
const mkdir = promisify(fs.mkdir)
const stat = promisify(fs.stat)

export interface BackupItem {
  id: string
  name: string
  path: string
  type: 'file' | 'directory' | 'registry'
  size: number
  included: boolean
}

export interface BackupMetadata {
  version: string
  timestamp: string
  platform: string
  items: BackupItem[]
  totalSize: number
  checksum: string
}

export interface BackupOptions {
  includeUserData: boolean
  includeSettings: boolean
  includeCache: boolean
  includeLogs: boolean
  includeDatabase: boolean
  compressionLevel: number
  createChecksum: boolean
}

export class BackupManager {
  private backupDir: string
  private metadataFile: string

  constructor() {
    this.backupDir = path.join(app.getPath('userData'), 'backups')
    this.metadataFile = path.join(this.backupDir, 'backup-metadata.json')
  }

  /**
   * Create a backup of the application data
   */
  async createBackup(options: BackupOptions): Promise<string> {
    try {
      // Ensure backup directory exists
      await this.ensureBackupDir()

      // Generate backup ID and filename
      const backupId = this.generateBackupId()
      const backupFilename = `social-marketing-backup-${backupId}.zip`
      const backupPath = path.join(this.backupDir, backupFilename)

      // Collect items to backup
      const items = await this.collectBackupItems(options)

      // Create backup archive
      await this.createBackupArchive(backupPath, items, options)

      // Create metadata
      const metadata = await this.createBackupMetadata(backupId, items, options)

      // Save metadata
      await this.saveBackupMetadata(backupId, metadata)

      return backupPath
    } catch (error) {
      throw new Error(`Failed to create backup: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Restore from a backup file
   */
  async restoreBackup(backupPath: string, options: {
    overwriteExisting: boolean
    restoreUserData: boolean
    restoreSettings: boolean
    restoreCache: boolean
    restoreLogs: boolean
    restoreDatabase: boolean
  }): Promise<void> {
    try {
      // Validate backup file
      await this.validateBackupFile(backupPath)

      // Extract backup
      const extractDir = path.join(this.backupDir, 'temp-restore')
      await this.extractBackup(backupPath, extractDir)

      // Read metadata
      const metadata = await this.readBackupMetadata(extractDir)

      // Restore items based on options
      await this.restoreItems(extractDir, metadata, options)

      // Cleanup
      await this.cleanupTempFiles(extractDir)
    } catch (error) {
      throw new Error(`Failed to restore backup: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * List available backups
   */
  async listBackups(): Promise<BackupMetadata[]> {
    try {
      await this.ensureBackupDir()

      const files = await fs.promises.readdir(this.backupDir)
      const backupFiles = files.filter(file => file.endsWith('.zip'))

      const backups: BackupMetadata[] = []
      for (const file of backupFiles) {
        try {
          const metadata = await this.getBackupMetadata(file)
          if (metadata) {
            backups.push(metadata)
          }
        } catch (error) {
          console.warn(`Failed to read metadata for ${file}:`, error)
        }
      }

      return backups.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    } catch (error) {
      throw new Error(`Failed to list backups: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Delete a backup
   */
  async deleteBackup(backupId: string): Promise<void> {
    try {
      const backupPath = path.join(this.backupDir, `social-marketing-backup-${backupId}.zip`)
      const metadataPath = path.join(this.backupDir, `${backupId}-metadata.json`)

      // Delete backup file
      if (fs.existsSync(backupPath)) {
        await fs.promises.unlink(backupPath)
      }

      // Delete metadata file
      if (fs.existsSync(metadataPath)) {
        await fs.promises.unlink(metadataPath)
      }
    } catch (error) {
      throw new Error(`Failed to delete backup: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Get backup size and estimated restore time
   */
  async getBackupInfo(backupPath: string): Promise<{
    size: number
    estimatedRestoreTime: number
    itemCount: number
  }> {
    try {
      const stats = await stat(backupPath)
      const metadata = await this.getBackupMetadataFromPath(backupPath)

      return {
        size: stats.size,
        estimatedRestoreTime: Math.ceil(stats.size / (1024 * 1024) * 0.1), // Rough estimate
        itemCount: metadata.items.length
      }
    } catch (error) {
      throw new Error(`Failed to get backup info: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  private async ensureBackupDir(): Promise<void> {
    if (!fs.existsSync(this.backupDir)) {
      await mkdir(this.backupDir, { recursive: true })
    }
  }

  private generateBackupId(): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const random = Math.random().toString(36).substring(2, 8)
    return `${timestamp}-${random}`
  }

  private async collectBackupItems(options: BackupOptions): Promise<BackupItem[]> {
    const items: BackupItem[] = []

    // Application files
    const appPath = app.getPath('exe')
    if (fs.existsSync(appPath)) {
      const stats = await stat(appPath)
      items.push({
        id: 'app-exe',
        name: 'Application Executable',
        path: appPath,
        type: 'file',
        size: stats.size,
        included: true
      })
    }

    // User data
    if (options.includeUserData) {
      const userDataPath = app.getPath('userData')
      if (fs.existsSync(userDataPath)) {
        const stats = await stat(userDataPath)
        items.push({
          id: 'user-data',
          name: 'User Data',
          path: userDataPath,
          type: 'directory',
          size: stats.size,
          included: true
        })
      }
    }

    // Settings
    if (options.includeSettings) {
      const settingsPath = path.join(app.getPath('userData'), 'settings.json')
      if (fs.existsSync(settingsPath)) {
        const stats = await stat(settingsPath)
        items.push({
          id: 'settings',
          name: 'Application Settings',
          path: settingsPath,
          type: 'file',
          size: stats.size,
          included: true
        })
      }
    }

    // Cache
    if (options.includeCache) {
      const cachePath = app.getPath('temp')
      if (fs.existsSync(cachePath)) {
        const stats = await stat(cachePath)
        items.push({
          id: 'cache',
          name: 'Cache Files',
          path: cachePath,
          type: 'directory',
          size: stats.size,
          included: true
        })
      }
    }

    // Logs
    if (options.includeLogs) {
      const logsPath = path.join(app.getPath('userData'), 'logs')
      if (fs.existsSync(logsPath)) {
        const stats = await stat(logsPath)
        items.push({
          id: 'logs',
          name: 'Log Files',
          path: logsPath,
          type: 'directory',
          size: stats.size,
          included: true
        })
      }
    }

    // Database
    if (options.includeDatabase) {
      const dbPath = path.join(app.getPath('userData'), 'database')
      if (fs.existsSync(dbPath)) {
        const stats = await stat(dbPath)
        items.push({
          id: 'database',
          name: 'Database Files',
          path: dbPath,
          type: 'directory',
          size: stats.size,
          included: true
        })
      }
    }

    return items
  }

  private async createBackupArchive(backupPath: string, items: BackupItem[], options: BackupOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(backupPath)
      const archive = archiver.create('zip', {
        zlib: { level: options.compressionLevel }
      })

      output.on('close', () => resolve())
      archive.on('error', (err) => reject(err))

      archive.pipe(output)

      // Add items to archive
      for (const item of items) {
        if (item.included) {
          if (item.type === 'file') {
            archive.file(item.path, { name: path.basename(item.path) })
          } else if (item.type === 'directory') {
            archive.directory(item.path, path.basename(item.path))
          }
        }
      }

      archive.finalize()
    })
  }

  private async createBackupMetadata(backupId: string, items: BackupItem[], options: BackupOptions): Promise<BackupMetadata> {
    const totalSize = items.reduce((sum, item) => sum + item.size, 0)
    
    return {
      version: app.getVersion(),
      timestamp: new Date().toISOString(),
      platform: process.platform,
      items,
      totalSize,
      checksum: await this.calculateChecksum(items)
    }
  }

  private async saveBackupMetadata(backupId: string, metadata: BackupMetadata): Promise<void> {
    const metadataPath = path.join(this.backupDir, `${backupId}-metadata.json`)
    await writeFile(metadataPath, JSON.stringify(metadata, null, 2))
  }

  private async validateBackupFile(backupPath: string): Promise<void> {
    if (!fs.existsSync(backupPath)) {
      throw new Error('Backup file does not exist')
    }

    const stats = await stat(backupPath)
    if (stats.size === 0) {
      throw new Error('Backup file is empty')
    }
  }

  private async extractBackup(backupPath: string, extractDir: string): Promise<void> {
    if (fs.existsSync(extractDir)) {
      await fs.promises.rm(extractDir, { recursive: true })
    }
    await mkdir(extractDir, { recursive: true })

    await extract(backupPath, { dir: extractDir })
  }

  private async readBackupMetadata(extractDir: string): Promise<BackupMetadata> {
    const metadataFiles = await fs.promises.readdir(extractDir)
    const metadataFile = metadataFiles.find(file => file.endsWith('-metadata.json'))
    
    if (!metadataFile) {
      throw new Error('Backup metadata not found')
    }

    const metadataPath = path.join(extractDir, metadataFile)
    const metadataContent = await readFile(metadataPath, 'utf8')
    return JSON.parse(metadataContent)
  }

  private async restoreItems(extractDir: string, metadata: BackupMetadata, options: any): Promise<void> {
    for (const item of metadata.items) {
      if (this.shouldRestoreItem(item, options)) {
        await this.restoreItem(extractDir, item)
      }
    }
  }

  private shouldRestoreItem(item: BackupItem, options: any): boolean {
    switch (item.id) {
      case 'user-data':
        return options.restoreUserData
      case 'settings':
        return options.restoreSettings
      case 'cache':
        return options.restoreCache
      case 'logs':
        return options.restoreLogs
      case 'database':
        return options.restoreDatabase
      default:
        return true
    }
  }

  private async restoreItem(extractDir: string, item: BackupItem): Promise<void> {
    const sourcePath = path.join(extractDir, path.basename(item.path))
    const targetPath = item.path

    if (fs.existsSync(sourcePath)) {
      if (item.type === 'file') {
        await fs.promises.copyFile(sourcePath, targetPath)
      } else if (item.type === 'directory') {
        await this.copyDirectory(sourcePath, targetPath)
      }
    }
  }

  private async copyDirectory(source: string, target: string): Promise<void> {
    if (!fs.existsSync(target)) {
      await mkdir(target, { recursive: true })
    }

    const files = await fs.promises.readdir(source)
    for (const file of files) {
      const sourcePath = path.join(source, file)
      const targetPath = path.join(target, file)
      
      const stats = await stat(sourcePath)
      if (stats.isDirectory()) {
        await this.copyDirectory(sourcePath, targetPath)
      } else {
        await fs.promises.copyFile(sourcePath, targetPath)
      }
    }
  }

  private async cleanupTempFiles(extractDir: string): Promise<void> {
    if (fs.existsSync(extractDir)) {
      await fs.promises.rm(extractDir, { recursive: true })
    }
  }

  private async calculateChecksum(items: BackupItem[]): Promise<string> {
    // Simple checksum calculation - in production, use a proper hashing library
    const content = items.map(item => `${item.path}:${item.size}`).join('|')
    return Buffer.from(content).toString('base64').substring(0, 16)
  }

  private async getBackupMetadata(backupFile: string): Promise<BackupMetadata | null> {
    try {
      const backupId = backupFile.replace('social-marketing-backup-', '').replace('.zip', '')
      const metadataPath = path.join(this.backupDir, `${backupId}-metadata.json`)
      
      if (fs.existsSync(metadataPath)) {
        const content = await readFile(metadataPath, 'utf8')
        return JSON.parse(content)
      }
    } catch (error) {
      console.warn('Failed to read backup metadata:', error)
    }
    return null
  }

  private async getBackupMetadataFromPath(backupPath: string): Promise<BackupMetadata> {
    const tempDir = path.join(this.backupDir, 'temp-metadata')
    await this.extractBackup(backupPath, tempDir)
    const metadata = await this.readBackupMetadata(tempDir)
    await this.cleanupTempFiles(tempDir)
    return metadata
  }
} 