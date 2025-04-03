import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/animations.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CACHE_CONFIG } from "@/lib/config";

// Crear una instancia del cliente de Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Por defecto, reintenta las consultas fallidas una vez
      staleTime: CACHE_CONFIG.STALE_TIME, // Tiempo de vida de la caché desde la configuración
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* Activar las devtools solo en desarrollo */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </React.StrictMode>
);
