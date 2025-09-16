import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/api");

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or however you store it
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { BASE_URL };
export default api;
