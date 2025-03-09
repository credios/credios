// app/blog/layout.tsx
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, LightbulbIcon } from 'lucide-react';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Barra superior com gradiente */}
      <div className="h-1 w-full bg-gradient-to-r from-primary/80 via-primary to-primary/80" />
      
      {/* Navegação do blog */}
      <div className="max-w-[1400px] mx-auto py-6">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 mb-4">
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
        <div className="fixed bottom-8 right-8 z-50">
          <div className="bg-card shadow-xl rounded-xl p-5 border border-primary/10 max-w-[320px] transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-primary/10 p-2.5 rounded-full">
                <LightbulbIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-primary">Precisa de um empréstimo?</h4>
                <p className="text-sm text-muted-foreground mt-1 mb-3">Simule agora e receba uma proposta em minutos.</p>
              </div>
            </div>
            <Link 
              href="/simulador" 
              className={buttonVariants({ 
                variant: "default", 
                size: "sm", 
                className: "w-full font-medium transition-all hover:shadow-md" 
              })}
            >
              Simular Empréstimo
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t mt-20 py-10 bg-muted/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Credios. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="/termos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Termos de Uso
              </Link>
              <Link href="/privacidade" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/contato" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}