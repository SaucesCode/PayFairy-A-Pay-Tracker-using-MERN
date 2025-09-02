import axios from "axios";

// Use environment variable if available, else fallback to dev/prod defaults
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/api");

const api = axios.create({
  baseURL: BASE_URL,
});

export { BASE_URL }; // so you can use this for images
export default api;
