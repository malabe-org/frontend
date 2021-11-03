import { addresses } from "./constants";

/**
 * 1. First, it creates an array of all the departements in the region.
2. Then, it iterates over the addresses array and checks if the region of the current address matches the region we’re looking for.
3. If it does, it adds the departements of the current address to the departements array.
4. If it doesn’t, it continues to the next address.
5. Once it’s done iterating, it returns the departements array.
 * @param {*} region 
 * @returns 
 */
export function getDepartmentByRegion(region) {
    var departements = [];
    addresses.map(address => {
        if (address.region == region) {
            departements = address.departements;
            return;
        }
    })
    return departements;
}
/**
 * 1. First, it creates an array of cities.
2. Then, it iterates over the addresses array.
3. For each address, it checks if the address’s region matches the region argument.
4. If it does, it iterates over the address’s departements array.
5. For each departement, it checks if the departement’s departement matches the departement argument.
6. If it does, it adds the departement’s cities array to the cities array.
7. If it doesn’t, it continues to the next departement.
8. Once it’s done iterating over the departements array, it returns the cities array.
 * @param {*} region 
 * @param {*} departement 
 * @returns 
 */
export function getCitiesByDepartment(region, departement) {
    var cities = [];
    addresses.map(address => {
        if (address.region == region) {
            address.departements.map((department) => {
                if (department.departement === departement) {
                    cities = department.cities;
                    return;
                }
            })
            return;
        }
    })
    return cities;
}
/**
 * 1. First, we get the number of treated requests by counting the number of requests that have a decision of OK or No-OK.
2. Then, we return the number of treated requests.
 * @param {*} requests 
 * @returns 
 */
export function getNumberOfTreatedRequests(requests) {
    var nbre = 0;
    requests.map(request => {
        if(request.treatment.decision === "OK" || request.treatment.decision === "No-OK"){
            nbre += 1;
        }
    });
    return nbre;
}