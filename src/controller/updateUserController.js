const form = document.querySelector("form");
const good = document.querySelector(".alert-success");
good.style.display = "none";
showJson().then((response) => {
  console.log(JSON.parse(response));
  const dataJson = JSON.parse(response);

  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const telefono = document.getElementById("telefono");

  nombre.value = dataJson.name;
  apellido.value = dataJson.surname;
  telefono.value = dataJson.phone;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const data = {
      name: nombre.value,
      surname: apellido.value,
      phone: telefono.value,
      province: dataJson.province,
    };    

    //actualizar json
    dataJson.name = nombre.value
    dataJson.surname = apellido.value
    dataJson.phone = telefono.value
    saveJson(JSON.stringify(dataJson))
  
    mostrarJwt().then((jwt) => {
      console.log(jwt);
  
      const headers = {
        "Content-Type": "application/json",
        Authorization: jwt,
      };
  
      axios
        .put(`${API_URL}/user/update`, JSON.stringify(data), {
          headers: headers,
        })
        .then((response) => {
          console.log(response.data);
          good.style.display = "block";
          //good.textContent = response.data;
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
});
