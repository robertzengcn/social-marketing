import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { UninstallerManager } from '../../../src/uninstaller/uninstaller'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

// Mock all external dependencies
vi.mock('fs', () => ({
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
  unlinkSync: vi.fn(),
  rmdirSync: vi.fn(),
  statSync: vi.fn(),
  mkdirSync: vi.fn(),
  writeFileSync: vi.fn(),
  readFileSync: vi.fn(),
  copyFileSync: vi.fn(),
  renameSync: vi.fn()
}))

vi.mock('child_process', () => ({
  execSync: vi.fn(),
  spawn: vi.fn()
}))

vi.mock('electron-log', () => ({
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn()
}))

vi.mock('electron', () => ({
  app: {
    getPath: vi.fn(),
    quit: vi.fn(),
    exit: vi.fn()
  },
  BrowserWindow: vi.fn(),
  ipcMain: {
    handle: vi.fn(),
    on: vi.fn()
  },
  ipcRenderer: {
    invoke: vi.fn(),
    on: vi.fn(),
    send: vi.fn()
  }
}))

describe('Uninstaller End-to-End Tests', () => {
  let uninstallerManager: UninstallerManager
  let mockFs: any
  let mockChildProcess: any
  let mockElectron: any

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Get mocked modules
    mockFs = vi.mocked(fs)
    mockChildProcess = vi.mocked(require('child_process'))
    mockElectron = vi.mocked(require('electron'))
    
    // Setup default mock implementations
    mockFs.existsSync.mockReturnValue(true)
    mockFs.readdirSync.mockReturnValue([])
    mockFs.statSync.mockReturnValue({ isDirectory: () => false, isFile: () => true })
    mockChildProcess.execSync.mockReturnValue(Buffer.from(''))
    mockElectron.app.getPath.mockReturnValue('/tmp')
    
    uninstallerManager = new UninstallerManager()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Complete User Workflow', () => {
    it('should complete full uninstallation workflow on Windows', async () => {
      // Setup Windows environment
      vi.stubGlobal('process', { platform: 'win32' })
      
      // Mock complete installation structure
      const mockInstallation = {
        'C:\\Program Files\\MyApp': ['MyApp.exe', 'resources', 'node_modules'],
        'C:\\Users\\TestUser\\AppData\\Local\\MyApp': ['config.json', 'logs', 'cache'],
        'C:\\Users\\TestUser\\Desktop': ['MyApp.lnk'],
        'C:\\Users\\TestUser\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs': ['MyApp.lnk']
      }
      
      mockFs.existsSync.mockImplementation((path: string) => {
        return Object.keys(mockInstallation).some(key => path.includes(key))
      })
      
      mockFs.readdirSync.mockImplementation((dir: string) => {
        for (const [key, files] of Object.entries(mockInstallation)) {
          if (dir.includes(key)) {
            return files
          }
        }
        return []
      })
      
      // Mock registry entries
      mockChildProcess.execSync.mockImplementation((command: string) => {
        if (command.includes('reg query')) {
          return Buffer.from('InstallLocation    REG_SZ    C:\\Program Files\\MyApp')
        }
        return Buffer.from('')
      })

      // Execute complete workflow
      const result = await uninstallerManager.performUninstall()

      // Verify complete success
      expect(result.success).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should complete full uninstallation workflow on macOS', async () => {
      // Setup macOS environment
      vi.stubGlobal('process', { platform: 'darwin' })
      
      // Mock complete installation structure
      const mockInstallation = {
        '/Applications': ['MyApp.app'],
        '/Users/TestUser/Applications': ['MyApp.app'],
        '/Users/TestUser/Library/Preferences': ['com.myapp.plist'],
        '/Users/TestUser/Library/Application Support': ['MyApp'],
        '/Users/TestUser/Library/Caches': ['MyApp'],
        '/Users/TestUser/Library/Logs': ['MyApp']
      }
      
      mockFs.existsSync.mockImplementation((path: string) => {
        return Object.keys(mockInstallation).some(key => path.includes(key))
      })
      
      mockFs.readdirSync.mockImplementation((dir: string) => {
        for (const [key, files] of Object.entries(mockInstallation)) {
          if (dir.includes(key)) {
            return files
          }
        }
        return []
      })

      // Execute complete workflow
      const result = await uninstallerManager.performUninstall()

      // Verify complete success
      expect(result.success).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should complete full uninstallation workflow on Linux', async () => {
      // Setup Linux environment
      vi.stubGlobal('process', { platform: 'linux' })
      
      // Mock complete installation structure
      const mockInstallation = {
        '/opt/myapp': ['bin', 'lib', 'share', 'myapp'],
        '/usr/local/bin': ['myapp'],
        '/usr/local/share/applications': ['myapp.desktop'],
        '/home/testuser/.local/share/applications': ['myapp.desktop'],
        '/home/testuser/.config': ['myapp'],
        '/home/testuser/.cache': ['myapp']
      }
      
      mockFs.existsSync.mockImplementation((path: string) => {
        return Object.keys(mockInstallation).some(key => path.includes(key))
      })
      
      mockFs.readdirSync.mockImplementation((dir: string) => {
        for (const [key, files] of Object.entries(mockInstallation)) {
          if (dir.includes(key)) {
            return files
          }
        }
        return []
      })

      // Execute complete workflow
      const result = await uninstallerManager.performUninstall()

      // Verify complete success
      expect(result.success).toBe(true)
      expect(result.errors).toHaveLength(0)
    })
  })

  describe('User Interaction Scenarios', () => {
    it('should handle user cancellation during uninstallation', async () => {
      // Mock user cancellation by throwing a cancellation error
      let callCount = 0
      mockFs.unlinkSync.mockImplementation(() => {
        callCount++
        if (callCount === 2) {
          throw new Error('User cancelled')
        }
      })
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['file1', 'file2', 'file3'])

      const result = await uninstallerManager.performUninstall()

      expect(result.success).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.errors[0]).toContain('User cancelled')
    })

    it('should handle partial uninstallation with user choice to continue', async () => {
      // Mock partial failures that user chooses to continue through
      let callCount = 0
      mockFs.unlinkSync.mockImplementation(() => {
        callCount++
        if (callCount === 1) {
          throw new Error('File in use')
        }
        // Continue with other files
      })
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['file1', 'file2', 'file3'])

      const result = await uninstallerManager.performUninstall()

      expect(result.success).toBe(true) // Should succeed despite some errors
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.warnings.length).toBeGreaterThan(0)
    })

    it('should provide detailed feedback for user decisions', async () => {
      const progressUpdates: any[] = []
      
      const onProgress = (progress: any) => {
        progressUpdates.push(progress)
      }
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['app.exe', 'config.json', 'logs'])

      await uninstallerManager.performUninstall(onProgress)

      // Verify detailed progress information
      expect(progressUpdates.length).toBeGreaterThan(0)
      
      const steps = progressUpdates.map(p => p.step)
      expect(steps).toContain('detecting')
      expect(steps).toContain('stopping')
      expect(steps).toContain('removing')
      expect(steps).toContain('cleaning')
      expect(steps).toContain('complete')
    })
  })

  describe('Error Recovery Scenarios', () => {
    it('should recover from temporary file system errors', async () => {
      // Mock temporary errors that resolve on retry
      let callCount = 0
      mockFs.unlinkSync.mockImplementation(() => {
        callCount++
        if (callCount === 1) {
          throw new Error('File temporarily locked')
        }
        // Subsequent calls succeed
      })
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['file1', 'file2'])

      const result = await uninstallerManager.performUninstall()

      expect(result.success).toBe(true)
      expect(result.warnings.length).toBeGreaterThan(0)
    })

    it('should handle permission escalation scenarios', async () => {
      // Mock permission errors that require elevation
      mockFs.unlinkSync.mockImplementation(() => {
        throw new Error('Access denied - requires administrator privileges')
      })
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['protected.exe'])

      const result = await uninstallerManager.performUninstall()

      expect(result.success).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.errors[0]).toContain('administrator privileges')
    })

    it('should provide actionable error messages', async () => {
      // Mock various error scenarios
      mockFs.unlinkSync.mockImplementation(() => {
        throw new Error('The process cannot access the file because it is being used by another process')
      })
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['running.exe'])

      const result = await uninstallerManager.performUninstall()

      expect(result.success).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.errors[0]).toContain('being used by another process')
      
      // Verify error message suggests solution
      expect(result.errors[0]).toContain('close')
    })
  })

  describe('Performance and Resource Management', () => {
    it('should handle large installations efficiently', async () => {
      // Mock large installation with many files
      const largeFileList = Array.from({ length: 1000 }, (_, i) => `file${i}.exe`)
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(largeFileList)

      const startTime = Date.now()
      const result = await uninstallerManager.performUninstall()
      const endTime = Date.now()

      expect(result.success).toBe(true)
      
      // Should complete within reasonable time (adjust threshold as needed)
      expect(endTime - startTime).toBeLessThan(5000) // 5 seconds
    })

    it('should manage memory usage during large uninstallations', async () => {
      // Mock very large installation
      const veryLargeFileList = Array.from({ length: 10000 }, (_, i) => `file${i}.exe`)
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(veryLargeFileList)

      const initialMemory = process.memoryUsage().heapUsed
      const result = await uninstallerManager.performUninstall()
      const finalMemory = process.memoryUsage().heapUsed

      expect(result.success).toBe(true)
      
      // Memory usage should not grow excessively
      const memoryIncrease = finalMemory - initialMemory
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024) // 50MB limit
    })
  })

  describe('Cross-Platform Edge Cases', () => {
    it('should handle mixed path formats in registry', async () => {
      vi.stubGlobal('process', { platform: 'win32' })
      
      // Mock registry with mixed path formats
      mockChildProcess.execSync.mockImplementation((command: string) => {
        if (command.includes('reg query')) {
          return Buffer.from('InstallLocation    REG_SZ    C:/Program Files/MyApp')
        }
        return Buffer.from('')
      })
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['app.exe'])

      const result = await uninstallerManager.performUninstall()

      expect(result.success).toBe(true)
    })

    it('should handle symbolic links correctly', async () => {
      // Mock symbolic link scenario
      mockFs.statSync.mockImplementation((path: string) => {
        if (path.includes('symlink')) {
          return { isDirectory: () => false, isFile: () => true, isSymbolicLink: () => true }
        }
        return { isDirectory: () => false, isFile: () => true, isSymbolicLink: () => false }
      })
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['symlink', 'regular.exe'])

      const result = await uninstallerManager.performUninstall()

      expect(result.success).toBe(true)
    })
  })
}) 