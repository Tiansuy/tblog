import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 创建初始管理员用户
  const hashedPassword = await bcrypt.hash('123456', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@tblog.com' },
    update: {},
    create: {
      email: 'admin@tblog.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Created admin user:', adminUser);

  // 创建示例文章
  const welcomePost = await prisma.post.upsert({
    where: { slug: 'welcome-to-tblog' },
    update: {},
    create: {
      title: '欢迎使用TBlog',
      slug: 'welcome-to-tblog',
      content: '这是一篇示例文章，展示TBlog的基本功能。\n\n## 主要特性\n\n- Next.js 15\n- TypeScript\n- Tailwind CSS\n- PostgreSQL\n- 主题切换\n- 国际化\n\n## 开始使用\n\n现在你可以开始创建自己的文章了！',
      excerpt: '这是一篇示例文章，展示TBlog的基本功能。',
      published: true,
      authorId: adminUser.id,
    },
  });

  console.log('Created welcome post:', welcomePost);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); 