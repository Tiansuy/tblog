# TBlog 架构优化文档

## 🎯 架构改进总览

为了提升项目的封装性和可扩展性，我们对 TBlog 进行了全面的架构优化，主要包括：

1. **集中化配置管理**
2. **API 服务层统一管理**
3. **主题切换系统**
4. **国际化支持**
5. **组件化设计**

## 📁 项目结构

```
src/
├── lib/
│   ├── config.ts              # 集中配置管理
│   ├── api/
│   │   ├── index.ts           # API 统一入口
│   │   ├── posts.ts           # 文章相关 API
│   │   └── tags.ts            # 标签相关 API
│   └── i18n/
│       ├── index.ts           # 国际化核心
│       └── locales/
│           ├── zh.ts          # 中文翻译
│           └── en.ts          # 英文翻译
├── contexts/
│   ├── ThemeContext.tsx       # 主题管理 Context
│   └── I18nContext.tsx        # 国际化 Context
├── components/
│   ├── UI/
│   │   ├── ThemeToggle.tsx    # 主题切换组件
│   │   └── LanguageSwitch.tsx # 语言切换组件
│   └── Layout/
│       └── Navbar.tsx         # 优化后的导航栏
└── app/
    ├── globals.css            # 支持暗色主题的全局样式
    └── layout.tsx             # 集成所有 Provider
```

## 🔧 核心功能详解

### 1. 集中化配置管理 (`src/lib/config.ts`)

所有应用配置都集中在 `appConfig` 对象中：

```typescript
export const appConfig = {
  // 基础配置
  app: {
    name: 'TBlog',
    description: '现代化博客平台',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    version: '1.0.0',
  },
  // 主题配置
  theme: {
    defaultTheme: 'light',
    themes: ['light', 'dark'],
    enableSystemPreference: true,
  },
  // 国际化配置
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    enableBrowserDetection: true,
  },
  // 功能开关
  features: {
    enableDarkMode: true,
    enableI18n: true,
    enableSearch: true,
    // ...更多功能开关
  },
}
```

### 2. API 服务层统一管理

#### API 统一入口 (`src/lib/api/index.ts`)

```typescript
import { PostsApi } from './posts';
import { TagsApi } from './tags';

export const api = {
  posts: PostsApi,
  tags: TagsApi,
} as const;
```

#### 使用示例

```typescript
// 获取文章列表
const postsData = await api.posts.getPosts({
  page: 1,
  pageSize: 10,
  published: true
});

// 搜索文章
const searchResults = await api.posts.searchPosts('Next.js', 1, 10);

// 获取热门标签
const popularTags = await api.tags.getPopularTags(10);
```

### 3. 主题切换系统

#### 主题 Context (`src/contexts/ThemeContext.tsx`)

提供完整的主题管理功能：

- ✅ 明暗主题切换
- ✅ 跟随系统偏好
- ✅ 本地存储记忆
- ✅ 平滑过渡动画

#### 使用方法

```typescript
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme, isSystemPreference } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      当前主题: {theme}
    </button>
  );
}
```

### 4. 国际化支持

#### 多语言 Context (`src/contexts/I18nContext.tsx`)

- ✅ 中英文切换
- ✅ 浏览器语言检测
- ✅ 翻译参数支持
- ✅ 类型安全的翻译键

#### 使用方法

```typescript
import { useI18n } from '@/contexts/I18nContext';

function MyComponent() {
  const { t, locale, setLocale } = useI18n();
  
  return (
    <div>
      <h1>{t('site.title')}</h1>
      <p>{t('post.publishedAt', { date: '2024-01-15' })}</p>
      <button onClick={() => setLocale('en')}>
        Switch to English
      </button>
    </div>
  );
}
```

## 🎨 样式系统

### CSS 变量系统

支持主题切换的 CSS 变量：

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --primary: #2563eb;
  /* ...更多变量 */
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
  --primary: #3b82f6;
  /* ...暗色主题变量 */
}
```

### 响应式设计

- 📱 移动端优化
- 💻 桌面端体验
- 🎨 平滑过渡动画

## 🚀 使用指南

### 1. 启用/禁用功能

在 `src/lib/config.ts` 中修改功能开关：

```typescript
features: {
  enableDarkMode: true,    // 启用暗色主题
  enableI18n: true,        // 启用国际化
  enableSearch: false,     // 禁用搜索功能
}
```

### 2. 添加新语言

1. 在 `src/lib/i18n/locales/` 中添加新语言文件
2. 更新 `src/lib/config.ts` 中的 `locales` 配置
3. 在 `LanguageSwitch.tsx` 中添加语言名称和图标

### 3. 自定义主题

1. 在 `src/app/globals.css` 中修改 CSS 变量
2. 可以添加新的主题选项到 `appConfig.theme.themes`

### 4. 扩展 API 服务

1. 在 `src/lib/api/` 中创建新的 API 服务类
2. 在 `src/lib/api/index.ts` 中导出新服务
3. 使用统一的错误处理和类型定义

## 📊 性能优化

### 1. 代码分割
- 组件按需加载
- Context 独立管理

### 2. 缓存策略
- 本地存储用户偏好
- API 响应缓存

### 3. 类型安全
- 完整的 TypeScript 支持
- 运行时类型检查

## 🔧 开发建议

### 1. 组件开发
- 使用 Hooks 管理状态
- 遵循单一职责原则
- 支持自定义样式

### 2. API 设计
- 统一错误处理
- 响应数据标准化
- 支持分页和筛选

### 3. 样式管理
- 使用 CSS 变量
- 支持主题切换
- 响应式设计优先

## 🎯 未来扩展

### 计划中的功能
- 🔍 全文搜索
- 💬 评论系统
- 📊 访问统计
- 🔔 消息通知
- 📱 PWA 支持

### 架构改进
- 状态管理优化
- 服务端渲染增强
- 性能监控集成

---

**注意**：这个架构设计遵循了现代前端开发的最佳实践，确保了代码的可维护性、可扩展性和性能优化。所有功能都支持渐进式启用，可以根据项目需求灵活配置。 