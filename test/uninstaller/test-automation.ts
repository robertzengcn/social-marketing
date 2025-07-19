import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

interface TestConfig {
  platform: 'win32' | 'darwin' | 'linux' | 'all'
  testType: 'unit' | 'integration' | 'e2e' | 'all'
  coverage: boolean
  verbose: boolean
  outputFile?: string
}

interface TestResult {
  platform: string
  testType: string
  passed: number
  failed: number
  skipped: number
  duration: number
  errors: string[]
}

interface TestReport {
  timestamp: string
  totalTests: number
  totalPassed: number
  totalFailed: number
  totalSkipped: number
  totalDuration: number
  results: TestResult[]
  summary: string
}

class UninstallerTestAutomation {
  private config: TestConfig
  private results: TestResult[] = []

  constructor(config: TestConfig) {
    this.config = config
  }

  async runTests(): Promise<TestReport> {
    console.log('🚀 Starting Uninstaller Test Automation...')
    console.log(`Platform: ${this.config.platform}`)
    console.log(`Test Type: ${this.config.testType}`)
    console.log(`Coverage: ${this.config.coverage}`)
    console.log('')

    const platforms = this.getPlatforms()
    const testTypes = this.getTestTypes()

    for (const platform of platforms) {
      for (const testType of testTypes) {
        await this.runTestSuite(platform, testType)
      }
    }

    return this.generateReport()
  }

  private getPlatforms(): string[] {
    if (this.config.platform === 'all') {
      return ['win32', 'darwin', 'linux']
    }
    return [this.config.platform]
  }

  private getTestTypes(): string[] {
    if (this.config.testType === 'all') {
      return ['unit', 'integration', 'e2e']
    }
    return [this.config.testType]
  }

  private async runTestSuite(platform: string, testType: string): Promise<void> {
    console.log(`📋 Running ${testType} tests for ${platform}...`)
    
    const startTime = Date.now()
    const testPath = `test/uninstaller/${testType}`
    
    try {
      // Set platform environment variable
      process.env.TEST_PLATFORM = platform
      
      // Build vitest command
      const vitestArgs = [
        'vitest',
        'run',
        testPath,
        '--reporter=json',
        '--silent'
      ]

      if (this.config.coverage) {
        vitestArgs.push('--coverage')
      }

      if (this.config.verbose) {
        vitestArgs.push('--reporter=verbose')
      }

      const command = vitestArgs.join(' ')
      const output = execSync(command, { 
        encoding: 'utf8',
        stdio: this.config.verbose ? 'inherit' : 'pipe'
      })

      const endTime = Date.now()
      const duration = endTime - startTime

      // Parse test results
      const result = this.parseTestOutput(output, platform, testType, duration)
      this.results.push(result)

      console.log(`✅ ${testType} tests for ${platform} completed in ${duration}ms`)
      console.log(`   Passed: ${result.passed}, Failed: ${result.failed}, Skipped: ${result.skipped}`)

    } catch (error: any) {
      const endTime = Date.now()
      const duration = endTime - startTime

      const result: TestResult = {
        platform,
        testType,
        passed: 0,
        failed: 1,
        skipped: 0,
        duration,
        errors: [error.message]
      }

      this.results.push(result)

      console.log(`❌ ${testType} tests for ${platform} failed in ${duration}ms`)
      console.log(`   Error: ${error.message}`)
    }
  }

  private parseTestOutput(output: string, platform: string, testType: string, duration: number): TestResult {
    try {
      // Try to parse JSON output
      const jsonOutput = JSON.parse(output)
      
      return {
        platform,
        testType,
        passed: jsonOutput.numPassedTests || 0,
        failed: jsonOutput.numFailedTests || 0,
        skipped: jsonOutput.numPendingTests || 0,
        duration,
        errors: jsonOutput.testResults?.flatMap((result: any) => 
          result.status === 'failed' ? [result.message] : []
        ) || []
      }
    } catch {
      // Fallback parsing for non-JSON output
      const lines = output.split('\n')
      let passed = 0
      let failed = 0
      let skipped = 0
      const errors: string[] = []

      for (const line of lines) {
        if (line.includes('✓') || line.includes('PASS')) passed++
        if (line.includes('✗') || line.includes('FAIL')) failed++
        if (line.includes('SKIP')) skipped++
        if (line.includes('Error:') || line.includes('FAIL')) {
          errors.push(line.trim())
        }
      }

      return {
        platform,
        testType,
        passed,
        failed,
        skipped,
        duration,
        errors
      }
    }
  }

  private generateReport(): TestReport {
    const totalTests = this.results.reduce((sum, r) => sum + r.passed + r.failed + r.skipped, 0)
    const totalPassed = this.results.reduce((sum, r) => sum + r.passed, 0)
    const totalFailed = this.results.reduce((sum, r) => sum + r.failed, 0)
    const totalSkipped = this.results.reduce((sum, r) => sum + r.skipped, 0)
    const totalDuration = this.results.reduce((sum, r) => sum + r.duration, 0)

    const successRate = totalTests > 0 ? (totalPassed / totalTests * 100).toFixed(1) : '0'
    
    const summary = `
Uninstaller Test Report
======================

Total Tests: ${totalTests}
Passed: ${totalPassed} (${successRate}%)
Failed: ${totalFailed}
Skipped: ${totalSkipped}
Total Duration: ${totalDuration}ms

Platform Coverage: ${this.config.platform}
Test Types: ${this.config.testType}
Coverage Enabled: ${this.config.coverage}

${totalFailed === 0 ? '🎉 All tests passed!' : '⚠️  Some tests failed. Please review the errors above.'}
    `.trim()

    const report: TestReport = {
      timestamp: new Date().toISOString(),
      totalTests,
      totalPassed,
      totalFailed,
      totalSkipped,
      totalDuration,
      results: this.results,
      summary
    }

    // Save report to file if specified
    if (this.config.outputFile) {
      this.saveReport(report)
    }

    return report
  }

  private saveReport(report: TestReport): void {
    try {
      const reportDir = path.dirname(this.config.outputFile!)
      if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true })
      }

      fs.writeFileSync(this.config.outputFile!, JSON.stringify(report, null, 2))
      console.log(`📄 Test report saved to: ${this.config.outputFile}`)
    } catch (error) {
      console.error('Failed to save test report:', error)
    }
  }

  // Static methods for common test scenarios
  static async runQuickTests(): Promise<TestReport> {
    const automation = new UninstallerTestAutomation({
      platform: 'all',
      testType: 'unit',
      coverage: false,
      verbose: false,
      outputFile: 'test/uninstaller/reports/quick-test-report.json'
    })
    return automation.runTests()
  }

  static async runFullTests(): Promise<TestReport> {
    const automation = new UninstallerTestAutomation({
      platform: 'all',
      testType: 'all',
      coverage: true,
      verbose: true,
      outputFile: 'test/uninstaller/reports/full-test-report.json'
    })
    return automation.runTests()
  }

  static async runPlatformTests(platform: 'win32' | 'darwin' | 'linux'): Promise<TestReport> {
    const automation = new UninstallerTestAutomation({
      platform,
      testType: 'all',
      coverage: true,
      verbose: false,
      outputFile: `test/uninstaller/reports/${platform}-test-report.json`
    })
    return automation.runTests()
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case 'quick':
      UninstallerTestAutomation.runQuickTests()
        .then(report => {
          console.log(report.summary)
          process.exit(report.totalFailed > 0 ? 1 : 0)
        })
        .catch(error => {
          console.error('Test automation failed:', error)
          process.exit(1)
        })
      break

    case 'full':
      UninstallerTestAutomation.runFullTests()
        .then(report => {
          console.log(report.summary)
          process.exit(report.totalFailed > 0 ? 1 : 0)
        })
        .catch(error => {
          console.error('Test automation failed:', error)
          process.exit(1)
        })
      break

    case 'platform':
      const platform = args[1] as 'win32' | 'darwin' | 'linux'
      if (!platform) {
        console.error('Please specify platform: win32, darwin, or linux')
        process.exit(1)
      }
      
      UninstallerTestAutomation.runPlatformTests(platform)
        .then(report => {
          console.log(report.summary)
          process.exit(report.totalFailed > 0 ? 1 : 0)
        })
        .catch(error => {
          console.error('Test automation failed:', error)
          process.exit(1)
        })
      break

    default:
      console.log(`
Uninstaller Test Automation

Usage:
  node test-automation.js quick     - Run quick unit tests on all platforms
  node test-automation.js full      - Run all tests with coverage
  node test-automation.js platform  - Run all tests for specific platform

Examples:
  node test-automation.js quick
  node test-automation.js full
  node test-automation.js platform win32
      `)
      process.exit(0)
  }
}

export { UninstallerTestAutomation }
export type { TestConfig, TestResult, TestReport } 