import { BASE_API_URL } from "../utils/constants";


export async function getDhs(token) {
    var resp = "";
    await fetch(BASE_API_URL + "/api/dhs", {
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

export async function addDh(values, token) {
    var resp = "";
    await fetch(BASE_API_URL + "/api/dhs", {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + token
        },
        body: JSON.parse(values)
    }).then(response => {
        if (response.status == 200 || response.status == 201) {
            resp = response.json();
        }
    });
    return resp;
}