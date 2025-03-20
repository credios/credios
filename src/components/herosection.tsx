"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { 
  Loader2, 
  MapPin, 
  User, 
  Phone, 
  Check, 
  X, 
  Search, 
  Shield, 
  AlertCircle, 
  CheckCircle2, 
  Banknote, 
  Zap, 
  BadgeCheck, 
  Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

// Interface para resposta do FormSubmit
interface FormSubmitResponse {
  success: boolean;
  message?: string;
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
  
  // Estado para o modo móvel (detectar se está em mobile)
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Estado para mensagens de erro
  const [erroEnvio, setErroEnvio] = useState<string>("");
  
  // Detectar mobile na montagem do componente e ao redimensionar
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Verificar na montagem
    checkIfMobile();
    
    // Adicionar event listener para redimensionamento
    window.addEventListener('resize', checkIfMobile);
    
    // Limpar event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
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
  
  // Estado para mostrar diretamente o formulário em mobile
  const [focarFormulario, setFocarFormulario] = useState<boolean>(false);

  // Função para normalizar textos (remover acentos)
  const normalizeText = (text: string): string => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

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
      // Filtrar cidades do JSON carregado, ignorando acentos
      const searchValueNormalized = normalizeText(value.toLowerCase());
      
      const filtradas = cidadesLista
        .filter(item => {
          const cidadeNormalized = normalizeText(item.cidade.toLowerCase());
          return cidadeNormalized.includes(searchValueNormalized);
        })
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

  // Função para enviar dados para FormSubmit
  const enviarDadosFormulario = async (valorCalculado: number) => {
    try {
      // Preparar dados do formulário para envio
      const formSubmitData = {
        nome: formData.nome,
        telefone: formData.telefone,
        cidade: formData.cidade,
        titular: formData.titular === 'sim' ? 'Sim' : 'Não',
        valorAprovado: `R$ ${valorCalculado.toLocaleString("pt-BR")},00`,
        dataHora: new Date().toLocaleString('pt-BR'),
        tipoFormulario: 'Empréstimo na Conta de Luz',
        _subject: "Nova simulação de empréstimo na conta de luz - Credios",
        _captcha: "false",
        _template: "table",
        _replyto: "noreply@credios.com.br",
      };

      // Enviar dados para FormSubmit
      const response = await fetch("https://formsubmit.co/ajax/simulador@credios.com.br", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formSubmitData)
      });

      if (!response.ok) {
        throw new Error(`Erro no envio: ${response.status}`);
      }

      const result: FormSubmitResponse = await response.json();
      
      if (result.success) {
        return true;
      } else {
        throw new Error('Falha no envio do formulário.');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setErroEnvio('Ocorreu um erro no envio, mas sua simulação foi realizada com sucesso.');
      
      // Tentar novamente uma vez em caso de falha
      try {
        const formSubmitData = {
          nome: formData.nome,
          telefone: formData.telefone,
          cidade: formData.cidade,
          titular: formData.titular === 'sim' ? 'Sim' : 'Não',
          valorAprovado: `R$ ${valorCalculado.toLocaleString("pt-BR")},00`,
          dataHora: new Date().toLocaleString('pt-BR'),
          tipoFormulario: 'Empréstimo na Conta de Luz (segunda tentativa)',
          _subject: "Nova simulação de empréstimo na conta de luz - Credios",
          _captcha: "false",
          _template: "table",
        };
        
        await fetch("https://formsubmit.co/ajax/simulador@credios.com.br", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formSubmitData)
        });
      } catch (e) {
        console.error('Falha na segunda tentativa de envio:', e);
      }
      
      return true; // Continua mesmo com falha para não prejudicar UX
    }
  };

  // Função para simular o empréstimo
  const simularEmprestimo = () => {
    if (validarFormulario()) {
      setIsLoading(true);
      
      // Timeout para simular processamento e proporcionar uma melhor experiência de usuário
      setTimeout(async () => {
        // Obtém o valor pré-aprovado baseado na cidade do usuário
        let valorAprovado = 500; // Valor padrão mínimo
        
        // Normalizar para ignorar acentos
        const cidadeNormalizada = normalizeText(formData.cidade.toLowerCase());
        
        // Procura pela cidade na lista
        const cidadeEncontrada = cidadesLista.find(
          item => normalizeText(item.cidade.toLowerCase()) === cidadeNormalizada
        );
        
        if (cidadeEncontrada) {
          // Se encontrou a cidade exata, usa o valor da cidade
          valorAprovado = cidadeEncontrada.valor;
        } else {
          // Procura por correspondência parcial
          const cidadeParcial = cidadesLista.find(
            item => normalizeText(item.cidade.toLowerCase()).includes(cidadeNormalizada) ||
                   cidadeNormalizada.includes(normalizeText(item.cidade.toLowerCase()))
          );
          
          if (cidadeParcial) {
            // Se encontrou uma correspondência parcial, usa o valor dela
            valorAprovado = cidadeParcial.valor;
          } else {
            // Fallback para valor aleatório mínimo se não encontrar a cidade
            valorAprovado = Math.floor(Math.random() * (1000 - 500 + 1) + 500);
          }
        }
        
        // Enviar dados para FormSubmit e esperar resultado
        await enviarDadosFormulario(valorAprovado);
        
        setValorAprovado(`R$ ${valorAprovado.toLocaleString("pt-BR")},00`);
        setMostrarResultado(true);
        setIsLoading(false);
      }, 2000);
    }
  };

  // Função para focar no formulário (para mobile)
  const irParaFormulario = () => {
    setFocarFormulario(true);
    
    // Scroll suave até o formulário
    setTimeout(() => {
      const formElement = document.getElementById('form-emprestimo');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Efeito para esconder sugestões quando clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const inputElement = document.getElementById('cidade-input');
      
      // Se o clique não foi no input de cidade ou em suas sugestões, esconde as sugestões
      if (inputElement && !inputElement.contains(target) && 
          !(target as Element).closest('.cidade-sugestoes-container')) {
        setMostrarSugestoes(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      icon: <Shield className="h-5 w-5" />, 
      title: "Negativado?", 
      text: "Aprovamos mesmo com nome no SPC/Serasa",
      mobileText: "Não tem problema!"
    },
    { 
      icon: <Banknote className="h-5 w-5" />, 
      title: "Zero burocracia", 
      text: "sem comprovação de renda" 
    },
    { 
      icon: <Zap className="h-5 w-5" />, 
      title: "Rápido e fácil", 
      text: "dinheiro na conta no mesmo dia" 
    },
    { 
      icon: <BadgeCheck className="h-5 w-5" />, 
      title: "Pagamento facilitado", 
      text: "direto na sua conta de luz" 
    }
  ];
  
  // Versão compacta dos recursos para mobile
  const recursosMobile = recursos.slice(0, isMobile ? 2 : recursos.length);

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
                  Nossa IA está verificando as melhores condições de crédito disponíveis para você.
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
      <section className="relative py-8 sm:py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-blue-800 via-blue-700 to-indigo-800 text-white">
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
          {/* Layout adaptativo baseado no modo mobile e no estado de foco do formulário */}
          <div className={`flex flex-col lg:flex-row lg:items-center lg:gap-14 ${(isMobile && focarFormulario) ? 'pt-4' : ''}`}>
            {/* Coluna de texto - escondida em mobile quando focar no formulário */}
            {(!isMobile || !focarFormulario) && (
              <div className={`flex-1 ${isMobile ? 'mb-6' : 'mb-12 lg:mb-0'}`}>
                <motion.div
                  className="flex items-center gap-2 bg-white/10 rounded-full py-2 px-4 text-sm font-medium mb-4 md:mb-6 backdrop-blur-md border border-white/20 w-fit"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span>4,9 de 5 no Google</span>
                </motion.div>
                
                <motion.h1 
                  className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold leading-tight mb-4 md:mb-6`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="block text-blue-100">Empréstimo na Conta</span>
                  <span className="block">
                    <span className="text-white">de Luz com </span>
                    <span className="text-yellow-300">Aprovação Imediata</span>
                  </span>
                </motion.h1>
                
                {/* Descrição - versão resumida para mobile */}
                <motion.p 
                  className={`${isMobile ? 'text-base' : 'text-xl'} text-blue-100 mb-6 max-w-[600px] leading-relaxed`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="font-semibold text-white">Dinheiro rápido</span> mesmo para quem está com nome sujo. Receba na sua conta e pague em parcelas
                  mensais na sua fatura de energia.
                </motion.p>
                
                {/* Box de valor - mantido compacto em mobile */}
                <motion.div 
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-5 border border-white/20 mb-6 md:mb-10 max-w-md"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      scale: [1, 1.02, 1],
                      transition: {
                        duration: 0.6,
                        delay: 0.3,
                        scale: {
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }
                      }
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <Badge variant="outline" className="bg-gradient-to-r from-yellow-400/20 to-amber-400/20 text-yellow-300 border-yellow-500/30 uppercase font-semibold">
                          Até
                        </Badge>
                        <span className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                          R$ 3.300,00
                        </span>
                      </div>
                      <div className="text-xs md:text-sm font-medium text-blue-100 mt-1">
                        Liberados no mesmo dia
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1], 
                        rotate: [0, 5, 0] 
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatDelay: 1 
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Zap className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Recursos - em desktop, mostrar todos os recursos */}
                {!isMobile && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10">
                    {recursos.map((recurso, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-start gap-3"
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={featureVariants}
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-md border border-white/20 text-blue-100">
                          {recurso.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-base md:text-lg text-white">{recurso.title}</h3>
                          <p className="text-xs md:text-sm text-blue-100">{recurso.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {/* Botão alternativo para mobile que leva ao formulário */}
                {isMobile && !focarFormulario && (
                  <motion.div 
                    className="flex flex-col gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {/* Recursos compactos em linha (apenas 2) para mobile */}
                    <div className="flex gap-3 mb-4">
                      {recursosMobile.map((recurso, i) => (
                        <motion.div 
                          key={i}
                          className="flex-1 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          variants={featureVariants}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
                              {recurso.icon}
                            </div>
                            <div>
                              <h3 className="font-medium text-sm text-white">{recurso.title}</h3>
                              {i === 0 && <p className="text-xs text-blue-100">{recurso.mobileText}</p>}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={irParaFormulario}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white py-5 px-4 rounded-xl text-lg font-bold shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 border-0"
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
                  </motion.div>
                )}
                
                {/* Badges de segurança - removidas em mobile */}
                {!isMobile && (
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
                            <p>Somos uma instituição financeira regulamentada</p>
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
                )}
              </div>
            )}
            
            {/* Formulário - sempre visível, porém otimizado para mobile */}
            <motion.div 
              id="form-emprestimo"
              className={`flex-1 max-w-lg mx-auto lg:mx-0 ${isMobile ? 'w-full' : ''}`}
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
                          Seu crédito foi pré-aprovado!
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
                            <div className="text-sm text-gray-500">Pronto para saque imediato</div>
                          </div>
                        </motion.div>
                        
                        {/* Mensagem de erro de envio, se houver */}
                        {erroEnvio && (
                          <motion.div 
                            className="mb-6 px-4 py-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {erroEnvio}
                          </motion.div>
                        )}
                        
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
                              <a href="https://simulador.credios.com.br/page/simulador/credito-pessoal/crefaz/678405c92b0581736705481?_gl=1*1vahffu*_gcl_au*MTExMzExODM0OS4xNzM2MDc0MDk2" className="flex items-center justify-center gap-2">
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
                        {/* Timer de oferta removido */}
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
                      
                      <CardHeader className={`${isMobile ? 'pt-6 pb-2 px-6' : 'pt-8 pb-2 px-8'} relative z-10`}>
                        <CardTitle className="text-2xl font-bold text-gray-900 text-center">Simule seu empréstimo</CardTitle>
                        <CardDescription className="text-center text-gray-600 mt-1">
                          É rápido e fácil, leva apenas 2 minutos!
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className={`${isMobile ? 'px-6 py-3' : 'px-8 py-4'} relative z-10`}>
                        {!isMobile && (
                          <div className="mb-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
                            <div className="flex items-start gap-3">
                              <div className="text-blue-600 mt-1 flex-shrink-0">
                                <AlertCircle className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-blue-800 mb-1">Oferta especial</h4>
                                <p className="text-sm text-blue-700">
                                  Preencha seus dados e você poderá receber seu dinheiro <span className="font-medium">ainda hoje</span>!
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <form className="space-y-4">
                          <div className="w-full">
                            <div className="space-y-2">
                              <Label htmlFor="cidade-input" className="font-medium text-gray-700 flex items-center gap-1.5">
                                <MapPin className="h-4 w-4 text-blue-600" />
                                Sua cidade*
                              </Label>
                              <div className="relative">
                                <Input
                                  id="cidade-input"
                                  placeholder="Digite sua cidade"
                                  className={`w-full pl-10 ${isMobile ? 'py-5' : 'py-6'} rounded-lg text-base ${errors.cidade ? 'border-red-300 ring-red-100' : 'border-gray-200'}`}
                                  value={cidadeInput}
                                  onChange={handleCidadeInputChange}
                                  autoComplete="address-level2"
                                  inputMode="text"
                                />
                                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                
                                <AnimatePresence>
                                  {mostrarSugestoes && (
                                    <motion.div 
                                      className="absolute top-full left-0 right-0 max-h-[200px] overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 cidade-sugestoes-container"
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      {cidadeSugestoes.map((cidade, index) => (
                                        <motion.div
                                          key={index}
                                          className="py-3 px-4 cursor-pointer text-gray-800 hover:bg-blue-50 transition-colors flex justify-between items-center"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            selecionarCidade(cidade);
                                          }}
                                          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                                        >
                                          <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-gray-400" />
                                            <span>{cidade.nome}</span>
                                          </div>
                                          {cidade.valor && (
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                              Até R$ {cidade.valor.toLocaleString('pt-BR')}
                                            </Badge>
                                          )}
                                        </motion.div>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                              {errors.cidade && (
                                <motion.p 
                                  className="text-sm text-red-600 flex items-center gap-1.5"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                >
                                  <X className="h-4 w-4" />
                                  {errors.cidade}
                                </motion.p>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="nome" className="font-medium text-gray-700 flex items-center gap-1.5">
                                <User className="h-4 w-4 text-blue-600" />
                                Nome completo*
                              </Label>
                              <div className="relative">
                                <Input
                                  id="nome"
                                  name="nome"
                                  placeholder="Digite seu nome"
                                  className={`w-full pl-10 ${isMobile ? 'py-5' : 'py-6'} rounded-lg text-base ${errors.nome ? 'border-red-300 ring-red-100' : 'border-gray-200'}`}
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
                            
                            <div className="space-y-2">
                              <Label htmlFor="telefone" className="font-medium text-gray-700 flex items-center gap-1.5">
                                <Phone className="h-4 w-4 text-blue-600" />
                                WhatsApp*
                              </Label>
                              <div className="relative">
                                <Input
                                  id="telefone"
                                  name="telefone"
                                  placeholder="(00) 00000-0000"
                                  className={`w-full pl-10 ${isMobile ? 'py-5' : 'py-6'} rounded-lg text-base ${errors.telefone ? 'border-red-300 ring-red-100' : 'border-gray-200'}`}
                                  value={formData.telefone}
                                  onChange={handleInputChange}
                                  autoComplete="tel"
                                  inputMode="tel"
                                />
                                <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                              </div>
                              {errors.telefone && (
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
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="font-medium text-gray-700 flex items-center gap-1.5">
                              <Badge className="h-4 w-4 text-blue-600" />
                              Você é titular da conta de luz?*
                            </Label>
                            <div className="grid grid-cols-2 gap-3">
                              <motion.button
                                type="button"
                                className={`relative py-3 md:py-4 px-4 rounded-lg text-base font-medium border-2 transition-all overflow-hidden ${
                                  formData.titular === 'sim' 
                                    ? 'border-blue-600 text-blue-800' 
                                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                                }`}
                                onClick={() => handleTitularChange(formData.titular === 'sim' ? '' : 'sim')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {formData.titular === 'sim' && (
                                  <motion.div 
                                    className="absolute inset-0 bg-blue-50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                  />
                                )}
                                <span className="relative z-10 flex justify-center items-center">
                                  {formData.titular === 'sim' ? (
                                    <Check className="h-5 w-5 text-blue-600 mr-2" />
                                  ) : null}
                                  Sim
                                </span>
                              </motion.button>
                              
                              <motion.button
                                type="button"
                                className={`relative py-3 md:py-4 px-4 rounded-lg text-base font-medium border-2 transition-all overflow-hidden ${
                                  formData.titular === 'nao' 
                                    ? 'border-blue-600 text-blue-800' 
                                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                                }`}
                                onClick={() => handleTitularChange(formData.titular === 'nao' ? '' : 'nao')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {formData.titular === 'nao' && (
                                  <motion.div 
                                    className="absolute inset-0 bg-blue-50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                  />
                                )}
                                <span className="relative z-10 flex justify-center items-center">
                                  {formData.titular === 'nao' ? (
                                    <Check className="h-5 w-5 text-blue-600 mr-2" />
                                  ) : null}
                                  Não
                                </span>
                              </motion.button>
                            </div>
                            {errors.titular && (
                              <motion.p 
                                className="text-sm text-red-600 flex items-center gap-1.5"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                              >
                                <X className="h-4 w-4" />
                                {errors.titular}
                              </motion.p>
                            )}
                          </div>
                          
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              type="button"
                              onClick={simularEmprestimo}
                              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white py-5 md:py-6 px-4 rounded-xl text-lg font-bold shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 mt-4 border-0"
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
                          <span>Atividade regulamentada pelo Banco Central</span>
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

export default HeroSection;