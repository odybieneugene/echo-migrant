import axios from "axios";

const api = axios.create({
  baseURL: "/api", // utilise le proxy Vite en dev (Docker)
  headers: {
    // Ne pas fixer Content-Type globalement pour laisser FormData gérer le multipart
    Accept: "application/json",
  },
});

// Ajoute automatiquement le token Bearer si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
