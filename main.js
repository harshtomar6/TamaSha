const electron = require('electron')
const {app, BrowserWindow} = electron
var net = require('net')

let win = null;

app.on('ready', () => {
  win = new BrowserWindow({width: 1100, height: 650, backgroundColor: '#2A363B', show: false})
  win.loadURL('file://'+__dirname+"/app/index.html")
  win.setMenu(null)
  win.webContents.openDevTools()
  win.on('ready-to-show', () => {
    win.show()
    win.focus()
  })
})
