import { Metadata } from 'next';
import TermosDeUso from "@/components/termosdeuso";

export const metadata: Metadata = {
  title: 'Termos de Uso | Credios',
  description: 'Leia os termos de uso da Credios e conheça as condições e regras aplicáveis aos nossos serviços de crédito rápido e fácil',
  alternates: {
    canonical: 'https://www.credios.com.br/termos-de-uso',
  },
}

export default function TermosDeUsoPage() {
  return (
    <TermosDeUso />
  );
}