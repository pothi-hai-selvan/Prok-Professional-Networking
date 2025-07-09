import React from 'react';

const mockFeatured = [
  {
    type: 'post',
    title: 'How to Build Scalable Web Apps',
    url: '#',
    description: 'A deep dive into scalable architecture.'
  },
  {
    type: 'media',
    title: 'Conference Talk 2023',
    url: '#',
    description: 'Video of my talk at DevCon.'
  },
  {
    type: 'link',
    title: 'Personal Portfolio',
    url: 'https://johndoe.dev',
    description: 'My personal website.'
  }
];

export default function FeaturedSection() {
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Featured</h2>
      <ul className="flex flex-wrap gap-4">
        {mockFeatured.map((item, idx) => (
          <li key={idx} className="w-64 bg-gray-50 rounded-lg p-4 shadow">
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            <a href={item.url} className="text-blue-600 text-sm underline" target="_blank" rel="noopener noreferrer">
              View {item.type}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
} 