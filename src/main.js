import { app, BrowserWindow } from "electron";
import os from "os";
import path from "path";
import express from "express";
import apiRouter from "./apiRouter";
import morgan from "morgan";
import { startServer } from "./server";

let logger = morgan("dev");

// const webApp = express();
// const apiPort = 3001;

// const webServer = webApp.listen(apiPort);

// console.log(`API on port: ${apiPort}`);

// webApp.use(logger);

// webApp.use(express.json()); // for parsing application/json
// webApp.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// webApp.use("/api", apiRouter);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  if (!process.env.DEV) {
    startServer();
  }
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      devTools: true,
      preload: path.join(__dirname, "preload.js"), // add "preload"
    },
  });

  // and load the index.html of the app.
  if (process.env.DEV) {
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  } else {
    mainWindow.loadURL("http://127.0.0.1:3007/main_window");
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// const reactDevToolsPath = path.join(
//   os.homedir(),
//   "/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.24.3_1"
// );
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  // await session.defaultSession.loadExtension(reactDevToolsPath);
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
