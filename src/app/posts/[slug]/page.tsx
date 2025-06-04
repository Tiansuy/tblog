import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

// 生成静态参数
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// 生成页面元数据
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: `${post.frontMatter.title} - TBlog`,
    description: post.frontMatter.excerpt,
    openGraph: {
      title: post.frontMatter.title,
      description: post.frontMatter.excerpt,
      type: 'article',
      publishedTime: post.frontMatter.date,
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { frontMatter, content } = post;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 返回链接 */}
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>

        {/* 文章头部 */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {frontMatter.title}
          </h1>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
            <time dateTime={frontMatter.date} className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              发布于 {formatDate(new Date(frontMatter.date))}
            </time>
            
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                技术文章
              </span>
            </div>
          </div>

          {frontMatter.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed">
              {frontMatter.excerpt}
            </p>
          )}
        </header>

        {/* 文章内容 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 lg:p-12">
          <div className="prose prose-lg prose-gray max-w-none">
            {content}
          </div>
        </div>

        {/* 文章尾部 */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              查看更多文章
            </Link>
            
            <div className="text-sm text-gray-500">
              感谢阅读！
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
} 