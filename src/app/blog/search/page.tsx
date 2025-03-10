// app/blog/search/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { PostGrid } from '@/components/blog/post-grid';
import { SearchForm } from '@/components/blog/search-form';
import { ChevronLeft } from 'lucide-react';
import { client } from '../../../sanity/lib/client';

// Interface ajustada para Next.js 15
interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = {
  title: 'Busca | Blog',
  description: 'Resultados da busca',
};

export const revalidate = 0; // Sem cache para resultados de busca

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const searchQuery = params.q || '';
  
  // Buscar posts que correspondem à consulta
  const searchPattern = `*${searchQuery}*`;
  const posts = searchQuery ? await client.fetch(
    `*[_type == "post" && (
      title match "${searchPattern}" || 
      excerpt match "${searchPattern}" || 
      pt::text(content) match "${searchPattern}"
    )] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      readingTime,
      categories[] -> {
        _id,
        title,
        slug
      },
      author -> {
        _id,
        name,
        image,
        slug
      }
    }`
  ) : [];

  return (
    <div className="container py-12">
      <Link 
        href="/blog" 
        className="flex items-center gap-1 text-muted-foreground mb-8 hover:text-primary transition-colors"
      >
        <ChevronLeft size={16} />
        <span>Voltar para o blog</span>
      </Link>
      
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-6">
          Resultados para “{searchQuery}”
        </h1>
        <SearchForm />
      </header>
      
      {posts.length > 0 ? (
        <PostGrid posts={posts} />
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">
            Nenhum resultado encontrado para “{searchQuery}”
          </p>
          <p className="text-muted-foreground">
            Tente buscar por termos diferentes ou navegue por todas as categorias.
          </p>
        </div>
      )}
    </div>
  );
}