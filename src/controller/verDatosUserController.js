const changeRol = document.getElementById("changeRol");
const deleteUser = document.getElementById("deleteUser");
const good = document.querySelector(".alert-success");
good.style.display = "none";
showJson().then((response) => {
  console.log(JSON.parse(response));
  const dataJson = JSON.parse(response);

  const nombre = document.getElementById("name");
  const apellido = document.getElementById("surname");
  const telefono = document.getElementById("phone");
  const rol = document.getElementById("rol");
  const provincia = document.getElementById("province");
  const nick = document.getElementById("nick");
  const email = document.getElementById("email");

  nombre.value = dataJson.name;
  apellido.value = dataJson.surname;
  telefono.value = dataJson.phone;
  if (dataJson.rol == 1) {
    rol.value = "Consumidor";
  } else if (dataJson.rol == 2) {
    rol.value = "Ofertante";
    changeRol.style.display = "none";
  }
  provincia.value = dataJson.province;
  nick.value = dataJson.nick;
  email.value = dataJson.email;
});

deleteUser.addEventListener("click", () => {
  mostrarJwt().then((jwt) => {
    console.log(jwt);
    const headers = {
      "Content-Type": "application/json",
      Authorization: jwt,
    };
    axios.delete(`${API_URL}/user/delete`, {
      headers: headers,
    })
    .then(response => {
      console.log('User deleted successfully:', response.data);
    })
    .catch(error => {
      console.error('There was an error deleting the user!', error);
    });
  });
});
