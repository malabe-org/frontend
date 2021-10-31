const BASE_URL = " https://malabe-backend.herokuapp.com";

export async function login(credentials) {
    var resp = "";
    await fetch(BASE_URL + "/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(credentials)
    }).then(response => {
        if(response.status == 200){
            resp = response.json();
        }
    });
    return resp;
}