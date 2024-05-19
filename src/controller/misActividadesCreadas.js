const good = document.querySelector(".alert-success");
const container = document.querySelector(".col-md-8.data");
const menssage = document.querySelector(".message");
const listaUsuarios = document.querySelector(".list-group");

good.style.display = "none";
menssage.style.display = "none";
let total = 0;
let auxTotal = 0;

mostrarJwt().then((jwt) => {
  console.log(jwt);

  const headers = {
    "Content-Type": "application/json",
    Authorization: jwt,
  };

  axios
    .get(`${API_URL}/activity/getActivityUser`, {
      headers: headers,
    })
    .then((response) => {
      console.log(response.data);

      let html = "";
      total = response.data.length;
      for (let x = 0; x < response.data.length; x++) {
        html +=
          `<div class="card">` +
          `<div class="card-header d-flex custonFlex"><span>${response.data[x].name}</span><span>${response.data[x].creator.nick}</span></div>` +
          `<div class="card-body">` +
          `<h5 class="card-title">${response.data[x].summary}</h5>` +
          `<p class="card-text">${response.data[x].description}</p>` +
          `<a href="#" class="btn btn-danger borrar btnCuston" id="borrar-${response.data[x].id}" >Borrar</a>` +
          `<a href="#" class="btn btn-primary masInformacion btnCuston" id="mostrar-${response.data[x].id}">Más información</a>` +
          `<a href="#" class="btn btn-primary btnCuston mostrar" id="mostrar-${response.data[x].id}">Usuarios inscriptos</a>` +
          `<a href="#" class="btn btn-primary btnCuston editar" id="editar-${response.data[x].id}">Editar</a>` +
          `</div>` +
          `</div>`;
      }

      if (response.data.length == 0) {
        good.style.display = "block";
      } else {
        container.innerHTML = html;
      }

      //borrar inscripciones
      const borrarDatos = document.querySelectorAll(".borrar");
      borrarDatos.forEach((elemento) => {
        elemento.addEventListener("click", function () {
          // Obtener el ID del elemento actual
          let id = this.id;
          let separado = id.split("-");
          separado[1];

          const data = {
            id: separado[1],
          };
          axios
            .delete(`${API_URL}/activity/deleteActivity?id=${separado[1]}`, {
              headers: headers,
            })
            .then((response) => {
              console.log(response.data);
              good.style.display = "block";
              good.textContent = response.data;
              //prueba
              const contenedor = elemento.parentNode.parentNode;
              contenedor.style.display = "none";
              //fin prueba
              auxTotal++;
              console.log("total: " + total + " aux: " + auxTotal);
              setTimeout(function () {
                good.style.display = "none";
              }, 2000);
              if (total == auxTotal) {
                menssage.style.display = "block";
              }
            })
            .catch((error) => {
              console.error("Error al hacer la petición:", error);
            });
        });
      });

      //mostrar usuarios
      const mostrarUsuarios = document.querySelectorAll(".mostrar");
      mostrarUsuarios.forEach((elemento) => {
        elemento.addEventListener("click", function () {
          // Obtener el ID del elemento actual
          let id = this.id;
          let separado = id.split("-");
          separado[1];
          console.log(id);
          let htmlUsuariosLista = "";
          for (let x = 0; x < response.data.length; x++) {
            if (response.data[x].id == separado[1]) {
              if (response.data[x].users.length == 0) {
                htmlUsuariosLista += `<a href="#" class="list-group-item list-group-item-action">Sin resultados</a>`;
              } else {
                for (let y = 0; y < response.data[x].users.length; y++) {
                  htmlUsuariosLista += `<a href="#" class="list-group-item list-group-item-action">${response.data[x].users[y].nick}</a>`;
                }
              }
              listaUsuarios.innerHTML = htmlUsuariosLista;
            }
          }
        });
      });

      //mas información
      const masInformacion = document.querySelectorAll(".masInformacion");
      masInformacion.forEach((elemento) => {
        elemento.addEventListener("click", function () {
          // Obtener el ID del elemento actual
          let id = this.id;
          let separado = id.split("-");
          separado[1];
          console.log(id);
          saveIdActivity(separado[1]);
          changeViewModal();          
        });
      });

      //mas información
      const editar = document.querySelectorAll(".editar");
      editar.forEach((elemento) => {
        elemento.addEventListener("click", function () {
          // Obtener el ID del elemento actual
          let id = this.id;
          let separado = id.split("-");
          separado[1];
          console.log(id);
          saveIdActivity(separado[1]);
          changeViewModalUpdate();          
        });
      });

    })
    .catch((error) => {
      console.error("Error al hacer la petición:", error);
    });
});
