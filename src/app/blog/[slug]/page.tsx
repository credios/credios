// app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@/lib/blog/portable-text';
import { PortableTextBlock } from '@portabletext/types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate, getSlugString } from '@/lib/blog/utils';
import { Calendar, Clock, ChevronLeft } from 'lucide-react';
import { getPostBySlug, urlFor } from '@/lib/blog/api';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';

// Tipo para a página com parâmetros
type PostPageParams = {
  slug: string;
};

// Interface para as props da página compatível com Next.js 15
interface PostPageProps {
  params: PostPageParams;
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt || '',
    openGraph: post.mainImage ? {
      images: [{ url: urlFor(post.mainImage).width(1200).height(630).url() }],
    } : undefined,
  };
}

export const revalidate = 3600;

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  // URL da imagem principal
  const mainImageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(675).url() : null;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 pb-20">
      {/* Breadcrumb with enhanced styling */}
      <div className="mb-8 max-w-4xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Voltar para o blog</span>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories?.map((category) => (
              <Link key={category._id} href={`/blog/category/${getSlugString(category.slug)}`}>
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  {category.title}
                </Badge>
              </Link>
            ))}
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            {post.title}
          </h1>
          
          {/* Post metadata */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
            {post.author && (
              <div className="flex items-center gap-3">
                <Avatar className="border-2 border-primary/10">
                  {post.author.image ? (
                    <AvatarImage 
                      src={urlFor(post.author.image).width(100).height(100).url()} 
                      alt={post.author.name} 
                    />
                  ) : null}
                  <AvatarFallback className="bg-primary/10 text-primary">{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground/70">Autor</div>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readingTime || 5} min de leitura</span>
              </div>
            </div>
          </div>
          
          {/* Featured Image with enhanced styling */}
          {mainImageUrl && (
            <div className="w-full aspect-[16/9] relative rounded-xl overflow-hidden border shadow-sm mb-10">
              <Image 
                src={mainImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
        
        {/* Post Content Container */}
        <div className="bg-card shadow-sm rounded-xl overflow-hidden border mb-12">
          {/* Social Sharing */}
          <div className="flex justify-end p-6 pb-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Compartilhar:</span>
              <div className="flex items-center gap-2">
                <Link 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://seusite.com/blog/${getSlugString(post.slug)}`)}&text=${encodeURIComponent(post.title)}`} 
                  target="_blank"
                  aria-label="Compartilhar no Twitter"
                  className={buttonVariants({ variant: "outline", size: "icon", className: "w-8 h-8 rounded-full" })}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                  </svg>
                </Link>
                <Link 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://seusite.com/blog/${getSlugString(post.slug)}`)}`} 
                  target="_blank"
                  aria-label="Compartilhar no Facebook"
                  className={buttonVariants({ variant: "outline", size: "icon", className: "w-8 h-8 rounded-full" })}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </Link>
                <Link 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://seusite.com/blog/${getSlugString(post.slug)}`)}`} 
                  target="_blank"
                  aria-label="Compartilhar no LinkedIn"
                  className={buttonVariants({ variant: "outline", size: "icon", className: "w-8 h-8 rounded-full" })}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <Separator className="mx-6 my-4" />
          
          {/* Excerpt as intro */}
          {post.excerpt && (
            <div className="px-6 pb-6">
              <blockquote className="border-l-4 border-primary pl-4 py-2 italic text-xl text-muted-foreground font-medium">
                {post.excerpt}
              </blockquote>
            </div>
          )}
          
          {/* Post Content with Enhanced Typography */}
          <div className="px-6 pb-10 prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-primary prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-muted prose-pre:border prose-figcaption:text-center prose-blockquote:border-l-primary">
            {post.content ? (
              <PortableText value={post.content as unknown as PortableTextBlock[]} />
            ) : (
              <p>Este post ainda não possui conteúdo.</p>
            )}
          </div>
        </div>
        
        {/* Tags and Author Section */}
        <div className="grid gap-8">
          {/* Related Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="h-4 w-1 bg-primary rounded-full mr-2"></span>
                Assuntos relacionados
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Link key={category._id} href={`/blog/category/${getSlugString(category.slug)}`}>
                    <Badge variant="outline" className="hover:bg-primary/10 transition-colors">
                      {category.title}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Author Card */}
          {post.author && (
            <div className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border mb-10">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Avatar className="h-16 w-16 border-2 border-primary/10">
                  {post.author.image ? (
                    <AvatarImage 
                      src={urlFor(post.author.image).width(100).height(100).url()} 
                      alt={post.author.name} 
                    />
                  ) : null}
                  <AvatarFallback className="bg-primary/10 text-xl text-primary">{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Sobre {post.author.name}</h3>
                  {post.author.bio ? (
                    <div className="mt-2 text-muted-foreground prose-sm">
                      <PortableText value={post.author.bio as unknown as PortableTextBlock[]} />
                    </div>
                  ) : (
                    <p className="mt-2 text-muted-foreground">Autor de conteúdo em nosso blog.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
      
      {/* CTA with enhanced styling */}
      <div className="max-w-4xl mx-auto mt-16">
        <div className="p-8 bg-gradient-to-br from-primary/10 to-transparent rounded-xl border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-primary mb-3">Você sabia?</h3>
            <p className="text-muted-foreground max-w-lg">Nossa empresa oferece as melhores condições de empréstimo do mercado. Simule agora e descubra!</p>
          </div>
          <Link 
            href="/simulador" 
            className={buttonVariants({ 
              variant: "default", 
              size: "lg", 
              className: "px-8 font-medium shadow-sm whitespace-nowrap"
            })}
          >
            Simular Agora
          </Link>
        </div>
      </div>
    </div>
  );
}