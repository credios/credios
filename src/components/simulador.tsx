'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LightbulbIcon, Wallet, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

// Definição dos produtos
const produtos = [
  {
    id: 'luz',
    nome: 'Empréstimo na Conta de Luz',
    descricao: 'Até R$ 3.300 sem comprovação de renda, com parcelas na sua conta de luz',
    icon: LightbulbIcon,
    cor: 'from-orange-400 to-amber-500',
    textoCor: 'text-orange-600',
    link: 'https://www.crefaz.com.br/emprestimos/emprestimo-online',
    destacado: true
  },
  {
    id: 'fgts',
    nome: 'Empréstimo FGTS',
    descricao: 'Simulação automática com diversos bancos, dinheiro no PIX em minutos',
    icon: Wallet,
    cor: 'from-blue-400 to-sky-500',
    textoCor: 'text-blue-600',
    link: 'https://www.credios.com.br/simulador-fgts',
    destacado: false
  }
];

// Animações de entrada
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

const cardVariants = {
  hover: { 
    scale: 1.03,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: { type: 'spring', stiffness: 300, damping: 15 }
  },
  tap: { 
    scale: 0.98,
    boxShadow: 'none',
    transition: { duration: 0.1 }
  }
};

// Função para criar o padrão geométrico do background - quadriculado fino e fluido
const GeometricPattern = () => (
  <svg 
    className="absolute inset-0 w-full h-full opacity-7" 
    xmlns="http://www.w3.org/2000/svg"
    width="100%" 
    height="100%" 
    viewBox="0 0 100 100" 
    preserveAspectRatio="none"
  >
    <defs>
      <pattern id="simpleGrid" width="1.5" height="1.5" patternUnits="userSpaceOnUse">
        <path d="M 1.5 0 L 0 0 0 1.5" fill="none" stroke="rgba(230, 240, 255, 0.4)" strokeWidth="0.15" strokeLinecap="round" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#simpleGrid)" />
  </svg>
);

const Simulador = () => {
  return (
    <div className="relative bg-gradient-to-b from-blue-600 via-blue-500 to-blue-700 min-h-screen w-full py-12 px-4 sm:py-16 overflow-hidden">
      <GeometricPattern />
      <Container>
        <motion.div
          className="flex flex-col items-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Cabeçalho */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Simulador de Empréstimos
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-white/90 mb-6">
              Vamos realizar a sua simulação
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Escolha o tipo de empréstimo que melhor atende às suas necessidades. 
              É rápido, seguro e você recebe o dinheiro em minutos.
            </p>
          </motion.div>

          {/* Instruções */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-8 w-full"
          >
            <h3 className="text-white font-semibold text-lg mb-3">É muito simples:</h3>
            <ol className="space-y-2 text-white/90">
              <li className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500 text-white font-bold text-sm">
                  1
                </span>
                <span>Escolha a opção de empréstimo que você procura</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500 text-white font-bold text-sm">
                  2
                </span>
                <span>Simule com seus dados e escolha a melhor oferta</span>
              </li>
            </ol>
          </motion.div>

          {/* Cartões de produtos */}
          <motion.div 
            variants={itemVariants}
            className="w-full"
          >
            <h3 className="text-white font-bold text-center text-xl mb-6">
              AGORA, vamos simular:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {produtos.map((produto) => (
                <motion.a
                  key={produto.id}
                  href={produto.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full cursor-pointer"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.div
                    variants={cardVariants}
                    className={`relative rounded-2xl overflow-hidden bg-white h-full`}
                  >
                    {/* Indicador de destaque */}
                    {produto.destacado && (
                      <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                        MAIS POPULAR
                      </div>
                    )}
                    
                    <div className="p-6 flex flex-col h-full">
                      {/* Cabeçalho do cartão */}
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-full bg-gradient-to-br ${produto.cor} mr-4`}>
                          <produto.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className={`font-bold text-xl ${produto.textoCor}`}>
                          {produto.nome}
                        </h3>
                      </div>
                      
                      {/* Descrição */}
                      <p className="text-gray-600 mb-6 flex-grow">
                        {produto.descricao}
                      </p>
                      
                      {/* Botão de ação */}
                      <Button 
                        className={`w-full py-6 bg-gradient-to-r ${produto.cor} hover:brightness-105 hover:shadow-lg transition-all duration-300 group cursor-pointer`}
                      >
                        <span className="mr-2">Simular Agora</span>
                        <ArrowRight className="inline-block w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Nota de segurança */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <p className="text-white/80 text-sm flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Ambiente 100% seguro • Simulação gratuita • Sem compromisso
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Simulador;