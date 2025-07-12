import React from 'react';
import { useProfileData } from '../../hooks/useProfileData';
import ProfileHeader from './ProfileHeader';
import AboutSection from './AboutSection';
import ExperienceTimeline from './ExperienceTimeline';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import RecommendationsSection from './RecommendationsSection';
import FeaturedSection from './FeaturedSection';
import ActivityFeed from './ActivityFeed';
import ConnectionsSidebar from './ConnectionsSidebar';

export default function ProfileView() {
  const { profileData, loading } = useProfileData();

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-4">
        <div className="flex-1 min-w-0">
          <div className="animate-pulse space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-48 border border-gray-200 dark:border-gray-700"></div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-32 border border-gray-200 dark:border-gray-700"></div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-48 border border-gray-200 dark:border-gray-700"></div>
          </div>
        </div>
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-64 animate-pulse border border-gray-200 dark:border-gray-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-4">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <ProfileHeader profileData={profileData} />
        <AboutSection profileData={profileData} />
        <FeaturedSection />
        <ExperienceTimeline profileData={profileData} />
        <EducationSection profileData={profileData} />
        <SkillsSection profileData={profileData} />
        <RecommendationsSection />
        <ActivityFeed />
      </div>
      {/* Sidebar */}
      <div className="w-full md:w-80 flex-shrink-0">
        <ConnectionsSidebar />
      </div>
    </div>
  );
} 