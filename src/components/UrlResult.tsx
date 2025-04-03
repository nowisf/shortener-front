"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCopy, ExternalLink } from "lucide-react";

interface UrlResultProps {
  shortenedUrl: string;
}

/**
 * Componente para mostrar y manejar la URL acortada resultante
 */
export default function UrlResult({ shortenedUrl }: UrlResultProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const [animateCopyError, setAnimateCopyError] = useState(false);

  // Efecto para animar el error cuando aparece
  useEffect(() => {
    if (copyError) {
      setAnimateCopyError(true);
      const timer = setTimeout(() => {
        setAnimateCopyError(false);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setAnimateCopyError(false);
    }
  }, [copyError]);

  /**
   * Copia la URL al portapapeles
   */
  const copyToClipboard = async (): Promise<void> => {
    setCopyError("");
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error al copiar al portapapeles:", error);
      setCopyError("No se pudo copiar al portapapeles. Permiso denegado.");
    }
  };

  // No renderizar nada si no hay URL acortada
  if (!shortenedUrl) return null;

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg w-full" aria-live="polite">
      <h3 className="text-lg font-semibold mb-3 text-gray-900">
        ¡URL acortada!
      </h3>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <a
          href={shortenedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 font-medium overflow-hidden text-ellipsis whitespace-nowrap hover:underline max-w-full"
          aria-label="Abrir URL acortada en nueva pestaña"
        >
          <span>{shortenedUrl}</span>
          <ExternalLink
            className="ml-2 h-4 w-4 flex-shrink-0"
            aria-hidden="true"
          />
        </a>
        <Button
          variant="outline"
          size="sm"
          className="flex-shrink-0 w-full sm:w-auto transition-transform active:scale-95"
          onClick={copyToClipboard}
          aria-label={
            copied
              ? "URL copiada al portapapeles"
              : "Copiar URL al portapapeles"
          }
        >
          <ClipboardCopy className="mr-2 h-4 w-4" aria-hidden="true" />
          {copied ? "¡Copiado!" : "Copiar"}
        </Button>
      </div>
      {copyError && (
        <p
          className={`text-red-500 text-sm mt-2 ${
            animateCopyError ? "animate-error-shake" : ""
          }`}
          role="alert"
        >
          {copyError}
        </p>
      )}
    </div>
  );
}
