const good = document.querySelector(".alert-success");
const container = document.querySelector(".container.mt-4");
const menssage = document.querySelector(".menssage");
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
    .get(`${API_URL}/activity/getInscriptions`, {
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
          `<a href="#" id="mostrar-${response.data[x].id}" class="btn btn-primary btnCuston masInformacion">Más información</a>` +
          `</div>` +
          `</div>`;
      }

      if (response.data.length == 0) {
        menssage.style.display = "block";
      } else {
        container.innerHTML = html;
      }

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

      //borrar inscripciones
      const borrarDatos = document.querySelectorAll(".borrar");
      borrarDatos.forEach(function (elemento) {
        elemento.addEventListener("click", function () {
          // Obtener el ID del elemento actual
          let id = this.id;
          let separado = id.split("-");
          separado[1];

          const data = {
            id: separado[1],
          };
          axios
            .delete(
              `${API_URL}/activity/deleteInscriptions?id=${separado[1]}`,
              {
                headers: headers,
              }
            )
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
              if (total == auxTotal) {
                menssage.style.display = "block";
              }
              setTimeout(function () {
                good.style.display = "none";
              }, 2000);
            })
            .catch((error) => {
              console.error("Error al hacer la petición:", error);
            });
        });
      });
    })
    .catch((error) => {
      console.error("Error al hacer la petición:", error);
    });
});
