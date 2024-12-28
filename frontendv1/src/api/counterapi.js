import apiClient from "./apiClient";
import { logInfo, logError } from "../utils/logger";

export const getCounter = async () =>{
    try{
        const counter = await apiClient('/counter/') 
        logInfo(counter.data)
        return counter.data
    }catch(err){
        logError(err)
        return 1000
    }    
}
