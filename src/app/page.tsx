import PostCard from '@/components/Blog/PostCard';
import DbTestForm from '@/components/Test/DbTestForm';
import { prisma } from '@/lib/prisma';

type PostType = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
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

async function getPosts(): Promise<PostType[]> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 6, // 限制显示最新的6篇文章
    });
    
    return posts;
  } catch (error) {
    console.error('获取文章失败:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            欢迎来到
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}TBlog
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            现代化的博客平台，基于最新的技术栈构建。
            分享技术见解，记录学习历程，探索无限可能。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              开始阅读
            </button>
            <button className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors">
              了解更多
            </button>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">最新文章</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              探索最新的技术文章、教程和见解，涵盖Web开发、全栈技术、最佳实践等主题。
            </p>
          </div>
          
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <button className="px-6 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors">
                  查看更多文章
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">暂无文章</h3>
              <p className="text-muted-foreground">稍后会有精彩内容发布，敬请期待！</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-card-foreground mb-4">平台特色</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">快速响应</h3>
              <p className="text-muted-foreground">基于Next.js构建，提供极速的页面加载和优秀的性能表现。</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">现代设计</h3>
              <p className="text-muted-foreground">采用Tailwind CSS，提供美观现代的用户界面和极佳的用户体验。</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">类型安全</h3>
              <p className="text-muted-foreground">全面使用TypeScript，确保代码的类型安全和开发的可靠性。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Database Test Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-card-foreground mb-4">数据库测试</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              测试数据库连接和更新功能是否正常工作。
            </p>
          </div>
          
          <DbTestForm />
        </div>
      </section>
    </div>
  );
}
