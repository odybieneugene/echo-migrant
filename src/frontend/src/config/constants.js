// Configuration des URLs de l'application

// URL de base de l'API
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// URL du stockage des fichiers (images uploadées)
export const STORAGE_URL = `${API_BASE_URL}/storage`;

// Fonction helper pour construire l'URL complète d'une image
export const getImageUrl = (imagePath, fallback = null) => {
  if (!imagePath) return fallback;
  // Si l'image est déjà une URL complète (http ou https), la retourner telle quelle
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Sinon, construire l'URL complète vers le storage Laravel
  return `${STORAGE_URL}/${imagePath}`;
};
