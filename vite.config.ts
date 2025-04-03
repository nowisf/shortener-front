import path from "path";
// No necesitamos importar tailwindcss aquí si se configura bajo css.postcss
// import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Importar la configuración de Tailwind
// import tailwindConfig from "./tailwind.config.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configurar Tailwind a través de las opciones de PostCSS
  css: {
    postcss: "./postcss.config.cjs",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Agregar configuración de proxy para evitar problemas de CORS durante el desarrollo
  server: {
    proxy: {
      // Redireccionar todas las peticiones que van a /api/... a http://localhost:3000/...
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
