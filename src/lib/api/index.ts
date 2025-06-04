// 统一导出所有API服务
export * from './posts';
export * from './tags';

// 导入所有API类
import { PostsApi } from './posts';
import { TagsApi } from './tags';

// 创建统一的API对象
export const api = {
  posts: PostsApi,
  tags: TagsApi,
} as const;

// 导出API类型
export type Api = typeof api; 