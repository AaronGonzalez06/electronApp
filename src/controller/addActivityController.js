const good = document.querySelector(".alert-success");
good.style.display = "none";
const warnig = document.querySelector(".alert-warning");
warnig.style.display = "none";

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const summary = document.querySelector("#summary").value;
  const description = document.querySelector("#description").value;
  const location = document.querySelector("#location").value;
  const startTime = document.querySelector("#startTime").value;
  const endTime = document.querySelector("#endTime").value;
  const date = document.querySelector("#date").value;
  const total = document.querySelector("#total").value;
  const zone = document.querySelector("#zone").value;
  const province = document.querySelector("#province").value;
  const material = document.querySelector("#material").value;
  const displacement = document.querySelector("#displacement").value;
  const hourlyPrice = document.querySelector("#hourlyPrice").value;
  const activityprice = document.querySelector("#activityprice").value;

  const data = {
    name: name,
    summary: summary,
    description: description,
    location: location,
    startTime: startTime,
    endTime: endTime,
    date: date,
    total: total,
    zone: zone,
    province: province,
    material: material,
    displacement: displacement,
    hourlyPrice: hourlyPrice,
    activityprice: activityprice
  };

  const prueba = mostrarJwt();
  prueba.then((jwt) => {
    console.log(jwt);

    const headers = {
        "Content-Type": "application/json",
        "Authorization": jwt
      };

    axios
      .post(`${API_URL}/activity/add`, JSON.stringify(data), {
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
