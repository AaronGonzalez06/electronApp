let API_URL = '';
async function checkIP() {
    API_URL = await getIP();
    console.log(API_URL);
}

checkIP()
