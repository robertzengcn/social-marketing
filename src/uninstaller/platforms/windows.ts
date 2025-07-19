import * as path from 'path'
import * as fs from 'fs'
import { execSync } from 'child_process'
import log from 'electron-log/main'

export interface PlatformResult {
  success: boolean
  errors: string[]
}

export class WindowsUninstaller {
  private appName: string

  constructor(appName: string) {
    this.appName = appName
  }

  public async detectInstallation(): Promise<string | null> {
    try {
      log.info('Detecting Windows installation...')
      
      // Try to get installation directory from registry
      const regQuery = `reg query "HKEY_CURRENT_USER\\Software\\${this.appName}" /v InstallLocation`
      const result = execSync(regQuery, { encoding: 'utf8', stdio: 'pipe' })
      const match = result.match(/InstallLocation\s+REG_SZ\s+(.+)/)
      
      if (match) {
        const installDir = match[1].trim()
        if (fs.existsSync(installDir)) {
          log.info(`Installation detected from registry: ${installDir}`)
          return installDir
        }
      }

      // Try machine registry (requires admin)
      try {
        const machineRegQuery = `reg query "HKEY_LOCAL_MACHINE\\SOFTWARE\\${this.appName}" /v InstallLocation`
        const machineResult = execSync(machineRegQuery, { encoding: 'utf8', stdio: 'pipe' })
        const machineMatch = machineResult.match(/InstallLocation\s+REG_SZ\s+(.+)/)
        
        if (machineMatch) {
          const installDir = machineMatch[1].trim()
          if (fs.existsSync(installDir)) {
            log.info(`Installation detected from machine registry: ${installDir}`)
            return installDir
          }
        }
      } catch (error) {
        log.info('Could not read from machine registry (requires admin)')
      }

      return null
    } catch (error) {
      log.info('Could not detect installation from registry, will try common locations')
      return null
    }
  }

  public async removeShortcuts(): Promise<PlatformResult> {
    const errors: string[] = []
    
    try {
      log.info('Removing Windows shortcuts...')
      
      // Remove desktop shortcut
      const desktopPath = path.join(process.env.USERPROFILE || '', 'Desktop')
      const desktopShortcut = path.join(desktopPath, `${this.appName}.lnk`)
      if (fs.existsSync(desktopShortcut)) {
        fs.unlinkSync(desktopShortcut)
        log.info('Desktop shortcut removed')
      }

      // Remove start menu shortcuts
      const startMenuPath = path.join(process.env.APPDATA || '', 'Microsoft', 'Windows', 'Start Menu', 'Programs')
      const appFolderPath = path.join(startMenuPath, this.appName)
      if (fs.existsSync(appFolderPath)) {
        fs.rmSync(appFolderPath, { recursive: true, force: true })
        log.info('Start menu shortcuts removed')
      }

      // Remove from all users start menu if exists
      const allUsersStartMenu = path.join(process.env.PROGRAMDATA || '', 'Microsoft', 'Windows', 'Start Menu', 'Programs')
      const allUsersAppFolder = path.join(allUsersStartMenu, this.appName)
      if (fs.existsSync(allUsersAppFolder)) {
        fs.rmSync(allUsersAppFolder, { recursive: true, force: true })
        log.info('All users start menu shortcuts removed')
      }

      return { success: true, errors: [] }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      log.error('Error removing Windows shortcuts:', error)
      errors.push(`Failed to remove shortcuts: ${errorMessage}`)
      return { success: false, errors }
    }
  }

  public async removeRegistryEntries(): Promise<PlatformResult> {
    const errors: string[] = []
    
    try {
      log.info('Removing Windows registry entries...')
      
      // Remove user registry entries
      const userRegKey = `HKEY_CURRENT_USER\\Software\\${this.appName}`
      try {
        execSync(`reg delete "${userRegKey}" /f`, { stdio: 'pipe' })
        log.info('User registry entries removed')
      } catch (error) {
        log.warn('Could not remove user registry entries')
        errors.push('Could not remove user registry entries')
      }

      // Remove machine registry entries (requires admin)
      try {
        const machineRegKey = `HKEY_LOCAL_MACHINE\\SOFTWARE\\${this.appName}`
        execSync(`reg delete "${machineRegKey}" /f`, { stdio: 'pipe' })
        log.info('Machine registry entries removed')
      } catch (error) {
        log.info('Could not remove machine registry entries (requires admin)')
        errors.push('Could not remove machine registry entries (requires admin)')
      }

      // Remove uninstall registry entries
      const uninstallKey = `HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\${this.appName}`
      try {
        execSync(`reg delete "${uninstallKey}" /f`, { stdio: 'pipe' })
        log.info('Uninstall registry entries removed')
      } catch (error) {
        log.info('Could not remove uninstall registry entries')
        errors.push('Could not remove uninstall registry entries')
      }

      // Remove machine uninstall registry entries
      const machineUninstallKey = `HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\${this.appName}`
      try {
        execSync(`reg delete "${machineUninstallKey}" /f`, { stdio: 'pipe' })
        log.info('Machine uninstall registry entries removed')
      } catch (error) {
        log.info('Could not remove machine uninstall registry entries (requires admin)')
        errors.push('Could not remove machine uninstall registry entries (requires admin)')
      }

      return { success: errors.length === 0, errors }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      log.error('Error removing Windows registry entries:', error)
      errors.push(`Failed to remove registry entries: ${errorMessage}`)
      return { success: false, errors }
    }
  }

  public async finalCleanup(): Promise<void> {
    try {
      log.info('Performing Windows final cleanup...')
      
      // Remove any remaining registry entries
      const remainingKeys = [
        `HKEY_CURRENT_USER\\Software\\${this.appName}`,
        `HKEY_LOCAL_MACHINE\\SOFTWARE\\${this.appName}`,
        `HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\${this.appName}`,
        `HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\${this.appName}`
      ]

      for (const key of remainingKeys) {
        try {
          execSync(`reg delete "${key}" /f`, { stdio: 'pipe' })
        } catch (error) {
          // Ignore errors for final cleanup
        }
      }

      log.info('Windows final cleanup completed')
    } catch (error) {
      log.error('Error during Windows final cleanup:', error)
    }
  }
} 