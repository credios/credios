import type { Metadata } from 'next';

// Cole seu objeto metadata aqui
export const metadata: Metadata = {
  title: "Crédito Para Condomínios | Financiamento com Aprovação Rápida | Credios",
  description: "Crédito para condomínios com aprovação em 48h e taxas a partir de 1,99% a.m. Financie energia solar, reformas e portaria remota. Sem garantias do síndico. Simule agora!",
  keywords: ["crédito para condomínios", "empréstimo para condomínios", /* ...outras keywords */],
  alternates: {
    canonical: 'https://www.credios.com.br/emprestimos/credito-para-condominios',
  },

};

export default function CreditoCondominiosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Você pode adicionar elementos de layout aqui se quiser (ex: um header/footer específico) */}
      {children} {/* O conteúdo da page.tsx será renderizado aqui */}
    </>
  );
}