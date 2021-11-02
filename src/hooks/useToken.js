import { useState } from "react";

export default function useToken(){

    const getToken = () => {
        return localStorage.getItem("user");
    }

    const [token, setToken] = useState(getToken())

    const saveToken = user =>{
        if(user == undefined){
            localStorage.clear();
        }
        else{
            localStorage.setItem("user", JSON.stringify(user));
        }
        setToken(user);
    }

    return {
        token: token,
        setToken: saveToken
    }
}