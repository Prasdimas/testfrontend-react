import axios from "axios";

const API = axios.create({
  baseURL: "http://test-291124.vynz.my.id/api", 
});

API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (email: string, password: string) =>
  API.post("/auth/login", { email, password });

export const fetchProfile = () => API.get("/profile");

export const logoutUser = () => API.get("/auth/logout");
