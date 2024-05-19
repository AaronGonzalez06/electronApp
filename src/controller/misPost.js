const good = document.querySelector(".alert-success");
const container = document.querySelector(".col-md-12.data");
good.style.display = "none";

mostrarJwt().then((jwt) => {
  console.log(jwt);

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

      if(response.data.length != 0){
        let html = "";

        for (let x = 0; x < response.data.length; x++) {
          html +=
            `<div class="card">` +
            `<div class="card-header d-flex custonFlex"><span>${response.data[x].user.nick}</span><span>${response.data[x].date}</span></div>` +
            `<div class="card-body">` +
            `<h5 class="card-title">${response.data[x].title}</h5>` +
            `<p class="card-text">${response.data[x].text}</p>` +
            `<a href="#" class="btn btn-danger borrar btnCuston" id="borrar-${response.data[x].id}" >Borrar</a>` +
            `</div>` +
            `</div>`;
        }
  
        container.innerHTML = html;
      }else{
        good.style.display = "block";
        good.textContent = "Todavia no has realizado ningún post.";
        container.innerHTML = "";
      }

      //borrar post
      const borrarPosts = document.querySelectorAll(".borrar");
      console.log(borrarPosts);
      borrarPosts.forEach(function (elemento) {
        elemento.addEventListener("click", function () {
          // Obtener el ID del elemento actual
          let id = this.id;
          let separado = id.split("-");
          separado[1];

          const data = {
            id: separado[1],
          };
          axios.delete(`${API_URL}/post/delete?id=${separado[1]}`, {
            headers: headers
          })
            .then((response) => {
              console.log(response.data);
              good.style.display = "block";
              good.textContent = response.data;
              //prueba
              const contenedor = elemento.parentNode.parentNode;
              contenedor.style.display = "none";
              //fin prueba
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
