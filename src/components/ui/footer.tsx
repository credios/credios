"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Importando ícones de redes sociais do Lucide React
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  LucideIcon,
} from "lucide-react";

// Definindo interfaces
interface IconProps {
  className?: string;
  size?: number;
}

interface SocialIconProps {
  href: string;
  icon: LucideIcon | React.FC<IconProps>;
  label: string;
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

interface NavLink {
  href: string;
  label: string;
}

interface SocialLink {
  href: string;
  icon: LucideIcon | React.FC<IconProps>;
  label: string;
}

// Componente personalizado para TikTok (não disponível no Lucide)
const TikTokIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Componente de ícone de rede social
const SocialIcon: React.FC<SocialIconProps> = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-white hover:text-white/90 transition-all duration-300 hover:scale-110"
  >
    <Icon size={20} />
  </a>
);

// Componente unificado para links do footer
const FooterLink: React.FC<FooterLinkProps> = ({ href, children, active }) => {
  const pathname = usePathname();
  const isActive = active !== undefined ? active : pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-white hover:text-white/80 transition-colors duration-200",
        isActive && "font-medium"
      )}
    >
      {children}
    </Link>
  );
};

// Componente de link de política (para os links na parte inferior)
const PolicyLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <Link
    href={href}
    className="text-white/90 hover:text-white underline transition-colors duration-200"
  >
    {children}
  </Link>
);

const Footer: React.FC = () => {
  // Links de navegação que aparecem no footer
  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/sobre-nos", label: "Sobre Nós" },
    { href: "/emprestimo-fgts", label: "Empréstimo FGTS" },
    { href: "/emprestimo-na-conta-de-luz", label: "Empréstimo na Conta de Luz" },
    { href: "/emprestimo-por-cartao-de-credito", label: "Empréstimo por Cartão de Crédito" },
    { href: "/contato", label: "Contato" },
    { href: "/blog", label: "Blog" },
    { href: "/simulador", label: "Simulador" },
  ];

  // Ícones de redes sociais
  const socialLinks: SocialLink[] = [
    { href: "https://facebook.com/credios", icon: Facebook, label: "Facebook" },
    { href: "https://instagram.com/credios", icon: Instagram, label: "Instagram" },
    { href: "https://tiktok.com/@credios", icon: TikTokIcon, label: "TikTok" },
    { href: "https://linkedin.com/company/credios", icon: Linkedin, label: "LinkedIn" },
    { href: "https://youtube.com/c/credios", icon: Youtube, label: "YouTube" },
  ];

  // Textos legais
  const legalTexts = [
    "A Credios Serviços Ltda (\"CREDIOS\"), CNPJ 55.986.282/0001-30, sediada no Rio de Janeiro – RJ, é uma fintech de acesso a empréstimos consignados. Nossa atuação é pautada na Resolução nº 4.935, de 29 de julho de 2021, que disciplina a atuação de correspondentes no país. Atuamos por intermédio de diversas instituições financeiras.",
    "As taxas de juros e prazos praticados nos empréstimos observam as determinações de cada convênio, assim como a política da instituição financeira escolhida no ato da contratação. O prazo de pagamento pode variar de 01 mês a 120 meses. O custo efetivo pode variar de 1,29% a.m. (16,62% a.a.) a 5,13% a.m. (82,27% a.a.).",
    "A Credios tem o compromisso de total transparência com nossos clientes. Antes de iniciar o preenchimento de uma proposta, será exibido de forma clara: a taxa de juros utilizada, tarifas aplicáveis, impostos (IOF) e o custo efetivo total (CET). Nossa central de atendimento está disponível para esclarecimento de dúvidas sobre quaisquer dos valores apresentados."
  ];

  return (
    <footer className="bg-blue-600 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Coluna 1: Logo e descrição */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.svg"
                alt="Credios"
                width={140}
                height={50}
                className="object-contain"
              />
            </Link>
            
            <p className="text-white/90 text-sm mb-6">
              Facilitamos seu acesso a soluções financeiras de forma simples, 
              segura e transparente, sempre com as melhores condições do mercado.
            </p>
            
            {/* Redes sociais */}
            <div className="flex space-x-5 mt-4">
              {socialLinks.map((social) => (
                <SocialIcon
                  key={social.label}
                  href={social.href}
                  icon={social.icon}
                  label={social.label}
                />
              ))}
            </div>
          </div>

          {/* Coluna 2: Links de navegação */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">
              Navegação
            </h3>
            <nav className="grid grid-cols-1 gap-3">
              {navLinks.slice(0, 4).map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Coluna 3: Mais links e contato */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">
              Mais opções
            </h3>
            <nav className="grid grid-cols-1 gap-3 mb-6">
              {navLinks.slice(4).map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>

            <h3 className="text-lg font-bold mb-2 mt-6 border-b border-white/20 pb-2">
              Contatos
            </h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="font-medium mr-2">WhatsApp:</span>
                (21) 4042-2018
              </p>
              <p className="flex items-center">
                <span className="font-medium mr-2">E-mail:</span>
                contato@credios.com.br
              </p>
              <p className="flex items-center">
                <span className="font-medium mr-2">Horário:</span>
                Seg-Sex, 09:00-18:00
              </p>
            </div>
          </div>

          {/* Coluna 4: Informações legais e certificações */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">
              Certificações
            </h3>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-white/10 p-2 rounded">
                <Image
                  src="/ssl-secure.svg" // Adicione este ícone aos seus ativos
                  alt="SSL Secure"
                  width={60}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div className="bg-white/10 p-2 rounded">
                <Image
                  src="/pci-compliant.svg" // Adicione este ícone aos seus ativos
                  alt="PCI Compliant"
                  width={60}
                  height={30}
                  className="object-contain"
                />
              </div>
            </div>
            
            <p className="text-sm text-white/80 italic">
              CNPJ: 55.986.282/0001-30
              <br />
              Credios Serviços Ltda
              <br />
              Rio de Janeiro - RJ
            </p>
          </div>
        </div>

        {/* Informações legais */}
        <div className="mt-10 pt-6 border-t border-white/20 text-sm text-white/80 space-y-4">
          {legalTexts.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>

        {/* Rodapé do rodapé com direitos autorais e links políticas */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mt-8 pt-6 border-t border-white/20">
          <p className="text-sm">© 2025 Credios. Todos os direitos reservados.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <PolicyLink href="/politica-de-privacidade">
              Política de Privacidade
            </PolicyLink>
            <PolicyLink href="/termos-de-uso">
              Termos de Uso
            </PolicyLink>
            <PolicyLink href="/educacao-financeira">
              Educação Financeira
            </PolicyLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;