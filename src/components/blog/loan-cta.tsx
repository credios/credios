// components/blog/loan-cta.tsx
'use client';

import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";
import { LightbulbIcon, ArrowRight, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoanCTA() {
  const [isVisible, setIsVisible] = useState(true);
  
  // Verificar se já foi fechado anteriormente
  useEffect(() => {
    const ctaClosed = localStorage.getItem('credios-cta-closed');
    if (ctaClosed) {
      setIsVisible(false);
    }
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('credios-cta-closed', 'true');
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-50"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.7 }}
        >
          <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-medium border-opacity-30 max-w-[320px] transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            {/* Cabeçalho com gradiente laranja */}
            <div className="relative bg-gradient-orange px-5 py-4">
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-white text-opacity-80 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <XCircle size={20} />
              </button>
              
              <div className="flex items-start gap-4">
                <div className="bg-white bg-opacity-20 p-2.5 rounded-full mt-1 backdrop-blur-sm">
                  <LightbulbIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white">Empréstimo Facilitado</h4>
                  <p className="text-sm text-white text-opacity-90 mt-1">
                    Até R$ 3.300 sem comprovação de renda
                  </p>
                </div>
              </div>
            </div>
            
            {/* Corpo com fundo branco */}
            <div className="p-5">
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-5 h-5 rounded-full bg-orange-pale flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-primary" />
                  </div>
                  <span className="text-sm text-gray-text font-medium">Aprovação rápida</span>
                </div>
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-5 h-5 rounded-full bg-orange-pale flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-primary" />
                  </div>
                  <span className="text-sm text-gray-text font-medium">Sem burocracia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-pale flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-primary" />
                  </div>
                  <span className="text-sm text-gray-text font-medium">Parcelas na conta de luz</span>
                </div>
              </div>
              
              {/* Botão com cor laranja para destaque */}
              <Link 
                href="https://credios.com.br/simulador" 
                className={buttonVariants({ 
                  className: "w-full font-medium transition-all hover:shadow-md rounded-full justify-center bg-orange-primary hover:bg-orange-dark text-white" 
                })}
              >
                Simular Agora
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}