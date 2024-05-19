const good = document.querySelector(".alert-success");
good.style.display = "none";
const warnig = document.querySelector(".alert-warning");
warnig.style.display = "none";

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.querySelector("#titulo").value;
  const texto = document.querySelector("#texto").value;
  const email = document.querySelector("#email").value;

  const data = {
    email: email,
    titulo: titulo,
    contenido: texto,
  };

  const prueba = mostrarJwt();
  prueba.then((jwt) => {
    console.log(jwt);

    const headers = {
        "Content-Type": "application/json",
        "Authorization": jwt
      };

    axios
      .post(`${API_URL}/message/newMessage`, JSON.stringify(data), {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        good.style.display = "block";
        good.textContent = response.data;
        setTimeout(function () {
          good.style.display = "none";
        }, 2000);
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
        warnig.style.display = "block";
        warnig.textContent = error.response.data;
        setTimeout(function () {
          warnig.style.display = "none";
        }, 2000);
      });
  });
});
