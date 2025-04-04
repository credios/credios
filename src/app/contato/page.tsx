import { Metadata } from 'next';
import Contato from "@/components/contato";

export const metadata: Metadata = {
  title: 'Entre em Contato | Credios',
  description: 'Entre em contato com a Credios para tirar dúvidas, solicitar informações ou iniciar seu processo de crédito rápido e fácil',
  alternates: {
    canonical: 'https://www.credios.com.br/contato',
  },
}

export default function ContatoPage() {
  return (
    <Contato />
  );
}