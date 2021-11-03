import { BASE_API_URL } from "../utils/constants";


export async function getDhs(token) {
    var resp = "";
    await fetch(BASE_API_URL + "/dh_hub", {
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
    await fetch(BASE_API_URL + "/dh_hub/create", {
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