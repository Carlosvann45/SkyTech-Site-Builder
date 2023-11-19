import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import fs from "fs";
import { mkdir } from "fs/promises";
import FileOperations from "./utils/FileOperations";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
/**
 * @name createWindow
 * @description creates window for app
 */
function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(
      process.env.ELECTRON_START_URL ??
        path.join(process.env.DIST, "index.html"),
    );
    // win.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  win.setMenu(null);
  win.webContents.openDevTools();
}

/**
 * @name createHandlers
 * @description handles creating ipc main handlers to communicate with render
 */
function createHandlers() {
  ipcMain.handle("file:exportSite", (_, project: string) =>
    FileOperations.exportSite(win, project),
  );
  ipcMain.handle("file:getTemplates", () => FileOperations.getTemplates());
  ipcMain.handle("file:getTemplate", (_, name: string) =>
    FileOperations.getTemplate(name),
  );
  ipcMain.handle("file:getProjects", () => FileOperations.getProjects());
  ipcMain.handle("file:createProject", (_, name: string) =>
    FileOperations.createProject(name),
  );
  ipcMain.handle("file:createTemplate", (_, template: any, container: any) =>
    FileOperations.createTemplate(template, container),
  );
  ipcMain.handle("file:getPages", (_, project: string) =>
    FileOperations.getPages(project),
  );
  ipcMain.handle(
    "file:createPage",
    (_, project: string, page: any, template: any) =>
      FileOperations.createPage(project, page, template),
  );
  ipcMain.handle("file:getWebComponentFiles", () =>
    FileOperations.getWebComponentFiles(),
  );
  ipcMain.handle("file:getWebComponentProperties", () =>
    FileOperations.getWebComponentProperties(),
  );
  ipcMain.handle(
    "file:updatePageComponents",
    (_, project: string, page: string, components: any) =>
      FileOperations.updatePageComponents(project, page, components),
  );
  ipcMain.handle(
    "file:updateTemplateComponents",
    (_, template: string, components: any) =>
      FileOperations.updateTemplateComponents(template, components),
  );
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * @name createDataFolder
 * @description handles creating project folders if they dont exists
 * @param mainFolder first folder of path
 * @param subFolder second folder of path
 */
function createDataFolder(mainFolder: any, subFolder: any) {
  let appDataFolder = __dirname as any;

  switch (process.platform) {
    case "darwin":
      appDataFolder = path.join(
        process.env.HOME as any,
        "Library",
        "Application Support",
      );
      break;
    case "win32":
      appDataFolder = process.env.APPDATA;
      break;
    case "linux":
      appDataFolder = process.env.HOME;
      break;
  }

  if (!fs.existsSync(path.join(appDataFolder, mainFolder))) {
    (async () => {
      await mkdir(path.join(appDataFolder, mainFolder));
      await mkdir(path.join(appDataFolder, mainFolder, subFolder));
    })();
  } else if (!fs.existsSync(path.join(appDataFolder, mainFolder, subFolder))) {
    (async () => {
      await mkdir(path.join(appDataFolder, mainFolder, subFolder));
    })();
  }
}

/**
 * Handles setting up app
 */
app.whenReady().then(() => {
  createDataFolder("skytech-site-builder", "projects_data");
  createDataFolder("skytech-site-builder", "template_data");
  createWindow();
  createHandlers();
});
