// export { default as SyncMsg } from "./sync-msg";
// export { default as AsyncMsg } from "./async-msg";
import {registerExtraModulesIpcHandlers} from "@/main-process/communication/extramodule-ipc";
import SyncMsg from "@/main-process/communication/sync-msg";
import AsyncMsg from "@/main-process/communication/sync-msg"
import {BrowserWindow } from 'electron'
export function registerCommunicationIpcHandlers(win: BrowserWindow) {
    SyncMsg(win)
    registerExtraModulesIpcHandlers()
    AsyncMsg(win)
    // Register extra modules IPC handlers
    
}