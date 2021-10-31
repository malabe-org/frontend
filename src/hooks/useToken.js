import { useState } from "react";

export default function useToken(){

    const getToken = () => {
        return localStorage.getItem("user");
    }

    const [token, setToken] = useState(getToken())

    const saveToken = user =>{
        localStorage.setItem("user", user);
        setToken(user);
    }

    return {
        token: token,
        setToken: saveToken
    }
}