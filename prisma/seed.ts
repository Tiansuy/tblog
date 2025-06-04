import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 创建标签
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'next-js' },
      update: {},
      create: {
        name: 'Next.js',
        slug: 'next-js',
        color: '#000000',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'react' },
      update: {},
      create: {
        name: 'React',
        slug: 'react',
        color: '#61DAFB',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'typescript' },
      update: {},
      create: {
        name: 'TypeScript',
        slug: 'typescript',
        color: '#3178C6',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'web-development' },
      update: {},
      create: {
        name: 'Web开发',
        slug: 'web-development',
        color: '#FF6B6B',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'frontend' },
      update: {},
      create: {
        name: '前端',
        slug: 'frontend',
        color: '#4ECDC4',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'best-practices' },
      update: {},
      create: {
        name: '最佳实践',
        slug: 'best-practices',
        color: '#45B7D1',
      },
    }),
  ]);

  console.log('Created tags:', tags.map(tag => tag.name).join(', '));

  // 获取现有的博客文章
  const posts = await prisma.post.findMany();
  
  if (posts.length > 0) {
    // 为每篇文章添加相关标签
    for (const post of posts) {
      let tagIds: string[] = [];
      
      if (post.slug === 'welcome-to-tblog') {
        // 欢迎文章：Web开发, 前端
        tagIds = tags.filter(tag => ['web-development', 'frontend'].includes(tag.slug)).map(tag => tag.id);
      } else if (post.slug === 'nextjs-15-features') {
        // Next.js 15 文章：Next.js, React, 前端
        tagIds = tags.filter(tag => ['next-js', 'react', 'frontend'].includes(tag.slug)).map(tag => tag.id);
      } else if (post.slug === 'typescript-react-best-practices') {
        // TypeScript 最佳实践：TypeScript, React, 最佳实践
        tagIds = tags.filter(tag => ['typescript', 'react', 'best-practices'].includes(tag.slug)).map(tag => tag.id);
      }

      // 为文章添加标签关联
      for (const tagId of tagIds) {
        await prisma.postTag.upsert({
          where: {
            postId_tagId: {
              postId: post.id,
              tagId: tagId,
            },
          },
          update: {},
          create: {
            postId: post.id,
            tagId: tagId,
          },
        });
      }
    }
    
    console.log('Tagged posts successfully');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 