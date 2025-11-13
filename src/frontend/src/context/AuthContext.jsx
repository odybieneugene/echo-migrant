import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Charger le profil utilisateur au démarrage si token existe
  useEffect(() => {
    if (token) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUserProfile = async () => {
    try {
      const response = await api.get("/profile");
      setUser(response.data.user || response.data);
    } catch (error) {
      console.error("Erreur chargement profil:", error);
      logout(); // Token invalide, déconnexion
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      const { token: newToken, user: userData } = response.data;

      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || "Erreur de connexion",
      };
    }
  };

  const register = async (nom, prenom, email, password, role = "lecteur") => {
    try {
      const response = await api.post("/register", {
        nom,
        prenom,
        email,
        password,
        role,
      });
      const { token: newToken, user: userData } = response.data;

      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Erreur d'inscription",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Vérifier si l'utilisateur a un rôle autorisé
  const hasRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  // Vérifier si l'utilisateur peut modifier des articles
  const canManageArticles = () => {
    return hasRole(["admin", "journaliste", "redacteur"]);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    hasRole,
    canManageArticles,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};
