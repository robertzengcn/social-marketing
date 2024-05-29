// export { default as SyncMsg } from "./sync-msg";
// export { default as AsyncMsg } from "./async-msg";
import {registerExtraModulesIpcHandlers} from "@/main-process/communication/extramodule-ipc";
import {registerVideoIpcHandlers} from "@/main-process/communication/videoIpc";
import SyncMsg from "@/main-process/communication/sync-msg";
import AsyncMsg from "@/main-process/communication/async-msg"
import {BrowserWindow } from 'electron'
export function registerCommunicationIpcHandlers(win: BrowserWindow) {
    SyncMsg(win)
    registerExtraModulesIpcHandlers()
    registerVideoIpcHandlers()
    AsyncMsg()
    // Register extra modules IPC handlers
    
}