import React from 'react';

const mockEducation = [
  {
    school: 'Stanford University',
    degree: 'B.S. Computer Science',
    years: '2013 - 2017',
    activities: 'ACM, Hackathons'
  }
];

export default function EducationSection() {
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Education</h2>
      <ul>
        {mockEducation.map((edu, idx) => (
          <li key={idx} className="mb-4">
            <h3 className="text-lg font-semibold">{edu.school}</h3>
            <span className="block text-sm text-gray-400 mb-1">{edu.degree} ({edu.years})</span>
            <p className="text-gray-700">Activities: {edu.activities}</p>
          </li>
        ))}
      </ul>
    </section>
  );
} 