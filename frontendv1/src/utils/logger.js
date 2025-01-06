const debugLevel = process.env.REACT_APP_LOGGING_LEVEL

console.log("Debug level: ", debugLevel);

export const logInfo = (message, data = null) => {  
    if(debugLevel=="DEBUG")
        console.info(`INFO: ${message}`, data);            
  };
  
  export const logError = (message, error = null) => {
    if(debugLevel=="DEBUG")   
      console.error(`ERROR: ${message}`, error);
  };
  