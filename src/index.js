const {
  app,
  dialog,
  ipcMain,
  nativeImage,
  BrowserWindow
} = require('electron');
const { appTitle, userAgent } = require('./env');
const path = require('path');
const createTray = require('./tray');

let preventTitleChange = false;
let tray;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    title: 'NotionLX',
    icon: path.join(__dirname, 'icons/notion-icon.png'),
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.setMenu(null);

  tray = createTray(app, win);

  win.loadURL('https://www.notion.so/login', {
    'userAgent': userAgent
  }).then(async () => {
    preventTitleChange = false;
    win.setTitle(appTitle);
    preventTitleChange = true;
  });

  win.on('page-title-updated', (event) => {
    if (preventTitleChange) {
      event.preventDefault();
      preventTitleChange = false;
      win.setTitle(appTitle);
      preventTitleChange = true;
    }
  });

  ipcMain.on('renderTray', function (event, data) {
    const img = nativeImage.createFromDataURL(data);
    tray.setImage(img);
  });

  win.on('close', (event) => {
    event.preventDefault();
    let res = dialog.showMessageBoxSync(win, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Exit?',
      message: 'Are you sure you want to exit NotionLX?'
    });

    if (res == 0) {
      app.exit();
    }
  });
}

app.whenReady().then(createWindow);