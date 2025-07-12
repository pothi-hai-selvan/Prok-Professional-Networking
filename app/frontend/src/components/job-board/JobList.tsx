import React from 'react';

const JobList: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Job Board</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Find your next professional opportunity</p>
      </div>
      
      <div className="space-y-4">
        {/* Placeholder job cards */}
        {[1, 2, 3].map((job) => (
          <div key={job} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Senior Software Engineer</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">TechCorp Inc.</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">San Francisco, CA • Full-time • Remote</p>
                <div className="flex items-center mt-3 space-x-2">
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                    $120k - $180k
                  </span>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">
                    React
                  </span>
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded text-xs font-medium">
                    TypeScript
                  </span>
                </div>
              </div>
              <button className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                Apply
              </button>
            </div>
          </div>
        ))}
        
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">More job listings coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default JobList; 