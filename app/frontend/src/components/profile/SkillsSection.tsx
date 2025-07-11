import React from 'react';
import { Profile } from '../../types';
import { mockProfile } from './mockData';

interface SkillsSectionProps {
  profile?: Profile;
}

const skillIcons: Record<string, JSX.Element> = {
  React: <svg className="w-4 h-4 text-blue-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2} /></svg>,
  'Node.js': <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} /></svg>,
  Python: <svg className="w-4 h-4 text-yellow-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m8-10h2M2 12H4m15.364-7.364l1.414 1.414M4.222 19.778l1.414-1.414M19.778 19.778l-1.414-1.414M4.222 4.222l1.414 1.414" /></svg>,
  AWS: <svg className="w-4 h-4 text-orange-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>,
};

const mockSkills = [
  { name: 'React', endorsements: 12 },
  { name: 'Node.js', endorsements: 8 },
  { name: 'Python', endorsements: 15 },
  { name: 'AWS', endorsements: 6 },
];

const SkillsSection: React.FC<SkillsSectionProps> = ({ profile }) => {
  // Use mockSkills for demo, or map profile.skills to similar structure if available
  const skills = mockSkills;
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L8 21l4-1.5L16 21l-1.75-4M12 3v8" /></svg>
        <h2 className="text-xl font-bold">Skills & Endorsements</h2>
      </div>
      <ul className="flex flex-wrap gap-4">
        {skills.map((skill, idx) => (
          <li key={idx} className="bg-blue-50 px-4 py-2 rounded-lg flex items-center">
            {skillIcons[skill.name] || null}
            <span className="font-semibold mr-2">{skill.name}</span>
            <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">{skill.endorsements} endorsements</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SkillsSection; 