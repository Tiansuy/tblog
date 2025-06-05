'use client';

import { useState } from 'react';
import { updateFirstPostTitle } from '@/app/actions';

export default function DbTestForm() {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
  }>({ type: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setStatus({
        type: 'error',
        message: '请输入标题'
      });
      return;
    }

    try {
      setStatus({ type: 'loading' });
      
      const result = await updateFirstPostTitle(title);
      
      if (result.success && result.data) {
        setStatus({
          type: 'success',
          message: `更新成功！原标题: ${result.data.oldTitle} -> 新标题: ${result.data.newTitle}`
        });
        setTitle('');
      } else {
        setStatus({
          type: 'error',
          message: result.error || '更新失败'
        });
      }
    } catch (err) {
      console.error('Update failed:', err);
      setStatus({
        type: 'error',
        message: '更新失败，请重试'
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-md border border-border">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">数据库功能测试</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-1">
            新的文章标题
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="输入新标题..."
          />
        </div>

        <button
          type="submit"
          disabled={status.type === 'loading'}
          className={`w-full px-4 py-2 text-sm font-medium rounded-md ${
            status.type === 'loading'
              ? 'bg-primary/50 cursor-not-allowed'
              : 'bg-primary hover:bg-primary/90'
          } text-primary-foreground transition-colors`}
        >
          {status.type === 'loading' ? '更新中...' : '更新第一篇文章标题'}
        </button>
      </form>

      {status.message && (
        <div
          className={`mt-4 p-3 rounded-md ${
            status.type === 'success'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : status.type === 'error'
              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
              : ''
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
} 