export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-09'

// Usar valor padrão 'production' se a variável de ambiente não existir
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Substituir por seu ID de projeto real
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'x1awvvk0'