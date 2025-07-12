import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { ProfileData } from '../../hooks/useProfileData';

const defaultProfile = {
  id: 1,
  bannerUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=cover&w=800&q=80',
  avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  connections: 523,
  openToWork: true,
  badges: ['Open to Work', '500+ Connections'],
};

interface ProfileHeaderProps {
  profileData: ProfileData;
}

export default function ProfileHeader({ profileData }: ProfileHeaderProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // In real app, compare user.id with profile.user_id
  const isOwnProfile = user && user.id === defaultProfile.id;

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
      <img src={defaultProfile.bannerUrl} alt="Banner" className="w-full h-40 object-cover" />
      {/* Edit Icon Top-Right */}
      {isOwnProfile && (
        <button
          className="absolute top-4 right-4 bg-blue-600 dark:bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition cursor-pointer flex items-center"
          title="Edit Profile"
          onClick={() => navigate('/app/profile/edit')}
        >
          <span className="mr-1">✏️</span>
          <span className="hidden md:inline font-semibold">Edit</span>
        </button>
      )}
      <div className="flex items-center px-6 -mt-12">
        <img
          src={profileData.avatar_url || defaultProfile.avatarUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
        />
        <div className="ml-6">
          <h1 className="text-2xl font-bold text-black dark:text-white">{profileData.name}</h1>
          <p className="text-black dark:text-white">{profileData.title}</p>
          <p className="text-black dark:text-white">{profileData.location}</p>
          <div className="flex space-x-2 mt-2">
            {defaultProfile.badges.map((badge) => (
              <span key={badge} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs font-semibold">
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="ml-auto flex space-x-2">
          <button className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">Connect</button>
          <button className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Message</button>
        </div>
      </div>
    </div>
  );
} 