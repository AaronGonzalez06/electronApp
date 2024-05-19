
showStyle().then((response) => {
console.log("aaa:" + response);
let currentFileName = getFileName();
let element = document.querySelector("#changeStyle");
if(currentFileName === "formulario.html" || currentFileName === "index.html" || currentFileName === "menuPrincipal.html"){
    element.setAttribute("href", response);
}else{
    let newUrl = "../"+ response;
    element.setAttribute("href", newUrl);
}

})

function getFileName() {
    let path = document.location.pathname;
    let parts = path.split('/');
    let fileName = parts[parts.length - 1];
    return fileName;
}
