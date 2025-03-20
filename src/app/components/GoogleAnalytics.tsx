'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const pathname = usePathname();
  const [searchParams, setSearchParams] = useState<string>('');
  
  // Usar um método mais seguro para obter searchParams
  useEffect(() => {
    // Só executar no navegador
    if (typeof window !== 'undefined') {
      // Obter a string de query da URL do navegador
      const queryString = window.location.search;
      setSearchParams(queryString);
      
      // Setup a listener for changes
      const handleRouteChange = () => {
        setSearchParams(window.location.search);
      };
      
      window.addEventListener('popstate', handleRouteChange);
      return () => window.removeEventListener('popstate', handleRouteChange);
    }
  }, []);

  // Enviar pageview quando o pathname ou searchParams mudar
  useEffect(() => {
    if (pathname && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname + searchParams,
      });
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname + window.location.search,
            });
          `,
        }}
      />
    </>
  );
}

// Adicione esta declaração global para o TypeScript reconhecer window.gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'js' | 'event',
      targetId: string,
      config?: {
        page_path?: string;
        [key: string]: string | undefined;
      }
    ) => void;
    dataLayer: Array<{
      [key: string]: string | number | boolean | undefined;
    }>;
  }
}