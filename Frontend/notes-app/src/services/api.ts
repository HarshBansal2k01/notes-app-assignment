import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/", // Your backend API URL
});

export const signup = (email: string) => api.post("auth/signup", { email });
export const verifyOtp = (email: string, otp: string) =>
  api.post("auth/verify-otp", { email, otp });
export const login = (email: string) => api.post("/login", { email });
export const completeLogin = (email: string, otp: string) =>
  api.post("auth/complete-login", { email, otp });

export default api;
