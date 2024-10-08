// export { default as SyncMsg } from "./sync-msg";
// export { default as AsyncMsg } from "./async-msg";
import {registerExtraModulesIpcHandlers} from "@/main-process/communication/extramodule-ipc";
import {registerVideoIpcHandlers} from "@/main-process/communication/videoIpc";
import SyncMsg from "@/main-process/communication/sync-msg";
import AsyncMsg from "@/main-process/communication/async-msg"
import {BrowserWindow } from 'electron'
import {registerSearchIpcHandlers} from "@/main-process/communication/search-ipc";
import {registeProxyIpcHandlers} from "@/main-process/communication/proxy-ipc";
import {registerEmailextractionIpcHandlers} from "@/main-process/communication/emailextraction-ipc";
import {registerEmailMarketingIpcHandlers} from "@/main-process/communication/emailMarketingIpc";
export function registerCommunicationIpcHandlers(win: BrowserWindow) {
    SyncMsg(win)
    registerExtraModulesIpcHandlers()
    registerVideoIpcHandlers()
    registerSearchIpcHandlers()
    registeProxyIpcHandlers()
    registerEmailextractionIpcHandlers()
    registerEmailMarketingIpcHandlers()
    AsyncMsg()
    // Register extra modules IPC handlers
    
    
}