import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuration Vite pour proxy vers Laravel API
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        // En environnement Docker, joindre le service PHP-FPM/Nginx par son nom
        target: "http://app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
