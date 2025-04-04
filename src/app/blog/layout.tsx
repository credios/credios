// app/blog/layout.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Importando o componente do CTA
import LoanCTA from '@/components/blog/loan-cta';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Barra superior com gradiente interativo */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] opacity-50" />
      </div>
      
      {/* Navegação do blog */}
      <div className="max-w-[1400px] mx-auto py-4 sm:py-6">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 mb-2 sm:mb-4">
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Voltar ao site</span>
          </Link>
          <Link 
            href="/blog" 
            className="font-semibold text-xl text-primary/90 hover:text-primary transition-colors"
          >
            Blog
          </Link>
        </div>
        
        {/* Conteúdo principal */}
        <main>
          {children}
        </main>
        
        {/* CTA Fixo para Simulador de Empréstimos */}
        <LoanCTA />
      </div>
      
    </div>
  );
}