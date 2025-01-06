import apiClient from "./apiClient";
import { logInfo, logError } from "../utils/logger";

// Add Query
export const addQuery = async (queryData) => {
  try {
    logInfo("Adding query", queryData);
    const response = await apiClient.post("/query/add-query", queryData);
    logInfo("Query submitted successfully", response.data);
    return response.data;
  } catch (error) {
    logError("Failed to submit the query", error);
    throw error.response?.data || "Failed to submit the query";
  }
};

// List All Queries
export const getAllQueries = async () => {
  try {
    logInfo("Fetching all queries");
    const response = await apiClient.get("/queries");
    logInfo("Queries fetched successfully", response.data);
    return response.data;
  } catch (error) {
    logError("Failed to fetch queries", error);
    throw error.response?.data || "Failed to fetch queries";
  }
};
