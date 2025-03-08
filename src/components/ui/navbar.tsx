"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

// Tipagem para o NavLink
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

function NavLink({
  href,
  children,
  className,
  icon,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-1.5 text-sm font-medium transition-all duration-300 relative px-4 py-2.5 rounded-md",
        isActive 
          ? "text-orange-600 bg-orange-50/70" 
          : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/50",
        className
      )}
    >
      {icon && (
        <span className={cn(
          "transition-all duration-300",
          isActive ? "text-orange-500" : "text-gray-400 group-hover:text-orange-400"
        )}>
          {icon}
        </span>
      )}
      <span className="tracking-wide">{children}</span>
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

function LoanCard({ name, href, description }: { 
  name: string;
  href: string;
  description: string;
}) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="flex flex-col h-full select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-300 hover:bg-orange-50 hover:shadow-sm group"
      >
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
            {name}
          </div>
          <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-gray-500 mt-1 group-hover:text-gray-600">
          {description}
        </p>
      </Link>
    </NavigationMenuLink>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fecha o menu mobile quando muda de página
    setIsOpen(false);
  }, [pathname]);

  const emprestimoOptions = [
    {
      name: "Empréstimo Pessoal",
      href: "/emprestimos/pessoal",
      description: "Crédito rápido para suas necessidades pessoais",
    },
    {
      name: "Empréstimo Consignado",
      href: "/emprestimos/consignado",
      description: "Taxas reduzidas com desconto em folha",
    },
    {
      name: "Financiamento Imobiliário",
      href: "/emprestimos/imobiliario",
      description: "Realize o sonho da casa própria",
    },
    {
      name: "Antecipação de FGTS",
      href: "/emprestimos/fgts",
      description: "Antecipe seu saque-aniversário do FGTS",
    },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
          : "bg-white/80 backdrop-blur-sm py-4"
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
                  className="object-contain h-10"
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

          {/* Navegação desktop com menu dropdown - redesenhado */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1 bg-gray-50/80 p-1.5 rounded-xl shadow-sm">
              <NavigationMenuItem>
                <NavLink href="/" icon={<Home size={16} />}>
                  Início
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
                    "flex items-center gap-1.5 text-sm font-medium transition-all duration-300 px-4 py-2.5 rounded-md data-[state=open]:bg-orange-50/70",
                    pathname.startsWith("/emprestimos")
                      ? "text-orange-600 bg-orange-50/70"
                      : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/50"
                  )}
                >
                  <DollarSign 
                    size={16} 
                    className={cn(
                      "transition-all duration-300",
                      pathname.startsWith("/emprestimos") 
                        ? "text-orange-500" 
                        : "text-gray-400 group-hover:text-orange-400"
                    )} 
                  />
                  <span className="tracking-wide">Empréstimos</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="mb-3 px-2">
                      <h4 className="text-sm font-semibold text-gray-800">Nossas soluções de crédito</h4>
                      <p className="text-xs text-gray-500">Encontre a opção ideal para o seu momento</p>
                    </div>
                    <ul className="grid gap-2 md:grid-cols-2">
                      {emprestimoOptions.map((item) => (
                        <li key={item.name}>
                          <LoanCard 
                            name={item.name} 
                            href={item.href} 
                            description={item.description} 
                          />
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <Link
                        href="/emprestimos"
                        className="flex items-center justify-between w-full text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors px-2"
                      >
                        <span>Ver todas as opções de crédito</span>
                        <ArrowRight size={14} />
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

          {/* Botão de CTA (Simular) para desktop - redesenhado */}
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

          {/* Botão do menu mobile - redesenhado */}
          <div className="md:hidden">
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

      {/* Menu mobile com animação - redesenhado */}
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
              className="px-4 pt-4 pb-6 space-y-2"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.07 } },
                hidden: {},
              }}
            >
              {[
                { href: "/", label: "Início", icon: <Home size={16} /> },
                { href: "/sobre", label: "Sobre", icon: <Info size={16} /> },
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
                    className="rounded-xl hover:bg-orange-50 w-full flex py-3"
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              
              {/* Seção de empréstimos no mobile */}
              <motion.div
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: -20 },
                }}
              >
                <div className="mt-2 mb-1 px-2">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700 py-2">
                    <DollarSign size={16} className="text-orange-500" />
                    <span className="tracking-wide">Empréstimos</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-2 ml-2 border border-gray-100">
                  {emprestimoOptions.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={toggleMenu}
                      className="flex flex-col py-2 px-3 rounded-lg hover:bg-white transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-800">{item.name}</span>
                      <span className="text-xs text-gray-500">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
              
              {[
                { href: "/contato", label: "Contato", icon: <PhoneCall size={16} /> },
                { href: "/blog", label: "Blog", icon: <BookOpen size={16} /> },
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
                    className="rounded-xl hover:bg-orange-50 w-full flex py-3"
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: -20 },
                }}
                className="pt-4"
              >
                <Button
                  asChild
                  variant="default"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-4 py-6 rounded-xl font-medium transition-all shadow-md"
                  onClick={toggleMenu}
                >
                  <Link
                    href="/simulador"
                    className="flex items-center justify-center gap-2"
                  >
                    <Calculator size={16} />
                    <span className="tracking-wide">Simular Agora</span>
                  </Link>
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}