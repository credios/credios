// components/blog/blog-footer.tsx
'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, ArrowUpRight } from 'lucide-react';

export default function BlogFooter() {
  return (
    <footer className="border-t mt-12 sm:mt-20 py-10 bg-gray-light">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-lg mb-4 text-blue-dark">Credios</h4>
            <p className="text-gray-text mb-4">
              Soluções de crédito fácil e descomplicado para você, quando você mais precisa.
            </p>
            <div className="flex items-center gap-3">
              {/* Ícones de redes sociais atualizados */}
              <a href="#" className="w-8 h-8 rounded-full bg-blue-pale flex items-center justify-center text-blue-primary hover:bg-blue-light/20 hover:text-blue-dark transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-blue-pale flex items-center justify-center text-blue-primary hover:bg-blue-light/20 hover:text-blue-dark transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-blue-pale flex items-center justify-center text-blue-primary hover:bg-blue-light/20 hover:text-blue-dark transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-blue-dark">Produtos</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/emprestimo-conta-luz" className="text-gray-text hover:text-orange-primary transition-colors flex items-center gap-1 group">
                  Empréstimo na Conta de Luz
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/emprestimo-fgts" className="text-gray-text hover:text-orange-primary transition-colors flex items-center gap-1 group">
                  Empréstimo com FGTS
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/simulador" className="text-gray-text hover:text-orange-primary transition-colors flex items-center gap-1 group">
                  Simulador
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-blue-dark">Informações</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/sobre" className="text-gray-text hover:text-orange-primary transition-colors flex items-center gap-1 group">
                  Sobre nós
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-text hover:text-orange-primary transition-colors flex items-center gap-1 group">
                  Contato
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/perguntas-frequentes" className="text-gray-text hover:text-orange-primary transition-colors flex items-center gap-1 group">
                  FAQ
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Linha separadora com gradiente */}
        <div className="h-px w-full bg-gradient-to-r from-blue-pale via-orange-pale to-blue-pale mb-6"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-text text-sm">
            © {new Date().getFullYear()} Credios. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/termos" className="text-sm text-gray-text hover:text-blue-primary transition-colors">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="text-sm text-gray-text hover:text-blue-primary transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/contato" className="text-sm text-gray-text hover:text-blue-primary transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}