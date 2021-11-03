import Identicon from "identicon.js";

// BASE URL of the backend
export const BASE_API_URL = "https://malabe-backend.herokuapp.com/api"

// BASE URL of the APIs
export const BASE_SERVER_URL = "https://malabe-backend.herokuapp.com"

// Form rule for require
export const requiredFormRule = [
    { required: true, message: "Ce champ est obligatoire." }
];

// The available addresses for Distribution Hub ceation
export const addresses = [
    {
        region: "Thies",
        departements: [
            {
                departement: "Thies",
                cities : [
                    "Thies", "Thies Nord", "Thies Est"
                ]
            }
        ]
    },
    {
        region: "Dakar",
        departements: [
            {
                departement: "Rufisque",
                cities : [
                    "Diamniadio", "Sebikotane"
                ]
            }
        ]
    }
]

// create a base64 encoded PNG
export const ICON_DATA = new Identicon('d3b07384d113edec49eaa6238ad5ff00', 420).toString();