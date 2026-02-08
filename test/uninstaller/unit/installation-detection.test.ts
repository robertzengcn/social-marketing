import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { UninstallerManager } from '../../../src/uninstaller/uninstaller'
import * as fs from 'fs'
import * as path from 'path'

// Mock file system operations
vi.mock('fs', () => ({
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
  statSync: vi.fn()
}))

// Mock child process
vi.mock('child_process', () => ({
  execSync: vi.fn()
}))

describe('Installation Detection Tests', () => {
  let uninstallerManager: UninstallerManager
  let mockFs: any
  let mockChildProcess: any

  beforeEach(() => {
    vi.clearAllMocks()
    
    mockFs = vi.mocked(fs)
    mockChildProcess = vi.mocked(require('child_process'))
    
    uninstallerManager = new UninstallerManager()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Windows Installation Detection', () => {
    beforeEach(() => {
      vi.stubGlobal('process', { platform: 'win32' })
    })

    it('should detect installation in Program Files', async () => {
      mockFs.existsSync.mockImplementation((path: string) => {
        return path.includes('Program Files\\MyApp')
      })
      
      mockFs.readdirSync.mockReturnValue(['MyApp.exe', 'resources', 'node_modules'])

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result).toContain('Program Files')
      expect(result).toContain('MyApp')
    })

    it('should detect installation in AppData', async () => {
      mockFs.existsSync.mockImplementation((path: string) => {
        return path.includes('AppData\\Local\\MyApp') || path.includes('AppData\\Roaming\\MyApp')
      })
      
      mockFs.readdirSync.mockReturnValue(['config.json', 'logs', 'cache'])

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result).toContain('AppData')
    })

    it('should detect installation via registry', async () => {
      mockFs.existsSync.mockReturnValue(false)
      
      mockChildProcess.execSync.mockImplementation((command: string) => {
        if (command.includes('reg query')) {
          return Buffer.from('InstallLocation    REG_SZ    C:\\Program Files\\MyApp')
        }
        return Buffer.from('')
      })

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result).toBe('C:\\Program Files\\MyApp')
    })

    it('should handle registry query errors gracefully', async () => {
      mockFs.existsSync.mockReturnValue(false)
      
      mockChildProcess.execSync.mockImplementation(() => {
        throw new Error('Registry access denied')
      })

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeNull()
    })

    it('should detect multiple installation locations', async () => {
      mockFs.existsSync.mockImplementation((path: string) => {
        return path.includes('Program Files\\MyApp') || 
               path.includes('AppData\\Local\\MyApp') ||
               path.includes('AppData\\Roaming\\MyApp')
      })
      
      mockFs.readdirSync.mockReturnValue(['app.exe'])

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result).toMatch(/Program Files|AppData/)
    })
  })

  describe('macOS Installation Detection', () => {
    beforeEach(() => {
      vi.stubGlobal('process', { platform: 'darwin' })
    })

    it('should detect installation in /Applications', async () => {
      mockFs.existsSync.mockImplementation((path: string) => {
        return path.includes('/Applications/MyApp.app')
      })
      
      mockFs.readdirSync.mockReturnValue(['Contents', 'Info.plist'])

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result).toContain('/Applications')
      expect(result).toContain('MyApp.app')
    })

    it('should detect installation in user Applications', async () => {
      mockFs.existsSync.mockImplementation((path: string) => {
        return path.includes('~/Applications/MyApp.app')
      })
      
      mockFs.readdirSync.mockReturnValue(['Contents'])

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result).toContain('Applications')
    })

    it('should detect preference files', async () => {
      mockFs.existsSync.mockImplementation((path: string) => {
        return path.includes('~/Library/Preferences/com.myapp.plist')
      })
      
      mockFs.readdirSync.mockReturnValue(['com.myapp.plist'])

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result).toContain('Preferences')
    })

    it('should detect application support files', async () => {
      mockFs.existsSync.mockImplementation((path: string) => {
        return path.includes('~/Library/Application Support/MyApp')
      })
      
      mockFs.readdirSync.mockReturnValue(['config', 'data'])

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result).toContain('Application Support')
    })

    it('should detect running processes', async () => {
      mockFs.existsSync.mockReturnValue(false)
      
      mockChildProcess.execSync.mockImplementation((command: string) => {
        if (command.includes('ps aux')) {
          return Buffer.from('user  1234  MyApp.app/Contents/MacOS/MyApp')
        }
        return Buffer.from('')
      })

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result).toContain('MyApp.app')
    })
  })

  describe('Linux Installation Detection', () => {
    beforeEach(() => {
      vi.stubGlobal('process', { platform: 'linux' })
    })

    it('should detect installation in /opt', async () => {
      mockFs.existsSync.mockImplementation((path: string) => {
        return path.includes('/opt/myapp')
      })
      
      mockFs.readdirSync.mockReturnValue(['bin', 'lib', 'share'])

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result).toContain('/opt')
    })

    it('should detect installation in /usr/local', async () => {
      mockFs.existsSync.mockImplementation((path: string) => {
        return path.includes('/usr/local/bin/myapp') || path.includes('/usr/local/share/myapp')
      })
      
      mockFs.readdirSync.mockReturnValue(['myapp'])

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result).toContain('/usr/local')
    })

    it('should detect desktop files', async () => {
      mockFs.existsSync.mockImplementation((path: string) => {
        return path.includes('~/.local/share/applications/myapp.desktop') ||
               path.includes('/usr/local/share/applications/myapp.desktop')
      })
      
      mockFs.readdirSync.mockReturnValue(['myapp.desktop'])

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result).toContain('applications')
    })

    it('should detect configuration files', async () => {
      mockFs.existsSync.mockImplementation((path: string) => {
        return path.includes('~/.config/myapp')
      })
      
      mockFs.readdirSync.mockReturnValue(['config.json', 'settings'])

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result).toContain('.config')
    })

    it('should detect running processes', async () => {
      mockFs.existsSync.mockReturnValue(false)
      
      mockChildProcess.execSync.mockImplementation((command: string) => {
        if (command.includes('ps aux')) {
          return Buffer.from('user  1234  /opt/myapp/bin/myapp')
        }
        return Buffer.from('')
      })

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
      expect(result).toContain('/opt/myapp')
    })
  })

  describe('Cross-Platform Common Paths', () => {
    it('should check common installation paths on all platforms', async () => {
      const platforms = ['win32', 'darwin', 'linux']
      
      for (const platform of platforms) {
        vi.stubGlobal('process', { platform })
        
        mockFs.existsSync.mockReturnValue(false)
        
        const result = await uninstallerManager.detectInstallation()
        
        // Should check common paths even if none found
        expect(mockFs.existsSync).toHaveBeenCalled()
        
        // Reset for next iteration
        vi.clearAllMocks()
      }
    })

    it('should handle case sensitivity correctly', async () => {
      vi.stubGlobal('process', { platform: 'linux' })
      
      mockFs.existsSync.mockImplementation((path: string) => {
        // Case-sensitive check
        return path.includes('MyApp') || path.includes('myapp')
      })
      
      mockFs.readdirSync.mockReturnValue(['app'])

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
    })
  })

  describe('Error Handling', () => {
    it('should handle file system errors during detection', async () => {
      mockFs.existsSync.mockImplementation(() => {
        throw new Error('Permission denied')
      })

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeNull()
    })

    it('should handle directory read errors', async () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockImplementation(() => {
        throw new Error('Directory not accessible')
      })

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeNull()
    })

    it('should continue detection despite individual path errors', async () => {
      let callCount = 0
      mockFs.existsSync.mockImplementation(() => {
        callCount++
        if (callCount === 1) {
          throw new Error('First path error')
        }
        return true
      })
      
      mockFs.readdirSync.mockReturnValue(['app'])

      const result = await uninstallerManager.detectInstallation()

      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
    })
  })

  describe('Performance', () => {
    it('should complete detection within reasonable time', async () => {
      mockFs.existsSync.mockReturnValue(false)
      
      const startTime = Date.now()
      await uninstallerManager.detectInstallation()
      const endTime = Date.now()

      expect(endTime - startTime).toBeLessThan(1000) // 1 second
    })

    it('should not make excessive file system calls', async () => {
      mockFs.existsSync.mockReturnValue(false)
      
      await uninstallerManager.detectInstallation()

      // Should not call existsSync more than a reasonable number of times
      expect(mockFs.existsSync).toHaveBeenCalledTimes(expect.any(Number))
      expect(mockFs.existsSync.mock.calls.length).toBeLessThan(50) // Reasonable limit
    })
  })
}) 