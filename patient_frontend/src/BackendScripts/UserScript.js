import axios from "axios";
import {API_USER} from "../config";

const authConfig = (token) =>{
    return{
        headers : {
            'Authorization': 'Bearer ' + token
        }
    }
}

export async function login(username, password){
    const url = `${API_USER}/login`;
    const data = {
        uName: username,
        password: password,
    };

    try {
        const result = await axios.post(url, data);
        if(result.data)
            return result.data
    } catch (error) {
        console.log(error);
    }
    return -1;
}

//Lägg till fullName som parameter
export async function createAccount(id, role, fullName){
    const url = `${API_USER}/add`;
    const data = {
        id: id,
        role: role,
        fullName: fullName
    };

    try {
        const result = await axios.post(url, data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getRoleFor(uId, token){
    const url = `${API_USER}/${uId}/role`;

    try {
        const result = await axios.get(url, authConfig(token));
        return {role: result.data}
        //return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getUserById(uId, token){
    const url = `${API_USER}/${uId}`;

    try {
        const result = await axios.get(url, authConfig(token));
        return result.data
        //return result.data;
    } catch (error) {
        console.log(error);
    }
}