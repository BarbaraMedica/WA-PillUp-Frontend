import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://wa-pillup-back-end.onrender.com/api";

const api = axios.create({
  baseURL
});

// Interceptor za dodavanje tokena
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//ako 401, preusmjeri na prijavu
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/prijava";
    }
    return Promise.reject(error);
  }
);

export default api;
