import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crédito Rápido com Conta de Luz | Empréstimo Facilitado | Credios',
  description: 'Obtenha crédito de forma rápida e simples usando apenas sua conta de luz. Aprovação expressa, sem consulta ao SPC/Serasa e com valores personalizados.',
  alternates: {
    canonical: 'https://www.credios.com.br/landingluz001',
  },
}

export default function LandingLuz001Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}