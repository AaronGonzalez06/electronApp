const cambioTitulo = document.querySelector("#cambioTitulo");
//datos personales
showJson().then((response) => {
  const dataUser = JSON.parse(response);
  document.querySelector("#nick").textContent = dataUser.nick;
  document.querySelector("#email").textContent = dataUser.email;
  document.querySelector("#nombre").textContent = dataUser.name;
  document.querySelector("#apellido").textContent = dataUser.surname;
  document.querySelector("#telefono").textContent = dataUser.phone;
  document.querySelector("#provincia").textContent = dataUser.province;
});

//mis post
mostrarJwt().then((jwt) => {
  const misPost = document.querySelector("#misPost");

  const headers = {
    "Content-Type": "application/json",
    Authorization: jwt,
  };

  axios
    .get(`${API_URL}/post/getPostUser`, {
      headers: headers,
    })
    .then((response) => {
      console.log(response.data);

      if (response.data.length != 0) {
        let html = "";

        for (let x = 0; x < response.data.length; x++) {
          html +=
            `<div class="card">` +
            `<div class="card-header d-flex custonFlex"><span>${response.data[x].user.nick}</span><span>${response.data[x].date}</span></div>` +
            `<div class="card-body">` +
            `<h5 class="card-title">${response.data[x].title}</h5>` +
            `<p class="card-text">${response.data[x].text}</p>` +
            `</div>` +
            `</div>`;
        }

        misPost.innerHTML = html;
      } else {
        misPost.innerHTML =
          '<div class="alert alert-primary" role="alert">Sin post.</div>';
      }
    })
    .catch((error) => {
      console.error("Error al hacer la petición:", error);
    });
});

//poner mis inscripciones o mis actividades
showJson().then((response) => {
  const userData = JSON.parse(response);
  const actividadesElemento = document.querySelector("#actividades");
  if (userData.rol == 1) {
    //mostrar mis inscripciones
    mostrarJwt().then((jwt) => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: jwt,
      };

      axios
        .get(`${API_URL}/activity/getInscriptions`, {
          headers: headers,
        })
        .then((response) => {
          let html = "";
          total = response.data.length;
          for (let x = 0; x < response.data.length; x++) {
            html +=
              `<div class="card">` +
              `<div class="card-header d-flex custonFlex"><span>${response.data[x].name}</span><span>${response.data[x].creator.nick}</span></div>` +
              `<div class="card-body">` +
              `<h5 class="card-title">${response.data[x].summary}</h5>` +
              `<p class="card-text">${response.data[x].description}</p>` +
              `<a href="#" id="mostrar-${response.data[x].id}" class="btn btn-primary btnCuston masInformacion">Más información</a>` +
              `</div>` +
              `</div>`;
          }

          if (response.data.length == 0) {
            actividadesElemento.innerHTML =
              '<div class="alert alert-primary" role="alert">Sin inscripciones.</div>';
          } else {
            actividadesElemento.innerHTML = html;
          }
          //mas información
        const masInformacion = document.querySelectorAll(".masInformacion");
        masInformacion.forEach((elemento) => {
          elemento.addEventListener("click", function () {
            // Obtener el ID del elemento actual
            console.log(this)
            let id = this.id;
            let separado = id.split("-");
            separado[1];
            console.log(id);
            saveIdActivity(separado[1]);
            changeViewModal();          
          });
        });
        })
        .catch((error) => {
          console.error("Error al hacer la petición:", error);
        });
    });
  } else if (userData.rol == 2) {
    //activiades creadas
    cambioTitulo.innerHTML = "Ultimas actividades";
    mostrarJwt().then((jwt) => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: jwt,
      };

      axios
        .get(`${API_URL}/activity/getActivityUser`, {
          headers: headers,
        })
        .then((response) => {
          let html = "";
          total = response.data.length;
          for (let x = 0; x < response.data.length; x++) {
            html +=
              `<div class="card">` +
              `<div class="card-header d-flex custonFlex"><span>${response.data[x].name}</span><span>${response.data[x].creator.nick}</span></div>` +
              `<div class="card-body">` +
              `<h5 class="card-title">${response.data[x].summary}</h5>` +
              `<p class="card-text">${response.data[x].description}</p>` +
              `<a href="#" id="mostrar-${response.data[x].id}" class="btn btn-primary btnCuston masInformacion">Más información</a>` +
              `</div>` +
              `</div>`;
          }

          if (response.data.length == 0) {
            actividadesElemento.innerHTML =
              '<div class="alert alert-primary" role="alert">Sin actividades creadas.</div>';
          } else {
            actividadesElemento.innerHTML = html;
          }
          //mas información
        const masInformacion = document.querySelectorAll(".masInformacion");
        masInformacion.forEach((elemento) => {
          elemento.addEventListener("click", function () {
            // Obtener el ID del elemento actual
            console.log(this)
            let id = this.id;
            let separado = id.split("-");
            separado[1];
            console.log(id);
            saveIdActivity(separado[1]);
            changeViewModal();          
          });
        });
        })
        .catch((error) => {
          console.error("Error al hacer la petición:", error);
        });
    });
  }
});
