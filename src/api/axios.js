import axios from "axios";

// Set your backend URL here
const api = axios.create({
  baseURL: "http://meteor.identitynull.uz/api/", // change if your backend runs elsewhere
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
