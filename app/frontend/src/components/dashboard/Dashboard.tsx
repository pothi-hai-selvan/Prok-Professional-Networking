import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProfileData } from '../../hooks/useProfileData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { profileData } = useProfileData();

  const quickActions = [
    {
      title: 'View Profile',
      description: 'See your professional profile',
      icon: '👤',
      link: '/app/profile',
      color: 'bg-blue-500'
    },
    {
      title: 'Create Post',
      description: 'Share something with your network',
      icon: '📝',
      link: '/app/posts/create',
      color: 'bg-green-500'
    },
    {
      title: 'Browse Jobs',
      description: 'Find your next opportunity',
      icon: '💼',
      link: '/app/jobs',
      color: 'bg-purple-500'
    },
    {
      title: 'Messages',
      description: 'Connect with your network',
      icon: '💬',
      link: '/app/messages',
      color: 'bg-orange-500'
    }
  ];

  const stats = [
    { label: 'Connections', value: '342', change: '+12' },
    { label: 'Posts', value: '24', change: '+3' },
    { label: 'Profile Views', value: '156', change: '+8' },
    { label: 'Messages', value: '8', change: '+2' }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-black dark:text-white">Welcome back, {profileData.name}!</h1>
          <p className="mt-2 text-black dark:text-white">Here's what's happening in your professional network today.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-black dark:text-white">{stat.label}</p>
                  <p className="text-2xl font-bold text-black dark:text-white">{stat.value}</p>
                </div>
                <div className="text-green-600 dark:text-green-400 text-sm font-medium">
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white text-2xl`}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-black dark:text-white">{action.title}</h3>
                    <p className="text-sm text-black dark:text-white">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-lg">📝</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-black dark:text-white">You published a new post about React performance optimization</p>
                <p className="text-xs text-black dark:text-white">2 hours ago</p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="text-green-600 dark:text-green-400">+24 likes</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 text-lg">👥</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-black dark:text-white">Sarah Johnson accepted your connection request</p>
                <p className="text-xs text-black dark:text-white">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 text-lg">💼</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-black dark:text-white">New job opportunity: Senior Frontend Developer at TechCorp</p>
                <p className="text-xs text-black dark:text-white">2 days ago</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link
              to="/app/profile"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
            >
              View all activity →
            </Link>
          </div>
        </div>

        {/* Network Suggestions */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">People You May Know</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Jane Smith', title: 'Product Manager', mutual: 5 },
              { name: 'Mike Johnson', title: 'UX Designer', mutual: 3 },
              { name: 'Lisa Chen', title: 'Data Scientist', mutual: 7 }
            ].map((person, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <img
                  src={`https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face`}
                  alt={person.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-black dark:text-white">{person.name}</p>
                  <p className="text-xs text-black dark:text-white">{person.title}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">{person.mutual} mutual connections</p>
                </div>
                <button className="px-3 py-1 bg-blue-600 dark:bg-blue-500 text-white text-xs rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 