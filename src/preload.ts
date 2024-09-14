import { contextBridge, ipcRenderer } from 'electron'
import {EXTRAMODULECHANNE_LIST,EXTRAMODULECHANNE_INSTALL,EXTRAMODULECHANNE_UNINSTALL,EXTRAMODULECHANNE_MESSAGE,OPENDIRECTORY,SYSTEM_MESSAGE,VIDEODOWNLOAD_MESSAGE,VIDEODOWNLOAD,VIDEODOWNLOAD_LIST,SEARCHSCRAPERAPI,LISTSESARCHRESUT,SEARCHEVENT,TASKSEARCHRESULTLIST,SAVESEARCHERRORLOG
  ,CHECKALLPROXY,CHECKALLPROXYMESSAGE,REMOVEFAILUREPROXY_MESSAGE,REMOVEFAILUREPROXY,EMAILEXTRACTIONAPI,EMAILEXTRACTIONMESSAGE,LISTEMAILSEARCHTASK
} from "./config/channellist";

// window.ipcRenderer = ipcRenderer
// console.log('preload.js')
// contextBridge.exposeInMainWorld('electronAPI', {
//     userLogin: (data) => ipcRenderer.invoke('user:login', data)
// })
contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => {
      // whitelist channels
      const validChannels = ['user:Login','socialtask:start','socialtask:log','socialaccount:login','socialaccount:login:msg',EXTRAMODULECHANNE_INSTALL,EXTRAMODULECHANNE_MESSAGE,EXTRAMODULECHANNE_UNINSTALL,SYSTEM_MESSAGE,VIDEODOWNLOAD_MESSAGE,
        VIDEODOWNLOAD,SEARCHSCRAPERAPI,CHECKALLPROXY,REMOVEFAILUREPROXY,EMAILEXTRACTIONAPI]
      console.log('send',channel,data)
      if (validChannels.includes(channel)) {
        console.log('send2',channel,data)
        ipcRenderer.send(channel, data)
      }
    },
    receive: (channel, func) => {
      const validChannels = ['user:Login','socialtask:start','socialtask:log','socialaccount:login:msg',EXTRAMODULECHANNE_INSTALL,EXTRAMODULECHANNE_MESSAGE,EXTRAMODULECHANNE_UNINSTALL,SYSTEM_MESSAGE,VIDEODOWNLOAD_MESSAGE,VIDEODOWNLOAD,
        SEARCHSCRAPERAPI,SEARCHEVENT,CHECKALLPROXYMESSAGE,REMOVEFAILUREPROXY_MESSAGE,EMAILEXTRACTIONMESSAGE]
      const regex="/^socialtask:log:/"

      if (validChannels.includes(channel)||channel.test(regex)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args))
      }
    },
    invoke: (channel, data) => {
      // whitelist channels
      const validChannels = ['user:Login','user:checklogin','user:Signout','campaign:list','socialtask:list','socialtask:info','socialtasktype:list','tag:list','socialtask:save','socialtask:start','socialtaskrun:list','socialtaskresult:list','socialaccount:list','socialaccount:save','socialplatform:list','socialaccount:detail','socialaccount:delete','proxy:list','proxy:delete','proxy:save','proxy:detail','proxy:check','proxy:import',EXTRAMODULECHANNE_LIST,OPENDIRECTORY,VIDEODOWNLOAD,VIDEODOWNLOAD_LIST,LISTSESARCHRESUT,SEARCHSCRAPERAPI,TASKSEARCHRESULTLIST,
        SAVESEARCHERRORLOG,LISTEMAILSEARCHTASK]
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, data)
      }
    }
  })