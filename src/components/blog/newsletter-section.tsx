// components/blog/newsletter-section.tsx
'use client';

import { Mail, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function NewsletterSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden bg-blue-pale bg-opacity-50 rounded-2xl p-8 sm:p-10 md:p-12 mb-16"
    >
      {/* Elementos decorativos com círculos */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-light bg-opacity-20 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute top-1/4 left-0 w-16 h-16 bg-orange-pale rounded-full -translate-x-1/2" />
      <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-blue-light bg-opacity-10 rounded-full translate-y-1/2" />
      
      <div className="relative max-w-3xl mx-auto text-center z-10">
        {/* Ícone circular com fundo azul */}
        <div className="inline-flex items-center justify-center p-2.5 bg-blue-primary text-white rounded-full mb-6 shadow-md">
          <Mail size={24} />
        </div>
        
        {/* Título em azul escuro */}
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-dark">Receba dicas exclusivas</h3>
        
        {/* Texto explicativo em cinza */}
        <p className="text-gray-text mb-8 max-w-lg mx-auto">
          Inscreva-se para receber conteúdo exclusivo sobre finanças pessoais, 
          empréstimos e como economizar dinheiro no dia a dia.
        </p>
        
        {/* Formulário com input e botão */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <Input 
            placeholder="Seu melhor email" 
            className="h-12 rounded-full px-5 border-blue-light border-opacity-30 focus:border-blue-light shadow-sm"
          />
          <Button 
            className="h-12 px-6 rounded-full font-medium bg-orange-primary hover:bg-orange-dark transition-all shadow-md hover:shadow-lg text-white"
          >
            Inscrever-se
            <ChevronRight size={18} className="ml-1" />
          </Button>
        </div>
        
        {/* Nota de rodapé em texto menor */}
        <p className="text-xs text-gray-text mt-4">
          Ao se inscrever, você concorda com nossa política de privacidade. 
          Não enviamos spam e você pode cancelar a qualquer momento.
        </p>
      </div>
    </motion.div>
  );
}