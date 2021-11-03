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

    const getUserToJson = () => {
        try {
          return JSON.parse(token)
        } catch (error) {
          return token
        }
    }
    
    return {
        token: token,
        setToken: saveToken,
        getUserToJson: getUserToJson
    }
}