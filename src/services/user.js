import Identicon from "identicon.js";
const BASE_URL = " https://malabe-backend.herokuapp.com";

/**
 * 1. First, we’re importing the fetch function from the JavaScript Fetch API.
 * 2. Next, we’re creating a variable called resp.
 * 3. Then, we’re making a POST request to the /api/users/login endpoint.
 * 4. We’re setting the Content-Type header to application/json.
 * 5. We’re setting the body of the request to the credentials object.
 * 6. Finally, we’re returning the response.
 * @param {json object} credentials 
 * @returns 
 */
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
export async function logout(token) {
    var resp = "";
    await fetch(BASE_URL + "/api/users/logout", {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + token
        },
    }).then(response => {
        if(response.status == 200){
            resp = response.json();
        }
    });
    return resp;
}

export async function getUsers(token) {
    var resp = "";
    await fetch(BASE_URL + "/api/users", {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + token
        },
    }).then(response => {
        if(response.status == 200){
            resp = response.json();
        }
    });
    return resp;
}
// create a base64 encoded PNG
export const ICON_DATA = new Identicon('d3b07384d113edec49eaa6238ad5ff00', 420).toString();
