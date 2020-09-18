const { Tray, Menu } = require('electron');
const { appTitle } = require('./env');
const path = require('path');

function toggleVisibility(win) {
  if (win.isVisible()) win.hide();
  else win.show();
}

function getTrayMenu(app, win) {
  let visibilityLabel = `Show/Hide ${appTitle}`;
  return [{
    label: visibilityLabel,
    click: () => toggleVisibility(win)
  }, {
    label: 'Quit',
    click: function () {
      app.isQuiting = true;
      app.quit();
    }
  }];
}

function createTray(app, win) {
  const tray = new Tray(path.join(__dirname, 'icons/notion-icon.png'));
  const menu = Menu.buildFromTemplate(getTrayMenu(app, win));

  tray.setTitle(appTitle);
  tray.setToolTip(appTitle);
  tray.on('click', () => toggleVisibility(win));
  tray.setContextMenu(menu);
}

module.exports = createTray;