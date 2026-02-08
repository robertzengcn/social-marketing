import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { UninstallerManager } from '../../../src/uninstaller/uninstaller'
import * as fs from 'fs'
import * as path from 'path'

// Mock fs module
vi.mock('fs')
vi.mock('path')
vi.mock('child_process')

describe('UninstallerManager', () => {
  let uninstaller: UninstallerManager
  let mockFs: any

  beforeEach(() => {
    uninstaller = new UninstallerManager('TestApp')
    mockFs = vi.mocked(fs)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('detectInstallation', () => {
    it('should detect installation from common Windows path', async () => {
      const mockPath = 'C:\\Program Files\\TestApp'
      mockFs.existsSync.mockReturnValue(true)
      
      const result = await uninstaller.detectInstallation()
      
      expect(result).toBe(mockPath)
      expect(mockFs.existsSync).toHaveBeenCalled()
    })

    it('should return null when no installation found', async () => {
      mockFs.existsSync.mockReturnValue(false)
      
      const result = await uninstaller.detectInstallation()
      
      expect(result).toBeNull()
    })

    it('should handle errors gracefully', async () => {
      mockFs.existsSync.mockImplementation(() => {
        throw new Error('File system error')
      })
      
      const result = await uninstaller.detectInstallation()
      
      expect(result).toBeNull()
    })
  })

  describe('performUninstall', () => {
    it('should prevent multiple simultaneous uninstallations', async () => {
      // Mock the uninstaller to be already running
      vi.spyOn(uninstaller, 'isUninstalling').mockReturnValue(true)
      
      const result = await uninstaller.performUninstall()
      
      expect(result.success).toBe(false)
      expect(result.message).toBe('Uninstallation already in progress')
      expect(result.errors).toContain('Uninstallation already in progress')
    })

    it('should handle missing installation directory', async () => {
      vi.spyOn(uninstaller, 'detectInstallation').mockResolvedValue(null)
      
      const result = await uninstaller.performUninstall()
      
      expect(result.success).toBe(false)
      expect(result.message).toBe('Could not detect installation directory')
      expect(result.errors).toContain('Installation directory not found')
    })

    it('should complete uninstallation successfully', async () => {
      const mockInstallDir = '/test/install/dir'
      vi.spyOn(uninstaller, 'detectInstallation').mockResolvedValue(mockInstallDir)
      mockFs.existsSync.mockReturnValue(true)
      mockFs.rmSync.mockImplementation(() => {})
      
      const progressCallback = vi.fn()
      const result = await uninstaller.performUninstall(progressCallback)
      
      expect(result.success).toBe(true)
      expect(result.message).toBe('Social Marketing has been successfully uninstalled')
      expect(progressCallback).toHaveBeenCalled()
    })

    it('should handle file removal errors', async () => {
      const mockInstallDir = '/test/install/dir'
      vi.spyOn(uninstaller, 'detectInstallation').mockResolvedValue(mockInstallDir)
      mockFs.existsSync.mockReturnValue(true)
      mockFs.rmSync.mockImplementation(() => {
        throw new Error('Permission denied')
      })
      
      const result = await uninstaller.performUninstall()
      
      expect(result.success).toBe(false)
      expect(result.errors).toContain('Failed to remove application files: Permission denied')
    })
  })

  describe('getInstallationDirectory', () => {
    it('should return set installation directory', () => {
      const testDir = '/test/directory'
      uninstaller.setInstallationDirectory(testDir)
      
      const result = uninstaller.getInstallationDirectory()
      
      expect(result).toBe(testDir)
    })

    it('should return null when no directory set', () => {
      const result = uninstaller.getInstallationDirectory()
      
      expect(result).toBeNull()
    })
  })

  describe('setInstallationDirectory', () => {
    it('should set installation directory', () => {
      const testDir = '/test/directory'
      
      uninstaller.setInstallationDirectory(testDir)
      
      expect(uninstaller.getInstallationDirectory()).toBe(testDir)
    })
  })

  describe('isUninstalling', () => {
    it('should return false when not uninstalling', () => {
      const result = uninstaller.isUninstalling()
      
      expect(result).toBe(false)
    })

    it('should return true during uninstallation', async () => {
      const mockInstallDir = '/test/install/dir'
      vi.spyOn(uninstaller, 'detectInstallation').mockResolvedValue(mockInstallDir)
      mockFs.existsSync.mockReturnValue(true)
      mockFs.rmSync.mockImplementation(() => {})
      
      // Start uninstallation
      const uninstallPromise = uninstaller.performUninstall()
      
      // Check during uninstallation
      expect(uninstaller.isUninstalling()).toBe(true)
      
      // Wait for completion
      await uninstallPromise
      
      // Check after completion
      expect(uninstaller.isUninstalling()).toBe(false)
    })
  })
}) 