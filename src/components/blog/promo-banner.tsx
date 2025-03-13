// components/blog/promo-banner.tsx
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function PromoBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl overflow-hidden bg-blue-600 mb-12 shadow-lg"
    >
      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3 p-8 md:p-10">
          {/* Badge com fundo semi-transparente */}
          <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4 border-none">
            Empréstimo na Conta de Luz
          </Badge>
          
          {/* Título principal em branco */}
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Precisando de dinheiro rápido e sem burocracia?
          </h3>
          
          {/* Texto explicativo */}
          <p className="text-white/90 mb-6 max-w-lg">
            Simule agora mesmo um empréstimo que utiliza sua fatura de energia como garantia.
            Até R$ 3.300 sem comprovação de renda!
          </p>
          
          {/* Botão de ação único e destacado */}
          <div>
            <Button 
              size="lg" 
              className="bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 rounded-full shadow-md px-8 py-6 font-medium border-2 border-orange-400 hover:scale-105"
              asChild
            >
              <Link href="https://credios.com.br/simulador">
                Simular Agora
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Área da imagem com overlay */}
        <div className="md:col-span-2 relative hidden md:block">
          <div className="absolute inset-0 bg-[url('/images/light-bill.jpg')] bg-cover bg-center opacity-80" />
          <div className="absolute inset-0 bg-blue-900/30" />
        </div>
      </div>
    </motion.div>
  );
}