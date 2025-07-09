import React from 'react';

const mockActivity = [
  { type: 'post', content: 'Shared a post: "10 Tips for Clean Code"', date: '2d ago' },
  { type: 'like', content: 'Liked Jane Smith’s post', date: '3d ago' },
  { type: 'comment', content: 'Commented on Mike’s post: "Great insights!"', date: '5d ago' },
];

export default function ActivityFeed() {
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Activity</h2>
      <ul>
        {mockActivity.map((act, idx) => (
          <li key={idx} className="mb-2">
            <span className="font-semibold capitalize">{act.type}:</span> {act.content}
            <span className="text-gray-400 text-xs ml-2">{act.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
} 