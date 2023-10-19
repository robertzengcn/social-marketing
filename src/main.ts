const { app, ipcMain, dialog, BrowserWindow, Menu, MenuItem, shell} = require("electron");

function createPanel() {

	const mainWindow = new BrowserWindow({
		width         : 700,
		minWidth      : 600,
		height        : 600,
		minHeight     : 600,
		fullscreenable: false,
		title         : "Social Marketing Tool",
		webPreferences: {
			nodeIntegration : true,
			contextIsolation: false
		}
	});

	mainWindow.loadFile("src/view/index.html");

	mainWindow.webContents.on("did-finish-load", () => {
		mainWindow.webContents.send("default-path", app.getPath("downloads") || __dirname);
	});

	//mainWindow.setPosition(0, 0, true);

	// Open the DevTools.
	//mainWindow.webContents.openDevTools();

	
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createPanel();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});