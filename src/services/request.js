import { BASE_URL } from "../utils/constants";


export async function getRequestBySeeker(idSeeker, token) {
    var response = "";
    await fetch(BASE_URL + "/request/seeker/" + idSeeker, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: token
        }
    }).then(res => {
        if (res.status == 200) response = res.json();
    });
    return response;
}

export async function getRequestById(idRequest, token) {
    var response = "";
    await fetch(BASE_URL + "/request/" + idRequest, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }).then(res => {
        if (res.status == 200) response = res.json();
    });
    return response;
}

/**
 * Update a treatment object
 * @param {String} idTreatment 
 * @param {Object} values 
 * @param {String} token 
 * @returns 
 */
export async function updateTreatment(idTreatment, values, token) {
    var response = "";
    await fetch(BASE_URL + "/treatment/update/" + idTreatment, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(values)
    }).then(res => {
        if (res.status == 200) response = res.json();
    });
    return response;
}

export async function getRequestsForPhUser(token){
    var response = "";

    await fetch(BASE_URL + "/request/for_phuser",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            }
        }
    ).then(res => {
        if(res.status == 200) response = res.json();
    });
    return response;
}