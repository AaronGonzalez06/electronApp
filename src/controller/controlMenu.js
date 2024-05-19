const itenMenu = document.getElementById("soloOfertantes");
showJson().then((json)=>{
    const data = JSON.parse(json);
    if(data.rol != 2){
        itenMenu.remove();
    }
})