import apiClient from "./apiClient";
import { logInfo, logError } from "../utils/logger";

export const getCounter = async (token) =>{    
    try{
        const response = await apiClient('/counter/')        
        console.log("apifunction", response)
        if(response.data.detail.data < 1000 || response.data.detail.data == null){
            response.data.data.detail.data  = 1000
        }
        return response.data.detail.data
    }catch(err){
        logError(err)
        return 1000
    }    
}
