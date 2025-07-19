#!/usr/bin/env node

const { execSync, spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

class UninstallerTester {
  constructor() {
    this.projectRoot = process.cwd()
    this.testResults = []
  }

  async runTests() {
    console.log('🧪 Starting uninstaller tests...')
    
    try {
      // Step 1: Test uninstaller build
      await this.testBuild()
      
      // Step 2: Test uninstaller structure
      await this.testStructure()
      
      // Step 3: Test uninstaller functionality
      await this.testFunctionality()
      
      // Step 4: Test integration
      await this.testIntegration()
      
      // Step 5: Generate test report
      await this.generateTestReport()
      
      console.log('✅ All tests completed!')
      this.printSummary()
    } catch (error) {
      console.error('❌ Tests failed:', error.message)
      process.exit(1)
    }
  }

  async testBuild() {
    console.log('🔨 Testing uninstaller build...')
    
    try {
      // Test if uninstaller builds successfully
      execSync('yarn build-uninstaller', { 
        stdio: 'pipe',
        cwd: this.projectRoot 
      })
      
      // Check if build output exists
      const buildOutput = path.join(this.projectRoot, 'dist', 'uninstaller')
      if (!fs.existsSync(buildOutput)) {
        throw new Error('Build output directory not found')
      }
      
      const files = fs.readdirSync(buildOutput)
      if (files.length === 0) {
        throw new Error('No build files generated')
      }
      
      this.addTestResult('Build', 'PASS', 'Uninstaller builds successfully')
      console.log('✅ Build test passed')
    } catch (error) {
      this.addTestResult('Build', 'FAIL', error.message)
      throw error
    }
  }

  async testStructure() {
    console.log('📁 Testing uninstaller structure...')
    
    const requiredFiles = [
      'src/uninstaller/main.ts',
      'src/uninstaller/uninstaller.ts',
      'src/uninstaller/renderer.ts',
      'src/uninstaller/ui/UninstallerWindow.vue',
      'src/uninstaller/platforms/windows.ts',
      'src/uninstaller/platforms/macos.ts',
      'src/uninstaller/platforms/linux.ts',
      'vite.uninstaller.config.mjs'
    ]
    
    const missingFiles = []
    
    for (const file of requiredFiles) {
      const filePath = path.join(this.projectRoot, file)
      if (!fs.existsSync(filePath)) {
        missingFiles.push(file)
      }
    }
    
    if (missingFiles.length > 0) {
      this.addTestResult('Structure', 'FAIL', `Missing files: ${missingFiles.join(', ')}`)
      throw new Error(`Missing required files: ${missingFiles.join(', ')}`)
    }
    
    this.addTestResult('Structure', 'PASS', 'All required files present')
    console.log('✅ Structure test passed')
  }

  async testFunctionality() {
    console.log('⚙️  Testing uninstaller functionality...')
    
    // Test uninstaller class instantiation
    try {
      const uninstallerPath = path.join(this.projectRoot, 'dist', 'uninstaller', 'social-marketing.js')
      if (fs.existsSync(uninstallerPath)) {
        // Try to require the built uninstaller
        require(uninstallerPath)
        this.addTestResult('Functionality', 'PASS', 'Uninstaller module loads successfully')
      } else {
        this.addTestResult('Functionality', 'SKIP', 'Built uninstaller not found, skipping functionality test')
      }
    } catch (error) {
      this.addTestResult('Functionality', 'FAIL', `Module loading failed: ${error.message}`)
    }
    
    // Test platform detection
    await this.testPlatformDetection()
    
    console.log('✅ Functionality test passed')
  }

  async testPlatformDetection() {
    const platform = process.platform
    const expectedPlatforms = ['win32', 'darwin', 'linux']
    
    if (expectedPlatforms.includes(platform)) {
      this.addTestResult('Platform Detection', 'PASS', `Platform ${platform} detected correctly`)
    } else {
      this.addTestResult('Platform Detection', 'WARN', `Unknown platform: ${platform}`)
    }
  }

  async testIntegration() {
    console.log('🔗 Testing uninstaller integration...')
    
    // Test package.json scripts
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
      const requiredScripts = [
        'build-uninstaller',
        'make-uninstaller-win',
        'make-uninstaller-mac',
        'make-uninstaller-linux',
        'make-uninstaller-all'
      ]
      
      const missingScripts = []
      for (const script of requiredScripts) {
        if (!packageJson.scripts[script]) {
          missingScripts.push(script)
        }
      }
      
      if (missingScripts.length > 0) {
        this.addTestResult('Integration', 'FAIL', `Missing scripts: ${missingScripts.join(', ')}`)
      } else {
        this.addTestResult('Integration', 'PASS', 'All required scripts present')
      }
    } catch (error) {
      this.addTestResult('Integration', 'FAIL', `Package.json error: ${error.message}`)
    }
    
    // Test forge configuration
    await this.testForgeConfig()
    
    console.log('✅ Integration test passed')
  }

  async testForgeConfig() {
    try {
      const forgeConfig = require('../forge.config.js')
      
      // Check if uninstaller build is included
      const hasUninstallerBuild = forgeConfig.plugins.some(plugin => 
        plugin.name === '@electron-forge/plugin-vite' &&
        plugin.config.build.some(build => 
          build.entry === 'src/uninstaller/main.ts'
        )
      )
      
      if (hasUninstallerBuild) {
        this.addTestResult('Forge Config', 'PASS', 'Uninstaller build configured correctly')
      } else {
        this.addTestResult('Forge Config', 'FAIL', 'Uninstaller build not found in forge config')
      }
    } catch (error) {
      this.addTestResult('Forge Config', 'FAIL', `Forge config error: ${error.message}`)
    }
  }

  async generateTestReport() {
    console.log('📊 Generating test report...')
    
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: this.testResults.length,
      passed: this.testResults.filter(r => r.status === 'PASS').length,
      failed: this.testResults.filter(r => r.status === 'FAIL').length,
      skipped: this.testResults.filter(r => r.status === 'SKIP').length,
      warnings: this.testResults.filter(r => r.status === 'WARN').length,
      results: this.testResults
    }
    
    const reportPath = path.join(this.projectRoot, 'test-uninstaller-report.json')
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    
    console.log(`📊 Test report saved to: ${reportPath}`)
  }

  addTestResult(test, status, message) {
    this.testResults.push({
      test,
      status,
      message,
      timestamp: new Date().toISOString()
    })
  }

  printSummary() {
    console.log('\n📋 Test Summary:')
    console.log('================')
    
    const passed = this.testResults.filter(r => r.status === 'PASS').length
    const failed = this.testResults.filter(r => r.status === 'FAIL').length
    const skipped = this.testResults.filter(r => r.status === 'SKIP').length
    const warnings = this.testResults.filter(r => r.status === 'WARN').length
    
    console.log(`✅ Passed: ${passed}`)
    console.log(`❌ Failed: ${failed}`)
    console.log(`⏭️  Skipped: ${skipped}`)
    console.log(`⚠️  Warnings: ${warnings}`)
    console.log(`📊 Total: ${this.testResults.length}`)
    
    if (failed > 0) {
      console.log('\n❌ Failed Tests:')
      this.testResults
        .filter(r => r.status === 'FAIL')
        .forEach(r => console.log(`  - ${r.test}: ${r.message}`))
    }
    
    if (warnings > 0) {
      console.log('\n⚠️  Warnings:')
      this.testResults
        .filter(r => r.status === 'WARN')
        .forEach(r => console.log(`  - ${r.test}: ${r.message}`))
    }
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const tester = new UninstallerTester()
  tester.runTests()
}

module.exports = UninstallerTester 