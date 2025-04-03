"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UrlForm from "@/components/UrlForm";
import UrlResult from "@/components/UrlResult";
import { useUrlShortener } from "@/hooks/useUrlShortener";

/**
 * Componente principal de la aplicación para acortar URLs
 */
export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");

  // Usar TanStack Query para la mutación de acortar URL
  const shortenUrlMutation = useUrlShortener({
    // Manejadores de eventos integrados de TanStack Query
    onSuccess: (data) => {
      setShortenedUrl(data.fullShortUrl);
    },
    onError: (err) => {
      setError(
        err instanceof Error
          ? err.message
          : "Error inesperado al acortar la URL"
      );
    },
  });

  /**
   * Validar que la URL tenga un formato válido
   */
  const validateUrl = (url: string): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Manejar la acción de acortar URL
   */
  const handleShorten = async () => {
    // Resetear estados
    setError("");
    setShortenedUrl("");

    // Validar entrada
    if (!url) {
      setError("Por favor, ingresa una URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("Por favor, ingresa una URL válida");
      return;
    }

    // Ejecutar la mutación
    shortenUrlMutation.mutate({ url });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="text-center py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Corta CL</h1>
        <p className="text-gray-500 text-lg">
          Acorta tus enlaces de forma rápida y sencilla
        </p>
      </header>

      <main className="flex-grow flex flex-col items-center p-4">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="text-center">Acorta tu URL</CardTitle>
          </CardHeader>
          <CardContent>
            <UrlForm
              url={url}
              setUrl={setUrl}
              handleShorten={handleShorten}
              isLoading={shortenUrlMutation.isPending}
              error={error}
            />
            <UrlResult shortenedUrl={shortenedUrl} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
