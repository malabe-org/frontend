import Identicon from "identicon.js";

export const BASE_API_URL = "https://malabe-backend.herokuapp.com/api"


export const requiredFormRule = [
    { required: true, message: "Ce champ est obligatoire." }
];

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
                    "Diamnidio", "Sebikotane"
                ]
            }
        ]
    }
]

// create a base64 encoded PNG
export const ICON_DATA = new Identicon('d3b07384d113edec49eaa6238ad5ff00', 420).toString();