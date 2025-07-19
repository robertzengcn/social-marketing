import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { UninstallerManager } from '../../../src/uninstaller/uninstaller'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

// Mock file system operations
vi.mock('fs', () => ({
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
  unlinkSync: vi.fn(),
  rmdirSync: vi.fn(),
  statSync: vi.fn(),
  mkdirSync: vi.fn(),
  writeFileSync: vi.fn(),
  readFileSync: vi.fn()
}))

// Mock child process
vi.mock('child_process', () => ({
  execSync: vi.fn()
}))

// Mock electron-log
vi.mock('electron-log', () => ({
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn()
}))

describe('Uninstaller Integration Tests', () => {
  let uninstallerManager: UninstallerManager
  let mockFs: any
  let mockChildProcess: any

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Get mocked modules
    mockFs = vi.mocked(fs)
    mockChildProcess = vi.mocked(require('child_process'))
    
    // Setup default mock implementations
    mockFs.existsSync.mockReturnValue(true)
    mockFs.readdirSync.mockReturnValue([])
    mockFs.statSync.mockReturnValue({ isDirectory: () => false, isFile: () => true })
    mockChildProcess.execSync.mockReturnValue(Buffer.from(''))
    
    uninstallerManager = new UninstallerManager()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Complete Uninstallation Flow', () => {
    it('should perform complete uninstallation on Windows', async () => {
      // Mock Windows-specific environment
      vi.stubGlobal('process', { platform: 'win32' })
      
      // Mock installation detection
      mockFs.existsSync.mockImplementation((path: string) => {
        if (path.includes('Program Files') || path.includes('AppData')) {
          return true
        }
        return false
      })
      
      mockFs.readdirSync.mockReturnValue(['app.exe', 'resources', 'node_modules'])
      
      // Mock registry query
      mockChildProcess.execSync.mockImplementation((command: string) => {
        if (command.includes('reg query')) {
          return Buffer.from('InstallLocation    REG_SZ    C:\\Program Files\\MyApp')
        }
        return Buffer.from('')
      })

      const result = await uninstallerManager.performUninstall()

      expect(result.success).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.warnings).toHaveLength(0)
    })

    it('should perform complete uninstallation on macOS', async () => {
      // Mock macOS-specific environment
      vi.stubGlobal('process', { platform: 'darwin' })
      
      // Mock installation detection
      mockFs.existsSync.mockImplementation((path: string) => {
        if (path.includes('/Applications') || path.includes('~/Library')) {
          return true
        }
        return false
      })
      
      mockFs.readdirSync.mockReturnValue(['MyApp.app', 'Contents', 'Info.plist'])

      const result = await uninstallerManager.performUninstall()

      expect(result.success).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.warnings).toHaveLength(0)
    })

    it('should perform complete uninstallation on Linux', async () => {
      // Mock Linux-specific environment
      vi.stubGlobal('process', { platform: 'linux' })
      
      // Mock installation detection
      mockFs.existsSync.mockImplementation((path: string) => {
        if (path.includes('/opt') || path.includes('/usr/local') || path.includes('~/.local')) {
          return true
        }
        return false
      })
      
      mockFs.readdirSync.mockReturnValue(['myapp', 'bin', 'lib', 'share'])

      const result = await uninstallerManager.performUninstall()

      expect(result.success).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.warnings).toHaveLength(0)
    })
  })

  describe('Error Handling Integration', () => {
    it('should handle file system errors gracefully', async () => {
      // Mock file system errors
      mockFs.unlinkSync.mockImplementation(() => {
        throw new Error('Permission denied')
      })
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['test.exe'])

      const result = await uninstallerManager.performUninstall()

      expect(result.success).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.errors[0]).toContain('Permission denied')
    })

    it('should handle registry errors on Windows', async () => {
      vi.stubGlobal('process', { platform: 'win32' })
      
      // Mock registry errors
      mockChildProcess.execSync.mockImplementation(() => {
        throw new Error('Registry access denied')
      })
      
      mockFs.existsSync.mockReturnValue(true)

      const result = await uninstallerManager.performUninstall()

      expect(result.success).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.errors[0]).toContain('Registry access denied')
    })

    it('should continue uninstallation despite some errors', async () => {
      // Mock partial failures
      let callCount = 0
      mockFs.unlinkSync.mockImplementation(() => {
        callCount++
        if (callCount === 1) {
          throw new Error('File in use')
        }
        // Subsequent calls succeed
      })
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['file1.exe', 'file2.exe', 'file3.exe'])

      const result = await uninstallerManager.performUninstall()

      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.warnings.length).toBeGreaterThan(0)
    })
  })

  describe('Progress Tracking Integration', () => {
    it('should report progress during uninstallation', async () => {
      const progressUpdates: any[] = []
      
      // Mock progress callback
      const onProgress = (progress: any) => {
        progressUpdates.push(progress)
      }
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['file1', 'file2', 'file3'])

      await uninstallerManager.performUninstall(onProgress)

      expect(progressUpdates.length).toBeGreaterThan(0)
      expect(progressUpdates[0]).toHaveProperty('percentage')
      expect(progressUpdates[0]).toHaveProperty('message')
      expect(progressUpdates[0]).toHaveProperty('step')
    })

    it('should complete progress to 100%', async () => {
      const progressUpdates: any[] = []
      
      const onProgress = (progress: any) => {
        progressUpdates.push(progress)
      }
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['test.exe'])

      await uninstallerManager.performUninstall(onProgress)

      const finalProgress = progressUpdates[progressUpdates.length - 1]
      expect(finalProgress.percentage).toBe(100)
      expect(finalProgress.step).toBe('complete')
    })
  })

  describe('Cleanup Integration', () => {
    it('should clean up temporary files after uninstallation', async () => {
      const tempDir = os.tmpdir()
      const tempFile = path.join(tempDir, 'uninstaller-temp.log')
      
      // Mock temp file creation
      mockFs.writeFileSync.mockImplementation((filePath: string) => {
        if (filePath.includes('uninstaller-temp')) {
          return
        }
      })
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['app.exe'])

      await uninstallerManager.performUninstall()

      // Verify temp file cleanup was attempted
      expect(mockFs.unlinkSync).toHaveBeenCalledWith(expect.stringContaining('uninstaller-temp'))
    })

    it('should handle cleanup errors gracefully', async () => {
      // Mock cleanup errors
      mockFs.unlinkSync.mockImplementation((path: string) => {
        if (path.includes('temp') || path.includes('log')) {
          throw new Error('Cleanup failed')
        }
      })
      
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue(['app.exe'])

      const result = await uninstallerManager.performUninstall()

      expect(result.success).toBe(true) // Main uninstall should still succeed
      expect(result.warnings.length).toBeGreaterThan(0)
      expect(result.warnings[0]).toContain('Cleanup failed')
    })
  })

  describe('Cross-Platform Compatibility', () => {
    it('should handle different path separators correctly', async () => {
      const platforms = ['win32', 'darwin', 'linux']
      
      for (const platform of platforms) {
        vi.stubGlobal('process', { platform })
        
        mockFs.existsSync.mockReturnValue(true)
        mockFs.readdirSync.mockReturnValue(['app'])
        
        const result = await uninstallerManager.performUninstall()
        
        expect(result.success).toBe(true)
      }
    })
  })
}) 