"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  FileText,
  Check, 
  X, 
  Search, 
  Shield, 
  AlertCircle, 
  CheckCircle2, 
  BadgeCheck, 
  Zap,
  LucideCalculator,
  ArrowRight,
  Info,
  Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";

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
  cpf: string;
  email: string;
  parcelas: number;
}

// Interface para a estrutura do JSON
interface CidadeJSON {
  cidade: string;
  valor: number;
}

// Interface para o resultado da simulação
interface ResultadoSimulacao {
  valorAprovado: number;
  valorParcela: number;
  parcelas: number;
  taxaJuros: number;
  cet: number;
  valorTotal: number;
}

// Componente de simulador
const SimuladorEmprestimoNaContaDeLuz: React.FC = () => {
  // Referência para o elemento resultado
  const resultadoRef = useRef<HTMLDivElement>(null);

  // Estado para controle de etapas do formulário
  const [etapaAtual, setEtapaAtual] = useState<number>(1);
  const [progresso, setProgresso] = useState<number>(0);
  
  // Estado para o overlay de carregamento
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Estado de hover para o botão de parcelas
  const [parcelaHover, setParcelaHover] = useState<number | null>(null);
  
  // Estado para o formulário
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    telefone: "",
    cidade: "",
    titular: "",
    cpf: "",
    email: "",
    parcelas: 12
  });
  
  // Estado para os erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fieldTouched, setFieldTouched] = useState<Record<string, boolean>>({});
  
  // Estado para sugestões de cidades
  const [cidadeSugestoes, setCidadeSugestoes] = useState<Cidade[]>([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState<boolean>(false);
  const [cidadeInput, setCidadeInput] = useState<string>("");
  const [cidadesLista, setCidadesLista] = useState<CidadeJSON[]>([]);
  
  // Estado para o resultado da simulação
  const [mostrarResultado, setMostrarResultado] = useState<boolean>(false);
  const [resultado, setResultado] = useState<ResultadoSimulacao | null>(null);
  const [tabAtiva, setTabAtiva] = useState<string>("resumo");

  // Opções de parcelas
  const opcoesParcelas = [6, 12, 18, 24];
  
  // Atualizar progresso quando mudar de etapa
  useEffect(() => {
    setProgresso((etapaAtual / 3) * 100);
  }, [etapaAtual]);
  
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
        
        // Verificamos se os dados estão no formato esperado
        if (Array.isArray(data) && data.length > 0 && 'cidade' in data[0] && 'valor' in data[0]) {
          setCidadesLista(data);
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

  // Verificar se todos os campos da etapa atual são válidos
  const etapaValida = (etapa: number): boolean => {
    const camposEtapa1 = ['cidade', 'nome', 'telefone'];
    const camposEtapa2 = ['cpf', 'email', 'titular'];
    
    const camposAtuais = etapa === 1 ? camposEtapa1 : camposEtapa2;
    
    // Verifica se há algum campo com erro ou não preenchido
    return camposAtuais.every(campo => 
      !errors[campo] && formData[campo as keyof FormData]
    );
  };
  
  // Função para formatar o CPF
  const formatarCPF = (value: string): string => {
    // Remove caracteres não-numéricos
    const numeroLimpo = value.replace(/\D/g, "");
    
    // Aplica a máscara ###.###.###-##
    if (numeroLimpo.length <= 3) {
      return numeroLimpo;
    } else if (numeroLimpo.length <= 6) {
      return `${numeroLimpo.slice(0, 3)}.${numeroLimpo.slice(3)}`;
    } else if (numeroLimpo.length <= 9) {
      return `${numeroLimpo.slice(0, 3)}.${numeroLimpo.slice(3, 6)}.${numeroLimpo.slice(6)}`;
    } else {
      return `${numeroLimpo.slice(0, 3)}.${numeroLimpo.slice(3, 6)}.${numeroLimpo.slice(6, 9)}-${numeroLimpo.slice(9, 11)}`;
    }
  };

  // Função para validar CPF
  const validarCPF = (cpf: string): boolean => {
    const cpfLimpo = cpf.replace(/\D/g, "");
    
    if (cpfLimpo.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais, o que é inválido
    if (/^(\d)\1+$/.test(cpfLimpo)) return false;
    
    // Validação dos dígitos verificadores
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false;
    
    return true;
  };

  // Função para validar email
  const validarEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
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
    } else if (name === "cpf") {
      setFormData({
        ...formData,
        [name]: formatarCPF(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Marca o campo como tocado
    setFieldTouched({
      ...fieldTouched,
      [name]: true
    });
    
    // Valida o campo em tempo real
    validarCampo(name, name === "telefone" ? formatarTelefone(value) : name === "cpf" ? formatarCPF(value) : value);
  };

  // Função para validar um campo específico
  const validarCampo = (nome: string, valor: string) => {
    let novosErros = { ...errors };
    
    switch (nome) {
      case "nome":
        if (!valor.trim()) {
          novosErros.nome = "Informe seu nome completo";
        } else if (valor.trim().split(" ").length < 2) {
          novosErros.nome = "Informe nome e sobrenome";
        } else {
          delete novosErros.nome;
        }
        break;
        
      case "telefone":
        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!telefoneRegex.test(valor)) {
          novosErros.telefone = "Digite um número válido";
        } else {
          delete novosErros.telefone;
        }
        break;
        
      case "cidade":
        if (!valor.trim()) {
          novosErros.cidade = "Por favor, informe sua cidade";
        } else {
          delete novosErros.cidade;
        }
        break;
        
      case "titular":
        if (!valor) {
          novosErros.titular = "Selecione uma opção";
        } else {
          delete novosErros.titular;
        }
        break;
        
      case "cpf":
        if (!valor.trim()) {
          novosErros.cpf = "Informe seu CPF";
        } else if (!validarCPF(valor)) {
          novosErros.cpf = "CPF inválido";
        } else {
          delete novosErros.cpf;
        }
        break;
        
      case "email":
        if (!valor.trim()) {
          novosErros.email = "Informe seu e-mail";
        } else if (!validarEmail(valor)) {
          novosErros.email = "E-mail inválido";
        } else {
          delete novosErros.email;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(novosErros);
    return !novosErros[nome];
  };

  // Função para lidar com a mudança no radio button de titular
  const handleTitularChange = (value: string) => {
    setFormData({
      ...formData,
      titular: value
    });
    
    // Marca o campo como tocado
    setFieldTouched({
      ...fieldTouched,
      titular: true
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
    
    // Marca o campo como tocado
    setFieldTouched({
      ...fieldTouched,
      cidade: true
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
    
    // Valida o campo
    validarCampo('cidade', value);
  };

  // Função para selecionar uma cidade da lista de sugestões
  const selecionarCidade = (cidade: Cidade) => {
    setCidadeInput(cidade.nome);
    setFormData({
      ...formData,
      cidade: cidade.nome
    });
    setMostrarSugestoes(false);
    
    // Valida o campo
    validarCampo('cidade', cidade.nome);
  };

  // Função para avançar para a próxima etapa
  const avancarEtapa = () => {
    if (etapaAtual === 1) {
      // Valida todos os campos da etapa 1
      const campos = ['cidade', 'nome', 'telefone'];
      let valido = true;
      
      campos.forEach(campo => {
        const valor = formData[campo as keyof FormData]?.toString() || '';
        if (!validarCampo(campo, valor)) {
          valido = false;
        }
        // Marca todos os campos como tocados
        setFieldTouched(prev => ({
          ...prev,
          [campo]: true
        }));
      });
      
      if (valido) {
        setEtapaAtual(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (etapaAtual === 2) {
      // Valida todos os campos da etapa 2
      const campos = ['cpf', 'email', 'titular'];
      let valido = true;
      
      campos.forEach(campo => {
        const valor = formData[campo as keyof FormData]?.toString() || '';
        if (!validarCampo(campo, valor)) {
          valido = false;
        }
        // Marca todos os campos como tocados
        setFieldTouched(prev => ({
          ...prev,
          [campo]: true
        }));
      });
      
      if (valido) {
        setEtapaAtual(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Função para voltar para a etapa anterior
  const voltarEtapa = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Função para selecionar o número de parcelas
  const selecionarParcelas = (parcelas: number) => {
    setFormData({
      ...formData,
      parcelas
    });
  };

  // Função para simular o empréstimo
  const simularEmprestimo = () => {
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
      
      // Calcula a taxa de juros (simulação) - entre 3.5% e 6.5% ao mês
      const taxaJuros = 3.5 + (Math.random() * 3);
      
      // Calcula o CET (simulação) - taxa de juros + 2 a 3%
      const cet = taxaJuros + 2 + (Math.random() * 1);
      
      // Calcula o valor da parcela usando a fórmula de amortização
      const taxaMensal = taxaJuros / 100;
      const fatorAmortizacao = (taxaMensal * Math.pow(1 + taxaMensal, formData.parcelas)) / 
                              (Math.pow(1 + taxaMensal, formData.parcelas) - 1);
      const valorParcela = valorAprovado * fatorAmortizacao;
      
      // Valor total a pagar
      const valorTotal = valorParcela * formData.parcelas;
      
      // Define o resultado da simulação
      setResultado({
        valorAprovado,
        valorParcela,
        parcelas: formData.parcelas,
        taxaJuros,
        cet,
        valorTotal
      });
      
      // Mostra o resultado
      setMostrarResultado(true);
      
      // Rola a página para o resultado
      setTimeout(() => {
        if (resultadoRef.current) {
          resultadoRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }, 2000);
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

  // Formatar valores para exibição
  const formatarValor = (valor: number): string => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Animações
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  // Componente para exibir erros
  const ErrorMessage = ({ message }: { message: string }) => (
    <motion.p 
      className="text-sm text-red-600 flex items-center gap-1.5 mt-1"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <X className="h-3.5 w-3.5" />
      {message}
    </motion.p>
  );

  // Componente para o campo do formulário
  const FormField = ({ 
    label, 
    id, 
    name, 
    placeholder, 
    value, 
    onChange, 
    type = "text",
    icon,
    autoComplete,
    inputMode,
    maxLength
  }: { 
    label: string; 
    id: string; 
    name: string; 
    placeholder: string; 
    value: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    type?: string;
    icon: React.ReactNode;
    autoComplete?: string;
    inputMode?: "text" | "tel" | "email";
    maxLength?: number;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-medium text-gray-700 flex items-center gap-1.5">
        {icon}
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          className={`w-full pl-10 py-6 rounded-lg text-base ${fieldTouched[name] && errors[name] ? 'border-red-300 ring-red-100 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200'}`}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          type={type}
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        
        {fieldTouched[name] && !errors[name] && (
          <motion.span 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
          >
            <CheckCircle2 className="h-5 w-5" />
          </motion.span>
        )}
      </div>
      <AnimatePresence>
        {fieldTouched[name] && errors[name] && (
          <ErrorMessage message={errors[name]} />
        )}
      </AnimatePresence>
    </div>
  );

  // Componente para o progresso de etapas
  const EtapasProgress = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {[1, 2, 3].map((etapa) => (
          <div 
            key={etapa} 
            className={`flex items-center justify-center rounded-full w-8 h-8 text-sm font-medium ${
              etapa < etapaAtual ? 'bg-green-500 text-white' : 
              etapa === etapaAtual ? 'bg-blue-600 text-white' : 
              'bg-gray-200 text-gray-500'
            }`}
          >
            {etapa < etapaAtual ? <Check className="h-4 w-4" /> : etapa}
          </div>
        ))}
      </div>
      <Progress value={progresso} className="h-2" />
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Seus dados</span>
        <span>Documentos</span>
        <span>Simulação</span>
      </div>
    </div>
  );

  // Componente para o cabeçalho da seção
  const SimuladorHeader = () => (
    <div className="text-center mb-8">
      <motion.div
        className="inline-flex items-center gap-2 bg-blue-100 rounded-full py-1.5 px-3 text-sm font-medium mb-4 text-blue-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LucideCalculator className="h-3.5 w-3.5" />
        <span>Simulador de empréstimo</span>
      </motion.div>
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Simule seu empréstimo na conta de luz
      </motion.h2>
      <motion.p
        className="text-lg text-gray-600 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Preencha os dados abaixo para simular seu empréstimo. É rápido, fácil e sem compromisso.
      </motion.p>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">Calculando seu crédito</h3>
                <p className="text-gray-600 max-w-[320px] mx-auto">
                  Estamos analisando os melhores valores disponíveis para seu empréstimo.
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

      <div className="container mx-auto px-4 max-w-4xl">
        <SimuladorHeader />
        
        <div className="relative">
          {!mostrarResultado && (
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 sm:p-8">
                  <div className="flex flex-wrap gap-4 items-center justify-between mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Simulador de empréstimo
                    </h3>
                    
                    <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-lg py-1.5 px-3 text-white text-sm">
                      <BadgeCheck className="h-4 w-4" />
                      <span>Aprovação rápida</span>
                    </div>
                  </div>
                  
                  <p className="text-blue-100 max-w-2xl">
                    Preencha o formulário e descubra quanto você pode receber.
                  </p>
                </div>
                
                <div className="p-6 sm:p-8">
                  <EtapasProgress />
                  
                  <AnimatePresence mode="wait">
                    {etapaAtual === 1 && (
                      <motion.div
                        key="etapa1"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={fadeInUp}
                        className="space-y-6"
                      >
                        <h4 className="text-lg font-medium text-gray-800">Informações pessoais</h4>
                        
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
                                className={`w-full pl-10 py-6 rounded-lg text-base ${fieldTouched.cidade && errors.cidade ? 'border-red-300 ring-red-100 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200'}`}
                                value={cidadeInput}
                                onChange={handleCidadeInputChange}
                                autoComplete="address-level2"
                                inputMode="text"
                              />
                              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                              
                              <AnimatePresence>
                                {fieldTouched.cidade && !errors.cidade && (
                                  <motion.span 
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                                  >
                                    <CheckCircle2 className="h-5 w-5" />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                              
                              <AnimatePresence>
                                {mostrarSugestoes && (
                                  <motion.div 
                                    className="absolute top-full left-0 right-0 max-h-[200px] overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1"
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
                                            Até {formatarValor(cidade.valor)}
                                          </Badge>
                                        )}
                                      </motion.div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            <AnimatePresence>
                              {fieldTouched.cidade && errors.cidade && (
                                <ErrorMessage message={errors.cidade} />
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            label="Nome completo*"
                            id="nome"
                            name="nome"
                            placeholder="Digite seu nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            icon={<User className="h-4 w-4 text-blue-600" />}
                            autoComplete="name"
                            inputMode="text"
                          />
                          
                          <FormField
                            label="WhatsApp*"
                            id="telefone"
                            name="telefone"
                            placeholder="(00) 00000-0000"
                            value={formData.telefone}
                            onChange={handleInputChange}
                            icon={<Phone className="h-4 w-4 text-blue-600" />}
                            autoComplete="tel"
                            inputMode="tel"
                            maxLength={15}
                          />
                        </div>
                        
                        <div className="mt-4">
                          <Button
                            type="button"
                            onClick={avancarEtapa}
                            disabled={!etapaValida(1)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 px-4 rounded-xl text-lg font-bold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            Continuar
                            <ArrowRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                    
                    {etapaAtual === 2 && (
                      <motion.div
                        key="etapa2"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={fadeInUp}
                        className="space-y-6"
                      >
                        <h4 className="text-lg font-medium text-gray-800">Dados para contrato</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            label="CPF*"
                            id="cpf"
                            name="cpf"
                            placeholder="000.000.000-00"
                            value={formData.cpf}
                            onChange={handleInputChange}
                            icon={<FileText className="h-4 w-4 text-blue-600" />}
                            autoComplete="off"
                            inputMode="text"
                            maxLength={14}
                          />
                          
                          <FormField
                            label="E-mail*"
                            id="email"
                            name="email"
                            placeholder="seu-email@exemplo.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            type="email"
                            icon={<Mail className="h-4 w-4 text-blue-600" />}
                            autoComplete="email"
                            inputMode="email"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="font-medium text-gray-700 flex items-center gap-1.5">
                            <Badge className="h-4 w-4 text-blue-600" />
                            Você é titular da conta de luz?*
                          </Label>
                          <div className="grid grid-cols-2 gap-3">
                            <motion.button
                              type="button"
                              className={`relative py-4 px-4 rounded-lg text-base font-medium border-2 transition-all overflow-hidden ${
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
                              className={`relative py-4 px-4 rounded-lg text-base font-medium border-2 transition-all overflow-hidden ${
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
                          <AnimatePresence>
                            {fieldTouched.titular && errors.titular && (
                              <ErrorMessage message={errors.titular} />
                            )}
                          </AnimatePresence>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-4 mb-2">
                          <Info className="h-4 w-4 text-blue-500" />
                          <p>Seus dados estão protegidos e não serão compartilhados.</p>
                        </div>
                        
                        <div className="flex gap-3 mt-4">
                          <Button
                            type="button"
                            onClick={voltarEtapa}
                            className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-6 px-4 rounded-xl text-lg font-medium transition-all duration-300"
                          >
                            Voltar
                          </Button>
                          
                          <Button
                            type="button"
                            onClick={avancarEtapa}
                            disabled={!etapaValida(2)}
                            className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white py-6 px-4 rounded-xl text-lg font-bold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            Continuar
                            <ArrowRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                    
                    {etapaAtual === 3 && (
                      <motion.div
                        key="etapa3"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={fadeInUp}
                        className="space-y-8"
                      >
                        <h4 className="text-lg font-medium text-gray-800">Finalize sua simulação</h4>
                        
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                          <h5 className="text-lg font-medium text-gray-800 mb-4">Escolha o número de parcelas</h5>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                            {opcoesParcelas.map((parcela) => (
                              <motion.button
                                key={parcela}
                                type="button"
                                className={`relative py-4 px-4 rounded-lg text-base font-medium border-2 transition-all overflow-hidden ${
                                  formData.parcelas === parcela 
                                    ? 'border-blue-600 text-blue-800' 
                                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                                }`}
                                onClick={() => selecionarParcelas(parcela)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onMouseEnter={() => setParcelaHover(parcela)}
                                onMouseLeave={() => setParcelaHover(null)}
                              >
                                {formData.parcelas === parcela && (
                                  <motion.div 
                                    className="absolute inset-0 bg-blue-50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                  />
                                )}
                                <span className="relative z-10 flex flex-col justify-center items-center">
                                  <span className="text-lg font-bold">{parcela}x</span>
                                  {(formData.parcelas === parcela || parcelaHover === parcela) && (
                                    <motion.span 
                                      className="text-xs text-blue-600 mt-1 font-normal"
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                    >
                                      {parcela} meses
                                    </motion.span>
                                  )}
                                </span>
                              </motion.button>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                            <Info className="h-4 w-4 text-blue-500" />
                            <p>O valor final depende da sua análise de crédito.</p>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 space-y-4">
                          <h5 className="text-lg font-medium text-blue-800">Confirmação de dados</h5>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between py-2 border-b border-blue-100">
                              <span className="text-gray-600">Nome:</span>
                              <span className="font-medium text-gray-900">{formData.nome}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-blue-100">
                              <span className="text-gray-600">Cidade:</span>
                              <span className="font-medium text-gray-900">{formData.cidade}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-blue-100">
                              <span className="text-gray-600">Telefone:</span>
                              <span className="font-medium text-gray-900">{formData.telefone}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-blue-100">
                              <span className="text-gray-600">CPF:</span>
                              <span className="font-medium text-gray-900">{formData.cpf}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-blue-100">
                              <span className="text-gray-600">Email:</span>
                              <span className="font-medium text-gray-900">{formData.email}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-blue-100">
                              <span className="text-gray-600">Titular da conta:</span>
                              <span className="font-medium text-gray-900">{formData.titular === 'sim' ? 'Sim' : 'Não'}</span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span className="text-gray-600">Parcelas:</span>
                              <span className="font-medium text-gray-900">{formData.parcelas}x</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 mt-4">
                          <Button
                            type="button"
                            onClick={voltarEtapa}
                            className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-6 px-4 rounded-xl text-lg font-medium transition-all duration-300"
                          >
                            Voltar
                          </Button>
                          
                          <Button
                            type="button"
                            onClick={simularEmprestimo}
                            className="w-2/3 bg-green-600 hover:bg-green-700 text-white py-6 px-4 rounded-xl text-lg font-bold shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            Simular agora
                            <Zap className="h-5 w-5" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="p-6 sm:p-8 border-t border-gray-100 bg-gray-50">
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-wrap gap-1">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">4,9 de 5 no Google</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Shield className="h-4 w-4" />
                      <span>A Credios exerce uma atividade regulamentada pelo Banco Central</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resultado da simulação */}
          <AnimatePresence>
            {mostrarResultado && resultado && (
              <motion.div
                ref={resultadoRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8"
              >
                <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden bg-white">
                  <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 w-full"></div>
                  
                  <CardHeader className="p-8 pb-2 relative">
                    <div className="absolute -right-16 -top-16 w-40 h-40 bg-green-50 rounded-full opacity-40 blur-3xl"></div>
                    
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, stiffness: 80 }}
                      className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center"
                    >
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </motion.div>
                    
                    <CardTitle className="text-center text-2xl sm:text-3xl font-bold text-gray-900">
                      Parabéns, {formData.nome.split(' ')[0]}!
                    </CardTitle>
                    <CardDescription className="text-center text-lg text-gray-600 mt-2">
                      Seu empréstimo foi pré-aprovado.
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-8 pt-4">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8 relative overflow-hidden">
                      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 blur-xl"></div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-700">Valor aprovado:</h3>
                          <div className="text-4xl font-bold text-gray-900 mt-1">
                            {formatarValor(resultado.valorAprovado)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-green-100 py-2 px-4 rounded-full text-green-800 text-sm font-medium">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Pré-aprovado</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 relative z-10">
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Parcela mensal:</div>
                          <div className="text-xl font-bold text-gray-900">{formatarValor(resultado.valorParcela)}</div>
                          <div className="text-xs text-gray-500 mt-1">em {resultado.parcelas}x</div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Taxa de juros:</div>
                          <div className="text-xl font-bold text-gray-900">{resultado.taxaJuros.toFixed(2)}% a.m.</div>
                          <div className="text-xs text-gray-500 mt-1">Custo Efetivo Total: {resultado.cet.toFixed(2)}%</div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                          <div className="text-sm text-gray-600 mb-1">Valor total:</div>
                          <div className="text-xl font-bold text-gray-900">{formatarValor(resultado.valorTotal)}</div>
                          <div className="text-xs text-gray-500 mt-1">Todos os valores inclusos</div>
                        </div>
                      </div>
                    </div>
                    
                    <Tabs value={tabAtiva} onValueChange={setTabAtiva} className="mt-8">
                      <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger value="resumo">Resumo</TabsTrigger>
                        <TabsTrigger value="parcelamento">Parcelamento</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="resumo" className="space-y-4">
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <div className="bg-blue-50 p-4 border-b border-blue-100">
                            <h3 className="font-medium text-blue-800">Detalhes do empréstimo</h3>
                          </div>
                          
                          <div className="p-4 space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Valor contratado:</span>
                              <span className="font-medium text-gray-900">{formatarValor(resultado.valorAprovado)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Parcelas:</span>
                              <span className="font-medium text-gray-900">{resultado.parcelas}x de {formatarValor(resultado.valorParcela)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Taxa de juros:</span>
                              <span className="font-medium text-gray-900">{resultado.taxaJuros.toFixed(2)}% ao mês</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">CET (Custo Efetivo Total):</span>
                              <span className="font-medium text-gray-900">{resultado.cet.toFixed(2)}% ao mês</span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span className="text-gray-600">Valor total a pagar:</span>
                              <span className="font-medium text-gray-900">{formatarValor(resultado.valorTotal)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <div className="bg-blue-50 p-4 border-b border-blue-100">
                            <h3 className="font-medium text-blue-800">Dados para contrato</h3>
                          </div>
                          
                          <div className="p-4 space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Nome:</span>
                              <span className="font-medium text-gray-900">{formData.nome}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">CPF:</span>
                              <span className="font-medium text-gray-900">{formData.cpf}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Telefone:</span>
                              <span className="font-medium text-gray-900">{formData.telefone}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Email:</span>
                              <span className="font-medium text-gray-900">{formData.email}</span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span className="text-gray-600">Titular da conta:</span>
                              <span className="font-medium text-gray-900">{formData.titular === 'sim' ? 'Sim' : 'Não'}</span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="parcelamento">
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <div className="bg-blue-50 p-4 border-b border-blue-100">
                            <h3 className="font-medium text-blue-800">Detalhamento das parcelas</h3>
                          </div>
                          
                          <div className="p-4">
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b border-gray-200">
                                    <th className="py-3 text-left text-sm font-medium text-gray-600 w-16">Nº</th>
                                    <th className="py-3 text-left text-sm font-medium text-gray-600">Vencimento</th>
                                    <th className="py-3 text-left text-sm font-medium text-gray-600">Valor</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Array.from({ length: resultado.parcelas }).map((_, i) => {
                                    const dataAtual = new Date();
                                    const dataVencimento = new Date();
                                    dataVencimento.setMonth(dataAtual.getMonth() + i + 1);
                                    const dataFormatada = dataVencimento.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                                    
                                    return (
                                      <tr key={i} className="border-b border-gray-100">
                                        <td className="py-3 text-sm text-gray-900">{i + 1}</td>
                                        <td className="py-3 text-sm text-gray-900">{dataFormatada}</td>
                                        <td className="py-3 text-sm text-gray-900">{formatarValor(resultado.valorParcela)}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="mt-8">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white rounded-xl py-7 px-4 text-xl font-bold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 border-0 flex items-center justify-center gap-2"
                          asChild
                        >
                          <a href="https://credios.com.br/contratacao-emprestimo-conta-luz" className="flex items-center gap-2">
                            CONTRATAR AGORA
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
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="link" className="mt-3 text-gray-500 hover:text-gray-700 text-sm mx-auto block">
                            Ver mais informações sobre o contrato
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-3 text-sm">
                            <h4 className="font-medium text-gray-800">Informações do contrato</h4>
                            <p className="text-gray-600">
                              O contrato será enviado para seu e-mail após a aprovação final do crédito.
                            </p>
                            <p className="text-gray-600">
                              O pagamento será feito através da sua conta de luz, em parcelas mensais.
                            </p>
                            <p className="text-gray-600">
                              Você pode quitar o empréstimo antecipadamente com desconto.
                            </p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="px-8 py-6 border-t border-gray-100 bg-gray-50">
                    <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center w-full">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-wrap gap-1">
                          {[1, 2, 3, 4, 5].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">4,9 de 5 no Google</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Shield className="h-4 w-4" />
                        <span>A Credios exerce uma atividade regulamentada pelo Banco Central</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SimuladorEmprestimoNaContaDeLuz;