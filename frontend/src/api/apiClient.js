import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
