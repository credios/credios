// app/aprovacao-emprestimo-conta-de-luz/layout.tsx
import type { Metadata } from 'next';
import Footer from '@/components/ui/footer'; // Correção na importação
import '../globals.css'; // Importa os estilos globais

export const metadata: Metadata = {
  title: 'Aprovação de Empréstimo na Conta de Luz | Credios',
  description: 'Complete seu cadastro para finalizar a contratação do empréstimo na conta de luz.',
};

export default function EmprestimoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        {/* Aqui colocamos apenas o conteúdo, sem o menu */}
        <div className="flex-grow">
          {children}
        </div>
        
        {/* Mantemos apenas o footer */}
        <Footer />
      </body>
    </html>
  );
}