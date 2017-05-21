const electron = require('electron')
const {app, BrowserWindow} = electron
var net = require('net')

let win = null;

app.on('ready', () => {
  win = new BrowserWindow({width: 1000, height: 650})
  win.loadURL('file://'+__dirname+"/app/index.html")
  win.setMenu(null)
  //win.webContents.openDevTools()
})
