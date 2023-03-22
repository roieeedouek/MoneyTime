// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const { ipcMain } = require('electron')
const remoteMain = require('@electron/remote/main');
const ElectronPreferences = require('electron-preferences');

remoteMain.initialize();

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 280,
    height: 100,
    frame: false,
    resizable: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  remoteMain.enable(mainWindow.webContents);
  // Open the DevTools.
  //win.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // When UI has finish loading
  mainWindow.webContents.on('did-finish-load', () => {
    // Send the timer value
    mainWindow.webContents.send('timer-change', 255);
    console.log('timer-change')
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })


  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


const preferences = new ElectronPreferences({
  // Override default preference BrowserWindow values
  browserWindowOverrides: { /* ... */ },

  // Provide a custom CSS file, relative to your appPath.
  // css: 'preference-styles.css',

  // Preference file path
  dataStore: '~/preferences.json',

  // Preference default values
  defaults: {
    pay: {
      pph: 35,
      cashSymbol: "₪",
      125: 8,
      150: 10,
      200: 12
    },
    themeSettings: {
      text_color: "#ff2522",
      background_color: "#000",
      shadow1_color: "#000",
      shadow2_color: "#ff2522"
    }
  },

  // Preference sections visible to the UI
  sections: [
    {
      id: 'pay',
      label: 'Pay Settings',
      icon: 'briefcase-24', // See the list of available icons below
      form: {
        groups: [
          {
            'label': 'Pay Settings', // optional
            'fields': [
              {
                label: 'Pay Per Hour',
                key: 'pph',
                type: 'number',
                help: 'Enter Base Pay Per Hour'
              },
              {
                label: 'Symbol',
                key: 'cashSymbol',
                type: 'text',
                help: 'Enter Money Symbol'
              },
              {
                label: 'x1.25 Overtime',
                key: '125',
                type: 'number',
                help: 'Enter Number of hours to start x1.25 overtime'
              },
              {
                label: 'x1.5 Overtime',
                key: '150',
                type: 'number',
                help: 'Enter Number of hours to start x1.5 overtime'
              },
              {
                label: 'x2 Overtime',
                key: '200',
                type: 'number',
                help: 'Enter Number of hours to start x2 overtime'
              },
              {
                label: 'x2.5 Overtime',
                key: '250',
                type: 'number',
                help: 'Enter Number of hours to start x2.5 overtime'
              },
              {
                label: 'x3 Overtime',
                key: '300',
                type: 'number',
                help: 'Enter Number of hours to start x3 overtime'
              }
            ]
          },
          // ...
        ]
      }
    },
    {
      id: 'themeSettings',
      label: 'Theme',
      icon: 'brightness-6', // See the list of available icons below
      form: {
        groups: [
          {
            'label': 'Theme Colors', // optional
            'fields': [
              {
                label: 'Text Color',
                key: 'text_color',
                type: 'color',
                format: 'hex', // can be hex, hsl or rgb
                help: 'Main Text Color',
              },
              {
                label: 'Background Color',
                key: 'background_color',
                type: 'color',
                format: 'hex', // can be hex, hsl or rgb
                help: 'Background Color',
              },
              {
                label: 'Shadow Color 1',
                key: 'shadow1_color',
                type: 'color',
                format: 'hex', // can be hex, hsl or rgb
                help: 'Shadow Color One',
              },
              {
                label: 'Shadow Color 2',
                key: 'shadow2_color',
                type: 'color',
                format: 'hex', // can be hex, hsl or rgb
                help: 'Shadow Color Two',
              },
            ]
          },
          // ...
        ]
      }
    },
    // ...
  ]
})

preferences.on('save', (preferences) => {
  console.log(`Preferences were saved.`, JSON.stringify(preferences, null, 4));
});

