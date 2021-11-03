import { useState } from "react";

/**
 * 1. We’re creating a function called getToken that returns the user token from localStorage.
2. We’re creating a function called saveToken that saves the user token to localStorage.
3. We’re creating a function called getUserToJson that returns the user token as a JSON object.
4. We’re creating a function called useToken that returns the user token and the functions getToken, saveToken, and getUserToJson.
 * @returns 
 */
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