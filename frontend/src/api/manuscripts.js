import apiClient from "./apiClient";
import { logInfo, logError } from "../utils/logger";

// Upload Abstract
export const uploadAbstract = async (abstractData) => {
  try {
    logInfo("Uploading abstract", abstractData);
    const response = await apiClient.post("/manuscripts/abstract", abstractData);
    logInfo("Abstract uploaded successfully", response.data);
    return response.data;
  } catch (error) {
    logError("Failed to upload abstract", error);
    throw error.response?.data || "Failed to upload abstract";
  }
};

// Get Author Names by Email
export const getAuthorNames = async (email) => {
  try {
    logInfo(`Fetching author names for email: ${email}`);
    const response = await apiClient.get(`/manuscripts/author-names/${email}`);
    logInfo("Author names fetched successfully", response.data);
    return response.data;
  } catch (error) {
    logError(`Failed to fetch author names for email: ${email}`, error);
    throw error.response?.data || "Failed to fetch author names";
  }
};

// Upload Manuscript
export const uploadManuscript = async (manuscriptData) => {
  try {
    logInfo("Uploading manuscript", manuscriptData);
    const response = await apiClient.post("/manuscripts/upload", manuscriptData);
    logInfo("Manuscript uploaded successfully", response.data);
    return response.data;
  } catch (error) {
    logError("Failed to upload manuscript", error);
    throw error.response?.data || "Failed to upload manuscript";
  }
};
