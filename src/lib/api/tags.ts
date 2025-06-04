import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// 定义Tag相关的类型
export type TagWithPostCount = Prisma.TagGetPayload<{
  include: {
    _count: {
      select: {
        posts: true;
      };
    };
  };
}>;

export interface TagsApiOptions {
  includePostCount?: boolean;
  orderBy?: 'name' | 'postCount' | 'createdAt';
  limit?: number;
}

export class TagsApi {
  /**
   * 获取所有标签
   */
  static async getTags(options: TagsApiOptions = {}): Promise<TagWithPostCount[]> {
    try {
      const {
        includePostCount = true,
        orderBy = 'name',
        limit,
      } = options;

      let orderByClause: Prisma.TagOrderByWithRelationInput;

      switch (orderBy) {
        case 'postCount':
          orderByClause = { posts: { _count: 'desc' } };
          break;
        case 'createdAt':
          orderByClause = { createdAt: 'desc' };
          break;
        default:
          orderByClause = { name: 'asc' };
      }

      const tags = await prisma.tag.findMany({
        include: includePostCount ? {
          _count: {
            select: {
              posts: true,
            },
          },
        } : undefined,
        orderBy: orderByClause,
        ...(limit && { take: limit }),
      });

      return tags as TagWithPostCount[];
    } catch (error) {
      console.error('获取标签失败:', error);
      throw new Error('Failed to fetch tags');
    }
  }

  /**
   * 根据slug获取标签
   */
  static async getTagBySlug(slug: string): Promise<TagWithPostCount | null> {
    try {
      const tag = await prisma.tag.findUnique({
        where: { slug },
        include: {
          _count: {
            select: {
              posts: true,
            },
          },
        },
      });

      return tag;
    } catch (error) {
      console.error(`获取标签失败 (slug: ${slug}):`, error);
      throw new Error('Failed to fetch tag');
    }
  }

  /**
   * 获取热门标签
   */
  static async getPopularTags(limit = 10): Promise<TagWithPostCount[]> {
    return this.getTags({
      orderBy: 'postCount',
      limit,
    });
  }

  /**
   * 创建标签
   */
  static async createTag(data: {
    name: string;
    slug: string;
    color?: string;
  }): Promise<TagWithPostCount> {
    try {
      const tag = await prisma.tag.create({
        data,
        include: {
          _count: {
            select: {
              posts: true,
            },
          },
        },
      });

      return tag;
    } catch (error) {
      console.error('创建标签失败:', error);
      throw new Error('Failed to create tag');
    }
  }

  /**
   * 更新标签
   */
  static async updateTag(
    id: string,
    data: Partial<{
      name: string;
      slug: string;
      color: string;
    }>
  ): Promise<TagWithPostCount> {
    try {
      const tag = await prisma.tag.update({
        where: { id },
        data,
        include: {
          _count: {
            select: {
              posts: true,
            },
          },
        },
      });

      return tag;
    } catch (error) {
      console.error('更新标签失败:', error);
      throw new Error('Failed to update tag');
    }
  }

  /**
   * 删除标签
   */
  static async deleteTag(id: string): Promise<void> {
    try {
      await prisma.tag.delete({
        where: { id },
      });
    } catch (error) {
      console.error('删除标签失败:', error);
      throw new Error('Failed to delete tag');
    }
  }
} 