const { app, dialog, BrowserWindow } = require('electron');
const path = require('path');

let preventTitleChange = false;
const appTitle = 'NotionLX';
const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36';

function createWindow () {
  // Crea la ventana del navegador.
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

  win.loadURL('https://www.notion.so/login', {'userAgent': userAgent}).then(async () => {
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
