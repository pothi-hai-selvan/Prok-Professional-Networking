import React from 'react';
import { Profile } from '../../types';
import { mockProfile } from './mockData';

interface AboutSectionProps {
  profile?: Profile;
}

const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const bio = (profile || mockProfile).bio;
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h2 className="text-xl font-bold">About</h2>
      </div>
      <p className="text-gray-700 whitespace-pre-line text-base md:text-lg">{bio}</p>
    </section>
  );
};

export default AboutSection; 