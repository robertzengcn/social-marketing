import * as path from 'path'
import * as fs from 'fs'
import { execSync } from 'child_process'
import log from 'electron-log/main'
import { WindowsUninstaller } from './platforms/windows'
import { MacOSUninstaller } from './platforms/macos'
import { LinuxUninstaller } from './platforms/linux'

export interface UninstallProgress {
  step: string
  progress: number
  message: string
}

export interface UninstallResult {
  success: boolean
  message: string
  errors: string[]
  warnings: string[]
}

export class UninstallerManager {
  private appName: string
  private installDir: string | null = null
  private isUninstallingFlag = false
  private platformUninstaller: WindowsUninstaller | MacOSUninstaller | LinuxUninstaller

  constructor(appName: string = 'SocialMarketing') {
    this.appName = appName
    this.platformUninstaller = this.createPlatformUninstaller()
  }

  private createPlatformUninstaller() {
    switch (process.platform) {
      case 'win32':
        return new WindowsUninstaller(this.appName)
      case 'darwin':
        return new MacOSUninstaller(this.appName)
      case 'linux':
        return new LinuxUninstaller(this.appName)
      default:
        throw new Error(`Unsupported platform: ${process.platform}`)
    }
  }

  public isUninstalling(): boolean {
    return this.isUninstallingFlag
  }

  public async detectInstallation(): Promise<string | null> {
    try {
      log.info('Detecting installation directory...')
      
      // Try platform-specific detection first
      this.installDir = await this.platformUninstaller.detectInstallation()
      
      if (this.installDir) {
        log.info(`Installation detected at: ${this.installDir}`)
        return this.installDir
      }

      // Fallback to common locations
      this.installDir = this.detectCommonLocations()
      
      if (this.installDir) {
        log.info(`Installation detected at common location: ${this.installDir}`)
        return this.installDir
      }

      log.warn('No installation directory detected')
      return null
    } catch (error) {
      log.error('Error detecting installation:', error)
      return null
    }
  }

  private detectCommonLocations(): string | null {
    const commonPaths = this.getCommonInstallPaths()
    
    for (const installPath of commonPaths) {
      if (fs.existsSync(installPath)) {
        return installPath
      }
    }
    
    return null
  }

  private getCommonInstallPaths(): string[] {
    const paths: string[] = []
    
    if (process.platform === 'win32') {
      paths.push(
        path.join(process.env.LOCALAPPDATA || '', this.appName),
        path.join(process.env.PROGRAMFILES || '', this.appName),
        path.join(process.env['PROGRAMFILES(X86)'] || '', this.appName)
      )
    } else if (process.platform === 'darwin') {
      paths.push(
        '/Applications/SocialMarketing.app',
        path.join(process.env.HOME || '', 'Applications/SocialMarketing.app')
      )
    } else {
      paths.push(
        '/opt/social-marketing',
        path.join(process.env.HOME || '', '.local/share/social-marketing')
      )
    }
    
    return paths
  }

  public async performUninstall(
    onProgress?: (progress: UninstallProgress) => void
  ): Promise<UninstallResult> {
    if (this.isUninstallingFlag) {
      return {
        success: false,
        message: 'Uninstallation already in progress',
        errors: ['Uninstallation already in progress'],
        warnings: []
      }
    }

    this.isUninstallingFlag = true
    const result: UninstallResult = {
      success: true,
      message: 'Uninstallation completed successfully',
      errors: [],
      warnings: []
    }

    try {
      log.info('Starting uninstallation process...')

      // Step 1: Detect installation (10%)
      onProgress?.({
        step: 'detecting',
        progress: 10,
        message: 'Detecting installation...'
      })

      if (!this.installDir) {
        this.installDir = await this.detectInstallation()
        if (!this.installDir) {
          result.success = false
          result.message = 'Could not detect installation directory'
          result.errors.push('Installation directory not found')
          return result
        }
      }

      // Step 2: Stop running processes (20%)
      onProgress?.({
        step: 'stopping',
        progress: 20,
        message: 'Stopping running processes...'
      })

      await this.stopRunningProcesses()

      // Step 3: Remove shortcuts (30%)
      onProgress?.({
        step: 'shortcuts',
        progress: 30,
        message: 'Removing shortcuts...'
      })

      const shortcutsResult = await this.platformUninstaller.removeShortcuts()
      if (!shortcutsResult.success) {
        result.warnings.push(...shortcutsResult.errors)
      }

      // Step 4: Remove registry entries (40%)
      onProgress?.({
        step: 'registry',
        progress: 40,
        message: 'Removing registry entries...'
      })

      const registryResult = await this.platformUninstaller.removeRegistryEntries()
      if (!registryResult.success) {
        result.warnings.push(...registryResult.errors)
      }

      // Step 5: Remove application files (60%)
      onProgress?.({
        step: 'files',
        progress: 60,
        message: 'Removing application files...'
      })

      const filesResult = await this.removeApplicationFiles()
      if (!filesResult.success) {
        result.errors.push(...filesResult.errors)
        result.success = false
      }

      // Step 6: Remove user data (80%)
      onProgress?.({
        step: 'userdata',
        progress: 80,
        message: 'Removing user data...'
      })

      const userDataResult = await this.removeUserData()
      if (!userDataResult.success) {
        result.warnings.push(...userDataResult.errors)
      }

      // Step 7: Final cleanup (100%)
      onProgress?.({
        step: 'cleanup',
        progress: 100,
        message: 'Finalizing uninstallation...'
      })

      await this.finalCleanup()

      log.info('Uninstallation completed successfully')
      result.message = 'Social Marketing has been successfully uninstalled'

    } catch (error) {
      log.error('Error during uninstallation:', error)
      result.success = false
      result.message = 'Uninstallation failed'
      result.errors.push(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      this.isUninstallingFlag = false
    }

    return result
  }

  private async stopRunningProcesses(): Promise<void> {
    try {
      log.info('Stopping running processes...')
      
      if (process.platform === 'win32') {
        // Kill any running instances of the application
        try {
          execSync(`taskkill /f /im "${this.appName}.exe"`, { stdio: 'pipe' })
        } catch (error) {
          // Process might not be running, which is fine
          log.info('No running processes found to stop')
        }
      } else {
        // For macOS and Linux
        try {
          execSync(`pkill -f "${this.appName}"`, { stdio: 'pipe' })
        } catch (error) {
          // Process might not be running, which is fine
          log.info('No running processes found to stop')
        }
      }
    } catch (error) {
      log.warn('Error stopping processes:', error)
    }
  }

  private async removeApplicationFiles(): Promise<{ success: boolean; errors: string[] }> {
    const errors: string[] = []
    
    try {
      log.info('Removing application files...')
      
      if (!this.installDir) {
        errors.push('Installation directory not set')
        return { success: false, errors }
      }

      if (!fs.existsSync(this.installDir)) {
        log.info('Installation directory does not exist, skipping file removal')
        return { success: true, errors: [] }
      }

      // Remove the entire installation directory
      fs.rmSync(this.installDir, { recursive: true, force: true })
      log.info('Application files removed successfully')
      
      return { success: true, errors: [] }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      log.error('Error removing application files:', error)
      errors.push(`Failed to remove application files: ${errorMessage}`)
      return { success: false, errors }
    }
  }

  private async removeUserData(): Promise<{ success: boolean; errors: string[] }> {
    const errors: string[] = []
    
    try {
      log.info('Removing user data...')
      
      // Remove user data directory
      const userDataPath = path.join(process.env.APPDATA || '', this.appName)
      if (fs.existsSync(userDataPath)) {
        fs.rmSync(userDataPath, { recursive: true, force: true })
        log.info('User data removed successfully')
      }

      // Remove cache directory
      const cachePath = path.join(process.env.LOCALAPPDATA || '', this.appName, 'Cache')
      if (fs.existsSync(cachePath)) {
        fs.rmSync(cachePath, { recursive: true, force: true })
        log.info('Cache removed successfully')
      }

      // Remove logs directory
      const logsPath = path.join(process.env.APPDATA || '', this.appName, 'logs')
      if (fs.existsSync(logsPath)) {
        fs.rmSync(logsPath, { recursive: true, force: true })
        log.info('Logs removed successfully')
      }

      return { success: true, errors: [] }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      log.error('Error removing user data:', error)
      errors.push(`Failed to remove user data: ${errorMessage}`)
      return { success: false, errors }
    }
  }

  private async finalCleanup(): Promise<void> {
    try {
      log.info('Performing final cleanup...')
      
      // Platform-specific cleanup
      await this.platformUninstaller.finalCleanup()
      
      log.info('Final cleanup completed')
    } catch (error) {
      log.error('Error during final cleanup:', error)
    }
  }

  public getInstallationDirectory(): string | null {
    return this.installDir
  }

  public setInstallationDirectory(dir: string): void {
    this.installDir = dir
  }
} 