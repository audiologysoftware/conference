export const logInfo = (message, data = null) => {
    console.info(`INFO: ${message}`, data);
  };
  
  export const logError = (message, error = null) => {
    console.error(`ERROR: ${message}`, error);
  };
  