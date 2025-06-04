export const zhTranslations = {
  // 网站基本信息
  'site.title': 'TBlog',
  'site.description': '现代化博客平台',
  'site.welcome': '欢迎来到 {{name}}',
  
  // 导航栏
  'nav.home': '首页',
  'nav.about': '关于',
  'nav.blog': '博客',
  'nav.posts': '文章',
  'nav.contact': '联系',
  'nav.theme': '主题',
  'nav.language': '语言',
  
  // 主题相关
  'theme.light': '浅色模式',
  'theme.dark': '深色模式',
  'theme.system': '跟随系统',
  'theme.toggle': '切换主题',
  
  // 语言相关
  'language.zh': '中文',
  'language.en': 'English',
  'language.switch': '切换语言',
  
  // 按钮和操作
  'button.readMore': '阅读全文',
  'button.viewMore': '查看更多文章',
  'button.startReading': '开始阅读',
  'button.learnMore': '了解更多',
  'button.backHome': '返回首页',
  'button.browseArticles': '浏览其他文章',
  'button.retry': '重试',
  'button.search': '搜索',
  'button.submit': '提交',
  'button.cancel': '取消',
  'button.save': '保存',
  'button.edit': '编辑',
  'button.delete': '删除',
  
  // 文章相关
  'post.title': '文章标题',
  'post.content': '文章内容',
  'post.excerpt': '文章摘要',
  'post.publishedAt': '发布于 {{date}}',
  'post.updatedAt': '更新于 {{date}}',
  'post.readingTime': '阅读时间约 {{minutes}} 分钟',
  'post.category': '分类',
  'post.tags': '标签',
  'post.author': '作者',
  'post.published': '已发布',
  'post.draft': '草稿',
  'post.related': '相关文章',
  'post.popular': '热门文章',
  'post.latest': '最新文章',
  'post.techArticle': '技术文章',
  
  // 搜索和筛选
  'search.placeholder': '搜索文章...',
  'search.noResults': '没有找到相关文章',
  'search.results': '搜索结果',
  'search.searching': '搜索中...',
  'filter.all': '全部',
  'filter.byTag': '按标签筛选',
  'filter.byCategory': '按分类筛选',
  'filter.byDate': '按日期筛选',
  
  // 分页
  'pagination.prev': '上一页',
  'pagination.next': '下一页',
  'pagination.page': '第 {{current}} 页',
  'pagination.totalPages': '共 {{total}} 页',
  'pagination.totalItems': '共 {{total}} 项',
  'pagination.showingItems': '显示第 {{start}}-{{end}} 项',
  
  // 错误和状态消息
  'error.notFound': '页面未找到',
  'error.postNotFound': '文章未找到',
  'error.serverError': '服务器错误',
  'error.networkError': '网络错误',
  'error.loading': '加载失败',
  'error.retry': '请重试',
  
  'status.loading': '加载中...',
  'status.noData': '暂无数据',
  'status.noPosts': '暂无文章',
  'status.comingSoon': '敬请期待',
  'status.updated': '已更新',
  
  // 消息提示
  'message.success': '操作成功',
  'message.error': '操作失败',
  'message.warning': '警告',
  'message.info': '提示',
  'message.thankYou': '感谢阅读！',
  'message.welcome': '欢迎使用TBlog！',
  'message.stayTuned': '稍后会有精彩内容发布，敬请期待！',
  
  // 首页内容
  'home.hero.title': '欢迎来到',
  'home.hero.subtitle': '现代化的博客平台，基于最新的技术栈构建。\n分享技术见解，记录学习历程，探索无限可能。',
  'home.posts.title': '最新文章',
  'home.posts.subtitle': '探索最新的技术文章、教程和见解，涵盖Web开发、全栈技术、最佳实践等主题。',
  'home.features.title': '平台特色',
  'home.features.performance.title': '快速响应',
  'home.features.performance.description': '基于Next.js构建，提供极速的页面加载和优秀的性能表现。',
  'home.features.design.title': '现代设计',
  'home.features.design.description': '采用Tailwind CSS，提供美观现代的用户界面和极佳的用户体验。',
  'home.features.typescript.title': '类型安全',
  'home.features.typescript.description': '全面使用TypeScript，确保代码的类型安全和开发的可靠性。',
  
  // 404页面
  'notFound.title': '页面未找到',
  'notFound.description': '抱歉，您访问的页面不存在或已被移除。',
  'notFound.postTitle': '文章未找到',
  'notFound.postDescription': '抱歉，您访问的文章不存在或已被移除。',
  
  // 表单相关
  'form.name': '姓名',
  'form.email': '邮箱',
  'form.message': '消息',
  'form.subject': '主题',
  'form.required': '必填项',
  'form.invalid': '格式不正确',
  'form.tooShort': '内容太短',
  'form.tooLong': '内容太长',
  
  // 日期和时间
  'date.today': '今天',
  'date.yesterday': '昨天',
  'date.daysAgo': '{{days}} 天前',
  'date.weeksAgo': '{{weeks}} 周前',
  'date.monthsAgo': '{{months}} 个月前',
  'date.yearsAgo': '{{years}} 年前',
  
  // 标签和分类
  'tags.title': '标签',
  'tags.popular': '热门标签',
  'tags.all': '所有标签',
  'tags.count': '{{count}} 篇文章',
  'categories.title': '分类',
  'categories.all': '所有分类',
  
  // Footer
  'footer.rights': '版权所有',
  'footer.madeWith': '使用 {{tech}} 构建',
  'footer.poweredBy': '由 {{name}} 驱动',
} as const; 