import { BASE_API_URL } from "../utils/constants";

/**
 * Get the requests of a specific seeker
 * 1. First, it calls the getRequestBySeeker() function and passes in the idSeeker and token as arguments.
2. It then uses the await keyword to wait for the response from the server.
3. If the response status is 200, it returns the response.
4. If the response status is not 200, it returns an error message.
 * @param {*} idSeeker 
 * @param {*} token 
 * @returns 
 */
export async function getRequestBySeeker(idSeeker, token) {
    var response = "";
    await fetch(BASE_API_URL + "/request/seeker/" + idSeeker, {
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

/**
 * Get the request by the Id of the request
 * 1. First, it calls the `getRequestById` function with the id of the request and the token.
2. It then checks if the response is a success. If it is, it returns the response.
3. If it’s not a success, it returns an error.
 * @param {*} idRequest 
 * @param {*} token 
 * @returns 
 */
export async function getRequestById(idRequest, token) {
    var response = "";
    await fetch(BASE_API_URL + "/request/" + idRequest, {
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
 * 1. First, it calls the `fetch()` function to send a PUT request to the server.
2. The `fetch()` function returns a promise, which is handled by the `then()` function.
3. The `then()` function checks the response status code. If the status code is 200, it returns the response body.
4. The response body is parsed as JSON and assigned to the `response` variable.
5. Finally, the `response` variable is returned from the function.
 * @param {String} idTreatment 
 * @param {Object} values 
 * @param {String} token 
 * @returns 
 */
export async function updateTreatment(idTreatment, values, token) {
    var response = "";
    await fetch(BASE_API_URL + "/treatment/update/" + idTreatment, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(values)
    }).then(res => {
        if (res.status == 200) response = res.json();
    });
    // console.log(response);
    return response;
}

/**
 * Get the list of requests for a specific processing HUB user
 * 1. First, it calls the `getRequestsForPhUser` function, passing in the token as an argument.
2. The function returns a promise, which is then passed to the `then` method.
3. The `then` method is called with the response from the API call.
4. If the response status is 200, the `then` method returns the response.
5. If the response status is not 200, the `then` method returns an empty object.
6. The `then` method returns the response to the `getRequestsForPhUser` function.
7. The `getRequestsForPhUser` function returns the response to the JavaScript code that called it.
 * @param {*} token 
 * @returns 
 */
export async function getRequestsForPhUser(token){
    var response = "";

    await fetch(BASE_API_URL + "/request/for_phuser",
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

/**
 * Get the list of requests for a specific DH user
 * @param {*} idDh 
 * @param {*} token 
 * @returns 
 */
export async function getRequestForDh(idDh, token) {
    var response = "";

    await fetch(BASE_API_URL + "/request/dh_hub/" + idDh,
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