import React from 'react';

const Feed: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Feed</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Stay updated with your network</p>
      </div>
      
      <div className="space-y-6">
        {/* Placeholder feed items */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">User Name</h3>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">• 2h ago</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  This is a sample post content that would appear in the professional feed. It could contain updates, achievements, or professional insights.
                </p>
                <div className="flex items-center space-x-4 mt-4 text-gray-500 dark:text-gray-400">
                  <button className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>Like</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">More feed content coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Feed; 