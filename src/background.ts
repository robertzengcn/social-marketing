'use strict'
// import {ipcMain as ipc} from 'electron-better-ipc';
import { app, protocol, BrowserWindow } from 'electron'
// import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import {registerCommunicationIpcHandlers} from "./main-process/communication/";
import * as path from 'path';
import 'reflect-metadata';
// import { createProtocol } from 'electron';
const isDevelopment = process.env.NODE_ENV !== 'production'
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;
// import { safeStorage } from 'electron';

// const { ipcRenderer: ipc } = require('electron-better-ipc');
// const { ipcMain } = require("electron");

// Scheme must be registered before the app is ready

let win;
function initialize() {
  console.log(import.meta.env.VITE_REMOTEADD)
  protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
  ])

  makeSingleInstance()

  async function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {

        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        // nodeIntegration: (process.env
        //   .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
        //  contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
        
        // contextIsolation:false,
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname + '/preload.js')
      }
    })
    // In this example, only windows with the `about:blank` url will be created.
    // All other urls will be blocked.
    win.webContents.setWindowOpenHandler(({ url }) => {
      // console.log(url)
      //if (url === '_blank') {
        return {
          action: 'allow',
          overrideBrowserWindowOptions: {
            // frame: false,
            // fullscreenable: false,
            backgroundColor: 'black',
            webPreferences: {
              preload: path.join(__dirname + '/preload.js')
            }
          }
        }
      // }
      // return { action: 'deny' }
    })

    // console.log(process.env.WEBPACK_DEV_SERVER_UR)
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL as string)
      if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
      // console.log('app://./index.html')
      // createProtocol('app')
      // Load the index.html when not in development
      await win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
    }
  }

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', async () => {
    createWindow();
    registerCommunicationIpcHandlers(win);
    

    if (isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      try {
        await installExtension(VUEJS3_DEVTOOLS)
      } catch (e) {
        if (e instanceof Error) {
          console.error('Vue Devtools failed to install:', e.toString())
        }
      }
    }
  })

  // Exit cleanly on request from parent process in development mode.
  if (isDevelopment) {
    if (process.platform === 'win32') {
      process.on('message', (data) => {
        if (data === 'graceful-exit') {
          app.quit()
        }
      })
    } else {
      process.on('SIGTERM', () => {
        app.quit()
      })
    }
  }
  

}







function makeSingleInstance() {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })


}

// makeSingleInstance()
// createWindow()






initialize()





