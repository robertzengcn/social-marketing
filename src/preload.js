import { contextBridge, ipcRenderer } from 'electron'
// window.ipcRenderer = ipcRenderer
// console.log('preload.js')
// contextBridge.exposeInMainWorld('electronAPI', {
//     userLogin: (data) => ipcRenderer.invoke('user:login', data)
// })
contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => {
      // whitelist channels
      let validChannels = ['user:Login','socialtask:start','socialtask:log']
      console.log('send',channel,data)
      if (validChannels.includes(channel)) {
        console.log('send2',channel,data)
        ipcRenderer.send(channel, data)
      }
    },
    receive: (channel, func) => {
      let validChannels = ['user:Login','socialtask:start','socialtask:log']
      const regex="/^socialtask:log:/"

      if (validChannels.includes(channel)||channel.test(regex)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args))
      }
    },
    invoke: (channel, data) => {
      // whitelist channels
      let validChannels = ['user:Login','user:checklogin','user:Signout','campaign:list','socialtask:list','socialtask:info','socialtasktype:list','tag:list','socialtask:save','socialtask:start','socialtaskrun:list','socialtaskresult:list','socialaccount:list']
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, data)
      }
    }
  })