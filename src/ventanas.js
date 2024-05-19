const { BrowserWindow, Menu } = require("electron/main");
const path = require("node:path");
const Store = require("electron-store");
const url = require('url');

let win;
let winDatosUpdate;
let addPost;
let addMessage;
let addActivity;
let verMisDatos;
let verMisPost;
let verMisInscripciones;
let verMasSobreActividad;
let editarActividad;
let perfilUsuario;

const createWindowperfilUsuario = () => {
  perfilUsuario = new BrowserWindow({
    width: 1100,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  perfilUsuario.setMenu(null);
  //Menu.setApplicationMenu(developerMenu);
  //editarActividad.loadFile("views/activity/editarActividad.html");
  perfilUsuario.loadURL(url.format({
    pathname: path.join(__dirname, 'views/user/perfilUsuario.html'),
    protocol: 'file:',
    slashes: true
  }));
};

const createWindoweditarActividad = () => {
  editarActividad = new BrowserWindow({
    width: 1000,
    height: 950,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  editarActividad.setMenu(null);
  //Menu.setApplicationMenu(developerMenu);
  //editarActividad.loadFile("views/activity/editarActividad.html");
  editarActividad.loadURL(url.format({
    pathname: path.join(__dirname, 'views/activity/editarActividad.html'),
    protocol: 'file:',
    slashes: true
  }));
};

const createWindowverMasSobreActividad = () => {
  verMasSobreActividad = new BrowserWindow({
    width: 1050,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  verMasSobreActividad.setMenu(null);
  //verMasSobreActividad.loadFile("views/activity/masInformacion.html");
  verMasSobreActividad.loadURL(url.format({
    pathname: path.join(__dirname, 'views/activity/masInformacion.html'),
    protocol: 'file:',
    slashes: true
  }));
};

const createWindowverMisInscripciones = () => {
  verMisInscripciones = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  verMisInscripciones.setMenu(null);
  //verMisInscripciones.loadFile("views/activity/misInscripciones.html");
  verMisInscripciones.loadURL(url.format({
    pathname: path.join(__dirname, 'views/activity/misInscripciones.html'),
    protocol: 'file:',
    slashes: true
  }));
};

const createWindowverMisPost = () => {
  verMisPost = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  verMisPost.setMenu(null);
  //verMisPost.loadFile("views/post/misPost.html");
  verMisPost.loadURL(url.format({
    pathname: path.join(__dirname, 'views/post/misPost.html'),
    protocol: 'file:',
    slashes: true
  }));
};
const createWindowDatosUpdate = () => {
  winDatosUpdate = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  winDatosUpdate.setMenu(null);
  //winDatosUpdate.loadFile("views/user/update.html");
  winDatosUpdate.loadURL(url.format({
    pathname: path.join(__dirname, 'views/user/update.html'),
    protocol: 'file:',
    slashes: true
  }));
};

const createWindowaddPost = () => {
  addPost = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  addPost.setMenu(null);
  //addPost.loadFile("views/post/add.html");
  addPost.loadURL(url.format({
    pathname: path.join(__dirname, 'views/post/add.html'),
    protocol: 'file:',
    slashes: true
  }));
};

const createWindowaddMessage = () => {
  addMessage = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  addMessage.setMenu(null);
  //addMessage.setMenu(developerMenu);
  //Menu.setApplicationMenu(developerMenu);
  //addMessage.loadFile("views/message/add.html");
  addMessage.loadURL(url.format({
    pathname: path.join(__dirname, 'views/message/add.html'),
    protocol: 'file:',
    slashes: true
  }));
};

const createWindowaddActivity = () => {
  addActivity = new BrowserWindow({
    width: 1000,
    height: 950,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  addActivity.setMenu(null);
  //addActivity.loadFile("views/activity/add.html");
  addActivity.loadURL(url.format({
    pathname: path.join(__dirname, 'views/activity/add.html'),
    protocol: 'file:',
    slashes: true
  }));
};

const createWindowverMisDatos = () => {
  verMisDatos = new BrowserWindow({
    width: 1000,
    height: 950,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  verMisDatos.setMenu(null);
  //verMisDatos.loadFile("views/user/verMisDatos.html");
  verMisDatos.loadURL(url.format({
    pathname: path.join(__dirname, 'views/user/verMisDatos.html'),
    protocol: 'file:',
    slashes: true
  }));
};

const createWindow = (aplication) => {
  win = new BrowserWindow({
    width: 1450,
    height: 1000,
    closable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  //win.loadFile("views/index.html");
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'views/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  const template = [
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Salir',
          click: () => {
            aplication.quit();
          }
        }
      ]
    }
  ];
  
  // Construir el menú a partir del template
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  //Menu.setApplicationMenu(developerMenu);
};

const cambioHtml = (html) => {
  //win.loadFile(html);
  win.loadURL(url.format({
    pathname: path.join(__dirname, html),
    protocol: 'file:',
    slashes: true
  }));
  //quitar cuando este todo el menu principal casi acabado
  //Menu.setApplicationMenu(developerMenu);
};

const cambioHtmlCerrarSession = (aplication) => {
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'views/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  const template = [
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Salir',
          click: () => {
            aplication.quit();
          }
        }
      ]
    }
  ];
  
  // Construir el menú a partir del template
  const menu = Menu.buildFromTemplate(template);
  
  // Establecer el menú como el menú de la aplicación
  Menu.setApplicationMenu(menu);
};

module.exports = {
  createWindow,
  createWindowDatosUpdate,
  createWindowaddPost,
  cambioHtml,
  createWindowaddMessage,
  createWindowaddActivity,
  createWindowverMisDatos,
  createWindowverMisPost,
  createWindowverMisInscripciones,
  createWindowverMasSobreActividad,
  createWindoweditarActividad,
  cambioHtmlCerrarSession,
  createWindowperfilUsuario
};

//añadir menu dev cuando sea necesario
const developerMenu = Menu.buildFromTemplate([
  {
    label: "Developer",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      { role: "toggleDevTools" },
    ],
  },
]);
//Menu.setApplicationMenu(developerMenu);

