import React from 'react';

const mockRecommendations = [
  {
    from: 'Jane Smith',
    text: 'John is a fantastic engineer and a great team player. Highly recommended!'
  },
  {
    from: 'Mike Brown',
    text: 'Delivered high-quality work on time and always willing to help others.'
  }
];

export default function RecommendationsSection() {
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Recommendations</h2>
      <ul>
        {mockRecommendations.map((rec, idx) => (
          <li key={idx} className="mb-4">
            <blockquote className="italic text-gray-700">"{rec.text}"</blockquote>
            <span className="block text-sm text-gray-500 mt-1">- {rec.from}</span>
          </li>
        ))}
      </ul>
    </section>
  );
} 