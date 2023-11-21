const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    userLogin: (data) => ipcRenderer.invoke('user:login', data)
})