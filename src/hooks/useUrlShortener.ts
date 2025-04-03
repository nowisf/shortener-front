import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/config";

export interface ShortenUrlRequest {
  url: string;
}

export interface ShortenUrlResponse {
  fullShortUrl: string;
}

interface ApiError {
  message?: string;
  error?: string;
}

/**
 * Hook para acortar URLs utilizando la API
 */
export function useUrlShortener(
  options?: UseMutationOptions<ShortenUrlResponse, Error, ShortenUrlRequest>
) {
  return useMutation<ShortenUrlResponse, Error, ShortenUrlRequest>({
    mutationFn: async (data: ShortenUrlRequest) => {
      const response = await fetch(API_ENDPOINTS.SHORTEN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMessage = "Error al acortar la URL.";
        try {
          const errorData = (await response.json()) as ApiError;
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          errorMessage = `Error del servidor: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const responseData = await response.json();

      // Validación de respuesta
      if (!responseData.fullShortUrl) {
        throw new Error(
          "La respuesta de la API no contiene la URL acortada esperada."
        );
      }

      return responseData as ShortenUrlResponse;
    },
    ...options,
  });
}
