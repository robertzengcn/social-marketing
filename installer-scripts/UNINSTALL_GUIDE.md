# Uninstall Guide for SocialMarketing

This guide explains how to completely uninstall the SocialMarketing application from your system.

## 🖥️ Platform-Specific Uninstall Methods

### Windows

#### Method 1: Using Control Panel (Recommended)
1. Open **Control Panel** → **Programs and Features**
2. Find **SocialMarketing** in the list
3. Click **Uninstall** and follow the wizard
4. The uninstaller will automatically:
   - Remove application files
   - Remove desktop and start menu shortcuts
   - Remove registry entries
   - Remove user data

#### Method 2: Using Command Line
```cmd
# Run the uninstall script directly
node installer-scripts/uninstall-windows.js

# Or with custom parameters
node installer-scripts/uninstall-windows.js SocialMarketing "C:\Program Files\SocialMarketing"
```

#### Method 3: Manual Uninstall
If the automatic uninstall fails, you can manually remove:

1. **Application Files**:
   - `%LOCALAPPDATA%\SocialMarketing\`
   - `C:\Program Files\SocialMarketing\`

2. **Shortcuts**:
   - Desktop: `%USERPROFILE%\Desktop\SocialMarketing.lnk`
   - Start Menu: `%APPDATA%\Microsoft\Windows\Start Menu\Programs\SocialMarketing\`

3. **Registry Entries**:
   - `HKEY_CURRENT_USER\Software\SocialMarketing`
   - `HKEY_LOCAL_MACHINE\SOFTWARE\SocialMarketing` (if installed for all users)

4. **User Data**:
   - `%APPDATA%\SocialMarketing\`
   - `%LOCALAPPDATA%\SocialMarketing\Cache\`

### macOS

#### Method 1: Using Applications Folder
1. Open **Applications** folder
2. Find **SocialMarketing.app**
3. Drag it to the **Trash** or right-click → **Move to Trash**
4. Empty the Trash

#### Method 2: Using Terminal
```bash
# Run the uninstall script
./installer-scripts/uninstall-macos.sh

# Or with sudo for system-wide removal
sudo ./installer-scripts/uninstall-macos.sh
```

#### Method 3: Manual Uninstall
If automatic uninstall fails, manually remove:

1. **Application**:
   - `/Applications/SocialMarketing.app`
   - `~/Applications/SocialMarketing.app`

2. **User Data**:
   - `~/Library/Application Support/SocialMarketing/`
   - `~/Library/Preferences/com.socialmarketing.plist`
   - `~/Library/Caches/SocialMarketing/`
   - `~/Library/Logs/SocialMarketing/`

3. **Shortcuts**:
   - Desktop: `~/Desktop/SocialMarketing`
   - Dock: (remove manually from dock)

4. **Launch Agents**:
   - `~/Library/LaunchAgents/com.socialmarketing.plist`

### Linux

#### Method 1: Using Package Manager
```bash
# For DEB-based systems (Ubuntu, Debian)
sudo apt remove social-marketing

# For RPM-based systems (Fedora, CentOS)
sudo yum remove social-marketing
```

#### Method 2: Using Uninstall Script
```bash
# Run the uninstall script
./installer-scripts/uninstall-linux.sh

# Or with sudo for system-wide removal
sudo ./installer-scripts/uninstall-linux.sh
```

#### Method 3: Manual Uninstall
If automatic uninstall fails, manually remove:

1. **Application Files**:
   - `/opt/social-marketing/`
   - `/usr/local/bin/social-marketing`
   - `/usr/bin/social-marketing`

2. **Desktop Files**:
   - `~/.local/share/applications/social-marketing.desktop`
   - `/usr/share/applications/social-marketing.desktop`

3. **User Data**:
   - `~/.local/share/SocialMarketing/`
   - `~/.config/SocialMarketing/`
   - `~/.cache/SocialMarketing/`

4. **Menu Entries**:
   - `~/.config/menus/applications-merged/social-marketing.menu`

## 🔧 Advanced Uninstall Options

### Windows Advanced Options

#### Remove All User Data
```cmd
# Remove user data only
node installer-scripts/uninstall-windows.js SocialMarketing --user-data-only
```

#### Remove System-Wide Installation
```cmd
# Run as Administrator to remove system-wide installation
node installer-scripts/uninstall-windows.js SocialMarketing --system-wide
```

### macOS Advanced Options

#### Remove System-Wide Installation
```bash
# Remove system-wide installation (requires sudo)
sudo ./installer-scripts/uninstall-macos.sh --system-wide
```

#### Remove User Data Only
```bash
# Remove user data only
./installer-scripts/uninstall-macos.sh --user-data-only
```

### Linux Advanced Options

#### Remove System-Wide Installation
```bash
# Remove system-wide installation (requires sudo)
sudo ./installer-scripts/uninstall-linux.sh --system-wide
```

#### Remove Package Manager Entries
```bash
# Check for package manager entries
./installer-scripts/uninstall-linux.sh --check-packages

# Remove package manager entries
sudo ./installer-scripts/uninstall-linux.sh --remove-packages
```

## 🚨 Troubleshooting

### Common Issues

#### 1. "Permission Denied" Errors
- **Windows**: Run as Administrator
- **macOS/Linux**: Use `sudo` for system-wide removal

#### 2. Files Still Remain
- Check for running instances of the application
- Close all related processes before uninstalling
- Use the manual uninstall method

#### 3. Shortcuts Not Removed
- Manually delete shortcuts from desktop and start menu
- Clear application cache and restart

#### 4. Registry Entries Remain (Windows)
- Use Registry Editor to manually remove entries
- Search for "SocialMarketing" in registry

### Verification Steps

After uninstalling, verify complete removal:

#### Windows
```cmd
# Check for remaining files
dir "%LOCALAPPDATA%\SocialMarketing" 2>nul
dir "C:\Program Files\SocialMarketing" 2>nul

# Check registry
reg query "HKEY_CURRENT_USER\Software\SocialMarketing" 2>nul
```

#### macOS
```bash
# Check for remaining files
ls -la /Applications/SocialMarketing.app 2>/dev/null
ls -la ~/Library/Application\ Support/SocialMarketing/ 2>/dev/null
```

#### Linux
```bash
# Check for remaining files
ls -la /opt/social-marketing/ 2>/dev/null
ls -la ~/.local/share/SocialMarketing/ 2>/dev/null
```

## 📋 Uninstall Scripts Reference

### Windows Uninstall Script
- **File**: `installer-scripts/uninstall-windows.js`
- **Usage**: `node uninstall-windows.js [appName] [installDir]`
- **Features**:
  - Removes shortcuts (desktop, start menu)
  - Removes registry entries
  - Removes application files
  - Removes user data

### macOS Uninstall Script
- **File**: `installer-scripts/uninstall-macos.sh`
- **Usage**: `./uninstall-macos.sh [options]`
- **Features**:
  - Removes application bundle
  - Removes desktop alias
  - Removes user data
  - Removes launch agents
  - Updates Spotlight index

### Linux Uninstall Script
- **File**: `installer-scripts/uninstall-linux.sh`
- **Usage**: `./uninstall-linux.sh [options]`
- **Features**:
  - Removes application files
  - Removes desktop files
  - Removes menu entries
  - Removes user data
  - Updates desktop database

## 🔄 Reinstallation

After uninstalling, you can reinstall the application:

1. **Download** the latest installer
2. **Run** the installer as Administrator (Windows) or with sudo (Linux)
3. **Follow** the installation wizard
4. **Verify** the installation

## 📞 Support

If you encounter issues during uninstallation:

1. **Check** the troubleshooting section above
2. **Run** the uninstall script with verbose output
3. **Contact** support with error logs
4. **Use** manual uninstall as a last resort

---

**Note**: Always close the application before uninstalling to prevent file lock issues. 