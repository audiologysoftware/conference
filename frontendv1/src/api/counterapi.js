import apiClient from "./apiClient";
import { logInfo, logError } from "../utils/logger";

export const getCounter = async (token) =>{    
    try{
        const counter = await apiClient('/counter/')        
        if(counter.data < 1000 || counter.data == null){
            counter.data = 1000
        }
        return counter.data
    }catch(err){
        logError(err)
        return 1000
    }    
}
