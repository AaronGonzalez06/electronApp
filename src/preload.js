const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  // también podemos exponer variables, no solo funciones
});

contextBridge.exposeInMainWorld("access", {
  changeHtml: (html) => ipcRenderer.invoke("changeHtml", html),
  addMenu: () => ipcRenderer.invoke("addMenu"),
  addMenuRol1: () => ipcRenderer.invoke("addMenuRol1"),
  addMenuRol2: () => ipcRenderer.invoke("addMenuRol2"),
});

contextBridge.exposeInMainWorld("jwt", {
  crearJwt: (jwt) => ipcRenderer.invoke("crearJwt", jwt),
  mostrarJwt: () => ipcRenderer.invoke("mostrarJwt"),
});

contextBridge.exposeInMainWorld("json", {
  saveJson: (json) => ipcRenderer.invoke("saveJson", json),
  showJson: () => ipcRenderer.invoke("showJson"),
});

contextBridge.exposeInMainWorld("activity", {
  saveIdActivity: (id) => ipcRenderer.invoke("saveIdActivity", id),
  showIdActivity: () => ipcRenderer.invoke("showIdActivity"),
  changeViewModal: () => ipcRenderer.invoke("changeViewModal"),
  changeViewModalUpdate: () => ipcRenderer.invoke("changeViewModalUpdate"),
  changeViewModalUserPerfil: () => ipcRenderer.invoke("changeViewModalUserPerfil"),
  showStyle: () => ipcRenderer.invoke("showStyle")
});
