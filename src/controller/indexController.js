const warnig = document.querySelector(".alert-danger");
warnig.style.display = "none";

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  const data = {
    email: username,
    password: password,
  };
  axios
    .post(`${API_URL}/login/access`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      crearJwt(response.data);
      /*const prueba = mostrarJwt();
      prueba.then((jwt) => {
        console.log(jwt);
      });*/
      //saber que rol es para mostrar un menu u otro
      const data = {
          jwt: response.data
      };
      axios.post(`${API_URL}/login/check`, data)
        .then(response => {

          saveJson(JSON.stringify(response.data))
          // Manejar la respuesta si es necesario
          let rol = response.data.rol;

          if(rol == 1){
            addMenuRol1();
            changeHtml("views/menuPrincipal.html");
          }else if(rol == 2){
            addMenuRol2();
            changeHtml("views/menuPrincipal.html");
          }else if(rol == 3){
            addMenuRol3();
            changeHtml("views/user/listaUsuariosAdmin.html");
          }
          
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
        
    })
    .catch((error) => {
      console.log(error.response.data);
      warnig.style.display = "block";
      warnig.textContent = error.response.data;
      setTimeout(function () {
        warnig.style.display = "none";
      }, 2000);
    });
});
