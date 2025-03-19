// Tipos para os schemas
type WebsiteSchemaType = {
    '@context': string;
    '@type': string;
    name: string;
    url: string;
    potentialAction: {
      '@type': string;
      target: string;
      'query-input': string;
    };
  };
  
  type PageSchemaType = {
    '@context': string;
    '@type': string;
    url: string;
    name?: string;
    description?: string;
    isPartOf: {
      '@id': string;
    };
  };
  
  type ArticleSchemaType = {
    '@context': string;
    '@type': string;
    headline: string;
    image: string[];
    datePublished: string;
    dateModified: string;
    author: {
      '@type': string;
      name: string;
    };
    publisher: {
      '@type': string;
      name: string;
      logo: {
        '@type': string;
        url: string;
      };
    };
    description?: string;
    mainEntityOfPage: {
      '@type': string;
      '@id': string;
    };
  };
  
  // Constantes
  const SITE_NAME = 'Crédios';
  const DEFAULT_LOGO = '/logo.png'; // Ajuste para o caminho correto do logo
  
  // Funções geradoras de schemas
  export function generateWebsiteSchema(siteUrl: string): WebsiteSchemaType {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': SITE_NAME,
      'url': siteUrl,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${siteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
  }
  
  export function generatePageSchema(
    pageUrl: string,
    title?: string,
    description?: string,
    siteUrl?: string
  ): PageSchemaType {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'url': pageUrl,
      'name': title,
      'description': description,
      'isPartOf': {
        '@id': siteUrl || process.env.NEXT_PUBLIC_SITE_URL || ''
      }
    };
  }
  
  export function generateArticleSchema(
    pageUrl: string,
    title: string,
    image: string,
    description?: string
  ): ArticleSchemaType {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': title,
      'image': [image],
      'datePublished': new Date().toISOString(),
      'dateModified': new Date().toISOString(),
      'author': {
        '@type': 'Organization',
        'name': SITE_NAME
      },
      'publisher': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'logo': {
          '@type': 'ImageObject',
          'url': `${process.env.NEXT_PUBLIC_SITE_URL}${DEFAULT_LOGO}`
        }
      },
      'description': description,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': pageUrl
      }
    };
  }
  
  // Você pode adicionar mais funções para outros tipos de schemas conforme necessário
  // Por exemplo: LocalBusiness, FAQ, HowTo, etc.