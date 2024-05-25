const func = async () => {
  const response = await window.versions.ping();
  console.log(response); // prints out 'pong'
};

const crearJwt = async (nombreCookie) => {
  const response = await window.jwt.crearJwt(nombreCookie);
};

const mostrarJwt = async () => {
  const response = await window.jwt.mostrarJwt();
  return response;
};

const changeHtml = async (html) => {
  const response = await window.access.changeHtml(html);
};

const addMenu = async () => {
  const response = await window.access.addMenu();
};

const addMenuRol1 = async () => {
  const response = await window.access.addMenuRol1();
};

const addMenuRol2 = async () => {
  const response = await window.access.addMenuRol2();
};

const addMenuRol3 = async () => {
  const response = await window.access.addMenuRol3();
};

const saveJson = async (json) => {
  const response = await window.json.saveJson(json);
};

const showJson = async () => {
  const response = await window.json.showJson();
  return response;
};

const saveIdActivity = async (id) => {
  const response = await window.activity.saveIdActivity(id);
};

const showIdActivity = async () => {
  const response = await window.activity.showIdActivity();
  return response;
};

const changeViewModal = async () => {
  const response = await window.activity.changeViewModal();
};

const changeViewModalUpdate = async () => {
  const response = await window.activity.changeViewModalUpdate();
};

const changeViewModalUserPerfil = async () => {
  const response = await window.activity.changeViewModalUserPerfil();
};

const showStyle = async () => {
  const response = await window.activity.showStyle();
  return response;
};