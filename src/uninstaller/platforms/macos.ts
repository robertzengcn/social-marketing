import * as path from 'path'
import * as fs from 'fs'
import { execSync } from 'child_process'
import log from 'electron-log/main'
import { PlatformResult } from './windows'

export class MacOSUninstaller {
  private appName: string

  constructor(appName: string) {
    this.appName = appName
  }

  public async detectInstallation(): Promise<string | null> {
    try {
      log.info('Detecting macOS installation...')
      
      // Check Applications folder
      const appPath = '/Applications/SocialMarketing.app'
      if (fs.existsSync(appPath)) {
        log.info(`Installation detected in Applications: ${appPath}`)
        return appPath
      }

      // Check user Applications folder
      const userAppPath = path.join(process.env.HOME || '', 'Applications/SocialMarketing.app')
      if (fs.existsSync(userAppPath)) {
        log.info(`Installation detected in user Applications: ${userAppPath}`)
        return userAppPath
      }

      // Check if app is running and get its path
      try {
        const psResult = execSync(`ps aux | grep -i "${this.appName}" | grep -v grep`, { encoding: 'utf8', stdio: 'pipe' })
        const lines = psResult.split('\n').filter(line => line.trim())
        
        for (const line of lines) {
          const parts = line.split(/\s+/)
          if (parts.length > 10) {
            const command = parts.slice(10).join(' ')
            if (command.includes('.app')) {
              const appMatch = command.match(/([^\\s]+\.app)/)
              if (appMatch && fs.existsSync(appMatch[1])) {
                log.info(`Installation detected from running process: ${appMatch[1]}`)
                return appMatch[1]
              }
            }
          }
        }
      } catch (error) {
        log.info('Could not detect from running processes')
      }

      return null
    } catch (error) {
      log.error('Error detecting macOS installation:', error)
      return null
    }
  }

  public async removeShortcuts(): Promise<PlatformResult> {
    const errors: string[] = []
    
    try {
      log.info('Removing macOS shortcuts...')
      
      // Remove from Applications folder
      const appPath = '/Applications/SocialMarketing.app'
      if (fs.existsSync(appPath)) {
        try {
          fs.rmSync(appPath, { recursive: true, force: true })
          log.info('Application removed from Applications folder')
        } catch (error) {
          log.warn('Could not remove from Applications folder (requires admin)')
          errors.push('Could not remove from Applications folder (requires admin)')
        }
      }

      // Remove from user Applications folder
      const userAppPath = path.join(process.env.HOME || '', 'Applications/SocialMarketing.app')
      if (fs.existsSync(userAppPath)) {
        fs.rmSync(userAppPath, { recursive: true, force: true })
        log.info('Application removed from user Applications folder')
      }

      // Remove from Dock (if present)
      try {
        execSync(`defaults delete com.apple.dock persistent-apps | grep -i "${this.appName}"`, { stdio: 'pipe' })
        execSync('killall Dock', { stdio: 'pipe' })
        log.info('Removed from Dock')
      } catch (error) {
        log.info('Could not remove from Dock or Dock not running')
      }

      // Remove from LaunchAgents
      const launchAgentPath = path.join(process.env.HOME || '', 'Library/LaunchAgents')
      const launchAgentFiles = [
        `com.${this.appName.toLowerCase()}.plist`,
        `com.${this.appName.toLowerCase()}.launcher.plist`
      ]

      for (const file of launchAgentFiles) {
        const fullPath = path.join(launchAgentPath, file)
        if (fs.existsSync(fullPath)) {
          try {
            execSync(`launchctl unload "${fullPath}"`, { stdio: 'pipe' })
            fs.unlinkSync(fullPath)
            log.info(`Removed LaunchAgent: ${file}`)
          } catch (error) {
            log.warn(`Could not remove LaunchAgent: ${file}`)
            errors.push(`Could not remove LaunchAgent: ${file}`)
          }
        }
      }

      return { success: errors.length === 0, errors }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      log.error('Error removing macOS shortcuts:', error)
      errors.push(`Failed to remove shortcuts: ${errorMessage}`)
      return { success: false, errors }
    }
  }

  public async removeRegistryEntries(): Promise<PlatformResult> {
    const errors: string[] = []
    
    try {
      log.info('Removing macOS preferences and settings...')
      
      // Remove preferences
      const preferencesPaths = [
        path.join(process.env.HOME || '', `Library/Preferences/com.${this.appName.toLowerCase()}.plist`),
        path.join(process.env.HOME || '', `Library/Preferences/com.${this.appName.toLowerCase()}.launcher.plist`),
        path.join(process.env.HOME || '', `Library/Preferences/${this.appName}.plist`)
      ]

      for (const prefPath of preferencesPaths) {
        if (fs.existsSync(prefPath)) {
          try {
            fs.unlinkSync(prefPath)
            log.info(`Removed preference file: ${path.basename(prefPath)}`)
          } catch (error) {
            log.warn(`Could not remove preference file: ${path.basename(prefPath)}`)
            errors.push(`Could not remove preference file: ${path.basename(prefPath)}`)
          }
        }
      }

      // Remove from global preferences (requires admin)
      try {
        const globalPrefPath = `/Library/Preferences/com.${this.appName.toLowerCase()}.plist`
        if (fs.existsSync(globalPrefPath)) {
          fs.unlinkSync(globalPrefPath)
          log.info('Removed global preference file')
        }
      } catch (error) {
        log.info('Could not remove global preference file (requires admin)')
        errors.push('Could not remove global preference file (requires admin)')
      }

      // Remove from LaunchDaemons (requires admin)
      try {
        const launchDaemonPath = '/Library/LaunchDaemons'
        const launchDaemonFiles = [
          `com.${this.appName.toLowerCase()}.plist`,
          `com.${this.appName.toLowerCase()}.launcher.plist`
        ]

        for (const file of launchDaemonFiles) {
          const fullPath = path.join(launchDaemonPath, file)
          if (fs.existsSync(fullPath)) {
            execSync(`launchctl unload "${fullPath}"`, { stdio: 'pipe' })
            fs.unlinkSync(fullPath)
            log.info(`Removed LaunchDaemon: ${file}`)
          }
        }
      } catch (error) {
        log.info('Could not remove LaunchDaemons (requires admin)')
        errors.push('Could not remove LaunchDaemons (requires admin)')
      }

      return { success: errors.length === 0, errors }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      log.error('Error removing macOS preferences:', error)
      errors.push(`Failed to remove preferences: ${errorMessage}`)
      return { success: false, errors }
    }
  }

  public async finalCleanup(): Promise<void> {
    try {
      log.info('Performing macOS final cleanup...')
      
      // Clear Spotlight index for the app
      try {
        execSync(`mdutil -E /Applications/SocialMarketing.app`, { stdio: 'pipe' })
        log.info('Cleared Spotlight index')
      } catch (error) {
        log.info('Could not clear Spotlight index')
      }

      // Remove any remaining preference files
      const remainingPrefs = [
        path.join(process.env.HOME || '', `Library/Preferences/com.${this.appName.toLowerCase()}.*`),
        path.join(process.env.HOME || '', `Library/Preferences/${this.appName}.*`)
      ]

      for (const prefPattern of remainingPrefs) {
        try {
          execSync(`rm -f "${prefPattern}"`, { stdio: 'pipe' })
        } catch (error) {
          // Ignore errors for final cleanup
        }
      }

      log.info('macOS final cleanup completed')
    } catch (error) {
      log.error('Error during macOS final cleanup:', error)
    }
  }
} 