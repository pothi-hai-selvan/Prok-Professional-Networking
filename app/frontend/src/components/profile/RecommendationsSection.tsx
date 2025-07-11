import React from 'react';

const mockRecommendations = [
  {
    from: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'John is a fantastic engineer and a great team player. Highly recommended!'
  },
  {
    from: 'Mike Brown',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    text: 'Delivered high-quality work on time and always willing to help others.'
  }
];

export default function RecommendationsSection() {
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H7zm0 0v2a2 2 0 002 2h6a2 2 0 002-2v-2" /></svg>
        <h2 className="text-xl font-bold">Recommendations</h2>
      </div>
      <ul>
        {mockRecommendations.map((rec, idx) => (
          <li key={idx} className="mb-6 flex gap-4 items-start">
            <img src={rec.avatar} alt={rec.from} className="w-12 h-12 rounded-full object-cover border-2 border-pink-200" />
            <div>
              <blockquote className="italic text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" /></svg>
                "{rec.text}"
              </blockquote>
              <span className="block text-sm text-gray-500 mt-1">- {rec.from}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
} 