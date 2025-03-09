"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Componentes do shadcn/ui
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Ícones do Lucide
import {
  CheckCircle2,
  Zap,
  ThumbsUp,
  Lightbulb,
  ArrowRight,
  CreditCard,
  FileCheck,
  MapPin,
  AlertCircle,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

// Definir componentes de ícones personalizados
const Calculator = ({ className }: { className?: string }) => (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={2} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" x2="16" y1="6" y2="6" />
    <line x1="8" x2="8" y1="14" y2="14" />
    <line x1="12" x2="12" y1="14" y2="14" />
    <line x1="16" x2="16" y1="14" y2="14" />
    <line x1="8" x2="8" y1="18" y2="18" />
    <line x1="12" x2="12" y1="18" y2="18" />
    <line x1="16" x2="16" y1="18" y2="18" />
  </svg>
);

// Componente do ícone de lupa
const Search = ({ className }: { className?: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={2} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

interface AdvantageItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
  action?: string;
}

// Lista de vantagens aprimorada
const ADVANTAGES: AdvantageItem[] = [
  {
    icon: <CheckCircle2 className="h-8 w-8 text-emerald-500" />,
    title: "Aprovação instantânea",
    description:
      "Saiba na hora se você tem crédito aprovado e qual o valor liberado, sem burocracia ou espera.",
    highlight: "Em segundos",
    action: "Simular agora",
  },
  {
    icon: <Zap className="h-8 w-8 text-amber-500" />,
    title: "Até R$ 3.300,00 liberados",
    description:
      "Acesse um valor significativo para suas necessidades sem complicações ou comprovação de renda.",
    highlight: "Valor máximo",
    action: "Ver condições",
  },
  {
    icon: <ThumbsUp className="h-8 w-8 text-blue-500" />,
    title: "Disponível mesmo negativado",
    description:
      "Solução inclusiva para quem está com restrições no nome e precisa de crédito com urgência.",
    highlight: "Sem consulta",
    action: "Verificar elegibilidade",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-purple-500" />,
    title: "100% digital e seguro",
    description:
      "Todo o processo é realizado pelo seu celular com proteção de dados e criptografia avançada.",
    highlight: "Rápido e prático",
    action: "Conhecer o processo",
  },
];

// Dados sobre o funcionamento do empréstimo
const HOW_IT_WORKS = [
  {
    title: "Simulação",
    description: "Informe seus dados básicos e veja na hora quanto você pode receber",
    icon: <Calculator className="h-6 w-6" />,
  },
  {
    title: "Documentação",
    description: "Envie fotos do seu documento e da conta de luz mais recente",
    icon: <FileCheck className="h-6 w-6" />,
  },
  {
    title: "Análise",
    description: "Aguarde alguns minutos enquanto validamos suas informações",
    icon: <Search className="h-6 w-6" />,
  },
  {
    title: "Recebimento",
    description: "Dinheiro liberado direto na sua conta bancária em poucas horas",
    icon: <CreditCard className="h-6 w-6" />,
  },
];

// Estados disponíveis
const AVAILABLE_STATES = [
  "Bahia", "Ceará", "Pernambuco", "Rio Grande do Norte", 
  "Goiás", "São Paulo", "Rio de Janeiro", "Paraná", "Rio Grande do Sul"
];

// Perguntas frequentes
const FAQ_ITEMS = [
  {
    question: "Como as parcelas são cobradas?",
    answer: "As parcelas são incluídas diretamente na sua fatura mensal de energia elétrica, facilitando o pagamento e evitando boletos adicionais."
  },
  {
    question: "Qual o prazo máximo para pagamento?",
    answer: "Você pode parcelar seu empréstimo em até 12 vezes, com valores que se encaixam no seu orçamento mensal."
  },
  {
    question: "Preciso estar adimplente com a concessionária?",
    answer: "Sim, é necessário estar com as contas de luz em dia para solicitar o empréstimo."
  }
];

export default function AdvantagesSection() {
  // Estado para controlar as seções expandidas no mobile
  const [activeSection, setActiveSection] = useState<string>("vantagens");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  // Estado para verificar se estamos em desktop
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Efeito para verificar o tamanho da tela e atualizar quando houver resize
  useEffect(() => {
    // Função para checar se estamos em viewport desktop
    const checkIsDesktop = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
    };
    
    // Verificação inicial
    checkIsDesktop();
    
    // Adicionar event listener para atualizar em caso de redimensionamento
    window.addEventListener('resize', checkIsDesktop);
    
    // Cleanup do event listener
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);
  
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Função para alternar as seções no mobile
  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  return (
    <section className="w-full py-12 sm:py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Elementos decorativos de background */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full opacity-20 blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/4"></div>
        
        {/* Título da seção com animação */}
        <motion.div 
          className="mb-8 sm:mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 px-3 py-1 bg-orange-100 text-orange-700 hover:bg-orange-200 border-none">
            Solução financeira inovadora
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Empréstimo na Conta de Luz
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Uma maneira simples, rápida e sem burocracia de conseguir o crédito que você precisa.
          </p>
        </motion.div>
        
        {/* Desktop: Tabs de navegação */}
        {isDesktop ? (
          <Tabs defaultValue="vantagens" className="mb-10">
            <div className="flex justify-center">
              <TabsList className="mb-8 bg-gray-100/80 p-1 backdrop-blur-sm">
                <TabsTrigger 
                  value="vantagens" 
                  className="data-[state=active]:bg-white data-[state=active]:text-orange-600 px-6"
                >
                  Vantagens
                </TabsTrigger>
                <TabsTrigger 
                  value="como-funciona" 
                  className="data-[state=active]:bg-white data-[state=active]:text-orange-600 px-6"
                >
                  Como Funciona
                </TabsTrigger>
                <TabsTrigger 
                  value="perguntas" 
                  className="data-[state=active]:bg-white data-[state=active]:text-orange-600 px-6"
                >
                  Perguntas Frequentes
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Conteúdo das tabs desktop */}
            <TabsContent value="vantagens" className="mt-0">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {/* Cards de vantagens */}
                {ADVANTAGES.map((item, index) => (
                  <motion.div
                    key={index}
                    className="h-full"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <Card className="h-full bg-white/90 backdrop-blur-sm border-gray-100 shadow-lg shadow-gray-100/40 hover:shadow-xl hover:shadow-orange-100/30 transition-all overflow-hidden group">
                      {item.highlight && (
                        <div className="absolute top-0 right-0">
                          <Badge className="m-3 bg-gradient-to-r from-orange-500 to-orange-400 border-none text-white uppercase text-xs font-semibold tracking-wide px-2 py-1">
                            {item.highlight}
                          </Badge>
                        </div>
                      )}
                      <CardHeader className="pb-0">
                        <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300 w-14 h-14 flex items-center justify-center bg-gray-50 rounded-lg shadow-sm">
                          {item.icon}
                        </div>
                        <CardTitle className="text-xl font-bold mt-2">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="mt-2 text-gray-600 text-base leading-relaxed">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-4">
                        {item.action && (
                          <Button 
                            variant="ghost" 
                            className="p-0 h-auto text-orange-500 hover:text-orange-600 hover:bg-transparent group-hover:underline font-medium"
                          >
                            {item.action} <ArrowRight className="h-4 w-4 ml-1 inline group-hover:translate-x-1 transition-transform" />
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="como-funciona" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                {/* Etapas do processo para desktop */}
                <div className="lg:col-span-3 space-y-6">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">
                    Processo simplificado em 4 etapas
                  </h3>

                  <div className="relative">
                    {/* Linha conectora */}
                    <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gradient-to-b from-orange-400 to-orange-500 hidden md:block"></div>

                    {HOW_IT_WORKS.map((step, index) => (
                      <motion.div 
                        key={index}
                        className="relative mb-8 last:mb-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex gap-5">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center border-2 border-orange-400 shadow-md z-10">
                            <div className="text-orange-500">{step.icon}</div>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
                              <span className="mr-2">Etapa {index + 1}:</span> 
                              {step.title}
                            </h4>
                            <p className="text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-10 pt-6 border-t border-gray-100">
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-orange-500" />
                      Estados participantes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_STATES.map((state, index) => (
                        <Badge key={index} variant="outline" className="bg-white">
                          {state}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Imagem e Call-to-action para desktop */}
                <div className="lg:col-span-2">
                  <motion.div
                    className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl shadow-md relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-200 rounded-full opacity-30"></div>
                    <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-amber-200 rounded-full opacity-30"></div>
                    
                    <div className="relative mb-6">
                      <Image
                        src="/images/Frame 13.png"
                        alt="Pessoa utilizando o serviço de empréstimo"
                        width={300}
                        height={300}
                        className="mx-auto rounded-xl shadow-lg"
                      />
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Aprovação em minutos
                        </Badge>
                      </div>
                    </div>

                    <div className="text-center">
                      <h4 className="text-xl font-bold mb-2">Pronto para começar?</h4>
                      <p className="text-gray-600 mb-4">
                        Simule agora e descubra quanto você pode receber
                      </p>
                      <Button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-md hover:shadow-lg transition-all w-full">
                        Simular sem compromisso
                      </Button>
                      <p className="text-xs text-gray-500 mt-3 flex items-center justify-center">
                        <AlertCircle className="h-3 w-3 mr-1" /> 
                        Consulta não afeta seu score de crédito
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="perguntas" className="mt-0">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Perguntas Frequentes
                </h3>
                
                <div className="space-y-4">
                  {FAQ_ITEMS.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="rounded-lg border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className={`w-full p-4 flex justify-between items-center text-left font-medium ${
                          expandedFaq === index ? "bg-orange-50" : "bg-white"
                        }`}
                      >
                        <span className={expandedFaq === index ? "text-orange-600" : "text-gray-800"}>
                          {item.question}
                        </span>
                        <ChevronRight 
                          className={`h-5 w-5 transition-transform ${
                            expandedFaq === index ? "rotate-90 text-orange-500" : "text-gray-400"
                          }`} 
                        />
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 bg-white text-gray-600">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center">
                  <p className="mb-4 text-gray-700">
                    Ainda tem dúvidas sobre o empréstimo na conta de luz?
                  </p>
                  <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                    Falar com um especialista
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          // Mobile: Acordeão vertical de seções
          <div className="space-y-6">
            {/* Seção Vantagens */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => toggleSection("vantagens")}
                className="w-full p-4 flex justify-between items-center bg-white"
              >
                <h3 className="text-lg font-semibold text-gray-800">Vantagens</h3>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    activeSection === "vantagens" ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {activeSection === "vantagens" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 space-y-4">
                      {ADVANTAGES.map((item, index) => (
                        <Card key={index} className="bg-white border-gray-100 shadow-sm overflow-hidden">
                          <CardHeader className="pb-3">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 mt-0.5 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg shadow-sm">
                                {item.icon}
                              </div>
                              <div>
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-base font-bold">
                                    {item.title}
                                  </CardTitle>
                                  {item.highlight && (
                                    <Badge className="ml-2 bg-gradient-to-r from-orange-500 to-orange-400 border-none text-white text-xs font-semibold">
                                      {item.highlight}
                                    </Badge>
                                  )}
                                </div>
                                <CardDescription className="mt-1 text-gray-600 text-sm">
                                  {item.description}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          {item.action && (
                            <CardFooter className="pt-0 pb-3">
                              <Button 
                                variant="ghost" 
                                className="p-0 h-auto text-orange-500 hover:text-orange-600 hover:bg-transparent text-sm font-medium"
                              >
                                {item.action} <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
                              </Button>
                            </CardFooter>
                          )}
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Seção Como Funciona */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => toggleSection("como-funciona")}
                className="w-full p-4 flex justify-between items-center bg-white"
              >
                <h3 className="text-lg font-semibold text-gray-800">Como Funciona</h3>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    activeSection === "como-funciona" ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {activeSection === "como-funciona" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0">
                      <div className="space-y-5 mb-6">
                        {HOW_IT_WORKS.map((step, index) => (
                          <div key={index} className="flex gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center border-2 border-orange-400 shadow-sm">
                              <div className="text-orange-500 scale-75">{step.icon}</div>
                            </div>
                            <div>
                              <h4 className="text-base font-semibold text-gray-800 mb-0.5">
                                {index + 1}. {step.title}
                              </h4>
                              <p className="text-sm text-gray-600">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-base font-semibold mb-3 flex items-center text-gray-800">
                          <MapPin className="mr-2 h-4 w-4 text-orange-500" />
                          Estados participantes
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {AVAILABLE_STATES.map((state, index) => (
                            <Badge key={index} variant="outline" className="bg-white text-xs">
                              {state}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* CTA para mobile */}
                      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <h4 className="text-base font-semibold mb-2">Pronto para começar?</h4>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg">
                          <Calculator className="h-4 w-4 mr-2" />
                          Simular sem compromisso
                        </Button>
                        <p className="text-xs text-gray-500 mt-2 flex items-center justify-center">
                          <AlertCircle className="h-3 w-3 mr-1" /> 
                          Consulta não afeta seu score de crédito
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Seção Perguntas Frequentes */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => toggleSection("perguntas")}
                className="w-full p-4 flex justify-between items-center bg-white"
              >
                <h3 className="text-lg font-semibold text-gray-800">Perguntas Frequentes</h3>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    activeSection === "perguntas" ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {activeSection === "perguntas" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-2">
                      <div className="space-y-3">
                        {FAQ_ITEMS.map((item, index) => (
                          <div key={index} className="border border-gray-100 rounded-lg overflow-hidden">
                            <button
                              onClick={() => toggleFaq(index)}
                              className={`w-full p-3 flex justify-between items-center text-left ${
                                expandedFaq === index ? "bg-orange-50" : "bg-white"
                              }`}
                            >
                              <span className={`${expandedFaq === index ? "text-orange-600" : "text-gray-800"} text-sm font-medium pr-2`}>
                                {item.question}
                              </span>
                              <ChevronDown
                                className={`h-4 w-4 flex-shrink-0 transition-transform ${
                                  expandedFaq === index ? "rotate-180 text-orange-500" : "text-gray-400"
                                }`} 
                              />
                            </button>
                            <AnimatePresence>
                              {expandedFaq === index && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-3 pt-0 bg-white text-gray-600 text-sm">
                                    {item.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                        <p className="mb-3 text-sm text-gray-700">
                          Ainda tem dúvidas?
                        </p>
                        <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                          Falar com um especialista
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Nota informativa */}
        <motion.div 
          className="mt-10 sm:mt-16 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4 inline-block">
            <p className="text-xs sm:text-sm text-blue-700 flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" />
              <span>
                O crédito na conta de luz é uma parceria da Credios com a Crefaz e está disponível na maioria 
                das cidades dos estados listados. Consulte disponibilidade para a sua região.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}