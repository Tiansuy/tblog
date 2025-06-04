// 应用程序集中配置文件
export const appConfig = {
  // 基础配置
  app: {
    name: 'TBlog',
    description: '现代化博客平台',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    version: '1.0.0',
  },

  // 数据库配置
  database: {
    url: process.env.DATABASE_URL,
  },

  // JWT 配置
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // 博客配置
  blog: {
    postsPath: process.env.BLOG_POSTS_PATH || './posts',
    postsPerPage: 6,
    maxExcerptLength: 150,
  },

  // 主题配置
  theme: {
    defaultTheme: 'light' as const,
    themes: ['light', 'dark'] as const,
    enableSystemPreference: true,
  },

  // 国际化配置
  i18n: {
    defaultLocale: 'zh' as const,
    locales: ['zh', 'en'] as const,
    enableBrowserDetection: true,
  },

  // 功能开关
  features: {
    enableComments: false,
    enableSearch: true,
    enableTags: true,
    enableDarkMode: true,
    enableI18n: true,
    enableAnalytics: false,
  },

  // 分页配置
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 50,
  },

  // 缓存配置
  cache: {
    postsRevalidateTime: 300, // 5分钟
    staticPageRevalidateTime: 3600, // 1小时
  },
} as const;

// 类型导出
export type Theme = typeof appConfig.theme.themes[number];
export type Locale = typeof appConfig.i18n.locales[number];
export type AppConfig = typeof appConfig; 