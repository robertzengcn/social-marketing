# Uninstaller Testing Guide

This guide provides comprehensive information about testing the Social Marketing Uninstaller.

## Table of Contents

1. [Testing Overview](#testing-overview)
2. [Test Types](#test-types)
3. [Testing Environment](#testing-environment)
4. [Running Tests](#running-tests)
5. [Writing Tests](#writing-tests)
6. [Test Automation](#test-automation)
7. [Platform-Specific Testing](#platform-specific-testing)
8. [Performance Testing](#performance-testing)
9. [Security Testing](#security-testing)
10. [Troubleshooting](#troubleshooting)

## Testing Overview

### Testing Philosophy

The uninstaller testing follows these principles:

- **Comprehensive Coverage**: Test all functionality across all platforms
- **Real-world Scenarios**: Test against actual installation scenarios
- **Error Resilience**: Ensure graceful handling of failures
- **Performance**: Verify acceptable performance under various conditions
- **Security**: Validate safe operation and proper permissions

### Testing Strategy

1. **Unit Tests**: Test individual components in isolation
2. **Integration Tests**: Test component interactions
3. **End-to-End Tests**: Test complete user workflows
4. **Platform Tests**: Test platform-specific functionality
5. **Performance Tests**: Test under load and stress conditions

## Test Types

### Unit Tests

Unit tests focus on testing individual functions and classes in isolation.

#### Test Structure
```typescript
describe('UninstallerManager', () => {
  let uninstallerManager: UninstallerManager

  beforeEach(() => {
    uninstallerManager = new UninstallerManager()
  })

  afterEach(() => {
    // Cleanup
  })

  describe('detectInstallation', () => {
    it('should detect installation in Program Files', async () => {
      // Test implementation
    })

    it('should handle missing installation gracefully', async () => {
      // Test implementation
    })
  })
})
```

#### Unit Test Categories

1. **Core Logic Tests**
   - Installation detection
   - File removal logic
   - Registry operations
   - Progress tracking

2. **Utility Function Tests**
   - Path manipulation
   - File system operations
   - Platform detection
   - Error handling

3. **UI Component Tests**
   - Vue component rendering
   - User interactions
   - State management
   - Event handling

### Integration Tests

Integration tests verify that components work together correctly.

#### Test Structure
```typescript
describe('Uninstaller Integration', () => {
  it('should perform complete uninstallation workflow', async () => {
    // Setup complete environment
    setupMockEnvironment()
    
    // Execute full workflow
    const result = await uninstallerManager.performUninstall()
    
    // Verify complete success
    expect(result.success).toBe(true)
    expect(result.removedItems.length).toBeGreaterThan(0)
  })
})
```

#### Integration Test Scenarios

1. **Complete Uninstallation Flow**
   - Detection → Confirmation → Removal → Cleanup
   - Progress tracking throughout the process
   - Error handling and recovery

2. **Platform-Specific Integration**
   - Windows registry operations
   - macOS application bundle removal
   - Linux system integration

3. **UI Integration**
   - Main process ↔ Renderer process communication
   - Progress updates and user feedback
   - Error display and recovery

### End-to-End Tests

E2E tests simulate real user interactions with the uninstaller.

#### Test Structure
```typescript
describe('Uninstaller E2E', () => {
  it('should complete full user workflow', async () => {
    // Launch uninstaller
    const app = await launchUninstaller()
    
    // Simulate user interactions
    await app.click('#confirm-uninstall')
    await app.waitForProgress(100)
    
    // Verify completion
    await app.expectSuccessMessage()
    await app.close()
  })
})
```

#### E2E Test Scenarios

1. **Happy Path**
   - Successful uninstallation from start to finish
   - All components removed correctly
   - User receives success confirmation

2. **Error Scenarios**
   - Permission denied errors
   - File in use errors
   - Network connectivity issues
   - Insufficient disk space

3. **User Interaction Scenarios**
   - User cancellation
   - Retry after failure
   - Multiple uninstaller instances

## Testing Environment

### Local Development Setup

1. **Install Testing Dependencies**
   ```bash
   yarn add --dev vitest @vitest/ui jsdom @testing-library/vue
   ```

2. **Configure Test Environment**
   ```bash
   # Create test configuration
   cp vitest.config.ts.example vitest.config.ts
   
   # Set up test environment variables
   cp .env.test.example .env.test
   ```

3. **Prepare Test Data**
   ```bash
   # Generate test fixtures
   yarn generate:test-fixtures
   
   # Set up mock installations
   yarn setup:mock-installations
   ```

### CI/CD Environment

The CI/CD pipeline automatically runs tests on multiple platforms:

- **Windows**: Windows Server 2022
- **macOS**: macOS 12 (Monterey)
- **Linux**: Ubuntu 20.04

### Test Data Management

#### Mock Installations
```typescript
// Create mock installation for testing
const mockInstallation = {
  windows: {
    'C:\\Program Files\\SocialMarketing': ['app.exe', 'resources'],
    'C:\\Users\\TestUser\\AppData\\Local\\SocialMarketing': ['config.json']
  },
  macos: {
    '/Applications/SocialMarketing.app': ['Contents', 'Info.plist'],
    '~/Library/Application Support/SocialMarketing': ['config.json']
  },
  linux: {
    '/opt/socialmarketing': ['bin', 'lib'],
    '~/.config/SocialMarketing': ['config.json']
  }
}
```

#### Test Fixtures
```typescript
// Test data for various scenarios
export const testFixtures = {
  smallInstallation: { files: 10, size: '1MB' },
  largeInstallation: { files: 1000, size: '100MB' },
  corruptedInstallation: { files: 50, corrupted: true },
  partialInstallation: { files: 25, incomplete: true }
}
```

## Running Tests

### Basic Test Commands

```bash
# Run all tests
yarn test:uninstaller

# Run specific test types
yarn test:uninstaller:unit
yarn test:uninstaller:integration
yarn test:uninstaller:e2e

# Run tests with coverage
yarn test:uninstaller:coverage

# Run tests in watch mode
yarn test:uninstaller:watch
```

### Platform-Specific Testing

```bash
# Test on specific platform
yarn test:uninstaller:platform win32
yarn test:uninstaller:platform darwin
yarn test:uninstaller:platform linux

# Test all platforms
yarn test:uninstaller:platform all
```

### Advanced Test Commands

```bash
# Run tests with verbose output
yarn test:uninstaller --verbose

# Run tests with specific reporter
yarn test:uninstaller --reporter=json

# Run tests matching pattern
yarn test:uninstaller --grep="detection"

# Run tests in parallel
yarn test:uninstaller --threads=4
```

### Test Automation

```bash
# Run automated test suite
yarn test:uninstaller:automation

# Run quick tests (unit only)
yarn test:uninstaller:quick

# Run full test suite (all types)
yarn test:uninstaller:full
```

## Writing Tests

### Test Structure Guidelines

#### File Organization
```
test/uninstaller/
├── unit/
│   ├── uninstaller.test.ts
│   ├── installation-detection.test.ts
│   └── platform-specific.test.ts
├── integration/
│   ├── uninstaller-integration.test.ts
│   └── ui-integration.test.ts
├── e2e/
│   ├── uninstaller-e2e.test.ts
│   └── user-workflows.test.ts
└── fixtures/
    ├── mock-installations.ts
    └── test-data.ts
```

#### Test Naming Conventions

```typescript
// Use descriptive test names
describe('UninstallerManager.detectInstallation', () => {
  it('should detect installation in Program Files on Windows', async () => {
    // Test implementation
  })

  it('should return empty result when no installation found', async () => {
    // Test implementation
  })

  it('should handle file system errors gracefully', async () => {
    // Test implementation
  })
})
```

### Mocking Strategies

#### File System Mocking
```typescript
import { vi } from 'vitest'
import * as fs from 'fs'

// Mock file system operations
vi.mock('fs', () => ({
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
  unlinkSync: vi.fn(),
  rmdirSync: vi.fn()
}))

// Setup mock implementations
const mockFs = vi.mocked(fs)
mockFs.existsSync.mockImplementation((path: string) => {
  return path.includes('Program Files')
})
```

#### Platform Mocking
```typescript
// Mock platform detection
vi.stubGlobal('process', { platform: 'win32' })

// Mock child process
vi.mock('child_process', () => ({
  execSync: vi.fn()
}))
```

#### UI Component Mocking
```typescript
import { mount } from '@vue/test-utils'
import UninstallerWindow from '@/uninstaller/ui/UninstallerWindow.vue'

// Mock IPC communication
vi.mock('electron', () => ({
  ipcRenderer: {
    on: vi.fn(),
    send: vi.fn()
  }
}))

// Test component
const wrapper = mount(UninstallerWindow)
```

### Test Data Management

#### Test Fixtures
```typescript
// Create reusable test data
export const createMockInstallation = (platform: string, size: 'small' | 'large') => {
  const fixtures = {
    small: { files: 10, directories: 2 },
    large: { files: 1000, directories: 50 }
  }
  
  return {
    platform,
    ...fixtures[size],
    paths: generateMockPaths(platform, fixtures[size])
  }
}
```

#### Test Utilities
```typescript
// Helper functions for testing
export const setupMockEnvironment = (config: TestConfig) => {
  // Setup file system mocks
  setupFileSystemMocks(config.files)
  
  // Setup platform mocks
  setupPlatformMocks(config.platform)
  
  // Setup process mocks
  setupProcessMocks(config.processes)
}

export const cleanupMockEnvironment = () => {
  // Clean up all mocks
  vi.clearAllMocks()
  vi.restoreAllMocks()
}
```

## Test Automation

### Automated Test Suite

The test automation system provides comprehensive testing capabilities:

```typescript
// Test automation configuration
const testConfig = {
  platforms: ['win32', 'darwin', 'linux'],
  testTypes: ['unit', 'integration', 'e2e'],
  coverage: true,
  parallel: true,
  timeout: 30000
}

// Run automated tests
await UninstallerTestAutomation.runTests(testConfig)
```

### CI/CD Integration

Tests are automatically run in the CI/CD pipeline:

```yaml
# GitHub Actions workflow
- name: Test uninstaller
  run: yarn test-uninstaller

- name: Upload test results
  uses: actions/upload-artifact@v4
  with:
    name: test-results
    path: test/uninstaller/reports/
```

### Test Reporting

```typescript
// Generate test reports
const report = {
  timestamp: new Date().toISOString(),
  totalTests: 150,
  passed: 145,
  failed: 5,
  coverage: 92.5,
  platforms: ['win32', 'darwin', 'linux'],
  duration: 45000
}
```

## Platform-Specific Testing

### Windows Testing

#### Registry Operations
```typescript
describe('Windows Registry Operations', () => {
  it('should remove registry entries correctly', async () => {
    // Mock registry operations
    mockChildProcess.execSync.mockReturnValue(Buffer.from(''))
    
    // Test registry removal
    await windowsUninstaller.removeRegistryEntries()
    
    // Verify registry commands were executed
    expect(mockChildProcess.execSync).toHaveBeenCalledWith(
      expect.stringContaining('reg delete')
    )
  })
})
```

#### File System Operations
```typescript
describe('Windows File System', () => {
  it('should handle Windows path separators', async () => {
    const windowsPath = 'C:\\Program Files\\SocialMarketing\\app.exe'
    
    // Test path handling
    const result = await uninstallerManager.removeFile(windowsPath)
    
    expect(result.success).toBe(true)
  })
})
```

### macOS Testing

#### Application Bundle Removal
```typescript
describe('macOS Application Bundle', () => {
  it('should remove .app bundle completely', async () => {
    // Mock application bundle
    mockFs.existsSync.mockReturnValue(true)
    mockFs.readdirSync.mockReturnValue(['Contents', 'Info.plist'])
    
    // Test bundle removal
    await macosUninstaller.removeApplicationBundle('/Applications/MyApp.app')
    
    // Verify removal
    expect(mockFs.rmdirSync).toHaveBeenCalled()
  })
})
```

#### Launch Agents
```typescript
describe('macOS Launch Agents', () => {
  it('should remove launch agents', async () => {
    // Mock launch agent
    mockFs.existsSync.mockReturnValue(true)
    
    // Test launch agent removal
    await macosUninstaller.removeLaunchAgents()
    
    // Verify launchctl commands
    expect(mockChildProcess.execSync).toHaveBeenCalledWith(
      expect.stringContaining('launchctl')
    )
  })
})
```

### Linux Testing

#### Desktop Files
```typescript
describe('Linux Desktop Files', () => {
  it('should remove desktop files from all locations', async () => {
    // Mock desktop file locations
    const desktopLocations = [
      '/usr/local/share/applications',
      '~/.local/share/applications'
    ]
    
    // Test desktop file removal
    await linuxUninstaller.removeDesktopFiles()
    
    // Verify all locations were checked
    desktopLocations.forEach(location => {
      expect(mockFs.existsSync).toHaveBeenCalledWith(
        expect.stringContaining(location)
      )
    })
  })
})
```

#### Systemd Services
```typescript
describe('Linux Systemd Services', () => {
  it('should disable and remove systemd services', async () => {
    // Mock systemd service
    mockFs.existsSync.mockReturnValue(true)
    
    // Test service removal
    await linuxUninstaller.removeSystemdServices()
    
    // Verify systemctl commands
    expect(mockChildProcess.execSync).toHaveBeenCalledWith(
      expect.stringContaining('systemctl')
    )
  })
})
```

## Performance Testing

### Load Testing

```typescript
describe('Performance Tests', () => {
  it('should handle large installations efficiently', async () => {
    // Create large mock installation
    const largeInstallation = createMockInstallation('win32', 'large')
    setupMockEnvironment({ files: largeInstallation.files })
    
    const startTime = Date.now()
    const result = await uninstallerManager.performUninstall()
    const endTime = Date.now()
    
    // Verify performance
    expect(endTime - startTime).toBeLessThan(30000) // 30 seconds
    expect(result.success).toBe(true)
  })
})
```

### Memory Usage Testing

```typescript
describe('Memory Usage', () => {
  it('should not exceed memory limits', async () => {
    const initialMemory = process.memoryUsage().heapUsed
    
    // Perform uninstallation
    await uninstallerManager.performUninstall()
    
    const finalMemory = process.memoryUsage().heapUsed
    const memoryIncrease = finalMemory - initialMemory
    
    // Verify memory usage
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024) // 50MB
  })
})
```

## Security Testing

### Permission Testing

```typescript
describe('Security Tests', () => {
  it('should handle permission errors gracefully', async () => {
    // Mock permission denied error
    mockFs.unlinkSync.mockImplementation(() => {
      throw new Error('EACCES: permission denied')
    })
    
    // Test error handling
    const result = await uninstallerManager.performUninstall()
    
    // Verify graceful handling
    expect(result.errors.length).toBeGreaterThan(0)
    expect(result.errors[0]).toContain('permission denied')
  })
})
```

### Path Validation

```typescript
describe('Path Security', () => {
  it('should validate paths before operations', async () => {
    const maliciousPath = '../../../etc/passwd'
    
    // Test path validation
    const result = await uninstallerManager.removeFile(maliciousPath)
    
    // Verify path was rejected
    expect(result.success).toBe(false)
    expect(result.errors[0]).toContain('invalid path')
  })
})
```

## Troubleshooting

### Common Test Issues

#### Mock Not Working
```typescript
// Problem: Mock not being applied
// Solution: Ensure mock is set up before test
beforeEach(() => {
  vi.clearAllMocks()
  setupMocks()
})
```

#### Async Test Failures
```typescript
// Problem: Async operations not completing
// Solution: Use proper async/await
it('should complete async operation', async () => {
  const result = await uninstallerManager.performUninstall()
  expect(result.success).toBe(true)
})
```

#### Platform-Specific Issues
```typescript
// Problem: Tests failing on specific platforms
// Solution: Use platform-specific mocks
beforeEach(() => {
  vi.stubGlobal('process', { platform: 'win32' })
  setupPlatformMocks('win32')
})
```

### Debugging Tests

#### Enable Debug Logging
```typescript
// Enable debug logging in tests
beforeEach(() => {
  log.transports.console.level = 'debug'
})
```

#### Use Test UI
```bash
# Run tests with UI
yarn test:uninstaller:ui
```

#### Add Debug Statements
```typescript
// Add temporary debug statements
it('should work correctly', async () => {
  console.log('Debug: Starting test')
  const result = await uninstallerManager.detectInstallation()
  console.log('Debug: Result:', result)
  expect(result.found).toBe(true)
})
```

### Performance Issues

#### Slow Tests
```typescript
// Use test timeouts
it('should complete within time limit', async () => {
  const result = await uninstallerManager.performUninstall()
  expect(result.success).toBe(true)
}, 30000) // 30 second timeout
```

#### Memory Leaks
```typescript
// Clean up after tests
afterEach(() => {
  vi.clearAllMocks()
  vi.restoreAllMocks()
  // Force garbage collection if needed
  if (global.gc) global.gc()
})
```

---

For more information, see the [Development Guide](DEVELOPMENT.md) and [Deployment Guide](DEPLOYMENT.md). 