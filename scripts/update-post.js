const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updatePost() {
  try {
    console.log('更新文章发布状态...');
    
    const updatedPost = await prisma.post.update({
      where: { slug: 'typescript-react-best-practices' },
      data: { published: true }
    });

    console.log(`文章 "${updatedPost.title}" 已设置为发布状态`);
  } catch (error) {
    console.error('更新失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePost(); 