import { BASE_API_URL } from "../utils/constants";

/**
 * 1. First, it calls the `getDhs()` function, passing in the token as an argument.
2. The `getDhs()` function returns a promise.
3. The `then()` function is called on the promise returned by `getDhs()`.
4. The `then()` function is passed a callback function.
5. The callback function is called with the response object as an argument.
6. The response object is parsed using the `JSON.parse()` function.
7. The parsed response object is returned.
 * @param {*} token 
 * @returns 
 */
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
/**
 * 1. First, it calls the `fetch()` function to send a POST request to the `/dh_hub/create` endpoint.
2. The `fetch()` function returns a promise, which is handled by the `then()` function.
3. If the POST request is successful, the `then()` function returns the response in JSON format.
4. The response is assigned to the `resp` variable.
5. The `resp` variable is returned at the end of the function.
 * @param {*} values 
 * @param {*} token 
 * @returns 
 */
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