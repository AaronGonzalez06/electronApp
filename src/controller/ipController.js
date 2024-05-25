

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {

  const ip = document.querySelector("#ip");
  ip.style.backgroundColor = "lightblue";
  setIP(ip.value);
});
