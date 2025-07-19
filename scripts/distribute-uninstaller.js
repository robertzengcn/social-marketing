#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

class UninstallerDistributor {
  constructor() {
    this.projectRoot = process.cwd()
    this.distDir = path.join(this.projectRoot, 'dist')
    this.uninstallerDir = path.join(this.distDir, 'uninstaller')
    this.outDir = path.join(this.projectRoot, 'out')
  }

  async distribute() {
    console.log('🚀 Starting uninstaller distribution...')
    
    try {
      // Step 1: Build uninstaller
      await this.buildUninstaller()
      
      // Step 2: Package for different platforms
      await this.packageForPlatforms()
      
      // Step 3: Create distribution packages
      await this.createDistributionPackages()
      
      // Step 4: Generate checksums
      await this.generateChecksums()
      
      console.log('✅ Uninstaller distribution completed successfully!')
    } catch (error) {
      console.error('❌ Distribution failed:', error.message)
      process.exit(1)
    }
  }

  async buildUninstaller() {
    console.log('📦 Building uninstaller...')
    
    try {
      execSync('yarn build-uninstaller', { 
        stdio: 'inherit',
        cwd: this.projectRoot 
      })
      console.log('✅ Uninstaller build completed')
    } catch (error) {
      throw new Error(`Failed to build uninstaller: ${error.message}`)
    }
  }

  async packageForPlatforms() {
    console.log('🔧 Packaging for different platforms...')
    
    const platforms = [
      { name: 'Windows', script: 'make-uninstaller-win' },
      { name: 'macOS', script: 'make-uninstaller-mac' },
      { name: 'Linux', script: 'make-uninstaller-linux' }
    ]

    for (const platform of platforms) {
      try {
        console.log(`📦 Packaging for ${platform.name}...`)
        execSync(`yarn ${platform.script}`, { 
          stdio: 'inherit',
          cwd: this.projectRoot 
        })
        console.log(`✅ ${platform.name} packaging completed`)
      } catch (error) {
        console.warn(`⚠️  ${platform.name} packaging failed: ${error.message}`)
      }
    }
  }

  async createDistributionPackages() {
    console.log('📁 Creating distribution packages...')
    
    const distributionDir = path.join(this.outDir, 'uninstaller-distribution')
    
    // Create distribution directory
    if (!fs.existsSync(distributionDir)) {
      fs.mkdirSync(distributionDir, { recursive: true })
    }

    // Copy uninstaller files
    const uninstallerFiles = this.findUninstallerFiles()
    
    for (const file of uninstallerFiles) {
      const destPath = path.join(distributionDir, path.basename(file))
      fs.copyFileSync(file, destPath)
      console.log(`📋 Copied: ${path.basename(file)}`)
    }

    // Create README for distribution
    this.createDistributionReadme(distributionDir)
    
    console.log(`✅ Distribution packages created in: ${distributionDir}`)
  }

  findUninstallerFiles() {
    const files = []
    
    // Look for uninstaller files in out directory
    if (fs.existsSync(this.outDir)) {
      this.findFilesRecursively(this.outDir, files, /uninstaller/i)
    }
    
    // Look for uninstaller files in dist directory
    if (fs.existsSync(this.uninstallerDir)) {
      this.findFilesRecursively(this.uninstallerDir, files, /\.(exe|app|deb|rpm|zip)$/i)
    }
    
    return files
  }

  findFilesRecursively(dir, files, pattern) {
    const items = fs.readdirSync(dir)
    
    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        this.findFilesRecursively(fullPath, files, pattern)
      } else if (pattern.test(item)) {
        files.push(fullPath)
      }
    }
  }

  createDistributionReadme(distributionDir) {
    const readmeContent = `# Social Marketing Uninstaller Distribution

This directory contains the standalone uninstaller for Social Marketing application.

## Files Included

- \`SocialMarketingUninstaller.exe\` - Windows uninstaller
- \`SocialMarketingUninstaller.app\` - macOS uninstaller  
- \`social-marketing-uninstaller\` - Linux uninstaller

## Installation

1. Copy the appropriate uninstaller for your platform to the Social Marketing application directory
2. Run the uninstaller to remove the application

## Usage

### Windows
\`\`\`
SocialMarketingUninstaller.exe
\`\`\`

### macOS
\`\`\`
open SocialMarketingUninstaller.app
\`\`\`

### Linux
\`\`\`
./social-marketing-uninstaller
\`\`\`

## Version

${this.getVersion()}

## Build Date

${new Date().toISOString()}

## Support

For issues or questions, please refer to the main application documentation.
`

    const readmePath = path.join(distributionDir, 'README.md')
    fs.writeFileSync(readmePath, readmeContent)
  }

  async generateChecksums() {
    console.log('🔍 Generating checksums...')
    
    const distributionDir = path.join(this.outDir, 'uninstaller-distribution')
    if (!fs.existsSync(distributionDir)) {
      return
    }

    const checksums = {}
    const files = fs.readdirSync(distributionDir)
    
    for (const file of files) {
      if (file === 'README.md' || file === 'checksums.txt') continue
      
      const filePath = path.join(distributionDir, file)
      const checksum = this.generateFileChecksum(filePath)
      checksums[file] = checksum
    }

    const checksumsContent = Object.entries(checksums)
      .map(([file, checksum]) => `${checksum}  ${file}`)
      .join('\n')

    const checksumsPath = path.join(distributionDir, 'checksums.txt')
    fs.writeFileSync(checksumsPath, checksumsContent)
    
    console.log('✅ Checksums generated')
  }

  generateFileChecksum(filePath) {
    const crypto = require('crypto')
    const fileBuffer = fs.readFileSync(filePath)
    const hashSum = crypto.createHash('sha256')
    hashSum.update(fileBuffer)
    return hashSum.digest('hex')
  }

  getVersion() {
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
      return packageJson.version
    } catch (error) {
      return '1.0.0'
    }
  }
}

// Run distribution if this script is executed directly
if (require.main === module) {
  const distributor = new UninstallerDistributor()
  distributor.distribute()
}

module.exports = UninstallerDistributor 