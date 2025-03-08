"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { 
  Loader2, 
  User, 
  Phone, 
  X, 
  Shield, 
  AlertCircle, 
  CheckCircle2, 
  Banknote, 
  Zap, 
  BadgeCheck, 
  Star,
  Calendar,
  DollarSign
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Interface para os dados do formulário
interface FormData {
  nome: string;
  telefone: string;
  saldoFgts: string;
}

const HeroFgts: React.FC = () => {
  // Estado para o overlay de carregamento
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Estado para o formulário
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    telefone: "",
    saldoFgts: ""
  });
  
  // Estado para os erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Estado para o resultado da simulação
  const [mostrarResultado, setMostrarResultado] = useState<boolean>(false);
  const [valorAprovado, setValorAprovado] = useState<string>("R$ 0,00");

  // Função para validar o formulário
  const validarFormulario = (): boolean => {
    const novosErros: Record<string, string> = {};
    
    if (!formData.nome.trim()) {
      novosErros.nome = "Informe seu nome completo";
    }
    
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!telefoneRegex.test(formData.telefone)) {
      novosErros.telefone = "Digite um número válido";
    }
    
    if (!formData.saldoFgts.trim()) {
      novosErros.saldoFgts = "Informe seu saldo do FGTS";
    } else {
      // Removendo formatação para validar se é um número
      const saldoNumerico = Number(formData.saldoFgts.replace(/[^\d]/g, '')) / 100;
      if (isNaN(saldoNumerico) || saldoNumerico <= 0) {
        novosErros.saldoFgts = "Saldo inválido";
      }
    }
    
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Função para formatar o telefone
  const formatarTelefone = (value: string): string => {
    // Remove caracteres não-numéricos
    const numeroLimpo = value.replace(/\D/g, "");
    
    // Aplica a máscara (xx) xxxxx-xxxx
    if (numeroLimpo.length <= 2) {
      return numeroLimpo;
    } else if (numeroLimpo.length <= 7) {
      return `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo.slice(2)}`;
    } else {
      return `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo.slice(2, 7)}-${numeroLimpo.slice(7, 11)}`;
    }
  };

  // Função para formatar valor monetário
  const formatarValorMonetario = (value: string): string => {
    // Remove caracteres não-numéricos
    const numeroLimpo = value.replace(/\D/g, "");
    
    // Converte para número com 2 casas decimais
    const numero = Number(numeroLimpo) / 100;
    
    // Formata como moeda brasileira
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Função para lidar com a mudança nos campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "telefone") {
      setFormData({
        ...formData,
        [name]: formatarTelefone(value)
      });
    } else if (name === "saldoFgts") {
      setFormData({
        ...formData,
        [name]: formatarValorMonetario(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Limpa o erro desse campo se existir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  // Função para calcular o valor antecipável do FGTS (utilizando regra geral de mercado)
  const calcularValorAntecipavel = (saldoFgts: string): number => {
    // Remove formatação para converter para número
    const saldoNumerico = Number(saldoFgts.replace(/[^\d]/g, '')) / 100;
    
    // Regra de negócio: normalmente é possível antecipar até 70-80% do saldo do FGTS
    // usando 70% como um valor conservador
    const percentualAntecipavel = 0.7;
    const valorAntecipavel = saldoNumerico * percentualAntecipavel;
    
    return Math.round(valorAntecipavel); // Arredonda para um número inteiro
  };

  // Função para simular o empréstimo
  const simularEmprestimo = () => {
    if (validarFormulario()) {
      setIsLoading(true);
      
      // Simulação de chamada à API (em produção, isso seria uma chamada real)
      setTimeout(() => {
        setIsLoading(false);
        
        // Calcula valor antecipável com base no saldo informado
        const valorCalculado = calcularValorAntecipavel(formData.saldoFgts);
        
        setValorAprovado(`R$ ${valorCalculado.toLocaleString("pt-BR")},00`);
        
        // Mostra o resultado
        setMostrarResultado(true);
      }, 2000);
    }
  };

  // Variantes para animações do Framer Motion
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" }
    })
  };

  // Lista de recursos/benefícios
  const recursos = [
    { 
      icon: <Calendar className="h-5 w-5" />, 
      title: "Receba em minutos", 
      text: "Dinheiro direto no seu PIX" 
    },
    { 
      icon: <Banknote className="h-5 w-5" />, 
      title: "Antecipe a partir de R$ 25,00", 
      text: "sem comprovar renda" 
    },
    { 
      icon: <DollarSign className="h-5 w-5" />, 
      title: "As melhores taxas", 
      text: "juros muito abaixo do mercado" 
    },
    { 
      icon: <BadgeCheck className="h-5 w-5" />, 
      title: "100% digital", 
      text: "contrate pelo celular sem sair de casa" 
    }
  ];

  return (
    <>
      {/* Overlay de Carregamento */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-white/90 flex justify-center items-center z-50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-[90%] max-w-md border border-gray-100 relative overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 absolute top-0 inset-x-0 rounded-t-2xl"></div>
              <div className="flex flex-col items-center text-center">
                <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-blue-100 opacity-70"
                    animate={{ 
                      scale: [1, 1.5, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <Loader2 className="h-10 w-10 text-blue-600 animate-spin relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Analisando seus dados</h3>
                <p className="text-gray-600 max-w-[320px] mx-auto">
                  Estamos calculando o valor que você pode antecipar do seu FGTS com as melhores condições do mercado.
                </p>
                
                <div className="w-full mt-6 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-blue-800 via-blue-700 to-indigo-800 text-white">
        {/* Elementos de background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg viewBox="0 0 1000 1000" className="absolute top-0 left-0 w-[200%] h-[200%] opacity-5 transform -translate-x-1/2 -translate-y-1/3">
            <circle r="45" cx="400" cy="400" fill="currentColor" className="animate-blob" />
            <circle r="40" cx="500" cy="600" fill="currentColor" className="animate-blob animation-delay-2000" />
            <circle r="35" cx="800" cy="400" fill="currentColor" className="animate-blob animation-delay-4000" />
            <circle r="50" cx="700" cy="700" fill="currentColor" className="animate-blob animation-delay-1000" />
            <circle r="35" cx="300" cy="700" fill="currentColor" className="animate-blob animation-delay-3000" />
          </svg>
        </div>
        
        {/* Ondas decorativas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="white" fillOpacity="0.05" d="M0,288L48,272C96,256,192,224,288,224C384,224,480,256,576,272C672,288,768,288,864,272C960,256,1056,224,1152,224C1248,224,1344,256,1392,272L1440,288L1440,320L0,320Z"></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto absolute bottom-0 left-0">
            <path fill="white" fillOpacity="0.1" d="M0,288L48,272C96,256,192,224,288,208C384,192,480,192,576,176C672,160,768,128,864,128C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,320L0,320Z"></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 max-w-[1300px] relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14">
            {/* Coluna de texto */}
            <div className="flex-1 mb-12 lg:mb-0">
              <motion.div
                className="flex items-center gap-2 bg-white/10 rounded-full py-2 px-4 text-sm font-medium mb-6 backdrop-blur-md border border-white/20 w-fit"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>4,9 no Google</span>
                <span className="mx-2 h-3.5 w-px bg-white/40"></span>
                <span>Mais de R$ 50 milhões liberados</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="block text-blue-100">Contrate o Melhor</span>
                <span className="block">
                  <span className="text-white">Empréstimo </span>
                  <span className="text-yellow-300">FGTS</span>
                </span>
                <span className="block text-white">em Minutos</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-blue-100 mb-8 max-w-[600px] leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Simule sua antecipação do saque aniversário nos principais bancos e contrate a oferta ideal para você.
              </motion.p>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 mb-10 inline-flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <Badge className="bg-yellow-400/30 text-yellow-300 border-yellow-500/20 uppercase font-semibold">
                    Até
                  </Badge>
                  <span className="text-2xl font-bold tracking-tight text-white mr-3">
                    12x parcelas anuais
                  </span>
                  <Zap className="h-5 w-5 text-yellow-300" />
                </div>
                <div className="text-sm font-medium text-blue-100 mt-1.5 pl-1">
                  Antecipe até 5 anos do seu FGTS
                </div>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {recursos.map((recurso, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-start gap-3"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={featureVariants}
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-md border border-white/20 text-blue-100">
                      {recurso.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-white">{recurso.title}</h3>
                      <p className="text-blue-100 text-sm">{recurso.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mb-8 sm:mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="flex flex-wrap items-center gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg py-2 px-4 border border-white/20 flex items-center gap-2 text-sm">
                          <Shield className="h-4 w-4 text-blue-200" />
                          <span className="text-blue-50">Regulado pelo Banco Central</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>A Credios exerce uma atividade prevista pelo Banco Central</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg py-2 px-4 border border-white/20 flex items-center gap-2 text-sm">
                          <BadgeCheck className="h-4 w-4 text-blue-200" />
                          <span className="text-blue-50">Garantia de segurança</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Seus dados estão protegidos por criptografia</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </motion.div>
            </div>
            
            {/* Formulário */}
            <motion.div 
              className="flex-1 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                {mostrarResultado ? (
                  <motion.div
                    key="resultado"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  >
                    <Card className="bg-white text-gray-800 rounded-2xl shadow-2xl border-0 relative overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 absolute top-0 inset-x-0 rounded-t-2xl"></div>
                      <div className="absolute -right-16 -top-16 w-40 h-40 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
                      <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
                      
                      <CardContent className="pt-10 pb-8 px-8 text-center relative z-10">
                        <motion.div 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: [0, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{ duration: 0.7 }}
                          className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center"
                        >
                          <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </motion.div>
                        
                        <motion.h3 
                          className="text-3xl font-bold text-gray-900 mb-3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          Parabéns, {formData.nome.split(' ')[0]}!
                        </motion.h3>
                        
                        <motion.p
                          className="text-xl font-medium text-gray-600 mb-8"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          Você pode antecipar seu FGTS!
                        </motion.p>
                        
                        <motion.div 
                          className="relative mb-10"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <Badge className="absolute -top-3 right-0 bg-green-500 border-0 font-medium px-3 py-1">
                            APROVADO
                          </Badge>
                          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                            <h4 className="text-lg font-medium text-gray-500 mb-2">Valor disponível:</h4>
                            <div className="text-5xl font-extrabold text-gray-900 mb-1">{valorAprovado}</div>
                            <div className="text-sm text-gray-500">Pronto para contratação imediata</div>
                          </div>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Button 
                              className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 w-full text-white rounded-xl py-7 text-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 border-0"
                              asChild
                            >
                              <a href="https://credios.com.br/contratacao-emprestimo-fgts" className="flex items-center justify-center gap-2">
                                <span>CONTRATAR AGORA</span>
                                <motion.span
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ 
                                    duration: 1,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                  }}
                                >
                                  →
                                </motion.span>
                              </a>
                            </Button>
                          </motion.div>
                          
                          <div className="flex justify-center items-center gap-2 mt-6 text-gray-500">
                            <Shield className="h-4 w-4" />
                            <span className="text-sm">Informações protegidas por criptografia</span>
                          </div>
                        </motion.div>
                      </CardContent>
                      
                      <CardFooter className="pt-0 pb-6 px-8 flex justify-center">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Shield className="h-4 w-4" />
                          <span>A Credios exerce uma atividade prevista pelo Banco Central</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="formulario"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  >
                    <Card className="bg-white text-gray-800 rounded-2xl shadow-2xl border-0 relative overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-500 absolute top-0 inset-x-0 rounded-t-2xl"></div>
                      <div className="absolute -right-16 -top-16 w-40 h-40 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
                      
                      <CardHeader className="pt-8 pb-2 px-8 relative z-10">
                        <CardTitle className="text-2xl font-bold text-gray-900 text-center">Simule seu empréstimo FGTS</CardTitle>
                        <CardDescription className="text-center text-gray-600 mt-1">
                          É rápido e fácil, leva apenas 2 minutos!
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="px-8 py-4 relative z-10">
                        <div className="mb-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
                          <div className="flex items-start gap-3">
                            <div className="text-blue-600 mt-1 flex-shrink-0">
                              <AlertCircle className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-800 mb-1">Oportunidade exclusiva</h4>
                              <p className="text-sm text-blue-700">
                                Preencha seus dados e descubra quanto você pode antecipar do seu FGTS <span className="font-medium">hoje mesmo</span>!
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <form className="space-y-5">
                          <div className="space-y-2.5">
                            <Label htmlFor="nome" className="font-medium text-gray-700 flex items-center gap-1.5">
                              <User className="h-4 w-4 text-blue-600" />
                              Nome completo*
                            </Label>
                            <div className="relative">
                              <Input
                                id="nome"
                                name="nome"
                                placeholder="Digite seu nome"
                                className={`w-full pl-10 py-6 rounded-lg text-base ${errors.nome ? 'border-red-300 ring-red-100' : 'border-gray-200'}`}
                                value={formData.nome}
                                onChange={handleInputChange}
                                autoComplete="name"
                                inputMode="text"
                              />
                              <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                            {errors.nome && (
                              <motion.p 
                                className="text-sm text-red-600 flex items-center gap-1.5"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                              >
                                <X className="h-4 w-4" />
                                {errors.nome}
                              </motion.p>
                            )}
                          </div>
                          
                          <div className="space-y-2.5">
                            <Label htmlFor="telefone" className="font-medium text-gray-700 flex items-center gap-1.5">
                              <Phone className="h-4 w-4 text-blue-600" />
                              WhatsApp*
                            </Label>
                            <div className="relative">
                              <Input
                                id="telefone"
                                name="telefone"
                                placeholder="(00) 00000-0000"
                                className={`w-full pl-10 py-6 rounded-lg text-base ${errors.telefone ? 'border-red-300 ring-red-100' : 'border-gray-200'}`}
                                value={formData.telefone}
                                onChange={handleInputChange}
                                autoComplete="tel"
                                inputMode="tel"
                              />
                              <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>{errors.telefone && (
                              <motion.p 
                                className="text-sm text-red-600 flex items-center gap-1.5"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                              >
                                <X className="h-4 w-4" />
                                {errors.telefone}
                              </motion.p>
                            )}
                          </div>
                          
                          <div className="space-y-2.5">
                            <Label htmlFor="saldoFgts" className="font-medium text-gray-700 flex items-center gap-1.5">
                              <Banknote className="h-4 w-4 text-blue-600" />
                              Saldo FGTS disponível*
                            </Label>
                            <div className="relative">
                              <Input
                                id="saldoFgts"
                                name="saldoFgts"
                                placeholder="R$ 0,00"
                                className={`w-full pl-10 py-6 rounded-lg text-base ${errors.saldoFgts ? 'border-red-300 ring-red-100' : 'border-gray-200'}`}
                                value={formData.saldoFgts}
                                onChange={handleInputChange}
                                inputMode="decimal"
                              />
                              <DollarSign className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                            {errors.saldoFgts && (
                              <motion.p 
                                className="text-sm text-red-600 flex items-center gap-1.5"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                              >
                                <X className="h-4 w-4" />
                                {errors.saldoFgts}
                              </motion.p>
                            )}
                          </div>
                          
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-6"
                          >
                            <Button
                              type="button"
                              onClick={simularEmprestimo}
                              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white py-6 px-4 rounded-xl text-lg font-bold shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 border-0"
                            >
                              <motion.span
                                animate={{ 
                                  scale: [1, 1.03, 1],
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatType: "reverse"
                                }}
                                className="flex items-center justify-center gap-2"
                              >
                                SIMULAR AGORA
                                <motion.span 
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ 
                                    duration: 1,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                  }}
                                >
                                  →
                                </motion.span>
                              </motion.span>
                            </Button>
                          </motion.div>
                        </form>
                      </CardContent>
                      
                      <CardFooter className="px-8 pb-6 pt-0 flex justify-center">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Shield className="h-4 w-4" />
                          <span>A Credios exerce uma atividade prevista pelo Banco Central</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroFgts;