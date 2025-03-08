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
  // Se quiser usar o estilo do shadcn:
  navigationMenuTriggerStyle,
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
        "group flex items-center gap-1.5 text-base font-medium transition-all duration-300 relative px-3 py-2",
        isActive ? "text-orange-600" : "text-gray-700 hover:text-orange-500",
        className
      )}
    >
      {icon && <span className="opacity-80 group-hover:opacity-100">{icon}</span>}
      <span>{children}</span>
      {isActive && (
        <motion.span
          layoutId="activeIndicator"
          className="absolute bottom-0 left-0 h-0.5 w-full bg-orange-500 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
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
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-white/70 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
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
            </Link>
          </motion.div>

          {/* Navegação desktop com menu dropdown */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavLink href="/" icon={<Home size={18} />}>
                  Início
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink href="/sobre" icon={<Info size={18} />}>
                  Sobre
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                {/* Exemplo de uso do style do shadcn (opcional) */}
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(), // <--- Usando aqui
                    "flex items-center gap-1",
                    pathname.startsWith("/emprestimos")
                      ? "text-orange-600"
                      : "text-gray-700"
                  )}
                >
                  <DollarSign size={18} className="opacity-80" />
                  <span>Empréstimos</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2">
                    {emprestimoOptions.map((item) => (
                      <li key={item.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-600"
                          >
                            <div className="text-sm font-medium">
                              {item.name}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink href="/contato" icon={<PhoneCall size={18} />}>
                  Contato
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink href="/blog" icon={<BookOpen size={18} />}>
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
              className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <Link href="/simulador" className="flex items-center gap-2">
                <Calculator size={18} />
                <span>Simular Agora</span>
              </Link>
            </Button>
          </div>

          {/* Botão do menu mobile */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="p-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              whileTap={{ scale: 0.9 }}
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
                    <X className="h-6 w-6 text-orange-500" />
                  ) : (
                    <Menu className="h-6 w-6" />
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
            className="md:hidden bg-white shadow-lg rounded-b-xl overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.nav
              className="px-4 pt-2 pb-6 space-y-2"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.07 } },
                hidden: {},
              }}
            >
              {[
                { href: "/", label: "Início", icon: <Home size={18} /> },
                { href: "/sobre", label: "Sobre", icon: <Info size={18} /> },
                {
                  href: "/emprestimos",
                  label: "Empréstimos",
                  icon: <DollarSign size={18} />,
                },
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
                    className="rounded-lg hover:bg-orange-50 w-full flex"
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
                  className="w-full bg-orange-500 text-white hover:bg-orange-600 px-4 py-6 rounded-lg font-medium transition-all"
                  onClick={toggleMenu}
                >
                  <Link
                    href="/simulador"
                    className="flex items-center justify-center gap-2"
                  >
                    <Calculator size={18} />
                    <span>Simular Agora</span>
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
