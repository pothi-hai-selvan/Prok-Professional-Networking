import React from 'react';
import { Profile, Experience } from '../../types';
import { mockProfile } from './mockData';

interface ExperienceTimelineProps {
  profile?: Profile;
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ profile }) => {
  const experience: Experience[] = (profile || mockProfile).experience || [];
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" /></svg>
        <h2 className="text-xl font-bold">Experience</h2>
      </div>
      <ol className="relative border-l-2 border-blue-200">
        {experience.map((exp, idx) => (
          <li key={idx} className="mb-8 ml-6">
            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white">
              <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>
            </span>
            <div className="flex items-center gap-2 mb-1">
              {/* Placeholder for company logo */}
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-blue-500">
                {exp.company[0]}
              </div>
              <h3 className="text-lg font-semibold">{exp.title} <span className="text-gray-500 font-normal">@ {exp.company}</span></h3>
            </div>
            <span className="block text-sm text-gray-400 mb-1">{exp.start_date} - {exp.end_date || 'Present'}</span>
            <p className="text-gray-700">{exp.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ExperienceTimeline; 