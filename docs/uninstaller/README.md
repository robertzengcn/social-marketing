# Social Marketing Uninstaller

A professional, standalone uninstaller for the Social Marketing Electron application. This uninstaller provides a complete solution for removing the application and all associated files from your system.

## Features

- **Cross-Platform Support**: Works on Windows, macOS, and Linux
- **Complete Removal**: Removes application files, user data, registry entries, and shortcuts
- **Professional UI**: Modern, user-friendly interface with progress tracking
- **Error Handling**: Robust error handling with retry mechanisms
- **Logging**: Comprehensive logging for troubleshooting
- **Safe Operation**: Validates operations and provides user confirmation

## Installation

The uninstaller is automatically included with the main application installation. It can be found in the following locations:

### Windows
- `C:\Program Files\SocialMarketing\uninstaller\SocialMarketingUninstaller.exe`
- Desktop shortcut (if created during installation)

### macOS
- `/Applications/SocialMarketing.app/Contents/Resources/uninstaller/SocialMarketingUninstaller`
- Applications folder shortcut

### Linux
- `/opt/socialmarketing/uninstaller/SocialMarketingUninstaller`
- Desktop application menu

## Usage

### Basic Usage

1. **Launch the Uninstaller**
   - Double-click the uninstaller executable
   - Or run from command line: `./SocialMarketingUninstaller`

2. **Confirm Uninstallation**
   - Review the items that will be removed
   - Click "Uninstall" to proceed

3. **Monitor Progress**
   - Watch the progress bar and status messages
   - The uninstaller will show detailed information about each step

4. **Complete**
   - Review the summary of removed items
   - Click "Close" to finish

### Command Line Usage

```bash
# Basic uninstallation
./SocialMarketingUninstaller

# Silent uninstallation (no UI)
./SocialMarketingUninstaller --silent

# Verbose logging
./SocialMarketingUninstaller --verbose

# Custom log file
./SocialMarketingUninstaller --log-file=/path/to/log.txt

# Force uninstallation (skip confirmation)
./SocialMarketingUninstaller --force
```

### Command Line Options

| Option | Description |
|--------|-------------|
| `--silent` | Run in silent mode without UI |
| `--verbose` | Enable verbose logging |
| `--log-file=<path>` | Specify custom log file location |
| `--force` | Skip confirmation dialogs |
| `--dry-run` | Show what would be removed without actually removing |
| `--help` | Show help information |

## What Gets Removed

### Application Files
- Main application executable and resources
- Node.js modules and dependencies
- Configuration files
- Application data

### User Data
- User preferences and settings
- Cache files
- Log files
- Temporary files
- User-specific data

### System Integration
- Desktop shortcuts
- Start menu entries (Windows)
- Dock entries (macOS)
- Application menu entries (Linux)
- Registry entries (Windows)
- Launch agents/daemons (macOS)
- Systemd services (Linux)

### Platform-Specific Items

#### Windows
- Registry entries in `HKEY_CURRENT_USER` and `HKEY_LOCAL_MACHINE`
- Desktop shortcuts
- Start menu shortcuts
- AppData folders

#### macOS
- Application bundles (.app files)
- Preference files (.plist)
- LaunchAgents and LaunchDaemons
- Application Support folders
- Cache and log directories

#### Linux
- Desktop files (.desktop)
- Binary files in /usr/local/bin
- Configuration files in ~/.config
- Application data in ~/.local/share

## Troubleshooting

### Common Issues

#### Permission Denied Errors
**Problem**: Uninstaller cannot remove files due to permission restrictions.

**Solution**:
- Windows: Run as Administrator
- macOS: Enter administrator password when prompted
- Linux: Use `sudo` or run with appropriate permissions

#### Files in Use
**Problem**: Some files cannot be removed because they are being used by other processes.

**Solution**:
1. Close the main application completely
2. Close any related processes
3. Restart the uninstaller
4. If problems persist, restart your computer

#### Incomplete Uninstallation
**Problem**: Some files or registry entries remain after uninstallation.

**Solution**:
1. Check the uninstaller log for specific errors
2. Manually remove remaining items
3. Run the uninstaller again
4. Contact support if issues persist

### Log Files

The uninstaller creates detailed log files for troubleshooting:

#### Windows
- `%TEMP%\SocialMarketingUninstaller.log`
- `%APPDATA%\SocialMarketing\uninstaller.log`

#### macOS
- `~/Library/Logs/SocialMarketingUninstaller.log`
- `/tmp/SocialMarketingUninstaller.log`

#### Linux
- `~/.local/share/SocialMarketing/uninstaller.log`
- `/tmp/SocialMarketingUninstaller.log`

### Manual Cleanup

If the uninstaller fails to remove all items, you can manually clean up:

#### Windows
```cmd
# Remove registry entries
reg delete "HKEY_CURRENT_USER\Software\SocialMarketing" /f
reg delete "HKEY_LOCAL_MACHINE\Software\SocialMarketing" /f

# Remove remaining files
rmdir /s "C:\Program Files\SocialMarketing"
rmdir /s "%APPDATA%\SocialMarketing"
```

#### macOS
```bash
# Remove application bundle
rm -rf "/Applications/SocialMarketing.app"

# Remove user data
rm -rf ~/Library/Application\ Support/SocialMarketing
rm -rf ~/Library/Preferences/com.socialmarketing.plist
```

#### Linux
```bash
# Remove application files
sudo rm -rf /opt/socialmarketing
sudo rm -f /usr/local/bin/socialmarketing

# Remove user data
rm -rf ~/.config/SocialMarketing
rm -rf ~/.local/share/SocialMarketing
```

## Development

### Building the Uninstaller

```bash
# Install dependencies
yarn install

# Build uninstaller
yarn build-uninstaller

# Package for distribution
yarn make-uninstaller-all
```

### Testing

```bash
# Run unit tests
yarn test-uninstaller

# Run specific platform tests
yarn test-uninstaller --platform=win32

# Run with coverage
yarn test-uninstaller --coverage
```

### Development Scripts

| Script | Description |
|--------|-------------|
| `yarn build-uninstaller` | Build the uninstaller |
| `yarn make-uninstaller-win` | Package for Windows |
| `yarn make-uninstaller-mac` | Package for macOS |
| `yarn make-uninstaller-linux` | Package for Linux |
| `yarn test-uninstaller` | Run tests |
| `yarn cleanup-uninstaller` | Clean build artifacts |

## Architecture

The uninstaller consists of several key components:

### Core Components
- **UninstallerManager**: Main orchestration class
- **Platform Uninstallers**: Platform-specific logic (Windows, macOS, Linux)
- **UI Components**: Vue.js-based user interface
- **Progress Tracking**: Real-time progress reporting

### File Structure
```
src/uninstaller/
├── main.ts                 # Electron main process
├── uninstaller.ts          # Core uninstaller logic
├── platforms/              # Platform-specific code
│   ├── windows.ts
│   ├── macos.ts
│   └── linux.ts
├── ui/                     # User interface
│   ├── UninstallerWindow.vue
│   └── components/
└── renderer.ts             # Renderer process
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## Support

For issues and questions:

1. Check the troubleshooting section above
2. Review the log files for error details
3. Create an issue on GitHub with:
   - Operating system and version
   - Uninstaller version
   - Error messages from log files
   - Steps to reproduce the issue

## License

This uninstaller is part of the Social Marketing application and follows the same license terms.

## Version History

### v1.0.0
- Initial release
- Cross-platform support
- Professional UI
- Comprehensive file removal
- Error handling and logging

---

For more information, see the [Development Guide](DEVELOPMENT.md) and [Testing Guide](TESTING.md). 