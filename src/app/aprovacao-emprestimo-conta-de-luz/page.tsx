// app/aprovacao-emprestimo-conta-de-luz/page.tsx
'use client';

import dynamic from 'next/dynamic';

// Importar o componente de forma dinâmica para evitar erros com useSearchParams
const FormularioLuz = dynamic(() => import('@/components/formularioluz'), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Carregando formulário...</h2>
        <p className="text-gray-500 mt-2">Aguarde um momento enquanto preparamos tudo para você</p>
      </div>
    </div>
  )
});

export default function AprovacaoEmprestimoPage() {
  return (
    <main>
      <FormularioLuz />
    </main>
  );
}