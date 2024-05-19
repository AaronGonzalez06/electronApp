//const container = document.querySelector(".col-md-8.data");
//const good = document.querySelector(".alert-success");
//good.style.display = "none";
const formularioGratis = document.querySelector("#formularioGratis");
const formularioPronvincia = document.querySelector("#formularioPronvincia");
const formularioFecha = document.querySelector("#formularioFecha");
const selectPronvincia = document.getElementById("provincia");
const radioGratuito = document.getElementById("gratuito");
const radioNoGratuito = document.getElementById("noGratuito");
const porNombreActividad = document.getElementById("name");
const porNick = document.getElementById("nick");

const fechaDesde = document.getElementById("fechaDesde");
const fechaHasta = document.getElementById("fechaHasta");

formularioFecha.addEventListener("submit", function (event) {
  event.preventDefault();
  showJson().then((JsonGuardado) => {
    const dataUserLocal = JSON.parse(JsonGuardado);
    mostrarJwt().then((jwt) => {
      console.log(jwt);

      const headers = {
        "Content-Type": "application/json",
        Authorization: jwt,
      };
      axios
        .get(
          `${API_URL}/activity/filterActivityForDate/${fechaDesde.value}/${fechaHasta.value}`,
          {
            headers: headers,
          }
        )
        .then((response) => {
          console.log(response.data);

          if (response.data.length != 0) {
            container.innerHTML = "";
            let html = "";
            let htmlBtn = "";
            let fechaActual = new Date();

            for (let x = 0; x < response.data.length; x++) {
              if (
                new Date(response.data[x].date) >= fechaActual &&
                response.data[x].total > 0
              ) {
                htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
              }
              if (response.data[x].users.length != 0) {
                for (let y = 0; y < response.data[x].users.length; y++) {
                  if (response.data[x].users[y].nick == dataUserLocal.nick) {
                    if (
                      new Date(response.data[x].date) >= fechaActual &&
                      response.data[x].total > 0
                    ) {
                      htmlBtn = `<button href="#" class="btn btn-warning inscribirme btnCuston suscrito" id="inscribirme-${response.data[x].id}" >Desinscribirme</button>`;
                    }
                    break;
                  }
                }
              } else {
                if (
                  new Date(response.data[x].date) >= fechaActual &&
                  response.data[x].total > 0
                ) {
                  htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
                }
              }

              let free = "NO";

              if (
                response.data[x].hourlyPrice == 0 &&
                response.data[x].activityprice == 0
              ) {
                free = "YES";
              }

              html +=
                `<div class="card animate__backInLeft">` +
                `<div class="card-header d-flex custonFlex"><span>${response.data[x].name}</span><span>${response.data[x].creator.nick}</span></div>` +
                `<div class="card-body">` +
                `<span class="d-flex ">` +
                `<span class="col-md-7">` +
                `<h5 class="card-title">${response.data[x].summary}</h5>` +
                `<p class="card-text">${response.data[x].description}</p>` +
                `</span>` +
                `<span class="col">` +
                `<ul class="list-group list-group-flush"><li class="list-group-item">Fecha: ${response.data[x].date} </li><li class="list-group-item">Cantidad: ${response.data[x].total} </li><li class="list-group-item">Hora inicio: ${response.data[x].startTime} </li><li class="list-group-item">Hora fin: ${response.data[x].endTime}</li><li class="list-group-item">Free: ${free} </li></ul>` +
                `</span>` +
                `</span>` +
                htmlBtn +
                `<a href="#" id="mostrar-${response.data[x].id}" class="btn btn-primary btnCuston masInformacion">Más información</a>` +
                `</div>` +
                `</div>`;
              htmlBtn = "";
            }

            container.innerHTML = html;
            //mas iformacion
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
            //
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
            //fin
          } else {
            good.style.display = "block";
            good.textContent = `Sin resultado en la busqueda con fecha desde ${fechaDesde.value} a ${fechaHasta.value}`;
            setTimeout(function () {
              good.style.display = "none";
            }, 2000);
          }
        })
        .catch((error) => {
          console.error("Error al hacer la petición:", error);
        });
    });
  });
});

formularioPronvincia.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(selectPronvincia.value);

  showJson().then((JsonGuardado) => {
    const dataUserLocal = JSON.parse(JsonGuardado);
    mostrarJwt().then((jwt) => {
      console.log(jwt);

      const headers = {
        "Content-Type": "application/json",
        Authorization: jwt,
      };
      axios
        .get(
          `${API_URL}/activity/filterActivityForPronvince/${selectPronvincia.value}`,
          {
            headers: headers,
          }
        )
        .then((response) => {
          console.log(response.data);

          if (response.data.length != 0) {
            container.innerHTML = "";
            let html = "";
            let htmlBtn = "";
            let fechaActual = new Date();

            for (let x = 0; x < response.data.length; x++) {
              if (
                new Date(response.data[x].date) >= fechaActual &&
                response.data[x].total > 0
              ) {
                htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
              }
              if (response.data[x].users.length != 0) {
                for (let y = 0; y < response.data[x].users.length; y++) {
                  if (response.data[x].users[y].nick == dataUserLocal.nick) {
                    if (
                      new Date(response.data[x].date) >= fechaActual &&
                      response.data[x].total > 0
                    ) {
                      htmlBtn = `<button href="#" class="btn btn-warning inscribirme btnCuston suscrito" id="inscribirme-${response.data[x].id}" >Desinscribirme</button>`;
                    }
                    break;
                  }
                }
              } else {
                if (
                  new Date(response.data[x].date) >= fechaActual &&
                  response.data[x].total > 0
                ) {
                  htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
                }
              }

              let free = "NO";

              if (
                response.data[x].hourlyPrice == 0 &&
                response.data[x].activityprice == 0
              ) {
                free = "YES";
              }

              html +=
                `<div class="card animate__backInLeft">` +
                `<div class="card-header d-flex custonFlex"><span>${response.data[x].name}</span><span>${response.data[x].creator.nick}</span></div>` +
                `<div class="card-body">` +
                `<span class="d-flex ">` +
                `<span class="col-md-7">` +
                `<h5 class="card-title">${response.data[x].summary}</h5>` +
                `<p class="card-text">${response.data[x].description}</p>` +
                `</span>` +
                `<span class="col">` +
                `<ul class="list-group list-group-flush"><li class="list-group-item">Fecha: ${response.data[x].date} </li><li class="list-group-item">Cantidad: ${response.data[x].total} </li><li class="list-group-item">Hora inicio: ${response.data[x].startTime} </li><li class="list-group-item">Hora fin: ${response.data[x].endTime}</li><li class="list-group-item">Free: ${free} </li></ul>` +
                `</span>` +
                `</span>` +
                htmlBtn +
                `<a href="#" id="mostrar-${response.data[x].id}" class="btn btn-primary btnCuston masInformacion">Más información</a>` +
                `</div>` +
                `</div>`;
              htmlBtn = "";
            }

            container.innerHTML = html;
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
            //fin
          } else {
            good.style.display = "block";
            good.textContent = `Sin resultado en la busqueda con: ${selectPronvincia.value}`;
            setTimeout(function () {
              good.style.display = "none";
            }, 2000);
          }
        })
        .catch((error) => {
          console.error("Error al hacer la petición:", error);
        });
    });
  });
});

formularioGratis.addEventListener("submit", function (event) {
  event.preventDefault();

  showJson().then((JsonGuardado) => {
    const dataUserLocal = JSON.parse(JsonGuardado);
    mostrarJwt().then((jwt) => {
      console.log(jwt);

      const headers = {
        "Content-Type": "application/json",
        Authorization: jwt,
      };

      if (radioGratuito.checked) {
        axios
          .get(`${API_URL}/activity/filterActivityFree`, {
            headers: headers,
          })
          .then((response) => {
            console.log(response.data);

            if (response.data.length != 0) {
              container.innerHTML = "";
              let html = "";
              let htmlBtn = "";
              let fechaActual = new Date();

              for (let x = 0; x < response.data.length; x++) {
                if (
                  new Date(response.data[x].date) >= fechaActual &&
                  response.data[x].total > 0
                ) {
                  htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
                }
                if (response.data[x].users.length != 0) {
                  for (let y = 0; y < response.data[x].users.length; y++) {
                    if (response.data[x].users[y].nick == dataUserLocal.nick) {
                      if (
                        new Date(response.data[x].date) >= fechaActual &&
                        response.data[x].total > 0
                      ) {
                        htmlBtn = `<button href="#" class="btn btn-warning inscribirme btnCuston suscrito" id="inscribirme-${response.data[x].id}" >Desinscribirme</button>`;
                      }
                      break;
                    }
                  }
                } else {
                  if (
                    new Date(response.data[x].date) >= fechaActual &&
                    response.data[x].total > 0
                  ) {
                    htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
                  }
                }

                let free = "NO";

                if (
                  response.data[x].hourlyPrice == 0 &&
                  response.data[x].activityprice == 0
                ) {
                  free = "YES";
                }

                html +=
                  `<div class="card animate__backInLeft">` +
                  `<div class="card-header d-flex custonFlex"><span>${response.data[x].name}</span><span>${response.data[x].creator.nick}</span></div>` +
                  `<div class="card-body">` +
                  `<span class="d-flex ">` +
                  `<span class="col-md-7">` +
                  `<h5 class="card-title">${response.data[x].summary}</h5>` +
                  `<p class="card-text">${response.data[x].description}</p>` +
                  `</span>` +
                  `<span class="col">` +
                  `<ul class="list-group list-group-flush"><li class="list-group-item">Fecha: ${response.data[x].date} </li><li class="list-group-item">Cantidad: ${response.data[x].total} </li><li class="list-group-item">Hora inicio: ${response.data[x].startTime} </li><li class="list-group-item">Hora fin: ${response.data[x].endTime}</li><li class="list-group-item">Free: ${free} </li></ul>` +
                  `</span>` +
                  `</span>` +
                  htmlBtn +
                  `<a href="#" id="mostrar-${response.data[x].id}" class="btn btn-primary btnCuston masInformacion">Más información</a>` +
                  `</div>` +
                  `</div>`;
                htmlBtn = "";
              }

              container.innerHTML = html;
              //mas información
              const masInformacion =
                document.querySelectorAll(".masInformacion");
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
              //fin
            } else {
              good.style.display = "block";
              good.textContent = `Sin resultado en la busqueda con actividades gratis`;
              setTimeout(function () {
                good.style.display = "none";
              }, 2000);
            }
          })
          .catch((error) => {
            console.error("Error al hacer la petición:", error);
          });
      } else {
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
              container.innerHTML = "";
              let html = "";
              let htmlBtn = "";
              let fechaActual = new Date();

              for (let x = 0; x < response.data.length; x++) {
                if (
                  new Date(response.data[x].date) >= fechaActual &&
                  response.data[x].total > 0
                ) {
                  htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
                }
                if (response.data[x].users.length != 0) {
                  for (let y = 0; y < response.data[x].users.length; y++) {
                    if (response.data[x].users[y].nick == dataUserLocal.nick) {
                      if (
                        new Date(response.data[x].date) >= fechaActual &&
                        response.data[x].total > 0
                      ) {
                        htmlBtn = `<button href="#" class="btn btn-warning inscribirme btnCuston suscrito" id="inscribirme-${response.data[x].id}" >Desinscribirme</button>`;
                      }
                      break;
                    }
                  }
                } else {
                  if (
                    new Date(response.data[x].date) >= fechaActual &&
                    response.data[x].total > 0
                  ) {
                    htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
                  }
                }

                let free = "NO";

                if (
                  response.data[x].hourlyPrice == 0 &&
                  response.data[x].activityprice == 0
                ) {
                  free = "YES";
                }

                html +=
                  `<div class="card animate__backInLeft">` +
                  `<div class="card-header d-flex custonFlex"><span>${response.data[x].name}</span><span>${response.data[x].creator.nick}</span></div>` +
                  `<div class="card-body">` +
                  `<span class="d-flex ">` +
                  `<span class="col-md-7">` +
                  `<h5 class="card-title">${response.data[x].summary}</h5>` +
                  `<p class="card-text">${response.data[x].description}</p>` +
                  `</span>` +
                  `<span class="col">` +
                  `<ul class="list-group list-group-flush"><li class="list-group-item">Fecha: ${response.data[x].date} </li><li class="list-group-item">Cantidad: ${response.data[x].total} </li><li class="list-group-item">Hora inicio: ${response.data[x].startTime} </li><li class="list-group-item">Hora fin: ${response.data[x].endTime}</li><li class="list-group-item">Free: ${free} </li></ul>` +
                  `</span>` +
                  `</span>` +
                  htmlBtn +
                  `<a href="#" id="mostrar-${response.data[x].id}" class="btn btn-primary btnCuston masInformacion">Más información</a>` +
                  `</div>` +
                  `</div>`;
                htmlBtn = "";
              }

              container.innerHTML = html;
              //mas información
              const masInformacion =
                document.querySelectorAll(".masInformacion");
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
              //fin
            })
            .catch((error) => {
              console.error("Error al hacer la petición:", error);
            });
        });
      }
    });
  });
});

porNombreActividad.addEventListener("keyup", function (event) {
  console.log(porNombreActividad.value);
  showJson().then((JsonGuardado) => {
    const dataUserLocal = JSON.parse(JsonGuardado);
    showJson().then((JsonGuardado) => {
      const dataUserLocal = JSON.parse(JsonGuardado);
      mostrarJwt().then((jwt) => {
        console.log(jwt);

        const headers = {
          "Content-Type": "application/json",
          Authorization: jwt,
        };

        if (porNombreActividad.value.length < 3) {
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
                  if (
                    new Date(response.data[x].date) >= fechaActual &&
                    response.data[x].total > 0
                  ) {
                    htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
                  }
                  if (response.data[x].users.length != 0) {
                    for (let y = 0; y < response.data[x].users.length; y++) {
                      if (
                        response.data[x].users[y].nick == dataUserLocal.nick
                      ) {
                        if (
                          new Date(response.data[x].date) >= fechaActual &&
                          response.data[x].total > 0
                        ) {
                          htmlBtn = `<button href="#" class="btn btn-warning inscribirme btnCuston suscrito" id="inscribirme-${response.data[x].id}" >Desinscribirme</button>`;
                        }
                        break;
                      }
                    }
                  } else {
                    if (
                      new Date(response.data[x].date) >= fechaActual &&
                      response.data[x].total > 0
                    ) {
                      htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
                    }
                  }

                  let free = "NO";

                  if (
                    response.data[x].hourlyPrice == 0 &&
                    response.data[x].activityprice == 0
                  ) {
                    free = "YES";
                  }

                  html +=
                    `<div class="card animate__backInLeft">` +
                    `<div class="card-header d-flex custonFlex"><span>${response.data[x].name}</span><span>${response.data[x].creator.nick}</span></div>` +
                    `<div class="card-body">` +
                    `<span class="d-flex ">` +
                    `<span class="col-md-7">` +
                    `<h5 class="card-title">${response.data[x].summary}</h5>` +
                    `<p class="card-text">${response.data[x].description}</p>` +
                    `</span>` +
                    `<span class="col">` +
                    `<ul class="list-group list-group-flush"><li class="list-group-item">Fecha: ${response.data[x].date} </li><li class="list-group-item">Cantidad: ${response.data[x].total} </li><li class="list-group-item">Hora inicio: ${response.data[x].startTime} </li><li class="list-group-item">Hora fin: ${response.data[x].endTime}</li><li class="list-group-item">Free: ${free} </li></ul>` +
                    `</span>` +
                    `</span>` +
                    htmlBtn +
                    `<a href="#" id="mostrar-${response.data[x].id}" class="btn btn-primary btnCuston masInformacion">Más información</a>` +
                    `</div>` +
                    `</div>`;
                  htmlBtn = "";
                }

                container.innerHTML = html;
                //mas información
                const masInformacion =
                  document.querySelectorAll(".masInformacion");
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
                //fin
              })
              .catch((error) => {
                console.error("Error al hacer la petición:", error);
              });
          });

          return;
        }
        axios
          .get(
            `${API_URL}/activity/filterForName/${porNombreActividad.value}`,
            {
              headers: headers,
            }
          )
          .then((response) => {
            console.log(response.data);
            console.log("total :" + response.data.length);

            if (response.data.length != 0) {
              container.innerHTML = "";
              let html = "";
              let htmlBtn = "";
              let fechaActual = new Date();

              for (let x = 0; x < response.data.length; x++) {
                if (
                  new Date(response.data[x].date) >= fechaActual &&
                  response.data[x].total > 0
                ) {
                  htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
                }
                if (response.data[x].users.length != 0) {
                  for (let y = 0; y < response.data[x].users.length; y++) {
                    if (response.data[x].users[y].nick == dataUserLocal.nick) {
                      if (
                        new Date(response.data[x].date) >= fechaActual &&
                        response.data[x].total > 0
                      ) {
                        htmlBtn = `<button href="#" class="btn btn-warning inscribirme btnCuston suscrito" id="inscribirme-${response.data[x].id}" >Desinscribirme</button>`;
                      }
                      break;
                    }
                  }
                } else {
                  if (
                    new Date(response.data[x].date) >= fechaActual &&
                    response.data[x].total > 0
                  ) {
                    htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
                  }
                }

                let free = "NO";

                if (
                  response.data[x].hourlyPrice == 0 &&
                  response.data[x].activityprice == 0
                ) {
                  free = "YES";
                }

                html +=
                  `<div class="card animate__backInLeft">` +
                  `<div class="card-header d-flex custonFlex"><span>${response.data[x].name}</span><span>${response.data[x].creator.nick}</span></div>` +
                  `<div class="card-body">` +
                  `<span class="d-flex ">` +
                  `<span class="col-md-7">` +
                  `<h5 class="card-title">${response.data[x].summary}</h5>` +
                  `<p class="card-text">${response.data[x].description}</p>` +
                  `</span>` +
                  `<span class="col">` +
                  `<ul class="list-group list-group-flush"><li class="list-group-item">Fecha: ${response.data[x].date} </li><li class="list-group-item">Cantidad: ${response.data[x].total} </li><li class="list-group-item">Hora inicio: ${response.data[x].startTime} </li><li class="list-group-item">Hora fin: ${response.data[x].endTime}</li><li class="list-group-item">Free: ${free} </li></ul>` +
                  `</span>` +
                  `</span>` +
                  htmlBtn +
                  `<a href="#" id="mostrar-${response.data[x].id}" class="btn btn-primary btnCuston masInformacion">Más información</a>` +
                  `</div>` +
                  `</div>`;
                htmlBtn = "";
              }

              container.innerHTML = html;
              //mas información
              const masInformacion =
                document.querySelectorAll(".masInformacion");
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
              //fin
            } else {
              good.style.display = "block";
              good.textContent = `Sin resultado en la busqueda con: ${porNombreActividad.value}`;
              setTimeout(function () {
                good.style.display = "none";
              }, 2000);
            }
          })
          .catch((error) => {
            console.error("Error al hacer la petición:", error);
          });
      });
    });
  });
});

porNick.addEventListener("keyup", function (event) {
  console.log("nick a buscar;" + porNick.value);
  showJson().then((JsonGuardado) => {
    const dataUserLocal = JSON.parse(JsonGuardado);
    mostrarJwt().then((jwt) => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: jwt,
      };

      if (porNick.value.length < 3) {
        mostrarJwt().then((jwt) => {
          const headers = {
            "Content-Type": "application/json",
            Authorization: jwt,
          };
          axios
            .get(`${API_URL}/activity/getActivitiesAll`, {
              headers: headers,
            })
            .then((response) => {
              container.innerHTML = "";
              let html = "";
              let htmlBtn = "";
              let fechaActual = new Date();

              for (let x = 0; x < response.data.length; x++) {
                if (
                  new Date(response.data[x].date) >= fechaActual &&
                  response.data[x].total > 0
                ) {
                  htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
                }
                if (response.data[x].users.length != 0) {
                  for (let y = 0; y < response.data[x].users.length; y++) {
                    if (response.data[x].users[y].nick == dataUserLocal.nick) {
                      if (
                        new Date(response.data[x].date) >= fechaActual &&
                        response.data[x].total > 0
                      ) {
                        htmlBtn = `<button href="#" class="btn btn-warning inscribirme btnCuston suscrito" id="inscribirme-${response.data[x].id}" >Desinscribirme</button>`;
                      }
                      break;
                    }
                  }
                } else {
                  if (
                    new Date(response.data[x].date) >= fechaActual &&
                    response.data[x].total > 0
                  ) {
                    htmlBtn = `<button href="#" class="btn btn-primary inscribirme btnCuston noSuscrito" id="inscribirme-${response.data[x].id}" >Inscribirme</button>`;
                  }
                }

                let free = "NO";

                if (
                  response.data[x].hourlyPrice == 0 &&
                  response.data[x].activityprice == 0
                ) {
                  free = "YES";
                }

                html +=
                  `<div class="card animate__backInLeft">` +
                  `<div class="card-header d-flex custonFlex"><span>${response.data[x].name}</span><span>${response.data[x].creator.nick}</span></div>` +
                  `<div class="card-body">` +
                  `<span class="d-flex ">` +
                  `<span class="col-md-7">` +
                  `<h5 class="card-title">${response.data[x].summary}</h5>` +
                  `<p class="card-text">${response.data[x].description}</p>` +
                  `</span>` +
                  `<span class="col">` +
                  `<ul class="list-group list-group-flush"><li class="list-group-item">Fecha: ${response.data[x].date} </li><li class="list-group-item">Cantidad: ${response.data[x].total} </li><li class="list-group-item">Hora inicio: ${response.data[x].startTime} </li><li class="list-group-item">Hora fin: ${response.data[x].endTime}</li><li class="list-group-item">Free: ${free} </li></ul>` +
                  `</span>` +
                  `</span>` +
                  htmlBtn +
                  `<a href="#" id="mostrar-${response.data[x].id}" class="btn btn-primary btnCuston masInformacion">Más información</a>` +
                  `</div>` +
                  `</div>`;
                htmlBtn = "";
              }

              container.innerHTML = html;
              //mas información
              const masInformacion =
                document.querySelectorAll(".masInformacion");
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
              //fin
            })
            .catch((error) => {
              console.error("Error al hacer la petición:", error);
            });
        });

        return;
      }
      axios
        .get(`${API_URL}/user/findUserForNickOrEmail/${porNick.value}`, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.users.length != 0) {
            container.innerHTML = "";
            let html = "";

            for (let x = 0; x < response.data.users.length; x++) {
              html +=
                `<div class="card">` +
                `<div class="card-header d-flex custonFlex"><span>${response.data.users[x].nick}</span></div>` +
                `<div class="card-body">` +
                `<a href="#" class="btn btn-primary Ver perfilesUsuarios" id="nick-${response.data.users[x].id}" >Ver perfil</a>` +
                `</div>` +
                `</div>`;
            }
            container.innerHTML = html;

            const perfilesUSuarios = document.querySelectorAll(".perfilesUsuarios");
            perfilesUSuarios.forEach((elemento) => {
              elemento.addEventListener("click", function () {
                // Obtener el ID del elemento actual
                console.log(this);
                let id = this.id;
                let separado = id.split("-");
                separado[1];
                console.log(id);
                saveIdActivity(separado[1]);
                changeViewModalUserPerfil();
              });
            });
          } else {
            good.style.display = "block";
            good.textContent = `Sin resultado en la busqueda con: ${porNombreActividad.value}`;
            setTimeout(function () {
              good.style.display = "none";
            }, 2000);
          }
        })
        .catch((error) => {
          console.error("Error al hacer la petición:", error);
        });
    });
  });
});
