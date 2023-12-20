// main.js

// Modules to control application life and create native browser window
const { app, BrowserView, BrowserWindow } = require('electron')

const path = require('node:path')

let win = null;
let view = null;
let displayed = false;


app.whenReady().then(() => {
  win = new BrowserWindow(
    {
      autoHideMenuBar: true,
      fullscreen: true
  });

  win.loadFile('index.html');

  win.webContents.openDevTools();

  view = new BrowserView();

  win.setBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: 1024, height: 768 });
  view.webContents.loadURL('https://electronjs.org');
});

function displayStuff() {
  console.log('displayStuff');
  if(displayed) {
    win.setBrowserView(null);
  }
  else {
    win.setBrowserView(view);
  }
  displayed = !displayed;

  setTimeout(displayStuff, 1000);
}

setTimeout(displayStuff, 1000);



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.