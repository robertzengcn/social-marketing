import * as path from 'path'
import * as fs from 'fs'
import { execSync } from 'child_process'
import log from 'electron-log/main'
import { PlatformResult } from './windows'

export class LinuxUninstaller {
  private appName: string

  constructor(appName: string) {
    this.appName = appName
  }

  public async detectInstallation(): Promise<string | null> {
    try {
      log.info('Detecting Linux installation...')
      
      // Check common installation directories
      const commonPaths = [
        '/opt/social-marketing',
        '/usr/local/share/social-marketing',
        '/usr/share/social-marketing',
        path.join(process.env.HOME || '', '.local/share/social-marketing'),
        path.join(process.env.HOME || '', '.local/bin/social-marketing')
      ]

      for (const installPath of commonPaths) {
        if (fs.existsSync(installPath)) {
          log.info(`Installation detected at: ${installPath}`)
          return installPath
        }
      }

      // Check if app is running and get its path
      try {
        const psResult = execSync(`ps aux | grep -i "${this.appName}" | grep -v grep`, { encoding: 'utf8', stdio: 'pipe' })
        const lines = psResult.split('\n').filter(line => line.trim())
        
        for (const line of lines) {
          const parts = line.split(/\s+/)
          if (parts.length > 10) {
            const command = parts.slice(10).join(' ')
            // Look for executable path in command
            const pathMatch = command.match(/(\/[^\s]+)/)
            if (pathMatch && fs.existsSync(pathMatch[1])) {
              const dirPath = path.dirname(pathMatch[1])
              log.info(`Installation detected from running process: ${dirPath}`)
              return dirPath
            }
          }
        }
      } catch (error) {
        log.info('Could not detect from running processes')
      }

      // Check desktop files for installation path
      const desktopPaths = [
        '/usr/share/applications',
        '/usr/local/share/applications',
        path.join(process.env.HOME || '', '.local/share/applications')
      ]

      for (const desktopPath of desktopPaths) {
        if (fs.existsSync(desktopPath)) {
          try {
            const files = fs.readdirSync(desktopPath)
            for (const file of files) {
              if (file.toLowerCase().includes(this.appName.toLowerCase())) {
                const desktopFile = path.join(desktopPath, file)
                const content = fs.readFileSync(desktopFile, 'utf8')
                const execMatch = content.match(/Exec=([^\n]+)/)
                if (execMatch) {
                  const execPath = execMatch[1].split(' ')[0]
                  if (fs.existsSync(execPath)) {
                    const dirPath = path.dirname(execPath)
                    log.info(`Installation detected from desktop file: ${dirPath}`)
                    return dirPath
                  }
                }
              }
            }
          } catch (error) {
            log.info(`Could not read desktop directory: ${desktopPath}`)
          }
        }
      }

      return null
    } catch (error) {
      log.error('Error detecting Linux installation:', error)
      return null
    }
  }

  public async removeShortcuts(): Promise<PlatformResult> {
    const errors: string[] = []
    
    try {
      log.info('Removing Linux shortcuts...')
      
      // Remove desktop files
      const desktopPaths = [
        '/usr/share/applications',
        '/usr/local/share/applications',
        path.join(process.env.HOME || '', '.local/share/applications')
      ]

      for (const desktopPath of desktopPaths) {
        if (fs.existsSync(desktopPath)) {
          try {
            const files = fs.readdirSync(desktopPath)
            for (const file of files) {
              if (file.toLowerCase().includes(this.appName.toLowerCase())) {
                const desktopFile = path.join(desktopPath, file)
                fs.unlinkSync(desktopFile)
                log.info(`Removed desktop file: ${file}`)
              }
            }
          } catch (error) {
            log.warn(`Could not remove desktop files from: ${desktopPath}`)
            errors.push(`Could not remove desktop files from: ${desktopPath}`)
          }
        }
      }

      // Remove from PATH
      const binPaths = [
        '/usr/local/bin',
        '/usr/bin',
        path.join(process.env.HOME || '', '.local/bin')
      ]

      for (const binPath of binPaths) {
        if (fs.existsSync(binPath)) {
          try {
            const files = fs.readdirSync(binPath)
            for (const file of files) {
              if (file.toLowerCase().includes(this.appName.toLowerCase())) {
                const binFile = path.join(binPath, file)
                fs.unlinkSync(binFile)
                log.info(`Removed binary: ${file}`)
              }
            }
          } catch (error) {
            log.warn(`Could not remove binaries from: ${binPath}`)
            errors.push(`Could not remove binaries from: ${binPath}`)
          }
        }
      }

      // Remove from autostart
      const autostartPaths = [
        '/etc/xdg/autostart',
        path.join(process.env.HOME || '', '.config/autostart')
      ]

      for (const autostartPath of autostartPaths) {
        if (fs.existsSync(autostartPath)) {
          try {
            const files = fs.readdirSync(autostartPath)
            for (const file of files) {
              if (file.toLowerCase().includes(this.appName.toLowerCase())) {
                const autostartFile = path.join(autostartPath, file)
                fs.unlinkSync(autostartFile)
                log.info(`Removed autostart file: ${file}`)
              }
            }
          } catch (error) {
            log.warn(`Could not remove autostart files from: ${autostartPath}`)
            errors.push(`Could not remove autostart files from: ${autostartPath}`)
          }
        }
      }

      return { success: errors.length === 0, errors }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      log.error('Error removing Linux shortcuts:', error)
      errors.push(`Failed to remove shortcuts: ${errorMessage}`)
      return { success: false, errors }
    }
  }

  public async removeRegistryEntries(): Promise<PlatformResult> {
    const errors: string[] = []
    
    try {
      log.info('Removing Linux configuration files...')
      
      // Remove configuration files
      const configPaths = [
        path.join(process.env.HOME || '', '.config', this.appName.toLowerCase()),
        path.join(process.env.HOME || '', '.config', this.appName),
        path.join(process.env.HOME || '', `.${this.appName.toLowerCase()}`),
        path.join(process.env.HOME || '', `.${this.appName}`)
      ]

      for (const configPath of configPaths) {
        if (fs.existsSync(configPath)) {
          try {
            fs.rmSync(configPath, { recursive: true, force: true })
            log.info(`Removed config directory: ${configPath}`)
          } catch (error) {
            log.warn(`Could not remove config directory: ${configPath}`)
            errors.push(`Could not remove config directory: ${configPath}`)
          }
        }
      }

      // Remove from systemd user services
      const systemdUserPath = path.join(process.env.HOME || '', '.config/systemd/user')
      if (fs.existsSync(systemdUserPath)) {
        try {
          const files = fs.readdirSync(systemdUserPath)
          for (const file of files) {
            if (file.toLowerCase().includes(this.appName.toLowerCase())) {
              const serviceFile = path.join(systemdUserPath, file)
              try {
                execSync(`systemctl --user disable ${file}`, { stdio: 'pipe' })
                fs.unlinkSync(serviceFile)
                log.info(`Removed systemd service: ${file}`)
              } catch (error) {
                log.warn(`Could not remove systemd service: ${file}`)
                errors.push(`Could not remove systemd service: ${file}`)
              }
            }
          }
        } catch (error) {
          log.warn('Could not access systemd user directory')
          errors.push('Could not access systemd user directory')
        }
      }

      // Remove from systemd system services (requires admin)
      try {
        const systemdSystemPath = '/etc/systemd/system'
        if (fs.existsSync(systemdSystemPath)) {
          const files = fs.readdirSync(systemdSystemPath)
          for (const file of files) {
            if (file.toLowerCase().includes(this.appName.toLowerCase())) {
              const serviceFile = path.join(systemdSystemPath, file)
              try {
                execSync(`systemctl disable ${file}`, { stdio: 'pipe' })
                fs.unlinkSync(serviceFile)
                log.info(`Removed system systemd service: ${file}`)
              } catch (error) {
                log.info(`Could not remove system systemd service: ${file} (requires admin)`)
                errors.push(`Could not remove system systemd service: ${file} (requires admin)`)
              }
            }
          }
        }
      } catch (error) {
        log.info('Could not access system systemd directory (requires admin)')
        errors.push('Could not access system systemd directory (requires admin)')
      }

      return { success: errors.length === 0, errors }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      log.error('Error removing Linux configuration:', error)
      errors.push(`Failed to remove configuration: ${errorMessage}`)
      return { success: false, errors }
    }
  }

  public async finalCleanup(): Promise<void> {
    try {
      log.info('Performing Linux final cleanup...')
      
      // Update desktop database
      try {
        execSync('update-desktop-database', { stdio: 'pipe' })
        log.info('Updated desktop database')
      } catch (error) {
        log.info('Could not update desktop database')
      }

      // Reload systemd daemon
      try {
        execSync('systemctl daemon-reload', { stdio: 'pipe' })
        log.info('Reloaded systemd daemon')
      } catch (error) {
        log.info('Could not reload systemd daemon (requires admin)')
      }

      // Clear any remaining cache
      const cachePaths = [
        path.join(process.env.HOME || '', '.cache', this.appName.toLowerCase()),
        path.join(process.env.HOME || '', '.cache', this.appName)
      ]

      for (const cachePath of cachePaths) {
        if (fs.existsSync(cachePath)) {
          try {
            fs.rmSync(cachePath, { recursive: true, force: true })
            log.info(`Cleared cache: ${cachePath}`)
          } catch (error) {
            log.info(`Could not clear cache: ${cachePath}`)
          }
        }
      }

      log.info('Linux final cleanup completed')
    } catch (error) {
      log.error('Error during Linux final cleanup:', error)
    }
  }
} 