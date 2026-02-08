# Uninstaller Deployment Guide

This guide provides comprehensive information about deploying the Social Marketing Uninstaller to production.

## Table of Contents

1. [Deployment Overview](#deployment-overview)
2. [Build Process](#build-process)
3. [CI/CD Pipeline](#cicd-pipeline)
4. [Platform-Specific Deployment](#platform-specific-deployment)
5. [Code Signing](#code-signing)
6. [Distribution](#distribution)
7. [Monitoring and Logging](#monitoring-and-logging)
8. [Rollback Procedures](#rollback-procedures)
9. [Security Considerations](#security-considerations)
10. [Troubleshooting](#troubleshooting)

## Deployment Overview

### Deployment Strategy

The uninstaller follows a staged deployment approach:

1. **Development**: Local builds for testing
2. **Staging**: Automated builds for validation
3. **Production**: Signed and distributed builds
4. **Rollback**: Quick rollback procedures if issues arise

### Deployment Environments

| Environment | Purpose | Build Type | Signing | Distribution |
|-------------|---------|------------|---------|--------------|
| Development | Local testing | Debug | No | Local only |
| Staging | Integration testing | Release | No | Internal |
| Production | User distribution | Release | Yes | Public |

### Deployment Checklist

- [ ] All tests passing
- [ ] Code review completed
- [ ] Security scan passed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Version numbers updated
- [ ] Changelog updated
- [ ] Release notes prepared

## Build Process

### Local Build

```bash
# Development build
yarn build:uninstaller:dev

# Production build
yarn build:uninstaller:prod

# Platform-specific builds
yarn make:uninstaller:win
yarn make:uninstaller:mac
yarn make:uninstaller:linux
```

### Automated Build

The CI/CD pipeline automatically builds the uninstaller:

```yaml
# GitHub Actions workflow
- name: Build uninstaller
  run: yarn build-uninstaller

- name: Test uninstaller
  run: yarn test-uninstaller

- name: Package uninstaller
  run: yarn make-uninstaller-all
```

### Build Configuration

#### Vite Configuration
```javascript
// vite.uninstaller.config.mjs
export default {
  build: {
    outDir: 'dist/uninstaller',
    rollupOptions: {
      input: 'src/uninstaller/main.ts',
      external: ['electron', 'fs', 'path']
    },
    minify: 'terser',
    sourcemap: false
  }
}
```

#### Electron Forge Configuration
```javascript
// forge.config.js
module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-zip',
      config: {
        name: 'SocialMarketingUninstaller',
        icon: './src/assets/images/icon.ico'
      }
    }
  ]
}
```

### Build Artifacts

After a successful build, the following artifacts are generated:

```
out/
├── make/
│   ├── SocialMarketingUninstaller.exe (Windows)
│   ├── SocialMarketingUninstaller.app (macOS)
│   └── social-marketing-uninstaller (Linux)
└── uninstaller/
    ├── win32/
    ├── darwin/
    └── linux/
```

## CI/CD Pipeline

### GitHub Actions Workflow

The uninstaller is automatically built and tested in the CI/CD pipeline:

```yaml
name: Build Electron App

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build-windows:
    runs-on: windows-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20.18.3
      
      - name: Install dependencies
        run: yarn install
      
      - name: Build application
        run: yarn make-win:test
      
      - name: Build uninstaller
        run: yarn build-uninstaller
      
      - name: Test uninstaller
        run: yarn test-uninstaller
      
      - name: Upload uninstaller artifact
        uses: actions/upload-artifact@v4
        with:
          name: uninstaller-windows-v${{ steps.calculate_version.outputs.version }}
          path: dist/uninstaller
```

### Pipeline Stages

1. **Build Stage**
   - Install dependencies
   - Build uninstaller
   - Run unit tests
   - Generate artifacts

2. **Test Stage**
   - Run integration tests
   - Run E2E tests
   - Performance testing
   - Security scanning

3. **Package Stage**
   - Create platform-specific packages
   - Code signing (production only)
   - Generate checksums
   - Create release notes

4. **Deploy Stage**
   - Upload to distribution servers
   - Update download links
   - Notify stakeholders
   - Monitor deployment

### Automated Testing

```yaml
- name: Run uninstaller tests
  run: |
    yarn test:uninstaller:unit
    yarn test:uninstaller:integration
    yarn test:uninstaller:e2e

- name: Generate test report
  run: yarn test:uninstaller:report

- name: Upload test results
  uses: actions/upload-artifact@v4
  with:
    name: test-results
    path: test/uninstaller/reports/
```

## Platform-Specific Deployment

### Windows Deployment

#### Build Requirements
- Windows Server 2022 or later
- Node.js 20.18.3+
- WiX Toolset 3.11+
- Visual Studio Build Tools

#### Build Process
```bash
# Install WiX Toolset
Invoke-WebRequest -Uri https://github.com/wixtoolset/wix3/releases/download/wix3112rtm/wix311-binaries.zip -OutFile wix.zip
Expand-Archive -Path wix.zip -DestinationPath "$env:ProgramFiles\WiX Toolset"

# Build uninstaller
yarn make:uninstaller:win
```

#### Code Signing
```bash
# Sign executable
signtool sign /f certificate.pfx /p password SocialMarketingUninstaller.exe

# Verify signature
signtool verify /pa SocialMarketingUninstaller.exe
```

### macOS Deployment

#### Build Requirements
- macOS 12+ (Monterey)
- Xcode Command Line Tools
- Node.js 20.18.3+

#### Build Process
```bash
# Install dependencies
brew install python-setuptools

# Build uninstaller
yarn make:uninstaller:mac
```

#### Code Signing
```bash
# Sign application bundle
codesign --force --sign "Developer ID Application: Your Name" SocialMarketingUninstaller.app

# Verify signature
codesign --verify --deep --strict SocialMarketingUninstaller.app
```

#### Notarization
```bash
# Notarize application
xcrun notarytool submit SocialMarketingUninstaller.app --wait

# Staple notarization ticket
xcrun stapler staple SocialMarketingUninstaller.app
```

### Linux Deployment

#### Build Requirements
- Ubuntu 20.04+
- Build essentials
- Node.js 20.18.3+

#### Build Process
```bash
# Install dependencies
sudo apt-get update
sudo apt-get install build-essential

# Build uninstaller
yarn make:uninstaller:linux
```

#### Package Creation
```bash
# Create DEB package
yarn make:uninstaller:deb

# Create RPM package
yarn make:uninstaller:rpm
```

## Code Signing

### Windows Code Signing

#### Certificate Requirements
- Code Signing Certificate from trusted CA
- Timestamp server access
- Certificate stored securely

#### Signing Process
```powershell
# Sign executable
signtool sign /f certificate.pfx /p password /t http://timestamp.digicert.com SocialMarketingUninstaller.exe

# Verify signature
signtool verify /pa SocialMarketingUninstaller.exe
```

#### Automated Signing
```yaml
- name: Sign Windows executable
  run: |
    $certPath = "${{ secrets.CERT_PATH }}"
    $certPassword = "${{ secrets.CERT_PASSWORD }}"
    signtool sign /f $certPath /p $certPassword /t http://timestamp.digicert.com SocialMarketingUninstaller.exe
```

### macOS Code Signing

#### Certificate Requirements
- Apple Developer ID Certificate
- App-specific certificate
- Notarization access

#### Signing Process
```bash
# Sign application bundle
codesign --force --sign "Developer ID Application: Your Name" --deep SocialMarketingUninstaller.app

# Verify signature
codesign --verify --deep --strict SocialMarketingUninstaller.app
```

#### Automated Signing
```yaml
- name: Sign macOS application
  run: |
    echo "${{ secrets.MACOS_CERT }}" | base64 -d > certificate.p12
    security create-keychain -p "${{ secrets.KEYCHAIN_PASSWORD }}" build.keychain
    security import certificate.p12 -k build.keychain -P "${{ secrets.CERT_PASSWORD }}"
    codesign --force --sign "Developer ID Application: Your Name" --deep SocialMarketingUninstaller.app
```

### Linux Code Signing

#### GPG Signing
```bash
# Create GPG key
gpg --gen-key

# Sign package
gpg --sign --detach-sign social-marketing-uninstaller.deb

# Verify signature
gpg --verify social-marketing-uninstaller.deb.sig
```

## Distribution

### Distribution Channels

#### Direct Download
- Company website
- GitHub releases
- Internal distribution servers

#### Package Managers
- Windows: Chocolatey, Scoop
- macOS: Homebrew
- Linux: APT, YUM, Snap

#### Cloud Storage
- AWS S3
- Azure Blob Storage
- Google Cloud Storage

### Release Process

#### Pre-release Checklist
- [ ] All tests passing
- [ ] Security scan completed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Release notes prepared
- [ ] Version numbers updated

#### Release Steps
1. **Create Release Branch**
   ```bash
   git checkout -b release/v1.0.0
   ```

2. **Update Version**
   ```bash
   npm version patch
   ```

3. **Build Release**
   ```bash
   yarn build:uninstaller:release
   ```

4. **Create GitHub Release**
   ```bash
   gh release create v1.0.0 --title "Uninstaller v1.0.0" --notes "Release notes"
   ```

5. **Upload Artifacts**
   ```bash
   gh release upload v1.0.0 dist/uninstaller/*
   ```

### Distribution Configuration

#### Website Integration
```html
<!-- Download links -->
<div class="downloads">
  <a href="/downloads/SocialMarketingUninstaller.exe" class="download-btn windows">
    Download for Windows
  </a>
  <a href="/downloads/SocialMarketingUninstaller.dmg" class="download-btn macos">
    Download for macOS
  </a>
  <a href="/downloads/social-marketing-uninstaller.deb" class="download-btn linux">
    Download for Linux
  </a>
</div>
```

#### Package Manager Integration
```yaml
# Chocolatey package
# social-marketing-uninstaller.nuspec
<?xml version="1.0"?>
<package xmlns="http://schemas.microsoft.com/packaging/2015/06/nuspec.xsd">
  <metadata>
    <id>social-marketing-uninstaller</id>
    <version>1.0.0</version>
    <title>Social Marketing Uninstaller</title>
    <description>Professional uninstaller for Social Marketing application</description>
  </metadata>
  <files>
    <file src="SocialMarketingUninstaller.exe" target="tools\" />
  </files>
</package>
```

## Monitoring and Logging

### Application Monitoring

#### Health Checks
```typescript
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: process.env.APP_VERSION,
    timestamp: new Date().toISOString()
  })
})
```

#### Performance Monitoring
```typescript
// Performance metrics
const metrics = {
  startupTime: Date.now() - startTime,
  memoryUsage: process.memoryUsage(),
  cpuUsage: process.cpuUsage()
}
```

### Logging Strategy

#### Log Levels
- **ERROR**: Critical failures
- **WARN**: Non-critical issues
- **INFO**: General information
- **DEBUG**: Detailed debugging

#### Log Rotation
```javascript
// Log rotation configuration
log.transports.file.maxSize = 10 * 1024 * 1024 // 10MB
log.transports.file.maxFiles = 5
```

#### Centralized Logging
```javascript
// Send logs to centralized service
log.transports.remote = {
  level: 'info',
  url: 'https://logs.company.com/api/logs',
  headers: {
    'Authorization': `Bearer ${process.env.LOG_API_KEY}`
  }
}
```

### Error Tracking

#### Error Reporting
```typescript
// Error reporting service
import * as Sentry from '@sentry/electron'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.APP_VERSION
})
```

#### Crash Reporting
```typescript
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  log.error('Uncaught exception:', error)
  Sentry.captureException(error)
})
```

## Rollback Procedures

### Automated Rollback

#### Health Check Failures
```yaml
- name: Health check
  run: |
    response=$(curl -s -o /dev/null -w "%{http_code}" https://app.company.com/health)
    if [ $response -ne 200 ]; then
      echo "Health check failed, initiating rollback"
      gh workflow run rollback.yml
    fi
```

#### Performance Degradation
```yaml
- name: Performance check
  run: |
    if [ $AVERAGE_RESPONSE_TIME -gt 5000 ]; then
      echo "Performance degraded, initiating rollback"
      gh workflow run rollback.yml
    fi
```

### Manual Rollback

#### Quick Rollback Steps
1. **Stop Deployment**
   ```bash
   gh workflow run stop-deployment.yml
   ```

2. **Revert to Previous Version**
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Redeploy Previous Version**
   ```bash
   gh workflow run deploy.yml
   ```

#### Database Rollback
```sql
-- Rollback database changes
BEGIN TRANSACTION;
-- Rollback statements
ROLLBACK;
```

### Rollback Verification

#### Verification Checklist
- [ ] Previous version deployed successfully
- [ ] All services running normally
- [ ] Performance metrics restored
- [ ] Error rates back to normal
- [ ] User functionality verified

## Security Considerations

### Security Scanning

#### Static Analysis
```yaml
- name: Security scan
  run: |
    npm audit
    yarn audit
    snyk test
```

#### Dynamic Analysis
```yaml
- name: Dynamic security scan
  run: |
    # Run security scanner
    security-scanner --target dist/uninstaller/
```

### Vulnerability Management

#### Dependency Scanning
```yaml
- name: Check dependencies
  run: |
    npm audit --audit-level moderate
    yarn audit --level moderate
```

#### CVE Monitoring
```yaml
- name: CVE check
  run: |
    # Check for known vulnerabilities
    cve-checker --package package.json
```

### Access Control

#### Certificate Management
- Store certificates securely
- Rotate certificates regularly
- Monitor certificate expiration

#### Deployment Access
- Limit deployment access
- Use multi-factor authentication
- Audit deployment logs

## Troubleshooting

### Common Deployment Issues

#### Build Failures
```bash
# Check build environment
node --version
yarn --version
npm config list

# Clean and rebuild
yarn clean
yarn install
yarn build:uninstaller
```

#### Code Signing Issues
```bash
# Verify certificate
certutil -dump certificate.pfx

# Check signing tools
signtool verify /pa SocialMarketingUninstaller.exe
```

#### Distribution Issues
```bash
# Check file integrity
sha256sum SocialMarketingUninstaller.exe

# Verify download links
curl -I https://downloads.company.com/SocialMarketingUninstaller.exe
```

### Performance Issues

#### Slow Builds
- Use build caching
- Parallel builds
- Optimize dependencies

#### Large Artifacts
- Enable compression
- Remove unnecessary files
- Use tree shaking

### Monitoring Issues

#### Log Collection
```bash
# Check log files
tail -f /var/log/uninstaller.log

# Verify log rotation
logrotate -d /etc/logrotate.d/uninstaller
```

#### Metrics Collection
```bash
# Check metrics endpoint
curl https://app.company.com/metrics

# Verify monitoring agents
systemctl status monitoring-agent
```

### Recovery Procedures

#### Service Recovery
```bash
# Restart services
systemctl restart uninstaller-service

# Check service status
systemctl status uninstaller-service
```

#### Data Recovery
```bash
# Restore from backup
cp backup/uninstaller-data.json /var/lib/uninstaller/

# Verify data integrity
sha256sum /var/lib/uninstaller/uninstaller-data.json
```

---

For more information, see the [Development Guide](DEVELOPMENT.md) and [Testing Guide](TESTING.md). 