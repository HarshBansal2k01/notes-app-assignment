import axios from "axios";

const api = axios.create({
  baseURL: "https://notes-app-backend-i50f.onrender.com/api/", // Your backend API URL
 
});
// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = (email: string, name: string, DateOfBirth: Date) =>
  api.post("auth/signup", { email, name, DateOfBirth });
export const verifyOtp = (email: string, otp: string) =>
  api.post("auth/verify-otp", { email, otp });
export const login = (email: string) => api.post("auth/login", { email });
export const completeLogin = (email: string, otp: string) =>
  api.post("auth/complete-login", { email, otp });
export const logout = () => api.post("auth/logout");

// Notes APIs
export const createNote = (title: string, content: string) =>
  api.post("notes/", { title, content });

export const fetchNotes = () => api.get("notes/");
export const fetchUser = () => api.get("notes/getuser");

export const updateNote = (id: string, title: string, content: string) =>
  api.put(`notes/${id}`, { title, content });

export const deleteNote = (id: string) => api.delete(`notes/${id}`);

export default api;
