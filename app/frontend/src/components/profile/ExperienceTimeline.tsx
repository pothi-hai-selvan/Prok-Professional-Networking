import React from 'react';

const mockExperience = [
  {
    company: 'TechCorp',
    title: 'Senior Software Engineer',
    start: 'Jan 2020',
    end: 'Present',
    description: 'Leading a team of 8 engineers to build scalable SaaS products.'
  },
  {
    company: 'Webify',
    title: 'Frontend Developer',
    start: 'Jun 2017',
    end: 'Dec 2019',
    description: 'Developed modern web interfaces using React and Redux.'
  }
];

export default function ExperienceTimeline() {
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Experience</h2>
      <ol className="relative border-l-2 border-blue-200">
        {mockExperience.map((exp, idx) => (
          <li key={idx} className="mb-8 ml-6">
            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-8 ring-white">
              <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>
            </span>
            <h3 className="text-lg font-semibold">{exp.title} <span className="text-gray-500 font-normal">@ {exp.company}</span></h3>
            <span className="block text-sm text-gray-400 mb-1">{exp.start} - {exp.end}</span>
            <p className="text-gray-700">{exp.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
} 