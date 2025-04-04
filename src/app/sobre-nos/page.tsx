import { Metadata } from 'next';
import SobreCredios from "@/components/about";

export const metadata: Metadata = {
  title: 'Sobre Nós | Credios',
  description: 'Conheça mais sobre a Credios e nossa história de crédito rápido e fácil',
  alternates: {
    canonical: 'https://www.credios.com.br/sobre-nos',
  },
}

export default function SobreNos() {
  return (
    <SobreCredios />
  );
}