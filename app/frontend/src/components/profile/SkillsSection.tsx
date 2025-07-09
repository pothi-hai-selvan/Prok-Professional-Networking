import React from 'react';

const mockSkills = [
  { name: 'React', endorsements: 12 },
  { name: 'Node.js', endorsements: 8 },
  { name: 'Python', endorsements: 15 },
  { name: 'AWS', endorsements: 6 },
];

export default function SkillsSection() {
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Skills & Endorsements</h2>
      <ul className="flex flex-wrap gap-4">
        {mockSkills.map((skill, idx) => (
          <li key={idx} className="bg-blue-50 px-4 py-2 rounded-lg flex items-center">
            <span className="font-semibold mr-2">{skill.name}</span>
            <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">{skill.endorsements} endorsements</span>
          </li>
        ))}
      </ul>
    </section>
  );
} 