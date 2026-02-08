#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

class UninstallerCleanup {
  constructor() {
    this.projectRoot = process.cwd()
    this.cleanupPaths = [
      path.join(this.projectRoot, 'dist', 'uninstaller'),
      path.join(this.projectRoot, 'out', 'uninstaller-distribution'),
      path.join(this.projectRoot, 'test-uninstaller-report.json')
    ]
  }

  async cleanup() {
    console.log('🧹 Starting uninstaller cleanup...')
    
    try {
      // Step 1: Clean build artifacts
      await this.cleanBuildArtifacts()
      
      // Step 2: Clean distribution files
      await this.cleanDistributionFiles()
      
      // Step 3: Clean test reports
      await this.cleanTestReports()
      
      // Step 4: Clean temporary files
      await this.cleanTemporaryFiles()
      
      console.log('✅ Uninstaller cleanup completed successfully!')
    } catch (error) {
      console.error('❌ Cleanup failed:', error.message)
      process.exit(1)
    }
  }

  async cleanBuildArtifacts() {
    console.log('🗑️  Cleaning build artifacts...')
    
    const buildPath = path.join(this.projectRoot, 'dist', 'uninstaller')
    if (fs.existsSync(buildPath)) {
      this.removeDirectory(buildPath)
      console.log('✅ Build artifacts cleaned')
    } else {
      console.log('ℹ️  No build artifacts found')
    }
  }

  async cleanDistributionFiles() {
    console.log('🗑️  Cleaning distribution files...')
    
    const distributionPath = path.join(this.projectRoot, 'out', 'uninstaller-distribution')
    if (fs.existsSync(distributionPath)) {
      this.removeDirectory(distributionPath)
      console.log('✅ Distribution files cleaned')
    } else {
      console.log('ℹ️  No distribution files found')
    }
  }

  async cleanTestReports() {
    console.log('🗑️  Cleaning test reports...')
    
    const testReportPath = path.join(this.projectRoot, 'test-uninstaller-report.json')
    if (fs.existsSync(testReportPath)) {
      fs.unlinkSync(testReportPath)
      console.log('✅ Test reports cleaned')
    } else {
      console.log('ℹ️  No test reports found')
    }
  }

  async cleanTemporaryFiles() {
    console.log('🗑️  Cleaning temporary files...')
    
    const tempPatterns = [
      /\.tmp$/,
      /\.temp$/,
      /uninstaller.*\.log$/,
      /\.cache$/
    ]
    
    let cleanedCount = 0
    
    // Clean temp files in project root
    const projectFiles = fs.readdirSync(this.projectRoot)
    for (const file of projectFiles) {
      if (tempPatterns.some(pattern => pattern.test(file))) {
        const filePath = path.join(this.projectRoot, file)
        try {
          if (fs.statSync(filePath).isFile()) {
            fs.unlinkSync(filePath)
            cleanedCount++
          }
        } catch (error) {
          // Ignore errors for temp file cleanup
        }
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`✅ Cleaned ${cleanedCount} temporary files`)
    } else {
      console.log('ℹ️  No temporary files found')
    }
  }

  removeDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
      const items = fs.readdirSync(dirPath)
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item)
        const stat = fs.statSync(fullPath)
        
        if (stat.isDirectory()) {
          this.removeDirectory(fullPath)
        } else {
          fs.unlinkSync(fullPath)
        }
      }
      
      fs.rmdirSync(dirPath)
    }
  }

  async cleanAll() {
    console.log('🧹 Starting complete uninstaller cleanup...')
    
    try {
      // Clean everything
      await this.cleanup()
      
      // Also clean node_modules if requested
      if (process.argv.includes('--include-node-modules')) {
        await this.cleanNodeModules()
      }
      
      console.log('✅ Complete cleanup finished!')
    } catch (error) {
      console.error('❌ Complete cleanup failed:', error.message)
      process.exit(1)
    }
  }

  async cleanNodeModules() {
    console.log('🗑️  Cleaning node_modules (this may take a while)...')
    
    const nodeModulesPath = path.join(this.projectRoot, 'node_modules')
    if (fs.existsSync(nodeModulesPath)) {
      this.removeDirectory(nodeModulesPath)
      console.log('✅ node_modules cleaned')
    } else {
      console.log('ℹ️  No node_modules found')
    }
  }

  async showCleanupInfo() {
    console.log('📊 Uninstaller Cleanup Information')
    console.log('==================================')
    console.log('')
    console.log('This script will clean the following:')
    console.log('')
    console.log('🗑️  Build Artifacts:')
    console.log('   - dist/uninstaller/')
    console.log('')
    console.log('🗑️  Distribution Files:')
    console.log('   - out/uninstaller-distribution/')
    console.log('')
    console.log('🗑️  Test Reports:')
    console.log('   - test-uninstaller-report.json')
    console.log('')
    console.log('🗑️  Temporary Files:')
    console.log('   - *.tmp, *.temp, *.log, *.cache')
    console.log('')
    console.log('Usage:')
    console.log('  node scripts/cleanup-uninstaller.js          # Standard cleanup')
    console.log('  node scripts/cleanup-uninstaller.js --all    # Complete cleanup')
    console.log('  node scripts/cleanup-uninstaller.js --info   # Show this info')
  }
}

// Run cleanup if this script is executed directly
if (require.main === module) {
  const cleanup = new UninstallerCleanup()
  
  if (process.argv.includes('--info')) {
    cleanup.showCleanupInfo()
  } else if (process.argv.includes('--all')) {
    cleanup.cleanAll()
  } else {
    cleanup.cleanup()
  }
}

module.exports = UninstallerCleanup 