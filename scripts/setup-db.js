const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('开始初始化数据库...');

    // 创建示例用户
    const user = await prisma.user.upsert({
      where: { email: 'admin@tblog.com' },
      update: {},
      create: {
        email: 'admin@tblog.com',
        name: 'TBlog Admin',
        password: '$2b$10$K5V6V.jQQQ5K5V6V.jQQQ5K5V6V.jQQQ5K5V6V.jQQQ5K5V6V.jQQ', // 需要在生产环境中使用真实的哈希密码
        role: 'ADMIN',
      },
    });

    // 创建示例博客文章
    const posts = [
      {
        title: '欢迎来到TBlog - 现代化博客系统',
        slug: 'welcome-to-tblog',
        excerpt: '这是一个基于Next.js 15、React、TypeScript、Tailwind CSS、Prisma和PostgreSQL构建的现代化博客系统。',
        filePath: 'posts/welcome-to-tblog.mdx',
        published: true,
      },
      {
        title: 'Next.js 15 新特性详解',
        slug: 'nextjs-15-features',
        excerpt: '探索Next.js 15带来的新功能和改进，包括App Router的增强、性能优化等。',
        filePath: 'posts/nextjs-15-features.mdx',
        published: true,
      },
      {
        title: 'TypeScript与React最佳实践',
        slug: 'typescript-react-best-practices',
        excerpt: 'TypeScript在React开发中的最佳实践指南，包括类型定义、接口设计等。',
        filePath: 'posts/typescript-react-best-practices.mdx',
        published: false,
      },
    ];

    for (const postData of posts) {
      await prisma.post.upsert({
        where: { slug: postData.slug },
        update: {},
        create: postData,
      });
    }

    console.log('数据库初始化完成！');
    console.log(`创建用户: ${user.email}`);
    console.log(`创建博客文章: ${posts.length} 篇`);
  } catch (error) {
    console.error('数据库初始化失败:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 