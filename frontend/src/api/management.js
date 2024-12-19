import apiClient from "./apiClient";
import { logInfo, logError } from "../utils/logger";

// List All Users
export const listAllUsers = async () => {
  try {
    logInfo("Fetching all registered users");
    const response = await apiClient.get("/management/users");
    logInfo("Users fetched successfully", response.data);
    return response.data;
  } catch (error) {
    logError("Failed to fetch users", error);
    throw error.response?.data || "Failed to fetch users";
  }
};

// List All Manuscripts
export const listAllManuscripts = async () => {
  try {
    logInfo("Fetching all manuscripts");
    const response = await apiClient.get("/management/manuscripts");
    logInfo("Manuscripts fetched successfully", response.data);
    return response.data;
  } catch (error) {
    logError("Failed to fetch manuscripts", error);
    throw error.response?.data || "Failed to fetch manuscripts";
  }
};

// List Email Mismatches
export const listEmailMismatches = async () => {
  try {
    logInfo("Fetching email mismatches");
    const response = await apiClient.get("/management/email-mismatch");
    logInfo("Email mismatches fetched successfully", response.data);
    return response.data;
  } catch (error) {
    logError("Failed to fetch email mismatches", error);
    throw error.response?.data || "Failed to fetch email mismatches";
  }
};

// List Abstracts Without Manuscripts
export const listAbstractsWithoutManuscripts = async () => {
  try {
    logInfo("Fetching abstracts without manuscripts");
    const response = await apiClient.get("/management/abstracts-without-manuscripts");
    logInfo("Abstract-only records fetched successfully", response.data);
    return response.data;
  } catch (error) {
    logError("Failed to fetch abstracts without manuscripts", error);
    throw error.response?.data || "Failed to fetch abstracts without manuscripts";
  }
};

// List All Queries
export const listAllQueries = async () => {
  try {
    logInfo("Fetching all queries for management");
    const response = await apiClient.get("/management/queries");
    logInfo("Queries fetched successfully", response.data);
    return response.data;
  } catch (error) {
    logError("Failed to fetch queries for management", error);
    throw error.response?.data || "Failed to fetch queries";
  }
};

