import React from 'react';
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
  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-4">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <ProfileHeader />
        <AboutSection />
        <FeaturedSection />
        <ExperienceTimeline />
        <EducationSection />
        <SkillsSection />
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