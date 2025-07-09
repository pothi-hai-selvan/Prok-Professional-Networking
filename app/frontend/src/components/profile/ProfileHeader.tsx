import React from 'react';

const mockUser = {
  bannerUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=cover&w=800&q=80',
  avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  name: 'John Doe',
  headline: 'Senior Software Engineer at TechCorp',
  location: 'San Francisco, CA',
  connections: 523,
  openToWork: true,
  badges: ['Open to Work', '500+ Connections'],
};

export default function ProfileHeader() {
  const user = mockUser;
  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden mb-6">
      <img src={user.bannerUrl} alt="Banner" className="w-full h-40 object-cover" />
      <div className="flex items-center px-6 -mt-12">
        <img
          src={user.avatarUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
        />
        <div className="ml-6">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.headline}</p>
          <p className="text-gray-500">{user.location}</p>
          <div className="flex space-x-2 mt-2">
            {user.badges.map((badge) => (
              <span key={badge} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="ml-auto flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700">Connect</button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-semibold hover:bg-gray-300">Message</button>
        </div>
      </div>
    </div>
  );
} 