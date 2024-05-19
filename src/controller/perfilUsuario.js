const cambioTitulo = document.querySelector("#cambioTitulo");

showIdActivity().then((response) => {
  console.log("id a llevar: " + response);
  mostrarJwt().then((jwt) => {
    const misPost = document.querySelector("#misPost");

    const headers = {
      "Content-Type": "application/json",
      Authorization: jwt,
    };

    axios
      .get(`${API_URL}/user/getUserData/${response}`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);

        if (response.data.posts.length != 0) {
          let html = "";

          for (let x = 0; x < response.data.posts.length; x++) {
            html +=
              `<div class="card">` +
              `<div class="card-header d-flex custonFlex"><span>${response.data.posts[x].user.nick}</span><span>${response.data.posts[x].date}</span></div>` +
              `<div class="card-body">` +
              `<h5 class="card-title">${response.data.posts[x].title}</h5>` +
              `<p class="card-text">${response.data.posts[x].text}</p>` +
              `</div>` +
              `</div>`;
          }

          misPost.innerHTML = html;
        } else {
          misPost.innerHTML =
            '<div class="alert alert-primary" role="alert">Sin post.</div>';
        }
        //datos personales
        document.querySelector("#nick").textContent = response.data.data.nick;
        document.querySelector("#email").textContent = response.data.data.email;
        document.querySelector("#nombre").textContent = response.data.data.name;
        document.querySelector("#apellido").textContent =
          response.data.data.surname;
        document.querySelector("#telefono").textContent =
          response.data.data.phone;
        document.querySelector("#provincia").textContent =
          response.data.data.province;

        //inscripciones
        const actividadesElemento = document.querySelector("#actividades");
        if (response.data.data.rol == 1) {
          //mostrar mis inscripciones
          let html = "";
          total = response.data.inscription.length;
          for (let x = 0; x < response.data.inscription.length; x++) {
            html +=
              `<div class="card">` +
              `<div class="card-header d-flex custonFlex"><span>${response.data.inscription[x].name}</span><span>${response.data.inscription[x].creator.nick}</span></div>` +
              `<div class="card-body">` +
              `<h5 class="card-title">${response.data.inscription[x].summary}</h5>` +
              `<p class="card-text">${response.data.inscription[x].description}</p>` +
              `<a href="#" id="mostrar-${response.data.inscription[x].id}" class="btn btn-primary btnCuston masInformacion">Más información</a>` +
              `</div>` +
              `</div>`;
          }

          if (response.data.inscription.length == 0) {
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
              console.log(this);
              let id = this.id;
              let separado = id.split("-");
              separado[1];
              console.log(id);
              saveIdActivity(separado[1]);
              changeViewModal();
            });
          });
          /////////////////////////////////////////////////////////
        } else if (response.data.data.rol == 2) {
          //activiades creadas
          cambioTitulo.innerHTML = "Ultimas actividades";
          let html = "";
          total = response.data.activity.length;
          for (let x = 0; x < response.data.activity.length; x++) {
            html +=
              `<div class="card">` +
              `<div class="card-header d-flex custonFlex"><span>${response.data.activity[x].name}</span><span>${response.data.activity[x].creator.nick}</span></div>` +
              `<div class="card-body">` +
              `<h5 class="card-title">${response.data.activity[x].summary}</h5>` +
              `<p class="card-text">${response.data.activity[x].description}</p>` +
              `<a href="#" id="mostrar-${response.data.activity[x].id}" class="btn btn-primary btnCuston masInformacion">Más información</a>` +
              `</div>` +
              `</div>`;
          }

          if (response.data.activity.length == 0) {
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
              console.log(this);
              let id = this.id;
              let separado = id.split("-");
              separado[1];
              console.log(id);
              saveIdActivity(separado[1]);
              changeViewModal();
            });
          });
        }
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });
  });
});
