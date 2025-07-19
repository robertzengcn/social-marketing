# Uninstaller Development Guide

This guide provides comprehensive information for developers working on the Social Marketing Uninstaller.

## Table of Contents

1. [Development Setup](#development-setup)
2. [Architecture Overview](#architecture-overview)
3. [Development Workflow](#development-workflow)
4. [Code Organization](#code-organization)
5. [Testing Guidelines](#testing-guidelines)
6. [Build Process](#build-process)
7. [Debugging](#debugging)
8. [Contributing Guidelines](#contributing-guidelines)

## Development Setup

### Prerequisites

- Node.js 20.18.3 or higher
- Yarn package manager
- Git
- Platform-specific development tools:
  - **Windows**: Visual Studio Build Tools, WiX Toolset
  - **macOS**: Xcode Command Line Tools
  - **Linux**: Build essentials, development libraries

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd social-marketing
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up development environment**
   ```bash
   # Install uninstaller-specific dependencies
   yarn add --dev @electron-forge/maker-portable @electron-forge/maker-dmg @electron-forge/maker-deb
   
   # Set up development tools
   yarn setup:dev
   ```

4. **Verify setup**
   ```bash
   # Test uninstaller build
   yarn build-uninstaller
   
   # Run tests
   yarn test-uninstaller
   ```

### Environment Variables

Create a `.env` file in the project root:

```env
# Development settings
NODE_ENV=development
ELECTRON_IS_DEV=true

# Uninstaller-specific settings
UNINSTALLER_LOG_LEVEL=debug
UNINSTALLER_DEV_MODE=true

# Platform-specific settings (optional)
UNINSTALLER_PLATFORM=auto
```

## Architecture Overview

### Core Components

The uninstaller follows a modular architecture with clear separation of concerns:

```
src/uninstaller/
├── main.ts                 # Electron main process entry point
├── uninstaller.ts          # Core uninstaller logic and orchestration
├── renderer.ts             # Renderer process entry point
├── platforms/              # Platform-specific implementations
│   ├── windows.ts          # Windows-specific uninstaller
│   ├── macos.ts            # macOS-specific uninstaller
│   └── linux.ts            # Linux-specific uninstaller
├── ui/                     # User interface components
│   ├── UninstallerWindow.vue
│   └── components/         # Reusable UI components
├── utils/                  # Utility functions
└── types/                  # TypeScript type definitions
```

### Key Classes and Interfaces

#### UninstallerManager
The main orchestrator class that coordinates the uninstallation process:

```typescript
class UninstallerManager {
  // Core methods
  async detectInstallation(): Promise<InstallationInfo>
  async performUninstall(onProgress?: ProgressCallback): Promise<UninstallResult>
  
  // Platform-specific operations
  async stopRunningProcesses(): Promise<void>
  async removeApplicationFiles(): Promise<void>
  async removeUserData(): Promise<void>
  async finalCleanup(): Promise<void>
}
```

#### Platform Uninstallers
Platform-specific implementations that handle OS-specific operations:

```typescript
interface PlatformUninstaller {
  detectInstallation(): Promise<InstallationInfo>
  removeShortcuts(): Promise<void>
  removeRegistryEntries(): Promise<void>
  finalCleanup(): Promise<void>
}
```

### Data Flow

1. **Initialization**: Main process starts and creates renderer window
2. **Detection**: UninstallerManager detects installation locations
3. **Confirmation**: User confirms uninstallation with UI
4. **Execution**: Platform-specific uninstaller performs operations
5. **Progress**: Real-time updates sent to UI via IPC
6. **Completion**: Results displayed to user

## Development Workflow

### Daily Development Cycle

1. **Start development session**
   ```bash
   # Start development server
   yarn dev:uninstaller
   
   # In another terminal, watch for changes
   yarn watch:uninstaller
   ```

2. **Make changes**
   - Edit source files in `src/uninstaller/`
   - Changes automatically trigger rebuild
   - Hot reload updates the uninstaller window

3. **Test changes**
   ```bash
   # Run unit tests
   yarn test:uninstaller:unit
   
   # Run integration tests
   yarn test:uninstaller:integration
   
   # Run all tests
   yarn test:uninstaller
   ```

4. **Build and package**
   ```bash
   # Build for development
   yarn build:uninstaller:dev
   
   # Build for production
   yarn build:uninstaller:prod
   
   # Package for distribution
   yarn make:uninstaller:all
   ```

### Feature Development

1. **Create feature branch**
   ```bash
   git checkout -b feature/uninstaller-<feature-name>
   ```

2. **Implement feature**
   - Follow coding standards and conventions
   - Add appropriate tests
   - Update documentation

3. **Test thoroughly**
   ```bash
   # Run all tests
   yarn test:uninstaller
   
   # Test on target platforms
   yarn test:uninstaller:platform win32
   yarn test:uninstaller:platform darwin
   yarn test:uninstaller:platform linux
   ```

4. **Create pull request**
   - Include comprehensive description
   - Link to related issues
   - Ensure CI/CD passes

### Code Review Process

1. **Self-review checklist**
   - [ ] Code follows project conventions
   - [ ] Tests are comprehensive and passing
   - [ ] Documentation is updated
   - [ ] No console.log statements in production code
   - [ ] Error handling is appropriate

2. **Review requirements**
   - At least one approval required
   - All CI/CD checks must pass
   - No merge conflicts

## Code Organization

### File Naming Conventions

- **TypeScript files**: `camelCase.ts`
- **Vue components**: `PascalCase.vue`
- **Test files**: `camelCase.test.ts`
- **Configuration files**: `kebab-case.config.js`

### Import Organization

```typescript
// 1. Node.js built-ins
import * as fs from 'fs'
import * as path from 'path'

// 2. Third-party libraries
import { app, BrowserWindow } from 'electron'
import log from 'electron-log'

// 3. Local imports
import { UninstallerManager } from './uninstaller'
import { WindowsUninstaller } from './platforms/windows'
```

### Code Style Guidelines

#### TypeScript
- Use strict mode
- Prefer interfaces over types for object shapes
- Use explicit return types for public methods
- Avoid `any` type - use `unknown` or proper typing

#### Vue Components
- Use Composition API with `<script setup>`
- Define props with TypeScript interfaces
- Use scoped styles
- Follow single responsibility principle

#### Error Handling
```typescript
// Good: Specific error handling
try {
  await removeFile(filePath)
} catch (error) {
  if (error.code === 'ENOENT') {
    log.warn(`File not found: ${filePath}`)
  } else {
    throw new UninstallerError(`Failed to remove file: ${filePath}`, error)
  }
}

// Bad: Generic error handling
try {
  await removeFile(filePath)
} catch (error) {
  console.log('Error:', error)
}
```

## Testing Guidelines

### Test Structure

```
test/uninstaller/
├── unit/                   # Unit tests for individual components
├── integration/            # Integration tests for workflows
├── e2e/                    # End-to-end tests
└── fixtures/               # Test data and mocks
```

### Writing Tests

#### Unit Tests
```typescript
describe('UninstallerManager', () => {
  let uninstallerManager: UninstallerManager

  beforeEach(() => {
    uninstallerManager = new UninstallerManager()
  })

  it('should detect installation in Program Files', async () => {
    // Arrange
    mockFs.existsSync.mockReturnValue(true)
    
    // Act
    const result = await uninstallerManager.detectInstallation()
    
    // Assert
    expect(result.found).toBe(true)
    expect(result.paths).toContain(expect.stringContaining('Program Files'))
  })
})
```

#### Integration Tests
```typescript
describe('Complete Uninstallation Flow', () => {
  it('should perform complete uninstallation on Windows', async () => {
    // Setup complete mock environment
    setupMockWindowsEnvironment()
    
    // Execute full workflow
    const result = await uninstallerManager.performUninstall()
    
    // Verify all components were processed
    expect(result.success).toBe(true)
    expect(result.removedItems.length).toBeGreaterThan(0)
  })
})
```

### Test Best Practices

1. **Use descriptive test names**
   ```typescript
   // Good
   it('should remove registry entries when application is installed in Program Files')
   
   // Bad
   it('should work')
   ```

2. **Follow AAA pattern** (Arrange, Act, Assert)
3. **Mock external dependencies**
4. **Test error conditions**
5. **Use test fixtures for complex data**

### Running Tests

```bash
# Run all tests
yarn test:uninstaller

# Run specific test types
yarn test:uninstaller:unit
yarn test:uninstaller:integration
yarn test:uninstaller:e2e

# Run with coverage
yarn test:uninstaller:coverage

# Run tests for specific platform
yarn test:uninstaller:platform win32
```

## Build Process

### Development Build

```bash
# Quick development build
yarn build:uninstaller:dev

# Development build with source maps
yarn build:uninstaller:dev --sourcemap
```

### Production Build

```bash
# Production build
yarn build:uninstaller:prod

# Production build with optimization
yarn build:uninstaller:prod --minify
```

### Platform-Specific Builds

```bash
# Windows
yarn make:uninstaller:win

# macOS
yarn make:uninstaller:mac

# Linux
yarn make:uninstaller:linux

# All platforms
yarn make:uninstaller:all
```

### Build Configuration

The build process is configured in several files:

- `vite.uninstaller.config.mjs`: Vite configuration for bundling
- `forge.config.js`: Electron Forge configuration for packaging
- `package.json`: Build scripts and dependencies

## Debugging

### Development Debugging

1. **Enable debug logging**
   ```typescript
   // In main process
   log.transports.file.level = 'debug'
   log.transports.console.level = 'debug'
   ```

2. **Use Chrome DevTools**
   ```typescript
   // In main.ts
   if (process.env.NODE_ENV === 'development') {
     mainWindow.webContents.openDevTools()
   }
   ```

3. **Add breakpoints**
   - Use VS Code debugger
   - Set breakpoints in TypeScript files
   - Use `debugger` statement

### Production Debugging

1. **Enable verbose logging**
   ```bash
   ./SocialMarketingUninstaller --verbose
   ```

2. **Check log files**
   - Windows: `%TEMP%\SocialMarketingUninstaller.log`
   - macOS: `~/Library/Logs/SocialMarketingUninstaller.log`
   - Linux: `~/.local/share/SocialMarketing/uninstaller.log`

3. **Use remote debugging**
   ```typescript
   // Enable remote debugging
   app.commandLine.appendSwitch('remote-debugging-port', '9222')
   ```

### Common Debugging Scenarios

#### Uninstaller Not Starting
1. Check Electron version compatibility
2. Verify native module builds
3. Check for missing dependencies

#### File Removal Failures
1. Check file permissions
2. Verify file paths are correct
3. Check for file locks

#### UI Issues
1. Check Vue component errors
2. Verify IPC communication
3. Check CSS/styling issues

## Contributing Guidelines

### Code Standards

1. **Follow existing code style**
   - Use Prettier for formatting
   - Follow ESLint rules
   - Use TypeScript strict mode

2. **Write self-documenting code**
   - Use descriptive variable names
   - Add JSDoc comments for public APIs
   - Keep functions small and focused

3. **Handle errors gracefully**
   - Use appropriate error types
   - Provide meaningful error messages
   - Implement proper error recovery

### Documentation

1. **Update relevant documentation**
   - README.md for user-facing changes
   - This file for developer-facing changes
   - API documentation for new interfaces

2. **Include examples**
   - Code examples for new features
   - Usage examples for new APIs
   - Configuration examples

### Testing Requirements

1. **Add tests for new features**
   - Unit tests for individual functions
   - Integration tests for workflows
   - E2E tests for user scenarios

2. **Maintain test coverage**
   - Aim for 90%+ coverage
   - Test error conditions
   - Test edge cases

### Pull Request Process

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Follow coding standards
   - Add tests
   - Update documentation

3. **Test thoroughly**
   ```bash
   yarn test:uninstaller
   yarn build:uninstaller
   yarn make:uninstaller:all
   ```

4. **Submit pull request**
   - Include comprehensive description
   - Link to related issues
   - Ensure CI/CD passes

### Review Checklist

- [ ] Code follows project conventions
- [ ] Tests are comprehensive and passing
- [ ] Documentation is updated
- [ ] No breaking changes (or properly documented)
- [ ] Performance impact is considered
- [ ] Security implications are reviewed

---

For more information, see the [Testing Guide](TESTING.md) and [Deployment Guide](DEPLOYMENT.md). 