"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  Home,
  Info,
  DollarSign,
  PhoneCall,
  BookOpen,
  Calculator,
  ChevronRight,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

// Tipagem para o NavLink
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  badge?: string;
}

function NavLink({
  href,
  children,
  className,
  icon,
  onClick,
  badge,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || 
                  (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2 text-sm font-medium transition-all duration-300 relative px-4 py-2.5 rounded-md",
        isActive 
          ? "text-orange-600 bg-orange-50" 
          : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/50",
        className
      )}
    >
      {icon && (
        <span className={cn(
          "transition-all duration-300 flex-shrink-0",
          isActive ? "text-orange-500" : "text-gray-400 group-hover:text-orange-400"
        )}>
          {icon}
        </span>
      )}
      <span className="tracking-wide whitespace-nowrap">{children}</span>
      
      {badge && (
        <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold uppercase bg-orange-100 text-orange-600 rounded-full">
          {badge}
        </span>
      )}
      
      {isActive && (
        <motion.span
          layoutId="activeIndicator"
          className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
}

function LoanCard({ 
  name, 
  href, 
  description, 
  icon, 
  isPopular 
}: { 
  name: string;
  href: string;
  description: string;
  icon: React.ReactNode;
  isPopular?: boolean;
}) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="flex h-full select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-300 hover:bg-orange-50 hover:shadow-sm group relative overflow-hidden"
      >
        {isPopular && (
          <div className="absolute top-0 right-0 z-10">
            <div className="inline-block bg-orange-500 text-white text-xs font-semibold px-4 py-1 rounded-tr-md rounded-bl-md border border-orange-600">
              POPULAR
            </div>
          </div>
        )}
        
        <div className="flex gap-3">
          <div className="mt-0.5 p-2 bg-orange-100/60 rounded-lg group-hover:bg-orange-100 transition-colors duration-300">
            {icon}
          </div>
          
          <div className="flex flex-col">
            <div className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
              {name}
            </div>
            <p className="line-clamp-2 text-xs leading-relaxed text-gray-500 mt-1 group-hover:text-gray-600">
              {description}
            </p>
          </div>
          
          <div className="ml-auto flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ChevronRight size={14} className="text-orange-500" />
          </div>
        </div>
      </Link>
    </NavigationMenuLink>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Fecha o menu mobile quando muda de página
    setIsOpen(false);
  }, [pathname]);

  const emprestimoOptions = [
    {
      name: "Empréstimo na Conta de Luz",
      href: "/emprestimo-conta-luz",
      description: "Até R$ 3.300 sem consulta ao SPC/Serasa",
      icon: <Lightbulb size={18} className="text-amber-500" />,
      isPopular: true,
    },
    {
      name: "Empréstimo FGTS",
      href: "/emprestimo-fgts",
      description: "Antecipe seu saque-aniversário com as melhores taxas",
      icon: <DollarSign size={18} className="text-blue-500" />,
      isPopular: false,
    },
  ];

  return (
    <header
      ref={navRef}
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-lg py-3 border-b border-gray-100"
          : "bg-white/95 backdrop-blur-sm py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo com tagline */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center">
              <div className="relative overflow-hidden">
                <Image
                  src="/logo.svg"
                  alt="Credios"
                  width={130}
                  height={45}
                  className="object-contain h-9 sm:h-10"
                  priority
                />
              </div>
              {/* Tagline - remova se não quiser */}
              <div className="hidden sm:flex flex-col ml-2 border-l border-gray-200 pl-2">
                <span className="text-xs text-gray-500 font-medium">Soluções financeiras</span>
                <span className="text-xs text-orange-500 font-semibold">para sua vida</span>
              </div>
            </Link>
          </motion.div>

          {/* Navegação desktop com menu dropdown */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1 bg-gray-50/80 p-1.5 rounded-xl shadow-sm">
              <NavigationMenuItem>
                <NavLink href="/" icon={<Home size={16} />}>
                  Home
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink href="/sobre" icon={<Info size={16} />}>
                  Sobre
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-all duration-300 px-4 py-2.5 rounded-md data-[state=open]:bg-orange-50",
                    pathname.startsWith("/emprestimo")
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/50"
                  )}
                >
                  <DollarSign 
                    size={16} 
                    className={cn(
                      "transition-all duration-300",
                      pathname.startsWith("/emprestimo") 
                        ? "text-orange-500" 
                        : "text-gray-400 group-hover:text-orange-400"
                    )} 
                  />
                  <span className="tracking-wide">Empréstimos</span>
                </NavigationMenuTrigger>
                
                <NavigationMenuContent>
                  <div className="w-[450px] p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="mb-3 px-2">
                      <h4 className="text-sm font-semibold text-gray-800">Soluções de crédito</h4>
                      <p className="text-xs text-gray-500">Empréstimos para o seu momento</p>
                    </div>
                    
                    <ul className="grid gap-2">
                      {emprestimoOptions.map((item) => (
                        <li key={item.name}>
                          <LoanCard 
                            name={item.name} 
                            href={item.href} 
                            description={item.description}
                            icon={item.icon}
                            isPopular={item.isPopular}
                          />
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs text-gray-400">Facilitamos seu acesso ao crédito</span>
                      <Link
                        href="/emprestimos"
                        className="flex items-center gap-1 text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors px-2 group"
                      >
                        <span>Ver todas as opções</span>
                        <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink href="/contato" icon={<PhoneCall size={16} />}>
                  Contato
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink href="/blog" icon={<BookOpen size={16} />}>
                  Blog
                </NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Botão de CTA (Simular) para desktop */}
          <div className="hidden md:block">
            <Button
              asChild
              variant="default"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-6 py-6 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-orange-100"
            >
              <Link href="/simulador" className="flex items-center gap-2 group">
                <Calculator size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                <span className="tracking-wide">Simular Agora</span>
              </Link>
            </Button>
          </div>

          {/* Container para CTA mobile e botão do menu */}
          <div className="flex items-center gap-3 md:hidden">
            {/* CTA Fixo para Mobile */}
            <Button
              asChild
              variant="default"
              size="sm"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 rounded-lg font-medium transition-all shadow-sm py-5 px-4"
            >
              <Link href="/simulador" className="flex items-center gap-1.5">
                <Calculator size={15} />
                <span className="text-xs font-semibold">Simular</span>
              </Link>
            </Button>

            {/* Botão do menu mobile */}
            <motion.button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/90 shadow-sm"
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X className="h-5 w-5 text-orange-600" />
                  ) : (
                    <Menu className="h-5 w-5 text-gray-700" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Menu mobile com animação */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white shadow-xl rounded-b-2xl overflow-hidden border-t border-gray-100"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.nav
              className="px-4 pt-4 pb-6 space-y-3.5"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.07 } },
                hidden: {},
              }}
            >
              {/* Links primários em botões maiores */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <motion.div
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 10 },
                  }}
                >
                  <Link 
                    href="/" 
                    onClick={toggleMenu}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-xl transition-all hover:bg-orange-50 border border-gray-100 shadow-sm",
                      pathname === "/" ? "bg-orange-50 border-orange-100" : "bg-white"
                    )}
                  >
                    <Home size={22} className={pathname === "/" ? "text-orange-500" : "text-gray-400"} />
                    <span className={cn(
                      "text-sm font-medium mt-1.5",
                      pathname === "/" ? "text-orange-600" : "text-gray-700"
                    )}>Início</span>
                  </Link>
                </motion.div>
                
                <motion.div
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 10 },
                  }}
                >
                  <Link 
                    href="/simulador" 
                    onClick={toggleMenu}
                    className="flex flex-col items-center justify-center p-4 rounded-xl transition-all bg-gradient-to-br from-orange-500 to-orange-600 text-white border border-orange-400 shadow-md"
                  >
                    <Calculator size={22} className="text-white" />
                    <span className="text-sm font-medium mt-1.5">Simular</span>
                  </Link>
                </motion.div>
              </div>
              
              {/* Seção de empréstimos no mobile */}
              <motion.div
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 10 },
                }}
                className="mb-2"
              >
                <div className="mb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 px-2 py-2">
                      <DollarSign size={16} className="text-orange-500" />
                      <span className="tracking-wide">Empréstimos</span>
                    </div>
                    <Link
                      href="/emprestimos"
                      onClick={toggleMenu}
                      className="inline-flex items-center whitespace-nowrap text-xs font-medium text-orange-500 px-2 gap-1"
                    >
                      <span>Ver todos</span>
                      <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl border border-gray-100 shadow-inner overflow-hidden">
                  {emprestimoOptions.map((item, index, arr) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={toggleMenu}
                      className={cn(
                        "flex items-start gap-3 py-3.5 px-4 hover:bg-white transition-colors relative",
                        index !== arr.length - 1 && "border-b border-gray-100"
                      )}
                    >
                      {item.isPopular && (
                        <div className="absolute -top-2.5 right-3">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md transform rotate-2">
                            POPULAR
                          </div>
                        </div>
                      )}
                      <div className="p-2 bg-orange-100/60 rounded-lg mt-0.5 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex flex-col flex-grow min-w-0">
                        <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{item.name}</span>
                        <span className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.description}</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 self-center flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Links de navegação regulares */}
              {[
                { href: "/sobre", label: "Sobre Nós", icon: <Info size={18} /> },
                { href: "/contato", label: "Contato", icon: <PhoneCall size={18} /> },
                { href: "/blog", label: "Blog", icon: <BookOpen size={18} /> },
              ].map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    visible: { opacity: 1, x: 0 },
                    hidden: { opacity: 0, x: -20 },
                  }}
                >
                  <NavLink
                    href={item.href}
                    icon={item.icon}
                    onClick={toggleMenu}
                    className="rounded-xl hover:bg-orange-50 w-full flex items-center justify-between py-3.5"
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && <span>{item.icon}</span>}
                      <span>{item.label}</span>
                    </span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}