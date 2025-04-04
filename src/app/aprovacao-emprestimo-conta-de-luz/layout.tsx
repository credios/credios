import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Empréstimo com Aprovação pela Conta de Luz | Credios',
  description: 'Empréstimo com aprovação simplificada utilizando sua conta de luz como comprovante. Processo rápido, sem burocracia e com mínima documentação necessária.',
  alternates: {
    canonical: 'https://www.credios.com.br/aprovacao-emprestimo-conta-de-luz',
  },
}

export default function EmprestimoContaLuzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}