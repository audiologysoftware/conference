import apiClient from "./apiClient";
import { logInfo, logError } from "../utils/logger";

// Upload Abstract
export const uploadAbstract = async (abstractData) => {
  try {
    logInfo("Uploading abstract", abstractData);
    const response = await apiClient.post("/manuscripts/upload-abstract", abstractData);
    logInfo("Abstract uploaded successfully", response.data);
    return response.data;
  } catch (error) {
    logError(`Failed to upload abstract ${error}`);
    throw error.response?.data || "Failed to upload abstract";    
  }
};

export const getTitles = async (emailId) => {
  try {
    logInfo("Fetching titles");
    const response = await apiClient.get(`/manuscripts/get-titles?email_id=${emailId}`);
    logInfo("Titles fetched successfully", response.data);
    return response.data;
  } catch (error) {
    logError("Failed to fetch titles", error);
    return { titles: [] };
  }
};

// Get Author Names by Email
export const getAuthorNames = async (id) => {
  try {
    logInfo(`Fetching author names for ID: ${id}`);
    const response = await apiClient.get(`/manuscripts/get-authors/?id=${id}`);
    logInfo("Author names fetched successfully", response.data);
    return response.data;
  } catch (error) {
    logError(`Failed to fetch author names for ID: ${id}`, error);
    return "";
  }
};

// Upload Manuscript
export const uploadManuscript = async (manuscriptData) => {
  try {
    logInfo("Uploading manuscript", manuscriptData);
    const response = await apiClient.put("/manuscripts/upload-manuscript", manuscriptData);
    logInfo(response.data);
    return response.data;
  } catch (error) {
    logError("Failed to upload manuscript", error);
    throw error.response?.data || "Failed to upload manuscript";
    return
  }
};

