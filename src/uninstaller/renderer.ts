import { createApp } from 'vue'
import UninstallerWindow from './ui/UninstallerWindow.vue'
import { ipcRenderer } from 'electron'

// Create Vue app
const app = createApp(UninstallerWindow)

// Mount the app
app.mount('#app')

// Handle IPC communication
ipcRenderer.on('uninstall-progress', (event, progress) => {
  // Update progress in the UI
  console.log('Uninstall progress:', progress)
})

ipcRenderer.on('uninstall-complete', (event, result) => {
  // Handle uninstall completion
  console.log('Uninstall complete:', result)
})

ipcRenderer.on('uninstall-error', (event, error) => {
  // Handle uninstall error
  console.error('Uninstall error:', error)
})

// Export for potential use
export default app 