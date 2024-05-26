
showStyle().then((response) => {
console.log("aaa:" + response);

let nameFile = response;

if(typeof nameFile === 'undefined'){
    nameFile = "../bootstrap/bootstrap.min.css";
}

let currentFileName = getFileName();
let element = document.querySelector("#changeStyle");
if(currentFileName === "formulario.html" || currentFileName === "index.html" || currentFileName === "menuPrincipal.html" || currentFileName === "ip.html"){
    element.setAttribute("href", nameFile);
}else{
    let newUrl = "../"+ nameFile;
    element.setAttribute("href", newUrl);
}

})

function getFileName() {
    let path = document.location.pathname;
    let parts = path.split('/');
    let fileName = parts[parts.length - 1];
    return fileName;
}
