"use client";
// WhatsApp Icon Component
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      fill="#ffffff"
      height="20"
      width="20"
      viewBox="0 0 308 308"
      {...props}
    >
      <g>
        <path d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
          c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
          c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
          c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
          c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
          c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
          c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
          c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
          c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
          C233.168,179.508,230.845,178.393,227.904,176.981z"/>
        <path d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
          c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
          c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
          M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
          l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
          c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
          C276.546,215.678,222.799,268.994,156.734,268.994z"/>
      </g>
    </svg>
  );
  
  import React, { useRef } from "react";
  import Link from "next/link";
  import { motion, useInView } from "framer-motion";
  
  // Componentes UI
  import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  
  // Ícones
  import {
    Clock,
    ShieldCheck,
    Zap,
    CreditCard,
    Award,
    TrendingUp,
    User,
    Star,
    ArrowRight,
    ChevronRight,
    BadgePercent,
    Landmark,
    Briefcase,
    Wallet,
    Home,
    Car,
    Calendar,
    PlugZap,
    AlertOctagon,
  } from "lucide-react";
  
  // Tipos
  interface BenefitItem {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
  }
  
  interface LoanOption {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    url: string;
    highlighted?: boolean;
    badge?: string;
    available: boolean;
  }
  
  // Dados
  const BENEFITS: BenefitItem[] = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Aprovação Ultra Rápida",
      description: "Obtenha resposta em minutos, não em dias",
      color: "blue",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Dinheiro na Conta Via Pix",
      description: "Receba seu crédito no mesmo dia da aprovação",
      color: "yellow",
    },
    {
      icon: <BadgePercent className="h-6 w-6" />,
      title: "Taxas Competitivas",
      description: "Juros a partir de 1,99% ao mês para você economizar",
      color: "green",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "100% Digital e Seguro",
      description: "Processo totalmente online, sem papelada",
      color: "purple",
    },
  ];
  
  const LOAN_OPTIONS: LoanOption[] = [
    {
      id: "conta-luz",
      title: "Empréstimo na Conta de Luz",
      description: "Use sua conta de energia para conseguir até R$3.300",
      icon: <PlugZap className="h-6 w-6" />,
      color: "yellow",
      url: "/emprestimo-na-conta-de-luz",
      highlighted: true,
      badge: "MAIS POPULAR",
      available: true,
    },
    {
      id: "fgts",
      title: "Empréstimo FGTS",
      description: "Antecipe seu saque-aniversário com as melhores condições",
      icon: <Calendar className="h-6 w-6" />,
      color: "blue",
      url: "/emprestimo-fgts",
      highlighted: true,
      available: true,
    },
    {
      id: "cartao-credito",
      title: "Empréstimo no Cartão de Crédito",
      description: "Transforme seu limite em dinheiro na conta em minutos",
      icon: <CreditCard className="h-6 w-6" />,
      color: "orange",
      url: "/emprestimo-no-cartao-de-credito",
      highlighted: true,
      badge: "NOVO",
      available: true,
    },
    {
      id: "pessoal",
      title: "Empréstimo Pessoal",
      description: "Crédito para usar como quiser, sem burocracia",
      icon: <Wallet className="h-6 w-6" />,
      color: "green",
      url: "/emprestimos/emprestimo-pessoal",
      available: true,
    },
    {
      id: "consignado",
      title: "Empréstimo Consignado",
      description: "Para aposentados, pensionistas e servidores públicos",
      icon: <Landmark className="h-6 w-6" />,
      color: "teal",
      url: "/emprestimos/emprestimo-consignado",
      available: true,
    },
    {
      id: "negativado",
      title: "Empréstimo para Negativados",
      description: "Soluções para quem está com restrições no nome",
      icon: <AlertOctagon className="h-6 w-6" />,
      color: "red",
      url: "/emprestimos/emprestimo-para-negativado",
      available: true,
    },
    {
      id: "autonomo",
      title: "Empréstimo para Autônomos",
      description: "Crédito específico para trabalhadores independentes",
      icon: <Briefcase className="h-6 w-6" />,
      color: "indigo",
      url: "/emprestimos/emprestimo-para-autonomos",
      available: true,
    },
    {
      id: "aposentados",
      title: "Empréstimo para Aposentados",
      description: "Condições especiais para aposentados e pensionistas",
      icon: <Award className="h-6 w-6" />,
      color: "purple",
      url: "/emprestimos/emprestimo-para-aposentados",
      available: true,
    },
    {
      id: "imovel",
      title: "Empréstimo com Garantia de Imóvel",
      description: "Taxas reduzidas usando seu imóvel como garantia",
      icon: <Home className="h-6 w-6" />,
      color: "slate",
      url: "/emprestimos/emprestimo-garantia-imovel",
      available: false,
    },
    {
      id: "veiculos",
      title: "Empréstimo com Garantia de Veículo",
      description: "Use seu veículo como garantia e pague menos juros",
      icon: <Car className="h-6 w-6" />,
      color: "cyan",
      url: "/emprestimos/emprestimo-garantia-veiculo",
      available: false,
    },
  ];
  
  // Componentes de UI personalizados
  const getColorClasses = (color: string, type: "bg" | "text" | "border" | "hover" | "gradient") => {
    const colorMap: Record<string, Record<string, string>> = {
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        border: "border-blue-200",
        hover: "hover:bg-blue-600 hover:text-white",
        gradient: "from-blue-500 to-blue-600",
      },
      yellow: {
        bg: "bg-amber-100",
        text: "text-amber-600",
        border: "border-amber-200",
        hover: "hover:bg-amber-600 hover:text-white",
        gradient: "from-amber-500 to-amber-600",
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-600",
        border: "border-green-200",
        hover: "hover:bg-green-600 hover:text-white",
        gradient: "from-green-500 to-green-600",
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-600",
        border: "border-purple-200",
        hover: "hover:bg-purple-600 hover:text-white",
        gradient: "from-purple-500 to-purple-600",
      },
      orange: {
        bg: "bg-orange-100",
        text: "text-orange-600",
        border: "border-orange-200",
        hover: "hover:bg-orange-600 hover:text-white",
        gradient: "from-orange-500 to-orange-600",
      },
      red: {
        bg: "bg-red-100",
        text: "text-red-600",
        border: "border-red-200",
        hover: "hover:bg-red-600 hover:text-white",
        gradient: "from-red-500 to-red-600",
      },
      teal: {
        bg: "bg-teal-100",
        text: "text-teal-600",
        border: "border-teal-200",
        hover: "hover:bg-teal-600 hover:text-white",
        gradient: "from-teal-500 to-teal-600",
      },
      indigo: {
        bg: "bg-indigo-100",
        text: "text-indigo-600",
        border: "border-indigo-200",
        hover: "hover:bg-indigo-600 hover:text-white",
        gradient: "from-indigo-500 to-indigo-600",
      },
      slate: {
        bg: "bg-slate-100",
        text: "text-slate-600",
        border: "border-slate-200",
        hover: "hover:bg-slate-600 hover:text-white",
        gradient: "from-slate-500 to-slate-600",
      },
      cyan: {
        bg: "bg-cyan-100",
        text: "text-cyan-600",
        border: "border-cyan-200",
        hover: "hover:bg-cyan-600 hover:text-white",
        gradient: "from-cyan-500 to-cyan-600",
      },
    };
  
    return colorMap[color]?.[type] || "";
  };
  
  // Animações
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  // Seção Hero
  const HeroSection = () => {
    return (
      <div className="relative overflow-hidden bg-gradient-to-tr from-blue-50 via-indigo-50 to-violet-50 py-20">
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-blue-300 opacity-10 blur-3xl"></div>
          <div className="absolute top-40 -left-10 w-80 h-80 rounded-full bg-purple-300 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-teal-300 opacity-10 blur-3xl"></div>
        </div>
  
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Conteúdo da Hero */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                className="mb-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-1.5 px-4 rounded-full"
                variant="secondary"
              >
                Soluções de Crédito
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                Encontre o{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  empréstimo ideal
                </span>{" "}
                para você
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-md">
                Soluções personalizadas de crédito para cada necessidade, com 
                aprovação rápida e 100% digital. Descubra o empréstimo que cabe no seu bolso.
              </p>
  
              {/* Estatísticas rápidas */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">+100 mil</div>
                    <div className="text-xs text-gray-500">Clientes satisfeitos</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">R$ 50 milhões</div>
                    <div className="text-xs text-gray-500">Em crédito concedido</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Star className="h-4 w-4 text-amber-600" fill="currentColor" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">4.8/5</div>
                    <div className="text-xs text-gray-500">Avaliação dos clientes</div>
                  </div>
                </div>
              </div>
  
              <div className="flex flex-wrap gap-4">
              <Link href="/simulador" passHref>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  Simular Agora <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                </Link>
                <Link href="https://wa.me/552130300606?text=Olá,%20gostaria%20de%20falar%20com%20um%20consultor" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full px-8 py-6 text-lg flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group animate-pulse animate-duration-[3000ms]"
                >
                  <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                  <WhatsAppIcon className="h-5 w-5 text-white relative z-10" /> 
                  <span className="relative z-10">Falar com Consultor</span>
                </Button>
                </Link>
              </div>
            </motion.div>
  
            {/* Vantagens da Hero */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {BENEFITS.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`p-6 rounded-2xl ${getColorClasses(benefit.color, "bg")} backdrop-blur-sm border border-white/40 hover:shadow-lg transition-all duration-300 cursor-pointer`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(
                      benefit.color,
                      "text"
                    )} bg-white mb-4 shadow-sm`}
                  >
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
  
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,53.3C1120,53,1280,43,1360,37.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    );
  };
  
  // Seção de opções de empréstimo
  const LoanOptionsSection = () => {
    const categoryRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(categoryRef, { once: true, margin: "-50px" });
  
    return (
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <Badge
              className="mb-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-600 py-1 px-3"
              variant="secondary"
            >
              Nossos Produtos
            </Badge>
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Escolha seu Tipo de Empréstimo
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Oferecemos diversas modalidades de crédito para atender às suas necessidades específicas. 
              Selecione abaixo a opção que melhor se encaixa no seu perfil.
            </p>
          </div>
  
          <motion.div
            ref={categoryRef}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {LOAN_OPTIONS.map((option) => (
              <LoanOptionCard key={option.id} option={option} />
            ))}
          </motion.div>
        </div>
      </div>
    );
  };
  
  // Card de opção de empréstimo
  const LoanOptionCard = ({ option }: { option: LoanOption }) => {
    const cardRef = useRef<HTMLDivElement>(null);
  
    return (
      <motion.div
        ref={cardRef}
        variants={fadeInUp}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="h-full"
      >
        <Link href={option.url} className="block h-full">
          <Card
            className={`group h-full overflow-hidden border border-gray-200/50 ${
              option.highlighted
                ? "shadow-md hover:shadow-xl"
                : "shadow-sm hover:shadow-lg"
            } transition-all duration-300 relative cursor-pointer`}
          >
            {/* Card header with gradient background on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(
                option.color,
                "gradient"
              )} opacity-0 group-hover:opacity-95 transition-opacity duration-300 z-10`}
            />
  
            {/* Not available overlay */}
            {!option.available && (
              <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-white p-6 text-center">
                <Clock className="h-10 w-10 mb-3 text-gray-300" />
                <p className="text-xl font-bold mb-2">Em Breve</p>
                <p className="text-sm text-gray-300">
                  Este produto estará disponível em breve. Aguarde novidades!
                </p>
              </div>
            )}
  
            {option.badge && (
              <div className="absolute top-0 right-0 z-20">
                <Badge
                  className={`m-3 py-1 px-3 ${getColorClasses(
                    option.color,
                    "bg"
                  )} ${getColorClasses(option.color, "text")} group-hover:bg-white`}
                >
                  {option.badge}
                </Badge>
              </div>
            )}
  
            <CardHeader className="relative z-20">
              <div
                className={`w-14 h-14 rounded-full ${getColorClasses(
                  option.color,
                  "bg"
                )} ${getColorClasses(
                  option.color,
                  "text"
                )} flex items-center justify-center mb-4 group-hover:bg-white/20 group-hover:text-white transition-colors duration-300`}
              >
                {option.icon}
              </div>
              <CardTitle className="text-xl text-gray-900 group-hover:text-white transition-colors duration-300">
                {option.title}
              </CardTitle>
              <CardDescription className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                {option.description}
              </CardDescription>
            </CardHeader>
  
            <CardFooter className="relative z-20 pt-0">
              <div className="flex items-center text-sm font-medium text-gray-600 group-hover:text-white transition-colors duration-300">
                <span>Conhecer Detalhes</span>
                <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </CardFooter>
          </Card>
        </Link>
      </motion.div>
    );
  };
  
  // CTA Final
  const FinalCTA = () => (
    <div className="py-20 bg-gradient-to-br from-violet-700 via-indigo-600 to-purple-800 text-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-indigo-400 opacity-10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 bg-white/20 text-white backdrop-blur-sm py-1.5 px-4 rounded-full">
              Desbloqueie seu Crédito
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Não Encontrou o que Precisava?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Nossa equipe de especialistas está pronta para te ajudar a encontrar a melhor
              solução financeira para o seu momento. Fale conosco e descubra todas as opções disponíveis.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/simulador" passHref>
              <Button
                size="lg"
                className="bg-white text-indigo-700 hover:bg-gray-100 rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                Ver Todas as Opções
              </Button>
              </Link>
              <Link href="https://wa.me/552130300606?text=Olá,%20gostaria%20de%20falar%20com%20um%20consultor" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full px-8 py-6 text-lg flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group animate-pulse animate-duration-[3000ms]"
              >
                <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                <WhatsAppIcon className="h-5 w-5 text-white relative z-10" /> 
                <span className="relative z-10">Falar com Consultor</span>
              </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
  
  // Componente Principal
  export default function EmprestimosPage() {
    return (
      <section className="min-h-screen bg-white font-sans">
        <HeroSection />
        <LoanOptionsSection />
        <FinalCTA />
      </section>
    );
  }