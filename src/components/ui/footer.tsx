// src/app/components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-50 text-gray-700 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Linha superior do footer */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          {/* Logo e mini-descrição */}
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <Image
                src="/credios-logo.png"
                alt="Credios"
                width={120}
                height={40}
              />
            </Link>
            <p className="mt-2 text-sm max-w-xs">
              A Credios Serviços Ltda (“CREDIOS”) é uma fintech de acesso a 
              empréstimo consignado, pessoal e outras modalidades. ...
            </p>
          </div>

          {/* Contatos / Social */}
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h4 className="font-semibold mb-2">Contatos:</h4>
              <p className="text-sm">WhatsApp: (xx) 4002-8922</p>
              <p className="text-sm">contato@credios.com.br</p>
              <p className="text-sm">Horário de Funcionamento: Seg a Sex, 08:00 às 18:00</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Links:</h4>
              <ul className="space-y-1">
                <li>
                  <Link href="/sobre">Sobre Nós</Link>
                </li>
                <li>
                  <Link href="/emprestimos">Empréstimos</Link>
                </li>
                <li>
                  <Link href="/contato">Contato</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/simulador">Simulador</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer / Política */}
        <div className="text-sm text-gray-600 border-t border-gray-200 pt-4">
          <p className="mb-2">
            A Credios tem o compromisso de total transparência com nossos clientes...
          </p>
          <p className="mb-2">
            <Link href="/politica-de-privacidade" className="underline">
              Política de Privacidade
            </Link>{" "}
            |{" "}
            <Link href="/termos-de-uso" className="underline">
              Termos de Uso
            </Link>
          </p>
          <p className="text-xs text-gray-500">
            © 2025 Credios. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
