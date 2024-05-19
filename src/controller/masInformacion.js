const eventNameInput = document.getElementById("eventName");
const eventSummaryInput = document.getElementById("eventSummary");
const eventDescriptionInput = document.getElementById("eventDescription");
const eventLocationInput = document.getElementById("eventLocation");
const eventStartTimeInput = document.getElementById("eventStartTime");
const eventEndTimeInput = document.getElementById("eventEndTime");
const eventDateInput = document.getElementById("eventDate");
const eventTotalInput = document.getElementById("eventTotal");
const eventZoneInput = document.getElementById("eventZone");
const eventProvinceInput = document.getElementById("eventProvince");
const eventMaterialInput = document.getElementById("eventMaterial");
const eventDisplacementInput = document.getElementById("eventDisplacement");
const eventHourlyPriceInput = document.getElementById("eventHourlyPrice");
const eventActivityPriceInput = document.getElementById("eventActivityPrice");
const listGroup = document.querySelector(".list-group");

showIdActivity().then((response) => {
  console.log("id a llevar: " + response);

  mostrarJwt().then((jwt) => {
    console.log(jwt);

    const headers = {
      "Content-Type": "application/json",
      Authorization: jwt,
    };
    axios
      .get(`${API_URL}/activity/getActivity?id=${response}`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        eventNameInput.value = response.data.name;
        eventSummaryInput.value = response.data.summary;
        eventDescriptionInput.value = response.data.description;
        eventLocationInput.value = response.data.location;
        eventStartTimeInput.value = response.data.startTime;
        eventEndTimeInput.value = response.data.endTime;
        eventDateInput.value = response.data.date;
        eventTotalInput.value = response.data.total;
        eventZoneInput.value = response.data.zone;
        eventProvinceInput.value = response.data.province;
        eventMaterialInput.value = response.data.material;
        eventDisplacementInput.value = response.data.displacement;
        eventHourlyPriceInput.value = response.data.hourlyPrice;
        eventActivityPriceInput.value = response.data.activityprice;

        if(response.data.users.length !=0){
            let html = "";
            for(let x=0; x<response.data.users.length; x++){
                html+= `<a href="#" class="list-group-item list-group-item-action">${response.data.users[x].nick}</a>`
            }
            listGroup.innerHTML = html;
        }
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });
  });
});
