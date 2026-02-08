# Social Marketing Uninstaller - User Guide

This guide provides step-by-step instructions for using the Social Marketing Uninstaller to completely remove the application from your system.

## Table of Contents

1. [Getting Started](#getting-started)
2. [System Requirements](#system-requirements)
3. [Installation](#installation)
4. [Using the Uninstaller](#using-the-uninstaller)
5. [Troubleshooting](#troubleshooting)
6. [FAQ](#faq)
7. [Support](#support)

## Getting Started

### What is the Social Marketing Uninstaller?

The Social Marketing Uninstaller is a professional tool designed to completely remove the Social Marketing application and all associated files from your computer. It ensures a clean removal by:

- Removing the main application files
- Cleaning up user data and preferences
- Removing shortcuts and system entries
- Cleaning registry entries (Windows)
- Removing application bundles (macOS)
- Cleaning system integration (Linux)

### When to Use the Uninstaller

Use the uninstaller when you want to:

- Completely remove the Social Marketing application
- Free up disk space
- Resolve application issues
- Prepare for a fresh installation
- Remove all traces of the application

## System Requirements

### Minimum Requirements

| Component | Windows | macOS | Linux |
|-----------|---------|-------|-------|
| Operating System | Windows 10 (64-bit) | macOS 10.15+ | Ubuntu 18.04+ |
| RAM | 2 GB | 2 GB | 2 GB |
| Disk Space | 50 MB | 50 MB | 50 MB |
| Permissions | Administrator | User | User/Sudo |

### Recommended Requirements

| Component | Windows | macOS | Linux |
|-----------|---------|-------|-------|
| Operating System | Windows 11 | macOS 12+ | Ubuntu 20.04+ |
| RAM | 4 GB | 4 GB | 4 GB |
| Disk Space | 100 MB | 100 MB | 100 MB |
| Permissions | Administrator | User | User/Sudo |

## Installation

### Automatic Installation

The uninstaller is automatically installed with the main Social Marketing application and can be found in the following locations:

#### Windows
- **Program Files**: `C:\Program Files\SocialMarketing\uninstaller\SocialMarketingUninstaller.exe`
- **Desktop**: Look for "Social Marketing Uninstaller" shortcut
- **Start Menu**: Search for "Social Marketing Uninstaller"

#### macOS
- **Applications**: `/Applications/SocialMarketing.app/Contents/Resources/uninstaller/SocialMarketingUninstaller`
- **Applications Folder**: Look for "Social Marketing Uninstaller" in Applications

#### Linux
- **System Directory**: `/opt/socialmarketing/uninstaller/SocialMarketingUninstaller`
- **Application Menu**: Search for "Social Marketing Uninstaller"
- **Desktop**: Look for "Social Marketing Uninstaller" shortcut

### Manual Installation

If the uninstaller is not found in the automatic locations, you can download it manually:

1. **Download the Uninstaller**
   - Visit the official website: [https://socialmarketing.com/uninstaller](https://socialmarketing.com/uninstaller)
   - Select your operating system
   - Download the appropriate version

2. **Install the Uninstaller**
   - **Windows**: Run the `.exe` file as Administrator
   - **macOS**: Open the `.dmg` file and drag to Applications
   - **Linux**: Extract the archive and run the executable

## Using the Uninstaller

### Step 1: Launch the Uninstaller

#### Windows
1. Close the Social Marketing application if it's running
2. Right-click on "Social Marketing Uninstaller" and select "Run as administrator"
3. Click "Yes" when prompted by User Account Control

#### macOS
1. Close the Social Marketing application if it's running
2. Open "Applications" folder
3. Find "Social Marketing Uninstaller" and double-click to launch
4. Enter your administrator password if prompted

#### Linux
1. Close the Social Marketing application if it's running
2. Open terminal and run: `sudo ./SocialMarketingUninstaller`
3. Enter your password when prompted

### Step 2: Welcome Screen

When the uninstaller launches, you'll see the welcome screen:

```
┌─────────────────────────────────────────┐
│           Social Marketing              │
│              Uninstaller                │
│                                         │
│  This will completely remove the        │
│  Social Marketing application from      │
│  your system.                           │
│                                         │
│  [Uninstall] [Cancel]                   │
└─────────────────────────────────────────┘
```

**What to do:**
- Review the information carefully
- Click "Uninstall" to proceed
- Click "Cancel" to exit without making changes

### Step 3: Confirmation Dialog

The uninstaller will show a confirmation dialog with details about what will be removed:

```
┌─────────────────────────────────────────┐
│         Confirm Uninstallation          │
│                                         │
│  The following items will be removed:   │
│  • Application files (150 MB)           │
│  • User data and preferences            │
│  • Desktop shortcuts                    │
│  • Start menu entries                   │
│  • Registry entries (Windows)           │
│                                         │
│  [Uninstall] [Cancel]                   │
└─────────────────────────────────────────┘
```

**What to do:**
- Review the list of items to be removed
- Ensure you have backed up any important data
- Click "Uninstall" to continue
- Click "Cancel" to abort the process

### Step 4: Uninstallation Progress

The uninstaller will show a progress screen with real-time updates:

```
┌─────────────────────────────────────────┐
│         Uninstalling...                 │
│                                         │
│  [████████████████████████████████████] │
│  Progress: 75%                          │
│                                         │
│  Current: Removing registry entries...  │
│  Removed: 1,247 files                   │
│                                         │
└─────────────────────────────────────────┘
```

**What's happening:**
- The progress bar shows overall completion
- Current step is displayed below the progress bar
- Number of files removed is shown
- **Do not close the uninstaller during this process**

### Step 5: Completion

When the uninstallation is complete, you'll see the success screen:

```
┌─────────────────────────────────────────┐
│         Uninstallation Complete         │
│                                         │
│  ✓ Application files removed            │
│  ✓ User data cleaned                    │
│  ✓ Shortcuts removed                    │
│  ✓ Registry entries cleaned             │
│                                         │
│  Total space freed: 150 MB              │
│                                         │
│  [Close] [Restart Computer]             │
└─────────────────────────────────────────┘
```

**What to do:**
- Review the summary of removed items
- Note the amount of disk space freed
- Click "Close" to finish
- Click "Restart Computer" if recommended

## Troubleshooting

### Common Issues

#### Uninstaller Won't Start

**Problem**: The uninstaller doesn't launch when double-clicked.

**Solutions**:
1. **Windows**: Right-click and select "Run as administrator"
2. **macOS**: Check System Preferences > Security & Privacy
3. **Linux**: Run from terminal with `sudo ./SocialMarketingUninstaller`

#### Permission Denied Errors

**Problem**: The uninstaller shows "Permission denied" errors.

**Solutions**:
1. **Windows**: Run as Administrator
2. **macOS**: Enter administrator password when prompted
3. **Linux**: Use `sudo` command

#### Files in Use Errors

**Problem**: Some files cannot be removed because they're in use.

**Solutions**:
1. Close the Social Marketing application completely
2. Close any related processes
3. Restart the uninstaller
4. If problems persist, restart your computer

#### Incomplete Uninstallation

**Problem**: Some files or registry entries remain after uninstallation.

**Solutions**:
1. Run the uninstaller again
2. Check the log file for specific errors
3. Manually remove remaining items (see manual cleanup below)
4. Contact support if issues persist

### Manual Cleanup

If the uninstaller fails to remove all items, you can manually clean up:

#### Windows Manual Cleanup

1. **Remove Registry Entries**
   ```cmd
   reg delete "HKEY_CURRENT_USER\Software\SocialMarketing" /f
   reg delete "HKEY_LOCAL_MACHINE\Software\SocialMarketing" /f
   ```

2. **Remove Remaining Files**
   ```cmd
   rmdir /s "C:\Program Files\SocialMarketing"
   rmdir /s "%APPDATA%\SocialMarketing"
   rmdir /s "%LOCALAPPDATA%\SocialMarketing"
   ```

3. **Remove Shortcuts**
   ```cmd
   del "%USERPROFILE%\Desktop\SocialMarketing.lnk"
   rmdir /s "%APPDATA%\Microsoft\Windows\Start Menu\Programs\SocialMarketing"
   ```

#### macOS Manual Cleanup

1. **Remove Application Bundle**
   ```bash
   rm -rf "/Applications/SocialMarketing.app"
   ```

2. **Remove User Data**
   ```bash
   rm -rf ~/Library/Application\ Support/SocialMarketing
   rm -rf ~/Library/Preferences/com.socialmarketing.plist
   rm -rf ~/Library/Caches/SocialMarketing
   rm -rf ~/Library/Logs/SocialMarketing
   ```

3. **Remove Launch Agents**
   ```bash
   rm -f ~/Library/LaunchAgents/com.socialmarketing.plist
   ```

#### Linux Manual Cleanup

1. **Remove Application Files**
   ```bash
   sudo rm -rf /opt/socialmarketing
   sudo rm -f /usr/local/bin/socialmarketing
   ```

2. **Remove User Data**
   ```bash
   rm -rf ~/.config/SocialMarketing
   rm -rf ~/.local/share/SocialMarketing
   rm -rf ~/.cache/SocialMarketing
   ```

3. **Remove Desktop Files**
   ```bash
   rm -f ~/.local/share/applications/socialmarketing.desktop
   sudo rm -f /usr/local/share/applications/socialmarketing.desktop
   ```

### Log Files

The uninstaller creates detailed log files for troubleshooting:

#### Windows Log Files
- `%TEMP%\SocialMarketingUninstaller.log`
- `%APPDATA%\SocialMarketing\uninstaller.log`

#### macOS Log Files
- `~/Library/Logs/SocialMarketingUninstaller.log`
- `/tmp/SocialMarketingUninstaller.log`

#### Linux Log Files
- `~/.local/share/SocialMarketing/uninstaller.log`
- `/tmp/SocialMarketingUninstaller.log`

#### Reading Log Files

1. **Open the log file** in a text editor
2. **Look for error messages** starting with "ERROR:"
3. **Check the timestamp** to see when issues occurred
4. **Look for specific file paths** that couldn't be removed

## FAQ

### General Questions

**Q: Is it safe to use the uninstaller?**
A: Yes, the uninstaller is designed to safely remove only Social Marketing application files and data. It will not affect other applications or system files.

**Q: Will the uninstaller remove my data?**
A: Yes, the uninstaller removes all application data including settings, cache, and user preferences. Make sure to backup any important data before running the uninstaller.

**Q: Can I reinstall the application after uninstalling?**
A: Yes, you can reinstall the Social Marketing application at any time after using the uninstaller.

**Q: Do I need administrator privileges?**
A: Yes, administrator privileges are required to remove system files and registry entries. The uninstaller will prompt you for these permissions.

### Technical Questions

**Q: What if the uninstaller crashes?**
A: If the uninstaller crashes, restart it and try again. If problems persist, use the manual cleanup procedures or contact support.

**Q: How long does uninstallation take?**
A: Uninstallation typically takes 1-5 minutes depending on the size of the installation and system performance.

**Q: Can I cancel the uninstallation?**
A: You can cancel the uninstallation at any time before it starts. Once the process begins, it's recommended to let it complete to avoid leaving the system in an inconsistent state.

**Q: What happens if my computer shuts down during uninstallation?**
A: If your computer shuts down during uninstallation, some files may remain. Run the uninstaller again to complete the process.

### Platform-Specific Questions

**Q: Why do I need to run as Administrator on Windows?**
A: Administrator privileges are required to remove files from Program Files and modify registry entries.

**Q: Why does macOS ask for my password?**
A: macOS requires administrator authentication to remove system files and modify application bundles.

**Q: Why do I need sudo on Linux?**
A: Sudo privileges are required to remove files from system directories like /opt and /usr/local.

## Support

### Getting Help

If you encounter issues with the uninstaller:

1. **Check the troubleshooting section** above
2. **Review the log files** for specific error messages
3. **Try the manual cleanup procedures**
4. **Contact support** with the following information:
   - Operating system and version
   - Uninstaller version
   - Error messages from log files
   - Steps to reproduce the issue

### Contact Information

- **Email**: support@socialmarketing.com
- **Website**: https://socialmarketing.com/support
- **Documentation**: https://socialmarketing.com/docs/uninstaller

### Support Hours

- **Monday - Friday**: 9:00 AM - 6:00 PM EST
- **Saturday**: 10:00 AM - 4:00 PM EST
- **Sunday**: Closed

### Before Contacting Support

Please gather the following information:

1. **System Information**
   - Operating system and version
   - Available disk space
   - RAM and processor information

2. **Error Details**
   - Exact error messages
   - Screenshots if possible
   - Log file contents

3. **Steps Taken**
   - What you tried to do
   - What happened
   - Any error messages received

---

**Version**: 1.0  
**Last Updated**: December 2024  
**Support**: support@socialmarketing.com 