// src/components/blog/featured-posts.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/lib/blog/types';
import { formatDate, getSlugString } from '@/lib/blog/utils';
import { urlFor } from '@/lib/blog/api';

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null;
  
  const mainPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-8">Artigos em Destaque</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Link href={`/blog/${getSlugString(mainPost.slug)}`}>
            <div className="group relative overflow-hidden rounded-lg h-[400px]">
              {mainPost.mainImage && (
                <Image 
                  src={urlFor(mainPost.mainImage).width(1200).height(800).url()}
                  alt={mainPost.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <div className="flex gap-2 mb-3">
                  {mainPost.categories?.slice(0, 2).map((category) => (
                    <Badge key={category._id} className="bg-primary/80 hover:bg-primary">
                      {category.title}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{mainPost.title}</h3>
                {mainPost.excerpt && (
                  <p className="line-clamp-2 mb-4 text-white/80">{mainPost.excerpt}</p>
                )}
                <div className="flex items-center gap-4">
                  <span>{formatDate(mainPost.publishedAt)}</span>
                  <span>•</span>
                  <span>{mainPost.readingTime || 5} min read</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="space-y-6">
          {secondaryPosts.map((post) => (
            <Link key={post._id} href={`/blog/${getSlugString(post.slug)}`}>
              <div className="group flex flex-col h-[180px] bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {post.mainImage && (
                  <div className="relative h-24">
                    <Image 
                      src={urlFor(post.mainImage).width(600).height(300).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-2 mb-1">{post.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime || 5} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}