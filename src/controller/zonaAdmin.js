//document.addEventListener("DOMContentLoaded", function() {
//});
const good = document.querySelector(".alert-success");
good.style.display = "none";
const container = document.querySelector("#usuariosListado");
const buscador = document.querySelector("#buscador");
mostrarJwt().then((jwt) => {
  console.log(jwt);

  const headers = {
    "Content-Type": "application/json",
    Authorization: jwt,
  };
  axios
    .get(`${API_URL}/user/getUsers`, {
      headers: headers,
    })
    .then((response) => {
      console.log(response.data);
      let html = "";
      let baneoHtml = "";
      let datosAux = response.data;

      for (let x = 0; x < response.data.length; x++) {
        if (response.data[x].banned == 0) {
          baneoHtml += `<button type="button" class="btn btn-warning banear" id="banear-${response.data[x].email}">Banear</button>`;
        } else {
          baneoHtml += `<button type="button" class="btn btn-success banear" id="desbanear-${response.data[x].email}">Quitar baneo</button>`;
        }

        html +=
          `<div class="card">` +
          `<div class="card-header d-flex custonFlex"><span>Nick: ${response.data[x].nick} - Email: ${response.data[x].email}</span></div>` +
          `<div class="card-body">` +
          `<div class="btn-group" role="group" aria-label="Basic mixed styles example">` +
          baneoHtml +
          `</div>` +
          `</div>` +
          `</div>`;
        baneoHtml = "";
      }
      container.innerHTML = html;

      //buscador
      buscador.addEventListener("keyup", function (event) {
        let auxEntrar = 0;
        if (buscador.value.length > 2) {
          console.log("debe de buscar");
          let htmlTwo = "";
          baneoHtml = "";
          for (let x = 0; x < response.data.length; x++) {
            if (
              response.data[x].nick
                .toLowerCase()
                .includes(buscador.value.toLowerCase()) ||
              response.data[x].email
                .toLowerCase()
                .includes(buscador.value.toLowerCase())
            ) {
              if (response.data[x].banned == 0) {
                baneoHtml += `<button type="button" class="btn btn-warning banear" id="banear-${response.data[x].email}">Banear</button>`;
              } else {
                baneoHtml += `<button type="button" class="btn btn-success banear" id="desbanear-${response.data[x].email}">Quitar baneo</button>`;
              }
              htmlTwo +=
                `<div class="card">` +
                `<div class="card-header d-flex custonFlex"><span>Nick: ${response.data[x].nick} - Email: ${response.data[x].email}</span></div>` +
                `<div class="card-body">` +
                `<div class="btn-group" role="group" aria-label="Basic mixed styles example">` +
                baneoHtml +
                `</div>` +
                `</div>` +
                `</div>`;
              baneoHtml = "";
              auxEntrar++;
              baneoHtml = "";
            }
          }
          if (auxEntrar != 0) {
            container.innerHTML = htmlTwo;
          } else {
            container.innerHTML = `<div class="alert alert-primary" role="alert">Sin resultados con: ${buscador.value}</div>`;
          }
        } else {
          html = "";
          baneoHtml = "";
          for (let x = 0; x < datosAux.length; x++) {
            if (response.data[x].banned == 0) {
              baneoHtml += `<button type="button" class="btn btn-warning banear" id="banear-${response.data[x].email}">Banear</button>`;
            } else {
              baneoHtml += `<button type="button" class="btn btn-success banear" id="desbanear-${response.data[x].email}">Quitar baneo</button>`;
            }

            html +=
              `<div class="card">` +
              `<div class="card-header d-flex custonFlex"><span>Nick: ${response.data[x].nick} - Email: ${response.data[x].email}</span></div>` +
              `<div class="card-body">` +
              `<div class="btn-group" role="group" aria-label="Basic mixed styles example">` +
              baneoHtml +
              `</div>` +
              `</div>` +
              `</div>`;
            baneoHtml = "";
          }
          container.innerHTML = html;
        }

        const benearElementos = document.querySelectorAll(".banear");
        benearElementos.forEach((elemento) => {
          elemento.addEventListener("click", function () {
            // Obtener el ID del elemento actual
            let id = this.id;
            let separado = id.split("-");
            separado[1];
            console.log(separado[1]);

            const data = {
              email: separado[1],
            };
            mostrarJwt().then((jwt) => {
              console.log(jwt);

              const headers = {
                "Content-Type": "application/json",
                Authorization: jwt,
              };

              axios
                .put(`${API_URL}/user/banUser`, JSON.stringify(data), {
                  headers: headers,
                })
                .then((res) => {
                  console.log(res.data);
                  good.style.display = "block";
                  good.textContent = "usuario " + separado[1] + " baneado";
                  //cambiar estilo de boton:
                  if (elemento.classList.contains("btn-warning")) {
                    elemento.classList.remove("btn-warning");
                    elemento.textContent = "Quitar baneo";
                    elemento.classList.add("btn-success");

                    for (let x = 0; x < response.data.length; x++) {
                      if (separado[1] == response.data[x].email) {
                        response.data[x].banned = 1;
                      }
                    }
                  } else {
                    elemento.classList.remove("btn-success");
                    elemento.textContent = "Banear";
                    elemento.classList.add("btn-warning");
                    for (let x = 0; x < response.data.length; x++) {
                      if (separado[1] == response.data[x].email) {
                        response.data[x].banned = 0;
                      }
                    }
                  }
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
            });
          });
        });
      });

      //banear
      const benearElementos = document.querySelectorAll(".banear");
      benearElementos.forEach((elemento) => {
        elemento.addEventListener("click", function () {
          // Obtener el ID del elemento actual
          let id = this.id;
          let separado = id.split("-");
          separado[1];
          console.log(separado[1]);

          const data = {
            email: separado[1],
          };
          mostrarJwt().then((jwt) => {
            console.log(jwt);

            const headers = {
              "Content-Type": "application/json",
              Authorization: jwt,
            };

            axios
              .put(`${API_URL}/user/banUser`, JSON.stringify(data), {
                headers: headers,
              })
              .then((res) => {
                console.log(res.data);
                good.style.display = "block";
                good.textContent = "usuario " + separado[1] + " baneado";
                //cambiar estilo de boton:
                if (elemento.classList.contains("btn-warning")) {
                  elemento.classList.remove("btn-warning");
                  elemento.textContent = "Quitar baneo";
                  elemento.classList.add("btn-success");

                  for (let x = 0; x < response.data.length; x++) {
                    if(separado[1] == response.data[x].email){
                      response.data[x].banned = 1
                    }
                  }

                } else {
                  elemento.classList.remove("btn-success");
                  elemento.textContent = "Banear";
                  elemento.classList.add("btn-warning");
                  for (let x = 0; x < response.data.length; x++) {
                    if(separado[1] == response.data[x].email){
                      response.data[x].banned = 0
                    }
                  }
                }
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
          });
        });
      });
    })
    .catch((error) => {
      console.error("Error al hacer la petición:", error);
    });
});
