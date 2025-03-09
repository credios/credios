// components/blog/post-grid.tsx
import { PostCard } from '@/components/blog/post-card';
import { Post } from '@/lib/blog/types';

interface PostGridProps {
  posts: Post[];
}

export function PostGrid({ posts }: PostGridProps) {
  // Verificar se posts existe e é um array
  if (!posts || !Array.isArray(posts)) {
    return <div>Nenhum post disponível.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <PostCard key={post._id || index} post={post} index={index} />
      ))}
    </div>
  );
}