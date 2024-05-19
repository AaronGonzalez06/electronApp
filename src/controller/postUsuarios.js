//document.addEventListener("DOMContentLoaded", function() {
//});
const container = document.querySelector(".col-md-8.data");

mostrarJwt().then((jwt) => {
  console.log(jwt);

  const headers = {
    "Content-Type": "application/json",
    Authorization: jwt,
  };
  axios
    .get(`${API_URL}/post/getPostTotalUsers`, {
      headers: headers,
    })
    .then((response) => {
      console.log(response.data);
      let html = "";

      for (let x = 0; x < response.data.length; x++) {
        html +=
          `<div class="card animate__rotateInUpRight">` +
          `<div class="card-header d-flex custonFlex"><span>${response.data[x].user.nick}</span><span>${response.data[x].date}</span></div>` +
          `<div class="card-body">` +
          `<h5 class="card-title">${response.data[x].title}</h5>` +
          `<p class="card-text">${response.data[x].text}</p>` +
          `</div>` +
          `</div>`;
      }

      container.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error al hacer la petición:", error);
    });
});