const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function viewPosts() {
  try {
    console.log('📋 查看 posts 表内容:\n');
    
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (posts.length === 0) {
      console.log('暂无文章数据');
      return;
    }

    console.log(`共找到 ${posts.length} 篇文章:\n`);
    
    posts.forEach((post, index) => {
      console.log(`${index + 1}. 📄 ${post.title}`);
      console.log(`   ID: ${post.id}`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   发布状态: ${post.published ? '✅ 已发布' : '❌ 未发布'}`);
      console.log(`   文件路径: ${post.filePath}`);
      console.log(`   摘要: ${post.excerpt ? post.excerpt.substring(0, 50) + '...' : '无摘要'}`);
      console.log(`   创建时间: ${post.createdAt.toLocaleString('zh-CN')}`);
      console.log(`   更新时间: ${post.updatedAt.toLocaleString('zh-CN')}`);
      console.log('   ' + '-'.repeat(60));
    });

    // 显示表结构信息
    console.log('\n📊 Posts 表结构:');
    console.log('┌─────────────┬──────────────┬─────────────┬─────────────┐');
    console.log('│ 字段名      │ 类型         │ 是否必需    │ 说明        │');
    console.log('├─────────────┼──────────────┼─────────────┼─────────────┤');
    console.log('│ id          │ String       │ 必需        │ 主键(cuid)  │');
    console.log('│ title       │ String       │ 必需        │ 文章标题    │');
    console.log('│ slug        │ String       │ 必需(唯一)  │ URL路径     │');
    console.log('│ content     │ String?      │ 可选        │ 文章内容    │');
    console.log('│ excerpt     │ String?      │ 可选        │ 文章摘要    │');
    console.log('│ filePath    │ String       │ 必需        │ MDX文件路径 │');
    console.log('│ published   │ Boolean      │ 必需        │ 发布状态    │');
    console.log('│ createdAt   │ DateTime     │ 必需        │ 创建时间    │');
    console.log('│ updatedAt   │ DateTime     │ 必需        │ 更新时间    │');
    console.log('└─────────────┴──────────────┴─────────────┴─────────────┘');

  } catch (error) {
    console.error('查询失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

viewPosts(); 