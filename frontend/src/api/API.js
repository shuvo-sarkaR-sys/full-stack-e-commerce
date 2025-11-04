import axios from "axios";

// 1. Define the base URL using the environment variable (Vite style) 
//    with a local fallback.
// src/api/API.js
export const API_BASE_URL = import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://your-backend-name.onrender.com/api";

// 2. Create the Axios instance, using the defined constant for consistency.
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// 3. Add a request interceptor to automatically attach the JWT token 
//    from local storage to the Authorization header of every request.
API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, 
// Handle request errors
error => {
    return Promise.reject(error);
});

export default API;