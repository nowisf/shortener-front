/**
 * Configuración de entorno y URLs para la aplicación
 */

// URLs de la API
// src/lib/config.ts
// La URL base de la API, diferente según el entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const IS_DEVELOPMENT = import.meta.env.DEV;

// Endpoints de la API
export const API_ENDPOINTS = {
  // En desarrollo, usa el proxy local (/api/...)
  // En producción, usa la URL completa de la API
  SHORTEN: IS_DEVELOPMENT ? "/api/shortner" : `${API_BASE_URL}/shortner`,
};

// Configuración de caché
export const CACHE_CONFIG = {
  // Tiempo de vida de la caché en milisegundos (5 minutos)
  STALE_TIME: 5 * 60 * 1000,
};
