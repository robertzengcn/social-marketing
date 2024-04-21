// export { default as SyncMsg } from "./sync-msg";
// export { default as AsyncMsg } from "./async-msg";
import {registerExtraModulesIpcHandlers} from "@/main-process/communication/extramodule-ipc";
import SyncMsg from "@/main-process/communication/sync-msg";
import AsyncMsg from "@/main-process/communication/sync-msg"
export function registerCommunicationIpcHandlers() {
    SyncMsg()
    AsyncMsg()
    // Register extra modules IPC handlers
    registerExtraModulesIpcHandlers()
}