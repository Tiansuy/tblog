-- 创建扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 创建初始管理员用户
INSERT INTO "User" (id, email, name, password, role, createdAt, updatedAt)
VALUES (
  uuid_generate_v4(),
  'admin@tblog.com',
  'Admin',
  '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', -- 默认密码：123456
  'ADMIN',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) ON CONFLICT DO NOTHING;

-- 创建示例文章
INSERT INTO "Post" (id, title, slug, content, excerpt, published, authorId, createdAt, updatedAt)
VALUES (
  uuid_generate_v4(),
  '欢迎使用TBlog',
  'welcome-to-tblog',
  '这是一篇示例文章，展示TBlog的基本功能。\n\n## 主要特性\n\n- Next.js 15\n- TypeScript\n- Tailwind CSS\n- PostgreSQL\n- 主题切换\n- 国际化\n\n## 开始使用\n\n现在你可以开始创建自己的文章了！',
  '这是一篇示例文章，展示TBlog的基本功能。',
  true,
  (SELECT id FROM "User" WHERE email = 'admin@tblog.com' LIMIT 1),
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) ON CONFLICT DO NOTHING; 