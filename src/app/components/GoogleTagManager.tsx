// components/GoogleTagManager.tsx
'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GoogleTagManager({ GTM_ID }: { GTM_ID: string }) {
  const pathname = usePathname();
  
  // Abordagem segura para obter parâmetros de URL sem causar problemas de hidratação
  const [searchParams, setSearchParams] = useState<string>('');
  
  // Usar um método mais seguro para obter searchParams
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Obter a string de query da URL
      setSearchParams(window.location.search);
      
      // Configurar um ouvinte para mudanças de rota
      const handleRouteChange = () => {
        setSearchParams(window.location.search);
      };
      
      window.addEventListener('popstate', handleRouteChange);
      return () => window.removeEventListener('popstate', handleRouteChange);
    }
  }, []);

  // Enviar visualizações de página para o dataLayer quando a rota muda
  useEffect(() => {
    if (pathname && typeof window !== 'undefined') {
      window.dataLayer?.push({
        event: 'pageview',
        page: pathname + searchParams,
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}

// Adicione esta declaração para o TypeScript reconhecer o dataLayer no objeto window
declare global {
  interface Window {
    dataLayer: { [key: string]: string | number | boolean | undefined; }[];
  }
}