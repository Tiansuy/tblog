import { prisma } from '@/lib/prisma';
import { appConfig } from '@/lib/config';
import { Prisma } from '@prisma/client';

// 定义Post相关的类型
export type PostWithTags = Prisma.PostGetPayload<{
  include: {
    tags: {
      include: {
        tag: true;
      };
    };
  };
}>;

export interface PostsApiOptions {
  page?: number;
  pageSize?: number;
  published?: boolean;
  tags?: string[];
  search?: string;
}

export interface PostsApiResponse {
  posts: PostWithTags[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class PostsApi {
  /**
   * 获取文章列表
   */
  static async getPosts(options: PostsApiOptions = {}): Promise<PostsApiResponse> {
    try {
      const {
        page = 1,
        pageSize = appConfig.blog.postsPerPage,
        published = true,
        tags = [],
        search,
      } = options;

      const skip = (page - 1) * pageSize;
      const take = Math.min(pageSize, appConfig.pagination.maxPageSize);

      // 构建查询条件
      const where: Prisma.PostWhereInput = {
        published,
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { excerpt: { contains: search, mode: 'insensitive' } },
          ],
        }),
        ...(tags.length > 0 && {
          tags: {
            some: {
              tag: {
                slug: { in: tags },
              },
            },
          },
        }),
      };

      // 并行执行查询和计数
      const [posts, total] = await Promise.all([
        prisma.post.findMany({
          where,
          include: {
            tags: {
              include: {
                tag: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip,
          take,
        }),
        prisma.post.count({ where }),
      ]);

      return {
        posts,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch (error) {
      console.error('获取文章列表失败:', error);
      throw new Error('Failed to fetch posts');
    }
  }

  /**
   * 根据slug获取单篇文章
   */
  static async getPostBySlug(slug: string): Promise<PostWithTags | null> {
    try {
      const post = await prisma.post.findUnique({
        where: { slug },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      return post;
    } catch (error) {
      console.error(`获取文章失败 (slug: ${slug}):`, error);
      throw new Error('Failed to fetch post');
    }
  }

  /**
   * 获取相关文章
   */
  static async getRelatedPosts(postId: string, limit = 3): Promise<PostWithTags[]> {
    try {
      // 获取当前文章的标签
      const currentPost = await prisma.post.findUnique({
        where: { id: postId },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      if (!currentPost) return [];

      const tagIds = currentPost.tags.map(pt => pt.tag.id);

      // 查找具有相同标签的其他文章
      const relatedPosts = await prisma.post.findMany({
        where: {
          id: { not: postId },
          published: true,
          tags: {
            some: {
              tagId: { in: tagIds },
            },
          },
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
      });

      return relatedPosts;
    } catch (error) {
      console.error('获取相关文章失败:', error);
      return [];
    }
  }

  /**
   * 获取热门文章
   */
  static async getPopularPosts(limit = 5): Promise<PostWithTags[]> {
    try {
      // 简单实现：按创建时间倒序
      // 可以后续扩展为按浏览量等指标排序
      const posts = await prisma.post.findMany({
        where: { published: true },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
      });

      return posts;
    } catch (error) {
      console.error('获取热门文章失败:', error);
      return [];
    }
  }

  /**
   * 搜索文章
   */
  static async searchPosts(query: string, page = 1, pageSize = 10): Promise<PostsApiResponse> {
    return this.getPosts({
      search: query,
      page,
      pageSize,
    });
  }

  /**
   * 更新文章
   */
  static async updatePost(
    id: string,
    data: Partial<{
      title: string;
      slug: string;
      content: string;
      excerpt: string;
      published: boolean;
    }>
  ): Promise<PostWithTags> {
    try {
      const post = await prisma.post.update({
        where: { id },
        data,
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      return post;
    } catch (error) {
      console.error('更新文章失败:', error);
      throw new Error('Failed to update post');
    }
  }

  /**
   * 获取第一篇文章
   */
  static async getFirstPost(): Promise<PostWithTags | null> {
    try {
      const post = await prisma.post.findFirst({
        where: {
          published: true,
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return post;
    } catch (error) {
      console.error('获取第一篇文章失败:', error);
      throw new Error('Failed to fetch first post');
    }
  }
} 