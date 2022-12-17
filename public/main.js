const electron = require("electron");
const app = electron.app;
const {execFileSync} = require('child_process');
const BrowserWindow = electron.BrowserWindow;


const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ 
    width: 900, 
    height: 680,
    icon: path.join(__dirname, 'software_icon.png'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, '../src/server.js')
    },
  });
  
  mainWindow.loadURL(
    `file://${path.join(__dirname, "/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});


