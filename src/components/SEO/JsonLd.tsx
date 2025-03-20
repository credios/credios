'use client';

interface JsonLdProps {
  data: Record<string, string | number | boolean | null | Record<string, unknown> | Record<string, unknown>[] | string[]>;
}

/**
 * Componente para injetar schema.org JSON-LD na página
 * Melhora a compreensão dos mecanismos de busca sobre o conteúdo da página
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      key="json-ld" // Adicionada uma chave única
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}