import axios from "@/api/lib/axios";
// This file contains API calls related to user authentication
export const loginUser = (email: string, password: string) => {
   return axios.post("v1/auth/login", { email, password });
};

export const getCurrentUser = () => {
  return axios.get("v1/auth/me");
};

export const logoutUser = () => {
  return axios.post("v1/auth/logout");
};
