import apiClient from "./apiClient";
import axios from "axios";
import { logError, logInfo } from "../utils/logger";

export const getToken = async (user_data) => {
    try {
        const response = await apiClient.post("/auth/login", user_data)
        const token = response.data;
        return token;
    }
    catch (error) {
        logError("Failed to fetch token", error);
    }
}

export const verifyToken = async(token) =>{
    try{
       const response = await apiClient.get("auth/test-protected-route")   
       const data = response.data
       logInfo("Token is valid", data)
       return data;
    }
    catch(error){
        logError("Failed to test token", error);
    }
}

// Separate function to handle the login API call
export const loginApi = async (credentials) => {
    try{
        const response = await apiClient.post('auth/login', credentials);
        return response.data;    
    }catch(error){
        logError("Failed to login", error);
        alert("Failed to login. Please check your credentials and try again.");
    }
};
