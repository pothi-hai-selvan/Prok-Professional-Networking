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

const typeIcons: Record<string, JSX.Element> = {
  post: (
    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h7l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
  ),
  media: (
    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A2 2 0 0021 6.382V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-1.382a2 2 0 00-1.447-1.942L15 14v-4z" /></svg>
  ),
  link: (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 010 5.656m-3.656-3.656a4 4 0 015.656 0m-7.778 7.778a4 4 0 005.656 0l1.414-1.414a4 4 0 000-5.656m-7.778-7.778a4 4 0 015.656 0l1.414 1.414a4 4 0 010 5.656" /></svg>
  ),
};

export default function FeaturedSection() {
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.631c.969 0 1.371 1.24.588 1.81l-5.37 3.905a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.538 1.118l-5.37-3.905a1 1 0 00-1.175 0l-5.37 3.905c-.783.57-1.838-.197-1.538-1.118l2.036-6.29a1 1 0 00-.364-1.118l-5.37-3.905c-.783-.57-.38-1.81.588-1.81h6.631a1 1 0 00.95-.69l2.036-6.29z" /></svg>
        <h2 className="text-xl font-bold">Featured</h2>
      </div>
      <ul className="flex flex-wrap gap-4">
        {mockFeatured.map((item, idx) => (
          <li key={idx} className="w-64 bg-gray-50 rounded-lg p-4 shadow hover:shadow-lg transition group">
            <div className="flex items-center gap-2 mb-1">
              {typeIcons[item.type]}
              <h3 className="font-semibold group-hover:text-blue-600 transition">{item.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            <a href={item.url} className="text-blue-600 text-sm underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">
              View {item.type}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
} 