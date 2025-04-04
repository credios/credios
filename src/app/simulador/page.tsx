import { Metadata } from 'next';
import Simulador from "@/components/simulador";

export const metadata: Metadata = {
  title: 'Simulador de Crédito | Credios',
  description: 'Simule seu empréstimo com a Credios e descubra as melhores condições para seu crédito rápido e fácil. Calcule valores, prazos e taxas sem compromisso',
  alternates: {
    canonical: 'https://www.credios.com.br/simulador',
  },
}

export default function SimuladorPage() {
  return (
    <Simulador />
  );
}