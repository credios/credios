// app/blog/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, TrendingUp, Clock, CalendarDays } from 'lucide-react';

import { getAllPosts, getFeaturedPosts, getAllCategories, urlFor } from '@/lib/blog/api';
import { formatDate, getSlugString } from '@/lib/blog/utils';

export const metadata: Metadata = {
  title: 'Blog | Credios',
  description: 'Explore nossos artigos e tutoriais sobre finanças, empréstimos e investimentos',
};

export const revalidate = 3600; // Revalidar a cada hora

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  // Buscar dados do Sanity
  const [posts, featuredPosts, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getAllCategories(),
  ]);

  const currentCategory = searchParams?.category || '';

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl overflow-hidden mb-16">
        <div className="relative pt-16 pb-20 px-6 sm:px-12 md:px-16 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Blog Credios
          </h1>
          <p className="text-xl font-medium text-muted-foreground max-w-2xl mx-auto mb-10">
            Insights, tutoriais e tendências sobre finanças, empréstimos e investimentos
          </p>
          <div className="max-w-md mx-auto relative">
            <div className="flex items-center overflow-hidden rounded-full bg-background border border-input shadow-sm transition-all">
              <Search className="absolute left-4 text-muted-foreground" size={18} />
              <Input 
                placeholder="Buscar artigos..." 
                className="pl-12 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center">
              <TrendingUp className="mr-2 text-primary" size={22} />
              <span>Artigos em Destaque</span>
            </h2>
            <Link href="/blog/featured" className="text-primary font-medium hover:underline flex items-center">
              Ver todos
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPosts.slice(0, 3).map((post) => (
              <Card key={post._id} className="overflow-hidden rounded-2xl border border-border/60 shadow-md hover:shadow-lg transition-all">
                <div className="relative aspect-[16/9] w-full">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).height(340).url()}
                      alt={post.title || 'Imagem do post'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Sem imagem</span>
                    </div>
                  )}
                  {post.categories && post.categories[0] && (
                    <Badge className="absolute top-4 left-4 bg-primary hover:bg-primary text-white shadow-sm">
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
                    className="text-primary font-medium hover:underline flex items-center"
                  >
                    Ler artigo
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Category Filters */}
      <div className="overflow-x-auto mb-12">
        <div className="flex gap-3 py-2">
          <Link href="/blog">
            <Badge 
              variant={!currentCategory ? "default" : "outline"} 
              className="px-4 py-2 text-sm rounded-full hover:bg-primary/90 transition-colors"
            >
              Todos
            </Badge>
          </Link>
          {categories.map(category => (
            <Link key={category._id} href={`/blog/category/${getSlugString(category.slug)}`}>
              <Badge 
                variant={currentCategory === getSlugString(category.slug) ? "default" : "outline"} 
                className="px-4 py-2 text-sm rounded-full hover:bg-primary/90 transition-colors"
              >
                {category.title}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Latest Articles */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center">
            <Clock className="mr-2 text-primary" size={22} />
            <span>Últimos Artigos</span>
          </h2>
          <Link href="/blog/archive" className="text-primary font-medium hover:underline flex items-center">
            Ver arquivo
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.slice(0, 6).map((post, index) => (
            <Card 
              key={post._id} 
              className={`overflow-hidden rounded-2xl border border-border/60 shadow-md hover:shadow-lg transition-all ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className={`grid ${index === 0 ? 'md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
                <div className={`relative ${index === 0 ? 'aspect-[4/3] md:aspect-auto' : 'aspect-[16/9]'} w-full`}>
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(800).height(450).url()}
                      alt={post.title || 'Imagem do post'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Sem imagem</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
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
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      {post.author && (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
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
                      className="flex items-center text-primary font-medium"
                    >
                      Continuar lendo
                      <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg" className="font-medium">
            Carregar mais artigos
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 sm:p-10 md:p-12 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-primary">Receba nossas atualizações</h3>
          <p className="text-muted-foreground mb-8">
            Fique por dentro das últimas tendências e novidades do mercado financeiro.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input 
              placeholder="Seu melhor email" 
              className="h-12 rounded-full px-5"
            />
            <Button className="h-12 px-6 rounded-full font-medium">
              Inscrever-se
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}