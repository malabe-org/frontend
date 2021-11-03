import { BASE_API_URL } from "../utils/constants";

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
    await fetch(BASE_API_URL + "/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(credentials)
    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            resp = response.json();
        }
    });
    return resp;
}
export async function logout(token) {
    var resp = "";
    await fetch(BASE_API_URL + "/api/users/logout", {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + token
        },
    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            resp = response.json();
        }
    });
    return resp;
}

export async function getUsers(token) {
    var resp = "";
    await fetch(BASE_API_URL + "/api/users", {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + token
        },
    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            resp = response.json();
        }
    });
    return resp;
}

export async function signIn(values, token) {
    var resp = "";
    await fetch(BASE_API_URL + "/api/users/signup", {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(values)
    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            resp = response.json();
        }
    });
    return resp;
}

export async function updateUser(idUser, values, token) {
    var resp = "";
    await fetch(BASE_API_URL + "/api/users/update" + (idUser != "" ? "/" + idUser : ""), {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(values)
    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            resp = response.json();
        }
    });
    return resp;
}

export async function getCurrentUser(token) {
    var resp = "";
    await fetch(BASE_API_URL + "/api/users/me", {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + token
        },
    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            resp = response.json();
        }
    });
    return resp;
}