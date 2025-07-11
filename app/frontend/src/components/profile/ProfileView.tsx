import React, { useEffect, useState } from 'react';
import ProfileHeader from './ProfileHeader';
import AboutSection from './AboutSection';
import FeaturedSection from './FeaturedSection';
import ExperienceTimeline from './ExperienceTimeline';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import RecommendationsSection from './RecommendationsSection';
import ActivityFeed from './ActivityFeed';
import ConnectionsSidebar from './ConnectionsSidebar';
import { profileApi } from './api';

export default function ProfileView({ refreshKey }: { refreshKey?: number }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    profileApi.getProfile().then(setProfile);
  }, [refreshKey]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-4">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <ProfileHeader profile={profile} isOwnProfile={true} />
        <AboutSection profile={profile} />
        <FeaturedSection profile={profile} />
        <ExperienceTimeline profile={profile} />
        <EducationSection profile={profile} />
        <SkillsSection profile={profile} />
        <RecommendationsSection profile={profile} />
        <ActivityFeed profile={profile} />
      </div>
      {/* Sidebar */}
      <div className="w-full md:w-80 flex-shrink-0">
        <ConnectionsSidebar profile={profile} />
      </div>
    </div>
  );
} 