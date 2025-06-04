import Link from 'next/link';

export default function PostNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <svg 
            className="mx-auto h-24 w-24 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          文章未找到
        </h1>
        
        <p className="text-gray-600 mb-8">
          抱歉，您访问的文章不存在或已被移除。
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回首页
          </Link>
          
          <Link 
            href="/"
            className="block w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            浏览其他文章
          </Link>
        </div>
      </div>
    </div>
  );
} 