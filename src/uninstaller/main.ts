'use strict'
import { app, BrowserWindow, dialog } from 'electron'
import * as path from 'path'
import log from 'electron-log/main'
import fs from 'fs'
import { UninstallerManager } from './uninstaller'

// Configure log
log.initialize()
log.transports.file.level = 'debug'
const logDir = path.join(app.getPath('userData'), 'logs')
try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
  }
} catch (err) {
  console.error('Failed to create log directory:', err)
}
log.transports.file.fileName = path.join(logDir, 'uninstaller.log')

// Override console.log
Object.assign(console, log.functions)

const APP_NAME = 'SocialMarketing'

class UninstallerApp {
  private mainWindow: BrowserWindow | null = null
  private uninstallerManager: UninstallerManager

  constructor() {
    this.uninstallerManager = new UninstallerManager(APP_NAME)
    this.initializeApp()
  }

  private initializeApp() {
    log.info('Initializing uninstaller application...')

    // Handle app events
    app.on('ready', () => this.createWindow())
    app.on('window-all-closed', () => this.handleWindowAllClosed())
    app.on('activate', () => this.handleActivate())
    app.on('before-quit', () => this.handleBeforeQuit())

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      log.error('Uncaught Exception:', error)
      this.showErrorDialog('Uninstaller Error', `An unexpected error occurred: ${error.message}`)
    })

    process.on('unhandledRejection', (reason) => {
      log.error('Unhandled Promise Rejection:', reason)
    })

    // Ensure single instance
    this.ensureSingleInstance()
  }

  private ensureSingleInstance() {
    const gotTheLock = app.requestSingleInstanceLock()
    
    if (!gotTheLock) {
      log.info('Another instance of uninstaller is running, quitting...')
      app.quit()
      return
    }

    app.on('second-instance', () => {
      log.info('Second instance detected, focusing existing window...')
      if (this.mainWindow) {
        if (this.mainWindow.isMinimized()) {
          this.mainWindow.restore()
        }
        this.mainWindow.focus()
      }
    })
  }

  private async createWindow() {
    log.info('Creating uninstaller window...')

    // Create the browser window
    this.mainWindow = new BrowserWindow({
      width: 600,
      height: 500,
      minWidth: 500,
      minHeight: 400,
      icon: path.join(__dirname, '../assets/images/icon.png'),
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      },
      show: false, // Don't show until ready
      titleBarStyle: 'default',
      resizable: true,
      maximizable: false,
      fullscreenable: false,
      autoHideMenuBar: true
    })

    // Load the uninstaller UI
    if (process.env.NODE_ENV === 'development') {
      // In development, load from dev server
      await this.mainWindow.loadURL('http://localhost:5173/uninstaller')
    } else {
      // In production, load from built files
      await this.mainWindow.loadFile(path.join(__dirname, '../renderer/uninstaller/index.html'))
    }

    // Show window when ready
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show()
      log.info('Uninstaller window ready and shown')
    })

    // Handle window closed
    this.mainWindow.on('closed', () => {
      this.mainWindow = null
    })

    // Handle window close event
    this.mainWindow.on('close', (event) => {
      if (this.uninstallerManager.isUninstalling()) {
        event.preventDefault()
        this.showWarningDialog('Uninstallation in Progress', 'Please wait for the uninstallation to complete.')
      }
    })
  }

  private handleWindowAllClosed() {
    // On macOS, keep the app running even when all windows are closed
    if (process.platform !== 'darwin') {
      app.quit()
    }
  }

  private handleActivate() {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      this.createWindow()
    }
  }

  private async handleBeforeQuit() {
    try {
      // Clean up any resources
      log.info('Application shutting down...')
    } catch (error) {
      log.error('Error during shutdown:', error)
    }
  }

  private showErrorDialog(title: string, message: string) {
    if (this.mainWindow) {
      dialog.showErrorBox(title, message)
    }
  }

  private showWarningDialog(title: string, message: string) {
    if (this.mainWindow) {
      dialog.showMessageBox(this.mainWindow, {
        type: 'warning',
        title,
        message,
        buttons: ['OK']
      })
    }
  }
}

// Initialize the uninstaller application
const uninstallerApp = new UninstallerApp() 