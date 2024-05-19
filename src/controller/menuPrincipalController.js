//document.addEventListener("DOMContentLoaded", function() {
//});
const container = document.querySelector(".col-md-8.data");
const good = document.querySelector(".alert-success");
good.style.display = "none";

showJson().then((JsonGuardado) => {
  const dataUserLocal = JSON.parse(JsonGuardado);
  mostrarJwt().then((jwt) => {
    console.log(jwt);

    const headers = {
      "Content-Type": "application/json",
      Authorization: jwt,
    };
    axios
      .get(`${API_URL}/activity/getActivitiesAll`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        let html = "";
        let htmlBtn = "";
        let fechaActual = new Date();

        for (let x = 0; x < response.data.length; x++) {
          if (new Date(response.data[x].date) >= fechaActual && response.data[x].total >0) {
            htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
          }
          if (response.data[x].users.length != 0) {
            for (let y = 0; y < response.data[x].users.length; y++) {
              if (response.data[x].users[y].nick == dataUserLocal.nick) {
                if (new Date(response.data[x].date) >= fechaActual && response.data[x].total >0) {
                  htmlBtn = `<button href="#" class="btn btn-warning inscribirme btnCuston suscrito" id="inscribirme-${response.data[x].id}" >Desinscribirme</button>`;
                }
                break;
              }
            }
          } else {
            if (new Date(response.data[x].date) >= fechaActual && response.data[x].total >0) {
              htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
            }
          }

          let free = "NO";

          if(response.data[x].hourlyPrice == 0 && response.data[x].activityprice == 0){
            free = "YES";
          }

          html +=
            `<div class="card animate__backInLeft">` +
            `<div class="card-header d-flex custonFlex"><span>${response.data[x].name}</span><span>${response.data[x].creator.nick}</span></div>` +
            `<div class="card-body">` +
            `<span class="d-flex ">`+
            `<span class="col-md-7">`+
            `<h5 class="card-title">${response.data[x].summary}</h5>` +
            `<p class="card-text">${response.data[x].description}</p>` +
            `</span>`+
            `<span class="col">`+
            `<ul class="list-group list-group-flush"><li class="list-group-item">Fecha: ${response.data[x].date} </li><li class="list-group-item">Cantidad: ${response.data[x].total} </li><li class="list-group-item">Hora inicio: ${response.data[x].startTime} </li><li class="list-group-item">Hora fin: ${response.data[x].endTime}</li><li class="list-group-item">Free: ${free} </li></ul>`+
            `</span>`+
            `</span>`+
            htmlBtn +
            `<a href="#" id="mostrar-${response.data[x].id}" class="btn btn-primary btnCuston masInformacion">Más información</a>` +
            `</div>` +
            `</div>`;
            htmlBtn="";
        }

        container.innerHTML = html;

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


        //lógica de las inscripciones
        let elementos = document.querySelectorAll(".inscribirme");

        console.log(elementos);
        elementos.forEach(function (elemento) {
          elemento.addEventListener("click", function () {
            // Obtener el ID del elemento actual
            let id = this.id;
            let separado = id.split("-");
            separado[1];

            mostrarJwt().then((jwt) => {
              const headers = {
                "Content-Type": "application/json",
                Authorization: jwt,
              };

              const data = {
                id: separado[1],
              };

              if (elemento.classList.contains("suscrito")) {
                console.log("estoy inscrito");
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
                    //cambio de estilo
                    elemento.innerHTML = "Inscribirme";
                    elemento.classList.remove("suscrito");
                    elemento.classList.add("noSuscrito");
                    elemento.classList.remove("btn-warning");
                    elemento.classList.add("btn-primary");
                    //fin cambio de estilo
                    setTimeout(function () {
                      good.style.display = "none";
                    }, 2000);
                  })
                  .catch((error) => {
                    console.error("Error al hacer la petición:", error);
                  });
              } else if (elemento.classList.contains("noSuscrito")) {
                axios
                  .get(`${API_URL}/activity/addInscriptions`, {
                    params: data,
                    headers: headers,
                  })
                  .then((response) => {
                    console.log(response.data);
                    good.style.display = "block";
                    good.textContent = response.data;
                    //cambio de estilo
                    elemento.innerHTML = "Desinscribirme";
                    elemento.classList.remove("noSuscrito");
                    elemento.classList.add("suscrito");
                    elemento.classList.remove("btn-primary");
                    elemento.classList.add("btn-warning");
                    //fin cambio de estilo
                    setTimeout(function () {
                      good.style.display = "none";
                    }, 2000);
                  })
                  .catch((error) => {
                    console.error("Error al hacer la petición:", error);
                    good.style.display = "block";
                    good.textContent = error.response.data;
                    setTimeout(function () {
                      good.style.display = "none";
                    }, 2000);
                  });
              }
            });
          });
        });
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });
  });
});
