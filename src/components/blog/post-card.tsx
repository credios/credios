// components/blog/post-card.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/blog/utils';
import { useState } from 'react';
import { Post, Category } from '@/lib/blog/types';

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!post || !post.slug) return null;
  
  // Lidar com o slug de forma segura
  const slug = typeof post.slug === 'string' 
    ? post.slug 
    : post.slug?.current || '';
  
  // Verificar se a imagem está disponível
  const hasImage = post.mainImage && 'asset' in post.mainImage;
  
  // Gerar URL da imagem (ajuste conforme sua configuração)
  const imageUrl = hasImage && post.mainImage?.asset?._ref
    ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${post.mainImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`
    : '';
  
  // Calcular o atraso de animação
  const animationDelay = index * 0.1;
  
  return (
    <div
      className="transform transition-all duration-300 ease-out" 
      style={{ 
        opacity: 0,
        transform: 'translateY(20px)',
        animation: `fadeIn 0.5s ease-out ${animationDelay}s forwards`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/blog/${slug}`}>
        <Card className={`overflow-hidden h-full border shadow-sm hover:shadow-md transition-all duration-300 ${isHovered ? 'ring-1 ring-primary/20' : ''}`}>
          <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
            <Image 
              src={imageUrl}
              alt={post.title || 'Post'}
              fill
              className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
            />
            {post.categories && post.categories.length > 0 && (
              <div className="absolute top-3 left-3 flex gap-2 z-10">
                {post.categories.slice(0, 2).map((category: Category) => (
                  <Badge 
                    key={category._id} 
                    className="bg-primary/80 hover:bg-primary text-white font-medium text-xs py-1"
                  >
                    {category.title}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <CardContent className="p-5">
            <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                {post.excerpt}
              </p>
            )}
          </CardContent>
          <CardFooter className="px-5 pb-5 pt-0 flex justify-between items-center">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{post.readingTime || 5} min</span>
              </div>
            </div>
            <ArrowRight 
              className={`w-4 h-4 text-primary transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
            />
          </CardFooter>
        </Card>
      </Link>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}