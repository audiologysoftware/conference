import apiClient from "./apiClient";
import { logInfo, logError } from "../utils/logger";

// Register User
export const registerUser = async (userData) => {
  try {
    logInfo("Attempting to register user", userData);
    const response = await apiClient.post("/users/register", userData);
    logInfo("User registration successful", response.data);
    return response.data;
  } catch (error) {
    logError("User registration failed (Check EmailID and TransactionId)", error);
    throw error.response?.data || "Registration failed";
  }
};

// Get User by Email
export const getUserByEmail = async (email) => {
  try {
    logInfo(`Fetching user data for email: ${email}`);
    const response = await apiClient.get(`/users/user?email=${email}`);
    logInfo("User data fetched successfully", response.data);
    return response.data;
  } catch (error) {
    logError(`Failed to fetch user data for email: ${email}`, error);
    throw error.response?.data || "Failed to fetch user data";
  }
};
