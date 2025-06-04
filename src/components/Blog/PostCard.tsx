import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    createdAt: Date;
    updatedAt: Date;
    tags: {
      tag: {
        id: string;
        name: string;
        slug: string;
        color: string | null;
      };
    }[];
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-card rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <time dateTime={post.createdAt.toISOString()}>
            {formatDate(post.createdAt)}
          </time>
          {post.updatedAt > post.createdAt && (
            <span className="text-primary font-medium">已更新</span>
          )}
        </div>
        
        <h2 className="text-xl font-semibold text-card-foreground mb-3 line-clamp-2">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-primary transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h2>
        
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm"
          >
            阅读全文
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          <div className="flex items-center space-x-2">
            {post.tags.slice(0, 3).map(({ tag }) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: tag.color ? `${tag.color}15` : 'var(--muted)',
                  color: tag.color || 'var(--muted-foreground)',
                  border: `1px solid ${tag.color ? `${tag.color}30` : 'var(--border)'}`
                }}
              >
                {tag.name}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
} 