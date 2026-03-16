import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api"
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
