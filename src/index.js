const { app, BrowserWindow, ipcMain, Menu } = require("electron/main");
const path = require("node:path");
const Store = require("electron-store");
const store = new Store();
const axios = require("axios");

/*let win;
let winDatosUpdate;*/

const {
  createWindow,
  createWindowDatosUpdate,
  cambioHtml,
  createWindowaddPost,
  createWindowaddMessage,
  createWindowaddActivity,
  createWindowverMisDatos,
  createWindowverMisPost,
  createWindowverMisInscripciones,
  createWindowverMasSobreActividad,
  createWindoweditarActividad,
  cambioHtmlCerrarSession,
  createWindowperfilUsuario,
} = require("./ventanas.js");
//si podemos ver los datos nuestros desdde el jwt
const templateMenuRol2 = [
  {
    label: "Datos",
    submenu: [
      {
        label: "Actualizar",
        click: () => {
          createWindowDatosUpdate();
        },
      },
      {
        label: "Ver mis datos",
        click: () => {
          createWindowverMisDatos();
        },
      },
      {
        label: "Cambiar tema",
        click: () => {
          changeStyle();
        },
      },
    ],
  },
  {
    label: "Post",
    submenu: [
      {
        label: "Nuevos post",
        click: () => {
          createWindowaddPost();
        },
      },
      {
        label: "Mis post",
        click: () => {
          createWindowverMisPost();
        },
      },
    ],
  },
  {
    label: "Mensajes",
    submenu: [
      {
        label: "Enviar mensaje",
        click: () => {
          createWindowaddMessage();
        },
      },
    ],
  },
  {
    label: "Actividades",
    submenu: [
      {
        label: "Crear",
        click: () => {
          createWindowaddActivity();
        },
      },
      {
        label: "Mis inscripciones",
        click: () => {
          createWindowverMisInscripciones();
        },
      },
    ],
  },
  {
    label: "Sesión",
    submenu: [
      {
        label: "Cerrar sesión.",
        click: () => {
          cambioHtmlCerrarSession(app);
          deleteSession();
        },
      },
    ],
  },
];

const templateMenuRol1 = [
  {
    label: "Datos",
    submenu: [
      {
        label: "Actualizar",
        click: () => {
          createWindowDatosUpdate();
        },
      },
      {
        label: "Ver mis datos",
        click: () => {
          createWindowverMisDatos();
        },
      },
      {
        label: "Cambiar tema",
        click: () => {
          changeStyle();
        },
      },
    ],
  },
  {
    label: "Post",
    submenu: [
      {
        label: "Nuevos post",
        click: () => {
          createWindowaddPost();
        },
      },
      {
        label: "Mis post",
        click: () => {
          createWindowverMisPost();
        },
      },
    ],
  },
  {
    label: "Mensajes",
    submenu: [
      {
        label: "Enviar mensaje",
        click: () => {
          createWindowaddMessage();
        },
      },
    ],
  },
  {
    label: "Actividades",
    submenu: [
      {
        label: "Mis inscripciones",
        click: () => {
          createWindowverMisInscripciones();
        },
      },
    ],
  },
  {
    label: "Sesión",
    submenu: [
      {
        label: "Cerrar sesión.",
        click: () => {
          cambioHtmlCerrarSession(app);
          deleteSession();
        },
      },
    ],
  },
];

//comentar cuando lo pasemos a .exe
/*if (process.env.NODE_ENV !== "production") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "../node_modules", ".bin", "electron"),
  });
}*/

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "aaron");
  ipcMain.handle("crearJwt", (event, jwt) => {
    store.set("jwt", jwt);
  });
  ipcMain.handle("mostrarJwt", () => store.get("jwt"));
  ipcMain.handle("changeHtml", (event, html) => {
    //win.loadFile(html)
    cambioHtml(html);
  });
  ipcMain.handle("addMenu", () => {
    Menu.setApplicationMenu(dateMenuRol2);
  });
  ipcMain.handle("addMenuRol1", () => {
    Menu.setApplicationMenu(dateMenuRol1);
  });
  ipcMain.handle("addMenuRol2", () => {
    Menu.setApplicationMenu(dateMenuRol2);
  });
  ipcMain.handle("saveJson", (event, json) => {
    store.set("json", json);
  });
  ipcMain.handle("showJson", () => store.get("json"));

  ipcMain.handle("saveIdActivity", (event, id) => {
    store.set("idActivity", id);
  });
  ipcMain.handle("showIdActivity", () => store.get("idActivity"));
  ipcMain.handle("changeViewModal", () => createWindowverMasSobreActividad());
  ipcMain.handle("changeViewModalUpdate", () => createWindoweditarActividad());
  ipcMain.handle("changeViewModalUserPerfil", () =>createWindowperfilUsuario());
  ipcMain.handle("showStyle", () => store.get("style"));
  

  createWindow(app);
});

const dateMenuRol2 = Menu.buildFromTemplate(templateMenuRol2);
const dateMenuRol1 = Menu.buildFromTemplate(templateMenuRol1);

function deleteSession() {
  const data = store.get("jwt");

  const config = {
    headers: {
      Authorization: data,
    },
  };

  axios
    .get("http://localhost:8080/login/CloserSession", config)
    .then(function (response) {})
    .catch(function (error) {
      console.error(error);
    });
}

function changeStyle() {
  let style = store.get("style");
  if (style === undefined) {
    store.set("style", "../bootstrap/bootstrap.min.css");
  } else if (style === "../bootstrap/bootstrap.min.css") {
    store.set("style", "../bootstrap/bootstrapblack.min.css");
  } else if (style === "../bootstrap/bootstrapblack.min.css") {
    store.set("style", "../bootstrap/bootstrap.min.css");
  }
}
