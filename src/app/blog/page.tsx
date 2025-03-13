// app/blog/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  CalendarDays
} from 'lucide-react';

import { getAllPosts, getFeaturedPosts, getAllCategories, urlFor } from '@/lib/blog/api';
import { formatDate, getSlugString } from '@/lib/blog/utils';

// Importação do componente de cliente
import BlogHeroSection from '@/components/blog/hero-section';
import AnimatedCard from '@/components/blog/animated-card';
import AnimatedBadge from '@/components/blog/animated-badge';
import NewsletterSection from '@/components/blog/newsletter-section';
import PromoBanner from '@/components/blog/promo-banner';
import FaqSection from '@/components/blog/faq-section';

export const metadata: Metadata = {
  title: 'Blog Credios | Dicas de Finanças e Empréstimos',
  description: 'Explore nossos artigos sobre finanças pessoais, dicas para empréstimos e como melhorar sua vida financeira',
};

export const revalidate = 3600; // Revalidar a cada hora

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;
  const currentCategory = category || '';

  // Buscar dados do Sanity
  const [posts, featuredPosts, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getAllCategories(),
  ]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Hero Section com Visual Aprimorado */}
      <BlogHeroSection />
      
      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center">
              <TrendingUp className="mr-2 text-primary" size={22} />
              <span>Artigos em Destaque</span>
            </h2>
            <Link href="/blog/featured" className="text-primary font-medium hover:underline flex items-center group">
              Ver todos
              <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredPosts.slice(0, 3).map((post, index) => (
              <AnimatedCard key={post._id} index={index}>
                <Card className="h-full overflow-hidden rounded-2xl border border-border/60 shadow-md hover:shadow-xl transition-all duration-300 group">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(340).url()}
                        alt={post.title || 'Imagem do post'}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">Sem imagem</span>
                      </div>
                    )}
                    {post.categories && post.categories[0] && (
                      <Badge className="absolute top-4 left-4 bg-primary hover:bg-primary text-white shadow-sm font-medium px-3 py-1">
                        {post.categories[0].title}
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="py-6">
                    <Link href={`/blog/${getSlugString(post.slug)}`} className="hover:text-primary transition-colors">
                      <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
                    </Link>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="pt-0 pb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays size={14} />
                      <time dateTime={post.publishedAt || ''}>{post.publishedAt ? formatDate(post.publishedAt) : 'Sem data'}</time>
                    </div>
                    <Link 
                      href={`/blog/${getSlugString(post.slug)}`} 
                      className="text-primary font-medium hover:underline flex items-center group"
                    >
                      Ler artigo
                      <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardFooter>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      )}
      
      {/* Category Filters - Design Melhorado */}
      <div className="mb-12">
        <div className="py-2 flex justify-center sm:justify-start">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
            <Link href="/blog">
              <Badge 
                variant={!currentCategory ? "default" : "outline"} 
                className="px-4 py-2 text-sm rounded-full hover:bg-primary/90 transition-colors"
              >
                Todos
              </Badge>
            </Link>
            {categories.map((category, idx) => (
              <AnimatedBadge key={category._id} index={idx}>
                <Link href={`/blog/category/${getSlugString(category.slug)}`}>
                  <Badge 
                    variant={currentCategory === getSlugString(category.slug) ? "default" : "outline"} 
                    className="px-4 py-2 text-sm rounded-full hover:bg-primary/90 transition-colors"
                  >
                    {category.title}
                  </Badge>
                </Link>
              </AnimatedBadge>
            ))}
          </div>
        </div>
      </div>
      
      {/* Separador Visual */}
      <div className="relative h-0.5 max-w-md mx-auto mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
      
      {/* Latest Articles - Layout Melhorado */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center">
            <Clock className="mr-2 text-primary" size={22} />
            <span>Últimos Artigos</span>
          </h2>
          <Link href="/blog/archive" className="text-primary font-medium hover:underline flex items-center group">
            Ver arquivo
            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Layout Responsivo Aprimorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {posts.slice(0, 6).map((post, index) => (
            <AnimatedCard key={post._id} index={index} className={index === 0 ? 'md:col-span-2' : ''}>
              <Card 
                className={`h-full overflow-hidden rounded-2xl border border-border/60 shadow-md hover:shadow-lg transition-all group`}
              >
                <div className={`grid ${index === 0 ? 'md:grid-cols-2' : 'grid-cols-1'} gap-0`}>
                  <div className={`relative ${index === 0 ? 'aspect-[4/3] md:aspect-auto' : 'aspect-[16/9]'} w-full overflow-hidden`}>
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(800).height(450).url()}
                        alt={post.title || 'Imagem do post'}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">Sem imagem</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col h-full">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories?.map((category) => (
                        <Link key={category._id} href={`/blog/category/${getSlugString(category.slug)}`}>
                          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            {category.title}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                    <Link href={`/blog/${getSlugString(post.slug)}`} className="group">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/40">
                      <div className="flex items-center gap-3">
                        {post.author && (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7 border border-primary/10">
                              {post.author.image ? (
                                <AvatarImage 
                                  src={urlFor(post.author.image).width(100).height(100).url()} 
                                  alt={post.author.name || 'Autor'} 
                                />
                              ) : (
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {post.author.name ? post.author.name.charAt(0) : 'A'}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <span className="text-sm font-medium">{post.author.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <Link 
                        href={`/blog/${getSlugString(post.slug)}`} 
                        className="flex items-center text-primary font-medium group"
                      >
                        Continuar lendo
                        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedCard>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="font-medium rounded-full px-8 border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
          >
            Carregar mais artigos
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
      
      {/* Newsletter Section - Design Melhorado */}
      <NewsletterSection />
      
      {/* Banner CTA novo produto */}
      <PromoBanner />
      
      {/* Seção Perguntas Frequentes */}
      <FaqSection />
    </div>
  );
}