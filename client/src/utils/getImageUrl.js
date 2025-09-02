// utils/getImageUrl.js
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "";

export const getImageUrl = path => `${BASE_URL}${path}`;
