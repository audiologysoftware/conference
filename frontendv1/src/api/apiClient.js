import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8000/api";


const apiClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add an Axios request interceptor (ADDITIONAL CODE)
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;        
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
