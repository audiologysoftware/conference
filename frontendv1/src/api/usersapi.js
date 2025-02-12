import apiClient from "./apiClient";
import { logInfo, logError } from "../utils/logger";

class UserData{
  constructor( fullname="",  email="",  phone="",  bank_type="",  transaction_id="", transaction_screenshot="", extension="", content_type="",  file_size=0, email_type="")
  {
    this.fullname = fullname;
    this.email = email;
    this.phone = phone;
    this.bank_type = bank_type;
    this.transaction_id = transaction_id;
    this.transaction_screenshot = transaction_screenshot;  
    this.extension = extension;
    this.content_type = content_type;
    this.file_size = file_size;    
    this.email_type = email_type; 
  }
}

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
