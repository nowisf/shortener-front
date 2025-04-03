/**
 * Configuración de entorno y URLs para la aplicación
 */

// URLs de la API
export const API_ENDPOINTS = {
  // Endpoint para acortar URLs
  SHORTEN: "/api/shortner",

  // Endpoint para obtener estadísticas de una URL corta
  // Se ha comentado ya que no se usa actualmente, pero está disponible en la API
  // STATS: (code: string) => `/api/stats/${code}`,
};

// Configuración de caché
export const CACHE_CONFIG = {
  // Tiempo de vida de la caché en milisegundos (5 minutos)
  STALE_TIME: 5 * 60 * 1000,
};
