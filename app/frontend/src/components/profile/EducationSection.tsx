import React from 'react';
import { Profile, Education } from '../../types';
import { mockProfile } from './mockData';

interface EducationSectionProps {
  profile?: Profile;
}

const EducationSection: React.FC<EducationSectionProps> = ({ profile }) => {
  const education: Education[] = (profile || mockProfile).education || [];
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H6m6 0h6" /></svg>
        <h2 className="text-xl font-bold">Education</h2>
      </div>
      <ul>
        {education.map((edu, idx) => (
          <li key={idx} className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-green-500">
                {edu.school[0]}
              </div>
              <h3 className="text-lg font-semibold">{edu.school}</h3>
            </div>
            <span className="block text-sm text-gray-400 mb-1">{edu.degree} in {edu.field} ({edu.start_date} - {edu.end_date})</span>
            {edu.activities && <p className="text-gray-700 text-sm">Activities: {edu.activities}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EducationSection; 