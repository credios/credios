'use client';

import { usePathname } from 'next/navigation';
import { JsonLd } from './JsonLd';
import { generateWebsiteSchema, generatePageSchema, generateArticleSchema } from './schemas';

interface PageSEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

export function PageSEO({ 
  title, 
  description, 
  image = '/images/site-default-image.jpg',
  type = 'website'
}: PageSEOProps) {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://credios.com.br';
  const pageUrl = `${siteUrl}${pathname}`;
  
  // Esquema básico do site (sempre incluído)
  const websiteSchema = generateWebsiteSchema(siteUrl);
  
  // Esquema específico da página ou artigo
  const contentSchema = type === 'article' && title
    ? generateArticleSchema(pageUrl, title, image, description)
    : generatePageSchema(pageUrl, title, description, siteUrl);

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={contentSchema} />
    </>
  );
}