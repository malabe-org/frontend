import { addresses } from "./constants";

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