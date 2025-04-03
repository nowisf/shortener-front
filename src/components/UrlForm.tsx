"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface UrlFormProps {
  url: string;
  setUrl: (url: string) => void;
  handleShorten: () => void;
  isLoading: boolean;
  error: string;
}

/**
 * Componente para el formulario de ingreso de URL
 */
export default function UrlForm({
  url,
  setUrl,
  handleShorten,
  isLoading,
  error,
}: UrlFormProps) {
  const [animateError, setAnimateError] = useState(false);

  // Efecto para animar el error cuando aparece
  useEffect(() => {
    if (error) {
      setAnimateError(true);
      const timer = setTimeout(() => {
        setAnimateError(false);
      }, 600); // Duración de la animación shake

      return () => clearTimeout(timer);
    } else {
      setAnimateError(false);
    }
  }, [error]);

  // Manejador para el evento de presión de tecla Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !isLoading) {
      handleShorten();
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <Input
          className="flex-grow"
          type="url"
          placeholder="https://ejemplo.com/url-muy-larga-que-quieres-acortar"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          aria-label="URL a acortar"
        />
        <Button
          className="whitespace-nowrap transition-transform active:scale-95"
          onClick={handleShorten}
          disabled={isLoading}
          aria-label={isLoading ? "Acortando URL..." : "Acortar URL"}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Acortando
            </>
          ) : (
            "Acortar"
          )}
        </Button>
      </div>

      {error && (
        <Alert
          variant="destructive"
          className={`mt-4 ${animateError ? "animate-shake" : ""}`}
          role="alert"
        >
          <AlertDescription className="text-red-600">{error}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
