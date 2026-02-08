#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

class UninstallerInstaller {
  constructor() {
    this.projectRoot = process.cwd()
    this.outDir = path.join(this.projectRoot, 'out')
    this.distDir = path.join(this.projectRoot, 'dist')
  }

  async install() {
    console.log('🔧 Installing uninstaller to application directory...')
    
    try {
      // Step 1: Find the main application build
      const appPath = await this.findMainApplication()
      
      // Step 2: Find uninstaller files
      const uninstallerFiles = this.findUninstallerFiles()
      
      // Step 3: Copy uninstaller to app directory
      await this.copyUninstallerToApp(appPath, uninstallerFiles)
      
      // Step 4: Update app metadata
      await this.updateAppMetadata(appPath)
      
      console.log('✅ Uninstaller installation completed successfully!')
    } catch (error) {
      console.error('❌ Installation failed:', error.message)
      process.exit(1)
    }
  }

  async findMainApplication() {
    console.log('🔍 Finding main application...')
    
    // Look for the main application in out directory
    const possiblePaths = [
      path.join(this.outDir, 'Social Marketing-darwin-x64', 'Social Marketing.app'),
      path.join(this.outDir, 'Social Marketing-win32-x64'),
      path.join(this.outDir, 'Social Marketing-linux-x64'),
      path.join(this.outDir, 'make', 'Social Marketing.app'),
      path.join(this.outDir, 'make', 'Social Marketing Setup.exe')
    ]

    for (const appPath of possiblePaths) {
      if (fs.existsSync(appPath)) {
        console.log(`✅ Found application at: ${appPath}`)
        return appPath
      }
    }

    throw new Error('Could not find main application. Please build the application first.')
  }

  findUninstallerFiles() {
    console.log('🔍 Finding uninstaller files...')
    
    const files = []
    
    // Look in dist/uninstaller directory
    const uninstallerDir = path.join(this.distDir, 'uninstaller')
    if (fs.existsSync(uninstallerDir)) {
      const items = fs.readdirSync(uninstallerDir)
      for (const item of items) {
        if (item.endsWith('.js')) {
          files.push({
            source: path.join(uninstallerDir, item),
            name: 'uninstaller.js',
            type: 'script'
          })
        }
      }
    }

    // Look for built uninstaller executables
    if (fs.existsSync(this.outDir)) {
      this.findUninstallerExecutables(this.outDir, files)
    }

    if (files.length === 0) {
      throw new Error('Could not find uninstaller files. Please build the uninstaller first.')
    }

    console.log(`✅ Found ${files.length} uninstaller files`)
    return files
  }

  findUninstallerExecutables(dir, files) {
    const items = fs.readdirSync(dir)
    
    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        this.findUninstallerExecutables(fullPath, files)
      } else if (this.isUninstallerFile(item)) {
        files.push({
          source: fullPath,
          name: this.getUninstallerName(item),
          type: 'executable'
        })
      }
    }
  }

  isUninstallerFile(filename) {
    const uninstallerPatterns = [
      /uninstaller/i,
      /SocialMarketingUninstaller/i,
      /social-marketing-uninstaller/i
    ]
    
    return uninstallerPatterns.some(pattern => pattern.test(filename))
  }

  getUninstallerName(filename) {
    if (filename.endsWith('.exe')) {
      return 'SocialMarketingUninstaller.exe'
    } else if (filename.endsWith('.app')) {
      return 'SocialMarketingUninstaller.app'
    } else {
      return 'social-marketing-uninstaller'
    }
  }

  async copyUninstallerToApp(appPath, uninstallerFiles) {
    console.log('📋 Copying uninstaller to application directory...')
    
    const appDir = this.getAppDirectory(appPath)
    const uninstallerDir = path.join(appDir, 'uninstaller')
    
    // Create uninstaller directory
    if (!fs.existsSync(uninstallerDir)) {
      fs.mkdirSync(uninstallerDir, { recursive: true })
    }

    // Copy uninstaller files
    for (const file of uninstallerFiles) {
      const destPath = path.join(uninstallerDir, file.name)
      fs.copyFileSync(file.source, destPath)
      
      // Make executable on Unix systems
      if (process.platform !== 'win32' && file.type === 'executable') {
        try {
          fs.chmodSync(destPath, '755')
        } catch (error) {
          console.warn(`⚠️  Could not set executable permissions for ${file.name}`)
        }
      }
      
      console.log(`📋 Copied: ${file.name}`)
    }

    // Create uninstaller launcher script
    this.createUninstallerLauncher(uninstallerDir, uninstallerFiles)
    
    console.log(`✅ Uninstaller copied to: ${uninstallerDir}`)
  }

  getAppDirectory(appPath) {
    if (appPath.endsWith('.app')) {
      // macOS app bundle
      return path.join(appPath, 'Contents', 'Resources')
    } else if (appPath.endsWith('.exe')) {
      // Windows executable - look for the directory containing it
      return path.dirname(appPath)
    } else {
      // Linux or other - assume it's a directory
      return appPath
    }
  }

  createUninstallerLauncher(uninstallerDir, uninstallerFiles) {
    const launcherContent = this.generateLauncherScript(uninstallerFiles)
    const launcherPath = path.join(uninstallerDir, 'launch-uninstaller.js')
    
    fs.writeFileSync(launcherPath, launcherContent)
    
    if (process.platform !== 'win32') {
      try {
        fs.chmodSync(launcherPath, '755')
      } catch (error) {
        console.warn('⚠️  Could not set executable permissions for launcher')
      }
    }
  }

  generateLauncherScript(uninstallerFiles) {
    const platform = process.platform
    let executablePath = ''
    
    for (const file of uninstallerFiles) {
      if (file.type === 'executable') {
        if (platform === 'win32' && file.name.endsWith('.exe')) {
          executablePath = file.name
          break
        } else if (platform === 'darwin' && file.name.endsWith('.app')) {
          executablePath = file.name
          break
        } else if (platform === 'linux' && !file.name.includes('.')) {
          executablePath = file.name
          break
        }
      }
    }

    if (!executablePath) {
      executablePath = uninstallerFiles[0].name
    }

    return `#!/usr/bin/env node

const { spawn } = require('child_process')
const path = require('path')

const uninstallerPath = path.join(__dirname, '${executablePath}')

console.log('🚀 Launching Social Marketing Uninstaller...')

if (process.platform === 'darwin' && uninstallerPath.endsWith('.app')) {
  // macOS app bundle
  spawn('open', [uninstallerPath], { stdio: 'inherit' })
} else {
  // Other platforms
  spawn(uninstallerPath, [], { stdio: 'inherit' })
}
`
  }

  async updateAppMetadata(appPath) {
    console.log('📝 Updating application metadata...')
    
    // Create uninstaller info file
    const appDir = this.getAppDirectory(appPath)
    const uninstallerInfo = {
      version: this.getVersion(),
      installDate: new Date().toISOString(),
      uninstallerPath: './uninstaller/launch-uninstaller.js',
      uninstallerFiles: ['SocialMarketingUninstaller.exe', 'SocialMarketingUninstaller.app', 'social-marketing-uninstaller']
    }

    const infoPath = path.join(appDir, 'uninstaller-info.json')
    fs.writeFileSync(infoPath, JSON.stringify(uninstallerInfo, null, 2))
    
    console.log('✅ Application metadata updated')
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

// Run installation if this script is executed directly
if (require.main === module) {
  const installer = new UninstallerInstaller()
  installer.install()
}

module.exports = UninstallerInstaller 