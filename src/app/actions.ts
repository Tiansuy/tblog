'use server';

import { api } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function updateFirstPostTitle(newTitle: string) {
  try {
    // 获取第一篇文章
    const firstPost = await api.posts.getFirstPost();
    
    if (!firstPost) {
      return {
        success: false,
        error: '没有找到文章'
      };
    }

    // 更新文章标题
    await api.posts.updatePost(firstPost.id, {
      title: newTitle
    });

    // 重新验证页面缓存
    revalidatePath('/');

    return {
      success: true,
      data: {
        oldTitle: firstPost.title,
        newTitle
      }
    };
  } catch (error) {
    console.error('更新文章标题失败:', error);
    return {
      success: false,
      error: '更新失败'
    };
  }
} 