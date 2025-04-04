import { Metadata } from 'next';
import PoliticaDePrivacidade from "@/components/politicadeprivacidade";

export const metadata: Metadata = {
  title: 'Política de Privacidade | Credios',
  description: 'Conheça nossa política de privacidade e saiba como a Credios protege e utiliza seus dados pessoais em conformidade com a LGPD',
  alternates: {
    canonical: 'https://www.credios.com.br/politica-de-privacidade',
  },
}

export default function PoliticaDePrivacidadePage() {
  return (
    <PoliticaDePrivacidade />
  );
}