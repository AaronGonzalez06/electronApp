const good = document.querySelector(".alert-success");
good.style.display = "none";
const warnig = document.querySelector(".alert-warning");
warnig.style.display = "none";

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#nombre").value;
  const surname = document.querySelector("#apellido").value;
  const province = document.querySelector("#provincia").value;
  const phone = document.querySelector("#telefono").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#contrasena").value;
  const nick = document.querySelector("#nick").value;
  const radios = document.getElementsByName("tipoUsuario");
  let rol;
  if (radios[0].checked) {
    rol = 1;
  } else if (radios[1].checked) {
    rol = 2;
  }

  let soloNumeros = phone.replace(/\D/g, '');

  if (soloNumeros.length != 9) {
    warnig.style.display = "block";
    warnig.textContent = "Teléfono no válido: "+ phone;
    setTimeout(function () {
      warnig.style.display = "none";
    }, 2000);
    return;
  }

  const newUser = {
    name: name,
    surname: surname,
    province: province,
    nick: nick,
    email: email,
    phone: phone,
    password: password,
    rol: rol,
  };

  //console.log(JSON.stringify(newUser));
  axios
    .post(`${API_URL}/user/add`, JSON.stringify(newUser), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      good.style.display = "block";
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
