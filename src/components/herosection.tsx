"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

  // Interface para a cidade
interface Cidade {
  nome: string;
  valor?: number;
}

// Interface para os dados do formulário
interface FormData {
  nome: string;
  telefone: string;
  cidade: string;
  titular: string;
}

// Interface para a estrutura do JSON
interface CidadeJSON {
  cidade: string;
  valor: number;
}

const HeroSection: React.FC = () => {
  // Estado para o overlay de carregamento
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Estado para o formulário
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    telefone: "",
    cidade: "",
    titular: ""
  });
  
  // Estado para os erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Estado para sugestões de cidades
  const [cidadeSugestoes, setCidadeSugestoes] = useState<Cidade[]>([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState<boolean>(false);
  const [cidadeInput, setCidadeInput] = useState<string>("");
  const [cidadesLista, setCidadesLista] = useState<CidadeJSON[]>([]);
  
  // Carregar dados de cidades do JSON local em public/cidades.json
  useEffect(() => {
    const fetchCidades = async () => {
      try {
        // Acessando o arquivo diretamente da pasta public
        const response = await fetch("/cidades.json");
        
        if (!response.ok) {
          throw new Error(`Falha ao carregar cidades: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Verificamos se os dados estão no formato esperado (array de objetos com cidade e valor)
        if (Array.isArray(data) && data.length > 0 && 'cidade' in data[0] && 'valor' in data[0]) {
          setCidadesLista(data);
          console.log("Cidades carregadas com sucesso:", data.length);
        } else {
          throw new Error("Formato de dados inválido");
        }
      } catch (error) {
        console.error("Erro ao carregar lista de cidades:", error);
        // Dados de fallback
        setCidadesLista([
          { cidade: "São Paulo - SP", valor: 3300 },
          { cidade: "Rio de Janeiro - RJ", valor: 3000 },
          { cidade: "Belo Horizonte - MG", valor: 2800 },
          { cidade: "Salvador - BA", valor: 2500 },
          { cidade: "Brasília - DF", valor: 3200 },
          { cidade: "Curitiba - PR", valor: 2700 },
          { cidade: "Fortaleza - CE", valor: 2300 },
          { cidade: "Recife - PE", valor: 2400 },
          { cidade: "Porto Alegre - RS", valor: 2600 }
        ]);
      }
    };
    
    fetchCidades();
  }, []);
  
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
    
    if (!formData.cidade.trim()) {
      novosErros.cidade = "Por favor, informe sua cidade";
    }
    
    if (!formData.titular) {
      novosErros.titular = "Selecione uma opção";
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

  // Função para lidar com a mudança nos campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "telefone") {
      setFormData({
        ...formData,
        [name]: formatarTelefone(value)
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

  // Função para lidar com a mudança no radio button de titular
  const handleTitularChange = (value: string) => {
    setFormData({
      ...formData,
      titular: value
    });
    
    // Limpa o erro desse campo se existir
    if (errors.titular) {
      setErrors({
        ...errors,
        titular: ""
      });
    }
  };

  // Função para lidar com a mudança no campo de cidade
  const handleCidadeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCidadeInput(value);
    
    // Atualiza o valor da cidade no estado do formulário independentemente
    setFormData({
      ...formData,
      cidade: value
    });
    
    if (value.length >= 2) {
      // Filtrar cidades do JSON carregado
      const filtradas = cidadesLista
        .filter(item => 
          item.cidade.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 10) // Limitamos a 10 resultados para performance
        .map(item => ({ 
          nome: item.cidade,
          valor: item.valor
        }));
      
      setCidadeSugestoes(filtradas);
      setMostrarSugestoes(filtradas.length > 0);
    } else {
      setMostrarSugestoes(false);
    }
    
    // Limpa o erro desse campo se existir
    if (errors.cidade) {
      setErrors({
        ...errors,
        cidade: ""
      });
    }
  };

  // Função para selecionar uma cidade da lista de sugestões
  const selecionarCidade = (cidade: Cidade) => {
    setCidadeInput(cidade.nome);
    setFormData({
      ...formData,
      cidade: cidade.nome
    });
    setMostrarSugestoes(false);
  };

  // Função para simular o empréstimo
  const simularEmprestimo = () => {
    if (validarFormulario()) {
      setIsLoading(true);
      
      // Simulação de chamada à API (em produção, isso seria uma chamada real)
      setTimeout(() => {
        setIsLoading(false);
        
        // Obtém o valor pré-aprovado baseado na cidade do usuário
        let valorAprovado = 500; // Valor padrão mínimo
        
        // Procura pela cidade na lista
        const cidadeEncontrada = cidadesLista.find(
          item => item.cidade.toLowerCase() === formData.cidade.toLowerCase()
        );
        
        if (cidadeEncontrada) {
          // Se encontrou a cidade exata, usa o valor da cidade
          valorAprovado = cidadeEncontrada.valor;
        } else {
          // Procura por correspondência parcial
          const cidadeParcial = cidadesLista.find(
            item => item.cidade.toLowerCase().includes(formData.cidade.toLowerCase()) ||
                   formData.cidade.toLowerCase().includes(item.cidade.toLowerCase())
          );
          
          if (cidadeParcial) {
            // Se encontrou uma correspondência parcial, usa o valor dela
            valorAprovado = cidadeParcial.valor;
          } else {
            // Fallback para valor aleatório mínimo se não encontrar a cidade
            valorAprovado = Math.floor(Math.random() * (1000 - 500 + 1) + 500);
          }
        }
        
        setValorAprovado(`R$ ${valorAprovado.toLocaleString("pt-BR")},00`);
        
        // Mostra o resultado
        setMostrarResultado(true);
      }, 2000);
    }
  };

  // Efeito para esconder sugestões quando clicar fora
  useEffect(() => {
    const handleClickOutside = () => {
      setMostrarSugestoes(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Variantes para animações do Framer Motion
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.6 }
    })
  };

  return (
    <>
      {/* Overlay de Carregamento */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/90 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-[90%] max-w-md border border-gray-100 relative overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-blue-800 to-indigo-700 absolute top-0 inset-x-0 rounded-t-2xl"></div>
            <div className="flex flex-col items-center text-center">
              <Loader2 className="h-14 w-14 text-blue-800 animate-spin mb-6" />
              <p className="text-lg font-medium text-gray-800 max-w-[320px] mx-auto">
                ⏳ Aguarde! Nossa IA está analisando seus dados para oferecer o melhor crédito disponível.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-br from-blue-900 via-blue-700 to-sky-600 overflow-hidden text-white">
        {/* Padrão de fundo com efeito de ondas */}
        <div 
          className="absolute inset-0 opacity-10 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}
        />
        
        {/* Efeito de ondas na parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 opacity-20">
          <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,128L48,144C96,160,192,192,288,213.3C384,235,480,245,576,234.7C672,224,768,192,864,192C960,192,1056,224,1152,224C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="white"></path>
          </svg>
        </div>
        
        {/* Círculos decorativos */}
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-sky-400 opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-blue-300 opacity-10 blur-3xl"></div>

        <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14">
            {/* Coluna de texto */}
            <div className="flex-1 mb-10 lg:mb-0">
              <motion.div
                className="inline-flex items-center bg-gradient-to-r from-sky-500/40 to-blue-600/40 rounded-full py-2 px-4 text-sm font-semibold mb-6 shadow-lg border border-white/30 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-yellow-300 mr-1">★</span>4,9 no Google <span className="mx-3 h-3.5 w-px bg-white/40"></span> Mais de R$ 50 milhões liberados
              </motion.div>
              
              <motion.h1 
                className="text-3xl md:text-5xl font-extrabold leading-snug mb-3 text-white drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                  Empréstimo na Conta de Luz com
                </span>
                <br />
                <span className="text-yellow-300 leading-tight inline-block mt-[-0.25rem]">Aprovação na Hora</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg opacity-95 mb-4 max-w-[600px] leading-relaxed text-blue-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="font-semibold border-b-2 border-sky-400/60 pb-0.5">Dinheiro rápido</span> mesmo para quem está com nome sujo. Receba o valor na sua conta
                e pague em parcelas mensais na sua fatura de energia.
              </motion.p>
              
              <motion.div 
                className="relative group mb-6 max-w-md mx-auto sm:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Efeito de glow no background */}
                <motion.div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300"
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5],
                    scale: [0.98, 1.01, 0.98],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                ></motion.div>
                
                {/* Conteúdo do box */}
                <div className="relative flex items-center px-6 py-3 bg-white rounded-lg border border-orange-300/50 shadow-md">
                  <div className="flex-grow">
                    <div className="flex items-baseline">
                      <span className="font-bold text-orange-600 uppercase tracking-wide mr-1.5">ATÉ</span>
                      <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 tracking-tight text-xl">
                        R$ 3.300,00
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-orange-800">
                      liberados NO MESMO DIA
                    </div>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1], 
                        rotate: [0, 10, 0] 
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatDelay: 2 
                      }}
                      className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md text-white text-xl"
                    >
                      ⚡
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { 
                    icon: "🔎", 
                    title: "Negativado?", 
                    text: "Aprovamos mesmo com nome no SPC/Serasa" 
                  },
                  { 
                    icon: "📄", 
                    title: "Zero burocracia", 
                    text: "- sem comprovação de renda" 
                  },
                  { 
                    icon: "⏱️", 
                    title: "Rápido e fácil", 
                    text: "- dinheiro na conta no mesmo dia" 
                  },
                  { 
                    icon: "💸", 
                    title: "Pagamento facilitado", 
                    text: "direto na sua conta de luz" 
                  }
                ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-start gap-4"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={featureVariants}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500/30 to-blue-600/30 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg backdrop-blur-sm border border-white/40 text-xl relative">
                      <div className="absolute inset-0 rounded-full bg-blue-400/10 animate-ping opacity-75" style={{ animationDuration: '3s', animationDelay: `${i * 0.5}s` }}></div>
                      {feature.icon}
                    </div>
                    <div className="text-base opacity-90 leading-snug">
                      <strong className="font-semibold text-white opacity-100">{feature.title}</strong> {feature.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Formulário */}
            <motion.div 
              className="flex-1 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {mostrarResultado ? (
                <Card className="bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100 relative overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-blue-800 via-sky-600 to-blue-800 absolute top-0 inset-x-0 rounded-t-2xl"></div>
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 blur-2xl"></div>
                  <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-yellow-100 rounded-full opacity-30 blur-3xl"></div>
                  <CardContent className="pt-8 pb-6 px-8 text-center relative z-10">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: [0.8, 1.1, 1],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{ duration: 1 }}
                      className="text-5xl mb-2"
                    >
                      🎉
                    </motion.div>
                    
                    <motion.h3 
                      className="text-3xl font-extrabold text-blue-800 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      Parabéns!
                      <div className="text-2xl font-medium text-blue-600 mt-1">Você está pré-aprovado para:</div>
                    </motion.h3>
                    
                    <motion.div 
                      className="text-5xl font-black text-blue-900 my-8 relative inline-block"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        scale: [0.9, 1.1, 1],
                      }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="absolute -top-6 right-0 bg-green-500 text-white text-xs py-1 px-2 rounded-full font-semibold"
                      >
                        PRÉ-APROVADO
                      </motion.div>
                      {valorAprovado}
                      <div className="h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 absolute -bottom-3 inset-x-0 rounded-full scale-x-75 origin-center"></div>
                    </motion.div>
                    
                    <motion.p 
                      className="text-lg text-gray-800 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      Você pode receber este valor ainda hoje em sua conta!
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-full py-6 px-10 text-lg font-bold uppercase tracking-wide shadow-xl shadow-orange-600/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 border-2 border-orange-300/20 cursor-pointer"
                          size="lg"
                          asChild
                        >
                          <a href="https://credios.com.br/contratacao-emprestimo-conta-luz" className="flex items-center gap-2">
                            <span>CONTRATAR AGORA</span>
                            <motion.span 
                              animate={{ x: [0, 5, 0] }}
                              transition={{ 
                                duration: 1,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                              className="text-xl"
                            >
                              ➡️
                            </motion.span>
                          </a>
                        </Button>
                      </motion.div>
                      
                      <div className="text-xs text-gray-500 mt-4 flex items-center justify-center gap-1.5">
                        <span>🔐</span> A Credios exerce uma atividade regulamentada pelo Banco Central
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100 relative overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-blue-800 via-sky-600 to-blue-800 absolute top-0 inset-x-0 rounded-t-2xl"></div>
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-100 rounded-full opacity-70 blur-2xl"></div>
                  <CardHeader className="pb-0 pt-6 relative z-10">
                    <CardTitle className="text-3xl font-extrabold text-blue-800 text-center">Simule seu empréstimo agora</CardTitle>
                    <CardDescription className="text-center text-blue-600 font-medium pt-2">Resposta na hora - leva apenas 2 minutos!</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 pb-6 px-8">
                    <div className="bg-gradient-to-r from-blue-50 to-sky-50 text-blue-800 py-4 px-4 w-full rounded-lg mb-6 border border-blue-200/50 shadow-sm">
                      <div className="flex items-start gap-3">
                        <motion.div
                          animate={{ 
                            rotate: [0, 10, 0, -10, 0],
                            scale: [1, 1.2, 1, 1.2, 1]
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 5
                          }}
                          className="text-xl flex-shrink-0 mt-0.5"
                        >
                          📝
                        </motion.div>
                        <div className="text-base font-medium">
                          <span className="font-bold">Preencha o formulário</span> agora e receba seu dinheiro <span className="underline decoration-yellow-400 decoration-2 underline-offset-2">ainda hoje</span>!
                        </div>
                      </div>
                    </div>
                    
                    <form className="space-y-5">
                      <div className="w-full">
                        <div className="space-y-2.5">
                          <Label htmlFor="cidade-input" className="font-medium text-sm text-gray-700">
                            Sua cidade*
                          </Label>
                          <div className="relative">
                            <Input
                              id="cidade-input"
                              placeholder="Digite sua cidade"
                              className={`w-full px-4 py-3.5 rounded-lg text-base ${errors.cidade ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-800'}`}
                              value={cidadeInput}
                              onChange={handleCidadeInputChange}
                              autoComplete="address-level2"
                              inputMode="text"
                            />
                            
                            {mostrarSugestoes && (
                              <div className="absolute top-full left-0 right-0 max-h-[200px] overflow-y-auto bg-white border border-gray-200 rounded-b-lg shadow-md z-10">
                                {cidadeSugestoes.map((cidade, index) => (
                                  <div
                                    key={index}
                                    className="py-3 px-4 cursor-pointer border-b border-gray-100 last:border-b-0 text-sm hover:bg-gray-50 transition-colors flex justify-between items-center"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      selecionarCidade(cidade);
                                    }}
                                  >
                                    <span>{cidade.nome}</span>
                                    {cidade.valor && (
                                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                        Até R$ {cidade.valor.toLocaleString('pt-BR')}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          {errors.cidade && (
                            <p className="text-xs text-red-600 bg-red-50 py-1.5 px-2.5 rounded border-l-3 border-red-600 mt-2">
                              {errors.cidade}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2.5">
                          <Label htmlFor="nome" className="font-medium text-sm text-gray-700">
                            Nome completo*
                          </Label>
                          <Input
                            id="nome"
                            name="nome"
                            placeholder="Digite seu nome"
                            className={`w-full px-4 py-3.5 rounded-lg text-base ${errors.nome ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-800'}`}
                            value={formData.nome}
                            onChange={handleInputChange}
                            autoComplete="name"
                            inputMode="text"
                          />
                          {errors.nome && (
                            <p className="text-xs text-red-600 bg-red-50 py-1.5 px-2.5 rounded border-l-3 border-red-600 mt-2">
                              {errors.nome}
                            </p>
                          )}
                        </div>
                        
                        <div className="space-y-2.5">
                          <Label htmlFor="telefone" className="font-medium text-sm text-gray-700">
                            WhatsApp*
                          </Label>
                          <Input
                            id="telefone"
                            name="telefone"
                            placeholder="(00) 00000-0000"
                            className={`w-full px-4 py-3.5 rounded-lg text-base ${errors.telefone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-800'}`}
                            value={formData.telefone}
                            onChange={handleInputChange}
                            autoComplete="tel"
                            inputMode="tel"
                          />
                          {errors.telefone && (
                            <p className="text-xs text-red-600 bg-red-50 py-1.5 px-2.5 rounded border-l-3 border-red-600 mt-2">
                              {errors.telefone}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2.5">
                        <Label className="font-medium text-sm text-gray-700">
                          Você é titular da conta de luz?*
                        </Label>
                        <div className="flex gap-3">
                          <motion.button
                            type="button"
                            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium border transition-all ${
                              formData.titular === 'sim' 
                                ? 'bg-blue-50 border-blue-600 text-blue-800' 
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                            onClick={() => handleTitularChange(formData.titular === 'sim' ? '' : 'sim')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 500, 
                              damping: 15 
                            }}
                          >
                            <div className="flex items-center justify-center">
                              {formData.titular === 'sim' && (
                                <motion.span 
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="w-4 h-4 rounded-full bg-blue-600 mr-2 flex-shrink-0"
                                />
                              )}
                              Sim
                            </div>
                          </motion.button>
                          <motion.button
                            type="button"
                            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium border transition-all ${
                              formData.titular === 'nao' 
                                ? 'bg-blue-50 border-blue-600 text-blue-800' 
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                            onClick={() => handleTitularChange(formData.titular === 'nao' ? '' : 'nao')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 500, 
                              damping: 15 
                            }}
                          >
                            <div className="flex items-center justify-center">
                              {formData.titular === 'nao' && (
                                <motion.span 
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="w-4 h-4 rounded-full bg-blue-600 mr-2 flex-shrink-0"
                                />
                              )}
                              Não
                            </div>
                          </motion.button>
                        </div>
                        {errors.titular && (
                          <p className="text-xs text-red-600 bg-red-50 py-1.5 px-2.5 rounded border-l-3 border-red-600 mt-2">
                            {errors.titular}
                          </p>
                        )}
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="button"
                          onClick={simularEmprestimo}
                          className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white py-5 px-4 rounded-xl text-lg font-bold uppercase tracking-wide shadow-lg hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 mt-6 border border-orange-400/20 cursor-pointer"
                        >
                          <motion.span
                            animate={{ 
                              scale: [1, 1.05, 1],
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                            className="flex items-center justify-center gap-2"
                          >
                            QUERO SIMULAR AGORA
                            <span className="text-yellow-200">→</span>
                          </motion.span>
                        </Button>
                      </motion.div>
                      
                      <div className="text-xs text-gray-500 text-center flex items-center justify-center gap-1.5">
                        <span>🔐</span> A Credios exerce uma atividade regulamentada pelo Banco Central
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;